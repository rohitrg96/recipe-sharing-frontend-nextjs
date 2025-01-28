import React, { useState } from 'react';
import { useRouter } from 'next/router';
import useAppDispatch from '@hooks/useAppDispatch'; // Import custom hooks for Redux
import useAppSelector from '@/hooks/useAppSelector';
import { logout } from '@/store/slices/authSlice'; // Import the logout action
import Cookies from 'js-cookie';
import api from '@/api/axiosInstance';

const Navbar: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Access auth state from Redux
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Dropdown state for "My Account" menu
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Navigate to login page
  const handleLoginClick = () => {
    router.push('/login');
  };

  // Handle logout functionality
  const handleLogout = async () => {
    await api.post('/auth/logout', null, {
      headers: {
        Authorization: `Bearer ${Cookies.get('authToken')}`,
      },
    });

    Cookies.remove('authToken'); // Remove the authToken cookie
    dispatch(logout());
    router.push('/'); // Redirect to home after logout
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white shadow-md">
      {/* App Title */}
      <div className="text-xl font-bold cursor-pointer">
        <span onClick={() => router.push('/')}>Tasty Tales</span>
      </div>

      {/* Auth Buttons */}
      <div className="relative">
        {!isAuthenticated ? (
          // Login Button (if not logged in)
          <button
            onClick={handleLoginClick}
            className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        ) : (
          // My Account Dropdown (if logged in)
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <span>My Account</span>
              <svg
                className="ml-2 w-4 h-4 text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg">
                <button
                  onClick={() => router.push('/add-recipe')}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  Add Recipe
                </button>
                {/* <button
                  onClick={() => router.push('/about')}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  About Us
                </button> */}
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
