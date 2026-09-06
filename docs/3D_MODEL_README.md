# 3D Office Room Model - Quick Start

This document provides a quick overview of the 3D model setup for your portfolio.

## 📁 What's Been Set Up

### Files Created/Modified
```
portfolio-v2/
├── public/
│   └── models/
│       └── room.glb (806KB) ← Copied from old portfolio
├── components/
│   └── 3d/
│       └── Model.tsx ← Updated to load GLB file
└── docs/
    ├── BLENDER_TUTORIAL.md ← Comprehensive Blender guide
    ├── 3D_MODEL_STATUS.md ← Project status & decisions
    └── 3D_MODEL_README.md ← This file
```

### Code Changes
**File:** `components/3d/Model.tsx`
- ✅ Now loads GLB model using `useGLTF` from `@react-three/drei`
- ✅ Model path: `/models/room.glb`
- ✅ Includes preloading for better performance
- ✅ Maintains rotation animation

## 🚀 What Works Right Now

The infrastructure is **100% ready**:
- ✅ GLB model file is in place
- ✅ React component configured to load it
- ✅ Model will render immediately when you run the app

**Test it:**
```bash
npm run dev
# Navigate to the page with the 3D scene
```

## ⚠️ What Needs Manual Work

The current GLB file is the old office model. You need to modify it in Blender to match your current office:

**See:** `docs/BLENDER_TUTORIAL.md` for step-by-step instructions

**Priority tasks:**
1. Delete radiator and file cabinets
2. Add cat hammock with cats
3. Add teal blanket to chair
4. Position monitor elevated
5. Adjust laptop screen to VS Code aesthetic

**See:** `docs/3D_MODEL_STATUS.md` for complete checklist

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| **BLENDER_TUTORIAL.md** | Beginner-friendly guide to modifying the model in Blender |
| **3D_MODEL_STATUS.md** | Project status, decisions made, and detailed checklist |
| **3D_MODEL_README.md** | This quick reference |

## ⚡ Quick Commands

```bash
# Run development server
npm run dev

# Check file size
ls -lh public/models/room.glb

# Build production (to verify no errors)
npm run build
```

## 🎯 Design Requirements

- **File size:** < 2MB (current: 806KB ✓)
- **Polygon count:** < 50k triangles
- **Textures:** 1024x1024 max
- **Camera:** Works at [0, 0, 15] with 45° FOV

## 🎨 Color Theme

Apply these colors in Blender:
- **Purple:** #9b87f5
- **Mint:** #7DD3C0
- **Cyan:** #06b6d4

## 🔗 Resources

- [Blender Download](https://www.blender.org/download/)
- [Sketchfab Free Models](https://sketchfab.com/feed) (for cats, props)
- [@react-three/drei Docs](https://github.com/pmndrs/drei)

---

**Next step:** Install Blender and follow `docs/BLENDER_TUTORIAL.md`! 🚀
