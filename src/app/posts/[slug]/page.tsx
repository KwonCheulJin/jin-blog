import React from 'react';
import { getAllPosts, getPostData } from '@/service/posts';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    slug: string;
  };
};

export default async function PostPage({ params: { slug } }: Props) {
  const post = await getPostData(slug);
  if (!post) {
    notFound();
  }

  return (
    <>
      <p>{post.date.toLocaleString()}</p>
      <p>{post.title}</p>
      <p>{post.description}</p>
      <pre>{post.content}</pre>
    </>
  );
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((posts) => ({
    slug: posts.path,
  }));
}
