import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function ThumbnailModel({ modelPath }) {
  const { scene } = useGLTF(modelPath);

  // Clona a cena antes de mexer nela: o objeto do useGLTF é compartilhado (cache)
  // e mutá-lo direto corrompe a escala/posição para outros componentes.
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(clonedScene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxAxis = Math.max(size.x, size.y, size.z) || 1;
    const sc = 4 / maxAxis;
    clonedScene.scale.setScalar(sc);
    clonedScene.position.set(-center.x * sc, -center.y * sc, -center.z * sc);
  }, [clonedScene]);

  return <primitive object={clonedScene} />;
}

export default function ModelThumbnail({ modelPath, isActive }) {
  const containerRef = useRef();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Se não estiver visível ou ativo, mostra um placeholder
  if (!shouldRender) {
    return (
      <div
        ref={containerRef}
        className="w-full h-full bg-dark-600 flex items-center justify-center"
      >
        <span className="text-white/20 text-xs">Carregando...</span>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full">
      <Canvas
        frameloop="demand"
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <directionalLight position={[-5, 5, -5]} intensity={1} />
        <Suspense fallback={null}>
          <ThumbnailModel modelPath={modelPath} />
        </Suspense>
        {isActive && <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={2} />}
      </Canvas>
    </div>
  );
}