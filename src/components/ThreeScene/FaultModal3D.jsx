import { Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

export function FaultModal3D({ fault, onClose }) {
  const ref = useRef();
  const { camera } = useThree();
  const fixedQuaternion = useRef(new THREE.Quaternion());

  useEffect(() => {
    fixedQuaternion.current.copy(camera.quaternion);
  }, [camera]);

  useFrame(() => {
    if (!ref.current || !fault) return;

    const distance = 6;
    const forward = new THREE.Vector3(0, 0, -1)
      .applyQuaternion(camera.quaternion)
      .normalize();

    ref.current.position.copy(
      camera.position.clone().add(forward.multiplyScalar(distance))
    );

    ref.current.quaternion.copy(fixedQuaternion.current);
  });

  if (!fault) return null;

  return (
    <group ref={ref} scale={70}>
      <mesh>
        <planeGeometry args={[1.6, 1]} />
        <meshStandardMaterial color="#111827" />
      </mesh>

      <Text position={[0, 0.3, 0.01]} fontSize={0.1} color="white">
        {fault.name}
      </Text>

      <Text position={[0, 0.1, 0.01]} fontSize={0.07} color="orange">
        {fault.severity}
      </Text>

      <Text
        position={[0.7, 0.45, 0.01]}
        fontSize={0.08}
        color="red"
        onClick={onClose}
      >
        ×
      </Text>
    </group>
  );
}
