import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { SceneData } from "../schema";
import { fontFamily, fontFamilyHe } from "../fonts";
import { gradientBg, sceneContainer } from "../styles/theme";

type Props = {
  scene: SceneData;
  taglineHe: string;
};

export const CTAScene: React.FC<Props> = ({ scene, taglineHe }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 70 },
  });

  const logoScale = interpolate(logoSpring, [0, 1], [0.5, 1]);
  const pulse = 1 + Math.sin(frame / 20) * 0.03;

  const taglineOpacity = interpolate(frame, [40, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const hebrewOpacity = interpolate(frame, [80, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const urlOpacity = interpolate(frame, [100, 130], [0, 1], {
    extrapolateLeft: "clamp",
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
      <div
        style={{
          transform: `scale(${logoScale * pulse})`,
          marginBottom: 40,
        }}
      >
        <svg viewBox="0 0 100 110" width="160" height="176">
          <defs>
            <linearGradient id="ctaShield" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={scene.palette.accent} />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>
          </defs>
          <path
            d="M50 5 L90 25 L90 55 C90 80 70 100 50 105 C30 100 10 80 10 55 L10 25 Z"
            fill="url(#ctaShield)"
          />
          <text
            x="50"
            y="68"
            textAnchor="middle"
            fill="white"
            fontSize="36"
            fontWeight="bold"
            fontFamily={fontFamily}
          >
            K
          </text>
        </svg>
      </div>

      <div
        style={{
          opacity: taglineOpacity,
          fontFamily,
          fontSize: 48,
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        {scene.title}
      </div>

      <div
        style={{
          opacity: urlOpacity,
          fontFamily,
          fontSize: 28,
          color: scene.palette.accent,
          marginTop: 16,
        }}
      >
        {scene.subtitle}
      </div>

      <div
        style={{
          opacity: hebrewOpacity,
          fontFamily: fontFamilyHe,
          fontSize: 36,
          fontWeight: 600,
          marginTop: 32,
          direction: "rtl",
          color: scene.palette.fg,
        }}
      >
        {taglineHe}
      </div>
    </AbsoluteFill>
  );
};
