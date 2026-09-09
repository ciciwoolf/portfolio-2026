'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../theme/ThemeProvider';

interface ParticlesProps {
  count?: number;
  maxCount?: number;
}

interface Particle {
  position: [number, number, number];
  speed: number;
  active: boolean;
  twinkleOffset: number; // Random offset for twinkle timing
  twinkleSpeed: number; // How fast this particle twinkles
}

// Seeded random number generator for deterministic particle positions
function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

// Create a star-shaped texture
function createStarTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  // Create radial gradient for soft glow
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
  gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.4)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  // Add star sparkle
  ctx.fillStyle = 'white';
  ctx.fillRect(30, 16, 4, 32); // Vertical line
  ctx.fillRect(16, 30, 32, 4); // Horizontal line

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function Particles({
  count = 200,
  maxCount = 200,
}: ParticlesProps) {
  const mesh = useRef<THREE.Points>(null);
  const { theme } = useTheme();

  // Create star texture (memoized)
  const texture = useMemo(() => createStarTexture(), []);

  // Determine particle color based on theme
  const particleColor = useMemo(() => {
    if (theme === 'dark') {
      return '#ffffff'; // White particles on dark background
    } else {
      return '#b5a4e2'; // Lighter purple for light theme
    }
  }, [theme]);

  // Calculate viewport dimensions at particle depth
  // Use moderate values for visible particle coverage
  const viewportBounds = useMemo(() => {
    return {
      width: 16, // Moderate width
      height: 16, // Moderate height
    };
  }, []);

  // Always use maxCount for buffer size, but only animate 'count' particles
  // FULL VIEWPORT: Spawn particles across entire calculated viewport
  const particles = useMemo((): Particle[] => {
    const temp: Particle[] = [];
    const rng = seededRandom(12345); // Use a fixed seed for deterministic generation
    for (let i = 0; i < maxCount; i++) {
      temp.push({
        position: [
          (rng() - 0.5) * viewportBounds.width,
          rng() * 20 + 5, // Extended vertical range
          (rng() - 0.5) * 10, // Shallow depth range (-5 to 5)
        ],
        speed: 0.005 + rng() * 0.001,
        active: i < count, // Only first 'count' particles are active
        twinkleOffset: rng() * Math.PI * 2, // Random starting phase
        twinkleSpeed: 0.5 + rng() * 1.5, // Random twinkle speed (0.5-2.0)
      });
    }
    return temp;
  }, [maxCount, count, viewportBounds]);

  useFrame((state) => {
    if (!mesh.current) return;
    if (!mesh.current.geometry.attributes.position) return;

    const positions = mesh.current.geometry.attributes.position
      .array as Float32Array;
    const colors = mesh.current.geometry.attributes.color?.array as
      | Float32Array
      | undefined;

    const time = state.clock.elapsedTime;
    const rng = seededRandom(Math.floor(time * 1000)); // Time-based seed for respawning

    for (let i = 0; i < maxCount; i++) {
      const particle = particles[i];
      if (!particle) continue;

      if (i < count) {
        // Only animate active particles
        const currentY = positions[i * 3 + 1];
        if (currentY === undefined) continue;
        let y = currentY;
        y -= particle.speed;

        // Respawn at top when particle falls below viewport
        if (y < -5) {
          y = rng() * 20 + 5;
          // Also randomize X and Z position for variety
          positions[i * 3] = (rng() - 0.5) * viewportBounds.width;
          positions[i * 3 + 2] = (rng() - 0.5) * 10; // Shallow depth range
        }

        positions[i * 3 + 1] = y;

        // Twinkle effect: vary brightness using vertex colors
        if (colors) {
          const twinkle = Math.sin(
            time * particle.twinkleSpeed + particle.twinkleOffset,
          );
          const normalizedTwinkle = (twinkle + 1) / 2; // Convert from -1,1 to 0,1
          // Brightness varies between 0.4 and 1.0
          const brightness = 0.4 + normalizedTwinkle * 0.6;

          // Set RGB to brightness (will be multiplied with material color)
          colors[i * 3] = brightness; // R
          colors[i * 3 + 1] = brightness; // G
          colors[i * 3 + 2] = brightness; // B
        }
      } else {
        // Hide inactive particles by moving them far away
        positions[i * 3] = 1000;
        positions[i * 3 + 1] = 1000;
        positions[i * 3 + 2] = 1000;
        if (colors) {
          colors[i * 3] = 0;
          colors[i * 3 + 1] = 0;
          colors[i * 3 + 2] = 0;
        }
      }
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
    if (colors && mesh.current.geometry.attributes.color) {
      mesh.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  // Always create buffer with maxCount size
  const positions = useMemo(() => {
    const pos = new Float32Array(maxCount * 3);
    particles.forEach((p, i) => {
      if (i < count) {
        pos[i * 3] = p.position[0];
        pos[i * 3 + 1] = p.position[1];
        pos[i * 3 + 2] = p.position[2];
      } else {
        // Hide inactive particles
        pos[i * 3] = 1000;
        pos[i * 3 + 1] = 1000;
        pos[i * 3 + 2] = 1000;
      }
    });
    return pos;
  }, [maxCount, count, particles]);

  const colors = useMemo(() => {
    const col = new Float32Array(maxCount * 3);
    particles.forEach((_, i) => {
      if (i < count) {
        // Initial brightness (1.0 = full brightness)
        col[i * 3] = 1.0; // R
        col[i * 3 + 1] = 1.0; // G
        col[i * 3 + 2] = 1.0; // B
      } else {
        col[i * 3] = 0;
        col[i * 3 + 1] = 0;
        col[i * 3 + 2] = 0;
      }
    });
    return col;
  }, [maxCount, count, particles]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  return (
    <points ref={mesh} geometry={geometry}>
      <pointsMaterial
        map={texture}
        color={particleColor}
        size={theme === 'dark' ? 0.45 : 0.9}
        sizeAttenuation={true}
        transparent
        opacity={1.0}
        depthWrite={false}
        toneMapped={false}
        blending={THREE.AdditiveBlending}
        vertexColors={true}
      />
    </points>
  );
}
