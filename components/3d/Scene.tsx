'use client';

import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Suspense } from 'react';
import Model from './Model';
import Lights from './Lights';
import Particles from './Particles';
import { useTheme } from '../theme/ThemeProvider';
import { useViewport } from '@/lib/constants/viewports';

export default function Scene() {
  const viewport = useViewport();
  const { theme } = useTheme();

  return (
    <Canvas
      shadows
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={45} />
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        enableRotate={viewport !== 'mobile'}
        autoRotate={true}
        autoRotateSpeed={0.5}
        minDistance={10}
        maxDistance={20}
        touches={{
          ONE: 0, // Disable one-finger touch rotation
          TWO: 0, // Disable two-finger touch pan/zoom
        }}
      />
      <Suspense fallback={null}>
        <group position={viewport === 'mobile' ? [0, 0, 0] : [7, 0, 0]}>
          <Particles
            count={
              viewport === 'mobile'
                ? 80
                : viewport === 'tablet'
                  ? 120
                  : viewport === 'laptop'
                    ? 150
                    : 180
            }
          />
        </group>
        <group
          scale={
            viewport === 'mobile'
              ? 0.69
              : viewport === 'tablet'
                ? 0.9
                : viewport === 'laptop'
                  ? 1.0
                  : 0.9
          }
          position={
            viewport === 'mobile'
              ? [0, 1, 0]
              : viewport === 'tablet'
                ? [6, -1, 0]
                : viewport === 'laptop'
                  ? [8, -0.3, 0]
                  : [7, 0, 0]
          }
        >
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
  );
}
