import React from 'react';
import { getAllPosts, getPostData } from '@/service/posts';
import Image from 'next/image';
import AdjacentPostCard from '@/components/AdjacentPostCard';
import PostContent from '@/components/PostContent';
import type { Metadata } from 'next';
import Layout from '@/components/Layout';

type Props = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params: { slug } }: Props): Metadata {
  const post = getPostData(slug);
  const { title, description } = post;

  return {
    title,
    description,
  };
}

export default function PostPage({ params: { slug } }: Props) {
  const post = getPostData(slug);
  const { title, path, next, prev } = post;
  return (
    <Layout className="pt-16">
      <article className="rounded-2xl overflow-hidden bg-gray-100 shadow-lg m-4">
        <Image
          className="w-full h-1/5 max-h-[500px]"
          src={`/images/posts/${path}.png`}
          alt={title}
          width={760}
          height={420}
        />
        <PostContent post={post} />
        <section className="flex lg:flex-row max-md:flex-col max-sm:flex-col shadow-md">
          {prev && <AdjacentPostCard post={prev} type="prev" />}
          {next && <AdjacentPostCard post={next} type="next" />}
        </section>
      </article>
    </Layout>
  );
}

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.path,
  }));
}
