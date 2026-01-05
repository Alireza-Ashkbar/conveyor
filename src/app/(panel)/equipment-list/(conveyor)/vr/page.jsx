"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { XR, createXRStore, XROrigin } from "@react-three/xr";
import ConveyorBeltSceneVR from "@/components/ThreeScene/ConveyorBeltSceneVR";

const store = createXRStore({
  offerSession: "immersive-vr",
});

export default function VRPage() {
  return (
    <div className="fixed inset-0 bg-black">
      {/* ENTER VR BUTTON (Mobile-friendly) */}
      <button
        onClick={() => store.enterVR()}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50
                   px-6 py-4 text-lg font-bold text-white bg-purple-600
                   rounded-xl shadow-xl"
      >
        🥽 Enter VR
      </button>

      <Canvas
        shadows
        camera={{ position: [0, 1.6, 4], fov: 70 }}
        className="absolute inset-0"
      >
        <Suspense fallback={null}>
          <XR store={store}>
            <XROrigin position={[0, 0, 0]}>
              <ConveyorBeltSceneVR />
            </XROrigin>
          </XR>
        </Suspense>
      </Canvas>
    </div>
  );
}
