"use client";

import { useState } from "react";
import { ConveyorTape } from "./ConveyorTape";

export default function ConveyorController() {
  const [running, setRunning] = useState(true);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = reverse

  const speed = running ? 0.6 * direction : 0;

  return (
    <>
      {/* 🧠 UI CONTROLS */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          display: "flex",
          gap: "10px",
          zIndex: 10,
        }}
      >
        {/* START / STOP */}
        <button
          onClick={() => setRunning((r) => !r)}
          style={{ padding: "8px 16px" }}
        >
          {running ? "Stop" : "Start"}
        </button>

        {/* DIRECTION */}
        <button
          onClick={() => setDirection((d) => -d)}
          style={{ padding: "8px 16px" }}
        >
          Reverse
        </button>
      </div>

      {/* 🚀 CONVEYOR */}
      <ConveyorTape speed={speed} />
    </>
  );
}
