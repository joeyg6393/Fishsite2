import { NextPage } from 'next';
import type { Metadata } from 'next';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { getPageById } from '@/lib/graphql-client';

export const metadata: Metadata = {
  title: 'About - The Reel Authority',
  description: 'Learn about The Reel Authority - your trusted source for fishing expertise, gear reviews, and angling insights.',
  openGraph: {
    title: 'About - The Reel Authority',
    description: 'Learn about The Reel Authority - your trusted source for fishing expertise, gear reviews, and angling insights.',
  }
};

// Add revalidation period - 2 hours
export const revalidate = 7200;

const AboutPage = async () => {
  const { page } = await getPageById(180);

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>About</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <article className="prose lg:prose-xl mt-6">
        <h1 className="text-4xl font-bold mb-8">{page.title}</h1>
        
        <div 
          className="space-y-6 wp-content"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </article>
    </main>
  );
};

export default AboutPage;
