# Portfolio V2 Implementation - Session 2: Core Layout & UI Components

## Context

I'm building a new portfolio website (complete rewrite) using Next.js 15 + React 19 + TypeScript. This is **Session 2** of the implementation.

**Project Location:** `/Users/ciciwoolf/Dev/portfolio-v2`

**Implementation Plan:** `/Users/ciciwoolf/Dev/3d-portfolio/docs/changes/portfolio-rewrite/plans/2026-08-16-portfolio-v2-plan.md`

## Progress So Far

### ✅ Session 1 Completed (Tasks 1-5)
- Next.js 15 project initialized with TypeScript
- Dependencies installed: Three.js, Framer Motion, OpenAI SDK, Vitest, Playwright
- TypeScript strict mode configured
- Environment variables set up (.env.example, .env.local)
- Tailwind CSS v4 configured with design token placeholders

### Current State
- Clean Next.js installation with all dependencies
- No custom components yet
- Default Next.js starter page still showing
- All foundation infrastructure ready

## Tasks for This Session (Tasks 6-20)

### Task 6: Set up testing infrastructure
- Create `vitest.config.ts`
- Create `test/setup.ts`
- Create `playwright.config.ts`
- Add test scripts to package.json

### Tasks 7-11: Core Layout & Routing
- Task 7: Create root layout with metadata (`app/layout.tsx`)
- Task 8: Create Navigation component with tests
- Task 9: Create Footer component
- Task 10: Create home page structure with section placeholders
- Task 11: Create blog routes scaffold (`app/blog/page.tsx`, `app/blog/[slug]/page.tsx`)

### Tasks 12-15: UI Components
- Task 12: Create Button component with variants
- Task 13: Create Card component
- Task 14: Create Section wrapper with Framer Motion animations
- Task 15: Create TypeScript types (`lib/types.ts`)

### Tasks 16-20: Content Sections
- Task 16: Create Hero section with placeholder for 3D
- Task 17: Migrate projects data and create Projects section
- Task 18: Migrate skills data and create Skills section
- Task 19: Create Resume section with download
- Task 20: Update home page with all sections

## Important Notes

1. **Follow the plan exactly** - Each task in the plan has complete, copy-paste ready code
2. **TDD where applicable** - Tasks 8, 21, 26, 30 include tests
3. **Commit after each task** - Use the exact commit messages from the plan
4. **3D Model is placeholder** - Task 16 uses dynamic import for 3D scene (we'll implement the actual 3D in Session 3)
5. **Content migration** - Tasks 17-18 copy data from old portfolio at `/Users/ciciwoolf/Dev/3d-portfolio`

## Migration Sources

When you reach tasks 17-18, migrate content from the old portfolio:

**Projects data:** `/Users/ciciwoolf/Dev/3d-portfolio/src/constants/index.ts`
**Skills data:** `/Users/ciciwoolf/Dev/3d-portfolio/src/constants/index.ts`
**Background data (for AI):** `/Users/ciciwoolf/Dev/3d-portfolio/src/data/background.json`

## Success Criteria

By the end of this session, the portfolio should:
- ✅ Have complete navigation and footer
- ✅ Show all main sections (Hero, Projects, Skills, Resume)
- ✅ Have working scroll animations with Framer Motion
- ✅ Have reusable UI components (Button, Card, Section)
- ✅ Have blog routes scaffolded (empty for now)
- ✅ Have basic tests for Navigation component
- ✅ Build without errors (`npm run build`)

## How to Start

1. Navigate to project: `cd /Users/ciciwoolf/Dev/portfolio-v2`
2. Read the plan: `cat /Users/ciciwoolf/Dev/3d-portfolio/docs/changes/portfolio-rewrite/plans/2026-08-16-portfolio-v2-plan.md`
3. Start with Task 6 and work through Task 20
4. Test after completing all tasks: `npm run dev` and visit `http://localhost:3000`

## Next Session Preview

**Session 3 (Tasks 21-24):** 3D Scene Integration - will implement the Three.js scene with placeholder cube
**Session 4 (Tasks 25-31):** AI Chat Feature - server-side API route, chat components, OpenAI integration
**Session 5 (Tasks 32-39):** Blog scaffold, testing, documentation, deployment

---

**Let's implement Tasks 6-20 to build the core layout and UI components!**
