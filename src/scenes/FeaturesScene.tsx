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

const FEATURES = [
  {
    icon: "🛡️",
    label: "Focus Shield",
    desc: "Silence non-critical interruptions",
  },
  {
    icon: "📅",
    label: "Smart Orchestration",
    desc: "Auto-reschedule and batch comms",
  },
  {
    icon: "✨",
    label: "Clarity Dashboard",
    desc: "One clear priority at a time",
  },
];

export const FeaturesScene: React.FC<{ scene: SceneData }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
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
          opacity: titleOpacity,
          fontFamily,
          fontSize: 52,
          fontWeight: 700,
          marginBottom: 60,
        }}
      >
        {scene.title}
      </div>

      <div
        style={{
          display: "flex",
          gap: 40,
          alignItems: "stretch",
        }}
      >
        {FEATURES.map((f, i) => {
          const delay = 30 + i * 25;
          const cardSpring = spring({
            frame: frame - delay,
            fps,
            config: { damping: 14, stiffness: 80 },
          });
          const y = interpolate(cardSpring, [0, 1], [80, 0]);
          const opacity = interpolate(cardSpring, [0, 1], [0, 1]);

          return (
            <div
              key={f.label}
              style={{
                opacity,
                transform: `translateY(${y}px)`,
                width: 320,
                padding: "36px 28px",
                borderRadius: 20,
                background: "rgba(255,255,255,0.06)",
                border: `1px solid ${scene.palette.accent}44`,
                textAlign: "center",
                backdropFilter: "blur(12px)",
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 16 }}>{f.icon}</div>
              <div
                style={{
                  fontFamily,
                  fontSize: 24,
                  fontWeight: 700,
                  color: scene.palette.accent,
                  marginBottom: 10,
                }}
              >
                {f.label}
              </div>
              <div
                style={{
                  fontFamily,
                  fontSize: 16,
                  opacity: 0.75,
                  lineHeight: 1.4,
                }}
              >
                {f.desc}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
