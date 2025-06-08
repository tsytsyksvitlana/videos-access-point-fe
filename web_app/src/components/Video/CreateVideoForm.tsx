import { useState } from "react";
import { createVideo } from "../../api/video";
import type { VideoCreate } from "../../types/video";
import GenreSelect from "./GenreSelect";

const CreateVideoForm = () => {
  const [form, setForm] = useState<VideoCreate>({
    title: "",
    description: "",
    genre: "",
    url: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGenreChange = (genre: string) => {
    setForm({ ...form, genre });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createVideo(form);
      alert("Video created successfully!");
      setForm({ title: "", description: "", genre: "", url: "" });
    } catch {
      alert("Error while creating video");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-xl mx-auto p-6 bg-white shadow-md rounded-2xl mt-10"
    >
      <h2 className="text-2xl font-bold text-center mb-4">Create New Video</h2>

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded-lg px-4 py-2"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32 resize-none"
      />

      <GenreSelect genre={form.genre} setGenre={handleGenreChange} />

      <input
        name="url"
        placeholder="Video URL"
        value={form.url}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded-lg px-4 py-2"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
      >
        Submit
      </button>
    </form>
  );
};

export default CreateVideoForm;
