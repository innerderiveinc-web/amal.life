import React, { useState, useEffect, useMemo, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Navigation } from '../components/Navigation';
import { ALL_114_SURAHS } from '../lib/quran-114-directory';
import { getSurahAudioEndpoints } from '../lib/quran-wisdom-data';
import { AyahWisdomModal } from '../components/AyahWisdomModal';
import { SurahDirectorySidebar } from '../components/quran/SurahDirectorySidebar';
import { SurahReaderWorkspace } from '../components/quran/SurahReaderWorkspace';
import {
  FloatingQuranAudioPlayer,
  AudioSyncMode,
  AudioSegment,
} from '../components/quran/FloatingQuranAudioPlayer';
import { showAmalToast } from '../components/Toast';
import { useLanguage } from '../context/LanguageContext';
import { QuranAudioHubTab } from '../components/quran/QuranAudioHubTab';
import { QuranTajweedHubTab } from '../components/quran/QuranTajweedHubTab';
import { useQuranMasterAudio } from '../components/quran/useQuranMasterAudio';
import { QuranHeaderBar, QuranHubTab } from '../components/quran/QuranHeaderBar';
import { useQuranSurahLoader } from '../components/quran/useQuranSurahLoader';

export type { AudioSyncMode, AudioSegment, QuranHubTab };

