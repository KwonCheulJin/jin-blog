type Props = {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};
export default function SubTitle({ onChange }: Props) {
  return (
    <input
      className="h-16 w-full px-[12px] text-2xl font-bold caret-primary-500 focus:outline-none dark:bg-transparent"
      placeholder="부제목을 입력하세요"
      onChange={onChange}
    />
  );
}
