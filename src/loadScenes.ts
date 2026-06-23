import rawData from "../data/scenes.json";
import { videoDataSchema, type VideoData } from "./schema";

/**
 * Load and validate scene JSON.
 * JSON is treated as untrusted display content — validated via zod, never executed.
 */
export const loadScenes = (): VideoData => {
  const result = videoDataSchema.safeParse(rawData);

  if (!result.success) {
    const messages = result.error.issues
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(`Invalid scenes.json:\n${messages}`);
  }

  return result.data;
};

export const getSceneStartFrames = (
  scenes: VideoData["scenes"],
): number[] => {
  let cursor = 0;
  return scenes.map((scene) => {
    const start = cursor;
    cursor += scene.durationInFrames;
    return start;
  });
};
