/**
 * Demo showcase timing and extended Solarpunk palette (accents: leaf, sun, teal…).
 * Semantic roles (primary, background, error, …) must stay aligned with
 * packages/theme/solarpunk.tokens.css and theme.ts → solarTheme.
 * See KM/Docs/reference/solarpunk-theme-decisions.md
 */

export const FPS = 30;
export const DEMO_DURATION = 900; // 30 seconds

export const SCENES = {
  intro: { from: 0, duration: 150 },
  text: { from: 150, duration: 150 },
  code: { from: 300, duration: 180 },
  crypto: { from: 480, duration: 180 },
  outro: { from: 660, duration: 240 },
} as const;

/** Solarpunk color palette */
export const COLORS = {
  // Backgrounds - deep forest night
  background: "#0a1410",
  backgroundLight: "#112920",
  backgroundGlow: "#0d1f1a",

  // Primary nature tones
  leaf: "#22c55e",
  vine: "#16a34a",
  moss: "#15803d",
  fern: "#4ade80",

  // Solar/light tones
  sun: "#f59e0b",
  amber: "#fbbf24",
  honey: "#fcd34d",

  // Water/tech tones
  teal: "#14b8a6",
  cyan: "#2dd4bf",
  aqua: "#5eead4",

  // Earth tones
  coral: "#f87171",
  terracotta: "#fb923c",

  // Text
  text: "#ecfdf5",
  textMuted: "#6ee7b7",
  textDark: "#365314",

  // Semantic
  primary: "#22c55e",
  secondary: "#14b8a6",
  accent: "#f59e0b",
  success: "#84cc16",
  warning: "#fbbf24",
  error: "#f87171",

  // Legacy compatibility (reference zip)
  html: "#22c55e",
  crypto: "#2dd4bf",
} as const;
