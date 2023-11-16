'use client';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Layout({ children, className = '' }: Props) {
  return (
    <div
      className={`z-0 inline-block h-full w-full bg-light p-32 dark:bg-dark sm:p-8 md:p-12 lg:p-16 ${className}`}
    >
      {children}
    </div>
  );
}
