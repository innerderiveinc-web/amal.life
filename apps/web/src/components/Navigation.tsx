import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AmalTheme } from '@amal/ui';
import { hijriFastingEngine, prayerQiblaEngine } from '@amal/amal-engine';
import {
  getLiveNextPrayer,
  getSavedLocation,
  getSavedMadhhab,
  getSavedMethod,
  getSavedOffsets,
  applyOffsets,
  getSavedHijriOffset,
} from '../lib/prayer-utils';
import { useAuth } from '../context/AuthContext';
import { AppsLauncherPopover } from './navigation/AppsLauncherPopover';
import { NavigationMobileMenu } from './navigation/NavigationMobileMenu';

export const Navigation: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const [currentLang, setCurrentLang] = useState<'en' | 'ur' | 'ar'>('en');

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const [isAppsMenuOpen, setIsAppsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns & mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsAppsMenuOpen(false);
    setActiveDropdown(null);
  }, [router.asPath]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
        setIsAppsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLanguage = (lang: 'en' | 'ur' | 'ar') => {
    setCurrentLang(lang);
    if (typeof document !== 'undefined') {
      document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl';
      document.documentElement.lang = lang;
    }
  };

  const [now, setNow] = useState<Date>(() => new Date());
  const [prayerConfigKey, setPrayerConfigKey] = useState(0);

  // Live Hijri date calculation (with user Ru'yat-e-Hilal moon adjustment)
  const hijri = useMemo(() => {
    try {
      const offset = getSavedHijriOffset();
      return hijriFastingEngine.toHijri(now, offset);
    } catch {
      return { day: 26, monthNameEnglish: 'Jumada al-Ula', monthNameUrdu: 'جمادی الاولیٰ', year: 1448 };
    }
  }, [now, prayerConfigKey]);

  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 60000);
    const handleConfigChange = () => setPrayerConfigKey((k) => k + 1);
    window.addEventListener('amal_prayer_settings_changed', handleConfigChange);

    if (typeof window !== 'undefined') {
      setIsOnline(navigator.onLine);
      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
      return () => {
        clearInterval(interval);
        window.removeEventListener('amal_prayer_settings_changed', handleConfigChange);
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener('amal_prayer_settings_changed', handleConfigChange);
    };
  }, []);

  // Live Prayer calculation (using saved user location, madhhab, method, and offsets)
  const prayerTimes = useMemo(() => {
    try {
      const loc = getSavedLocation();
      const madhhab = getSavedMadhhab();
      const method = getSavedMethod();
      const offsets = getSavedOffsets();
      const raw = prayerQiblaEngine.calculatePrayerTimes({ latitude: loc.lat, longitude: loc.lon }, now, madhhab, method);
      return applyOffsets(raw, offsets);
    } catch {
      return prayerQiblaEngine.calculatePrayerTimes({ latitude: 28.6139, longitude: 77.2090 }, now, 'HANAFI', 'KARACHI');
    }
  }, [now, prayerConfigKey]);

  const nextPrayer = useMemo(() => {
    try {
      return getLiveNextPrayer(prayerTimes, now);
    } catch {
      return null;
    }
  }, [prayerTimes, now]);

  // Categorized Hubs for topbar
  const ibadatItems = [
    { title: 'Auqat-e-Namaz & Qibla', titleUrdu: 'نماز کے اوقات و قبلہ', href: '/prayer', icon: '🕋' },
    { title: 'Morning & Evening Adhkar', titleUrdu: 'صبح و شام کے اذکار', href: '/adhkar', icon: '🌅' },
    { title: 'Digital Masnoon Tasbih', titleUrdu: 'مسنون تسبیح کاؤنٹر', href: '/tasbih', icon: '📿' },
    { title: 'Hijri Calendar & Fasting', titleUrdu: 'ہجری کیلنڈر و روزے', href: '/calendar', icon: '🌙' },
    { title: 'Tajweed & Makharij Audio', titleUrdu: 'تجوید و مخارج آڈیو', href: '/tajweed', icon: '🎙️' },
    { title: 'Hajj & Umrah Pilgrimage', titleUrdu: 'حج و عمرہ رہنمائی', href: '/hajj', icon: '✨' },
    { title: 'Private Muhasabah Vault', titleUrdu: 'شام کا محاسبہ', href: '/reflections', icon: '📝' },
  ];

  const ilmItems = [
    { title: 'Al-Quran & Wisdom (Kanz-ul-Iman)', titleUrdu: 'قرآن کریم، حکمت و تدبر', href: '/quran', icon: '📖' },
    { title: '106-Book Canonical Library', titleUrdu: 'کتب خانہ السواد الاعظم', href: '/library', icon: '📚' },
    { title: 'Living Sirah & Shama\'il', titleUrdu: 'سیرت النبی ﷺ و شمائل', href: '/sirah', icon: '🕊️' },
    { title: 'Quran Audios (4 Qurra)', titleUrdu: 'تلاوت قرآن (۴ قراء)', href: '/audio', icon: '🎧' },
    { title: 'Knowledge Vault (Dars Notes)', titleUrdu: 'خطبات و درس کا خزانہ', href: '/vault', icon: '🏛️' },
    { title: 'Niyyah Goals & Baselines', titleUrdu: 'دینی اہداف و نیت', href: '/goals', icon: '🎯' },
    { title: 'Structured Journeys (Suluk)', titleUrdu: 'منظم دینی سفر', href: '/journeys', icon: '🛤️' },
  ];

  const ahkamItems = [
    { title: 'Zakat & Nisab Calculator', titleUrdu: 'زکوٰۃ و نصاب کیلکولیٹر', href: '/calculator', icon: '💰' },
    { title: 'Miras (Fara\'id) Shares & PDF', titleUrdu: 'میراث و فرائض تقسیم', href: '/calculator', icon: '📜' },
    { title: 'Deen Decision Room', titleUrdu: 'ڈیسیژن روم (مفتی پیکٹ)', href: '/decision-room', icon: '⚖️' },
    { title: 'Family Deen OS', titleUrdu: 'فیملی سرکل و معمولات', href: '/family', icon: '👨‍👩‍👧‍👦' },
    { title: 'Deen Replay Annual Review', titleUrdu: 'دین ری پلے (سالانہ جائزہ)', href: '/replay', icon: '🔄' },
  ];

  const allApps = [
    ...ibadatItems,
    ...ilmItems,
    ...ahkamItems,
    { title: 'Canonical Evidence Explorer', titleUrdu: 'کتبِ معتبرہ سے تلاش و رہنمائی', href: '/ask', icon: '💬' },
    { title: 'Security & Trust Vault', titleUrdu: 'پرائیویسی و امانت سینٹر', href: '/privacy', icon: '🛡️' },
    { title: 'System Settings Control Center', titleUrdu: 'مرکزی ترتیبات', href: '/settings', icon: '⚙️' },
    { title: 'About & Methodology', titleUrdu: 'تعارف و منہج عمل', href: '/about', icon: '🕌' },
  ];

  return (
    <header ref={dropdownRef} style={{
      backgroundColor: '#FFFFFF',
      borderBottom: `1px solid ${AmalTheme.colors.surface.borderLight}`,
      marginBottom: 24,
      position: 'relative',
      zIndex: 1000,
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      {/* 0. OFFLINE RESILIENCE BANNER */}
      {!isOnline && (
        <div style={{
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
        }}>
          <span>🌿</span>
          <span>
            <strong>Offline Mode Active (آف لائن موڈ متحرک ہے):</strong> On-device prayer math, Qibla azimuth &amp; local vault functioning 100% offline.
          </span>
          <span style={{ fontSize: 10, opacity: 0.85, backgroundColor: 'rgba(0,0,0,0.2)', padding: '2px 8px', borderRadius: 10 }}>
            Streaming audio requires internet or local cache
          </span>
        </div>
      )}

      {/* 1. TOP UTILITY & LIVE CONTEXT RIBBON */}
      <div style={{
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
      }}>
        {/* Left: Live Hijri Date & Prayer Countdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: '#86EFAC' }}>🌙</span>
            <span suppressHydrationWarning style={{ fontWeight: 700, color: '#F9FAFB' }}>
              {isMounted ? `${hijri.day} ${currentLang === 'ur' ? hijri.monthNameUrdu : hijri.monthNameEnglish} ${hijri.year} AH` : '...'}
            </span>
          </div>

          <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>

          <Link href="/prayer" aria-label="View Detailed Prayer Times and Qibla Compass" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, color: '#A7F3D0' }}>
            <span>🕌</span>
            <span suppressHydrationWarning>
              {isMounted && nextPrayer ? (
                <>
                  <span style={{ color: '#9CA3AF' }}>
                    {currentLang === 'ur' ? `اگلی نماز: ${nextPrayer.nameUrdu}` : `Next Salah: ${nextPrayer.nameEnglish}`}
                  </span>{' '}
                  <strong suppressHydrationWarning style={{ color: '#FFFFFF' }}>{nextPrayer.time}</strong>{' '}
                  <span suppressHydrationWarning style={{ fontSize: 10, fontWeight: 700, color: '#34D399' }}>
                    ({currentLang === 'ur' ? nextPrayer.formattedCountdownUrdu : nextPrayer.formattedCountdownEnglish})
                  </span>
                </>
              ) : (
                <span>{currentLang === 'ur' ? 'اوقاتِ نماز' : 'Prayer Times'}</span>
              )}
            </span>
          </Link>

          <span style={{ color: '#6EE7B7', fontSize: 10, backgroundColor: 'rgba(52, 211, 153, 0.15)', padding: '1px 6px', borderRadius: 4, fontWeight: 700, border: '1px solid rgba(52, 211, 153, 0.25)' }}>
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
            aria-label={user && !user.isGuest ? `Signed in as ${user.name}` : "Sign In or Create Sovereign Account"}
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
                : (currentLang === 'ur' ? 'اکاؤنٹ' : 'Sign In')}
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
              border: router.pathname === '/settings' ? '1px solid #34D399' : '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 14,
              padding: '3px 10px',
              fontSize: 11,
              fontWeight: 600,
              backgroundColor: router.pathname === '/settings' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 255, 255, 0.06)',
              color: router.pathname === '/settings' ? '#A7F3D0' : '#E5E7EB',
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
          <div style={{ display: 'flex', gap: 2, backgroundColor: 'rgba(255,255,255,0.08)', padding: '2px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.1)' }}>
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

      {/* 2. MAIN NAVIGATION BAR */}
      <nav style={{
        maxWidth: 1240,
        margin: '0 auto',
        padding: '12px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 16,
      }}>
        {/* Brand & Identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              backgroundColor: '#064E3B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              boxShadow: '0 2px 6px rgba(6, 78, 59, 0.25)',
              flexShrink: 0,
            }}>
              🧭
            </div>
            <div>
              <div style={{
                fontSize: 18,
                fontWeight: 900,
                color: '#064E3B',
                letterSpacing: 0.5,
                lineHeight: 1.1,
              }}>
                AMAL OS
              </div>
              <div style={{ fontSize: 9, color: '#64748B', fontWeight: 700, letterSpacing: 0.4, display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ textTransform: 'uppercase' }}>Deen &amp; Life OS</span>
                <span style={{ color: '#059669', fontWeight: 800 }}>· by Qsura</span>
              </div>
            </div>
          </Link>

          <span className="desktop-only" style={{
            fontSize: 10,
            padding: '2px 8px',
            borderRadius: 12,
            backgroundColor: '#F0FDF4',
            color: '#065F46',
            fontWeight: 700,
            border: '1px solid #BBF7D0',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}>
            <span style={{ color: '#059669', fontSize: 10 }}>✓</span>
            <span>Ahl al-Sunnah</span>
          </span>
        </div>

        {/* Primary Hubs (Desktop) */}
        <div className="desktop-only" style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <Link
            href="/"
            style={{
              textDecoration: 'none',
              fontSize: 13,
              fontWeight: router.pathname === '/' ? 700 : 600,
              color: router.pathname === '/' ? '#065F46' : '#334155',
              padding: '6px 10px',
              borderRadius: 6,
              backgroundColor: router.pathname === '/' ? '#F0FDF4' : 'transparent',
              transition: 'all 0.15s ease',
            }}
          >
            {currentLang === 'ur' ? '🌅 آج' : '🌅 Today'}
          </Link>

          {/* Direct Premier Hub: Al-Quran (114 Surahs) */}
          <Link
            href="/quran"
            style={{
              textDecoration: 'none',
              fontSize: 13,
              fontWeight: router.pathname === '/quran' ? 700 : 600,
              color: router.pathname === '/quran' ? '#065F46' : '#1E293B',
              padding: '6px 10px',
              borderRadius: 6,
              backgroundColor: router.pathname === '/quran' ? '#DCFCE7' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              transition: 'all 0.15s ease',
            }}
          >
            <span>📖</span>
            <span>{currentLang === 'ur' ? 'قرآنِ کریم' : 'Al-Quran'}</span>
            <span style={{ fontSize: 9, backgroundColor: '#10B981', color: '#FFFFFF', padding: '1px 5px', borderRadius: 4, fontWeight: 700 }}>
              {currentLang === 'ur' ? 'کنز الایمان' : 'Kanz'}
            </span>
          </Link>

          {/* Dedicated Premier Hub: Quran Wisdom Cards */}
          <Link
            href="/wisdom"
            style={{
              textDecoration: 'none',
              fontSize: 13,
              fontWeight: router.pathname === '/wisdom' ? 700 : 600,
              color: router.pathname === '/wisdom' ? '#92400E' : '#1E293B',
              padding: '6px 10px',
              borderRadius: 6,
              backgroundColor: router.pathname === '/wisdom' ? '#FEF3C7' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              transition: 'all 0.15s ease',
            }}
          >
            <span>✨</span>
            <span>{currentLang === 'ur' ? 'قرآنی حکمت' : 'Wisdom'}</span>
            <span style={{ fontSize: 9, backgroundColor: '#F59E0B', color: '#FFFFFF', padding: '1px 5px', borderRadius: 10, fontWeight: 700 }}>
              42
            </span>
          </Link>

          {/* Hub 1: Ibadat Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'ibadat' ? null : 'ibadat')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                border: 'none',
                background: 'none',
                fontSize: 13,
                fontWeight: 600,
                color: activeDropdown === 'ibadat' ? AmalTheme.colors.primary : '#374151',
                cursor: 'pointer',
                padding: '6px 10px',
                borderRadius: 6,
              }}
            >
              <span>🕋 {currentLang === 'ur' ? 'عبادات' : 'Worship'}</span>
              <span style={{ fontSize: 9 }}>▼</span>
            </button>

            {activeDropdown === 'ibadat' && (
              <div style={{
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
              }}>
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
                      color: router.pathname === item.href ? AmalTheme.colors.primary : '#374151',
                      backgroundColor: router.pathname === item.href ? '#F0FDF4' : 'transparent',
                    }}
                  >
                    <span>{item.icon}</span>
                    <span>{currentLang === 'ur' ? item.titleUrdu : item.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Hub 2: Ilm & Sirah Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'ilm' ? null : 'ilm')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                border: 'none',
                background: 'none',
                fontSize: 13,
                fontWeight: 600,
                color: activeDropdown === 'ilm' ? AmalTheme.colors.primary : '#374151',
                cursor: 'pointer',
                padding: '6px 10px',
                borderRadius: 6,
              }}
            >
              <span>📚 {currentLang === 'ur' ? 'علم و سیرت' : 'Heritage'}</span>
              <span style={{ fontSize: 9 }}>▼</span>
            </button>

            {activeDropdown === 'ilm' && (
              <div style={{
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
              }}>
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
                      color: router.pathname === item.href ? AmalTheme.colors.primary : '#374151',
                      backgroundColor: router.pathname === item.href ? '#F0FDF4' : 'transparent',
                    }}
                  >
                    <span>{item.icon}</span>
                    <span>{currentLang === 'ur' ? item.titleUrdu : item.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Hub 3: Ahkam & Family Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'ahkam' ? null : 'ahkam')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                border: 'none',
                background: 'none',
                fontSize: 13,
                fontWeight: 600,
                color: activeDropdown === 'ahkam' ? AmalTheme.colors.primary : '#374151',
                cursor: 'pointer',
                padding: '6px 10px',
                borderRadius: 6,
                whiteSpace: 'nowrap',
              }}
            >
              <span>⚖️ {currentLang === 'ur' ? 'احکام و فقہ' : 'Fiqh & Rules'}</span>
              <span style={{ fontSize: 9 }}>▼</span>
            </button>

            {activeDropdown === 'ahkam' && (
              <div style={{
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
              }}>
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
                      color: router.pathname === item.href ? AmalTheme.colors.primary : '#374151',
                      backgroundColor: router.pathname === item.href ? '#F0FDF4' : 'transparent',
                    }}
                  >
                    <span>{item.icon}</span>
                    <span>{currentLang === 'ur' ? item.titleUrdu : item.title}</span>
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
              fontWeight: router.pathname === '/ask' ? 700 : 600,
              color: router.pathname === '/ask' ? AmalTheme.colors.primary : '#374151',
              padding: '6px 10px',
              borderRadius: 6,
              backgroundColor: router.pathname === '/ask' ? '#F0FDF4' : 'transparent',
              whiteSpace: 'nowrap',
            }}
          >
            {currentLang === 'ur' ? '💬 سوال پوچھیں' : '💬 Ask AMAL'}
          </Link>

          {/* Direct Link: About & Methodology */}
          <Link
            href="/about"
            style={{
              textDecoration: 'none',
              fontSize: 13,
              fontWeight: router.pathname === '/about' ? 700 : 600,
              color: router.pathname === '/about' ? AmalTheme.colors.primary : '#374151',
              padding: '6px 10px',
              borderRadius: 6,
              backgroundColor: router.pathname === '/about' ? '#F0FDF4' : 'transparent',
              whiteSpace: 'nowrap',
            }}
          >
            {currentLang === 'ur' ? '🕌 تعارف' : '🕌 About'}
          </Link>
        </div>

        {/* Right Tools: Sleek Search & Apps Launcher */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {/* Quick Action: Search (Cmd+K) - Desktop */}
          <button
            onClick={() => {
              if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('amal-open-search'));
            }}
            aria-label="Open Universal Instant Search (Cmd+K)"
            className="desktop-only"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              border: '1px solid #E2E8F0',
              borderRadius: 8,
              padding: '6px 12px',
              backgroundColor: '#F8FAFC',
              color: '#64748B',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            title="Universal Instant Search (Cmd+K)"
          >
            <span>🔍</span>
            <span style={{ fontSize: 12 }}>{currentLang === 'ur' ? 'تلاش...' : 'Search...'}</span>
            <kbd style={{ fontSize: 10, backgroundColor: '#E2E8F0', color: '#475569', padding: '1px 5px', borderRadius: 4, fontWeight: 700 }}>⌘K</kbd>
          </button>

          {/* 9-Dots All 15 Apps Launcher */}
          <AppsLauncherPopover
            isOpen={isAppsMenuOpen}
            onToggle={() => setIsAppsMenuOpen(!isAppsMenuOpen)}
            onClose={() => setIsAppsMenuOpen(false)}
            allApps={allApps}
            currentLang={currentLang}
            currentPath={router.pathname}
          />

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-only"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #D1D5DB',
              borderRadius: 8,
              padding: '6px 10px',
              backgroundColor: isMobileMenuOpen ? '#1B4332' : '#F9FAFB',
              color: isMobileMenuOpen ? '#FFFFFF' : '#374151',
              fontSize: 18,
              fontWeight: 700,
              cursor: 'pointer',
              minHeight: 38,
              minWidth: 42,
            }}
            aria-label="Toggle Mobile Navigation Menu"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* 3. RESPONSIVE MOBILE MENU ACCORDION */}
      <NavigationMobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        currentLang={currentLang}
        currentPath={router.pathname}
        ibadatItems={ibadatItems}
        ilmItems={ilmItems}
        ahkamItems={ahkamItems}
      />
    </header>
  );
};
