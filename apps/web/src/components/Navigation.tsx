import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AmalTheme } from '@amal/ui';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { AppsLauncherPopover } from './navigation/AppsLauncherPopover';
import { NavigationMobileMenu } from './navigation/NavigationMobileMenu';
import { NavigationUtilityRibbon } from './navigation/NavigationUtilityRibbon';
import { NavigationPillarsDesktop } from './navigation/NavigationPillarsDesktop';
import { useNavigationLiveStatus } from './navigation/useNavigationLiveStatus';
import { SavedBookmarksModal } from './navigation/SavedBookmarksModal';
import { AdabHotkeysGuideModal } from './AdabHotkeysGuideModal';
import { AmalLogo } from './icons/AmalLogo';
import { ibadatItems, ilmItems, familySistersItems, ahkamItems, allApps } from './navigation/navigation-items';

export const Navigation: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { language: currentLang, setLanguage: switchLanguage, t } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);
  const [isAppsMenuOpen, setIsAppsMenuOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isHotkeysOpen, setIsHotkeysOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { hijri, isOnline, nextPrayer } = useNavigationLiveStatus();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Global Scholar Adab Hotkeys Listener (?, Cmd+K, F)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select' || (e.target as HTMLElement)?.isContentEditable) {
        return;
      }

      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setIsHotkeysOpen((prev) => !prev);
      }

      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        router.push('/ask');
      }

      if (e.key === 'f' || e.key === 'F') {
        if (!e.metaKey && !e.ctrlKey && !e.altKey) {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen?.().catch(() => {});
          } else {
            document.exitFullscreen?.().catch(() => {});
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

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

  return (
    <header
      ref={dropdownRef}
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.94)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.22)',
        boxShadow: '0 4px 20px -2px rgba(6, 78, 59, 0.05)',
        marginBottom: 24,
        position: 'sticky',
        top: 0,
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
          maxWidth: 1380,
          margin: '0 auto',
          padding: '10px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
        }}
      >
        {/* Brand & Identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <AmalLogo size={38} variant="full" />
          </Link>

          <span
            className="desktop-only"
            style={{
              fontSize: 10,
              padding: '3px 8px',
              borderRadius: 12,
              backgroundColor: '#F0FDF4',
              color: '#065F46',
              fontWeight: 700,
              border: '1px solid #BBF7D0',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            <span style={{ color: '#059669', fontSize: 10 }}>✓</span>
            <span>{t('Ahl al-Sunnah', 'اہلِ سنت', 'أهل السنة', 'Ahl al-Sunnah')}</span>
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
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0 }}>
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
              gap: 6,
              border: '1px solid #E2E8F0',
              borderRadius: 8,
              padding: '6px 10px',
              backgroundColor: '#F8FAFC',
              color: '#64748B',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease',
            }}
            title={currentLang === 'ur' ? 'ہمہ جہت تلاش (Cmd+K)' : currentLang === 'roman' ? 'Instant Search (Cmd+K)' : 'Universal Instant Search (Cmd+K)'}
          >
            <span>🔍</span>
            <span style={{ fontSize: 12 }}>{currentLang === 'ur' ? 'تلاش' : currentLang === 'roman' ? 'Search' : 'Search'}</span>
            <kbd style={{ fontSize: 10, backgroundColor: '#E2E8F0', color: '#475569', padding: '1px 5px', borderRadius: 4, fontWeight: 700 }}>⌘K</kbd>
          </button>

          {/* Bookmarks & Reading History Quick Action */}
          <button
            onClick={() => setIsBookmarksOpen(true)}
            aria-label="Open Saved Bookmarks & History"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #E2E8F0',
              borderRadius: 8,
              padding: '6px 9px',
              backgroundColor: '#F8FAFC',
              color: '#1B4332',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease',
            }}
            title={currentLang === 'ur' ? 'محفوظ شدہ اسباق و نشانات' : currentLang === 'roman' ? 'Mehfoozat (Bookmarks)' : 'Saved Bookmarks & Reading History'}
          >
            <span>🔖</span>
          </button>

          {/* Voluntary Support Waqf Quick Action (Desktop) */}
          <button
            onClick={() => {
              if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('amal-open-waqf'));
            }}
            aria-label="Support Amal Sovereign Waqf"
            className="desktop-only"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              border: '1px solid rgba(212, 175, 55, 0.45)',
              borderRadius: 8,
              padding: '6px 10px',
              backgroundColor: 'rgba(217, 119, 6, 0.08)',
              color: '#92400E',
              fontSize: 12,
              fontWeight: 800,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease',
            }}
            title={t(
              'Support the Amal Sovereign Waqf (Perpetual Sadaqah Jariyah)',
              'وقفِ امل میں رضاکارانہ حصہ ملائیں (صدقۂ جاریہ)',
              'دعم وقف أمل السيادي (صدقة جارية)',
              'Support Amal Sovereign Waqf (Sadaqah Jariyah)'
            )}
          >
            <span style={{ fontSize: 13 }}>🤲</span>
            <span>{t('Support Waqf', 'وقف', 'الوقف', 'Waqf')}</span>
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

      {/* Global Saved Bookmarks & History Modal */}
      <SavedBookmarksModal
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
      />

      {/* Global Scholar Adab Hotkeys Modal */}
      <AdabHotkeysGuideModal
        isOpen={isHotkeysOpen}
        onClose={() => setIsHotkeysOpen(false)}
      />
    </header>
  );
};
