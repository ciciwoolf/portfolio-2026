import { useGLTF } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

// Office room 3D model - matches actual office setup
// See docs/BLENDER_TUTORIAL.md for modification instructions
export default function Model() {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/models/room.glb')

  // Enable shadows on all objects in the model
  useEffect(() => {
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true    // Object casts shadows
        object.receiveShadow = true // Object receives shadows
      }
    })
  }, [scene])

  // Gentle rotation for visual interest - DISABLED for lighting work
  // useFrame(() => {
  //   if (groupRef.current) {
  //     groupRef.current.rotation.y += 0.002
  //   }
  // })

  return (
    <primitive
      ref={groupRef}
      object={scene}
      position={[-1, -3, 0]} // Centered horizontally, positioned down
      rotation={[0, Math.PI * 0.15, 0]} // Slight initial rotation for better angle
    />
  )
}

// Preload the model for better performance
useGLTF.preload('/models/room.glb')
