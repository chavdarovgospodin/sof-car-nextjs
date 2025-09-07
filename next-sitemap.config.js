/** @type {import('next-sitemap').IConfig} */
const siteUrl = 'https://sof-car.eu';

module.exports = {
  siteUrl: siteUrl,
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
    additionalSitemaps: [`${siteUrl}/sitemap.xml`],
  },
  // Multi-language support - simplified
  alternateRefs: [
    {
      href: `${siteUrl}/new/bg`,
      hreflang: 'bg',
    },
    {
      href: `${siteUrl}/new/en`,
      hreflang: 'en',
    },
  ],
};
