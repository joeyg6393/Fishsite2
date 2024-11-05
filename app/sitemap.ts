import { MetadataRoute } from 'next';
import { getCategories, getPosts } from '@/lib/graphql-client';

// Add revalidation period
export const revalidate = 3600; // Revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://thereelauthority.com';

  // Fetch all posts and categories
  const [{ posts }, { categories }] = await Promise.all([
    getPosts(),
    getCategories(),
  ]);

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/recent-articles`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ];

  // Generate post routes
  const postRoutes = posts.nodes.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Generate category routes
  const categoryRoutes = categories.nodes.map((category) => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...postRoutes, ...categoryRoutes];
}
