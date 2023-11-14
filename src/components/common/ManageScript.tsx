import Script from 'next/script';
import { GTM_ID } from '@/lib/gtm';

export default function ManageScript() {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`} />
      <Script id="google-analytics">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${GTM_ID}');
      `}
      </Script>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5738419932125263"
        crossOrigin="anonymous"
      ></Script>
    </>
  );
}
