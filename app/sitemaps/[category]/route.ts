import { getCategories, getPostsByCategory } from '@/lib/graphql-client';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { category: string } }
) {
  try {
    const { posts } = await getPostsByCategory({ categorySlug: params.category });
    
    // Create XML sitemap
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${posts.nodes
        .map((post) => {
          return `
            <url>
              <loc>https://thereelauthority.com/posts/${post.slug}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>weekly</changefreq>
              <priority>0.7</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>`;

    // Return the XML with proper content type
    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}

export async function generateStaticParams() {
  const { categories } = await getCategories();
  
  return categories.nodes.map((category) => ({
    category: category.slug,
  }));
}
