import { useGLTF } from '@react-three/drei'

export function Conveyor(props) {
  const { scene } = useGLTF('/models/conveyor.glb')
  return <primitive object={scene} {...props} />
}

useGLTF.preload('/models/conveyor.glb')
