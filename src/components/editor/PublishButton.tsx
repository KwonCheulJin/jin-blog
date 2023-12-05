import { Action, ActionKind } from '@/components/editor/reducer';
import { Button } from '@/components/ui/button';
import { Post } from '@/types';
import { Dispatch } from 'react';

type Props = {
  state: Post;
  dispatch: Dispatch<Action>;
};
export default function PublishButton({ state, dispatch }: Props) {
  const { title, subTitle, markdown, tags } = state;
  const handelMarkdown = async () => {
    const response = await fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify({
        title,
        subTitle,
        markdown,
        tags,
      }),
    });
    const json = await response.json();
    console.log(
      '🚀 ~ file: PublishButton.tsx:23 ~ handelMarkdown ~ json:',
      json,
    );
    dispatch({ type: ActionKind.clear, payload: null });
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
