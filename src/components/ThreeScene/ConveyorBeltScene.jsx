"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, GizmoHelper, GizmoViewport } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { XR, createXRStore, IfInSessionMode } from "@react-three/xr";

import { ConveyorBelt } from "./ConveyorBelt/ConveyorBelt";
import { ConveyorTape } from "./ConveyorBelt/CoveyorTape";
import { MemsecoLogo3D } from "./MemsecoLogo3D";
import { SceneLoader } from "./SceneLoader";

// Create XR store with explicit immersive-vr mode
const store = createXRStore({
  // Ensures it requests immersive VR (full headset takeover)
  // You can add more options like optionalFeatures: ['local-floor'] if needed later
});

export const ConveyorBeltScene = ({ faults = [] }) => {
  const [direction, setDirection] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedFault, setSelectedFault] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const conveyorSpeed = isPlaying ? direction : 0;

  useEffect(() => {
    const checkSize = () => setIsSmallScreen(window.innerWidth < 1024);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const togglePlayPause = () => setIsPlaying((prev) => !prev);
  const setForward = () => {
    setDirection(1);
    setIsPlaying(true);
  };
  const setBackward = () => {
    setDirection(-1);
    setIsPlaying(true);
  };

  const handleFaultClick = (fault) => setSelectedFault(fault);
  const closePopup = () => setSelectedFault(null);

  return (
    <div className="relative w-full h-full" style={{ background: "#111827" }}>
      {/* VR Button – positioned exactly top-right, only on desktop after load */}
      {isLoaded && !isSmallScreen && (
        <div className="absolute top-6 right-6 z-30">
          <button
            onClick={() => store.enterVR()}
            className="flex items-center gap-2 rounded-lg px-6 py-3 font-bold text-white bg-purple-600 hover:bg-purple-700 transition-all shadow-md"
          >
            🥽 Enter VR
          </button>
        </div>
      )}

      <Canvas
        camera={{
          fov: isSmallScreen ? 85 : 100,
          near: 1,
          far: 1000,
          position: isSmallScreen ? [-7, 45, -65] : [-10, 60, -80],
        }}
        className="absolute inset-0"
      >
        <Suspense fallback={<SceneLoader />}>
          <XR store={store}>
            {/* Controllers appear automatically in immersive VR on supported headsets */}

            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 5, 2]} intensity={0.7} />

            <GizmoHelper
              alignment={isSmallScreen ? "top-right" : "bottom-right"}
              margin={isSmallScreen ? [50, 60] : [80, 80]}
            >
              <GizmoViewport
                axisColors={["#ef4444", "#22c55e", "#3b82f6"]}
                labels={["W", "Top", "N"]}
                labelColor="#ffffff"
                hoverColor="#fbbf24"
                axisHeadScale={isSmallScreen ? 0.6 : 1.2}
              />
            </GizmoHelper>

            <ConveyorBelt scale={isSmallScreen ? 10 : 14} />
            

            <ConveyorTape
              position={[19, 15, 0]}
              length={isSmallScreen ? 210 : 245}
              width={isSmallScreen ? 9 : 12}
              speed={conveyorSpeed}
              faults={faults}
              onFaultClick={handleFaultClick}
            />

            <gridHelper
              args={[isSmallScreen ? 2800 : 4000, isSmallScreen ? 500 : 800, "#444444", "#222222"]}
              position={[0, 0, 0]}
            />

            {/* IMPORTANT: Disable OrbitControls in immersive VR to avoid conflicts */}
            <IfInSessionMode deny={["immersive-vr", "immersive-ar"]}>
              <OrbitControls makeDefault target={[0, 0, 0]} />
            </IfInSessionMode>

            <LoadedSignal setIsLoaded={setIsLoaded} />
          </XR>
        </Suspense>
      </Canvas>

      {/* Play / Pause / Direction Controls – unchanged */}
      {isLoaded && (
        <div
          className={`absolute z-20 flex ${
            isSmallScreen
              ? "bottom-3 left-1/2 -translate-x-1/2 flex-row gap-2"
              : "bottom-6 left-6 flex-col gap-3"
          }`}
        >
          <button
            onClick={setForward}
            className={`rounded-lg font-bold text-white transition-all shadow-md ${
              isPlaying && direction === 1
                ? "bg-gradient-to-r from-green-600 to-green-500 shadow-green-500/60"
                : "bg-gray-700 hover:bg-gray-600"
            } ${isSmallScreen ? "px-3.5 py-2 text-xs" : "px-6 py-3"}`}
          >
            ▶ {isSmallScreen ? "" : "Forward"}
          </button>

          <button
            onClick={togglePlayPause}
            className={`rounded-lg font-bold text-white transition-all shadow-md ${
              !isPlaying
                ? "bg-gradient-to-r from-blue-600 to-blue-500 shadow-blue-500/60"
                : "bg-gradient-to-r from-gray-600 to-gray-500"
            } ${isSmallScreen ? "px-3.5 py-2 text-xs" : "px-6 py-3"}`}
          >
            {isPlaying ? "⏹" : "▶"}
          </button>

          <button
            onClick={setBackward}
            className={`rounded-lg font-bold text-white transition-all shadow-md ${
              isPlaying && direction === -1
                ? "bg-gradient-to-r from-red-600 to-red-500 shadow-red-500/60"
                : "bg-gray-700 hover:bg-gray-600"
            } ${isSmallScreen ? "px-3.5 py-2 text-xs" : "px-6 py-3"}`}
          >
            ◀ {isSmallScreen ? "" : "Backward"}
          </button>
        </div>
      )}

      {/* Fault Popup – unchanged */}
      {selectedFault && (
        <>
          <div className="fixed inset-0 z-40 backdrop-blur-md bg-black/50" onClick={closePopup} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div
              className="bg-gray-900/95 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-lg border border-gray-700 pointer-events-auto max-h-[92vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ... your popup content ... */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

function LoadedSignal({ setIsLoaded }) {
  useEffect(() => {
    setIsLoaded(true);
  }, [setIsLoaded]);
  return null;
}

export default ConveyorBeltScene;