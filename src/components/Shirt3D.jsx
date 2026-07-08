import { Component, Suspense, useEffect, useLayoutEffect, useMemo, useState, useRef } from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { Environment, OrbitControls, useGLTF, Html } from '@react-three/drei'
import * as THREE from 'three'
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry.js'

const DEFAULT_STAMP = {
  x: 0,
  y: 0.15,
  scale: 30,
  rotation: 0,
}

// Error Boundary
class SceneErrorBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(error) { console.error('Erro na cena 3D:', error?.message || error) }
  render() {
    if (this.state.failed) return this.props.fallback ?? null
    return this.props.children
  }
}

function normalizeObject(object) {
  object.position.set(0, 0, 0)
  object.rotation.set(0, 0, 0)
  object.scale.setScalar(1)
  object.updateMatrixWorld(true)

  const box = new THREE.Box3().setFromObject(object)
  const size = box.getSize(new THREE.Vector3())
  const center = box.getCenter(new THREE.Vector3())
  const maxAxis = Math.max(size.x, size.y, size.z) || 1
  const scale = 4.2 / maxAxis

  object.scale.setScalar(scale)
  object.position.set(-center.x * scale, -center.y * scale, -center.z * scale)
}

// Carrega textura com CORS
function useStampTexture(image) {
  const [texture, setTexture] = useState(null)

  useEffect(() => {
    if (!image) {
      setTexture(null)
      return undefined
    }

    let disposed = false
    const loader = new THREE.TextureLoader()
    loader.setCrossOrigin('anonymous')

    loader.load(
      image,
      tex => {
        if (disposed) { tex.dispose(); return }
        tex.colorSpace = THREE.SRGBColorSpace
        tex.minFilter = THREE.LinearFilter
        tex.magFilter = THREE.LinearFilter
        tex.generateMipmaps = false
        tex.needsUpdate = true
        setTexture(tex)
      },
      undefined,
      error => {
        console.warn('Falha ao carregar textura:', error)
        setTexture(null)
      }
    )

    return () => {
      disposed = true
      setTexture(prev => {
        prev?.dispose?.()
        return null
      })
    }
  }, [image])

  return texture
}

// Calcula o decal com fallback para plano
function computeStampDecal(scene, stamp) {
  const safeScale = Math.max(8, Math.min(100, Number(stamp?.scale || DEFAULT_STAMP.scale)))
  const width = 0.85 + safeScale / 42
  const x = Number(stamp?.x ?? DEFAULT_STAMP.x)
  const y = Number(stamp?.y ?? DEFAULT_STAMP.y)
  const rotation = THREE.MathUtils.degToRad(Number(stamp?.rotation || 0))

  scene.updateMatrixWorld(true)

  const raycaster = new THREE.Raycaster()
  const direction = new THREE.Vector3(0, 0, -1)
  // Mais pontos de tentativa para aumentar a chance de acertar a malha
  const candidates = [
    [x, y],
    [x * 0.7, y * 0.7],
    [0, y],
    [0, DEFAULT_STAMP.y],
    [x * 0.4, y * 0.4],
    [x * 0.9, y * 0.9],
  ]

  for (const [cx, cy] of candidates) {
    raycaster.set(new THREE.Vector3(cx, cy, 10), direction)
    const hits = raycaster.intersectObject(scene, true)
    const hit = hits.find(item => item.object.isMesh && item.object.geometry)
    if (hit) {
      const orientation = new THREE.Euler(0, 0, rotation)
      const size = new THREE.Vector3(width, width, 0.75)
      return new DecalGeometry(hit.object, hit.point, orientation, size)
    }
  }

  // Fallback: se não acertar nenhuma malha, retorna null – usaremos um plano
  return null
}

