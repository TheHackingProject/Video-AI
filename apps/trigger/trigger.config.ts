import { defineConfig } from "@trigger.dev/sdk";

/**
 * Workspace tasks (package tasks) for Trigger.dev v4 — not the Trigger platform itself.
 * Platform: upstream hosting/docker, documented in infra/trigger-hosting.
 *
 * Sovereign policy: CLI must use -a / --api-url toward OUR self-host instance only
 * (no Trigger.dev Cloud for Video-AI). Set TRIGGER_PROJECT_REF from that instance.
 *
 * From apps/trigger: bun run dev | bun run trigger:deploy (npx requires Node.)
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
