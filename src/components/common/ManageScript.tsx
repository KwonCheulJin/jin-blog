import Script from 'next/script';
import { GTM_ID } from '@/lib/gtm';

export default function ManageScript() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
        crossOrigin="anonymous"
      />
      <Script id="google-analytics">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${GTM_ID}');
      `}
      </Script>
    </>
  );
}
