import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';

export interface FooterNavigationGridProps {
  isUrdu?: boolean;
}

export const FooterNavigationGrid: React.FC<FooterNavigationGridProps> = () => {
  const { t } = useLanguage();

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
          <span>{t('Worship & Al-Quran', 'عبادات و کلامِ پاک', 'العبادات والقرآن الكريم', 'Ibadat o Kalam-e-Paak')}</span>
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
              <span>{t('Al-Quran Reader & Audio', 'قرآنِ کریم (تلاوت و ترجمہ)', 'القرآن الكريم (تلاوة وترجمة)', 'Quran-e-Kareem (Tilawat o Tarjuma)')}</span>
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
              <span>{t('Sacred Knowledge Cards', 'قرآنی حکمت کارڈز', 'بطاقات الحكمة القرآنية', 'Qurani Hikmat Cards')}</span>
            </Link>
          </li>
          <li>
            <Link href="/prayer" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
              {t('Prayer Times & Qibla Compass', 'اوقاتِ نماز و قبلہ نما', 'مواقيت الصلاة وبوصلة القبلة', 'Auqat-e-Namaz o Qibla Numa')}
            </Link>
          </li>
          <li>
            <Link href="/tasbih" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
              {t('Digital Masnoon Tasbih', 'مسنون تسبیح و اذکار', 'المسبحة المسنونة والأذكار', 'Masnoon Tasbih o Azkaar')}
            </Link>
          </li>
          <li>
            <Link href="/calendar" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
              {t('Hijri Calendar & Sunnah Fasting', 'ہجری کیلنڈر و مسنون روزے', 'التقويم الهجري وصيام السنة', 'Hijri Calendar o Masnoon Rozay')}
            </Link>
          </li>
          <li>
            <Link href="/tajweed" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
              {t('Tajweed & Audio Pronunciation', 'تجوید و مخارج صوتی مشق', 'التجويد ومخارج الحروف الصوتية', 'Tajweed o Makharij')}
            </Link>
          </li>
          <li>
            <Link href="/hajj" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
              {t('Hajj & Umrah Pilgrimage Guide', 'حج و عمرہ رہنمائی', 'دليل مناسك الحج والعمرة', 'Hajj o Umrah Rehnumai')}
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
          <span>{t('Knowledge & Prophetic Sirah', 'علم و سیرتِ مبارکہ ﷺ', 'العلم والسيرة النبوية الشريفة ﷺ', 'Ilm o Seerat-e-Mubarakah ﷺ')}</span>
        </h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <li>
            <Link href="/sirah" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
              {t('Living Sirah & Shama\'il', 'سیرت النبی ﷺ و شمائل', 'السيرة النبوية والشمائل المحمدية', 'Seerat-un-Nabi ﷺ wa Shamail')}
            </Link>
          </li>
          <li>
            <Link href="/library" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
              {t('106-Book Canonical Library', '106 معتمد کتبِ اہل سنت', 'المكتبة المعتمدة (١٠٦ كتب)', '106 Mu\'tamad Kutub-e-Ahl-e-Sunnat')}
            </Link>
          </li>
          <li>
            <Link href="/audio" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
              {t('Quran Audio (4 Master Qurra)', 'تلاوتِ قرآن (۴ معتمد قراء)', 'تلاوات القرآن (٤ قراء معتمدين)', 'Tilawat-e-Quran (4 Mu\'tamad Qurra)')}
            </Link>
          </li>
          <li>
            <Link href="/ask" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
              {t('Ask AMAL (Evidence Inquiries)', 'دینی سوال و مستند حوالہ جات', 'اسأل أمل (استفسارات موثقة)', 'Ask AMAL (Dini Sawal o Hawala Jaat)')}
            </Link>
          </li>
          <li>
            <Link href="/vault" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
              {t('Knowledge Vault & Study Notes', 'علمی ذخیرہ و خطبات کے نوٹس', 'خزانة المعرفة وملاحظات الخطب', 'Ilmi Zakheera o Khutbat Notes')}
            </Link>
          </li>
          <li>
            <Link href="/journeys" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
              {t('40-Day Spiritual Journeys', '40 روزہ دینی سفر', 'الرحلات الإيمانية الأربعينية', '40 Roza Dini Safar')}
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
          <span>{t('Fiqh Guidance & Family OS', 'فقہی احکام و خاندانی نظام', 'الأحكام الفقهية والنظام الأسري', 'Fiqhi Ahkam o Khandani Nizam')}</span>
        </h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <li>
            <Link href="/calculator" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
              {t('Zakat & Nisab Calculator', 'زکوٰۃ و نصاب کیلکولیٹر', 'حاسبة الزكاة والنصاب', 'Zakat o Nisab Calculator')}
            </Link>
          </li>
          <li>
            <Link href="/calculator" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
              {t('Miras Quranic Inheritance Shares', 'میراثِ شرعیہ و فرائض کی تقسیم', 'الميراث الشرعي وحساب الفرائض', 'Miras Shar\'iyah o Faraiz')}
            </Link>
          </li>
          <li>
            <Link href="/decision-room" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
              {t('Decision Room & Scholar Packet', 'ڈیسیژن روم و مفتی پیکٹ', 'غرفة القرار وحزمة المستفتي', 'Decision Room o Mufti Packet')}
            </Link>
          </li>
          <li>
            <Link href="/family" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
              {t('Family Deen Hub & Supervisions', 'خاندانی دینی نظام و حفاظت', 'حماية ورقابة الأسرة المسلمة', 'Khandani Dini Nizam o Hifazat')}
            </Link>
          </li>
          <li>
            <Link href="/reflections" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
              {t('Evening Muhasabah & Reflections', 'شام کا محاسبہ و نجی ڈائری', 'محاسبة المساء والخواطر الخاصة', 'Shaam Ka Muhasabah o Diary')}
            </Link>
          </li>
          <li>
            <Link href="/goals" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
              {t('Spiritual Habits & Goals Tracker', 'دینی مقاصد و عادات', 'متتبع الأهداف والعادات الإيمانية', 'Dini Maqasid o Aadat Tracker')}
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
          <span>{t('Sovereign Trust & Governance', 'پالیسی، شرعی قواعد و امانت', 'السياسة والأمانة الشرعية والحوكمة', 'Policy, Shar\'i Qawaid o Amanat')}</span>
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
              <span>{t('Terms of Service & Adab', 'شرائط و شرعی آداب', 'شروط الاستخدام والآداب الشرعية', 'Shara\'it o Shar\'i Adaab')}</span>
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
              <span>{t('Privacy Policy & Zero-Ad Guarantee', 'پرائیویسی و صفر ٹریکنگ امانت', 'سياسة الخصوصية وضمان عدم التتبع', 'Privacy Policy o Zero Tracking')}</span>
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
              <span>{t('Copyright, Waqf & Attribution', 'کاپی رائٹ، وقف و اوپن سورس', 'حقوق التأليف والوقف والمصادر', 'Copyright, Waqf o Open Source')}</span>
            </Link>
          </li>
          <li>
            <Link href="/about" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
              {t('About AMAL OS & Epistemic Creed', 'تعارف و شرعی منہج', 'عن نظام أمل والمنهج المعرفي', 'Ta\'aruf o Shar\'i Manhaj')}
            </Link>
          </li>
          <li>
            <Link href="/contact" style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: 13 }}>
              {t('Contact & Scholarly Inquiries', 'رابطہ و شرعی استفسار', 'الاتصال والاستفسار العلمي الشرعي', 'Rabtah o Shar\'i Istifsaar')}
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
              ⚙️ {t('System Settings & Control', 'مرکزی ترتیبات', 'إعدادات النظام العامة', 'Markazi Tarteebat')}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
