import React from 'react';
import Link from 'next/link';

interface AboutHeroBannerProps {
  t: (en: string, ur: string) => string;
}

export const AboutHeroBanner: React.FC<AboutHeroBannerProps> = ({ t }) => {
  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #0F291E 0%, #1B4332 60%, #2D6A4F 100%)',
        color: '#FFFFFF',
        padding: '60px 24px 50px',
        textAlign: 'center',
        borderBottom: '4px solid #D4AF37',
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            backgroundColor: 'rgba(212, 175, 55, 0.15)',
            border: '1px solid rgba(212, 175, 55, 0.4)',
            padding: '6px 16px',
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 700,
            color: '#FDE68A',
            marginBottom: 20,
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}
        >
          <span>🕌</span> {t('About & Methodology', 'تعارف و منہج')}
        </div>

        <h1
          style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 900,
            lineHeight: 1.2,
            marginBottom: 16,
            letterSpacing: -0.5,
          }}
        >
          From Niyyah to Amal.
        </h1>

        <p
          style={{
            fontSize: 'clamp(15px, 2vw, 18px)',
            color: '#D1FAE5',
            lineHeight: 1.6,
            maxWidth: 720,
            margin: '0 auto 28px',
          }}
        >
          A sovereign, private, and evidence-grounded Muslim Life Operating System—designed to bring
          calm, intentional worship into daily modern life without commercial ads, sectarian bias, or
          unverified claims.
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <Link
            href="/prayer"
            style={{
              backgroundColor: '#D4AF37',
              color: '#0F291E',
              padding: '12px 24px',
              borderRadius: 8,
              fontWeight: 800,
              fontSize: 14,
              textDecoration: 'none',
            }}
          >
            Explore Daily Suite →
          </Link>
          <Link
            href="/library"
            style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: '#FFFFFF',
              padding: '12px 24px',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 14,
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            106 Classical Works 📚
          </Link>
        </div>
      </div>
    </section>
  );
};
