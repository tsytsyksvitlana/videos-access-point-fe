import React from "react";
import { genres } from "../../constants/genres";

type GenreSelectProps = {
  genre: string;
  setGenre: (genre: string) => void;
};

const GenreSelect: React.FC<GenreSelectProps> = ({ genre, setGenre }) => {
  return (
    <select
      value={genre}
      onChange={(e) => setGenre(e.target.value)}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">-- Select Genre --</option>
      {genres.map((g) => (
        <option key={g} value={g}>
          {g}
        </option>
      ))}
    </select>
  );
};

export default GenreSelect;
