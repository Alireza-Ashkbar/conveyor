"use client";

import { ConveyorBelt } from "./ConveyorBelt/ConveyorBelt";
import { ConveyorTape } from "./ConveyorBelt/CoveyorTape";

export default function ConveyorBeltSceneVR() {
  return (
    <>
      {/* LIGHTING */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1}
        castShadow
      />

      {/* FLOOR */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#111827" />
      </mesh>

      {/* CONVEYOR */}
      <ConveyorBelt scale={14} />

      <ConveyorTape
        position={[19, 15, 0]}
        length={245}
        width={12}
        speed={1}
      />
    </>
  );
}
