import { desc, eq } from "drizzle-orm";
import type { VideoDto } from "@repo/contracts";
import { getDb } from "./client";
import { videos, videoVersions } from "./schema";

export async function listVideos(): Promise<VideoDto[]> {
  const db = getDb();
  const rows = await db
    .select({
      id: videos.id,
      slug: videos.slug,
      title: videos.title,
      description: videos.description,
      compositionId: videoVersions.compositionId,
      renderUrl: videoVersions.renderUrl,
      docUrl: videoVersions.docUrl,
      publishedAt: videoVersions.publishedAt,
    })
    .from(videos)
    .innerJoin(videoVersions, eq(videoVersions.videoId, videos.id))
    .orderBy(desc(videoVersions.publishedAt));

  return rows.map((row) => ({
    ...row,
    publishedAt: row.publishedAt.toISOString(),
  }));
}

export async function getVideoBySlug(slug: string): Promise<VideoDto | null> {
  const db = getDb();
  const rows = await db
    .select({
      id: videos.id,
      slug: videos.slug,
      title: videos.title,
      description: videos.description,
      compositionId: videoVersions.compositionId,
      renderUrl: videoVersions.renderUrl,
      docUrl: videoVersions.docUrl,
      publishedAt: videoVersions.publishedAt,
    })
    .from(videos)
    .innerJoin(videoVersions, eq(videoVersions.videoId, videos.id))
    .where(eq(videos.slug, slug))
    .limit(1);

  const row = rows[0];
  if (!row) return null;

  return {
    ...row,
    publishedAt: row.publishedAt.toISOString(),
  };
}
