import { getPostBySlug, getPosts } from '@/lib/graphql-client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Post } from '@/types';

// This function needs to return ALL possible post slugs
export async function generateStaticParams() {
  const { posts } = await getPosts();
  
  // Map all post slugs to the required format
  return posts.nodes.map((post: Post) => ({
    slug: post.slug,
  }));
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

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      
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
        <span>{post.categories.nodes.map(cat => cat.name).join(', ')}</span>
      </div>

      <div 
        className="prose lg:prose-xl max-w-none mb-8"
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