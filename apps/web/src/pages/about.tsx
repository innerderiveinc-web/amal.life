import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Navigation } from '../components/Navigation';
import { AmalTheme } from '@amal/ui';

export default function AboutPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'What is AMAL OS and how is it different from other Islamic apps?',
      qUrdu: 'عمل کیا ہے اور یہ دوسری اسلامی ایپس سے کس طرح مختلف ہے؟',
      a: 'AMAL OS is a sovereign, ad-free Muslim Life Operating System. Unlike conventional apps that merely serve as prayer alarm clocks or gamify worship with anxiety-inducing streak scores, AMAL OS converts intentional Niyyah into actionable micro-habits, protects private reflections in an isolated domestic vault, and grounds every piece of guidance in verified classical Islamic scholarship.',
    },
    {
      q: 'Does AMAL OS issue independent religious rulings or Fatwas?',
      qUrdu: 'کیا امل او ایس کوئی خود ساختہ فتویٰ یا شرعی فیصلہ جاری کرتا ہے؟',
      a: 'ہرگز نہیں۔ اسلامی شریعت میں فتویٰ دینا صرف زندہ اور باقاعدہ مستند مفتیانِ کرام کا حق ہے۔ امل ایک تحقیقی و معلوماتی پلیٹ فارم ہے جس میں کسی بھی مشین یا خودکار نظام کو نیا فتویٰ گھڑنے یا حلال و حرام کا خود فیصلہ کرنے کی قطعی اجازت نہیں۔ امل صرف قرآن، سنت اور فقہائے اربعہ کی معتبر کتب سے اصل متون و حوالہ جات پیش کرتا ہے اور ذاتی پیچیدہ مسائل میں مستند مفتیانِ کرام سے رجوع کرواتا ہے۔',
    },
    {
      q: 'How does AMAL OS treat the Four Sunni Madhhabs (Fiqh Schools)?',
      qUrdu: 'چاروں فقہی مذاہب (حنفی، شافعی، مالکی، حنبلی) کے بارے میں کیا طریقہ کار ہے؟',
      a: 'AMAL OS strictly upholds the classical consensus of Ahl al-Sunnah wal-Jama\'ah (al-Sawad al-A\'zam). All four historical Sunni legal schools—Hanafi, Shafi\'i, Maliki, and Hanbali—are presented with equal scholarly reverence and canonical fidelity. Users can toggle Asr times (Mislayn vs Misl al-Awwal) and Zakat jewelry positions per their followed school with complete ease.',
    },
    {
      q: 'How are prayer times and Qibla direction calculated?',
      qUrdu: 'نماز کے اوقات اور قبلہ کا رخ کس طرح معلوم کیا جاتا ہے؟',
      a: 'Prayer times and Qibla azimuth are calculated deterministically on-device using precise solar astronomical algorithms. They do not depend on external servers or commercial APIs. Furthermore, classical Dar-ul-Ifta precautionary buffers (2-minute Ihtiyat for Dhuhr and Maghrib) are implemented for spiritual assurance.',
    },
    {
      q: 'Why are there zero advertisements and zero user tracking?',
      qUrdu: 'اس ایپ میں اشتہارات اور ٹریکنگ کیوں نہیں ہے؟',
      a: 'Worship and private spiritual reflections are sacred trusts (Amanah). Commercial advertising introduces undignified distractions, while tracking software compromises user privacy. AMAL OS is 100% ad-free, does not sell data, and stores your personal reflections securely.',
    },
    {
      q: 'Can people outside India use this globally?',
      qUrdu: 'کیا اسے ہندوستان کے باہر دنیا بھر میں استعمال کیا جا سکتا ہے؟',
      a: 'Yes, seamlessly. AMAL OS includes an integrated directory of 150+ major global cities across the Middle East, Europe, North America, Africa, Southeast Asia, and Australasia, along with support for international calculation methods (Umm al-Qura, MWL, ISNA, Karachi, Egyptian Authority) and custom GPS coordinates.',
    },
  ];

  return (
    <div style={{ backgroundColor: '#FAF9F6', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Head>
        <title>About AMAL OS — Authentic Islamic Methodology & Scholarly Architecture</title>
        <meta
          name="description"
          content="Learn about AMAL OS: The sovereign, ad-free Islamic operating system grounded in Sawad al-A'zam orthodoxy across the 4 Sunni Madhhabs."
        />
      </Head>

      <Navigation />

      {/* Hero Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #0F291E 0%, #1B4332 60%, #2D6A4F 100%)',
        color: '#FFFFFF',
        padding: '60px 24px 50px',
        textAlign: 'center',
        borderBottom: '4px solid #D4AF37',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{
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
          }}>
            <span>🕌</span> تعارف و منہج · ABOUT & METHODOLOGY
          </div>

          <h1 style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 900,
            lineHeight: 1.2,
            marginBottom: 16,
            letterSpacing: -0.5,
          }}>
            From Niyyah to Amal.
          </h1>

          <p style={{
            fontSize: 'clamp(15px, 2vw, 18px)',
            color: '#D1FAE5',
            lineHeight: 1.6,
            maxWidth: 720,
            margin: '0 auto 28px',
          }}>
            A sovereign, private, and evidence-grounded Muslim Life Operating System—designed to bring calm, intentional worship into daily modern life without commercial ads, sectarian bias, or AI hallucinations.
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 16,
            flexWrap: 'wrap',
          }}>
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

      {/* Main Content Area */}
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 60px', width: '100%' }}>
        {/* Five Core Pillars */}
        <section style={{ marginBottom: 56 }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1B4332' }}>
              The Five Sovereign Pillars of AMAL OS
            </h2>
            <p style={{ fontSize: 14, color: '#6B7280', marginTop: 6 }}>
              Hamare 5 Buniyadi Usool — The principles behind every line of code we write
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 20,
          }}>
            {[
              {
                icon: '🌿',
                title: 'Sakinah Calm (Zero Gamification)',
                desc: 'We categorically reject "Taqwa Points", spiritual leaderboards, and panic-inducing guilt streaks. Faith is for Allah (Ikhlas), not algorithm dopamine. AMAL OS fosters peaceful, longitudinal habit formation rooted in Prophetic ease.',
              },
              {
                icon: '🛡️',
                title: '100% Zero-Tracking & Private Vault',
                desc: 'No commercial ads, no selling location data to brokers, and no invasive behavioral trackers. Your personal evening reflections and repentance remain isolated even from family sync via our Domestic Privacy Vault.',
              },
              {
                icon: '⚖️',
                title: 'Fatwa Firewall & Scholar Oversight (اہلِ علم کی نگرانی)',
                desc: 'شریعت کے حتمی فیصلے اور فتاویٰ صرف زندہ و مستند مفتیانِ کرام کا منصب ہیں۔ امل میں کسی خود ساختہ رائے کی قطعی ممانعت ہے؛ تمام فقہی مباحث صرف مستند کلاسیکی کتب سے پیش کیے جاتے ہیں اور پیچیدہ سوالات باقاعدہ اہل علم کے سپرد کیے جاتے ہیں۔',
              },
              {
                icon: '🕌',
                title: 'Ahl al-Sunnah & Four-Madhhab Parity',
                desc: 'Universal fidelity to the Sawad al-A\'zam. We honor Imam Abu Hanifa, Imam Malik, Imam al-Shafi\'i, and Imam Ahmad ibn Hanbal equally, providing full Madhhab toggles for Asr times, Zakat, and comparative Fiqh.',
              },
              {
                icon: '🧭',
                title: 'On-Device Deterministic Math',
                desc: 'Prayer times, lunar Hijri dates, and Kaaba Qibla bearings are computed mathematically on your local device. The app works 100% offline and will never stop functioning due to third-party server outages.',
              },
              {
                icon: '📚',
                title: 'Verified 106-Book Canonical Corpus',
                desc: 'Every quote, Hadith grading, and Fiqh ruling is cryptographically anchored in primary classical texts (*Al-Hidayah*, *Al-Umm*, *Al-Risalah*, *Al-Mughni*, *Bahar-e-Shariat*, *Riyadh al-Salihin*).',
              },
            ].map((pillar, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 12,
                  padding: 24,
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 12 }}>{pillar.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1B4332', marginBottom: 8 }}>
                  {pillar.title}
                </h3>
                <p style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section style={{ marginBottom: 56 }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1B4332' }}>
              Frequently Asked Questions (FAQ)
            </h2>
            <p style={{ fontSize: 14, color: '#6B7280', marginTop: 4 }}>
              Aksar Puche Jane Wale Sawalat — Clear answers to common questions
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 860, margin: '0 auto' }}>
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 10,
                    border: '1px solid #E5E7EB',
                    overflow: 'hidden',
                  }}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontWeight: 700,
                      fontSize: 15,
                      color: isOpen ? '#166534' : '#111827',
                    }}
                  >
                    <span>{faq.q}</span>
                    <span style={{ fontSize: 18, color: '#9CA3AF', marginLeft: 12 }}>
                      {isOpen ? '▲' : '▼'}
                    </span>
                  </button>

                  {isOpen && (
                    <div style={{ padding: '0 20px 18px', borderTop: '1px solid #F3F4F6' }}>
                      <p style={{ fontSize: 12, fontWeight: 700, color: '#047857', marginBottom: 6, marginTop: 10 }}>
                        {faq.qUrdu}
                      </p>
                      <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.6, margin: 0 }}>
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Contact & Scholarly Review Banner */}
        <section style={{
          backgroundColor: '#E8F5E9',
          borderRadius: 14,
          padding: '36px 28px',
          border: '1px solid #A7F3D0',
          textAlign: 'center',
          maxWidth: 860,
          margin: '0 auto',
        }}>
          <span style={{ fontSize: 36 }}>📬</span>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: '#1B4332', marginTop: 10, marginBottom: 8 }}>
            Scholarly Feedback & Community Contact
          </h3>
          <p style={{ fontSize: 14, color: '#166534', maxWidth: 640, margin: '0 auto 20px', lineHeight: 1.6 }}>
            Are you an Islamic scholar (Alim / Mufti), researcher, or seeker with feedback, corpus corrections, or institutional inquiries? We welcome scholarly review with deep gratitude.
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
      </main>
    </div>
  );
}
