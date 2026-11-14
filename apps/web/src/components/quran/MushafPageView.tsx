import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ALL_114_SURAHS, QuranSurahMeta } from '../../lib/quran-114-directory';
import { QURAN_SURAHS_COLLECTION, QuranSurahData } from '../../lib/quran-surahs-data';
import {
  getMushafPageMeta,
  findFirstPageOfSurah,
  findFirstPageOfJuz,
  findMushafPageForAyah,
  MushafPageMeta,
} from '../../data/mushaf-pages-index';
import {
  getTajCompanyPageMeta,
  findTajCompanyPageForAyah,
  findFirstTajCompanyPageOfSurah,
  findFirstTajCompanyPageOfJuz,
} from '../../data/taj-company-548-index';
import { MushafAyahActionSheet, MushafSelectedAyah } from './MushafAyahActionSheet';
import { triggerHaptic } from '../../lib/haptics';
import { showAmalToast } from '../Toast';
import {
  IconArrowLeft,
  IconArrowRight,
  IconBookmark,
  IconSun,
  IconMoon,
  IconPlay,
  IconPause,
} from '../icons/AmalIcons';

export type MushafTheme = 'RAWDAH_CREAM' | 'KISWA_NIGHT' | 'DAMASCUS_SEPIA';
export type MushafLayout = 'MADANI_604' | 'INDOPAK_548';

export interface MushafPageViewProps {
  initialPage?: number;
  onPageChange?: (page: number) => void;
  onOpenShareModal: (ayah: {
    surahNumber: number;
    surahNameArabic: string;
    surahNameEnglish: string;
    surahNameUrdu: string;
    ayahNumber: number;
    arabicText: string;
    urduTranslation: string;
    englishTranslation?: string;
  }) => void;
  onPlayAyahAudio?: (surahNumber: number, ayahNumber: number) => void;
  playingAyahNumber?: number | null;
  selectedSurahNumber?: number;
}

