import { useState, useRef, useEffect } from 'react';
import { QuranSurahData } from '../../lib/quran-surahs-data';
import { ALL_114_SURAHS, QuranSurahMeta } from '../../lib/quran-114-directory';
import {
  QURAN_WISDOM_COLLECTION,
  QuranAyahWisdomCard,
  getAyahAudioUrl,
  getAyahUrduAudioUrl,
  getAyahUrduAudioFallbackUrl,
  getSurahTafseerAudioUrl,
} from '../../lib/quran-wisdom-data';
import { showAmalToast } from '../Toast';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import { AudioSyncMode, AudioSegment } from './FloatingQuranAudioPlayer';
import { useQuranOfflineAudio } from './useQuranOfflineAudio';
import { useQuranMediaSession } from './useQuranMediaSession';

export interface UseQuranMasterAudioOptions {
  selectedSurahNumber: number;
  setSelectedSurahNumber: (num: number) => void;
  selectedQari: 'alafasy' | 'husary' | 'minshawi';
  continuousSurahPlayback: boolean;
  currentSurah: QuranSurahData;
  currentSurahMeta: QuranSurahMeta;
  playbackSpeed: number;
  isUrdu: boolean;
  t: (en: string, ur: string, ar?: string) => string;
  onSelectSurah: (surahNum: number, targetAyahNumber?: number) => void;
  setFocusedAyahNumber: React.Dispatch<React.SetStateAction<number>>;
}

