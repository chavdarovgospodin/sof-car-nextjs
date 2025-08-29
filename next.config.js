/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Статичен export за cPanel - временно премахнато за dev
  // trailingSlash: true, // За production - временно премахнато за dev
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
    NEXTAUTH_URL: 'https://sof-car.eu',
    SITE_URL: 'https://sof-car.eu',
  },
  // Security headers - временно коментирано за development
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: [
  //         {
  //           key: 'X-Frame-Options',
  //           value: 'DENY',
  //         },
  //         {
  //           key: 'X-Content-Type-Options',
  //           value: 'nosniff',
  //         },
  //         {
  //           key: 'X-XSS-Protection',
  //           value: '1; mode=block',
  //         },
  //         {
  //           key: 'Referrer-Policy',
  //           value: 'strict-origin-when-cross-origin',
  //         },
  //       ],
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
