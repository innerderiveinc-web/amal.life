import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer style={{
      backgroundColor: '#0A1E16',
      color: '#E5E7EB',
      marginTop: 'auto',
      borderTop: '3px solid #10B981',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      {/* Top Theological Trust & Deeni Heritage Banner */}
      <div style={{
        backgroundColor: '#061710',
        padding: '22px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ fontSize: 32 }}>🕌</span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: '#A7F3D0',
                  letterSpacing: 0.5,
                  fontFamily: 'var(--font-urdu), serif',
                }}>
                  اہلسنت والجماعت (السواد الأعظم) · AHL AL-SUNNAH HERITAGE
                </span>
                <span style={{
                  fontSize: 10,
                  backgroundColor: 'rgba(16, 185, 129, 0.2)',
                  color: '#34D399',
                  padding: '3px 10px',
                  borderRadius: 12,
                  fontWeight: 800,
                  letterSpacing: 0.5,
                  textTransform: 'uppercase',
                  border: '1px solid rgba(52, 211, 153, 0.3)',
                }}>
                  مستند شرعی منہج · VERIFIED CANON
                </span>
              </div>
              <p style={{ margin: '4px 0 0', fontSize: 13, color: '#9CA3AF', lineHeight: 1.5 }}>
                100% مستند سنی عقائد و معمولات · 106 Classical Sunni Masterworks across Hanafi, Shafi'i, Maliki & Hanbali heritage
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 12,
              fontWeight: 700,
              color: '#34D399',
              backgroundColor: 'rgba(6, 78, 59, 0.45)',
              padding: '8px 16px',
              borderRadius: 20,
              border: '1px solid rgba(52, 211, 153, 0.3)',
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block', boxShadow: '0 0 8px #10B981' }}></span>
              <span>وقف لوجہ اللہ تعالی · Sadaqah Jariyah Lil-Ummah</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main 4-Column Navigation Sitemap */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '44px 24px 32px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 36,
          marginBottom: 36,
        }}>
          {/* Column 1: Ibadat & Daily Practice */}
          <div>
            <h4 style={{
              fontSize: 14,
              fontWeight: 800,
              color: '#6EE7B7',
              letterSpacing: 0.5,
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <span>🕋</span>
              <span>عبادات و کلامِ پاک (Worship & Quran)</span>
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li>
                <Link href="/quran" style={{ color: '#F1F5F9', textDecoration: 'none', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: '#10B981' }}>✦</span>
                  <span>قرآنِ کریم، تلاوت و تفسیر (Al-Quran)</span>
                </Link>
              </li>
              <li>
                <Link href="/wisdom" style={{ color: '#FDE68A', textDecoration: 'none', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: '#F59E0B' }}>★</span>
                  <span>قرآنی حکمت کارڈز (Quran Wisdom Cards)</span>
                </Link>
              </li>
              <li>
                <Link href="/prayer" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  اوقاتِ نماز و قبلہ نما (Auqat-e-Namaz)
                </Link>
              </li>
              <li>
                <Link href="/tasbih" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  مسنون تسبیح و اوراد (Digital Masnoon Tasbih)
                </Link>
              </li>
              <li>
                <Link href="/calendar" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  اسلامی تقویم و سنت روزے (Hijri Calendar)
                </Link>
              </li>
              <li>
                <Link href="/tajweed" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  تجوید و مخارج صوتی مشق (Tajweed Audio)
                </Link>
              </li>
              <li>
                <Link href="/hajj" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  حج و عمرہ رہنمائی (Hajj & Umrah Guide)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Ilm & Sirah */}
          <div>
            <h4 style={{
              fontSize: 14,
              fontWeight: 800,
              color: '#6EE7B7',
              letterSpacing: 0.5,
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <span>📚</span>
              <span>علم و سیرتِ طیبہ ﷺ (Ilm & Sirah)</span>
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li>
                <Link href="/sirah" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  سیرت النبی ﷺ و شمائل (Living Sirah)
                </Link>
              </li>
              <li>
                <Link href="/library" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  106 معتمد کتبِ اہل سنت (Canonical Library)
                </Link>
              </li>
              <li>
                <Link href="/audio" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  تلاوتِ قرآن مجید (4 Master Qurra)
                </Link>
              </li>
              <li>
                <Link href="/ask" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  دینی سوال و مستند حوالہ جات (Ask AMAL)
                </Link>
              </li>
              <li>
                <Link href="/vault" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  علمی ذخیرہ و خطبات کے نوٹس (Knowledge Vault)
                </Link>
              </li>
              <li>
                <Link href="/journeys" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  دینی معمولات و سلوک (Spiritual Journeys)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Fiqh & Family OS */}
          <div>
            <h4 style={{
              fontSize: 14,
              fontWeight: 800,
              color: '#6EE7B7',
              letterSpacing: 0.5,
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <span>⚖️</span>
              <span>فقہی احکام و خاندانی نظام (Fiqh & Family)</span>
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li>
                <Link href="/calculator" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  زکوٰۃ و نصاب کیلکولیٹر (Zakat Calculator)
                </Link>
              </li>
              <li>
                <Link href="/calculator" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  میراثِ شرعیہ قرآنی حصے (Miras Shares)
                </Link>
              </li>
              <li>
                <Link href="/decision-room" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  مفتی پیکٹ و فقہی رہنمائی (Decision Room)
                </Link>
              </li>
              <li>
                <Link href="/family" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  خاندانی دینی نظام (Family Deen OS)
                </Link>
              </li>
              <li>
                <Link href="/reflections" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  شام کا محاسبہ و نیت (Evening Muhasabah)
                </Link>
              </li>
              <li>
                <Link href="/goals" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  دینی مقاصد و ارادے (Deen Intentions)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Sovereign Trust, Policy & Legal */}
          <div>
            <h4 style={{
              fontSize: 14,
              fontWeight: 800,
              color: '#6EE7B7',
              letterSpacing: 0.5,
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <span>🛡️</span>
              <span>پالیسی، شرعی قواعد و امانت (Trust & Legal)</span>
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li>
                <Link href="/terms" style={{ color: '#A7F3D0', textDecoration: 'none', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>📜</span>
                  <span>Terms &amp; Conditions (شرائط و ضوابط)</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy" style={{ color: '#A7F3D0', textDecoration: 'none', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>🔒</span>
                  <span>Privacy Policy &amp; Zero-Ad (پرائیویسی پالیسی)</span>
                </Link>
              </li>
              <li>
                <Link href="/copyright" style={{ color: '#A7F3D0', textDecoration: 'none', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>⚖️</span>
                  <span>Copyright &amp; Waqf (کاپی رائٹ و وقف)</span>
                </Link>
              </li>
              <li>
                <Link href="/about" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  تعارف و شرعی منہج (About AMAL OS)
                </Link>
              </li>
              <li>
                <Link href="/contact" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  رابطہ و شرعی استفسار (Contact &amp; Support)
                </Link>
              </li>
              <li>
                <Link href="/settings" style={{ color: '#FDE68A', textDecoration: 'none', fontSize: 13, fontWeight: 700 }}>
                  ⚙️ مرکزی ترتیبات (System Settings)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Shar'i Non-Fatwa & Epistemic Disclaimer */}
        <div style={{
          backgroundColor: 'rgba(0,0,0,0.35)',
          padding: '16px 22px',
          borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.08)',
          fontSize: 12,
          color: '#9CA3AF',
          lineHeight: 1.7,
          marginBottom: 30,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, color: '#FDE68A', fontWeight: 800, fontSize: 13 }}>
            <span>⚠️</span>
            <span>شرعی تنبیہ و احتیاط (Shar'i Non-Fatwa Advisory):</span>
          </div>
          <div>
            عمل او ایس (AMAL OS) ایک تعلیمی، تدبری اور روزمرہ حیاتِ مسلم کا رہنمائی نظام ہے۔ یہ معتمد دار الافتاء اور جید مفتیانِ کرام کا متبادل نہیں ہے اور نہ ہی خودکار فتوے جاری کرتا ہے۔ طلاق، نکاح کے نزاعات، قسم و کفارہ اور پیچیدہ وراثت جیسے معاملات میں اپنے قریبی مستند مفتی صاحب یا دار الافتاء سے رجوع فرمائیں۔
          </div>
          <div style={{ marginTop: 4, fontSize: 11, color: '#6B7280' }}>
            AMAL OS is an educational habit and lifestyle intelligence platform adhering to the Dual Jurist Protocol. It does NOT issue autonomous fatwas. Legal, marital disputes, and inheritance conflicts must be submitted to qualified human scholars.
          </div>
        </div>

        {/* Bottom Bar: Copyright, Waqf & Legal Quick-links */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: 22,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
          fontSize: 12,
          color: '#9CA3AF',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 800, color: '#FFFFFF' }}>© 2026 AMAL OS Project.</span>
              <span style={{ color: '#6B7280' }}>تمام حقوق شرعی اغراض کے لیے محفوظ ہیں۔</span>
              <span style={{ color: '#10B981', fontWeight: 700 }}>· وقف برائے خدمتِ امتِ محمدیہ ﷺ</span>
            </div>
            <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>
              Sadaqah Jariyah Lil-Ummah · Zero Commercial Exploitation · 100% Ad-Free Sovereign Deen OS
            </div>
          </div>

          {/* Quick Legal Pill Links */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/terms"
              style={{
                color: '#E2E8F0',
                textDecoration: 'none',
                backgroundColor: 'rgba(255,255,255,0.06)',
                padding: '6px 14px',
                borderRadius: 20,
                border: '1px solid rgba(255,255,255,0.12)',
                fontSize: 12,
                fontWeight: 600,
                transition: 'all 0.2s',
              }}
            >
              Terms &amp; Conditions (شرائط)
            </Link>

            <Link
              href="/privacy"
              style={{
                color: '#34D399',
                textDecoration: 'none',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                padding: '6px 14px',
                borderRadius: 20,
                border: '1px solid rgba(52, 211, 153, 0.3)',
                fontSize: 12,
                fontWeight: 700,
                transition: 'all 0.2s',
              }}
            >
              Privacy Policy (پرائیویسی)
            </Link>

            <Link
              href="/copyright"
              style={{
                color: '#E2E8F0',
                textDecoration: 'none',
                backgroundColor: 'rgba(255,255,255,0.06)',
                padding: '6px 14px',
                borderRadius: 20,
                border: '1px solid rgba(255,255,255,0.12)',
                fontSize: 12,
                fontWeight: 600,
                transition: 'all 0.2s',
              }}
            >
              Copyright &amp; Waqf (وقف)
            </Link>

            <Link
              href="/contact"
              style={{
                color: '#E2E8F0',
                textDecoration: 'none',
                backgroundColor: 'rgba(255,255,255,0.06)',
                padding: '6px 14px',
                borderRadius: 20,
                border: '1px solid rgba(255,255,255,0.12)',
                fontSize: 12,
                fontWeight: 600,
                transition: 'all 0.2s',
              }}
            >
              Contact &amp; Support (رابطہ)
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
