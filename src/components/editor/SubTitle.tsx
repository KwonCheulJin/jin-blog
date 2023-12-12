type Props = {
  sub_title: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};
export default function SubTitle({ sub_title, onChange }: Props) {
  return (
    <input
      value={sub_title}
      className="h-16 w-full px-[12px] text-2xl font-bold caret-primary-500 focus:outline-none dark:bg-transparent"
      placeholder="부제목을 입력하세요"
      onChange={onChange}
    />
  );
}
