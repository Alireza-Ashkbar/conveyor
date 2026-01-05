"use client";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export const TooltipLabel = ({ position, text }) => {
  const ref = useRef();

  useFrame(({ camera }) => {
    if (ref.current) {
      ref.current.lookAt(camera.position); // همیشه رو به دوربین
    }
  });

  return (
    <group position={position}>
      <mesh ref={ref}>
        <planeGeometry args={[2.5, 1]} />
        <meshBasicMaterial color="black" transparent opacity={0.7} />
      </mesh>
      <textSprite
        position={[0, 0, 0.01]} // کمی جلوتر از plane
        text={text}
        fontSize={150}
        color="white"
        backgroundColor="transparent"
      />
    </group>
  );
};
