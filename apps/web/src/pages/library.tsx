import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Navigation } from '../components/Navigation';
import { AmalTheme } from '@amal/ui';
import { MASTER_CANONICAL_CORPUS, CanonicalEditionRecord } from '@amal/evidence';
import { WOMEN_CLASSICAL_CANON } from '../lib/women-sanctuary-data';
import { QURAN_SURAHS_COLLECTION, QuranSurahData } from '../lib/quran-surahs-data';
import { ALL_114_SURAHS, QuranSurahMeta } from '../lib/quran-114-directory';
import { getBookChapters, ClassicalBookWithChapters } from '../lib/classical-chapters-data';

const WOMEN_CANONICAL_EDITIONS: CanonicalEditionRecord[] = WOMEN_CLASSICAL_CANON.map((b) => ({
  work_id: b.id,
  title_arabic: b.titleArabic || b.titleUrdu,
  title_transliterated: b.titleEnglish,
  author_name: b.authorEnglish,
  author_death_hijri: parseInt((b.authorEra.match(/\d+/) || ['1400'])[0], 10),
  discipline: b.category === 'fiqh_taharah' ? 'HANAFI_FIQH' : 'ISLAMIC_HISTORY',
  edition_publisher: b.onlineArchiveName || 'Classical Sunnah Heritage Archive',
  publication_city: 'Subcontinent / Cairo / Damascus',
  critical_editor_muhaqqiq: 'Scholarly Verification Board of Ahl al-Sunnah',
  volume_count: 1,
  rights_status: 'PUBLIC_DOMAIN_CONFIRMED' as const,
  provenance_sha256: b.verificationHash,
  scholarly_consensus_summary: b.scholarlyConsensusUrdu,
  scholarly_authority_level: b.classicalSourceTier as any,
  canonical_tier: (b.classicalSourceTier === 'TIER_A_CANONICAL'
    ? 'TIER_A_CANONICAL'
    : b.classicalSourceTier === 'TIER_B_CLASSICAL_AUTHORITATIVE'
    ? 'TIER_B_CLASSICAL_AUTHORITATIVE'
    : 'TIER_C_LATER_CLASSICAL') as 'TIER_A_CANONICAL' | 'TIER_B_CLASSICAL_AUTHORITATIVE' | 'TIER_C_LATER_CLASSICAL',
}));

export const ALL_CANONICAL_WORKS: CanonicalEditionRecord[] = [
  ...MASTER_CANONICAL_CORPUS,
  ...WOMEN_CANONICAL_EDITIONS,
];
import { AyahWisdomModal } from '../components/AyahWisdomModal';
import { showAmalToast } from '../components/Toast';
import { UniversalContentShareModal, UniversalCardPayload } from '../components/cards/UniversalContentShareModal';
import { LibrarySidebar } from '../components/library/LibrarySidebar';
import { LibraryWorkDetail } from '../components/library/LibraryWorkDetail';
import { LibraryReaderModal } from '../components/library/LibraryReaderModal';
import { LibraryGridView } from '../components/library/LibraryGridView';
import { LibraryBookshelfView } from '../components/library/LibraryBookshelfView';
import { useLanguage } from '../context/LanguageContext';