function ProductModel({ color, modelPath, texture, stamp }) {
  const { scene, error } = useGLTF(modelPath)
  const [decalGeometry, setDecalGeometry] = useState(null)
  const [fallback, setFallback] = useState(false)
  const meshRef = useRef()

  const clonedScene = useMemo(() => {
    if (!scene) return null
    const clone = scene.clone(true)
    clone.traverse(child => {
      if (!child.isMesh) return
      child.castShadow = true
      child.receiveShadow = true
      if (Array.isArray(child.material)) {
        child.material = child.material.map(m => m.clone())
      } else if (child.material) {
        child.material = child.material.clone()
      }
    })
    return clone
  }, [scene])

  // Normaliza o modelo quando carregado
  useLayoutEffect(() => {
    if (clonedScene) {
      normalizeObject(clonedScene)
    }
  }, [clonedScene])

  // Calcula o decal
  useLayoutEffect(() => {
    if (!texture || !clonedScene) {
      setDecalGeometry(null)
      setFallback(false)
      return
    }

    const geometry = computeStampDecal(clonedScene, stamp)
    if (geometry) {
      setDecalGeometry(geometry)
      setFallback(false)
    } else {
      // Se não conseguiu decal, usa fallback (plano)
      setFallback(true)
      setDecalGeometry(null)
    }

    return () => geometry?.dispose()
  }, [clonedScene, texture, stamp.x, stamp.y, stamp.scale, stamp.rotation])

  // Aplica cor e material
  useEffect(() => {
    if (!clonedScene) return
    clonedScene.traverse(child => {
      if (!child.isMesh || !child.material) return
      const materials = Array.isArray(child.material) ? child.material : [child.material]
      materials.forEach(material => {
        if ('color' in material) material.color.set(color)
        material.map = material.map || null
        material.roughness = 0.65
        material.metalness = 0.02
        material.needsUpdate = true
      })
    })
  }, [clonedScene, color])

  // Se erro no carregamento, mostra placeholder
  if (error) {
    return (
      <group>
        <mesh>
          <boxGeometry args={[1.4, 1.9, 0.15]} />
          <meshStandardMaterial color="#333" roughness={0.8} />
        </mesh>
        <Html center>
          <div className="text-white/40 text-xs">Modelo indisponível</div>
        </Html>
      </group>
    )
  }

  if (!clonedScene) return <LoadingModel />

  return (
    <group>
      <primitive object={clonedScene} />
      {/* Decal real */}
      {decalGeometry && texture && (
        <mesh geometry={decalGeometry} renderOrder={10}>
          <meshBasicMaterial
            map={texture}
            transparent
            depthTest
            depthWrite={false}
            polygonOffset
            polygonOffsetFactor={-4}
            toneMapped={false}
          />
        </mesh>
      )}
      {/* Fallback: plano na frente da peça */}
      {fallback && texture && (
        <mesh ref={meshRef} position={[stamp.x || 0, stamp.y || 0.15, 1.2]} renderOrder={10}>
          <planeGeometry args={[1.2, 1.2]} />
          <meshBasicMaterial
            map={texture}
            transparent
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      )}
    </group>
  )
}

function LoadingModel() {
  return (
    <mesh>
      <boxGeometry args={[1.4, 1.9, 0.15]} />
      <meshStandardMaterial color="#151515" roughness={0.8} />
    </mesh>
  )
}

function Scene({ color, image, stamp, modelPath }) {
  const texture = useStampTexture(image)

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 4, 5]} intensity={1.9} castShadow />
      <directionalLight position={[-4, 2, 3]} intensity={0.8} />

      <SceneErrorBoundary key={modelPath} fallback={<LoadingModel />}>
        <Suspense fallback={<LoadingModel />}>
          <ProductModel color={color} modelPath={modelPath} texture={texture} stamp={stamp} />
        </Suspense>
      </SceneErrorBoundary>

      <SceneErrorBoundary>
        <Suspense fallback={null}>
          <Environment preset="city" />
        </Suspense>
      </SceneErrorBoundary>
    </>
  )
}

export default function Shirt3D({
  color = '#FFFFFF',
  image = null,
  scale = 30,
  stampPosition = { x: 0, y: 0.15 },
  stampRotation = 0,
  modelPath = '/models/tshirt-mannequin.glb',
}) {
  const stamp = {
    ...DEFAULT_STAMP,
    ...stampPosition,
    scale,
    rotation: stampRotation,
  }

  // Forçar recriação quando modelPath mudar
  const key = useMemo(() => `${modelPath}-${Date.now()}`, [modelPath])

  return (
    <div className="relative h-[460px] w-full overflow-hidden rounded-3xl border border-white/10 bg-dark-800/70">
      <Canvas
        shadows
        dpr={[1, 1.8]}
        camera={{ position: [0, 0, 7], fov: 38 }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
        key={key}
      >
        <color attach="background" args={['#080808']} />
        <Scene color={color} image={image} stamp={stamp} modelPath={modelPath} />
        <OrbitControls
          enablePan={false}
          enableZoom
          minDistance={4.6}
          maxDistance={9}
          minPolarAngle={Math.PI / 3.2}
          maxPolarAngle={Math.PI / 1.7}
        />
      </Canvas>

      {!image && (
        <div className="pointer-events-none absolute bottom-4 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 rounded-2xl border border-white/10 bg-black/45 px-4 py-3 text-center text-xs text-white/50 backdrop-blur-sm">
          Envie uma imagem ou gere uma arte para visualizar a estampa em tempo real.
        </div>
      )}
    </div>
  )
}

// Pré-carrega apenas o modelo padrão; os outros serão carregados sob demanda
useGLTF.preload('/models/tshirt-mannequin.glb')