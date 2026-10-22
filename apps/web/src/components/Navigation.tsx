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

export const Navigation: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [currentLang, setCurrentLang] = useState<'en' | 'ur' | 'ar'>('en');
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

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 60000);
    const handleConfigChange = () => setPrayerConfigKey((k) => k + 1);
    window.addEventListener('amal_prayer_settings_changed', handleConfigChange);
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
      {/* 1. TOP UTILITY & LIVE CONTEXT RIBBON */}
      <div style={{
        backgroundColor: '#0F291E',
        color: '#D1D5DB',
        padding: '6px 24px',
        fontSize: 11,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 8,
      }}>
        {/* Left: Live Hijri Date & Prayer Countdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: '#86EFAC' }}>🌙</span>
            <span style={{ fontWeight: 700, color: '#F3F4F6' }}>
              {hijri.day} {currentLang === 'ur' ? hijri.monthNameUrdu : hijri.monthNameEnglish} {hijri.year} AH
            </span>
          </div>

          <Link href="/prayer" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, color: '#A7F3D0' }}>
            <span>🕌</span>
            <span>
              {nextPrayer ? (
                <>
                  {currentLang === 'ur'
                    ? `اگلی نماز: ${nextPrayer.nameUrdu}`
                    : `Next Salah: ${nextPrayer.nameEnglish}`}{' '}
                  <strong>{nextPrayer.time}</strong>{' '}
                  <span style={{ fontSize: 10, opacity: 0.9, fontWeight: 600, color: '#6EE7B7' }}>
                    ({currentLang === 'ur' ? nextPrayer.formattedCountdownUrdu : nextPrayer.formattedCountdownEnglish})
                  </span>
                </>
              ) : (
                <span>{currentLang === 'ur' ? 'اوقاتِ نماز' : 'Prayer Times'}</span>
              )}
            </span>
          </Link>

          <span style={{ color: '#6EE7B7', fontSize: 10, backgroundColor: 'rgba(52, 211, 153, 0.15)', padding: '1px 6px', borderRadius: 4, fontWeight: 700 }}>
            Hanafi Mislayn 2x
          </span>
        </div>

        {/* Right: Offline Status Pill, Tahajjud Mode, Bookmarks & Language Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* 1. Offline Mode Indicator Pill */}
          <span
            title="Core calculation engines (Prayer times, Hijri calendar, Zakat, Miras) run locally on your device"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              color: '#34D399',
              fontSize: 10,
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: 12,
              border: '1px solid rgba(52, 211, 153, 0.3)',
              cursor: 'default',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }} />
            <span>Local Device Mode</span>
          </span>

          {/* 2. Tahajjud Night Serenity Mode Toggle */}
          <button
            onClick={() => {
              if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('amal-toggle-tahajjud'));
            }}
            style={{
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: 12,
              padding: '2px 8px',
              fontSize: 10,
              fontWeight: 700,
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              color: '#A7F3D0',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
            title="Toggle Tahajjud & Night Serenity OLED Dark Mode"
          >
            <span>🌙</span>
            <span>تہجد موڈ</span>
          </button>

          {/* 3. Masnoon Duas & Bookmarks Drawer Button */}
          <button
            onClick={() => {
              if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('amal-open-bookmarks'));
            }}
            style={{
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: 12,
              padding: '2px 8px',
              fontSize: 10,
              fontWeight: 700,
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              color: '#FDE68A',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
            title="Open Saved Bookmarks & Duas (Cmd+B)"
          >
            <span>⭐</span>
            <span>محفوظ دعائیں</span>
          </button>

          {/* 4. Sovereign Account & Sign In / Cloud Sync Button */}
          <button
            onClick={() => {
              if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('amal-open-auth'));
            }}
            style={{
              border: user && !user.isGuest ? '1px solid #34D399' : '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 12,
              padding: '2px 9px',
              fontSize: 10,
              fontWeight: 700,
              backgroundColor: user && !user.isGuest ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 255, 255, 0.08)',
              color: user && !user.isGuest ? '#A7F3D0' : '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
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

          {/* 5. System Settings Control Center Link */}
          <Link
            href="/settings"
            style={{
              textDecoration: 'none',
              border: router.pathname === '/settings' ? '1px solid #34D399' : '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 12,
              padding: '2px 8px',
              fontSize: 10,
              fontWeight: 700,
              backgroundColor: router.pathname === '/settings' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 255, 255, 0.08)',
              color: router.pathname === '/settings' ? '#A7F3D0' : '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
            title="AMAL OS System Settings & Control Center"
          >
            <span>⚙️</span>
            <span>{currentLang === 'ur' ? 'ترتیبات' : 'Settings'}</span>
          </Link>

          {/* 6. Language Selector */}
          <div style={{ display: 'flex', gap: 2, backgroundColor: 'rgba(255,255,255,0.1)', padding: '2px', borderRadius: 4 }}>
            {(['en', 'ur', 'ar'] as const).map((l) => (
              <button
                key={l}
                onClick={() => switchLanguage(l)}
                style={{
                  border: 'none',
                  borderRadius: 3,
                  padding: '2px 6px',
                  fontSize: 10,
                  fontWeight: currentLang === l ? 700 : 500,
                  backgroundColor: currentLang === l ? '#10B981' : 'transparent',
                  color: currentLang === l ? '#064E3B' : '#D1D5DB',
                  cursor: 'pointer',
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 24 }}>🧭</span>
            <div>
              <div style={{
                fontSize: 20,
                fontWeight: 900,
                color: AmalTheme.colors.primary,
                letterSpacing: 0.5,
                lineHeight: 1,
              }}>
                AMAL OS
              </div>
              <span style={{ fontSize: 10, color: '#6B7280', fontWeight: 600, letterSpacing: 0.5 }}>
                DEEN & LIFE INTELLIGENCE
              </span>
            </div>
          </Link>

          <span className="desktop-only" style={{
            fontSize: 10,
            padding: '3px 10px',
            borderRadius: 14,
            backgroundColor: '#F0FDF4',
            color: '#065F46',
            fontWeight: 700,
            border: '1px solid #86EFAC',
            display: 'flex',
            alignItems: 'center',
            gap: 5,
          }}>
            <span style={{ color: '#059669', fontSize: 11 }}>✓</span>
            <span>Ahl al-Sunnah Verified</span>
          </span>
        </div>

        {/* Primary Hubs (Desktop) */}
        <div className="desktop-only" style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <Link
            href="/"
            style={{
              textDecoration: 'none',
              fontSize: 13,
              fontWeight: router.pathname === '/' ? 700 : 600,
              color: router.pathname === '/' ? AmalTheme.colors.primary : '#374151',
              padding: '6px 10px',
              borderRadius: 6,
              backgroundColor: router.pathname === '/' ? '#F0FDF4' : 'transparent',
            }}
          >
            {currentLang === 'ur' ? '🌅 آج (Today)' : '🌅 Today'}
          </Link>

          {/* Direct Premier Hub: Al-Quran & Wisdom */}
          <Link
            href="/quran"
            style={{
              textDecoration: 'none',
              fontSize: 13,
              fontWeight: router.pathname === '/quran' ? 700 : 600,
              color: router.pathname === '/quran' ? '#065F46' : '#15803D',
              padding: '6px 12px',
              borderRadius: 6,
              backgroundColor: router.pathname === '/quran' ? '#DCFCE7' : '#F0FDF4',
              border: `1px solid ${router.pathname === '/quran' ? '#86EFAC' : '#BBF7D0'}`,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span>📖</span>
            <span>{currentLang === 'ur' ? 'قرآن و حکمت' : 'Quran & Wisdom'}</span>
            <span style={{ fontSize: 9, backgroundColor: '#16A34A', color: '#FFFFFF', padding: '1px 5px', borderRadius: 4, fontWeight: 700 }}>
              Kanz-ul-Iman
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
              }}
            >
              <span>⚖️ {currentLang === 'ur' ? 'احکام و مالیات' : 'Ahkam & Finance'}</span>
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
            }}
          >
            {currentLang === 'ur' ? '🕌 تعارف' : '🕌 About'}
          </Link>
        </div>

        {/* Right Tools & 9-Dots App Launcher */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {/* 9-Dots All 15 Apps Launcher */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsAppsMenuOpen(!isAppsMenuOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                border: '1px solid #D1D5DB',
                borderRadius: 8,
                padding: '5px 10px',
                backgroundColor: isAppsMenuOpen ? '#1B4332' : '#F9FAFB',
                color: isAppsMenuOpen ? '#FFFFFF' : '#374151',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
              }}
              title="All 15 AMAL OS Applications"
            >
              <span>⠿</span>
              <span>{currentLang === 'ur' ? 'تمام ماڈیولز' : 'All 15 Apps'}</span>
            </button>

            {/* 9-Dots Popover Grid */}
            {isAppsMenuOpen && (
              <div style={{
                position: 'absolute',
                top: '115%',
                right: 0,
                backgroundColor: '#FFFFFF',
                borderRadius: 14,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.08)',
                border: '1px solid #E5E7EB',
                width: 'min(380px, calc(100vw - 32px))',
                padding: 16,
                zIndex: 1200,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #F3F4F6' }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: '#111827' }}>
                    AMAL OS SUITE (15 MODULES)
                  </span>
                  <span style={{ fontSize: 11, color: '#047857', fontWeight: 600 }}>Local Offline Engines</span>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 10,
                }}>
                  {allApps.map((app) => (
                    <Link
                      key={app.href}
                      href={app.href}
                      onClick={() => setIsAppsMenuOpen(false)}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        padding: '10px 6px',
                        borderRadius: 8,
                        textDecoration: 'none',
                        backgroundColor: router.pathname === app.href ? '#ECFDF5' : '#F9FAFB',
                        border: `1px solid ${router.pathname === app.href ? '#A7F3D0' : '#F3F4F6'}`,
                      }}
                    >
                      <span style={{ fontSize: 22, marginBottom: 4 }}>{app.icon}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#1F2937', lineHeight: 1.2 }}>
                        {currentLang === 'ur' ? app.titleUrdu : app.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Action: Search (Cmd+K) - Desktop */}
          <button
            onClick={() => {
              if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('amal-open-search'));
            }}
            className="desktop-only"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              border: '1px solid #D1D5DB',
              borderRadius: 6,
              padding: '5px 9px',
              backgroundColor: '#F8FAFC',
              color: '#334155',
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer',
            }}
            title="Universal Instant Search (Cmd+K)"
          >
            <span>🔍</span>
            <kbd style={{ fontSize: 10, backgroundColor: '#E2E8F0', padding: '1px 4px', borderRadius: 3 }}>⌘K</kbd>
          </button>

          {/* Quick Action: Reader Settings - Desktop */}
          <button
            onClick={() => {
              if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('amal-open-reader'));
            }}
            className="desktop-only"
            style={{
              border: '1px solid #D1D5DB',
              borderRadius: 6,
              padding: '5px 8px',
              backgroundColor: '#F8FAFC',
              color: '#334155',
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer',
            }}
            title="Senior & Quran Reading Comfort Mode"
          >
            👓
          </button>

          {/* Quick Action: Onboarding Wizard - Desktop */}
          <button
            onClick={() => {
              if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('amal-open-onboarding'));
            }}
            className="desktop-only"
            style={{
              border: '1px solid #D1D5DB',
              borderRadius: 6,
              padding: '5px 8px',
              backgroundColor: '#F8FAFC',
              color: '#334155',
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer',
            }}
            title="Deeni Safar Setup Wizard"
          >
            🧭
          </button>

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
      {isMobileMenuOpen && (
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
            {/* Premier Quran Link (Mobile) */}
            <Link
              href="/quran"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: 10,
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 800,
                backgroundColor: router.pathname === '/quran' ? '#DCFCE7' : '#F0FDF4',
                color: '#166534',
                border: '1px solid #86EFAC',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 18 }}>📖</span>
                <span>{currentLang === 'ur' ? 'قرآنِ کریم، حکمت و تدبر' : 'Al-Quran & Wisdom'}</span>
              </div>
              <span style={{ fontSize: 10, backgroundColor: '#16A34A', color: '#FFFFFF', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>
                Kanz-ul-Iman
              </span>
            </Link>

            {/* Primary Navigation Links */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 12px',
                  borderRadius: 8,
                  textDecoration: 'none',
                  fontSize: 13,
                  fontWeight: 700,
                  backgroundColor: router.pathname === '/' ? '#ECFDF5' : '#F9FAFB',
                  color: router.pathname === '/' ? '#065F46' : '#374151',
                  border: `1px solid ${router.pathname === '/' ? '#A7F3D0' : '#E5E7EB'}`,
                }}
              >
                <span>🌅</span>
                <span>{currentLang === 'ur' ? 'آج (Today)' : 'Today'}</span>
              </Link>

              <Link
                href="/settings"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 12px',
                  borderRadius: 8,
                  textDecoration: 'none',
                  fontSize: 13,
                  fontWeight: 700,
                  backgroundColor: router.pathname === '/settings' ? '#ECFDF5' : '#F9FAFB',
                  color: router.pathname === '/settings' ? '#065F46' : '#374151',
                  border: `1px solid ${router.pathname === '/settings' ? '#A7F3D0' : '#E5E7EB'}`,
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
                    onClick={() => setIsMobileMenuOpen(false)}
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
                      color: router.pathname === item.href ? '#065F46' : '#374151',
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
                    onClick={() => setIsMobileMenuOpen(false)}
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
                      color: router.pathname === item.href ? '#0369A1' : '#374151',
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

            {/* Hub 3: Ahkam & Finance */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#D97706', textTransform: 'uppercase', marginBottom: 6, letterSpacing: 0.5 }}>
                ⚖️ {currentLang === 'ur' ? 'احکام و مالیات' : 'Ahkam & Finance'}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                {ahkamItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
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
                      color: router.pathname === item.href ? '#B45309' : '#374151',
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
                onClick={() => setIsMobileMenuOpen(false)}
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
                onClick={() => setIsMobileMenuOpen(false)}
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
      )}
    </header>
  );
};
