import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Navigation } from '../components/Navigation';
import { AmalTheme } from '@amal/ui';
import { MASTER_CANONICAL_CORPUS, CanonicalEditionRecord } from '@amal/evidence';
import { QURAN_SURAHS_COLLECTION, QuranSurahData } from '../lib/quran-surahs-data';
import { ALL_114_SURAHS, QuranSurahMeta } from '../lib/quran-114-directory';
import { getBookChapters, getVerifiedSourceUrl, ClassicalBookWithChapters, ClassicalChapter } from '../lib/classical-chapters-data';
import { getAyahWisdomCard, QuranAyahWisdomCard, getAyahAudioUrl } from '../lib/quran-wisdom-data';
import { AyahWisdomModal } from '../components/AyahWisdomModal';
import { showAmalToast } from '../components/Toast';

export default function LibraryPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState('ALL');
  const [selectedWork, setSelectedWork] = useState<CanonicalEditionRecord | null>(MASTER_CANONICAL_CORPUS[0] || null);

  // In-App Reader State
  const [isReaderModalOpen, setIsReaderModalOpen] = useState(false);
  const [readerTheme, setReaderTheme] = useState<'CLEAN' | 'SEPIA' | 'DARK'>('CLEAN');
  const [fontSize, setFontSize] = useState<number>(18);

  // Quran 114 Surahs Reader State
  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number>(1);
  const [surahSearchFilter, setSurahSearchFilter] = useState<string>('');
  const [loadedSurahsCache, setLoadedSurahsCache] = useState<Record<number, QuranSurahData>>(() => {
    const initial: Record<number, QuranSurahData> = {};
    for (const s of QURAN_SURAHS_COLLECTION) {
      initial[s.surahNumber] = s;
    }
    return initial;
  });
  const [isLoadingSurah, setIsLoadingSurah] = useState<boolean>(false);
  const [surahFetchError, setSurahFetchError] = useState<string | null>(null);

  // Multi-Chapter Classical Book Sub-State
  const [selectedChapterIndex, setSelectedChapterIndex] = useState<number>(0);

  // Quran Ayah Wisdom Modal State
  const [activeWisdomAyah, setActiveWisdomAyah] = useState<{ surahNumber: number; ayahNumber: number } | null>(null);
  const [wisdomTab, setWisdomTab] = useState<'KHAZAIN' | 'KANZ' | 'IBN_KATHIR' | 'ENGLISH' | 'REFERENCES' | 'AMAL'>('KHAZAIN');
  const [selectedQari, setSelectedQari] = useState<'alafasy' | 'husary'>('alafasy');
  const [userWisdomNote, setUserWisdomNote] = useState('');


  const filterCategories = [
    { key: 'ALL', label: `All Works (${MASTER_CANONICAL_CORPUS.length})` },
    { key: 'DUA', label: 'Duas & Liturgies (ادعیہ و اوراد)' },
    { key: 'HADITH', label: 'Hadith & Shurooh' },
    { key: 'TAFSIR', label: 'Tafsir' },
    { key: 'HANAFI', label: 'Hanafi Fiqh' },
    { key: 'MALIKI', label: 'Maliki Fiqh' },
    { key: 'SHAFII', label: 'Shafi\'i Fiqh' },
    { key: 'HANBALI', label: 'Hanbali Fiqh' },
    { key: 'USUL', label: 'Usul & Qawa\'id' },
    { key: 'MUSTALAH', label: 'Mustalah' },
    { key: 'AQEEDAH', label: 'Aqeedah' },
    { key: 'SIRAH', label: 'Sirah & Shama\'il' },
    { key: 'TAZKIYAH', label: 'Tazkiyah & Tasawwuf' },
    { key: 'HISTORY', label: 'Tarikh & Tabaqat' },
  ];

  const filteredWorks = MASTER_CANONICAL_CORPUS.filter((item) => {
    // Discipline filter
    if (selectedDiscipline === 'DUA' && !item.work_id.includes('DUA') && !item.work_id.includes('DEV')) return false;
    if (selectedDiscipline === 'HANAFI' && item.discipline !== 'HANAFI_FIQH') return false;
    if (selectedDiscipline === 'MALIKI' && item.discipline !== 'MALIKI_FIQH') return false;
    if (selectedDiscipline === 'SHAFII' && item.discipline !== 'SHAFII_FIQH') return false;
    if (selectedDiscipline === 'HANBALI' && item.discipline !== 'HANBALI_FIQH') return false;
    if (selectedDiscipline === 'SIRAH' && item.discipline !== 'SIRAH' && item.discipline !== 'SHAMAIL') return false;
    if (selectedDiscipline === 'TAZKIYAH' && item.discipline !== 'TAZKIYAH' && item.discipline !== 'SPIRITUAL_HERITAGE') return false;
    if (selectedDiscipline === 'USUL' && item.discipline !== 'USUL_AL_FIQH') return false;
    if (selectedDiscipline === 'MUSTALAH' && item.discipline !== 'MUSTALAH_AL_HADITH') return false;
    if (selectedDiscipline === 'HISTORY' && item.discipline !== 'ISLAMIC_HISTORY') return false;
    if (selectedDiscipline === 'HADITH' && item.discipline !== 'HADITH') return false;
    if (selectedDiscipline === 'TAFSIR' && item.discipline !== 'TAFSIR') return false;
    if (selectedDiscipline === 'AQEEDAH' && item.discipline !== 'AQEEDAH') return false;

    // Search query filter
    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        item.title_arabic.includes(search) ||
        item.title_transliterated.toLowerCase().includes(q) ||
        item.author_name.toLowerCase().includes(q) ||
        item.edition_publisher.toLowerCase().includes(q) ||
        item.critical_editor_muhaqqiq.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const isQuran = selectedWork?.discipline === 'QURAN' || selectedWork?.work_id === 'CANON-QUR-001';
  const verifiedSource = selectedWork ? getVerifiedSourceUrl(selectedWork.work_id, selectedWork.discipline) : { url: 'https://shamela.ws', name: 'Al-Maktaba al-Shamela' };
  const hasSelectedInAppChapters = isQuran || !!(selectedWork && getBookChapters(selectedWork.work_id));

  const bookChaptersData: ClassicalBookWithChapters | null = selectedWork && !isQuran
    ? getBookChapters(
        selectedWork.work_id,
        selectedWork.title_arabic,
        selectedWork.title_transliterated,
        selectedWork.author_name,
        selectedWork.discipline
      )
    : null;

  // Auto-open book or surah from deep-link query params (?work=... or ?surah=...)
  useEffect(() => {
    if (!router.isReady) return;
    const { work, surah } = router.query;
    if (work && typeof work === 'string') {
      const found = MASTER_CANONICAL_CORPUS.find(w => w.work_id === work);
      if (found) {
        setSelectedWork(found);
        setIsReaderModalOpen(true);
      }
    } else if (surah && typeof surah === 'string') {
      const sNum = parseInt(surah, 10);
      if (!isNaN(sNum) && sNum >= 1 && sNum <= 114) {
        const quranWork = MASTER_CANONICAL_CORPUS.find(w => w.discipline === 'QURAN') || MASTER_CANONICAL_CORPUS[0];
        if (quranWork) setSelectedWork(quranWork);
        handleSelectSurah(sNum);
        setIsReaderModalOpen(true);
      }
    }
  }, [router.isReady, router.query]);

  const handleOpenReader = () => {
    setIsReaderModalOpen(true);
    showAmalToast(`Opened Reader for ${selectedWork?.title_transliterated}`, 'info');
  };

  // Dynamic Surah Fetcher for All 114 Surahs
  const handleSelectSurah = async (surahNum: number) => {
    setSelectedSurahNumber(surahNum);
    setSurahFetchError(null);

    const meta = ALL_114_SURAHS.find(s => s.number === surahNum);
    // If already in memory cache and contains all ayahs, display instantly
    if (loadedSurahsCache[surahNum] && meta && loadedSurahsCache[surahNum].verses.length >= meta.ayahsCount) {
      return;
    }

    setIsLoadingSurah(true);
    try {
      // Standard open CORS-enabled endpoint: Arabic (uthmani), Urdu Kanzul Iman (ur.kanzuliman), English (sahih)
      const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahNum}/editions/quran-uthmani,ur.kanzuliman,en.sahih`);
      if (!res.ok) {
        throw new Error(`HTTP Error ${res.status}`);
      }
      const data = await res.json();
      if (data.code === 200 && Array.isArray(data.data) && data.data.length >= 3) {
        const uthmani = data.data[0];
        const urdu = data.data[1];
        const english = data.data[2];
        const meta = ALL_114_SURAHS.find(s => s.number === surahNum);

        const verses = uthmani.ayahs.map((ayah: any, idx: number) => ({
          ayahNumber: ayah.numberInSurah,
          textArabic: ayah.text,
          textUrdu: urdu.ayahs[idx]?.text || '',
          textEnglish: english.ayahs[idx]?.text || '',
        }));

        const newSurah: QuranSurahData = {
          surahNumber: surahNum,
          nameArabic: meta?.nameArabic || uthmani.name,
          nameTransliterated: meta?.nameTransliterated || uthmani.englishName,
          nameUrdu: meta?.nameUrdu || '',
          nameEnglish: meta?.nameEnglish || uthmani.englishNameTranslation,
          revelationType: (meta?.revelationType || (uthmani.revelationType === 'Meccan' ? 'MECCAN' : 'MEDINAN')) as any,
          ayahsCount: meta?.ayahsCount || uthmani.numberOfAyahs,
          verses,
        };

        setLoadedSurahsCache(prev => ({ ...prev, [surahNum]: newSurah }));
      } else {
        throw new Error('Invalid response structure from Quran API');
      }
    } catch (err: any) {
      console.warn('Surah online load failed, checking fallback:', err);
      setSurahFetchError('Internet connection required to download this Surah for the first time. Beloved daily Surahs (1, 2, 36, 67, 112, 113, 114) are pre-loaded offline.');
    } finally {
      setIsLoadingSurah(false);
    }
  };

  const currentSurah = loadedSurahsCache[selectedSurahNumber] || loadedSurahsCache[1]!;
  const currentSurahMeta = ALL_114_SURAHS.find(s => s.number === selectedSurahNumber) || ALL_114_SURAHS[0]!;
  const currentChapter = bookChaptersData?.chapters[selectedChapterIndex] || bookChaptersData?.chapters[0];

  // Beloved Surahs Quick Jump Shortcuts
  const belovedSurahShortcuts = [
    { num: 1, label: 'الفاتحة' },
    { num: 18, label: 'الكهف' },
    { num: 36, label: 'يس' },
    { num: 55, label: 'الرحمن' },
    { num: 56, label: 'الواقعة' },
    { num: 67, label: 'الملك' },
    { num: 112, label: 'الإخلاص' },
    { num: 113, label: 'الفلق' },
    { num: 114, label: 'الناس' },
  ];

  // Filter 114 Surahs by search query
  const filteredSurahList = ALL_114_SURAHS.filter(s => {
    if (!surahSearchFilter.trim()) return true;
    const q = surahSearchFilter.toLowerCase().trim();
    return (
      s.number.toString() === q ||
      s.nameTransliterated.toLowerCase().includes(q) ||
      s.nameArabic.includes(surahSearchFilter.trim()) ||
      s.nameUrdu.includes(surahSearchFilter.trim()) ||
      s.nameEnglish.toLowerCase().includes(q)
    );
  });

  return (
    <div style={{ backgroundColor: AmalTheme.colors.surface.backgroundLight, minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Head>
        <title>AMAL OS — Canonical Heritage Library & Reader (الكتب المعتمدة)</title>
      </Head>

      <Navigation />

      <main style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px 80px' }}>
        {/* Breadcrumb / Top Bar */}
        <div style={{ padding: '16px 0 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#666' }}>
            <Link href="/" style={{ color: AmalTheme.colors.primary, textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <span>Canonical Heritage Library (الكتب المعتمدة)</span>
          </div>
          <div style={{ fontSize: 12, color: '#888' }}>
            {MASTER_CANONICAL_CORPUS.length} Classical Masterworks Registered · Zero Synthetic Fiqh
          </div>
        </div>

        {/* Header Hero */}
        <header style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          padding: '28px 32px',
          border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
          marginBottom: 24,
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <span style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 1.2,
                  textTransform: 'uppercase',
                  color: AmalTheme.colors.primary,
                  backgroundColor: '#E8F5E9',
                  padding: '4px 10px',
                  borderRadius: 12,
                }}>
                  THE AHL AL-SUNNAH CANON
                </span>
                <span style={{ fontSize: 13, color: '#666' }}>•</span>
                <span style={{ fontSize: 13, color: '#444', fontWeight: 600 }}>
                  Sawād al-A'zam (سوادِ اعظم) Heritage
                </span>
              </div>
              <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0F172A', margin: '4px 0 8px' }}>
                Canonical Heritage Library & In-App Reader
              </h1>
              <p style={{ fontSize: 14, color: '#555', maxWidth: 720, lineHeight: 1.5, margin: 0 }}>
                Explore the verified masterworks of Islam: The Holy Quran (Full 114 Surahs), Sahih al-Bukhari, Sahih Muslim, Mukhtasar al-Quduri, and Ihya Ulum al-Din with complete in-app readers, zero dead links, and 100% theological authenticity.
              </p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span style={{
                display: 'inline-block',
                padding: '6px 14px',
                borderRadius: 20,
                fontSize: 12,
                backgroundColor: '#E8F5E9',
                color: '#2E7D32',
                fontWeight: 700,
              }}>
                100% VERIFIED AUTHENTIC
              </span>
              <div style={{ fontSize: 11, color: '#777', marginTop: 4 }}>
                Zero Fabrications · Two-Scholar Protocol
              </div>
            </div>
          </div>
        </header>

        {/* Dedicated Quran & Wisdom Hub Quick Jump Banner */}
        <div
          style={{
            backgroundColor: '#F0FDF4',
            borderRadius: 14,
            padding: '16px 20px',
            border: '1px solid #86EFAC',
            marginBottom: 20,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 24 }}>📖</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#166534' }}>
                Looking for the Dedicated Quran Wisdom &amp; Listening Experience?
              </div>
              <div style={{ fontSize: 12, color: '#4B5563' }}>
                Complete 114 Surahs, Kanz-ul-Iman Tarjuma, Khaza&apos;in-ul-Irfan Tafsir, and 2-min Quick Wisdom cards.
              </div>
            </div>
          </div>

          <Link
            href="/quran"
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              backgroundColor: '#166534',
              color: '#FFFFFF',
              textDecoration: 'none',
              fontSize: 12,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span>Open Al-Quran &amp; Wisdom</span>
            <span>➔</span>
          </Link>
        </div>

        {/* Search & Filter Controls */}
        <section style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          padding: 20,
          border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
          marginBottom: 24,
        }}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by book title (Arabic or English), author, publisher, or muhaqqiq..."
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: 14,
              borderRadius: 8,
              border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
              outline: 'none',
              boxSizing: 'border-box',
              marginBottom: 14,
            }}
          />

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {filterCategories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedDiscipline(cat.key)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 20,
                  border: '1px solid #CCC',
                  fontSize: 12,
                  fontWeight: 600,
                  backgroundColor: selectedDiscipline === cat.key ? AmalTheme.colors.primary : '#FFFFFF',
                  color: selectedDiscipline === cat.key ? '#FFFFFF' : '#333333',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* Main Grid: Book List + Detail Inspector */}
        <div className="library-split-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: 24 }}>
          {/* Book List Panel */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            padding: 20,
            border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
            maxHeight: 740,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#444' }}>
                Showing {filteredWorks.length} of {MASTER_CANONICAL_CORPUS.length} Works
              </span>
            </div>

            {filteredWorks.map((work) => {
              const isSelected = selectedWork?.work_id === work.work_id;
              const isWorkQuran = work.discipline === 'QURAN' || work.work_id === 'CANON-QUR-001';
              return (
                <div
                  key={work.work_id}
                  onClick={() => {
                    setSelectedWork(work);
                    setSelectedChapterIndex(0);
                  }}
                  style={{
                    padding: 14,
                    borderRadius: 12,
                    backgroundColor: isSelected ? '#F0FDF4' : '#FAFAFA',
                    border: isSelected ? `2px solid ${AmalTheme.colors.primary}` : '1px solid #EEEEEE',
                    cursor: 'pointer',
                    transition: 'all 0.1s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <span style={{
                        fontSize: 10,
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: 10,
                        backgroundColor: '#E2E8F0',
                        color: '#334155',
                      }}>
                        {work.discipline.replace('_', ' ')}
                      </span>
                      {(() => {
                        const hasInApp = isWorkQuran || !!getBookChapters(work.work_id);
                        return (
                          <span style={{
                            fontSize: 9,
                            fontWeight: 700,
                            padding: '2px 6px',
                            borderRadius: 8,
                            backgroundColor: isWorkQuran ? '#DCFCE7' : (hasInApp ? '#FEF3C7' : '#E0F2FE'),
                            color: isWorkQuran ? '#15803D' : (hasInApp ? '#B45309' : '#0369A1'),
                          }}>
                            {isWorkQuran ? '114 SURAHS IN-APP' : (hasInApp ? 'CORE CURATED CHAPTERS' : 'VERIFIED REPOSITORY')}
                          </span>
                        );
                      })()}
                    </div>
                    <span style={{ fontSize: 11, color: '#888' }}>
                      {work.author_death_hijri > 0 ? `${work.author_death_hijri} AH` : 'Revelation'}
                    </span>
                  </div>

                  <div style={{
                    fontFamily: 'var(--font-arabic), serif',
                    fontSize: 16,
                    fontWeight: 700,
                    margin: '6px 0 2px',
                    direction: 'rtl',
                    textAlign: 'right',
                    color: '#0F172A',
                  }}>
                    {work.title_arabic}
                  </div>

                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1E293B' }}>
                    {work.title_transliterated}
                  </div>

                  <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>
                    {work.author_name}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Book Inspection & Provenance Card */}
          {selectedWork ? (
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              padding: 26,
              border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}>
              <div>
                <span style={{
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: 12,
                  backgroundColor: isQuran ? '#E8F5E9' : (hasSelectedInAppChapters ? '#FEF3C7' : '#E0F2FE'),
                  color: isQuran ? '#2E7D32' : (hasSelectedInAppChapters ? '#92400E' : '#0369A1'),
                }}>
                  {isQuran
                    ? 'COMPLETE 114 SURAHS · VERIFIED UTHMANIC MUSHAF'
                    : hasSelectedInAppChapters
                    ? 'AUTHENTIC CORE CHAPTERS · VERIFIED SCHOLARLY MANUSCRIPT'
                    : `VERIFIED DIGITAL REPOSITORY · ${selectedWork.volume_count} VOLUME(S)`}
                </span>
                <h2 style={{
                  fontFamily: 'var(--font-arabic), serif',
                  fontSize: 26,
                  fontWeight: 800,
                  margin: '12px 0 4px',
                  direction: 'rtl',
                  textAlign: 'right',
                  color: AmalTheme.colors.primary,
                }}>
                  {selectedWork.title_arabic}
                </h2>
                <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 6px', color: '#0F172A' }}>
                  {selectedWork.title_transliterated}
                </h3>
                <div style={{ fontSize: 14, color: '#475569' }}>
                  Author: <strong>{selectedWork.author_name}</strong> ({selectedWork.author_death_hijri > 0 ? `d. ${selectedWork.author_death_hijri} AH` : 'Revelation'})
                </div>
              </div>

              {/* PRIMARY ACTION BUTTONS: READ IN-APP */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button
                  onClick={handleOpenReader}
                  style={{
                    width: '100%',
                    padding: '14px 20px',
                    borderRadius: 10,
                    backgroundColor: '#1B4332',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: 15,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    boxShadow: '0 4px 6px -1px rgba(27, 67, 50, 0.2)',
                  }}
                >
                  <span>📖</span>
                  <span>
                    {isQuran
                      ? 'Read All 114 Surahs In-App (قرآنِ مجید کی مکمل ۱۱۴ سورتیں پڑھیں)'
                      : hasSelectedInAppChapters
                      ? `Read Selected Chapters In-App (مطالعہ شروع کریں — ${selectedWork.title_transliterated})`
                      : `View Manuscript Credentials & Source (علمی اسناد و ماخذ — ${selectedWork.title_transliterated})`}
                  </span>
                </button>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {isQuran ? (
                    <a
                      href="https://quran.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '10px 14px',
                        borderRadius: 8,
                        backgroundColor: '#F8FAFC',
                        color: '#1E293B',
                        border: '1px solid #CBD5E1',
                        fontSize: 12,
                        fontWeight: 600,
                        textAlign: 'center',
                        textDecoration: 'none',
                      }}
                    >
                      Quran.com Audio & Reciters ↗
                    </a>
                  ) : (
                    <a
                      href={verifiedSource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '10px 14px',
                        borderRadius: 8,
                        backgroundColor: '#F0FDF4',
                        color: '#166534',
                        border: '1px solid #86EFAC',
                        fontSize: 12,
                        fontWeight: 700,
                        textAlign: 'center',
                        textDecoration: 'none',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                      title={verifiedSource.name}
                    >
                      🏛️ {verifiedSource.name} ↗
                    </a>
                  )}

                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(selectedWork.provenance_sha256);
                      showAmalToast('Manuscript SHA-256 Hash copied to clipboard', 'success');
                    }}
                    style={{
                      padding: '10px 14px',
                      borderRadius: 8,
                      backgroundColor: '#F8FAFC',
                      color: '#1E293B',
                      border: '1px solid #CBD5E1',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Copy Manuscript SHA-256 Hash
                  </button>
                </div>
              </div>

              {/* Provenance Metadata Table */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
                backgroundColor: '#F8FAFC',
                padding: 16,
                borderRadius: 10,
                fontSize: 13,
                border: '1px solid #E2E8F0',
              }}>
                <div>
                  <span style={{ color: '#64748B', display: 'block', fontSize: 11 }}>CANONICAL PUBLISHER</span>
                  <span style={{ fontWeight: 600, color: '#0F172A' }}>{selectedWork.edition_publisher}</span>
                </div>
                <div>
                  <span style={{ color: '#64748B', display: 'block', fontSize: 11 }}>VOLUMES / EXTENT</span>
                  <span style={{ fontWeight: 600, color: '#0F172A' }}>{selectedWork.volume_count} Volume(s)</span>
                </div>
                <div>
                  <span style={{ color: '#64748B', display: 'block', fontSize: 11 }}>CRITICAL EDITOR (MUHAQQIQ)</span>
                  <span style={{ fontWeight: 600, color: '#0F172A' }}>{selectedWork.critical_editor_muhaqqiq}</span>
                </div>
                <div>
                  <span style={{ color: '#64748B', display: 'block', fontSize: 11 }}>SCHOLARLY AUTHORITY LEVEL</span>
                  <span style={{ fontWeight: 600, color: '#059669' }}>{selectedWork.scholarly_authority_level}</span>
                </div>
              </div>

              {/* Scope & Authenticity Explanation */}
              <div style={{
                padding: 14,
                borderRadius: 10,
                backgroundColor: '#FEF3C7',
                border: '1px solid #FDE68A',
                fontSize: 12,
                lineHeight: 1.6,
                color: '#92400E',
              }}>
                <div style={{ fontWeight: 700, marginBottom: 2 }}>
                  علمی دیانت داری و مستند ذخیرہ (Theological Authenticity &amp; Classical Protocol):
                </div>
                {isQuran ? (
                  <span>
                    قرآن پاک کے تمام ۱۱۴ سورتوں کا عثمانی متن، اردو اور انگریزی ترجمہ بغیر کسی حذف و اضافے کے ایپ میں براہِ راست پڑھا جا سکتا ہے۔
                  </span>
                ) : (
                  <span>
                    اس کلاسیکی کتاب کے منتخب اور اساسی ابواب روزمرہ مطالعہ، خشوع اور اخلاقی رہنمائی کے لیے ایپ میں شامل کیے گئے ہیں۔ مکمل ۷،۵۶۳ احادیث یا ضخیم جلدوں کی تحقیق کے لیے سرکاری مکمل ذخیرہ اوپر والے بٹن سے دیکھا جا سکتا ہے۔
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: 60, color: '#888' }}>
              Select a work from the canonical library to view manuscript credentials and read chapters.
            </div>
          )}
        </div>
      </main>

      {/* FULL IN-APP READER MODAL */}
      {isReaderModalOpen && selectedWork && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(6px)',
            zIndex: 10003,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setIsReaderModalOpen(false)}
        >
          <div
            style={{
              width: '95%',
              maxWidth: 900,
              backgroundColor: readerTheme === 'SEPIA' ? '#FBF0D9' : readerTheme === 'DARK' ? '#1E293B' : '#FFFFFF',
              color: readerTheme === 'DARK' ? '#F8FAFC' : '#1E293B',
              borderRadius: 20,
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
              padding: '24px 28px',
              border: `1px solid ${readerTheme === 'DARK' ? '#334155' : '#E2E8F0'}`,
              maxHeight: '94vh',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              transition: 'background-color 0.2s ease',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Reader Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: `1px solid ${readerTheme === 'DARK' ? '#334155' : '#E5E7EB'}`, paddingBottom: 14, flexWrap: 'wrap', gap: 10 }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#10B981', letterSpacing: 1, textTransform: 'uppercase' }}>
                  {isQuran ? 'SACRED REVELATION · THE NOBLE QURAN (ALL 114 SURAHS)' : `CLASSICAL HERITAGE · ${selectedWork.discipline.replace('_', ' ')}`}
                </span>
                <h2 style={{ fontSize: 22, fontWeight: 800, margin: '4px 0 2px' }}>
                  {selectedWork.title_transliterated} ({selectedWork.title_arabic})
                </h2>
                <div style={{ fontSize: 13, color: readerTheme === 'DARK' ? '#94A3B8' : '#64748B' }}>
                  {selectedWork.author_name}
                </div>
              </div>

              {/* Controls: Theme & Font Size */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {/* Theme selector */}
                <div style={{ display: 'flex', backgroundColor: readerTheme === 'DARK' ? '#0F172A' : '#F1F5F9', borderRadius: 8, padding: 2 }}>
                  <button
                    onClick={() => setReaderTheme('CLEAN')}
                    style={{
                      border: 'none',
                      background: readerTheme === 'CLEAN' ? '#FFFFFF' : 'transparent',
                      padding: '4px 8px',
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: readerTheme === 'CLEAN' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
                    }}
                  >
                    Light
                  </button>
                  <button
                    onClick={() => setReaderTheme('SEPIA')}
                    style={{
                      border: 'none',
                      background: readerTheme === 'SEPIA' ? '#F4ECD8' : 'transparent',
                      padding: '4px 8px',
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: readerTheme === 'SEPIA' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
                    }}
                  >
                    Sepia
                  </button>
                  <button
                    onClick={() => setReaderTheme('DARK')}
                    style={{
                      border: 'none',
                      background: readerTheme === 'DARK' ? '#334155' : 'transparent',
                      color: readerTheme === 'DARK' ? '#FFFFFF' : '#475569',
                      padding: '4px 8px',
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Dark
                  </button>
                </div>

                {/* Font size */}
                <button
                  onClick={() => setFontSize(prev => Math.max(14, prev - 2))}
                  style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid #CBD5E1', background: 'transparent', cursor: 'pointer', fontSize: 12, fontWeight: 700, color: 'inherit' }}
                >
                  A-
                </button>
                <button
                  onClick={() => setFontSize(prev => Math.min(28, prev + 2))}
                  style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid #CBD5E1', background: 'transparent', cursor: 'pointer', fontSize: 12, fontWeight: 700, color: 'inherit' }}
                >
                  A+
                </button>

                <button
                  onClick={() => setIsReaderModalOpen(false)}
                  style={{ background: 'transparent', border: 'none', fontSize: 20, cursor: 'pointer', color: '#94A3B8', padding: '0 4px' }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* QURAN SPECIFIC SURAH SELECTOR: COMPLETE 114 SURAHS */}
            {isQuran ? (
              <div>
                {/* Beloved Surahs Quick Chips */}
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#047857', marginBottom: 6 }}>
                    ⭐ کثرت سے تلاوت کی جانے والی سورتیں (Daily Beloved Surahs):
                  </div>
                  <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 6 }}>
                    {belovedSurahShortcuts.map((item) => (
                      <button
                        key={item.num}
                        onClick={() => handleSelectSurah(item.num)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: 8,
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: 'pointer',
                          border: selectedSurahNumber === item.num ? '1px solid #059669' : '1px solid #E2E8F0',
                          backgroundColor: selectedSurahNumber === item.num ? '#1B4332' : (readerTheme === 'DARK' ? '#0F172A' : '#F1F5F9'),
                          color: selectedSurahNumber === item.num ? '#FFFFFF' : (readerTheme === 'DARK' ? '#CBD5E1' : '#334155'),
                          whiteSpace: 'nowrap',
                          transition: 'all 0.1s ease',
                        }}
                      >
                        {item.num}. {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 114 Surahs Dropdown & Filter Bar */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 2fr',
                  gap: 10,
                  marginBottom: 14,
                  backgroundColor: readerTheme === 'DARK' ? '#0F172A' : '#F8FAFC',
                  padding: 10,
                  borderRadius: 10,
                  border: `1px solid ${readerTheme === 'DARK' ? '#334155' : '#E2E8F0'}`,
                }}>
                  <input
                    type="text"
                    value={surahSearchFilter}
                    onChange={(e) => setSurahSearchFilter(e.target.value)}
                    placeholder="Search 114 Surahs (e.g. 18, Kahf, یٰس)..."
                    style={{
                      padding: '8px 12px',
                      borderRadius: 6,
                      fontSize: 13,
                      border: '1px solid #CBD5E1',
                      outline: 'none',
                      backgroundColor: readerTheme === 'DARK' ? '#1E293B' : '#FFFFFF',
                      color: readerTheme === 'DARK' ? '#FFFFFF' : '#0F172A',
                    }}
                  />

                  <select
                    value={selectedSurahNumber}
                    onChange={(e) => handleSelectSurah(Number(e.target.value))}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 6,
                      fontSize: 13,
                      fontWeight: 600,
                      border: '1px solid #CBD5E1',
                      outline: 'none',
                      backgroundColor: readerTheme === 'DARK' ? '#1E293B' : '#FFFFFF',
                      color: readerTheme === 'DARK' ? '#FFFFFF' : '#0F172A',
                      cursor: 'pointer',
                    }}
                  >
                    {filteredSurahList.map((s) => (
                      <option key={s.number} value={s.number}>
                        {s.number}. {s.nameTransliterated} — {s.nameArabic} ({s.nameUrdu}) • {s.ayahsCount} Ayahs
                      </option>
                    ))}
                  </select>
                </div>

                {/* Surah Header Banner */}
                <div style={{
                  backgroundColor: readerTheme === 'DARK' ? '#0F172A' : '#ECFDF5',
                  padding: '12px 18px',
                  borderRadius: 12,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: `1px solid ${readerTheme === 'DARK' ? '#334155' : '#A7F3D0'}`,
                }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#047857' }}>
                      {currentSurahMeta.number}. {currentSurahMeta.nameArabic} • {currentSurahMeta.nameUrdu}
                    </h3>
                    <div style={{ fontSize: 12, color: readerTheme === 'DARK' ? '#94A3B8' : '#4B5563', marginTop: 2 }}>
                      {currentSurahMeta.nameEnglish} • {currentSurahMeta.revelationType} • {currentSurahMeta.ayahsCount} Ayahs
                    </div>
                    <div style={{ fontSize: 11, color: '#059669', fontWeight: 700, marginTop: 4 }}>
                      اردو ترجمہ: کنز الایمان فی ترجمۃ القرآن (امام احمد رضا خان) · English: Saheeh International
                    </div>
                  </div>
                  <span style={{ fontSize: 22 }}>✨</span>
                </div>

                {/* Loading / Error States */}
                {isLoadingSurah && (
                  <div style={{ padding: 40, textAlign: 'center', color: '#047857' }}>
                    <div style={{ fontSize: 24, marginBottom: 8 }}>⏳</div>
                    <div style={{ fontWeight: 700 }}>تلاوتِ کلامِ پاک لوڈ ہو رہی ہے...</div>
                    <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
                      Loading Surah {currentSurahMeta.nameTransliterated} ({currentSurahMeta.nameArabic}) — Uthmanic Medina Mushaf...
                    </div>
                  </div>
                )}

                {surahFetchError && (
                  <div style={{
                    padding: 16,
                    borderRadius: 10,
                    backgroundColor: '#FEF2F2',
                    border: '1px solid #FCA5A5',
                    color: '#991B1B',
                    marginTop: 12,
                    fontSize: 13,
                  }}>
                    <div style={{ fontWeight: 700, marginBottom: 4 }}>⚠️ Notice:</div>
                    <div>{surahFetchError}</div>
                    <button
                      onClick={() => handleSelectSurah(selectedSurahNumber)}
                      style={{
                        marginTop: 10,
                        padding: '6px 14px',
                        borderRadius: 6,
                        backgroundColor: '#DC2626',
                        color: '#FFFFFF',
                        border: 'none',
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      Retry Download
                    </button>
                  </div>
                )}

                {/* Verses Container */}
                {!isLoadingSurah && !surahFetchError && currentSurah && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 14, maxHeight: 440, overflowY: 'auto', paddingRight: 6 }}>
                    {currentSurah.verses.map((v) => (
                      <div
                        key={v.ayahNumber}
                        style={{
                          padding: 16,
                          borderRadius: 12,
                          backgroundColor: readerTheme === 'DARK' ? '#0F172A' : '#F9FAFB',
                          border: `1px solid ${readerTheme === 'DARK' ? '#334155' : '#E5E7EB'}`,
                        }}
                      >
                        {/* Arabic Ayah */}
                        <div
                          dir="rtl"
                          style={{
                            fontFamily: 'var(--font-arabic), "Amiri", serif',
                            fontSize: fontSize + 6,
                            lineHeight: 2.2,
                            textAlign: 'right',
                            color: readerTheme === 'DARK' ? '#F8FAFC' : '#111827',
                            marginBottom: 10,
                          }}
                        >
                          {v.textArabic} <span style={{ fontSize: fontSize - 2, color: '#059669', marginRight: 6 }}>﴿{v.ayahNumber}﴾</span>
                        </div>

                        {/* Urdu Translation */}
                        {v.textUrdu && (
                          <div
                            dir="rtl"
                            style={{
                              fontFamily: 'var(--font-urdu), serif',
                              fontSize: fontSize,
                              lineHeight: 2.1,
                              textAlign: 'right',
                              color: readerTheme === 'DARK' ? '#CBD5E1' : '#1E293B',
                              marginBottom: 8,
                              borderTop: `1px dashed ${readerTheme === 'DARK' ? '#334155' : '#E2E8F0'}`,
                              paddingTop: 8,
                            }}
                          >
                            <span style={{ fontSize: 11, fontWeight: 700, color: '#059669', marginLeft: 8, display: 'inline-block' }}>
                              [کنز الایمان]:
                            </span>{' '}
                            {v.textUrdu}
                          </div>
                        )}

                        {/* English Translation */}
                        {v.textEnglish && (
                          <div
                            style={{
                              fontSize: fontSize - 4,
                              lineHeight: 1.6,
                              color: readerTheme === 'DARK' ? '#94A3B8' : '#475569',
                            }}
                          >
                            {v.textEnglish}
                          </div>
                        )}

                        {/* Ayah Action & Wisdom Bar */}
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginTop: 12,
                          paddingTop: 10,
                          borderTop: `1px solid ${readerTheme === 'DARK' ? '#1E293B' : '#E2E8F0'}`,
                        }}>
                          <span style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>
                            {currentSurah.nameTransliterated} · {v.ayahNumber}
                          </span>
                          <button
                            onClick={() => {
                              setActiveWisdomAyah({ surahNumber: currentSurah.surahNumber, ayahNumber: v.ayahNumber });
                              setWisdomTab('KHAZAIN');
                            }}
                            style={{
                              padding: '6px 14px',
                              borderRadius: 8,
                              backgroundColor: '#ECFDF5',
                              color: '#047857',
                              border: '1px solid #A7F3D0',
                              fontSize: 12,
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 6,
                            }}
                          >
                            <span>📖</span>
                            <span>تدبر، حکمت و تفسیری سند (Wisdom Card)</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* CLASSICAL BOOKS CHAPTER SELECTOR & VIEWER */
              <div>
                {bookChaptersData ? (
                  <div>
                    {/* Scholarly Scope & Transparency Banner */}
                    <div style={{
                      padding: '10px 14px',
                      borderRadius: 8,
                      backgroundColor: readerTheme === 'DARK' ? '#0F172A' : '#FEF3C7',
                      border: `1px solid ${readerTheme === 'DARK' ? '#334155' : '#FDE68A'}`,
                      fontSize: 12,
                      color: readerTheme === 'DARK' ? '#CBD5E1' : '#92400E',
                      marginBottom: 12,
                      lineHeight: 1.5,
                    }}>
                      <strong>📚 منتخب اساسی ابواب (Curated Core Chapters):</strong> اس کتاب کے بنیادی اور اہم ترین ابواب مستند ماخذ سے روزمرہ مطالعہ کے لیے براہِ راست ایپ میں شامل ہیں۔ مکمل متن اور شروحات کے لیے نیچے دیے گئے آرکائیو لنک سے استفادہ کیا جا سکتا ہے۔
                    </div>

                    <label style={{ fontSize: 13, fontWeight: 700, color: '#1B4332', display: 'block', marginBottom: 10 }}>
                      📑 SELECT CHAPTER / کتاب و باب کا انتخاب فرمائیے:
                    </label>

                    <div style={{
                      display: 'flex',
                      gap: 8,
                      overflowX: 'auto',
                      paddingBottom: 8,
                      borderBottom: `1px solid ${readerTheme === 'DARK' ? '#334155' : '#E5E7EB'}`,
                      marginBottom: 16,
                    }}>
                      {bookChaptersData.chapters.map((chap, idx) => (
                        <button
                          key={chap.chapterId}
                          onClick={() => setSelectedChapterIndex(idx)}
                          style={{
                            padding: '8px 14px',
                            borderRadius: 8,
                            fontSize: 13,
                            fontWeight: 700,
                            cursor: 'pointer',
                            border: 'none',
                            backgroundColor: selectedChapterIndex === idx ? '#1B4332' : (readerTheme === 'DARK' ? '#0F172A' : '#F1F5F9'),
                            color: selectedChapterIndex === idx ? '#FFFFFF' : (readerTheme === 'DARK' ? '#CBD5E1' : '#334155'),
                            whiteSpace: 'nowrap',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          {chap.chapterTitleArabic}
                        </button>
                      ))}
                    </div>

                    {currentChapter && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {/* Chapter Title Badge */}
                        <div style={{
                          backgroundColor: readerTheme === 'DARK' ? '#0F172A' : '#ECFDF5',
                          padding: '12px 16px',
                          borderRadius: 10,
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                          <div>
                            <div style={{ fontWeight: 800, fontSize: 16, color: '#065F46' }}>
                              {currentChapter.chapterTitleUrdu}
                            </div>
                            <div style={{ fontSize: 12, color: '#4B5563', marginTop: 2 }}>
                              {currentChapter.chapterTitleEnglish}
                            </div>
                          </div>
                        </div>

                        {/* Arabic Matn Box */}
                        <div
                          style={{
                            padding: 18,
                            borderRadius: 12,
                            backgroundColor: readerTheme === 'DARK' ? '#0F172A' : '#F9FAFB',
                            border: `1px solid ${readerTheme === 'DARK' ? '#334155' : '#E5E7EB'}`,
                          }}
                        >
                          <div style={{ fontSize: 11, fontWeight: 700, color: '#10B981', letterSpacing: 1, marginBottom: 8, textTransform: 'uppercase' }}>
                            النص الأصلي والمروي بالتشكيل الكامل (Arabic Matn)
                          </div>
                          <div
                            dir="rtl"
                            style={{
                              fontFamily: 'var(--font-arabic), "Amiri", serif',
                              fontSize: fontSize + 4,
                              lineHeight: 2.2,
                              textAlign: 'right',
                              whiteSpace: 'pre-line',
                              color: readerTheme === 'DARK' ? '#F8FAFC' : '#0F172A',
                            }}
                          >
                            {currentChapter.arabicMatn}
                          </div>
                        </div>

                        {/* Urdu Translation Box */}
                        <div
                          style={{
                            padding: 18,
                            borderRadius: 12,
                            backgroundColor: readerTheme === 'DARK' ? '#0F172A' : '#F9FAFB',
                            border: `1px solid ${readerTheme === 'DARK' ? '#334155' : '#E5E7EB'}`,
                          }}
                        >
                          <div style={{ fontSize: 11, fontWeight: 700, color: '#10B981', letterSpacing: 1, marginBottom: 8, textTransform: 'uppercase' }}>
                            اردو ترجمہ و مفہوم (Nastaliq Urdu Translation)
                          </div>
                          <div
                            dir="rtl"
                            style={{
                              fontFamily: 'var(--font-urdu), serif',
                              fontSize: fontSize + 1,
                              lineHeight: 2.2,
                              textAlign: 'right',
                              whiteSpace: 'pre-line',
                              color: readerTheme === 'DARK' ? '#CBD5E1' : '#1E293B',
                            }}
                          >
                            {currentChapter.urduTranslation}
                          </div>
                        </div>

                        {/* English & Scholarly Commentary Box */}
                        <div
                          style={{
                            padding: 16,
                            borderRadius: 12,
                            backgroundColor: readerTheme === 'DARK' ? '#0F172A' : '#F9FAFB',
                            border: `1px solid ${readerTheme === 'DARK' ? '#334155' : '#E5E7EB'}`,
                            fontSize: fontSize - 3,
                            lineHeight: 1.7,
                          }}
                        >
                          <div style={{ fontWeight: 700, color: '#10B981', marginBottom: 4, fontSize: 13 }}>
                            THEMATIC OVERVIEW &amp; LESSONS:
                          </div>
                          <p style={{ margin: '0 0 10px', color: readerTheme === 'DARK' ? '#CBD5E1' : '#334155' }}>
                            {currentChapter.englishSynopsis}
                          </p>
                          <div style={{ fontWeight: 700, color: '#10B981', marginBottom: 4, fontSize: 13 }}>
                            SCHOLARLY FIQH &amp; SHARH NOTES:
                          </div>
                          <p style={{ margin: 0, color: readerTheme === 'DARK' ? '#CBD5E1' : '#334155' }}>
                            {currentChapter.scholarlyNotes}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{
                    padding: '36px 20px',
                    textAlign: 'center',
                    backgroundColor: readerTheme === 'DARK' ? '#0F172A' : '#F8FAFC',
                    borderRadius: 12,
                    border: `1px solid ${readerTheme === 'DARK' ? '#334155' : '#E2E8F0'}`,
                  }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>📜</div>
                    <h3 style={{ fontSize: 17, fontWeight: 800, margin: '0 0 8px', color: readerTheme === 'DARK' ? '#F8FAFC' : '#1E293B' }}>
                      کیٹلاگ ریکارڈ محفوظ ہے — ڈیجیٹل متن تصدیق کے مرحلے میں ہے
                    </h3>
                    <p style={{ fontSize: 13, color: readerTheme === 'DARK' ? '#94A3B8' : '#64748B', maxWidth: 600, margin: '0 auto 16px', lineHeight: 1.6 }}>
                      اس تصنیف مبارک کا علمی اسناد، مؤلف اور بائبلوگرافک ریکارڈ رجسٹرڈ ہے۔ AMAL OS کی غیر لچکدار پالیسی ہے کہ کسی بھی اسلامی کتاب کا خود ساختہ (synthetic) یا غیر مصدقہ متن پیش نہ کیا جائے۔ اس کتاب کا ڈیجیٹل مسودہ سکالر ریویو کے بعد براہِ راست فعال ہوگا۔
                    </p>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 12,
                      color: '#059669',
                      fontWeight: 700,
                      backgroundColor: readerTheme === 'DARK' ? '#132E27' : '#ECFDF5',
                      padding: '6px 14px',
                      borderRadius: 20,
                      border: '1px solid #A7F3D0',
                    }}>
                      <span>✓</span>
                      <span>Bibliographic Metadata Preserved · Full Text Awaiting Ingestion</span>
                    </div>

                    <div style={{ marginTop: 18 }}>
                      <a
                        href={verifiedSource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 8,
                          padding: '12px 22px',
                          borderRadius: 10,
                          backgroundColor: '#1B4332',
                          color: '#FFFFFF',
                          fontSize: 13,
                          fontWeight: 700,
                          textDecoration: 'none',
                          boxShadow: '0 4px 6px -1px rgba(27, 67, 50, 0.25)',
                        }}
                      >
                        <span>🏛️</span>
                        <span>مطالعہ کے لیے تصدیق شدہ اصل ماخذ کھولیں ({verifiedSource.name}) ↗</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Bottom Bar: External Archives */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 14,
              borderTop: `1px solid ${readerTheme === 'DARK' ? '#334155' : '#E5E7EB'}`,
              flexWrap: 'wrap',
              gap: 12,
            }}>
              <div style={{ fontSize: 12, color: readerTheme === 'DARK' ? '#94A3B8' : '#64748B' }}>
                Full physical edition: <strong>{selectedWork.edition_publisher}</strong> ({selectedWork.volume_count} Vols)
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                {isQuran ? (
                  <a
                    href="https://quran.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '8px 14px',
                      borderRadius: 8,
                      backgroundColor: '#1B4332',
                      color: '#FFFFFF',
                      textDecoration: 'none',
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    Open Quran.com Recitations ↗
                  </a>
                ) : (
                  <a
                    href={verifiedSource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '8px 14px',
                      borderRadius: 8,
                      backgroundColor: '#1B4332',
                      color: '#FFFFFF',
                      textDecoration: 'none',
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {verifiedSource.name} ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DEDICATED AYAH WISDOM & LISTENING CARD MODAL */}
      {activeWisdomAyah && (
        <AyahWisdomModal
          isOpen={true}
          onClose={() => setActiveWisdomAyah(null)}
          surahNumber={activeWisdomAyah.surahNumber}
          ayahNumber={activeWisdomAyah.ayahNumber}
          surahNameTransliterated={loadedSurahsCache[activeWisdomAyah.surahNumber]?.nameTransliterated}
          surahNameUrdu={loadedSurahsCache[activeWisdomAyah.surahNumber]?.nameUrdu}
          fallbackArabic={loadedSurahsCache[activeWisdomAyah.surahNumber]?.verses?.find((v) => v.ayahNumber === activeWisdomAyah.ayahNumber)?.textArabic}
          fallbackUrdu={loadedSurahsCache[activeWisdomAyah.surahNumber]?.verses?.find((v) => v.ayahNumber === activeWisdomAyah.ayahNumber)?.textUrdu}
          fallbackEnglish={loadedSurahsCache[activeWisdomAyah.surahNumber]?.verses?.find((v) => v.ayahNumber === activeWisdomAyah.ayahNumber)?.textEnglish}
        />
      )}
    </div>
  );
}
