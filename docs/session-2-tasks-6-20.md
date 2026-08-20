# Portfolio V2 Implementation - Session 2: Testing Setup + Core Layout + UI Components + Content Sections

## Context

I'm building a new portfolio website (complete rewrite) using Next.js 15 + React 19 + TypeScript. This is **Session 2** of the implementation.

**Project Location:** `/Users/ciciwoolf/Dev/portfolio-v2`

**Implementation Plan:** `/Users/ciciwoolf/Dev/3d-portfolio/docs/changes/portfolio-rewrite/plans/2026-08-16-portfolio-v2-plan.md`

## What's Already Done (Session 1: Tasks 1-5)

✅ Next.js 15 project initialized with TypeScript
✅ All dependencies installed (Three.js, Framer Motion, OpenAI SDK, Vitest, Playwright)
✅ TypeScript strict mode configured
✅ Environment variables set up (.env.example, .env.local)
✅ Tailwind CSS v4 configured with design token placeholders

**Current State:** Clean Next.js installation with all dependencies, default starter page showing

## Tasks for This Session (Tasks 6-20)

### Group 1: Testing Infrastructure (Task 6)
- Create `vitest.config.ts` with React plugin and jsdom environment
- Create `test/setup.ts` for test-library/jest-dom
- Create `playwright.config.ts` for E2E tests
- Add test scripts to package.json: `"test": "vitest"`, `"test:e2e": "playwright test"`
- Verify: `npm test -- --run` passes with no tests

### Group 2: Core Layout & Routing (Tasks 7-11)
**Task 7:** Create `app/layout.tsx` with:
- Inter font from next/font/google
- SEO metadata (title, description, Open Graph)
- Root HTML structure

**Task 8:** Create `components/layout/Navigation.tsx` + tests:
- Sticky header with scroll behavior (transparent → backdrop blur at scrollY > 10)
- Nav links: Work, Skills, Blog, Resume
- Brand name link to home
- Test file: `components/layout/Navigation.test.tsx`

**Task 9:** Create `components/layout/Footer.tsx`:
- Dynamic copyright year
- Social links: LinkedIn, GitHub
- Proper ARIA labels and rel attributes

**Task 10:** Create `app/page.tsx` with section placeholders:
- Hero section (placeholder)
- Work section (placeholder)
- Skills section (placeholder)
- Resume section (placeholder)

**Task 11:** Create blog routes:
- `app/blog/page.tsx` - "Blog posts coming soon" message
- `app/blog/[slug]/page.tsx` - returns notFound() for now

### Group 3: UI Components (Tasks 12-15)
**Task 12:** Create `components/ui/Button.tsx`:
- Variants: primary, secondary, outline
- Sizes: sm, md, lg
- Focus rings and hover states

**Task 13:** Create `components/ui/Card.tsx`:
- White background, rounded corners, shadow
- Accepts children and optional className

**Task 14:** Create `components/ui/Section.tsx`:
- Framer Motion scroll animations
- useInView hook with margin: '-100px'
- Fade in from bottom (y: 50 → 0)

**Task 15:** Create `lib/types.ts`:
- Project interface
- Skill interface
- ChatMessage interface
- BackgroundData interface

### Group 4: Content Sections (Tasks 16-20)
**Task 16:** Create `components/sections/Hero.tsx`:
- Split layout: text left, 3D scene right
- Hero text with Framer Motion animations
- "See My Work" button
- Dynamic import for Scene component (ssr: false)

**Task 17:** Migrate projects + create `components/sections/Projects.tsx`:
- Create `content/projects.json` (migrate from old portfolio)
- Source: `/Users/ciciwoolf/Dev/3d-portfolio/src/constants/index.ts`
- Project cards with tech tags
- Links to live sites and GitHub

**Task 18:** Migrate skills + create `components/sections/Skills.tsx`:
- Create `lib/constants.ts` with skills array
- Source: `/Users/ciciwoolf/Dev/3d-portfolio/src/constants/index.ts`
- 4 skill cards with icons (emoji)

**Task 19:** Create `components/sections/ResumeSection.tsx`:
- Create placeholder `public/resume.pdf`
- Download button with proper download attribute
- Center-aligned section

**Task 20:** Update `app/page.tsx`:
- Replace all placeholders with actual section components
- Import: Hero, Projects, Skills, ResumeSection
- Remove placeholder divs

## Migration Reference

**Old Portfolio Location:** `/Users/ciciwoolf/Dev/3d-portfolio`

**Files to reference:**
- Projects data: `src/constants/index.ts` (see `digitalWorks` array)
- Skills data: `src/constants/index.ts` (see `skills` array)
- Hero content: `src/constants/index.ts` (see `heroContent`)

## Success Criteria

By the end of this session:
- ✅ Testing infrastructure set up (Vitest + Playwright)
- ✅ Navigation and Footer complete with tests passing
- ✅ All UI components created (Button, Card, Section)
- ✅ All content sections visible (Hero, Projects, Skills, Resume)
- ✅ Smooth scroll animations working
- ✅ Blog routes scaffolded
- ✅ `npm run dev` shows complete portfolio layout
- ✅ `npm test -- --run` passes
- ✅ `npx tsc --noEmit` passes with no errors

## How to Execute

1. **Start:** `cd /Users/ciciwoolf/Dev/portfolio-v2`
2. **Read the plan:** Open `../3d-portfolio/docs/changes/portfolio-rewrite/plans/2026-08-16-portfolio-v2-plan.md`
3. **Execute Tasks 6-20** following the exact code from the plan
4. **Commit after each task** using the commit messages from the plan
5. **Test as you go:** Run dev server frequently to verify changes
6. **Final verification:**
   ```bash
   npm run dev
   npm test -- --run
   npx tsc --noEmit
   npm run build
   ```

## Important Notes

- **3D Scene:** Task 16 uses dynamic import for the Scene component. The actual Scene will be built in Session 3 (Tasks 21-24). For now, it will show a loading placeholder.
- **Resume PDF:** Create an empty placeholder file at `public/resume.pdf` - you'll replace it with your actual resume later.
- **Design tokens:** Colors are placeholders. Final colors will come from the 3D design brainstorm.
- **Blog:** Routes are scaffolded but empty. MDX integration comes in Session 5 (Tasks 32-34).

## Next Sessions

**Session 3 (Tasks 21-24):** 3D Scene Integration
**Session 4 (Tasks 25-31):** AI Chat Feature
**Session 5 (Tasks 32-39):** Blog Scaffold, Testing, Documentation, Deployment

---

**Let's build the core layout and UI components!**
