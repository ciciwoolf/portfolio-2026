'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Button from '@/components/ui/Button';
import ModelAttribution from '@/components/ui/ModelAttribution';
import siteConfig from '@/content/site-config.json';
import { useTheme } from '@/components/theme/ThemeProvider';

const Scene = dynamic(() => import('@/components/3d/Scene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-surface to-surface-hover rounded-xl border border-border">
      <p className="text-foreground-muted">Loading 3D Scene...</p>
    </div>
  ),
});

export default function Hero() {
  const { theme } = useTheme();
  const scrollToWork = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="min-h-screen flex items-center bg-gradient-to-b from-background to-background-secondary pt-16 relative"
      style={{ touchAction: 'pan-y' }}
    >
      {/* Desktop/Tablet: Full-width 3D Scene Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
        className="hidden md:block absolute inset-0 w-full h-full"
      >
        <Scene />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 w-full relative z-10">
        {/* Desktop: Split layout, Mobile: Column */}
        <div className="flex flex-col md:grid md:grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center lg:text-left px-6 sm:px-0 lg:pl-12 w-full pt-16 md:pt-0"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground"
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
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg sm:text-xl md:text-2xl text-foreground-secondary mb-8"
              style={
                theme === 'light'
                  ? {
                      textShadow: '0 1px 0 rgba(255, 255, 255, 0.8), 0 2px 0 rgba(255, 255, 255, 0.6), 0 3px 0 rgba(255, 255, 255, 0.4), 0 4px 6px rgba(255, 255, 255, 0.2), 0 6px 12px rgba(255, 255, 255, 0.15)',
                    }
                  : undefined
              }
            >
              {siteConfig.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Button onClick={scrollToWork} size="lg">
                {siteConfig.hero.ctaText}
              </Button>
            </motion.div>
          </motion.div>

          {/* Mobile: 3D Scene, Desktop: Spacer */}
          <div className="h-[350px] md:h-[500px] lg:h-[600px] w-full relative">
            {/* Mobile scene */}
            <div className="md:hidden w-full h-full">
              <Scene />
              {/* Mobile-only invisible overlay to enable scrolling over 3D canvas */}
              <div
                className="absolute top-0 left-0 w-full h-full z-10 pointer-events-auto bg-transparent"
                style={{ touchAction: 'pan-y' }}
              />
            </div>
            {/* Attribution Info Button */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 z-20">
              <ModelAttribution />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
