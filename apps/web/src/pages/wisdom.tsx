import React, { useState, useRef, useEffect, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AmalTheme } from '@amal/ui';
import { Navigation } from '../components/Navigation';
import { useLanguage } from '../context/LanguageContext';
import {
  QURAN_WISDOM_COLLECTION,
  QuranAyahWisdomCard,
  getAyahAudioUrl,
  getAyahUrduAudioUrl,
  getSurahTafseerAudioUrl,
} from '../lib/quran-wisdom-data';
import { CLASSICAL_BOOKS_CHAPTERS } from '../lib/classical-chapters-data';
import { AyahWisdomModal } from '../components/AyahWisdomModal';
import { showAmalToast } from '../components/Toast';
import { UniversalContentShareModal, UniversalCardPayload } from '../components/cards/UniversalContentShareModal';

export type WisdomCategory = 'QURAN' | 'HADITH' | 'SHAMAIL' | 'TASAWWUF' | 'FIQH' | 'DUA';

interface ClassicalWisdomItem {
  id: string;
  category: 'HADITH' | 'SHAMAIL' | 'TASAWWUF' | 'FIQH' | 'DUA';
  categoryUrdu: string;
  sourceWork: string;
  chapterTitleArabic: string;
  chapterTitleUrdu: string;
  arabicMatn: string;
  urduTranslation: string;
  englishSynopsis?: string;
  scholarlyNotes?: string;
}

export default function QuranWisdomDedicatedPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<WisdomCategory>('QURAN');
  const [selectedThemeFilter, setSelectedThemeFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [bookmarkedCardIds, setBookmarkedCardIds] = useState<string[]>([]);
  const [activeModalCard, setActiveModalCard] = useState<QuranAyahWisdomCard | null>(null);
  const [sharePayload, setSharePayload] = useState<UniversalCardPayload | null>(null);
  const { isUrdu } = useLanguage();

  // Sync category from URL query (?category=hadith, etc.)
  useEffect(() => {
    if (router.query.category) {
      const cat = String(router.query.category).toUpperCase();
      if (['QURAN', 'HADITH', 'SHAMAIL', 'TASAWWUF', 'FIQH', 'DUA'].includes(cat)) {
        setSelectedCategory(cat as WisdomCategory);
      }
    }
  }, [router.query.category]);

  // Audio Playback State
  const [activeAudioKey, setActiveAudioKey] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [continuousIndex, setContinuousIndex] = useState<number | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const watchdogRef = useRef<NodeJS.Timeout | null>(null);

  // Clear watchdog on unmount
  useEffect(() => {
    return () => {
      if (watchdogRef.current) {
        clearTimeout(watchdogRef.current);
        watchdogRef.current = null;
      }
    };
  }, []);

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
      const next = prev.includes(cardKey) ? prev.filter((id) => id !== cardKey) : [...prev, cardKey];
      if (typeof window !== 'undefined') {
        localStorage.setItem('amal_quran_wisdom_bookmarks', JSON.stringify(next));
      }
      showAmalToast(prev.includes(cardKey) ? 'حکمت کارڈ محفوظ فہرست سے ہٹا دیا گیا۔' : '⭐ حکمت کارڈ محفوظ کر لیا گیا!', 'success');
      return next;
    });
  };

  // Play audio for an Ayah: plays authentic human voice audio
  const handlePlayAyahAudio = (card: QuranAyahWisdomCard, type: 'ARABIC' | 'URDU') => {
    if (watchdogRef.current) {
      clearTimeout(watchdogRef.current);
      watchdogRef.current = null;
    }

    const key = `${card.surahNumber}:${card.ayahNumber}:${type}`;
    if (activeAudioKey === key && isPlayingAudio) {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlayingAudio(false);
      }
      return;
    }

    const url = type === 'URDU'
      ? getAyahUrduAudioUrl(card.surahNumber, card.ayahNumber)
      : getAyahAudioUrl(card.surahNumber, card.ayahNumber, 'alafasy');

    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.play().then(() => {
        setActiveAudioKey(key);
        setIsPlayingAudio(true);
        showAmalToast(
          type === 'URDU'
            ? `سورۃ ${card.surahNameUrdu} (آیت ${card.ayahNumber}) کا مستند اردو ترجمہ (کنز الایمان) جاری ہے`
            : `سورۃ ${card.surahNameUrdu} (آیت ${card.ayahNumber}) کی عربی تلاوت جاری ہے`,
          'info'
        );
      }).catch((e) => {
        console.warn('Audio play error:', e);
        // Fallback to secondary CDN
        const fallbackUrl = `https://cdn.islamic.network/quran/audio/64/ur.khan/${card.ayahNumber}.mp3`;
        if (audioRef.current) {
          audioRef.current.src = fallbackUrl;
          audioRef.current.play().catch(() => {
            showAmalToast('آڈیو لوڈ کرنے میں عارضی تاخیر ہوئی۔ دوبارہ کوشش کریں۔', 'warning');
          });
        }
      });
    }
  };

  // Tafseer Studio Audio: Plays authentic Dawat-e-Islami Sirat-ul-Jinan with instant EveryAyah CDN fallback
  const handlePlayTafseerAudio = (card: QuranAyahWisdomCard) => {
    if (watchdogRef.current) {
      clearTimeout(watchdogRef.current);
      watchdogRef.current = null;
    }

    const key = `${card.surahNumber}:${card.ayahNumber}:TAFSEER`;
    if (activeAudioKey === key && isPlayingAudio) {
      if (audioRef.current) audioRef.current.pause();
      setActiveAudioKey(null);
      setIsPlayingAudio(false);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const tafseerUrl = getSurahTafseerAudioUrl(card.surahNumber);
    const fastAyahUrl = getAyahUrduAudioUrl(card.surahNumber, card.ayahNumber);
    const audioToPlay = tafseerUrl || fastAyahUrl;

    if (audioRef.current) {
      audioRef.current.src = audioToPlay;

      // 3.5s Watchdog: If remote studio file buffers too slowly due to ISP throttling, fall back to instant CDN audio
      watchdogRef.current = setTimeout(() => {
        if (audioRef.current && (audioRef.current.paused || audioRef.current.currentTime === 0)) {
          console.warn('Studio audio buffering slow, falling back to instant EveryAyah CDN audio');
          if (audioRef.current && audioRef.current.src !== fastAyahUrl) {
            audioRef.current.src = fastAyahUrl;
            audioRef.current.play().then(() => {
              setActiveAudioKey(key);
              setIsPlayingAudio(true);
              showAmalToast(`سورۃ ${card.surahNameUrdu} (آیت ${card.ayahNumber}): مستند اردو ترجمہ و تفسیری قرأت جاری ہے۔`, 'info');
            }).catch(() => {});
          }
        }
      }, 3500);

      audioRef.current.onplaying = () => {
        if (watchdogRef.current) {
          clearTimeout(watchdogRef.current);
          watchdogRef.current = null;
        }
      };

      audioRef.current.play().then(() => {
        setActiveAudioKey(key);
        setIsPlayingAudio(true);
        showAmalToast(
          tafseerUrl
            ? `سورۃ ${card.surahNameUrdu}: مستند تفسیری آڈیو (صراط الجنان / کنز الایمان) جاری ہے۔`
            : `سورۃ ${card.surahNameUrdu} (آیت ${card.ayahNumber}): مستند اردو ترجمہ (کنز الایمان) جاری ہے۔`,
          'info'
        );
      }).catch((err) => {
        if (watchdogRef.current) {
          clearTimeout(watchdogRef.current);
          watchdogRef.current = null;
        }
        console.warn('Tafseer remote error, falling back to Ayah Urdu audio:', err);
        if (audioRef.current) {
          audioRef.current.src = fastAyahUrl;
          audioRef.current.play().then(() => {
            setActiveAudioKey(key);
            setIsPlayingAudio(true);
            showAmalToast(`سورۃ ${card.surahNameUrdu} (آیت ${card.ayahNumber}): اردو تفسیری ترجمہ جاری ہے۔`, 'info');
          }).catch((fallbackErr) => {
            console.error('Final fallback error:', fallbackErr);
            showAmalToast('آڈیو لوڈ کرنے میں تاخیر ہوئی۔ دوبارہ کوشش کریں۔', 'warning');
            setActiveAudioKey(null);
            setIsPlayingAudio(false);
          });
        }
      });
    }
  };

  // Continuous Playback across all 42 Cards
  const handlePlayContinuousAll = (startIndex: number = 0) => {
    if (watchdogRef.current) {
      clearTimeout(watchdogRef.current);
      watchdogRef.current = null;
    }

    if (startIndex >= QURAN_WISDOM_COLLECTION.length) {
      setContinuousIndex(null);
      setActiveAudioKey(null);
      setIsPlayingAudio(false);
      showAmalToast('تمام ۴۲ آیات کی حکمت و ترجمہ مکمل ہو گیا۔', 'success');
      return;
    }

    const card = QURAN_WISDOM_COLLECTION[startIndex];
    if (!card) return;

    setContinuousIndex(startIndex);
    const url = getAyahUrduAudioUrl(card.surahNumber, card.ayahNumber);
    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.play().then(() => {
        setActiveAudioKey(`${card.surahNumber}:${card.ayahNumber}:URDU`);
        setIsPlayingAudio(true);
      }).catch((e) => {
        console.warn('Continuous play error:', e);
      });
    }
  };

  const handleAudioEnded = () => {
    if (watchdogRef.current) {
      clearTimeout(watchdogRef.current);
      watchdogRef.current = null;
    }

    if (continuousIndex !== null && continuousIndex < QURAN_WISDOM_COLLECTION.length - 1) {
      handlePlayContinuousAll(continuousIndex + 1);
    } else {
      setActiveAudioKey(null);
      setIsPlayingAudio(false);
      setContinuousIndex(null);
    }
  };

  // Filtered list
  const filteredCards = QURAN_WISDOM_COLLECTION.filter((c) => {
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

  // Curated Classical Wisdom Cards for Hadith, Shamail, Tasawwuf, Fiqh, Dua
  const classicalCards = useMemo(() => {
    const items: ClassicalWisdomItem[] = [];

    const categoryBookMap: Record<string, { workIds: string[]; label: string; cat: 'HADITH' | 'SHAMAIL' | 'TASAWWUF' | 'FIQH' | 'DUA' }> = {
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

      {/* Unconstrained Audio Element (Avoids mobile background suspension) */}
      <audio
        ref={audioRef}
        preload="auto"
        onEnded={handleAudioEnded}
        onError={() => {
          if (activeAudioKey && activeAudioKey.endsWith(':TAFSEER') && audioRef.current) {
            const parts = activeAudioKey.split(':');
            const surah = parseInt(parts[0] || '1', 10);
            const ayah = parseInt(parts[1] || '1', 10);
            const fallbackUrl = getAyahUrduAudioUrl(surah, ayah);
            if (audioRef.current.src !== fallbackUrl) {
              console.warn('Tafseer remote stream failed, falling back to EveryAyah CDN');
              audioRef.current.src = fallbackUrl;
              audioRef.current.play().then(() => {
                setIsPlayingAudio(true);
                showAmalToast('مستند اردو ترجمہ و تفسیری قرأت (کنز الایمان) جاری ہے۔', 'info');
              }).catch(() => {
                setIsPlayingAudio(false);
                setActiveAudioKey(null);
              });
              return;
            }
          }
          showAmalToast('آڈیو پلے بیک میں عارضی تعطل پیش آیا۔ دوبارہ کوشش کریں۔', 'warning');
          setIsPlayingAudio(false);
          setActiveAudioKey(null);
        }}
        style={{ position: 'fixed', bottom: -100, opacity: 0, pointerEvents: 'none' }}
      />

      <main style={{ maxWidth: 1140, margin: '0 auto', padding: '0 20px' }}>
        {/* Top Breadcrumb & Switcher to Pure Quran */}
        <div style={{ padding: '12px 0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#666' }}>
            <Link href="/" style={{ color: AmalTheme.colors.primary, textDecoration: 'none', fontWeight: 600 }}>Home</Link>
            <span>/</span>
            <span style={{ color: '#0F172A', fontWeight: 700 }}>
              {isUrdu ? 'قرآنی حکمت و تدبر' : 'Quran Wisdom & Classical Cards'}
            </span>
          </div>

          <Link
            href="/quran"
            style={{
              padding: '6px 14px',
              borderRadius: 8,
              backgroundColor: '#ECFDF5',
              border: '1px solid #86EFAC',
              color: '#065F46',
              textDecoration: 'none',
              fontSize: 12,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span>📖</span>
            <span>{isUrdu ? 'مکمل قرآنِ کریم (114 سورتیں) ➔' : 'Full Quran Reader (114 Surahs) ➔'}</span>
          </Link>
        </div>

        {/* Serene Hero Header */}
        <header
          style={{
            background: 'linear-gradient(135deg, #0F291E 0%, #1B4332 60%, #2D6A4F 100%)',
            borderRadius: 20,
            padding: '28px 32px',
            color: '#FFFFFF',
            marginBottom: 24,
            boxShadow: '0 10px 25px -5px rgba(15, 41, 30, 0.25)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ maxWidth: 680 }}>
              <div style={{ fontSize: 16, color: '#86EFAC', fontWeight: 700, marginBottom: 4 }}>
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </div>
              <h1 style={{ fontSize: 28, fontWeight: 900, margin: '4px 0 8px' }}>
                {isUrdu ? 'قرآنی حکمت، تدبر و عمل' : 'Sacred Knowledge & Wisdom Cards'}
              </h1>
              <p style={{ fontSize: 14, color: '#E2E8F0', lineHeight: 1.6, margin: 0 }}>
                {isUrdu
                  ? '۴۲ منتخب قرآنی آیات، مستند احادیث، شمائل اور فقہی معمولات روزمرہ زندگی کے لیے عملی رہنمائی کے ساتھ۔'
                  : 'Curated Quranic verses, authentic Ahadith, and classical Sunni guidance with English and Roman transliteration.'}
              </p>
            </div>

            {/* Play All Continuous Button */}
            <button
              type="button"
              onClick={() => {
                if (continuousIndex !== null) {
                  if (audioRef.current) audioRef.current.pause();
                  setContinuousIndex(null);
                  setIsPlayingAudio(false);
                } else {
                  handlePlayContinuousAll(0);
                }
              }}
              style={{
                padding: '10px 18px',
                borderRadius: 12,
                backgroundColor: continuousIndex !== null ? '#DC2626' : '#F59E0B',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 800,
                fontSize: 13,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
              }}
            >
              <span>{continuousIndex !== null ? '⏹' : '🎧'}</span>
              <span>
                {continuousIndex !== null
                  ? (isUrdu ? `جاری ہے (${continuousIndex + 1}/${QURAN_WISDOM_COLLECTION.length})` : `Playing (${continuousIndex + 1}/${QURAN_WISDOM_COLLECTION.length}) — Pause`)
                  : (isUrdu ? 'تمام آیات کی تلاوت سنیں' : 'Play All 42 Verses Consecutively')}
              </span>
            </button>
          </div>
        </header>

        {/* Category Switcher Tabs */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 6, marginBottom: 20 }}>
          {[
            { id: 'QURAN', labelEn: '📖 Quran Wisdom (42)', labelUr: '📖 قرآنی حکمت (42)' },
            { id: 'HADITH', labelEn: '📜 Hadith Cards (14)', labelUr: '📜 احادیثِ مبارکہ (14)' },
            { id: 'SHAMAIL', labelEn: '🌹 Prophetic Shama\'il (12)', labelUr: '🌹 شمائلِ مصطفیٰ ﷺ (12)' },
            { id: 'TASAWWUF', labelEn: '💎 Spiritual Wisdom (12)', labelUr: '💎 تزکیہ و تصوف (12)' },
            { id: 'FIQH', labelEn: '⚖️ Daily Fiqh Guidance (10)', labelUr: '⚖️ احکامِ فقہ (10)' },
            { id: 'DUA', labelEn: '🤲 Prophetic Duas (15)', labelUr: '🤲 ادعیہ و اذکار (15)' },
          ].map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id as WisdomCategory);
                  setSelectedThemeFilter('ALL');
                }}
                style={{
                  padding: '9px 16px',
                  borderRadius: 12,
                  fontSize: 13,
                  fontWeight: 800,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  border: '1.5px solid',
                  borderColor: isActive ? '#065F46' : '#E2E8F0',
                  backgroundColor: isActive ? '#065F46' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : '#334155',
                  boxShadow: isActive ? '0 2px 6px rgba(6,78,59,0.2)' : 'none',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span>{isUrdu ? cat.labelUr : cat.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Search & Thematic Filter Ribbon */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
          {/* Search Box */}
          <div style={{ flex: '1 1 280px', maxWidth: 400 }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="تلاش فرمائیں (عربی، اردو یا عنوان)..."
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 10,
                border: '1px solid #CBD5E1',
                fontSize: 13,
                outline: 'none',
                backgroundColor: '#FFFFFF',
              }}
            />
          </div>

          {/* Theme Filters (Only for Quran) */}
          {selectedCategory === 'QURAN' && (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {[
                { id: 'ALL', label: 'تمام آیات (All 42)' },
                { id: 'BOOKMARKED', label: `⭐ محفوظ (${bookmarkedCardIds.length})` },
                { id: 'IKHLAS', label: '✨ اخلاص و نیت' },
                { id: 'TAWAKKUL', label: '🛡️ توکل و صبر' },
                { id: 'SALAH', label: '🤲 نماز و مناجات' },
                { id: 'AKHLAQ', label: '🌱 اخلاق و حسنِ معاملہ' },
                { id: 'HUQUQ_UL_IBAD', label: '🤝 حقوق العباد' },
                { id: 'TIME_MANAGEMENT', label: '⏳ وقت کی قدر' },
              ].map((theme) => {
                const isActive = selectedThemeFilter === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedThemeFilter(theme.id)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 20,
                      fontSize: 12,
                      fontWeight: isActive ? 800 : 600,
                      border: '1px solid',
                      borderColor: isActive ? '#059669' : '#CBD5E1',
                      backgroundColor: isActive ? '#ECFDF5' : '#FFFFFF',
                      color: isActive ? '#065F46' : '#475569',
                      cursor: 'pointer',
                    }}
                  >
                    {theme.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Wisdom Cards Grid (Quran Mode) */}
        {selectedCategory === 'QURAN' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 18 }}>
          {filteredCards.map((card) => {
            const cardKey = `${card.surahNumber}:${card.ayahNumber}`;
            const isBookmarked = bookmarkedCardIds.includes(cardKey);
            const isPlayingArabic = activeAudioKey === `${cardKey}:ARABIC` && isPlayingAudio;
            const isPlayingUrdu = activeAudioKey === `${cardKey}:URDU` && isPlayingAudio;
            const isPlayingTafseer = activeAudioKey === `${cardKey}:TAFSEER` && isPlayingAudio;

            return (
              <div
                key={cardKey}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 16,
                  border: isBookmarked ? '1px solid #FCD34D' : '1px solid #E2E8F0',
                  padding: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}
              >
                <div>
                  {/* Card Top: Surah Name + Bookmark */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 12, fontWeight: 800, backgroundColor: '#DCFCE7', color: '#166534', padding: '2px 8px', borderRadius: 6 }}>
                        سورۃ {card.surahNameUrdu} ({card.ayahNumber})
                      </span>
                      <span style={{ fontSize: 11, color: '#64748B' }}>
                        {card.revelationType === 'MECCAN' ? 'مکی' : 'مدنی'}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <button
                        type="button"
                        onClick={() => {
                          setSharePayload({
                            category: 'QURAN',
                            titleUrdu: `سورۃ ${card.surahNameUrdu}`,
                            badgeContext: `آیت ${card.ayahNumber} (${card.revelationType === 'MECCAN' ? 'مکی' : 'مدنی'})`,
                            arabicText: card.textArabic,
                            primaryTextUrdu: card.tarjumaKanzulIman,
                            secondaryTextEnglish: card.tarjumaEnglish,
                            sourceCitation: `سورۃ ${card.surahNameUrdu} (${card.surahNumber}:${card.ayahNumber}) · کنز الایمان`,
                            tafseerInsightUrdu: card.tafseerKhazainUlIrfan ? `تفسیر خزائن العرفان: ${card.tafseerKhazainUlIrfan.excerptUrdu}` : undefined,
                          });
                        }}
                        style={{
                          padding: '3px 8px',
                          borderRadius: 6,
                          border: '1px solid #CBD5E1',
                          backgroundColor: '#F8FAFC',
                          fontSize: 11,
                          fontWeight: 700,
                          color: '#065F46',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                        }}
                        title="خوبصورت سوشل میڈیا کارڈ بنائیں"
                      >
                        <span>📸</span>
                        <span>کارڈ</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleToggleBookmark(cardKey)}
                        style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 18 }}
                        title={isBookmarked ? 'محفوظ فہرست سے ہٹائیں' : 'پسندیدہ کارڈ محفوظ کریں'}
                      >
                        {isBookmarked ? '⭐' : '☆'}
                      </button>
                    </div>
                  </div>

                  {/* Arabic Matn */}
                  <div
                    dir="rtl"
                    style={{
                      fontFamily: 'var(--font-arabic), "Amiri", serif',
                      fontSize: 22,
                      lineHeight: 1.8,
                      color: '#0F172A',
                      textAlign: 'right',
                      marginBottom: 12,
                      fontWeight: 600,
                    }}
                  >
                    {card.textArabic}
                  </div>

                  {/* Urdu Translation: Kanz-ul-Iman */}
                  <div
                    dir="rtl"
                    style={{
                      backgroundColor: '#F8FAFC',
                      padding: 12,
                      borderRadius: 10,
                      borderRight: '3px solid #059669',
                      marginBottom: 12,
                    }}
                  >
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#065F46', marginBottom: 2 }}>
                      ترجمہ کنز الایمان فی ترجمۃ القرآن:
                    </div>
                    <div style={{ fontSize: 13, lineHeight: 1.6, color: '#1E293B', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                      {card.tarjumaKanzulIman}
                    </div>
                  </div>

                  {/* Exegesis Excerpt: Khaza'in-ul-Irfan */}
                  <div
                    dir="rtl"
                    style={{
                      backgroundColor: '#FFFBEB',
                      padding: 12,
                      borderRadius: 10,
                      borderRight: '3px solid #D97706',
                      marginBottom: 16,
                    }}
                  >
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#92400E', marginBottom: 2 }}>
                      تفسیر خزائن العرفان (صدر الافاضل نعیم الدین مراد آبادی):
                    </div>
                    <div style={{ fontSize: 12, lineHeight: 1.6, color: '#78350F' }}>
                      {card.tafseerKhazainUlIrfan.excerptUrdu}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Buttons: Tilawat, Urdu Audio, Spoken Tafseer, Deep Study */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, borderTop: '1px solid #F1F5F9', paddingTop: 12 }}>
                  {/* Tilawat */}
                  <button
                    type="button"
                    onClick={() => handlePlayAyahAudio(card, 'ARABIC')}
                    style={{
                      padding: '8px 4px',
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: 700,
                      border: '1px solid #BBF7D0',
                      backgroundColor: isPlayingArabic ? '#065F46' : '#F0FDF4',
                      color: isPlayingArabic ? '#FFFFFF' : '#166534',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <span>{isPlayingArabic ? '⏸' : '▶'}</span>
                    <span>{isPlayingArabic ? 'جاری' : 'تلاوت'}</span>
                  </button>

                  {/* Urdu Translation */}
                  <button
                    type="button"
                    onClick={() => handlePlayAyahAudio(card, 'URDU')}
                    style={{
                      padding: '8px 4px',
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: 700,
                      border: '1px solid #BAE6FD',
                      backgroundColor: isPlayingUrdu ? '#0284C7' : '#F0F9FF',
                      color: isPlayingUrdu ? '#FFFFFF' : '#0369A1',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <span>{isPlayingUrdu ? '⏸' : '🎙️'}</span>
                    <span>{isPlayingUrdu ? 'ترجمہ جاری' : 'اردو ترجمہ'}</span>
                  </button>

                  {/* Tafseer Spoken Audio */}
                  <button
                    type="button"
                    onClick={() => handlePlayTafseerAudio(card)}
                    style={{
                      padding: '8px 4px',
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: 700,
                      border: '1px solid #FDE68A',
                      backgroundColor: isPlayingTafseer ? '#92400E' : '#FFFBEB',
                      color: isPlayingTafseer ? '#FFFFFF' : '#92400E',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <span>{isPlayingTafseer ? '⏹' : '📖'}</span>
                    <span>{isPlayingTafseer ? 'تفسیر جاری' : 'تفسیر آڈیو'}</span>
                  </button>

                  {/* Deep Study Modal */}
                  <button
                    type="button"
                    onClick={() => setActiveModalCard(card)}
                    style={{
                      padding: '8px 4px',
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: 700,
                      border: '1px solid #CBD5E1',
                      backgroundColor: '#F8FAFC',
                      color: '#334155',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <span>🔍</span>
                    <span>تفصیل و تدبر</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        )}

        {/* Classical Wisdom Cards Grid (Hadith, Shamail, Tasawwuf, Fiqh, Dua) */}
        {selectedCategory !== 'QURAN' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 18 }}>
            {filteredClassicalCards.map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 16,
                  border: '1px solid #E2E8F0',
                  padding: 22,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}
              >
                <div>
                  {/* Card Header: Category & Source */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, backgroundColor: '#ECFDF5', color: '#065F46', padding: '3px 10px', borderRadius: 8, border: '1px solid #A7F3D0' }}>
                      {item.categoryUrdu} · {item.sourceWork}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setSharePayload({
                          category: item.category,
                          titleUrdu: item.chapterTitleUrdu,
                          badgeContext: item.sourceWork,
                          arabicText: item.arabicMatn.split('\n')[0]?.slice(0, 320) || item.arabicMatn.slice(0, 320),
                          primaryTextUrdu: item.urduTranslation.split('\n')[0]?.slice(0, 360) || item.urduTranslation.slice(0, 360),
                          secondaryTextEnglish: item.englishSynopsis ? item.englishSynopsis.slice(0, 240) : undefined,
                          sourceCitation: `${item.sourceWork} · مصدقہ علمی سند`,
                          tafseerInsightUrdu: item.scholarlyNotes ? item.scholarlyNotes.slice(0, 260) : undefined,
                        });
                      }}
                      style={{
                        padding: '4px 10px',
                        borderRadius: 6,
                        border: '1px solid #059669',
                        backgroundColor: '#F0FDF4',
                        color: '#065F46',
                        fontSize: 11,
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                      title="اس کا خوبصورت سوشل میڈیا امیج کارڈ بنائیں"
                    >
                      <span>📸</span>
                      <span>امیج کارڈ بنائیں</span>
                    </button>
                  </div>

                  {/* Title */}
                  <h3 style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 800, color: '#0F172A', direction: 'rtl', textAlign: 'right' }}>
                    {item.chapterTitleUrdu}
                  </h3>

                  {/* Arabic Matn */}
                  <div
                    dir="rtl"
                    style={{
                      fontFamily: 'var(--font-arabic), "Amiri", serif',
                      fontSize: 19,
                      lineHeight: 1.8,
                      color: '#064E3B',
                      textAlign: 'right',
                      backgroundColor: '#F8FAFC',
                      padding: '14px 16px',
                      borderRadius: 10,
                      marginBottom: 14,
                      fontWeight: 600,
                    }}
                  >
                    {item.arabicMatn.split('\n')[0]?.slice(0, 350) || item.arabicMatn.slice(0, 350)}
                  </div>

                  {/* Urdu Translation */}
                  <div
                    dir="rtl"
                    style={{
                      fontFamily: 'var(--font-urdu), serif',
                      fontSize: 15,
                      lineHeight: 2.1,
                      color: '#1E293B',
                      textAlign: 'right',
                      borderRight: '3px solid #059669',
                      paddingRight: 10,
                      marginBottom: 12,
                    }}
                  >
                    {item.urduTranslation.split('\n')[0]?.slice(0, 380) || item.urduTranslation.slice(0, 380)}
                  </div>

                  {/* English synopsis */}
                  {item.englishSynopsis && (
                    <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.5, marginBottom: 12, fontStyle: 'italic' }}>
                      &ldquo;{item.englishSynopsis.slice(0, 200)}...&rdquo;
                    </div>
                  )}

                  {/* Scholarly note */}
                  {item.scholarlyNotes && (
                    <div style={{ fontSize: 12, color: '#92400E', backgroundColor: '#FEF3C7', padding: '8px 12px', borderRadius: 8, lineHeight: 1.5 }}>
                      💡 <strong>علمی نکتہ:</strong> {item.scholarlyNotes.slice(0, 180)}...
                    </div>
                  )}
                </div>

                {/* Card Bottom Actions */}
                <div style={{ display: 'flex', gap: 8, marginTop: 16, paddingTop: 12, borderTop: '1px solid #F1F5F9' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setSharePayload({
                        category: item.category,
                        titleUrdu: item.chapterTitleUrdu,
                        badgeContext: item.sourceWork,
                        arabicText: item.arabicMatn.split('\n')[0]?.slice(0, 320) || item.arabicMatn.slice(0, 320),
                        primaryTextUrdu: item.urduTranslation.split('\n')[0]?.slice(0, 360) || item.urduTranslation.slice(0, 360),
                        secondaryTextEnglish: item.englishSynopsis ? item.englishSynopsis.slice(0, 240) : undefined,
                        sourceCitation: `${item.sourceWork} · مصدقہ علمی سند`,
                        tafseerInsightUrdu: item.scholarlyNotes ? item.scholarlyNotes.slice(0, 260) : undefined,
                      });
                    }}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: 8,
                      backgroundColor: '#065F46',
                      color: '#FFFFFF',
                      border: 'none',
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                    }}
                  >
                    <span>📸</span>
                    <span>امیج کارڈ بنائیں</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const text = encodeURIComponent(
                        `✨ *${item.chapterTitleUrdu}*\n\n` +
                        `*${item.arabicMatn.split('\n')[0] || ''}*\n\n` +
                        `*ترجمہ:*\n${item.urduTranslation.split('\n')[0] || ''}\n\n` +
                        `📖 *ماخذ:* ${item.sourceWork}\n` +
                        `_AMAL OS (amal.life)_`
                      );
                      window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
                    }}
                    style={{
                      padding: '8px 14px',
                      borderRadius: 8,
                      backgroundColor: '#25D366',
                      color: '#FFFFFF',
                      border: 'none',
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                    title="واٹس ایپ پر شیئر کریں"
                  >
                    <span>💬</span>
                  </button>

                  <button
                    type="button"
                    onClick={async () => {
                      const text =
                        `✨ ${item.chapterTitleUrdu}\n\n` +
                        `${item.arabicMatn.split('\n')[0] || ''}\n\n` +
                        `${item.urduTranslation.split('\n')[0] || ''}\n\n` +
                        `ماخذ: ${item.sourceWork} — AMAL OS`;
                      await navigator.clipboard.writeText(text);
                      showAmalToast('متن و حوالہ کاپی کر لیا گیا!', 'success');
                    }}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 8,
                      backgroundColor: '#F8FAFC',
                      color: '#475569',
                      border: '1px solid #CBD5E1',
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                    title="متن کاپی کریں"
                  >
                    📋
                  </button>
                </div>
              </div>
            ))}
          </div>
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
    </div>
  );
}
