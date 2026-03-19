# Demo showcase (Remotion)

Timing (`FPS`, `DEMO_DURATION`, `SCENES`) and solarpunk `COLORS` for the `DemoShowcaseSolarpunk` composition.

- Composition entry: `packages/ui/src/DemoShowcaseSolarpunk.tsx`
- Remotion app: `apps/remotion` — composition id `DemoShowcaseSolarpunk`, duration from `demoShowcaseDuration` (`@repo/ui/remotion`)

Scene components live in `packages/ui/src/lib/remotion/` (text, code, diagrams, etc.), exported from `@repo/ui/remotion`.

## QA — verify all scenes (global composition frames)

Use composition `DemoShowcaseSolarpunk`, `fps=30`, duration `900`. Inside each `<Sequence>`, `useCurrentFrame()` is **local** (0…duration−1); `startFrame` props in `DemoShowcaseSolarpunk.tsx` are **local offsets** only.

| # | Scene   | Global frames | Check |
|---|---------|---------------|--------|
| 1 | Intro   | 0–149         | Header 1/5, particles, FloatingText, GlitchText, badges |
| 2 | Text    | 150–299       | Header 2/5, subtle particles + diagonal accents + vine tile, cards |
| 3 | Code    | 300–479       | Header 3/5, same background treatment + vine tile, terminal & flowchart |
| 4 | Crypto  | 480–659       | Header 4/5, particles + diagonal accents on top of radials, timeline & table |
| 5 | Outro   | 660–899       | Header 5/5, FloatingText, badges, Tree, Waveform, Spectrum, Buttons |

Quick jump in Remotion Studio: scrub to frame **0**, **150**, **300**, **480**, **660** (start of each scene).

Optional stills (from `apps/remotion`):  
`npx remotion still DemoShowcaseSolarpunk <frame> out.png --overwrite`
