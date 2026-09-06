# Blender Tutorial: Modifying the Office Room 3D Model

This comprehensive guide will help you modify the office room 3D model to match your actual workspace. **No prior Blender experience required!**

## Table of Contents
1. [Installing Blender](#installing-blender)
2. [Blender Interface Basics](#blender-interface-basics)
3. [Opening Your GLB File](#opening-your-glb-file)
4. [Navigation Controls](#navigation-controls)
5. [Model Modification Steps](#model-modification-steps)
6. [Color & Material Adjustments](#color--material-adjustments)
7. [Optimization & Export](#optimization--export)
8. [Troubleshooting](#troubleshooting)

---

## Installing Blender

### macOS Installation
1. Visit https://www.blender.org/download/
2. Click **Download Blender** (it's free and open-source!)
3. Open the downloaded `.dmg` file
4. Drag Blender to your Applications folder
5. Launch Blender from Applications
   - First time: Right-click → Open (to bypass macOS security)
   - Click "Open" when prompted

**Alternative (using Homebrew):**
```bash
brew install --cask blender
```

---

## Blender Interface Basics

When you first open Blender, you'll see several areas:

### Main Window Areas
```
┌─────────────────────────────────────────────────┐
│ Menu Bar (File, Edit, etc.)                     │
├───────────────┬─────────────────────┬───────────┤
│               │                     │           │
│  Outliner     │   3D Viewport       │Properties │
│  (Scene tree) │   (Main work area)  │ Panel     │
│               │                     │           │
├───────────────┴─────────────────────┴───────────┤
│ Timeline (animation - not needed for us)        │
└─────────────────────────────────────────────────┘
```

### Key Areas for Our Work:
- **3D Viewport** (center): Where you see and manipulate your model
- **Outliner** (top-right): Lists all objects in your scene
- **Properties Panel** (right): Adjust materials, colors, and settings
- **Menu Bar** (top): File operations, import/export

---

## Opening Your GLB File

### Method 1: Import into New Project
1. Launch Blender
2. Click **File** → **New** → **General** (to start fresh)
3. Delete the default objects:
   - Press `A` to select all
   - Press `X` → Delete (confirm)
4. Import your model:
   - **File** → **Import** → **glTF 2.0 (.glb/.gltf)**
   - Navigate to: `/Users/ciciwoolf/Dev/portfolio-v2/public/models/room.glb`
   - Click **Import glTF 2.0**

### Method 2: Direct Open
1. Launch Blender
2. **File** → **Open**
3. Navigate to: `/Users/ciciwoolf/Dev/portfolio-v2/public/models/room.glb`
4. Click **Open**

> **Note:** The model should now appear in the 3D viewport. If you don't see it, try pressing `Home` to frame all objects.

---

## Navigation Controls

Mastering navigation is crucial! Here are the essential controls:

### Mouse Navigation
| Action | Control |
|--------|---------|
| **Rotate View** | Middle Mouse Button (drag) |
| **Pan View** | Shift + Middle Mouse Button (drag) |
| **Zoom** | Scroll Wheel |
| **Frame Selected** | Press `.` (numpad) or `Home` |

### Trackpad Navigation (macOS)
| Action | Control |
|--------|---------|
| **Rotate View** | Two-finger drag |
| **Pan View** | Shift + Two-finger drag |
| **Zoom** | Pinch gesture |

### Selection
- **Left Click**: Select object
- **Shift + Left Click**: Add to selection
- **Alt/Option + A**: Deselect all

### View Modes
Press number keys on the **numpad** (or enable virtual numpad in preferences):
- `1`: Front view
- `3`: Right side view
- `7`: Top view
- `0`: Camera view

**No numpad?** Go to **Edit** → **Preferences** → **Input** → Enable "Emulate Numpad"

---

## Model Modification Steps

Follow these steps to transform the old office model into your current setup.

### Step 1: Inspect Current Model

1. **View what's in the scene:**
   - Look at the **Outliner** (top-right panel)
   - Expand the scene tree to see all objects
   - Common objects might be named: "Desk", "Chair", "Monitor", etc.

2. **Isolate objects to understand the model:**
   - Click an object in the Outliner
   - Press `/` to isolate it (press `/` again to show all)
   - This helps you identify what's what

### Step 2: Delete Unwanted Elements

**Priority: Remove radiator and file cabinets**

1. **Find the object in the Outliner:**
   - Look for objects named "Radiator", "FileCabinet", "Cabinet", etc.
   - Names might vary, so look for suspicious geometry

2. **Select and delete:**
   - Click the object name in the Outliner
   - Press `X` → **Delete** → Confirm
   - Or: Right-click object → **Delete**

3. **If you can't find by name:**
   - Click objects in the 3D viewport (they'll highlight in Outliner)
   - When you identify the radiator/cabinets, select and delete

### Step 3: Identify Reusable Elements

**What can likely be reused from the old model:**
- ✅ Desk (if it's wooden/similar)
- ✅ Chair (can be modified)
- ✅ Window structure
- ✅ Room walls/floor
- ❓ Monitor (check size/style)

**How to check:**
1. Select each object
2. Look at its position, size, and appearance
3. Decide: Keep, Modify, or Replace

### Step 4: Add New Elements

You'll need to add these elements. Here's how for each priority:

#### Priority 0: Critical Elements

**A. Adding the Cat Hammock**
This is custom geometry, so we have two options:

**Option 1: Basic Placeholder** (Quick)
1. Add a plane: **Add** → **Mesh** → **Plane**
2. Press `S` to scale, type `0.5`, press Enter
3. Press `G` then `Z` to move vertically, type `1.2`, press Enter
4. Duplicate for second level: `Shift + D`, then `Z`, type `0.8`, Enter
5. Add simple shape for cats (use spheres)
   - **Add** → **Mesh** → **UV Sphere**
   - Scale and position on hammocks

**Option 2: Download Free Model** (Better)
1. Visit https://www.turbosquid.com or https://sketchfab.com
2. Search "cat hammock" or model cats separately
3. Download free GLB/OBJ files
4. Import: **File** → **Import** → choose format
5. Scale and position in your scene

**B. Modify Laptop to Show VS Code**

1. Select the laptop object (if it exists)
2. Look for the screen face/material
3. In **Properties Panel** → **Material Properties** tab (sphere icon)
4. You can:
   - Option A: Change the screen color to dark (like VS Code theme)
   - Option B: Add an image texture (screenshot of VS Code):
     1. Take a screenshot of VS Code
     2. In Material Properties, find the screen material
     3. Base Color → Click circle → **Image Texture**
     4. **Open** → select your VS Code screenshot

**C. Adjust Blanket on Chair**

1. Select the chair object
2. If there's already a blanket, select it
3. If not, add a simple cloth:
   - **Add** → **Mesh** → **Plane**
   - Scale it: `S`, type `1.5`, Enter
   - Position on chair: `G` to move
   - Add subdivisions for more realistic draping:
     - Right-click → **Subdivide** (do this 2-3 times)
   - Apply color (see Color section below)

#### Priority 1: High Priority Elements

**Window with Blinds:**
- If window exists: Check if it has blinds, modify if needed
- To add blinds: Use thin planes repeated vertically or find a free model

**Monitor Positioning:**
1. Select the monitor object
2. Press `G` to grab/move
   - `G` + `Z`: Move on Z-axis (up/down)
   - `G` + `X`: Move on X-axis (left/right)
   - `G` + `Y`: Move on Y-axis (forward/back)
3. Position it elevated/wall-mounted as per your setup

#### Priority 2: Nice to Have Elements

**Monitor Riser with Props:**
1. Add a cube for riser: **Add** → **Mesh** → **Cube**
2. Scale it flat: Press `S`, then `Z`, type `0.1`, Enter
3. Add small objects (mug, plant, books):
   - Use simple shapes (cylinders for mug, ico sphere for plant)
   - Or download free models from Sketchfab

**Lamp, Whiteboard, Rolling Cart:**
- These can be simple geometric shapes
- Or download free models online
- Focus on getting the shape/position right

### Step 5: Arrange Spatial Layout

Based on your sketch: Window (left) → Monitor (elevated) → Laptop → Whiteboard (right)

1. **Select and move objects:**
   - Click object
   - Press `G` to move (Grab)
   - Press `X`, `Y`, or `Z` to constrain to that axis
   - Type a number for precise movement
   - Click or press Enter to confirm

2. **Rotate objects:**
   - Press `R` to rotate
   - Press `X`, `Y`, or `Z` to rotate around that axis
   - Type degrees (e.g., `90` for 90°)
   - Or drag mouse for visual rotation

3. **Scale objects:**
   - Press `S` to scale
   - Press `X`, `Y`, or `Z` to scale on that axis only
   - Type a number (e.g., `2` for double size, `0.5` for half)

---

## Color & Material Adjustments

Your color theme: Purple (#9b87f5), Mint (#7DD3C0), Cyan (#06b6d4)

### Changing Object Colors

1. **Select the object** you want to recolor
2. Go to **Properties Panel** → **Material Properties** tab (sphere icon)
3. If no material exists:
   - Click **+ New** to create one
4. Find **Base Color**
5. Click the color swatch
6. Enter hex values:
   - For Purple: R: 0.608, G: 0.529, B: 0.961
   - For Mint: R: 0.490, G: 0.827, B: 0.753
   - For Cyan: R: 0.024, G: 0.714, B: 0.831

   > **Or use Hex directly:** Some Blender versions let you paste hex codes

### Material Tips

- **Metallic**: Set to 0.0 for matte, 1.0 for shiny metal
- **Roughness**: 0.0 = mirror-like, 1.0 = rough/matte
- For wood: Keep roughness around 0.4-0.7
- For screen: Low roughness (0.1-0.2), add emissive glow

### Applying Theme Colors Strategically

- **Teal/Mint blanket**: Use #7DD3C0 on chair blanket
- **Purple accents**: Could use on desk accessories, monitor riser
- **Cyan**: Could use for screen glow or lamp light

---

## Optimization & Export

Before exporting, optimize your model to meet requirements:
- File size: < 2MB
- Polygon count: < 50k triangles

### Check Polygon Count

1. Enable statistics:
   - Top menu: **Window** → **Toggle System Console** (see logs)
   - Or: **Overlays** dropdown (top-right of 3D viewport) → **Statistics**
2. Look for "Tris" count in viewport overlay

### Reduce Polygons (If Needed)

If you're over 50k triangles:

**Method 1: Decimate Modifier**
1. Select high-poly object
2. **Properties Panel** → **Modifiers** tab (wrench icon)
3. **Add Modifier** → **Decimate**
4. Adjust **Ratio** (try 0.5 for 50% reduction)
5. Click **Apply** when satisfied

**Method 2: Remove Unnecessary Objects**
- Delete objects not visible from camera
- Merge similar objects

### Optimize Textures

1. Select object with texture
2. Go to **UV Editing** workspace (top tabs)
3. In **Image Editor**, find your texture
4. **Image** → **Resize** → Set to 1024x1024 max

### Export Optimized GLB

1. **File** → **Export** → **glTF 2.0 (.glb/.gltf)**

2. **Export Settings** (right panel):
   - **Format**: glTF Binary (.glb)
   - **Include**:
     - ✅ Selected Objects (or uncheck to export all)
     - ✅ Custom Properties
   - **Transform**:
     - ✅ +Y Up (important for Three.js)
   - **Geometry**:
     - ✅ Apply Modifiers
     - ✅ UVs
     - ✅ Normals
     - Compression: Try "Draco" for smaller file size
   - **Animation**: ❌ Uncheck (we don't need animation)

3. **Save location:**
   - Navigate to: `/Users/ciciwoolf/Dev/portfolio-v2/public/models/`
   - **Filename**: `room.glb` (overwrite existing)
   - Click **Export glTF 2.0**

4. **Verify file size:**
   ```bash
   ls -lh /Users/ciciwoolf/Dev/portfolio-v2/public/models/room.glb
   ```
   Should be under 2MB

---

## Troubleshooting

### Can't see the model after import
- Press `Home` or `.` (numpad) to frame all objects
- Check if objects are on a hidden layer
- Look in the Outliner to see if objects exist

### Model is too small/large
- Select all: `A`
- Scale: `S`, type desired number, Enter
- Remember: export will handle final scale

### Colors look wrong in viewport
- Switch to **Material Preview** mode:
  - Top-right of viewport, 4 sphere icons
  - Click the 3rd sphere (white sphere)
- Or use **Rendered** view (4th sphere) for realistic lighting

### GLB export is too large
- Apply Decimate modifier to high-poly objects
- Reduce texture resolution
- Enable Draco compression in export settings
- Remove hidden objects before export

### Can't move/rotate/scale
- Make sure you're in **Object Mode** (top-left dropdown)
- Check if object is locked: Outliner → look for lock icon

### Model doesn't appear in Next.js
- Check browser console for errors
- Verify file path: `/models/room.glb` matches `public/models/room.glb`
- Check file size isn't too large
- Test in a simpler Three.js example first

---

## Camera Positioning Notes

The React app expects the model to look good at:
- Camera position: `[0, 0, 15]`
- FOV: 45°

### Test in Blender:
1. Select the camera (it's in the scene by default)
2. Press `N` to open sidebar → **View** tab
3. **Camera to View**: Position the 3D viewport how you want
4. Click **Camera to View** to match camera to that view
5. Press `G` to move camera, position it roughly 15 units back on Z-axis
6. Press `0` (numpad) to see camera view
7. Adjust until scene fits nicely

This ensures when you export, it'll look good in the web app!

---

## Quick Reference Card

```
SELECTION:
  Left Click       - Select object
  Shift + Click    - Add to selection
  A                - Select all
  Alt + A          - Deselect all

TRANSFORM:
  G                - Grab/Move
  R                - Rotate
  S                - Scale
  X/Y/Z (after G/R/S) - Constrain to axis

VIEWPORT:
  Middle Mouse     - Rotate view
  Shift + Middle   - Pan view
  Scroll           - Zoom
  Home             - Frame all
  / (slash)        - Isolate selection

DELETE:
  X                - Delete menu

UNDO/REDO:
  Cmd + Z          - Undo
  Cmd + Shift + Z  - Redo
```

---

## Next Steps

1. **Install Blender** (if you haven't)
2. **Open the model** and familiarize yourself with the interface
3. **Identify and delete** unwanted elements (radiator, file cabinets)
4. **Work through Priority 0** elements (cat hammock, blanket color, VS Code laptop)
5. **Add Priority 1** elements (window blinds, monitor positioning)
6. **If time allows**, add Priority 2 nice-to-haves
7. **Optimize and export** following the guidelines above
8. **Test in your Next.js app** and iterate

Remember: **Save often!** (Cmd + S)

Good luck! 🎨 You've got this! The first time might feel overwhelming, but Blender's interface becomes intuitive quickly.
