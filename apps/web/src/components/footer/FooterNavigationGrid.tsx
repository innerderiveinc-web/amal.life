import React from 'react';
import Link from 'next/link';

export interface FooterNavigationGridProps {
  isUrdu: boolean;
}

export const FooterNavigationGrid: React.FC<FooterNavigationGridProps> = ({ isUrdu }) => {
  return (
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
  );
};
