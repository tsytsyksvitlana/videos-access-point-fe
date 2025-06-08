import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchVideoByTitle } from "../api/video";
import type { VideoOut } from "../types/video";

const VideoByTitlePage = () => {
  const { title } = useParams();
  const [video, setVideo] = useState<VideoOut | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadVideo = async () => {
      if (title) {
        try {
          const result = await fetchVideoByTitle(title);
          if (result) {
            setVideo(result);
          } else {
            setError("Video not found.");
          }
        } catch (err) {
          setError("Failed to fetch video.");
        } finally {
          setLoading(false);
        }
      }
    };

    loadVideo();
  }, [title]);

  const getVideoThumbnail = (url: string) => {
    const youtubeMatch = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([^&]+)/);
    if (youtubeMatch) {
      return `https://img.youtube.com/vi/${youtubeMatch[1]}/hqdefault.jpg`;
    }
  };

  if (loading) {
    return <div className="p-6 text-gray-600 text-center">Loading video details...</div>;
  }

  if (!video) {
    return <div className="p-6 text-red-600 text-center text-lg font-medium">Video not found.</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600 text-center text-lg font-medium">{error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-lg overflow-hidden p-6">
      <h1 className="text-4xl font-bold mb-4 text-indigo-800">{video.title}</h1>

      <div className="mb-6">
        <img
          src={getVideoThumbnail(video.url)}
          alt="Video thumbnail"
          className="rounded-lg w-full h-auto object-cover"
        />
      </div>

      <p className="text-gray-700 text-lg mb-4">{video.description}</p>

      <a
        href={video.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition"
      >
        ▶️ Watch Video
      </a>
    </div>
  );
};

export default VideoByTitlePage;
