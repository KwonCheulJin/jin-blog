import { getAllPosts, getPostData } from '@/service/posts';
import Image from 'next/image';
import AdjacentPostCard from '@/components/post/AdjacentPostCard';
import PostContent from '@/components/post/PostContent';
import type { Metadata } from 'next';
import Layout from '@/components/common/Layout';
import TransitionEffect from '@/components/common/TransitionEffect';
import Comment from '@/components/post/Comment';

type Props = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params: { slug } }: Props): Metadata {
  const post = getPostData(slug);
  const { title, description, category } = post;

  return {
    title,
    description,
    keywords: category,
  };
}

export default function PostPage({ params: { slug } }: Props) {
  const post = getPostData(slug);
  const { title, image, next, prev } = post;
  return (
    <>
      <TransitionEffect />
      <Layout className="pt-16 sm:p-4 sm:pt-8 md:p-8 md:pt-12">
        <article className="overflow-hidden rounded-2xl border-2 border-solid bg-light shadow-lg dark:border-light dark:bg-dark">
          <Image
            className="h-1/5 max-h-[500px] w-full"
            src={`/images/posts/${image}.webp`}
            alt={title}
            width={760}
            height={420}
            priority
          />
          <PostContent post={post} />
          <section className="w-full border-t border-light">
            <Comment />
          </section>
          <section className="flex border-t border-light shadow-md sm:flex-col md:flex-col lg:flex-row">
            {prev && <AdjacentPostCard post={prev} type="prev" />}
            {next && <AdjacentPostCard post={next} type="next" />}
          </section>
        </article>
      </Layout>
    </>
  );
}

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({
    slug: post.path,
  }));
}
