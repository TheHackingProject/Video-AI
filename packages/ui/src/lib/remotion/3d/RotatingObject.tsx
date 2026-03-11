import React from "react";
import { useCurrentFrame } from "remotion";
import { defaultTheme, Theme } from "../theme";

interface RotatingObjectProps {
  size?: number;
  shape?: "cube" | "circle" | "hexagon";
  color?: string;
  borderColor?: string;
  rotationSpeed?: number;
  theme?: Theme;
  style?: React.CSSProperties;
}

export const RotatingObject: React.FC<RotatingObjectProps> = ({
  size = 100,
  shape = "cube",
  color,
  borderColor,
  rotationSpeed = 1,
  theme = defaultTheme,
  style,
}) => {
  const frame = useCurrentFrame();

  const rotation = frame * rotationSpeed;
  const pulse = Math.sin(frame * 0.05) * 0.1 + 1;

  const getShapeStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      width: size,
      height: size,
      backgroundColor: color || `${theme.colors.primary}30`,
      border: `3px solid ${borderColor || theme.colors.primary}`,
      transform: `rotate(${rotation}deg) scale(${pulse})`,
      boxShadow: `0 0 ${20 + Math.sin(frame * 0.1) * 10}px ${theme.colors.primary}50`,
    };

    switch (shape) {
      case "circle":
        return { ...baseStyle, borderRadius: "50%" };
      case "hexagon":
        return {
          ...baseStyle,
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        };
      default:
        return { ...baseStyle, borderRadius: theme.borderRadius.md };
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...style,
      }}
    >
      <div style={getShapeStyle()} />
    </div>
  );
};
