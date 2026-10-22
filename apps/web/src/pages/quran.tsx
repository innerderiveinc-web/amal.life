import React, { useState, useEffect, useMemo, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Navigation } from '../components/Navigation';
import { AmalTheme } from '@amal/ui';
import { QURAN_SURAHS_COLLECTION, QuranSurahData } from '../lib/quran-surahs-data';
import { ALL_114_SURAHS, QuranSurahMeta } from '../lib/quran-114-directory';
import { QURAN_WISDOM_COLLECTION, QuranAyahWisdomCard, getAyahWisdomCard, getAyahAudioUrl } from '../lib/quran-wisdom-data';
import { getAyahRomanTransliteration, getAyahRomanUrduTarjuma } from '../lib/quran-roman-urdu';
import { AyahWisdomModal } from '../components/AyahWisdomModal';

type ExperienceMode = 'QUICK_2MIN' | 'DAILY_5MIN' | 'DEEP_15MIN';

export default function QuranWisdomPage() {
  const router = useRouter();
  const [activeMode, setActiveMode] = useState<ExperienceMode>('QUICK_2MIN');
  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number>(1);
  const [surahSearchFilter, setSurahSearchFilter] = useState<string>('');
  const [selectedQari, setSelectedQari] = useState<'alafasy' | 'husary'>('alafasy');
  const [revelationFilter, setRevelationFilter] = useState<'ALL' | 'MECCAN' | 'MEDINAN'>('ALL');
  const [fontSize, setFontSize] = useState<number>(24);
  const [showRomanUrdu, setShowRomanUrdu] = useState<boolean>(true);

  // Reader & Wisdom Modal State
  const [activeWisdomAyah, setActiveWisdomAyah] = useState<{ surahNumber: number; ayahNumber: number } | null>(null);

  // Audio Playback State for In-App Reader
  const [playingAyahNumber, setPlayingAyahNumber] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Surahs in-memory cache
  const [loadedSurahsCache, setLoadedSurahsCache] = useState<Record<number, QuranSurahData>>(() => {
    const initial: Record<number, QuranSurahData> = {};
    for (const s of QURAN_SURAHS_COLLECTION) {
      initial[s.surahNumber] = s;
    }
    return initial;
  });
  const [isLoadingSurah, setIsLoadingSurah] = useState<boolean>(false);
  const [surahFetchError, setSurahFetchError] = useState<string | null>(null);

  // Surah selector on URL query or click
  useEffect(() => {
    if (router.query.surah) {
      const s = parseInt(router.query.surah as string, 10);
      if (!isNaN(s) && s >= 1 && s <= 114) {
        handleSelectSurah(s);
      }
    }
  }, [router.query.surah]);

  const handleSelectSurah = async (surahNum: number) => {
    setSelectedSurahNumber(surahNum);
    setSurahFetchError(null);
    setPlayingAyahNumber(null);

    const meta = ALL_114_SURAHS.find((s) => s.number === surahNum);
    if (loadedSurahsCache[surahNum] && meta && loadedSurahsCache[surahNum].verses.length >= meta.ayahsCount) {
      return;
    }

    setIsLoadingSurah(true);
    try {
      const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahNum}/editions/quran-uthmani,ur.kanzuliman,en.sahih`);
      if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
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
          revelationType: (meta?.revelationType || (uthmani.revelationType === 'Meccan' ? 'MECCAN' : 'MEDINAN')) as any,
          ayahsCount: meta?.ayahsCount || uthmani.numberOfAyahs,
          verses,
        };

        setLoadedSurahsCache((prev) => ({ ...prev, [surahNum]: newSurah }));
      }
    } catch (err: any) {
      console.warn('Surah online load failed, fallback:', err);
      setSurahFetchError('انٹرنیٹ کے بغیر نئی سورت لوڈ نہیں ہو سکی۔ بنیادی سورتیں (فاتحہ، یاسین، ملک، اخلاص، فلق، ناس) بغیر انٹرنیٹ کے دستیاب ہیں۔');
    } finally {
      setIsLoadingSurah(false);
    }
  };

  const currentSurah = loadedSurahsCache[selectedSurahNumber] || loadedSurahsCache[1]!;
  const currentSurahMeta = ALL_114_SURAHS.find((s) => s.number === selectedSurahNumber) || ALL_114_SURAHS[0]!;

  // Filtered Surahs List
  const filteredSurahs = useMemo(() => {
    return ALL_114_SURAHS.filter((s) => {
      if (revelationFilter !== 'ALL' && s.revelationType !== revelationFilter) return false;
      if (!surahSearchFilter.trim()) return true;
      const q = surahSearchFilter.toLowerCase().trim();
      return (
        s.number.toString() === q ||
        s.nameArabic.includes(q) ||
        s.nameUrdu.includes(q) ||
        s.nameTransliterated.toLowerCase().includes(q) ||
        s.nameEnglish.toLowerCase().includes(q)
      );
    });
  }, [surahSearchFilter, revelationFilter]);

  // Beloved Surah Quick Jump Shortcuts
  const belovedShortcuts = [
    { num: 1, label: 'الفاتحة' },
    { num: 18, label: 'الكهف' },
    { num: 36, label: 'يس' },
    { num: 55, label: 'الرحمن' },
    { num: 56, label: 'الواقعة' },
    { num: 67, label: 'الملك' },
    { num: 103, label: 'العصر' },
    { num: 107, label: 'الماعون' },
    { num: 112, label: 'الإخلاص' },
    { num: 113, label: 'الفلق' },
    { num: 114, label: 'الناس' },
  ];

  const handlePlayAyahAudio = (ayahNum: number) => {
    if (playingAyahNumber === ayahNum) {
      if (audioRef.current) {
        if (audioRef.current.paused) {
          audioRef.current.play();
        } else {
          audioRef.current.pause();
          setPlayingAyahNumber(null);
        }
      }
      return;
    }

    setPlayingAyahNumber(ayahNum);
    const url = getAyahAudioUrl(selectedSurahNumber, ayahNum, selectedQari);
    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.play().catch((e) => console.warn('Audio play prevented:', e));
    }
  };

  const handleAyahAudioEnded = () => {
    if (playingAyahNumber !== null && currentSurah && playingAyahNumber < currentSurah.verses.length) {
      // Auto-advance to next Ayah
      handlePlayAyahAudio(playingAyahNumber + 1);
    } else {
      setPlayingAyahNumber(null);
    }
  };

  return (
    <div style={{ backgroundColor: '#F8FAF9', minHeight: '100vh', paddingBottom: 100 }}>
      <Head>
        <title>Al-Quran Al-Kareem & Wisdom (قرآنِ کریم، حکمت و تدبر) | AMAL OS</title>
        <meta
          name="description"
          content="AMAL Quran Wisdom & Listening Experience with Kanz-ul-Iman Tarjuma, Khaza'in-ul-Irfan Tafsir, 100% Real Human Voice Recitation, and 2-Minute Quick Wisdom."
        />
      </Head>

      <Navigation />

      {/* Hidden Audio Element for continuous Tilawat playback */}
      <audio ref={audioRef} onEnded={handleAyahAudioEnded} style={{ display: 'none' }} />

      <main style={{ maxWidth: 1140, margin: '0 auto', padding: '0 20px' }}>
        {/* Breadcrumb Bar */}
        <div style={{ padding: '12px 0 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#666' }}>
            <Link href="/" style={{ color: AmalTheme.colors.primary, textDecoration: 'none', fontWeight: 600 }}>Home</Link>
            <span>/</span>
            <span style={{ color: '#0F172A', fontWeight: 700 }}>Al-Quran Al-Kareem &amp; Quran Wisdom (قرآنِ کریم، حکمت و تدبر)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 12, backgroundColor: '#DCFCE7', color: '#166534', fontWeight: 800 }}>
              ✓ 100% Real Human Voice Recitation
            </span>
            <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 12, backgroundColor: '#FEF3C7', color: '#92400E', fontWeight: 800 }}>
              کنز الایمان فی ترجمۃ القرآن
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <header
          style={{
            background: 'linear-gradient(135deg, #0F291E 0%, #1B4332 60%, #2D6A4F 100%)',
            borderRadius: 20,
            padding: '32px 36px',
            color: '#FFFFFF',
            marginBottom: 24,
            boxShadow: '0 10px 25px -5px rgba(15, 41, 30, 0.25)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20, position: 'relative', zIndex: 1 }}>
            <div style={{ maxWidth: 720 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: 1.2,
                    textTransform: 'uppercase',
                    color: '#6EE7B7',
                    backgroundColor: 'rgba(110, 231, 183, 0.15)',
                    padding: '4px 12px',
                    borderRadius: 14,
                    border: '1px solid rgba(110, 231, 183, 0.3)',
                  }}
                >
                  THE SACRED WORD OF ALLAH · کلامِ الٰہی
                </span>
                <span style={{ color: '#A7F3D0', fontSize: 12 }}>•</span>
                <span style={{ color: '#D1FAE5', fontSize: 12, fontWeight: 700 }}>
                  Ahl al-Sunnah Verified Standards
                </span>
              </div>

              <h1 style={{ fontSize: 32, fontWeight: 900, margin: '6px 0 12px', letterSpacing: -0.5 }}>
                قرآنِ کریم، حکمت و تدبر
              </h1>
              <p style={{ fontSize: 15, color: '#E2E8F0', lineHeight: 1.6, margin: '0 0 18px', maxWidth: 660 }}>
                صحیح مدینہ عثمانی اعراب کے ساتھ تلاوت، <strong>کنز الایمان</strong> (اعلیٰ حضرت امام احمد رضا خان)،
                اور <strong>خزائن العرفان</strong> (صدر الافاضل نعیم الدین مراد آبادی) کی تفسیری حکمت کے ساتھ روزمرہ دینی زندگی کا روحانی سفر۔
              </p>

              {/* Time-Mode Selectors */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                <button
                  onClick={() => setActiveMode('QUICK_2MIN')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 800,
                    cursor: 'pointer',
                    border: activeMode === 'QUICK_2MIN' ? '2px solid #34D399' : '1px solid rgba(255, 255, 255, 0.2)',
                    backgroundColor: activeMode === 'QUICK_2MIN' ? '#34D399' : 'rgba(255, 255, 255, 0.1)',
                    color: activeMode === 'QUICK_2MIN' ? '#064E3B' : '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span>⚡</span>
                  <span>Quick Wisdom (2 min)</span>
                  <span style={{ fontSize: 10, opacity: 0.85, fontWeight: 600 }}>— منتخب حکمت و عمل</span>
                </button>

                <button
                  onClick={() => setActiveMode('DAILY_5MIN')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 800,
                    cursor: 'pointer',
                    border: activeMode === 'DAILY_5MIN' ? '2px solid #34D399' : '1px solid rgba(255, 255, 255, 0.2)',
                    backgroundColor: activeMode === 'DAILY_5MIN' ? '#34D399' : 'rgba(255, 255, 255, 0.1)',
                    color: activeMode === 'DAILY_5MIN' ? '#064E3B' : '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span>🌅</span>
                  <span>Daily Tilawat &amp; Tarjuma (5 min)</span>
                  <span style={{ fontSize: 10, opacity: 0.85, fontWeight: 600 }}>— سورت و ترجمہ</span>
                </button>

                <button
                  onClick={() => setActiveMode('DEEP_15MIN')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 800,
                    cursor: 'pointer',
                    border: activeMode === 'DEEP_15MIN' ? '2px solid #34D399' : '1px solid rgba(255, 255, 255, 0.2)',
                    backgroundColor: activeMode === 'DEEP_15MIN' ? '#34D399' : 'rgba(255, 255, 255, 0.1)',
                    color: activeMode === 'DEEP_15MIN' ? '#064E3B' : '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span>📖</span>
                  <span>Deep Tafseer &amp; Evidence (15 min)</span>
                  <span style={{ fontSize: 10, opacity: 0.85, fontWeight: 600 }}>— تفصیلی خزائن العرفان</span>
                </button>
              </div>
            </div>

            {/* Right Card / Scholar Badges */}
            <div
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                borderRadius: 14,
                padding: '16px 20px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                minWidth: 260,
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, color: '#A7F3D0', marginBottom: 10, textTransform: 'uppercase' }}>
                معتبر علمی اسناد (Canon Evidence)
              </div>
              <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: 12, color: '#E2E8F0', lineHeight: 1.8 }}>
                <li><strong>ترجمہ:</strong> کنز الایمان فی ترجمۃ القرآن (۱۳۴۰ھ)</li>
                <li><strong>تفسیر:</strong> خزائن العرفان (مولانا نعیم الدین مراد آبادی)</li>
                <li><strong>انگریزی:</strong> دار العلوم امجدیہ (۱۹۸۸) / مکتبۃ المدینہ (۲۰۲۳)</li>
                <li><strong>تلاوت:</strong> شیخ مشاری راشد / شیخ محمود خلیل الحصری</li>
              </ul>
            </div>
          </div>
        </header>

        {/* SECTION 1: FEATURED 2-MINUTE QUICK WISDOM CARDS */}
        {activeMode === 'QUICK_2MIN' && (
          <section style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  ⚡ Quick Wisdom (2-Min Daily Divine Reflection)
                </h2>
                <p style={{ fontSize: 13, color: '#64748B', margin: '4px 0 0' }}>
                  منتخب آیات، کنز الایمان کا ترجمہ، خزائن العرفان کی حکمت، مستند قاری کی آواز اور عملی زندگی کے لیے مسنون عمل
                </p>
              </div>
              <span style={{ fontSize: 12, color: '#059669', fontWeight: 700, backgroundColor: '#DCFCE7', padding: '4px 10px', borderRadius: 8 }}>
                {QURAN_WISDOM_COLLECTION.length} حکمت کارڈز دستیاب
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 16 }}>
              {QURAN_WISDOM_COLLECTION.map((card) => {
                const isPlayingThis = playingAyahNumber === card.ayahNumber && selectedSurahNumber === card.surahNumber;

                return (
                  <div
                    key={`${card.surahNumber}-${card.ayahNumber}`}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 16,
                      border: '1px solid #E2E8F0',
                      padding: 20,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                      transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                    }}
                  >
                    <div>
                      {/* Card Header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 800,
                            padding: '3px 8px',
                            borderRadius: 6,
                            backgroundColor: '#F0FDF4',
                            color: '#166534',
                            border: '1px solid #BBF7D0',
                          }}
                        >
                          {card.surahNameTransliterated} ({card.surahNameUrdu}) · آیت {card.ayahNumber}
                        </span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#854D0E', backgroundColor: '#FEF9C3', padding: '2px 8px', borderRadius: 6 }}>
                          موضوع: {card.tadabburPrompt.theme}
                        </span>
                      </div>

                      {/* Arabic Verse */}
                      <div
                        dir="rtl"
                        style={{
                          fontFamily: 'var(--font-arabic), "Amiri", serif',
                          fontSize: 22,
                          lineHeight: 2.2,
                          color: '#1E293B',
                          textAlign: 'right',
                          marginBottom: 10,
                          backgroundColor: '#F8FAFC',
                          padding: 12,
                          borderRadius: 8,
                          border: '1px solid #F1F5F9',
                        }}
                      >
                        {card.textArabic}{' '}
                        <span style={{ fontSize: 16, color: '#059669' }}>﴿{card.ayahNumber}﴾</span>
                      </div>

                      {/* Kanz-ul-Iman Tarjuma */}
                      <div style={{ marginBottom: 10 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: '#047857', marginBottom: 2 }}>
                          کنز الایمان (اعلیٰ حضرت):
                        </div>
                        <div dir="rtl" style={{ fontFamily: 'var(--font-urdu), serif', fontSize: 16, lineHeight: 2.1, color: '#0F172A', textAlign: 'right' }}>
                          {card.tarjumaKanzulIman}
                        </div>
                      </div>

                      {/* Roman Urdu Transliteration & Tarjuma */}
                      <div style={{ backgroundColor: '#F0F9FF', borderRadius: 8, padding: 10, border: '1px solid #BAE6FD', marginBottom: 12 }}>
                        <div style={{ fontSize: 10, fontWeight: 800, color: '#0369A1', textTransform: 'uppercase', marginBottom: 2 }}>
                          🔤 Roman Transliteration (تلفظ):
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#0C4A6E', marginBottom: 6 }}>
                          {getAyahRomanTransliteration(card.surahNumber, card.ayahNumber, card.textArabic)}
                        </div>
                        <div style={{ fontSize: 10, fontWeight: 800, color: '#047857', textTransform: 'uppercase', marginBottom: 2 }}>
                          📖 Roman Urdu Tarjuma (Kanz-ul-Iman):
                        </div>
                        <div style={{ fontSize: 13, color: '#064E3B', fontWeight: 600 }}>
                          {getAyahRomanUrduTarjuma(card.surahNumber, card.ayahNumber, card.tarjumaKanzulIman)}
                        </div>
                      </div>

                      {/* Khaza'in-ul-Irfan Insight Summary */}
                      <div style={{ backgroundColor: '#FFFBEB', borderRadius: 8, padding: 10, border: '1px solid #FDE68A', marginBottom: 14 }}>
                        <div style={{ fontSize: 11, fontWeight: 800, color: '#92400E', marginBottom: 4 }}>
                          خزائن العرفان (صدر الافاضل):
                        </div>
                        <div dir="rtl" style={{ fontFamily: 'var(--font-urdu), serif', fontSize: 14, lineHeight: 2.0, color: '#78350F', textAlign: 'right' }}>
                          {card.tafseerKhazainUlIrfan.excerptUrdu.length > 180
                            ? card.tafseerKhazainUlIrfan.excerptUrdu.slice(0, 180) + '...'
                            : card.tafseerKhazainUlIrfan.excerptUrdu}
                        </div>
                      </div>
                    </div>

                    {/* Actions: Listen Audio & Open Full Wisdom Card */}
                    <div style={{ display: 'flex', gap: 8, paddingTop: 10, borderTop: '1px solid #F1F5F9' }}>
                      <button
                        onClick={() => {
                          setSelectedSurahNumber(card.surahNumber);
                          handlePlayAyahAudio(card.ayahNumber);
                        }}
                        style={{
                          flex: 1,
                          padding: '8px 12px',
                          borderRadius: 8,
                          backgroundColor: isPlayingThis ? '#DCFCE7' : '#F0FDF4',
                          border: '1px solid #86EFAC',
                          color: '#166534',
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 6,
                        }}
                      >
                        <span>{isPlayingThis ? '⏸ وقفہ' : '▶ سنیں (آڈیو)'}</span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveWisdomAyah({ surahNumber: card.surahNumber, ayahNumber: card.ayahNumber });
                        }}
                        style={{
                          flex: 1.3,
                          padding: '8px 12px',
                          borderRadius: 8,
                          backgroundColor: '#1B4332',
                          border: 'none',
                          color: '#FFFFFF',
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 6,
                        }}
                      >
                        <span>📖</span>
                        <span>تفسیری سند و عمل ➔</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* SECTION 2 & 3: SURAHS DIRECTORY & IN-APP READER */}
        <section style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 24, alignItems: 'start' }}>
          {/* LEFT: 114 Surahs Directory Sidebar */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              border: '1px solid #E2E8F0',
              padding: 16,
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', marginBottom: 4 }}>
                سورتوں کی فہرست (114 Surahs)
              </div>
              <div style={{ fontSize: 11, color: '#64748B' }}>
                کسی بھی سورت کو منتخب کر کے تلاوت و ترجمہ سماعت فرمائیں
              </div>
            </div>

            {/* Quick Search */}
            <input
              type="text"
              value={surahSearchFilter}
              onChange={(e) => setSurahSearchFilter(e.target.value)}
              placeholder="سورت کا نام یا نمبر تلاش کریں..."
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid #CBD5E1',
                fontSize: 12,
                marginBottom: 10,
                outline: 'none',
              }}
            />

            {/* Filter Pills */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
              {(['ALL', 'MECCAN', 'MEDINAN'] as const).map((rf) => (
                <button
                  key={rf}
                  onClick={() => setRevelationFilter(rf)}
                  style={{
                    flex: 1,
                    padding: '4px 6px',
                    borderRadius: 6,
                    fontSize: 10,
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: revelationFilter === rf ? '#1B4332' : '#F1F5F9',
                    color: revelationFilter === rf ? '#FFFFFF' : '#475569',
                  }}
                >
                  {rf === 'ALL' ? 'سب سورتیں' : rf === 'MECCAN' ? 'مکی (86)' : 'مدنی (28)'}
                </button>
              ))}
            </div>

            {/* Beloved Shortcuts Carousel */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', marginBottom: 6 }}>
                بکثرت پڑھی جانے والی سورتیں
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {belovedShortcuts.map((sc) => (
                  <button
                    key={sc.num}
                    onClick={() => handleSelectSurah(sc.num)}
                    style={{
                      padding: '3px 8px',
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: selectedSurahNumber === sc.num ? '1px solid #059669' : '1px solid #E2E8F0',
                      backgroundColor: selectedSurahNumber === sc.num ? '#ECFDF5' : '#F8FAFC',
                      color: selectedSurahNumber === sc.num ? '#065F46' : '#334155',
                    }}
                  >
                    {sc.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Surah List */}
            <div style={{ maxHeight: '60vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {filteredSurahs.map((meta) => {
                const isSelected = selectedSurahNumber === meta.number;
                return (
                  <button
                    key={meta.number}
                    onClick={() => handleSelectSurah(meta.number)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 10px',
                      borderRadius: 8,
                      border: isSelected ? '1px solid #86EFAC' : '1px solid transparent',
                      backgroundColor: isSelected ? '#F0FDF4' : 'transparent',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background-color 0.1s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: '50%',
                          backgroundColor: isSelected ? '#166534' : '#F1F5F9',
                          color: isSelected ? '#FFFFFF' : '#475569',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 11,
                          fontWeight: 700,
                        }}
                      >
                        {meta.number}
                      </span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: isSelected ? '#166534' : '#1E293B' }}>
                          {meta.nameTransliterated}
                        </div>
                        <div style={{ fontSize: 10, color: '#64748B' }}>
                          {meta.ayahsCount} آیات · {meta.revelationType === 'MECCAN' ? 'مکی' : 'مدنی'}
                        </div>
                      </div>
                    </div>
                    <span style={{ fontFamily: 'var(--font-arabic), "Amiri", serif', fontSize: 15, color: '#0F172A' }}>
                      {meta.nameArabic}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Active Surah Reader & Continuous Player */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              border: '1px solid #E2E8F0',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            {/* Surah Header Banner */}
            <div
              style={{
                padding: '20px 24px',
                borderBottom: '1px solid #E2E8F0',
                backgroundColor: '#F8FAFC',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 16,
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: '#166534', backgroundColor: '#DCFCE7', padding: '2px 8px', borderRadius: 6 }}>
                    سورۃ {currentSurahMeta.number}
                  </span>
                  <span style={{ fontSize: 12, color: '#64748B' }}>
                    {currentSurahMeta.revelationType === 'MECCAN' ? 'مکی سورت' : 'مدنی سورت'} · {currentSurah.ayahsCount} آیات
                  </span>
                </div>
                <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  {currentSurahMeta.nameTransliterated} ({currentSurahMeta.nameUrdu})
                </h2>
              </div>

              {/* Audio & Display Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                {/* Qari Selector */}
                <div style={{ display: 'flex', gap: 4, backgroundColor: '#E2E8F0', padding: 2, borderRadius: 6 }}>
                  <button
                    onClick={() => setSelectedQari('alafasy')}
                    style={{
                      padding: '4px 8px',
                      borderRadius: 4,
                      fontSize: 11,
                      fontWeight: selectedQari === 'alafasy' ? 800 : 500,
                      border: 'none',
                      cursor: 'pointer',
                      backgroundColor: selectedQari === 'alafasy' ? '#166534' : 'transparent',
                      color: selectedQari === 'alafasy' ? '#FFFFFF' : '#334155',
                    }}
                  >
                    العفاسی
                  </button>
                  <button
                    onClick={() => setSelectedQari('husary')}
                    style={{
                      padding: '4px 8px',
                      borderRadius: 4,
                      fontSize: 11,
                      fontWeight: selectedQari === 'husary' ? 800 : 500,
                      border: 'none',
                      cursor: 'pointer',
                      backgroundColor: selectedQari === 'husary' ? '#166534' : 'transparent',
                      color: selectedQari === 'husary' ? '#FFFFFF' : '#334155',
                    }}
                  >
                    الحصری
                  </button>
                </div>

                {/* Continuous Play All Button */}
                <button
                  onClick={() => handlePlayAyahAudio(1)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 8,
                    backgroundColor: '#166534',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <span>▶</span>
                  <span>مکمل سورت سنیں</span>
                </button>

                {/* Roman Urdu Toggle Button */}
                <button
                  onClick={() => setShowRomanUrdu(!showRomanUrdu)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: 700,
                    border: '1px solid',
                    borderColor: showRomanUrdu ? '#0284C7' : '#CBD5E1',
                    backgroundColor: showRomanUrdu ? '#E0F2FE' : '#FFFFFF',
                    color: showRomanUrdu ? '#0369A1' : '#64748B',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                  title="Toggle Roman Urdu Transliteration & Kanz-ul-Iman Tarjuma"
                >
                  <span>🔤</span>
                  <span>{showRomanUrdu ? 'Roman Urdu: ON' : 'Roman Urdu: OFF'}</span>
                </button>

                {/* Font Size Adjusters */}
                <div style={{ display: 'flex', gap: 2, alignItems: 'center', backgroundColor: '#F1F5F9', padding: '2px 6px', borderRadius: 6 }}>
                  <button
                    onClick={() => setFontSize((s) => Math.max(18, s - 2))}
                    style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700, color: '#475569' }}
                    title="چھوٹا فونٹ"
                  >
                    A-
                  </button>
                  <span style={{ fontSize: 11, color: '#64748B', padding: '0 4px' }}>{fontSize}px</span>
                  <button
                    onClick={() => setFontSize((s) => Math.min(36, s + 2))}
                    style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700, color: '#475569' }}
                    title="بڑا فونٹ"
                  >
                    A+
                  </button>
                </div>
              </div>
            </div>

            {/* Bismillah Banner (for all except Surah At-Tawbah #9) */}
            {selectedSurahNumber !== 9 && (
              <div
                dir="rtl"
                style={{
                  padding: '24px 20px',
                  textAlign: 'center',
                  backgroundColor: '#FAFAF9',
                  borderBottom: '1px solid #F1F5F9',
                  fontFamily: 'var(--font-arabic), "Amiri", serif',
                  fontSize: fontSize + 2,
                  color: '#166534',
                }}
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </div>
            )}

            {/* Loading / Error States */}
            {isLoadingSurah && (
              <div style={{ padding: 40, textAlign: 'center', color: '#64748B' }}>
                <span style={{ fontSize: 24, display: 'inline-block', animation: 'spin 1s linear infinite' }}>⏳</span>
                <p style={{ margin: '8px 0 0', fontSize: 14 }}>سورت مبارکہ کے الفاظ اور مستند ترجمہ لوڈ ہو رہا ہے...</p>
              </div>
            )}

            {surahFetchError && (
              <div style={{ margin: 16, padding: 14, borderRadius: 10, backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#991B1B', fontSize: 13 }}>
                ⚠️ {surahFetchError}
              </div>
            )}

            {/* Verses Stream */}
            {!isLoadingSurah && (
              <div style={{ padding: '8px 24px', display: 'flex', flexDirection: 'column' }}>
                {currentSurah.verses.map((verse) => {
                  const isPlayingThis = playingAyahNumber === verse.ayahNumber;
                  const hasWisdom = !!getAyahWisdomCard(selectedSurahNumber, verse.ayahNumber);

                  return (
                    <div
                      key={verse.ayahNumber}
                      id={`ayah-${verse.ayahNumber}`}
                      style={{
                        padding: '20px 0',
                        borderBottom: '1px solid #F1F5F9',
                        backgroundColor: isPlayingThis ? '#F0FDF4' : 'transparent',
                        borderRadius: isPlayingThis ? 12 : 0,
                        transition: 'background-color 0.2s ease',
                      }}
                    >
                      {/* Top Ayah Meta & Actions */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span
                            style={{
                              width: 28,
                              height: 28,
                              borderRadius: '50%',
                              backgroundColor: isPlayingThis ? '#166534' : '#E2E8F0',
                              color: isPlayingThis ? '#FFFFFF' : '#334155',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: 12,
                              fontWeight: 800,
                            }}
                          >
                            {verse.ayahNumber}
                          </span>

                          <button
                            onClick={() => handlePlayAyahAudio(verse.ayahNumber)}
                            style={{
                              padding: '3px 8px',
                              borderRadius: 6,
                              fontSize: 11,
                              fontWeight: 700,
                              cursor: 'pointer',
                              border: '1px solid',
                              borderColor: isPlayingThis ? '#166534' : '#CBD5E1',
                              backgroundColor: isPlayingThis ? '#DCFCE7' : '#FFFFFF',
                              color: isPlayingThis ? '#166534' : '#475569',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 4,
                            }}
                          >
                            <span>{isPlayingThis ? '⏸' : '▶'}</span>
                            <span>{isPlayingThis ? 'جاری ہے' : 'تلاوت سنیں'}</span>
                          </button>
                        </div>

                        {/* Wisdom Card Action Button */}
                        <button
                          onClick={() => {
                            setActiveWisdomAyah({ surahNumber: selectedSurahNumber, ayahNumber: verse.ayahNumber });
                          }}
                          style={{
                            padding: '4px 12px',
                            borderRadius: 6,
                            fontSize: 11,
                            fontWeight: 700,
                            cursor: 'pointer',
                            backgroundColor: hasWisdom ? '#FEF3C7' : '#F1F5F9',
                            color: hasWisdom ? '#92400E' : '#334155',
                            border: hasWisdom ? '1px solid #FDE68A' : '1px solid #CBD5E1',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 5,
                          }}
                        >
                          <span>📖</span>
                          <span>{hasWisdom ? 'تدبر، حکمت و تفسیری سند (Wisdom Card)' : 'تفسیری حاشیہ و ترجمہ'}</span>
                        </button>
                      </div>

                      {/* Arabic Text */}
                      <div
                        dir="rtl"
                        style={{
                          fontFamily: 'var(--font-arabic), "Amiri", serif',
                          fontSize: fontSize,
                          lineHeight: 2.3,
                          textAlign: 'right',
                          color: '#0F172A',
                          marginBottom: 12,
                          letterSpacing: 0.2,
                        }}
                      >
                        {verse.textArabic}{' '}
                        <span style={{ fontSize: fontSize - 6, color: '#059669', marginRight: 8 }}>
                          ﴿{verse.ayahNumber}﴾
                        </span>
                      </div>

                      {/* Urdu Tarjuma (Kanz-ul-Iman) */}
                      <div style={{ marginBottom: 8 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: '#047857', marginBottom: 2 }}>
                          کنز الایمان (اعلیٰ حضرت امام احمد رضا خان):
                        </div>
                        <div
                          dir="rtl"
                          style={{
                            fontFamily: 'var(--font-urdu), serif',
                            fontSize: Math.max(15, fontSize - 7),
                            lineHeight: 2.1,
                            textAlign: 'right',
                            color: '#1E293B',
                          }}
                        >
                          {verse.textUrdu}
                        </div>
                      </div>

                      {/* Roman Urdu Transliteration & Tarjuma (when enabled) */}
                      {showRomanUrdu && (
                        <div style={{ margin: '10px 0 10px', padding: '10px 14px', borderRadius: 10, backgroundColor: '#F0F9FF', border: '1px solid #BAE6FD' }}>
                          {/* Transliteration */}
                          <div style={{ marginBottom: 6 }}>
                            <div style={{ fontSize: 10, fontWeight: 800, color: '#0369A1', textTransform: 'uppercase', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                              <span>🔤</span>
                              <span>Roman Transliteration (تلفظ و تجوید):</span>
                            </div>
                            <div style={{ fontSize: Math.max(14, fontSize - 8), fontWeight: 600, color: '#0C4A6E', lineHeight: 1.6 }}>
                              {getAyahRomanTransliteration(selectedSurahNumber, verse.ayahNumber, verse.textArabic)}
                            </div>
                          </div>

                          {/* Roman Urdu Tarjuma */}
                          <div>
                            <div style={{ fontSize: 10, fontWeight: 800, color: '#047857', textTransform: 'uppercase', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                              <span>📖</span>
                              <span>Kanz-ul-Iman (Roman Urdu Tarjuma):</span>
                            </div>
                            <div style={{ fontSize: Math.max(13, fontSize - 9), color: '#064E3B', fontWeight: 600, lineHeight: 1.6 }}>
                              {getAyahRomanUrduTarjuma(selectedSurahNumber, verse.ayahNumber, verse.textUrdu)}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* English Translation */}
                      {verse.textEnglish && (
                        <div style={{ fontSize: Math.max(12, fontSize - 11), color: '#475569', lineHeight: 1.6 }}>
                          {verse.textEnglish}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* DEDICATED AYAH WISDOM & LISTENING CARD MODAL */}
      {activeWisdomAyah && (
        <AyahWisdomModal
          isOpen={true}
          onClose={() => setActiveWisdomAyah(null)}
          surahNumber={activeWisdomAyah.surahNumber}
          ayahNumber={activeWisdomAyah.ayahNumber}
          surahNameTransliterated={currentSurahMeta?.nameTransliterated}
          surahNameUrdu={currentSurahMeta?.nameUrdu}
          fallbackArabic={currentSurah?.verses?.find((v) => v.ayahNumber === activeWisdomAyah.ayahNumber)?.textArabic}
          fallbackUrdu={currentSurah?.verses?.find((v) => v.ayahNumber === activeWisdomAyah.ayahNumber)?.textUrdu}
          fallbackEnglish={currentSurah?.verses?.find((v) => v.ayahNumber === activeWisdomAyah.ayahNumber)?.textEnglish}
        />
      )}
    </div>
  );
}