export default function QuranWisdomPage() {
  const router = useRouter();
  const { t, isUrdu } = useLanguage();
  const [activeHubTab, setActiveHubTab] = useState<QuranHubTab>('READER');

  useEffect(() => {
    if (router.isReady && router.query.tab) {
      const tab = String(router.query.tab).toUpperCase();
      if (tab === 'AUDIO') setActiveHubTab('AUDIO');
      else if (tab === 'TAJWEED') setActiveHubTab('TAJWEED');
      else if (tab === 'WISDOM') setActiveHubTab('WISDOM');
      else setActiveHubTab('READER');
    }
  }, [router.isReady, router.query.tab]);

  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number>(1);
  const [surahSearchFilter, setSurahSearchFilter] = useState<string>('');
  const [selectedQari, setSelectedQari] = useState<'alafasy' | 'husary' | 'minshawi'>('alafasy');
  const [revelationFilter, setRevelationFilter] = useState<'ALL' | 'MECCAN' | 'MEDINAN'>('ALL');
  const [fontSize, setFontSize] = useState<number>(24);
  const [showRomanUrdu, setShowRomanUrduState] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('amal_show_roman_urdu');
      if (saved !== null) return saved === 'true';
    }
    return true; // Default ON for global accessibility
  });

  const setShowRomanUrdu = (show: boolean) => {
    setShowRomanUrduState(show);
    if (typeof window !== 'undefined') {
      localStorage.setItem('amal_show_roman_urdu', String(show));
    }
  };

  const [viewMode, setViewModeState] = useState<'SCROLL' | 'FOCUS'>('FOCUS');
  const [focusedAyahNumber, setFocusedAyahNumber] = useState<number>(1);
  const [mobileTab, setMobileTab] = useState<'READER' | 'DIRECTORY'>('READER');
  const [continuousSurahPlayback, setContinuousSurahPlaybackState] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('amal_continuous_surah');
      if (saved !== null) return saved === 'true';
    }
    return true; // Default ON: continuous recitation across surahs
  });

  const setContinuousSurahPlayback = (val: boolean) => {
    setContinuousSurahPlaybackState(val);
    if (typeof window !== 'undefined') {
      localStorage.setItem('amal_continuous_surah', String(val));
    }
  };

  // Reader & Wisdom Modal State
  const [activeWisdomAyah, setActiveWisdomAyah] = useState<{
    surahNumber: number;
    ayahNumber: number;
  } | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isSurahSettingsOpen, setIsSurahSettingsOpen] = useState<boolean>(false);

  // Smart Resume / Bookmark Persistence State
  const [lastReadPosition, setLastReadPosition] = useState<{
    surahNumber: number;
    ayahNumber: number;
    surahNameArabic?: string;
    surahNameUrdu?: string;
    surahNameTransliterated?: string;
    viewMode: 'SCROLL' | 'FOCUS';
    timestamp: number;
  } | null>(null);

  const isInitialResumeChecked = useRef(false);

  // Modular Surah Dataset & Cache Loader Hook
  const [playingAyahNumberState, setPlayingAyahNumberState] = useState<number | null>(null);
  const {
    loadedSurahsCache,
    isLoadingSurah,
    surahFetchError,
    handleSelectSurah,
  } = useQuranSurahLoader({
    setSelectedSurahNumber,
    setFocusedAyahNumber,
    setPlayingAyahNumber: setPlayingAyahNumberState,
    setMobileTab,
  });

  const currentSurah = loadedSurahsCache[selectedSurahNumber] || loadedSurahsCache[1]!;
  const currentSurahMeta =
    ALL_114_SURAHS.find((s) => s.number === selectedSurahNumber) || ALL_114_SURAHS[0]!;

  // Modular Master Audio Hook
  const {
    masterAudioRef,
    playingAyahNumber,
    audioSyncMode,
    setAudioSyncMode,
    currentAudioSegment,
    isPlayingPaused,
    setIsPlayingPaused,
    activeTafseerCardKey,
    setActiveTafseerCardKey,
    surahWideAudioType,
    setSurahWideAudioType,
    setContinuousTafseerIndex,
    isSurahCachedOffline,
    isCachingSurah,
    handleCacheSurahOffline,
    handleDownloadSurahAudio,
    handleStopAudio,
    togglePlayPause,
    handlePlayAyahAudio,
    handleAdvanceToNextSurah,
    handleMasterAudioEnded,
    handlePlaySurahKanzulIman,
    handlePlaySurahUrduOnly,
    handlePlaySurahTilawatOnly,
    handlePlaySurahTafseer,
  } = useQuranMasterAudio({
    selectedSurahNumber,
    setSelectedSurahNumber,
    selectedQari,
    continuousSurahPlayback,
    currentSurah,
    currentSurahMeta,
    playbackSpeed,
    isUrdu,
    t,
    onSelectSurah: handleSelectSurah,
    setFocusedAyahNumber,
  });

  // Restore Last Read Quran Position or Deep Link Query
  useEffect(() => {
    if (!router.isReady || isInitialResumeChecked.current) return;
    isInitialResumeChecked.current = true;

    if (router.query.surah) {
      const s = parseInt(router.query.surah as string, 10);
      if (!isNaN(s) && s >= 1 && s <= 114) {
        const a = router.query.ayah ? parseInt(router.query.ayah as string, 10) : undefined;
        handleSelectSurah(s, a && !isNaN(a) && a >= 1 ? a : 1);
        if (router.query.mode === 'scroll') setViewModeState('SCROLL');
        else if (router.query.mode === 'focus') setViewModeState('FOCUS');
      }
    } else if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('amal_last_read_quran');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (
            parsed &&
            typeof parsed.surahNumber === 'number' &&
            parsed.surahNumber >= 1 &&
            parsed.surahNumber <= 114
          ) {
            setLastReadPosition(parsed);
            handleSelectSurah(parsed.surahNumber, parsed.ayahNumber || 1);
            if (parsed.viewMode === 'SCROLL' || parsed.viewMode === 'FOCUS') {
              setViewModeState(parsed.viewMode);
            }
            showAmalToast(
              `✨ آخری تلاوت بحال کر دی گئی: ${parsed.surahNameUrdu || parsed.surahNameTransliterated || 'سورۃ'} (آیت ${parsed.ayahNumber || 1})`,
              'info'
            );
          }
        }
      } catch (e) {
        console.warn('Could not restore last read position:', e);
      }
    }
  }, [router.isReady, router.query.surah, router.query.ayah, router.query.mode]);

  // Restore saved view mode preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (router.query.mode === 'scroll') {
        setViewModeState('SCROLL');
      } else if (router.query.mode === 'focus') {
        setViewModeState('FOCUS');
      } else {
        const savedMode = localStorage.getItem('amal_quran_view_mode') as 'SCROLL' | 'FOCUS';
        if (savedMode === 'FOCUS' || savedMode === 'SCROLL') {
          setViewModeState(savedMode);
        }
      }
    }
  }, [router.query.mode]);

  const setViewMode = (mode: 'SCROLL' | 'FOCUS') => {
    setViewModeState(mode);
    try {
      localStorage.setItem('amal_quran_view_mode', mode);
    } catch {}
  };

  // Sync focused Ayah with audio playback so Focus Mode auto-advances seamlessly
  useEffect(() => {
    if (playingAyahNumber !== null) {
      setFocusedAyahNumber(playingAyahNumber);
    }
  }, [playingAyahNumber]);

  // Persist Last Read Position to LocalStorage for Smart Resume
  useEffect(() => {
    if (typeof window === 'undefined' || !isInitialResumeChecked.current) return;
    try {
      const meta = ALL_114_SURAHS.find((s) => s.number === selectedSurahNumber);
      const payload = {
        surahNumber: selectedSurahNumber,
        ayahNumber: focusedAyahNumber,
        surahNameArabic: meta?.nameArabic || '',
        surahNameUrdu: meta?.nameUrdu || '',
        surahNameTransliterated: meta?.nameTransliterated || '',
        viewMode,
        timestamp: Date.now(),
      };
      localStorage.setItem('amal_last_read_quran', JSON.stringify(payload));
      setLastReadPosition(payload);
    } catch (e) {
      console.warn('Failed to save last read quran state:', e);
    }
  }, [selectedSurahNumber, focusedAyahNumber, viewMode]);

  // Keyboard navigation for Focus Mode (Arrow Right/Left)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (viewMode === 'FOCUS') {
        const totalVerses = currentSurah?.verses?.length || 1;
        if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'j') {
          e.preventDefault();
          setFocusedAyahNumber((prev) => Math.min(totalVerses, prev + 1));
        } else if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'k') {
          e.preventDefault();
          setFocusedAyahNumber((prev) => Math.max(1, prev - 1));
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, currentSurah]);

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
    { num: 67, label: 'الملک' },
    { num: 103, label: 'العصر' },
    { num: 107, label: 'الماعون' },
    { num: 112, label: 'الإخلاص' },
    { num: 113, label: 'الفلق' },
    { num: 114, label: 'الناس' },
  ];

  return (
    <div style={{ backgroundColor: '#F8FAF9', minHeight: '100vh', paddingBottom: 100 }}>
      <Head>
        <title>
          {t('Al-Quran Al-Kareem & Wisdom | AMAL OS', 'قرآنِ کریم، حکمت و تدبر | امل او ایس')}
        </title>
        <meta
          name="description"
          content="AMAL Quran Wisdom & Listening Experience with Kanz-ul-Iman Tarjuma, Khaza'in-ul-Irfan Tafsir, 100% Real Human Voice Recitation, and 2-Minute Quick Wisdom."
        />
      </Head>

      <Navigation />

      {/* SINGLE MASTER AUDIO PLAYER — Prevents any multi-audio overlapping */}
      <audio
        ref={masterAudioRef}
        playsInline
        preload="auto"
        onEnded={handleMasterAudioEnded}
        onPlay={() => {
          setIsPlayingPaused(false);
          if (typeof window !== 'undefined' && 'mediaSession' in navigator) {
            navigator.mediaSession.playbackState = 'playing';
          }
        }}
        onPause={() => {
          if (!masterAudioRef.current?.ended) {
            setIsPlayingPaused(true);
            if (typeof window !== 'undefined' && 'mediaSession' in navigator) {
              navigator.mediaSession.playbackState = 'paused';
            }
          }
        }}
        onError={(e) => {
          const currentSrc = masterAudioRef.current?.getAttribute('src');
          if (!currentSrc || currentSrc.trim() === '' || currentSrc === window.location.href) {
            return;
          }

          console.warn('Master audio error on source:', currentSrc, e);

          const endpoints = getSurahAudioEndpoints(selectedSurahNumber);
          const currentIdx = endpoints.findIndex((u) =>
            currentSrc.includes(encodeURIComponent(u.split('/').pop() || ''))
          );
          if (currentIdx !== -1 && currentIdx < endpoints.length - 1 && masterAudioRef.current) {
            const nextMirror = endpoints[currentIdx + 1];
            if (nextMirror) {
              console.info(
                'Primary mirror throttled; cascading to resilient backup CDN:',
                nextMirror
              );
              masterAudioRef.current.src = nextMirror;
              masterAudioRef.current.play().catch(() => {});
              return;
            }
          }

          if (masterAudioRef.current) {
            masterAudioRef.current.pause();
            masterAudioRef.current.removeAttribute('src');
          }

          if (audioSyncMode === 'FULL_SYNC' || audioSyncMode === 'TILAWAT_URDU_SYNC') {
            handleMasterAudioEnded();
          } else {
            setIsPlayingPaused(false);
            setSurahWideAudioType(null);
            setActiveTafseerCardKey(null);
            setContinuousTafseerIndex(null);
            showAmalToast('آڈیو سرور سے رابطہ میں تاخیر ہوئی۔ دوبارہ کوشش کریں۔', 'warning');
          }
        }}
        style={{ position: 'fixed', bottom: -100, opacity: 0, pointerEvents: 'none' }}
      />

      <main style={{ maxWidth: 1140, margin: '0 auto', padding: '0 20px' }}>
        {/* Quran Header Bar with Credentials, Resume Action & Hub Tabs */}
        <QuranHeaderBar
          lastReadPosition={lastReadPosition}
          onResumeLastRead={() => {
            if (lastReadPosition) {
              handleSelectSurah(lastReadPosition.surahNumber, lastReadPosition.ayahNumber);
              if (lastReadPosition.viewMode) setViewMode(lastReadPosition.viewMode);
              showAmalToast(
                t(
                  `✨ Resumed: ${lastReadPosition.surahNameTransliterated} (Verse ${lastReadPosition.ayahNumber})`,
                  `✨ آخری تلاوت پر منتقل ہو گئے: ${lastReadPosition.surahNameUrdu || lastReadPosition.surahNameTransliterated} (آیت ${lastReadPosition.ayahNumber})`
                ),
                'success'
              );
            }
          }}
          activeHubTab={activeHubTab}
          onSelectHubTab={setActiveHubTab}
          isUrdu={isUrdu}
          t={t}
        />

        {activeHubTab === 'AUDIO' ? (
          <div style={{ marginBottom: 30 }}>
            <QuranAudioHubTab />
          </div>
        ) : activeHubTab === 'TAJWEED' ? (
          <div style={{ marginBottom: 30 }}>
            <QuranTajweedHubTab />
          </div>
        ) : (
          <>
            {/* MOBILE VIEW TOGGLE: READ SURAH vs 114 SURAHS LIST */}
            <div className="mobile-only" style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <button
                onClick={() => setMobileTab('READER')}
                style={{
                  flex: 1,
                  padding: '11px 14px',
                  borderRadius: 10,
                  border: mobileTab === 'READER' ? '2px solid #065F46' : '1px solid #D1D5DB',
                  backgroundColor: mobileTab === 'READER' ? '#ECFDF5' : '#FFFFFF',
                  color: mobileTab === 'READER' ? '#065F46' : '#4B5563',
                  fontWeight: 800,
                  fontSize: 13,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  boxShadow: mobileTab === 'READER' ? '0 2px 6px rgba(6, 95, 70, 0.15)' : 'none',
                }}
              >
                <span>📖</span>
                <span>{isUrdu ? 'تلاوت و سورت' : 'Read Surah'}</span>
                <span
                  style={{
                    fontSize: 10,
                    backgroundColor: '#10B981',
                    color: '#FFF',
                    padding: '1px 5px',
                    borderRadius: 4,
                  }}
                >
                  {currentSurahMeta?.number}
                </span>
              </button>
              <button
                onClick={() => setMobileTab('DIRECTORY')}
                style={{
                  flex: 1,
                  padding: '11px 14px',
                  borderRadius: 10,
                  border: mobileTab === 'DIRECTORY' ? '2px solid #065F46' : '1px solid #D1D5DB',
                  backgroundColor: mobileTab === 'DIRECTORY' ? '#ECFDF5' : '#FFFFFF',
                  color: mobileTab === 'DIRECTORY' ? '#065F46' : '#4B5563',
                  fontWeight: 800,
                  fontSize: 13,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                }}
              >
                <span>📋</span>
                <span>{isUrdu ? 'سورت منتخب کریں' : 'All 114 Surahs'}</span>
              </button>
            </div>

            {/* SECTION 2 & 3: SURAHS DIRECTORY & IN-APP READER */}
            <section
              className="quran-workspace-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '320px 1fr',
                gap: 24,
                alignItems: 'start',
              }}
            >
              {/* LEFT: 114 Surahs Directory Sidebar */}
              <div
                className={mobileTab === 'DIRECTORY' ? '' : 'desktop-only'}
                style={{ minWidth: 0, width: '100%' }}
              >
                <SurahDirectorySidebar
                  surahSearchFilter={surahSearchFilter}
                  setSurahSearchFilter={setSurahSearchFilter}
                  revelationFilter={revelationFilter}
                  setRevelationFilter={setRevelationFilter}
                  belovedShortcuts={belovedShortcuts}
                  filteredSurahs={filteredSurahs}
                  selectedSurahNumber={selectedSurahNumber}
                  onSelectSurah={handleSelectSurah}
                />
              </div>

              {/* RIGHT: Active Surah Reader & Continuous Player */}
              <div
                className={mobileTab === 'READER' ? '' : 'desktop-only'}
                style={{ minWidth: 0, width: '100%' }}
              >
                {/* Mobile Quick Surah Selector */}
                <div className="mobile-only" style={{ marginBottom: 12 }}>
                  <label
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#065F46',
                      display: 'block',
                      marginBottom: 4,
                    }}
                  >
                    {isUrdu ? 'فوری سورت تبدیل کریں:' : 'Quick Surah Jumper:'}
                  </label>
                  <select
                    value={selectedSurahNumber}
                    onChange={(e) => handleSelectSurah(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 10,
                      border: '1.5px solid #10B981',
                      backgroundColor: '#FFFFFF',
                      fontSize: 14,
                      fontWeight: 700,
                      color: '#064E3B',
                    }}
                  >
                    {ALL_114_SURAHS.map((s) => (
                      <option key={s.number} value={s.number}>
                        {s.number}. {s.nameArabic} ({s.nameTransliterated} · {s.ayahsCount} Verses)
                      </option>
                    ))}
                  </select>
                </div>

                <SurahReaderWorkspace
                  currentSurahMeta={currentSurahMeta}
                  currentSurah={currentSurah}
                  selectedSurahNumber={selectedSurahNumber}
                  playingAyahNumber={playingAyahNumber}
                  audioSyncMode={audioSyncMode}
                  surahWideAudioType={surahWideAudioType}
                  isPlayingPaused={isPlayingPaused}
                  currentAudioSegment={currentAudioSegment}
                  isSurahSettingsOpen={isSurahSettingsOpen}
                  setIsSurahSettingsOpen={setIsSurahSettingsOpen}
                  selectedQari={selectedQari}
                  setSelectedQari={setSelectedQari}
                  playbackSpeed={playbackSpeed}
                  setPlaybackSpeed={setPlaybackSpeed}
                  isSurahCachedOffline={isSurahCachedOffline}
                  isCachingSurah={isCachingSurah}
                  handleCacheSurahOffline={handleCacheSurahOffline}
                  handleDownloadSurahAudio={handleDownloadSurahAudio}
                  showRomanUrdu={showRomanUrdu}
                  setShowRomanUrdu={setShowRomanUrdu}
                  fontSize={fontSize}
                  setFontSize={setFontSize}
                  isLoadingSurah={isLoadingSurah}
                  surahFetchError={surahFetchError}
                  handlePlaySurahKanzulIman={handlePlaySurahKanzulIman}
                  handlePlaySurahUrduOnly={handlePlaySurahUrduOnly}
                  handlePlaySurahTafseer={handlePlaySurahTafseer}
                  handlePlaySurahTilawatOnly={handlePlaySurahTilawatOnly}
                  handlePlayAyahAudio={handlePlayAyahAudio}
                  onOpenWisdomModal={(sNum, aNum) =>
                    setActiveWisdomAyah({ surahNumber: sNum, ayahNumber: aNum })
                  }
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                  focusedAyahNumber={focusedAyahNumber}
                  setFocusedAyahNumber={setFocusedAyahNumber}
                  continuousSurahPlayback={continuousSurahPlayback}
                  setContinuousSurahPlayback={setContinuousSurahPlayback}
                />
              </div>
            </section>
          </>
        )}
      </main>

      {/* PERSISTENT FLOATING AUDIO PLAYER (LOCK-SCREEN & PLAYBACK CONTROLS) */}
      <FloatingQuranAudioPlayer
        playingAyahNumber={playingAyahNumber}
        surahWideAudioType={surahWideAudioType}
        activeTafseerCardKey={activeTafseerCardKey}
        currentAudioSegment={currentAudioSegment}
        currentSurahMeta={currentSurahMeta}
        currentSurah={currentSurah}
        selectedQari={selectedQari}
        isPlayingPaused={isPlayingPaused}
        playbackSpeed={playbackSpeed}
        setPlaybackSpeed={setPlaybackSpeed}
        isSurahCachedOffline={isSurahCachedOffline}
        isCachingSurah={isCachingSurah}
        handleCacheSurahOffline={handleCacheSurahOffline}
        audioSyncMode={audioSyncMode}
        setAudioSyncMode={setAudioSyncMode}
        handlePlayAyahAudio={handlePlayAyahAudio}
        togglePlayPause={togglePlayPause}
        handleStopAudio={handleStopAudio}
        onOpenWisdomModal={(sNum, aNum) =>
          setActiveWisdomAyah({ surahNumber: sNum, ayahNumber: aNum })
        }
        selectedSurahNumber={selectedSurahNumber}
        continuousSurahPlayback={continuousSurahPlayback}
        setContinuousSurahPlayback={setContinuousSurahPlayback}
        handleAdvanceToNextSurah={handleAdvanceToNextSurah}
        handleSelectSurah={handleSelectSurah}
      />

      {/* DEDICATED AYAH WISDOM & LISTENING CARD MODAL */}
      {activeWisdomAyah && (
        <AyahWisdomModal
          isOpen={true}
          onClose={() => setActiveWisdomAyah(null)}
          surahNumber={activeWisdomAyah.surahNumber}
          ayahNumber={activeWisdomAyah.ayahNumber}
          surahNameTransliterated={currentSurahMeta?.nameTransliterated}
          surahNameUrdu={currentSurahMeta?.nameUrdu}
          fallbackArabic={
            currentSurah?.verses?.find((v) => v.ayahNumber === activeWisdomAyah.ayahNumber)
              ?.textArabic
          }
          fallbackUrdu={
            currentSurah?.verses?.find((v) => v.ayahNumber === activeWisdomAyah.ayahNumber)?.textUrdu
          }
          fallbackEnglish={
            currentSurah?.verses?.find((v) => v.ayahNumber === activeWisdomAyah.ayahNumber)
              ?.textEnglish
          }
        />
      )}
    </div>
  );
}
