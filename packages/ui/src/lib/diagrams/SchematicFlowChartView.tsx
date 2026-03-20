import React from "react";
import { THP_LUCIDE_MAP, type ThpLucideSlug } from "../../thp-lucide";

/**
 * Static, frame-agnostic schematic flow (Mermaid / Excalidraw-inspired layout).
 * Use in Storybook as-is; drive `nodeProgress` / `arrowProgress` from Remotion in `FlowChart`.
 */

export type SchematicFlowChartNode = {
  id: string;
  /** Primary line (node title) */
  title: string;
  /** Secondary line under title */
  subtitle?: string;
  /** Lucide icon from THP curated map */
  iconSlug?: ThpLucideSlug;
  /** Legacy single glyph (e.g. emoji); prefer iconSlug */
  decorativeGlyph?: string;
  /** Optional accent for border (hex); defaults to palette accent */
  accent?: string;
};

export type SchematicPalette = {
  surface: string;
  surfaceBorder: string;
  text: string;
  textMuted: string;
  arrow: string;
  accent: string;
};

const defaultPalette: SchematicPalette = {
  surface: "rgba(45, 212, 191, 0.08)",
  surfaceBorder: "rgba(45, 212, 191, 0.45)",
  text: "#ecfdf5",
  textMuted: "#94a3b8",
  arrow: "#64748b",
  accent: "#2dd4bf",
};

export type SchematicFlowChartViewProps = {
  nodes: SchematicFlowChartNode[];
  direction?: "horizontal" | "vertical";
  showArrows?: boolean;
  /** Length must equal nodes.length; each 0..1 */
  nodeProgress: number[];
  /** Length must equal max(0, nodes.length - 1); each 0..1 */
  arrowProgress: number[];
  palette?: Partial<SchematicPalette>;
  style?: React.CSSProperties;
};

export const SchematicFlowChartView: React.FC<SchematicFlowChartViewProps> = ({
  nodes,
  direction = "horizontal",
  showArrows = true,
  nodeProgress,
  arrowProgress,
  palette: paletteOverrides,
  style,
}) => {
  const palette = { ...defaultPalette, ...paletteOverrides };
  const isHorizontal = direction === "horizontal";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isHorizontal ? "row" : "column",
        alignItems: "center",
        justifyContent: "center",
        gap: isHorizontal ? 12 : 10,
        flexWrap: "wrap",
        ...style,
      }}
    >
      {nodes.map((node, index) => {
        const progress = nodeProgress[index] ?? 0;
        const arrowP = arrowProgress[index] ?? 0;
        const Icon = node.iconSlug ? THP_LUCIDE_MAP[node.iconSlug] : null;
        const borderColor = node.accent ?? palette.surfaceBorder;

        return (
          <React.Fragment key={node.id}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                gap: 14,
                minWidth: isHorizontal ? 160 : 200,
                maxWidth: 220,
                padding: "14px 18px",
                borderRadius: 10,
                background: palette.surface,
                border: `1.5px solid ${borderColor}`,
                boxShadow: "0 1px 0 rgba(0,0,0,0.35)",
                opacity: progress,
                transform: `scale(${0.92 + progress * 0.08})`,
                transformOrigin: "center center",
              }}
            >
              {Icon ? (
                <Icon
                  size={26}
                  color={palette.accent}
                  strokeWidth={2}
                  aria-hidden
                  style={{ flexShrink: 0, marginTop: 2 }}
                />
              ) : node.decorativeGlyph ? (
                <span
                  style={{
                    fontSize: 22,
                    lineHeight: 1,
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                  aria-hidden
                >
                  {node.decorativeGlyph}
                </span>
              ) : null}
              <div style={{ minWidth: 0, flex: 1 }}>
                <div
                  style={{
                    fontFamily:
                      'ui-sans-serif, system-ui, "Segoe UI", Roboto, sans-serif',
                    fontSize: 15,
                    fontWeight: 600,
                    letterSpacing: "0.01em",
                    color: palette.text,
                    lineHeight: 1.35,
                  }}
                >
                  {node.title}
                </div>
                {node.subtitle ? (
                  <div
                    style={{
                      marginTop: 4,
                      fontFamily:
                        'ui-sans-serif, system-ui, "Segoe UI", Roboto, sans-serif',
                      fontSize: 12,
                      fontWeight: 400,
                      color: palette.textMuted,
                      lineHeight: 1.4,
                    }}
                  >
                    {node.subtitle}
                  </div>
                ) : null}
              </div>
            </div>

            {showArrows && index < nodes.length - 1 ? (
              <svg
                width={isHorizontal ? 44 : 28}
                height={isHorizontal ? 28 : 44}
                viewBox={isHorizontal ? "0 0 44 28" : "0 0 28 44"}
                style={{
                  flexShrink: 0,
                  opacity: arrowP,
                }}
                role="img"
                aria-label="Next step"
              >
                <title>Next step</title>
                {isHorizontal ? (
                  <path
                    d="M4 14 H34 M34 14 L26 8 M34 14 L26 20"
                    stroke={palette.arrow}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    pathLength={1}
                    strokeDasharray={1}
                    strokeDashoffset={1 - arrowP}
                  />
                ) : (
                  <path
                    d="M14 4 V34 M14 34 L8 26 M14 34 L20 26"
                    stroke={palette.arrow}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    pathLength={1}
                    strokeDasharray={1}
                    strokeDashoffset={1 - arrowP}
                  />
                )}
              </svg>
            ) : null}
          </React.Fragment>
        );
      })}
    </div>
  );
};
