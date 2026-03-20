# Diagram asset pipeline (Mermaid → Remotion)

Versioned checklist per video lives next to `.mmd` sources, e.g.  
`KM/Docs/video-ai-preparation/diagrams/<video-slug>/ASSET-PIPELINE.md`.

**Mandatory order** (prevents skipping Storybook/demo/doc):

1. Commit or update `.mmd` under `KM/Docs/video-ai-preparation/diagrams/<slug>/`.
2. Generate SVG (or PNG) into `apps/remotion/public/diagrams/<slug>/` — default tooling: `bunx @mermaid-js/mermaid-cli` (see `video-ai-development` §03b). On some Linux hosts, Chromium may need a Puppeteer JSON config with `--no-sandbox`. Optional themed/batch: **pretty-mermaid** from skills.sh (see `packages/skills/README.md`). Prefer **`SchematicFlowChartView` / `FlowChart`** when a hand-drawn schematic is enough (no raster export).
3. **Storybook** — only if a new static UI block is required; otherwise mark **N/A** in the checklist with reason.
4. **Remotion demo** — only if a new reusable motion pattern is introduced; register in `Root.tsx`; otherwise **N/A**.
5. Update runbook demo table / `library-matrix.md` / solarpunk catalogue when a new pattern ships.

After each agent task, update the checklist file. If steps ran out of order, record the deviation and cause (e.g. skill not loaded, user shortcut).
