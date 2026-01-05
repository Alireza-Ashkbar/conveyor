import { useGLTF } from "@react-three/drei";

export function MemsecoLogo3D({
  position = [600, 150,-500],
  baseScale = 200,
  flipX = true, // new prop for easy toggling
}) {
  const { scene } = useGLTF("/models/memsecoLogo.glb");

  const xScale = flipX ? -baseScale : baseScale;

  return (
    <group rotation={[0, Math.PI / 2, 0]}>
      <primitive
        object={scene}
        position={position}
        scale={[xScale, baseScale, baseScale]}
      />
    </group>
  );
}