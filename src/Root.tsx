import React from "react";
import { Composition } from "remotion";
import { KavanaVideo, kavanaMeta } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="KavanaVideo"
        component={KavanaVideo}
        durationInFrames={kavanaMeta.totalDurationInFrames}
        fps={kavanaMeta.fps}
        width={kavanaMeta.width}
        height={kavanaMeta.height}
      />
    </>
  );
};
