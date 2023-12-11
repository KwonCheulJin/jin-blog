import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function PageTitle({ children }: Props) {
  return (
    <h1 className="leading-14 text-5xl font-extrabold text-gray-900 dark:text-gray-100 lg:text-3xl lg:leading-9 lg:tracking-tight">
      {children}
    </h1>
  );
}
