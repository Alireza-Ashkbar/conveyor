import { createXRStore } from "@react-three/xr";
import { CustomHand } from "./HandPointer";

export const xrStore = createXRStore({
  hand: CustomHand,
});
