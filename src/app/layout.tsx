import './globals.css';

import { Montserrat } from 'next/font/google';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import type { Metadata } from 'next';
import Script from 'next/script';
import { GTM_ID } from '@/lib/gtm';
import ScrollUp from '@/components/common/ScrollUp';

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
  other: {
    'google-site-verification': 'PeVMqbjqq47qprclWhUS3i860ni8J5wXWOfc8Xy1_98',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={mont.className}>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GTM_ID}');
        `}
      </Script>
      <body className="font-mont bg-light w-full min-h-screen dark:bg-dark">
        <ScrollUp />
        <Header />
        <main className="flex items-center text-dark w-full min-h-screen dark:text-light">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
