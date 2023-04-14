import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
  href: string;
  title: string;
  className?: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CustomMobileLink({ href, title, className = '', setIsOpen }: Props) {
  const pathname = usePathname()?.split('/')[1];
  return (
    <Link
      href={href}
      className={`${className} relative group text-light dark:text-dark my-2 last:mb-4`}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      {title}
      <span
        className={`h-[2px] inline-block w-0 bg-light absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300 ${
          `/${pathname}` === href ? 'w-full' : 'w-0'
        } dark:bg-dark`}
      >
        &nbsp;
      </span>
    </Link>
  );
}
