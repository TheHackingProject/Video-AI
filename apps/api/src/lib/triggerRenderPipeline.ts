import type { RenderPipelinePayloadDto } from "@repo/contracts";
import { tasks } from "@trigger.dev/sdk";
import type { renderPipelineTask } from "trigger/render-pipeline";

/**
 * Triggers the render-pipeline task on the Trigger.dev worker.
 * Wrapped for testability (mock this module in API tests).
 */
export async function triggerRenderPipeline(
  payload: RenderPipelinePayloadDto,
): Promise<{ id: string }> {
  return tasks.trigger<typeof renderPipelineTask>("render-pipeline", payload);
}
