require('dotenv/config');
const fs = require('fs');
const axios = require('axios');

const createUrlLocation = ({ url, lastMod = new Date(), priority = '1.0', changefreq = 'weekly' }) => `
    <url>
      <loc>${url}</loc>
      <lastmod>${lastMod.toISOString()}</lastmod>
      <changefreq>${changefreq}</changefreq>
      <priority>${priority}</priority>
    </url>
`;
const createSitemap = async () => {
  const host = process.env.NEXT_PUBLIC_HOST;
  const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL;
  const sitemapStart = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  const sitemapEnd = `</urlset>`;
  const sitemapContent = [];

  const { data: pages } = await axios.get(`${cmsUrl}/api/sitemap`);

  pages.forEach((page) => {
    const slugPath = page.slugPath.replace(/^sites\/en\/?/i, '');
    sitemapContent.push(
      createUrlLocation({
        url: `${host}/${slugPath}`,
        priority: slugPath === '' ? '1.0' : 1 - slugPath.split('/').length * 0.1,
        changefreq: 'daily',
      })
    );
  });

  return sitemapStart + sitemapContent.join('') + sitemapEnd;
};

createSitemap().then((sitemap) => fs.writeFileSync('public/sitemap.xml', sitemap));
