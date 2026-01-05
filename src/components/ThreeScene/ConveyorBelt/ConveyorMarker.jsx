"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function ConveyorMarker({
  path,
  speed = 0,
  thickness,
  width,
  onProgress, // 🔴 expose progress
}) {
  const ref = useRef();
  const progress = useRef(0);

  useFrame((_, delta) => {
    if (!path || speed === 0) return;

    progress.current = (progress.current - speed * delta * 0.0249 + 1) % 1;

    const p = path.getPointAt(progress.current);
    const t = path.getTangentAt(progress.current);

    ref.current.position.copy(p);
    ref.current.rotation.z = Math.atan2(t.y, t.x);

    onProgress?.(progress.current); // 🔴 send to parent
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[2, thickness * 2, width * 0.8]} />
      <meshStandardMaterial
        color="red"
        emissive="red"
        emissiveIntensity={0.6}
      />
    </mesh>
  );
}
