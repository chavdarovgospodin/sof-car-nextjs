/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Статичен export за cPanel - временно коментирано за development
  // trailingSlash: true, // Временно коментирано за development
  // images: {
  //   unoptimized: true, // За static export - временно коментирано за development
  // },
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
