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

export const SolutionScene: React.FC<{ scene: SceneData }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const shieldSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 60 },
  });

  const shieldScale = interpolate(shieldSpring, [0, 1], [0.3, 1]);
  const shieldOpacity = interpolate(shieldSpring, [0, 1], [0, 1]);

  const meterValue = interpolate(frame, [40, 200], [12, 94], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ringScale = (i: number) =>
    interpolate(
      spring({ frame: frame - i * 8, fps, config: { damping: 20 } }),
      [0, 1],
      [0.5, 1.2 + i * 0.15],
    );

  const ringOpacity = (i: number) =>
    interpolate(frame, [i * 8, i * 8 + 30], [0.6, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  const titleOpacity = interpolate(frame, [60, 90], [0, 1], {
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
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 280 + i * 80,
            height: 280 + i * 80,
            borderRadius: "50%",
            border: `2px solid ${scene.palette.accent}`,
            opacity: ringOpacity(i) * 0.5,
            transform: `scale(${ringScale(i)})`,
          }}
        />
      ))}

      <div
        style={{
          transform: `scale(${shieldScale})`,
          opacity: shieldOpacity,
          width: 200,
          height: 220,
          position: "relative",
        }}
      >
        <svg viewBox="0 0 100 110" width="200" height="220">
          <defs>
            <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={scene.palette.accent} />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>
          </defs>
          <path
            d="M50 5 L90 25 L90 55 C90 80 70 100 50 105 C30 100 10 80 10 55 L10 25 Z"
            fill="url(#shieldGrad)"
            opacity={0.9}
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
          opacity: titleOpacity,
          textAlign: "center",
          marginTop: 40,
        }}
      >
        <div
          style={{
            fontFamily,
            fontSize: 64,
            fontWeight: 700,
            color: scene.palette.fg,
          }}
        >
          {scene.title}
        </div>
        <div
          style={{
            fontFamily,
            fontSize: 28,
            color: scene.palette.accent,
            marginTop: 8,
          }}
        >
          {scene.subtitle}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 100,
          width: 400,
        }}
      >
        <div style={{ fontFamily, fontSize: 14, opacity: 0.7, marginBottom: 6 }}>
          Focus restored
        </div>
        <div
          style={{
            height: 16,
            borderRadius: 8,
            background: "rgba(255,255,255,0.1)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${meterValue}%`,
              background: "#10B981",
              borderRadius: 8,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
