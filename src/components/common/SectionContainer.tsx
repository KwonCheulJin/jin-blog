import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function SectionContainer({ children }: Props) {
  return (
    <section className="mx-auto max-w-3xl px-6 md:max-w-4xl md:px-4 lg:max-w-5xl lg:px-0">
      {children}
    </section>
  );
}
