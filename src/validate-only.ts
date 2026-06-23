import { loadScenes } from "./loadScenes";

try {
  const data = loadScenes();
  console.log("✓ scenes.json valid");
  console.log(`  Brand: ${data.meta.brand}`);
  console.log(`  Scenes: ${data.scenes.length}`);
  console.log(`  Duration: ${data.meta.totalDurationInFrames} frames (${data.meta.totalDurationInFrames / data.meta.fps}s)`);
  process.exit(0);
} catch (e) {
  console.error("✗ Validation failed:", e);
  process.exit(1);
}
