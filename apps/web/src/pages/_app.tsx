import React, { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { AudioPlayerProvider } from '../context/AudioPlayerContext';
import { AuthProvider } from '../context/AuthContext';
import { PersistentAudioPlayer } from '../components/PersistentAudioPlayer';
import { UniversalSearchModal } from '../components/UniversalSearchModal';
import { ReaderSettingsModal } from '../components/ReaderSettingsModal';
import { OnboardingWizardModal } from '../components/OnboardingWizardModal';
import { BookmarksQuickDrawer } from '../components/BookmarksQuickDrawer';
import { AuthModal } from '../components/AuthModal';
import { Footer } from '../components/Footer';
import { ToastContainer } from '../components/Toast';
import { MobileBottomNav } from '../components/MobileBottomNav';

export default function App({ Component, pageProps }: AppProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isReaderSettingsOpen, setIsReaderSettingsOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isTahajjudMode, setIsTahajjudMode] = useState(false);

  useEffect(() => {
    // 1. Restore Tahajjud theme preference
    const savedTahajjud = localStorage.getItem('amal_tahajjud_mode');
    if (savedTahajjud === 'true') {
      setIsTahajjudMode(true);
      document.body.classList.add('theme-tahajjud');
    }

    // Register Service Worker for offline PWA
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {});
      });
    }

    // 2. Global Keyboard shortcuts:
    // Cmd+K: Search
    // Cmd+B: Bookmarks Drawer
    // Escape: Close all modals
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        setIsBookmarksOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsReaderSettingsOpen(false);
        setIsOnboardingOpen(false);
        setIsBookmarksOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    const handleOpenSearch = () => setIsSearchOpen(true);
    const handleOpenReader = () => setIsReaderSettingsOpen(true);
    const handleOpenOnboarding = () => setIsOnboardingOpen(true);
    const handleOpenBookmarks = () => setIsBookmarksOpen(true);
    const handleOpenAuth = () => setIsAuthOpen(true);
    const handleToggleTahajjud = () => {
      setIsTahajjudMode((prev) => {
        const next = !prev;
        if (next) {
          document.body.classList.add('theme-tahajjud');
        } else {
          document.body.classList.remove('theme-tahajjud');
        }
        localStorage.setItem('amal_tahajjud_mode', next ? 'true' : 'false');
        return next;
      });
    };

    window.addEventListener('amal-open-search', handleOpenSearch);
    window.addEventListener('amal-open-reader', handleOpenReader);
    window.addEventListener('amal-open-onboarding', handleOpenOnboarding);
    window.addEventListener('amal-open-bookmarks', handleOpenBookmarks);
    window.addEventListener('amal-open-auth', handleOpenAuth);
    window.addEventListener('amal-toggle-tahajjud', handleToggleTahajjud);

    // 4. Auto-show gentle onboarding if first time visit
    const onboardingDone = localStorage.getItem('amal_onboarding_done');
    if (!onboardingDone) {
      setIsOnboardingOpen(true);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('amal-open-search', handleOpenSearch);
      window.removeEventListener('amal-open-reader', handleOpenReader);
      window.removeEventListener('amal-open-onboarding', handleOpenOnboarding);
      window.removeEventListener('amal-open-bookmarks', handleOpenBookmarks);
      window.removeEventListener('amal-open-auth', handleOpenAuth);
      window.removeEventListener('amal-toggle-tahajjud', handleToggleTahajjud);
    };
  }, []);

  return (
    <AuthProvider>
      <AudioPlayerProvider>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1 }}>
            <Component {...pageProps} />
          </div>

          {/* Global Authoritative Islamic OS Footer */}
          <Footer />

          {/* Global Persistent Background Audio Player */}
          <PersistentAudioPlayer />

          {/* Global Universal Instant Search (Cmd+K) */}
          <UniversalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

          {/* Global Senior & Quran Reader Settings Modal */}
          <ReaderSettingsModal isOpen={isReaderSettingsOpen} onClose={() => setIsReaderSettingsOpen(false)} />

          {/* Global 30-Second Gentle Onboarding Wizard */}
          <OnboardingWizardModal isOpen={isOnboardingOpen} onClose={() => setIsOnboardingOpen(false)} />

          {/* Global Masnoon Duas & Adhkar Quick Drawer (Cmd+B) */}
          <BookmarksQuickDrawer isOpen={isBookmarksOpen} onClose={() => setIsBookmarksOpen(false)} />

          {/* Global Account & Cloud Sync Modal */}
          <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

          {/* Floating Quick Bookmark Tab (Right Screen Edge) */}
          <button
            onClick={() => setIsBookmarksOpen(true)}
            className="desktop-only"
            style={{
              position: 'fixed',
              right: 0,
              top: '42%',
              transform: 'translateY(-50%)',
              zIndex: 900,
              backgroundColor: '#064E3B',
              color: '#FFFFFF',
              border: 'none',
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              padding: '12px 9px',
              cursor: 'pointer',
              boxShadow: '-3px 4px 14px rgba(0, 0, 0, 0.18)',
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
            title="محفوظ دعائیں کھولیں (Cmd+B)"
          >
            <span>⭐</span>
            <span>محفوظ دعائیں</span>
          </button>

          {/* Global Non-Intrusive Toast Feedback */}
          <ToastContainer />

          {/* Mobile Thumb-Zone Navigation Dock */}
          <MobileBottomNav />
        </div>
      </AudioPlayerProvider>
    </AuthProvider>
  );
}
