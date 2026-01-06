"use client";

import { useRef } from "react";
import { XRSpace, PointerCursorModel, useTouchPointer, useXRInputSourceStateContext } from "@react-three/xr";
import { Object3D } from "three";
import { Suspense } from "react";

export function HandPointer() {
  // ✅ Hook inside component
  const state = useXRInputSourceStateContext("hand");
  const middleFingerRef = useRef<Object3D>(null);
  const pointer = useTouchPointer(middleFingerRef, state);

  if (!state?.inputSource?.hand) return null;

  return (
    <>
      <XRSpace ref={middleFingerRef} space={state.inputSource.hand.get("middle-finger-tip")} />
      <Suspense>
        <PointerCursorModel pointer={pointer} opacity={0.5} />
      </Suspense>
    </>
  );
}
