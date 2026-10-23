import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

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
      <div
        style={{
          backgroundColor: '#061710',
          padding: '22px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ fontSize: 32 }}>🕌</span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 800,
                    color: '#A7F3D0',
                    letterSpacing: 0.5,
                  }}
                >
                  {isUrdu
                    ? 'اہلسنت والجماعت (السواد الأعظم) · مستند شرعی ورثہ'
                    : 'AHL AL-SUNNAH HERITAGE · AL-SAWAD AL-A\'ZAM'}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    color: '#34D399',
                    padding: '3px 10px',
                    borderRadius: 12,
                    fontWeight: 800,
                    letterSpacing: 0.5,
                    textTransform: 'uppercase',
                    border: '1px solid rgba(52, 211, 153, 0.3)',
                  }}
                >
                  {isUrdu ? 'مستند شرعی منہج' : 'VERIFIED CANON'}
                </span>
              </div>
              <p style={{ margin: '4px 0 0', fontSize: 13, color: '#9CA3AF', lineHeight: 1.5 }}>
                {isUrdu
                  ? '100% مستند سنی عقائد و معمولات · فقہ حنفی، شافعی، مالکی و حنبلی کی 106 معتبر کتب کا تحقیقی پلیٹ فارم'
                  : '100% Authentic Sunni Orthodox Practice · 106 Classical Masterworks across Hanafi, Shafi\'i, Maliki & Hanbali Heritage'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <div
              style={{
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
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: '#10B981',
                  display: 'inline-block',
                  boxShadow: '0 0 8px #10B981',
                }}
              />
              <span>{isUrdu ? 'وقف لوجہ اللہ تعالیٰ · صدقہ جاریہ' : 'Sadaqah Jariyah Lil-Ummah · Sacred Public Trust'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main 4-Column Navigation Sitemap */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '44px 24px 32px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 36,
            marginBottom: 36,
          }}
        >
          {/* Column 1: Worship & Quran */}
          <div>
            <h4
              style={{
                fontSize: 14,
                fontWeight: 800,
                color: '#6EE7B7',
                letterSpacing: 0.5,
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span>🕋</span>
              <span>{isUrdu ? 'عبادات و کلامِ پاک' : 'Worship & Al-Quran'}</span>
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li>
                <Link
                  href="/quran"
                  style={{
                    color: '#F1F5F9',
                    textDecoration: 'none',
                    fontSize: 13,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <span style={{ color: '#10B981' }}>✦</span>
                  <span>{isUrdu ? 'قرآنِ کریم (تلاوت و ترجمہ)' : 'Al-Quran Reader & Audio'}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/wisdom"
                  style={{
                    color: '#FDE68A',
                    textDecoration: 'none',
                    fontSize: 13,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <span style={{ color: '#F59E0B' }}>★</span>
                  <span>{isUrdu ? 'قرآنی حکمت کارڈز' : 'Sacred Knowledge Cards'}</span>
                </Link>
              </li>
              <li>
                <Link href="/prayer" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  {isUrdu ? 'اوقاتِ نماز و قبلہ نما' : 'Prayer Times & Qibla Compass'}
                </Link>
              </li>
              <li>
                <Link href="/tasbih" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  {isUrdu ? 'مسنون تسبیح و اذکار' : 'Digital Masnoon Tasbih'}
                </Link>
              </li>
              <li>
                <Link href="/calendar" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  {isUrdu ? 'ہجری کیلنڈر و مسنون روزے' : 'Hijri Calendar & Sunnah Fasting'}
                </Link>
              </li>
              <li>
                <Link href="/tajweed" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  {isUrdu ? 'تجوید و مخارج صوتی مشق' : 'Tajweed & Audio Pronunciation'}
                </Link>
              </li>
              <li>
                <Link href="/hajj" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  {isUrdu ? 'حج و عمرہ رہنمائی' : 'Hajj & Umrah Pilgrimage Guide'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Ilm & Sirah */}
          <div>
            <h4
              style={{
                fontSize: 14,
                fontWeight: 800,
                color: '#6EE7B7',
                letterSpacing: 0.5,
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span>📚</span>
              <span>{isUrdu ? 'علم و سیرتِ مبارکہ ﷺ' : 'Knowledge & Prophetic Sirah'}</span>
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li>
                <Link href="/sirah" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  {isUrdu ? 'سیرت النبی ﷺ و شمائل' : 'Living Sirah & Shama\'il'}
                </Link>
              </li>
              <li>
                <Link href="/library" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  {isUrdu ? '106 معتمد کتبِ اہل سنت' : '106-Book Canonical Library'}
                </Link>
              </li>
              <li>
                <Link href="/audio" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  {isUrdu ? 'تلاوتِ قرآن (۴ معتمد قراء)' : 'Quran Audio (4 Master Qurra)'}
                </Link>
              </li>
              <li>
                <Link href="/ask" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  {isUrdu ? 'دینی سوال و مستند حوالہ جات' : 'Ask AMAL (Evidence Inquiries)'}
                </Link>
              </li>
              <li>
                <Link href="/vault" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  {isUrdu ? 'علمی ذخیرہ و خطبات کے نوٹس' : 'Knowledge Vault & Study Notes'}
                </Link>
              </li>
              <li>
                <Link href="/journeys" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  {isUrdu ? '40 روزہ دینی سفر' : '40-Day Spiritual Journeys'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Fiqh & Family OS */}
          <div>
            <h4
              style={{
                fontSize: 14,
                fontWeight: 800,
                color: '#6EE7B7',
                letterSpacing: 0.5,
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span>⚖️</span>
              <span>{isUrdu ? 'فقہی احکام و خاندانی نظام' : 'Fiqh Guidance & Family OS'}</span>
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li>
                <Link href="/calculator" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  {isUrdu ? 'زکوٰۃ و نصاب کیلکولیٹر' : 'Zakat & Nisab Calculator'}
                </Link>
              </li>
              <li>
                <Link href="/calculator" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  {isUrdu ? 'میراثِ شرعیہ و فرائض کی تقسیم' : 'Miras Quranic Inheritance Shares'}
                </Link>
              </li>
              <li>
                <Link href="/decision-room" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  {isUrdu ? 'ڈیسیژن روم و مفتی پیکٹ' : 'Decision Room & Scholar Packet'}
                </Link>
              </li>
              <li>
                <Link href="/family" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  {isUrdu ? 'خاندانی دینی نظام و حفاظت' : 'Family Deen Hub & Supervisions'}
                </Link>
              </li>
              <li>
                <Link href="/reflections" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  {isUrdu ? 'شام کا محاسبہ و نجی ڈائری' : 'Evening Muhasabah & Reflections'}
                </Link>
              </li>
              <li>
                <Link href="/goals" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  {isUrdu ? 'دینی مقاصد و عادات' : 'Spiritual Habits & Goals Tracker'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Sovereign Trust, Policy & Legal */}
          <div>
            <h4
              style={{
                fontSize: 14,
                fontWeight: 800,
                color: '#6EE7B7',
                letterSpacing: 0.5,
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span>🛡️</span>
              <span>{isUrdu ? 'پالیسی، شرعی قواعد و امانت' : 'Sovereign Trust & Governance'}</span>
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li>
                <Link
                  href="/terms"
                  style={{
                    color: '#A7F3D0',
                    textDecoration: 'none',
                    fontSize: 13,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <span>📜</span>
                  <span>{isUrdu ? 'شرائط و شرعی آداب' : 'Terms of Service & Adab'}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  style={{
                    color: '#A7F3D0',
                    textDecoration: 'none',
                    fontSize: 13,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <span>🔒</span>
                  <span>{isUrdu ? 'پرائیویسی و صفر ٹریکنگ امانت' : 'Privacy Policy & Zero-Ad Guarantee'}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/copyright"
                  style={{
                    color: '#A7F3D0',
                    textDecoration: 'none',
                    fontSize: 13,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <span>⚖️</span>
                  <span>{isUrdu ? 'کاپی رائٹ، وقف و اوپن سورس' : 'Copyright, Waqf & Attribution'}</span>
                </Link>
              </li>
              <li>
                <Link href="/about" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  {isUrdu ? 'تعارف و شرعی منہج' : 'About AMAL OS & Epistemic Creed'}
                </Link>
              </li>
              <li>
                <Link href="/contact" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
                  {isUrdu ? 'رابطہ و شرعی استفسار' : 'Contact & Scholarly Inquiries'}
                </Link>
              </li>
              <li>
                <Link
                  href="/settings"
                  style={{
                    color: '#FDE68A',
                    textDecoration: 'none',
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  ⚙️ {isUrdu ? 'مرکزی ترتیبات' : 'System Settings & Control'}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Shar'i Non-Fatwa & Epistemic Disclaimer */}
        <div
          style={{
            backgroundColor: 'rgba(0,0,0,0.35)',
            padding: '16px 22px',
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.08)',
            fontSize: 12,
            color: '#9CA3AF',
            lineHeight: 1.7,
            marginBottom: 30,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              marginBottom: 4,
              color: '#FDE68A',
              fontWeight: 800,
              fontSize: 13,
            }}
          >
            <span>⚠️</span>
            <span>{isUrdu ? 'شرعی تنبیہ و احتیاط:' : 'Shar\'i Non-Fatwa Advisory:'}</span>
          </div>
          {isUrdu ? (
            <div>
              عمل او ایس (AMAL OS) ایک تعلیمی، تدبری اور روزمرہ حیاتِ مسلم کا رہنمائی نظام ہے۔ یہ معتمد دار الافتاء اور جید مفتیانِ کرام کا متبادل نہیں ہے اور نہ ہی خودکار فتوے جاری کرتا ہے۔ طلاق، نکاح کے نزاعات، قسم و کفارہ اور پیچیدہ وراثت جیسے معاملات میں اپنے قریبی مستند مفتی صاحب یا دار الافتاء سے رجوع فرمائیں۔
            </div>
          ) : (
            <div>
              AMAL OS is an educational habit and lifestyle intelligence platform adhering strictly to traditional Sunni orthodoxy. It does <strong>NOT</strong> issue autonomous religious decrees (fatwas). Complex personal litigation, marriage disputes, oaths, and probate inheritance must be submitted to qualified, living human scholars and accredited Dar-ul-Ifta institutions.
            </div>
          )}
        </div>

        {/* Bottom Bar: Copyright, Waqf & Legal Quick-links */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: 22,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
            fontSize: 12,
            color: '#9CA3AF',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 800, color: '#FFFFFF' }}>© 2026 AMAL OS by Qsura India Pvt Ltd.</span>
              <span style={{ color: '#6B7280' }}>
                {isUrdu ? 'تمام حقوق شرعی اغراض کے لیے محفوظ ہیں۔' : 'All Rights Reserved.'}
              </span>
              <span style={{ color: '#10B981', fontWeight: 700 }}>
                · {isUrdu ? 'وقف برائے خدمتِ امتِ محمدیہ ﷺ' : 'Waqf Lil-Ummah'}
              </span>
            </div>
            <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>
              Crafted &amp; Stewarded by Qsura India Pvt Ltd · Sadaqah Jariyah Lil-Ummah · Zero Commercial Exploitation · 100% Ad-Free Sovereign Deen OS
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
              {isUrdu ? 'شرائط و ضوابط' : 'Terms & Conditions'}
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
              {isUrdu ? 'پرائیویسی پالیسی' : 'Privacy Policy'}
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
              {isUrdu ? 'کاپی رائٹ و وقف' : 'Copyright & Waqf'}
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
              {isUrdu ? 'رابطہ' : 'Contact & Support'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
