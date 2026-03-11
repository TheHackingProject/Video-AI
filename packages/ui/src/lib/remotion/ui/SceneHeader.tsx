import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { defaultTheme, Theme } from "../theme";
import { springConfigs } from "../utils/animations";

interface SceneHeaderProps {
  sceneNumber: number;
  totalScenes: number;
  title?: string;
  keyword?: string;
  startFrame?: number;
  theme?: Theme;
  style?: React.CSSProperties;
}

export const SceneHeader: React.FC<SceneHeaderProps> = ({
  sceneNumber,
  totalScenes,
  title,
  keyword,
  startFrame = 0,
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

  return (
    <div
      style={{
        position: "absolute",
        top: theme.spacing.lg,
        left: theme.spacing.lg,
        right: theme.spacing.lg,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        opacity: progress,
        transform: `translateY(${interpolate(progress, [0, 1], [-20, 0])}px)`,
        zIndex: 100,
        ...style,
      }}
    >
      {/* Left side: Scene number */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: theme.spacing.md,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: theme.spacing.sm,
            padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            borderRadius: theme.borderRadius.md,
            backdropFilter: "blur(10px)",
          }}
        >
          <span
            style={{
              fontFamily: theme.fonts.code,
              fontSize: theme.fontSizes.md,
              color: theme.colors.primary,
              fontWeight: 700,
            }}
          >
            {sceneNumber}
          </span>
          <span
            style={{
              fontFamily: theme.fonts.body,
              fontSize: theme.fontSizes.md,
              color: theme.colors.textMuted,
            }}
          >
            / {totalScenes}
          </span>
        </div>

        {title && (
          <span
            style={{
              fontFamily: theme.fonts.body,
              fontSize: theme.fontSizes.md,
              color: theme.colors.text,
            }}
          >
            {title}
          </span>
        )}
      </div>

      {/* Right side: Keyword */}
      {keyword && (
        <div
          style={{
            padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
            backgroundColor: `${theme.colors.primary}20`,
            borderRadius: theme.borderRadius.md,
            border: `1px solid ${theme.colors.primary}40`,
          }}
        >
          <span
            style={{
              fontFamily: theme.fonts.title,
              fontSize: theme.fontSizes.sm,
              color: theme.colors.primary,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            {keyword}
          </span>
        </div>
      )}
    </div>
  );
};
