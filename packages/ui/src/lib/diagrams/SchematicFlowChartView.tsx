import type { CSSProperties, FC } from "react";
import { THP_LUCIDE_MAP, type ThpLucideSlug } from "../../thp-lucide";
import {
  type SchematicLink,
  arrowHeadPoints,
  computeLinkGridPositions,
  edgeEntry,
  edgeExit,
  endTangent,
  graphContainerSize,
  gridToPixelTopLeft,
  orthogonalArrowPath,
} from "./schematic-flow-geometry";

export type { SchematicLink } from "./schematic-flow-geometry";
export type { SchematicCardinalDirection } from "./schematic-flow-geometry";

/**
 * Static, frame-agnostic schematic flow (Mermaid / Excalidraw-inspired layout).
 * Use in Storybook as-is; drive `nodeProgress` / `arrowProgress` from Remotion in `FlowChart`.
 *
 * - **Flex mode** (default): `links` omitted — linear chain, `direction` horizontal | vertical.
 * - **Graph mode**: pass `links` with cardinal directions between node indices; supports loops
 *   (e.g. right → down → left → up). Layout uses a grid; arrows attach to card edges.
 */

export type SchematicFlowChartNode = {
  id: string;
  title: string;
  subtitle?: string;
  iconSlug?: ThpLucideSlug;
  decorativeGlyph?: string;
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

const DEFAULT_GRAPH_CELL = {
  cardWidth: 200,
  cardHeight: 92,
  gap: 52,
};

const GRAPH_PAD = 16;

/** SVG `marker-end` ignores dash offset; fade the head only after the stroke has nearly finished. */
function graphArrowHeadOpacity(progress: number): number {
  if (progress <= 0) return 0;
  const start = 0.9;
  if (progress <= start) return 0;
  return Math.min(1, (progress - start) / (1 - start));
}

export type SchematicFlowChartViewProps = {
  nodes: SchematicFlowChartNode[];
  /** Without `links`: flex layout — chain along order 0,1,2,… */
  direction?: "horizontal" | "vertical";
  showArrows?: boolean;
  nodeProgress: number[];
  /**
   * Flex mode: length `nodes.length - 1`.
   * Graph mode (`links`): length `links.length` (one progress per link, including closing edge).
   */
  arrowProgress: number[];
  /**
   * Explicit edges for 2D layout. Directions move the **target** cell relative to source
   * on first placement (turtle on a grid). Loops OK when the last link returns to an
   * already-placed node.
   */
  links?: SchematicLink[];
  /** Pixel geometry for graph mode (cards are sized to match). */
  graphCell?: Partial<typeof DEFAULT_GRAPH_CELL>;
  palette?: Partial<SchematicPalette>;
  style?: CSSProperties;
};

export const SchematicFlowChartView: FC<SchematicFlowChartViewProps> = ({
  nodes,
  direction = "horizontal",
  showArrows = true,
  nodeProgress,
  arrowProgress,
  links,
  graphCell: graphCellOverrides,
  palette: paletteOverrides,
  style,
}) => {
  const palette = { ...defaultPalette, ...paletteOverrides };
  const isGraph = Boolean(links && links.length > 0);
  const graphSpec = { ...DEFAULT_GRAPH_CELL, ...graphCellOverrides };

  if (isGraph && links) {
    return (
      <SchematicGraphLayer
        nodes={nodes}
        links={links}
        nodeProgress={nodeProgress}
        arrowProgress={arrowProgress}
        showArrows={showArrows}
        palette={palette}
        graphSpec={graphSpec}
        style={style}
      />
    );
  }

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
        return (
          <FragmentRow
            key={node.id}
            node={node}
            palette={palette}
            progress={progress}
            showArrow={showArrows && index < nodes.length - 1}
            arrowP={arrowP}
            isHorizontal={isHorizontal}
          />
        );
      })}
    </div>
  );
};

