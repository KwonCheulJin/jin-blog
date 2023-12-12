import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Layout({ children, className }: Props) {
  return (
    <div
      className={cn(
        'z-0 inline-block h-full w-full bg-light dark:bg-dark',
        className,
      )}
    >
      {children}
    </div>
  );
}
