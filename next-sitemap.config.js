/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://sof-car.eu',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/admin/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    additionalSitemaps: ['https://sof-car.eu/sitemap.xml'],
  },
  // Multi-language support - simplified
  alternateRefs: [
    {
      href: 'https://sof-car.eu/bg',
      hreflang: 'bg',
    },
    {
      href: 'https://sof-car.eu/en',
      hreflang: 'en',
    },
  ],
};
