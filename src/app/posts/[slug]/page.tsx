import { getAllPosts, getPostData } from '@/service/posts';
import Image from 'next/image';
import AdjacentPostCard from '@/components/post/AdjacentPostCard';
import PostContent from '@/components/post/PostContent';
import type { Metadata } from 'next';
import Layout from '@/components/common/Layout';
import TransitionEffect from '@/components/common/TransitionEffect';

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
      <Layout className="pt-16 md:pt-12 sm:pt-8 md:p-8 sm:p-4">
        <article className="rounded-2xl overflow-hidden bg-light shadow-lg border-2 border-solid dark:bg-dark dark:border-light">
          <Image
            className="w-full h-1/5 max-h-[500px]"
            src={`/images/posts/${image}.png`}
            alt={title}
            width={760}
            height={420}
            priority
          />
          <PostContent post={post} />
          <section className="flex lg:flex-row md:flex-col sm:flex-col shadow-md">
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
  return posts.map((post) => ({
    slug: post.path,
  }));
}
