import { Hono } from "hono";
import { cors } from "hono/cors";
import { config } from "./config";
import { NotFoundError } from "./errors";
import { jobsRoute } from "./routes/jobs";
import { videosRoute } from "./routes/videos";

const app = new Hono();

app.use(
  "/*",
  cors({
    origin: config.corsOrigin,
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  }),
);

app.get("/health", (c) => c.json({ status: "ok" }, 200));
app.route("/videos", videosRoute);
app.route("/jobs", jobsRoute);

app.onError((error, c) => {
  if (error instanceof NotFoundError) {
    return c.json({ error: error.message }, 404);
  }

  console.error(error);
  return c.json({ error: "Internal server error" }, 500);
});

app.notFound((c) => c.json({ error: "Route not found" }, 404));

export { app };
