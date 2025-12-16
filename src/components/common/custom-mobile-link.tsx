import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
  href: string;
  title: string;
  className?: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CustomMobileLink({
  href,
  title,
  className = '',
  setIsOpen,
}: Props) {
  const pathname = usePathname()?.split('/')[1];
  return (
    <Link
      href={href}
      className={`${className} group relative my-2 text-light last:mb-4 dark:text-dark`}
      onClick={() => setIsOpen(prev => !prev)}
    >
      {title}
      <span
        className={`ease absolute -bottom-0.5 left-0 inline-block h-[2px] w-0 bg-light transition-[width] duration-300 group-hover:w-full ${
          `/${pathname}` === href ? 'w-full' : 'w-0'
        } dark:bg-dark`}
      >
        &nbsp;
      </span>
    </Link>
  );
}
