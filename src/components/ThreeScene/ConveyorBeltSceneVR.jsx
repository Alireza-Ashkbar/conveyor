"use client";

import { useEffect, useState } from "react";
import { Color } from "three";
import { useThree } from "@react-three/fiber";
import { XROrigin } from "@react-three/xr";

import { ConveyorBelt } from "./ConveyorBelt/ConveyorBelt";
import { ConveyorTape } from "./ConveyorBelt/CoveyorTape";
import { ConveyorControls3D } from "./ConveyorControls3D";
import { FaultModal3D } from "./FaultModal3D"; // ✅ import the modal

const VR_FAULTS = [
  { id: "vr-1", name: "Belt Misalignment", distensToStartPoint: 60, size: 30, severity: "High", description: "The conveyor belt is misaligned and may cause jams." },
  { id: "vr-2", name: "Roller Jam", distensToStartPoint: 140, size: 45, severity: "Critical", description: "A roller is jammed, halting the conveyor in this section." },
  { id: "vr-3", name: "Bearing Overheat", distensToStartPoint: 210, size: 25, severity: "Medium", description: "Bearing temperature is above normal levels." },
];

export default function ConveyorBeltSceneVR() {
  const { scene } = useThree();
  const [speed, setSpeed] = useState(1);

  // ✅ For fault modal
  const [selectedFault, setSelectedFault] = useState(null);

  useEffect(() => {
    scene.background = new Color("#ffffff");
  }, [scene]);

  // Click handler for faults
  const handleFaultClick = (fault) => setSelectedFault(fault);
  const closeModal = () => setSelectedFault(null);

  return (
    <XROrigin position={[20, -40, 50]}>
      {/* LIGHTS */}
      <ambientLight intensity={2.2} />
      <directionalLight position={[8, 12, 8]} intensity={2} />

      {/* FLOOR */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[500, 500]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>

      {/* CONVEYOR */}
      <ConveyorBelt scale={14} />

      {/* TAPE + Faults */}
      <ConveyorTape
        position={[19, 15, 0]}
        length={245}
        width={12}
        speed={speed}
        faults={VR_FAULTS}
        onFaultClick={handleFaultClick} // ✅ pass click handler
      />

      {/* 3D Controls */}
      <ConveyorControls3D
        onStart={() => setSpeed(1)}
        onStop={() => setSpeed(0)}
        onForward={() => setSpeed(2)}
        onBackward={() => setSpeed(-1)}
      />

      {/* ⚠️ 3D Modal for selected fault */}
      {selectedFault && <FaultModal3D fault={selectedFault} onClose={closeModal} />}
    </XROrigin>
  );
}
