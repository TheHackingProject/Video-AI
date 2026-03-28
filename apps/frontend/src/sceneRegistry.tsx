import type React from "react";
import { demoShowcaseDuration } from "@repo/ui/remotion";
import { DemoShowcaseSolarpunkDemo } from "../../remotion/src/remotion/compositions/demos";
import { Pilot01Prerequis } from "../../remotion/src/remotion/compositions/serie-01/Pilot01Prerequis";
import { Pilot02GitVsGithub } from "../../remotion/src/remotion/compositions/serie-01/Pilot02GitVsGithub";
import { Pilot05Merge } from "../../remotion/src/remotion/compositions/serie-01/Pilot05Merge";
import { Pilot06PullRequest } from "../../remotion/src/remotion/compositions/serie-01/Pilot06PullRequest";

export type SceneConfig = {
  component: React.ComponentType;
  fps: number;
  durationInFrames: number;
  width: number;
  height: number;
};

export const sceneRegistry: Record<string, SceneConfig> = {
  DemoShowcaseSolarpunkDemo: {
    component: DemoShowcaseSolarpunkDemo,
    fps: 30,
    durationInFrames: demoShowcaseDuration,
    width: 1920,
    height: 1080,
  },
  Pilot01Prerequis: {
    component: Pilot01Prerequis,
    fps: 30,
    durationInFrames: 3600,
    width: 1920,
    height: 1080,
  },
  Pilot02GitVsGithub: {
    component: Pilot02GitVsGithub,
    fps: 30,
    durationInFrames: 1350,
    width: 1920,
    height: 1080,
  },
  Pilot05Merge: {
    component: Pilot05Merge,
    fps: 30,
    durationInFrames: 1350,
    width: 1920,
    height: 1080,
  },
  Pilot06PullRequest: {
    component: Pilot06PullRequest,
    fps: 30,
    durationInFrames: 1350,
    width: 1920,
    height: 1080,
  },
};
