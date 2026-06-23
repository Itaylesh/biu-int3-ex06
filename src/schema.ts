import { z } from "zod";

/** Max string length — mitigates oversized / injection payloads in JSON content fields */
const safeText = (max = 500) =>
  z
    .string()
    .max(max)
    .transform((s) => s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, ""));

const paletteSchema = z.object({
  bg: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  fg: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  accent: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
});

const animationTypeSchema = z.enum([
  "fadeIn",
  "slideUp",
  "scaleIn",
  "cascade",
]);

const transitionTypeSchema = z.enum(["fade", "slide", "wipe"]);

const componentTypeSchema = z.enum([
  "HookScene",
  "ProblemScene",
  "SolutionScene",
  "FeaturesScene",
  "ProofScene",
  "CTAScene",
]);

export const sceneSchema = z.object({
  id: z
    .string()
    .regex(/^[a-z0-9_-]+$/)
    .max(32),
  title: safeText(200),
  subtitle: safeText(200),
  onScreenText: z.array(safeText(150)).max(10),
  voiceover: safeText(500),
  visualDescription: safeText(1000),
  assetRef: z.string().max(200).nullable(),
  componentType: componentTypeSchema,
  durationInFrames: z.number().int().min(30).max(900),
  animationType: animationTypeSchema,
  transitionType: transitionTypeSchema,
  palette: paletteSchema,
  audioCue: safeText(200),
  soundEffects: z
    .array(safeText(100))
    .max(5)
    .transform((arr) => arr.filter(Boolean)),
  callToAction: safeText(200).nullable(),
});

export const videoDataSchema = z
  .object({
    meta: z.object({
      brand: safeText(100),
      tagline: safeText(200),
      taglineHe: safeText(200),
      fps: z.number().int().min(24).max(60),
      width: z.number().int().min(640).max(3840),
      height: z.number().int().min(360).max(2160),
      totalDurationInFrames: z.number().int().min(300).max(7200),
    }),
    scenes: z.array(sceneSchema).min(1).max(20),
  })
  .superRefine((data, ctx) => {
    const sum = data.scenes.reduce((acc, s) => acc + s.durationInFrames, 0);
    if (sum !== data.meta.totalDurationInFrames) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Scene durations sum to ${sum}, expected ${data.meta.totalDurationInFrames}`,
        path: ["scenes"],
      });
    }
  });

export type SceneData = z.infer<typeof sceneSchema>;
export type VideoData = z.infer<typeof videoDataSchema>;
export type ComponentType = z.infer<typeof componentTypeSchema>;
