import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Navigation } from '../components/Navigation';

export default function CopyrightPage() {
  return (
    <div style={{ backgroundColor: '#F8F9FA', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Head>
        <title>Copyright, Waqf & Open Attribution Charter | AMAL OS</title>
        <meta name="description" content="Copyright notice, Islamic Waqf policy, and scholarly source attributions for AMAL OS." />
      </Head>

      <Navigation />

      <main style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px 80px' }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#1B4332', letterSpacing: 1, textTransform: 'uppercase' }}>
              INTELLECTUAL PROPERTY & PUBLIC TRUST
            </span>
            <span style={{ fontSize: 11, backgroundColor: '#D1FAE5', color: '#065F46', padding: '2px 8px', borderRadius: 12, fontWeight: 700 }}>
              Sadaqah Jariyah
            </span>
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#1B4332', margin: '0 0 10px' }}>
            Copyright, Waqf & Attribution Charter
          </h1>
          <p style={{ color: '#4B5563', fontSize: 15, margin: 0, lineHeight: 1.6 }}>
            Clarifying the ownership of software, the sacred status of divine revelation, and giving due credit to the scholars and technologists who preserve Islamic heritage.
          </p>
        </div>

        {/* Top Summary Banner */}
        <div style={{
          backgroundColor: '#0F291E',
          color: '#E5E7EB',
          borderRadius: 16,
          padding: '24px 28px',
          marginBottom: 36,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#A7F3D0' }}>
              © 2026 AMAL OS by Qsura India Pvt Ltd. All Rights Reserved.
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#6EE7B7', marginTop: 2 }}>
              Founder &amp; Chief Architect: Dr. Irfan Ashraf
            </div>
            <p style={{ fontSize: 13, color: '#9CA3AF', margin: '4px 0 0' }}>
              Software runtime, design architecture, and compilation engines are the proprietary property of Qsura India Pvt Ltd, founded and architected by Dr. Irfan Ashraf, protected by global intellectual property law, and dedicated as a perpetual Waqf for the service of the Ummah.
            </p>
          </div>
          <div style={{
            backgroundColor: 'rgba(52, 211, 153, 0.15)',
            color: '#6EE7B7',
            padding: '8px 16px',
            borderRadius: 10,
            fontSize: 12,
            fontWeight: 700,
            border: '1px solid rgba(52, 211, 153, 0.3)',
          }}>
            وقف لله تعالى · Sacred Public Trust
          </div>
        </div>

        {/* Detailed Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Section 1: Sacred Revelation Waqf Status */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 14, border: '1px solid #E5E7EB', padding: 28 }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: '#1B4332', display: 'flex', alignItems: 'center', gap: 10, margin: '0 0 12px' }}>
              <span>📖</span> The Holy Quran & Divine Revelation: Eternal Waqf
            </h2>
            <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, margin: 0 }}>
              No individual, organization, or sovereign entity holds copyright over the Words of Allah ﷻ (The Noble Quran) or the Sunnah of Sayyiduna Muhammad ﷺ. In the jurisprudence of Islam, divine revelation belongs to all humanity and is perpetual <strong>Waqf Lil-Ummah (Islamic Public Trust)</strong>. No paywalls, commercial tolls, or artificial locks are placed upon reading, searching, or memorizing the Holy Quran in AMAL OS.
            </p>
          </div>

          {/* Section 2: Attribution of Master Quranic & Hadith Corpora */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 14, border: '1px solid #E5E7EB', padding: 28 }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: '#1B4332', display: 'flex', alignItems: 'center', gap: 10, margin: '0 0 16px' }}>
              <span>🏛️</span> Scholarly Attribution & Data Sources
            </h2>
            <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, marginBottom: 16 }}>
              In accordance with the Prophetic maxim, <em>"Whoever does not thank the people does not thank Allah"</em> (Sunan Abi Dawud), we humbly acknowledge and attribute the following foundational projects:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
              <div style={{ padding: 16, backgroundColor: '#F9FAFB', borderRadius: 10, border: '1px solid #E5E7EB' }}>
                <h4 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 6px', color: '#111827' }}>
                  🕌 King Fahd Complex (KFGQPC)
                </h4>
                <p style={{ fontSize: 12, color: '#4B5563', margin: 0, lineHeight: 1.5 }}>
                  The gold standard for the Uthmanic Medina Mushaf text, glyphs, and authentic pause markers.
                </p>
              </div>

              <div style={{ padding: 16, backgroundColor: '#F9FAFB', borderRadius: 10, border: '1px solid #E5E7EB' }}>
                <h4 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 6px', color: '#111827' }}>
                  📜 Tanzil Quran Text Project
                </h4>
                <p style={{ fontSize: 12, color: '#4B5563', margin: 0, lineHeight: 1.5 }}>
                  Standardized, verified Unicode Quran text and multi-lingual translations (Urdu, English, Persian, Turkish).
                </p>
              </div>

              <div style={{ padding: 16, backgroundColor: '#F9FAFB', borderRadius: 10, border: '1px solid #E5E7EB' }}>
                <h4 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 6px', color: '#111827' }}>
                  🎙️ EveryAyah Audio Project
                </h4>
                <p style={{ fontSize: 12, color: '#4B5563', margin: 0, lineHeight: 1.5 }}>
                  High-fidelity audio recordings of Master Qurra (Shaykh Al-Husary, Shaykh Al-Minshawi, Shaykh Abdul Basit, Shaykh Alafasy).
                </p>
              </div>

              <div style={{ padding: 16, backgroundColor: '#F9FAFB', borderRadius: 10, border: '1px solid #E5E7EB' }}>
                <h4 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 6px', color: '#111827' }}>
                  📚 Sunnah.com & Al-Maktaba al-Shamela
                </h4>
                <p style={{ fontSize: 12, color: '#4B5563', margin: 0, lineHeight: 1.5 }}>
                  Digitized Kutub al-Sittah (Bukhari, Muslim, Abu Dawud, Tirmidhi, Nasa'i, Ibn Majah) and classical fiqh references.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Permissible Re-use & Developer Guidelines */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 14, border: '1px solid #E5E7EB', padding: 28 }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: '#1B4332', display: 'flex', alignItems: 'center', gap: 10, margin: '0 0 12px' }}>
              <span>💻</span> Open Source & Permissible Usage
            </h2>
            <ul style={{ fontSize: 14, color: '#374151', lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
              <li>
                <strong>Non-Commercial Educational Use:</strong> Mosques, Islamic schools (Madaris), students of knowledge, and non-profit organizations are free to use AMAL OS calculation engines and materials for educational purposes without paying royalties.
              </li>
              <li>
                <strong>Proprietary Restrictions:</strong> You may not repackage AMAL OS into closed adware, re-sell calculated Fara'id certificates for predatory commercial fees, or train generative models intended to disparage Islam.
              </li>
              <li>
                <strong>Trademarks:</strong> "AMAL OS", the AMAL emblem, and the "Sakinah Design System" are trademarks of the AMAL OS Project.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Nav Links */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 32, flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', gap: 14 }}>
            <Link href="/terms" style={{ color: '#1B4332', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
              ← Terms of Service & Shar'i Adab
            </Link>
            <Link href="/privacy" style={{ color: '#1B4332', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
              Privacy Policy & Security Vault →
            </Link>
          </div>
          <span style={{ fontSize: 12, color: '#6B7280' }}>
            Alhamdulillah for the opportunity to serve.
          </span>
        </div>
      </main>
    </div>
  );
}
