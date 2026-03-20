# Video-AI

Monorepo and tooling to **produce and evolve pedagogical videos** for [The Hacking Project](https://www.thehackingproject.org/) (THP). Pipeline: [Remotion](https://www.remotion.dev/) compositions → render → integration on the THP platform. Primary audience: THP learners (web dev courses); secondary: team and contributors.

## Quick start

```sh
git clone --recurse-submodules <repo-url>
cd Video-AI
bun install
bun run dev --filter=remotion
```

Remotion Studio opens to preview and edit compositions. For the full workflow (idea → script → composition → review → render), see [KM/Docs/runbooks/video-ai-development.md](KM/Docs/runbooks/video-ai-development.md).

## Documentation

Documentation is organized with the [Diataxis](https://diataxis.fr/) framework in **KM/Docs** (submodule).

| Resource | Link | Description |
|----------|------|-------------|
| **Knowledge Base** | [KM/Docs/Readme.md](KM/Docs/Readme.md) | Project doc entry point |
| **Index** | [KM/Docs/01-index.md](KM/Docs/01-index.md) | Full index (architecture, runbooks, templates) |
| **Architecture** | [KM/Docs/00-architecture.md](KM/Docs/00-architecture.md) | Directory tree, UI vs Remotion, repositories |
| **Video-AI** | [video-lifecycle](KM/Docs/reference/video-lifecycle.md) · [vision](KM/Docs/explanation/video-ai-vision.md) | Canonical reference, lifecycle, vision v1/v2/v3 |
| **Runbooks** | [monorepo](KM/Docs/runbooks/monorepo.md) · [remotion](KM/Docs/runbooks/remotion.md) · [bun-biome](KM/Docs/runbooks/bun-biome.md) · [storybook](KM/Docs/runbooks/storybook.md) | Procedures (Turborepo, Remotion, Bun/Biome, Storybook) |

## Monorepo contents

Stack: **Turborepo**, **Bun** (package manager), **Biome** (lint/format), TypeScript. Workspaces: `apps/*`, `packages/*`.

### Apps

- **`remotion`** — [Remotion](https://www.remotion.dev/) Studio: create and preview video compositions (registered under `apps/remotion/src/remotion/compositions/`).
- **`storybook`** — [Storybook](https://storybook.js.org/): documentation for the static UI component library.

*(Other apps, e.g. `docs` / `web` Next.js, may be added; see [00-architecture](KM/Docs/00-architecture.md).)*

### Packages

- **`@repo/ui`** — Static design system (button, card, code, etc.) + Remotion components in `lib/remotion/` (migrating to `remotion-lib`).
- **`@repo/remotion-lib`** — Reusable animated primitives and blocks for compositions.
- **`@repo/eslint-config`** — Shared ESLint configurations.
- **`@repo/typescript-config`** — Shared `tsconfig.json`s.

Detailed rules (UI vs Remotion, where to put compositions and primitives): [KM/Docs/00-architecture.md](KM/Docs/00-architecture.md#ui-vs-remotion).

### Submodules

- **KM/Docs** — Project documentation (this README points to it).
- **KM/Course/** — Course content (Intro, Fullstack, React).
- **packages/skills/Remotion** — Remotion agent skills ([remotion-dev/skills](https://github.com/remotion-dev/skills)). Include in submodule init: `git submodule update --init packages/skills/Remotion` (or full `--recursive`).

For a full clone: `git clone --recurse-submodules <repo-url>`. If already cloned: `git submodule update --init --recursive`.

Layout and symlinks (`remotion-best-practices`, `apps/remotion/.agents/...`): [`packages/skills/README.md`](packages/skills/README.md).

## Stack and tools

- **Package manager**: [Bun](https://bun.sh/) (`packageManager` in root `package.json`).
- **Lint / format**: [Biome](https://biomejs.dev/) (root); `format` script still uses Prettier for part of formatting.
- **TypeScript**: static typing across the monorepo.

## Main commands

From the repo root (Video-AI):

| Action | Command |
|--------|---------|
| Install | `bun install` |
| Build all | `bun run build` |
| Dev all | `bun run dev` |
| Dev Remotion only | `bun run dev --filter=remotion` |
| Dev Storybook only | `bun run storybook` or `bun run dev --filter=storybook` → **http://localhost:6006** (not port 3000) |
| Lint | `bun run lint` |
| Type check | `bun run check-types` |

With global Turbo: `turbo build`, `turbo dev --filter=remotion`, etc. Details: [KM/Docs/runbooks/monorepo.md](KM/Docs/runbooks/monorepo.md).

## Useful links

**Project**

- [Architecture](KM/Docs/00-architecture.md) · [Doc index](KM/Docs/01-index.md) · [Monorepo runbook](KM/Docs/runbooks/monorepo.md) · [Remotion runbook](KM/Docs/runbooks/remotion.md)
- [Video lifecycle](KM/Docs/reference/video-lifecycle.md) · [Vision v1/v2/v3](KM/Docs/explanation/video-ai-vision.md)

**Turborepo**

- [Tasks](https://turborepo.dev/docs/crafting-your-repository/running-tasks) · [Caching](https://turborepo.dev/docs/crafting-your-repository/caching) · [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching) · [Filtering](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters) · [Configuration](https://turborepo.dev/docs/reference/configuration) · [CLI](https://turborepo.dev/docs/reference/command-line-reference)
