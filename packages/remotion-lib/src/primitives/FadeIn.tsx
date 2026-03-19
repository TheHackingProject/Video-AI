import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

export interface FadeInProps {
  children: React.ReactNode;
  startFrame?: number;
  durationInFrames?: number;
}

export function FadeIn({
  children,
  startFrame = 0,
  durationInFrames = 15,
}: FadeInProps): React.ReactElement {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return <div style={{ opacity }}>{children}</div>;
}
