function VRPointer({ controller }) {
  return (
    <mesh position={[0, 0, -1]} scale={[0.02, 0.02, 1]}>
      <cylinderGeometry args={[0.01, 0.01, 1, 8]} />
      <meshStandardMaterial color="red" emissive="red" emissiveIntensity={2} />
    </mesh>
  );
}
export {VRPointer}