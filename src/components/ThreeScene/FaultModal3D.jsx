import { Text } from "@react-three/drei";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export function FaultModal3D({ fault, onClose }) {
  const ref = useRef();
  const { camera } = useThree();

  useFrame(() => {
    if (!ref.current || !fault) return;

    // Always place modal in front of camera
    const distance = 2; // 2 units in front
    const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
    ref.current.position.copy(camera.position.clone().add(dir.multiplyScalar(distance)));

    // Face the camera
    ref.current.quaternion.copy(camera.quaternion);
  });

  if (!fault) return null;

  const severityColor =
    fault.severity === "Critical"
      ? "#f87171"
      : fault.severity === "High"
      ? "#fb923c"
      : "#facc15";

  return (
    <group ref={ref} position={[-18, 42, -500]}>
      {/* Background panel */}
      <mesh>
        <planeGeometry args={[1.6, 1]} />
        <meshStandardMaterial color="#111827" />
      </mesh>

      {/* Fault Name */}
      <Text
        position={[0, 0.35, 0.01]}
        fontSize={0.1}
        color="white"
        anchorX="center"
      >
        {fault.name}
      </Text>

      {/* Severity */}
      <Text position={[0, 0.22, 0.01]} fontSize={0.07} color={severityColor}>
        {fault.severity || "Unknown"} Alert
      </Text>

      {/* Distance */}
      <Text position={[0, 0.05, 0.01]} fontSize={0.06} color="#d1d5db">
        Distance: {fault.distensToStartPoint || "-"} m
      </Text>

      {/* Marker Size */}
      <Text position={[0, -0.05, 0.01]} fontSize={0.06} color="#facc15">
        Marker Size: {fault.size || "-"}
      </Text>

      {/* Fault ID */}
      <Text position={[0, -0.15, 0.01]} fontSize={0.05} color="#9ca3af">
        ID: {fault.id || "-"}
      </Text>

      {/* Description */}
      {fault.description && (
        <Text
          position={[0, -0.32, 0.01]}
          fontSize={0.05}
          maxWidth={1.4}
          textAlign="center"
          color="#e5e7eb"
        >
          {fault.description}
        </Text>
      )}

      {/* Close Button */}
      <Text
        position={[0.7, 0.45, 0.01]}
        fontSize={0.07}
        color="red"
        anchorX="center"
        anchorY="middle"
        onClick={onClose}
      >
        ×
      </Text>
    </group>
  );
}
