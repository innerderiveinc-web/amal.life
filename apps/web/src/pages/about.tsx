import React from 'react';
import Head from 'next/head';
import { Navigation } from '../components/Navigation';
import { useLanguage } from '../context/LanguageContext';
import { AboutHeroBanner } from '../components/about/AboutHeroBanner';
import { AboutSovereignPillars } from '../components/about/AboutSovereignPillars';
import { AboutFaqSection } from '../components/about/AboutFaqSection';
import { AboutStewardshipSection } from '../components/about/AboutStewardshipSection';

export default function AboutPage() {
  const { t, isUrdu } = useLanguage();

  return (
    <div
      style={{
        backgroundColor: '#FAF9F6',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Head>
        <title>About AMAL OS by Qsura India Pvt Ltd — Authentic Methodology &amp; Architecture</title>
        <meta name="author" content="Qsura India Pvt Ltd" />
        <meta
          name="description"
          content="Learn about AMAL OS by Qsura India Pvt Ltd: The sovereign, ad-free Islamic operating system grounded in Sawad al-A'zam orthodoxy across the 4 Sunni Madhhabs."
        />
      </Head>

      <Navigation />

      {/* Hero Banner */}
      <AboutHeroBanner t={t} />

      {/* Main Content Area */}
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 60px', width: '100%' }}>
        {/* Core Pillars & Digital Clerk Model */}
        <AboutSovereignPillars t={t} />

        {/* FAQ Section */}
        <AboutFaqSection isUrdu={isUrdu} />

        {/* Engineering Stewardship & Scholarly Desk */}
        <AboutStewardshipSection t={t} />
      </main>
    </div>
  );
}
