import { describe, expect, it } from "bun:test";
import { RenderPipelinePayloadSchema } from "../src/index";

describe("RenderPipelinePayloadSchema", () => {
  it("applies default compositionId for empty object", () => {
    const parsed = RenderPipelinePayloadSchema.parse({});
    expect(parsed.compositionId).toBe("MyComp");
    expect(parsed.correlationId).toBeUndefined();
  });

  it("accepts minimal valid payload", () => {
    const parsed = RenderPipelinePayloadSchema.parse({
      compositionId: "Pilot01Prerequis",
    });
    expect(parsed.compositionId).toBe("Pilot01Prerequis");
  });

  it("accepts optional correlationId", () => {
    const parsed = RenderPipelinePayloadSchema.parse({
      compositionId: "X",
      correlationId: "corr-1",
    });
    expect(parsed.correlationId).toBe("corr-1");
  });

  it("rejects empty compositionId string", () => {
    const result = RenderPipelinePayloadSchema.safeParse({ compositionId: "" });
    expect(result.success).toBe(false);
  });

  it("rejects non-string compositionId", () => {
    const result = RenderPipelinePayloadSchema.safeParse({ compositionId: 123 });
    expect(result.success).toBe(false);
  });
});
