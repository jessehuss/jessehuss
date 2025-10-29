import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ url }) => {
  const robotsTxt = `
User-agent: *
Allow: /

# Disallow admin and API endpoints from being indexed
User-agent: *
Disallow: /admin/
Disallow: /api/

# Sitemap location
Sitemap: ${new URL('sitemap.xml', url.origin).href}
`.trim();

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
    },
  });
};

