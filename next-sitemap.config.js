/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://amcmep.in", // 👈 replace with your domain
  generateRobotsTxt: true, // (optional)
  sitemapSize: 5000,
  changefreq: "daily",
  priority: 0.7,
  exclude: ["/private-page"], // optional: exclude pages
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
    ],
  },
};
