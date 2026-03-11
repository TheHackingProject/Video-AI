import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { defaultTheme, Theme } from "../theme";
import { springConfigs } from "../utils/animations";

interface TreeNode {
  id: string;
  label: string;
  color?: string;
  children?: TreeNode[];
}

interface TreeProps {
  root: TreeNode;
  startFrame?: number;
  expandDelay?: number;
  theme?: Theme;
  style?: React.CSSProperties;
}

export const Tree: React.FC<TreeProps> = ({
  root,
  startFrame = 0,
  expandDelay = 25,
  theme = defaultTheme,
  style,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        ...style,
      }}
    >
      <TreeNodeComponent
        node={root}
        startFrame={startFrame}
        expandDelay={expandDelay}
        level={0}
        theme={theme}
      />
    </div>
  );
};

interface TreeNodeComponentProps {
  node: TreeNode;
  startFrame: number;
  expandDelay: number;
  level: number;
  theme: Theme;
}

const TreeNodeComponent: React.FC<TreeNodeComponentProps> = ({
  node,
  startFrame,
  expandDelay,
  level,
  theme,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: springConfigs.smooth,
  });

  const color = node.color || theme.colors.primary;
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: theme.spacing.md,
      }}
    >
      {/* Node */}
      <div
        style={{
          padding: `${theme.spacing.sm}px ${theme.spacing.lg}px`,
          backgroundColor: `${color}20`,
          border: `2px solid ${color}`,
          borderRadius: theme.borderRadius.md,
          opacity: progress,
          transform: `scale(${interpolate(progress, [0, 1], [0.8, 1])})`,
        }}
      >
        <span
          style={{
            fontFamily: level === 0 ? theme.fonts.title : theme.fonts.body,
            fontSize: level === 0 ? theme.fontSizes.lg : theme.fontSizes.md,
            color: color,
            fontWeight: level === 0 ? 700 : 500,
          }}
        >
          {node.label}
        </span>
      </div>

      {/* Connector */}
      {hasChildren && (
        <div
          style={{
            width: 2,
            height: 20,
            backgroundColor: color,
            opacity: spring({
              frame: frame - startFrame - expandDelay / 2,
              fps,
              config: springConfigs.smooth,
            }),
          }}
        />
      )}

      {/* Children */}
      {hasChildren && (
        <div
          style={{
            display: "flex",
            gap: theme.spacing.xl,
          }}
        >
          {node.children!.map((child, index) => (
            <div
              key={child.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 2,
                  height: 20,
                  backgroundColor: child.color || color,
                  opacity: spring({
                    frame: frame - startFrame - expandDelay - index * 10,
                    fps,
                    config: springConfigs.smooth,
                  }) * 0.5,
                }}
              />
              <TreeNodeComponent
                node={child}
                startFrame={startFrame + expandDelay + index * 15}
                expandDelay={expandDelay}
                level={level + 1}
                theme={theme}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
