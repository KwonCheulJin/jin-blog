import FilterablePosts from '@/components/FilterablePosts';
import { getAllPosts } from '@/service/posts';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Posts',
  description: '나의 개발 기록 저장소',
};

export default async function PostsPage() {
  const posts = await getAllPosts();
  const categories = [...new Set(posts.map((post) => post.category))];

  return <FilterablePosts posts={posts} categories={categories} />;
}
