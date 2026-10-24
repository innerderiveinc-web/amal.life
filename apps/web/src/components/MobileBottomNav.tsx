import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useLanguage } from '../context/LanguageContext';

export const MobileBottomNav: React.FC = () => {
  const router = useRouter();
  const { isUrdu } = useLanguage();

  const navItems = [
    { label: 'Today', labelUrdu: 'آج', href: '/', icon: '🌅' },
    { label: 'Journeys', labelUrdu: 'اسفار', href: '/journeys', icon: '🌱' },
    { label: 'Quran', labelUrdu: 'قرآن', href: '/quran', icon: '📖' },
    { label: 'Prayer', labelUrdu: 'نماز', href: '/prayer', icon: '🕋' },
    { label: 'Wisdom', labelUrdu: 'حکمت', href: '/wisdom', icon: '✨' },
    { label: 'Tasbih', labelUrdu: 'تسبیح', href: '/tasbih', icon: '📿' },
  ];

  return (
    <nav
      className="mobile-only"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.94)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid #E5E7EB',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '8px 12px 14px',
        zIndex: 9000,
        boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.04)',
      }}
    >
      {navItems.map((item) => {
        const isActive = router.pathname === item.href;
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
              padding: '4px 12px',
              borderRadius: 8,
              color: isActive ? '#065F46' : '#6B7280',
              fontWeight: isActive ? 700 : 500,
              fontSize: 10,
            }}
          >
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            <span>{isUrdu ? item.labelUrdu : item.label}</span>
          </Link>
        );
      })}

      {/* 5th Button: Universal Search */}
      <button
        onClick={() => {
          if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('amal-open-search'));
        }}
        aria-label="Open Universal Evidence Search (Cmd+K)"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          padding: '4px 12px',
          borderRadius: 8,
          background: 'none',
          border: 'none',
          color: '#6B7280',
          fontSize: 10,
          fontWeight: 500,
          cursor: 'pointer',
        }}
      >
        <span style={{ fontSize: 20 }}>🔍</span>
        <span>{isUrdu ? 'تلاش' : 'Search'}</span>
      </button>
    </nav>
  );
};
