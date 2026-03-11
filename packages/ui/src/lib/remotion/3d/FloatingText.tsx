import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { defaultTheme, Theme } from "../theme";
import { springConfigs } from "../utils/animations";

interface FloatingTextProps {
  text: string;
  startFrame?: number;
  floatAmplitude?: number;
  floatSpeed?: number;
  rotateX?: number;
  rotateY?: number;
  fontSize?: number;
  color?: string;
  shadowColor?: string;
  theme?: Theme;
  style?: React.CSSProperties;
}

export const FloatingText: React.FC<FloatingTextProps> = ({
  text,
  startFrame = 0,
  floatAmplitude = 10,
  floatSpeed = 0.05,
  rotateX = 0,
  rotateY = 0,
  fontSize,
  color,
  shadowColor,
  theme = defaultTheme,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entryProgress = spring({
    frame: frame - startFrame,
    fps,
    config: springConfigs.bouncy,
  });

  const floatY = Math.sin(frame * floatSpeed) * floatAmplitude;
  const floatX = Math.cos(frame * floatSpeed * 0.7) * (floatAmplitude * 0.5);

  const shadow = shadowColor || theme.colors.primary;

  return (
    <div
      style={{
        fontFamily: theme.fonts.title,
        fontSize: fontSize || theme.fontSizes.display,
        fontWeight: 700,
        color: color || theme.colors.text,
        opacity: entryProgress,
        transform: `
          translateY(${floatY}px)
          translateX(${floatX}px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          scale(${interpolate(entryProgress, [0, 1], [0.5, 1])})
        `,
        textShadow: `
          0 0 20px ${shadow}40,
          0 0 40px ${shadow}20,
          0 ${10 + floatY * 0.5}px 30px rgba(0,0,0,0.3)
        `,
        perspective: 1000,
        ...style,
      }}
    >
      {text}
    </div>
  );
};
