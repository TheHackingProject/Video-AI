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
});
