import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchVideosByDateRange } from "../api/video";
import type { VideoOut } from "../types/video";

const DateFilteredVideos = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const from = queryParams.get("from") || "";
  const to = queryParams.get("to") || "";
  const [videos, setVideos] = useState<VideoOut[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (from || to) {
      setLoading(true);
      fetchVideosByDateRange(from || null, to || null)
        .then(setVideos)
        .finally(() => setLoading(false));
    }
  }, [from, to]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">
        Videos from {from || "any time"} to {to || "any time"}
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : videos.length === 0 ? (
        <p className="text-gray-600">No videos found for the selected date range.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <div key={video.id} className="p-4 bg-white rounded-xl shadow">
              <h3 className="text-xl font-semibold">{video.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{video.description}</p>
              <a href={video.url} target="_blank" className="text-blue-600 underline" rel="noopener noreferrer">
                Watch Video
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DateFilteredVideos;
