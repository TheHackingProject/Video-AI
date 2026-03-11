import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

type WipeDirection = "left" | "right" | "top" | "bottom" | "diagonal";

interface WipeProps {
  children: React.ReactNode;
  direction?: WipeDirection;
  delay?: number;
  duration?: number;
  color?: string;
}

export const Wipe: React.FC<WipeProps> = ({
  children,
  direction = "left",
  delay = 0,
  duration = 30,
  color = "#000",
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(
    frame,
    [delay, delay + duration],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const getClipPath = () => {
    const p = progress * 100;
    switch (direction) {
      case "left":
        return `inset(0 ${100 - p}% 0 0)`;
      case "right":
        return `inset(0 0 0 ${100 - p}%)`;
      case "top":
        return `inset(0 0 ${100 - p}% 0)`;
      case "bottom":
        return `inset(${100 - p}% 0 0 0)`;
      case "diagonal":
        return `polygon(0 0, ${p}% 0, ${p}% ${p}%, 0 ${p}%)`;
      default:
        return "none";
    }
  };

  const getWipeClipPath = () => {
    const p = progress * 100;
    const thickness = 5;
    switch (direction) {
      case "left":
        return `inset(0 ${100 - p - thickness}% 0 ${p}%)`;
      case "right":
        return `inset(0 ${p}% 0 ${100 - p - thickness}%)`;
      case "top":
        return `inset(0 0 ${100 - p - thickness}% 0)`;
      case "bottom":
        return `inset(${p}% 0 0 0)`;
      default:
        return "none";
    }
  };

  return (
    <AbsoluteFill>
      {/* Content */}
      <AbsoluteFill style={{ clipPath: getClipPath() }}>
        {children}
      </AbsoluteFill>

      {/* Wipe line */}
      {progress > 0 && progress < 1 && (
        <AbsoluteFill
          style={{
            backgroundColor: color,
            clipPath: getWipeClipPath(),
            boxShadow: `0 0 20px ${color}`,
          }}
        />
      )}
    </AbsoluteFill>
  );
};
