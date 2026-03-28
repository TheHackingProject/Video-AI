import { describe, expect, it } from "bun:test";
import {
  prepareRenderTask,
  renderPipelineTask,
  renderVideoTask,
} from "../src/trigger/renderPipeline";

describe("render pipeline task definitions", () => {
  it("exposes stable task ids for orchestration (palier 1 — no autonomous agent)", () => {
    expect(prepareRenderTask.id).toBe("prepare-render");
    expect(renderVideoTask.id).toBe("render-video");
    expect(renderPipelineTask.id).toBe("render-pipeline");
  });
});
