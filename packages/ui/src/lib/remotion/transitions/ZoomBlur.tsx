import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { springConfigs } from "../utils/animations";

interface ZoomBlurProps {
  children: React.ReactNode;
  delay?: number;
  zoomFrom?: number;
  zoomTo?: number;
  blurAmount?: number;
}

export const ZoomBlur: React.FC<ZoomBlurProps> = ({
  children,
  delay = 0,
  zoomFrom = 0.8,
  zoomTo = 1,
  blurAmount = 10,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: springConfigs.smooth,
  });

  const scale = interpolate(progress, [0, 1], [zoomFrom, zoomTo]);
  const blur = interpolate(progress, [0, 1], [blurAmount, 0]);
  const opacity = interpolate(progress, [0, 0.5, 1], [0, 0.8, 1]);

  return (
    <AbsoluteFill
      style={{
        opacity,
        transform: `scale(${scale})`,
        filter: `blur(${blur}px)`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
