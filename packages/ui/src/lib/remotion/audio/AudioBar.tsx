import React from "react";
import { useCurrentFrame } from "remotion";
import { defaultTheme, Theme } from "../theme";

interface AudioBarProps {
  width?: number;
  height?: number;
  bars?: number;
  color?: string;
  rounded?: boolean;
  speed?: number;
  theme?: Theme;
  style?: React.CSSProperties;
}

export const AudioBar: React.FC<AudioBarProps> = ({
  width = 60,
  height = 40,
  bars = 4,
  color,
  rounded = true,
  speed = 0.2,
  theme = defaultTheme,
  style,
}) => {
  const frame = useCurrentFrame();

  const barWidth = (width - (bars - 1) * 4) / bars;

  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        ...style,
      }}
    >
      {Array.from({ length: bars }).map((_, i) => {
        const phase = i * 0.8;
        const amplitude = (Math.sin(frame * speed + phase) + 1) / 2;
        const barHeight = Math.max(height * 0.2, amplitude * height);

        return (
          <div
            key={i}
            style={{
              width: barWidth,
              height: barHeight,
              backgroundColor: color || theme.colors.primary,
              borderRadius: rounded ? barWidth / 2 : 2,
            }}
          />
        );
      })}
    </div>
  );
};
