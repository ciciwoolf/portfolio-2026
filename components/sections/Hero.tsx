'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Button from '@/components/ui/Button';
import ModelAttribution from '@/components/ui/ModelAttribution';
import siteConfig from '@/content/site-config.json';
import { useTheme } from '@/components/theme/ThemeProvider';

function SceneLoading() {
  return (
    <div className="w-full h-full flex items-center justify-center md:hidden">
      <p className="text-foreground-muted">Loading 3D Scene...</p>
    </div>
  );
}

const Scene = dynamic(() => import('@/components/3d/Scene'), {
  ssr: false,
  loading: SceneLoading,
});

type SceneSlot = 'mobile' | 'desktop';

// Picks the one scene slot for this screen, waiting for the hero text to paint first
function useSceneSlot() {
  const [slot, setSlot] = useState<SceneSlot | null>(null);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)');
    const updateSlot = () => setSlot(desktop.matches ? 'desktop' : 'mobile');

    // Safari has no requestIdleCallback
    const idleId = window.requestIdleCallback?.(updateSlot, { timeout: 1500 });
    const timeoutId =
      idleId === undefined ? window.setTimeout(updateSlot, 300) : undefined;

    desktop.addEventListener('change', updateSlot);

    return () => {
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      window.clearTimeout(timeoutId);
      desktop.removeEventListener('change', updateSlot);
    };
  }, []);

  return slot;
}

export default function Hero() {
  const { theme } = useTheme();
  const sceneSlot = useSceneSlot();
  const scrollToWork = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="min-h-screen flex items-center bg-gradient-to-b from-background to-background-secondary pt-16 lg:pt-20 2xl:pt-24 relative"
      style={{ touchAction: 'pan-y' }}
    >
      {/* Desktop/Tablet: Full-width 3D Scene Background */}
      {sceneSlot === 'desktop' && (
        <div className="hero-fade hidden md:block absolute inset-0 w-full h-full">
          <Scene />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 w-full relative z-10">
        {/* Desktop: Split layout, Mobile: Column */}
        <div className="flex flex-col md:grid md:grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left px-6 sm:px-0 lg:pl-12 w-full pt-16 md:pt-0">
            <h1
              className="hero-enter text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground"
              style={
                theme === 'light'
                  ? {
                      textShadow: '0 1px 0 rgba(255, 255, 255, 0.9), 0 2px 0 rgba(255, 255, 255, 0.7), 0 3px 0 rgba(255, 255, 255, 0.5), 0 4px 8px rgba(255, 255, 255, 0.3), 0 8px 16px rgba(255, 255, 255, 0.2)',
                    }
                  : undefined
              }
            >
              {siteConfig.hero.greeting}{' '}
              <span className="text-accent font-name">
                {siteConfig.personal.name}
              </span>
            </h1>

            <p
              className="hero-enter hero-enter-delay-1 text-lg sm:text-xl md:text-2xl text-foreground-secondary mb-8"
              style={
                theme === 'light'
                  ? {
                      textShadow: '0 1px 0 rgba(255, 255, 255, 0.8), 0 2px 0 rgba(255, 255, 255, 0.6), 0 3px 0 rgba(255, 255, 255, 0.4), 0 4px 6px rgba(255, 255, 255, 0.2), 0 6px 12px rgba(255, 255, 255, 0.15)',
                    }
                  : undefined
              }
            >
              {siteConfig.hero.subtitle}
            </p>

            <div className="hero-enter hero-enter-delay-2">
              <Button
                onClick={scrollToWork}
                variant="cta"
                size="lg"
                className="w-56 h-12 md:w-64 md:h-14 lg:text-xl 2xl:w-72 2xl:h-16 2xl:text-2xl"
              >
                {siteConfig.hero.ctaText}
              </Button>
            </div>
          </div>

          {/* Mobile: 3D Scene, Desktop: Spacer */}
          <div className="h-[400px] md:h-[500px] lg:h-[600px] w-screen md:w-full relative -ml-4 -mr-4 sm:-ml-6 sm:-mr-6 md:ml-0 md:mr-0">
            {/* Mobile scene */}
            <div className="md:hidden w-full h-full">
              {sceneSlot === 'mobile' ? <Scene /> : <SceneLoading />}
              {/* Mobile-only invisible overlay to enable scrolling over 3D canvas */}
              <div
                className="absolute top-0 left-0 w-full h-full z-10 pointer-events-auto bg-transparent"
                style={{ touchAction: 'pan-y' }}
              />
            </div>
            {/* Attribution Info Button */}
            <div className="absolute bottom-6 right-6 z-20">
              <ModelAttribution />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
