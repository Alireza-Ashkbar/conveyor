import { Text } from "@react-three/drei";
import { useRef, useState } from "react";

function Button3D({ label, position, color, onClick }) {
  const ref = useRef();

  return (
    <group position={position}>
      <mesh
        ref={ref}
        onClick={onClick}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "default")}
      >
        <boxGeometry args={[0.6, 0.25, 0.1]} />
        <meshStandardMaterial color={color} />
      </mesh>

      <Text
        position={[0, 0, 0.06]}
        fontSize={0.09}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

export function ConveyorControls3D({
  onForward,
  onBackward,
  onStart,
  onStop,
}) {
  const [isRunning, setIsRunning] = useState(false);

  // Toggle middle button (Start/Stop)
  const toggleStartStop = () => {
    if (isRunning) {
      onStop?.();
      setIsRunning(false);
    } else {
      onStart?.();
      setIsRunning(true);
    }
  };

  // Forward button click
  const handleForward = () => {
    onForward?.();
    setIsRunning(true); // automatically switch middle button to Stop
  };

  // Backward button click
  const handleBackward = () => {
    onBackward?.();
    setIsRunning(true); // automatically switch middle button to Stop
  };

  return (
    <group position={[-18, 42, -50]} rotation={[0, Math.PI / -2, 0]}>
      {/* Panel base */}
      <mesh position={[0, 0, -0.08]}>
        <boxGeometry args={[3, 1.4, 0.1]} />
        <meshStandardMaterial color="#111827" />
      </mesh>

      {/* Backward Button */}
      <Button3D
        label="⏪ Back"
        position={[-0.9, 0.3, 0]}
        color="#2563eb"
        onClick={handleBackward}
      />

      {/* Middle Start/Stop Button */}
      <Button3D
        label={isRunning ? "⏸ Stop" : "▶ Start"}
        position={[0, 0.3, 0]}
        color={isRunning ? "#dc2626" : "#16a34a"}
        onClick={toggleStartStop}
      />

      {/* Forward Button */}
      <Button3D
        label="⏩ Fwd"
        position={[0.9, 0.3, 0]}
        color="#f59e0b"
        onClick={handleForward}
      />
    </group>
  );
}
