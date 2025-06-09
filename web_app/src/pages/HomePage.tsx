import { useNavigate } from "react-router-dom";
import { useState } from "react";
import GenreSelect from '../components/Video/GenreSelect.tsx';

const HomePage = () => {
  const navigate = useNavigate();
  const [filterOption, setFilterOption] = useState("latest");
  const [genre, setGenre] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [videoId, setVideoId] = useState("");

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterOption(e.target.value);
    setGenre("");
    setFromDate("");
    setToDate("");
    setVideoId("");
  };

  const handleApplyFilter = () => {
    switch (filterOption) {
      case "latest":
        navigate("/videos");
        break;
      case "genre":
        navigate(`/videos/genre/${genre}`);
        break;
      case "period":
        navigate(`/videos/date-range?from=${fromDate}&to=${toDate}`);
        break;
      case "byId":
        navigate(`/videos/${videoId}`);
        break;
      case "byTitle":
        navigate(`/videos/title/${videoId}`);
        break;
      default:
        navigate("/videos");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 overflow-hidden">
      <h1 className="text-3xl font-bold text-center mb-6">Welcome to Video Access Point 👋</h1>

      <div className="space-x-4 mb-8">
        <button
          onClick={() => navigate("/upload")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Create New Video
        </button>
        <button
          onClick={() => navigate("/videos")}
          className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Browse Videos
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4">
        <label htmlFor="filter" className="block text-sm font-medium text-gray-700">
          Select Video Query Type:
        </label>
        <select
          id="filter"
          value={filterOption}
          onChange={handleFilterChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="latest">Get Latest 100 Videos</option>
          <option value="genre">Get Videos by Genre</option>
          <option value="period">Get Videos by Time Period</option>
          <option value="byId">Get Video by ID</option>
          <option value="byTitle">Get Video by Title</option>
        </select>

        {filterOption === "genre" && (
          <GenreSelect genre={genre} setGenre={setGenre} />
        )}

        {filterOption === "period" && (
          <>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </>
        )}

        {(filterOption === "byId" || filterOption === "byTitle") && (
          <input
            type={filterOption === "byId" ? "number" : "text"}
            placeholder={`Enter video ${filterOption === "byId" ? "ID" : "title"}`}
            value={videoId}
            onChange={(e) => setVideoId(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          />
        )}

        <button
          onClick={handleApplyFilter}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
};

export default HomePage;
