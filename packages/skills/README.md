# Skills for the Video-AI workflow

This folder collects skills used for video creation and production workflow.

## Layout (single source of truth at monorepo root)

| Path | Role |
|------|------|
| `Remotion/` | **Git submodule** → [remotion-dev/skills](https://github.com/remotion-dev/skills.git) (official Remotion agent pack). After clone: `git submodule update --init packages/skills/Remotion`. |
| `remotion-best-practices` | **Symlink** → `Remotion/skills/remotion` (same `SKILL.md` + `rules/` as upstream). Commit this link so paths stay stable in docs. |
| `thp-video-generation/` | **Versioned** THP pipeline skill (this repo). |

**Repo root (`Video-AI/`)** : `.agents/skills/remotion-best-practices` is a **symlink** to `packages/skills/remotion-best-practices` for tools whose working directory is the monorepo root.

**App Remotion (`apps/remotion`)** : `apps/remotion/.agents/skills/remotion-best-practices` is a **symlink** to `packages/skills/remotion-best-practices` for agents scoped to the Remotion app — same tree, no duplicate files.

## Bootstrap (Cursor Agent Skills + machines distantes)

Run once after clone (or rely on **Cursor Background Agents** — [`.cursor/environment.json`](../../.cursor/environment.json) runs an equivalent `install` step):

```bash
bun run bootstrap:agents
# or: bash scripts/bootstrap-agent-tooling.sh
```

This initializes `packages/skills/Remotion` and creates **`.cursor/skills/`** symlinks to `thp-video-generation` and `remotion-best-practices`.

**`thp-solarpunk-visual`** is not under `packages/skills/`; symlink manually from [KM/Docs/meta/thp-solarpunk-visual-skill.md](../../KM/Docs/meta/thp-solarpunk-visual-skill.md) if you use it in Cursor.

**Note:** Cursor **Agent Skills** read `.cursor/skills/`, not `apps/remotion/.agents/`. The `.agents/` paths are for other agent stacks (e.g. Codex) with a different CWD.

## Clone / update submodule

```bash
# Full clone (recommended)
git clone --recurse-submodules <repo-url>

# Or after a shallow clone
git submodule update --init packages/skills/Remotion
```

To advance the Remotion skills pin:

```bash
cd packages/skills/Remotion
git fetch origin && git checkout main && git pull --ff-only
cd ../../..
git add packages/skills/Remotion
git commit -m "chore: bump remotion-dev/skills submodule"
```

## Skills used in this repo

- **`Remotion/`** + **`remotion-best-practices`** — official Remotion rules (`@remotion/skills`), composition patterns, animation, assets, timing, audio, etc.
- **`thp-video-generation/`** — **Video-AI project** skill — block choice (text, code, transitions, 3D, diagrams), Storybook → demo → doc workflow, THP / `solarTheme` alignment. Entry: [`thp-video-generation/SKILL.md`](thp-video-generation/SKILL.md); matrix: [`thp-video-generation/references/library-matrix.md`](thp-video-generation/references/library-matrix.md).

### Cursor (local symlinks)

Prefer **`bun run bootstrap:agents`** to populate **`.cursor/skills/`**. To link by hand:

```bash
mkdir -p .cursor/skills
ln -sf "$(pwd)/packages/skills/thp-video-generation" .cursor/skills/thp-video-generation
ln -sf "$(pwd)/packages/skills/remotion-best-practices" .cursor/skills/remotion-best-practices
```

### Windows

Symlinks in the repo require `git config core.symlinks true` and Developer Mode (or run Git as admin). If symlinks are checked out as plain files, re-clone with symlink support enabled.

## Recommended external skills

### Mermaid → SVG (diagrams)

**Default (no extra install, repo-friendly)** — official CLI, same as §03b:

```bash
bunx @mermaid-js/mermaid-cli -i path/to/diagram.mmd -o apps/remotion/public/diagrams/slug/diagram.svg
```

**Optional — themed / batch** — Agent Skill **pretty-mermaid** ([skills.sh](https://skills.sh/imxv/pretty-mermaid-skills/pretty-mermaid), [imxv/pretty-mermaid-skills](https://github.com/imxv/pretty-mermaid-skills)):

```bash
npx skills add https://github.com/imxv/pretty-mermaid-skills --skill pretty-mermaid
```

**When to use which**: prefer `bunx @mermaid-js/mermaid-cli` for minimal CI and `-c mermaid-config.json` alignment with THP ; use **pretty-mermaid** when you need built-in themes, parallel batch renders, or ASCII previews.

**Checklist per video**: update `KM/Docs/video-ai-preparation/diagrams/<slug>/ASSET-PIPELINE.md`. See [thp-video-generation/references/diagram-asset-pipeline.md](thp-video-generation/references/diagram-asset-pipeline.md).

Paths and options: [runbooks/video-ai-development](../../KM/Docs/runbooks/video-ai-development.md) (section 03b, item 3bis).

- AI SVG generation: `@neversight/generate-svg` via agentskill.sh — vector illustrations for Remotion scenes.

## Why this workflow

- **Submodule** pins a tested commit of upstream Remotion skills; PRs can bump the pin explicitly.
- **Symlinks** avoid duplicating tens of rule files under `apps/remotion/.agents/` while keeping agent tooling paths predictable.
- Keeping Mermaid as `.mmd` improves diff/review; generating SVG before render keeps Remotion deterministic.
