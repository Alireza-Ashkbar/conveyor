"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import React, { useRef, useMemo } from "react";
import * as THREE from "three";

const pathData = [
  [-5, 0, 0],
  [0, 0, 0],
  [5, 0, 0],
  [10, 0, 0],
  [10, 5, 0],
];

const ThreeScene = ({
  tubeRadius = 1,
  segments = 100,
  radiusSegments = 20,
  closed = false,
}) => {
  const pipeRef = useRef(null);
  const meshRef = useRef();

  const pathData2 = [
    [-5, 2, 0], // لوله دوم را کمی بالاتر قرار می‌دهیم
    [0, 2, 0],
    [5, 2, 0],
    [10, 2, 0],
    [10, 7, 0],
  ];

  const path2 = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      pathData2.map((p) => new THREE.Vector3(...p))
    );
  }, [pathData2]);

  const geometry2 = useMemo(() => {
    return new THREE.TubeGeometry(
      path2,
      segments,
      tubeRadius,
      radiusSegments,
      closed
    );
  }, [path2, segments, tubeRadius, radiusSegments, closed]);

  const path = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      pathData.map((p) => new THREE.Vector3(...p))
    );
  }, [pathData]);

  const geometry = useMemo(() => {
    return new THREE.TubeGeometry(
      path,
      segments,
      tubeRadius,
      radiusSegments,
      closed
    );
  }, [path, segments, tubeRadius, radiusSegments, closed]);

  //   useFrame(() => {
  // meshRef.current.rotation.x += 0.01;
  // meshRef.current.rotation.y += 0.01;
  //   });

  //   // مسیر لوله عمودی
  //   const verticalPath = new THREE.CurvePath();
  //   verticalPath.add(
  //     new THREE.LineCurve3(new THREE.Vector3(2, 2, 5), new THREE.Vector3(1, 5, 0))
  //   );

  //   // مسیر لوله افقی
  //   const horizontalPath = new THREE.CurvePath();
  //   horizontalPath.add(
  //     new THREE.LineCurve3(new THREE.Vector3(2, 2, 2), new THREE.Vector3(5, 2, 2))
  //   );

  //   // مسیر لوله مورب
  //   const diagonalPath = new THREE.CurvePath();
  //   diagonalPath.add(
  //     new THREE.LineCurve3(new THREE.Vector3(0, 1, 0), new THREE.Vector3(5, 5, 1))
  //   );

  return (
    <>
      {/* نورپردازی */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 5, 3]} intensity={0.5} />
      {/* یک مکعب نمونه */}
      <mesh ref={pipeRef} position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 6]} />
        <meshStandardMaterial color="royalblue" />
      </mesh>
      <mesh geometry={geometry} ref={meshRef}>
        <meshBasicMaterial color="orange" wireframe />
      </mesh>
      <mesh geometry={geometry2}>
        <meshBasicMaterial color="green" wireframe />
      </mesh>
      ;{/* قابلیت چرخش و زوم */}
      <OrbitControls />
    </>
  );
};

export default ThreeScene;
