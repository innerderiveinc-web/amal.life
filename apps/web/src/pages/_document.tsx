import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        {/* Favicon & Meta */}
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#1B4332" />

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
