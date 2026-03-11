import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { defaultTheme, Theme } from "../theme";
import { springConfigs } from "../utils/animations";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  text: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: string;
  iconPosition?: "left" | "right";
  startFrame?: number;
  hover?: boolean;
  theme?: Theme;
  style?: React.CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  startFrame = 0,
  hover = false,
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

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return { padding: `${theme.spacing.xs}px ${theme.spacing.md}px`, fontSize: theme.fontSizes.sm };
      case "lg":
        return { padding: `${theme.spacing.md}px ${theme.spacing.xl}px`, fontSize: theme.fontSizes.lg };
      default:
        return { padding: `${theme.spacing.sm}px ${theme.spacing.lg}px`, fontSize: theme.fontSizes.md };
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "secondary":
        return {
          backgroundColor: theme.colors.secondary,
          color: "#fff",
          border: "none",
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          color: theme.colors.primary,
          border: `2px solid ${theme.colors.primary}`,
        };
      case "ghost":
        return {
          backgroundColor: "transparent",
          color: theme.colors.text,
          border: "none",
        };
      default:
        return {
          backgroundColor: theme.colors.primary,
          color: "#fff",
          border: "none",
        };
    }
  };

  const sizeStyles = getSizeStyles();
  const variantStyles = getVariantStyles();
  const hoverScale = hover ? 1 + Math.sin(frame * 0.15) * 0.03 : 1;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: theme.spacing.sm,
        borderRadius: theme.borderRadius.md,
        fontFamily: theme.fonts.body,
        fontWeight: 600,
        cursor: "pointer",
        opacity: progress,
        transform: `scale(${interpolate(progress, [0, 1], [0.8, 1]) * hoverScale})`,
        boxShadow: hover ? `0 10px 30px ${theme.colors.primary}40` : "none",
        ...sizeStyles,
        ...variantStyles,
        ...style,
      }}
    >
      {icon && iconPosition === "left" && <span>{icon}</span>}
      <span>{text}</span>
      {icon && iconPosition === "right" && <span>{icon}</span>}
    </div>
  );
};
