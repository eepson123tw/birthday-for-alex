// @ts-nocheck
import * as THREE from "three";
import { extend, useLoader } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import React, { useState, useRef, Suspense, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Float,
  Text,
  Sparkles,
  MeshPortalMaterial,
  CameraControls,
  Sky,
  Html,
} from "@react-three/drei";
import { geometry } from "maath";
import { suspend } from "suspend-react";
import txtJson from "../src/text.json";

extend(geometry);
const regular = import("@pmndrs/assets/fonts/inter_regular.woff");
const medium = import("@pmndrs/assets/fonts/inter_medium.woff");
import img01 from "../public/01.png";
import img02 from "../public/02.png";
import img03 from "../public/03.png";
import img04 from "../public/04.png";
import img05 from "../public/05.png";
import img06 from "../public/06.png";
import img07 from "../public/07.png";
import img08 from "../public/08.png";
import img09 from "../public/09.png";
import img10 from "../public/10.png";

export function BlockArea({ position = [0, 0, 0] }) {
  const [timer, setImgTimer] = useState(0);
  useFrame((state, delta, xrFrame) => {
    const time = state.clock.getElapsedTime() / 3;
    setImgTimer(Math.floor(time % 10));
  });
  return (
    <group position={position}>
      <RigidBody
        type="fixed"
        colliders="hull"
        position={position}
        restitution={0.2}
        friction={1}
      >
        <Sparkles
          count={250}
          scale={10 * 2}
          size={2}
          speed={0.4}
          color={"#030"}
        />
        <Sparkles
          count={250}
          scale={10 * 2}
          size={10}
          speed={0.4}
          color={"orange"}
        />
        <Sparkles count={100} scale={10} size={6} speed={0.4} color={"white"} />
        <Float floatIntensity={0.25} rotationIntensity={0.25}>
          <Text
            font="/bebas-neue-v9-latin-regular.woff"
            scale={0.5}
            maxWidth={0.25}
            lineHeight={0.75}
            textAlign="center"
            position={[0.75, 0.65, 0]}
            rotation-y={-0.25}
          >
            This is Dream Start!
            <meshBasicMaterial toneMapped={false} />
          </Text>
        </Float>
        <mesh
          position={[0, -0.1, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[4, 7, 1]}
          receiveShadow
        >
          <Html distanceFactor={9} position={[0.25, 2, 4]} as="div">
            <div className="content">
              <p>{txtJson[timer]}</p>
            </div>
          </Html>
          <planeGeometry />
          <meshPhysicalMaterial
            roughness={0}
            color={"black"}
            emissive={"black"}
            envMapIntensity={5}
          />
        </mesh>
        <Frame
          id="01"
          name="Starlux Memory"
          author="by Allen"
          position={[0, 1, -3]}
          rotation={[-0.45, 0, 0]}
          scale={1.5}
        >
          <Sky />
          <Suspense fallback={null}>
            <Image />
          </Suspense>
        </Frame>
        <CameraControls
          makeDefault
          minAzimuthAngle={-Math.PI / 2.5}
          maxAzimuthAngle={Math.PI / 2.5}
          minPolarAngle={0.5}
          maxPolarAngle={Math.PI / 2}
        />
      </RigidBody>
    </group>
  );
}

function Image() {
  const [imgIndex, setImgIndex] = useState(0);
  const imgTexture01 = useLoader(THREE.TextureLoader, img01);
  const imgTexture02 = useLoader(THREE.TextureLoader, img02);
  const imgTexture03 = useLoader(THREE.TextureLoader, img03);
  const imgTexture04 = useLoader(THREE.TextureLoader, img04);
  const imgTexture05 = useLoader(THREE.TextureLoader, img05);
  const imgTexture06 = useLoader(THREE.TextureLoader, img06);
  const imgTexture07 = useLoader(THREE.TextureLoader, img07);
  const imgTexture08 = useLoader(THREE.TextureLoader, img08);
  const imgTexture09 = useLoader(THREE.TextureLoader, img09);
  const imgTexture10 = useLoader(THREE.TextureLoader, img10);
  const data = [
    imgTexture01,
    imgTexture02,
    imgTexture03,
    imgTexture04,
    imgTexture05,
    imgTexture06,
    imgTexture07,
    imgTexture08,
    imgTexture09,
    imgTexture10,
  ];

  const ref = useRef(null);
  useFrame((state, delta, xrFrame) => {
    const time = state.clock.getElapsedTime() / 3;
    setImgIndex(Math.floor(time % 10));
  });
  return (
    <mesh>
      <planeGeometry attach="geometry" args={[1.8, 2]} />
      <meshBasicMaterial ref={ref} attach="material" map={data[imgIndex]} />
    </mesh>
  );
}

const GOLDENRATIO = 1.61803398875;
function Frame({
  name,
  author,
  id,
  bg,
  width = 1,
  height = GOLDENRATIO,
  children,
  ...props
}) {
  const [timer, setImgTimer] = useState(0);
  useFrame((state, delta, xrFrame) => {
    const time = state.clock.getElapsedTime() / 3;
    setImgTimer(Math.floor(time % 10));
  });
  const color = new THREE.Color();
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (hovered) document.body.style.cursor = "pointer";
    return () => (document.body.style.cursor = "auto");
  }, [hovered]);

  useFrame(({ camera }) => {
    ref.current.quaternion.copy(camera.quaternion);
    ref.current.material.color.lerp(
      color.set(hovered ? "#fa2720" : "#FF8000"),
      0.1
    );
  });

  const over = (e) => (e.stopPropagation(), setHovered(true));
  const out = () => setHovered(false);
  return (
    <group {...props}>
      <Text
        onPointerOver={over}
        onPointerOut={out}
        onClick={() => alert("生日快樂 Alex")}
        ref={ref}
        font={suspend(medium).default}
        fontSize={0.1}
        letterSpacing={-0.025}
        anchorY="top"
        anchorX="center"
        lineHeight={0.8}
        position={[0, 0.715, 0.01]}
      >
        {name}
      </Text>
      <Text
        font={suspend(regular).default}
        color="#FF8000"
        fontSize={0.1}
        anchorX="right"
        position={[0.4, -0.659, 0.01]}
      >
        /0{timer + 1}
      </Text>
      <Text
        font={suspend(regular).default}
        color="#FF8000"
        fontSize={0.04}
        anchorX="left"
        position={[0.0, -0.677, 0.01]}
      >
        {author}
      </Text>
      <mesh name={id}>
        <roundedPlaneGeometry args={[width, height, 0.1]} />
        <MeshPortalMaterial>{children}</MeshPortalMaterial>
      </mesh>
      <mesh name={id} position={[0, 0, -0.001]}>
        <roundedPlaneGeometry args={[width + 0.05, height + 0.05, 0.12]} />
        <meshBasicMaterial color="black" />
      </mesh>
    </group>
  );
}

export function Board() {
  return (
    <>
      <BlockArea position={[0, 0, 0]} />
    </>
  );
}
