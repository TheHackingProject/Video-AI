import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { defaultTheme, Theme } from "../theme";

interface ProgressBarProps {
  totalFrames?: number;
  height?: number;
  showTime?: boolean;
  showPercentage?: boolean;
  gradientColors?: [string, string];
  theme?: Theme;
  style?: React.CSSProperties;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  totalFrames,
  height = 6,
  showTime = true,
  showPercentage = false,
  gradientColors,
  theme = defaultTheme,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const total = totalFrames || durationInFrames;
  const progress = (frame / total) * 100;

  const currentSeconds = Math.floor(frame / fps);
  const totalSeconds = Math.floor(total / fps);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const colors = gradientColors || [theme.colors.primary, theme.colors.accent];

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: `${theme.spacing.sm}px ${theme.spacing.lg}px`,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(10px)",
        ...style,
      }}
    >
      <div
        style={{
          position: "relative",
          height,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: height / 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${colors[0]}, ${colors[1]})`,
            borderRadius: height / 2,
          }}
        />
      </div>

      {(showTime || showPercentage) && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: theme.spacing.xs,
            fontFamily: theme.fonts.code,
            fontSize: theme.fontSizes.sm,
            color: theme.colors.textMuted,
          }}
        >
          {showTime && <span>{formatTime(currentSeconds)}</span>}
          {showPercentage && <span>{Math.round(progress)}%</span>}
          {showTime && <span>{formatTime(totalSeconds)}</span>}
        </div>
      )}
    </div>
  );
};
