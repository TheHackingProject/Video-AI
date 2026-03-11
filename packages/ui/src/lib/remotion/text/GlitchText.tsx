import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { defaultTheme, Theme } from "../theme";

interface GlitchTextProps {
  text: string;
  startFrame?: number;
  duration?: number;
  intensity?: number;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  glitchColor1?: string;
  glitchColor2?: string;
  theme?: Theme;
  style?: React.CSSProperties;
}

const glitchChars = "!@#$%^&*()_+-=[]{}|;':\",./<>?`~0123456789ABCDEFabcdef";

const generateGlitchText = (text: string, intensity: number): string => {
  return text
    .split("")
    .map((char) => {
      if (char === " ") return " ";
      if (Math.random() < intensity) {
        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
      }
      return char;
    })
    .join("");
};

export const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  startFrame = 0,
  duration = 30,
  intensity = 0.5,
  fontSize,
  fontFamily,
  color,
  glitchColor1 = "#ff0000",
  glitchColor2 = "#00ffff",
  theme = defaultTheme,
  style,
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame, [startFrame, startFrame + duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const currentIntensity = intensity * progress;
  const displayText = currentIntensity > 0.01 ? generateGlitchText(text, currentIntensity) : text;

  const glitchOffset = currentIntensity * 5;
  const showGlitch = currentIntensity > 0.1;

  return (
    <span
      style={{
        position: "relative",
        fontFamily: fontFamily || theme.fonts.code,
        fontSize: fontSize || theme.fontSizes.xl,
        color: color || theme.colors.text,
        ...style,
      }}
    >
      {showGlitch && (
        <>
          <span
            style={{
              position: "absolute",
              left: -glitchOffset,
              top: 0,
              color: glitchColor1,
              opacity: 0.7,
              clipPath: "inset(0 0 50% 0)",
            }}
          >
            {displayText}
          </span>
          <span
            style={{
              position: "absolute",
              left: glitchOffset,
              top: 0,
              color: glitchColor2,
              opacity: 0.7,
              clipPath: "inset(50% 0 0 0)",
            }}
          >
            {displayText}
          </span>
        </>
      )}
      <span style={{ position: "relative" }}>{displayText}</span>
    </span>
  );
};
