'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
  href: string;
  title: string;
  className?: string;
};

export default function CustomLink({ href, title, className = '' }: Props) {
  const pathname = usePathname()?.split('/')[1];
  return (
    <Link href={href} className={`${className} relative group`}>
      {title}
      <span
        className={`h-[2px] inline-block w-0 bg-dark absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300 ${
          `/${pathname}` === href ? 'w-full' : 'w-0'
        } dark:bg-light`}
      >
        &nbsp;
      </span>
    </Link>
  );
}
