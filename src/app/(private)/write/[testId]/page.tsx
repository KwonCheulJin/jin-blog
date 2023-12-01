import Layout from '@/components/common/Layout';
import TransitionEffect from '@/components/common/TransitionEffect';
import MarkdownViewer from '@/components/post/MarkdownViewer';
import PostLayout from '@/components/post/PostLayout';
import { PostDetail } from '@/types';

async function getPostDetail(id: string) {
  const baseUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://www.jin-blog.dev/';
  const data = await fetch(`${baseUrl}/api/post/${id}`, {
    headers: {
      Accept: 'application/json',
    },
    method: 'GET',
  });
  return data.json();
}

type Props = {
  params: {
    testId: string;
  };
};
export default async function TestDetailPage({ params: { testId } }: Props) {
  const result = (await getPostDetail(testId)) as PostDetail;

  return (
    <>
      <TransitionEffect />
      <section className="w-full">
        <Layout className="pt-16">
          <PostLayout>
            <MarkdownViewer content={result.markdown} />
          </PostLayout>
        </Layout>
      </section>
    </>
  );
}
