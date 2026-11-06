import type { APIRoute } from 'astro';

const paths = ['/', '/work', '/about', '/contact'];

export const GET: APIRoute = ({ site }) => {
  const base = site?.toString().replace(/\/$/, '') || 'https://jessehuss.com';
  const urls = paths
    .map(
      (path) => `  <url>
    <loc>${base}${path === '/' ? '/' : path}</loc>
  </url>`
    )
    .join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
