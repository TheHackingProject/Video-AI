import type React from "react";
import { useCurrentFrame, interpolate } from "remotion";

export interface FadeInProps {
  children: React.ReactNode;
  startFrame?: number;
  durationInFrames?: number;
  /** Optional translateY in px (entrance from below). Omit or 0 = fade only. */
  translateY?: number;
}

export function FadeIn({
  children,
  startFrame = 0,
  durationInFrames = 15,
  translateY: translateYFrom = 0,
}: FadeInProps): React.ReactElement {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const translateY =
    translateYFrom !== undefined && translateYFrom > 0
      ? interpolate(
          frame,
          [startFrame, startFrame + durationInFrames],
          [translateYFrom, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        )
      : 0;

  return (
    <div
      style={{
        opacity,
        transform: translateY ? `translateY(${translateY}px)` : undefined,
      }}
    >
      {children}
    </div>
  );
}
