"use client";

import { useMemo } from "react";
import * as THREE from "three";

/**
 * ConveyorTexture
 * Generates a moving canvas texture with 1-meter tick marks
 * @param {Object} path - The CatmullRomCurve3 (closed loop) of your conveyor
 * @param {number} [tickColor="#aaaaaa"] - Color of regular 1m ticks
 * @param {number} [majorTickColor="#ffffff"] - Color of 5m ticks
 * @param {number} [majorEvery=5] - Major tick every N meters
 * @returns {THREE.CanvasTexture}
 */
export function ConveyorTexture({
  path,
  tickColor = "#aaaaaa",
  majorTickColor = "#ffffff",
  majorEvery = 5,
}) {
  return useMemo(() => {
    if (!path || !path.getLength) return new THREE.CanvasTexture();

    const totalLength = path.getLength(); // Full loop length in Three.js units

    // Canvas setup - wide enough for good resolution
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");

    // Dark rubber background
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Optional subtle longitudinal lines (grooves)
    ctx.strokeStyle = "#222222";
    ctx.lineWidth = 2;
    for (let i = 40; i < canvas.width; i += 80) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }

    // === 1-Meter Tick Marks ===
    const pixelsPerMeter = canvas.width / totalLength;
    const tickInterval = 1 * pixelsPerMeter; // every 1 meter

    ctx.lineCap = "round";

    for (let x = 0; x <= canvas.width + tickInterval; x += tickInterval) {
      const posX = Math.round(x);

      const meterIndex = Math.round(x / tickInterval);
      const isMajor = meterIndex > 0 && meterIndex % majorEvery === 0;

      // Thicker and brighter for major ticks (every 5m, 10m, etc.)
      if (isMajor) {
        ctx.strokeStyle = majorTickColor;
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(posX, canvas.height * 0.15);
        ctx.lineTo(posX, canvas.height * 0.85);
        ctx.stroke();
      } else {
        // Regular 1m tick
        ctx.strokeStyle = tickColor;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(posX, canvas.height * 0.25);
        ctx.lineTo(posX, canvas.height * 0.75);
        ctx.stroke();
      }
    }

    // Create texture
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.anisotropy = 16;

    // Critical: One full repeat = entire belt length → perfect 1m spacing
    texture.repeat.set(totalLength, 1);

    return texture;
  }, [path, tickColor, majorTickColor, majorEvery]);
}