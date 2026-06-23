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

export const ProofScene: React.FC<{ scene: SceneData }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const counterSpring = spring({
    frame: frame - 40,
    fps,
    config: { damping: 20, stiffness: 40 },
  });

  const percent = Math.round(interpolate(counterSpring, [0, 1], [0, 176]));
  const beforeHours = interpolate(counterSpring, [0, 1], [2.1, 2.1]);
  const afterHours = interpolate(counterSpring, [0, 1], [2.1, 5.8]);

  const splitOpacity = interpolate(frame, [0, 25], [0, 1], {
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
          display: "flex",
          gap: 60,
          opacity: splitOpacity,
          marginBottom: 50,
        }}
      >
        <div
          style={{
            width: 380,
            padding: 40,
            borderRadius: 20,
            background: "rgba(239,68,68,0.12)",
            border: "1px solid rgba(239,68,68,0.3)",
            textAlign: "center",
          }}
        >
          <div style={{ fontFamily, fontSize: 18, opacity: 0.7, marginBottom: 12 }}>
            Before Kavana
          </div>
          <div
            style={{
              fontFamily,
              fontSize: 56,
              fontWeight: 700,
              color: "#EF4444",
            }}
          >
            {beforeHours.toFixed(1)} hrs
          </div>
          <div style={{ fontFamily, fontSize: 16, opacity: 0.6, marginTop: 8 }}>
            deep work / day
          </div>
          <div style={{ fontSize: 32, marginTop: 12 }}>↓</div>
        </div>

        <div
          style={{
            width: 380,
            padding: 40,
            borderRadius: 20,
            background: "rgba(16,185,129,0.12)",
            border: "1px solid rgba(16,185,129,0.3)",
            textAlign: "center",
          }}
        >
          <div style={{ fontFamily, fontSize: 18, opacity: 0.7, marginBottom: 12 }}>
            After Kavana
          </div>
          <div
            style={{
              fontFamily,
              fontSize: 56,
              fontWeight: 700,
              color: "#10B981",
            }}
          >
            {afterHours.toFixed(1)} hrs
          </div>
          <div style={{ fontFamily, fontSize: 16, opacity: 0.6, marginTop: 8 }}>
            deep work / day
          </div>
          <div style={{ fontSize: 32, marginTop: 12 }}>↑</div>
        </div>
      </div>

      <div
        style={{
          fontFamily,
          fontSize: 72,
          fontWeight: 700,
          color: scene.palette.accent,
        }}
      >
        +{percent}% focus time
      </div>

      <div
        style={{
          fontFamily,
          fontSize: 24,
          opacity: 0.8,
          marginTop: 16,
        }}
      >
        {scene.subtitle}
      </div>
    </AbsoluteFill>
  );
};
