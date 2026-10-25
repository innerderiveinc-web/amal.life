import { useState, useRef, useEffect } from 'react';
import { QuranSurahData } from '../../lib/quran-surahs-data';
import { ALL_114_SURAHS, QuranSurahMeta } from '../../lib/quran-114-directory';
import {
  QURAN_WISDOM_COLLECTION,
  QuranAyahWisdomCard,
  getAyahAudioUrl,
  getAyahUrduAudioUrl,
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

    // Seamlessly switch audio track without explicit OS background pause
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
          console.warn('Audio play error, trying CDN fallback:', e);
          const fallbackUrl = `https://cdn.islamic.network/quran/audio/64/ur.khan/${ayahNum}.mp3`;
          if (masterAudioRef.current && segment !== 'ARABIC') {
            masterAudioRef.current.src = fallbackUrl;
            masterAudioRef.current.play().catch(() => {});
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

    if (audioSyncMode === 'FULL_SYNC' || audioSyncMode === 'TILAWAT_URDU_SYNC') {
      if (currentAudioSegment === 'ARABIC') {
        handlePlayAyahAudio(playingAyahNumber, 'URDU');
      } else {
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
    showAmalToast(
      `سورۃ ${currentSurahMeta?.nameUrdu || ''}: تلاوت اور مستند اردو ترجمہ (Sync) شروع ہو گیا۔`,
      'success'
    );
  };

  const handlePlaySurahKanzulIman = () => {
    if (audioSyncMode === 'TILAWAT_URDU_SYNC' && playingAyahNumber !== null) {
      handleStopAudio();
      return;
    }
    handleStopAudio();
    setAudioSyncMode('TILAWAT_URDU_SYNC');
    handlePlayAyahAudio(1, 'ARABIC');
    showAmalToast(
      `سورۃ ${currentSurahMeta?.nameUrdu || ''}: تلاوت اور مستند اردو ترجمہ (2-Step Sync) شروع ہو گیا۔`,
      'success'
    );
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
