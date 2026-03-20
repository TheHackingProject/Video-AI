import { Link, Navigate, Route, Routes } from "react-router-dom";
import { VideoDetailPage } from "./pages/VideoDetailPage";
import { VideosPage } from "./pages/VideosPage";

export function App() {
  return (
    <main className="page-shell">
      <header className="page-header">
        <h1>Video AI Library</h1>
        <p>Public catalogue for rendered episodes and pilot videos.</p>
        <Link to="/videos" className="header-link">
          Browse videos
        </Link>
      </header>

      <Routes>
        <Route path="/" element={<Navigate to="/videos" replace />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/videos/:slug" element={<VideoDetailPage />} />
      </Routes>
    </main>
  );
}
