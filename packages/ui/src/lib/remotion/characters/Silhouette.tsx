import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { defaultTheme, Theme } from "../theme";
import { springConfigs } from "../utils/animations";

type SilhouetteType = "person" | "hacker" | "business" | "student";

interface SilhouetteProps {
  type?: SilhouetteType;
  name?: string;
  color?: string;
  size?: number;
  startFrame?: number;
  highlighted?: boolean;
  theme?: Theme;
  style?: React.CSSProperties;
}

export const Silhouette: React.FC<SilhouetteProps> = ({
  type = "person",
  name,
  color,
  size = 120,
  startFrame = 0,
  highlighted = false,
  theme = defaultTheme,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entryProgress = spring({
    frame: frame - startFrame,
    fps,
    config: springConfigs.smooth,
  });

  const silhouetteColor = color || theme.colors.primary;
  const breathe = 1 + Math.sin(frame * 0.03) * 0.02;

  const getEmoji = () => {
    switch (type) {
      case "hacker":
        return "🥷";
      case "business":
        return "👔";
      case "student":
        return "🎓";
      default:
        return "👤";
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: theme.spacing.md,
        opacity: entryProgress,
        transform: `scale(${interpolate(entryProgress, [0, 1], [0.8, 1])})`,
        ...style,
      }}
    >
      <div
        style={{
          width: size,
          height: size * 1.2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${breathe})`,
        }}
      >
        {/* Head */}
        <div
          style={{
            width: size * 0.4,
            height: size * 0.4,
            borderRadius: "50%",
            backgroundColor: silhouetteColor,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: size * 0.25,
            boxShadow: highlighted
              ? `0 0 30px ${silhouetteColor}60`
              : "none",
          }}
        >
          {getEmoji()}
        </div>

        {/* Body */}
        <div
          style={{
            width: size * 0.6,
            height: size * 0.6,
            backgroundColor: silhouetteColor,
            borderRadius: `${size * 0.3}px ${size * 0.3}px 0 0`,
            marginTop: -size * 0.05,
            opacity: 0.8,
          }}
        />
      </div>

      {name && (
        <span
          style={{
            fontFamily: theme.fonts.title,
            fontSize: theme.fontSizes.md,
            color: silhouetteColor,
            fontWeight: 600,
          }}
        >
          {name}
        </span>
      )}
    </div>
  );
};
