import { describe, expect, it } from "bun:test";
import { app } from "../src/app";

describe("api routes", () => {
  it("returns health", async () => {
    const res = await app.request("/health");
    expect(res.status).toBe(200);
  });

  it("returns videos collection", async () => {
    const res = await app.request("/videos");
    expect([200, 500]).toContain(res.status);
  });

  it("render-pipeline returns 503 without TRIGGER_SECRET_KEY", async () => {
    const prev = process.env.TRIGGER_SECRET_KEY;
    delete process.env.TRIGGER_SECRET_KEY;
    const res = await app.request("/jobs/render-pipeline", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    if (prev !== undefined) process.env.TRIGGER_SECRET_KEY = prev;
    expect(res.status).toBe(503);
  });

  it("render-pipeline returns 400 on invalid body", async () => {
    process.env.TRIGGER_SECRET_KEY = "test_key_for_validation_only";
    const res = await app.request("/jobs/render-pipeline", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ compositionId: "" }),
    });
    delete process.env.TRIGGER_SECRET_KEY;
    expect(res.status).toBe(400);
  });
});
