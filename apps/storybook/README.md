# Storybook (Video-AI / `@repo/ui`)

This app hosts **Storybook** for UI components in `packages/ui`. The Next.js files under `src/pages` are **not** the main dev surface — they are legacy scaffolding for `@storybook/nextjs-vite`.

## Storybook URL

- **Local** : [http://localhost:6006](http://localhost:6006)
- **LAN** (same machine IP) : `http://<your-ip>:6006` — e.g. `http://192.168.0.246:6006`

**Not** port `3000` — that was `next dev` (default Next welcome page). `dev` now starts Storybook.

## Commands

From repo root:

```bash
bun run storybook
```

Or from this directory:

```bash
bun run dev
# or
bun run storybook
```

To run the Next.js app only (rare): `bun run next:dev` (usually port 3000).

## Build static Storybook

```bash
bun run build-storybook
```
