import { useEffect, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import * as THREE from "three";

export const SvgPathTube = ({ svgUrl }) => {
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    const loader = new SVGLoader();
    loader.load(svgUrl, (data) => {
      const extractedPaths = data.paths.map((path) =>
        path.subPaths.map((subPath) =>
          subPath.getPoints().map((p) => new THREE.Vector3(p.x / 100, p.y / 100, 0))
        )
      ).flat(); // همه مسیرها را فلت کن
      setPaths(extractedPaths);
    });
  }, [svgUrl]);

  return (
    <>
      {paths.map((pathData, i) => (
        <mesh key={i}>
          <tubeGeometry args={[new THREE.CatmullRomCurve3(pathData), 100, 0.1, 10, false]} />
          <meshStandardMaterial color="red" />
        </mesh>
      ))}
    </>
  );
};
