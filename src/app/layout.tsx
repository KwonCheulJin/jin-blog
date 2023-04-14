import './globals.css';

import { Montserrat } from 'next/font/google';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import AnimatedLayout from '@/components/common/AnimatedLayout';
import type { Metadata } from 'next';

const mont = Montserrat({
  subsets: ['latin'],
  variable: '--font-mont',
});

export const metadata: Metadata = {
  title: {
    default: 'JIN의 블로그',
    template: 'JIN의 블로그 | %s',
  },
  description: 'front-end developer JIN',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    images: 'https://jin-blog-blush.vercel.app/images/my-profile.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={mont.className}>
      <body className="font-mont bg-light w-full min-h-screen dark:bg-dark">
        <Header />
        <AnimatedLayout>{children}</AnimatedLayout>
        <Footer />
      </body>
    </html>
  );
}
