import './globals.css';
import '@mdxeditor/editor/style.css';

import { Montserrat } from 'next/font/google';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import type { Metadata } from 'next';

import ScrollUp from '@/components/common/ScrollUp';
import { Analytics } from '@vercel/analytics/react';
import ManageScript from '@/components/common/ManageScript';
import { ThemeProviders } from '@/context/theme-provider';

const mont = Montserrat({
  subsets: ['latin'],
  variable: '--font-mont',
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
    icon: '/favicon.ico',
  },
  openGraph: {
    images: '/images/my-profile.png',
  },
  other: {
    'google-site-verification': 'PeVMqbjqq47qprclWhUS3i860ni8J5wXWOfc8Xy1_98',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={mont.className} suppressHydrationWarning>
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <ManageScript />
      <body className="font-mont bg-light w-full min-h-screen dark:bg-dark">
        <ThemeProviders>
          <ScrollUp />
          <Header />
          <main className="flex items-center text-dark w-full min-h-screen dark:text-light">
            {children}
          </main>
          <Footer />
          <Analytics />
        </ThemeProviders>
      </body>
    </html>
  );
}
