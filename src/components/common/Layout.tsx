'use client';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Layout({ children, className = '' }: Props) {
  return (
    <div
      className={`w-full h-full inline-block z-0 bg-light p-32 dark:bg-dark xl:p-24 lg:p-16 md:p-12 sm:p-8 ${className}`}
    >
      {children}
    </div>
  );
}
