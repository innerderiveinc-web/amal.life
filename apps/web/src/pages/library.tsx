import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Navigation } from '../components/Navigation';
import { AmalTheme } from '@amal/ui';
import { MASTER_CANONICAL_CORPUS, CanonicalEditionRecord } from '@amal/evidence';
import { QURAN_SURAHS_COLLECTION, QuranSurahData } from '../lib/quran-surahs-data';
import { ALL_114_SURAHS, QuranSurahMeta } from '../lib/quran-114-directory';
import { getBookChapters, ClassicalBookWithChapters } from '../lib/classical-chapters-data';
import { AyahWisdomModal } from '../components/AyahWisdomModal';
import { showAmalToast } from '../components/Toast';
import { UniversalContentShareModal, UniversalCardPayload } from '../components/cards/UniversalContentShareModal';
import { LibrarySidebar } from '../components/library/LibrarySidebar';
import { LibraryWorkDetail } from '../components/library/LibraryWorkDetail';
import { LibraryReaderModal } from '../components/library/LibraryReaderModal';

export default function LibraryPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState('ALL');
  const [selectedWork, setSelectedWork] = useState<CanonicalEditionRecord | null>(MASTER_CANONICAL_CORPUS[0] || null);
  const [sharePayload, setSharePayload] = useState<UniversalCardPayload | null>(null);

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

  // Smart Resume / Bookmark Persistence State
  const [libraryLastRead, setLibraryLastRead] = useState<{
    workId: string;
    chapterIndex: number;
    workTitleArabic: string;
    workTitleTransliterated: string;
    chapterTitleUrdu?: string;
    timestamp: number;
  } | null>(null);

  // Quran Ayah Wisdom Modal State
  const [activeWisdomAyah, setActiveWisdomAyah] = useState<{ surahNumber: number; ayahNumber: number } | null>(null);

  // Restore Last Read Classical Library Book on Mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem('amal_last_read_library');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.workId) {
          setLibraryLastRead(parsed);
        }
      }
    } catch (e) {
      console.warn('Failed to load last read library position:', e);
    }
  }, []);

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

  const normalizeSearchText = (str: string): string => {
    if (!str) return '';
    return str
      .toLowerCase()
      .replace(/[\u064B-\u065F\u0670]/g, '') // Arabic diacritics / Tashkeel
      .replace(/[أإآٱ]/g, 'ا')
      .replace(/[يىئ]/g, 'ی')
      .replace(/ك/g, 'ک')
      .replace(/[ةهہ]/g, 'ہ')
      .replace(/[ؤ]/g, 'و')
      .replace(/[\s\-_]+/g, ' ')
      .trim();
  };

  const filteredWorks = MASTER_CANONICAL_CORPUS.filter((item) => {
    if (search.trim()) {
      const normSearch = normalizeSearchText(search);
      const q = search.toLowerCase().trim();

      const normAr = normalizeSearchText(item.title_arabic);
      const normTrans = item.title_transliterated.toLowerCase();
      const normAuthor = item.author_name.toLowerCase();
      const normPub = item.edition_publisher.toLowerCase();
      const normEditor = item.critical_editor_muhaqqiq.toLowerCase();
      const normId = item.work_id.toLowerCase();

      const matchesSearch =
        normAr.includes(normSearch) ||
        normTrans.includes(q) ||
        normAuthor.includes(q) ||
        normPub.includes(q) ||
        normEditor.includes(q) ||
        normId.includes(q) ||
        // Check partial transliteration matches (e.g. "bukhari", "nawawi", "quran", "tafsir", "sirah")
        normSearch.split(' ').every((token) => normTrans.includes(token) || normAuthor.includes(token) || normAr.includes(token));

      if (!matchesSearch) return false;
    }

    // Only apply discipline filter if user has not entered a cross-cutting search query
    if (!search.trim()) {
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
    }

    return true;
  });

  const isQuran = selectedWork?.discipline === 'QURAN' || selectedWork?.work_id === 'CANON-QUR-001';

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
      const found = MASTER_CANONICAL_CORPUS.find((w) => w.work_id === work);
      if (found) {
        setSelectedWork(found);
        setIsReaderModalOpen(true);
      }
    } else if (surah && typeof surah === 'string') {
      const sNum = parseInt(surah, 10);
      if (!isNaN(sNum) && sNum >= 1 && sNum <= 114) {
        const quranWork = MASTER_CANONICAL_CORPUS.find((w) => w.discipline === 'QURAN') || MASTER_CANONICAL_CORPUS[0];
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

  // Persist Last Read Book & Chapter in Library
  useEffect(() => {
    if (typeof window === 'undefined' || !selectedWork || !isReaderModalOpen) return;
    try {
      const chap = bookChaptersData?.chapters[selectedChapterIndex];
      const payload = {
        workId: selectedWork.work_id,
        chapterIndex: selectedChapterIndex,
        workTitleArabic: selectedWork.title_arabic,
        workTitleTransliterated: selectedWork.title_transliterated,
        chapterTitleUrdu: chap?.chapterTitleUrdu || chap?.chapterTitleArabic || '',
        timestamp: Date.now(),
      };
      localStorage.setItem('amal_last_read_library', JSON.stringify(payload));
      setLibraryLastRead(payload);
    } catch (e) {
      console.warn('Failed to save last read library state:', e);
    }
  }, [selectedWork, selectedChapterIndex, isReaderModalOpen, bookChaptersData]);

  const handleResumeLastRead = () => {
    if (!libraryLastRead) return;
    const work = MASTER_CANONICAL_CORPUS.find((w) => w.work_id === libraryLastRead.workId);
    if (work) {
      setSelectedWork(work);
      setSelectedChapterIndex(libraryLastRead.chapterIndex || 0);
      setIsReaderModalOpen(true);
      showAmalToast(`📖 آخری مطالعہ بحال ہو گیا: ${work.title_transliterated} · باب ${(libraryLastRead.chapterIndex || 0) + 1}`, 'success');
    }
  };

  // Dynamic Surah Fetcher for All 114 Surahs
  const handleSelectSurah = async (surahNum: number) => {
    setSelectedSurahNumber(surahNum);
    setSurahFetchError(null);

    const meta = ALL_114_SURAHS.find((s) => s.number === surahNum);
    if (loadedSurahsCache[surahNum] && meta && loadedSurahsCache[surahNum].verses.length >= meta.ayahsCount) {
      return;
    }

    setIsLoadingSurah(true);
    try {
      const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahNum}/editions/quran-uthmani,ur.kanzuliman,en.sahih`);
      if (!res.ok) {
        throw new Error(`HTTP Error ${res.status}`);
      }
      const data = await res.json();
      if (data.code === 200 && Array.isArray(data.data) && data.data.length >= 3) {
        const uthmani = data.data[0];
        const urdu = data.data[1];
        const english = data.data[2];

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
          revelationType: (meta?.revelationType || (uthmani.revelationType === 'Meccan' ? 'MECCAN' : 'MEDINAN')) as ('MECCAN' | 'MEDINAN'),
          ayahsCount: meta?.ayahsCount || uthmani.numberOfAyahs,
          verses,
        };

        setLoadedSurahsCache((prev) => ({ ...prev, [surahNum]: newSurah }));
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

  const filteredSurahList = ALL_114_SURAHS.filter((s) => {
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
            marginBottom: 16,
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

        {/* Dedicated Sisters Sanctuary & 20-Book Women's Canon Banner */}
        <div
          style={{
            backgroundColor: '#FDF2F8',
            borderRadius: 14,
            padding: '16px 20px',
            border: '1px solid #FECDD3',
            marginBottom: 20,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 24 }}>🌸</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#9D174D' }}>
                The Sisters Sanctuary: 20 Classical Books on Women &amp; Sahabiyyat (گوشۂ خواتین)
              </div>
              <div style={{ fontSize: 12, color: '#4B5563' }}>
                Jannati Zewar, Bahar-e-Shari&apos;at, Al-Ijabah by Imam al-Zarkashi, Seerat Aisha, and Taharah Fiqh.
              </div>
            </div>
          </div>

          <Link
            href="/sisters"
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              backgroundColor: '#9D174D',
              color: '#FFFFFF',
              textDecoration: 'none',
              fontSize: 12,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span>🌸 Open Sisters Sanctuary</span>
            <span>➔</span>
          </Link>
        </div>

        {/* Smart Resume Last Read Classical Work Banner */}
        {libraryLastRead && (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 14,
              padding: '14px 20px',
              border: '1px solid #A7F3D0',
              marginBottom: 20,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 12,
              boxShadow: '0 2px 6px rgba(16, 185, 129, 0.06)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 22 }}>🔖</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#065F46' }}>
                  آخری مطالعہ بحال کریں (Resume Last Read): {libraryLastRead.workTitleArabic} ({libraryLastRead.workTitleTransliterated})
                </div>
                {libraryLastRead.chapterTitleUrdu && (
                  <div style={{ fontSize: 12, color: '#047857', marginTop: 2 }}>
                    باب: {libraryLastRead.chapterTitleUrdu} · Chapter {(libraryLastRead.chapterIndex || 0) + 1}
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={handleResumeLastRead}
              style={{
                padding: '8px 18px',
                borderRadius: 8,
                backgroundColor: '#065F46',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: 12,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                transition: 'all 0.15s ease',
              }}
            >
              <span>مطالعہ جاری رکھیں (Resume Reader)</span>
              <span>➔</span>
            </button>
          </div>
        )}

        {/* Main Grid: Modularized Book List + Detail Inspector */}
        <div className="library-split-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: 24 }}>
          <LibrarySidebar
            search={search}
            setSearch={setSearch}
            selectedDiscipline={selectedDiscipline}
            setSelectedDiscipline={setSelectedDiscipline}
            filterCategories={filterCategories}
            filteredWorks={filteredWorks}
            selectedWork={selectedWork}
            onSelectWork={(work) => {
              setSelectedWork(work);
              setSelectedChapterIndex(0);
              if (typeof window !== 'undefined' && window.innerWidth <= 768) {
                setTimeout(() => {
                  document.getElementById('library-detail-panel')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
          />

          <LibraryWorkDetail
            selectedWork={selectedWork}
            onOpenReader={handleOpenReader}
          />
        </div>
      </main>

      {/* FULL IN-APP READER MODAL */}
      <LibraryReaderModal
        isOpen={isReaderModalOpen}
        onClose={() => setIsReaderModalOpen(false)}
        selectedWork={selectedWork}
        readerTheme={readerTheme}
        setReaderTheme={setReaderTheme}
        fontSize={fontSize}
        setFontSize={setFontSize}
        selectedChapterIndex={selectedChapterIndex}
        setSelectedChapterIndex={setSelectedChapterIndex}
        selectedSurahNumber={selectedSurahNumber}
        onSelectSurah={handleSelectSurah}
        surahSearchFilter={surahSearchFilter}
        setSurahSearchFilter={setSurahSearchFilter}
        filteredSurahList={filteredSurahList}
        belovedSurahShortcuts={belovedSurahShortcuts}
        currentSurah={currentSurah}
        isLoadingSurah={isLoadingSurah}
        surahFetchError={surahFetchError}
        onSharePayload={(payload) => setSharePayload(payload)}
        onOpenWisdomModal={(sNum, aNum) => setActiveWisdomAyah({ surahNumber: sNum, ayahNumber: aNum })}
      />

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

      {/* Sacred Universal Share Modal */}
      {sharePayload && (
        <UniversalContentShareModal
          isOpen={!!sharePayload}
          onClose={() => setSharePayload(null)}
          payload={sharePayload}
        />
      )}
    </div>
  );
}
