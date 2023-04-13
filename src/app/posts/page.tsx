import FilterablePosts from '@/components/FilterablePosts';
import Layout from '@/components/Layout';
import AnimatedText from '@/components/AnimatedText';
import { getAllPosts } from '@/service/posts';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Posts',
  description: '나의 개발 기록 저장소',
};

export default function PostsPage() {
  const posts = getAllPosts();
  const categories = [...new Set(posts.map((post) => post.category))];

  return (
    <section className="flex w-full flex-col items-center justify-center">
      <Layout className="pt-12">
        <AnimatedText text="Be positive and Authenticity!" className="pb-16" />
        <FilterablePosts posts={posts} categories={categories} />
      </Layout>
    </section>
  );
}
