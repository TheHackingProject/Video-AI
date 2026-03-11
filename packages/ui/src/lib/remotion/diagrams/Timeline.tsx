import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { defaultTheme, Theme } from "../theme";
import { springConfigs } from "../utils/animations";

interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  date?: string;
  icon?: string;
  color?: string;
}

interface TimelineProps {
  items: TimelineItem[];
  startFrame?: number;
  itemDelay?: number;
  direction?: "vertical" | "horizontal";
  theme?: Theme;
  style?: React.CSSProperties;
}

export const Timeline: React.FC<TimelineProps> = ({
  items,
  startFrame = 0,
  itemDelay = 30,
  direction = "vertical",
  theme = defaultTheme,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isVertical = direction === "vertical";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isVertical ? "column" : "row",
        gap: theme.spacing.lg,
        ...style,
      }}
    >
      {items.map((item, index) => {
        const itemStart = startFrame + index * itemDelay;
        const progress = spring({
          frame: frame - itemStart,
          fps,
          config: springConfigs.smooth,
        });

        const lineProgress = spring({
          frame: frame - itemStart - itemDelay / 2,
          fps,
          config: springConfigs.smooth,
        });

        const color = item.color || theme.colors.primary;

        return (
          <div
            key={item.id}
            style={{
              display: "flex",
              flexDirection: isVertical ? "row" : "column",
              alignItems: isVertical ? "flex-start" : "center",
              gap: theme.spacing.md,
            }}
          >
            {/* Dot and line */}
            <div
              style={{
                display: "flex",
                flexDirection: isVertical ? "column" : "row",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  backgroundColor: color,
                  opacity: progress,
                  transform: `scale(${interpolate(progress, [0, 1], [0, 1])})`,
                  boxShadow: `0 0 10px ${color}50`,
                }}
              />
              {index < items.length - 1 && (
                <div
                  style={{
                    width: isVertical ? 2 : 60,
                    height: isVertical ? 60 : 2,
                    backgroundColor: theme.colors.textDark,
                    opacity: lineProgress * 0.5,
                  }}
                />
              )}
            </div>

            {/* Content */}
            <div
              style={{
                opacity: progress,
                transform: `translateX(${isVertical ? interpolate(progress, [0, 1], [20, 0]) : 0}px)`,
              }}
            >
              {item.date && (
                <span
                  style={{
                    fontFamily: theme.fonts.code,
                    fontSize: theme.fontSizes.sm,
                    color: color,
                    display: "block",
                    marginBottom: theme.spacing.xs,
                  }}
                >
                  {item.date}
                </span>
              )}
              <h4
                style={{
                  fontFamily: theme.fonts.title,
                  fontSize: theme.fontSizes.md,
                  color: theme.colors.text,
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: theme.spacing.sm,
                }}
              >
                {item.icon && <span>{item.icon}</span>}
                {item.title}
              </h4>
              {item.description && (
                <p
                  style={{
                    fontFamily: theme.fonts.body,
                    fontSize: theme.fontSizes.sm,
                    color: theme.colors.textMuted,
                    margin: 0,
                    marginTop: theme.spacing.xs,
                    maxWidth: 200,
                  }}
                >
                  {item.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
