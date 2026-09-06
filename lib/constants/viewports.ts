import { useState, useEffect } from 'react';

// Viewport breakpoints (in pixels)
export const BREAKPOINTS = {
  mobile: 640,    // 0-639: Mobile
  tablet: 1024,   // 640-1023: Tablet
  laptop: 1600,   // 1024-1599: Laptop
  desktop: 1600,  // 1600+: Large Desktop
} as const;

// Viewport type
export type Viewport = 'mobile' | 'tablet' | 'laptop' | 'desktop';

/**
 * Hook to detect and track current viewport size
 * Returns the current viewport based on window width
 */
export function useViewport(): Viewport {
  const [viewport, setViewport] = useState<Viewport>('desktop');

  useEffect(() => {
    const checkViewport = () => {
      const width = window.innerWidth;

      if (width < BREAKPOINTS.mobile) {
        setViewport('mobile');
      } else if (width < BREAKPOINTS.tablet) {
        setViewport('tablet');
      } else if (width < BREAKPOINTS.laptop) {
        setViewport('laptop');
      } else {
        setViewport('desktop');
      }
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);

    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  return viewport;
}
