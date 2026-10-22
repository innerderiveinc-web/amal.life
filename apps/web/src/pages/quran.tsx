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

type ExperienceMode = 'QUICK_2MIN' | 'DAILY_5MIN' | 'DEEP_15MIN';
type AudioSyncMode = 'TILAWAT_URDU_SYNC' | 'TILAWAT_ONLY' | 'URDU_ONLY_CONTINUOUS' | 'TAFSEER_CONTINUOUS';

export default function QuranWisdomPage() {
  const router = useRouter();
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
  const [audioSyncMode, setAudioSyncMode] = useState<AudioSyncMode>('TILAWAT_URDU_SYNC');
  const [currentAudioSegment, setCurrentAudioSegment] = useState<'ARABIC' | 'URDU'>('ARABIC');
  const [isPlayingPaused, setIsPlayingPaused] = useState<boolean>(false);
  const [activeTafseerCardKey, setActiveTafseerCardKey] = useState<string | null>(null);
  const [surahWideAudioType, setSurahWideAudioType] = useState<'KANZUL_IMAN' | 'TAFSEER' | null>(null);
  const [continuousTafseerIndex, setContinuousTafseerIndex] = useState<number | null>(null);

  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isSurahCachedOffline, setIsSurahCachedOffline] = useState<boolean>(false);
  const [isCachingSurah, setIsCachingSurah] = useState<boolean>(false);
  const [isSurahSettingsOpen, setIsSurahSettingsOpen] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const surahWideAudioRef = useRef<HTMLAudioElement | null>(null);
  const tafseerAudioRef = useRef<HTMLAudioElement | null>(null);

  // Sync playback rate across all active audio elements
  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = playbackSpeed;
    if (surahWideAudioRef.current) surahWideAudioRef.current.playbackRate = playbackSpeed;
    if (tafseerAudioRef.current) tafseerAudioRef.current.playbackRate = playbackSpeed;
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

  const handlePlayAyahAudio = (ayahNum: number, segment: 'ARABIC' | 'URDU' = 'ARABIC') => {
    if (playingAyahNumber === ayahNum && currentAudioSegment === segment) {
      if (audioRef.current) {
        if (audioRef.current.paused) {
          audioRef.current.play();
          setIsPlayingPaused(false);
        } else {
          audioRef.current.pause();
          setIsPlayingPaused(true);
        }
      }
      return;
    }

    setPlayingAyahNumber(ayahNum);
    setCurrentAudioSegment(segment);
    setIsPlayingPaused(false);

    const url = segment === 'URDU'
      ? getAyahUrduAudioUrl(selectedSurahNumber, ayahNum)
      : getAyahAudioUrl(selectedSurahNumber, ayahNum, selectedQari);

    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.play().catch((e) => console.warn('Audio play prevented:', e));
    }
  };

  const handleAyahAudioEnded = () => {
    if (playingAyahNumber === null) return;

    if (audioSyncMode === 'TILAWAT_URDU_SYNC' && currentAudioSegment === 'ARABIC') {
      // Transition from Arabic recitation to authentic Urdu Tarjuma (Human Voice)
      handlePlayAyahAudio(playingAyahNumber, 'URDU');
    } else if (audioSyncMode === 'URDU_ONLY_CONTINUOUS') {
      // Advance to next Ayah Urdu Tarjuma immediately (Continuous Translation Only)
      if (currentSurah && playingAyahNumber < currentSurah.verses.length) {
        handlePlayAyahAudio(playingAyahNumber + 1, 'URDU');
      } else {
        setPlayingAyahNumber(null);
        setCurrentAudioSegment('URDU');
        setIsPlayingPaused(false);
        showAmalToast(`سورۃ ${currentSurahMeta?.nameUrdu || ''} کا مکمل اردو ترجمہ مکمل ہو گیا۔`, 'success');
      }
    } else {
      // Transition to next Ayah Arabic recitation
      if (currentSurah && playingAyahNumber < currentSurah.verses.length) {
        handlePlayAyahAudio(playingAyahNumber + 1, 'ARABIC');
      } else {
        setPlayingAyahNumber(null);
        setCurrentAudioSegment('ARABIC');
        setIsPlayingPaused(false);
      }
    }
  };

  const handleStopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
    if (surahWideAudioRef.current) {
      surahWideAudioRef.current.pause();
      surahWideAudioRef.current.src = '';
    }
    if (tafseerAudioRef.current) {
      tafseerAudioRef.current.pause();
      tafseerAudioRef.current.src = '';
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setPlayingAyahNumber(null);
    setCurrentAudioSegment('ARABIC');
    setIsPlayingPaused(false);
    setSurahWideAudioType(null);
    setActiveTafseerCardKey(null);
    setContinuousTafseerIndex(null);
  };

  const handlePlayTafseerWisdomAudio = (card: QuranAyahWisdomCard) => {
    const cardKey = `${card.surahNumber}:${card.ayahNumber}`;
    if (activeTafseerCardKey === cardKey) {
      handleStopAudio();
      return;
    }

    handleStopAudio();
    setActiveTafseerCardKey(cardKey);

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        window.speechSynthesis.resume();
        const textToSpeak = `خزائن العرفان، صدر الافاضل مولانا سید محمد نعیم الدین مراد آبادی۔ سورت ${card.surahNameUrdu}، آیت ${card.ayahNumber}۔ ${card.tafseerKhazainUlIrfan.excerptUrdu}۔ تدبر کا سوال: ${card.tadabburPrompt.questionUrdu}`;
        const utter = new SpeechSynthesisUtterance(textToSpeak);
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find((v) => 
          v.lang.startsWith('ur') || v.lang.startsWith('ar') || v.lang.startsWith('hi')
        );
        if (preferredVoice) utter.voice = preferredVoice;
        utter.lang = preferredVoice?.lang || 'ur-PK';
        utter.rate = playbackSpeed ? Math.max(0.7, Math.min(1.4, playbackSpeed * 0.9)) : 0.9;

        utter.onend = () => {
          setActiveTafseerCardKey(null);
        };
        utter.onerror = (e) => {
          console.warn('Speech error:', e);
          setActiveTafseerCardKey(null);
        };

        window.speechSynthesis.speak(utter);
        showAmalToast(`تفسیر خزائن العرفان (آیت ${card.ayahNumber}) کی صوتی تلاوت شروع ہو گئی`, 'info');
      } catch (err) {
        console.error('Failed to trigger speech synthesis:', err);
        setActiveTafseerCardKey(null);
        showAmalToast('معذرت! اس ڈیوائس پر تفسیر آڈیو کی سہولت فعال نہیں ہو سکی۔', 'warning');
      }
    } else {
      showAmalToast('معذرت! آپ کے براؤزر میں آڈیو تقریر کی سہولت دستیاب نہیں ہے۔', 'warning');
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
    setContinuousTafseerIndex(startIndex);
    setAudioSyncMode('TAFSEER_CONTINUOUS');
    setActiveTafseerCardKey(`${currentCard.surahNumber}:${currentCard.ayahNumber}`);

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        window.speechSynthesis.resume();
        const textToSpeak = `خزائن العرفان، صدر الافاضل مولانا سید محمد نعیم الدین مراد آبادی۔ سورت ${currentCard.surahNameUrdu}، آیت ${currentCard.ayahNumber}۔ ${currentCard.tafseerKhazainUlIrfan.excerptUrdu}۔ تدبر کا سوال: ${currentCard.tadabburPrompt.questionUrdu}`;
        const utter = new SpeechSynthesisUtterance(textToSpeak);
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find((v) => 
          v.lang.startsWith('ur') || v.lang.startsWith('ar') || v.lang.startsWith('hi')
        );
        if (preferredVoice) utter.voice = preferredVoice;
        utter.lang = preferredVoice?.lang || 'ur-PK';
        utter.rate = playbackSpeed ? Math.max(0.7, Math.min(1.4, playbackSpeed * 0.9)) : 0.9;
        
        utter.onend = () => {
          handlePlayContinuousTafseer(cardsToPlay, startIndex + 1);
        };
        utter.onerror = (e) => {
          console.warn('Continuous tafseer error:', e);
          setActiveTafseerCardKey(null);
          setContinuousTafseerIndex(null);
        };
        window.speechSynthesis.speak(utter);
        showAmalToast(`خزائن العرفان تفسیری بیان: کارڈ ${startIndex + 1} از ${cardsToPlay.length} سنا جا رہا ہے...`, 'info');
      } catch (err) {
        console.warn('Speech error:', err);
        setActiveTafseerCardKey(null);
        setContinuousTafseerIndex(null);
      }
    }
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

  const handlePlaySurahKanzulIman = () => {
    if (audioSyncMode === 'TILAWAT_URDU_SYNC' && playingAyahNumber !== null) {
      handleStopAudio();
      return;
    }
    handleStopAudio();
    setAudioSyncMode('TILAWAT_URDU_SYNC');
    handlePlayAyahAudio(1, 'ARABIC');
    showAmalToast(`سورۃ ${currentSurahMeta?.nameUrdu || ''}: تلاوت اور مستند اردو ترجمہ (کنز الایمان) شروع ہو گیا۔`, 'success');
  };

  const handlePlaySurahTafseer = () => {
    if (surahWideAudioType === 'TAFSEER') {
      handleStopAudio();
      return;
    }
    handleStopAudio();
    
    const surahCards = getSurahWisdomCards(selectedSurahNumber);
    if (surahCards.length > 0 && surahCards[0]) {
      setSurahWideAudioType('TAFSEER');
      handlePlayContinuousTafseer(surahCards, 0);
    } else {
      const url = getSurahTafseerAudioUrl(selectedSurahNumber);
      if (url && tafseerAudioRef.current) {
        setSurahWideAudioType('TAFSEER');
        tafseerAudioRef.current.src = url;
        tafseerAudioRef.current.playbackRate = playbackSpeed;
        tafseerAudioRef.current.play().then(() => {
          showAmalToast(`سورۃ ${currentSurahMeta?.nameUrdu || ''}: مکمل اردو تفسیر آڈیو سماعت فرمائیں۔`, 'info');
        }).catch((e) => {
          console.warn('Tafseer audio error:', e);
          setSurahWideAudioType(null);
          showAmalToast('اس سورت کی تفسیری حکمت نیچے کارڈز میں ملاحظہ فرمائیں۔', 'warning');
        });
      } else {
        showAmalToast('اس سورت کی تفسیری حکمت نیچے کارڈز میں ملاحظہ فرمائیں۔', 'warning');
      }
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
        if (audioRef.current) {
          audioRef.current.play();
          setIsPlayingPaused(false);
        }
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        if (audioRef.current) {
          audioRef.current.pause();
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

      {/* Hidden Audio Elements for continuous Tilawat, Kanz-ul-Iman, and Tafseer streams */}
      <audio
        ref={audioRef}
        onEnded={handleAyahAudioEnded}
        onError={(e) => {
          console.warn('Ayah audio element error:', e);
          showAmalToast('آڈیو لوڈ کرنے میں عارضی تاخیر ہوئی۔ دوبارہ کوشش کریں۔', 'warning');
          setIsPlayingPaused(true);
        }}
        style={{ display: 'none' }}
      />
      <audio
        ref={surahWideAudioRef}
        onEnded={() => setSurahWideAudioType(null)}
        onError={(e) => {
          console.warn('Surah wide audio error, falling back to sync mode:', e);
          setSurahWideAudioType(null);
          setAudioSyncMode('TILAWAT_URDU_SYNC');
          handlePlayAyahAudio(1, 'ARABIC');
        }}
        style={{ display: 'none' }}
      />
      <audio
        ref={tafseerAudioRef}
        onEnded={() => {
          setActiveTafseerCardKey(null);
          setSurahWideAudioType(null);
        }}
        onError={(e) => {
          console.warn('Tafseer audio error:', e);
          setActiveTafseerCardKey(null);
          setSurahWideAudioType(null);
          showAmalToast('سٹوڈیو آڈیو ریموٹ سرور تعطل کا شکار ہے۔ براہِ راست تفسیری عبارت سنیں۔', 'info');
        }}
        style={{ display: 'none' }}
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

        {/* SECTION 1: WISDOM & LISTENING CARDS (ADAPTIVE TO QUICK_2MIN, DAILY_5MIN, DEEP_15MIN) */}
        <section style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', margin: 0 }}>
                {activeMode === 'QUICK_2MIN'
                  ? '⚡ Quick Wisdom (2-Min Daily Divine Reflection)'
                  : activeMode === 'DAILY_5MIN'
                    ? '🌅 Daily Tilawat & Tarjuma Hub (5-Min Quran Audio)'
                    : '📖 Deep Tafseer & Classical Evidence Hub (15-Min Study)'}
              </h2>
              <p style={{ fontSize: 13, color: '#64748B', margin: '4px 0 0' }}>
                {activeMode === 'QUICK_2MIN'
                  ? 'منتخب آیات، کنز الایمان کا ترجمہ، خزائن العرفان کی حکمت، مستند قاری کی آواز اور عملی زندگی کے لیے مسنون عمل'
                  : activeMode === 'DAILY_5MIN'
                    ? 'مستند قاری کی تلاوت کے بعد اعلیٰ حضرت کے کنز الایمان کا مستند انسانی آواز میں اردو ترجمہ خودکار تسلسل کے ساتھ سنیں'
                    : 'صدر الافاضل نعیم الدین مراد آبادی کی تفسیری ابحاث، احیاء علوم الدین، کیمیائے سعادت، اور بہارِ شریعت کے مستند حوالہ جات'}
              </p>
            </div>
            <span style={{ fontSize: 12, color: '#059669', fontWeight: 700, backgroundColor: '#DCFCE7', padding: '4px 10px', borderRadius: 8 }}>
              {QURAN_WISDOM_COLLECTION.length} حکمت کارڈز دستیاب
            </span>
          </div>

            {/* Thematic Filter Pills & Continuous Tafseer Button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, marginBottom: 18 }}>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {[
                  { id: 'ALL', label: 'تمام موضوعات (All Themes)' },
                  { id: 'BOOKMARKED', label: `⭐ محفوظ کارڈز (${bookmarkedCardIds.length})` },
                  { id: 'IKHLAS', label: '✨ اخلاص و نیت (Ikhlas)' },
                  { id: 'TAWAKKUL', label: '🛡️ توکل و استقامت (Tawakkul)' },
                  { id: 'SALAH', label: '🤲 نماز و مناجات (Salah)' },
                  { id: 'AKHLAQ', label: '🌱 اخلاق و حسنِ معاملہ (Akhlaq)' },
                  { id: 'HUQUQ_UL_IBAD', label: '🤝 حقوق العباد (Huquq)' },
                  { id: 'TIME_MANAGEMENT', label: '⏳ وقت کی قدر و آخرت (Time)' },
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
                        transition: 'all 0.1s ease',
                      }}
                    >
                      {theme.label}
                    </button>
                  );
                })}
              </div>

              {/* Continuous Tafseer Play All Button */}
              <button
                type="button"
                onClick={() => {
                  if (continuousTafseerIndex !== null) {
                    handleStopAudio();
                  } else {
                    handlePlayContinuousTafseer(QURAN_WISDOM_COLLECTION);
                  }
                }}
                style={{
                  padding: '6px 14px',
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 800,
                  backgroundColor: continuousTafseerIndex !== null ? '#DC2626' : '#92400E',
                  color: '#FFFFFF',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  boxShadow: '0 2px 8px rgba(146, 64, 14, 0.25)',
                }}
                title="تمام ۴۲ آیات کی خزائن العرفان تفسیری حکمت ایک ساتھ مسلسل سماعت فرمائیں"
              >
                <span>{continuousTafseerIndex !== null ? '⏹' : '📖'}</span>
                <span>
                  {continuousTafseerIndex !== null
                    ? `تفسیر جاری (${continuousTafseerIndex + 1}/${QURAN_WISDOM_COLLECTION.length}) — بند کریں`
                    : 'تمام ۴۲ آیات کی تفسیر ایک ساتھ سنیں'}
                </span>
              </button>
            </div>

            {/* Empty state for filtered cards */}
            {(() => {
              const displayedWisdomCards = selectedThemeFilter === 'BOOKMARKED'
                ? QURAN_WISDOM_COLLECTION.filter((c) => bookmarkedCardIds.includes(`${c.surahNumber}:${c.ayahNumber}`))
                : (selectedThemeFilter === 'ALL'
                    ? QURAN_WISDOM_COLLECTION
                    : QURAN_WISDOM_COLLECTION.filter((c) => c.tadabburPrompt.theme === selectedThemeFilter));

              if (displayedWisdomCards.length === 0) {
                return (
                  <div style={{ padding: '48px 24px', textAlign: 'center', backgroundColor: '#FFFFFF', borderRadius: 16, border: '1px dashed #CBD5E1', color: '#64748B' }}>
                    <div style={{ fontSize: 36, marginBottom: 8 }}>⭐</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginBottom: 4 }}>
                      کوئی محفوظ حکمت کارڈ موجود نہیں
                    </div>
                    <div style={{ fontSize: 13, maxWidth: 420, margin: '0 auto', lineHeight: 1.6 }}>
                      کسی بھی حکمت کارڈ کے اوپر دائیں جانب موجود ستارے (☆) پر کلک کر کے اسے اپنی پسندیدہ فہرست میں محفوظ کریں۔
                    </div>
                  </div>
                );
              }

              return (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 16 }}>
                  {displayedWisdomCards.map((card) => {
                    const isPlayingThis = playingAyahNumber === card.ayahNumber && selectedSurahNumber === card.surahNumber;
                    const isBookmarked = bookmarkedCardIds.includes(`${card.surahNumber}:${card.ayahNumber}`);

                    return (
                      <div
                        key={`${card.surahNumber}-${card.ayahNumber}`}
                        style={{
                          backgroundColor: '#FFFFFF',
                          borderRadius: 16,
                          border: isBookmarked ? '1px solid #FCD34D' : '1px solid #E2E8F0',
                          padding: 20,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          boxShadow: isBookmarked ? '0 4px 14px rgba(245, 158, 11, 0.1)' : '0 2px 8px rgba(0,0,0,0.04)',
                          transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                        }}
                      >
                        <div>
                          {/* Card Header */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
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
                              <span style={{ fontSize: 10, fontWeight: 700, color: '#854D0E', backgroundColor: '#FEF9C3', padding: '2px 6px', borderRadius: 6 }}>
                                {card.tadabburPrompt.theme}
                              </span>
                            </div>

                            {/* Bookmark Star Toggle */}
                            <button
                              onClick={() => toggleBookmarkCard(card.surahNumber, card.ayahNumber)}
                              style={{
                                border: 'none',
                                background: isBookmarked ? '#FEF3C7' : '#F1F5F9',
                                color: isBookmarked ? '#D97706' : '#94A3B8',
                                cursor: 'pointer',
                                fontSize: 16,
                                width: 28,
                                height: 28,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.15s ease',
                              }}
                              title={isBookmarked ? 'محفوظ کردہ سے ہٹائیں' : 'اپنی پسندیدہ فہرست میں محفوظ کریں'}
                            >
                              {isBookmarked ? '★' : '☆'}
                            </button>
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
                          {activeMode === 'DEEP_15MIN'
                            ? card.tafseerKhazainUlIrfan.excerptUrdu
                            : card.tafseerKhazainUlIrfan.excerptUrdu.length > 180
                              ? card.tafseerKhazainUlIrfan.excerptUrdu.slice(0, 180) + '...'
                              : card.tafseerKhazainUlIrfan.excerptUrdu}
                        </div>
                        {activeMode === 'DEEP_15MIN' && card.crossReferenceBook && (
                          <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px dashed #FDE68A', fontSize: 12, color: '#92400E' }}>
                            <strong>حوالہ کتبِ معتبرہ:</strong> {card.crossReferenceBook.workTitle} ({card.crossReferenceBook.citation}) — {card.crossReferenceBook.insightUrdu}
                          </div>
                        )}
                      </div>

                      {/* Active Tafseer Live Read-Along Banner */}
                      {activeTafseerCardKey === `${card.surahNumber}:${card.ayahNumber}` && (
                        <div style={{ backgroundColor: '#FEF3C7', padding: '10px 14px', borderRadius: 8, border: '2px solid #F59E0B', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ fontSize: 16 }}>🔊</span>
                            <span style={{ fontSize: 12, color: '#92400E', fontWeight: 800 }}>
                              خزائن العرفان کی تفسیری عبارت سنی جا رہی ہے (صدر الافاضل نعیم الدین مراد آبادی)
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={handleStopAudio}
                            style={{ padding: '3px 8px', borderRadius: 6, backgroundColor: '#DC2626', color: '#FFFFFF', border: 'none', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}
                          >
                            بند کریں ✕
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Dedicated 3-Track Audio Listening Bar */}
                    <div style={{ backgroundColor: '#F8FAFC', borderRadius: 10, padding: '10px 12px', border: '1px solid #E2E8F0', marginTop: 12, marginBottom: 12 }}>
                      <div style={{ fontSize: 10, fontWeight: 800, color: '#475569', textTransform: 'uppercase', marginBottom: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <span>🔊</span>
                          <span>آڈیو سنیں (Audio Streams):</span>
                        </span>
                        <span style={{ fontSize: 10, color: '#059669', fontWeight: 700 }}>
                          ✓ 100% Real Human Voice
                        </span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                        {/* 1. Arabic Tilawat */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedSurahNumber(card.surahNumber);
                            handlePlayAyahAudio(card.ayahNumber, 'ARABIC');
                          }}
                          style={{
                            padding: '8px 4px',
                            borderRadius: 6,
                            fontSize: 11,
                            fontWeight: 700,
                            cursor: 'pointer',
                            border: '1px solid',
                            borderColor: isPlayingThis && currentAudioSegment === 'ARABIC' ? '#166534' : '#BBF7D0',
                            backgroundColor: isPlayingThis && currentAudioSegment === 'ARABIC' ? '#166534' : '#F0FDF4',
                            color: isPlayingThis && currentAudioSegment === 'ARABIC' ? '#FFFFFF' : '#166534',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 2,
                          }}
                          title="عربی تلاوت سنیں"
                        >
                          <span style={{ fontSize: 14 }}>{isPlayingThis && currentAudioSegment === 'ARABIC' ? '⏸' : '🎙️'}</span>
                          <span>{isPlayingThis && currentAudioSegment === 'ARABIC' ? 'تلاوت جاری' : 'عربی تلاوت'}</span>
                        </button>

                        {/* 2. Urdu Tarjuma Audio */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedSurahNumber(card.surahNumber);
                            handlePlayAyahAudio(card.ayahNumber, 'URDU');
                          }}
                          style={{
                            padding: '8px 4px',
                            borderRadius: 6,
                            fontSize: 11,
                            fontWeight: 700,
                            cursor: 'pointer',
                            border: '1px solid',
                            borderColor: isPlayingThis && currentAudioSegment === 'URDU' ? '#047857' : '#BAE6FD',
                            backgroundColor: isPlayingThis && currentAudioSegment === 'URDU' ? '#047857' : '#F0F9FF',
                            color: isPlayingThis && currentAudioSegment === 'URDU' ? '#FFFFFF' : '#0369A1',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 2,
                          }}
                          title="اردو ترجمہ کنز الایمان سماعت فرمائیں"
                        >
                          <span style={{ fontSize: 14 }}>{isPlayingThis && currentAudioSegment === 'URDU' ? '⏸' : '🎧'}</span>
                          <span>{isPlayingThis && currentAudioSegment === 'URDU' ? 'ترجمہ جاری' : 'اردو ترجمہ'}</span>
                        </button>

                        {/* 3. Tafseer & Wisdom Audio */}
                        <button
                          type="button"
                          onClick={() => handlePlayTafseerWisdomAudio(card)}
                          style={{
                            padding: '8px 4px',
                            borderRadius: 6,
                            fontSize: 11,
                            fontWeight: 700,
                            cursor: 'pointer',
                            border: '1px solid',
                            borderColor: activeTafseerCardKey === `${card.surahNumber}:${card.ayahNumber}` ? '#92400E' : '#FDE68A',
                            backgroundColor: activeTafseerCardKey === `${card.surahNumber}:${card.ayahNumber}` ? '#92400E' : '#FFFBEB',
                            color: activeTafseerCardKey === `${card.surahNumber}:${card.ayahNumber}` ? '#FFFFFF' : '#92400E',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 2,
                          }}
                          title="خزائن العرفان کی تفسیری حکمت کی صوتی عبارت سنیں"
                        >
                          <span style={{ fontSize: 14 }}>{activeTafseerCardKey === `${card.surahNumber}:${card.ayahNumber}` ? '⏹' : '📖'}</span>
                          <span>{activeTafseerCardKey === `${card.surahNumber}:${card.ayahNumber}` ? 'تفسیر جاری' : 'تفسیر و حکمت'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Actions: Open Full Wisdom Card & Reflect in Muhasabah */}
                    <div style={{ display: 'flex', gap: 6, paddingTop: 10, borderTop: '1px solid #F1F5F9', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => {
                          setActiveWisdomAyah({ surahNumber: card.surahNumber, ayahNumber: card.ayahNumber });
                        }}
                        style={{
                          flex: 1.5,
                          minWidth: 140,
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
                        <span>مکمل تفسیری سند و عمل ➔</span>
                      </button>

                      <Link
                        href={`/reflections?surah=${card.surahNumber}&ayah=${card.ayahNumber}`}
                        style={{
                          padding: '8px 10px',
                          borderRadius: 8,
                          backgroundColor: '#FEF3C7',
                          border: '1px solid #FDE68A',
                          color: '#92400E',
                          fontSize: 12,
                          fontWeight: 700,
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 4,
                        }}
                        title="اس قرآنی آیت پر اپنے نجی محاسبہ میں نیت اور تدبر قلمبند فرمائیں"
                      >
                        <span>✍️</span>
                        <span>محاسبہ</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })()}
      </section>

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
                {/* 1. Continuous Arabic Tilawat Only */}
                <button
                  type="button"
                  onClick={handlePlaySurahTilawatOnly}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 8,
                    backgroundColor: (audioSyncMode === 'TILAWAT_ONLY' && playingAyahNumber !== null) ? '#065F46' : '#166534',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    boxShadow: '0 2px 4px rgba(22, 101, 52, 0.2)',
                  }}
                  title="مکمل سورت کی صرف عربی تلاوت مسلسل سنیں"
                >
                  <span>▶</span>
                  <span>{audioSyncMode === 'TILAWAT_ONLY' && playingAyahNumber !== null ? '⏸ تلاوت موقوف' : 'مکمل تلاوت (عربی)'}</span>
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

                {/* 3. Full Surah Tilawat + Tarjuma Kanz-ul-Iman Sync */}
                <button
                  type="button"
                  onClick={handlePlaySurahKanzulIman}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 8,
                    backgroundColor: (audioSyncMode === 'TILAWAT_URDU_SYNC' && playingAyahNumber !== null) ? '#047857' : '#FEF3C7',
                    color: (audioSyncMode === 'TILAWAT_URDU_SYNC' && playingAyahNumber !== null) ? '#FFFFFF' : '#92400E',
                    border: '1px solid',
                    borderColor: (audioSyncMode === 'TILAWAT_URDU_SYNC' && playingAyahNumber !== null) ? '#047857' : '#FDE68A',
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                  title="عربی تلاوت اور کنز الایمان کا مستند اردو ترجمہ آیت در آیت خودکار سنیں"
                >
                  <span>🎧</span>
                  <span>{audioSyncMode === 'TILAWAT_URDU_SYNC' && playingAyahNumber !== null ? '⏸ موقوف' : 'تلاوت + اردو (Sync)'}</span>
                </button>

                {/* 4. Full Surah Continuous Tafseer Audio (Khaza'in-ul-Irfan) */}
                <button
                  type="button"
                  onClick={handlePlaySurahTafseer}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 8,
                    backgroundColor: (surahWideAudioType === 'TAFSEER' || (audioSyncMode === 'TAFSEER_CONTINUOUS' && activeTafseerCardKey !== null)) ? '#92400E' : '#FFFBEB',
                    color: (surahWideAudioType === 'TAFSEER' || (audioSyncMode === 'TAFSEER_CONTINUOUS' && activeTafseerCardKey !== null)) ? '#FFFFFF' : '#92400E',
                    border: '1px solid #FDE68A',
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                  title="اس سورت کی تفسیری حکمت خزائن العرفان سے ایک ساتھ سنیں"
                >
                  <span>📖</span>
                  <span>{(surahWideAudioType === 'TAFSEER' || (audioSyncMode === 'TAFSEER_CONTINUOUS' && activeTafseerCardKey !== null)) ? '⏸ تفسیر موقوف' : 'مکمل تفسیر (ایک ساتھ)'}</span>
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
                            onClick={() => handlePlayAyahAudio(verse.ayahNumber, currentAudioSegment)}
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
                            onClick={() => handlePlayAyahAudio(verse.ayahNumber, 'URDU')}
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
                  if (playingAyahNumber !== null) {
                    handlePlayAyahAudio(playingAyahNumber, currentAudioSegment);
                  } else if (surahWideAudioType === 'KANZUL_IMAN') {
                    handlePlaySurahKanzulIman();
                  } else if (surahWideAudioType === 'TAFSEER') {
                    handlePlaySurahTafseer();
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
                  if (prev === 'TILAWAT_URDU_SYNC') return 'URDU_ONLY_CONTINUOUS';
                  if (prev === 'URDU_ONLY_CONTINUOUS') return 'TILAWAT_ONLY';
                  return 'TILAWAT_URDU_SYNC';
                })}
                style={{
                  padding: '6px 12px',
                  borderRadius: 20,
                  fontSize: 11,
                  fontWeight: 700,
                  backgroundColor: audioSyncMode === 'TILAWAT_URDU_SYNC' ? '#10B981' : audioSyncMode === 'URDU_ONLY_CONTINUOUS' ? '#0284C7' : 'rgba(255,255,255,0.15)',
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
                  {audioSyncMode === 'TILAWAT_URDU_SYNC'
                    ? '🎧 تلاوت + اردو (Sync)'
                    : audioSyncMode === 'URDU_ONLY_CONTINUOUS'
                      ? '🎙️ صرف اردو ترجمہ'
                      : audioSyncMode === 'TAFSEER_CONTINUOUS'
                        ? '📖 تفسیر مسلسل'
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
