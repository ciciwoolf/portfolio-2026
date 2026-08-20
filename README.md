# Portfolio V2

A modern portfolio website built with Next.js 15, featuring responsive design, interactive 3D elements, and AI-powered chat capabilities.

## Project Structure

```
portfolio-v2/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── blog/
│       ├── page.tsx
│       └── [slug]/
│           └── page.tsx
├── components/
│   ├── 3d/
│   │   └── Scene.tsx
│   ├── layout/
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   └── ResumeSection.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Section.tsx
├── content/
│   ├── site-config.json
│   └── projects.json
├── lib/
│   ├── types.ts
│   └── constants.ts
├── public/
│   └── resume.pdf
└── test/
    └── setup.ts
```

## Technologies

### Core
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS v4

### 3D & Animation
- Three.js
- @react-three/fiber
- @react-three/drei
- Framer Motion

### AI
- OpenAI SDK

### Testing
- Vitest
- Playwright
- @testing-library/react

### Content Management (Planned)
- Sanity CMS (Free tier)
