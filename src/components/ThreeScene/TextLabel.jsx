import { Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export const TextLabel = ({ position = [0, 0, 0], text ,fontSize=5,color="white"}) => {
  const ref = useRef();
  const { camera } = useThree();

  useFrame(() => {
    if (!ref.current) return;

    // Get parent world quaternion
    const parentQuat = new THREE.Quaternion();
    ref.current.parent.getWorldQuaternion(parentQuat);

    // Invert parent rotation
    parentQuat.invert();

    // Apply camera rotation in local space
    ref.current.quaternion.copy(parentQuat.multiply(camera.quaternion));
  });

  return (
    <Text
      ref={ref}
      position={position}
      fontSize={fontSize}
      fontWeight="bold"
      color={color}
      anchorX="center"
      anchorY="middle"
      depthTest={false}
      renderOrder={1000}
    >
      {text}
    </Text>
  );
};
