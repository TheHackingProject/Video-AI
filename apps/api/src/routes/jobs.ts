import { RenderPipelineAcceptedSchema, RenderPipelinePayloadSchema } from "@repo/contracts";
import { Hono } from "hono";
import { triggerRenderPipeline } from "../lib/triggerRenderPipeline";

const jobsRoute = new Hono();

jobsRoute.post("/render-pipeline", async (c) => {
  if (!process.env.TRIGGER_SECRET_KEY) {
    return c.json(
      {
        error: "TRIGGER_SECRET_KEY is not set",
        hint: "Sovereign Trigger only: set TRIGGER_SECRET_KEY and TRIGGER_API_URL (self-hosted instance). See KM/Docs/runbooks/api.md",
      },
      503,
    );
  }

  const apiUrl = process.env.TRIGGER_API_URL?.trim();
  if (!apiUrl) {
    return c.json(
      {
        error: "TRIGGER_API_URL is not set",
        hint: "Required so the API never targets Trigger.dev Cloud. Point to your self-hosted webapp base URL (e.g. https://trigger.example.com). See KM/Docs/runbooks/api.md",
      },
      503,
    );
  }

  const json = await c.req.json().catch(() => ({}));
  const parsed = RenderPipelinePayloadSchema.safeParse(json);
  if (!parsed.success) {
    return c.json({ error: "Invalid body", details: parsed.error.flatten() }, 400);
  }

  const handle = await triggerRenderPipeline(parsed.data);
  const body = RenderPipelineAcceptedSchema.parse({
    message: "render-pipeline queued",
    id: handle.id,
  });
  return c.json(body, 202);
});

export { jobsRoute };
