import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Bus, ArrowLeft, User, Clock, HeadphonesIcon } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const showBackButton = window.location.pathname !== '/';
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const userName = localStorage.getItem('userName');

  return (
    <nav className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            {showBackButton && (
              <button
                onClick={() => navigate(-1)}
                className="mr-4 p-2 hover:bg-blue-600 rounded-full text-white"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            <Link to="/" className="flex items-center space-x-2">
              <Bus className="h-8 w-8 text-white" />
              <span className="text-xl font-bold text-white">FlixerBux</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/customer-care"
              className="flex items-center space-x-2 text-white hover:text-blue-100 px-3 py-2"
            >
              <HeadphonesIcon className="h-5 w-5" />
              <span>Customer Care</span>
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link
                  to="/bookings"
                  className="flex items-center space-x-2 text-white hover:text-blue-100 px-3 py-2"
                >
                  <Clock className="h-5 w-5" />
                  <span>Recent Bookings</span>
                </Link>
                <div className="flex items-center space-x-2 text-white px-3 py-2">
                  <User className="h-5 w-5" />
                  <span>{userName}</span>
                </div>
                <button
                  onClick={() => {
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('userName');
                    navigate('/');
                  }}
                  className="text-white hover:text-blue-100 px-3 py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-blue-100 px-3 py-2"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;