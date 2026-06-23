# Prompt 03 — JSON Scene Structure Generation

## AI Tool / Model
Cursor Agent (Claude)

## Intended Output
Structured `data/scenes.json` bridging the Fountain script to Remotion code.

## Prompt Text

```
Convert the Kavana Fountain script into a structured JSON file for Remotion.

Schema per scene:
- id (string): scene identifier
- title, subtitle (string)
- onScreenText (string[]): text overlays
- voiceover (string): narration text
- visualDescription (string): concrete visual instructions
- assetRef (string|null): internal component reference
- durationInFrames (number): scene length at 30fps
- animationType (enum): fadeIn | slideUp | scaleIn | cascade
- transitionType (enum): fade | slide | wipe
- palette: { bg, fg, accent } hex colors
- audioCue (string): music mood note
- soundEffects (string[]): optional SFX labels
- callToAction (string|null)

Top-level meta:
- brand, tagline, taglineHe, fps, width, height, totalDurationInFrames

Total: 1800 frames (60s @ 30fps). Distribute durations: hook 240, problem 300, solution 270, features 360, proof 300, cta 330.

Output valid JSON only. No executable code in string fields.
```

## Outcome
**Accepted** — Saved to `data/scenes.json`. Validated manually against schema requirements.

## Iteration Notes
Added `componentType` field during implementation to map scenes to React components (extension of original schema, documented in schema.ts).
