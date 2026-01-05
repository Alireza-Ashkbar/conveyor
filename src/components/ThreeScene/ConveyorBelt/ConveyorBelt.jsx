"use client";

import { useGLTF } from "@react-three/drei";

export function ConveyorBelt(props) {
  const { scene } = useGLTF("/models/conveyor.glb");

  return (
    <primitive
      object={scene}
      scale={props.scale || 1}
      position={props.position || [0, 0, 0]}
      rotation={props.rotation || [0, 0, 0]}
    />
  );
}

// optional but recommended
useGLTF.preload("/models/conveyor.glb");
