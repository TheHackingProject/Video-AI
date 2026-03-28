---
name: thp-video-generation
description: THP Video-AI pipeline — choose Remotion visuals per block type (text, code, transitions, 3D, diagrams), enforce Storybook-to-demo-to-doc workflow, solarTheme and runbooks. Includes Visual Soul research (vulgarisation, non-text beats). Use when the user authors or reviews THP course videos, Remotion compositions, pilot outlines, block library choice, video title beats, transition order, diagram vs terminal, THP video skill, visual creativity, or visual choice for a lesson.
category: onboarding
metadata:
  tags: thp, video-ai, remotion, solarpunk, storybook, workflow, vulgarisation, visuals
---

# THP Video generation (Video-AI monorepo)

Project-specific skill. Pair with **remotion-best-practices** from `packages/skills/remotion-best-practices/SKILL.md` (symlink to `Remotion/skills/remotion`; ensure submodule `packages/skills/Remotion` is initialized) for low-level Remotion rules.

## When to use

- New or refactored **composition** under `apps/remotion/src/remotion/compositions/`.
- **Pilot / outline** work in `KM/Docs/video-ai-preparation/`.
- Deciding **which visual** for a beat (code vs text vs diagram vs 3D vs transition).
- Raising **creative / pedagogical** bar: less text-only, more **vulgarisation** cues for a general audience.
- Adding a **missing** UI block: static component, Storybook, demo, docs.

## Source of truth (strict, no duplicate matrix)

1. **This SKILL** (`packages/skills/thp-video-generation/SKILL.md`) — canonical workflow contract.
2. `references/library-matrix.md` (this package) — canonical role-to-component matrix used by scripts/compositions.
3. `KM/Docs/runbooks/video-ai-development.md` — operational procedure and QA loop; references this SKILL/matrix.
4. `KM/Docs/runbooks/remotion.md` — Remotion-specific commands and runtime guidance.
5. `KM/Docs/reference/solarpunk-theme-decisions.md` — theme/motion decisions log (history, not matrix source).
6. `packages/ui/src/lib/remotion/index.ts` — available exports to apply the matrix.
7. **Visual Soul (research)** — `KM/Docs/research/soul-recherche-visuelle.md` + topic file(s) e.g. `KM/Docs/research/git-github-vulgarisation-visuelle.md`. Agent summary: [`references/visual-soul-workflow.md`](references/visual-soul-workflow.md).
8. **Phase 2 diagram primitives** — when to factor `remotion-lib` vs reuse `FlowChart`: [`references/remotion-lib-phase2-diagrams.md`](references/remotion-lib-phase2-diagrams.md).

If another doc disagrees with the matrix, update this SKILL + matrix first, then align docs.

## Visual Soul — vulgarisation & creativity (before scripting)

**Goal:** each video topic has **understandable non-text** beats for a general audience, not only animated paragraphs.

1. **Open** the topic Soul file under `KM/Docs/research/` (create from the template in `soul-recherche-visuelle.md` if missing).
2. **Append** a short **Incrément** after each research pass (metaphor, on-screen idea, anti-patterns).
3. **Map** to the pilot outline: per scene, at least **one** bullet in **“Cues visuels / Soul”** → drives `FlowChart` / `Terminal` / `ComparisonTable` / future SVG or split layout.
4. **Rule of thumb:** at least **one scene per Format-1 clip** where the **primary focus** is **not** a long `Typewriter` block (diagram-led or prop-led beat).
5. Pair with **thp-solarpunk-visual** so new visuals stay on-brand (contrast, motion, Solarpunk kit).

Do not duplicate the full Soul file inside outlines — **summarize** into actionable cues only.

## Schématiser l’idée — graphe, hero, révélation (avant / pendant l’outline)

**Goal:** clips **mémorables** — pas seulement du texte qui apparaît. Le pilot outline ([`KM/Docs/Templates/pilot-outline.md`](../../../KM/Docs/Templates/pilot-outline.md)) impose pour **Format 1** un **graphe conceptuel** + **storyboard de révélation** ; **Format 2+** : même chose **si** le sujet le justifie, sinon **N/A** documenté (une ligne).

**Rules**

1. **Une scène = un message visuel dominant.** Si un graphe est à l’écran, il **porte le sens principal** — éviter le slide « gros `Typewriter` + petit schéma décoratif ».
2. **Hero object** (dans l’outline, par scène) : noter **objet principal** vs **secondaire** (support). Ça force l’intention avant le TSX.
3. Le graphe dans l’outline (nœuds + arêtes étiquetées) **matérialise** les cues Soul ; le storyboard lie **frame (ou seconde) → élément révélé → phrase VO**.
4. **Polish / respiration** : pour les beats clés, viser **entrée → hold → sortie** (noté dans l’outline ou `*-content.ts`). Réf. **remotion-best-practices** : [`rules/animations.md`](../remotion-best-practices/rules/animations.md), [`rules/sequencing.md`](../remotion-best-practices/rules/sequencing.md), [`rules/text-animations.md`](../remotion-best-practices/rules/text-animations.md) selon le besoin.

