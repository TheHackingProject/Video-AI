import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { defaultTheme, Theme } from "../theme";
import { springConfigs } from "../utils/animations";

interface DiffLine {
  type: "added" | "removed" | "unchanged";
  content: string;
}

interface DiffViewProps {
  lines: DiffLine[];
  title?: string;
  startFrame?: number;
  lineDelay?: number;
  fontSize?: number;
  theme?: Theme;
  style?: React.CSSProperties;
}

export const DiffView: React.FC<DiffViewProps> = ({
  lines,
  title,
  startFrame = 0,
  lineDelay = 8,
  fontSize,
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

  const getLineStyle = (type: DiffLine["type"]) => {
    switch (type) {
      case "added":
        return {
          backgroundColor: `${theme.colors.success}20`,
          borderLeftColor: theme.colors.success,
          prefix: "+ ",
          prefixColor: theme.colors.success,
        };
      case "removed":
        return {
          backgroundColor: `${theme.colors.error}20`,
          borderLeftColor: theme.colors.error,
          prefix: "- ",
          prefixColor: theme.colors.error,
        };
      default:
        return {
          backgroundColor: "transparent",
          borderLeftColor: "transparent",
          prefix: "  ",
          prefixColor: theme.colors.textMuted,
        };
    }
  };

  return (
    <div
      style={{
        backgroundColor: theme.colors.code.background,
        borderRadius: theme.borderRadius.lg,
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
        border: `1px solid ${theme.colors.textDark}`,
        opacity: entryProgress,
        ...style,
      }}
    >
      {title && (
        <div
          style={{
            backgroundColor: theme.colors.backgroundLight,
            padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
            borderBottom: `1px solid ${theme.colors.textDark}`,
          }}
        >
          <span
            style={{
              fontFamily: theme.fonts.body,
              fontSize: theme.fontSizes.sm,
              color: theme.colors.textMuted,
            }}
          >
            {title}
          </span>
        </div>
      )}

      <div
        style={{
          padding: theme.spacing.md,
          fontFamily: theme.fonts.code,
          fontSize: fontSize || theme.fontSizes.md,
          lineHeight: 1.6,
        }}
      >
        {lines.map((line, index) => {
          const lineStart = startFrame + index * lineDelay;
          const lineProgress = spring({
            frame: frame - lineStart,
            fps,
            config: springConfigs.snappy,
          });

          const { backgroundColor, borderLeftColor, prefix, prefixColor } = getLineStyle(line.type);

          return (
            <div
              key={index}
              style={{
                display: "flex",
                backgroundColor,
                borderLeft: `3px solid ${borderLeftColor}`,
                marginLeft: -theme.spacing.md,
                marginRight: -theme.spacing.md,
                paddingLeft: theme.spacing.md,
                paddingRight: theme.spacing.md,
                opacity: lineProgress,
                transform: `translateX(${interpolate(lineProgress, [0, 1], [-10, 0])}px)`,
              }}
            >
              <span style={{ color: prefixColor, width: 20 }}>{prefix}</span>
              <span style={{ color: theme.colors.code.text, whiteSpace: "pre" }}>
                {line.content}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
