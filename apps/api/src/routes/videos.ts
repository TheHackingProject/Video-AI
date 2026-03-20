import { Hono } from "hono";
import { VideoResponseSchema, VideosResponseSchema } from "@repo/contracts";
import { listVideos, getVideoBySlug } from "@repo/db";
import { NotFoundError } from "../errors";

const videosRoute = new Hono();

videosRoute.get("/", async (c) => {
  const videos = await listVideos();
  return c.json(VideosResponseSchema.parse({ videos }), 200);
});

videosRoute.get("/:slug", async (c) => {
  const slug = c.req.param("slug");
  const video = await getVideoBySlug(slug);

  if (!video) {
    throw new NotFoundError(`Video not found for slug: ${slug}`);
  }

  return c.json(VideoResponseSchema.parse({ video }), 200);
});

export { videosRoute };
