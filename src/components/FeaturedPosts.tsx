import { getFeaturedPosts } from '@/service/posts';
import PostsGrid from './PostsGrid';

export default function FeaturedPosts() {
  const posts = getFeaturedPosts();

  return (
    <section className="mx-8">
      <h2 className="text-2xl font-bold my-2">Featured Posts</h2>
      <PostsGrid posts={posts} />
    </section>
  );
}
