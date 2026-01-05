"use client";

import { ConveyorBeltScene } from "./ConveyorBeltScene";
import { useEffect, useRef, useState } from "react";

export const ConveyorBeltContainer = ({ faults = [] }) => {
  const containerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Notification state
  const [newFaultCount, setNewFaultCount] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const prevFaultsLength = useRef(faults.length);

  // Detect newly added faults
 useEffect(() => {
  const currentLength = faults.length;
  const previousLength = prevFaultsLength.current;

  if (currentLength > previousLength) {
    const addedCount = currentLength - previousLength;

    setNewFaultCount(addedCount);
    setShowNotification(true);

    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 3500);

    // ✅ Update reference immediately
    prevFaultsLength.current = currentLength;

    return () => clearTimeout(timer);
  }

  // Still update in case faults reset or stay same
  prevFaultsLength.current = currentLength;
}, [faults.length]);


  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <div className="relative w-full h-full rounded-2xl overflow-hidden bg-base-300">
        <button
          onClick={toggleFullscreen}
          className="absolute top-6 left-6 z-10 px-4 py-2 bg-white text-black text-sm font-medium rounded-lg shadow-lg hover:bg-gray-100 transition"
        >
          {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        </button>

        <ConveyorBeltScene faults={faults} />

    {/* Smaller, subtle bottom notification */}
{/* Smaller, subtle bottom notification */}
<div
  className={`absolute left-1/2 -translate-x-1/2 z-20 pointer-events-none
    transition-all duration-500 ease-out
    ${showNotification ? "bottom-8 opacity-100" : "-bottom-20 opacity-0"}`}
>
  <div
    className="
      bg-gray-900/90 backdrop-blur-md
      text-white font-semibold
      text-[10px] sm:text-sm
      px-2 py-1 sm:px-5 sm:py-3
      rounded-full shadow-xl border border-gray-700
      flex items-center gap-1.5 sm:gap-2.5
    "
  >
    <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 bg-red-500 rounded-full animate-pulse" />
    <span>
      {newFaultCount} New Fault{newFaultCount > 1 ? "s" : ""} Detected
    </span>
  </div>
</div>


      </div>
    </div>
  );
};
