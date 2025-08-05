'use client';
import GoBackButton from '@/components/editor/GoBackButton';
import PublishButton from '@/components/editor/PublishButton';
import Separate from '@/components/editor/Separate';
import SubTitleInput from '@/components/editor/SubTitleInput';
import TagsInput from '@/components/editor/TagsInput';
import TitleInput from '@/components/editor/TitleInput';

import onImagePasted from '@/components/editor/onImagePasted';
import { Skeleton } from '@/components/ui/skeleton';
import { usePostStore } from '@/store/post';
import { ContextStore } from '@uiw/react-md-editor';
import dynamic from 'next/dynamic';
import { ChangeEvent, Suspense } from 'react';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

export default function EditorContainer() {
  const { addPost, updateMarkdown } = usePostStore();

  const handleMarkdownChange = (
    value?: string,
    event?: ChangeEvent<HTMLTextAreaElement>,
    state?: ContextStore,
  ) => {
    if (value !== undefined) {
      updateMarkdown(value);
    }
  };

  const handleImageMarkdown = (value: string) => {
    updateMarkdown(value);
  };

  return (
    <div className="h-[65vh] w-full p-4 dark:bg-transparent">
      <TitleInput />
      <SubTitleInput />
      <Separate />
      <TagsInput />
      <Suspense fallback={<Skeleton className="h-[623px] w-full" />}>
        <MDEditor
          value={addPost.markdown}
          onChange={handleMarkdownChange}
          height={500}
          onDrop={async event => {
            await onImagePasted(event.dataTransfer, handleImageMarkdown);
          }}
        />
      </Suspense>
      <div className="flex w-full justify-between border-b border-t py-3">
        <GoBackButton />
        <PublishButton />
      </div>
    </div>
  );
}
