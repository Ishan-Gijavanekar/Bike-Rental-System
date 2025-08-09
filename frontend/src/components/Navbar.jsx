import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import api from '../services/api';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const { data } = await api.get('/users/profile');
      setUser(data.user);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await api.post('/users/logout');
    setUser(null);
    navigate('/');
  };

  const toggleMenu = () => setMenuOpen(prev => !prev);

  const isAdmin = user?.role === 'admin';

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">BikeRental</Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>

          {user && (
            <>
              <Link to="/my-bookings" className="text-gray-700 hover:text-blue-600">My Bookings</Link>
              <Link to="/my-reviews" className="text-gray-700 hover:text-blue-600">My Reviews</Link>
            </>
          )}

          {isAdmin && (
            <>
              <Link to="/admin-dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
              <Link to="/add-bike" className="text-gray-700 hover:text-blue-600">Add Bike</Link>
            </>
          )}

          {user ? (
            <button onClick={handleLogout} className="text-red-500 hover:text-red-600">Logout</button>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
              <Link to="/register" className="text-gray-700 hover:text-blue-600">Register</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl text-gray-700 focus:outline-none">
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-2">
            <Link to="/" className="block text-gray-700 hover:text-blue-600" onClick={toggleMenu}>Home</Link>

            {user && (
              <>
                <Link to="/my-bookings" className="block text-gray-700 hover:text-blue-600" onClick={toggleMenu}>My Bookings</Link>
                <Link to="/my-reviews" className="block text-gray-700 hover:text-blue-600" onClick={toggleMenu}>My Reviews</Link>
              </>
            )}

            {isAdmin && (
              <>
                <Link to="/admin-dashboard" className="block text-gray-700 hover:text-blue-600" onClick={toggleMenu}>Dashboard</Link>
                <Link to="/add-bike" className="block text-gray-700 hover:text-blue-600" onClick={toggleMenu}>Add Bike</Link>
              </>
            )}

            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="block text-red-500 hover:text-red-600"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="block text-gray-700 hover:text-blue-600" onClick={toggleMenu}>Login</Link>
                <Link to="/register" className="block text-gray-700 hover:text-blue-600" onClick={toggleMenu}>Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;