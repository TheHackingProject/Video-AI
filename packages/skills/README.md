# Skills for the Video-AI workflow

This folder collects skills used for video creation and production workflow.

## Skills used in this repo

- `Remotion/` — official Remotion submodule (`@remotion/skills`) for composition patterns, animation, assets, timing, audio, etc.
- `thp-video-generation/` — **Video-AI project** skill — block choice (text, code, transitions, 3D, diagrams), Storybook → demo → doc workflow, THP / `solarTheme` alignment. Entry: [`thp-video-generation/SKILL.md`](thp-video-generation/SKILL.md); detailed matrix: [`thp-video-generation/references/library-matrix.md`](thp-video-generation/references/library-matrix.md).

## Recommended external skills

### Mermaid → SVG (diagrams)

**Default (no extra install, repo-friendly)** — official CLI, same as §03b:

```bash
bunx @mermaid-js/mermaid-cli -i path/to/diagram.mmd -o apps/remotion/public/diagrams/slug/diagram.svg
```

**Optional — themed / batch / multiple outputs** — Agent Skill **pretty-mermaid** ([skills.sh entry](https://skills.sh/imxv/pretty-mermaid-skills/pretty-mermaid), repo [imxv/pretty-mermaid-skills](https://github.com/imxv/pretty-mermaid-skills)):

```bash
npx skills add https://github.com/imxv/pretty-mermaid-skills --skill pretty-mermaid
```

Then use the skill’s `scripts/render.mjs` / `scripts/batch.mjs` from the installed skill directory (see that repo’s `SKILL.md`). For **Cursor**, mirror the installed folder under `.cursor/skills/pretty-mermaid` if your install path is elsewhere (same pattern as `thp-video-generation`).

**When to use which**: prefer `bunx @mermaid-js/mermaid-cli` for minimal CI and `-c mermaid-config.json` alignment with THP ; use **pretty-mermaid** when you need built-in themes, parallel batch renders, or ASCII previews.

**Checklist per video**: after adding or changing diagrams, update `KM/Docs/video-ai-preparation/diagrams/<slug>/ASSET-PIPELINE.md` (order: `.mmd` → SVG in `public/` → Storybook if needed → Remotion demo if needed → docs). See [thp-video-generation/references/diagram-asset-pipeline.md](thp-video-generation/references/diagram-asset-pipeline.md).

Paths and options: [runbooks/video-ai-development](../../KM/Docs/runbooks/video-ai-development.md) (section 03b, item 3bis).

- AI SVG generation: `@neversight/generate-svg` via agentskill.sh — generate vector illustrations (logos, visuals, icons) exportable as SVG for Remotion scenes.

## Why this workflow

- Keeping Mermaid diagrams as text (`.mmd`) improves diff, review, and versioning.
- Generating SVG upfront makes Remotion output more stable and deterministic (no Mermaid at video render time).
- Remotion owns motion (sequences, opacity, masks, zoom, transitions).
