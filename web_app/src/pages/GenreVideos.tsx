import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchLatestVideosByGenre } from "../api/video";
import type { VideoOut } from "../types/video";

const GenreVideos = () => {
  const { genre } = useParams();
  const [videos, setVideos] = useState<VideoOut[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (genre) {
      setLoading(true);
      fetchLatestVideosByGenre(genre)
        .then(setVideos)
        .finally(() => setLoading(false));
    }
  }, [genre]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4 text-indigo-800">
        Videos in Genre: <span className="capitalize">{genre}</span>
      </h2>

      {loading ? (
        <p className="text-gray-600 text-center">Loading videos...</p>
      ) : videos.length === 0 ? (
        <p className="text-gray-500 italic text-center">
          No videos found in this genre.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <div key={video.id} className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2 text-indigo-700">{video.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{video.description}</p>
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline"
              >
                ▶️ Watch Video
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenreVideos;
