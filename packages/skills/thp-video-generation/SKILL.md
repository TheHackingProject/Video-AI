---
name: thp-video-generation
description: THP Video-AI pipeline — choose Remotion visuals per block type (text, code, transitions, 3D, diagrams), enforce Storybook-to-demo-to-doc workflow, solarTheme and runbooks. Use when the user authors or reviews THP course videos, Remotion compositions, pilot outlines, block library choice, video title beats, transition order, diagram vs terminal, THP video skill, or visual choice for a lesson.
category: onboarding
metadata:
  tags: thp, video-ai, remotion, solarpunk, storybook, workflow
---

# THP Video generation (Video-AI monorepo)

Project-specific skill. Pair with **remotion-best-practices** from `packages/skills/remotion-best-practices/SKILL.md` (symlink to `Remotion/skills/remotion`; ensure submodule `packages/skills/Remotion` is initialized) for low-level Remotion rules.

## When to use

- New or refactored **composition** under `apps/remotion/src/remotion/compositions/`.
- **Pilot / outline** work in `KM/Docs/video-ai-preparation/`.
- Deciding **which visual** for a beat (code vs text vs diagram vs 3D vs transition).
- Adding a **missing** UI block: static component, Storybook, demo, docs.

## Source of truth (strict, no duplicate matrix)

1. **This SKILL** (`packages/skills/thp-video-generation/SKILL.md`) — canonical workflow contract.
2. `references/library-matrix.md` (this package) — canonical role-to-component matrix used by scripts/compositions.
3. `KM/Docs/runbooks/video-ai-development.md` — operational procedure and QA loop; references this SKILL/matrix.
4. `KM/Docs/runbooks/remotion.md` — Remotion-specific commands and runtime guidance.
5. `KM/Docs/reference/solarpunk-theme-decisions.md` — theme/motion decisions log (history, not matrix source).
6. `packages/ui/src/lib/remotion/index.ts` — available exports to apply the matrix.

If another doc disagrees with the matrix, update this SKILL + matrix first, then align docs.

## Workflow: missing building block

1. **Need is not in library** (check `index.ts` + `references/library-matrix.md`).
2. **Static UI** in `packages/ui/src/` — **no** `useCurrentFrame` (see `KM/Docs/00-architecture.md` UI vs Remotion).
3. **Storybook** — colocated `*.stories.tsx`; validate with repo Storybook runbook.
4. **Animated primitive** — `packages/remotion-lib/` if reusable frame-aware behavior.
5. **Demo composition** — `apps/remotion/src/remotion/compositions/demos/` + register in `apps/remotion/src/remotion/Root.tsx`.
6. **Docs** — update `KM/Docs/runbooks/remotion.md` demo table if needed; solarpunk decisions table if signature motion; `references/library-matrix.md` row.
7. **Re-read** this SKILL — keep matrices accurate.

## Decision prompts (agent checklist)

### Text

- What **role**? Use the canonical matrix in `references/library-matrix.md`.
- Global v1 decision: intro hero title defaults to `GlitchText` for all videos; subtitle defaults to `TextReveal`.
- Script files (`*-content.ts`) must characterize each visible text block with explicit role constants/ids to avoid implicit choices in TSX.
- Must the line **stay on screen until scene cut**? If yes, parent `Sequence` duration must cover `sceneDuration - from` (no premature unmount).
- **CPS / pauses** live in `*-content.ts`, not scattered magic numbers.

### Code

- Learner **types commands and sees output**? → `Terminal` with `delay` between lines, `theme={solarTheme}`.
- **Static excerpt** (no replay)? → `CodeBlockStatic` + `FadeIn`.
- **Diff story**? → `DiffView` when appropriate.
- Do **not** duplicate CLI lines as raw `Typewriter` if `Terminal` is the teaching device.

### Transitions

- Prefer `FadeSlide`, `ZoomBlur`, `Wipe` from `@repo/ui/remotion` with **`theme={solarTheme}`**.
- **Diversify** within one video: avoid the same transition on every cut; use `TransitionsDemo` for ordering ideas.
- Do not add `@remotion/transitions` package unless already a declared dependency (project convention).

### Diagrams

- Simple staged nodes (few steps)? → `FlowChart` / `Tree` / `Timeline` / `ComparisonTable` as fits.
- **`Serie01SceneShell` + `layout="stack"` + bottom `FlowChart`**: do **not** position the chart with `position: absolute` / `bottom` — transitions use `transform`, which breaks alignment with padded content. Use in-flow flex (body → spacer → diagram row). See [`references/stack-scene-flowchart-layout.md`](references/stack-scene-flowchart-layout.md).
- Heavy / versioned schema? → Mermaid (or other) **source file** + generated SVG per workflow in `video-ai-development` §03b 3bis; animate reveal in Remotion.
- **Order and traceability**: follow [`references/diagram-asset-pipeline.md`](references/diagram-asset-pipeline.md) and keep `KM/Docs/video-ai-preparation/diagrams/<slug>/ASSET-PIPELINE.md` updated when using optional **Mermaid → SVG** assets (no Storybook/demo before `.mmd` + `public/` unless documented N/A).
- **Default THP lesson flow**: `SchematicFlowChartView` (Storybook) + `FlowChart` (`DiagramsDemo`) — text, Lucide icons, arrows; no tiny raster/SVG diagram for primary pedagogy.

### 3D

- **ParticleField**: background only, low opacity (Solarpunk demos).
- **RotatingObject / FloatingText**: use sparingly; must not hurt readability.

### Audio / characters

- See `AudioDemo` / `CharactersDemo` and remotion skill rules for `audio.md`, `voiceover.md` when relevant.

## Anti-patterns

- One-off colors or motion **outside** `solarTheme` / kit springs without ADR-level justification.
- Decorative `--error` color (solarpunk decisions).
- Short nested `Sequence` for content that must remain visible until scene end.
- New animated effect **without** demo + doc update.

## Done (before closing a video slice)

- `apps/remotion`: lint / types green for touched packages.
- Studio pass on target composition; duration and holds OK.
- `KM/Docs/Templates/thp-solarpunk-visual-checklist.md` addressed when visuals changed.
- If new block: Storybook + demo + matrix row + runbook link if new demo name.

## Cursor install

Source of truth: **`packages/skills/thp-video-generation/`** (this folder). Cursor loads **Agent Skills** from **`.cursor/skills/`**. From the **Video-AI repo root**, fastest path:

```bash
bun run bootstrap:agents
```

Manual alternatives:

**Copy**

```bash
mkdir -p .cursor/skills && cp -r packages/skills/thp-video-generation .cursor/skills/
```

**Symlink** (pick up git updates without copying)

```bash
mkdir -p .cursor/skills && ln -sf "$(pwd)/packages/skills/thp-video-generation" .cursor/skills/thp-video-generation
```

Check that `.cursor/skills/thp-video-generation/SKILL.md` exists. Same pattern as other project skills (e.g. `thp-solarpunk-visual`).

Optional — symlink **remotion-best-practices** for Cursor as well:

```bash
ln -sf "$(pwd)/packages/skills/remotion-best-practices" .cursor/skills/remotion-best-practices
```

Requires `git submodule update --init packages/skills/Remotion` so the link resolves. See [`packages/skills/README.md`](../README.md).
