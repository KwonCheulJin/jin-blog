import { usePostStore } from '@/store/post';

export default function TitleInput() {
  const { addPost, updateTitle } = usePostStore();
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTitle(e.target.value);
  };
  return (
    <input
      value={addPost.title}
      className="h-28 w-full px-[12px] text-5xl font-bold caret-primary-500 focus:outline-none dark:bg-transparent"
      placeholder="제목을 입력하세요"
      onChange={handleTitleChange}
    />
  );
}
