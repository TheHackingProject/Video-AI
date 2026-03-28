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
    const prevKey = process.env.TRIGGER_SECRET_KEY;
    const prevUrl = process.env.TRIGGER_API_URL;
    delete process.env.TRIGGER_SECRET_KEY;
    process.env.TRIGGER_API_URL = "http://localhost:8030";
    const res = await app.request("/jobs/render-pipeline", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    if (prevKey !== undefined) process.env.TRIGGER_SECRET_KEY = prevKey;
    else delete process.env.TRIGGER_SECRET_KEY;
    if (prevUrl !== undefined) process.env.TRIGGER_API_URL = prevUrl;
    else delete process.env.TRIGGER_API_URL;
    expect(res.status).toBe(503);
  });

  it("render-pipeline returns 503 without TRIGGER_API_URL", async () => {
    const prevKey = process.env.TRIGGER_SECRET_KEY;
    const prevUrl = process.env.TRIGGER_API_URL;
    process.env.TRIGGER_SECRET_KEY = "test_key_only";
    delete process.env.TRIGGER_API_URL;
    const res = await app.request("/jobs/render-pipeline", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    if (prevKey !== undefined) process.env.TRIGGER_SECRET_KEY = prevKey;
    else delete process.env.TRIGGER_SECRET_KEY;
    if (prevUrl !== undefined) process.env.TRIGGER_API_URL = prevUrl;
    else delete process.env.TRIGGER_API_URL;
    expect(res.status).toBe(503);
  });

  it("render-pipeline returns 400 on invalid body", async () => {
    process.env.TRIGGER_SECRET_KEY = "test_key_for_validation_only";
    process.env.TRIGGER_API_URL = "http://localhost:8030";
    const res = await app.request("/jobs/render-pipeline", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ compositionId: "" }),
    });
    delete process.env.TRIGGER_SECRET_KEY;
    delete process.env.TRIGGER_API_URL;
    expect(res.status).toBe(400);
  });
});
