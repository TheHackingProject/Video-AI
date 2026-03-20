import type { CSSProperties, FC } from "react";
import { useCurrentFrame, useVideoConfig, spring } from "remotion";
import type { ThpLucideSlug } from "../../../thp-lucide";
import { defaultTheme, type Theme } from "../theme";
import { springConfigs } from "../utils/animations";
import {
  SchematicFlowChartView,
  type SchematicLink,
  type SchematicPalette,
} from "../../diagrams/SchematicFlowChartView";

export interface FlowNode {
  id: string;
  label: string;
  subtitle?: string;
  iconSlug?: ThpLucideSlug;
  icon?: string;
  color?: string;
}

interface FlowChartProps {
  nodes: FlowNode[];
  startFrame?: number;
  nodeDelay?: number;
  /** Flex mode only. Ignored when `links` is set. */
  direction?: "horizontal" | "vertical";
  showArrows?: boolean;
  /**
   * Graph mode: edges between node indices (order matches `nodes`).
   * `arrowProgress` length must match `links.length`.
   */
  links?: SchematicLink[];
  /** Optional pixel layout overrides in graph mode (`links` set). */
  graphCell?: { cardWidth?: number; cardHeight?: number; gap?: number };
  theme?: Theme;
  style?: CSSProperties;
}

function themeToPalette(theme: Theme): Partial<SchematicPalette> {
  return {
    surface: `${theme.colors.primary}14`,
    surfaceBorder: `${theme.colors.primary}73`,
    text: theme.colors.text,
    textMuted: theme.colors.textMuted,
    arrow: theme.colors.textMuted,
    accent: theme.colors.primary,
  };
}

function mapNodes(nodes: FlowNode[]) {
  return nodes.map((node) => ({
    id: node.id,
    title: node.label,
    subtitle: node.subtitle,
    iconSlug: node.iconSlug,
    decorativeGlyph:
      node.iconSlug || !node.icon ? undefined : node.icon,
    accent: node.color,
  }));
}

export const FlowChart: FC<FlowChartProps> = ({
  nodes,
  startFrame = 0,
  nodeDelay = 24,
  direction = "horizontal",
  showArrows = true,
  links,
  graphCell,
  theme = defaultTheme,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const nodeProgress = nodes.map((_, index) => {
    const nodeStart = startFrame + index * nodeDelay;
    return spring({
      frame: frame - nodeStart,
      fps,
      config: springConfigs.smooth,
    });
  });

  const linkList = links ?? [];
  const isGraph = linkList.length > 0;
  const arrowCount = isGraph ? linkList.length : Math.max(0, nodes.length - 1);
  const arrowProgress = Array.from({ length: arrowCount }, (_, index) => {
    const arrowStart =
      startFrame +
      index * nodeDelay +
      nodeDelay * (isGraph ? 0.45 : 0.55);
    return spring({
      frame: frame - arrowStart,
      fps,
      config: springConfigs.smooth,
    });
  });

  return (
    <SchematicFlowChartView
      nodes={mapNodes(nodes)}
      direction={direction}
      showArrows={showArrows}
      nodeProgress={nodeProgress}
      arrowProgress={arrowProgress}
      links={isGraph ? linkList : undefined}
      graphCell={graphCell}
      palette={themeToPalette(theme)}
      style={style}
    />
  );
};
