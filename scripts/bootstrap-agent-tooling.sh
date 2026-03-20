#!/usr/bin/env bash
# Bootstrap agent tooling paths for Video-AI (Cursor Agent Skills + symlink targets).
# Run from repo root: bash scripts/bootstrap-agent-tooling.sh
# Or: bun run bootstrap:agents
#
# - Initializes packages/skills/Remotion so remotion-best-practices resolves.
# - Creates .cursor/skills/* symlinks (gitignored except environment.json policy).
#
# thp-solarpunk-visual: not under packages/skills/; install via KM meta or symlink
# .cursor/skills/thp-solarpunk-visual manually — see packages/skills/README.md

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "${REPO_ROOT}"

if [[ ! -d .git ]]; then
  echo "error: run from Video-AI repository root" >&2
  exit 1
fi

echo "Initializing submodule packages/skills/Remotion..."
git submodule update --init packages/skills/Remotion

if [[ ! -f packages/skills/remotion-best-practices/SKILL.md ]]; then
  echo "error: packages/skills/remotion-best-practices/SKILL.md missing after submodule init" >&2
  exit 1
fi

CURSOR_SKILLS="${REPO_ROOT}/.cursor/skills"
mkdir -p "${CURSOR_SKILLS}"

link_skill() {
  local name="$1"
  local target="$2"
  local linkpath="${CURSOR_SKILLS}/${name}"
  rm -f "${linkpath}"
  ln -sfn "${target}" "${linkpath}"
  echo "Linked .cursor/skills/${name} -> ${target}"
}

# Reuse stable monorepo paths (relative to .cursor/skills/)
link_skill "thp-video-generation" "../../packages/skills/thp-video-generation"
link_skill "remotion-best-practices" "../../packages/skills/remotion-best-practices"

echo "Done. Optional: ln -sf \"\$(pwd)/.cursor/skills/thp-solarpunk-visual\" only if you maintain that folder locally."
