import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import { useLayoutEffect, useEffect } from "react";
import * as THREE from "three";

function Model({ color, image }) {
  // Carrega o modelo 3D do manequim
  const { scene } = useGLTF("/models/tshirt-mannequin.glb");

  // 1. Ajuste automático de escala e posicionamento centralizado
  useLayoutEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    const maxAxis = Math.max(size.x, size.y, size.z);
    const scale = 8 / maxAxis;

    scene.scale.setScalar(scale);
    scene.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
  }, [scene]);

  // 2. Atualização dinâmica da cor do tecido
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material?.name === "Material22119") {
        child.material.color.set(color);
        child.material.needsUpdate = true;
      }
    });
  }, [scene, color]);

  // 3. Carregamento seguro da Estampa (Sem quebrar as regras de Hooks)
  useEffect(() => {
    // Se a imagem for removida ou for nula, limpa a estampa anterior da camisa
    if (!image) {
      scene.traverse((child) => {
        if (child.isMesh && child.material?.name === "Material22119") {
          child.material.map = null;
          child.material.needsUpdate = true;
        }
      });
      return;
    }

    // Instancia o carregador de texturas padrão do Three.js
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous"); // Evita problemas simples de bloqueio de CORS

    loader.load(
      image,
      (texture) => {
        // Sucesso: Aplica as configurações ideais de exibição
        texture.flipY = false;
        texture.colorSpace = THREE.SRGBColorSpace; // Mantém as cores vivas e realistas

        scene.traverse((child) => {
          if (child.isMesh && child.material?.name === "Material22119") {
            child.material.map = texture;
            child.material.needsUpdate = true;
          }
        });
      },
      undefined,
      (error) => {
        // Captura falhas silenciosamente (ex: links quebrados da internet) sem travar o Canvas
        console.warn("Não foi possível carregar a imagem no modelo 3D:", image, error);
      }
    );
  }, [scene, image]);

  return <primitive object={scene} />;
}

export default function Shirt3D({ color = "#FFFFFF", image = null }) {
  return (
    <div className="w-full h-[650px] rounded-xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        <ambientLight intensity={1.5} />
        
        <directionalLight position={[10, 10, 10]} intensity={2.5} />
        <directionalLight position={[-10, 5, -10]} intensity={1.5} />
        
        <Environment preset="city" />

        <Model color={color} image={image} />

        <OrbitControls enablePan={false} minDistance={8} maxDistance={30} />
      </Canvas>
    </div>
  );
}

// Pré-carrega o modelo para evitar atrasos na interface
useGLTF.preload("/models/tshirt-mannequin.glb");