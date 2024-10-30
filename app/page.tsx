import { getPosts } from '@/lib/graphql-client';
import { EnhancedHomePage } from '@/components/EnhancedHomePage';

export default async function Home() {
  const { posts } = await getPosts();
  return <EnhancedHomePage posts={posts.nodes} />;
}