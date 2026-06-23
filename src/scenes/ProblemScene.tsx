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

const NOTIFICATIONS = [
  { app: "Slack", msg: "New mention in #urgent", color: "#4A154B" },
  { app: "Gmail", msg: "Action required: Review", color: "#EA4335" },
  { app: "Calendar", msg: "Meeting in 5 min", color: "#4285F4" },
  { app: "Teams", msg: "Boss: Quick sync?", color: "#6264A7" },
  { app: "Slack", msg: "47 unread messages", color: "#4A154B" },
  { app: "Gmail", msg: "Deadline today!", color: "#EA4335" },
];

export const ProblemScene: React.FC<{ scene: SceneData }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const meterValue = interpolate(frame, [30, 180], [100, 12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const meterColor =
    meterValue > 50 ? "#10B981" : meterValue > 25 ? "#F59E0B" : "#EF4444";

  const titleOpacity = interpolate(frame, [120, 150], [0, 1], {
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
      {NOTIFICATIONS.map((n, i) => {
        const delay = i * 12;
        const cardSpring = spring({
          frame: frame - delay,
          fps,
          config: { damping: 12, stiffness: 100 },
        });
        const x = interpolate(cardSpring, [0, 1], [i % 2 === 0 ? -400 : 400, 0]);
        const opacity = interpolate(cardSpring, [0, 1], [0, 1]);
        const top = 80 + i * 90;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top,
              left: "50%",
              transform: `translateX(calc(-50% + ${x}px))`,
              opacity,
              width: 420,
              padding: "14px 20px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              gap: 14,
              backdropFilter: "blur(8px)",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#EF4444",
                boxShadow: "0 0 8px #EF4444",
                animation: "none",
                opacity: interpolate(
                  Math.sin(frame / 8 + i),
                  [-1, 1],
                  [0.5, 1],
                ),
              }}
            />
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: n.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 700,
                fontFamily,
              }}
            >
              {n.app[0]}
            </div>
            <div style={{ fontFamily, fontSize: 16 }}>
              <div style={{ fontWeight: 600 }}>{n.app}</div>
              <div style={{ opacity: 0.7, fontSize: 13 }}>{n.msg}</div>
            </div>
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          bottom: 180,
          width: 600,
        }}
      >
        <div
          style={{
            fontFamily,
            fontSize: 14,
            marginBottom: 8,
            opacity: 0.8,
          }}
        >
          Focus Meter
        </div>
        <div
          style={{
            height: 24,
            borderRadius: 12,
            background: "rgba(255,255,255,0.1)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${meterValue}%`,
              background: meterColor,
              borderRadius: 12,
              transition: "none",
            }}
          />
        </div>
        <div
          style={{
            fontFamily,
            fontSize: 28,
            fontWeight: 700,
            marginTop: 8,
            color: meterColor,
          }}
        >
          {Math.round(meterValue)}%
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 60,
          opacity: titleOpacity,
          fontFamily,
          fontSize: 48,
          fontWeight: 700,
          color: scene.palette.accent,
        }}
      >
        {scene.title}
      </div>
    </AbsoluteFill>
  );
};
