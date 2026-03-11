import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { defaultTheme, Theme } from "../theme";
import { springConfigs } from "../utils/animations";

interface WordByWordProps {
  text: string;
  startFrame?: number;
  wordDelay?: number;
  highlightColor?: string;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  theme?: Theme;
  style?: React.CSSProperties;
  highlightCurrentWord?: boolean;
}

export const WordByWord: React.FC<WordByWordProps> = ({
  text,
  startFrame = 0,
  wordDelay = 8,
  highlightColor,
  fontSize,
  fontFamily,
  color,
  theme = defaultTheme,
  style,
  highlightCurrentWord = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");

  const getCurrentWordIndex = () => {
    const elapsed = frame - startFrame;
    if (elapsed < 0) return -1;
    return Math.min(Math.floor(elapsed / wordDelay), words.length - 1);
  };

  const currentWordIndex = getCurrentWordIndex();

  return (
    <span
      style={{
        fontFamily: fontFamily || theme.fonts.body,
        fontSize: fontSize || theme.fontSizes.xl,
        color: color || theme.colors.text,
        ...style,
      }}
    >
      {words.map((word, index) => {
        const wordStartFrame = startFrame + index * wordDelay;
        const progress = spring({
          frame: frame - wordStartFrame,
          fps,
          config: springConfigs.snappy,
        });

        const isCurrentWord = index === currentWordIndex;
        const isPastWord = index < currentWordIndex;
        const isFutureWord = index > currentWordIndex;

        const opacity = isFutureWord ? 0 : progress;
        const scale = interpolate(progress, [0, 1], [0.8, 1]);

        return (
          <span
            key={index}
            style={{
              display: "inline-block",
              marginRight: theme.spacing.sm,
              opacity,
              transform: `scale(${scale})`,
              color:
                highlightCurrentWord && isCurrentWord
                  ? highlightColor || theme.colors.accent
                  : isPastWord
                    ? theme.colors.textMuted
                    : color || theme.colors.text,
              fontWeight: isCurrentWord ? 700 : 400,
            }}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
};
