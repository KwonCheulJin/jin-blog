'use client';
import ComponentLayout from '@/components/common/ComponentLayout';
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
        <ComponentLayout className="pt-16">
          <PostLayout>
            <MarkdownViewer content={tempMarkdown} />
          </PostLayout>
        </ComponentLayout>
      </section>
    </>
  );
}
