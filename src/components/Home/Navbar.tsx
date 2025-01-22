import React from 'react';
import { useRouter } from 'next/router';

const Navbar: React.FC = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white shadow-md">
      {/* App Title */}
      <div className="text-xl font-bold cursor-pointer">
        <span onClick={() => router.push('/')}>Tasty Tales</span>
      </div>

      {/* Login Button */}
      <button
        onClick={handleLoginClick}
        className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Login
      </button>
    </nav>
  );
};

export default Navbar;
