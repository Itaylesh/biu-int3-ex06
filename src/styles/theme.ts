import type { CSSProperties } from "react";
import type { SceneData } from "../schema";

export const gradientBg = (palette: SceneData["palette"]) =>
  `linear-gradient(135deg, ${palette.bg} 0%, ${adjustColor(palette.bg, 20)} 50%, ${palette.accent}22 100%)`;

const adjustColor = (hex: string, amount: number): string => {
  const num = parseInt(hex.slice(1), 16);
  const r = Math.min(255, ((num >> 16) & 0xff) + amount);
  const g = Math.min(255, ((num >> 8) & 0xff) + amount);
  const b = Math.min(255, (num & 0xff) + amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
};

export const sceneContainer: CSSProperties = {
  width: "100%",
  height: "100%",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};
