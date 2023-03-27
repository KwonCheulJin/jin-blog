'use client';

import { Post } from '@/service/posts';
import PostsGrid from '@/components/PostsGrid';
import { useState } from 'react';
import Categories from './Categories';

type Props = {
  posts: Post[];
  categories: string[];
};

const ALL_POSTS = 'All posts';

export default function FilterablePosts({ posts, categories }: Props) {
  const [selected, setSelected] = useState<string>(ALL_POSTS);
  const filtered =
    selected === ALL_POSTS ? posts : posts.filter((post) => post.category === selected);
  return (
    <section className="flex m-4">
      <PostsGrid posts={filtered} />
      <Categories
        categories={[ALL_POSTS, ...categories]}
        selected={selected}
        onClick={setSelected}
      />
    </section>
  );
}
