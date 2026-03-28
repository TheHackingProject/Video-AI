# Trigger.dev v4 — référence plateforme upstream (self-hostable)

This folder **does not** contain the Trigger.dev platform. It **documents how to reference and deploy** the official **upstream** stack so the Video-AI monorepo stays limited to:

- **`apps/trigger`** — workspace / **package tasks** only (`trigger.config.ts`, task code, CLI `dev` / `deploy`).
- **`apps/api`** — HTTP API; triggers runs via `@trigger.dev/sdk` (`tasks.trigger`, type-only link to task types).

## Capacity wording

Use **self-hostable with documented limitations vs managed cloud** (warm starts, autoscaling, some cloud-only features). Do not claim full parity with Trigger.dev Cloud.

## Upstream source of truth

- Repository: [github.com/triggerdotdev/trigger.dev](https://github.com/triggerdotdev/trigger.dev)
- Compose paths: `hosting/docker/webapp`, `hosting/docker/worker` (see [Trigger self-hosting Docker](https://trigger.dev/docs/self-hosting/docker)).
- Pin a **release tag or commit SHA** in your runbooks or internal ops notes when you deploy.

## Quick start (local smoke)

```bash
git clone --depth=1 https://github.com/triggerdotdev/trigger.dev
cd trigger.dev/hosting/docker
# Follow upstream: cp .env.example .env, configure webapp, then:
#   cd webapp && docker compose up -d
# Default webapp URL in docs: http://localhost:8030
```

Worker on same machine (from `hosting/docker`):

```bash
docker compose -f webapp/docker-compose.yml -f worker/docker-compose.yml up -d
```

## Coolify / VPS

- Deploy using **upstream Compose** (or a Coolify template that tracks v4). **Build context is not** the Video-AI monorepo root.
- After deploy: configure **registry** credentials, **worker token** (if webapp and worker are split), and **`DOCKER_RUNNER_NETWORKS`** so task containers join the same Docker network as the supervisor (see [trigger-dev-coolify-spike](../../KM/Docs/runbooks/trigger-dev-coolify-spike.md)).

## CLI against self-hosted instance

From a dev machine with Node (required for `npx trigger.dev`):

```bash
npx trigger.dev@latest login -a https://trigger.your-domain.example
npx trigger.dev@latest whoami
```

Use **`--api-url` / `-a`** so the CLI does not default to Trigger.dev Cloud. Run **`dev`** / **`deploy`** from **`apps/trigger`** in this repo.

## CI (optional)

For automated task deploy, use env vars documented by Trigger (e.g. `TRIGGER_API_URL`, `TRIGGER_ACCESS_TOKEN`) — see [GitHub Actions](https://trigger.dev/docs/github-actions).

## Validation checklist (real environment)

Use this after Coolify/VPS deploy when infra is available:

1. `npx trigger.dev@latest login -a <your-webapp-url>` succeeds.
2. `deploy` from `apps/trigger` pushes the task image to the **integrated registry** (or configured registry).
3. Registry reachable from the machine running `deploy` (`docker login` as per upstream docs).
4. **`DOCKER_RUNNER_NETWORKS`** (or current equivalent in your Trigger version) matches Coolify’s network so runs leave **pending**.
5. `POST /jobs/render-pipeline` on Video-AI API with valid body returns **202** and a run appears in the Trigger UI.

## See also

- [KM/Docs/runbooks/trigger-dev-coolify-spike.md](../../KM/Docs/runbooks/trigger-dev-coolify-spike.md)
- [KM/Docs/runbooks/api.md](../../KM/Docs/runbooks/api.md)
- [KM/Docs/reference/video-ai-orchestrator-decision.md](../../KM/Docs/reference/video-ai-orchestrator-decision.md)
