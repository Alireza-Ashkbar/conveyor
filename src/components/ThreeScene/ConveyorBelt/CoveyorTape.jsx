"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ConveyorMarker } from "./ConveyorMarker";
import { TextLabel } from "../TextLabel";
import { MemsecoLogo3D } from "../MemsecoLogo3D";
import { ConveyorControls3D } from "../ConveyorControls3D";

export function ConveyorTape({
  position = [0, 0, 0],
  length = 400,
  width = 10,
  thickness = 2.5,
  speed = 0,
  color = "#7c7c7cff",
  faults = [],
  onFaultClick,
}) {
  const textureRef = useRef();
  const [redProgress, setRedProgress] = useState(0);
  const [hoveredFault, setHoveredFault] = useState(null);

  const MAX_FAULTS = 100;

  // Pre-allocate fault slots for performance
  const faultSlots = useRef(
    Array.from({ length: MAX_FAULTS }, (_, i) => ({
      id: i,
      active: false,
      fault: null,
    }))
  ).current;

  // Assign faults to slots whenever the faults array changes
  useMemo(() => {
    faults.forEach((fault, index) => {
      if (index < MAX_FAULTS) {
        faultSlots[index].active = true;
        faultSlots[index].fault = fault;
      }
    });

    // Deactivate unused slots
    for (let i = faults.length; i < MAX_FAULTS; i++) {
      faultSlots[i].active = false;
      faultSlots[i].fault = null;
    }
  }, [faults]);

  const path = useMemo(() => {
    const points = [
      new THREE.Vector3(-408, 60, 0),
      new THREE.Vector3(-408, 67, 0),
      new THREE.Vector3(-250, 40, 0),
      new THREE.Vector3(-150, 22, 0),
      new THREE.Vector3(-50, 8, 0),
      new THREE.Vector3(0, 7, 0),
      new THREE.Vector3(50, 6, 0),
      new THREE.Vector3(150, 6, 0),
      new THREE.Vector3(250, 6, 0),
      new THREE.Vector3(350, 7, 0),
      new THREE.Vector3(450, 7, 0),
      new THREE.Vector3(500, 6, 0),
      new THREE.Vector3(500, 3, 0),
      new THREE.Vector3(450, 0, 0),
      new THREE.Vector3(350, 0, 0),
      new THREE.Vector3(250, 0, 0),
      new THREE.Vector3(150, 0, 0),
      new THREE.Vector3(50, 0, 0),
      new THREE.Vector3(-50, 0, 0),
      new THREE.Vector3(-60, 0, 0),
      new THREE.Vector3(-100, 5, 0),
      new THREE.Vector3(-200, 22, 0),
      new THREE.Vector3(-250, 31, 0),
      new THREE.Vector3(-300, 40, 0),
      new THREE.Vector3(-400, 58, 0),
    ];

    const curve = new THREE.CatmullRomCurve3(points, true);
    curve.curveType = "centripetal";
    return curve;
  }, []);

  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-width / 2, -thickness / 2);
    s.lineTo(width / 2, -thickness / 2);
    s.lineTo(width / 2, thickness / 2);
    s.lineTo(-width / 2, thickness / 2);
    s.closePath();
    return s;
  }, [width, thickness]);

  const geometry = useMemo(
    () =>
      new THREE.ExtrudeGeometry(shape, {
        steps: 1000,
        bevelEnabled: false,
        extrudePath: path,
      }),
    [shape, path]
  );

  const texture = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 1024;
    c.height = 128;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#1f1f1f";
    ctx.fillRect(0, 0, 1024, 128);
    const t = new THREE.CanvasTexture(c);
    t.wrapS = THREE.RepeatWrapping;
    t.repeat.set(12, 1);
    return t;
  }, []);

  textureRef.current = texture;

  useFrame((_, delta) => {
    if (textureRef.current && speed !== 0) {
      textureRef.current.offset.x += speed * delta * 0.5;
    }
  });

  return (
    <group position={position} rotation={[0, Math.PI / 2, 0]}>
      <TextLabel text={"CV016"} position={[10, 90, 0]} fontSize={15} />

      <mesh geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial
          map={texture}
          color={color}
          side={THREE.DoubleSide}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
      <ConveyorMarker
        path={path}
        speed={speed}
        thickness={thickness}
        width={width}
        onProgress={(p) => setRedProgress(p)}
      />

      {/* Render fault markers */}
      {faultSlots.map((slot) => {
        if (!slot.active || !slot.fault) return null;

        const fault = slot.fault;
        const baseOffset = fault.distensToStartPoint / length;
        const progress = (redProgress + baseOffset + 1) % 1;

        const p = path.getPointAt(progress);
        const t = path.getTangentAt(progress);

        const up = new THREE.Vector3(0, 1, 0);
        const quaternion = new THREE.Quaternion().setFromUnitVectors(
          up,
          t.clone().cross(up).cross(t).normalize()
        );

        const isHovered = hoveredFault === fault.id;

        return (
          <group
            key={slot.id}
            position={p}
            quaternion={quaternion}
            scale={isHovered ? 1.15 : 1}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredFault(fault.id);
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              setHoveredFault(null);
              document.body.style.cursor = "default";
            }}
            onClick={() => onFaultClick?.(fault)}
          >
            <mesh>
              <boxGeometry args={[3, thickness * 1.3, width * 0.9]} />
              <meshStandardMaterial
                color={isHovered ? "orange" : getSeverityColor(fault.severity)}
                emissive={
                  isHovered ? "orange" : getSeverityColor(fault.severity)
                }
                emissiveIntensity={isHovered ? 1.5 : 1.2}
              />
            </mesh>

            <pointLight
              intensity={isHovered ? 5 : 1.5}
              distance={isHovered ? 20 : 12}
              color={getSeverityColor(fault.severity)}
              visible={isHovered}
            />

            <TextLabel
              text={String(fault.id)}
              color="red"
              position={[0, 4, 0]}
              fontSize={4}
            />
          </group>
        );
      })}
    </group>
  );
}

function getSeverityColor(severity) {
  switch (severity) {
    case "Critical":
    case "High":
      return "#ff0000"; // Red
    case "Medium":
      return "#ff9800"; // Orange
    case "Low":
      return "#ffff00"; // Yellow
    default:
      return "#ffffff"; // White fallback
  }
}