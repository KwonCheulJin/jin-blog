type Props = {
  title: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};
export default function Title({ title, onChange }: Props) {
  return (
    <input
      value={title}
      className="h-28 w-full px-[12px] text-5xl font-bold caret-primary-500 focus:outline-none dark:bg-transparent"
      placeholder="제목을 입력하세요"
      onChange={onChange}
    />
  );
}
