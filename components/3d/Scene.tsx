'use client'

import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Suspense, useState, useEffect } from 'react'
import Model from './Model'
import Lights from './Lights'
import Particles from './Particles'
import { useTheme } from '../theme/ThemeProvider'

export default function Scene() {
  const [isMobile, setIsMobile] = useState(false)
  const { theme } = useTheme()

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
        <group position={[0, 0, -10]}>
          <Particles count={isMobile ? 30 : 80} />
        </group>
        <group scale={isMobile ? 0.7 : 1}>
          <Model />
          <Lights />
        </group>
      </Suspense>
      <EffectComposer>
        <Bloom
          intensity={theme === 'dark' ? 1.5 : 0.8}
          luminanceThreshold={theme === 'dark' ? 0.2 : 0.4}
          luminanceSmoothing={0.9}
          radius={theme === 'dark' ? 0.8 : 0.6}
        />
      </EffectComposer>
    </Canvas>
  )
}
