'use client'

import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import Model from './Model'
import Lights from './Lights'

export default function Scene() {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={45} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={true}
        autoRotateSpeed={0.5}
        minDistance={10}
        maxDistance={20}
      />
      <Suspense fallback={null}>
        <Model />
        <Lights />
      </Suspense>
    </Canvas>
  )
}
