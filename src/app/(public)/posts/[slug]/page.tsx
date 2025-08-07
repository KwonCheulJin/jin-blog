import TransitionEffect from '@/components/common/TransitionEffect';
import MarkdownViewer from '@/components/post/MarkdownViewer';
import PostLayout from '@/components/post/PostLayout';
import Room from '@/context/Room';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Comments = dynamic(
  () => import('@/components/liveblocks/Comments').then(mod => ({ default: mod.Comments })),
  {
    loading: () => (
      <div className="flex h-20 items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
          <span className="text-sm text-gray-500 dark:text-gray-400">댓글 로딩 중...</span>
        </div>
      </div>
    ),
  },
);

const Cursors = dynamic(
  () => import('@/components/liveblocks/cursors/Cursors').then(mod => ({ default: mod.Cursors })),
  {
    loading: () => null, // 커서는 로딩 UI 없이 자연스럽게
  },
);

import { getAllPostsStatic, getPostData, getPostDetail } from '@/service/posts';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostDetail(slug);
  if (!post) {
    return {
      title: null,
      description: null,
      keywords: null,
    };
  }
  const { title, sub_title, tags } = post;

  return {
    title,
    description: sub_title,
    keywords: tags,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostData(slug);

  const { title, author, tags, created_at, markdown, prev, next } = post;
  return (
    <Room slug={slug}>
      <TransitionEffect />
      <section className="w-full">
        <PostLayout
          title={title}
          author={author}
          tags={tags}
          created_at={created_at}
          prev={prev}
          next={next}
        >
          <MarkdownViewer content={markdown} />
        </PostLayout>
      </section>
      <Cursors />
      <Suspense fallback={
        <div className="flex h-20 items-center justify-center">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            <span className="text-sm text-gray-500 dark:text-gray-400">댓글 준비 중...</span>
          </div>
        </div>
      }>
        <Comments />
      </Suspense>
    </Room>
  );
}

export async function generateStaticParams() {
  const posts = await getAllPostsStatic();
  return posts.map(post => ({
    slug: post.id,
  }));
}
