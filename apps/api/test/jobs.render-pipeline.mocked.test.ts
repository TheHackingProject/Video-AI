import { beforeAll, describe, expect, it, mock } from "bun:test";

mock.module("../src/lib/triggerRenderPipeline.ts", () => ({
  triggerRenderPipeline: mock(() => Promise.resolve({ id: "mocked-run-id" })),
}));

let app: typeof import("../src/app").app;

beforeAll(async () => {
  const mod = await import("../src/app");
  app = mod.app;
});

describe("POST /jobs/render-pipeline (triggerRenderPipeline mocked)", () => {
  it("returns 202 with queued message and run id when env is set", async () => {
    const prevKey = process.env.TRIGGER_SECRET_KEY;
    const prevUrl = process.env.TRIGGER_API_URL;
    process.env.TRIGGER_SECRET_KEY = "test_key_for_mocked_trigger";
    process.env.TRIGGER_API_URL = "http://localhost:8030";

    const res = await app.request("/jobs/render-pipeline", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ compositionId: "Pilot01Prerequis" }),
    });

    if (prevKey !== undefined) process.env.TRIGGER_SECRET_KEY = prevKey;
    else delete process.env.TRIGGER_SECRET_KEY;
    if (prevUrl !== undefined) process.env.TRIGGER_API_URL = prevUrl;
    else delete process.env.TRIGGER_API_URL;

    expect(res.status).toBe(202);
    const json = (await res.json()) as { message: string; id?: string };
    expect(json.message).toBe("render-pipeline queued");
    expect(json.id).toBe("mocked-run-id");
  });
});
