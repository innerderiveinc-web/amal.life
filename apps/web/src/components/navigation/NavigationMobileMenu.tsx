import React from 'react';
import Link from 'next/link';
import { NavAppItem } from './AppsLauncherPopover';

export interface NavigationMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: 'en' | 'ur' | 'ar';
  currentPath: string;
  ibadatItems: NavAppItem[];
  ilmItems: NavAppItem[];
  familySistersItems?: NavAppItem[];
  ahkamItems: NavAppItem[];
}

export const NavigationMobileMenu: React.FC<NavigationMobileMenuProps> = ({
  isOpen,
  onClose,
  currentLang,
  currentPath,
  ibadatItems,
  ilmItems,
  familySistersItems = [],
  ahkamItems,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="mobile-only"
      style={{
        borderTop: '1px solid #E5E7EB',
        backgroundColor: '#FFFFFF',
        padding: '16px 20px 24px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        maxHeight: 'calc(100vh - 120px)',
        overflowY: 'auto',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* PWA Install Button (Mobile Menu) */}
        <button
          onClick={() => {
            onClose();
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('amal-open-install'));
            }
          }}
          aria-label="Install AMAL OS on your phone"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            padding: '11px 14px',
            borderRadius: 10,
            border: '1px solid #10B981',
            backgroundColor: '#064E3B',
            color: '#FFFFFF',
            fontSize: 13,
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(6, 78, 59, 0.2)',
          }}
        >
          <span>📲</span>
          <span>{currentLang === 'ur' ? 'ہوم اسکرین پر انسٹال کریں' : 'Install App (100% Offline)'}</span>
        </button>

        {/* Premier Quran Link (Mobile) */}
        <Link
          href="/quran"
          onClick={onClose}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 14px',
            borderRadius: 10,
            textDecoration: 'none',
            fontSize: 14,
            fontWeight: 800,
            backgroundColor: currentPath === '/quran' ? '#DCFCE7' : '#F0FDF4',
            color: '#166534',
            border: '1px solid #86EFAC',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18 }}>📖</span>
            <span>{currentLang === 'ur' ? 'قرآنِ کریم و حکمت' : 'Holy Quran & Wisdom'}</span>
          </div>
          <span style={{ fontSize: 10, backgroundColor: '#16A34A', color: '#FFFFFF', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>
            {currentLang === 'ur' ? 'کنز الایمان' : 'Kanz'}
          </span>
        </Link>

        {/* Premier Journeys Link (Mobile) */}
        <Link
          href="/journeys"
          onClick={onClose}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 14px',
            borderRadius: 10,
            textDecoration: 'none',
            fontSize: 14,
            fontWeight: 800,
            backgroundColor: currentPath === '/journeys' ? '#DCFCE7' : '#F0FDF4',
            color: '#065F46',
            border: '1px solid #86EFAC',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18 }}>🌱</span>
            <span>{currentLang === 'ur' ? 'روحانی اسفار و روزانہ ٹریکر' : 'Spiritual Journeys (8 Roadmaps)'}</span>
          </div>
          <span style={{ fontSize: 10, backgroundColor: '#059669', color: '#FFFFFF', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>
            {currentLang === 'ur' ? '14 روزہ' : '14-Day'}
          </span>
        </Link>

        {/* Premier Sisters Sanctuary Link (Mobile) */}
        <Link
          href="/sisters"
          onClick={onClose}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 14px',
            borderRadius: 10,
            textDecoration: 'none',
            fontSize: 14,
            fontWeight: 800,
            backgroundColor: currentPath === '/sisters' ? '#FDF2F8' : '#FFF1F2',
            color: '#9D174D',
            border: '1px solid #FECDD3',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18 }}>🌸</span>
            <span>{currentLang === 'ur' ? 'گوشۂ خواتین و صحابیات (عمل نساء)' : 'The Sisters Sanctuary (Amal Nisa)'}</span>
          </div>
          <span style={{ fontSize: 10, backgroundColor: '#9D174D', color: '#FFFFFF', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>
            {currentLang === 'ur' ? '۲۰ کتب' : '20 Books'}
          </span>
        </Link>

        {/* Primary Navigation Links */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <Link
            href="/"
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 12px',
              borderRadius: 8,
              textDecoration: 'none',
              fontSize: 13,
              fontWeight: 700,
              backgroundColor: currentPath === '/' ? '#ECFDF5' : '#F9FAFB',
              color: currentPath === '/' ? '#065F46' : '#374151',
              border: `1px solid ${currentPath === '/' ? '#A7F3D0' : '#E5E7EB'}`,
            }}
          >
            <span>🌅</span>
            <span>{currentLang === 'ur' ? 'آج' : 'Today'}</span>
          </Link>

          <Link
            href="/settings"
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 12px',
              borderRadius: 8,
              textDecoration: 'none',
              fontSize: 13,
              fontWeight: 700,
              backgroundColor: currentPath === '/settings' ? '#ECFDF5' : '#F9FAFB',
              color: currentPath === '/settings' ? '#065F46' : '#374151',
              border: `1px solid ${currentPath === '/settings' ? '#A7F3D0' : '#E5E7EB'}`,
            }}
          >
            <span>⚙️</span>
            <span>{currentLang === 'ur' ? 'مرکزی ترتیبات' : 'Settings'}</span>
          </Link>
        </div>

        {/* Hub 1: Ibadat */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#059669', textTransform: 'uppercase', marginBottom: 6, letterSpacing: 0.5 }}>
            🕋 {currentLang === 'ur' ? 'عبادات و معمولات' : 'Worship & Routine'}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {ibadatItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 10px',
                  borderRadius: 6,
                  textDecoration: 'none',
                  fontSize: 12,
                  fontWeight: 600,
                  backgroundColor: '#F9FAFB',
                  color: currentPath === item.href ? '#065F46' : '#374151',
                  border: '1px solid #E5E7EB',
                }}
              >
                <span>{item.icon}</span>
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {currentLang === 'ur' ? item.titleUrdu : item.title}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Hub 2: Ilm & Sirah */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#0284C7', textTransform: 'uppercase', marginBottom: 6, letterSpacing: 0.5 }}>
            📚 {currentLang === 'ur' ? 'علم، کتب و سیرت' : 'Ilm & Heritage'}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {ilmItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 10px',
                  borderRadius: 6,
                  textDecoration: 'none',
                  fontSize: 12,
                  fontWeight: 600,
                  backgroundColor: '#F9FAFB',
                  color: currentPath === item.href ? '#0369A1' : '#374151',
                  border: '1px solid #E5E7EB',
                }}
              >
                <span>{item.icon}</span>
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {currentLang === 'ur' ? item.titleUrdu : item.title}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Hub 3: Family & Sisters Sanctuary */}
        {familySistersItems.length > 0 && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#9D174D', textTransform: 'uppercase', marginBottom: 6, letterSpacing: 0.5 }}>
              🌸 {currentLang === 'ur' ? 'خاندان و گوشۂ نسواں' : 'Family & Sisters Sanctuary'}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              {familySistersItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 10px',
                    borderRadius: 6,
                    textDecoration: 'none',
                    fontSize: 12,
                    fontWeight: 600,
                    backgroundColor: '#FDF2F8',
                    color: currentPath === item.href ? '#831843' : '#9D174D',
                    border: '1px solid #FBCFE8',
                  }}
                >
                  <span>{item.icon}</span>
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {currentLang === 'ur' ? item.titleUrdu : item.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Hub 4: Ahkam & Suluk */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#D97706', textTransform: 'uppercase', marginBottom: 6, letterSpacing: 0.5 }}>
            ⚖️ {currentLang === 'ur' ? 'احکام، میراث و سلوک' : 'Fiqh, Miras & Suluk'}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {ahkamItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 10px',
                  borderRadius: 6,
                  textDecoration: 'none',
                  fontSize: 12,
                  fontWeight: 600,
                  backgroundColor: '#F9FAFB',
                  color: currentPath === item.href ? '#B45309' : '#374151',
                  border: '1px solid #E5E7EB',
                }}
              >
                <span>{item.icon}</span>
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {currentLang === 'ur' ? item.titleUrdu : item.title}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Direct Links */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 4 }}>
          <Link
            href="/ask"
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '9px 12px',
              borderRadius: 6,
              textDecoration: 'none',
              fontSize: 12,
              fontWeight: 700,
              backgroundColor: '#F0FDF4',
              color: '#065F46',
              border: '1px solid #BBF7D0',
            }}
          >
            <span>💬</span>
            <span>{currentLang === 'ur' ? 'سوال پوچھیں' : 'Ask AMAL'}</span>
          </Link>

          <Link
            href="/about"
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '9px 12px',
              borderRadius: 6,
              textDecoration: 'none',
              fontSize: 12,
              fontWeight: 700,
              backgroundColor: '#F9FAFB',
              color: '#374151',
              border: '1px solid #E5E7EB',
            }}
          >
            <span>🕌</span>
            <span>{currentLang === 'ur' ? 'تعارف و منہج' : 'About AMAL'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
