import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
export default function Lights() {
  const light = useRef();
  useFrame((state) => {
    light.current.position.z = state.camera.position.z + 1 - 4;
    light.current.target.position.z = state.camera.position.z - 4;
    light.current.target.updateMatrixWorld();
  });

  return (
    <>
      <directionalLight
        ref={light}
        castShadow
        position={[4, 4, 1]}
        intensity={0.05}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={100}
        shadow-camera-top={100}
        shadow-camera-right={100}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      />
      <Environment
        blur={1}
        files="./moonless_golf_2k.hdr"
        ground={{ height: 20, radius: 20, scale: 20 }}
      />
      <ambientLight intensity={0.1} />
    </>
  );
}
