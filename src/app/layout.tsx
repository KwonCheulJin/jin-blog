import './globals.css';

import { Open_Sans } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

const sans = Open_Sans({ subsets: ['latin'] });

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
    images: '/images/my-profile.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.className}>
      <body className="flex flex-col w-full">
        <Header />
        <main className="grow w-full max-w-screen-2xl mx-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
