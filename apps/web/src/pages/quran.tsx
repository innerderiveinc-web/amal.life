import React, { useState, useEffect, useMemo, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Navigation } from '../components/Navigation';
import { AmalTheme } from '@amal/ui';
import { QURAN_SURAHS_COLLECTION, QuranSurahData } from '../lib/quran-surahs-data';
import { ALL_114_SURAHS, QuranSurahMeta } from '../lib/quran-114-directory';
import { QURAN_WISDOM_COLLECTION, QuranAyahWisdomCard, getAyahWisdomCard, getSurahWisdomCards, getAyahAudioUrl, getAyahUrduAudioUrl, getSurahKanzulImanAudioUrl, getSurahTafseerAudioUrl } from '../lib/quran-wisdom-data';
import { getAyahRomanTransliteration, getAyahRomanUrduTarjuma } from '../lib/quran-roman-urdu';
import { AyahWisdomModal } from '../components/AyahWisdomModal';
import { showAmalToast } from '../components/Toast';
import { useAudioPlayer } from '../context/AudioPlayerContext';

type ExperienceMode = 'QUICK_2MIN' | 'DAILY_5MIN' | 'DEEP_15MIN';
export type AudioSyncMode = 'FULL_SYNC' | 'TILAWAT_URDU_SYNC' | 'TILAWAT_ONLY' | 'URDU_ONLY_CONTINUOUS' | 'TAFSEER_BROADCAST';
export type AudioSegment = 'ARABIC' | 'URDU' | 'TAFSEER';

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
  const [showRomanUrdu, setShowRomanUrdu] = useState<boolean>(true);
  const [bookmarkedCardIds, setBookmarkedCardIds] = useState<string[]>([]);

  // Reader & Wisdom Modal State
  const [activeWisdomAyah, setActiveWisdomAyah] = useState<{ surahNumber: number; ayahNumber: number } | null>(null);

  // Audio Playback & Sync State
  const [playingAyahNumber, setPlayingAyahNumber] = useState<number | null>(null);
  const [audioSyncMode, setAudioSyncMode] = useState<AudioSyncMode>('FULL_SYNC');
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

    if (audioSyncMode === 'FULL_SYNC') {
      // 3-Stage: ARABIC -> URDU -> TAFSEER -> Next Ayah
      if (currentAudioSegment === 'ARABIC') {
        handlePlayAyahAudio(playingAyahNumber, 'URDU');
      } else if (currentAudioSegment === 'URDU') {
        handlePlayAyahAudio(playingAyahNumber, 'TAFSEER');
      } else if (currentAudioSegment === 'TAFSEER') {
        if (playingAyahNumber < totalVerses) {
          handlePlayAyahAudio(playingAyahNumber + 1, 'ARABIC');
        } else {
          handleStopAudio();
          showAmalToast(`سورۃ ${currentSurahMeta?.nameUrdu || ''}: مکمل تلاوت، ترجمہ و تفسیری سلسلہ مکمل ہو گیا۔`, 'success');
        }
      }
    } else if (audioSyncMode === 'TILAWAT_URDU_SYNC') {
      // 2-Stage: ARABIC -> URDU -> Next Ayah
      if (currentAudioSegment === 'ARABIC') {
        handlePlayAyahAudio(playingAyahNumber, 'URDU');
      } else {
        if (playingAyahNumber < totalVerses) {
          handlePlayAyahAudio(playingAyahNumber + 1, 'ARABIC');
        } else {
          handleStopAudio();
          showAmalToast(`سورۃ ${currentSurahMeta?.nameUrdu || ''}: تلاوت و ترجمہ مکمل ہو گیا۔`, 'success');
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
    setAudioSyncMode('FULL_SYNC');
    handlePlayAyahAudio(1, 'ARABIC');
    showAmalToast(`سورۃ ${currentSurahMeta?.nameUrdu || ''}: تلاوت + ترجمہ + تفسیری حکمت (3-Step Sync) شروع ہو گیا۔`, 'success');
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
        showAmalToast(`سورۃ ${currentSurahMeta?.nameUrdu || ''}: دعوتِ اسلامی کی مستند تفسیری آڈیو (صراط الجنان / کنز الایمان) جاری ہے۔`, 'info');
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
        ? 'کنز الایمان (اعلیٰ حضرت امام احمد رضا خان) · 100% Human Voice'
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
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                {/* 1. Full Surah Tilawat + Tarjuma Kanz-ul-Iman Sync */}
                <button
                  type="button"
                  onClick={handlePlaySurahKanzulIman}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 8,
                    backgroundColor: (audioSyncMode === 'FULL_SYNC' || audioSyncMode === 'TILAWAT_URDU_SYNC') && playingAyahNumber !== null ? '#047857' : '#166534',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    boxShadow: '0 2px 6px rgba(22, 101, 52, 0.3)',
                  }}
                  title="عربی تلاوت اور کنز الایمان کا مستند اردو ترجمہ آیت در آیت خودکار سنیں"
                >
                  <span>🎧</span>
                  <span>{(audioSyncMode === 'FULL_SYNC' || audioSyncMode === 'TILAWAT_URDU_SYNC') && playingAyahNumber !== null ? '⏸ تلاوت و ترجمہ موقوف' : 'تلاوت + اردو ترجمہ (Sync)'}</span>
                </button>

                {/* 2. Entire Urdu Tarjuma Continuous in One Go */}
                <button
                  type="button"
                  onClick={handlePlaySurahUrduOnly}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 8,
                    backgroundColor: (audioSyncMode === 'URDU_ONLY_CONTINUOUS' && playingAyahNumber !== null) ? '#0369A1' : '#0284C7',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    boxShadow: '0 2px 4px rgba(2, 132, 199, 0.2)',
                  }}
                  title="پوری سورت کا صرف اردو ترجمہ کنز الایمان بغیر کسی وقفے کے ایک ساتھ سنیں"
                >
                  <span>🎙️</span>
                  <span>{audioSyncMode === 'URDU_ONLY_CONTINUOUS' && playingAyahNumber !== null ? '⏸ ترجمہ موقوف' : 'صرف اردو ترجمہ (ایک ساتھ)'}</span>
                </button>

                {/* 3. Full Surah Studio Tafseer Audio (Dawat-e-Islami Sirat-ul-Jinan) */}
                <button
                  type="button"
                  onClick={handlePlaySurahTafseer}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 8,
                    backgroundColor: (surahWideAudioType === 'TAFSEER' || audioSyncMode === 'TAFSEER_BROADCAST') ? '#92400E' : '#FFFBEB',
                    color: (surahWideAudioType === 'TAFSEER' || audioSyncMode === 'TAFSEER_BROADCAST') ? '#FFFFFF' : '#92400E',
                    border: '1px solid #FDE68A',
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                  title="دعوتِ اسلامی کی مستند تفسیر صراط الجنان سٹوڈیو آڈیو ایک ساتھ سنیں"
                >
                  <span>📖</span>
                  <span>{(surahWideAudioType === 'TAFSEER' || audioSyncMode === 'TAFSEER_BROADCAST') ? (isPlayingPaused ? '▶ جاری رکھیں' : '⏸ تفسیر موقوف') : 'مکمل تفسیر صراط الجنان (ایک ساتھ)'}</span>
                </button>

                {/* 4. Continuous Arabic Tilawat Only */}
                <button
                  type="button"
                  onClick={handlePlaySurahTilawatOnly}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 8,
                    backgroundColor: (audioSyncMode === 'TILAWAT_ONLY' && playingAyahNumber !== null) ? '#0F766E' : '#F1F5F9',
                    color: (audioSyncMode === 'TILAWAT_ONLY' && playingAyahNumber !== null) ? '#FFFFFF' : '#334155',
                    border: '1px solid #CBD5E1',
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                  title="مکمل سورت کی صرف عربی تلاوت مسلسل سنیں"
                >
                  <span>▶</span>
                  <span>{audioSyncMode === 'TILAWAT_ONLY' && playingAyahNumber !== null ? '⏸ تلاوت موقوف' : 'صرف عربی تلاوت'}</span>
                </button>

                {/* 5. Clean Settings & Download Drawer Toggle */}
                <button
                  type="button"
                  onClick={() => setIsSurahSettingsOpen(!isSurahSettingsOpen)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 8,
                    backgroundColor: isSurahSettingsOpen ? '#1E293B' : '#F1F5F9',
                    color: isSurahSettingsOpen ? '#FFFFFF' : '#475569',
                    border: '1px solid #CBD5E1',
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                  title="قاری، رفتار، آف لائن کیش اور فونٹ ترتیبات"
                >
                  <span>⚙️</span>
                  <span>{isSurahSettingsOpen ? 'اختیارات بند کریں ▲' : 'مزید اختیارات ▼'}</span>
                </button>
              </div>
            </div>

            {/* EXPANDABLE SERENE SETTINGS & OFFLINE PANEL */}
            {isSurahSettingsOpen && (
              <div
                style={{
                  padding: '16px 24px',
                  backgroundColor: '#F8FAFC',
                  borderBottom: '1px solid #E2E8F0',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 16,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                {/* Qari Selector */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#475569' }}>قاری:</span>
                  <div style={{ display: 'flex', gap: 2, backgroundColor: '#E2E8F0', padding: 2, borderRadius: 6 }}>
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
                    <button
                      onClick={() => setSelectedQari('minshawi')}
                      style={{
                        padding: '4px 8px',
                        borderRadius: 4,
                        fontSize: 11,
                        fontWeight: selectedQari === 'minshawi' ? 800 : 500,
                        border: 'none',
                        cursor: 'pointer',
                        backgroundColor: selectedQari === 'minshawi' ? '#166534' : 'transparent',
                        color: selectedQari === 'minshawi' ? '#FFFFFF' : '#334155',
                      }}
                    >
                      المنشاوی
                    </button>
                  </div>
                </div>

                {/* Playback Speed Selector */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#475569' }}>رفتار:</span>
                  <div style={{ display: 'flex', gap: 2, backgroundColor: '#E2E8F0', padding: 2, borderRadius: 6 }}>
                    {[0.75, 1, 1.25, 1.5].map((speed) => (
                      <button
                        key={speed}
                        type="button"
                        onClick={() => setPlaybackSpeed(speed)}
                        style={{
                          padding: '3px 7px',
                          borderRadius: 4,
                          fontSize: 11,
                          fontWeight: 800,
                          border: 'none',
                          backgroundColor: playbackSpeed === speed ? '#166534' : 'transparent',
                          color: playbackSpeed === speed ? '#FFFFFF' : '#64748B',
                          cursor: 'pointer',
                        }}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                </div>

                {/* Offline Caching & Download Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button
                    type="button"
                    onClick={handleCacheSurahOffline}
                    disabled={isCachingSurah}
                    style={{
                      padding: '5px 12px',
                      borderRadius: 6,
                      backgroundColor: isSurahCachedOffline ? '#DCFCE7' : '#FFFFFF',
                      color: isSurahCachedOffline ? '#166534' : '#334155',
                      border: '1px solid',
                      borderColor: isSurahCachedOffline ? '#86EFAC' : '#CBD5E1',
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: isCachingSurah ? 'wait' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                    title="اس سورت کی آڈیو کو براؤزر میں آف لائن سننے کے لیے محفوظ کریں"
                  >
                    <span>{isSurahCachedOffline ? '✓' : '📥'}</span>
                    <span>{isCachingSurah ? 'محفوظ ہو رہا ہے...' : isSurahCachedOffline ? 'آف لائن محفوظ ہے' : 'آف لائن کیش'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadSurahAudio}
                    style={{
                      padding: '5px 10px',
                      borderRadius: 6,
                      backgroundColor: '#FFFFFF',
                      color: '#334155',
                      border: '1px solid #CBD5E1',
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                    title="سورت کی MP3 فائل ڈاؤنلوڈ کریں"
                  >
                    <span>💾</span>
                    <span>MP3 فائل</span>
                  </button>
                </div>

                {/* Roman Urdu & Font Size */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button
                    onClick={() => setShowRomanUrdu(!showRomanUrdu)}
                    style={{
                      padding: '5px 10px',
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: 700,
                      border: '1px solid',
                      borderColor: showRomanUrdu ? '#0284C7' : '#CBD5E1',
                      backgroundColor: showRomanUrdu ? '#E0F2FE' : '#FFFFFF',
                      color: showRomanUrdu ? '#0369A1' : '#64748B',
                      cursor: 'pointer',
                    }}
                  >
                    {showRomanUrdu ? 'Roman: ON' : 'Roman: OFF'}
                  </button>

                  <div style={{ display: 'flex', gap: 2, alignItems: 'center', backgroundColor: '#E2E8F0', padding: '2px 6px', borderRadius: 6 }}>
                    <button
                      onClick={() => setFontSize((s) => Math.max(18, s - 2))}
                      style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, color: '#475569' }}
                    >
                      A-
                    </button>
                    <span style={{ fontSize: 11, color: '#475569', padding: '0 4px', fontWeight: 600 }}>{fontSize}px</span>
                    <button
                      onClick={() => setFontSize((s) => Math.min(36, s + 2))}
                      style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, color: '#475569' }}
                    >
                      A+
                    </button>
                  </div>
                </div>
              </div>
            )}

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
                            onClick={() => {
                              if (isPlayingThis && currentAudioSegment === 'ARABIC') {
                                if (masterAudioRef.current) {
                                  if (masterAudioRef.current.paused) {
                                    masterAudioRef.current.play().catch(() => {});
                                    setIsPlayingPaused(false);
                                  } else {
                                    masterAudioRef.current.pause();
                                    setIsPlayingPaused(true);
                                  }
                                }
                              } else {
                                handlePlayAyahAudio(verse.ayahNumber, 'ARABIC');
                              }
                            }}
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
                            <span>{isPlayingThis ? (isPlayingPaused ? '▶' : '⏸') : '▶'}</span>
                            <span>
                              {isPlayingThis
                                ? (currentAudioSegment === 'URDU'
                                    ? (isPlayingPaused ? 'ترجمہ موقوف' : '🎧 ترجمہ جاری')
                                    : (isPlayingPaused ? 'تلاوت موقوف' : '🎙️ تلاوت جاری'))
                                : 'تلاوت سنیں'}
                            </span>
                          </button>

                          {/* Quick Urdu Tarjuma Audio button for this verse */}
                          <button
                            onClick={() => {
                              if (isPlayingThis && currentAudioSegment === 'URDU') {
                                if (masterAudioRef.current) {
                                  if (masterAudioRef.current.paused) {
                                    masterAudioRef.current.play().catch(() => {});
                                    setIsPlayingPaused(false);
                                  } else {
                                    masterAudioRef.current.pause();
                                    setIsPlayingPaused(true);
                                  }
                                }
                              } else {
                                handlePlayAyahAudio(verse.ayahNumber, 'URDU');
                              }
                            }}
                            style={{
                              padding: '3px 8px',
                              borderRadius: 6,
                              fontSize: 10,
                              fontWeight: 700,
                              cursor: 'pointer',
                              border: '1px solid',
                              borderColor: isPlayingThis && currentAudioSegment === 'URDU' ? '#047857' : '#E2E8F0',
                              backgroundColor: isPlayingThis && currentAudioSegment === 'URDU' ? '#FEF3C7' : '#F8FAFC',
                              color: isPlayingThis && currentAudioSegment === 'URDU' ? '#92400E' : '#64748B',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 3,
                            }}
                            title="صرف اردو ترجمہ سماعت فرمائیں"
                          >
                            <span>🎧</span>
                            <span>اردو آڈیو</span>
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

      {/* PERSISTENT FLOATING AUDIO PLAYER (LOCK-SCREEN & PLAYBACK CONTROLS) */}
      {(playingAyahNumber !== null || surahWideAudioType !== null || activeTafseerCardKey !== null) && (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1100,
            background: 'linear-gradient(135deg, #064E3B 0%, #0F291E 100%)',
            color: '#FFFFFF',
            boxShadow: '0 -8px 30px rgba(0, 0, 0, 0.35)',
            borderTop: '2px solid #10B981',
            padding: '12px 20px',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div
            style={{
              maxWidth: 1140,
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            {/* Left: Current Track Meta */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 260, flex: 1 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  backgroundColor:
                    surahWideAudioType === 'KANZUL_IMAN'
                      ? '#D97706'
                      : surahWideAudioType === 'TAFSEER'
                        ? '#B45309'
                        : activeTafseerCardKey !== null
                          ? '#92400E'
                          : currentAudioSegment === 'URDU'
                            ? '#D97706'
                            : '#059669',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  flexShrink: 0,
                  boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                }}
              >
                {surahWideAudioType === 'KANZUL_IMAN'
                  ? '🎧'
                  : surahWideAudioType === 'TAFSEER'
                    ? '📖'
                    : activeTafseerCardKey !== null
                      ? '🔊'
                      : currentAudioSegment === 'URDU'
                        ? '🎧'
                        : '🎙️'}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: 10,
                      backgroundColor:
                        surahWideAudioType === 'KANZUL_IMAN'
                          ? '#FEF3C7'
                          : surahWideAudioType === 'TAFSEER'
                            ? '#FEF3C7'
                            : activeTafseerCardKey !== null
                              ? '#FEF3C7'
                              : currentAudioSegment === 'URDU'
                                ? '#FEF3C7'
                                : '#DCFCE7',
                      color:
                        surahWideAudioType === 'KANZUL_IMAN' || surahWideAudioType === 'TAFSEER' || activeTafseerCardKey !== null || currentAudioSegment === 'URDU'
                          ? '#92400E'
                          : '#166534',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {surahWideAudioType === 'KANZUL_IMAN'
                      ? 'مکمل سورت + ترجمہ کنز الایمان'
                      : surahWideAudioType === 'TAFSEER'
                        ? 'مکمل اردو تفسیر آڈیو'
                        : activeTafseerCardKey !== null
                          ? 'خزائن العرفان (تفسیری حکمت)'
                          : currentAudioSegment === 'URDU'
                            ? 'اردو ترجمہ (کنز الایمان)'
                            : 'عربی تلاوت'}
                  </span>
                  <span style={{ fontSize: 11, color: '#A7F3D0', fontWeight: 600 }}>
                    {surahWideAudioType === 'KANZUL_IMAN'
                      ? '100% Real Human Voice (مولانا عبد الحبیب عطاری)'
                      : surahWideAudioType === 'TAFSEER'
                        ? 'مستند سٹوڈیو تفسیر'
                        : activeTafseerCardKey !== null
                          ? 'صدر الافاضل مولانا نعیم الدین مراد آبادی'
                          : currentAudioSegment === 'URDU'
                            ? '100% Real Human Voice'
                            : (selectedQari === 'alafasy'
                                ? 'مشاری العفاسی'
                                : selectedQari === 'husary'
                                  ? 'محمود خلیل الحصری'
                                  : 'محمد صدیق المنشاوی')}
                  </span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {surahWideAudioType
                    ? `سورۃ ${currentSurahMeta?.nameUrdu} (${currentSurahMeta?.nameTransliterated})`
                    : activeTafseerCardKey
                      ? `حکمت و تفسیری عبارت کی صوتی قرأت`
                      : `سورۃ ${currentSurahMeta?.nameUrdu} (${currentSurahMeta?.nameTransliterated}) · آیت ${playingAyahNumber}`}
                </div>
              </div>
            </div>

            {/* Center: Playback Controls (Prev, Play/Pause, Next) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
              <button
                onClick={() => {
                  if (playingAyahNumber !== null && playingAyahNumber > 1) {
                    handlePlayAyahAudio(playingAyahNumber - 1, currentAudioSegment);
                  }
                }}
                disabled={playingAyahNumber === null || playingAyahNumber <= 1}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  backgroundColor: (playingAyahNumber === null || playingAyahNumber <= 1) ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)',
                  color: (playingAyahNumber === null || playingAyahNumber <= 1) ? '#6B7280' : '#FFFFFF',
                  border: 'none',
                  fontSize: 14,
                  cursor: (playingAyahNumber === null || playingAyahNumber <= 1) ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title="پچھلی آیت"
              >
                ⏮
              </button>

              <button
                onClick={() => {
                  if (masterAudioRef.current) {
                    if (masterAudioRef.current.paused) {
                      masterAudioRef.current.play().catch(() => {});
                      setIsPlayingPaused(false);
                    } else {
                      masterAudioRef.current.pause();
                      setIsPlayingPaused(true);
                    }
                  }
                }}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  backgroundColor: '#10B981',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: 20,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)',
                }}
                title={isPlayingPaused ? 'چلائیں' : 'وقفہ'}
              >
                {isPlayingPaused ? '▶' : '⏸'}
              </button>

              <button
                onClick={() => {
                  if (playingAyahNumber !== null && currentSurah && playingAyahNumber < currentSurah.verses.length) {
                    handlePlayAyahAudio(playingAyahNumber + 1, currentAudioSegment);
                  }
                }}
                disabled={playingAyahNumber === null || !currentSurah || playingAyahNumber >= currentSurah.verses.length}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  backgroundColor: (playingAyahNumber === null || !currentSurah || playingAyahNumber >= currentSurah.verses.length) ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)',
                  color: (playingAyahNumber === null || !currentSurah || playingAyahNumber >= currentSurah.verses.length) ? '#6B7280' : '#FFFFFF',
                  border: 'none',
                  fontSize: 14,
                  cursor: (playingAyahNumber === null || !currentSurah || playingAyahNumber >= currentSurah.verses.length) ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title="اگلی آیت"
              >
                ⏭
              </button>
            </div>

            {/* Right: Audio Speed, Sync Mode Switch, Cache, Wisdom & Close */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              {/* Playback Speed Pill Group */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 2, backgroundColor: 'rgba(255,255,255,0.12)', padding: '2px 4px', borderRadius: 16 }}>
                {[0.75, 1, 1.25, 1.5].map((speed) => (
                  <button
                    key={speed}
                    type="button"
                    onClick={() => setPlaybackSpeed(speed)}
                    style={{
                      padding: '2px 6px',
                      borderRadius: 10,
                      fontSize: 10,
                      fontWeight: 800,
                      border: 'none',
                      backgroundColor: playbackSpeed === speed ? '#10B981' : 'transparent',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                    }}
                    title={`رفتار ${speed}x`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleCacheSurahOffline}
                disabled={isCachingSurah}
                style={{
                  padding: '6px 10px',
                  borderRadius: 20,
                  fontSize: 11,
                  fontWeight: 700,
                  backgroundColor: isSurahCachedOffline ? '#065F46' : 'rgba(255,255,255,0.15)',
                  color: '#FFFFFF',
                  border: isSurahCachedOffline ? '1px solid #34D399' : 'none',
                  cursor: isCachingSurah ? 'wait' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
                title="سورت کو آف لائن کیش کریں"
              >
                <span>{isSurahCachedOffline ? '✓' : '📥'}</span>
                <span>{isSurahCachedOffline ? 'محفوظ ہے' : 'آف لائن کیش'}</span>
              </button>

              <button
                onClick={() => setAudioSyncMode((prev) => {
                  if (prev === 'FULL_SYNC' || prev === 'TILAWAT_URDU_SYNC') return 'URDU_ONLY_CONTINUOUS';
                  if (prev === 'URDU_ONLY_CONTINUOUS') return 'TILAWAT_ONLY';
                  return 'FULL_SYNC';
                })}
                style={{
                  padding: '6px 12px',
                  borderRadius: 20,
                  fontSize: 11,
                  fontWeight: 700,
                  backgroundColor: (audioSyncMode === 'FULL_SYNC' || audioSyncMode === 'TILAWAT_URDU_SYNC') ? '#10B981' : audioSyncMode === 'URDU_ONLY_CONTINUOUS' ? '#0284C7' : 'rgba(255,255,255,0.15)',
                  color: '#FFFFFF',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
                title="آڈیو موڈ تبدیل کریں (تلاوت + اردو / صرف اردو / صرف تلاوت)"
              >
                <span>
                  {audioSyncMode === 'FULL_SYNC' || audioSyncMode === 'TILAWAT_URDU_SYNC'
                    ? '🎧 تلاوت + اردو (Sync)'
                    : audioSyncMode === 'URDU_ONLY_CONTINUOUS'
                      ? '🎙️ صرف اردو ترجمہ'
                      : audioSyncMode === 'TAFSEER_BROADCAST'
                        ? '📖 تفسیر سٹوڈیو'
                        : '🎙️ صرف عربی تلاوت'}
                </span>
              </button>

              <button
                onClick={() => setActiveWisdomAyah({ surahNumber: selectedSurahNumber, ayahNumber: playingAyahNumber || 1 })}
                style={{
                  padding: '6px 12px',
                  borderRadius: 20,
                  fontSize: 11,
                  fontWeight: 700,
                  backgroundColor: '#FEF3C7',
                  color: '#92400E',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <span>📖</span>
                <span>حکمت و تفسیر</span>
              </button>

              <button
                onClick={handleStopAudio}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#E2E8F0',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title="بند کریں"
              >
                ✕
              </button>
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
