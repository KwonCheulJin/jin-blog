import Layout from '@/components/common/Layout';
import AnimatedText from '@/components/common/AnimatedText';
import { getAllPosts } from '@/service/posts';

import type { Metadata } from 'next';
import PostCard from '@/components/post/PostCard';
import TransitionEffect from '@/components/common/TransitionEffect';
import ListLayoutWithTags from '@/components/post/ListLayoutWithTags';

export const metadata: Metadata = {
  title: 'All Posts',
  description: '나의 개발 기록 저장소',
};

export default function PostsPage() {
  const posts = getAllPosts();
  const allPosts = posts.map((post, index) => (
    <PostCard key={`${post.path}-${index}`} post={post} />
  ));
  return (
    <>
      <TransitionEffect />
      <section className="flex w-full flex-col items-center justify-center overflow-hidden">
        <Layout className="pt-16">
          <AnimatedText
            text="Be positive and Authenticity!"
            className="mb-16 dark:text-light sm:mb-8 sm:!text-6xl lg:!text-7xl xs:!text-5xl"
          />
          <ListLayoutWithTags posts={posts} title="Posts" />
        </Layout>
      </section>
    </>
  );
}
