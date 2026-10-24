import React from 'react';
import Link from 'next/link';

export interface NavigationUtilityRibbonProps {
  isOnline: boolean;
  isMounted: boolean;
  hijri: { day: number; monthNameEnglish: string; monthNameUrdu: string; year: number };
  nextPrayer: any;
  currentLang: string;
  user: any;
  currentPath: string;
  switchLanguage: (lang: 'en' | 'ur' | 'ar') => void;
}

export const NavigationUtilityRibbon: React.FC<NavigationUtilityRibbonProps> = ({
  isOnline,
  isMounted,
  hijri,
  nextPrayer,
  currentLang,
  user,
  currentPath,
  switchLanguage,
}) => {
  return (
    <>
      {/* 0. OFFLINE RESILIENCE BANNER */}
      {!isOnline && (
        <div
          style={{
            backgroundColor: '#78350F',
            color: '#FEF3C7',
            padding: '6px 20px',
            fontSize: 11,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            borderBottom: '1px solid rgba(251, 191, 36, 0.4)',
            letterSpacing: 0.2,
            flexWrap: 'wrap',
          }}
        >
          <span>🌿</span>
          <span>
            <strong>Offline Mode Active (آف لائن موڈ متحرک ہے):</strong> On-device prayer math, Qibla azimuth &amp; local vault functioning 100% offline.
          </span>
          <span
            style={{
              fontSize: 10,
              opacity: 0.85,
              backgroundColor: 'rgba(0,0,0,0.2)',
              padding: '2px 8px',
              borderRadius: 10,
            }}
          >
            Streaming audio requires internet or local cache
          </span>
        </div>
      )}

      {/* 1. TOP UTILITY & LIVE CONTEXT RIBBON */}
      <div
        style={{
          backgroundColor: '#061710',
          color: '#D1D5DB',
          padding: '5px 24px',
          fontSize: 11,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 8,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Left: Live Hijri Date & Prayer Countdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: '#86EFAC' }}>🌙</span>
            <span suppressHydrationWarning style={{ fontWeight: 700, color: '#F9FAFB' }}>
              {isMounted
                ? `${hijri.day} ${currentLang === 'ur' ? hijri.monthNameUrdu : hijri.monthNameEnglish} ${hijri.year} AH`
                : '...'}
            </span>
          </div>

          <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>

          <Link
            href="/prayer"
            aria-label="View Detailed Prayer Times and Qibla Compass"
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, color: '#A7F3D0' }}
          >
            <span>🕌</span>
            <span suppressHydrationWarning>
              {isMounted && nextPrayer ? (
                <>
                  <span style={{ color: '#9CA3AF' }}>
                    {currentLang === 'ur' ? `اگلی نماز: ${nextPrayer.nameUrdu}` : `Next Salah: ${nextPrayer.nameEnglish}`}
                  </span>{' '}
                  <strong suppressHydrationWarning style={{ color: '#FFFFFF' }}>
                    {nextPrayer.time}
                  </strong>{' '}
                  <span
                    suppressHydrationWarning
                    style={{ fontSize: 10, fontWeight: 700, color: '#34D399' }}
                  >
                    ({currentLang === 'ur' ? nextPrayer.formattedCountdownUrdu : nextPrayer.formattedCountdownEnglish})
                  </span>
                </>
              ) : (
                <span>{currentLang === 'ur' ? 'اوقاتِ نماز' : 'Prayer Times'}</span>
              )}
            </span>
          </Link>

          <span
            style={{
              color: '#6EE7B7',
              fontSize: 10,
              backgroundColor: 'rgba(52, 211, 153, 0.15)',
              padding: '1px 6px',
              borderRadius: 4,
              fontWeight: 700,
              border: '1px solid rgba(52, 211, 153, 0.25)',
            }}
          >
            Hanafi
          </span>
        </div>

        {/* Right: Clean, Unified Utility Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Tahajjud Mode */}
          <button
            onClick={() => {
              if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('amal-toggle-tahajjud'));
            }}
            aria-label="Toggle Tahajjud & Night Serenity OLED Dark Mode"
            style={{
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 14,
              padding: '3px 10px',
              fontSize: 11,
              fontWeight: 600,
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              color: '#A7F3D0',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              transition: 'all 0.15s ease',
            }}
            title="Toggle Tahajjud & Night Serenity OLED Dark Mode"
          >
            <span>🌙</span>
            <span>{currentLang === 'ur' ? 'تہجد موڈ' : 'Tahajjud'}</span>
          </button>

          {/* Masnoon Duas */}
          <button
            onClick={() => {
              if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('amal-open-bookmarks'));
            }}
            aria-label="Open Saved Bookmarks & Masnoon Duas Drawer (Cmd+B)"
            style={{
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 14,
              padding: '3px 10px',
              fontSize: 11,
              fontWeight: 600,
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              color: '#FDE68A',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              transition: 'all 0.15s ease',
            }}
            title="Open Saved Bookmarks & Duas (Cmd+B)"
          >
            <span>⭐</span>
            <span>{currentLang === 'ur' ? 'محفوظ دعائیں' : 'Saved Duas'}</span>
          </button>

          {/* Account / Sign In */}
          <button
            onClick={() => {
              if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('amal-open-auth'));
            }}
            aria-label={user && !user.isGuest ? `Signed in as ${user.name}` : 'Sign In or Create Sovereign Account'}
            style={{
              border: user && !user.isGuest ? '1px solid #34D399' : '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 14,
              padding: '3px 10px',
              fontSize: 11,
              fontWeight: 600,
              backgroundColor: user && !user.isGuest ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 255, 255, 0.06)',
              color: user && !user.isGuest ? '#A7F3D0' : '#E5E7EB',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              transition: 'all 0.15s ease',
            }}
            title={user && !user.isGuest ? `Signed in as ${user.name} (${user.madhhab})` : 'Sign In or Create Sovereign Account'}
          >
            <span>👤</span>
            <span>
              {user && !user.isGuest
                ? `${user.name}`
                : currentLang === 'ur'
                ? 'اکاؤنٹ'
                : 'Sign In'}
            </span>
          </button>

          {/* Install PWA Button */}
          <button
            onClick={() => {
              if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('amal-open-install'));
            }}
            aria-label="Install AMAL OS on your device or home screen"
            style={{
              border: '1px solid rgba(52, 211, 153, 0.4)',
              borderRadius: 14,
              padding: '3px 10px',
              fontSize: 11,
              fontWeight: 700,
              backgroundColor: 'rgba(52, 211, 153, 0.15)',
              color: '#6EE7B7',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              transition: 'all 0.15s ease',
            }}
            title="Install AMAL OS on Home Screen / Desktop"
          >
            <span>📲</span>
            <span>{currentLang === 'ur' ? 'ایپ انسٹال کریں' : 'Install App'}</span>
          </button>

          {/* Settings */}
          <Link
            href="/settings"
            aria-label="AMAL OS System Settings & Control Center"
            style={{
              textDecoration: 'none',
              border: currentPath === '/settings' ? '1px solid #34D399' : '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 14,
              padding: '3px 10px',
              fontSize: 11,
              fontWeight: 600,
              backgroundColor: currentPath === '/settings' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 255, 255, 0.06)',
              color: currentPath === '/settings' ? '#A7F3D0' : '#E5E7EB',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              transition: 'all 0.15s ease',
            }}
            title="AMAL OS System Settings & Control Center"
          >
            <span>⚙️</span>
            <span>{currentLang === 'ur' ? 'ترتیبات' : 'Settings'}</span>
          </Link>

          {/* Language Switcher */}
          <div
            style={{
              display: 'flex',
              gap: 2,
              backgroundColor: 'rgba(255,255,255,0.08)',
              padding: '2px',
              borderRadius: 6,
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {(['en', 'ur', 'ar'] as const).map((l) => (
              <button
                key={l}
                onClick={() => switchLanguage(l)}
                aria-label={`Switch interface language to ${l === 'en' ? 'English' : l === 'ur' ? 'Urdu' : 'Arabic'}`}
                style={{
                  border: 'none',
                  borderRadius: 4,
                  padding: '2px 8px',
                  fontSize: 10,
                  fontWeight: currentLang === l ? 800 : 500,
                  backgroundColor: currentLang === l ? '#10B981' : 'transparent',
                  color: currentLang === l ? '#064E3B' : '#D1D5DB',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease',
                }}
              >
                {l === 'en' ? 'EN' : l === 'ur' ? 'اردو' : 'العربية'}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
