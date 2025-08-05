import { usePostStore } from '@/store/post';

export default function SubTitleInput() {
  const { addPost, updateSubTitle } = usePostStore();
  const handleSubTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSubTitle(e.target.value);
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
