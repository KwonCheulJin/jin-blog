import { usePostStore } from '@/store/post';

export default function Title() {
  const { addPost, setAddPost } = usePostStore();
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAddPost({ ...addPost, title: value });
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
