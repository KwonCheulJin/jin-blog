'use client';

import PostList from '@/components/post/PostList';
import TagList from '@/components/post/TagList';
import Pagination from '@/components/post/Pagination';
import { SimplePost } from '@/types';
import { Suspense } from 'react';

type ListLayoutProps = {
  posts: SimplePost[];
  tags: Record<string, number>;
  start: number;
  end: number;
  total: number;
};

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
        <Suspense fallback={null}>
          <TagList tags={tags} />
        </Suspense>
        <PostList posts={posts} />
      </div>
      <Suspense fallback={null}>
        <Pagination
          hasNextPage={end < total}
          hasPrevPage={start > 0}
          total={total}
        />
      </Suspense>
    </div>
  );
}
