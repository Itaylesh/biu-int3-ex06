import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { loadScenes, getSceneStartFrames } from "./loadScenes";
import { SceneRenderer } from "./components/SceneRenderer";
import "./fonts";

const videoData = loadScenes();
const startFrames = getSceneStartFrames(videoData.scenes);

export const KavanaVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0B1220" }}>
      <Audio src={staticFile("music/soundtrack.wav")} volume={0.7} />

      {videoData.scenes.map((scene, index) => (
        <Sequence
          key={scene.id}
          from={startFrames[index]}
          durationInFrames={scene.durationInFrames}
        >
          <SceneRenderer
            scene={scene}
            taglineHe={videoData.meta.taglineHe}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

export const kavanaMeta = videoData.meta;
