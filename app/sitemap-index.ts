import { MetadataRoute } from 'next';
import { getCategories } from '@/lib/graphql-client';

export default async function sitemapIndex(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://thereelauthority.com';
  
  // Get all categories
  const { categories } = await getCategories();

  // Main sitemap
  const sitemaps = [
    {
      url: `${baseUrl}/sitemap.xml`,
      lastModified: new Date(),
    },
  ];

  // Add category sitemaps
  const categorySitemaps = categories.nodes.map((category) => ({
    url: `${baseUrl}/sitemaps/${category.slug}`,
    lastModified: new Date(),
  }));

  return [...sitemaps, ...categorySitemaps];
}
