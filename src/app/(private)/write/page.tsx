import Layout from '@/components/common/Layout';

import type { Metadata } from 'next';
import TransitionEffect from '@/components/common/TransitionEffect';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const EditorContainer = dynamic(() => import('@/components/editor/EditorContainer'), {
  loading: () => (
    <div className="flex h-96 items-center justify-center">
      <div className="flex items-center space-x-2">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
        <span className="text-gray-600 dark:text-gray-400">에디터 로딩 중...</span>
      </div>
    </div>
  ),
});

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
          <Suspense fallback={
            <div className="flex h-96 items-center justify-center">
              <div className="flex items-center space-x-2">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                <span className="text-gray-600 dark:text-gray-400">에디터 준비 중...</span>
              </div>
            </div>
          }>
            <EditorContainer />
          </Suspense>
        </Layout>
      </section>
    </>
  );
}
