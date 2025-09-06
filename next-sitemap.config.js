/** @type {import('next-sitemap').IConfig} */
const { APP_CONFIG } = require('./src/utils/constants');

module.exports = {
  siteUrl: APP_CONFIG.url,
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
    additionalSitemaps: [`${APP_CONFIG.url}/sitemap.xml`],
  },
  // Multi-language support - simplified
  alternateRefs: [
    {
      href: `${APP_CONFIG.url}/bg`,
      hreflang: 'bg',
    },
    {
      href: `${APP_CONFIG.url}/en`,
      hreflang: 'en',
    },
  ],
};
