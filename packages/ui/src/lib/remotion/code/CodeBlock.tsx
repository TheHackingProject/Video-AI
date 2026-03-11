import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { defaultTheme, Theme } from "../theme";
import { springConfigs } from "../utils/animations";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  startFrame?: number;
  typewriter?: boolean;
  typeSpeed?: number;
  highlightLines?: number[];
  fontSize?: number;
  theme?: Theme;
  showLineNumbers?: boolean;
  style?: React.CSSProperties;
}

const highlightSyntax = (code: string, theme: Theme): React.ReactNode[] => {
  const patterns = [
    { regex: /(\/\/.*$|\/\*[\s\S]*?\*\/|#.*$)/gm, color: theme.colors.code.comment },
    { regex: /(".*?"|'.*?'|`.*?`)/g, color: theme.colors.code.string },
    { regex: /\b(const|let|var|function|return|if|else|for|while|import|export|from|class|extends|new|this|async|await|try|catch|throw)\b/g, color: theme.colors.code.keyword },
    { regex: /\b(\d+\.?\d*)\b/g, color: theme.colors.code.variable },
    { regex: /\b([A-Z][a-zA-Z0-9]*)\b/g, color: theme.colors.code.function },
  ];

  let result: React.ReactNode[] = [code];

  patterns.forEach(({ regex, color }) => {
    result = result.flatMap((segment, idx) => {
      if (typeof segment !== "string") return segment;

      const parts: React.ReactNode[] = [];
      let lastIndex = 0;
      let match;

      const re = new RegExp(regex.source, regex.flags);
      while ((match = re.exec(segment)) !== null) {
        if (match.index > lastIndex) {
          parts.push(segment.slice(lastIndex, match.index));
        }
        parts.push(
          <span key={`${idx}-${match.index}`} style={{ color }}>
            {match[0]}
          </span>
        );
        lastIndex = match.index + match[0].length;
      }

      if (lastIndex < segment.length) {
        parts.push(segment.slice(lastIndex));
      }

      return parts.length > 0 ? parts : [segment];
    });
  });

  return result;
};

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "javascript",
  title,
  startFrame = 0,
  typewriter = false,
  typeSpeed = 2,
  highlightLines = [],
  fontSize,
  theme = defaultTheme,
  showLineNumbers = true,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entryProgress = spring({
    frame: frame - startFrame,
    fps,
    config: springConfigs.smooth,
  });

  const displayCode = typewriter
    ? code.slice(0, Math.floor((frame - startFrame) * typeSpeed / fps * 30))
    : code;

  const lines = displayCode.split("\n");

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
      {title && (
        <div
          style={{
            backgroundColor: theme.colors.backgroundLight,
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
      )}

      <div
        style={{
          padding: theme.spacing.md,
          fontFamily: theme.fonts.code,
          fontSize: fontSize || theme.fontSizes.md,
          lineHeight: 1.6,
          color: theme.colors.code.text,
          overflowX: "auto",
        }}
      >
        {lines.map((line, index) => {
          const lineNumber = index + 1;
          const isHighlighted = highlightLines.includes(lineNumber);

          return (
            <div
              key={index}
              style={{
                display: "flex",
                backgroundColor: isHighlighted ? `${theme.colors.primary}20` : "transparent",
                marginLeft: isHighlighted ? -theme.spacing.md : 0,
                marginRight: isHighlighted ? -theme.spacing.md : 0,
                paddingLeft: isHighlighted ? theme.spacing.md : 0,
                paddingRight: isHighlighted ? theme.spacing.md : 0,
                borderLeft: isHighlighted ? `3px solid ${theme.colors.primary}` : "3px solid transparent",
              }}
            >
              {showLineNumbers && (
                <span
                  style={{
                    width: 40,
                    textAlign: "right",
                    marginRight: theme.spacing.md,
                    color: theme.colors.textDark,
                    userSelect: "none",
                  }}
                >
                  {lineNumber}
                </span>
              )}
              <span style={{ flex: 1, whiteSpace: "pre" }}>
                {highlightSyntax(line, theme)}
              </span>
            </div>
          );
        })}

        {typewriter && displayCode.length < code.length && (
          <span
            style={{
              backgroundColor: theme.colors.success,
              width: 2,
              height: fontSize || theme.fontSizes.md,
              display: "inline-block",
              marginLeft: 2,
              animation: "none",
              opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0,
            }}
          />
        )}
      </div>
    </div>
  );
};
