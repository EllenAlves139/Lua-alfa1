import { Suspense, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const DEFAULT_STAMP = {
  x: 0,
  y: 0.15,
  scale: 30,
  rotation: 0,
}

function normalizeObject(object) {
  const box = new THREE.Box3().setFromObject(object)
  const size = box.getSize(new THREE.Vector3())
  const center = box.getCenter(new THREE.Vector3())
  const maxAxis = Math.max(size.x, size.y, size.z) || 1
  const scale = 4.2 / maxAxis

  object.scale.setScalar(scale)
  object.position.set(-center.x * scale, -center.y * scale, -center.z * scale)
}

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
        if (disposed) {
          tex.dispose()
          return
        }

        tex.colorSpace = THREE.SRGBColorSpace
        tex.minFilter = THREE.LinearFilter
        tex.magFilter = THREE.LinearFilter
        tex.generateMipmaps = false
        tex.needsUpdate = true
        setTexture(tex)
      },
      undefined,
      error => {
        console.error('Erro ao carregar textura da estampa:', error)
        setTexture(null)
      },
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

function ProductModel({ color, modelPath }) {
  const { scene } = useGLTF(modelPath)

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true)

    clone.traverse(child => {
      if (!child.isMesh) return

      child.castShadow = true
      child.receiveShadow = true

      if (Array.isArray(child.material)) {
        child.material = child.material.map(material => material.clone())
      } else if (child.material) {
        child.material = child.material.clone()
      }
    })

    return clone
  }, [scene])

  useLayoutEffect(() => {
    normalizeObject(clonedScene)
  }, [clonedScene, modelPath])

  useEffect(() => {
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

  return <primitive object={clonedScene} />
}

function StampPreview({ texture, stamp }) {
  if (!texture) return null

  const safeScale = Math.max(8, Math.min(100, Number(stamp?.scale || DEFAULT_STAMP.scale)))
  const width = 0.85 + safeScale / 42
  const height = width
  const positionX = Number(stamp?.x ?? DEFAULT_STAMP.x)
  const positionY = Number(stamp?.y ?? DEFAULT_STAMP.y)
  const rotation = THREE.MathUtils.degToRad(Number(stamp?.rotation || 0))

  return (
    <mesh
      position={[positionX, positionY, 1.62]}
      rotation={[0, 0, rotation]}
      renderOrder={10}
    >
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial
        map={texture}
        transparent
        alphaTest={0.01}
        depthTest={false}
        depthWrite={false}
        toneMapped={false}
        side={THREE.DoubleSide}
      />
    </mesh>
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

      <Suspense fallback={<LoadingModel />}>
        <ProductModel color={color} modelPath={modelPath} />
        <StampPreview texture={texture} stamp={stamp} />
        <Environment preset="city" />
      </Suspense>
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

  return (
    <div className="relative h-[460px] w-full overflow-hidden rounded-3xl border border-white/10 bg-dark-800/70">
      <Canvas
        shadows
        dpr={[1, 1.8]}
        camera={{ position: [0, 0, 7], fov: 38 }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
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

useGLTF.preload('/models/tshirt-mannequin.glb')
useGLTF.preload('/models/hoodie_with_hood_up.glb')
useGLTF.preload('/models/sweatshirt_warm.glb')
