import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        {/* Responsive Mobile Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />

        {/* Favicon & PWA Manifest */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1B4332" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="AMAL OS" />

        {/* Global OpenGraph & Social Sharing Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="AMAL OS" />
        <meta property="og:title" content="AMAL OS — Sovereign Muslim Life & Practice OS" />
        <meta property="og:description" content="Ad-free, zero-tracking Islamic Life OS. From Niyyah to Amal. Grounded in Sawad al-A'zam orthodoxy across the 4 Sunni Madhhabs." />
        <meta property="og:image" content="https://amal.life/icon-512.png" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="AMAL OS — Sovereign Muslim Life & Practice OS" />
        <meta name="twitter:description" content="Ad-free, zero-tracking Islamic Life OS. From Niyyah to Amal." />
        <meta name="twitter:image" content="https://amal.life/icon-512.png" />

        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Sacred Classical Typography:
            1. Amiri & Scheherazade New (Classical Quranic Arabic)
            2. Noto Nastaliq Urdu (Exquisite Urdu Calligraphy)
            3. Plus Jakarta Sans & Inter (Modern Crisp Latin UI)
        */}
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Noto+Nastaliq+Urdu:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Scheherazade+New:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
