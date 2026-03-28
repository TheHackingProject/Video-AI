import { defineConfig } from "@trigger.dev/sdk";

/**
 * Trigger.dev v4 — tasks under ./src/trigger.
 * Set TRIGGER_PROJECT_REF (dashboard → Project settings) and TRIGGER_SECRET_KEY.
 * CLI: from apps/api run `bun run trigger:dev` (uses npx trigger.dev — Node required for CLI).
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
