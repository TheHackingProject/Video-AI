import React, { useMemo } from "react";
import { useCurrentFrame, random } from "remotion";
import { defaultTheme, Theme } from "../theme";

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  phase: number;
  color: string;
}

interface ParticleFieldProps {
  width?: number;
  height?: number;
  count?: number;
  colors?: string[];
  speed?: number;
  theme?: Theme;
  style?: React.CSSProperties;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
  width = 1920,
  height = 1080,
  count = 50,
  colors,
  speed = 0.5,
  theme = defaultTheme,
  style,
}) => {
  const frame = useCurrentFrame();

  const particleColors = colors || [
    theme.colors.primary,
    theme.colors.secondary,
    theme.colors.accent,
  ];

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }).map((_, i) => ({
      x: random(`x-${i}`) * width,
      y: random(`y-${i}`) * height,
      size: 2 + random(`size-${i}`) * 4,
      speed: 0.5 + random(`speed-${i}`) * 1.5,
      phase: random(`phase-${i}`) * Math.PI * 2,
      color: particleColors[Math.floor(random(`color-${i}`) * particleColors.length)],
    }));
  }, [count, width, height, particleColors]);

  return (
    <div
      style={{
        position: "absolute",
        width,
        height,
        overflow: "hidden",
        ...style,
      }}
    >
      {particles.map((particle, i) => {
        const y = (particle.y + frame * particle.speed * speed) % height;
        const x = particle.x + Math.sin(frame * 0.02 + particle.phase) * 20;
        const opacity = 0.3 + Math.sin(frame * 0.05 + particle.phase) * 0.3;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              borderRadius: "50%",
              opacity,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            }}
          />
        );
      })}
    </div>
  );
};
