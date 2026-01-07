"use client";

import dynamic from "next/dynamic";

const ConveyorBeltSceneVR = dynamic(
  () => import("@/components/ThreeScene/ConveyorBeltSceneVR"),
  { ssr: false } // ⬅️ THIS FIXES document error
);

export default function Page() {
  return <ConveyorBeltSceneVR />;
}
