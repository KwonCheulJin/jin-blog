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
    <Link
      href={href}
      className={`${className} group relative hover:text-primary-500 ${
        `/${pathname}` === href ? 'text-primary-500 dark:text-primary-500' : ''
      }`}
    >
      {title}
      <span
        className={`ease absolute -bottom-0.5 left-0 inline-block h-[2px] w-0 bg-dark transition-[width] duration-300 group-hover:w-full group-hover:bg-primary-500 ${
          `/${pathname}` === href
            ? 'w-full bg-primary-500 dark:bg-primary-500'
            : 'w-0'
        } dark:bg-light`}
      >
        &nbsp;
      </span>
    </Link>
  );
}
