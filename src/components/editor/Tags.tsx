'use client';

import { Action, ActionKind } from '@/components/editor/reducer';
import { Button } from '@/components/ui/button';
import { KeyboardEvent, ChangeEvent, useState, Dispatch } from 'react';
import { v1 } from 'uuid';

type Props = {
  tags: string[];
  dispatch: Dispatch<Action>;
};

export default function Tags({ tags, dispatch }: Props) {
  const [input, setInput] = useState('');

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) {
      return;
    }
    const { key } = e;

    if (key === ',' || key === 'Enter') {
      e.preventDefault();
      const trimmedInput = input.trim();

      if (trimmedInput.length > 0 && !tags.includes(trimmedInput)) {
        dispatch({ type: ActionKind.tags, payload: [...tags, trimmedInput] });
      }
      setInput('');
    }
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInput(value);
  };

  const onRemoveTag = (targetTag: string) => {
    dispatch({
      type: ActionKind.tags,
      payload: tags.filter(tag => tag !== targetTag),
    });
  };
  return (
    <div className="my-3 px-3">
      {tags.map(tag => (
        <Button
          className="mr-3 rounded-3xl bg-primary-500 hover:bg-primaryDark hover:text-black"
          variant="ghost"
          key={v1()}
          onClick={() => onRemoveTag(tag)}
        >
          {tag}
        </Button>
      ))}
      <input
        className="bg-transparent py-4 caret-primary-500 focus:outline-none"
        value={input}
        placeholder="태그를 입력하세요"
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
