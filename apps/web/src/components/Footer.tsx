import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FooterTrustBanner } from './footer/FooterTrustBanner';
import { FooterNavigationGrid } from './footer/FooterNavigationGrid';
import { FooterLegalDisclaimer } from './footer/FooterLegalDisclaimer';
import { FooterBottomBar } from './footer/FooterBottomBar';

export const Footer: React.FC = () => {
  const { isUrdu } = useLanguage();

  return (
    <footer
      style={{
        backgroundColor: '#0A1E16',
        color: '#E5E7EB',
        marginTop: 'auto',
        borderTop: '3px solid #10B981',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Top Theological Trust & Deeni Heritage Banner */}
      <FooterTrustBanner isUrdu={isUrdu} />

      {/* Main Sitemap & Bottom Bar */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '44px 24px 32px' }}>
        <FooterNavigationGrid isUrdu={isUrdu} />
        <FooterLegalDisclaimer isUrdu={isUrdu} />
        <FooterBottomBar isUrdu={isUrdu} />
      </div>
    </footer>
  );
};
