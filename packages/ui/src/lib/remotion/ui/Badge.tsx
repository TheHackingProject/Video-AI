import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { defaultTheme, Theme } from "../theme";
import { springConfigs } from "../utils/animations";

type BadgeVariant = "default" | "success" | "warning" | "error" | "info";

interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
  icon?: string;
  startFrame?: number;
  pulse?: boolean;
  theme?: Theme;
  style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({
  text,
  variant = "default",
  icon,
  startFrame = 0,
  pulse = false,
  theme = defaultTheme,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: springConfigs.bouncy,
  });

  const getVariantColors = () => {
    switch (variant) {
      case "success":
        return { bg: theme.colors.success, text: "#000" };
      case "warning":
        return { bg: theme.colors.warning, text: "#000" };
      case "error":
        return { bg: theme.colors.error, text: "#fff" };
      case "info":
        return { bg: theme.colors.primary, text: "#fff" };
      default:
        return { bg: theme.colors.backgroundLight, text: theme.colors.text };
    }
  };

  const colors = getVariantColors();
  const pulseScale = pulse ? 1 + Math.sin(frame * 0.1) * 0.05 : 1;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: theme.spacing.xs,
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
        backgroundColor: colors.bg,
        borderRadius: theme.borderRadius.full,
        opacity: progress,
        transform: `scale(${interpolate(progress, [0, 1], [0.5, 1]) * pulseScale})`,
        ...style,
      }}
    >
      {icon && <span style={{ fontSize: theme.fontSizes.md }}>{icon}</span>}
      <span
        style={{
          fontFamily: theme.fonts.body,
          fontSize: theme.fontSizes.sm,
          fontWeight: 600,
          color: colors.text,
        }}
      >
        {text}
      </span>
    </div>
  );
};
