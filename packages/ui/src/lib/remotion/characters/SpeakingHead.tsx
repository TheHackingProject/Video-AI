import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { defaultTheme, Theme } from "../theme";
import { springConfigs } from "../utils/animations";

interface SpeakingHeadProps {
  name?: string;
  emoji?: string;
  color?: string;
  size?: number;
  startFrame?: number;
  speaking?: boolean;
  message?: string;
  theme?: Theme;
  style?: React.CSSProperties;
}

export const SpeakingHead: React.FC<SpeakingHeadProps> = ({
  name,
  emoji = "🧑",
  color,
  size = 80,
  startFrame = 0,
  speaking = false,
  message,
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

  const headColor = color || theme.colors.primary;
  const speakingBounce = speaking ? Math.sin(frame * 0.3) * 3 : 0;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: theme.spacing.md,
        opacity: entryProgress,
        ...style,
      }}
    >
      {/* Speech bubble */}
      {message && (
        <div
          style={{
            position: "relative",
            padding: theme.spacing.md,
            backgroundColor: theme.colors.backgroundLight,
            borderRadius: theme.borderRadius.lg,
            border: `2px solid ${headColor}`,
            maxWidth: 250,
            opacity: spring({
              frame: frame - startFrame - 20,
              fps,
              config: springConfigs.smooth,
            }),
          }}
        >
          <span
            style={{
              fontFamily: theme.fonts.body,
              fontSize: theme.fontSizes.sm,
              color: theme.colors.text,
            }}
          >
            {message}
          </span>
          {/* Bubble tail */}
          <div
            style={{
              position: "absolute",
              bottom: -10,
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderTop: `10px solid ${headColor}`,
            }}
          />
        </div>
      )}

      {/* Avatar */}
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          backgroundColor: `${headColor}20`,
          border: `3px solid ${headColor}`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: size * 0.5,
          transform: `translateY(${speakingBounce}px) scale(${interpolate(entryProgress, [0, 1], [0, 1])})`,
          boxShadow: speaking ? `0 0 20px ${headColor}50` : `0 10px 30px rgba(0,0,0,0.3)`,
        }}
      >
        {emoji}
      </div>

      {/* Name */}
      {name && (
        <span
          style={{
            fontFamily: theme.fonts.title,
            fontSize: theme.fontSizes.sm,
            color: headColor,
            fontWeight: 600,
          }}
        >
          {name}
        </span>
      )}
    </div>
  );
};
