import { getCategories, getPostsByCategory } from '@/lib/graphql-client';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const { categories } = await getCategories();
  
  return categories.nodes.map((category) => ({
    slug: category.slug,
  }));
}

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categories } = await getCategories();
  const { posts } = await getPostsByCategory({ categorySlug: params.slug });
  
  const category = categories.nodes.find(cat => cat.slug === params.slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{category.name}</h1>
      
      <div className="grid grid-cols-1 gap-8 mb-8">
        {posts.nodes.map(post => (
          <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <div className="md:flex">
              <div className="md:w-1/3">
                {post.featuredImage ? (
                  <div className="relative h-64 md:h-full">
                    <Image
                      src={post.featuredImage.node.sourceUrl}
                      alt={post.featuredImage.node.altText || post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-64 md:h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
              </div>
              <div className="md:w-2/3 p-6">
                <h2 className="text-2xl font-semibold mb-3">{post.title}</h2>
                <div 
                  className="text-gray-600 mb-4"
                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">By {post.author.node.name}</span>
                  <Button variant="outline" asChild>
                    <Link href={`/posts/${post.slug}`}>Read More</Link>
                  </Button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {posts.nodes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No articles found in this category.</p>
        </div>
      )}

      <div className="mt-8">
        <Button variant="outline" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}