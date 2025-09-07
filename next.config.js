/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Статичен export за cPanel
  trailingSlash: true, // За production
  // Премахнати basePath и assetPrefix
  images: {
    unoptimized: true, // За static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
  // Environment variables
  env: {
    NEXTAUTH_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://sof-car.eu',
    SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://sof-car.eu',
  },
};

module.exports = nextConfig;
