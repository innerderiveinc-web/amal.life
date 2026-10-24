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
import { useLanguage } from '../context/LanguageContext';
import { AppsLauncherPopover } from './navigation/AppsLauncherPopover';
import { NavigationMobileMenu } from './navigation/NavigationMobileMenu';
import { NavigationUtilityRibbon } from './navigation/NavigationUtilityRibbon';
import { NavigationPillarsDesktop } from './navigation/NavigationPillarsDesktop';
import { ibadatItems, ilmItems, familySistersItems, ahkamItems, allApps } from './navigation/navigation-items';

export const Navigation: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { language: currentLang, setLanguage: switchLanguage } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);
  const [isAppsMenuOpen, setIsAppsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  return (
    <header
      ref={dropdownRef}
      style={{
        backgroundColor: '#FFFFFF',
        borderBottom: `1px solid ${AmalTheme.colors.surface.borderLight}`,
        marginBottom: 24,
        position: 'relative',
        zIndex: 1000,
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* 1. TOP UTILITY & LIVE CONTEXT RIBBON */}
      <NavigationUtilityRibbon
        isOnline={isOnline}
        isMounted={isMounted}
        hijri={hijri}
        nextPrayer={nextPrayer}
        currentLang={currentLang}
        user={user}
        currentPath={router.pathname}
        switchLanguage={switchLanguage}
      />

      {/* 2. MAIN NAVIGATION BAR */}
      <nav
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: '12px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
        }}
      >
        {/* Brand & Identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
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
              }}
            >
              🧭
            </div>
            <div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 900,
                  color: '#064E3B',
                  letterSpacing: 0.5,
                  lineHeight: 1.1,
                }}
              >
                AMAL OS
              </div>
              <div style={{ fontSize: 9, color: '#64748B', fontWeight: 700, letterSpacing: 0.4, display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ textTransform: 'uppercase' }}>Deen &amp; Life OS</span>
                <span style={{ color: '#059669', fontWeight: 800 }}>· by Qsura</span>
              </div>
            </div>
          </Link>

          <span
            className="desktop-only"
            style={{
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
            }}
          >
            <span style={{ color: '#059669', fontSize: 10 }}>✓</span>
            <span>Ahl al-Sunnah</span>
          </span>
        </div>

        {/* Primary 4 Sacred Pillars (Desktop Navigation) */}
        <NavigationPillarsDesktop
          currentLang={currentLang}
          currentPath={router.pathname}
          asPath={router.asPath}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
        />

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
        familySistersItems={familySistersItems}
        ahkamItems={ahkamItems}
      />
    </header>
  );
};
