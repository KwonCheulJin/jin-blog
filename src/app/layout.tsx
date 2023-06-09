import './globals.css';

import { Montserrat } from 'next/font/google';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import type { Metadata } from 'next';

import ScrollUp from '@/components/common/ScrollUp';
import { Analytics } from '@vercel/analytics/react';
import ManageScript from '@/components/common/ManageScript';

const mont = Montserrat({
  subsets: ['latin'],
  variable: '--font-mont',
});

export const metadata: Metadata = {
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
    images: 'https://jin-blog-blush.vercel.app/images/my-profile.png',
  },
  other: {
    'google-site-verification': 'PeVMqbjqq47qprclWhUS3i860ni8J5wXWOfc8Xy1_98',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={mont.className}>
      <ManageScript />
      <body className="font-mont bg-light w-full min-h-screen dark:bg-dark">
        <ScrollUp />
        <Header />
        <main className="flex items-center text-dark w-full min-h-screen dark:text-light">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
