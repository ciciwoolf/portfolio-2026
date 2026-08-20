# Portfolio V2 Implementation - Session 3: 3D Scene Integration

## Context

I'm building a new portfolio website (complete rewrite) using Next.js 15 + React 19 + TypeScript. This is **Session 3** of the implementation.

**Project Location:** `/Users/ciciwoolf/Dev/portfolio-v2`

**Implementation Plan:** `/Users/ciciwoolf/Dev/3d-portfolio/docs/changes/portfolio-rewrite/plans/2026-08-16-portfolio-v2-plan.md`

## What's Already Done

**Session 1 (Tasks 1-5):** Foundation setup complete
**Session 2 (Tasks 6-20):** Core layout, UI components, and content sections complete

**Current State:**
- Complete portfolio layout with Navigation, Footer, Hero, Projects, Skills, Resume sections
- Hero section has dynamic import for Scene component (placeholder currently)
- All dependencies installed including Three.js, @react-three/fiber, @react-three/drei
- Ready for 3D integration

## Tasks for This Session (Tasks 21-24)

### Task 21: Create Scene wrapper component with tests

**Files:** `components/3d/Scene.tsx`, `components/3d/Scene.test.tsx`

**Create Scene wrapper:**
- Use `<Canvas>` from @react-three/fiber
- Add `<PerspectiveCamera>` at position [0, 0, 15], FOV 45
- Add `<OrbitControls>` with:
  - enableZoom: false
  - enablePan: false
  - autoRotate: true
  - autoRotateSpeed: 0.5
  - minDistance: 10, maxDistance: 20
- Wrap Model and Lights in Suspense with fallback null
- Client component ('use client')

**Create test:**
- Basic test to verify canvas element renders
- Use @testing-library/react

**Verify:** `npm test -- --run` passes

**Commit:** `feat(3d): create Scene wrapper with R3F Canvas`

### Task 22: Create Model placeholder component

**Files:** `components/3d/Model.tsx`, `public/models/.gitkeep`

**Create placeholder model:**
- Use `useFrame` hook for rotation animation
- Create box geometry (2x2x2)
- Use meshStandardMaterial with color #0ea5e9
- Rotate on Y-axis at 0.002 per frame
- Add TODO comment: "Replace with actual 3D model from design brainstorm"
- Expected: GLB file loaded with useGLTF hook (future)

**Create directory marker:**
- Empty `.gitkeep` file in `public/models/`

**Verify:** Dev server shows rotating blue cube in hero section

**Commit:** `feat(3d): add Model placeholder component (cube)`

### Task 23: Create Lights component

**Files:** `components/3d/Lights.tsx`

**Add three light sources:**
- `<ambientLight intensity={0.5} />`
- `<directionalLight position={[10, 10, 5]} intensity={1} />`
- `<pointLight position={[-10, -10, -5]} intensity={0.5} />`

**Verify:** 3D cube has proper illumination

**Commit:** `feat(3d): add Lights component for scene illumination`

### Task 24: Add responsive 3D behavior

**Files:** `components/3d/Scene.tsx` (update)

**Add mobile detection:**
- useState + useEffect to detect window.innerWidth <= 768
- Listen to resize events

**Mobile optimizations:**
- Disable OrbitControls rotation (`enableRotate={!isMobile}`)
- Scale model to 0.7 on mobile (`<group scale={isMobile ? 0.7 : 1}>`)
- Keep auto-rotate enabled on all devices

**Verify:**
- Desktop: Can drag to orbit, full size
- Mobile: Auto-rotate only, scaled to 70%

**Commit:** `feat(3d): add responsive behavior for mobile devices`

## Important: 3D Model Placeholder

⚠️ **The cube is intentional!** This is a placeholder for the actual 3D model.

**Design brainstorming prompt:** `/Users/ciciwoolf/Dev/3d-portfolio/docs/3d-model-brainstorm-prompt.md`

Once you complete the 3D model design brainstorming in a separate session:
1. Place GLB file in `public/models/`
2. Update `components/3d/Model.tsx`:
   - Import `useGLTF` from @react-three/drei
   - Load model: `const { scene } = useGLTF('/models/your-model.glb')`
   - Replace mesh with: `<primitive object={scene} />`
3. Adjust Lights as needed based on model appearance
4. Preload model: `useGLTF.preload('/models/your-model.glb')` at bottom of file

## Success Criteria

By the end of this session:
- ✅ Three.js Canvas renders in hero section
- ✅ Blue rotating cube visible as placeholder
- ✅ Scene auto-rotates continuously
- ✅ Desktop: User can drag to orbit camera
- ✅ Mobile: Rotation disabled, scene scaled to 70%
- ✅ Proper lighting (not too dark, not overexposed)
- ✅ Scene test passes
- ✅ No console errors
- ✅ Build succeeds: `npm run build`

## How to Execute

1. **Start:** `cd /Users/ciciwoolf/Dev/portfolio-v2`
2. **Read Tasks 21-24** in the implementation plan
3. **Follow exact code** from plan for each task
4. **Commit after each task** with exact commit messages
5. **Test continuously:**
   ```bash
   npm run dev
   # Visit http://localhost:3000
   # Check hero section for 3D scene
   # Resize browser to test mobile behavior
   npm test -- --run
   ```

## Troubleshooting

**If 3D scene doesn't show:**
- Check browser console for errors
- Verify Scene is dynamically imported with `ssr: false` in Hero.tsx
- Check Network tab for any failed asset loads

**If scene is black:**
- Check Lights component is imported in Scene.tsx
- Verify ambient light is present

**If rotation is jerky:**
- This is expected in dev mode with hot reload
- Test in production build: `npm run build && npm start`

## Reference: Old Portfolio 3D Implementation

For inspiration (but don't copy - we're building fresh):
- Old Scene: `/Users/ciciwoolf/Dev/3d-portfolio/src/components/HeroModels/HeroExperience.tsx`
- Old Model: `/Users/ciciwoolf/Dev/3d-portfolio/src/components/HeroModels/Room.tsx`
- Old Lights: `/Users/ciciwoolf/Dev/3d-portfolio/src/components/HeroModels/HeroLights.tsx`

## Next Session

**Session 4 (Tasks 25-31):** AI Chat Feature - Server-side API route, chat UI, OpenAI integration

---

**Let's add the 3D scene!**
