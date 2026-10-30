import React from 'react';
import Link from 'next/link';
import { NavAppItem } from './AppsLauncherPopover';

export interface NavigationMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: 'en' | 'ur' | 'ar' | 'roman';
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

  const getItemTitle = (item: NavAppItem) => {
    if (currentLang === 'roman') return item.titleRoman || item.titleUrdu || item.title;
    if (currentLang === 'ur') return item.titleUrdu || item.title;
    if (currentLang === 'ar') return item.titleArabic || item.titleUrdu || item.title;
    return item.title;
  };

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
          <span>
            {currentLang === 'ur'
              ? 'ہوم اسکرین پر انسٹال کریں'
              : currentLang === 'ar'
              ? 'تثبيت التطبيق على الشاشة الرئيسية'
              : currentLang === 'roman'
              ? 'Home Screen par Install karein'
              : 'Install App (100% Offline)'}
          </span>
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
            <span>
              {currentLang === 'ur'
                ? 'قرآنِ کریم و حکمت'
                : currentLang === 'ar'
                ? 'القرآن الكريم والحكمة'
                : currentLang === 'roman'
                ? 'Quran Kareem wa Hikmat'
                : 'Holy Quran & Wisdom'}
            </span>
          </div>
          <span style={{ fontSize: 10, backgroundColor: '#16A34A', color: '#FFFFFF', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>
            {currentLang === 'ur'
              ? 'کنز الایمان'
              : currentLang === 'ar'
              ? 'كنز الإيمان'
              : currentLang === 'roman'
              ? 'Kanz-ul-Iman'
              : 'Kanz-ul-Iman'}
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
            <span>
              {currentLang === 'ur'
                ? 'روحانی اسفار و روزانہ ٹریکر'
                : currentLang === 'ar'
                ? 'الرحلات الإيمانية والمسار اليومي'
                : currentLang === 'roman'
                ? 'Ruhani Asfar wa Daily Tracker'
                : 'Spiritual Journeys (8 Roadmaps)'}
            </span>
          </div>
          <span style={{ fontSize: 10, backgroundColor: '#059669', color: '#FFFFFF', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>
            {currentLang === 'ur'
              ? '14 روزہ'
              : currentLang === 'ar'
              ? '١٤ يوماً'
              : currentLang === 'roman'
              ? '14-Rooza'
              : '14-Day'}
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
            <span>
              {currentLang === 'ur'
                ? 'گوشۂ خواتین و صحابیات (عمل نساء)'
                : currentLang === 'ar'
                ? 'واحة المرأة المسلمة والصحابيات'
                : currentLang === 'roman'
                ? 'Gosha-e-Khawateen wa Sahabiyyat (Amal Nisa)'
                : 'The Sisters Sanctuary (Amal Nisa)'}
            </span>
          </div>
          <span style={{ fontSize: 10, backgroundColor: '#9D174D', color: '#FFFFFF', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>
            {currentLang === 'ur'
              ? '۲۰ کتب'
              : currentLang === 'ar'
              ? '٢٠ كتاباً'
              : currentLang === 'roman'
              ? '20 Kutub'
              : '20 Books'}
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
            <span>
              {currentLang === 'ur'
                ? 'آج'
                : currentLang === 'ar'
                ? 'اليوم'
                : currentLang === 'roman'
                ? 'Aaj'
                : 'Today'}
            </span>
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
            <span>
              {currentLang === 'ur'
                ? 'مرکزی ترتیبات'
                : currentLang === 'ar'
                ? 'الإعدادات المركزية'
                : currentLang === 'roman'
                ? 'Markazi Tarteebat'
                : 'Settings'}
            </span>
          </Link>
        </div>

        {/* Hub 1: Ibadat */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#059669', textTransform: 'uppercase', marginBottom: 6, letterSpacing: 0.5 }}>
            🕋{' '}
            {currentLang === 'ur'
              ? 'عبادات و معمولات'
              : currentLang === 'ar'
              ? 'العبادات والمعاملات'
              : currentLang === 'roman'
              ? 'Ibadat wa Ma\'moolat'
              : 'Worship & Routine'}
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
                  {getItemTitle(item)}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Hub 2: Ilm & Sirah */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#0284C7', textTransform: 'uppercase', marginBottom: 6, letterSpacing: 0.5 }}>
            📚{' '}
            {currentLang === 'ur'
              ? 'علم، کتب و سیرت'
              : currentLang === 'ar'
              ? 'العلوم والتراث والسيرة'
              : currentLang === 'roman'
              ? 'Ilm, Kutub wa Seerat'
              : 'Ilm & Heritage'}
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
                  {getItemTitle(item)}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Hub 3: Family & Sisters Sanctuary */}
        {familySistersItems.length > 0 && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#9D174D', textTransform: 'uppercase', marginBottom: 6, letterSpacing: 0.5 }}>
              🌸{' '}
              {currentLang === 'ur'
                ? 'خاندان و گوشۂ نسواں'
                : currentLang === 'ar'
                ? 'الأسرة وواحة المرأة'
                : currentLang === 'roman'
                ? 'Khandan wa Gosha-e-Niswan'
                : 'Family & Sisters Sanctuary'}
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
                    {getItemTitle(item)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Hub 4: Ahkam & Suluk */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#D97706', textTransform: 'uppercase', marginBottom: 6, letterSpacing: 0.5 }}>
            ⚖️{' '}
            {currentLang === 'ur'
              ? 'احکام، میراث و سلوک'
              : currentLang === 'ar'
              ? 'الأحكام والمواريث والسلوك'
              : currentLang === 'roman'
              ? 'Ahkam, Miras wa Suluk'
              : 'Fiqh, Miras & Suluk'}
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
                  {getItemTitle(item)}
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
            <span>
              {currentLang === 'ur'
                ? 'سوال پوچھیں'
                : currentLang === 'ar'
                ? 'اسأل أمل'
                : currentLang === 'roman'
                ? 'Sawal Puchein'
                : 'Ask AMAL'}
            </span>
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
            <span>
              {currentLang === 'ur'
                ? 'تعارف و منہج'
                : currentLang === 'ar'
                ? 'عن المنظومة'
                : currentLang === 'roman'
                ? 'Ta\'aruf wa Manhaj'
                : 'About AMAL'}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
