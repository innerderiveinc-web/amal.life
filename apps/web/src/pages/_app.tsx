import React, { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';
import { AudioPlayerProvider } from '../context/AudioPlayerContext';
import { AuthProvider } from '../context/AuthContext';
import { LanguageProvider, useLanguage } from '../context/LanguageContext';
import { ThemeProvider } from '../context/ThemeContext';
import { PersistentAudioPlayer } from '../components/PersistentAudioPlayer';
import { UniversalSearchModal } from '../components/UniversalSearchModal';
import { ReaderSettingsModal } from '../components/ReaderSettingsModal';
import { SacredThemeModal } from '../components/SacredThemeModal';
import { OnboardingWizardModal } from '../components/OnboardingWizardModal';
import { BookmarksQuickDrawer } from '../components/BookmarksQuickDrawer';
import { AuthModal } from '../components/AuthModal';
import { PWAInstallModal } from '../components/PWAInstallModal';
import { PWAUpdateBanner } from '../components/PWAUpdateBanner';
import { SupportWaqfModal } from '../components/waqf/SupportWaqfModal';
import { Footer } from '../components/Footer';
import { ToastContainer } from '../components/Toast';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { enablePersistentStorage, checkStorageHealth } from '../lib/storage-guard';
import { showAmalToast } from '../components/Toast';
import { GlobalCrashGuardErrorBoundary } from '../components/GlobalCrashGuardErrorBoundary';

// In-memory fallback if localStorage is sandboxed under file:/// protocol in mobile WebView
if (typeof window !== 'undefined') {
  try {
    const _test = '__amal_storage_probe__';
    window.localStorage.setItem(_test, _test);
    window.localStorage.removeItem(_test);
  } catch (e) {
    console.warn('[AMAL StorageGuard] localStorage restricted by host environment. Initializing resilient in-memory storage fallback.');
    const _memStore: Record<string, string> = {};
    try {
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: (key: string) => _memStore[key] ?? null,
          setItem: (key: string, val: string) => { _memStore[key] = String(val); },
          removeItem: (key: string) => { delete _memStore[key]; },
          clear: () => { Object.keys(_memStore).forEach(k => delete _memStore[k]); },
          get length() { return Object.keys(_memStore).length; },
          key: (i: number) => Object.keys(_memStore)[i] ?? null,
        },
        writable: true,
        configurable: true,
      });
    } catch (_) {}
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isReaderSettingsOpen, setIsReaderSettingsOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isInstallOpen, setIsInstallOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isTahajjudMode, setIsTahajjudMode] = useState(false);
  const [isWaqfOpen, setIsWaqfOpen] = useState(false);

  useEffect(() => {
    try {
      // 1. Restore Tahajjud theme preference
      const savedTahajjud = localStorage.getItem('amal_tahajjud_mode');
      if (savedTahajjud === 'true') {
        setIsTahajjudMode(true);
        document.body.classList.add('theme-tahajjud');
      }

      // 1.1 Restore High Contrast preference
      const savedHighContrast = localStorage.getItem('amal_high_contrast');
      if (savedHighContrast === 'true') {
        document.body.classList.add('high-contrast');
      }
    } catch (e) {
      console.warn('LocalStorage access in _app mount:', e);
    }

    // PWA Install Prompt Handlers
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      window.deferredPrompt = e as BeforeInstallPromptEvent;
      window.dispatchEvent(new CustomEvent('amal-pwa-installable'));
    };

    const handleAppInstalled = () => {
      window.deferredPrompt = null;
      window.dispatchEvent(new CustomEvent('amal-pwa-installed'));
    };

    // Register Service Worker with intelligent update detection
    const registerSW = () => {
      if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
        // In local development, avoid stale service worker caches on localhost
        if (
          process.env.NODE_ENV === 'development' ||
          window.location.hostname === 'localhost' ||
          window.location.hostname === '127.0.0.1'
        ) {
          navigator.serviceWorker.getRegistrations().then((regs) => {
            for (const r of regs) {
              r.unregister();
            }
          });
          if ('caches' in window) {
            caches.keys().then((names) => {
              for (const name of names) {
                if (name.startsWith('amal-os-cache')) {
                  caches.delete(name);
                }
              }
            });
          }
          return;
        }

        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => {
            reg.onupdatefound = () => {
              const installingWorker = reg.installing;
              if (installingWorker) {
                installingWorker.onstatechange = () => {
                  if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    const isUrdu = localStorage.getItem('amal_app_language') === 'ur';
                    showAmalToast(
                      isUrdu
                        ? 'نیا ورژن دستیاب ہے! ایپ خودکار طور پر اپڈیٹ ہو گئی ہے۔'
                        : 'New version available! App updated automatically.',
                      'info'
                    );
                  }
                };
              }
            };
          })
          .catch(() => {});
      }
    };

    // Register Service Worker for offline PWA & Request Persistent Storage Protection
    if (typeof window !== 'undefined') {
      enablePersistentStorage();

      // Proactive Spiritual Backup Sentinel (Guards against iOS Safari 7-day ITP cache eviction)
      setTimeout(async () => {
        try {
          const health = await checkStorageHealth();
          if (health.shouldPromptBackup) {
            const lang = localStorage.getItem('amal_app_language') || 'ur';
            const msg = lang === 'ur'
              ? 'روحانی ڈیٹا کی حفاظت: آپ کے اعمال و نوٹس محفوظ ہیں۔ ترتیبات میں جا کر بیک اپ برآمد کر لیں تاکہ براؤزر کیش صاف ہونے سے ڈیٹا محفوظ رہے۔'
              : lang === 'ar'
              ? 'حماية البيانات: سجلاتك وملاحظاتك محفوظة. يمكنك تصدير نسخة احتياطية من الإعدادات.'
              : lang === 'ru'
              ? 'Data Protection: Aapke aamal aur notes mehfooz hain. Settings me ja kar backup export kar lein.'
              : 'Data Protection: Your personal notes and habits are safely stored. Consider exporting a backup in Settings.';
            showAmalToast(msg, 'info');
          }
        } catch {}
      }, 5000);

      if (document.readyState === 'complete') {
        registerSW();
      } else {
        window.addEventListener('load', registerSW);
      }

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.addEventListener('appinstalled', handleAppInstalled);
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
    const handleOpenInstall = () => setIsInstallOpen(true);
    const handleOpenTheme = () => setIsThemeOpen(true);
    const handleOpenWaqf = () => setIsWaqfOpen(true);
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
    window.addEventListener('amal-open-install', handleOpenInstall);
    window.addEventListener('amal-open-theme', handleOpenTheme);
    window.addEventListener('amal-open-waqf', handleOpenWaqf);
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
      window.removeEventListener('amal-open-install', handleOpenInstall);
      window.removeEventListener('amal-open-theme', handleOpenTheme);
      window.removeEventListener('amal-open-waqf', handleOpenWaqf);
      window.removeEventListener('amal-toggle-tahajjud', handleToggleTahajjud);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('load', registerSW);
    };
  }, []);

  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <AudioPlayerProvider>
          <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        </Head>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          {/* WCAG 2.1 AAA Accessibility: Skip to Main Content Link */}
          <a href="#main-content" className="amal-skip-link">
            Skip to main content · براہِ راست مواد پر جائیں
          </a>

          <div id="main-content" style={{ flex: 1 }} tabIndex={-1}>
            <GlobalCrashGuardErrorBoundary>
              <Component {...pageProps} />
            </GlobalCrashGuardErrorBoundary>
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

          {/* Global PWA Home Screen Install Modal */}
          <PWAInstallModal isOpen={isInstallOpen} onClose={() => setIsInstallOpen(false)} />

          {/* Global Sacred Cultural Themes Modal */}
          <SacredThemeModal isOpen={isThemeOpen} onClose={() => setIsThemeOpen(false)} />

          {/* Global Voluntary Sovereign Waqf & Patron Modal */}
          <SupportWaqfModal isOpen={isWaqfOpen} onClose={() => setIsWaqfOpen(false)} />

          {/* Floating Quick Bookmark Tab (Right Screen Edge) */}
          <FloatingBookmarkTab onOpen={() => setIsBookmarksOpen(true)} />

          {/* Global Non-Intrusive Toast Feedback */}
          <ToastContainer />

          {/* Mobile Thumb-Zone Navigation Dock */}
          <MobileBottomNav />

          {/* PWA Auto-Update Notification Banner */}
          <PWAUpdateBanner />
        </div>
      </AudioPlayerProvider>
    </AuthProvider>
    </ThemeProvider>
  </LanguageProvider>
);
}

function FloatingBookmarkTab({ onOpen }: { onOpen: () => void }) {
  const { t } = useLanguage();
  return (
    <button
      onClick={onOpen}
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
      title={t('Open Saved Duas (Cmd+B)', 'محفوظ دعائیں کھولیں (Cmd+B)')}
    >
      <span>⭐</span>
      <span>{t('Saved Duas', 'محفوظ دعائیں')}</span>
    </button>
  );
}
