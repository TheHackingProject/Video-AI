import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { defaultTheme, Theme } from "../theme";
import { springConfigs } from "../utils/animations";

interface AvatarProps {
  name?: string;
  emoji?: string;
  color?: string;
  size?: number;
  startFrame?: number;
  showLabel?: boolean;
  breathing?: boolean;
  theme?: Theme;
  style?: React.CSSProperties;
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  emoji = "👤",
  color,
  size = 100,
  startFrame = 0,
  showLabel = true,
  breathing = true,
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

  const avatarColor = color || theme.colors.primary;
  const breatheScale = breathing ? 1 + Math.sin(frame * 0.05) * 0.02 : 1;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: theme.spacing.sm,
        opacity: entryProgress,
        transform: `scale(${interpolate(entryProgress, [0, 1], [0, 1])})`,
        ...style,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          backgroundColor: `${avatarColor}20`,
          border: `3px solid ${avatarColor}`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: size * 0.5,
          transform: `scale(${breatheScale})`,
          boxShadow: `0 10px 30px rgba(0,0,0,0.3)`,
        }}
      >
        {emoji}
      </div>

      {showLabel && name && (
        <span
          style={{
            fontFamily: theme.fonts.title,
            fontSize: theme.fontSizes.md,
            color: avatarColor,
            fontWeight: 600,
          }}
        >
          {name}
        </span>
      )}
    </div>
  );
};
