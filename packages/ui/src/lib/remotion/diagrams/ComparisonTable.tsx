import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { defaultTheme, Theme } from "../theme";
import { springConfigs } from "../utils/animations";

interface TableColumn {
  key: string;
  header: string;
  width?: number;
}

interface TableRow {
  [key: string]: string | number | React.ReactNode;
}

interface ComparisonTableProps {
  columns: TableColumn[];
  rows: TableRow[];
  startFrame?: number;
  rowDelay?: number;
  highlightRow?: number;
  theme?: Theme;
  style?: React.CSSProperties;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  columns,
  rows,
  startFrame = 0,
  rowDelay = 15,
  highlightRow = -1,
  theme = defaultTheme,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerProgress = spring({
    frame: frame - startFrame,
    fps,
    config: springConfigs.smooth,
  });

  return (
    <div
      style={{
        backgroundColor: theme.colors.backgroundLight,
        borderRadius: theme.borderRadius.lg,
        overflow: "hidden",
        border: `1px solid ${theme.colors.textDark}`,
        ...style,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          backgroundColor: `${theme.colors.primary}20`,
          borderBottom: `2px solid ${theme.colors.primary}`,
          opacity: headerProgress,
        }}
      >
        {columns.map((col, index) => (
          <div
            key={col.key}
            style={{
              flex: col.width || 1,
              padding: theme.spacing.md,
              fontFamily: theme.fonts.title,
              fontSize: theme.fontSizes.sm,
              color: theme.colors.primary,
              fontWeight: 600,
              textAlign: "center",
              borderRight: index < columns.length - 1 ? `1px solid ${theme.colors.textDark}30` : "none",
            }}
          >
            {col.header}
          </div>
        ))}
      </div>

      {/* Rows */}
      {rows.map((row, rowIndex) => {
        const rowStart = startFrame + 20 + rowIndex * rowDelay;
        const rowProgress = spring({
          frame: frame - rowStart,
          fps,
          config: springConfigs.smooth,
        });

        const isHighlighted = highlightRow === rowIndex;

        return (
          <div
            key={rowIndex}
            style={{
              display: "flex",
              backgroundColor: isHighlighted
                ? `${theme.colors.success}15`
                : rowIndex % 2 === 0
                  ? "transparent"
                  : "rgba(255,255,255,0.02)",
              borderBottom: `1px solid ${theme.colors.textDark}30`,
              opacity: rowProgress,
              transform: `translateX(${interpolate(rowProgress, [0, 1], [-20, 0])}px)`,
            }}
          >
            {columns.map((col, colIndex) => (
              <div
                key={col.key}
                style={{
                  flex: col.width || 1,
                  padding: theme.spacing.md,
                  fontFamily: theme.fonts.body,
                  fontSize: theme.fontSizes.sm,
                  color: isHighlighted ? theme.colors.success : theme.colors.text,
                  textAlign: "center",
                  borderRight: colIndex < columns.length - 1 ? `1px solid ${theme.colors.textDark}30` : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {row[col.key]}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};
