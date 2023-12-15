import '@/styles/globals.css';

import { Inter as FontSans } from 'next/font/google';
import type { Metadata } from 'next';

import { Analytics } from '@vercel/analytics/react';
import ManageScript from '@/components/common/ManageScript';
import { Providers } from '@/context/Providers';
import { cn } from '@/lib/utils';
import ScrollUp from '@/components/common/ScrollUp';
import { Suspense } from 'react';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.jin-blog.dev'),
  title: {
    default: `Jin's Dev Log`,
    template: `Jin's Dev Log | %s`,
  },
  keywords:
    'Jin, blog, front-end, 프론트앤드, 개발, 개발 블로그, React, Next.js, Dev Log, Dev, Log',
  description: 'front-end developer Jin',
  icons: {
    icon: ['/images/favicon-32x32.png', '/images/favicon-16x16.png'],
    apple: '/images/apple-touch-icon.png',
  },
  manifest: '/images/site.webmanifest',
  openGraph: {
    images: '/images/ogImage.png',
  },
  other: {
    'google-site-verification': 'PeVMqbjqq47qprclWhUS3i860ni8J5wXWOfc8Xy1_98',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <meta
        name="theme-color"
        media="(prefers-color-scheme: light)"
        content="#fff"
      />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: dark)"
        content="#000"
      />
      <ManageScript />
      <Suspense fallback={null}>
        <ScrollUp />
      </Suspense>
      <body
        className={cn(
          'min-h-screen w-full bg-light font-mont dark:bg-dark',
          fontSans.variable,
        )}
      >
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
