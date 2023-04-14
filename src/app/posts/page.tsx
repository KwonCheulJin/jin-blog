import Layout from '@/components/common/Layout';
import AnimatedText from '@/components/common/AnimatedText';
import { getAllPosts } from '@/service/posts';

import type { Metadata } from 'next';
import FeaturedPosts from '@/components/post/FeaturedPosts';
import PostCard from '@/components/post/PostCard';

export const metadata: Metadata = {
  title: 'All Posts',
  description: '나의 개발 기록 저장소',
};

export default function PostsPage() {
  const posts = getAllPosts();
  const allPosts = posts.map((post) => <PostCard key={post.path} post={post} />);
  return (
    <section className="w-full flex flex-col items-center justify-center overflow-hidden">
      <Layout className="pt-16">
        <AnimatedText text="Be positive and Authenticity!" className="mb-16 dark:text-light" />
        <FeaturedPosts />
        <h2 className="font-bold text-4xl w-full text-center my-16 mt-32 dark:text-light">
          All Posts
        </h2>
        <ul>{allPosts}</ul>
      </Layout>
    </section>
  );
}
