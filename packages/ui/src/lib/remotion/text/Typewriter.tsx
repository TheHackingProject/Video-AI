import React from "react";
import { useTypewriter } from "../hooks/useTypewriter";
import { defaultTheme, Theme } from "../theme";

interface TypewriterProps {
  text: string;
  startFrame?: number;
  charsPerSecond?: number;
  showCursor?: boolean;
  cursorChar?: string;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  cursorColor?: string;
  theme?: Theme;
  style?: React.CSSProperties;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  startFrame = 0,
  charsPerSecond = 30,
  showCursor = true,
  cursorChar = "|",
  fontSize,
  fontFamily,
  color,
  cursorColor,
  theme = defaultTheme,
  style,
}) => {
  const { displayText, cursorVisible } = useTypewriter({
    text,
    startFrame,
    charsPerSecond,
    showCursor,
  });

  return (
    <span
      style={{
        fontFamily: fontFamily || theme.fonts.body,
        fontSize: fontSize || theme.fontSizes.lg,
        color: color || theme.colors.text,
        ...style,
      }}
    >
      {displayText}
      {showCursor && (
        <span
          style={{
            color: cursorColor || theme.colors.primary,
            opacity: cursorVisible ? 1 : 0,
          }}
        >
          {cursorChar}
        </span>
      )}
    </span>
  );
};
