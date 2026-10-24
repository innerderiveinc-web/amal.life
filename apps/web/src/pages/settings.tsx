import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { Navigation } from '../components/Navigation';
import { AmalTheme } from '@amal/ui';
import { showAmalToast } from '../components/Toast';
import { GLOBAL_CITIES } from '../lib/global-locations';
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

// Modularized Settings Subcomponents
import { SettingsTabsSidebar, SettingsTab } from '../components/settings/SettingsTabsSidebar';
import { SettingsGeneralTab } from '../components/settings/SettingsGeneralTab';
import { SettingsFiqhTab } from '../components/settings/SettingsFiqhTab';
import { SettingsScholarshipTab } from '../components/settings/SettingsScholarshipTab';
import { SettingsPrivacyTab } from '../components/settings/SettingsPrivacyTab';
import { SettingsReaderTab } from '../components/settings/SettingsReaderTab';
import { SettingsSystemTab } from '../components/settings/SettingsSystemTab';

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
    navigator.serviceWorker.controller.postMessage({ type: 'PRECACHE_QURAN' });
    showAmalToast('قرآنِ پاک کی تمام سورتوں کو آف لائن کیش کیا جا رہا ہے...', 'info');
  };

  const handleClearCache = async () => {
    if (typeof window === 'undefined' || !('caches' in window)) return;
    const keys = await caches.keys();
    for (const k of keys) {
      await caches.delete(k);
    }
    showAmalToast('تمام سروس ورکر کیشز کامیابی سے حذف کر دیے گئے ہیں۔', 'info');
  };

  // Hydrate from localStorage
  useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined') return;

    // 1. General
    const savedLang = localStorage.getItem('amal_app_language') as 'en' | 'ur' | 'ar';
    if (savedLang) setAppLanguage(savedLang);

    const savedTahajjud = localStorage.getItem('amal_tahajjud_mode') === 'true';
    setTahajjudMode(savedTahajjud);

    const savedContrast = localStorage.getItem('amal_high_contrast') === 'true';
    setHighContrast(savedContrast);

    const loc = getSavedLocation();
    if (loc?.name) {
      const cityName = loc.name.split(',')[0]?.trim();
      if (cityName) setSelectedCity(cityName);
    }

    // 2. Fiqh
    setMadhhab(getSavedMadhhab());
    setCalcMethod(getSavedMethod() as any);
    setHijriOffset(getSavedHijriOffset());
    const savedOffsets = getSavedOffsets();
    setOffsets({
      fajr: savedOffsets.fajr || 0,
      sunrise: 0,
      dhuhr: savedOffsets.dhuhr || 0,
      asr: savedOffsets.asr || 0,
      maghrib: savedOffsets.maghrib || 0,
      isha: savedOffsets.isha || 0,
    });
    const sound = localStorage.getItem('amal_azaan_settings');
    if (sound) setAthanSound(sound);

    // 3. Scholarship
    const savedSawad = localStorage.getItem('amal_strict_sawad');
    if (savedSawad !== null) setStrictSawadAlAzam(savedSawad === 'true');

    const savedDualJurist = localStorage.getItem('amal_dual_jurist');
    if (savedDualJurist !== null) setDualJuristVerification(savedDualJurist === 'true');

    const savedAi = localStorage.getItem('amal_ai_provider') as any;
    if (savedAi) setAiProvider(savedAi);

    const savedEphemeral = localStorage.getItem('amal_ephemeral_memory');
    if (savedEphemeral !== null) setEphemeralMemory(savedEphemeral === 'true');

    // 4. Privacy
    const savedVault = biometricVaultGuardEngine.getConfig('usr_default');
    if (savedVault) setSecurityMode(savedVault.securityMode);

    const savedZk = localStorage.getItem('amal_zk_sync');
    if (savedZk !== null) setZeroKnowledgeSync(savedZk === 'true');

    // 5. Check API Status
    fetch('/api/health')
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
        <meta
          name="description"
          content="Configure system-wide settings for AMAL OS: Fiqh methodology, Prayer Calculation, Scholarly Epistemic Strictness, Sovereign Vault Security, and Reader Preferences."
        />
      </Head>

      <Navigation />

      <main
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          padding: '32px 20px 80px',
          minHeight: '85vh',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
            marginBottom: 28,
            borderBottom: `1px solid ${AmalTheme.colors.surface.borderLight}`,
            paddingBottom: 20,
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 32 }}>⚙️</span>
              <h1
                style={{
                  margin: 0,
                  fontSize: 28,
                  fontWeight: 800,
                  color: AmalTheme.colors.primary,
                  fontFamily: 'serif',
                }}
              >
                System Settings & Control Center
              </h1>
            </div>
            <p style={{ margin: '6px 0 0', fontSize: 14, color: '#4B5563' }}>
              مرکزی ترتیبات · Configure system-wide Fiqh methodology, scholarly strictness, privacy vault, and interface options.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <span
              style={{
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
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10B981' }} />
              AMAL OS V1.0 · Sovereign Local-First
            </span>
          </div>
        </div>

        {/* Tabbed Layout: Sidebar + Modular Content Panels */}
        <div
          className="settings-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '260px 1fr',
            gap: 24,
          }}
        >
          {/* Left Tabs Sidebar */}
          <SettingsTabsSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* Right Main Content Area */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 14,
              padding: 28,
              border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}
          >
            {activeTab === 'GENERAL' && (
              <SettingsGeneralTab
                appLanguage={appLanguage}
                setAppLanguage={setAppLanguage}
                setLanguage={setLanguage}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
                tahajjudMode={tahajjudMode}
                setTahajjudMode={setTahajjudMode}
                highContrast={highContrast}
                setHighContrast={setHighContrast}
                handleSaveGeneral={handleSaveGeneral}
                t={t}
              />
            )}

            {activeTab === 'FIQH' && (
              <SettingsFiqhTab
                madhhab={madhhab}
                setMadhhab={setMadhhab}
                calcMethod={calcMethod}
                setCalcMethod={setCalcMethod}
                hijriOffset={hijriOffset}
                setHijriOffset={setHijriOffset}
                athanSound={athanSound}
                setAthanSound={setAthanSound}
                offsets={offsets}
                setOffsets={setOffsets}
                handleSaveFiqh={handleSaveFiqh}
                t={t}
              />
            )}

            {activeTab === 'SCHOLARSHIP' && (
              <SettingsScholarshipTab
                strictSawadAlAzam={strictSawadAlAzam}
                setStrictSawadAlAzam={setStrictSawadAlAzam}
                dualJuristVerification={dualJuristVerification}
                setDualJuristVerification={setDualJuristVerification}
                aiProvider={aiProvider}
                setAiProvider={setAiProvider}
                ephemeralMemory={ephemeralMemory}
                setEphemeralMemory={setEphemeralMemory}
                handleSaveStrictness={handleSaveStrictness}
                handlePurgeSearchCache={handlePurgeSearchCache}
              />
            )}

            {activeTab === 'PRIVACY' && (
              <SettingsPrivacyTab
                securityMode={securityMode}
                setSecurityMode={setSecurityMode}
                pin={pin}
                setPin={setPin}
                zeroKnowledgeSync={zeroKnowledgeSync}
                setZeroKnowledgeSync={setZeroKnowledgeSync}
                handleSavePrivacy={handleSavePrivacy}
                handleExportData={handleExportData}
                fileInputRef={fileInputRef}
                handleRestoreFile={handleRestoreFile}
                handleResetAllData={handleResetAllData}
              />
            )}

            {activeTab === 'READER' && (
              <SettingsReaderTab
                arabicScript={arabicScript}
                setArabicScript={setArabicScript}
                fontSize={fontSize}
                setFontSize={setFontSize}
                urduTranslation={urduTranslation}
                setUrduTranslation={setUrduTranslation}
                englishTranslation={englishTranslation}
                setEnglishTranslation={setEnglishTranslation}
                showWordByWord={showWordByWord}
                setShowWordByWord={setShowWordByWord}
                handleSaveReader={handleSaveReader}
                t={t}
              />
            )}

            {activeTab === 'SYSTEM' && (
              <SettingsSystemTab
                apiHealth={apiHealth}
                storageUsage={storageUsage}
                cachingProgress={cachingProgress}
                handlePrecacheAllQuran={handlePrecacheAllQuran}
                handleClearCache={handleClearCache}
                t={t}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
}
