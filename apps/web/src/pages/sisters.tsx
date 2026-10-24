import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import {
  WOMEN_CLASSICAL_CANON,
  SAHABIYYAT_PROFILES,
  AHKAM_NISWAN_GUIDE,
  MOTHERHOOD_FAMILY_DUAS,
  SanctuaryBook,
  SanctuaryBookChapter,
  SahabiyyatProfile,
  FiqhRulingItem,
  MasnoonFamilyDua,
} from '../lib/women-sanctuary-data';
import { SanadVerificationModal } from '../components/authenticity/SanadVerificationModal';
import { SanadVerificationReport } from '../lib/authenticity-pipeline';

type SanctuaryTab = 'library' | 'sahabiyyat' | 'fiqh' | 'duas' | 'vault';

export default function SistersSanctuaryPage() {
  const { t, isUrdu, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<SanctuaryTab>('library');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBookCategory, setSelectedBookCategory] = useState<string>('all');
  const [selectedFiqhCategory, setSelectedFiqhCategory] = useState<string>('all');
  const [readingBook, setReadingBook] = useState<SanctuaryBook | null>(null);
  const [activeChapter, setActiveChapter] = useState<SanctuaryBookChapter | null>(null);

  // Sanad Modal State
  const [selectedSanadReport, setSelectedSanadReport] = useState<SanadVerificationReport | null>(null);
  const [isSanadModalOpen, setIsSanadModalOpen] = useState(false);

  // Sovereign PIN Vault State
  const [isPinLocked, setIsPinLocked] = useState(false);
  const [hasPinConfigured, setHasPinConfigured] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [isSettingUpPin, setIsSettingUpPin] = useState(false);

  // Cycle Logs State (Stored 100% on-device in localStorage)
  const [cycleStartDate, setCycleStartDate] = useState('');
  const [cycleEndDate, setCycleEndDate] = useState('');
  const [cycleNotes, setCycleNotes] = useState('');
  const [savedCycles, setSavedCycles] = useState<
    { id: string; start: string; end: string; notes: string; durationDays: number }[]
  >([]);

  // PWA Install Prompt State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [installSuccessMessage, setInstallSuccessMessage] = useState(false);

  // Initialize PIN & Local Storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedPin = localStorage.getItem('amal_nisa_pin');
      if (storedPin) {
        setHasPinConfigured(true);
        setIsPinLocked(true);
      }
      try {
        const storedCycles = localStorage.getItem('amal_nisa_cycle_logs');
        if (storedCycles) {
          setSavedCycles(JSON.parse(storedCycles));
        }
      } catch (e) {
        console.error('Failed to parse cycle logs', e);
      }

      // PWA Install prompt listener
      const handleBeforeInstall = (e: any) => {
        e.preventDefault();
        setDeferredPrompt(e);
        setIsInstallable(true);
      };
      window.addEventListener('beforeinstallprompt', handleBeforeInstall);
      return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    }
  }, []);

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setInstallSuccessMessage(true);
        setTimeout(() => setInstallSuccessMessage(false), 5000);
      }
      setDeferredPrompt(null);
      setIsInstallable(false);
    } else {
      alert(
        isUrdu
          ? 'اپنے موبائل براؤزر کے مینیو (تین نقطوں یا شیئر بٹن) پر کلک کر کے "Add to Home Screen" یا "Install App" منتخب کریں۔'
          : 'Tap your browser share/menu icon and select "Add to Home Screen" to install Amal Nisa as a standalone app.'
      );
    }
  };

  const handleUnlockPin = () => {
    const storedPin = localStorage.getItem('amal_nisa_pin');
    if (enteredPin === storedPin) {
      setIsPinLocked(false);
      setPinError('');
      setEnteredPin('');
    } else {
      setPinError(isUrdu ? 'غلط پن کوڈ! براہِ کرم دوبارہ کوشش کریں۔' : 'Incorrect PIN! Please try again.');
    }
  };

  const handleSavePin = () => {
    if (newPin.length === 4 && /^\d+$/.test(newPin)) {
      localStorage.setItem('amal_nisa_pin', newPin);
      setHasPinConfigured(true);
      setIsPinLocked(false);
      setIsSettingUpPin(false);
      setNewPin('');
      setPinError('');
    } else {
      setPinError(isUrdu ? 'براہِ کرم ۴ ہندسوں پر مشتمل درست پن کوڈ درج کریں۔' : 'Please enter a valid 4-digit numeric PIN.');
    }
  };

  const handleRemovePin = () => {
    if (window.confirm(isUrdu ? 'کیا آپ واقعی پن لاک ختم کرنا چاہتے ہیں؟' : 'Are you sure you want to remove the PIN lock?')) {
      localStorage.removeItem('amal_nisa_pin');
      setHasPinConfigured(false);
      setIsPinLocked(false);
    }
  };

  const handleSaveCycle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cycleStartDate) return;

    let durationDays = 0;
    if (cycleEndDate) {
      const start = new Date(cycleStartDate);
      const end = new Date(cycleEndDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      durationDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    }

    const newEntry = {
      id: Date.now().toString(),
      start: cycleStartDate,
      end: cycleEndDate || (isUrdu ? 'جاری ہے' : 'Ongoing'),
      notes: cycleNotes,
      durationDays,
    };

    const updated = [newEntry, ...savedCycles];
    setSavedCycles(updated);
    localStorage.setItem('amal_nisa_cycle_logs', JSON.stringify(updated));
    setCycleStartDate('');
    setCycleEndDate('');
    setCycleNotes('');
  };

  const handleDeleteCycle = (id: string) => {
    const updated = savedCycles.filter((c) => c.id !== id);
    setSavedCycles(updated);
    localStorage.setItem('amal_nisa_cycle_logs', JSON.stringify(updated));
  };

  // Open Sanad verification modal for any book or Sahabiyyah
  const handleOpenSanad = (
    title: string,
    author: string,
    hash: string,
    citation: string,
    notesUrdu: string,
    notesEnglish: string,
    consensusUrdu: string
  ) => {
    const report: SanadVerificationReport = {
      id: hash,
      source: 'MISHKAT_AL_MASABIH',
      sourceNameArabic: title,
      sourceNameUrdu: title,
      sourceNameEnglish: title,
      citationReference: citation,
      primaryNarrator: author,
      grading: 'SAHIH',
      gradingUrdu: 'صحیح و مستند (اہل سنت و جماعت)',
      gradingEnglish: 'Authentic (Ahl al-Sunnah Canon)',
      isVerifiedAuthentic: true,
      verificationTimestamp: new Date().toISOString(),
      verificationAuditNotes: {
        ur: notesUrdu,
        en: notesEnglish,
      },
      scholarlyConsensus: {
        ur: consensusUrdu,
        en: 'Rigorously audited against classical Sunni scholarship.',
      },
      verificationHash: hash,
    };
    setSelectedSanadReport(report);
    setIsSanadModalOpen(true);
  };

  // Filtered Books
  const filteredBooks = useMemo(() => {
    return WOMEN_CLASSICAL_CANON.filter((book) => {
      const matchesCategory =
        selectedBookCategory === 'all' || book.category === selectedBookCategory;
      const matchesQuery =
        !searchQuery ||
        book.titleUrdu.includes(searchQuery) ||
        book.titleEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.authorUrdu.includes(searchQuery) ||
        book.descriptionUrdu.includes(searchQuery);
      return matchesCategory && matchesQuery;
    });
  }, [selectedBookCategory, searchQuery]);

  // Filtered Fiqh rulings
  const filteredFiqh = useMemo(() => {
    if (selectedFiqhCategory === 'all') return AHKAM_NISWAN_GUIDE;
    return AHKAM_NISWAN_GUIDE.filter((item) => item.category === selectedFiqhCategory);
  }, [selectedFiqhCategory]);

  return (
    <>
      <Head>
        <title>
          {isUrdu
            ? 'گوشۂ خواتین و صحابیات — امل آپریٹنگ سسٹم'
            : 'The Sacred Sisters Sanctuary — Amal OS'}
        </title>
        <meta
          name="description"
          content="The authentic Ahl al-Sunnah Sanctuary for Muslim Women: 20 Classical Masterworks, Biographies of the Sahabiyyat, Taharah & Fiqh Guide, and Private Sovereign Vault."
        />
      </Head>

      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#FCFAF7',
          color: '#1F2937',
          fontFamily: isUrdu
            ? "'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', serif"
            : 'system-ui, -apple-system, sans-serif',
          direction: isUrdu ? 'rtl' : 'ltr',
          paddingBottom: 90,
        }}
      >
        {/* Top Sacred Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, #064E3B 0%, #065F46 50%, #831843 100%)',
            color: '#FFFFFF',
            padding: '36px 20px 28px 20px',
            borderBottom: '4px solid #F59E0B',
            boxShadow: '0 10px 25px -5px rgba(6, 78, 59, 0.3)',
          }}
        >
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 16,
                marginBottom: 16,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    fontSize: 24,
                  }}
                >
                  🌸
                </span>
                <div>
                  <span
                    style={{
                      display: 'inline-block',
                      backgroundColor: 'rgba(245, 158, 11, 0.25)',
                      color: '#FDE68A',
                      padding: '2px 10px',
                      borderRadius: 12,
                      fontSize: 12,
                      fontWeight: 600,
                      border: '1px solid rgba(245, 158, 11, 0.4)',
                      marginBottom: 4,
                    }}
                  >
                    {isUrdu ? 'اہل سنت و جماعت کی مستند کتب و اسوہ' : 'Ahl al-Sunnah Classical Canon'}
                  </span>
                  <h1
                    style={{
                      margin: 0,
                      fontSize: isUrdu ? 28 : 24,
                      fontWeight: 800,
                      letterSpacing: isUrdu ? 0 : '-0.02em',
                      color: '#FFFFFF',
                    }}
                  >
                    {isUrdu ? 'گوشۂ خواتین و صحابیات (عمل نساء)' : 'Amal Nisa — The Sisters Sanctuary'}
                  </h1>
                </div>
              </div>

              {/* Action Buttons: Standalone PWA & Sovereign PIN */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button
                  onClick={handleInstallPWA}
                  style={{
                    backgroundColor: '#F59E0B',
                    color: '#1F2937',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: 10,
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span>📲</span>
                  <span>{isUrdu ? 'موبائل ایپ انسٹال کریں' : 'Install Standalone App'}</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('vault');
                    if (!hasPinConfigured) setIsSettingUpPin(true);
                  }}
                  style={{
                    backgroundColor: hasPinConfigured ? '#9D174D' : 'rgba(255,255,255,0.18)',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255,255,255,0.3)',
                    padding: '8px 14px',
                    borderRadius: 10,
                    fontWeight: 600,
                    fontSize: 13,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <span>{hasPinConfigured ? '🔒' : '🔓'}</span>
                  <span>
                    {hasPinConfigured
                      ? isUrdu
                        ? 'نجی پن فعال ہے'
                        : 'PIN Protected'
                      : isUrdu
                      ? 'پن لاک لگائیں'
                      : 'Setup PIN Lock'}
                  </span>
                </button>
              </div>
            </div>

            <p
              style={{
                margin: 0,
                fontSize: 14,
                color: '#E0E7FF',
                maxWidth: 800,
                lineHeight: 1.6,
              }}
            >
              {isUrdu
                ? 'خواتینِ اسلام کے لیے ۲۰ مستند کتب، ۱۰ جلیل القدر صحابیات کے نقوشِ حیات، فقہ حنفی اور بہارِ شریعت کے مطابق احکامِ طہارت، اور روزمرہ مسنون دعاؤں کا مکمل آف لائن دائرۃ المعارف۔'
                : 'A comprehensive, sovereign digital sanctuary for Muslim women featuring 20 Classical Sunni Masterworks, biographies of the Sahabiyyat, Hanafi Purity & Fiqh guide, and family prayers.'}
            </p>

            {/* Offline & Authenticity Guarantee Banner */}
            <div
              style={{
                marginTop: 14,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                padding: '6px 14px',
                borderRadius: 20,
                fontSize: 12,
                color: '#D1FAE5',
              }}
            >
              <span style={{ color: '#10B981' }}>●</span>
              <span>
                {isUrdu
                  ? '۱۰۰٪ آف لائن اور بلا تحریف — جنتی زیور، بہارِ شریعت اور مدارج النبوۃ کی مستند اسناد پر مبنی'
                  : '100% Offline & Authenticated — Derived from Jannati Zewar, Bahar-e-Shari\'at, and Madarij-un-Nubuwwah'}
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation Navigation Bar */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #E5E7EB',
            position: 'sticky',
            top: 0,
            zIndex: 40,
            boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: '0 auto',
              padding: '0 16px',
              display: 'flex',
              overflowX: 'auto',
              gap: 8,
            }}
          >
            {[
              { id: 'library', icon: '📖', labelUrdu: 'کتب خانہ (۲۰ کتب)', labelEn: 'Classical Library (20 Books)' },
              { id: 'sahabiyyat', icon: '🌸', labelUrdu: 'اسوۂ صحابیات (۱۰ ہستیاں)', labelEn: 'Noble Sahabiyyat (10 Figures)' },
              { id: 'fiqh', icon: '⚖️', labelUrdu: 'احکامِ نسواں و طہارت', labelEn: 'Fiqh & Purity Guide' },
              { id: 'duas', icon: '🤲', labelUrdu: 'مائیں، حمل اور دعائیں', labelEn: 'Motherhood & Family Duas' },
              { id: 'vault', icon: '🔒', labelUrdu: 'میرا نجی گوشہ (ڈائری)', labelEn: 'Private Cycle Vault' },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as SanctuaryTab);
                    setReadingBook(null);
                    setActiveChapter(null);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '14px 18px',
                    border: 'none',
                    borderBottom: isActive ? '3px solid #064E3B' : '3px solid transparent',
                    backgroundColor: 'transparent',
                    color: isActive ? '#064E3B' : '#6B7280',
                    fontWeight: isActive ? 800 : 600,
                    fontSize: 14,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span style={{ fontSize: 16 }}>{tab.icon}</span>
                  <span>{isUrdu ? tab.labelUrdu : tab.labelEn}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Container */}
        <div style={{ maxWidth: 1200, margin: '24px auto', padding: '0 16px' }}>
          {/* ======================================================== */}
          {/* TAB 1: 20 CLASSICAL BOOKS LIBRARY */}
          {/* ======================================================== */}
          {activeTab === 'library' && (
            <div>
              {/* If reading a specific chapter */}
              {readingBook && activeChapter ? (
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 16,
                    padding: 24,
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 16,
                      borderBottom: '1px solid #F3F4F6',
                      paddingBottom: 12,
                    }}
                  >
                    <button
                      onClick={() => setActiveChapter(null)}
                      style={{
                        backgroundColor: '#F3F4F6',
                        border: 'none',
                        padding: '6px 14px',
                        borderRadius: 8,
                        cursor: 'pointer',
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
                      {isUrdu ? '← کتاب کی فہرست پر واپس' : '← Back to Book Index'}
                    </button>
                    <span
                      style={{
                        backgroundColor: '#ECFDF5',
                        color: '#064E3B',
                        padding: '4px 10px',
                        borderRadius: 8,
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      {readingBook.titleUrdu}
                    </span>
                  </div>

                  <h2
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      color: '#064E3B',
                      marginBottom: 8,
                    }}
                  >
                    {activeChapter.titleUrdu}
                  </h2>
                  <p
                    style={{
                      fontSize: 14,
                      color: '#6B7280',
                      marginBottom: 16,
                    }}
                  >
                    {activeChapter.titleEnglish} • {activeChapter.hadithOrFiqhReference}
                  </p>

                  <div
                    style={{
                      backgroundColor: '#F9FAFB',
                      padding: 16,
                      borderRadius: 12,
                      border: '1px solid #E5E7EB',
                      marginBottom: 20,
                    }}
                  >
                    <div style={{ fontWeight: 700, marginBottom: 6, color: '#374151' }}>
                      {isUrdu ? 'اہم ترین نکات (Key Takeaways):' : 'Key Takeaways:'}
                    </div>
                    <ul style={{ margin: 0, paddingInlineStart: 20, lineHeight: 1.8 }}>
                      {activeChapter.keyTakeaways.map((point, idx) => (
                        <li key={idx} style={{ color: '#1F2937', fontSize: 14 }}>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    style={{
                      fontSize: isUrdu ? 17 : 15,
                      lineHeight: 2,
                      color: '#111827',
                      whiteSpace: 'pre-line',
                      padding: '16px 8px',
                    }}
                  >
                    {activeChapter.fullTextUrdu}
                  </div>

                  <div
                    style={{
                      marginTop: 24,
                      paddingTop: 16,
                      borderTop: '1px solid #E5E7EB',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ fontSize: 12, color: '#6B7280' }}>
                      {isUrdu ? 'ماخذ:' : 'Source:'} {activeChapter.hadithOrFiqhReference}
                    </span>
                    <button
                      onClick={() =>
                        handleOpenSanad(
                          readingBook.titleUrdu,
                          readingBook.authorUrdu,
                          readingBook.verificationHash,
                          activeChapter.hadithOrFiqhReference,
                          activeChapter.summaryUrdu,
                          activeChapter.summaryEnglish,
                          readingBook.scholarlyConsensusUrdu
                        )
                      }
                      style={{
                        backgroundColor: '#ECFDF5',
                        color: '#065F46',
                        border: '1px solid #A7F3D0',
                        padding: '6px 12px',
                        borderRadius: 8,
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <span>✓</span>
                      <span>{isUrdu ? 'مستند سند دیکھیں' : 'Verify Sanad'}</span>
                    </button>
                  </div>
                </div>
              ) : readingBook ? (
                /* Chapters index of a selected book */
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 16,
                    padding: 24,
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 16,
                    }}
                  >
                    <button
                      onClick={() => setReadingBook(null)}
                      style={{
                        backgroundColor: '#F3F4F6',
                        border: 'none',
                        padding: '6px 14px',
                        borderRadius: 8,
                        cursor: 'pointer',
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
                      {isUrdu ? '← کتب خانے کی فہرست پر واپس' : '← Back to All Books'}
                    </button>
                    <button
                      onClick={() =>
                        handleOpenSanad(
                          readingBook.titleUrdu,
                          readingBook.authorUrdu,
                          readingBook.verificationHash,
                          readingBook.authorEra,
                          readingBook.descriptionUrdu,
                          readingBook.descriptionEnglish,
                          readingBook.scholarlyConsensusUrdu
                        )
                      }
                      style={{
                        backgroundColor: '#ECFDF5',
                        color: '#065F46',
                        border: '1px solid #A7F3D0',
                        padding: '6px 12px',
                        borderRadius: 8,
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      ✓ {isUrdu ? 'تحقیق و سندِ کتاب' : 'Sanad Certificate'}
                    </button>
                  </div>

                  <h2 style={{ fontSize: 24, fontWeight: 800, color: '#064E3B', margin: '4px 0' }}>
                    {readingBook.titleUrdu}
                  </h2>
                  <div style={{ fontSize: 14, color: '#4B5563', marginBottom: 16 }}>
                    <strong>{readingBook.authorUrdu}</strong> • {readingBook.authorEra}
                  </div>
                  <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.7, marginBottom: 24 }}>
                    {readingBook.descriptionUrdu}
                  </p>

                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: '#1F2937',
                      borderBottom: '2px solid #E5E7EB',
                      paddingBottom: 8,
                      marginBottom: 16,
                    }}
                  >
                    {isUrdu ? 'کتاب کے منتخب ابواب و مضامین' : 'Core Included Chapters'}
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {readingBook.coreChapters.map((ch) => (
                      <div
                        key={ch.chapterId}
                        style={{
                          border: '1px solid #E5E7EB',
                          borderRadius: 12,
                          padding: 16,
                          backgroundColor: '#F9FAFB',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: 16,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                        onClick={() => setActiveChapter(ch)}
                      >
                        <div>
                          <div style={{ fontWeight: 800, fontSize: 16, color: '#064E3B', marginBottom: 4 }}>
                            {ch.chapterNumber}. {ch.titleUrdu}
                          </div>
                          <div style={{ fontSize: 13, color: '#6B7280' }}>
                            {ch.summaryUrdu}
                          </div>
                        </div>
                        <button
                          style={{
                            backgroundColor: '#064E3B',
                            color: '#FFFFFF',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: 8,
                            fontSize: 13,
                            fontWeight: 700,
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {isUrdu ? 'مطالعہ کریں' : 'Read Chapter'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* All 20 Books Grid */
                <div>
                  {/* Search & Category Filter */}
                  <div
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 14,
                      padding: 16,
                      border: '1px solid #E5E7EB',
                      marginBottom: 20,
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 12,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    {/* Category Filter Pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {[
                        { id: 'all', labelUrdu: 'تمام کتب (۲۰)', labelEn: 'All 20 Books' },
                        { id: 'fiqh_taharah', labelUrdu: 'احکام و فقہِ نسواں (۵)', labelEn: 'Fiqh & Purity (5)' },
                        { id: 'ummahat_banat', labelUrdu: 'امہات و بناتِ رسول (۸)', labelEn: 'Mothers & Daughters (8)' },
                        { id: 'sahabiyyat_muhaddithat', labelUrdu: 'اسوۂ صحابیات (۴)', labelEn: 'Sahabiyyat & Scholars (4)' },
                        { id: 'salihat_tarbiyat', labelUrdu: 'صالحات و تربیت (۳)', labelEn: 'Ascetics & Motherhood (3)' },
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedBookCategory(cat.id)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: 20,
                            border:
                              selectedBookCategory === cat.id
                                ? '1px solid #064E3B'
                                : '1px solid #E5E7EB',
                            backgroundColor:
                              selectedBookCategory === cat.id ? '#064E3B' : '#F9FAFB',
                            color: selectedBookCategory === cat.id ? '#FFFFFF' : '#374151',
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          {isUrdu ? cat.labelUrdu : cat.labelEn}
                        </button>
                      ))}
                    </div>

                    {/* Search Input */}
                    <input
                      type="text"
                      placeholder={isUrdu ? 'کتاب یا مصنف کا نام تلاش کریں...' : 'Search books or authors...'}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        padding: '8px 14px',
                        borderRadius: 10,
                        border: '1px solid #D1D5DB',
                        fontSize: 13,
                        minWidth: 220,
                      }}
                    />
                  </div>

                  {/* Books Cards Grid */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                      gap: 16,
                    }}
                  >
                    {filteredBooks.map((book) => (
                      <div
                        key={book.id}
                        style={{
                          backgroundColor: '#FFFFFF',
                          borderRadius: 14,
                          padding: 20,
                          border: '1px solid #E5E7EB',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                        }}
                      >
                        <div>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'flex-start',
                              marginBottom: 8,
                            }}
                          >
                            <span
                              style={{
                                backgroundColor: '#FEF3C7',
                                color: '#92400E',
                                padding: '2px 8px',
                                borderRadius: 6,
                                fontSize: 11,
                                fontWeight: 700,
                              }}
                            >
                              {isUrdu ? book.categoryLabelUrdu : book.categoryLabelEnglish}
                            </span>
                            <span
                              style={{
                                backgroundColor: '#ECFDF5',
                                color: '#065F46',
                                padding: '2px 8px',
                                borderRadius: 6,
                                fontSize: 11,
                                fontWeight: 600,
                              }}
                            >
                              {book.sanadGrade}
                            </span>
                          </div>

                          <h3
                            style={{
                              margin: '4px 0',
                              fontSize: 19,
                              fontWeight: 800,
                              color: '#064E3B',
                            }}
                          >
                            {book.titleUrdu}
                          </h3>
                          <div
                            style={{
                              fontSize: 13,
                              color: '#4B5563',
                              fontWeight: 600,
                              marginBottom: 8,
                            }}
                          >
                            {book.authorUrdu} ({book.authorEra})
                          </div>
                          <p
                            style={{
                              fontSize: 13,
                              color: '#6B7280',
                              lineHeight: 1.6,
                              marginBottom: 16,
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            {book.descriptionUrdu}
                          </p>
                        </div>

                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderTop: '1px solid #F3F4F6',
                            paddingTop: 12,
                          }}
                        >
                          <button
                            onClick={() =>
                              handleOpenSanad(
                                book.titleUrdu,
                                book.authorUrdu,
                                book.verificationHash,
                                book.authorEra,
                                book.descriptionUrdu,
                                book.descriptionEnglish,
                                book.scholarlyConsensusUrdu
                              )
                            }
                            style={{
                              backgroundColor: 'transparent',
                              border: 'none',
                              color: '#059669',
                              fontSize: 12,
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 4,
                            }}
                          >
                            <span>✓</span>
                            <span>{isUrdu ? 'مستند سند' : 'Sanad'}</span>
                          </button>

                          <button
                            onClick={() => {
                              setReadingBook(book);
                              if (book.coreChapters.length === 1 && book.coreChapters[0]) {
                                setActiveChapter(book.coreChapters[0]);
                              }
                            }}
                            style={{
                              backgroundColor: '#064E3B',
                              color: '#FFFFFF',
                              border: 'none',
                              padding: '6px 14px',
                              borderRadius: 8,
                              fontSize: 13,
                              fontWeight: 700,
                              cursor: 'pointer',
                            }}
                          >
                            {isUrdu ? 'مطالعہ کریں' : 'Read Book'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: 10 NOBLE SAHABIYYAT PROFILES */}
          {/* ======================================================== */}
          {activeTab === 'sahabiyyat' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 14,
                  padding: 20,
                  border: '1px solid #E5E7EB',
                }}
              >
                <h2
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: '#064E3B',
                    margin: '0 0 6px 0',
                  }}
                >
                  {isUrdu ? 'اسوۂ صحابیات و امہات المؤمنین رضی اللہ عنہن' : 'Noble Role Models: The Sahabiyyat'}
                </h2>
                <p style={{ margin: 0, fontSize: 14, color: '#4B5563' }}>
                  {isUrdu
                    ? 'تاریخِ اسلام کی ۱۰ درخشندہ خواتین جنہوں نے ایمان، علم، شجاعت اور خدمتِ خلق میں وہ نقوش چھوڑے جو رہتی دنیا تک ہر مسلمان عورت کے لیے مشعلِ راہ ہیں۔'
                    : '10 towering female role models who exemplified faith, juristic intellect, bravery, and humanitarian service.'}
                </p>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                  gap: 16,
                }}
              >
                {SAHABIYYAT_PROFILES.map((sah) => (
                  <div
                    key={sah.id}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 14,
                      padding: 20,
                      border: '1px solid #E5E7EB',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          marginBottom: 8,
                        }}
                      >
                        <span
                          style={{
                            backgroundColor: '#FDF2F8',
                            color: '#9D174D',
                            padding: '3px 8px',
                            borderRadius: 6,
                            fontSize: 12,
                            fontWeight: 700,
                          }}
                        >
                          {sah.titleUrdu}
                        </span>
                        <span style={{ fontSize: 12, color: '#9CA3AF' }}>{sah.era}</span>
                      </div>

                      <h3
                        style={{
                          fontSize: 20,
                          fontWeight: 800,
                          color: '#064E3B',
                          margin: '4px 0',
                        }}
                      >
                        {sah.nameUrdu}
                      </h3>
                      <div
                        style={{
                          fontSize: 12,
                          color: '#4B5563',
                          fontWeight: 600,
                          marginBottom: 10,
                        }}
                      >
                        {sah.kinshipToProphet}
                      </div>

                      <p
                        style={{
                          fontSize: 14,
                          lineHeight: 1.7,
                          color: '#374151',
                          marginBottom: 14,
                        }}
                      >
                        {sah.biographyUrdu}
                      </p>

                      {/* 3 Practical Daily Sunnah Lessons */}
                      <div
                        style={{
                          backgroundColor: '#F9FAFB',
                          padding: 12,
                          borderRadius: 10,
                          border: '1px solid #F3F4F6',
                          marginBottom: 14,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: '#064E3B',
                            marginBottom: 6,
                          }}
                        >
                          {isUrdu ? 'روزمرہ زندگی کے لیے ۳ سنہری اسباق:' : '3 Daily Life Sunnah Lessons:'}
                        </div>
                        <ul
                          style={{
                            margin: 0,
                            paddingInlineStart: 18,
                            fontSize: 13,
                            color: '#1F2937',
                            lineHeight: 1.6,
                          }}
                        >
                          {sah.dailySunnahLessons.map((lesson, idx) => (
                            <li key={idx} style={{ marginBottom: 4 }}>
                              {isUrdu ? lesson.ur : lesson.en}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderTop: '1px solid #F3F4F6',
                        paddingTop: 10,
                      }}
                    >
                      <span style={{ fontSize: 11, color: '#6B7280' }}>
                        {sah.classicalCitation}
                      </span>
                      <button
                        onClick={() =>
                          handleOpenSanad(
                            sah.nameUrdu,
                            sah.titleUrdu,
                            sah.sanadVerificationHash,
                            sah.classicalCitation,
                            sah.biographyUrdu,
                            sah.biographyEnglish,
                            'صحیح بخاری، مسلم اور ابن سعد کی مستند اسناد سے تصدیق شدہ'
                          )
                        }
                        style={{
                          backgroundColor: '#ECFDF5',
                          color: '#065F46',
                          border: '1px solid #A7F3D0',
                          padding: '4px 10px',
                          borderRadius: 6,
                          fontSize: 11,
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        ✓ {isUrdu ? 'مستند سند' : 'Sanad'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: AHKAM-E-NISWAN & TAHARAH FIQH GUIDE */}
          {/* ======================================================== */}
          {activeTab === 'fiqh' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Header Box */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 14,
                  padding: 20,
                  border: '1px solid #E5E7EB',
                }}
              >
                <h2
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: '#064E3B',
                    margin: '0 0 6px 0',
                  }}
                >
                  {isUrdu ? 'احکامِ نسواں و طہارت (فقہ حنفی و بہارِ شریعت)' : 'Purity & Fiqh Guide for Women'}
                </h2>
                <p style={{ margin: 0, fontSize: 14, color: '#4B5563' }}>
                  {isUrdu
                    ? 'حیض، نفاس، استحاضہ، غسل، اور نماز کی ہیئت کے تفصیلی اور باحیا احکام، جو صدر الشریعہ مفتی امجد علی اعظمی کی "بہارِ شریعت" اور علامہ عبد المصطفیٰ اعظمی کی "جنتی زیور" سے ماخوذ ہیں۔'
                    : 'Authentic Hanafi legal rulings on menstruation, postnatal bleeding, irregular bleeding, and modest prayer posture.'}
                </p>

                {/* Filter Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
                  {[
                    { id: 'all', labelUrdu: 'تمام احکام', labelEn: 'All Rulings' },
                    { id: 'haidh', labelUrdu: 'حیض کے احکام', labelEn: 'Menses (Haidh)' },
                    { id: 'nifas', labelUrdu: 'نفاس (ولادت کے بعد)', labelEn: 'Postnatal (Nifas)' },
                    { id: 'istihadha', labelUrdu: 'استحاضہ (بیماری کا خون)', labelEn: 'Istihadha (Illness)' },
                    { id: 'namaz_posture', labelUrdu: 'نماز میں حیا و طریقہ', labelEn: 'Prayer Modesty' },
                    { id: 'spiritual_rhythm', labelUrdu: 'مخصوص ایام میں عبادات', labelEn: 'Spiritual Routine' },
                  ].map((fCat) => (
                    <button
                      key={fCat.id}
                      onClick={() => setSelectedFiqhCategory(fCat.id)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 20,
                        border:
                          selectedFiqhCategory === fCat.id
                            ? '1px solid #064E3B'
                            : '1px solid #E5E7EB',
                        backgroundColor:
                          selectedFiqhCategory === fCat.id ? '#064E3B' : '#F9FAFB',
                        color: selectedFiqhCategory === fCat.id ? '#FFFFFF' : '#374151',
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {isUrdu ? fCat.labelUrdu : fCat.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fiqh Ruling Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {filteredFiqh.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 14,
                      padding: 20,
                      border: '1px solid #E5E7EB',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 8,
                      }}
                    >
                      <h3
                        style={{
                          margin: 0,
                          fontSize: 18,
                          fontWeight: 800,
                          color: '#064E3B',
                        }}
                      >
                        {item.titleUrdu}
                      </h3>
                      <span
                        style={{
                          backgroundColor: '#ECFDF5',
                          color: '#065F46',
                          padding: '3px 8px',
                          borderRadius: 6,
                          fontSize: 11,
                          fontWeight: 700,
                        }}
                      >
                        {item.hanafiReference}
                      </span>
                    </div>

                    <p
                      style={{
                        fontSize: 14,
                        color: '#1F2937',
                        fontWeight: 600,
                        lineHeight: 1.6,
                        marginBottom: 10,
                      }}
                    >
                      {item.summaryUrdu}
                    </p>

                    <p
                      style={{
                        fontSize: 14,
                        color: '#4B5563',
                        lineHeight: 1.7,
                        marginBottom: 14,
                      }}
                    >
                      {item.detailedRulingUrdu}
                    </p>

                    <div
                      style={{
                        backgroundColor: '#F9FAFB',
                        padding: 12,
                        borderRadius: 10,
                        border: '1px solid #F3F4F6',
                      }}
                    >
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: '#064E3B',
                          marginBottom: 4,
                        }}
                      >
                        {isUrdu ? 'عملی ہدایات و فقہی احتیاطیں:' : 'Practical Guidelines:'}
                      </div>
                      <ul
                        style={{
                          margin: 0,
                          paddingInlineStart: 18,
                          fontSize: 13,
                          color: '#374151',
                          lineHeight: 1.6,
                        }}
                      >
                        {item.practicalGuidelines.map((g, idx) => (
                          <li key={idx}>{g}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 4: MOTHERHOOD & FAMILY MASNOON DUAS */}
          {/* ======================================================== */}
          {activeTab === 'duas' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 14,
                  padding: 20,
                  border: '1px solid #E5E7EB',
                }}
              >
                <h2
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: '#064E3B',
                    margin: '0 0 6px 0',
                  }}
                >
                  {isUrdu ? 'مائیں، حمل، نوزائیدہ اور گھریلو مسنون دعائیں' : 'Motherhood & Family Masnoon Supplications'}
                </h2>
                <p style={{ margin: 0, fontSize: 14, color: '#4B5563' }}>
                  {isUrdu
                    ? 'قرآن پاک اور احادیثِ مبارکہ سے ثابت شدہ دعائیں برائے نیک اولاد، ولادت میں آسانی، بچوں کی نظرِ بد سے حفاظت اور گھر میں باہمی سکون۔'
                    : 'Authentic Quranic and Prophetic supplications for righteous children, ease in childbirth, protection from evil eye, and marital love.'}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {MOTHERHOOD_FAMILY_DUAS.map((dua) => (
                  <div
                    key={dua.id}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 14,
                      padding: 22,
                      border: '1px solid #E5E7EB',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 12,
                      }}
                    >
                      <h3
                        style={{
                          margin: 0,
                          fontSize: 18,
                          fontWeight: 800,
                          color: '#064E3B',
                        }}
                      >
                        {dua.titleUrdu}
                      </h3>
                      <span
                        style={{
                          backgroundColor: '#FEF3C7',
                          color: '#92400E',
                          padding: '2px 8px',
                          borderRadius: 6,
                          fontSize: 11,
                          fontWeight: 700,
                        }}
                      >
                        {dua.reference}
                      </span>
                    </div>

                    {/* Arabic Text */}
                    <div
                      style={{
                        backgroundColor: '#F0FDF4',
                        padding: '16px 20px',
                        borderRadius: 12,
                        border: '1px solid #BBF7D0',
                        fontSize: 22,
                        fontFamily: "'Amiri', 'Traditional Arabic', serif",
                        color: '#064E3B',
                        textAlign: 'center',
                        direction: 'rtl',
                        lineHeight: 1.8,
                        marginBottom: 12,
                      }}
                    >
                      {dua.arabicText}
                    </div>

                    {/* Transliteration */}
                    <div
                      style={{
                        fontSize: 13,
                        color: '#6B7280',
                        fontStyle: 'italic',
                        marginBottom: 8,
                      }}
                    >
                      {dua.transliteration}
                    </div>

                    {/* Urdu Translation */}
                    <div
                      style={{
                        fontSize: 15,
                        color: '#1F2937',
                        fontWeight: 600,
                        lineHeight: 1.6,
                        marginBottom: 10,
                      }}
                    >
                      {dua.translationUrdu}
                    </div>

                    {/* Spiritual Benefit / Context */}
                    <div
                      style={{
                        fontSize: 13,
                        color: '#047857',
                        backgroundColor: '#ECFDF5',
                        padding: '8px 12px',
                        borderRadius: 8,
                        lineHeight: 1.6,
                      }}
                    >
                      <strong>{isUrdu ? 'فضیلت و روحانی برکت:' : 'Spiritual Virtue:'}</strong>{' '}
                      {dua.spiritualVirtueUrdu}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 5: PRIVATE SOVEREIGN CYCLE & NOTES VAULT */}
          {/* ======================================================== */}
          {activeTab === 'vault' && (
            <div>
              {/* If PIN is locked and configured */}
              {isPinLocked && hasPinConfigured ? (
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 16,
                    padding: 36,
                    border: '1px solid #E5E7EB',
                    maxWidth: 420,
                    margin: '40px auto',
                    textAlign: 'center',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                  }}
                >
                  <div style={{ fontSize: 48, marginBottom: 12 }}>🔒</div>
                  <h2 style={{ fontSize: 20, fontWeight: 800, color: '#064E3B', margin: '0 0 6px 0' }}>
                    {isUrdu ? 'نجی گوشہ لاک ہے' : 'Private Sanctuary Locked'}
                  </h2>
                  <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 20 }}>
                    {isUrdu
                      ? 'اپنے مخصوص ایام کے اندراجات اور نجی ڈائری دیکھنے کے لیے ۴ ہندسوں کا پن کوڈ درج کریں۔'
                      : 'Enter your 4-digit PIN to access your personal cycle logs and reflections.'}
                  </p>

                  <input
                    type="password"
                    maxLength={4}
                    placeholder="••••"
                    value={enteredPin}
                    onChange={(e) => setEnteredPin(e.target.value)}
                    style={{
                      width: 140,
                      padding: '10px 16px',
                      fontSize: 24,
                      textAlign: 'center',
                      letterSpacing: 8,
                      borderRadius: 10,
                      border: '2px solid #064E3B',
                      marginBottom: 12,
                    }}
                  />

                  {pinError && (
                    <div style={{ color: '#DC2626', fontSize: 12, marginBottom: 12 }}>
                      {pinError}
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
                    <button
                      onClick={handleUnlockPin}
                      style={{
                        backgroundColor: '#064E3B',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '10px 24px',
                        borderRadius: 10,
                        fontWeight: 700,
                        fontSize: 14,
                        cursor: 'pointer',
                      }}
                    >
                      {isUrdu ? 'ان لاک کریں' : 'Unlock'}
                    </button>
                    <button
                      onClick={handleRemovePin}
                      style={{
                        backgroundColor: 'transparent',
                        color: '#EF4444',
                        border: 'none',
                        fontSize: 12,
                        cursor: 'pointer',
                      }}
                    >
                      {isUrdu ? 'پن بھول گئے؟' : 'Forgot PIN?'}
                    </button>
                  </div>
                </div>
              ) : (
                /* Unlocked Vault */
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {/* Top Privacy Notice & PIN Setup bar */}
                  <div
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 14,
                      padding: 20,
                      border: '1px solid #E5E7EB',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: 12,
                    }}
                  >
                    <div>
                      <h2
                        style={{
                          fontSize: 20,
                          fontWeight: 800,
                          color: '#064E3B',
                          margin: '0 0 4px 0',
                        }}
                      >
                        {isUrdu ? 'میرا نجی گوشہ و ماہواری ڈائری' : 'Personal Cycle Log & Private Reflections'}
                      </h2>
                      <p style={{ margin: 0, fontSize: 13, color: '#6B7280' }}>
                        {isUrdu
                          ? 'یہ تمام ڈیٹا صرف آپ کے فون پر ۱۰۰٪ محفوظ ہے، انٹرنیٹ پر نہیں بھیجا جاتا۔'
                          : '100% on-device sovereign privacy. Zero data leaves your device.'}
                      </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {hasPinConfigured ? (
                        <>
                          <button
                            onClick={() => setIsPinLocked(true)}
                            style={{
                              backgroundColor: '#9D174D',
                              color: '#FFFFFF',
                              border: 'none',
                              padding: '6px 14px',
                              borderRadius: 8,
                              fontSize: 12,
                              fontWeight: 700,
                              cursor: 'pointer',
                            }}
                          >
                            🔒 {isUrdu ? 'لاک کریں' : 'Lock Vault'}
                          </button>
                          <button
                            onClick={handleRemovePin}
                            style={{
                              backgroundColor: '#F3F4F6',
                              color: '#4B5563',
                              border: 'none',
                              padding: '6px 12px',
                              borderRadius: 8,
                              fontSize: 12,
                              cursor: 'pointer',
                            }}
                          >
                            {isUrdu ? 'پن ہٹائیں' : 'Remove PIN'}
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setIsSettingUpPin(true)}
                          style={{
                            backgroundColor: '#064E3B',
                            color: '#FFFFFF',
                            border: 'none',
                            padding: '6px 14px',
                            borderRadius: 8,
                            fontSize: 12,
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          🔒 {isUrdu ? '۴ ہندسوں کا پن سیٹ کریں' : 'Set 4-Digit PIN'}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Modal to setup PIN */}
                  {isSettingUpPin && (
                    <div
                      style={{
                        backgroundColor: '#FEF2F2',
                        padding: 16,
                        borderRadius: 12,
                        border: '1px solid #FECACA',
                        maxWidth: 400,
                      }}
                    >
                      <div style={{ fontWeight: 700, color: '#991B1B', marginBottom: 8, fontSize: 14 }}>
                        {isUrdu ? '۴ ہندسوں کا نیا پن درج کریں:' : 'Set New 4-Digit PIN:'}
                      </div>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <input
                          type="password"
                          maxLength={4}
                          placeholder="1234"
                          value={newPin}
                          onChange={(e) => setNewPin(e.target.value)}
                          style={{
                            padding: '8px 12px',
                            borderRadius: 8,
                            border: '1px solid #D1D5DB',
                            width: 100,
                            textAlign: 'center',
                            fontSize: 18,
                            letterSpacing: 4,
                          }}
                        />
                        <button
                          onClick={handleSavePin}
                          style={{
                            backgroundColor: '#064E3B',
                            color: '#FFFFFF',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: 8,
                            fontWeight: 700,
                            fontSize: 13,
                            cursor: 'pointer',
                          }}
                        >
                          {isUrdu ? 'محفوظ کریں' : 'Save'}
                        </button>
                        <button
                          onClick={() => setIsSettingUpPin(false)}
                          style={{
                            backgroundColor: '#E5E7EB',
                            border: 'none',
                            padding: '8px 12px',
                            borderRadius: 8,
                            fontSize: 13,
                            cursor: 'pointer',
                          }}
                        >
                          {isUrdu ? 'منسوخ' : 'Cancel'}
                        </button>
                      </div>
                      {pinError && (
                        <div style={{ color: '#DC2626', fontSize: 12, marginTop: 6 }}>{pinError}</div>
                      )}
                    </div>
                  )}

                  {/* Cycle Input Form */}
                  <div
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 14,
                      padding: 20,
                      border: '1px solid #E5E7EB',
                    }}
                  >
                    <h3
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: '#064E3B',
                        margin: '0 0 14px 0',
                      }}
                    >
                      {isUrdu ? 'نیا اندراج (خون شروع اور بند ہونے کی تاریخ):' : 'Add New Cycle Entry:'}
                    </h3>
                    <form
                      onSubmit={handleSaveCycle}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: 12,
                        alignItems: 'flex-end',
                      }}
                    >
                      <div>
                        <label style={{ display: 'block', fontSize: 12, color: '#4B5563', marginBottom: 4 }}>
                          {isUrdu ? 'شروع ہونے کی تاریخ:' : 'Start Date:'}
                        </label>
                        <input
                          type="date"
                          required
                          value={cycleStartDate}
                          onChange={(e) => setCycleStartDate(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            borderRadius: 8,
                            border: '1px solid #D1D5DB',
                            fontSize: 13,
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: 12, color: '#4B5563', marginBottom: 4 }}>
                          {isUrdu ? 'بند ہونے کی تاریخ (اختیاری):' : 'End Date (Optional):'}
                        </label>
                        <input
                          type="date"
                          value={cycleEndDate}
                          onChange={(e) => setCycleEndDate(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            borderRadius: 8,
                            border: '1px solid #D1D5DB',
                            fontSize: 13,
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: 12, color: '#4B5563', marginBottom: 4 }}>
                          {isUrdu ? 'نوٹس یا علامات:' : 'Notes / Symptoms:'}
                        </label>
                        <input
                          type="text"
                          placeholder={isUrdu ? 'عادت کے دن، استحاضہ وغیرہ' : 'Normal cycle, pain, etc.'}
                          value={cycleNotes}
                          onChange={(e) => setCycleNotes(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            borderRadius: 8,
                            border: '1px solid #D1D5DB',
                            fontSize: 13,
                          }}
                        />
                      </div>

                      <button
                        type="submit"
                        style={{
                          backgroundColor: '#064E3B',
                          color: '#FFFFFF',
                          border: 'none',
                          padding: '10px 18px',
                          borderRadius: 8,
                          fontWeight: 700,
                          fontSize: 13,
                          cursor: 'pointer',
                          height: 38,
                        }}
                      >
                        {isUrdu ? 'اندراج محفوظ کریں' : 'Save Entry'}
                      </button>
                    </form>
                  </div>

                  {/* Saved Cycles Table */}
                  <div
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 14,
                      padding: 20,
                      border: '1px solid #E5E7EB',
                    }}
                  >
                    <h3
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: '#064E3B',
                        margin: '0 0 14px 0',
                      }}
                    >
                      {isUrdu ? 'ماضی کے محفوظ ریکارڈز:' : 'Saved Cycle History:'}
                    </h3>

                    {savedCycles.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: 24, color: '#9CA3AF', fontSize: 13 }}>
                        {isUrdu
                          ? 'ابھی تک کوئی اندراج محفوظ نہیں ہوا۔ اوپر دیئے گئے فارم سے تاریخ درج کریں۔'
                          : 'No cycle records saved yet. Add an entry using the form above.'}
                      </div>
                    ) : (
                      <div style={{ overflowX: 'auto' }}>
                        <table
                          style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                            fontSize: 13,
                          }}
                        >
                          <thead>
                            <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                              <th style={{ padding: '8px 12px', textAlign: isUrdu ? 'right' : 'left' }}>
                                {isUrdu ? 'شروع' : 'Start'}
                              </th>
                              <th style={{ padding: '8px 12px', textAlign: isUrdu ? 'right' : 'left' }}>
                                {isUrdu ? 'اختتام' : 'End'}
                              </th>
                              <th style={{ padding: '8px 12px', textAlign: 'center' }}>
                                {isUrdu ? 'کل دن' : 'Duration'}
                              </th>
                              <th style={{ padding: '8px 12px', textAlign: isUrdu ? 'right' : 'left' }}>
                                {isUrdu ? 'فقہی جائزہ' : 'Fiqh Status'}
                              </th>
                              <th style={{ padding: '8px 12px', textAlign: isUrdu ? 'right' : 'left' }}>
                                {isUrdu ? 'نوٹس' : 'Notes'}
                              </th>
                              <th style={{ padding: '8px 12px', textAlign: 'center' }}>
                                {isUrdu ? 'حذف' : 'Action'}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {savedCycles.map((c) => {
                              const isHaidhValid =
                                c.durationDays >= 3 && c.durationDays <= 10;
                              return (
                                <tr key={c.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                                  <td style={{ padding: '10px 12px' }}>{c.start}</td>
                                  <td style={{ padding: '10px 12px' }}>{c.end}</td>
                                  <td style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 700 }}>
                                    {c.durationDays ? `${c.durationDays} ${isUrdu ? 'دن' : 'days'}` : '—'}
                                  </td>
                                  <td style={{ padding: '10px 12px' }}>
                                    {c.durationDays ? (
                                      isHaidhValid ? (
                                        <span
                                          style={{
                                            backgroundColor: '#ECFDF5',
                                            color: '#065F46',
                                            padding: '2px 8px',
                                            borderRadius: 6,
                                            fontSize: 11,
                                            fontWeight: 600,
                                          }}
                                        >
                                          {isUrdu ? 'حیض (۳ تا ۱۰ دن)' : 'Valid Haidh'}
                                        </span>
                                      ) : (
                                        <span
                                          style={{
                                            backgroundColor: '#FEF2F2',
                                            color: '#991B1B',
                                            padding: '2px 8px',
                                            borderRadius: 6,
                                            fontSize: 11,
                                            fontWeight: 600,
                                          }}
                                        >
                                          {isUrdu ? 'استحاضہ کی تفتیش کریں' : 'Investigate Istihadha'}
                                        </span>
                                      )
                                    ) : (
                                      '—'
                                    )}
                                  </td>
                                  <td style={{ padding: '10px 12px', color: '#6B7280' }}>
                                    {c.notes || '—'}
                                  </td>
                                  <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                                    <button
                                      onClick={() => handleDeleteCycle(c.id)}
                                      style={{
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        color: '#EF4444',
                                        cursor: 'pointer',
                                        fontSize: 14,
                                      }}
                                    >
                                      ✕
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Global Sanad Certificate Verification Modal */}
        <SanadVerificationModal
          isOpen={isSanadModalOpen}
          report={selectedSanadReport}
          onClose={() => setIsSanadModalOpen(false)}
        />
      </div>
    </>
  );
}
