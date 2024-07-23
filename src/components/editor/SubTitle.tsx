import { usePostStore } from '@/store/post';

export default function SubTitle() {
  const { addPost, setAddPost } = usePostStore();
  const handleSubTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAddPost({ ...addPost, sub_title: value });
  };
  return (
    <input
      value={addPost.sub_title}
      className="h-16 w-full px-[12px] text-2xl font-bold caret-primary-500 focus:outline-none dark:bg-transparent"
      placeholder="부제목을 입력하세요"
      onChange={handleSubTitleChange}
    />
  );
}
