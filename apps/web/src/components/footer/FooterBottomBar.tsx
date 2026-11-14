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
        color: '#CBD5E1',
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 800, color: '#FFFFFF' }}>© 2026 AMAL OS by Qsura India Pvt Ltd.</span>
          <span style={{ color: '#94A3B8' }}>
            {t(
              'All Rights Reserved.',
              'تمام حقوق شرعی اغراض کے لیے محفوظ ہیں۔',
              'جميع الحقوق محفوظة للأغراض الشرعية.',
              'All rights reserved for sacred educational purposes.'
            )}
          </span>
          <span style={{ color: '#34D399', fontWeight: 700 }}>
            · {t(
              'Waqf Lil-Ummah',
              'وقف برائے خدمتِ امتِ محمدیہ ﷺ',
              'وقف لخدمة الأمة المحمدية ﷺ',
              'Khidmat-e-Ummat ke liye Waqf'
            )}
          </span>
        </div>
        <div style={{ fontSize: 11, color: '#CBD5E1', marginTop: 2 }}>
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
          {t('Terms & Conditions', 'شرائط و ضوابط', 'الشروط والأحكام', 'Terms & Conditions')}
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
          {t('Copyright & Waqf', 'کاپی رائٹ و وقف', 'حقوق النشر والوقف', 'Copyright & Waqf')}
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
          {t('Contact & Support', 'رابطہ و تعاون', 'التواصل والدعم', 'Contact & Help')}
        </Link>

        <button
          type="button"
          onClick={async () => {
            const text =
              `✨ *AMAL OS — نیت سے عمل تک (Sovereign Islamic Life OS)*\n\n` +
              `100% اشتہارات اور ٹریکنگ سے پاک، خود مختار دینی نظام:\n` +
              `📖 قرآن مجید مع تلاوت، کنز الایمان و تفسیری بصیرت\n` +
              `🕌 فلکیاتی اوقاتِ نماز مع سحری و افطار کیلنڈر\n` +
              `🧭 لائیو قبلہ کمپاس و سولر آرک سینسرز\n` +
              `✨ مستند لائبریری و ڈیجیٹل مسنون تسبیح\n\n` +
              `ملاحظہ فرمائیں: https://amal.life`;
            if (typeof navigator !== 'undefined' && navigator.share) {
              try {
                await navigator.share({
                  title: 'AMAL OS — Sovereign Islamic Life Operating System',
                  text,
                });
                return;
              } catch (e: any) {
                if (e?.name === 'AbortError') return;
              }
            }
            window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
          }}
          style={{
            color: '#FDE68A',
            backgroundColor: 'rgba(217, 119, 6, 0.2)',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            padding: '6px 14px',
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            transition: 'all 0.15s ease',
          }}
          title={t('Share AMAL OS with friends and family (Sadaqah Jariyah)', 'اپنے دوستوں اور اہلِ خانہ کے ساتھ شیئر فرمائیں (صدقہ جاریہ)', 'مشاركة نظام أمل مع الأهل والأصدقاء', 'Share AMAL OS with family')}
        >
          <span>📲</span>
          <span>{t('Share AMAL OS', 'شیئر کریں (صدقہ جاریہ)', 'مشاركة أمل', 'Share AMAL')}</span>
        </button>
      </div>
    </div>
  );
};
