import { useState, useEffect } from 'react';

// Viewport breakpoints (in pixels)
export const BREAKPOINTS = {
  mobile: 768,    // 0-767: Mobile (matches Tailwind md, where the hero layout changes)
  tablet: 1024,   // 768-1023: Tablet
  laptop: 1600,   // 1024-1599: Laptop
  desktop: 1600,  // 1600+: Large Desktop
} as const;

// Viewport type
export type Viewport = 'mobile' | 'tablet' | 'laptop' | 'desktop';

function getViewport(): Viewport {
  if (typeof window === 'undefined') return 'desktop';

  const width = window.innerWidth;

  if (width < BREAKPOINTS.mobile) return 'mobile';
  if (width < BREAKPOINTS.tablet) return 'tablet';
  if (width < BREAKPOINTS.laptop) return 'laptop';
  return 'desktop';
}

/**
 * Hook to detect and track current viewport size
 * Returns the current viewport based on window width
 */
export function useViewport(): Viewport {
  const [viewport, setViewport] = useState<Viewport>(getViewport);

  useEffect(() => {
    const checkViewport = () => setViewport(getViewport());

    window.addEventListener('resize', checkViewport);

    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  return viewport;
}
