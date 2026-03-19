import type React from "react";
import { useCurrentFrame } from "remotion";
import { defaultTheme, type Theme } from "../theme";

interface SpectrumProps {
  width?: number;
  height?: number;
  bars?: number;
  gap?: number;
  color?: string;
  gradientColors?: [string, string];
  mirrorY?: boolean;
  speed?: number;
  theme?: Theme;
  style?: React.CSSProperties;
}

export const Spectrum: React.FC<SpectrumProps> = ({
  width = 600,
  height = 200,
  bars = 32,
  gap = 4,
  color,
  gradientColors,
  mirrorY = false,
  speed = 0.15,
  theme = defaultTheme,
  style,
}) => {
  const frame = useCurrentFrame();

  const barWidth = (width - (bars - 1) * gap) / bars;
  const colors = gradientColors || [theme.colors.primary, theme.colors.accent];

  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        alignItems: mirrorY ? "center" : "flex-end",
        justifyContent: "center",
        gap,
        ...style,
      }}
    >
      {Array.from({ length: bars }, (_, i) => ({ i, ratio: i / bars })).map(({ i, ratio }) => {
        const frequency = 0.5 + ratio * 2;
        const phase = i * 0.2;
        const baseAmplitude = Math.sin(frame * speed * frequency + phase);
        const noise = Math.sin(frame * 0.3 + i) * 0.15;
        const amplitude = Math.max(0.1, (baseAmplitude + 1) / 2 + noise);

        const barHeight = amplitude * (mirrorY ? height / 2 : height) * 0.9;
        const barColor = color || interpolateColor(colors[0], colors[1], ratio);

        return (
          <div
            key={`spectrum-${bars}-${i}`}
            style={{
              width: barWidth,
              height: mirrorY ? barHeight * 2 : barHeight,
              backgroundColor: barColor,
              borderRadius: barWidth / 2,
              opacity: 0.8 + amplitude * 0.2,
              boxShadow: `0 0 ${10 + amplitude * 20}px ${colorWithAlpha(barColor)}`,
            }}
          />
        );
      })}
    </div>
  );
};

const interpolateColor = (color1: string, color2: string, factor: number): string => {
  const hex = (c: string) => parseInt(c, 16);
  const r1 = hex(color1.slice(1, 3));
  const g1 = hex(color1.slice(3, 5));
  const b1 = hex(color1.slice(5, 7));
  const r2 = hex(color2.slice(1, 3));
  const g2 = hex(color2.slice(3, 5));
  const b2 = hex(color2.slice(5, 7));

  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);

  return `rgb(${r}, ${g}, ${b})`;
};

/** Returns a color string with ~25% opacity for boxShadow (hex gets "40" suffix; rgb gets rgba). */
function colorWithAlpha(color: string, alpha = 0.25): string {
  const rgbMatch = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (rgbMatch) {
    return `rgba(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}, ${alpha})`;
  }
  if (color.startsWith("#") && color.length === 7) {
    return `${color}40`;
  }
  return `rgba(0,0,0,${alpha})`;
}
