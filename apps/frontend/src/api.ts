import type { Video } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8787";

export async function fetchVideos(): Promise<Video[]> {
  const res = await fetch(`${API_BASE_URL}/videos`);
  if (!res.ok) {
    throw new Error("Unable to fetch videos");
  }
  const data = (await res.json()) as { videos: Video[] };
  return data.videos;
}

export async function fetchVideo(slug: string): Promise<Video> {
  const res = await fetch(`${API_BASE_URL}/videos/${slug}`);
  if (!res.ok) {
    throw new Error("Unable to fetch video");
  }
  const data = (await res.json()) as { video: Video };
  return data.video;
}