export const MushafPageView: React.FC<MushafPageViewProps> = ({
  initialPage = 1,
  onPageChange,
  onOpenShareModal,
  onPlayAyahAudio,
  playingAyahNumber,
  selectedSurahNumber,
}) => {
  // Mushaf Layout format: Madani 15-Line (604 pages) vs Taj Company 16-Line (548 pages)
  const [mushafLayout, setMushafLayout] = useState<MushafLayout>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('amal_mushaf_layout') as MushafLayout;
      if (saved === 'INDOPAK_548' || saved === 'MADANI_604') return saved;
    }
    return 'MADANI_604';
  });

  const maxPages = mushafLayout === 'INDOPAK_548' ? 548 : 604;

  // Page number state (1 to maxPages)
  const [currentPage, setCurrentPage] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('amal_mushaf_last_page');
      if (saved) {
        const p = parseInt(saved, 10);
        if (p >= 1 && p <= 604) return p;
      }
    }
    return initialPage;
  });

  // Theme state
  const [theme, setTheme] = useState<MushafTheme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('amal_mushaf_theme') as MushafTheme;
      if (saved) return saved;
    }
    return 'RAWDAH_CREAM';
  });

  // Dual Script state: Madani (Uthmani) vs Indo-Pak (Nastaliq / Subcontinent)
  const [scriptStyle, setScriptStyle] = useState<'MADANI' | 'INDOPAK'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('amal_mushaf_script');
      if (saved === 'INDOPAK' || saved === 'MADANI') return saved;
    }
    return 'MADANI';
  });

  // Toggle layout format (Madani 604 vs Indo-Pak 548) with automatic ayah preservation
  const handleToggleLayout = () => {
    triggerHaptic('selection');
    const nextLayout: MushafLayout = mushafLayout === 'MADANI_604' ? 'INDOPAK_548' : 'MADANI_604';
    setMushafLayout(nextLayout);
    if (typeof window !== 'undefined') {
      localStorage.setItem('amal_mushaf_layout', nextLayout);
    }

    // Auto-harmonize typography
    const nextScript = nextLayout === 'INDOPAK_548' ? 'INDOPAK' : 'MADANI';
    setScriptStyle(nextScript);
    if (typeof window !== 'undefined') {
      localStorage.setItem('amal_mushaf_script', nextScript);
    }

    // Preserve exact verse reader position across page pagination
    const currentMeta = mushafLayout === 'INDOPAK_548'
      ? getTajCompanyPageMeta(currentPage)
      : getMushafPageMeta(currentPage);
    const anchorVerse = currentMeta.verses[0];
    if (anchorVerse) {
      const targetPage = nextLayout === 'INDOPAK_548'
        ? findTajCompanyPageForAyah(anchorVerse.surah, anchorVerse.ayah)
        : findMushafPageForAyah(anchorVerse.surah, anchorVerse.ayah);
      setCurrentPage(targetPage);
    }

    showAmalToast(
      nextLayout === 'INDOPAK_548'
        ? 'Indo-Pak 16-Line Taj Company Mushaf (548 Pages) activated · ۱۶ سطری تاج کمپنی مصحف'
        : 'Madani 15-Line Mushaf (604 Pages) activated · ۱۵ سطری عثمانی مدنی مصحف',
      'info'
    );
  };

  const handleToggleScript = () => {
    triggerHaptic('selection');
    const next = scriptStyle === 'MADANI' ? 'INDOPAK' : 'MADANI';
    setScriptStyle(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem('amal_mushaf_script', next);
    }
    showAmalToast(
      next === 'INDOPAK'
        ? 'Indo-Pak Nastaliq Script activated · پاک و ہند نستعلیق خط'
        : 'Madani Uthmani Script activated · عثمانی مدنی خط',
      'info'
    );
  };

  // Immersive (Full-screen) distraction-free toggle
  const [isImmersive, setIsImmersive] = useState<boolean>(false);

  // Jump Modal
  const [isJumpModalOpen, setIsJumpModalOpen] = useState<boolean>(false);
  const [jumpTargetPage, setJumpTargetPage] = useState<string>('');

  // Selected Ayah for Action Sheet
  const [selectedAyahForSheet, setSelectedAyahForSheet] = useState<MushafSelectedAyah | null>(null);

  // Khatmah Ribbon Bookmark state
  const [khatmahBookmark, setKhatmahBookmark] = useState<{
    page: number;
    surahNumber: number;
    ayahNumber: number;
    timestamp: number;
  } | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('amal_khatmah_bookmark');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return null;
  });

  // Surahs in-memory lookup map
  const [surahCache, setSurahCache] = useState<Record<number, QuranSurahData>>(() => {
    const initial: Record<number, QuranSurahData> = {};
    for (const s of QURAN_SURAHS_COLLECTION) {
      initial[s.surahNumber] = s;
    }
    return initial;
  });

  // Sync initialPage when selectedSurahNumber changes externally
  useEffect(() => {
    if (selectedSurahNumber && selectedSurahNumber >= 1 && selectedSurahNumber <= 114) {
      const targetPage = findFirstPageOfSurah(selectedSurahNumber);
      if (targetPage !== currentPage) {
        setCurrentPage(targetPage);
      }
    }
  }, [selectedSurahNumber]);

  // Persist current page
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('amal_mushaf_last_page', String(currentPage));
    }
    if (onPageChange) onPageChange(currentPage);
  }, [currentPage, onPageChange]);

  // Persist theme
  const handleSelectTheme = (t: MushafTheme) => {
    setTheme(t);
    if (typeof window !== 'undefined') {
      localStorage.setItem('amal_mushaf_theme', t);
    }
  };

  // Current page metadata
  const pageMeta: MushafPageMeta = useMemo(() => {
    return mushafLayout === 'INDOPAK_548'
      ? getTajCompanyPageMeta(currentPage)
      : getMushafPageMeta(currentPage);
  }, [currentPage, mushafLayout]);

  // Preload and fetch any surahs required by this page
  useEffect(() => {
    const missingSurahs = pageMeta.surahs.filter((s) => !surahCache[s]);
    if (missingSurahs.length === 0) return;

    let isMounted = true;
    missingSurahs.forEach(async (surahNum) => {
      // 1. Try local cached
      try {
        const cached = localStorage.getItem(`amal_cached_surah_${surahNum}`);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed && Array.isArray(parsed.verses)) {
            if (isMounted) setSurahCache((prev) => ({ ...prev, [surahNum]: parsed }));
            return;
          }
        }
      } catch {}

      // 2. Fetch local json asset
      try {
        const res = await fetch(`/data/quran/surahs/${surahNum}.json`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setSurahCache((prev) => ({ ...prev, [surahNum]: data }));
            try {
              localStorage.setItem(`amal_cached_surah_${surahNum}`, JSON.stringify(data));
            } catch {}
          }
        }
      } catch (err) {
        console.warn(`Could not preload Surah ${surahNum} for Mushaf page:`, err);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [pageMeta.surahs, surahCache]);

  // Keyboard navigation (Left / Right Arrow)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isJumpModalOpen) return;
      if (e.key === 'ArrowLeft') {
        // In Arabic RTL, left arrow flips to next page (Page + 1)
        handleNextPage();
      } else if (e.key === 'ArrowRight') {
        // Right arrow flips to previous page (Page - 1)
        handlePrevPage();
      } else if (e.key === 'f' || e.key === 'F') {
        setIsImmersive((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, isJumpModalOpen]);

  // Swipe gesture handling for mobile / tablets
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0]?.clientX ?? null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isSignificantSwipe = Math.abs(distance) > 50;

    if (isSignificantSwipe) {
      if (distance > 0) {
        // Swiped Left -> In RTL Quran, this moves to NEXT page
        handleNextPage();
      } else {
        // Swiped Right -> Moves to PREVIOUS page
        handlePrevPage();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleNextPage = () => {
    if (currentPage < maxPages) {
      triggerHaptic('selection');
      setCurrentPage((p) => p + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      triggerHaptic('selection');
      setCurrentPage((p) => p - 1);
    }
  };

  const handleSetKhatmah = (page: number, surah: number, ayah: number) => {
    const bookmark = { page, surahNumber: surah, ayahNumber: ayah, timestamp: Date.now() };
    setKhatmahBookmark(bookmark);
    if (typeof window !== 'undefined') {
      localStorage.setItem('amal_khatmah_bookmark', JSON.stringify(bookmark));
    }
  };

  const handleJumpToKhatmah = () => {
    if (khatmahBookmark) {
      triggerHaptic('success');
      setCurrentPage(khatmahBookmark.page);
      showAmalToast(`Opened Khatmah Ribbon at Page ${khatmahBookmark.page}`, 'info');
    }
  };

  // Palette styling based on theme
  const palette = useMemo(() => {
    switch (theme) {
      case 'KISWA_NIGHT':
        return {
          bg: '#06100B',
          pageBg: '#0A1812',
          border: 'rgba(212, 175, 55, 0.3)',
          text: '#FDE68A',
          metaText: '#A7F3D0',
          ayahNumBg: 'rgba(212, 175, 55, 0.15)',
          ayahNumBorder: '#D4AF37',
          cartoucheBg: 'linear-gradient(135deg, #062016 0%, #04140D 100%)',
          cartoucheBorder: '#D4AF37',
        };
      case 'DAMASCUS_SEPIA':
        return {
          bg: '#EDE5DC',
          pageBg: '#F7F2EB',
          border: 'rgba(180, 83, 9, 0.25)',
          text: '#382A1D',
          metaText: '#78350F',
          ayahNumBg: 'rgba(180, 83, 9, 0.1)',
          ayahNumBorder: '#B45309',
          cartoucheBg: 'linear-gradient(135deg, #F3EAE0 0%, #E8DCCF 100%)',
          cartoucheBorder: '#B45309',
        };
      case 'RAWDAH_CREAM':
      default:
        return {
          bg: '#F5F3EF',
          pageBg: '#FDFCF9',
          border: 'rgba(212, 175, 55, 0.35)',
          text: '#111827',
          metaText: '#065F46',
          ayahNumBg: '#F0FDF4',
          ayahNumBorder: '#059669',
          cartoucheBg: 'linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%)',
          cartoucheBorder: '#059669',
        };
    }
  }, [theme]);

  // Convert numbers to Eastern Arabic numerals (١, ٢, ٣...)
  const toArabicNumerals = (num: number): string => {
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return String(num)
      .split('')
      .map((d) => arabicDigits[parseInt(d, 10)] ?? d)
      .join('');
  };

  // Group verses on this page by Surah
  const surahGroups = useMemo(() => {
    const groups: Array<{
      surahNumber: number;
      surahMeta: QuranSurahMeta;
      verses: Array<{
        ayahNumber: number;
        textArabic: string;
        textUrdu?: string;
        textEnglish?: string;
      }>;
    }> = [];

    let currentSurahNum = -1;
    let currentGroup: (typeof groups)[0] | null = null;

    for (const vRef of pageMeta.verses) {
      if (vRef.surah !== currentSurahNum) {
        currentSurahNum = vRef.surah;
        const meta = ALL_114_SURAHS.find((s) => s.number === currentSurahNum) || {
          number: currentSurahNum,
          nameArabic: '',
          nameTransliterated: '',
          nameUrdu: '',
          nameEnglish: '',
          revelationType: 'MECCAN' as const,
          ayahsCount: 0,
        };
        currentGroup = {
          surahNumber: currentSurahNum,
          surahMeta: meta,
          verses: [],
        };
        groups.push(currentGroup);
      }

      const surahData = surahCache[vRef.surah];
      const verseData = surahData?.verses.find((v) => v.ayahNumber === vRef.ayah);

      if (currentGroup) {
        currentGroup.verses.push({
          ayahNumber: vRef.ayah,
          textArabic: verseData?.textArabic || `[Surah ${vRef.surah}:${vRef.ayah}]`,
          textUrdu: verseData?.textUrdu,
          textEnglish: verseData?.textEnglish,
        });
      }
    }

    return groups;
  }, [pageMeta.verses, surahCache]);

  const topSurah = ALL_114_SURAHS.find((s) => s.number === pageMeta.startSurah);

  return (
    <div
      style={{
        backgroundColor: palette.bg,
        minHeight: '85vh',
        padding: isImmersive ? '8px 4px' : '16px 12px 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        transition: 'all 0.2s ease',
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 1. MUSHAF CONTROLS & UTILITY BAR (Collapsed in Immersive mode) */}
      {!isImmersive && (
        <div
          style={{
            maxWidth: 780,
            width: '100%',
            marginBottom: 12,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 10,
            padding: '8px 14px',
            backgroundColor: palette.pageBg,
            borderRadius: 12,
            border: `1px solid ${palette.border}`,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          }}
        >
          {/* Left: Juz & Hizb Meta */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: palette.metaText,
                backgroundColor: palette.ayahNumBg,
                padding: '3px 8px',
                borderRadius: 6,
                border: `1px solid ${palette.border}`,
              }}
            >
              Juz {pageMeta.juz} · Rub' {pageMeta.rub}
            </span>

            {khatmahBookmark && (
              <button
                onClick={handleJumpToKhatmah}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: 11.5,
                  fontWeight: 700,
                  color: '#D97706',
                  backgroundColor: '#FEF3C7',
                  border: '1px solid #FCD34D',
                  padding: '3px 8px',
                  borderRadius: 6,
                  cursor: 'pointer',
                }}
                title="Jump to saved Khatmah Ribbon"
              >
                <IconBookmark size={13} color="#D97706" />
                <span>Khatmah: p.{khatmahBookmark.page}</span>
              </button>
            )}
          </div>

          {/* Center: Page Jump Button & Script Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <button
              onClick={() => setIsJumpModalOpen(true)}
              style={{
                border: `1px solid ${palette.border}`,
                borderRadius: 8,
                padding: '4px 10px',
                backgroundColor: 'transparent',
                color: palette.text,
                fontSize: 12.5,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <span>📖 Page {currentPage} / {maxPages}</span>
              <span style={{ fontSize: 9, opacity: 0.6 }}>▼ Jump</span>
            </button>

            {/* Dual Layout & Script Toggle: Madani 15-Line vs Indo-Pak 16-Line */}
            <button
              onClick={handleToggleLayout}
              style={{
                border: `1px solid ${mushafLayout === 'INDOPAK_548' ? '#059669' : palette.border}`,
                borderRadius: 8,
                padding: '4px 10px',
                backgroundColor: mushafLayout === 'INDOPAK_548' ? '#ECFDF5' : 'transparent',
                color: mushafLayout === 'INDOPAK_548' ? '#065F46' : palette.text,
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
              title="Toggle between Madani 15-Line (604 Pages) and Taj Company 16-Line (548 Pages) layout"
            >
              <span>{mushafLayout === 'INDOPAK_548' ? '🕌 Indo-Pak 16-Line' : '🌍 Madani 15-Line'}</span>
              <span style={{ fontSize: 10, opacity: 0.6 }}>⇌</span>
            </button>
          </div>

          {/* Right: Theme Switcher & Fullscreen Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {/* Theme: Cream */}
            <button
              onClick={() => handleSelectTheme('RAWDAH_CREAM')}
              title="Rawdah Cream Theme"
              style={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                backgroundColor: '#FDFCF9',
                border: theme === 'RAWDAH_CREAM' ? '2px solid #059669' : '1px solid #D1D5DB',
                cursor: 'pointer',
              }}
            />
            {/* Theme: Sepia */}
            <button
              onClick={() => handleSelectTheme('DAMASCUS_SEPIA')}
              title="Damascus Sepia Theme"
              style={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                backgroundColor: '#F7F2EB',
                border: theme === 'DAMASCUS_SEPIA' ? '2px solid #B45309' : '1px solid #D1D5DB',
                cursor: 'pointer',
              }}
            />
            {/* Theme: Kiswa OLED */}
            <button
              onClick={() => handleSelectTheme('KISWA_NIGHT')}
              title="Kiswa Dark OLED Theme"
              style={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                backgroundColor: '#06100B',
                border: theme === 'KISWA_NIGHT' ? '2px solid #D4AF37' : '1px solid #4B5563',
                cursor: 'pointer',
              }}
            />

            {/* Immersive Mode Toggle */}
            <button
              onClick={() => setIsImmersive(true)}
              style={{
                marginLeft: 4,
                padding: '4px 8px',
                borderRadius: 6,
                border: `1px solid ${palette.border}`,
                backgroundColor: 'transparent',
                color: palette.text,
                fontSize: 11.5,
                fontWeight: 600,
                cursor: 'pointer',
              }}
              title="Enter Distraction-Free Fullscreen"
            >
              ⛶ Full
            </button>
          </div>
        </div>
      )}

      {/* 2. THE SACRED MUSHAF PAGE FRAME (15-line classical ratio) */}
      <div
        style={{
          maxWidth: 780,
          width: '100%',
          backgroundColor: palette.pageBg,
          borderRadius: 16,
          border: `2px solid ${palette.border}`,
          boxShadow:
            theme === 'KISWA_NIGHT'
              ? '0 10px 30px rgba(0, 0, 0, 0.5), inset 0 0 40px rgba(0, 0, 0, 0.6)'
              : '0 10px 25px -3px rgba(0, 0, 0, 0.07), inset 0 0 25px rgba(212, 175, 55, 0.05)',
          padding: isImmersive ? '16px 18px 20px' : '24px 28px 32px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '75vh',
        }}
      >
        {/* Khatmah Silk Ribbon Marker (Visual Tab) */}
        {khatmahBookmark && khatmahBookmark.page === currentPage && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 28,
              width: 22,
              height: 48,
              backgroundColor: '#D97706',
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 4,
              boxShadow: '0 4px 10px rgba(217, 119, 6, 0.4)',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              paddingBottom: 4,
              zIndex: 10,
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)',
            }}
            title="Khatmah Ribbon is placed on this page"
          />
        )}

        {/* Page Header (Juz on Left, Surah on Right, Page in Arabic at center) */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: `1px solid ${palette.border}`,
            paddingBottom: 10,
            marginBottom: 16,
            fontSize: 13,
            color: palette.metaText,
            fontWeight: 700,
          }}
        >
          {/* Left: Juz */}
          <span style={{ fontFamily: '"Amiri", serif', direction: 'rtl' }}>
            الجزء {toArabicNumerals(pageMeta.juz)}
          </span>

          {/* Center: Tap to exit immersive */}
          {isImmersive ? (
            <button
              onClick={() => setIsImmersive(false)}
              style={{
                border: `1px solid ${palette.border}`,
                borderRadius: 20,
                padding: '2px 10px',
                backgroundColor: 'transparent',
                color: palette.metaText,
                fontSize: 11,
                cursor: 'pointer',
              }}
            >
              صفحة {toArabicNumerals(currentPage)} · Exit
            </button>
          ) : (
            <span style={{ fontFamily: '"Amiri", serif', fontSize: 14 }}>
              صفحة {toArabicNumerals(currentPage)}
            </span>
          )}

          {/* Right: Surah Name */}
          <span style={{ fontFamily: '"Amiri", serif', direction: 'rtl' }}>
            {topSurah?.nameArabic || 'القرآن الكريم'}
          </span>
        </div>

        {/* Page Body: Verses & Ornate Surah Headers */}
        <div
          dir="rtl"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'justify',
            textAlignLast: 'center',
            lineHeight: scriptStyle === 'INDOPAK' ? 2.8 : 2.3,
            fontFamily:
              scriptStyle === 'INDOPAK'
                ? '"Noto Nastaliq Urdu", "Jameel Noori Nastaleeq", "Urdu Typesetting", serif'
                : '"Amiri", "Scheherazade New", serif',
            fontSize: scriptStyle === 'INDOPAK' ? 23 : 25,
            color: palette.text,
          }}
        >
          {surahGroups.map((group) => {
            const isFirstAyahOnThisPage = group.verses.some((v) => v.ayahNumber === 1);

            return (
              <div key={group.surahNumber} style={{ width: '100%', marginBottom: 12 }}>
                {/* 1. Surah Gilded Cartouche Header */}
                {isFirstAyahOnThisPage && (
                  <div
                    style={{
                      background: palette.cartoucheBg,
                      border: `2px solid ${palette.cartoucheBorder}`,
                      borderRadius: 12,
                      padding: '10px 16px',
                      margin: '14px 0 16px',
                      textAlign: 'center',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 22,
                        fontWeight: 700,
                        color: palette.text,
                        letterSpacing: '0.5px',
                        fontFamily: '"Amiri", serif',
                      }}
                    >
                      {group.surahMeta.nameArabic}
                    </div>
                    <div
                      style={{
                        fontSize: 11.5,
                        color: palette.metaText,
                        fontWeight: 600,
                        marginTop: 2,
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 12,
                      }}
                    >
                      <span>
                        {group.surahMeta.revelationType === 'MECCAN' ? 'مَكِّيَّة' : 'مَدَنِيَّة'}
                      </span>
                      <span>•</span>
                      <span>{toArabicNumerals(group.surahMeta.ayahsCount)} آيَات</span>
                      <span>•</span>
                      <span>ترتيبها {toArabicNumerals(group.surahNumber)}</span>
                    </div>
                  </div>
                )}

                {/* 2. Calligraphic Bismillah (for Surahs 2-114 except Surah 9) */}
                {isFirstAyahOnThisPage && group.surahNumber !== 1 && group.surahNumber !== 9 && (
                  <div
                    style={{
                      textAlign: 'center',
                      fontSize: 24,
                      color: palette.text,
                      fontFamily: '"Amiri", serif',
                      margin: '8px 0 14px',
                      letterSpacing: '1px',
                    }}
                  >
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </div>
                )}

                {/* 3. Continuous Quranic Verses with Classical Ayah End Glyphs */}
                <span style={{ wordSpacing: '2px' }}>
                  {group.verses.map((v) => {
                    const isSelected =
                      selectedAyahForSheet?.surahNumber === group.surahNumber &&
                      selectedAyahForSheet?.ayahNumber === v.ayahNumber;
                    const isAudioPlaying =
                      playingAyahNumber === v.ayahNumber &&
                      selectedSurahNumber === group.surahNumber;

                    return (
                      <React.Fragment key={`${group.surahNumber}:${v.ayahNumber}`}>
                        <span
                          onClick={() => {
                            triggerHaptic('selection');
                            setSelectedAyahForSheet({
                              surahNumber: group.surahNumber,
                              ayahNumber: v.ayahNumber,
                              textArabic: v.textArabic,
                              textUrdu: v.textUrdu,
                              textEnglish: v.textEnglish,
                            });
                          }}
                          style={{
                            cursor: 'pointer',
                            borderRadius: 4,
                            padding: '1px 3px',
                            backgroundColor: isSelected
                              ? 'rgba(212, 175, 55, 0.28)'
                              : isAudioPlaying
                              ? 'rgba(16, 185, 129, 0.25)'
                              : 'transparent',
                            transition: 'background-color 0.15s ease',
                          }}
                          title={`Surah ${group.surahMeta.nameTransliterated} : Ayah ${v.ayahNumber} (Tap for Action Sheet)`}
                        >
                          {v.textArabic}
                        </span>

                        {/* Ayah End Medallion Glyph */}
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 6px',
                            verticalAlign: 'middle',
                            position: 'relative',
                            width: 26,
                            height: 26,
                            borderRadius: '50%',
                            border: `1px solid ${palette.ayahNumBorder}`,
                            backgroundColor: palette.ayahNumBg,
                            fontSize: 12,
                            fontWeight: 700,
                            color: palette.text,
                            fontFamily: '"Amiri", serif',
                          }}
                        >
                          {toArabicNumerals(v.ayahNumber)}
                        </span>
                      </React.Fragment>
                    );
                  })}
                </span>
              </div>
            );
          })}
        </div>

        {/* Page Footer (Page number in Latin, Juz and Hizb marks) */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: `1px solid ${palette.border}`,
            paddingTop: 10,
            marginTop: 16,
            fontSize: 12,
            color: palette.metaText,
            fontWeight: 700,
          }}
        >
          <span>Hizb {pageMeta.hizb}</span>
          <span style={{ fontSize: 13, color: palette.text }}>{currentPage}</span>
          <span>{topSurah?.nameTransliterated}</span>
        </div>
      </div>

      {/* 3. FLIP NAVIGATION CONTROLS */}
      <div
        style={{
          maxWidth: 780,
          width: '100%',
          marginTop: 16,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
        }}
      >
        {/* Next Page Button (Left in RTL) */}
        <button
          onClick={handleNextPage}
          disabled={currentPage >= maxPages}
          style={{
            flex: 1,
            padding: '10px 16px',
            borderRadius: 10,
            border: `1px solid ${palette.border}`,
            backgroundColor: palette.pageBg,
            color: currentPage >= maxPages ? '#94A3B8' : palette.text,
            fontSize: 13,
            fontWeight: 700,
            cursor: currentPage >= maxPages ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.04)',
          }}
        >
          <IconArrowLeft size={16} />
          <span>Next Page ({currentPage < maxPages ? currentPage + 1 : maxPages})</span>
        </button>

        {/* Previous Page Button (Right in RTL) */}
        <button
          onClick={handlePrevPage}
          disabled={currentPage <= 1}
          style={{
            flex: 1,
            padding: '10px 16px',
            borderRadius: 10,
            border: `1px solid ${palette.border}`,
            backgroundColor: palette.pageBg,
            color: currentPage <= 1 ? '#94A3B8' : palette.text,
            fontSize: 13,
            fontWeight: 700,
            cursor: currentPage <= 1 ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.04)',
          }}
        >
          <span>Prev Page ({currentPage > 1 ? currentPage - 1 : 1})</span>
          <IconArrowRight size={16} />
        </button>
      </div>

      {/* 4. AYAH ACTION SHEET MODAL */}
      <MushafAyahActionSheet
        selectedAyah={selectedAyahForSheet}
        onClose={() => setSelectedAyahForSheet(null)}
        isPlaying={
          playingAyahNumber === selectedAyahForSheet?.ayahNumber &&
          selectedSurahNumber === selectedAyahForSheet?.surahNumber
        }
        onTogglePlay={(sNum, aNum) => {
          if (onPlayAyahAudio) onPlayAyahAudio(sNum, aNum);
        }}
        onSetKhatmahBookmark={handleSetKhatmah}
        currentPage={currentPage}
        onOpenShareModal={onOpenShareModal}
      />

      {/* 5. JUMP TO SURAH / JUZ / PAGE MODAL */}
      {isJumpModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 3000,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
          }}
          onClick={() => setIsJumpModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              maxWidth: 480,
              width: '100%',
              padding: '24px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
              border: '1px solid #E2E8F0',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 800, color: '#0F172A' }}>
              Jump in Mushaf · مصحف میں تلاش
            </h3>

            {/* Direct Page Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const p = parseInt(jumpTargetPage, 10);
                if (p >= 1 && p <= maxPages) {
                  setCurrentPage(p);
                  setIsJumpModalOpen(false);
                  setJumpTargetPage('');
                }
              }}
              style={{ display: 'flex', gap: 8, marginBottom: 18 }}
            >
              <input
                type="number"
                min={1}
                max={maxPages}
                value={jumpTargetPage}
                onChange={(e) => setJumpTargetPage(e.target.value)}
                placeholder={`Enter Page (1 - ${maxPages})`}
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: 8,
                  border: '1px solid #CBD5E1',
                  fontSize: 14,
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '10px 18px',
                  borderRadius: 8,
                  backgroundColor: '#065F46',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Go
              </button>
            </form>

            {/* Juz Quick Buttons */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', marginBottom: 8 }}>
                Jump to Juz (Para 1 - 30)
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(6, 1fr)',
                  gap: 6,
                  maxHeight: 140,
                  overflowY: 'auto',
                }}
              >
                {Array.from({ length: 30 }, (_, i) => i + 1).map((juz) => (
                  <button
                    key={juz}
                    onClick={() => {
                      const p = mushafLayout === 'INDOPAK_548'
                        ? findFirstTajCompanyPageOfJuz(juz)
                        : findFirstPageOfJuz(juz);
                      setCurrentPage(p);
                      setIsJumpModalOpen(false);
                    }}
                    style={{
                      padding: '6px 4px',
                      borderRadius: 6,
                      border: '1px solid #E2E8F0',
                      backgroundColor: '#F8FAFC',
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Juz {juz}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsJumpModalOpen(false)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: 8,
                backgroundColor: '#F1F5F9',
                color: '#475569',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                marginTop: 8,
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