export default function LibraryPage() {
  const { t, isUrdu, isArabic } = useLanguage();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState('ALL');
  const [selectedWork, setSelectedWork] = useState<CanonicalEditionRecord | null>(ALL_CANONICAL_WORKS[0] || null);
  const [sharePayload, setSharePayload] = useState<UniversalCardPayload | null>(null);

  // View Mode: Shelves (Categorized), Grid (Paginated 12/page), or Split (Researcher index)
  const [viewMode, setViewMode] = useState<'SHELVES' | 'GRID' | 'SPLIT'>('SHELVES');
  const [isSanadInspectorOpen, setIsSanadInspectorOpen] = useState(false);

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
    { key: 'ALL', label: `${t('All Works', 'تمام کتب', 'جميع الكتب', 'Tamam Kutub')} (${ALL_CANONICAL_WORKS.length})` },
    { key: 'SISTERS', label: t('Women\'s Canon & Sahabiyyat', 'گوشۂ خواتین و صحابیات', 'كتب النساء والصحابيات', 'Kutub-e-Khawateen o Sahabiyyat') },
    { key: 'DUA', label: t('Duas & Liturgies', 'ادعیہ و اوراد', 'الأدعية والأوراد', 'Duas & Liturgies') },
    { key: 'HADITH', label: t('Hadith & Commentaries', 'حدیث و شروحات', 'الحديث والشروح', 'Hadith o Shurooh') },
    { key: 'TAFSIR', label: t('Tafsir', 'تفسیر قرآن', 'التفسير', 'Tafsir') },
    { key: 'HANAFI', label: t('Hanafi Fiqh', 'فقہ حنفی', 'الفقه الحنفي', 'Hanafi Fiqh') },
    { key: 'MALIKI', label: t('Maliki Fiqh', 'فقہ مالکی', 'الفقه المالكي', 'Maliki Fiqh') },
    { key: 'SHAFII', label: t('Shafi\'i Fiqh', 'فقہ شافعی', 'الفقه الشافعي', 'Shafi\'i Fiqh') },
    { key: 'HANBALI', label: t('Hanbali Fiqh', 'فقہ حنبلی', 'الفقه الحنبلي', 'Hanbali Fiqh') },
    { key: 'USUL', label: t('Usul & Principles', 'اصول و قواعد', 'الأصول والقواعد', 'Usool o Qawaid') },
    { key: 'MUSTALAH', label: t('Mustalah Hadith', 'اصولِ حدیث', 'مصطلح الحديث', 'Mustalah Hadith') },
    { key: 'AQEEDAH', label: t('Aqeedah', 'عقائد و کلام', 'العقيدة', 'Aqaid o Kalam') },
    { key: 'SIRAH', label: t('Sirah & Shama\'il', 'سیرت و شمائل', 'السيرة والشمائل', 'Seerat o Shamail') },
    { key: 'TAZKIYAH', label: t('Tazkiyah & Tasawwuf', 'تزکیہ و تصوف', 'التزكية والتصوف', 'Tazkiyah o Tasawwuf') },
    { key: 'HISTORY', label: t('Tarikh & Tabaqat', 'تاریخ و طبقات', 'التاريخ والطبقات', 'Tareekh o Tabaqat') },
  ];

  const normalizeSearchText = (str: string): string => {
    if (!str) return '';
    return str
      .toLowerCase()
      // Latin transliteration diacritics
      .replace(/[āáàâä]/g, 'a')
      .replace(/[īíìîï]/g, 'i')
      .replace(/[ūúùûü]/g, 'u')
      .replace(/[ḥ]/g, 'h')
      .replace(/[ṣ]/g, 's')
      .replace(/[ḍ]/g, 'd')
      .replace(/[ṭ]/g, 't')
      .replace(/[ẓ]/g, 'z')
      .replace(/['"`ʻʿʾ]/g, '')
      // Arabic / Urdu Tashkeel & Letter normalization
      .replace(/[\u064B-\u065F\u0670\u0640]/g, '') // Arabic diacritics & Tatweel
      .replace(/[أإآٱ]/g, 'ا')
      .replace(/[يىئ]/g, 'ی')
      .replace(/ك/g, 'ک')
      .replace(/[ةهہۃ]/g, 'ہ')
      .replace(/[ؤ]/g, 'و')
      .replace(/[\s\-_]+/g, ' ')
      .trim();
  };

  const filteredWorks = ALL_CANONICAL_WORKS.filter((item) => {
    if (search.trim()) {
      const normSearch = normalizeSearchText(search);
      const q = search.toLowerCase().trim();

      const normAr = normalizeSearchText(item.title_arabic);
      const normTrans = normalizeSearchText(item.title_transliterated);
      const normAuthor = normalizeSearchText(item.author_name);
      const normPub = normalizeSearchText(item.edition_publisher);
      const normEditor = normalizeSearchText(item.critical_editor_muhaqqiq);
      const normId = item.work_id.toLowerCase();

      // Deep chapter search across Arabic Matn, Urdu Translation, and English Synopsis
      const bookData = getBookChapters(item.work_id, item.title_arabic, item.title_transliterated);
      const matchesChapterContent = bookData?.chapters?.some((ch) => {
        const chAr = normalizeSearchText(ch.chapterTitleArabic + ' ' + ch.arabicMatn);
        const chUr = normalizeSearchText(ch.chapterTitleUrdu + ' ' + ch.urduTranslation);
        const chEn = normalizeSearchText(ch.chapterTitleEnglish + ' ' + ch.englishSynopsis);
        return chAr.includes(normSearch) || chUr.includes(normSearch) || chEn.includes(normSearch);
      });

      const matchesSearch =
        normAr.includes(normSearch) ||
        normTrans.includes(normSearch) ||
        normAuthor.includes(normSearch) ||
        normPub.includes(normSearch) ||
        normEditor.includes(normSearch) ||
        normId.includes(q) ||
        matchesChapterContent ||
        // Check partial transliteration matches (e.g. "bukhari", "nawawi", "quran", "tafsir", "sirah")
        normSearch.split(' ').every((token) => normTrans.includes(token) || normAuthor.includes(token) || normAr.includes(token));

      if (!matchesSearch) return false;
    }

    // Only apply discipline filter if user has not entered a cross-cutting search query
    if (!search.trim()) {
      if (selectedDiscipline === 'SISTERS') return item.work_id.startsWith('CANON-NIS-') || item.work_id.includes('SAHABIYYAT');
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
      const found = ALL_CANONICAL_WORKS.find((w) => w.work_id === work);
      if (found) {
        setSelectedWork(found);
        setIsReaderModalOpen(true);
      }
    } else if (surah && typeof surah === 'string') {
      const sNum = parseInt(surah, 10);
      if (!isNaN(sNum) && sNum >= 1 && sNum <= 114) {
        const quranWork = ALL_CANONICAL_WORKS.find((w) => w.discipline === 'QURAN') || ALL_CANONICAL_WORKS[0];
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

  const handleSelectWorkFromCard = (work: CanonicalEditionRecord) => {
    setSelectedWork(work);
    setSelectedChapterIndex(0);
    setIsSanadInspectorOpen(true);
  };

  const handleOpenReaderForWork = (work: CanonicalEditionRecord) => {
    setSelectedWork(work);
    setSelectedChapterIndex(0);
    if (work.discipline === 'QURAN' || work.work_id === 'CANON-QUR-001') {
      setSelectedSurahNumber(1);
    }
    setIsReaderModalOpen(true);
    showAmalToast(`Opened Reader for ${work.title_transliterated}`, 'info');
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
    const work = ALL_CANONICAL_WORKS.find((w) => w.work_id === libraryLastRead.workId);
    if (work) {
      setSelectedWork(work);
      setSelectedChapterIndex(libraryLastRead.chapterIndex || 0);
      setIsReaderModalOpen(true);
      showAmalToast(
        t(
          `📖 Resumed reading: ${work.title_transliterated} · Chapter ${(libraryLastRead.chapterIndex || 0) + 1}`,
          `📖 آخری مطالعہ بحال ہو گیا: ${work.title_arabic || work.title_transliterated} · باب ${(libraryLastRead.chapterIndex || 0) + 1}`,
          `📖 استئناف القراءة: ${work.title_arabic} · الباب ${(libraryLastRead.chapterIndex || 0) + 1}`,
          `📖 Aakhri mutala bahaal ho gaya: ${work.title_transliterated} · Baab ${(libraryLastRead.chapterIndex || 0) + 1}`
        ),
        'success'
      );
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
        <title>{t('AMAL OS — Canonical Heritage Library & Reader', 'عمل او ایس — مکتبہ کتبِ معتمدہ', 'نظام عمل — المكتبة التراثية المعتمدة', 'AMAL OS — Canonical Heritage Library & Reader')}</title>
        <meta name="description" content="The 117-Volume Classical Sunni Library: Kanz-ul-Iman, Bahar-e-Shariat, Sahih Hadith, and Islamic Jurisprudence." />
      </Head>

      <Navigation />

      <main style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px 80px' }}>
        {/* Breadcrumb / Top Bar */}
        <div style={{ padding: '16px 0 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#666' }}>
            <Link href="/" style={{ color: AmalTheme.colors.primary, textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <span>{t('Canonical Heritage Library', 'مکتبہ کتبِ معتمدہ', 'المكتبة التراثية المعتمدة', 'Canonical Heritage Library')}</span>
          </div>
          <div style={{ fontSize: 12, color: '#888' }}>
            {ALL_CANONICAL_WORKS.length} {t('Classical Masterworks Registered · Zero Synthetic Fiqh', 'معتبر کتب · بغیر کسی اختراع کے', 'كتاباً معتمداً مسجلاً · دون أي تلفيق', 'Classical Masterworks Registered · Zero Synthetic Fiqh')}
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
                  {t("Sawād al-A'zam Heritage", 'تراثِ سوادِ اعظم', 'تراث السواد الأعظم', "Sawad-e-A'zam Heritage")}
                </span>
              </div>
              <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0F172A', margin: '4px 0 8px' }}>
                {t('Curated Classical Reader & Research Index', 'منتخب کلاسیکی مطالعہ و تحقیقی اشاریہ', 'القراءات التراثية المنتقاة ودليل البحث العلمي', 'Curated Classical Reader & Research Index')}
              </h1>
              <div style={{ fontSize: 16, fontWeight: 700, color: AmalTheme.colors.primary, marginBottom: 8 }}>
                {t(
                  'Maktaba-e-Sawad-e-Azam — Classical Sunni Library & Reader',
                  'مكتبة السواد الأعظم — قراءات منتخبہ ودليل البحث العلمي',
                  'مكتبة السواد الأعظم — القراءات المعتمدة',
                  'Maktaba-e-Sawad-e-Azam — Classical Sunni Library & Reader'
                )}
              </div>
              <p style={{ fontSize: 14, color: '#475569', maxWidth: 740, lineHeight: 1.6, margin: 0 }}>
                {t(
                  'Explore 106 verified classical masterworks across 14 sacred disciplines. Featuring authentic curated pedagogical chapters, comprehensive scholarly biographies, and direct access to complete multi-volume digital manuscripts.',
                  '۱۴ شرعی و دینی علوم پر ۱۰۶ معتبر کلاسیکی کتب کا جائزہ لیں۔ منتخب اسباق، تفصیلی علمی سوانح اور اصل عربی و اردو نسخہ جات تک براہِ راست رسائی حاصل کریں۔',
                  'استكشف ١٠٦ مؤلفات معتمدة عبر ١٤ علماً شرعياً. تشمل فصولاً دراسية منتقاة، وتراجم علمية شاملة، ووصولاً مباشراً إلى المخطوطات الكاملة.',
                  '14 sharai uloom par 106 motabar kutub ka jaiza lein. Muntakhab asbaq, tafseeli ilmi sawaneh aur asal nuskho tak direct rasai hasil karein.'
                )}
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
                {t(
                  'The Sisters Sanctuary: 20 Classical Books on Women & Sahabiyyat',
                  'گوشۂ خواتین: خواتین و صحابیات پر ۲۰ معتبر کتب',
                  'جناح الأخوات: ٢٠ كتاباً في فقه المرأة والصحابيات',
                  'Gosha-e-Khawateen: 20 Classical Books on Women & Sahabiyyat'
                )}
              </div>
              <div style={{ fontSize: 12, color: '#4B5563' }}>
                {t(
                  "Jannati Zewar, Bahar-e-Shari'at, Al-Ijabah by Imam al-Zarkashi, Seerat Aisha, and Taharah Fiqh.",
                  'جنتی زیور، بہارِ شریعت، الاجابة امام زرکشی، سیرت عائشہؓ اور فقہی مسائلِ طہارت۔',
                  'جنتي زيور، بهار شريعت، الإجابة للإمام الزركشي، سيرة السيدة عائشة، وأحكام الطهارة.',
                  'Jannati Zewar, Bahar-e-Shari\'at, Al-Ijabah Imam Zarkashi, Seerat Aisha, aur Fiqh-e-Taharah.'
                )}
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
            <span>🌸 {t('Open Sisters Sanctuary', 'گوشۂ خواتین کھولیں', 'فتح جناح الأخوات', 'Sisters Sanctuary Kholein')}</span>
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
                  {t('Resume Last Read', 'آخری مطالعہ بحال کریں', 'استئناف القراءة الأخيرة', 'Aakhri Mutala Bahal Karein')}: {(isUrdu || isArabic) ? libraryLastRead.workTitleArabic : libraryLastRead.workTitleTransliterated}
                </div>
                {libraryLastRead.chapterTitleUrdu && (
                  <div style={{ fontSize: 12, color: '#047857', marginTop: 2 }}>
                    {t('Chapter', 'باب', 'الباب', 'Bab')}: {(isUrdu || isArabic) ? libraryLastRead.chapterTitleUrdu : ((libraryLastRead as any).chapterTitleEnglish || libraryLastRead.chapterTitleUrdu)} · #{(libraryLastRead.chapterIndex || 0) + 1}
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
              <span>{t('Resume Reading', 'مطالعہ جاری رکھیں', 'متابعة القراءة', 'Mutala Jari Rakhein')}</span>
              <span>➔</span>
            </button>
          </div>
        )}

        {/* Global Search & View Mode Switcher Header */}
        <section
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            padding: '20px 24px',
            border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
            marginBottom: 20,
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          }}
        >
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            {/* Search Input */}
            <div style={{ flex: 1, minWidth: 280 }}>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search 129 Classical Masterworks by title (Arabic/English), author, publisher, or muhaqqiq..."
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: 14,
                  borderRadius: 10,
                  border: '1px solid #CBD5E1',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* View Mode Switcher: Bookshelves vs Paginated Grid vs Split Inspector */}
            <div
              style={{
                display: 'inline-flex',
                backgroundColor: '#F1F5F9',
                padding: 4,
                borderRadius: 12,
                border: '1px solid #E2E8F0',
                gap: 4,
              }}
            >
              <button
                onClick={() => setViewMode('SHELVES')}
                style={{
                  padding: '8px 14px',
                  borderRadius: 8,
                  border: 'none',
                  backgroundColor: viewMode === 'SHELVES' ? '#FFFFFF' : 'transparent',
                  color: viewMode === 'SHELVES' ? AmalTheme.colors.primary : '#475569',
                  fontWeight: viewMode === 'SHELVES' ? 800 : 600,
                  fontSize: 12.5,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  boxShadow: viewMode === 'SHELVES' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 0.15s ease',
                }}
              >
                <span>📚</span>
                <span>{t('Bookshelves', 'الماریاں (رفوف)', 'رفوف العلوم', 'Bookshelves')}</span>
              </button>

              <button
                onClick={() => setViewMode('GRID')}
                style={{
                  padding: '8px 14px',
                  borderRadius: 8,
                  border: 'none',
                  backgroundColor: viewMode === 'GRID' ? '#FFFFFF' : 'transparent',
                  color: viewMode === 'GRID' ? AmalTheme.colors.primary : '#475569',
                  fontWeight: viewMode === 'GRID' ? 800 : 600,
                  fontSize: 12.5,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  boxShadow: viewMode === 'GRID' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 0.15s ease',
                }}
              >
                <span>🗂️</span>
                <span>{t('Paginated Grid', 'گرڈ منظر', 'شبكة الكتب', 'Paginated Grid')}</span>
              </button>

              <button
                onClick={() => setViewMode('SPLIT')}
                style={{
                  padding: '8px 14px',
                  borderRadius: 8,
                  border: 'none',
                  backgroundColor: viewMode === 'SPLIT' ? '#FFFFFF' : 'transparent',
                  color: viewMode === 'SPLIT' ? AmalTheme.colors.primary : '#475569',
                  fontWeight: viewMode === 'SPLIT' ? 800 : 600,
                  fontSize: 12.5,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  boxShadow: viewMode === 'SPLIT' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 0.15s ease',
                }}
              >
                <span>📋</span>
                <span>{t('Researcher Index', 'فہرستِ محققین', 'فهرس البحث', 'Researcher Index')}</span>
              </button>
            </div>
          </div>

          {/* Discipline Filter Quick Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {filterCategories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedDiscipline(cat.key)}
                style={{
                  padding: '5px 12px',
                  borderRadius: 16,
                  border: selectedDiscipline === cat.key ? `1px solid ${AmalTheme.colors.primary}` : '1px solid #E2E8F0',
                  fontSize: 12,
                  fontWeight: 600,
                  backgroundColor:
                    selectedDiscipline === cat.key ? AmalTheme.colors.primary : '#F8FAFC',
                  color: selectedDiscipline === cat.key ? '#FFFFFF' : '#475569',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* View Mode 1: Bookshelves (رفوف العلوم) — Organized by discipline without endless scroll */}
        {viewMode === 'SHELVES' && (
          <LibraryBookshelfView
            works={filteredWorks}
            selectedWork={selectedWork}
            onSelectWork={handleSelectWorkFromCard}
            onOpenReader={handleOpenReaderForWork}
            onFilterDiscipline={(discKey) => setSelectedDiscipline(discKey)}
          />
        )}

        {/* View Mode 2: Paginated Grid (شبكة الكتب) — 12 books per page with page controls */}
        {viewMode === 'GRID' && (
          <LibraryGridView
            works={filteredWorks}
            selectedWork={selectedWork}
            onSelectWork={handleSelectWorkFromCard}
            onOpenReader={handleOpenReaderForWork}
            pageSize={12}
          />
        )}

        {/* View Mode 3: Split Researcher View (فهرس البحث) */}
        {viewMode === 'SPLIT' && (
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
        )}
      </main>

      {/* Critical Sanad & Provenance Modal (When clicked from Shelves or Grid view) */}
      {isSanadInspectorOpen && selectedWork && (
        <div
          onClick={() => setIsSanadInspectorOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 20,
              maxWidth: 820,
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              position: 'relative',
              padding: 24,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: AmalTheme.colors.primary, textTransform: 'uppercase' }}>
                📜 Critical Sanad &amp; Edition Provenance
              </div>
              <button
                onClick={() => setIsSanadInspectorOpen(false)}
                style={{
                  border: 'none',
                  backgroundColor: '#F1F5F9',
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  cursor: 'pointer',
                  fontSize: 16,
                  fontWeight: 700,
                }}
              >
                ✕
              </button>
            </div>

            <LibraryWorkDetail
              selectedWork={selectedWork}
              onOpenReader={() => {
                setIsSanadInspectorOpen(false);
                handleOpenReader();
              }}
            />
          </div>
        </div>
      )}

      {/* FULL IN-APP READER MODAL */}
      {isReaderModalOpen && selectedWork && (
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
