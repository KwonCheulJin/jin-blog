import { Action, ActionKind } from '@/components/editor/reducer';
import { Button } from '@/components/ui/button';
import { Post } from '@/types';
import { MDXEditorMethods } from '@mdxeditor/editor';
import { Dispatch, RefObject } from 'react';

type Props = {
  state: Post;
  dispatch: Dispatch<Action>;
  editorRef: RefObject<MDXEditorMethods | null>;
};
export default function PublishButton({ state, dispatch, editorRef }: Props) {
  const { title, subTitle, content, tags } = state;
  const handelMarkdown = async () => {
    const response = await fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify({
        title,
        subTitle,
        content,
        tags,
      }),
    });
    const json = await response.json();
    console.log(
      '🚀 ~ file: PublishButton.tsx:23 ~ handelMarkdown ~ json:',
      json,
    );
    dispatch({ type: ActionKind.clear, payload: null });
    editorRef.current?.setMarkdown('');
  };
  return (
    <Button
      className="text-xl hover:bg-primaryDark hover:text-dark"
      onClick={handelMarkdown}
    >
      출간하기
    </Button>
  );
}
