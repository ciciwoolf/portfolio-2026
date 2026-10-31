# Hero load, tooltip copy, and CTA animation

**Keywords:** hero, hydration, pop-in, theme-flash, webgl, cta, tooltip

## Overview

Three fixes to the portfolio home page: remove the hero pop-in on a cold mobile load, fix the tooltip copy, and restore the original CTA hover animation.

## Decisions made

- **The mobile problem is pop-in, not layout shift.** Chromium measured CLS of 0–0.0016. iOS Safari showed about 5 seconds with no hero text, which then appeared at once with the 3D scene.
- **Hero entrance moves to CSS.** The animation runs from the server-rendered HTML, so text no longer waits for hydration. This replaces Framer Motion in `Hero`.
- **ThemeProvider always renders its context provider.** Swapping a fragment for a provider after mount remounted the whole page.
- **The theme is set before first paint** by an inline script in the layout, following `preventing-flash-before-hydration.md` in the Next docs.
- **One 3D scene mounts**, chosen by the `md` breakpoint, and it starts after the browser is idle.
- **The CTA is a `cta` Button variant** using theme tokens. Rest state keeps the current accent button; hover reveals the on-accent background as the circle shrinks.
- **Touch screens have no hover**, so the arrow stays visible there, as in the original.

## Technical design

- `app/globals.css`: `hero-enter` and `hero-fade` animations and `cta-*` styles, with reduced-motion handling.
- `components/sections/Hero.tsx`: CSS entrance, single deferred scene slot, transparent placeholder.
- `components/theme/ThemeProvider.tsx`: stable tree. `app/layout.tsx`: inline theme script.
- `lib/constants/viewports.ts`: `useViewport` reads the real width on first render. It is only used by the client-only `Scene`.
- `components/ui/Button.tsx`: `cta` variant. `content/site-config.json`: real apostrophe.

## Integration points

- **Entry Points:** home page hero only.
- **Registrations Required:** None.
- **Documentation Updates:** None.
- **Architectural Decisions:** None.
- **Knowledge Impact:** None.

## Success criteria

- When the page loads cold in iOS Safari, hero text shall appear before the 3D scene mounts.
- When a stored or default theme is dark, the page shall not paint white first.
- When the page loads on a phone, the system shall create one canvas.
- When hydration completes, the system shall not remount page content.
- The tooltip shall read "Blender's MCP server".
- When the CTA is hovered, the circle shall shrink to the right, the text shall slide, and the arrow shall drop in.
- If reduced motion is requested, then the system shall not play the entrance or CTA motion.

## Implementation order

1. Tooltip copy.
2. ThemeProvider and inline theme script.
3. Hero entrance and single deferred scene.
4. CTA variant.
5. Verify in iOS Safari and Chromium.
