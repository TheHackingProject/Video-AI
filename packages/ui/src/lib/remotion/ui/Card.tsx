import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { defaultTheme, Theme } from "../theme";
import { springConfigs } from "../utils/animations";

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  icon?: string;
  startFrame?: number;
  elevated?: boolean;
  bordered?: boolean;
  borderColor?: string;
  theme?: Theme;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  icon,
  startFrame = 0,
  elevated = true,
  bordered = false,
  borderColor,
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
        backgroundColor: theme.colors.backgroundLight,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.lg,
        opacity: progress,
        transform: `translateY(${interpolate(progress, [0, 1], [30, 0])}px)`,
        boxShadow: elevated ? "0 20px 60px rgba(0, 0, 0, 0.3)" : "none",
        border: bordered ? `2px solid ${borderColor || theme.colors.textDark}` : "none",
        ...style,
      }}
    >
      {(title || icon) && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: theme.spacing.md,
            marginBottom: subtitle ? theme.spacing.xs : theme.spacing.lg,
          }}
        >
          {icon && <span style={{ fontSize: theme.fontSizes.xl }}>{icon}</span>}
          {title && (
            <h3
              style={{
                fontFamily: theme.fonts.title,
                fontSize: theme.fontSizes.lg,
                fontWeight: 600,
                color: theme.colors.text,
                margin: 0,
              }}
            >
              {title}
            </h3>
          )}
        </div>
      )}

      {subtitle && (
        <p
          style={{
            fontFamily: theme.fonts.body,
            fontSize: theme.fontSizes.sm,
            color: theme.colors.textMuted,
            margin: 0,
            marginBottom: theme.spacing.lg,
          }}
        >
          {subtitle}
        </p>
      )}

      {children}
    </div>
  );
};
