import React from 'react';
import { useRouter } from 'next/router';

const Footer: React.FC = () => {
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path); // Programmatic navigation
  };

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
        {/* About Section */}
        <div>
          <h4 className="text-lg font-bold mb-4">About</h4>
          <p className="text-sm">
            Welcome to Tasty Tales, your ultimate destination for exploring and
            sharing delicious recipes from around the world. Let&apos;s cook and
            create memories together!
          </p>
        </div>

        {/* Contact Us Section */}
        <div>
          <h4 className="text-lg font-bold mb-4">Contact Us</h4>
          <ul className="text-sm space-y-2">
            <li>Email: support@tastytales.com</li>
            <li>Phone: +123-456-7890</li>
            <li>Address: 123 Foodie Street, Culinary City</li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div>
          <h4 className="text-lg font-bold mb-4">Quick Links</h4>
          <ul className="text-sm space-y-2">
            <li
              className="cursor-pointer hover:underline"
              onClick={() => navigateTo('/')}
            >
              Home
            </li>
            <li
              className="cursor-pointer hover:underline"
              onClick={() => navigateTo('/login')}
            >
              Login
            </li>
            <li
              className="cursor-pointer hover:underline"
              onClick={() => navigateTo('/signup')}
            >
              Sign Up
            </li>
            {/* <li
              className="cursor-pointer hover:underline"
              onClick={() => navigateTo('/recipes')}
            >
              Recipes
            </li> */}
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-8 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Tasty Tales. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
