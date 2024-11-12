import { getPosts } from '@/lib/graphql-client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import type { Metadata } from 'next';
import { Post } from '@/types';

// Add revalidation period - 2 hours
export const revalidate = 7200;

export const metadata: Metadata = {
  title: 'Recent Articles - The Reel Authority',
  description: 'Browse our latest fishing articles, tips, and gear reviews organized by category.',
  openGraph: {
    title: 'Recent Articles - The Reel Authority',
    description: 'Browse our latest fishing articles, tips, and gear reviews organized by category.',
  }
};

export default async function RecentArticlesPage() {
  const { posts } = await getPosts();
  
  // Group posts by category
  const postsByCategory = posts.nodes.reduce((acc: Record<string, Post[]>, post: Post) => {
    post.categories.nodes.forEach((category) => {
      if (!acc[category.name]) {
        acc[category.name] = [];
      }
      acc[category.name].push(post);
    });
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Recent Articles</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-4xl font-bold mb-8 mt-6">Recent Articles by Category</h1>
      
      {Object.entries(postsByCategory).map(([category, categoryPosts]) => (
        <section key={category} className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryPosts.map((post: Post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                <Link href={`/posts/${post.slug}`} className="block">
                  {post.featuredImage && (
                    <div className="relative h-48 transition-transform duration-300 hover:scale-105">
                      <Image
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.featuredImage.node.altText || post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </Link>
                <div className="p-6">
                  <Link href={`/posts/${post.slug}`} className="block">
                    <h3 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors">{post.title}</h3>
                  </Link>
                  <div 
                    className="wp-content text-gray-600 mb-4 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
                  />
                  <Button variant="outline" asChild>
                    <Link href={`/posts/${post.slug}`}>Read More</Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      <div className="mt-8">
        <Button variant="outline" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
