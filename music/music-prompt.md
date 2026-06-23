# Suno Music Prompt — Kavana Soundtrack

## Tool
Suno AI (https://suno.com)

## Prompt (copy-paste ready)

```
Instrumental corporate tech soundtrack, 60 seconds.

Mood: calm confidence building to focused energy, then resolved clarity.
Tempo: 90-100 BPM, steady and professional.

Instruments:
- Soft piano (opening — calm, spirituality, inner focus)
- Subtle synth pads (modern tech feel)
- Light electronic percussion entering at 20s (momentum, not aggressive)
- Gentle rise at 40s for feature section
- Soft resolve at 55s for CTA

No vocals. No lyrics. Clean mix suitable for voiceover overlay.
Style references: Apple keynote background, Notion product video, calm SaaS explainer.

Sections:
0-10s: Minimal piano, spacious
10-25s: Add synth pad, slight tension
25-45s: Full arrangement, forward motion
45-60s: Gradual fade, warm resolution
```

## Instrument Emotional Mapping (Course Material)

| Instrument | Emotion | Scene Alignment |
|------------|---------|-----------------|
| Soft piano | Calm, focus, spirituality | Hook, CTA |
| Synth pads | Modern, tech-forward | Solution, Features |
| Light percussion | Momentum, progress | Features, Proof |

## Why This Audio Fits the Video

Kavana sells **calm focus in a noisy world**. Piano establishes trust and inner clarity (problem → solution transition). Synth pads signal AI/modern tech during feature reveal. Percussion adds forward motion without aggression — matching the proof/ stats section energy.

## Generation Steps

1. Open Suno → Create → Custom mode
2. Paste prompt above
3. Set duration ~2:00 (trim to 60s in post if needed) or use extend
4. Download MP3 → save as `public/music/soundtrack.mp3`
5. Re-render video: `npm run render`

## Fallback

If Suno unavailable, a programmatic placeholder tone is included for render testing. Document in README.
