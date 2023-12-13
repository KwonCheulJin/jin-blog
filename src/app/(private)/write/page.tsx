import Layout from '@/components/common/Layout';

import type { Metadata } from 'next';
import TransitionEffect from '@/components/common/TransitionEffect';
import EditorContainer from '@/components/editor/EditorContainer';

export const metadata: Metadata = {
  title: '새 글 작성',
  description: '에디터 페이지',
};

export default function WritePage() {
  return (
    <>
      <TransitionEffect />
      <section className="h-screen w-full">
        <Layout className="pt-4">
          <EditorContainer />
        </Layout>
      </section>
    </>
  );
}
