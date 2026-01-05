'use client'

import { Canvas } from '@react-three/fiber'
import { XR, createXRStore } from '@react-three/xr'
import { Conveyor } from '../components/Conveyor'

const store = createXRStore({
  offerSession: 'inline', // fallback for desktop / Cardboard
})

export default function Home() {
  return (
    <>
      <button
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '12px 24px',
          fontSize: '18px',
          background: 'black',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          zIndex: 10,
        }}
        onClick={async () => {
          if (navigator.xr) {
            const supported = await navigator.xr.isSessionSupported('immersive-vr')
            store.enterXR(supported ? 'immersive-vr' : 'inline')
          } else {
            store.enterXR('inline')
          }
        }}
      >
        Enter VR
      </button>

      <Canvas camera={{ position: [0, 1.6, 3], fov: 60 }}>
        <XR store={store}>
          <ambientLight intensity={1} />
          <Conveyor position={[0, 0, 0]} scale={1} />
        </XR>
      </Canvas>
    </>
  )
}
