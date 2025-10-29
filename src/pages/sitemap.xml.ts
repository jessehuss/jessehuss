import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import siteConfig from '../config/site.config';

export const GET: APIRoute = async ({ site }) => {
  // Use site from Astro.config.mjs if available, otherwise use siteConfig.domain
  // Ensure it starts with https://
  const domain = siteConfig.domain.startsWith('http') 
    ? siteConfig.domain 
    : `https://${siteConfig.domain}`;
  const baseUrl = site || domain;
  const currentDate = new Date().toISOString().split('T')[0];

  // Get all blog posts
  const blogPosts = await getCollection('blog');
  const sortedPosts = blogPosts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  // Static pages
  const staticPages = [
    {
      loc: `${baseUrl}/`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '1.0'
    },
    {
      loc: `${baseUrl}/contact`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      loc: `${baseUrl}/blog`,
      lastmod: sortedPosts.length > 0 ? sortedPosts[0].data.date.toISOString().split('T')[0] : currentDate,
      changefreq: 'weekly',
      priority: '0.9'
    }
  ];

  // Blog post pages
  const blogUrls = sortedPosts.map((post) => ({
    loc: `${baseUrl}/blog/${post.slug}`,
    lastmod: post.data.date.toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.7'
  }));

  // Combine all URLs
  const allUrls = [...staticPages, ...blogUrls];

  // Generate XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${allUrls.map((page) => `  <url>
    <loc>${escapeXml(page.loc)}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
    },
  });
};

// Helper function to escape XML special characters
function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

