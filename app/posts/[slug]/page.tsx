import { getPostBySlug, getPosts } from '@/lib/graphql-client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Post } from '@/types';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import type { Metadata } from 'next';
import { AffiliateDisclaimer } from '@/components/AffiliateDisclaimer';

// Add route segment config for ISR
export const revalidate = 60; // Revalidate this page every 60 seconds

// This function needs to return ALL possible post slugs
export async function generateStaticParams() {
  const { posts } = await getPosts();
  
  // Map all post slugs to the required format
  return posts.nodes.map((post: Post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // Add revalidation to the fetch request
  const { post } = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found - The Reel Authority',
      description: 'The requested article could not be found.',
    };
  }

  // Create a clean excerpt for meta description by removing HTML tags
  const cleanExcerpt = post.excerpt.replace(/<[^>]*>/g, '');

  return {
    title: `${post.title} - The Reel Authority`,
    description: cleanExcerpt,
    openGraph: {
      title: `${post.title} - The Reel Authority`,
      description: cleanExcerpt,
      images: post.featuredImage ? [
        {
          url: post.featuredImage.node.sourceUrl,
          alt: post.featuredImage.node.altText || post.title,
        }
      ] : undefined,
    },
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { post } = await getPostBySlug(params.slug);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <p className="mb-8">The requested article could not be found.</p>
        <Button variant="outline" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    );
  }

  // Get the first category for the breadcrumb
  const primaryCategory = post.categories.nodes[0];

  // Check if the post is in either Gear Reviews or Product Comparison categories
  const showDisclaimer = post.categories.nodes.some(
    (cat: { name: string }) => 
      cat.name === "Gear Reviews" || cat.name === "Product Comparison"
  );

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/categories/${primaryCategory.slug}`}>{primaryCategory.name}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{post.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {showDisclaimer && <AffiliateDisclaimer />}

      <h1 className="text-4xl font-bold mb-4 mt-6">{post.title}</h1>
      
      {post.featuredImage && (
        <div className="relative w-full h-[400px] mb-8">
          <Image
            src={post.featuredImage.node.sourceUrl}
            alt={post.featuredImage.node.altText || post.title}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
      )}

      <div className="flex items-center mb-8 text-gray-600">
        <span>By {post.author.node.name}</span>
        <span className="mx-2">•</span>
        <span>{post.categories.nodes.map((cat: { name: string }) => cat.name).join(', ')}</span>
      </div>

      <div 
        className="wp-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="mt-8 flex space-x-4">
        <Button variant="outline" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/recent-articles">More Articles</Link>
        </Button>
      </div>
    </article>
  );
}
