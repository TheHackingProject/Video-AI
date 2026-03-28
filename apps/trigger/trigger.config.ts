import { defineConfig } from "@trigger.dev/sdk";

/**
 * Workspace tasks (package tasks) for Trigger.dev v4 — not the self-hosted platform.
 * Platform: upstream hosting/docker, documented in infra/trigger-hosting.
 *
 * Set TRIGGER_PROJECT_REF and use CLI with -a / --api-url pointing at your
 * self-hostable instance (see Trigger self-hosting Docker docs).
 *
 * From apps/trigger: bun run trigger:dev | bun run trigger:deploy
 * (npx trigger.dev requires Node.)
 */
export default defineConfig({
  project: process.env.TRIGGER_PROJECT_REF ?? "proj_REPLACE_ME",
  runtime: "bun",
  maxDuration: 300,
  dirs: ["./src/trigger"],
  retries: {
    enabledInDev: true,
    default: {
      maxAttempts: 3,
      minTimeoutInMs: 1000,
      maxTimeoutInMs: 10_000,
      factor: 2,
      randomize: true,
    },
  },
});
