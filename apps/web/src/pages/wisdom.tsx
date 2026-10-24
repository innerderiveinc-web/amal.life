import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Navigation } from '../components/Navigation';
import { useLanguage } from '../context/LanguageContext';
import {
  QURAN_WISDOM_COLLECTION,
  QuranAyahWisdomCard,
} from '../lib/quran-wisdom-data';
import { CLASSICAL_BOOKS_CHAPTERS } from '../lib/classical-chapters-data';
import { AyahWisdomModal } from '../components/AyahWisdomModal';
import { showAmalToast } from '../components/Toast';
import {
  UniversalContentShareModal,
  UniversalCardPayload,
} from '../components/cards/UniversalContentShareModal';
import { SanadVerificationReport } from '../lib/authenticity-pipeline';
import { SanadVerificationModal } from '../components/authenticity/SanadVerificationModal';
import {
  WisdomHeroHeader,
} from '../components/wisdom/WisdomHeroHeader';
import {
  WisdomCategoryBar,
  WisdomCategory,
} from '../components/wisdom/WisdomCategoryBar';
import {
  WisdomQuranGrid,
} from '../components/wisdom/WisdomQuranGrid';
import {
  WisdomClassicalGrid,
  ClassicalWisdomItem,
} from '../components/wisdom/WisdomClassicalGrid';
import { useWisdomAudio } from '../components/wisdom/useWisdomAudio';

export type { WisdomCategory };

export default function QuranWisdomDedicatedPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<WisdomCategory>('QURAN');
  const [selectedThemeFilter, setSelectedThemeFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [bookmarkedCardIds, setBookmarkedCardIds] = useState<string[]>([]);
  const [activeModalCard, setActiveModalCard] = useState<QuranAyahWisdomCard | null>(null);
  const [sharePayload, setSharePayload] = useState<UniversalCardPayload | null>(null);
  const [activeSanadReport, setActiveSanadReport] = useState<SanadVerificationReport | null>(null);
  const { isUrdu } = useLanguage();

  // Audio Playback & Continuous Controls Hook
  const {
    audioRef,
    activeAudioKey,
    isPlayingAudio,
    continuousIndex,
    handlePlayAyahAudio,
    handlePlayTafseerAudio,
    handleAudioEnded,
    handleAudioError,
    toggleContinuousPlay,
  } = useWisdomAudio();

  // Sync category from URL query (?category=hadith, etc.)
  useEffect(() => {
    if (router.query.category) {
      const cat = String(router.query.category).toUpperCase();
      if (['QURAN', 'HADITH', 'SHAMAIL', 'TASAWWUF', 'FIQH', 'DUA'].includes(cat)) {
        setSelectedCategory(cat as WisdomCategory);
      }
    }
  }, [router.query.category]);

  // Load bookmarks from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('amal_quran_wisdom_bookmarks');
        if (saved) setBookmarkedCardIds(JSON.parse(saved));
      } catch (e) {
        console.warn('Failed to load bookmarks:', e);
      }
    }
  }, []);

  const handleToggleBookmark = (cardKey: string) => {
    setBookmarkedCardIds((prev) => {
      const next = prev.includes(cardKey)
        ? prev.filter((id) => id !== cardKey)
        : [...prev, cardKey];
      if (typeof window !== 'undefined') {
        localStorage.setItem('amal_quran_wisdom_bookmarks', JSON.stringify(next));
      }
      showAmalToast(
        prev.includes(cardKey)
          ? 'حکمت کارڈ محفوظ فہرست سے ہٹا دیا گیا۔'
          : '⭐ حکمت کارڈ محفوظ کر لیا گیا!',
        'success'
      );
      return next;
    });
  };

  // Filtered Quran list
  const filteredCards = useMemo(() => {
    return QURAN_WISDOM_COLLECTION.filter((c) => {
      const matchesTheme =
        selectedThemeFilter === 'ALL'
          ? true
          : selectedThemeFilter === 'BOOKMARKED'
            ? bookmarkedCardIds.includes(`${c.surahNumber}:${c.ayahNumber}`)
            : c.tadabburPrompt.theme === selectedThemeFilter;

      const matchesSearch =
        searchQuery.trim() === ''
          ? true
          : c.surahNameUrdu.includes(searchQuery) ||
            c.surahNameTransliterated.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.tarjumaKanzulIman.includes(searchQuery) ||
            c.tafseerKhazainUlIrfan.excerptUrdu.includes(searchQuery);

      return matchesTheme && matchesSearch;
    });
  }, [selectedThemeFilter, bookmarkedCardIds, searchQuery]);

  // Curated Classical Wisdom Cards for Hadith, Shamail, Tasawwuf, Fiqh, Dua
  const classicalCards = useMemo(() => {
    const items: ClassicalWisdomItem[] = [];

    const categoryBookMap: Record<
      string,
      {
        workIds: string[];
        label: string;
        cat: 'HADITH' | 'SHAMAIL' | 'TASAWWUF' | 'FIQH' | 'DUA';
      }
    > = {
      HADITH: {
        workIds: ['CANON-HAD-040', 'CANON-HAD-001', 'CANON-HAD-002'],
        label: 'حدیثِ مصطفیٰ ﷺ',
        cat: 'HADITH',
      },
      SHAMAIL: {
        workIds: ['CANON-SHM-001'],
        label: 'شمائلِ مصطفیٰ ﷺ',
        cat: 'SHAMAIL',
      },
      TASAWWUF: {
        workIds: ['CANON-TAZ-001', 'CANON-TAZ-002', 'CANON-TAZ-003', 'CANON-TAZ-004'],
        label: 'تزکیہ و تصوف',
        cat: 'TASAWWUF',
      },
      FIQH: {
        workIds: ['CANON-FIQ-HNF-006', 'CANON-FIQ-HNF-001', 'CANON-FIQ-SHAF-001'],
        label: 'احکامِ فقہ و شریعت',
        cat: 'FIQH',
      },
      DUA: {
        workIds: ['CANON-DUA-001', 'CANON-DUA-002', 'CANON-DEV-001'],
        label: 'ادعیہ و مناجات',
        cat: 'DUA',
      },
    };

    const cfg = categoryBookMap[selectedCategory];
    if (!cfg) return [];

    for (const wid of cfg.workIds) {
      const book = CLASSICAL_BOOKS_CHAPTERS[wid];
      if (book) {
        for (const chap of book.chapters) {
          items.push({
            id: `${wid}:${chap.chapterId}`,
            category: cfg.cat,
            categoryUrdu: cfg.label,
            sourceWork: book.verifiedExternalName,
            chapterTitleArabic: chap.chapterTitleArabic,
            chapterTitleUrdu: chap.chapterTitleUrdu,
            arabicMatn: chap.arabicMatn,
            urduTranslation: chap.urduTranslation,
            englishSynopsis: chap.englishSynopsis,
            scholarlyNotes: chap.scholarlyNotes,
          });
        }
      }
    }
    return items;
  }, [selectedCategory]);

  const filteredClassicalCards = useMemo(() => {
    if (!searchQuery.trim()) return classicalCards;
    const q = searchQuery.toLowerCase();
    return classicalCards.filter(
      (item) =>
        item.chapterTitleUrdu.includes(searchQuery) ||
        item.urduTranslation.includes(searchQuery) ||
        item.arabicMatn.includes(searchQuery) ||
        item.sourceWork.toLowerCase().includes(q)
    );
  }, [classicalCards, searchQuery]);

  return (
    <div style={{ backgroundColor: '#F8FAF9', minHeight: '100vh', paddingBottom: 100 }}>
      <Head>
        <title>قرآنی حکمت، تدبر و عمل (Quran Wisdom &amp; Reflection) | AMAL OS</title>
        <meta
          name="description"
          content="42 authentic Juz 'Amma Quran Wisdom Cards with Kanz-ul-Iman translation, Khaza'in-ul-Irfan Tafsir, and Sunnah action steps."
        />
      </Head>

      <Navigation />

      {/* Hidden Audio Element for Background Playback */}
      <audio
        ref={audioRef}
        preload="auto"
        onEnded={handleAudioEnded}
        onError={handleAudioError}
        style={{ position: 'fixed', bottom: -100, opacity: 0, pointerEvents: 'none' }}
      />

      <main style={{ maxWidth: 1140, margin: '0 auto', padding: '0 20px' }}>
        {/* Serene Hero Header with Continuous Audio Action */}
        <WisdomHeroHeader
          isUrdu={isUrdu}
          continuousIndex={continuousIndex}
          onToggleContinuous={toggleContinuousPlay}
        />

        {/* Category Switcher, Search & Thematic Filter Ribbon */}
        <WisdomCategoryBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedThemeFilter={selectedThemeFilter}
          onSelectThemeFilter={setSelectedThemeFilter}
          bookmarkedCount={bookmarkedCardIds.length}
          isUrdu={isUrdu}
        />

        {/* Wisdom Cards Grid (Quran Mode) */}
        {selectedCategory === 'QURAN' && (
          <WisdomQuranGrid
            cards={filteredCards}
            bookmarkedCardIds={bookmarkedCardIds}
            activeAudioKey={activeAudioKey}
            isPlayingAudio={isPlayingAudio}
            onToggleBookmark={handleToggleBookmark}
            onPlayAyahAudio={handlePlayAyahAudio}
            onPlayTafseerAudio={handlePlayTafseerAudio}
            onOpenModal={setActiveModalCard}
            onShareCard={setSharePayload}
            onVerifySanad={setActiveSanadReport}
          />
        )}

        {/* Classical Wisdom Cards Grid (Hadith, Shamail, Tasawwuf, Fiqh, Dua) */}
        {selectedCategory !== 'QURAN' && (
          <WisdomClassicalGrid
            items={filteredClassicalCards}
            onShareCard={setSharePayload}
          />
        )}
      </main>

      {/* Deep Tafseer Modal */}
      {activeModalCard && (
        <AyahWisdomModal
          isOpen={!!activeModalCard}
          onClose={() => setActiveModalCard(null)}
          surahNumber={activeModalCard.surahNumber}
          ayahNumber={activeModalCard.ayahNumber}
          surahNameTransliterated={activeModalCard.surahNameTransliterated}
          surahNameUrdu={activeModalCard.surahNameUrdu}
          fallbackArabic={activeModalCard.textArabic}
          fallbackUrdu={activeModalCard.tarjumaKanzulIman}
          fallbackEnglish={activeModalCard.tarjumaEnglish}
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

      {/* Tafteesh & Sanad Authenticity Verification Modal */}
      {activeSanadReport && (
        <SanadVerificationModal
          report={activeSanadReport}
          isOpen={!!activeSanadReport}
          onClose={() => setActiveSanadReport(null)}
        />
      )}
    </div>
  );
}
