import { eq } from "drizzle-orm";
import { getDb } from "./client";
import { videos, videoVersions } from "./schema";

const seedData = [
  {
    slug: "showcase",
    title: "Showcase",
    description: "Demo showcase composition for the Video-AI library.",
    compositionId: "DemoShowcaseSolarpunkDemo",
    renderUrl: "https://cdn.example.com/video-ai/showcase.mp4",
    docUrl: "https://github.com/TheHackingProject/Video-AI/blob/Dev/KM/Docs/runbooks/video-ai-development.md",
    publishedAt: "2026-03-20T09:00:00.000Z",
  },
  {
    slug: "serie-01-prerequis",
    title: "Serie 01 - Prerequis",
    description: "Prerequisites for understanding Git and GitHub workflows.",
    compositionId: "Pilot01Prerequis",
    renderUrl: "https://cdn.example.com/video-ai/serie-01-prerequis.mp4",
    docUrl: "https://github.com/TheHackingProject/Video-AI/blob/Dev/KM/Docs/video-ai-preparation/pilot-01-prerequis-outline.md",
    publishedAt: "2026-03-21T09:00:00.000Z",
  },
  {
    slug: "serie-01-git-vs-github",
    title: "Serie 01 - Git vs GitHub",
    description: "Understand the difference between Git and GitHub through practical examples.",
    compositionId: "Pilot02GitVsGithub",
    renderUrl: "https://cdn.example.com/video-ai/serie-01-git-vs-github.mp4",
    docUrl: "https://github.com/TheHackingProject/Video-AI/blob/Dev/KM/Docs/video-ai-preparation/pilot-02-git-vs-github-outline.md",
    publishedAt: "2026-03-22T09:00:00.000Z",
  },
];

async function upsertVideo(entry: (typeof seedData)[number]) {
  const db = getDb();
  const existingVideo = await db
    .select({ id: videos.id })
    .from(videos)
    .where(eq(videos.slug, entry.slug))
    .limit(1);

  let videoId = existingVideo[0]?.id;

  if (!videoId) {
    const inserted = await db
      .insert(videos)
      .values({
        slug: entry.slug,
        title: entry.title,
        description: entry.description,
      })
      .returning({ id: videos.id });

    videoId = inserted[0]?.id;
  }

  if (!videoId) {
    throw new Error(`Failed to resolve video id for ${entry.slug}`);
  }

  await db
    .insert(videoVersions)
    .values({
      videoId,
      compositionId: entry.compositionId,
      renderUrl: entry.renderUrl,
      docUrl: entry.docUrl,
      publishedAt: new Date(entry.publishedAt),
    })
    .onConflictDoNothing();
}

async function seed() {
  for (const entry of seedData) {
    await upsertVideo(entry);
  }

  console.log(`Seed complete: ${seedData.length} videos processed.`);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
