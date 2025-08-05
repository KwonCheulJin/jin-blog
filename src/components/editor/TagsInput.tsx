'use client';

import { Button } from '@/components/ui/button';
import { usePostStore } from '@/store/post';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
// UUID 사용 제거 - tag 값으로 key 사용

export default function TagsInput() {
  const { addPost, updateTags } = usePostStore();
  const [input, setInput] = useState('');

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) {
      return;
    }
    const { key } = e;

    if (key === ',' || key === 'Enter') {
      e.preventDefault();
      const trimmedInput = input.trim();

      if (trimmedInput.length > 0 && !addPost.tags.includes(trimmedInput)) {
        updateTags([...addPost.tags, trimmedInput]);
      }
      setInput('');
    }
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInput(value);
  };

  const onRemoveTag = (targetTag: string) => {
    updateTags(addPost.tags.filter(tag => tag !== targetTag));
  };
  return (
    <div className="my-3 px-3">
      {addPost.tags.map(tag => (
        <Button
          className="mr-3 rounded-3xl bg-primary-500 hover:bg-primaryDark hover:text-black"
          variant="ghost"
          key={tag}
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
