import React, { useState, useEffect, useMemo, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Navigation } from '../components/Navigation';
import { AmalTheme } from '@amal/ui';
import { QURAN_SURAHS_COLLECTION, QuranSurahData } from '../lib/quran-surahs-data';
import { ALL_114_SURAHS, QuranSurahMeta } from '../lib/quran-114-directory';
import { QURAN_WISDOM_COLLECTION, QuranAyahWisdomCard, getAyahWisdomCard, getSurahWisdomCards, getAyahAudioUrl, getAyahUrduAudioUrl, getSurahKanzulImanAudioUrl, getSurahTafseerAudioUrl, getSurahAudioEndpoints } from '../lib/quran-wisdom-data';
import { getAyahRomanTransliteration, getAyahRomanUrduTarjuma } from '../lib/quran-roman-urdu';
import { AyahWisdomModal } from '../components/AyahWisdomModal';
import { SurahDirectorySidebar } from '../components/quran/SurahDirectorySidebar';
import { SurahReaderWorkspace } from '../components/quran/SurahReaderWorkspace';
import { FloatingQuranAudioPlayer, AudioSyncMode, AudioSegment } from '../components/quran/FloatingQuranAudioPlayer';
import { showAmalToast } from '../components/Toast';
import { useAudioPlayer } from '../context/AudioPlayerContext';

type ExperienceMode = 'QUICK_2MIN' | 'DAILY_5MIN' | 'DEEP_15MIN';
export type { AudioSyncMode, AudioSegment };

