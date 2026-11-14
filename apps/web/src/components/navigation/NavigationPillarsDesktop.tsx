import React from 'react';
import Link from 'next/link';
import { ibadatItems, ilmItems, familySistersItems, ahkamItems } from './navigation-items';
import { IconKaaba, IconQuran, IconScale, IconMosque, IconSun } from '../icons/AmalIcons';

export interface NavigationPillarsDesktopProps {
  currentLang: string;
  currentPath: string;
  asPath: string;
  activeDropdown: string | null;
  setActiveDropdown: (key: string | null) => void;
}

export const NavigationPillarsDesktop: React.FC<NavigationPillarsDesktopProps> = ({
  currentLang,
  currentPath,
  asPath,
  activeDropdown,
  setActiveDropdown,
}) => {
  const getItemTitle = (item: { title: string; titleUrdu: string; titleArabic?: string; titleRoman?: string }) => {
    if (currentLang === 'roman') return item.titleRoman || item.titleUrdu || item.title;
    if (currentLang === 'ur') return item.titleUrdu;
    if (currentLang === 'ar') return item.titleArabic || item.titleUrdu || item.title;
    return item.title;
  };

  return (
    <div className="desktop-only" style={{ display: 'flex', gap: 4, alignItems: 'center', flexShrink: 0 }}>
      <Link
        href="/"
        style={{
          textDecoration: 'none',
          fontSize: 13,
          fontWeight: currentPath === '/' ? 700 : 600,
          color: currentPath === '/' ? '#065F46' : '#334155',
          padding: '6px 8px',
          borderRadius: 6,
          backgroundColor: currentPath === '/' ? '#F0FDF4' : 'transparent',
          transition: 'all 0.15s ease',
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          whiteSpace: 'nowrap',
        }}
      >
        <IconSun size={15} color={currentPath === '/' ? '#065F46' : '#64748B'} />
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

      {/* Pillar 1: Ibadah & Daily Rhythm */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <button
          onClick={() => setActiveDropdown(activeDropdown === 'ibadat' ? null : 'ibadat')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            border: 'none',
            background: 'none',
            fontSize: 13,
            fontWeight: activeDropdown === 'ibadat' ? 700 : 600,
            color: activeDropdown === 'ibadat' ? '#065F46' : '#374151',
            cursor: 'pointer',
            padding: '6px 10px',
            borderRadius: 8,
            whiteSpace: 'nowrap',
            flexShrink: 0,
            backgroundColor: activeDropdown === 'ibadat' ? '#F0FDF4' : 'transparent',
            transition: 'all 0.15s ease',
          }}
        >
          <IconKaaba size={15} color={activeDropdown === 'ibadat' ? '#065F46' : '#64748B'} />
          <span style={{ whiteSpace: 'nowrap' }}>
            {currentLang === 'ur'
              ? 'عبادات'
              : currentLang === 'ar'
              ? 'العبادات'
              : currentLang === 'roman'
              ? 'Ibadat'
              : 'Ibadah'}
          </span>
          <span style={{ fontSize: 9, opacity: 0.6 }}>▼</span>
        </button>

        {activeDropdown === 'ibadat' && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              backgroundColor: '#FFFFFF',
              borderRadius: 10,
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
              border: '1px solid #E5E7EB',
              width: 250,
              padding: 6,
              zIndex: 1100,
            }}
          >
            {ibadatItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setActiveDropdown(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 10px',
                  textDecoration: 'none',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  color: currentPath === item.href ? '#065F46' : '#374151',
                  backgroundColor: currentPath === item.href ? '#F0FDF4' : 'transparent',
                }}
              >
                <span>{item.icon}</span>
                <span>{getItemTitle(item)}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Pillar 2: Quran & Sacred Knowledge */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <button
          onClick={() => setActiveDropdown(activeDropdown === 'ilm' ? null : 'ilm')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            border: 'none',
            background: 'none',
            fontSize: 13,
            fontWeight: activeDropdown === 'ilm' ? 700 : 600,
            color: activeDropdown === 'ilm' ? '#065F46' : '#374151',
            cursor: 'pointer',
            padding: '6px 10px',
            borderRadius: 8,
            whiteSpace: 'nowrap',
            flexShrink: 0,
            backgroundColor: activeDropdown === 'ilm' ? '#F0FDF4' : 'transparent',
            transition: 'all 0.15s ease',
          }}
        >
          <IconQuran size={15} color={activeDropdown === 'ilm' ? '#065F46' : '#64748B'} />
          <span style={{ whiteSpace: 'nowrap' }}>
            {currentLang === 'ur'
              ? 'قرآن و علم'
              : currentLang === 'ar'
              ? 'القرآن والعلم'
              : currentLang === 'roman'
              ? 'Quran & Ilm'
              : 'Quran & Ilm'}
          </span>
          <span style={{ fontSize: 9, opacity: 0.6 }}>▼</span>
        </button>

        {activeDropdown === 'ilm' && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              backgroundColor: '#FFFFFF',
              borderRadius: 10,
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
              border: '1px solid #E5E7EB',
              width: 260,
              padding: 6,
              zIndex: 1100,
            }}
          >
            {ilmItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setActiveDropdown(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 10px',
                  textDecoration: 'none',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  color: currentPath === item.href ? '#065F46' : '#374151',
                  backgroundColor: currentPath === item.href ? '#F0FDF4' : 'transparent',
                }}
              >
                <span>{item.icon}</span>
                <span>{getItemTitle(item)}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Pillar 3: Family & Sisters Sanctuary */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <button
          onClick={() => setActiveDropdown(activeDropdown === 'family' ? null : 'family')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            border: activeDropdown === 'family' ? '1px solid rgba(244, 114, 182, 0.4)' : '1px solid transparent',
            background: 'none',
            fontSize: 13,
            fontWeight: activeDropdown === 'family' ? 700 : 600,
            color: activeDropdown === 'family' ? '#9D174D' : '#374151',
            cursor: 'pointer',
            padding: '6px 10px',
            borderRadius: 8,
            whiteSpace: 'nowrap',
            flexShrink: 0,
            backgroundColor: activeDropdown === 'family' ? '#FDF2F8' : 'transparent',
            transition: 'all 0.15s ease',
          }}
        >
          <span>🌸</span>
          <span style={{ whiteSpace: 'nowrap' }}>
            {currentLang === 'ur'
              ? 'خواتین'
              : currentLang === 'ar'
              ? 'المرأة والأسرة'
              : currentLang === 'roman'
              ? 'Sisters'
              : 'Sisters & Family'}
          </span>
          <span style={{ fontSize: 9, opacity: 0.6 }}>▼</span>
        </button>

        {activeDropdown === 'family' && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              backgroundColor: '#FFFFFF',
              borderRadius: 10,
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
              border: '1px solid #FECDD3',
              width: 270,
              padding: 6,
              zIndex: 1100,
            }}
          >
            {familySistersItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setActiveDropdown(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 10px',
                  textDecoration: 'none',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  color: asPath === item.href ? '#831843' : '#374151',
                  backgroundColor: asPath === item.href ? '#FDF2F8' : 'transparent',
                }}
              >
                <span>{item.icon}</span>
                <span>{getItemTitle(item)}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Pillar 4: Fiqh, Miras & Suluk */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <button
          onClick={() => setActiveDropdown(activeDropdown === 'ahkam' ? null : 'ahkam')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            border: 'none',
            background: 'none',
            fontSize: 13,
            fontWeight: activeDropdown === 'ahkam' ? 700 : 600,
            color: activeDropdown === 'ahkam' ? '#065F46' : '#374151',
            cursor: 'pointer',
            padding: '6px 10px',
            borderRadius: 8,
            whiteSpace: 'nowrap',
            flexShrink: 0,
            backgroundColor: activeDropdown === 'ahkam' ? '#F0FDF4' : 'transparent',
            transition: 'all 0.15s ease',
          }}
        >
          <IconScale size={15} color={activeDropdown === 'ahkam' ? '#065F46' : '#64748B'} />
          <span style={{ whiteSpace: 'nowrap' }}>
            {currentLang === 'ur'
              ? 'فقہ'
              : currentLang === 'ar'
              ? 'الفقه'
              : currentLang === 'roman'
              ? 'Fiqh'
              : 'Fiqh & Guidance'}
          </span>
          <span style={{ fontSize: 9, opacity: 0.6 }}>▼</span>
        </button>

        {activeDropdown === 'ahkam' && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              backgroundColor: '#FFFFFF',
              borderRadius: 10,
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
              border: '1px solid #E5E7EB',
              width: 270,
              padding: 6,
              zIndex: 1100,
            }}
          >
            {ahkamItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setActiveDropdown(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 10px',
                  textDecoration: 'none',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  color: currentPath === item.href ? '#065F46' : '#374151',
                  backgroundColor: currentPath === item.href ? '#F0FDF4' : 'transparent',
                }}
              >
                <span>{item.icon}</span>
                <span>{getItemTitle(item)}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Direct Link: Ask AMAL */}
      <Link
        href="/ask"
        style={{
          textDecoration: 'none',
          fontSize: 13,
          fontWeight: currentPath === '/ask' ? 700 : 600,
          color: currentPath === '/ask' ? '#065F46' : '#374151',
          padding: '6px 10px',
          borderRadius: 8,
          backgroundColor: currentPath === '/ask' ? '#F0FDF4' : 'transparent',
          whiteSpace: 'nowrap',
          flexShrink: 0,
          transition: 'all 0.15s ease',
        }}
      >
        <span style={{ whiteSpace: 'nowrap' }}>
          {currentLang === 'ur'
            ? '💬 سوال'
            : currentLang === 'ar'
            ? '💬 سؤال'
            : currentLang === 'roman'
            ? '💬 Ask'
            : '💬 Ask'}
        </span>
      </Link>

      {/* Direct Link: About & Methodology */}
      <Link
        href="/about"
        style={{
          textDecoration: 'none',
          fontSize: 13,
          fontWeight: currentPath === '/about' ? 700 : 600,
          color: currentPath === '/about' ? '#065F46' : '#374151',
          padding: '6px 10px',
          borderRadius: 8,
          backgroundColor: currentPath === '/about' ? '#F0FDF4' : 'transparent',
          whiteSpace: 'nowrap',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          transition: 'all 0.15s ease',
        }}
      >
        <IconMosque size={15} color={currentPath === '/about' ? '#065F46' : '#64748B'} />
        <span style={{ whiteSpace: 'nowrap' }}>
          {currentLang === 'ur'
            ? 'منہج'
            : currentLang === 'ar'
            ? 'المنهج'
            : currentLang === 'roman'
            ? 'About'
            : 'About'}
        </span>
      </Link>
    </div>
  );
};
