import { useEffect, useState } from "react";
import { fetchLatestVideos } from '../api/video.ts';
import type { VideoOut } from '../types/video.ts';

const VideoList = () => {
  const [videos, setVideos] = useState<VideoOut[]>([]);

  useEffect(() => {
    const loadVideos = async () => {
      const latest = await fetchLatestVideos();
      setVideos(latest);
    };
    loadVideos();
  }, []);

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4">
      {videos.map((video) => (
        <div
          key={video.id}
          className="rounded-2xl shadow-md border border-gray-200 p-6 bg-white hover:shadow-lg transition-shadow duration-200"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">{video.title}</h2>
          <p className="text-sm font-medium text-indigo-600 mb-1 uppercase tracking-wide">{video.genre}</p>
          <p className="text-gray-600 mb-4">{video.description}</p>
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-indigo-700 font-medium hover:underline"
          >
            🎬 Watch Video
          </a>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
