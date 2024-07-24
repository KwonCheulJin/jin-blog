import AnimatedText from '@/components/common/AnimatedText';
import { getAllPostsData, getAllTags } from '@/service/posts';

import TransitionEffect from '@/components/common/TransitionEffect';
import ListLayoutWithTags from '@/components/post/ListLayoutWithTags';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Posts',
  description: '나의 개발 기록 저장소',
};

type Props = {
  searchParams: { [key: string]: string | undefined };
};

export default async function PostsPage({ searchParams }: Props) {
  const { start, end, entries, posts } = await getAllPostsData({
    page: searchParams['page'],
    per_page: searchParams['per_page'],
    tag: searchParams['tag'],
  });
  const tags = await getAllTags();

  return (
    <>
      <TransitionEffect />
      <div className="flex w-full flex-col">
        <AnimatedText
          text="Be positive and Authenticity!"
          className="mb-16 mt-4 text-center dark:text-light sm:mb-8"
        />
        <ListLayoutWithTags
          posts={entries}
          tags={tags}
          start={start}
          end={end}
          total={posts.length}
        />
      </div>
    </>
  );
}