**Concrete visual patterns** (implement with existing components first; factor to `remotion-lib` only when a pattern repeats — see [`references/remotion-lib-phase2-diagrams.md`](references/remotion-lib-phase2-diagrams.md)):

- **Active node** : border glow, slight scale-up, soft shadow **synced** to VO.
- **Relation arrow** : draw stroke in **two beats**, then reveal **edge label** when the relation is spoken.
- **Node card** : short title + simple icon + brief subtitle — **at most two** information levels per card.
- **Section handoff** : diagram **folds** or **shifts** slightly instead of hard cut when possible.

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
- When a diagram is on screen, it must **carry the teaching meaning** (hero), not decorate a wall of text — align `Sequence` / `startFrame` / `nodeDelay` with the **storyboard de révélation** in the pilot outline.
- **`Serie01SceneShell` + `layout="stack"` + bottom `FlowChart`**: do **not** position the chart with `position: absolute` / `bottom` — transitions use `transform`, which breaks alignment with padded content. Use in-flow flex (body → spacer → diagram row). See [`references/stack-scene-flowchart-layout.md`](references/stack-scene-flowchart-layout.md).
- Heavy / versioned schema? → Mermaid (or other) **source file** + generated SVG per workflow in `video-ai-development` §03b 3bis; animate reveal in Remotion.
- **Order and traceability**: follow [`references/diagram-asset-pipeline.md`](references/diagram-asset-pipeline.md) and keep `KM/Docs/video-ai-preparation/diagrams/<slug>/ASSET-PIPELINE.md` updated when using optional **Mermaid → SVG** assets (no Storybook/demo before `.mmd` + `public/` unless documented N/A).
- **Default THP lesson flow**: `SchematicFlowChartView` (Storybook) + `FlowChart` (`DiagramsDemo`) — text, Lucide icons, arrows; no tiny raster/SVG diagram for primary pedagogy.
- **Phase 2 — new `remotion-lib` primitives** (e.g. reusable `DiagramNode`, `AnimatedArrow`): only after outlines stabilize shared language; see [`references/remotion-lib-phase2-diagrams.md`](references/remotion-lib-phase2-diagrams.md).

### Polish visuel et respiration

- Stagger group entrances a few frames apart when the frame is busy (`sequencing.md`).
- **Entrée → hold → sortie** : document in `*-content.ts` or pilot outline for critical beats; avoid zero hold on key ideas.
- Match **active** diagram element to current VO line (timing in content module, not only in prose outline).

### 3D

- **ParticleField**: background only, low opacity (Solarpunk demos).
- **RotatingObject / FloatingText**: use sparingly; must not hurt readability.

### Audio / characters

- See `AudioDemo` / `CharactersDemo` and remotion skill rules for `audio.md`, `voiceover.md` when relevant.

### Visual Soul (vulgarisation)

- Did you open the **topic Soul file** in `KM/Docs/research/` and add or reuse **cues** for this pilot?
- Does every scene have a **non-text** option considered (even if rejected with a one-line reason)?
- For **Format 1 (~45 s)**, is there **at least one** scene whose **hero** is diagram / prop / terminal excerpt, not long narration alone?

## Anti-patterns

- One-off colors or motion **outside** `solarTheme` / kit springs without ADR-level justification.
- Decorative `--error` color (solarpunk decisions).
- Short nested `Sequence` for content that must remain visible until scene end.
- New animated effect **without** demo + doc update.
- **Text-only** Format-1 clip with **no** diagram-led or prop-led hero scene when the topic file already lists viable cues.
- **Format 1** pilot outline **without** filled **Graphe conceptuel** + **Storyboard de révélation** (unless exception logged for §07).
- **Decorative diagram**: small chart under dominant `Typewriter` with **no** declared **hero / secondaire** in the outline.
- **Diagram appears only at the end** of the scene with **no** sync to the VO line that introduces it (unless intentional stylistic choice, document in outline).

## Done (before closing a video slice)

- `apps/remotion`: lint / types green for touched packages.
- Studio pass on target composition; duration and holds OK.
- **Outline** : pour Format 1, graphe + storyboard de révélation + table hero/secondaire conformes au template ; polish items pertinents cochés ou reportés justifiés.
- `KM/Docs/Templates/thp-solarpunk-visual-checklist.md` addressed when visuals changed (incl. section **Schémas** si applicable).
- If new block: Storybook + demo + matrix row + runbook link if new demo name.
- **Soul**: topic file under `KM/Docs/research/` updated when new visual metaphors were found; pilot outline **Cues visuels / Soul** aligned.
- If the episode is **listed on the web app**: `packages/db` seed + `apps/frontend` `sceneRegistry` (see runbook `KM/Docs/runbooks/frontend.md`).

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
