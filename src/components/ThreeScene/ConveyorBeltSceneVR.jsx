"use client";

import { useEffect } from "react";
import { Color } from "three";
import { useThree } from "@react-three/fiber";
import { XROrigin } from "@react-three/xr";

import { ConveyorBelt } from "./ConveyorBelt/ConveyorBelt";
import { ConveyorTape } from "./ConveyorBelt/CoveyorTape";

const VR_FAULTS = [
  {
    id: "vr-1",
    name: "Belt Misalignment",
    distensToStartPoint: 60,
    size: 30,
    severity: "High",
  },
  {
    id: "vr-2",
    name: "Roller Jam",
    distensToStartPoint: 140,
    size: 45,
    severity: "Critical",
  },
  {
    id: "vr-3",
    name: "Bearing Overheat",
    distensToStartPoint: 210,
    size: 25,
    severity: "Medium",
  },
];

export default function ConveyorBeltSceneVR() {
  const { scene } = useThree();

  // ✅ Bright white background
  useEffect(() => {
    scene.background = new Color("#ffffff");
  }, [scene]);

  return (
    <>
      {/* 🔒 FIXED USER START POSITION */}
      <XROrigin position={[20, -40, 50]}>
        {/* LIGHTING */}
        <ambientLight intensity={2.2} />
        <directionalLight
          position={[8, 12, 8]}
          intensity={2}
          castShadow
        />

        {/* FLOOR */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[500, 500]} />
          <meshStandardMaterial color="#f5f5f5" />
        </mesh>

        {/* CONVEYOR */}
        <ConveyorBelt scale={14} />

        <ConveyorTape
          position={[19, 15, 0]}
          length={245}
          width={12}
          speed={1}
          faults={VR_FAULTS}
        />
      </XROrigin>
    </>
  );
}
