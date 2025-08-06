import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function SectionContainer({ children }: Props) {
  return (
    <section className="mx-auto max-w-5xl px-0 sm:px-6 xl:px-4">
      {children}
    </section>
  );
}
