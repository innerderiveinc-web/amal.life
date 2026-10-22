import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AmalTheme } from '@amal/ui';
import { Navigation } from '../components/Navigation';
import {
  QURAN_WISDOM_COLLECTION,
  QuranAyahWisdomCard,
  getAyahAudioUrl,
  getAyahUrduAudioUrl,
  getSurahTafseerAudioUrl,
} from '../lib/quran-wisdom-data';
import { AyahWisdomModal } from '../components/AyahWisdomModal';
import { showAmalToast } from '../components/Toast';

export default function QuranWisdomDedicatedPage() {
  const router = useRouter();
  const [selectedThemeFilter, setSelectedThemeFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [bookmarkedCardIds, setBookmarkedCardIds] = useState<string[]>([]);
  const [activeModalCard, setActiveModalCard] = useState<QuranAyahWisdomCard | null>(null);

  // Audio Playback State
  const [activeAudioKey, setActiveAudioKey] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [continuousIndex, setContinuousIndex] = useState<number | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  // Tafseer Studio Audio: Plays authentic Dawat-e-Islami Sirat-ul-Jinan / Kanz-ul-Iman
  const handlePlayTafseerAudio = (card: QuranAyahWisdomCard) => {
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
    const audioToPlay = tafseerUrl || getAyahUrduAudioUrl(card.surahNumber, card.ayahNumber);

    if (audioRef.current) {
      audioRef.current.src = audioToPlay;
      audioRef.current.play().then(() => {
        setActiveAudioKey(key);
        setIsPlayingAudio(true);
        showAmalToast(
          tafseerUrl
            ? `سورۃ ${card.surahNameUrdu}: دعوتِ اسلامی کی مستند تفسیری آڈیو (صراط الجنان / کنز الایمان) جاری ہے۔`
            : `سورۃ ${card.surahNameUrdu} (آیت ${card.ayahNumber}): مستند اردو ترجمہ (کنز الایمان) جاری ہے۔`,
          'info'
        );
      }).catch((err) => {
        console.warn('Tafseer remote error, falling back to Ayah Urdu audio:', err);
        // Fallback to high-speed EveryAyah Urdu recitation
        const fallbackUrl = getAyahUrduAudioUrl(card.surahNumber, card.ayahNumber);
        if (audioRef.current) {
          audioRef.current.src = fallbackUrl;
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
            <span style={{ color: '#0F172A', fontWeight: 700 }}>قرآنی حکمت و تدبر (Quran Wisdom Cards)</span>
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
            <span>مکمل قرآنِ کریم تلاوت و سورتیں (114 Surahs) ➔</span>
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
                قرآنی حکمت، تدبر و عمل (Quran Wisdom Cards)
              </h1>
              <p style={{ fontSize: 14, color: '#E2E8F0', lineHeight: 1.6, margin: 0 }}>
                جزء عم (Juz &apos;Amma) کی ۴۲ منتخب آیات مبارکہ، <strong>کنز الایمان</strong> فی ترجمۃ القرآن،
                اور <strong>خزائن العرفان</strong> کی تفسیری حکمت کے ساتھ روزمرہ زندگی کے لیے عملی رہنمائی۔
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
                  ? `جاری ہے (${continuousIndex + 1}/${QURAN_WISDOM_COLLECTION.length}) — موقوف کریں`
                  : 'تمام ۴۲ آیات کا ترجمہ ایک ساتھ سنیں'}
              </span>
            </button>
          </div>
        </header>

        {/* Search & Thematic Filter Ribbon */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
          {/* Search Box */}
          <div style={{ flex: '1 1 280px', maxWidth: 400 }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="آیت، سورت یا ترجمہ تلاش کریں..."
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

          {/* Theme Filters */}
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
        </div>

        {/* Wisdom Cards Grid */}
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

                    <button
                      type="button"
                      onClick={() => handleToggleBookmark(cardKey)}
                      style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 18 }}
                      title={isBookmarked ? 'محفوظ فہرست سے ہٹائیں' : 'پسندیدہ کارڈ محفوظ کریں'}
                    >
                      {isBookmarked ? '⭐' : '☆'}
                    </button>
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
    </div>
  );
}
