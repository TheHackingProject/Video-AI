import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Player } from "@remotion/player";
import { fetchVideo } from "../api";
import type { Video } from "../types";
import { sceneRegistry } from "../sceneRegistry";

export function VideoDetailPage() {
  const { slug } = useParams();
  const [video, setVideo] = useState<Video | null>(null);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    if (!slug) {
      setStatus("error");
      return;
    }

    fetchVideo(slug)
      .then((item: Video) => {
        setVideo(item);
        setStatus("success");
      })
      .catch(() => setStatus("error"));
  }, [slug]);

  if (status === "loading") return <p>Loading video...</p>;
  if (status === "error" || !video) return <p>Video unavailable.</p>;

  const scene = sceneRegistry[video.compositionId];

  return (
    <section className="detail">
      <Link to="/videos" className="back-link">
        Back to catalogue
      </Link>
      <h2>{video.title}</h2>
      <p>{video.description}</p>

      {scene ? (
        <Player
          component={scene.component}
          durationInFrames={scene.durationInFrames}
          fps={scene.fps}
          compositionWidth={scene.width}
          compositionHeight={scene.height}
          controls
          className="player"
          style={{ width: "100%", aspectRatio: "16 / 9" }}
        />
      ) : (
        <p>
          Remotion scene unavailable for composition <code>{video.compositionId}</code>.
        </p>
      )}

      <div className="detail-links">
        <a href={video.docUrl} target="_blank" rel="noreferrer">
          Open related KM doc
        </a>
      </div>
    </section>
  );
}
