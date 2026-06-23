# Prompt 04 — Remotion Code Generation (Main Vibe Prompt)

## AI Tool / Model
Cursor Agent (Claude)

## Intended Output
Complete Remotion project: composition, scene components, schema validation, styling.

## Prompt Text

```
I have a JSON file (data/scenes.json) with 6 scenes for a Kavana AI product explainer video.

Build a Remotion project that:
1. Loads and validates JSON with zod (treat JSON as untrusted content — validate, never eval)
2. Maps each scene to a dedicated React component based on componentType field
3. Uses a modern corporate aesthetic: navy #0B1220, violet #6366F1, cyan #22D3EE
4. Animations:
   - Scene 1 (Hook): title scales in, subtitle fades up
   - Scene 2 (Problem): notification cards cascade, focus meter drains
   - Scene 3 (Solution): shield icon expands, noise particles fade out
   - Scene 4 (Features): three feature cards slide in sequentially
   - Scene 5 (Proof): animated stat counters (before/after)
   - Scene 6 (CTA): logo + bilingual tagline fade in
5. Transitions between scenes: crossfade via Sequence timing
6. Typography: Inter (EN) + Heebo (HE) via @remotion/google-fonts
7. All visuals generated in code — gradients, shapes, SVG icons, no external images
8. Audio: <Audio> component loading music/soundtrack.mp3
9. 1920x1080, 30fps, 1800 total frames

Provide: Root.tsx, Composition.tsx, schema.ts, loadScenes.ts, scene components, shared styles.
Include npm scripts: studio, render.
```

## Outcome
**Accepted** — Full Remotion implementation generated. Iterative fixes applied during preview (see 07-debugging.md).

## Iteration Notes
Agent generated initial structure; human reviewed palette consistency and Hebrew text direction (RTL handled via CSS direction on Hebrew spans).