export function useQuranMasterAudio({
  selectedSurahNumber,
  setSelectedSurahNumber,
  selectedQari,
  continuousSurahPlayback,
  currentSurah,
  currentSurahMeta,
  playbackSpeed,
  isUrdu,
  t,
  onSelectSurah,
  setFocusedAyahNumber,
}: UseQuranMasterAudioOptions) {
  const { pause: pauseGlobalPlayer } = useAudioPlayer();

  // Audio Playback & Sync State
  const [playingAyahNumber, setPlayingAyahNumber] = useState<number | null>(null);
  const [audioSyncMode, setAudioSyncMode] = useState<AudioSyncMode>('TILAWAT_URDU_SYNC');
  const [currentAudioSegment, setCurrentAudioSegment] = useState<AudioSegment>('ARABIC');
  const [isPlayingPaused, setIsPlayingPaused] = useState<boolean>(false);
  const [activeTafseerCardKey, setActiveTafseerCardKey] = useState<string | null>(null);
  const [surahWideAudioType, setSurahWideAudioType] = useState<'KANZUL_IMAN' | 'TAFSEER' | null>(null);
  const [continuousTafseerIndex, setContinuousTafseerIndex] = useState<number | null>(null);

  // Hifz & Memorization Repeat Engine State
  const [hifzRepeatTarget, setHifzRepeatTarget] = useState<number>(1);
  const [currentRepeatIteration, setCurrentRepeatIteration] = useState<number>(1);

  // Multi-Tab Audio Synchronization
  const tabIdRef = useRef<string>(typeof window !== 'undefined' ? Math.random().toString(36).substring(2, 9) : 'tab-srv');
  const syncChannelRef = useRef<BroadcastChannel | null>(null);

  // Single Master Audio Ref — strictly prevents any audio overlapping
  const masterAudioRef = useRef<HTMLAudioElement | null>(null);

  // Offline Caching Sub-Hook
  const {
    isSurahCachedOffline,
    isCachingSurah,
    handleCacheSurahOffline,
    handleDownloadSurahAudio,
  } = useQuranOfflineAudio({
    selectedSurahNumber,
    selectedQari,
  });

  // Sync playback rate to master audio element
  useEffect(() => {
    if (masterAudioRef.current) masterAudioRef.current.playbackRate = playbackSpeed;
  }, [playbackSpeed]);

  // Multi-Tab Audio Synchronization Listener
  useEffect(() => {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        const channel = new BroadcastChannel('amal_audio_sync_bus');
        syncChannelRef.current = channel;
        channel.onmessage = (event) => {
          if (event.data?.type === 'AMAL_AUDIO_PLAYING' && event.data?.senderTabId !== tabIdRef.current) {
            if (masterAudioRef.current && !masterAudioRef.current.paused) {
              masterAudioRef.current.pause();
              setIsPlayingPaused(true);
            }
          }
        };
      } catch {}
    }
    return () => {
      if (syncChannelRef.current) {
        syncChannelRef.current.close();
        syncChannelRef.current = null;
      }
    };
  }, []);

  // Master Stop Audio Function — completely silences and resets all audio
  const handleStopAudio = () => {
    if (masterAudioRef.current) {
      masterAudioRef.current.pause();
      masterAudioRef.current.currentTime = 0;
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

  const checkOfflinePlaybackAvailability = (): boolean => {
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined' && !navigator.onLine && !isSurahCachedOffline) {
      const lang = typeof window !== 'undefined' ? (localStorage.getItem('amal_app_language') || 'ur') : 'ur';
      const offlineMsg = lang === 'ur'
        ? 'انٹرنیٹ رابطہ دستیاب نہیں ہے۔ بغیر انٹرنیٹ سننے کے لیے "ڈاؤنلوڈ آف لائن" بٹن دبا کر سورت پہلے محفوظ فرمائیں۔'
        : lang === 'ar'
        ? 'لا يوجد اتصال بالإنترنت. يرجى الضغط على "تنزيل دون اتصال" لحفظ السورة محلياً.'
        : lang === 'ru'
        ? 'Internet dastiyab nahi hai. Offline sunne ke liye "Download Offline" daba kar Surah save karein.'
        : 'Audio stream unavailable offline. Tap "Download Offline" to save this Surah locally.';
      showAmalToast(offlineMsg, 'warning');
      return false;
    }
    return true;
  };

  // Master Play Ayah Function: handles ARABIC, URDU, and TAFSEER segments on single master player
  const handlePlayAyahAudio = (ayahNum: number, segment: AudioSegment = 'ARABIC') => {
    pauseGlobalPlayer();

    if (!checkOfflinePlaybackAvailability()) {
      return;
    }

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

    // Seamlessly switch audio track and synchronize active Ayah view/translation
    setPlayingAyahNumber(ayahNum);
    setFocusedAyahNumber(ayahNum);
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
      masterAudioRef.current
        .play()
        .then(() => {
          if (typeof window !== 'undefined' && 'mediaSession' in navigator) {
            navigator.mediaSession.playbackState = 'playing';
          }
        })
        .catch((e) => {
          if (e && (e.name === 'AbortError' || e.message?.includes('interrupted'))) {
            return;
          }
          console.warn('Audio play error on source:', url, e);
          const lang = typeof window !== 'undefined' ? (localStorage.getItem('amal_app_language') || 'ur') : 'ur';
          const isOffline = typeof navigator !== 'undefined' && !navigator.onLine;
          if (isOffline) {
            showAmalToast(
              lang === 'ur'
                ? 'انٹرنیٹ رابطہ منقطع ہے۔ بغیر انٹرنیٹ تلاوت کے لیے "ڈاؤنلوڈ آف لائن" بٹن استعمال فرمائیں۔'
                : 'Audio unavailable offline. Please use "Download Offline" to cache this Surah.',
              'warning'
            );
          } else {
            showAmalToast(
              lang === 'ur'
                ? 'آڈیو پلے کرنے میں دشواری ہوئی۔ برائے مہربانی دوبارہ کوشش فرمائیں۔'
                : lang === 'ar'
                ? 'حدث خطأ في تشغيل الصوت. يرجى المحاولة مرة أخرى.'
                : lang === 'ru'
                ? 'Audio play karne me dikkat aayi. Dobara koshish karein.'
                : 'Error playing audio. Please try again.',
              'warning'
            );
          }
        });
    }
  };

  // Seamless Next Surah Auto-Advancement
  const handleAdvanceToNextSurah = async (segment: AudioSegment = 'ARABIC') => {
    if (selectedSurahNumber >= 114) {
      handleStopAudio();
      showAmalToast(
        isUrdu
          ? 'الحمدللہ! قرآنِ مجید کی تمام ۱۱۴ سورتیں مکمل ہو گئیں۔ اللہ تعالیٰ قبول فرمائے!'
          : 'Alhamdulillah! Complete recitation of all 114 Surahs finished.',
        'success'
      );
      return;
    }

    const nextSurahNum = selectedSurahNumber + 1;
    setSelectedSurahNumber(nextSurahNum);
    setFocusedAyahNumber(1);
    setPlayingAyahNumber(1);
    setCurrentAudioSegment(segment);
    setIsPlayingPaused(false);

    // Fetch next surah
    onSelectSurah(nextSurahNum, 1);

    // Immediately play Ayah 1 of next surah
    let url = '';
    if (segment === 'ARABIC') {
      url = getAyahAudioUrl(nextSurahNum, 1, selectedQari);
    } else {
      url = getAyahUrduAudioUrl(nextSurahNum, 1);
    }

    if (masterAudioRef.current && url) {
      masterAudioRef.current.src = url;
      masterAudioRef.current.playbackRate = playbackSpeed;
      masterAudioRef.current
        .play()
        .then(() => {
          if (typeof window !== 'undefined' && 'mediaSession' in navigator) {
            navigator.mediaSession.playbackState = 'playing';
          }
        })
        .catch((e) => {
          if (e && (e.name === 'AbortError' || e.message?.includes('interrupted'))) return;
          console.warn('Next surah play error:', e);
        });
    }

    const nextMeta = ALL_114_SURAHS.find((s) => s.number === nextSurahNum);
    showAmalToast(
      isUrdu
        ? `اگلی سورت جاری ہے: سورۃ ${nextMeta?.nameUrdu || nextMeta?.nameArabic || nextSurahNum}`
        : `Auto-advancing: Surah ${nextMeta?.nameTransliterated || nextSurahNum}`,
      'info'
    );
  };

  // Master Audio Ended Handler: controls sequential sync and continuous Surah playback
  const handleMasterAudioEnded = () => {
    if (playingAyahNumber === null) {
      if (surahWideAudioType !== null) {
        setSurahWideAudioType(null);
      }
      return;
    }

    const totalVerses = currentSurah?.verses?.length || 0;

    // Hifz & Memorization Repeat check before advancing to next Ayah
    const canAdvanceAyah = () => {
      if (hifzRepeatTarget > 1) {
        if (currentRepeatIteration < hifzRepeatTarget) {
          const nextIter = currentRepeatIteration + 1;
          setCurrentRepeatIteration(nextIter);
          handlePlayAyahAudio(playingAyahNumber, currentAudioSegment === 'URDU' && (audioSyncMode === 'FULL_SYNC' || audioSyncMode === 'TILAWAT_URDU_SYNC') ? 'ARABIC' : currentAudioSegment);
          showAmalToast(
            isUrdu
              ? `تکرار برائے حفظ: دور ${nextIter} از ${hifzRepeatTarget}`
              : `Hifz Repeat: ${nextIter} of ${hifzRepeatTarget}`,
            'info'
          );
          return false;
        } else {
          setCurrentRepeatIteration(1);
          return true;
        }
      }
      return true;
    };

    if (audioSyncMode === 'FULL_SYNC' || audioSyncMode === 'TILAWAT_URDU_SYNC') {
      if (currentAudioSegment === 'ARABIC') {
        handlePlayAyahAudio(playingAyahNumber, 'URDU');
      } else {
        if (!canAdvanceAyah()) return;
        if (playingAyahNumber < totalVerses) {
          handlePlayAyahAudio(playingAyahNumber + 1, 'ARABIC');
        } else if (continuousSurahPlayback && selectedSurahNumber < 114) {
          handleAdvanceToNextSurah('ARABIC');
        } else {
          handleStopAudio();
          showAmalToast(
            `سورۃ ${currentSurahMeta?.nameUrdu || ''}: تلاوت و مستند ترجمہ مکمل ہو گیا۔`,
            'success'
          );
        }
      }
    } else if (audioSyncMode === 'URDU_ONLY_CONTINUOUS') {
      if (!canAdvanceAyah()) return;
      if (playingAyahNumber < totalVerses) {
        handlePlayAyahAudio(playingAyahNumber + 1, 'URDU');
      } else if (continuousSurahPlayback && selectedSurahNumber < 114) {
        handleAdvanceToNextSurah('URDU');
      } else {
        handleStopAudio();
        showAmalToast(
          `سورۃ ${currentSurahMeta?.nameUrdu || ''} کا مکمل اردو ترجمہ مکمل ہو گیا۔`,
          'success'
        );
      }
    } else if (audioSyncMode === 'TILAWAT_ONLY') {
      if (!canAdvanceAyah()) return;
      if (playingAyahNumber < totalVerses) {
        handlePlayAyahAudio(playingAyahNumber + 1, 'ARABIC');
      } else if (continuousSurahPlayback && selectedSurahNumber < 114) {
        handleAdvanceToNextSurah('ARABIC');
      } else {
        handleStopAudio();
        showAmalToast(
          `سورۃ ${currentSurahMeta?.nameUrdu || ''} کی مکمل تلاوت مکمل ہو گیا۔`,
          'success'
        );
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
      masterAudioRef.current
        .play()
        .then(() => {
          showAmalToast(
            `سورۃ ${card.surahNameUrdu} (آیت ${card.ayahNumber}): اردو تفسیری ترجمہ و حکمت جاری ہے۔`,
            'info'
          );
        })
        .catch((err) => {
          if (err && (err.name === 'AbortError' || err.message?.includes('interrupted'))) return;
          console.warn('Tafseer play error:', err);
          setActiveTafseerCardKey(null);
        });
    }
  };

  const handlePlayContinuousTafseer = (
    cardsToPlay: QuranAyahWisdomCard[] = QURAN_WISDOM_COLLECTION,
    startIndex: number = 0
  ) => {
    if (cardsToPlay.length === 0 || startIndex >= cardsToPlay.length) {
      handleStopAudio();
      setContinuousTafseerIndex(null);
      const lang = typeof window !== 'undefined' ? (localStorage.getItem('amal_app_language') || 'ur') : 'ur';
      showAmalToast(
        lang === 'ur'
          ? 'تمام تفسیری حکمت مکمل ہو گئی۔'
          : lang === 'ar'
          ? 'اكتملت دراسات التفسير والحكمة كاملة.'
          : lang === 'ru'
          ? 'Tamam tafseeri hikmat mukammal ho gayi.'
          : 'Completed all tafsir wisdom reflections.',
        'success'
      );
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
      masterAudioRef.current
        .play()
        .then(() => {
          showAmalToast(
            `اردو ترجمہ و حکمت: کارڈ ${startIndex + 1} از ${cardsToPlay.length} سنا جا رہا ہے...`,
            'info'
          );
        })
        .catch((e) => {
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
    const lang = typeof window !== 'undefined' ? (localStorage.getItem('amal_app_language') || 'ur') : 'ur';
    const surahName = lang === 'ur' ? (currentSurahMeta?.nameUrdu || '') : (currentSurahMeta?.nameTransliterated || '');
    const msg = lang === 'ur'
      ? `سورۃ ${surahName}: تلاوت اور مستند اردو ترجمہ ہم آہنگ ہو کر شروع ہو گیا۔`
      : lang === 'ar'
      ? `سورة ${currentSurahMeta?.nameArabic || ''}: بدأت التلاوة المتزامنة مع الترجمة.`
      : lang === 'ru'
      ? `Surah ${surahName}: Tilawat aur mustanad Urdu tarjuma shuru ho gaya.`
      : `Surah ${surahName}: Recitation with synchronized translation started.`;
    showAmalToast(msg, 'success');
  };

  const handlePlaySurahKanzulIman = () => {
    if (audioSyncMode === 'TILAWAT_URDU_SYNC' && playingAyahNumber !== null) {
      handleStopAudio();
      return;
    }
    handleStopAudio();
    setAudioSyncMode('TILAWAT_URDU_SYNC');
    handlePlayAyahAudio(1, 'ARABIC');
    const lang = typeof window !== 'undefined' ? (localStorage.getItem('amal_app_language') || 'ur') : 'ur';
    const surahName = lang === 'ur' ? (currentSurahMeta?.nameUrdu || '') : (currentSurahMeta?.nameTransliterated || '');
    const msg = lang === 'ur'
      ? `سورۃ ${surahName}: تلاوت اور مستند اردو ترجمہ دو مرحلہ وار شروع ہو گیا۔`
      : lang === 'ar'
      ? `سورة ${currentSurahMeta?.nameArabic || ''}: بدأت التلاوة والترجمة خطوة بخطوة.`
      : lang === 'ru'
      ? `Surah ${surahName}: Tilawat aur tarjuma do-marhala shuru ho gaya.`
      : `Surah ${surahName}: Step-by-step recitation and translation started.`;
    showAmalToast(msg, 'success');
  };

  const handlePlaySurahUrduOnly = () => {
    handleStopAudio();
    setAudioSyncMode('URDU_ONLY_CONTINUOUS');
    handlePlayAyahAudio(1, 'URDU');
    showAmalToast(
      `سورۃ ${currentSurahMeta?.nameUrdu || ''}: مکمل سورت کا صرف اردو ترجمہ (کنز الایمان) شروع ہو گیا۔`,
      'success'
    );
  };

  const handlePlaySurahTilawatOnly = () => {
    handleStopAudio();
    setAudioSyncMode('TILAWAT_ONLY');
    handlePlayAyahAudio(1, 'ARABIC');
    showAmalToast(
      `سورۃ ${currentSurahMeta?.nameUrdu || ''}: مکمل سورت کی عربی تلاوت شروع ہو گیا۔`,
      'success'
    );
  };

  const handlePlaySurahTafseer = () => {
    if (!checkOfflinePlaybackAvailability()) return;
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
      masterAudioRef.current
        .play()
        .then(() => {
          showAmalToast(
            `سورۃ ${currentSurahMeta?.nameUrdu || ''}: مستند تفسیری آڈیو (صراط الجنان / کنز الایمان) جاری ہے۔`,
            'info'
          );
        })
        .catch((e) => {
          if (e && (e.name === 'AbortError' || e.message?.includes('interrupted'))) return;
          console.warn('Tafseer studio error, falling back to sync mode:', e);
          handlePlaySurahFullSync();
        });
    } else {
      handlePlaySurahFullSync();
    }
  };

  // Lock-screen MediaSession Integration Sub-Hook
  useQuranMediaSession({
    masterAudioRef,
    playingAyahNumber,
    currentAudioSegment,
    selectedSurahNumber,
    selectedQari,
    currentSurah,
    currentSurahMeta,
    isUrdu,
    t,
    setIsPlayingPaused,
    setSelectedSurahNumber,
    onSelectSurah,
    handlePlayAyahAudio,
    handleAdvanceToNextSurah,
    handleStopAudio,
  });

  return {
    masterAudioRef,
    playingAyahNumber,
    setPlayingAyahNumber,
    audioSyncMode,
    setAudioSyncMode,
    currentAudioSegment,
    isPlayingPaused,
    setIsPlayingPaused,
    activeTafseerCardKey,
    setActiveTafseerCardKey,
    surahWideAudioType,
    setSurahWideAudioType,
    continuousTafseerIndex,
    setContinuousTafseerIndex,
    hifzRepeatTarget,
    setHifzRepeatTarget,
    currentRepeatIteration,
    isSurahCachedOffline,
    isCachingSurah,
    handleCacheSurahOffline,
    handleDownloadSurahAudio,
    handleStopAudio,
    togglePlayPause,
    handlePlayAyahAudio,
    handleAdvanceToNextSurah,
    handleMasterAudioEnded,
    handlePlayTafseerWisdomAudio,
    handlePlayContinuousTafseer,
    handlePlaySurahFullSync,
    handlePlaySurahKanzulIman,
    handlePlaySurahUrduOnly,
    handlePlaySurahTilawatOnly,
    handlePlaySurahTafseer,
  };
}
