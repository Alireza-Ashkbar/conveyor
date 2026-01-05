"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, GizmoHelper, GizmoViewport } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";

import { ConveyorBelt } from "./ConveyorBelt/ConveyorBelt";
import { ConveyorTape } from "./ConveyorBelt/CoveyorTape";
import { MemsecoLogo3D } from "./MemsecoLogo3D";
import { SceneLoader } from "./SceneLoader";

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

          <LoadedSignal setIsLoaded={setIsLoaded} />
          <OrbitControls makeDefault target={[0, 0, 0]} />
        </Suspense>
      </Canvas>

      {/* Controls: Play/Pause + Direction + NEW VR Button */}
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

          {/* NEW VR Mode Button */}
          <Link
            href="/equipment-list/vr"
            className={`rounded-lg font-bold text-white transition-all shadow-md bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 shadow-purple-500/60 ${
              isSmallScreen ? "px-3.5 py-2 text-xs" : "px-6 py-3"
            } flex items-center justify-center gap-1.5`}
          >
            <span>🕶️</span> {isSmallScreen ? "" : "VR Mode"}
          </Link>
        </div>
      )}

      {/* Responsive Fault Popup */}
      {selectedFault && (
        <>
          <div
            className="fixed inset-0 z-40 backdrop-blur-md bg-black/50"
            onClick={closePopup}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div
              className="bg-gray-900/95 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-lg border border-gray-700 pointer-events-auto max-h-[92vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`p-5 ${isSmallScreen ? "sm:p-6" : "p-6"}`}>
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className={`font-bold text-white ${isSmallScreen ? "text-lg" : "text-xl"}`}>
                      {selectedFault.name}
                    </h3>
                    <p
                      className={`font-medium mt-1 ${
                        selectedFault.severity === "Critical"
                          ? "text-red-400"
                          : selectedFault.severity === "High"
                          ? "text-orange-400"
                          : "text-yellow-400"
                      } ${isSmallScreen ? "text-xs" : "text-sm"}`}
                    >
                      {selectedFault.severity} Alert
                    </p>
                  </div>
                  <button
                    onClick={closePopup}
                    className="text-gray-400 hover:text-white text-3xl leading-none"
                  >
                    ×
                  </button>
                </div>

                {/* Image */}
                {selectedFault.img && (
                  <img
                    src={selectedFault.img}
                    alt={selectedFault.name}
                    className={`w-full object-cover rounded-lg mb-4 shadow-md ${
                      isSmallScreen ? "h-40" : "h-48"
                    }`}
                  />
                )}

                {/* Info Grid */}
                <div className={`grid grid-cols-2 gap-3 text-gray-300 ${isSmallScreen ? "text-xs" : "text-sm"} mb-5`}>
                  <div>
                    <p className="text-gray-500">Distance from Start</p>
                    <p className={`font-semibold text-white ${isSmallScreen ? "text-base" : "text-lg"}`}>
                      {selectedFault.distensToStartPoint} m
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Marker Size</p>
                    <p className={`font-semibold text-yellow-400 ${isSmallScreen ? "text-base" : "text-lg"}`}>
                      {selectedFault.size}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Detected at</p>
                    <p className="font-medium text-white">{selectedFault.timeStamp}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Fault ID</p>
                    <p className="font-medium text-white">{selectedFault.id}</p>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-5">
                  <p className={`text-gray-500 ${isSmallScreen ? "text-xs" : "text-sm"}`}>Description</p>
                  <p className={`text-white mt-1 ${isSmallScreen ? "text-sm" : "text-base"}`}>
                    {selectedFault.description}
                  </p>
                </div>

                {/* Action Button */}
                <Link
                  href={`/equipment-list/${selectedFault.id}`}
                  className="w-full block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition shadow-md py-3"
                  style={{ padding: isSmallScreen ? "0.75rem" : "0.875rem" }}
                >
                  View More Details
                </Link>
              </div>
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