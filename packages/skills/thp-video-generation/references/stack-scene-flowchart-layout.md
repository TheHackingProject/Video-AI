# Stack scenes + FlowChart layout (THP Video-AI)

**Audience**: Remotion compositions using `Serie01SceneShell` with `layout="stack"` and a `FlowChart` (or similar diagram) under body copy.

## Problem

`Serie01SceneShell` wraps slide content in a transition (`FadeSlide` / `Wipe` / `ZoomBlur`) that applies **`transform`** on an `AbsoluteFill`.

In CSS, a transformed ancestor becomes the **containing block** for `position: absolute` descendants. As a result:

- `bottom` / `left` / `right` on an absolutely positioned diagram are relative to that **full-frame** layer, **not** the padded inner column (`paddingTop` / `paddingBottom` / horizontal padding).
- The diagram ignores the shell’s “safe” content box and can sit too low (ProgressBar), misaligned with the text column, or collide with wrapped body text.

Nested `Sequence` + `position: absolute` was a common pattern in serie-01 pilots; it is **fragile** for this reason.

## Rule (required)

1. For **`layout="stack"`** scenes with a diagram under copy:
   - Ensure the shell’s scene column **fills** the padded area vertically (`Serie01SceneShell` sets `flex: 1` + `minHeight: 0` on the column in stack mode).
   - Use an outer wrapper: **`flex: 1`**, **`minHeight: 0`**, **`display: flex`**, **`flexDirection: column`**, **`justifyContent: "center"`** — this **vertically centers** the whole block so it does not stick to the top or bottom.
   - Inside that, one **group** (no growing spacer between copy and chart): **narration** → **fixed `marginTop` (e.g. 28px)** → **diagram row** (`display: flex`, `justifyContent: "center"`).
2. **Do not** insert **`flex: 1`** between narration and `FlowChart`. That absorbs all extra height and **pins the chart to the progress bar** with a large empty band above — bad UX.
3. Keep the diagram **in normal flow** (no `position: absolute` for placement).
4. Delay the diagram **fade** with `FadeIn` `startFrame={…}` (scene-local frames). Delay node springs with `FlowChart` `startFrame={fadeStart + nodeOffset}` (export a single constant from `*-content.ts`, e.g. `WORKFLOW_FLOWCHART_START_FRAME`).
5. Use moderate `bottomPadding` on the shell to clear the global `ProgressBar`.

## Reference implementations

- `apps/remotion/src/remotion/compositions/serie-01/Pilot02GitVsGithub.tsx` — GitHub scene + 2-node `FlowChart`.
- `apps/remotion/src/remotion/compositions/serie-01/Pilot03Commit.tsx` — workflow scene + 3-node `FlowChart`.

## Related

- `KM/Docs/runbooks/video-ai-development.md` — §04 pacing / layout.
- `references/library-matrix.md` — `FlowChart` role.
