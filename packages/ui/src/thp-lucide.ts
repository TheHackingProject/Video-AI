/**
 * Curated Lucide icons for THP / Video-AI / Remotion.
 * Prefer these over custom placeholder SVGs — consistent stroke, grid, and maintenance.
 *
 * Usage:
 *   import { ThpSun, ThpTerminal, THP_LUCIDE_MAP } from "@repo/ui/icons";
 *   <ThpSun size={28} color="#f59e0b" strokeWidth={2} aria-hidden />
 *
 * @see https://lucide.dev/icons/
 */
import {
  GitBranch,
  Leaf,
  Sprout,
  Sparkles,
  Sun,
  Terminal,
  Waypoints,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type { LucideIcon };

/** Solar / optimism — Solarpunk identity */
export const ThpSun = Sun;
/** Nature / growth */
export const ThpLeaf = Leaf;
/** Onboarding, first steps */
export const ThpSprout = Sprout;
/** CLI, pilot terminal, commands */
export const ThpTerminal = Terminal;
/** Git series, branches */
export const ThpGitBranch = GitBranch;
/** Highlights, key moments */
export const ThpSparkles = Sparkles;
/** Lesson path, milestones */
export const ThpWaypoints = Waypoints;
/** Renewable energy accent */
export const ThpZap = Zap;

/** Dynamic pick by slug (Storybook, CMS, etc.) */
export const THP_LUCIDE_MAP = {
  sun: Sun,
  leaf: Leaf,
  sprout: Sprout,
  terminal: Terminal,
  gitBranch: GitBranch,
  sparkle: Sparkles,
  learningPath: Waypoints,
  energy: Zap,
} as const satisfies Record<string, LucideIcon>;

export type ThpLucideSlug = keyof typeof THP_LUCIDE_MAP;
