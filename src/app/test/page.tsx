import Layout from '@/components/common/Layout';

import type { Metadata } from 'next';
import TransitionEffect from '@/components/common/TransitionEffect';
import EditorContainer from '@/components/editor/EditorContainer';

export const metadata: Metadata = {
  title: 'Test',
  description: '나의 개발 기록 저장소',
};

export default function TestPage() {
  return (
    <>
      <TransitionEffect />
      <section className="flex w-full flex-col items-center justify-center overflow-hidden">
        <Layout className="pt-16">
          <EditorContainer />
        </Layout>
      </section>
    </>
  );
}
