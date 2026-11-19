import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useLanguage } from '../context/LanguageContext';

export const MobileBottomNav: React.FC = () => {
  const router = useRouter();
  const { t } = useLanguage();

  const navItems = [
    { label: 'Today', labelUrdu: 'آج', labelArabic: 'اليوم', labelRoman: 'Aaj', href: '/', icon: '🌅' },
    { label: 'Quran', labelUrdu: 'قرآن', labelArabic: 'القرآن', labelRoman: 'Quran', href: '/quran', icon: '📖' },
    { label: 'Prayer', labelUrdu: 'نماز', labelArabic: 'الصلاة', labelRoman: 'Namaz', href: '/prayer', icon: '🕋' },
    { label: 'Library', labelUrdu: 'مکتبہ', labelArabic: 'المكتبة', labelRoman: 'Maktabah', href: '/library', icon: '📚' },
    { label: 'Sisters', labelUrdu: 'خواتین', labelArabic: 'النساء', labelRoman: 'Khawateen', href: '/sisters', icon: '🌸' },
  ];

  return (
    <nav
      className="mobile-only"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid #E2E8F0',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '6px 8px 12px',
        zIndex: 9000,
        boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.06)',
      }}
    >
      {navItems.map((item) => {
        const isActive = router.pathname === item.href || (item.href === '/library' && router.pathname === '/books');
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-label={`Navigate to ${item.label} (${item.labelUrdu})`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              gap: 2,
              padding: '4px 8px',
              borderRadius: 10,
              backgroundColor: isActive ? '#ECFDF5' : 'transparent',
              color: isActive ? '#065F46' : '#64748B',
              fontWeight: isActive ? 800 : 600,
              fontSize: 10.5,
              minWidth: 54,
              transition: 'all 0.15s ease',
            }}
          >
            <span style={{ fontSize: 19 }}>{item.icon}</span>
            <span>{t(item.label, item.labelUrdu, item.labelArabic, item.labelRoman)}</span>
          </Link>
        );
      })}

      {/* 6th Button: Universal Search / More Tools Drawer */}
      <button
        onClick={() => {
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('amal-open-search'));
          }
        }}
        aria-label="All 30 Modules & Universal Search"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          padding: '4px 8px',
          borderRadius: 10,
          background: 'none',
          border: 'none',
          color: '#64748B',
          fontSize: 10.5,
          fontWeight: 600,
          cursor: 'pointer',
          minWidth: 54,
        }}
      >
        <span style={{ fontSize: 19 }}>🧭</span>
        <span>{t('All 30', '۳۰ ماڈیولز', '٣٠ تطبيقاً', '30 Modules')}</span>
      </button>
    </nav>
  );
};
