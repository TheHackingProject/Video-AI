import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchVideos } from "../api";
import type { Video } from "../types";

export function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    fetchVideos()
      .then((items: Video[]) => {
        setVideos(items);
        setStatus("success");
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "loading") return <p>Loading videos...</p>;
  if (status === "error") return <p>Unable to load videos for now.</p>;
  if (videos.length === 0) return <p>No videos published yet.</p>;

  return (
    <section className="grid">
      {videos.map((video) => (
        <article key={video.id} className="card">
          <h2>{video.title}</h2>
          <p>{video.description}</p>
          <p className="meta">Composition: {video.compositionId}</p>
          <Link to={`/videos/${video.slug}`} className="link-button">
            Watch
          </Link>
        </article>
      ))}
    </section>
  );
}
