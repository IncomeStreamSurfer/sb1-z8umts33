import { t as trades, c as counties, a as towns } from './_business_.astro.1107f622.mjs';
import '../astro.99384f8d.mjs';
import 'html-escaper';
import 'node-fetch';
import 'fs';
import 'path';

const BASE_URL = 'https://www.findatradespersonireland.com';

async function get() {
  const pages = [
    '',
    ...trades.flatMap(trade => 
      counties.flatMap(county => [
        `/${trade.toLowerCase().replace(/\s+/g, '-')}/${county.toLowerCase().replace(/\s+/g, '-')}`,
        ...towns.map(town => 
          `/${trade.toLowerCase().replace(/\s+/g, '-')}/${county.toLowerCase().replace(/\s+/g, '-')}/${town.toLowerCase().replace(/\s+/g, '-')}`
        )
      ])
    )
  ];

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages.map(page => `
        <url>
          <loc>${BASE_URL}${page}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>
      `).join('')}
    </urlset>
  `.trim();

  return {
    body: sitemap,
    headers: {
      'Content-Type': 'application/xml'
    }
  };
}

export { get };
