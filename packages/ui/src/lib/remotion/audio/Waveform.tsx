import React from "react";
import { useCurrentFrame } from "remotion";
import { defaultTheme, Theme } from "../theme";

interface WaveformProps {
  width?: number;
  height?: number;
  bars?: number;
  color?: string;
  backgroundColor?: string;
  speed?: number;
  theme?: Theme;
  style?: React.CSSProperties;
}

export const Waveform: React.FC<WaveformProps> = ({
  width = 400,
  height = 100,
  bars = 50,
  color,
  backgroundColor,
  speed = 0.1,
  theme = defaultTheme,
  style,
}) => {
  const frame = useCurrentFrame();

  const barWidth = (width - (bars - 1) * 2) / bars;

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: backgroundColor || "transparent",
        borderRadius: theme.borderRadius.md,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        ...style,
      }}
    >
      {Array.from({ length: bars }).map((_, i) => {
        const phase = i * 0.3;
        const amplitude = (Math.sin(frame * speed + phase) + 1) / 2;
        const noise = Math.sin(frame * 0.2 + i * 0.5) * 0.2;
        const barHeight = Math.max(4, (amplitude + noise) * height * 0.8);

        return (
          <div
            key={i}
            style={{
              width: barWidth,
              height: barHeight,
              backgroundColor: color || theme.colors.primary,
              borderRadius: 2,
              opacity: 0.7 + amplitude * 0.3,
            }}
          />
        );
      })}
    </div>
  );
};
