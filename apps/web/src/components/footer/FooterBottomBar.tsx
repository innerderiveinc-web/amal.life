import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';

export interface FooterBottomBarProps {
  isUrdu?: boolean;
}

export const FooterBottomBar: React.FC<FooterBottomBarProps> = () => {
  const { t } = useLanguage();

  return (
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
            {t(
              'All Rights Reserved.',
              'تمام حقوق شرعی اغراض کے لیے محفوظ ہیں۔',
              'جميع الحقوق محفوظة للأغراض الشرعية.',
              'Tamam huqooq shar\'i aghraz ke liye mehfooz hain.'
            )}
          </span>
          <span style={{ color: '#10B981', fontWeight: 700 }}>
            · {t(
              'Waqf Lil-Ummah',
              'وقف برائے خدمتِ امتِ محمدیہ ﷺ',
              'وقف لخدمة الأمة المحمدية ﷺ',
              'Waqf baraye khidmat-e-Ummat-e-Muhammadiyyah ﷺ'
            )}
          </span>
        </div>
        <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>
          Crafted &amp; Stewarded by Qsura India Pvt Ltd · Founder &amp; Chief Architect: Dr. Irfan Ashraf · Sadaqah Jariyah Lil-Ummah · 100% Ad-Free Sovereign Deen OS
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
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
          }}
        >
          {t('Terms & Conditions', 'شرائط و ضوابط', 'الشروط والأحكام', 'Sharait wa Zawabit')}
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
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.22)';
            e.currentTarget.style.borderColor = 'rgba(52, 211, 153, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.12)';
            e.currentTarget.style.borderColor = 'rgba(52, 211, 153, 0.3)';
          }}
        >
          {t('Privacy Policy', 'پرائیویسی پالیسی', 'سياسة الخصوصية', 'Privacy Policy')}
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
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
          }}
        >
          {t('Copyright & Waqf', 'کاپی رائٹ و وقف', 'حقوق النشر والوقف', 'Copyright wa Waqf')}
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
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
          }}
        >
          {t('Contact & Support', 'رابطہ و تعاون', 'التواصل والدعم', 'Rabtah wa Ta\'awun')}
        </Link>
      </div>
    </div>
  );
};
