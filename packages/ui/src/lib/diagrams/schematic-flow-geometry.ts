/**
 * Grid-based layout + edge attachment for SchematicFlowChart (4 cardinal directions, loops).
 */

export type SchematicCardinalDirection = "right" | "down" | "left" | "up";

export type SchematicLink = {
  /** Source node index */
  from: number;
  /** Target node index */
  to: number;
  /** Travel direction from `from` toward `to` (next cell on the grid). */
  direction: SchematicCardinalDirection;
};

const DELTA: Record<SchematicCardinalDirection, [number, number]> = {
  right: [1, 0],
  down: [0, 1],
  left: [-1, 0],
  up: [0, -1],
};

export function oppositeDirection(
  d: SchematicCardinalDirection,
): SchematicCardinalDirection {
  const m: Record<SchematicCardinalDirection, SchematicCardinalDirection> = {
    right: "left",
    left: "right",
    up: "down",
    down: "up",
  };
  return m[d];
}

/** Grid cell origin for each node (before pixel stride). */
export function computeLinkGridPositions(
  links: SchematicLink[],
  nodeCount: number,
): { gx: number; gy: number }[] {
  const cells: ({ gx: number; gy: number } | null)[] = Array(nodeCount).fill(
    null,
  );

  const seed = links[0]?.from ?? 0;
  cells[seed] = { gx: 0, gy: 0 };

  let guard = 0;
  const maxIter = nodeCount + links.length + 8;
  while (guard++ < maxIter) {
    let placed = 0;
    for (const link of links) {
      const from = cells[link.from];
      const to = cells[link.to];
      const [dx, dy] = DELTA[link.direction];
      if (from && cells[link.to] == null) {
        cells[link.to] = { gx: from.gx + dx, gy: from.gy + dy };
        placed++;
      } else if (to && cells[link.from] == null) {
        cells[link.from] = { gx: to.gx - dx, gy: to.gy - dy };
        placed++;
      }
    }
    if (cells.every((c) => c != null)) break;
    if (placed === 0) break;
  }

  const out: { gx: number; gy: number }[] = [];
  for (let i = 0; i < nodeCount; i++) {
    out.push(cells[i] ?? { gx: 0, gy: 0 });
  }

  const minGx = Math.min(...out.map((p) => p.gx));
  const minGy = Math.min(...out.map((p) => p.gy));
  return out.map((p) => ({ gx: p.gx - minGx, gy: p.gy - minGy }));
}

export type GraphCellSpec = {
  cardWidth: number;
  cardHeight: number;
  gap: number;
};

export function gridToPixelTopLeft(
  gx: number,
  gy: number,
  spec: GraphCellSpec,
  padding: number,
): { x: number; y: number } {
  const strideX = spec.cardWidth + spec.gap;
  const strideY = spec.cardHeight + spec.gap;
  return {
    x: padding + gx * strideX,
    y: padding + gy * strideY,
  };
}

export function graphContainerSize(
  positions: { gx: number; gy: number }[],
  spec: GraphCellSpec,
  padding: number,
): { width: number; height: number } {
  if (positions.length === 0) {
    return { width: padding * 2, height: padding * 2 };
  }
  const maxGx = Math.max(...positions.map((p) => p.gx));
  const maxGy = Math.max(...positions.map((p) => p.gy));
  const w = padding * 2 + (maxGx + 1) * spec.cardWidth + maxGx * spec.gap;
  const h = padding * 2 + (maxGy + 1) * spec.cardHeight + maxGy * spec.gap;
  return { width: w, height: h };
}

/** Exit point on `from` rect edge, traveling in `direction`. */
export function edgeExit(
  x: number,
  y: number,
  w: number,
  h: number,
  direction: SchematicCardinalDirection,
): { ex: number; ey: number } {
  switch (direction) {
    case "right":
      return { ex: x + w, ey: y + h / 2 };
    case "down":
      return { ex: x + w / 2, ey: y + h };
    case "left":
      return { ex: x, ey: y + h / 2 };
    case "up":
      return { ex: x + w / 2, ey: y };
  }
}

/** Entry point on `to` rect when arriving from opposite(direction). */
export function edgeEntry(
  x: number,
  y: number,
  w: number,
  h: number,
  direction: SchematicCardinalDirection,
): { ex: number; ey: number } {
  return edgeExit(x, y, w, h, oppositeDirection(direction));
}

/** Orthogonal path (horizontal then vertical) for axis-aligned layouts. */
export function orthogonalArrowPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): string {
  if (Math.abs(x1 - x2) < 0.5) {
    return `M ${x1} ${y1} L ${x2} ${y2}`;
  }
  if (Math.abs(y1 - y2) < 0.5) {
    return `M ${x1} ${y1} L ${x2} ${y2}`;
  }
  const mx = x2;
  const my = y1;
  return `M ${x1} ${y1} L ${mx} ${my} L ${x2} ${y2}`;
}

/** Unit tangent at path end for arrowhead (toward end). */
export function endTangent(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): { ux: number; uy: number } {
  let px = x2;
  let py = y2;
  if (Math.abs(x1 - x2) >= 0.5 && Math.abs(y1 - y2) >= 0.5) {
    px = x2;
    py = y1;
  }
  const dx = x2 - px;
  const dy = y2 - py;
  const len = Math.hypot(dx, dy) || 1;
  return { ux: dx / len, uy: dy / len };
}

export function arrowHeadPoints(
  tipX: number,
  tipY: number,
  ux: number,
  uy: number,
  size = 8,
): string {
  const bx = tipX - ux * size;
  const by = tipY - uy * size;
  const px = -uy;
  const py = ux;
  const s = size * 0.55;
  return `${tipX},${tipY} ${bx + px * s},${by + py * s} ${bx - px * s},${by - py * s}`;
}
