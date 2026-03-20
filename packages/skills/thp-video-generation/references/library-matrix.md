# THP Video-AI — library block to demo matrix

Canonical export: `packages/ui/src/lib/remotion/index.ts`. Demos: `apps/remotion/src/remotion/compositions/demos/`. Register compositions in `apps/remotion/src/remotion/Root.tsx`.

| Family | Component (`@repo/ui/remotion`) | Typical intent | Demo reference | Notes |
|--------|----------------------------------|----------------|----------------|-------|
| Text | `Typewriter` | Narration, subtitle line | `TextDemo` | See **runbook §04** taxonomy (title vs body CPS in `*-content.ts`) |
| Text | `WordByWord` | One-line emphasis, one beat | `TextDemo` | Max ~1 phrase / scene |
| Text | `TextReveal` | Lesson hero title (default THP) | `TextDemo` | Calm impact; `theme={solarTheme}`, WCAG |
| Text | `GlitchText` | Short high-impact title / bumper / trailer sting | `TextDemo` | **Not** for long copy or main pedagogy; brief + rare; see runbook §04 (non-deterministic render — validate `still`) |
| Code | `Terminal` | Commands + output, typing | `DemoShowcaseSolarpunkDemo`, `CodeDemo` | Delays between lines; `theme={solarTheme}` |
| Code | `CodeBlock` | Syntax-highlight block | `CodeDemo` | Animated variant in demos if present |
| Code | `DiffView` | Before/after code | `CodeDemo` | When diff is the teaching point |
| Code (static UI) | `CodeBlockStatic` (`@repo/ui/code-block-static`) | Fixed snippet, no frame logic | Storybook colocated | Use in composition + `FadeIn` from `@repo/remotion-lib` |
| Transitions | `FadeSlide`, `ZoomBlur`, `Wipe` | Scene / block handoff | `TransitionsDemo` | Diversify order in one video; always `solarTheme` |
| Diagrams | `FlowChart` (uses `SchematicFlowChartView`), `Tree`, `Timeline`, `ComparisonTable` | Concept structure, text+Lucide schematic | `DiagramsDemo` | Default: React schematic (Storybook `SchematicFlowChartView`). Optional: prepared SVG for heavy diagrams (video-ai-development 03b); `diagrams/<slug>/ASSET-PIPELINE.md` + [diagram-asset-pipeline.md](diagram-asset-pipeline.md) |
| 3D | `ParticleField`, `RotatingObject`, `FloatingText` | Atmosphere / focus | `ThreeDDemo`, `DemoShowcaseSolarpunk` | Keep `ParticleField` subtle for courses |
| Audio | `Waveform`, `Spectrum`, `AudioBar` | VO / music viz | `AudioDemo` | |
| Characters | `Avatar`, `SpeakingHead`, `Silhouette` | Presenter metaphor | `CharactersDemo` | |
| UI | `SceneHeader`, `ProgressBar`, `Card`, `Badge`, `Button` | Lesson chrome | `UIDemo`, compositions | |

If no row matches your need: **Storybook static first** → optional **remotion-lib** → **new demo** → update this matrix and `SKILL.md`.
