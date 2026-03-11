import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { defaultTheme, Theme } from "../theme";
import { springConfigs } from "../utils/animations";

interface FlowNode {
  id: string;
  label: string;
  icon?: string;
  color?: string;
}

interface FlowChartProps {
  nodes: FlowNode[];
  startFrame?: number;
  nodeDelay?: number;
  direction?: "horizontal" | "vertical";
  showArrows?: boolean;
  theme?: Theme;
  style?: React.CSSProperties;
}

export const FlowChart: React.FC<FlowChartProps> = ({
  nodes,
  startFrame = 0,
  nodeDelay = 20,
  direction = "horizontal",
  showArrows = true,
  theme = defaultTheme,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isHorizontal = direction === "horizontal";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isHorizontal ? "row" : "column",
        alignItems: "center",
        gap: theme.spacing.md,
        ...style,
      }}
    >
      {nodes.map((node, index) => {
        const nodeStart = startFrame + index * nodeDelay;
        const progress = spring({
          frame: frame - nodeStart,
          fps,
          config: springConfigs.bouncy,
        });

        const arrowStart = nodeStart + nodeDelay / 2;
        const arrowProgress = spring({
          frame: frame - arrowStart,
          fps,
          config: springConfigs.smooth,
        });

        const nodeColor = node.color || theme.colors.primary;

        return (
          <React.Fragment key={node.id}>
            {/* Node */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: theme.spacing.sm,
                opacity: progress,
                transform: `scale(${interpolate(progress, [0, 1], [0.5, 1])})`,
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: theme.borderRadius.lg,
                  backgroundColor: `${nodeColor}20`,
                  border: `2px solid ${nodeColor}`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 32,
                }}
              >
                {node.icon || index + 1}
              </div>
              <span
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: theme.fontSizes.sm,
                  color: theme.colors.text,
                  textAlign: "center",
                  maxWidth: 100,
                }}
              >
                {node.label}
              </span>
            </div>

            {/* Arrow */}
            {showArrows && index < nodes.length - 1 && (
              <svg
                width={isHorizontal ? 40 : 24}
                height={isHorizontal ? 24 : 40}
                style={{
                  opacity: arrowProgress,
                  transform: isHorizontal ? "none" : "rotate(90deg)",
                }}
              >
                <path
                  d={isHorizontal ? "M0 12H30M30 12L22 4M30 12L22 20" : "M12 0V30M12 30L4 22M12 30L20 22"}
                  stroke={theme.colors.textMuted}
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
