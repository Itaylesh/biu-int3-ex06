# Prompt 06 — Debugging & Fixes

## AI Tool / Model
Cursor Agent (Claude)

## Intended Output
Fix runtime, rendering, and visual issues discovered during Studio preview.

## Prompt Text (example iterations)

### Iteration 1 — Font loading
```
Remotion preview shows fallback fonts for Hebrew text. Fix by using loadFont from @remotion/google-fonts/Heebo and @remotion/google-fonts/Inter, calling loadFont() at module level in a fonts.ts file imported by Root.tsx.
```

**Outcome:** Accepted — fonts load correctly.

### Iteration 2 — Scene timing
```
Scene 4 feature cards overlap because stagger delay exceeds scene duration. Reduce stagger to 20 frames per card and limit to 3 cards matching JSON onScreenText array length.
```

**Outcome:** Accepted — timing fixed.

### Iteration 3 — Audio path
```
Audio file not found during render. Use staticFile('music/soundtrack.mp3') and ensure file exists in public/ or use remotion staticFile from project root. Move soundtrack to public/music/ or configure remotion public dir.
```

**Outcome:** Accepted — use staticFile with correct path.

### Iteration 4 — zod validation error
```
scenes.json fails validation because soundEffects contains empty string. Update schema to filter empty strings or fix JSON to use empty array [].
```

**Outcome:** Accepted — schema uses .transform() to sanitize arrays.

## General Debugging Approach
1. Run `npm run studio` and inspect frame-by-frame.
2. Check browser console for errors.
3. Validate JSON independently before blaming components.
4. Render a short test clip before full 60s render.
