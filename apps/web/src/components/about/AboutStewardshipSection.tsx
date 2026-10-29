import React from 'react';
import Link from 'next/link';

interface AboutStewardshipSectionProps {
  t: (en: string, ur: string) => string;
}

export const AboutStewardshipSection: React.FC<AboutStewardshipSectionProps> = ({ t }) => {
  return (
    <>
      {/* Engineering & Stewardship by Qsura India Pvt Ltd */}
      <section
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          padding: '36px 32px',
          border: '1px solid #E5E7EB',
          marginBottom: 48,
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{ fontSize: 28 }}>🏛️</span>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1B4332', margin: 0 }}>
              Engineering &amp; Stewardship by Qsura India Pvt Ltd
            </h2>
            <span style={{ fontSize: 12, color: '#059669', fontWeight: 700 }}>
              {t('Public Benefit Islamic Technology', 'پبلک بینیفٹ و شرعی امانت')}
            </span>
          </div>
        </div>
        <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, margin: '0 0 14px' }}>
          <strong>AMAL OS</strong> is the proprietary intellectual property of <strong>Qsura India Pvt Ltd</strong>,
          founded and architected by <strong>Dr. Irfan Ashraf</strong>. Designed from the ground up as a dedicated sovereign life platform for the global
          Muslim Ummah, its engineering unites deep technological rigor with authentic
          traditional orthodoxy (Ahl al-Sunnah wal-Jama&apos;ah).
        </p>
        <div style={{ backgroundColor: '#F8FAFC', borderRadius: 12, padding: '16px 20px', border: '1px solid #E2E8F0', marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 4 }}>
            Founder &amp; Chief Architect: <span style={{ color: '#065F46' }}>Dr. Irfan Ashraf</span>
          </div>
          <div style={{ fontSize: 12, color: '#64748B', lineHeight: 1.6 }}>
            Steward Entity: <strong>Qsura India Pvt Ltd</strong> · Guiding the mission of delivering an ad-free, private, mathematically exact Islamic computing system free from sectarian deviation and commercial exploitation.
          </div>
        </div>
        <p style={{ fontSize: 14, color: '#4B5563', lineHeight: 1.7, margin: 0 }}>
          Qsura India Pvt Ltd commits that AMAL OS shall remain 100% ad-free, devoid of commercial
          tracking, strictly grounded in the consensus of Sawad al-A&apos;zam, and protected against algorithmic distortion. All
          digital calculation engines and foundational canons are offered as a perpetual Waqf in
          service of divine worship.
        </p>
      </section>

      {/* Contact & Scholarly Review Banner */}
      <section
        style={{
          backgroundColor: '#E8F5E9',
          borderRadius: 14,
          padding: '36px 28px',
          border: '1px solid #A7F3D0',
          textAlign: 'center',
          maxWidth: 860,
          margin: '0 auto',
        }}
      >
        <span style={{ fontSize: 36 }}>📬</span>
        <h3
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: '#1B4332',
            marginTop: 10,
            marginBottom: 8,
          }}
        >
          Scholarly Feedback &amp; Community Contact
        </h3>
        <p
          style={{
            fontSize: 14,
            color: '#166534',
            maxWidth: 640,
            margin: '0 auto 20px',
            lineHeight: 1.6,
          }}
        >
          Are you an Islamic scholar (Alim / Mufti), researcher, or seeker with feedback, corpus
          corrections, or institutional inquiries? We welcome scholarly review with deep gratitude.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
          <a
            href="mailto:scholars@amal.life"
            style={{
              backgroundColor: '#1B4332',
              color: '#FFFFFF',
              padding: '10px 20px',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 13,
              textDecoration: 'none',
            }}
          >
            Contact Scholarly Desk (scholars@amal.life)
          </a>
          <Link
            href="/privacy"
            style={{
              backgroundColor: '#FFFFFF',
              color: '#1B4332',
              padding: '10px 20px',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 13,
              textDecoration: 'none',
              border: '1px solid #A7F3D0',
            }}
          >
            Read Privacy Pledge 🔒
          </Link>
        </div>
      </section>
    </>
  );
};
