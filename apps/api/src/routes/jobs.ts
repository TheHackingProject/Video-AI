import { RenderPipelineAcceptedSchema, RenderPipelinePayloadSchema } from "@repo/contracts";
import { Hono } from "hono";
import { renderPipelineTask } from "../trigger/renderPipeline";

const jobsRoute = new Hono();

jobsRoute.post("/render-pipeline", async (c) => {
  if (!process.env.TRIGGER_SECRET_KEY) {
    return c.json(
      {
        error: "TRIGGER_SECRET_KEY is not set",
        hint: "Configure Trigger.dev (see KM/Docs/runbooks/api.md)",
      },
      503,
    );
  }

  const json = await c.req.json().catch(() => ({}));
  const parsed = RenderPipelinePayloadSchema.safeParse(json);
  if (!parsed.success) {
    return c.json({ error: "Invalid body", details: parsed.error.flatten() }, 400);
  }

  const handle = await renderPipelineTask.trigger(parsed.data);
  const body = RenderPipelineAcceptedSchema.parse({
    message: "render-pipeline queued",
    id: handle.id,
  });
  return c.json(body, 202);
});

export { jobsRoute };
