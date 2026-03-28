import { RenderPipelineAcceptedSchema, RenderPipelinePayloadSchema } from "@repo/contracts";
import { tasks } from "@trigger.dev/sdk";
import type { renderPipelineTask } from "trigger/render-pipeline";
import { Hono } from "hono";

const jobsRoute = new Hono();

jobsRoute.post("/render-pipeline", async (c) => {
  if (!process.env.TRIGGER_SECRET_KEY) {
    return c.json(
      {
        error: "TRIGGER_SECRET_KEY is not set",
        hint: "Configure Trigger (self-hostable instance): TRIGGER_SECRET_KEY, TRIGGER_API_URL. See KM/Docs/runbooks/api.md",
      },
      503,
    );
  }

  const json = await c.req.json().catch(() => ({}));
  const parsed = RenderPipelinePayloadSchema.safeParse(json);
  if (!parsed.success) {
    return c.json({ error: "Invalid body", details: parsed.error.flatten() }, 400);
  }

  const handle = await tasks.trigger<typeof renderPipelineTask>("render-pipeline", parsed.data);
  const body = RenderPipelineAcceptedSchema.parse({
    message: "render-pipeline queued",
    id: handle.id,
  });
  return c.json(body, 202);
});

export { jobsRoute };
