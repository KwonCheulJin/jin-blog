'use client';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Layout({ children, className = '' }: Props) {
  return (
    <div className={`w-full h-full inline-block z-0 bg-light p-32 dark:bg-dark ${className}`}>
      {children}
    </div>
  );
}
