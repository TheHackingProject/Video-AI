# THP Video-AI — library block to demo matrix

Canonical export: `packages/ui/src/lib/remotion/index.ts`. Demos: `apps/remotion/src/remotion/compositions/demos/`. Register compositions in `apps/remotion/src/remotion/Root.tsx`.

| Family | Component (`@repo/ui/remotion`) | Typical intent | Demo reference | Notes |
|--------|----------------------------------|----------------|----------------|-------|
| Text | `GlitchText` | Intro hero title (default all videos) | `TextDemo` | Short text only; fixed duration; validate readability in Studio; keep deterministic fallback if visual noise is too high |
| Text | `TextReveal` | Intro subtitle, CTA title, calm concept title | `TextDemo` | Use when clarity is prioritized over strong glitch styling |
| Text | `Typewriter` | Narration, long body, callout line | `TextDemo` | CPS + pauses in `*-content.ts`; cursor policy centralized (`SHOW_TYPEWRITER_CURSOR`) |
| Text | `WordByWord` | One-line emphasis, one beat | `TextDemo` | Max ~1 phrase / scene |
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

## Script characterization contract (required)

Each pilot `*-content.ts` defines role-tagged blocks before TSX wiring:

- `ROLE_INTRO_HERO`
- `ROLE_INTRO_SUBTITLE`
- `ROLE_NARRATION`
- `ROLE_EMPHASIS`
- `ROLE_CTA_TITLE`
- `ROLE_CTA_SUBTITLE`

TSX must map these roles to the matrix above without silent exceptions.

If no row matches your need: **Storybook static first** -> optional **remotion-lib** -> **new demo** -> update this matrix and `SKILL.md`.
