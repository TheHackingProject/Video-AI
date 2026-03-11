import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { springConfigs } from "../utils/animations";

type SlideDirection = "left" | "right" | "top" | "bottom";

interface FadeSlideProps {
  children: React.ReactNode;
  direction?: SlideDirection;
  distance?: number;
  delay?: number;
  exit?: boolean;
  exitStart?: number;
}

export const FadeSlide: React.FC<FadeSlideProps> = ({
  children,
  direction = "bottom",
  distance = 50,
  delay = 0,
  exit = false,
  exitStart = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entryProgress = spring({
    frame: frame - delay,
    fps,
    config: springConfigs.smooth,
  });

  let exitProgress = 1;
  if (exit && exitStart > 0) {
    exitProgress = interpolate(
      frame,
      [exitStart, exitStart + 20],
      [1, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
  }

  const progress = Math.min(entryProgress, exitProgress);

  const getTransform = () => {
    const offset = interpolate(progress, [0, 1], [distance, 0]);
    switch (direction) {
      case "left":
        return `translateX(${-offset}px)`;
      case "right":
        return `translateX(${offset}px)`;
      case "top":
        return `translateY(${-offset}px)`;
      case "bottom":
        return `translateY(${offset}px)`;
    }
  };

  return (
    <AbsoluteFill
      style={{
        opacity: progress,
        transform: getTransform(),
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
