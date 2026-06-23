import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { SceneData } from "../schema";
import { fontFamily } from "../fonts";
import { gradientBg, sceneContainer } from "../styles/theme";

export const HookScene: React.FC<{ scene: SceneData }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  const titleScale = interpolate(titleSpring, [0, 1], [0.6, 1]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);
  const subtitleOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtitleY = interpolate(frame, [25, 45], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const particleOpacity = interpolate(frame, [0, 60], [0, 0.4], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        ...sceneContainer,
        background: gradientBg(scene.palette),
        color: scene.palette.fg,
      }}
    >
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: scene.palette.accent,
            opacity: particleOpacity * (0.3 + (i % 3) * 0.2),
            left: `${10 + i * 7}%`,
            top: `${20 + (i % 4) * 15}%`,
            transform: `translateY(${Math.sin((frame + i * 20) / 30) * 10}px)`,
          }}
        />
      ))}

      <div
        style={{
          transform: `scale(${titleScale})`,
          opacity: titleOpacity,
          fontFamily,
          fontSize: 72,
          fontWeight: 700,
          textAlign: "center",
          maxWidth: 1200,
          lineHeight: 1.1,
        }}
      >
        {scene.title}
      </div>

      <div
        style={{
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          fontFamily,
          fontSize: 32,
          fontWeight: 400,
          marginTop: 24,
          color: scene.palette.accent,
        }}
      >
        {scene.subtitle}
      </div>
    </AbsoluteFill>
  );
};
