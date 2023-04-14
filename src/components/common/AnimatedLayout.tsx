'use client';

import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function AnimatedLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <main
        key={pathname}
        className="flex items-center text-dark w-full min-h-screen dark:text-light"
      >
        {children}
      </main>
    </AnimatePresence>
  );
}
