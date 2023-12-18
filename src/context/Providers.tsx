'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ScrollUp = dynamic(() => import('@/components/common/ScrollUp'), {
  ssr: false,
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Suspense fallback={<></>}>
        <ScrollUp />
      </Suspense>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
