'use client'
import { Canvas } from '@react-three/fiber'
import { XR, createXRStore, IfInSessionMode } from '@react-three/xr'
import { OrbitControls } from '@react-three/drei'
import { Conveyor } from './Conveyor'

const store = createXRStore({
  offerSession: 'immersive-vr',
})

export default function App() {
  return (
    <>
      {/* ENTER VR BUTTON */}
      <button
        style={{
          position: 'absolute',
          zIndex: 10,
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
        }}
        onClick={() => store.enterVR({ emulate: {
    headset: {
      position: [0, 1, 0],
    },
    controller: {
      left: {
        position: [-0.2, 1, -0.3],
      },
      right: {
        position: [0.2, 1, -0.3],
      },
    },
  },
  offerSession: 'immersive-vr',
})}
      >
        Enter VR
      </button>

      <Canvas camera={{ position: [0, 1.6, 3], fov: 60 }}>
        <XR store={store}>
          {/* Desktop controls only when NOT in VR */}
          <IfInSessionMode deny={['inline']}>
            <OrbitControls />
          </IfInSessionMode>

          {/* Basic light (required to see model) */}
          <ambientLight intensity={1} />

          {/* Your model */}
          <Conveyor scale={1} position={[0, 0, 0]} />
        </XR>
      </Canvas>
    </>
  )
}
