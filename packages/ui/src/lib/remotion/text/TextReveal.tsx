import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { defaultTheme, Theme } from "../theme";
import { springConfigs } from "../utils/animations";

type RevealDirection = "left" | "right" | "top" | "bottom" | "center";

interface TextRevealProps {
  text: string;
  startFrame?: number;
  direction?: RevealDirection;
  duration?: number;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  theme?: Theme;
  style?: React.CSSProperties;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  startFrame = 0,
  direction = "left",
  duration = 30,
  fontSize,
  fontFamily,
  color,
  theme = defaultTheme,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: springConfigs.smooth,
  });

  const getClipPath = () => {
    const p = interpolate(progress, [0, 1], [0, 100]);
    switch (direction) {
      case "left":
        return `inset(0 ${100 - p}% 0 0)`;
      case "right":
        return `inset(0 0 0 ${100 - p}%)`;
      case "top":
        return `inset(0 0 ${100 - p}% 0)`;
      case "bottom":
        return `inset(${100 - p}% 0 0 0)`;
      case "center":
        const half = (100 - p) / 2;
        return `inset(0 ${half}% 0 ${half}%)`;
      default:
        return "none";
    }
  };

  return (
    <span
      style={{
        fontFamily: fontFamily || theme.fonts.title,
        fontSize: fontSize || theme.fontSizes.xxl,
        color: color || theme.colors.text,
        clipPath: getClipPath(),
        display: "inline-block",
        ...style,
      }}
    >
      {text}
    </span>
  );
};
