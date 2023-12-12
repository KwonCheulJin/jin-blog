'use client';
import GoBackButton from '@/components/editor/GoBackButton';
import PublishButton from '@/components/editor/PublishButton';
import Separate from '@/components/editor/Separate';
import SubTitle from '@/components/editor/SubTitle';
import Tags from '@/components/editor/Tags';
import Title from '@/components/editor/Title';
import {
  ActionKind,
  initialState,
  postReducer,
} from '@/components/editor/reducer';

import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';
import { ChangeEvent, Suspense, useReducer } from 'react';
import { ContextStore } from '@uiw/react-md-editor';
import onImagePasted from '@/components/editor/onImagePasted';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });
export default function EditorContainer() {
  const [state, dispatch] = useReducer(postReducer, initialState);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch({ type: ActionKind.title, payload: value });
  };
  const handleSubTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch({ type: ActionKind.sub_title, payload: value });
  };
  const handleMarkdownChange = (
    value?: string,
    event?: ChangeEvent<HTMLTextAreaElement>,
    state?: ContextStore,
  ) => {
    value && dispatch({ type: ActionKind.markdown, payload: value });
  };

  const handleImageMarkdown = (value: string) => {
    dispatch({
      type: ActionKind.markdown,
      payload: value,
    });
  };

  return (
    <div className="h-[65vh] w-full p-4 dark:bg-transparent">
      <Title title={state.title} onChange={handleTitleChange} />
      <SubTitle sub_title={state.sub_title} onChange={handleSubTitleChange} />
      <Separate />
      <Tags tags={state.tags} dispatch={dispatch} />
      <Suspense fallback={<Skeleton className="h-[623px] w-full" />}>
        <MDEditor
          value={state.markdown}
          onChange={handleMarkdownChange}
          height={500}
          onDrop={async event => {
            await onImagePasted(event.dataTransfer, handleImageMarkdown);
          }}
        />
      </Suspense>
      <div className="flex w-full justify-between border-b border-t py-3">
        <GoBackButton />
        <PublishButton state={state} dispatch={dispatch} />
      </div>
    </div>
  );
}
