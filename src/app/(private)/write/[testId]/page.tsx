'use client';
import Layout from '@/components/common/Layout';
import TransitionEffect from '@/components/common/TransitionEffect';
import MarkdownViewer from '@/components/post/MarkdownViewer';
import PostLayout from '@/components/post/PostLayout';
import { useLocalStorage } from 'usehooks-ts';

export default function TestDetailPage() {
  const [tempMarkdown] = useLocalStorage('temp-markdown', '');
  return (
    <>
      <TransitionEffect />
      <section className="w-full">
        <Layout className="pt-16">
          <PostLayout>
            <MarkdownViewer content={tempMarkdown} />
          </PostLayout>
        </Layout>
      </section>
    </>
  );
}