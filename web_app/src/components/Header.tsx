import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/auth');
  };

  console.log("Rendering Header with user:", user);

  return (
    <header className="bg-white shadow-md p-4 mb-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          <Link to="/" className="text-xl font-semibold text-black hover:underline">
            VideoAccessPoint
          </Link>
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">
            {user ? `${user.first_name} ${user.last_name}` : ''}
          </span>
          {user && (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
