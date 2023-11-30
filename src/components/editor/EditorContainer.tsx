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
import { MDXEditorMethods } from '@mdxeditor/editor';
import dynamic from 'next/dynamic';
import { ChangeEvent, Suspense, useReducer, useRef } from 'react';

const Editor = dynamic(() => import('./InitializedMDXEditor'), {
  ssr: false,
});

export default function EditorContainer() {
  const editorRef = useRef<MDXEditorMethods>(null);
  const [state, dispatch] = useReducer(postReducer, initialState);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch({ type: ActionKind.title, payload: value });
  };
  const handleSubTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch({ type: ActionKind.subTitle, payload: value });
  };
  const handleMarkdownChange = (markdown: string) => {
    dispatch({ type: ActionKind.content, payload: markdown });
  };

  return (
    <div className="h-[65vh] w-full p-4 dark:bg-transparent">
      <Title onChange={handleTitleChange} />
      <SubTitle onChange={handleSubTitleChange} />
      <Separate />
      <Tags tags={state.tags} dispatch={dispatch} />
      <Suspense fallback={<Skeleton className="h-[623px] w-full" />}>
        <Editor
          markdown={state.content}
          onChange={handleMarkdownChange}
          editorRef={editorRef}
        />
      </Suspense>
      <div className="flex w-full justify-between border-b border-t py-3">
        <GoBackButton />
        <PublishButton
          state={state}
          dispatch={dispatch}
          editorRef={editorRef}
        />
      </div>
    </div>
  );
}
