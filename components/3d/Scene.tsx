'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Suspense, useRef } from 'react';
import Model from './Model';
import Lights from './Lights';
import Particles from './Particles';
import { useTheme } from '../theme/ThemeProvider';
import { useViewport } from '@/lib/constants/viewports';

function CameraController({ viewport }: { viewport: string }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controlsRef = useRef<any>(null);

  useFrame((state) => {
    if (controlsRef.current && viewport !== 'mobile') {
      const time = state.clock.elapsedTime;
      // Oscillates between 0° and 60° to keep model away from text on the left
      const angle = (Math.sin(time * 0.1) * 0.5 + 0.5) * (Math.PI / 3);
      controlsRef.current.setAzimuthalAngle(angle);
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={true}
      enablePan={false}
      enableRotate={viewport !== 'mobile'}
      autoRotate={false}
      minAzimuthAngle={0}
      maxAzimuthAngle={Math.PI / 3}
      minDistance={10}
      maxDistance={20}
      touches={{
        ONE: 0, // Disable one-finger touch rotation
        TWO: 0, // Disable two-finger touch pan/zoom
      }}
    />
  );
}

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
      <CameraController viewport={viewport} />
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
                ? 0.75
                : viewport === 'laptop'
                  ? 0.85
                  : 0.75
          }
          position={
            viewport === 'mobile'
              ? [0, 1, 0]
              : viewport === 'tablet'
                ? [6, -0.5, 0]
                : viewport === 'laptop'
                  ? [8, -0.15, 0]
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
