import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import CreateVideoForm from "./components/Video/CreateVideoForm";
import VideoList from "./pages/VideoList.tsx";
import GenreVideos from './pages/GenreVideos.tsx';
import DateFilteredVideos from './pages/DateFilteredVideos.tsx';
import VideoByIdPage from './pages/VideoByIdPage.tsx';
import VideoByTitlePage from './pages/VideoByTitlePage.tsx';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/upload" element={<CreateVideoForm />} />
          <Route path="/videos" element={<VideoList />} />
          <Route path="/videos/genre/:genre" element={<GenreVideos />} />
          <Route path="/videos/date-range" element={<DateFilteredVideos />} />
          <Route path="/videos/:id" element={<VideoByIdPage />} />
          <Route path="/videos/title/:title" element={<VideoByTitlePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;