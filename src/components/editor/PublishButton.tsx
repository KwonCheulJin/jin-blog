'use client';
import { Action, ActionKind } from '@/components/editor/reducer';
import { Button } from '@/components/ui/button';
import { AddPost } from '@/service/posts';
import { Post } from '@/types';
import { useRouter } from 'next/navigation';
import { Dispatch } from 'react';

type Props = {
  state: Post;
  dispatch: Dispatch<Action>;
};
export default function PublishButton({ state, dispatch }: Props) {
  const router = useRouter();
  const handelMarkdown = async () => {
    const result = await AddPost({ ...state });
    if (result.status === 200) {
      dispatch({ type: ActionKind.clear, payload: null });
      router.push('/posts');
    }
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
