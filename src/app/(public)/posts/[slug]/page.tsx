import TransitionEffect from '@/components/common/TransitionEffect';
import { Comments } from '@/components/liveblocks/Comments';
import { Cursors } from '@/components/liveblocks/cursors/Cursors';
import MarkdownViewer from '@/components/post/MarkdownViewer';
import PostLayout from '@/components/post/PostLayout';
import Room from '@/context/Room';

import { getAllPosts, getPostData, getPostDetail } from '@/service/posts';
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
      <Comments />
    </Room>
  );
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(post => ({
    slug: post.id,
  }));
}
