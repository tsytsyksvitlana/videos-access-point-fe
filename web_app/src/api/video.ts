import axios from 'axios';
import type { VideoCreate, VideoOut } from '../types/video';

const BASE_URL = "http://localhost:8000";

export const fetchLatestVideos = async (): Promise<VideoOut[]> => {
  const response = await axios.get(`${BASE_URL}/videos/latest`);
  return response.data;
};

export const fetchLatestVideosByGenre = async (genre: string): Promise<VideoOut[]> => {
  const response = await axios.get(`${BASE_URL}/videos/latest/${genre}`);
  return response.data;
};

export const fetchVideosByDateRange = async (startDate: string | null, endDate: string | null): Promise<VideoOut[]> => {
  const params: Record<string, string> = {};
  if (startDate) params.start_date = startDate;
  if (endDate) params.end_date = endDate;

  const response = await axios.get(`${BASE_URL}/videos/date-range`, { params });
  return response.data;
};

export const fetchVideoById = async (id: number): Promise<VideoOut> => {
  const response = await axios.get(`${BASE_URL}/videos/${id}`);
  return response.data;
};

export const fetchVideoByTitle = async (title: string): Promise<VideoOut> => {
  const response = await axios.get(`${BASE_URL}/videos/by-title/${title}`);
  return response.data;
};

export const createVideo = async (data: VideoCreate): Promise<VideoOut> => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${BASE_URL}/videos`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