export default function QuranWisdomPage() {
  const router = useRouter();
  const { pause: pauseGlobalPlayer } = useAudioPlayer();
  const [activeMode, setActiveMode] = useState<ExperienceMode>('QUICK_2MIN');
  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number>(1);
  const [surahSearchFilter, setSurahSearchFilter] = useState<string>('');
  const [selectedQari, setSelectedQari] = useState<'alafasy' | 'husary' | 'minshawi'>('alafasy');
  const [selectedThemeFilter, setSelectedThemeFilter] = useState<string>('ALL');
  const [revelationFilter, setRevelationFilter] = useState<'ALL' | 'MECCAN' | 'MEDINAN'>('ALL');
  const [fontSize, setFontSize] = useState<number>(24);
  const [showRomanUrdu, setShowRomanUrdu] = useState<boolean>(false);
  const [bookmarkedCardIds, setBookmarkedCardIds] = useState<string[]>([]);
  const [viewMode, setViewModeState] = useState<'SCROLL' | 'FOCUS'>('FOCUS');
  const [focusedAyahNumber, setFocusedAyahNumber] = useState<number>(1);

  // Reader & Wisdom Modal State
  const [activeWisdomAyah, setActiveWisdomAyah] = useState<{ surahNumber: number; ayahNumber: number } | null>(null);

  // Audio Playback & Sync State
  const [playingAyahNumber, setPlayingAyahNumber] = useState<number | null>(null);
  const [audioSyncMode, setAudioSyncMode] = useState<AudioSyncMode>('TILAWAT_URDU_SYNC');
  const [currentAudioSegment, setCurrentAudioSegment] = useState<AudioSegment>('ARABIC');
  const [isPlayingPaused, setIsPlayingPaused] = useState<boolean>(false);
  const [activeTafseerCardKey, setActiveTafseerCardKey] = useState<string | null>(null);
  const [surahWideAudioType, setSurahWideAudioType] = useState<'KANZUL_IMAN' | 'TAFSEER' | null>(null);
  const [continuousTafseerIndex, setContinuousTafseerIndex] = useState<number | null>(null);

  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isSurahCachedOffline, setIsSurahCachedOffline] = useState<boolean>(false);
  const [isCachingSurah, setIsCachingSurah] = useState<boolean>(false);
  const [isSurahSettingsOpen, setIsSurahSettingsOpen] = useState<boolean>(false);

  // Single Master Audio Ref — strictly prevents any audio overlapping
  const masterAudioRef = useRef<HTMLAudioElement | null>(null);

  // Sync playback rate to master audio element
  useEffect(() => {
    if (masterAudioRef.current) masterAudioRef.current.playbackRate = playbackSpeed;
  }, [playbackSpeed]);

  // Check if current Surah Kanz-ul-Iman / Tilawat audio is cached offline
  useEffect(() => {
    if (typeof window !== 'undefined' && 'caches' in window) {
      const kanzulImanUrl = getSurahKanzulImanAudioUrl(selectedSurahNumber);
      if (kanzulImanUrl) {
        caches.open('amal-quran-audio-v1').then((cache) => {
          cache.match(kanzulImanUrl).then((res) => {
            setIsSurahCachedOffline(!!res);
          });
        }).catch(() => {});
      } else {
        setIsSurahCachedOffline(false);
      }
    }
  }, [selectedSurahNumber]);

  const handleCacheSurahOffline = async () => {
    if (typeof window === 'undefined' || !('caches' in window)) {
      showAmalToast('آپ کے براؤزر میں آف لائن کیشنگ دستیاب نہیں ہے۔', 'warning');
      return;
    }
    setIsCachingSurah(true);
    try {
      const cache = await caches.open('amal-quran-audio-v1');
      const kanzulImanUrl = getSurahKanzulImanAudioUrl(selectedSurahNumber);
      if (kanzulImanUrl) {
        await cache.add(kanzulImanUrl);
      }
      // Also cache first 3 verses of the selected Surah
      const p1 = cache.add(getAyahAudioUrl(selectedSurahNumber, 1, selectedQari)).catch(() => {});
      const p2 = cache.add(getAyahUrduAudioUrl(selectedSurahNumber, 1)).catch(() => {});
      await Promise.all([p1, p2]);
      
      setIsSurahCachedOffline(true);
      showAmalToast('سورۃ مبارکہ کی آڈیو کامیابی سے آف لائن محفوظ کر لی گئی ہے! (Surah cached offline)', 'success');
    } catch (e) {
      console.warn('Failed to cache surah audio:', e);
      showAmalToast('آف لائن محفوظ کرنے میں خرابی پیش آئی۔', 'warning');
    } finally {
      setIsCachingSurah(false);
    }
  };

  const handleDownloadSurahAudio = () => {
    const kanzulImanUrl = getSurahKanzulImanAudioUrl(selectedSurahNumber);
    if (!kanzulImanUrl) {
      showAmalToast('اس سورت کا مکمل آڈیو لنک دستیاب نہیں ہے۔', 'warning');
      return;
    }
    try {
      const a = document.createElement('a');
      a.href = kanzulImanUrl;
      a.download = `Amal_Surah_${selectedSurahNumber}_KanzulIman.mp3`;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showAmalToast('مکمل سورت کی آڈیو ڈاؤنلوڈ شروع ہو گئی ہے۔', 'success');
    } catch (e) {
      showAmalToast('ڈاؤنلوڈ میں خرابی پیش آئی۔', 'warning');
    }
  };

  // Load Bookmarks from LocalStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('amal_bookmarked_quran_wisdom');
        if (stored) setBookmarkedCardIds(JSON.parse(stored));
      } catch (e) {
        console.warn('Could not read bookmarks:', e);
      }
    }
  }, []);

  const toggleBookmarkCard = (surahNum: number, ayahNum: number) => {
    const key = `${surahNum}:${ayahNum}`;
    setBookmarkedCardIds((prev) => {
      const next = prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key];
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('amal_bookmarked_quran_wisdom', JSON.stringify(next));
        } catch (e) {}
      }
      return next;
    });
  };

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
        if (router.query.ayah) {
          const a = parseInt(router.query.ayah as string, 10);
          if (!isNaN(a) && a >= 1) {
            setFocusedAyahNumber(a);
          }
        }
      }
    }
  }, [router.query.surah, router.query.ayah]);

  const handleSelectSurah = async (surahNum: number) => {
    setSelectedSurahNumber(surahNum);
    setFocusedAyahNumber(1);
    setSurahFetchError(null);
    setPlayingAyahNumber(null);

    const meta = ALL_114_SURAHS.find((s) => s.number === surahNum);
    if (loadedSurahsCache[surahNum] && meta && loadedSurahsCache[surahNum].verses.length >= meta.ayahsCount) {
      return;
    }

    // Check offline local device cache first
    try {
      const offlineCached = localStorage.getItem(`amal_cached_surah_${surahNum}`);
      if (offlineCached) {
        const parsed = JSON.parse(offlineCached);
        if (parsed && Array.isArray(parsed.verses) && parsed.verses.length > 0) {
          setLoadedSurahsCache((prev) => ({ ...prev, [surahNum]: parsed }));
          return;
        }
      }
    } catch {}

    setIsLoadingSurah(true);
    try {
      // 1. Primary: Load instantaneously from local offline bundled dataset (100% offline, zero network)
      try {
        const localRes = await fetch(`/data/quran/surahs/${surahNum}.json`);
        if (localRes.ok) {
          const localData = await localRes.json();
          if (localData && Array.isArray(localData.verses) && localData.verses.length > 0) {
            const bundledSurah: QuranSurahData = {
              surahNumber: surahNum,
              nameArabic: meta?.nameArabic || localData.nameArabic,
              nameTransliterated: meta?.nameTransliterated || localData.nameTransliterated,
              nameUrdu: meta?.nameUrdu || localData.nameUrdu || '',
              nameEnglish: meta?.nameEnglish || localData.nameEnglish,
              revelationType: (meta?.revelationType || localData.revelationType) as any,
              ayahsCount: meta?.ayahsCount || localData.ayahsCount || localData.verses.length,
              verses: localData.verses,
            };
            setLoadedSurahsCache((prev) => ({ ...prev, [surahNum]: bundledSurah }));
            try {
              localStorage.setItem(`amal_cached_surah_${surahNum}`, JSON.stringify(bundledSurah));
            } catch {}
            setIsLoadingSurah(false);
            return;
          }
        }
      } catch (localErr) {
        console.info('Local static surah fetch bypassed, attempting network fallback:', localErr);
      }

      // 2. Secondary Network Fallback: Remote CDN if local static asset is unreachable
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
        try {
          localStorage.setItem(`amal_cached_surah_${surahNum}`, JSON.stringify(newSurah));
        } catch {}
      }
    } catch (err: any) {
      console.warn('Surah online load failed, fallback:', err);
      setSurahFetchError('سورت لوڈ کرنے میں خرابی پیش آئی۔ براہ کرم دوبارہ کوشش کریں۔');
    } finally {
      setIsLoadingSurah(false);
    }
  };

  const currentSurah = loadedSurahsCache[selectedSurahNumber] || loadedSurahsCache[1]!;
  const currentSurahMeta = ALL_114_SURAHS.find((s) => s.number === selectedSurahNumber) || ALL_114_SURAHS[0]!;

  // Restore saved view mode preference or URL query param (?mode=scroll or ?mode=focus)
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

  // Reset focused Ayah to 1 when a new Surah is selected
  useEffect(() => {
    setFocusedAyahNumber(1);
  }, [selectedSurahNumber]);

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
    { num: 67, label: 'الملك' },
    { num: 103, label: 'العصر' },
    { num: 107, label: 'الماعون' },
    { num: 112, label: 'الإخلاص' },
    { num: 113, label: 'الفلق' },
    { num: 114, label: 'الناس' },
  ];

  // Master Stop Audio Function — completely silences and resets all audio
  const handleStopAudio = () => {
    if (masterAudioRef.current) {
      masterAudioRef.current.pause();
      masterAudioRef.current.removeAttribute('src');
      masterAudioRef.current.load();
    }
    setPlayingAyahNumber(null);
    setCurrentAudioSegment('ARABIC');
    setIsPlayingPaused(false);
    setSurahWideAudioType(null);
    setActiveTafseerCardKey(null);
    setContinuousTafseerIndex(null);
  };

  const togglePlayPause = () => {
    if (masterAudioRef.current) {
      if (masterAudioRef.current.paused) {
        masterAudioRef.current.play().catch(() => {});
        setIsPlayingPaused(false);
      } else {
        masterAudioRef.current.pause();
        setIsPlayingPaused(true);
      }
    }
  };

  // Master Play Ayah Function: handles ARABIC, URDU, and TAFSEER segments on single master player
  const handlePlayAyahAudio = (ayahNum: number, segment: AudioSegment = 'ARABIC') => {
    pauseGlobalPlayer();

    if (playingAyahNumber === ayahNum && currentAudioSegment === segment) {
      if (masterAudioRef.current) {
        if (masterAudioRef.current.paused) {
          masterAudioRef.current.play();
          setIsPlayingPaused(false);
        } else {
          masterAudioRef.current.pause();
          setIsPlayingPaused(true);
        }
      }
      return;
    }

    // Stop previous audio to eliminate any possibility of overlap
    if (masterAudioRef.current) {
      masterAudioRef.current.pause();
    }

    setPlayingAyahNumber(ayahNum);
    setCurrentAudioSegment(segment);
    setIsPlayingPaused(false);
    setSurahWideAudioType(null);
    setActiveTafseerCardKey(null);

    let url = '';
    if (segment === 'ARABIC') {
      url = getAyahAudioUrl(selectedSurahNumber, ayahNum, selectedQari);
    } else if (segment === 'URDU') {
      url = getAyahUrduAudioUrl(selectedSurahNumber, ayahNum);
    } else if (segment === 'TAFSEER') {
      url = getAyahUrduAudioUrl(selectedSurahNumber, ayahNum);
    }

    if (masterAudioRef.current && url) {
      masterAudioRef.current.src = url;
      masterAudioRef.current.playbackRate = playbackSpeed;
      masterAudioRef.current.play().catch((e) => {
        if (e && (e.name === 'AbortError' || e.message?.includes('interrupted'))) {
          return; // Intentionally paused/interrupted by user
        }
        console.warn('Audio play error, trying CDN fallback:', e);
        const fallbackUrl = `https://cdn.islamic.network/quran/audio/64/ur.khan/${ayahNum}.mp3`;
        if (masterAudioRef.current && segment !== 'ARABIC') {
          masterAudioRef.current.src = fallbackUrl;
          masterAudioRef.current.play().catch(() => {});
        }
      });
    }
  };

  // Master Audio Ended Handler: controls sequential sync
  const handleMasterAudioEnded = () => {
    if (playingAyahNumber === null) {
      if (surahWideAudioType !== null) {
        setSurahWideAudioType(null);
      }
      return;
    }

    const totalVerses = currentSurah?.verses?.length || 0;

    if (audioSyncMode === 'FULL_SYNC' || audioSyncMode === 'TILAWAT_URDU_SYNC') {
      // 2-Stage Authentic Sequential Sync: ARABIC -> URDU -> Next Ayah (Zero repetition)
      if (currentAudioSegment === 'ARABIC') {
        handlePlayAyahAudio(playingAyahNumber, 'URDU');
      } else {
        // Urdu Tarjuma finished -> Advance to next Ayah Arabic recitation
        if (playingAyahNumber < totalVerses) {
          handlePlayAyahAudio(playingAyahNumber + 1, 'ARABIC');
        } else {
          handleStopAudio();
          showAmalToast(`سورۃ ${currentSurahMeta?.nameUrdu || ''}: تلاوت و مستند ترجمہ مکمل ہو گیا۔`, 'success');
        }
      }
    } else if (audioSyncMode === 'URDU_ONLY_CONTINUOUS') {
      // Continuous Urdu Tarjuma
      if (playingAyahNumber < totalVerses) {
        handlePlayAyahAudio(playingAyahNumber + 1, 'URDU');
      } else {
        handleStopAudio();
        showAmalToast(`سورۃ ${currentSurahMeta?.nameUrdu || ''} کا مکمل اردو ترجمہ مکمل ہو گیا۔`, 'success');
      }
    } else if (audioSyncMode === 'TILAWAT_ONLY') {
      // Continuous Arabic Tilawat
      if (playingAyahNumber < totalVerses) {
        handlePlayAyahAudio(playingAyahNumber + 1, 'ARABIC');
      } else {
        handleStopAudio();
        showAmalToast(`سورۃ ${currentSurahMeta?.nameUrdu || ''} کی مکمل تلاوت مکمل ہو گیا۔`, 'success');
      }
    }
  };

  const handlePlayTafseerWisdomAudio = (card: QuranAyahWisdomCard) => {
    const cardKey = `${card.surahNumber}:${card.ayahNumber}`;
    if (activeTafseerCardKey === cardKey) {
      handleStopAudio();
      return;
    }

    handleStopAudio();
    pauseGlobalPlayer();
    setActiveTafseerCardKey(cardKey);

    const audioUrl = getAyahUrduAudioUrl(card.surahNumber, card.ayahNumber);
    if (masterAudioRef.current) {
      masterAudioRef.current.src = audioUrl;
      masterAudioRef.current.playbackRate = playbackSpeed;
      masterAudioRef.current.play().then(() => {
        showAmalToast(`سورۃ ${card.surahNameUrdu} (آیت ${card.ayahNumber}): اردو تفسیری ترجمہ و حکمت جاری ہے۔`, 'info');
      }).catch((err) => {
        if (err && (err.name === 'AbortError' || err.message?.includes('interrupted'))) return;
        console.warn('Tafseer play error:', err);
        setActiveTafseerCardKey(null);
      });
    }
  };

  const handlePlayContinuousTafseer = (cardsToPlay: QuranAyahWisdomCard[] = QURAN_WISDOM_COLLECTION, startIndex: number = 0) => {
    if (cardsToPlay.length === 0 || startIndex >= cardsToPlay.length) {
      handleStopAudio();
      setContinuousTafseerIndex(null);
      showAmalToast('تمام تفسیری حکمت مکمل ہو گئی۔', 'success');
      return;
    }

    const currentCard = cardsToPlay[startIndex];
    if (!currentCard) return;

    handleStopAudio();
    pauseGlobalPlayer();
    setContinuousTafseerIndex(startIndex);
    setAudioSyncMode('TAFSEER_BROADCAST');
    setActiveTafseerCardKey(`${currentCard.surahNumber}:${currentCard.ayahNumber}`);

    const audioUrl = getAyahUrduAudioUrl(currentCard.surahNumber, currentCard.ayahNumber);
    if (masterAudioRef.current) {
      masterAudioRef.current.src = audioUrl;
      masterAudioRef.current.playbackRate = playbackSpeed;
      masterAudioRef.current.onended = () => {
        handlePlayContinuousTafseer(cardsToPlay, startIndex + 1);
      };
      masterAudioRef.current.play().then(() => {
        showAmalToast(`اردو ترجمہ و حکمت: کارڈ ${startIndex + 1} از ${cardsToPlay.length} سنا جا رہا ہے...`, 'info');
      }).catch((e) => {
        if (e && (e.name === 'AbortError' || e.message?.includes('interrupted'))) return;
        console.warn('Continuous tafseer error:', e);
        handlePlayContinuousTafseer(cardsToPlay, startIndex + 1);
      });
    }
  };

  const handlePlaySurahFullSync = () => {
    handleStopAudio();
    setAudioSyncMode('TILAWAT_URDU_SYNC');
    handlePlayAyahAudio(1, 'ARABIC');
    showAmalToast(`سورۃ ${currentSurahMeta?.nameUrdu || ''}: تلاوت اور مستند اردو ترجمہ (Sync) شروع ہو گیا۔`, 'success');
  };

  const handlePlaySurahKanzulIman = () => {
    if (audioSyncMode === 'TILAWAT_URDU_SYNC' && playingAyahNumber !== null) {
      handleStopAudio();
      return;
    }
    handleStopAudio();
    setAudioSyncMode('TILAWAT_URDU_SYNC');
    handlePlayAyahAudio(1, 'ARABIC');
    showAmalToast(`سورۃ ${currentSurahMeta?.nameUrdu || ''}: تلاوت اور مستند اردو ترجمہ (2-Step Sync) شروع ہو گیا۔`, 'success');
  };

  const handlePlaySurahUrduOnly = () => {
    handleStopAudio();
    setAudioSyncMode('URDU_ONLY_CONTINUOUS');
    handlePlayAyahAudio(1, 'URDU');
    showAmalToast(`سورۃ ${currentSurahMeta?.nameUrdu || ''}: مکمل سورت کا صرف اردو ترجمہ (کنز الایمان) شروع ہو گیا۔`, 'success');
  };

  const handlePlaySurahTilawatOnly = () => {
    handleStopAudio();
    setAudioSyncMode('TILAWAT_ONLY');
    handlePlayAyahAudio(1, 'ARABIC');
    showAmalToast(`سورۃ ${currentSurahMeta?.nameUrdu || ''}: مکمل سورت کی عربی تلاوت شروع ہو گئی۔`, 'success');
  };

  const handlePlaySurahTafseer = () => {
    if (surahWideAudioType === 'TAFSEER') {
      if (masterAudioRef.current) {
        if (masterAudioRef.current.paused) {
          masterAudioRef.current.play().catch((e) => {
            if (e && (e.name === 'AbortError' || e.message?.includes('interrupted'))) return;
          });
          setIsPlayingPaused(false);
        } else {
          masterAudioRef.current.pause();
          setIsPlayingPaused(true);
        }
      }
      return;
    }
    handleStopAudio();
    pauseGlobalPlayer();

    const tafseerUrl = getSurahTafseerAudioUrl(selectedSurahNumber);
    if (tafseerUrl && masterAudioRef.current) {
      setSurahWideAudioType('TAFSEER');
      setAudioSyncMode('TAFSEER_BROADCAST');
      setIsPlayingPaused(false);
      masterAudioRef.current.src = tafseerUrl;
      masterAudioRef.current.playbackRate = playbackSpeed;
      masterAudioRef.current.play().then(() => {
        showAmalToast(`سورۃ ${currentSurahMeta?.nameUrdu || ''}: مستند تفسیری آڈیو (صراط الجنان / کنز الایمان) جاری ہے۔`, 'info');
      }).catch((e) => {
        if (e && (e.name === 'AbortError' || e.message?.includes('interrupted'))) return;
        console.warn('Tafseer studio error, falling back to sync mode:', e);
        handlePlaySurahFullSync();
      });
    } else {
      handlePlaySurahFullSync();
    }
  };

  // Lock-screen MediaSession API controls & notification display
  useEffect(() => {
    if (typeof window !== 'undefined' && 'mediaSession' in navigator && playingAyahNumber !== null) {
      const isUrdu = currentAudioSegment === 'URDU';
      const verse = currentSurah?.verses?.find((v) => v.ayahNumber === playingAyahNumber);
      
      const trackTitle = isUrdu
        ? `ترجمہ کنز الایمان - آیت ${playingAyahNumber}`
        : `سورۃ ${currentSurahMeta?.nameArabic || ''} (${currentSurahMeta?.nameTransliterated || ''}) · آیت ${playingAyahNumber}`;
        
      const qariDisplayMap = {
        alafasy: 'Qari Mishary Rashid Alafasy',
        husary: 'Shaykh Mahmoud Khalil Al-Husary',
        minshawi: 'Shaykh Muhammad Siddiq Al-Minshawi',
      };
      const artistName = isUrdu
        ? 'کنز الایمان فی ترجمۃ القرآن (امام احمد رضا خان) · 100% Human Voice'
        : qariDisplayMap[selectedQari];

      navigator.mediaSession.metadata = new MediaMetadata({
        title: trackTitle,
        artist: artistName,
        album: 'Al-Quran Al-Kareem & Wisdom · AMAL OS',
      });

      navigator.mediaSession.setActionHandler('play', () => {
        if (masterAudioRef.current) {
          masterAudioRef.current.play();
          setIsPlayingPaused(false);
        }
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        if (masterAudioRef.current) {
          masterAudioRef.current.pause();
          setIsPlayingPaused(true);
        }
      });
      navigator.mediaSession.setActionHandler('previoustrack', () => {
        if (playingAyahNumber > 1) {
          handlePlayAyahAudio(playingAyahNumber - 1, 'ARABIC');
        }
      });
      navigator.mediaSession.setActionHandler('nexttrack', () => {
        if (currentSurah && playingAyahNumber < currentSurah.verses.length) {
          handlePlayAyahAudio(playingAyahNumber + 1, 'ARABIC');
        }
      });
    }
  }, [playingAyahNumber, currentAudioSegment, selectedSurahNumber, selectedQari, currentSurah, currentSurahMeta]);

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

      {/* SINGLE MASTER AUDIO PLAYER — Prevents any multi-audio overlapping */}
      <audio
        ref={masterAudioRef}
        preload="auto"
        onEnded={handleMasterAudioEnded}
        onError={(e) => {
          // If no src attribute or src is empty/reset, ignore completely!
          const currentSrc = masterAudioRef.current?.getAttribute('src');
          if (!currentSrc || currentSrc.trim() === '' || currentSrc === window.location.href) {
            return;
          }

          console.warn('Master audio error on source:', currentSrc, e);

          // Intelligent multi-CDN failover: Switch to resilient secondary node before failing
          const endpoints = getSurahAudioEndpoints(selectedSurahNumber);
          const currentIdx = endpoints.findIndex((u) => currentSrc.includes(encodeURIComponent(u.split('/').pop() || '')));
          if (currentIdx !== -1 && currentIdx < endpoints.length - 1 && masterAudioRef.current) {
            const nextMirror = endpoints[currentIdx + 1];
            if (nextMirror) {
              console.info('Primary mirror throttled; cascading to resilient backup CDN:', nextMirror);
              masterAudioRef.current.src = nextMirror;
              masterAudioRef.current.play().catch(() => {});
              return;
            }
          }

          // Safely pause and unload without triggering recursive onError
          if (masterAudioRef.current) {
            masterAudioRef.current.pause();
            masterAudioRef.current.removeAttribute('src');
          }

          if (audioSyncMode === 'FULL_SYNC' || audioSyncMode === 'TILAWAT_URDU_SYNC') {
            handleMasterAudioEnded();
          } else {
            setPlayingAyahNumber(null);
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
                صحیح مدینہ عثمانی اعراب کے ساتھ تلاوت، <strong>کنز الایمان</strong> (امام احمد رضا خان)،
                اور <strong>خزائن العرفان</strong> (علامہ نعیم الدین مراد آبادی) کی تفسیری حکمت کے ساتھ روزمرہ دینی زندگی کا روحانی سفر۔
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

              {/* Prominent Visual View Mode Switcher */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, backgroundColor: 'rgba(0, 0, 0, 0.35)', padding: '6px 12px', borderRadius: 12, border: '1px solid rgba(52, 211, 153, 0.4)', width: 'fit-content', flexWrap: 'wrap' }}>
                <span style={{ fontSize: 12, color: '#A7F3D0', fontWeight: 800 }}>مطالعہ کا انداز (Display Mode):</span>
                <button
                  type="button"
                  onClick={() => setViewMode('FOCUS')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 8,
                    border: 'none',
                    fontSize: 12,
                    fontWeight: 800,
                    cursor: 'pointer',
                    backgroundColor: viewMode === 'FOCUS' ? '#34D399' : 'transparent',
                    color: viewMode === 'FOCUS' ? '#064E3B' : '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    boxShadow: viewMode === 'FOCUS' ? '0 2px 8px rgba(0,0,0,0.2)' : 'none',
                  }}
                >
                  <span>🎯</span>
                  <span>ایک ایک آیت فوکس (Single Ayah Focus)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('SCROLL')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 8,
                    border: 'none',
                    fontSize: 12,
                    fontWeight: 800,
                    cursor: 'pointer',
                    backgroundColor: viewMode === 'SCROLL' ? '#34D399' : 'transparent',
                    color: viewMode === 'SCROLL' ? '#064E3B' : '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    boxShadow: viewMode === 'SCROLL' ? '0 2px 8px rgba(0,0,0,0.2)' : 'none',
                  }}
                >
                  <span>📜</span>
                  <span>روایتی سکرول موڈ (Scroll View)</span>
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

        {/* SCHOLARLY CORPUS TRANSPARENCY NOTICE */}
        <div
          style={{
            backgroundColor: '#064E3B',
            borderRadius: 14,
            padding: '14px 20px',
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
            border: '1px solid #10B981',
            color: '#F0FDF4',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 22 }}>📜</span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#A7F3D0' }}>
                  Juz &apos;Amma &amp; Essential Surahs (37 Chapters) Complete Exegesis Edition
                </span>
                <span style={{ fontSize: 10, fontWeight: 800, backgroundColor: '#059669', color: '#FFF', padding: '2px 8px', borderRadius: 10 }}>
                  37 FULL EXEGESIS SURAHS
                </span>
                <span style={{ fontSize: 10, fontWeight: 800, backgroundColor: 'rgba(255,255,255,0.15)', color: '#D1FAE5', padding: '2px 8px', borderRadius: 10 }}>
                  114 SURAHS COMPLETE HUMAN AUDIO
                </span>
              </div>
              <p style={{ margin: '4px 0 0', fontSize: 12, color: '#D1D5DB', lineHeight: 1.5 }}>
                All 114 Surahs feature certified human recitation &amp; Kanz-ul-Iman translation audio. Surahs 1, 2, 36, 55, 56, 67, and 78–114 currently include comprehensive verse-by-verse Khaza&apos;in-ul-Irfan &amp; Bahar-e-Shariat cross-references; the remaining chapters are in active scholarly digitization.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: '#A7F3D0', fontWeight: 700 }}>
              جزء عم و سورتیں: مکمل تفسیر
            </span>
          </div>
        </div>

        {/* BANNER TO DEDICATED QURAN WISDOM CARDS PAGE */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            border: '1px solid #BBF7D0',
            padding: '18px 24px',
            marginBottom: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
            boxShadow: '0 2px 8px rgba(16, 185, 129, 0.06)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ fontSize: 32 }}>✨</span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                <span style={{ fontSize: 11, fontWeight: 800, backgroundColor: '#DCFCE7', color: '#166534', padding: '2px 8px', borderRadius: 6 }}>
                  مستقل صفحہ · DEDICATED PAGE
                </span>
                <span style={{ fontSize: 11, color: '#059669', fontWeight: 700 }}>
                  ۴۲ منتخب آیات مبارکہ (جزء عم)
                </span>
              </div>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#0F172A' }}>
                قرآنی حکمت، تدبر و عمل (Quran Wisdom Cards)
              </h3>
              <p style={{ margin: '2px 0 0', fontSize: 12, color: '#64748B' }}>
                کنز الایمان کا ترجمہ، خزائن العرفان کی تفسیری ابحاث اور روزمرہ دینی زندگی کے لیے مسنون عمل
              </p>
            </div>
          </div>

          <Link
            href="/wisdom"
            style={{
              padding: '10px 20px',
              borderRadius: 10,
              backgroundColor: '#065F46',
              color: '#FFFFFF',
              textDecoration: 'none',
              fontWeight: 800,
              fontSize: 13,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 2px 6px rgba(6, 95, 70, 0.25)',
            }}
          >
            <span>تمام ۴۲ حکمت کارڈز کھولیں</span>
            <span>➔</span>
          </Link>
        </div>

        {/* SECTION 2 & 3: SURAHS DIRECTORY & IN-APP READER */}
        <section style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 24, alignItems: 'start' }}>
          {/* LEFT: 114 Surahs Directory Sidebar */}
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

          {/* RIGHT: Active Surah Reader & Continuous Player */}
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
            onOpenWisdomModal={(sNum, aNum) => setActiveWisdomAyah({ surahNumber: sNum, ayahNumber: aNum })}
            viewMode={viewMode}
            setViewMode={setViewMode}
            focusedAyahNumber={focusedAyahNumber}
            setFocusedAyahNumber={setFocusedAyahNumber}
          />
        </section>
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
        onOpenWisdomModal={(sNum, aNum) => setActiveWisdomAyah({ surahNumber: sNum, ayahNumber: aNum })}
        selectedSurahNumber={selectedSurahNumber}
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
          fallbackArabic={currentSurah?.verses?.find((v) => v.ayahNumber === activeWisdomAyah.ayahNumber)?.textArabic}
          fallbackUrdu={currentSurah?.verses?.find((v) => v.ayahNumber === activeWisdomAyah.ayahNumber)?.textUrdu}
          fallbackEnglish={currentSurah?.verses?.find((v) => v.ayahNumber === activeWisdomAyah.ayahNumber)?.textEnglish}
        />
      )}
    </div>
  );
}
