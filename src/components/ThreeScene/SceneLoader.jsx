"use client";

import { Html, useProgress } from "@react-three/drei";

export function SceneLoader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div
        className="
          flex flex-col items-center justify-center gap-4
          bg-gray-900/95 backdrop-blur-lg
          border border-gray-700 shadow-2xl
          rounded-xl sm:rounded-2xl

          px-6 py-5
          sm:px-10 sm:py-8

          min-w-[220px]
          sm:min-w-[300px]
        "
      >
        {/* Progress text */}
        <div className="flex flex-col items-center gap-2 sm:gap-3">
          <p className="text-lg sm:text-2xl font-bold text-white tracking-wide">
            {Math.round(progress)}%
          </p>
          <p className="text-xs sm:text-sm text-gray-400 font-medium">
            Loading 3D scene...
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-[180px] sm:max-w-xs h-1.5 sm:h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="
              h-full
              bg-gradient-to-r from-primary to-blue-500
              transition-all duration-500 ease-out
              rounded-full
              shadow-lg shadow-primary/30
            "
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </Html>
  );
}
