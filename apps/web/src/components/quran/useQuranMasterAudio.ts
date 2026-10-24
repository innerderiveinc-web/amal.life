import { useState, useRef, useEffect } from 'react';
import { QuranSurahData } from '../../lib/quran-surahs-data';
import { ALL_114_SURAHS, QuranSurahMeta } from '../../lib/quran-114-directory';
import {
  QURAN_WISDOM_COLLECTION,
  QuranAyahWisdomCard,
  getAyahAudioUrl,
  getAyahUrduAudioUrl,
  getSurahKanzulImanAudioUrl,
  getSurahTafseerAudioUrl,
} from '../../lib/quran-wisdom-data';
import { showAmalToast } from '../Toast';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import { AudioSyncMode, AudioSegment } from './FloatingQuranAudioPlayer';

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

  const [isSurahCachedOffline, setIsSurahCachedOffline] = useState<boolean>(false);
  const [isCachingSurah, setIsCachingSurah] = useState<boolean>(false);

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
        caches
          .open('amal-quran-audio-v1')
          .then((cache) => {
            cache.match(kanzulImanUrl).then((res) => {
              setIsSurahCachedOffline(!!res);
            });
          })
          .catch(() => {});
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
      showAmalToast(
        'سورۃ مبارکہ کی آڈیو کامیابی سے آف لائن محفوظ کر لی گئی ہے! (Surah cached offline)',
        'success'
      );
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

  // Lock-screen MediaSession API controls & background notification display
  useEffect(() => {
    if (typeof window !== 'undefined' && 'mediaSession' in navigator && playingAyahNumber !== null) {
      const isUrduAudio = currentAudioSegment === 'URDU';
      const meta =
        ALL_114_SURAHS.find((s) => s.number === selectedSurahNumber) || currentSurahMeta;

      const trackTitle = isUrduAudio
        ? t(
            `Kanz-ul-Iman Translation · Surah ${meta?.nameTransliterated || ''} · Verse ${playingAyahNumber}`,
            `ترجمہ کنز الایمان - سورۃ ${meta?.nameUrdu || ''} · آیت ${playingAyahNumber}`
          )
        : isUrdu
          ? `سورۃ ${meta?.nameArabic || ''} (${meta?.nameUrdu || ''}) · آیت ${playingAyahNumber}`
          : `Surah ${meta?.nameTransliterated || ''} (${meta?.nameArabic || ''}) · Verse ${playingAyahNumber}`;

      const qariDisplayMap = {
        alafasy: 'Qari Mishary Rashid Alafasy',
        husary: 'Shaykh Mahmoud Khalil Al-Husary',
        minshawi: 'Shaykh Muhammad Siddiq Al-Minshawi',
      };
      const artistName = isUrduAudio
        ? t(
            'Kanz-ul-Iman Translation · 100% Human Voice',
            'کنز الایمان فی ترجمۃ القرآن · 100% Human Voice'
          )
        : qariDisplayMap[selectedQari];

      try {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: trackTitle,
          artist: artistName,
          album: 'Al-Quran Al-Kareem & Wisdom · AMAL OS',
          artwork: [
            { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
            { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
          ],
        });
      } catch (e) {
        console.warn('MediaSession metadata error:', e);
      }

      navigator.mediaSession.setActionHandler('play', () => {
        if (masterAudioRef.current) {
          masterAudioRef.current.play().catch(() => {});
          setIsPlayingPaused(false);
          if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'playing';
        }
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        if (masterAudioRef.current) {
          masterAudioRef.current.pause();
          setIsPlayingPaused(true);
          if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'paused';
        }
      });
      navigator.mediaSession.setActionHandler('previoustrack', () => {
        if (playingAyahNumber > 1) {
          handlePlayAyahAudio(playingAyahNumber - 1, currentAudioSegment);
        } else if (selectedSurahNumber > 1) {
          const prevSurah = selectedSurahNumber - 1;
          setSelectedSurahNumber(prevSurah);
          onSelectSurah(prevSurah, 1);
          handlePlayAyahAudio(1, currentAudioSegment);
        }
      });
      navigator.mediaSession.setActionHandler('nexttrack', () => {
        if (currentSurah && playingAyahNumber < currentSurah.verses.length) {
          handlePlayAyahAudio(playingAyahNumber + 1, currentAudioSegment);
        } else if (selectedSurahNumber < 114) {
          handleAdvanceToNextSurah(currentAudioSegment);
        }
      });
      try {
        navigator.mediaSession.setActionHandler('seekbackward', (details) => {
          if (masterAudioRef.current) {
            masterAudioRef.current.currentTime = Math.max(
              0,
              masterAudioRef.current.currentTime - (details.seekOffset || 10)
            );
          }
        });
        navigator.mediaSession.setActionHandler('seekforward', (details) => {
          if (masterAudioRef.current) {
            masterAudioRef.current.currentTime = Math.min(
              masterAudioRef.current.duration || 0,
              masterAudioRef.current.currentTime + (details.seekOffset || 10)
            );
          }
        });
        navigator.mediaSession.setActionHandler('stop', () => {
          handleStopAudio();
        });
      } catch {}
    }
  }, [
    playingAyahNumber,
    currentAudioSegment,
    selectedSurahNumber,
    selectedQari,
    currentSurah,
    currentSurahMeta,
  ]);

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
