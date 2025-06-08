export interface VideoCreate {
  title: string;
  description: string;
  genre: string;
  url: string;
}

export interface VideoOut extends VideoCreate {
  id: number;
  upload_date: string;
}