'use client';

import Script from 'next/script';

// eslint-disable-next-line prefer-destructuring
const ANALYTICS_MEASUREMENT_ID = process.env.ANALYTICS_MEASUREMENT_ID;

function GoogleAnalytics() {
  return ANALYTICS_MEASUREMENT_ID ? (
    <>
      <Script
        strategy="worker"
        src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_MEASUREMENT_ID}`}
      />

      <Script id="" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${ANALYTICS_MEASUREMENT_ID}', {
          page_path: window.location.pathname,
          });
      `}
      </Script>
    </>
  ) : null;
}

export default GoogleAnalytics;
