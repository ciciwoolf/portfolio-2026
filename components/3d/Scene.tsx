'use client'

import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { Suspense, useState, useEffect } from 'react'
import Model from './Model'
import Lights from './Lights'

export default function Scene() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={45} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={!isMobile}
        autoRotate={true}
        autoRotateSpeed={0.5}
        minDistance={10}
        maxDistance={20}
      />
      <Suspense fallback={null}>
        <group scale={isMobile ? 0.7 : 1}>
          <Model />
          <Lights />
        </group>
      </Suspense>
    </Canvas>
  )
}
