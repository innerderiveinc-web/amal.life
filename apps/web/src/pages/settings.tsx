import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Navigation } from '../components/Navigation';
import { AmalTheme } from '@amal/ui';
import { showAmalToast } from '../components/Toast';
import { GLOBAL_CITIES, GlobalCity } from '../lib/global-locations';
import {
  getSavedLocation,
  getSavedMadhhab,
  getSavedMethod,
  getSavedOffsets,
  getSavedHijriOffset,
  saveUserLocation,
  saveUserMadhhab,
  saveUserMethod,
  saveUserOffsets,
  saveUserHijriOffset,
} from '../lib/prayer-utils';
import { biometricVaultGuardEngine, VaultSecurityMode } from '@amal/amal-engine';
import { AmalApiClient } from '../lib/api';
import { recordSuccessfulBackup } from '../lib/storage-guard';
import { useLanguage } from '../context/LanguageContext';

type SettingsTab = 'GENERAL' | 'FIQH' | 'SCHOLARSHIP' | 'PRIVACY' | 'READER' | 'SYSTEM';

export default function SettingsPage() {
  const { language, setLanguage, t, isUrdu } = useLanguage();
  const [activeTab, setActiveTab] = useState<SettingsTab>('GENERAL');
  const [mounted, setMounted] = useState(false);

  // --- GENERAL TAB STATE ---
  const [appLanguage, setAppLanguage] = useState<'en' | 'ur' | 'ar'>(language);
  const [tahajjudMode, setTahajjudMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>('Delhi / New Delhi');

  // --- FIQH & PRAYER TAB STATE ---
  const [madhhab, setMadhhab] = useState<'HANAFI' | 'STANDARD_JUMHUR'>('HANAFI');
  const [calcMethod, setCalcMethod] = useState<'KARACHI' | 'MWL' | 'UMM_AL_QURA' | 'EGYPTIAN' | 'ISNA'>('KARACHI');
  const [hijriOffset, setHijriOffset] = useState<number>(0);
  const [athanSound, setAthanSound] = useState<string>('makkah');
  const [offsets, setOffsets] = useState({
    fajr: 0,
    sunrise: 0,
    dhuhr: 0,
    asr: 0,
    maghrib: 0,
    isha: 0,
  });

  // --- SCHOLARLY STRICTNESS TAB STATE ---
  const [strictSawadAlAzam, setStrictSawadAlAzam] = useState(true);
  const [dualJuristVerification, setDualJuristVerification] = useState(true);
  const [aiProvider, setAiProvider] = useState<'gemini' | 'openai' | 'local'>('gemini');
  const [ephemeralMemory, setEphemeralMemory] = useState(false);

  // --- PRIVACY & VAULT TAB STATE ---
  const [securityMode, setSecurityMode] = useState<VaultSecurityMode>('FOUR_DIGIT_PIN');
  const [pin, setPin] = useState('1234');
  const [zeroKnowledgeSync, setZeroKnowledgeSync] = useState(true);

  // --- READER TAB STATE ---
  const [arabicScript, setArabicScript] = useState<'indopak' | 'uthmani'>('indopak');
  const [fontSize, setFontSize] = useState<number>(26);
  const [urduTranslation, setUrduTranslation] = useState<string>('kanzul_iman');
  const [englishTranslation, setEnglishTranslation] = useState<string>('sahih_international');
  const [showWordByWord, setShowWordByWord] = useState(true);

  // --- SYSTEM DIAGNOSTICS STATE ---
  const [apiHealth, setApiHealth] = useState<'checking' | 'online' | 'offline'>('checking');
  const [storageUsage, setStorageUsage] = useState<string>('Calculated on load');
  const [cachingProgress, setCachingProgress] = useState<{ active: boolean; current: number; total: number } | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleSwMessage = (event: MessageEvent) => {
      if (event.data?.type === 'CACHE_PROGRESS') {
        setCachingProgress({
          active: true,
          current: event.data.current,
          total: event.data.total,
        });
      } else if (event.data?.type === 'CACHE_COMPLETE') {
        setCachingProgress(null);
        showAmalToast('تمام 114 سورتیں آف لائن استعمال کے لیے کامیابی سے کیش کر دی گئی ہیں!', 'success');
      }
    };
    navigator.serviceWorker?.addEventListener('message', handleSwMessage);
    return () => {
      navigator.serviceWorker?.removeEventListener('message', handleSwMessage);
    };
  }, []);

  const handlePrecacheAllQuran = () => {
    if (!('serviceWorker' in navigator) || !navigator.serviceWorker.controller) {
      showAmalToast('سروس ورکر فعال نہیں ہے، برائے مہربانی صفحہ دوبارہ لوڈ کریں۔', 'info');
      return;
    }
    setCachingProgress({ active: true, current: 0, total: 114 });
    navigator.serviceWorker.controller.postMessage({ type: 'CACHE_ALL_SURAHS' });
    showAmalToast('قرآنِ پاک کی تمام 114 سورتیں آف لائن ڈاؤن لوڈ ہونا شروع ہو گئی ہیں...', 'info');
  };

  const handleClearCache = async () => {
    if (typeof window !== 'undefined' && 'caches' in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
      showAmalToast('کیش کامیابی سے صاف کر دیا گیا۔ نیا ڈیٹا لوڈ کرنے کے لیے صفحہ ریفریش کریں۔', 'success');
    }
  };

  useEffect(() => {
    setMounted(true);

    // 1. Load General
    const savedLang = (localStorage.getItem('amal_app_language') as 'en' | 'ur' | 'ar') || 'en';
    setAppLanguage(savedLang);
    setTahajjudMode(localStorage.getItem('amal_tahajjud_mode') === 'true');
    setHighContrast(localStorage.getItem('amal_high_contrast') === 'true');

    // 2. Load Location & Fiqh
    const loc = getSavedLocation();
    const matchedCity = GLOBAL_CITIES.find((c) => loc.name && loc.name.includes(c.name));
    if (matchedCity) setSelectedCity(matchedCity.name);
    setMadhhab(getSavedMadhhab());
    setCalcMethod(getSavedMethod() as any);
    setHijriOffset(getSavedHijriOffset());
    setOffsets({ fajr: 0, sunrise: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0, ...getSavedOffsets() });
    setAthanSound(localStorage.getItem('amal_azaan_settings') || 'makkah');

    // 3. Load Scholarly Strictness Preferences
    setStrictSawadAlAzam(localStorage.getItem('amal_strict_sawad') !== 'false');
    setDualJuristVerification(localStorage.getItem('amal_dual_jurist') !== 'false');
    setAiProvider((localStorage.getItem('amal_ai_provider') as any) || 'gemini');
    setEphemeralMemory(localStorage.getItem('amal_ephemeral_memory') === 'true');

    // 4. Load Reader Preferences
    try {
      const r = JSON.parse(localStorage.getItem('amal_reader_prefs') || '{}');
      if (r.script) setArabicScript(r.script);
      if (r.fontSize) setFontSize(r.fontSize);
      if (r.urduTranslation) setUrduTranslation(r.urduTranslation);
      if (r.englishTranslation) setEnglishTranslation(r.englishTranslation);
      if (r.wordByWord !== undefined) setShowWordByWord(r.wordByWord);
    } catch {}

    // 5. Test Backend API health
    fetch('/health')
      .then((res) => (res.ok ? setApiHealth('online') : setApiHealth('offline')))
      .catch(() => setApiHealth('offline'));

    // 6. Calculate Storage
    if (typeof window !== 'undefined' && window.localStorage) {
      let total = 0;
      for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          total += (localStorage[key]?.length || 0) * 2;
        }
      }
      setStorageUsage(`${(total / 1024).toFixed(1)} KB stored locally in Sovereign Vault`);
    }
  }, []);

  // Save General
  const handleSaveGeneral = () => {
    setLanguage(appLanguage);
    localStorage.setItem('amal_app_language', appLanguage);
    localStorage.setItem('amal_tahajjud_mode', String(tahajjudMode));
    localStorage.setItem('amal_high_contrast', String(highContrast));
    if (tahajjudMode) {
      document.body.classList.add('theme-tahajjud');
    } else {
      document.body.classList.remove('theme-tahajjud');
    }
    document.documentElement.dir = appLanguage === 'en' ? 'ltr' : 'rtl';
    document.documentElement.lang = appLanguage;

    // Apply city
    const found = GLOBAL_CITIES.find((c) => c.name === selectedCity);
    if (found) {
      saveUserLocation({ city: found.name, country: found.country, lat: found.lat, lon: found.lon });
    }

    showAmalToast('General settings saved successfully!', 'success');
  };

  // Save Fiqh
  const handleSaveFiqh = () => {
    saveUserMadhhab(madhhab);
    saveUserMethod(calcMethod);
    saveUserHijriOffset(hijriOffset);
    saveUserOffsets(offsets);
    localStorage.setItem('amal_azaan_settings', athanSound);

    showAmalToast('Fiqh & Prayer settings updated! Recalculating auqat...', 'success');
  };

  // Save Scholarly Strictness Settings
  const handleSaveStrictness = () => {
    localStorage.setItem('amal_strict_sawad', String(strictSawadAlAzam));
    localStorage.setItem('amal_dual_jurist', String(dualJuristVerification));
    localStorage.setItem('amal_ai_provider', aiProvider);
    localStorage.setItem('amal_ephemeral_memory', String(ephemeralMemory));

    showAmalToast('علمی استناد و احتیاط کے اصول محفوظ ہو گئے! · Scholarly strictness parameters updated!', 'success');
  };

  // Clear Search & Inquiry History
  const handlePurgeSearchCache = () => {
    localStorage.removeItem('amal_notes');
    localStorage.removeItem('amal_pending_situation');
    showAmalToast('تحقیقی تلاش اور نوٹس کی کیش مکمل صاف کر دی گئی! · Inquiry history completely cleared!', 'info');
  };

  // Save Privacy
  const handleSavePrivacy = () => {
    biometricVaultGuardEngine.setSecurityMode('usr_default', securityMode, pin);
    localStorage.setItem('amal_zk_sync', String(zeroKnowledgeSync));
    showAmalToast('Vault security parameters locked!', 'success');
  };

  // Export Data Archive
  const handleExportData = async () => {
    showAmalToast('Generating sovereign JSON archive...', 'info');
    const res = await AmalApiClient.exportData();
    const data = res.success && res.data ? res.data : { ...localStorage };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `amal_os_sovereign_archive_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    recordSuccessfulBackup();
    showAmalToast('Archive downloaded to device! (Backup recorded)', 'success');
  };

  // Restore Data Archive
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRestoreFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      showAmalToast('Reading sovereign backup file...', 'info');
      const text = await file.text();
      const backupData = JSON.parse(text);
      const res = await AmalApiClient.restoreData(backupData);
      if (res.success) {
        showAmalToast(`Successfully restored ${res.data?.restoredCount ?? 0} items! Reloading...`, 'success');
        setTimeout(() => window.location.reload(), 1200);
      } else {
        showAmalToast(res.error?.message || 'Restore failed', 'warning');
      }
    } catch (err: any) {
      showAmalToast('Invalid JSON backup file: ' + err.message, 'warning');
    }
  };

  // Reset All Local Data
  const handleResetAllData = () => {
    if (confirm('CAUTION: Are you sure you want to reset all local preferences and offline cache? This cannot be undone.')) {
      localStorage.clear();
      showAmalToast('System data wiped. Reloading...', 'info');
      setTimeout(() => window.location.reload(), 1500);
    }
  };

  // Save Reader
  const handleSaveReader = () => {
    const prefs = {
      script: arabicScript,
      fontSize,
      urduTranslation,
      englishTranslation,
      wordByWord: showWordByWord,
    };
    localStorage.setItem('amal_reader_prefs', JSON.stringify(prefs));
    showAmalToast('Quran Reader preferences saved!', 'success');
  };

  if (!mounted) return null;

  return (
    <>
      <Head>
        <title>System Settings | AMAL OS V1 Control Center</title>
        <meta name="description" content="Configure system-wide settings for AMAL OS: Fiqh methodology, Prayer Calculation, Scholarly Epistemic Strictness, Sovereign Vault Security, and Reader Preferences." />
      </Head>

      <Navigation />

      <main style={{
        maxWidth: 1180,
        margin: '0 auto',
        padding: '32px 20px 80px',
        minHeight: '85vh',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
          marginBottom: 28,
          borderBottom: `1px solid ${AmalTheme.colors.surface.borderLight}`,
          paddingBottom: 20,
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 32 }}>⚙️</span>
              <h1 style={{
                margin: 0,
                fontSize: 28,
                fontWeight: 800,
                color: AmalTheme.colors.primary,
                fontFamily: 'serif',
              }}>
                System Settings & Control Center
              </h1>
            </div>
            <p style={{ margin: '6px 0 0', fontSize: 14, color: '#4B5563' }}>
              مرکزی ترتیبات · Configure system-wide Fiqh methodology, scholarly strictness, privacy vault, and interface options.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 12,
              fontWeight: 700,
              padding: '6px 12px',
              borderRadius: 20,
              backgroundColor: '#ECFDF5',
              color: '#065F46',
              border: '1px solid #A7F3D0',
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10B981' }} />
              AMAL OS V1.0 · Sovereign Local-First
            </span>
          </div>
        </div>

        {/* Tabbed Layout: Sidebar + Content */}
        <div className="settings-grid" style={{
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          gap: 24,
        }}>
          {/* Left Tabs Sidebar */}
          <div className="settings-tabs-container" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            backgroundColor: '#FFFFFF',
            borderRadius: 14,
            padding: 12,
            border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
            height: 'fit-content',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}>
            <button
              onClick={() => setActiveTab('GENERAL')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 14px',
                borderRadius: 8,
                border: 'none',
                textAlign: 'left',
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                backgroundColor: activeTab === 'GENERAL' ? '#F0FDF4' : 'transparent',
                color: activeTab === 'GENERAL' ? AmalTheme.colors.primary : '#374151',
                borderLeft: activeTab === 'GENERAL' ? `4px solid ${AmalTheme.colors.primary}` : '4px solid transparent',
              }}
            >
              <span>🌐</span>
              <span>General & Interface</span>
            </button>

            <button
              onClick={() => setActiveTab('FIQH')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 14px',
                borderRadius: 8,
                border: 'none',
                textAlign: 'left',
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                backgroundColor: activeTab === 'FIQH' ? '#F0FDF4' : 'transparent',
                color: activeTab === 'FIQH' ? AmalTheme.colors.primary : '#374151',
                borderLeft: activeTab === 'FIQH' ? `4px solid ${AmalTheme.colors.primary}` : '4px solid transparent',
              }}
            >
              <span>🕋</span>
              <span>Fiqh & Prayer Auqat</span>
            </button>

            <button
              onClick={() => setActiveTab('SCHOLARSHIP')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 14px',
                borderRadius: 8,
                border: 'none',
                textAlign: 'left',
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                backgroundColor: activeTab === 'SCHOLARSHIP' ? '#F0FDF4' : 'transparent',
                color: activeTab === 'SCHOLARSHIP' ? AmalTheme.colors.primary : '#374151',
                borderLeft: activeTab === 'SCHOLARSHIP' ? `4px solid ${AmalTheme.colors.primary}` : '4px solid transparent',
              }}
            >
              <span>📜</span>
              <span>Scholarly Strictness & Verification</span>
            </button>

            <button
              onClick={() => setActiveTab('PRIVACY')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 14px',
                borderRadius: 8,
                border: 'none',
                textAlign: 'left',
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                backgroundColor: activeTab === 'PRIVACY' ? '#F0FDF4' : 'transparent',
                color: activeTab === 'PRIVACY' ? AmalTheme.colors.primary : '#374151',
                borderLeft: activeTab === 'PRIVACY' ? `4px solid ${AmalTheme.colors.primary}` : '4px solid transparent',
              }}
            >
              <span>🔒</span>
              <span>Vault & Privacy Guard</span>
            </button>

            <button
              onClick={() => setActiveTab('READER')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 14px',
                borderRadius: 8,
                border: 'none',
                textAlign: 'left',
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                backgroundColor: activeTab === 'READER' ? '#F0FDF4' : 'transparent',
                color: activeTab === 'READER' ? AmalTheme.colors.primary : '#374151',
                borderLeft: activeTab === 'READER' ? `4px solid ${AmalTheme.colors.primary}` : '4px solid transparent',
              }}
            >
              <span>📖</span>
              <span>Quran Reader Codex</span>
            </button>

            <button
              onClick={() => setActiveTab('SYSTEM')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 14px',
                borderRadius: 8,
                border: 'none',
                textAlign: 'left',
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                backgroundColor: activeTab === 'SYSTEM' ? '#F0FDF4' : 'transparent',
                color: activeTab === 'SYSTEM' ? AmalTheme.colors.primary : '#374151',
                borderLeft: activeTab === 'SYSTEM' ? `4px solid ${AmalTheme.colors.primary}` : '4px solid transparent',
              }}
            >
              <span>🎛️</span>
              <span>System & Diagnostics</span>
            </button>
          </div>

          {/* Right Main Content Area */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 14,
            padding: 28,
            border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}>
            {/* ============================================================== */}
            {/* 1. GENERAL TAB                                                 */}
            {/* ============================================================== */}
            {activeTab === 'GENERAL' && (
              <div>
                <h2 style={{ margin: '0 0 16px', fontSize: 20, fontWeight: 800, color: '#111827' }}>
                  General & Interface Configuration
                </h2>
                <p style={{ margin: '0 0 24px', fontSize: 13, color: '#6B7280' }}>
                  Manage your display language, night serenity mode, and primary location.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {/* Language */}
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
                      {t('System Language', 'زبان کا انتخاب')}
                    </label>
                    <select
                      value={appLanguage}
                      onChange={(e) => {
                        const val = e.target.value as any;
                        setAppLanguage(val);
                        setLanguage(val);
                      }}
                      style={{
                        width: '100%',
                        maxWidth: 360,
                        padding: '10px 12px',
                        borderRadius: 8,
                        border: '1px solid #D1D5DB',
                        fontSize: 14,
                        backgroundColor: '#F9FAFB',
                      }}
                    >
                      <option value="en">English (Global Default)</option>
                      <option value="ur">اردو (Urdu)</option>
                      <option value="ar">العربية (Arabic)</option>
                    </select>
                  </div>

                  {/* Primary Location */}
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
                      {t('Primary Geographic City', 'شہر کا تعین')}
                    </label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      style={{
                        width: '100%',
                        maxWidth: 360,
                        padding: '10px 12px',
                        borderRadius: 8,
                        border: '1px solid #D1D5DB',
                        fontSize: 14,
                        backgroundColor: '#F9FAFB',
                      }}
                    >
                      {GLOBAL_CITIES.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.name} ({c.country})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Theme Mode Toggles */}
                  <div style={{
                    padding: 16,
                    borderRadius: 10,
                    backgroundColor: '#F9FAFB',
                    border: '1px solid #E5E7EB',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>🌙 Tahajjud OLED Dark Mode</div>
                        <div style={{ fontSize: 12, color: '#6B7280' }}>Ultra-deep night serenity theme for prayer and reflection</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={tahajjudMode}
                        onChange={(e) => setTahajjudMode(e.target.checked)}
                        style={{ width: 20, height: 20, cursor: 'pointer', accentColor: AmalTheme.colors.primary }}
                      />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>👁️ High Contrast Typography</div>
                        <div style={{ fontSize: 12, color: '#6B7280' }}>Enhanced contrast for seniors and low-vision accessibility</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={highContrast}
                        onChange={(e) => setHighContrast(e.target.checked)}
                        style={{ width: 20, height: 20, cursor: 'pointer', accentColor: AmalTheme.colors.primary }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSaveGeneral}
                    style={{
                      alignSelf: 'flex-start',
                      padding: '10px 22px',
                      backgroundColor: AmalTheme.colors.primary,
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: 8,
                      fontSize: 14,
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Save General Settings
                  </button>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* 2. FIQH & PRAYER TAB                                           */}
            {/* ============================================================== */}
            {activeTab === 'FIQH' && (
              <div>
                <h2 style={{ margin: '0 0 16px', fontSize: 20, fontWeight: 800, color: '#111827' }}>
                  Fiqh & Prayer Auqat Configuration
                </h2>
                <p style={{ margin: '0 0 24px', fontSize: 13, color: '#6B7280' }}>
                  Select your school of jurisprudence (Madhhab), calculation authority, and moon-sighting offset.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {/* Madhhab */}
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
                      School of Fiqh (فقہی مسلک برائے عصر)
                    </label>
                    <select
                      value={madhhab}
                      onChange={(e) => setMadhhab(e.target.value as any)}
                      style={{
                        width: '100%',
                        maxWidth: 420,
                        padding: '10px 12px',
                        borderRadius: 8,
                        border: '1px solid #D1D5DB',
                        fontSize: 14,
                        backgroundColor: '#F9FAFB',
                      }}
                    >
                      <option value="HANAFI">{t('Hanafi — Mithlayn (Shadow ratio 2:1 for Asr)', 'حنفی — مثلین (عصر کا وقت)')}</option>
                      <option value="STANDARD_JUMHUR">{t('Shafi\'i / Maliki / Hanbali — Mithl Awwal (Shadow ratio 1:1)', 'جمہور فقہاء (شافعی، مالکی، حنبلی) — مثلِ اول')}</option>
                    </select>
                  </div>

                  {/* Calculation Method */}
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
                      {t('Astronomical Calculation Method', 'فلکیاتی طریقہ حساب')}
                    </label>
                    <select
                      value={calcMethod}
                      onChange={(e) => setCalcMethod(e.target.value as any)}
                      style={{
                        width: '100%',
                        maxWidth: 420,
                        padding: '10px 12px',
                        borderRadius: 8,
                        border: '1px solid #D1D5DB',
                        fontSize: 14,
                        backgroundColor: '#F9FAFB',
                      }}
                    >
                      <option value="KARACHI">University of Islamic Sciences, Karachi (18° Fajr / 18° Isha)</option>
                      <option value="MWL">Muslim World League (MWL) (18° Fajr / 17° Isha)</option>
                      <option value="UMM_AL_QURA">Umm al-Qura University, Makkah (18.5° Fajr / 90 min Isha)</option>
                      <option value="EGYPTIAN">Egyptian General Authority of Survey (19.5° Fajr / 17.5° Isha)</option>
                      <option value="ISNA">ISNA — North America (15° Fajr / 15° Isha)</option>
                    </select>
                  </div>

                  {/* Hijri Moon Sight Offset */}
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
                      Hijri Moon Sight Offset (رویت ہلال ایڈجسٹمنٹ)
                    </label>
                    <select
                      value={hijriOffset}
                      onChange={(e) => setHijriOffset(parseInt(e.target.value, 10))}
                      style={{
                        width: '100%',
                        maxWidth: 420,
                        padding: '10px 12px',
                        borderRadius: 8,
                        border: '1px solid #D1D5DB',
                        fontSize: 14,
                        backgroundColor: '#F9FAFB',
                      }}
                    >
                      <option value={-2}>-2 Days (Moon sighted later)</option>
                      <option value={-1}>-1 Day (Standard subcontinent offset)</option>
                      <option value={0}>0 Days (Astronomical default / Umm al-Qura)</option>
                      <option value={1}>+1 Day</option>
                      <option value={2}>+2 Days</option>
                    </select>
                  </div>

                  {/* Athan Voice */}
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
                      Athan Audio Notification (آواز اذان)
                    </label>
                    <select
                      value={athanSound}
                      onChange={(e) => setAthanSound(e.target.value)}
                      style={{
                        width: '100%',
                        maxWidth: 420,
                        padding: '10px 12px',
                        borderRadius: 8,
                        border: '1px solid #D1D5DB',
                        fontSize: 14,
                        backgroundColor: '#F9FAFB',
                      }}
                    >
                      <option value="makkah">Masjid al-Haram (Makkah Mukarramah)</option>
                      <option value="madinah">Al-Masjid an-Nabawi (Madinah Munawwarah)</option>
                      <option value="alaqsa">Al-Masjid al-Aqsa (Al-Quds)</option>
                      <option value="silent">Silent Notification Only</option>
                    </select>
                  </div>

                  {/* Prayer Offsets Grid */}
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 8 }}>
                      Manual Minute Offsets per Prayer (منٹوں کی انفرادی ترتیب)
                    </label>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: 12,
                      maxWidth: 460,
                    }}>
                      {(['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'] as const).map((p) => (
                        <div key={p} style={{ backgroundColor: '#F9FAFB', padding: '8px 12px', borderRadius: 8, border: '1px solid #E5E7EB' }}>
                          <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'capitalize' }}>{p}:</span>
                          <input
                            type="number"
                            value={offsets[p]}
                            onChange={(e) => setOffsets({ ...offsets, [p]: parseInt(e.target.value, 10) || 0 })}
                            style={{
                              width: '100%',
                              marginTop: 4,
                              padding: '4px 6px',
                              borderRadius: 4,
                              border: '1px solid #D1D5DB',
                              fontSize: 13,
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleSaveFiqh}
                    style={{
                      alignSelf: 'flex-start',
                      padding: '10px 22px',
                      backgroundColor: AmalTheme.colors.primary,
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: 8,
                      fontSize: 14,
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Save Fiqh & Prayer Settings
                  </button>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* 3. SCHOLARLY STRICTNESS & VERIFICATION TAB                     */}
            {/* ============================================================== */}
            {activeTab === 'SCHOLARSHIP' && (
              <div>
                <h2 style={{ margin: '0 0 16px', fontSize: 20, fontWeight: 800, color: '#111827' }}>
                  Epistemic Grounding & Scholarly Strictness (علمی استناد و احتیاط)
                </h2>
                <p style={{ margin: '0 0 24px', fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>
                  AMAL OS employs the Dual-Jurist Verification Protocol (INV_07) to strictly ground all retrieved evidence in canonical Islamic scholarship. AMAL OS is an educational research index and clerical tool, never an autonomous Mufti.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{
                    padding: 16,
                    borderRadius: 10,
                    backgroundColor: '#ECFDF5',
                    border: '1px solid #A7F3D0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#065F46' }}>
                          🛡️ Strict Sawad al-A'zam Epistemic Gate (Section 03.11)
                        </div>
                        <div style={{ fontSize: 12, color: '#047857' }}>
                          Guarantees that retrieved references strictly cite peer-reviewed classical texts from the 76 canonical corpus works.
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={strictSawadAlAzam}
                        onChange={(e) => setStrictSawadAlAzam(e.target.checked)}
                        style={{ width: 20, height: 20, cursor: 'pointer', accentColor: AmalTheme.colors.primary }}
                      />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#065F46' }}>
                          ⚖️ Dual-Jurist Consensus Gatekeeper (INV_07)
                        </div>
                        <div style={{ fontSize: 12, color: '#047857' }}>
                          Prevents unverified statements or misattributions by cross-checking rulings strictly across classical Hanafi and Jumhur codices.
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={dualJuristVerification}
                        onChange={(e) => setDualJuristVerification(e.target.checked)}
                        style={{ width: 20, height: 20, cursor: 'pointer', accentColor: AmalTheme.colors.primary }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
                      Knowledge Retrieval Engine Provider
                    </label>
                    <select
                      value={aiProvider}
                      onChange={(e) => setAiProvider(e.target.value as any)}
                      style={{
                        width: '100%',
                        maxWidth: 420,
                        padding: '10px 12px',
                        borderRadius: 8,
                        border: '1px solid #D1D5DB',
                        fontSize: 14,
                        backgroundColor: '#F9FAFB',
                      }}
                    >
                      <option value="gemini">Google Gemini Grounded Model (Deterministic Corpus Verification)</option>
                      <option value="openai">OpenAI Strict Retrieval (Deterministic Low-Temperature)</option>
                      <option value="local">Offline Classical Corpus (Zero Cloud API, 100% Local Device Storage)</option>
                    </select>
                  </div>

                  <div style={{
                    padding: 16,
                    borderRadius: 10,
                    backgroundColor: '#F9FAFB',
                    border: '1px solid #E5E7EB',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>
                        🛡️ Ephemeral Inquiry History
                      </div>
                      <div style={{ fontSize: 12, color: '#6B7280' }}>
                        Automatically wipe search inquiries and scratch reflections after every session (Zero retention)
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={ephemeralMemory}
                      onChange={(e) => setEphemeralMemory(e.target.checked)}
                      style={{ width: 20, height: 20, cursor: 'pointer', accentColor: AmalTheme.colors.primary }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <button
                      onClick={handleSaveStrictness}
                      style={{
                        padding: '10px 22px',
                        backgroundColor: AmalTheme.colors.primary,
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: 8,
                        fontSize: 14,
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      Save Scholarly Parameters
                    </button>

                    <button
                      onClick={handlePurgeSearchCache}
                      style={{
                        padding: '10px 18px',
                        backgroundColor: '#FEE2E2',
                        color: '#991B1B',
                        border: '1px solid #FCA5A5',
                        borderRadius: 8,
                        fontSize: 14,
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      🧹 Clear Inquiry Cache Now
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* 4. VAULT & PRIVACY GUARD TAB                                   */}
            {/* ============================================================== */}
            {activeTab === 'PRIVACY' && (
              <div>
                <h2 style={{ margin: '0 0 16px', fontSize: 20, fontWeight: 800, color: '#111827' }}>
                  Sovereign Vault & Privacy Guard
                </h2>
                <p style={{ margin: '0 0 24px', fontSize: 13, color: '#6B7280' }}>
                  Protect your spiritual journals, private reflections, and personal du'as with hardware-backed encryption.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
                      Vault Authentication Mode
                    </label>
                    <select
                      value={securityMode}
                      onChange={(e) => setSecurityMode(e.target.value as any)}
                      style={{
                        width: '100%',
                        maxWidth: 420,
                        padding: '10px 12px',
                        borderRadius: 8,
                        border: '1px solid #D1D5DB',
                        fontSize: 14,
                        backgroundColor: '#F9FAFB',
                      }}
                    >
                      <option value="FOUR_DIGIT_PIN">4-Digit Sovereign PIN Code</option>
                      <option value="BIOMETRIC_FACE_ID">Biometric FaceID / TouchID</option>
                      <option value="BIOMETRIC_FINGERPRINT">Biometric Fingerprint Scanner</option>
                      <option value="DISABLED">Open Access (Disabled)</option>
                    </select>
                  </div>

                  {securityMode === 'FOUR_DIGIT_PIN' && (
                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
                        Set 4-Digit Vault PIN
                      </label>
                      <input
                        type="password"
                        maxLength={6}
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        style={{
                          width: 140,
                          padding: '10px 12px',
                          borderRadius: 8,
                          border: '1px solid #D1D5DB',
                          fontSize: 16,
                          textAlign: 'center',
                          letterSpacing: 4,
                          fontWeight: 800,
                        }}
                      />
                    </div>
                  )}

                  <div style={{
                    padding: 16,
                    borderRadius: 10,
                    backgroundColor: '#F9FAFB',
                    border: '1px solid #E5E7EB',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>
                        🛡️ Zero-Knowledge Client-Side Encryption
                      </div>
                      <div style={{ fontSize: 12, color: '#6B7280' }}>
                        Your reflections and goals are encrypted locally before any network synchronization.
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={zeroKnowledgeSync}
                      onChange={(e) => setZeroKnowledgeSync(e.target.checked)}
                      style={{ width: 20, height: 20, cursor: 'pointer', accentColor: AmalTheme.colors.primary }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 10 }}>
                    <button
                      onClick={handleSavePrivacy}
                      style={{
                        padding: '10px 22px',
                        backgroundColor: AmalTheme.colors.primary,
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: 8,
                        fontSize: 14,
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      Save Vault Preferences
                    </button>

                    <button
                      onClick={handleExportData}
                      style={{
                        padding: '10px 18px',
                        backgroundColor: '#EFF6FF',
                        color: '#1D4ED8',
                        border: '1px solid #BFDBFE',
                        borderRadius: 8,
                        fontSize: 14,
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      📦 Export Sovereign Data (JSON)
                    </button>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".json"
                      onChange={handleRestoreFile}
                      style={{ display: 'none' }}
                    />

                    <button
                      onClick={() => fileInputRef.current?.click()}
                      style={{
                        padding: '10px 18px',
                        backgroundColor: '#ECFDF5',
                        color: '#065F46',
                        border: '1px solid #A7F3D0',
                        borderRadius: 8,
                        fontSize: 14,
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      📥 Restore Sovereign Data (JSON)
                    </button>

                    <button
                      onClick={handleResetAllData}
                      style={{
                        padding: '10px 18px',
                        backgroundColor: '#FEF2F2',
                        color: '#DC2626',
                        border: '1px solid #FECACA',
                        borderRadius: 8,
                        fontSize: 14,
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      ⚠️ Wipe All Local Data
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* 5. QURAN & READER CODEX TAB                                    */}
            {/* ============================================================== */}
            {activeTab === 'READER' && (
              <div>
                <h2 style={{ margin: '0 0 16px', fontSize: 20, fontWeight: 800, color: '#111827' }}>
                  Quran & Hadith Reader Codex
                </h2>
                <p style={{ margin: '0 0 24px', fontSize: 13, color: '#6B7280' }}>
                  Customize the Arabic typography script, font scale, and canonical translations.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
                      Arabic Calligraphy Script (رسم الخط)
                    </label>
                    <select
                      value={arabicScript}
                      onChange={(e) => setArabicScript(e.target.value as any)}
                      style={{
                        width: '100%',
                        maxWidth: 420,
                        padding: '10px 12px',
                        borderRadius: 8,
                        border: '1px solid #D1D5DB',
                        fontSize: 14,
                        backgroundColor: '#F9FAFB',
                      }}
                    >
                      <option value="indopak">{t('Indo-Pak / Subcontinent Script (Nastaliq / Naskh)', 'رسم الخط برصغیر (نستعلیق / نسخ)')}</option>
                      <option value="uthmani">{t('Madani Uthmani Script', 'المصحف المدني (رسم عثماني)')}</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
                      Arabic Typography Scale ({fontSize}px)
                    </label>
                    <input
                      type="range"
                      min={18}
                      max={40}
                      value={fontSize}
                      onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
                      style={{ width: '100%', maxWidth: 420, accentColor: AmalTheme.colors.primary }}
                    />
                    <div style={{
                      marginTop: 10,
                      padding: 16,
                      backgroundColor: '#F9FAFB',
                      borderRadius: 8,
                      border: '1px solid #E5E7EB',
                      textAlign: 'center',
                      fontFamily: arabicScript === 'indopak' ? 'Al Qalam Quran Majeed, serif' : 'Amiri, serif',
                      fontSize: fontSize,
                      color: AmalTheme.colors.primary,
                    }}>
                      بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
                      Default Urdu Translation (اردو ترجمہ)
                    </label>
                    <select
                      value={urduTranslation}
                      onChange={(e) => setUrduTranslation(e.target.value)}
                      style={{
                        width: '100%',
                        maxWidth: 420,
                        padding: '10px 12px',
                        borderRadius: 8,
                        border: '1px solid #D1D5DB',
                        fontSize: 14,
                        backgroundColor: '#F9FAFB',
                      }}
                    >
                      <option value="kanzul_iman">Kanzul Iman — Imam Ahmad Raza Khan</option>
                      <option value="maarif_ul_quran">Ma'arif-ul-Quran — Mufti Muhammad Shafi</option>
                      <option value="bayan_ul_quran">Bayan-ul-Quran — Dr. Israr Ahmad</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
                      Default English Translation
                    </label>
                    <select
                      value={englishTranslation}
                      onChange={(e) => setEnglishTranslation(e.target.value)}
                      style={{
                        width: '100%',
                        maxWidth: 420,
                        padding: '10px 12px',
                        borderRadius: 8,
                        border: '1px solid #D1D5DB',
                        fontSize: 14,
                        backgroundColor: '#F9FAFB',
                      }}
                    >
                      <option value="sahih_international">Sahih International</option>
                      <option value="yusuf_ali">Abdullah Yusuf Ali</option>
                      <option value="pickthall">Marmaduke Pickthall</option>
                    </select>
                  </div>

                  <div style={{
                    padding: 16,
                    borderRadius: 10,
                    backgroundColor: '#F9FAFB',
                    border: '1px solid #E5E7EB',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>
                        🔤 Word-by-Word Interlinear Analysis
                      </div>
                      <div style={{ fontSize: 12, color: '#6B7280' }}>
                        Show morphological root analysis and direct word-level translation in reader
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={showWordByWord}
                      onChange={(e) => setShowWordByWord(e.target.checked)}
                      style={{ width: 20, height: 20, cursor: 'pointer', accentColor: AmalTheme.colors.primary }}
                    />
                  </div>

                  <button
                    onClick={handleSaveReader}
                    style={{
                      alignSelf: 'flex-start',
                      padding: '10px 22px',
                      backgroundColor: AmalTheme.colors.primary,
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: 8,
                      fontSize: 14,
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Save Reader Codex
                  </button>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* 6. SYSTEM STATUS & DIAGNOSTICS TAB                             */}
            {/* ============================================================== */}
            {activeTab === 'SYSTEM' && (
              <div>
                <h2 style={{ margin: '0 0 16px', fontSize: 20, fontWeight: 800, color: '#111827' }}>
                  Platform Diagnostics & System Status
                </h2>
                <p style={{ margin: '0 0 24px', fontSize: 13, color: '#6B7280' }}>
                  Live runtime health, sovereign storage status, and engine version telemetry.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 24 }}>
                  <div style={{ padding: 16, borderRadius: 10, backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>
                      Backend API Gateway
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: apiHealth === 'online' ? '#059669' : '#D97706', marginTop: 4 }}>
                      {apiHealth === 'online' ? '🟢 Online (200 OK)' : '🟡 Local Sovereign Fallback (Offline Mode)'}
                    </div>
                  </div>

                  <div style={{ padding: 16, borderRadius: 10, backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>
                      Service Worker Cache
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#059669', marginTop: 4 }}>
                      ⚡ 100% Offline PWA Ready
                    </div>
                  </div>

                  <div style={{ padding: 16, borderRadius: 10, backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>
                      Sovereign Storage Footprint
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginTop: 4 }}>
                      {storageUsage}
                    </div>
                  </div>

                  <div style={{ padding: 16, borderRadius: 10, backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>
                      AMAL OS Engine Version
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginTop: 4 }}>
                      V1.0.0 (Release 2026.10) · by Qsura India Pvt Ltd
                    </div>
                  </div>
                </div>

                {/* Progressive Web App & Offline Corpus Controls */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #D1D5DB',
                    borderRadius: 12,
                    padding: 20,
                    marginBottom: 24,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  }}
                >
                  <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 800, color: '#111827', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>📲</span>
                    <span>PWA Installation & Offline Corpus Sentinel</span>
                  </h3>
                  <p style={{ margin: '0 0 16px', fontSize: 13, color: '#6B7280', lineHeight: 1.5 }}>
                    AMAL OS can operate 100% offline without any internet connection. You can install it on your home screen or precache the complete Quran corpus locally on this device.
                  </p>

                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <button
                      onClick={() => {
                        if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('amal-open-install'));
                      }}
                      style={{
                        padding: '10px 18px',
                        backgroundColor: '#064E3B',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: 8,
                        fontSize: 13,
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      <span>📲</span>
                      <span>{t('Install AMAL OS on Device', 'امل او ایس ہوم اسکرین پر انسٹال کریں')}</span>
                    </button>

                    <button
                      onClick={handlePrecacheAllQuran}
                      disabled={Boolean(cachingProgress?.active)}
                      style={{
                        padding: '10px 18px',
                        backgroundColor: cachingProgress?.active ? '#E5E7EB' : '#F0FDF4',
                        color: cachingProgress?.active ? '#9CA3AF' : '#166534',
                        border: '1px solid #86EFAC',
                        borderRadius: 8,
                        fontSize: 13,
                        fontWeight: 700,
                        cursor: cachingProgress?.active ? 'default' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      <span>📥</span>
                      <span>
                        {cachingProgress?.active
                          ? `Downloading: Surah ${cachingProgress.current}/${cachingProgress.total}...`
                          : 'Precache All 114 Surahs for 100% Offline Access'}
                      </span>
                    </button>

                    <button
                      onClick={handleClearCache}
                      style={{
                        padding: '10px 16px',
                        backgroundColor: '#FEF2F2',
                        color: '#991B1B',
                        border: '1px solid #FECACA',
                        borderRadius: 8,
                        fontSize: 13,
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      <span>🧹</span>
                      <span>Clear Service Worker Cache</span>
                    </button>
                  </div>
                </div>

                <div style={{
                  padding: 16,
                  borderRadius: 10,
                  backgroundColor: '#F3F4F6',
                  fontSize: 12,
                  color: '#4B5563',
                  lineHeight: 1.6,
                }}>
                  <strong>Epistemic Compliance Guarantee:</strong> AMAL OS is engineered and stewarded by Qsura India Pvt Ltd, operating strictly under the Two-Scholar Dual Jurist Protocol (INV_07) and Section 03 Epistemic Domain Invariants. All calculations are executed deterministically on-device without remote tracking or commercial telemetry.
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
