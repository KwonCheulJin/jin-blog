import { getPostDetail, getAllPosts, getPostData } from '@/service/posts';
import type { Metadata } from 'next';
import TransitionEffect from '@/components/common/TransitionEffect';
import PostLayout from '@/components/post/PostLayout';
import MarkdownViewer from '@/components/post/MarkdownViewer';

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const post = await getPostDetail(slug);
  const { title, sub_title, tags } = post;

  return {
    title,
    description: sub_title,
    keywords: tags,
  };
}

export default async function PostPage({ params: { slug } }: Props) {
  const post = await getPostData(slug);
  const { title, author, tags, created_at, markdown, prev, next } = post;
  return (
    <>
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
    </>
  );
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(post => ({
    slug: post.id,
  }));
}
