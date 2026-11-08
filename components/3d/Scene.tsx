'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Suspense, useRef, useState, type ReactNode } from 'react';
import Model from './Model';
import Lights from './Lights';
import Particles from './Particles';
import { useTheme } from '../theme/ThemeProvider';
import { useViewport } from '@/lib/constants/viewports';

function CameraController({
  viewport,
  zoomEnabled,
}: {
  viewport: string;
  zoomEnabled: boolean;
}) {
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
      // Zoom and drag only while hovering the room, so the page scrolls elsewhere
      enableZoom={zoomEnabled}
      enablePan={false}
      enableRotate={viewport !== 'mobile' && zoomEnabled}
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

const CAMERA_DISTANCE = 15;
const CAMERA_FOV = 45;
// Canvas height the laptop/desktop positions were tuned against
const REFERENCE_CANVAS_HEIGHT = 900;

/**
 * Hero text lives in a fixed-width (max-w-7xl) container, but 3D units grow
 * with the canvas. On canvases taller than the reference, shrink the scene so
 * the room keeps the same pixel size and offset and stays beside the text.
 */
function FitToHeroContainer({
  enabled,
  children,
}: {
  enabled: boolean;
  children: ReactNode;
}) {
  const { height } = useThree((state) => state.size);
  const unitsVisible =
    2 * CAMERA_DISTANCE * Math.tan(((CAMERA_FOV / 2) * Math.PI) / 180);
  const pxPerUnit = height / unitsVisible;
  const referencePxPerUnit = REFERENCE_CANVAS_HEIGHT / unitsVisible;
  const scale = enabled ? Math.min(1, referencePxPerUnit / pxPerUnit) : 1;

  return <group scale={scale}>{children}</group>;
}

export default function Scene() {
  const viewport = useViewport();
  const { theme } = useTheme();
  const [modelHovered, setModelHovered] = useState(false);

  return (
    <Canvas
      shadows
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      <PerspectiveCamera
        makeDefault
        position={viewport === 'mobile' ? [0, 0, 13] : [0, 0, CAMERA_DISTANCE]}
        fov={CAMERA_FOV}
      />
      <CameraController viewport={viewport} zoomEnabled={modelHovered} />
      <Suspense fallback={null}>
        <FitToHeroContainer
          enabled={viewport === 'laptop' || viewport === 'desktop'}
        >
          <group
            position={
              viewport === 'mobile'
                ? [0, 0, 0]
                : viewport === 'tablet'
                  ? [0, -3, 0]
                  : [7, 0, 0]
            }
          >
            <Particles
              count={
                viewport === 'mobile'
                  ? 80
                  : viewport === 'tablet'
                    ? 120
                    : viewport === 'laptop'
                      ? 140
                      : 140
              }
            />
          </group>
          <group
            scale={
              viewport === 'mobile'
                ? 1.0
                : viewport === 'tablet'
                  ? 0.55
                  : viewport === 'laptop'
                    ? 0.85
                    : 0.75
            }
            position={
              viewport === 'mobile'
                ? [0, 1.2, 0]
                : viewport === 'tablet'
                  ? [0, -2.5, 0] // Single-column layout: centered below the text
                  : viewport === 'laptop'
                    ? [4, -0.15, 0]
                    : [4.5, 0, 0]
            }
            rotation={[0, -Math.PI / 2, 0]}
          >
            <group
              onPointerOver={() => setModelHovered(true)}
              onPointerOut={() => setModelHovered(false)}
            >
              <Model />
            </group>
            <Lights />
          </group>
        </FitToHeroContainer>
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
