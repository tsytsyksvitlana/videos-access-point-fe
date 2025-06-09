import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import CreateVideoForm from "./components/Video/CreateVideoForm";
import VideoList from "./pages/VideoList";
import GenreVideos from "./pages/GenreVideos";
import DateFilteredVideos from "./pages/DateFilteredVideos";
import VideoByIdPage from "./pages/VideoByIdPage";
import VideoByTitlePage from "./pages/VideoByTitlePage";
import { getMe } from "./api/auth";
import { useAuth } from "./contexts/AuthContext";
import Header from './components/Header.tsx';

function AppRoutes() {
  const location = useLocation();
  const hideHeader = location.pathname.startsWith("/auth");
  const { setUser } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getMe()
        .then((user) => setUser(user))
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {!hideHeader && <Header />}
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
      <ToastContainer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
