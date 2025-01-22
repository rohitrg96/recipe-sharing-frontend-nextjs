import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Use HTTPS for Cloudinary
        hostname: 'res.cloudinary.com', // Cloudinary domain
        port: '', // Optional, leave empty if not using a custom port
        pathname: '/ddaq6new3/**', // Allow all images under your Cloudinary subdirectory
      },
    ],
  },
};

export default nextConfig;
