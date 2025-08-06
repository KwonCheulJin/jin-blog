'use client';

import PostList from '@/components/post/PostList';
import { Skeleton } from '@/components/ui/skeleton';
import { SimplePost } from '@/types';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

type ListLayoutProps = {
  posts: SimplePost[];
  tags: Record<string, number>;
  start: number;
  end: number;
  total: number;
};

const TagList = dynamic(() => import('@/components/post/TagList'), {
  ssr: false,
});
const Pagination = dynamic(() => import('@/components/post/Pagination'), {
  ssr: false,
});

export default function ListLayoutWithTags({
  posts,
  tags,
  start,
  end,
  total,
}: ListLayoutProps) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center">
        <Suspense
          fallback={
            <Skeleton className="h-[820px] min-w-[300px] max-w-[300px]" />
          }
        >
          <TagList tags={tags} />
        </Suspense>
        <PostList posts={posts} />
      </div>
      <Suspense
        fallback={<Skeleton className="h-[80px] min-w-[744px] max-w-[744px]" />}
      >
        <Pagination
          hasNextPage={end < total}
          hasPrevPage={start > 0}
          total={total}
        />
      </Suspense>
    </div>
  );
}
