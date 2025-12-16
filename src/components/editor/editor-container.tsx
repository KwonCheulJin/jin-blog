'use client';
import GoBackButton from '@/components/editor/go-back-button';
import PublishButton from '@/components/editor/publish-button';
import Separate from '@/components/editor/separate';
import SubTitleInput from '@/components/editor/sub-title-input';
import TagsInput from '@/components/editor/tags-input';
import TitleInput from '@/components/editor/title-input';

import onImagePasted from '@/components/editor/on-image-pasted';
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
    _event?: ChangeEvent<HTMLTextAreaElement>,
    _state?: ContextStore,
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
