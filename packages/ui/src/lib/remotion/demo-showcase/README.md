# Demo showcase (Remotion)

Timing (`FPS`, `DEMO_DURATION`, `SCENES`) and solarpunk `COLORS` for the `DemoShowcaseSolarpunk` composition.

- Composition entry: `packages/ui/src/DemoShowcaseSolarpunk.tsx`
- Remotion app: `apps/remotion` — composition id `DemoShowcaseSolarpunk`, duration from `demoShowcaseDuration` (`@repo/ui/remotion`)

Scene components live in `packages/ui/src/lib/remotion/` (text, code, diagrams, etc.), exported from `@repo/ui/remotion`.

**Role:** Unified **motion / kit** reference — not a full pedagogical episode. Per-category depth stays in separate demos (`TextDemo`, `TransitionsDemo`, …). See [KM/Docs/reference/da-thp-synthese.md](../../../../../../KM/Docs/reference/da-thp-synthese.md) (Reference clip).

## Primitive matrix (`@repo/ui/remotion` → showcase vs category demo)

| Primitive | In `DemoShowcaseSolarpunk`? | If not — see composition (apps/remotion) |
|-----------|----------------------------|------------------------------------------|
| Typewriter, WordByWord, TextReveal, GlitchText | Yes (text scene) | `TextDemo` |
| CodeBlock, Terminal, DiffView | Yes (code scene) | `CodeDemo` |
| FlowChart, Tree, Timeline, ComparisonTable | Yes | `DiagramsDemo` |
| SceneHeader, Badge, Button, Card, ProgressBar | Yes | `UIDemo` |
| FloatingText, ParticleField, RotatingObject | Yes | `ThreeDDemo` |
| SpeakingHead | Yes (community scene) | `CharactersDemo` |
| Waveform, Spectrum | Yes (outro) | `AudioDemo` |
| FadeSlide | Yes (scene entry on scenes 2–5) | `TransitionsDemo` |
| ZoomBlur, Wipe | No (keep showcase lean) | `TransitionsDemo` |
| Avatar, Silhouette | No | `CharactersDemo` |
| AudioBar | No | `AudioDemo` |
| useTypewriter, useSpringAnimation, useAudioData | Hooks (not shown as widgets) | — |

Update this table when adding or removing primitives from the showcase.

## QA — verify all scenes (global composition frames)

Use composition `DemoShowcaseSolarpunk`, `fps=30`, duration `DEMO_DURATION` from `config.ts` (must equal sum of `SCENES.*.duration`). Inside each `<Sequence>`, `useCurrentFrame()` is **local** (0…duration−1); `startFrame` props in `DemoShowcaseSolarpunk.tsx` are **local offsets** only.

| # | Scene   | Global frames | Check |
|---|---------|---------------|--------|
| 1 | Intro   | 0–149         | Header 1/5, particles, FloatingText, GlitchText, badges |
| 2 | Text    | 150–299       | FadeSlide entry, header 2/5, cards, Typewriter / WordByWord / TextReveal |
| 3 | Code    | 300–519       | FadeSlide entry, header 3/5, CodeBlock, Terminal, FlowChart, DiffView |
| 4 | Crypto  | 520–699       | FadeSlide entry, header 4/5, SpeakingHead, Timeline, ComparisonTable |
| 5 | Outro   | 700–939       | FadeSlide entry, header 5/5, Tree, Waveform, Spectrum, Buttons |

Quick jump in Remotion Studio: scrub to frame **0**, **150**, **300**, **520**, **700** (start of each scene).

Optional stills (from `apps/remotion`):  
`npx remotion still DemoShowcaseSolarpunk <frame> out.png --overwrite`