function FragmentRow({
  node,
  palette,
  progress,
  showArrow,
  arrowP,
  isHorizontal,
}: {
  node: SchematicFlowChartNode;
  palette: SchematicPalette;
  progress: number;
  showArrow: boolean;
  arrowP: number;
  isHorizontal: boolean;
}) {
  const Icon = node.iconSlug ? THP_LUCIDE_MAP[node.iconSlug] : null;
  const borderColor = node.accent ?? palette.surfaceBorder;

  return (
    <>
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

      {showArrow ? (
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
    </>
  );
}

function SchematicGraphLayer({
  nodes,
  links,
  nodeProgress,
  arrowProgress,
  showArrows,
  palette,
  graphSpec,
  style,
}: {
  nodes: SchematicFlowChartNode[];
  links: SchematicLink[];
  nodeProgress: number[];
  arrowProgress: number[];
  showArrows: boolean;
  palette: SchematicPalette;
  graphSpec: typeof DEFAULT_GRAPH_CELL;
  style?: CSSProperties;
}) {
  const grid = computeLinkGridPositions(links, nodes.length);
  const { width: boxW, height: boxH } = graphContainerSize(
    grid,
    graphSpec,
    GRAPH_PAD,
  );

  const positionsPx = grid.map((g) =>
    gridToPixelTopLeft(g.gx, g.gy, graphSpec, GRAPH_PAD),
  );

  const cw = graphSpec.cardWidth;
  const ch = graphSpec.cardHeight;

  return (
    <div
      style={{
        position: "relative",
        width: boxW,
        minHeight: boxH,
        ...style,
      }}
    >
      {showArrows ? (
        <svg
          width={boxW}
          height={boxH}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            pointerEvents: "none",
            overflow: "visible",
          }}
          aria-hidden
        >
          <title>Flow links</title>
          {links.map((link, i) => {
            const fromP = positionsPx[link.from];
            const toP = positionsPx[link.to];
            if (!fromP || !toP) return null;
            const start = edgeExit(
              fromP.x,
              fromP.y,
              cw,
              ch,
              link.direction,
            );
            const end = edgeEntry(toP.x, toP.y, cw, ch, link.direction);
            const d = orthogonalArrowPath(
              start.ex,
              start.ey,
              end.ex,
              end.ey,
            );
            const progress = arrowProgress[i] ?? 0;
            const { ux, uy } = endTangent(
              start.ex,
              start.ey,
              end.ex,
              end.ey,
            );
            const headPts = arrowHeadPoints(
              end.ex,
              end.ey,
              ux,
              uy,
              8,
            );
            const headOpacity = graphArrowHeadOpacity(progress);
            return (
              <g key={`edge-${link.from}-${link.to}-${link.direction}`}>
                <path
                  d={d}
                  fill="none"
                  stroke={palette.arrow}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={1 - progress}
                />
                {headOpacity > 0 ? (
                  <polygon
                    points={headPts}
                    fill={palette.arrow}
                    stroke="none"
                    opacity={headOpacity}
                  />
                ) : null}
              </g>
            );
          })}
        </svg>
      ) : null}

      {nodes.map((node, index) => {
        const progress = nodeProgress[index] ?? 0;
        const p = positionsPx[index] ?? { x: GRAPH_PAD, y: GRAPH_PAD };
        const Icon = node.iconSlug ? THP_LUCIDE_MAP[node.iconSlug] : null;
        const borderColor = node.accent ?? palette.surfaceBorder;
        return (
          <div
            key={node.id}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y,
              width: cw,
              minHeight: ch,
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              gap: 12,
              padding: "12px 14px",
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
                size={24}
                color={palette.accent}
                strokeWidth={2}
                aria-hidden
                style={{ flexShrink: 0, marginTop: 2 }}
              />
            ) : node.decorativeGlyph ? (
              <span
                style={{ fontSize: 20, lineHeight: 1, flexShrink: 0 }}
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
                  fontSize: 14,
                  fontWeight: 600,
                  color: palette.text,
                  lineHeight: 1.35,
                }}
              >
                {node.title}
              </div>
              {node.subtitle ? (
                <div
                  style={{
                    marginTop: 3,
                    fontSize: 11,
                    color: palette.textMuted,
                    lineHeight: 1.35,
                  }}
                >
                  {node.subtitle}
                </div>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
