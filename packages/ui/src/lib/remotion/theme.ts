export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    success: string;
    warning: string;
    error: string;
    background: string;
    backgroundLight: string;
    text: string;
    textMuted: string;
    textDark: string;
    code: {
      background: string;
      text: string;
      keyword: string;
      string: string;
      comment: string;
      function: string;
      variable: string;
    };
  };
  fonts: {
    title: string;
    body: string;
    code: string;
  };
  fontSizes: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
    display: number;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    full: number;
  };
}

/**
 * THP / Video-AI canonical Remotion theme (Solarpunk dark).
 * Keep semantic hex in sync with packages/theme/solarpunk.tokens.css
 *
 * Text animation roles (Typewriter vs TextReveal vs GlitchText, etc.) live in
 * KM/Docs/runbooks/video-ai-development.md §04 — not in this Theme object.
 */
export const solarTheme: Theme = {
  colors: {
    primary: "#22c55e",
    secondary: "#14b8a6",
    accent: "#f59e0b",
    success: "#84cc16",
    warning: "#fbbf24",
    error: "#f87171",

    background: "#0a1410",
    backgroundLight: "#112920",
    text: "#ecfdf5",
    textMuted: "#6ee7b7",
    textDark: "#365314",
    code: {
      background: "#071311",
      text: "#d1fae5",
      keyword: "#22c55e",
      string: "#fcd34d",
      comment: "#4ade80",
      function: "#2dd4bf",
      variable: "#f59e0b",
    },
  },
  fonts: {
    title: "'Poppins', sans-serif",
    body: "'Inter', sans-serif",
    code: "'JetBrains Mono', monospace",
  },
  fontSizes: {
    xs: 14,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
    xxl: 48,
    display: 72,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 6,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
};

/** Default for all @repo/ui/remotion components — aliases THP Solarpunk. */
export const defaultTheme = solarTheme;
