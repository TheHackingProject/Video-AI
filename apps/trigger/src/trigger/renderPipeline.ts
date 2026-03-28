import type { RenderPipelinePayloadDto } from "@repo/contracts";
import { RenderPipelinePayloadSchema } from "@repo/contracts";
import { task } from "@trigger.dev/sdk";

export type PrepareRenderOutput = {
  compositionId: string;
  bundleHint: string;
  correlationId?: string;
};

export type RenderVideoOutput = {
  stub: true;
  compositionId: string;
  message: string;
};

export const prepareRenderTask = task({
  id: "prepare-render",
  retry: {
    maxAttempts: 2,
    factor: 2,
    minTimeoutInMs: 500,
  },
  run: async (payload: RenderPipelinePayloadDto): Promise<PrepareRenderOutput> => {
    const compositionId = payload.compositionId;
    console.log(
      "[prepare-render] compositionId=%s correlationId=%s",
      compositionId,
      payload.correlationId ?? "",
    );
    return {
      compositionId,
      bundleHint:
        "apps/remotion — run `bunx remotion render` locally (see KM/Docs/runbooks/video-ai-rendering.md)",
      correlationId: payload.correlationId,
    };
  },
});

export const renderVideoTask = task({
  id: "render-video",
  run: async (prep: PrepareRenderOutput): Promise<RenderVideoOutput> => {
    console.log("[render-video] stub for compositionId=%s", prep.compositionId);
    return {
      stub: true,
      compositionId: prep.compositionId,
      message:
        "Replace with real remotion render in worker (Chrome + FFmpeg). See video-ai-rendering runbook.",
    };
  },
});

export const notifyRenderTask = task({
  id: "notify-render",
  run: async (payload: {
    compositionId: string;
    renderResult: RenderVideoOutput;
    correlationId?: string;
  }): Promise<{ ok: true }> => {
    console.log("[notify-render] pipeline finished", {
      compositionId: payload.compositionId,
      correlationId: payload.correlationId,
      stub: payload.renderResult.stub,
    });
    return { ok: true };
  },
});

/**
 * Orchestrates prepare → render (stub) → notify. Trigger from API via tasks.trigger (type-only import).
 */
export const renderPipelineTask = task({
  id: "render-pipeline",
  run: async (raw: unknown) => {
    const payload = RenderPipelinePayloadSchema.parse(raw ?? {});
    const prep = await prepareRenderTask.triggerAndWait(payload).unwrap();
    const rend = await renderVideoTask.triggerAndWait(prep).unwrap();
    await notifyRenderTask
      .triggerAndWait({
        compositionId: prep.compositionId,
        renderResult: rend,
        correlationId: prep.correlationId,
      })
      .unwrap();
    return { prepare: prep, render: rend, notified: true };
  },
});
