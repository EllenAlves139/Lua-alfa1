import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import { useLayoutEffect, useEffect, useState } from "react";
import * as THREE from "three";

function Model({ color, image, scale, modelPath }) {
  const { scene } = useGLTF(modelPath);
  const [texture, setTexture] = useState(null);

  useLayoutEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxAxis = Math.max(size.x, size.y, size.z);
    const sc = 8 / maxAxis;
    scene.scale.setScalar(sc);
    scene.position.set(-center.x * sc, -center.y * sc, -center.z * sc);
  }, [scene]);

  // ─── GERA A TEXTURA ───
  useEffect(() => {
    if (!image) {
      setTexture(null);
      return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const size = 1024;
    canvas.width = size;
    canvas.height = size;
    ctx.clearRect(0, 0, size, size);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = image;

    img.onload = () => {
      const baseSize = size * 0.4;
      const scaleFactor = Math.max(0.1, scale / 100);
      const drawSize = baseSize * scaleFactor;
      const cx = size / 2;
      const cy = size / 2;
      const aspect = img.width / img.height;
      let drawW, drawH;
      if (aspect > 1) {
        drawW = drawSize;
        drawH = drawSize / aspect;
      } else {
        drawH = drawSize;
        drawW = drawSize * aspect;
      }
      ctx.drawImage(img, cx - drawW / 2, cy - drawH / 2, drawW, drawH);

      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.needsUpdate = true;
      setTexture(tex);
    };

    img.onerror = (err) => {
      console.error("Erro ao carregar imagem:", err);
      setTexture(null);
    };
  }, [image, scale]);

  // ─── APLICA A TEXTURA OU A COR ───
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        if (texture) {
          child.material.map = texture;
          child.material.color.set("#ffffff");
        } else {
          child.material.map = null;
          child.material.color.set(color);
        }
        child.material.needsUpdate = true;
      }
    });
  }, [scene, color, texture]);

  return <primitive object={scene} />;
}

export default function Shirt3D({ color = "#FFFFFF", image = null, scale = 30, modelPath = "/models/tshirt-mannequin.glb" }) {
  return (
    <div className="w-full h-[650px] rounded-xl overflow-hidden">
      <Canvas
        frameloop="demand"
        camera={{ position: [0, 0, 15], fov: 45 }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 10]} intensity={2.5} />
        <directionalLight position={[-10, 5, -10]} intensity={1.5} />
        <Environment preset="city" />
        <Model color={color} image={image} scale={scale} modelPath={modelPath} />
        <OrbitControls enablePan={false} minDistance={8} maxDistance={30} />
      </Canvas>
    </div>
  );
}