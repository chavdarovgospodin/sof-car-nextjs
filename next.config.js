/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Статичен export за cPanel
  trailingSlash: true, // За production
  basePath: '/new', // Добави това
  assetPrefix: '/new', // Добави това
  // Development server configuration
  // devIndicators: {
  //   buildActivity: true,
  // },
  // Allow cross-origin requests from mobile devices during development
  // allowedDevOrigins: [
  //   '192.168.1.7', // Your mobile device IP
  //   '192.168.1.*', // Allow all devices in your local network
  //   'http://localhost:3000',
  //   '10.0.0.*', // Alternative local network range
  //   '172.16.*.*', // Docker network range
  // ],
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
  // Security headers за production
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
