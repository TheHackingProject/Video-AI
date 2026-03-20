# @repo/theme

## THP Solarpunk (dark only)

**Source of truth for semantic colors on the web:**

- [`solarpunk.tokens.css`](./solarpunk.tokens.css) — defines `:root` (and `:root[data-theme="solarpunk"]` with identical values).

**Keep in sync with** `packages/ui/src/lib/remotion/theme.ts` → `solarTheme.colors` for the same semantic roles (`primary`, `background`, `error`, etc.).

**Documentation:** `KM/Docs/reference/solarpunk-theme-decisions.md`

Extended demo-only palette (leaf, sun, teal, …): `packages/ui/src/lib/remotion/demo-showcase/config.ts` — document any new hex there and justify in the decisions doc if it becomes product-wide.
