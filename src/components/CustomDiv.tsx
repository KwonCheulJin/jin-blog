'use client';

type Props = {
  active: string;
  title: string;
  onClick: () => void;
  className?: string;
};

export default function CustomDiv({ active, title, onClick, className = '' }: Props) {
  return (
    <div className={`${className} relative group`} onClick={onClick}>
      {title}
      <span
        className={`h-[2px] inline-block w-0 bg-dark absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300 ${
          title === active ? 'w-full' : 'w-0'
        }`}
      >
        &nbsp;
      </span>
    </div>
  );
}
