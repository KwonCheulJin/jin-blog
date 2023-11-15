import Layout from '@/components/common/Layout';

import type { Metadata } from 'next';
import TransitionEffect from '@/components/common/TransitionEffect';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const EditorComp = dynamic(() => import('@/components/editor/InitializedMDXEditor'), {
  ssr: false,
});

const markdown = `
# Hello world!
Check the EditorComponent.tsx file for the code .
`;

export const metadata: Metadata = {
  title: 'Test',
  description: '나의 개발 기록 저장소',
};

export default function TestPage() {
  return (
    <>
      <TransitionEffect />
      <section className="w-full flex flex-col items-center justify-center overflow-hidden">
        <Layout className="pt-16">
          <Suspense fallback={null}>
            <EditorComp markdown={markdown} />
          </Suspense>
        </Layout>
      </section>
    </>
  );
}
