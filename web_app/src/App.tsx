import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./contexts/AuthContext";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import CreateVideoForm from "./components/Video/CreateVideoForm";
import VideoList from "./pages/VideoList";
import GenreVideos from "./pages/GenreVideos";
import DateFilteredVideos from "./pages/DateFilteredVideos";
import VideoByIdPage from "./pages/VideoByIdPage";
import VideoByTitlePage from "./pages/VideoByTitlePage";
import Header from './components/Header.tsx';
import PrivateRoute from './components/PrivateRoute.tsx';

function AppRoutes() {
  const location = useLocation();
  const hideHeader = location.pathname.startsWith("/auth");

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/auth" element={<AuthPage />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <PrivateRoute>
              <CreateVideoForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/videos"
          element={
            <PrivateRoute>
              <VideoList />
            </PrivateRoute>
          }
        />
        <Route
          path="/videos/genre/:genre"
          element={
            <PrivateRoute>
              <GenreVideos />
            </PrivateRoute>
          }
        />
        <Route
          path="/videos/date-range"
          element={
            <PrivateRoute>
              <DateFilteredVideos />
            </PrivateRoute>
          }
        />
        <Route
          path="/videos/:id"
          element={
            <PrivateRoute>
              <VideoByIdPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/videos/title/:title"
          element={
            <PrivateRoute>
              <VideoByTitlePage />
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
