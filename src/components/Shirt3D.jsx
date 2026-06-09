import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import { useLayoutEffect, useEffect } from "react";
import * as THREE from "three";

function Model({ color, image }) {
  const { scene } = useGLTF("/models/tshirt-mannequin.glb");

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

  // COR DA CAMISA
  useEffect(() => {
    scene.traverse((child) => {
      if (
        child.isMesh &&
        child.material?.name === "Material22119"
      ) {
        // só altera cor se não existir textura
        if (!child.material.map) {
          child.material.color.set(color);
          child.material.needsUpdate = true;
        }
      }
    });
  }, [scene, color]);

  // ESTAMPA
  useEffect(() => {
    if (!image) {
      scene.traverse((child) => {
        if (
          child.isMesh &&
          child.material?.name === "Material22119"
        ) {
          child.material.map = null;
          child.material.color.set(color);
          child.material.needsUpdate = true;
        }
      });

      return;
    }

    const loader = new THREE.TextureLoader();

    loader.setCrossOrigin("anonymous");

    const absoluteUrl =
      image.startsWith?.("/")
        ? window.location.origin + image
        : image;

    loader.load(
      absoluteUrl,

      (texture) => {
        texture.flipY = false;

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;

        texture.colorSpace = THREE.SRGBColorSpace;

        texture.needsUpdate = true;

        scene.traverse((child) => {
          if (
            child.isMesh &&
            child.material?.name === "Material22119"
          ) {
            child.material.map = texture;

            child.material.color.set("#ffffff");

            child.material.vertexColors = false;

            child.material.needsUpdate = true;
          }
        });
      },

      undefined,

      (error) => {
        console.warn(
          "Erro ao carregar textura:",
          absoluteUrl,
          error
        );
      }
    );
  }, [scene, image, color]);

  return <primitive object={scene} />;
}

export default function Shirt3D({
  color = "#FFFFFF",
  image = null,
}) {
  return (
    <div className="w-full h-[650px] rounded-xl overflow-hidden">
      <Canvas
        frameloop="demand"
        camera={{
          position: [0, 0, 15],
          fov: 45,
        }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener(
            "webglcontextlost",
            (e) => {
              e.preventDefault();
              console.warn("WebGL Context Lost");
            }
          );

          gl.domElement.addEventListener(
            "webglcontextrestored",
            () => {
              console.log("WebGL Context Restored");
            }
          );
        }}
      >
        <ambientLight intensity={1.5} />

        <directionalLight
          position={[10, 10, 10]}
          intensity={2.5}
        />

        <directionalLight
          position={[-10, 5, -10]}
          intensity={1.5}
        />

        <Environment preset="city" />

        <Model
          color={color}
          image={image}
        />

        <OrbitControls
          enablePan={false}
          minDistance={8}
          maxDistance={30}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/tshirt-mannequin.glb");