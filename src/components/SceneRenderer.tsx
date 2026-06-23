import React from "react";
import type { ComponentType, SceneData } from "../schema";
import { HookScene } from "../scenes/HookScene";
import { ProblemScene } from "../scenes/ProblemScene";
import { SolutionScene } from "../scenes/SolutionScene";
import { FeaturesScene } from "../scenes/FeaturesScene";
import { ProofScene } from "../scenes/ProofScene";
import { CTAScene } from "../scenes/CTAScene";

type Props = {
  scene: SceneData;
  taglineHe?: string;
};

const SCENE_MAP: Record<
  ComponentType,
  React.FC<{ scene: SceneData; taglineHe?: string }>
> = {
  HookScene,
  ProblemScene,
  SolutionScene,
  FeaturesScene,
  ProofScene,
  CTAScene: CTAScene as React.FC<{ scene: SceneData; taglineHe?: string }>,
};

export const SceneRenderer: React.FC<Props> = ({ scene, taglineHe }) => {
  const Component = SCENE_MAP[scene.componentType];

  if (!Component) {
    return (
      <div
        style={{
          color: "white",
          fontSize: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        Unknown scene type: {scene.componentType}
      </div>
    );
  }

  return <Component scene={scene} taglineHe={taglineHe} />;
};
