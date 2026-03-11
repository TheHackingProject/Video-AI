import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { defaultTheme, Theme } from "../theme";
import { springConfigs } from "../utils/animations";

interface TerminalLine {
  type: "command" | "output" | "error" | "success";
  text: string;
  delay?: number;
}

interface TerminalProps {
  lines: TerminalLine[];
  title?: string;
  startFrame?: number;
  typeSpeed?: number;
  prompt?: string;
  fontSize?: number;
  theme?: Theme;
  style?: React.CSSProperties;
}

export const Terminal: React.FC<TerminalProps> = ({
  lines,
  title = "terminal",
  startFrame = 0,
  typeSpeed = 2,
  prompt = "$ ",
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

  const getLineColor = (type: TerminalLine["type"]): string => {
    switch (type) {
      case "command":
        return theme.colors.text;
      case "output":
        return theme.colors.textMuted;
      case "error":
        return theme.colors.error;
      case "success":
        return theme.colors.success;
      default:
        return theme.colors.text;
    }
  };

  let cumulativeDelay = 0;

  return (
    <div
      style={{
        backgroundColor: theme.colors.code.background,
        borderRadius: theme.borderRadius.lg,
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
        border: `1px solid ${theme.colors.textDark}`,
        opacity: entryProgress,
        transform: `translateY(${interpolate(entryProgress, [0, 1], [20, 0])}px)`,
        ...style,
      }}
    >
      {/* Terminal header */}
      <div
        style={{
          backgroundColor: "#1c2128",
          padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
          display: "flex",
          alignItems: "center",
          gap: theme.spacing.sm,
          borderBottom: `1px solid ${theme.colors.textDark}`,
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ff5f56" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ffbd2e" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#27c93f" }} />
        </div>
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

      {/* Terminal content */}
      <div
        style={{
          padding: theme.spacing.md,
          fontFamily: theme.fonts.code,
          fontSize: fontSize || theme.fontSizes.md,
          lineHeight: 1.8,
        }}
      >
        {lines.map((line, index) => {
          const lineDelay = line.delay || (line.type === "command" ? 30 : 10);
          const lineStartFrame = startFrame + cumulativeDelay;
          cumulativeDelay += lineDelay + (line.type === "command" ? line.text.length / typeSpeed : 5);

          const elapsed = frame - lineStartFrame;
          if (elapsed < 0) return null;

          const isCommand = line.type === "command";
          const visibleChars = isCommand
            ? Math.floor(elapsed * typeSpeed)
            : line.text.length;

          const displayText = line.text.slice(0, Math.min(visibleChars, line.text.length));
          const isTyping = isCommand && visibleChars < line.text.length;

          return (
            <div key={index} style={{ color: getLineColor(line.type) }}>
              {isCommand && (
                <span style={{ color: theme.colors.success }}>{prompt}</span>
              )}
              <span style={{ whiteSpace: "pre-wrap" }}>{displayText}</span>
              {isTyping && (
                <span
                  style={{
                    backgroundColor: theme.colors.success,
                    width: 8,
                    height: fontSize || theme.fontSizes.md,
                    display: "inline-block",
                    marginLeft: 2,
                    opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
