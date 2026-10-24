import React from 'react';
import Link from 'next/link';

interface AboutSovereignPillarsProps {
  t: (en: string, ur: string) => string;
}

export const AboutSovereignPillars: React.FC<AboutSovereignPillarsProps> = ({ t }) => {
  return (
    <>
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

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 20,
          }}
        >
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
              title: t('Fatwa Firewall & Scholar Oversight', 'اہلِ علم کی نگرانی اور فتویٰ فائر وال'),
              desc: t(
                'Issuing legal verdicts (Fatwas) belongs exclusively to living, qualified Islamic jurists (Muftis). AMAL OS strictly prohibits machine-generated rulings; all fiqh discussions cite canonical classical texts, and complex inquiries are routed directly to living scholars.',
                'شریعت کے حتمی فیصلے اور فتاویٰ صرف زندہ و مستند مفتیانِ کرام کا منصب ہیں۔ امل میں کسی خود ساختہ رائے کی قطعی ممانعت ہے؛ تمام فقہی مباحث صرف مستند کلاسیکی کتب سے پیش کیے جاتے ہیں اور پیچیدہ سوالات باقاعدہ اہل علم کے سپرد کیے جاتے ہیں۔'
              ),
            },
            {
              icon: '🕌',
              title: 'Ahl al-Sunnah & Four-Madhhab Parity',
              desc: "Universal fidelity to the Sawad al-A'zam. We honor Imam Abu Hanifa, Imam Malik, Imam al-Shafi'i, and Imam Ahmad ibn Hanbal equally, providing full Madhhab toggles for Asr times, Zakat, and comparative Fiqh.",
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

      {/* 4 CANONICAL PILLARS: HOW DIGITAL TECHNOLOGY SERVES CLASSICAL SCHOLARSHIP */}
      <section style={{ marginBottom: 56 }}>
        <div
          style={{
            backgroundColor: '#0F291E',
            borderRadius: 16,
            padding: '36px 32px',
            color: '#FFFFFF',
            border: '2px solid #D4AF37',
            boxShadow: '0 8px 24px rgba(15, 41, 30, 0.15)',
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 36px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                backgroundColor: 'rgba(212, 175, 55, 0.15)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                padding: '5px 14px',
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 800,
                color: '#FDE68A',
                marginBottom: 14,
                letterSpacing: 0.8,
              }}
            >
              <span>🛡️</span> ZERO FATWA FABRICATIONS · STRICT SCHOLARLY BOUNDARIES
            </div>
            <h2
              style={{
                fontSize: 'clamp(22px, 3vw, 28px)',
                fontWeight: 800,
                margin: '0 0 10px',
                color: '#FFFFFF',
              }}
            >
              4 Canonical Pillars: How Digital Research Serves Classical Scholarship
            </h2>
            <p style={{ fontSize: 15, color: '#A7F3D0', margin: 0, fontWeight: 700 }}>
              روایتی علومِ دینیہ کی خدمت میں ڈیجیٹل انڈیکس کے ۴ بنیادی ستون (صرف خادم، کبھی مفتی نہیں)
            </p>
            <p style={{ fontSize: 13, color: '#D1D5DB', marginTop: 12, lineHeight: 1.6 }}>
              Islam requires rigorous fidelity to truth. In AMAL OS, digital technology is{' '}
              <strong>never a Mufti, Lawgiver, or Preacher</strong>. It is strictly a specialized digital clerk (Kaatib) and indexer that upholds canonical Ahl al-Sunnah literature without altering a single letter of sacred text.
            </p>
          </div>

          {/* The 4 Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 20,
              marginBottom: 30,
            }}
          >
            {/* Card 1 */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 12,
                border: '1px solid rgba(255, 255, 255, 0.12)',
                padding: 22,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      backgroundColor: 'rgba(52, 211, 153, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 20,
                      border: '1px solid rgba(52, 211, 153, 0.3)',
                    }}
                  >
                    💬
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 800,
                        color: '#34D399',
                        letterSpacing: 0.5,
                        textTransform: 'uppercase',
                      }}
                    >
                      {t('Pillar 1 · Search & Guidance', 'بنیاد ۱ · تلاش و رہنمائی')}
                    </span>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                      Semantic Evidence Retrieval
                    </h3>
                  </div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#86EFAC', marginBottom: 8 }}>
                  {t(
                    '("Ask AMAL" — Emotional & Practical Retrieval)',
                    '("Ask AMAL" — احساس و ضرورت کی بنیاد پر قرآنی نصوص کی تلاش)'
                  )}
                </div>
                <p style={{ fontSize: 13, color: '#E5E7EB', lineHeight: 1.6, margin: 0 }}>
                  When a user writes: <em>&ldquo;I feel overwhelmed by workplace pressure and cannot focus during prayer,&rdquo;</em> the semantic search engine identifies the exact Ayahs on Sakinah (peace) and Sabr (patience) directly from the verified classical corpus—<strong>without altering a single word or letter of Islamic text</strong>.
                </p>
              </div>
              <div
                style={{
                  marginTop: 16,
                  paddingTop: 12,
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: 11,
                  color: '#9CA3AF',
                }}
              >
                <span>Shar&apos;i Boundary: 100% Verbatim</span>
                <Link href="/ask" style={{ color: '#6EE7B7', textDecoration: 'none', fontWeight: 700 }}>
                  Try Ask AMAL ➔
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 12,
                border: '1px solid rgba(255, 255, 255, 0.12)',
                padding: 22,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      backgroundColor: 'rgba(52, 211, 153, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 20,
                      border: '1px solid rgba(52, 211, 153, 0.3)',
                    }}
                  >
                    🎯
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 800,
                        color: '#34D399',
                        letterSpacing: 0.5,
                        textTransform: 'uppercase',
                      }}
                    >
                      {t('Pillar 2 · Niyyah Engine', 'بنیاد ۲ · نیت انجن')}
                    </span>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                      Intention-to-Action Translation
                    </h3>
                  </div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#86EFAC', marginBottom: 8 }}>
                  {t(
                    '(Transforming broad goals into structured Sunnah habits)',
                    '(عام نیتوں کو باقاعدہ مسنون اعمال میں تبدیل کرنا)'
                  )}
                </div>
                <p style={{ fontSize: 13, color: '#E5E7EB', lineHeight: 1.6, margin: 0 }}>
                  Digital routines break down sweeping aspirations (such as <em>&ldquo;I want to establish Tahajjud&rdquo;</em>) into progressive, micro-habit roadmaps rooted in the Sunnah (e.g., praying 2 Rakahs Witr before sleep, sleeping on right side with Taharah, setting a gentle alarm).
                </p>
              </div>
              <div
                style={{
                  marginTop: 16,
                  paddingTop: 12,
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: 11,
                  color: '#9CA3AF',
                }}
              >
                <span>Shar&apos;i Boundary: Sunnah Habits Only</span>
                <Link href="/journeys" style={{ color: '#6EE7B7', textDecoration: 'none', fontWeight: 700 }}>
                  View Journeys ➔
                </Link>
              </div>
            </div>

            {/* Card 3 */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 12,
                border: '1px solid rgba(255, 255, 255, 0.12)',
                padding: 22,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      backgroundColor: 'rgba(52, 211, 153, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 20,
                      border: '1px solid rgba(52, 211, 153, 0.3)',
                    }}
                  >
                    🔗
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 800,
                        color: '#34D399',
                        letterSpacing: 0.5,
                        textTransform: 'uppercase',
                      }}
                    >
                      {t('Pillar 3 · Classical Heritage', 'بنیاد ۳ · تراث و علمی اسناد')}
                    </span>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                      Automatic Cross-Referencing
                    </h3>
                  </div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#86EFAC', marginBottom: 8 }}>
                  {t(
                    '(Linking Quran with Kanz-ul-Iman, Khaza\'in & Bahar-e-Shariat)',
                    '(قرآن کریم کو کنز الایمان، خزائن العرفان اور بہارِ شریعت سے جوڑنا)'
                  )}
                </div>
                <p style={{ fontSize: 13, color: '#E5E7EB', lineHeight: 1.6, margin: 0 }}>
                  When reading a verse in the Holy Quran, the cross-referencing index automatically surfaces corresponding commentary from <em>Khaza'in-ul-Irfan</em>, legal applications from <em>Bahar-e-Shariat</em>, and relevant Hadith from <em>Riyadh al-Salihin</em>, providing complete context in seconds.
                </p>
              </div>
              <div
                style={{
                  marginTop: 16,
                  paddingTop: 12,
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: 11,
                  color: '#9CA3AF',
                }}
              >
                <span>Shar&apos;i Boundary: Unaltered Primary Sources</span>
                <Link href="/library" style={{ color: '#6EE7B7', textDecoration: 'none', fontWeight: 700 }}>
                  Explore 106 Works ➔
                </Link>
              </div>
            </div>

            {/* Card 4 */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 12,
                border: '1px solid rgba(255, 255, 255, 0.12)',
                padding: 22,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      backgroundColor: 'rgba(52, 211, 153, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 20,
                      border: '1px solid rgba(52, 211, 153, 0.3)',
                    }}
                  >
                    ⚖️
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 800,
                        color: '#34D399',
                        letterSpacing: 0.5,
                        textTransform: 'uppercase',
                      }}
                    >
                      {t('Pillar 4 · Mufti Secretariat', 'بنیاد ۴ · فتویٰ سیکریٹریٹ')}
                    </span>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                      Mufti Query Dossier Preparation
                    </h3>
                  </div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#86EFAC', marginBottom: 8 }}>
                  {t(
                    '(Organized Dossier Structuring for Human Muftis)',
                    '(مفتیانِ کرام کے لیے سوال و حالات کی باقاعدہ فائل بندی)'
                  )}
                </div>
                <p style={{ fontSize: 13, color: '#E5E7EB', lineHeight: 1.6, margin: 0 }}>
                  When a user submits a complex question, the system structures the background details (context, timeline, parties involved) into an organized case brief for a qualified human Mufti to review, speeding up authentic scholarly response times without ever attempting to issue the verdict itself.
                </p>
              </div>
              <div
                style={{
                  marginTop: 16,
                  paddingTop: 12,
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: 11,
                  color: '#9CA3AF',
                }}
              >
                <span>Shar&apos;i Boundary: Strict Human Mufti Ifta</span>
                <Link href="/decision-room" style={{ color: '#6EE7B7', textDecoration: 'none', fontWeight: 700 }}>
                  Deen Decision Room ➔
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Comparative Table Banner */}
          <div
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
              borderRadius: 12,
              padding: '16px 20px',
              border: '1px solid rgba(212, 175, 55, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 12,
              fontSize: 12,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>📜</span>
              <span style={{ color: '#F9FAFB' }}>
                <strong>The Sovereign AMAL OS Guarantee:</strong> Machine learning is our clerk; classical consensus (Ijma) is our anchor; human scholars are our arbiters.
              </span>
            </div>
            <span style={{ color: '#D4AF37', fontWeight: 800 }}>
              Ad-Free · Hallucination-Free · Ahl al-Sunnah
            </span>
          </div>
        </div>
      </section>
    </>
  );
};
