# remotion-lib phase 2 — diagram primitives (when to spike)

**EN only** (internal agent reference). **Do not** add new animated packages until **pilot outlines** consistently use the same visual language (graph + revelation storyboard + hero/secondary) — see main [`SKILL.md`](../SKILL.md) section *Schématiser l’idée*.

## When FlowChart (and cousins) is enough

- ≤ 3 nodes, horizontal or simple flow, staged via `startFrame` / `nodeDelay`.
- Edge labels are optional or short; fits `FlowChart` props from `@repo/ui/remotion`.
- Layout follows [`stack-scene-flowchart-layout.md`](stack-scene-flowchart-layout.md) inside `Serie01SceneShell`.

## When to consider new `remotion-lib` blocks

- **Repeated** patterns across **multiple** pilots: active node halo, two-phase arrow + label, reusable node card with max two text levels.
- **Labeled edges** with precise timing per edge (beyond what `FlowChart` exposes).
- Complex graphs needing **per-edge** `Sequence` without copying large TSX each time.

## Spike workflow (if triggered)

1. One composable pattern at a time (e.g. `DiagramNode` or `AnimatedArrow`).
2. Implement under `packages/remotion-lib/src/`, export from `index.ts`.
3. Add or extend a **demo** composition under `apps/remotion/.../demos/` + `Root.tsx` if it teaches a new pattern.
4. Add a row to [`library-matrix.md`](library-matrix.md) if it maps to a text/diagram role.
5. Log notable motion in `KM/Docs/reference/solarpunk-theme-decisions.md` if it becomes a THP signature.

Until then, **prefer** `FlowChart`, Mermaid → SVG (runbook §03b 3bis), and composition-level `Sequence` orchestration.
