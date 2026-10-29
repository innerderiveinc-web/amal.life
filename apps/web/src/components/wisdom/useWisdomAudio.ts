import { useState, useRef, useEffect } from 'react';
import {
  QURAN_WISDOM_COLLECTION,
  QuranAyahWisdomCard,
  getAyahAudioUrl,
  getAyahUrduAudioUrl,
  getSurahTafseerAudioUrl,
} from '../../lib/quran-wisdom-data';
import { showAmalToast } from '../Toast';
import { useAudioPlayer } from '../../context/AudioPlayerContext';

export function useWisdomAudio() {
  const [activeAudioKey, setActiveAudioKey] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [continuousIndex, setContinuousIndex] = useState<number | null>(null);

  let globalAudio: ReturnType<typeof useAudioPlayer> | null = null;
  try {
    globalAudio = useAudioPlayer();
  } catch (e) {
    globalAudio = null;
  }

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

    const url =
      type === 'URDU'
        ? getAyahUrduAudioUrl(card.surahNumber, card.ayahNumber)
        : getAyahAudioUrl(card.surahNumber, card.ayahNumber, 'alafasy');

    if (globalAudio) {
      if (globalAudio.currentTrack?.id === key && globalAudio.isPlaying) {
        globalAudio.pause();
        setIsPlayingAudio(false);
        setActiveAudioKey(null);
        return;
      }
      globalAudio.playTrack({
        id: key,
        title: `Surah ${card.surahNameTransliterated} (${card.surahNameUrdu}) — Ayah ${card.ayahNumber}`,
        subtitle: type === 'URDU' ? 'Kanz-ul-Iman Urdu Translation (کنز الایمان)' : 'Mishary Rashid Al-Afasy (عربی تلاوت)',
        audioUrl: url,
        reciter: type === 'URDU' ? 'Kanz-ul-Iman (اردو)' : 'Mishary Alafasy (مشاری العفاسی)',
        arabicSnippet: card.textArabic,
      });
      setActiveAudioKey(key);
      setIsPlayingAudio(true);
      return;
    }

    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current
        .play()
        .then(() => {
          setActiveAudioKey(key);
          setIsPlayingAudio(true);
          showAmalToast(
            type === 'URDU'
              ? `سورۃ ${card.surahNameUrdu} (آیت ${card.ayahNumber}) کا مستند اردو ترجمہ (کنز الایمان) جاری ہے`
              : `سورۃ ${card.surahNameUrdu} (آیت ${card.ayahNumber}) کی عربی تلاوت جاری ہے`,
            'info'
          );
        })
        .catch((e) => {
          console.warn('Audio play error:', e);
          setIsPlayingAudio(false);
          setActiveAudioKey(null);
          showAmalToast('آڈیو لوڈ کرنے میں عارضی تاخیر ہوئی۔ براہ کرم دوبارہ کوشش کریں۔', 'warning');
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

    if (globalAudio) {
      if (globalAudio.currentTrack?.id === key && globalAudio.isPlaying) {
        globalAudio.pause();
        setActiveAudioKey(null);
        setIsPlayingAudio(false);
        return;
      }
      globalAudio.playTrack({
        id: key,
        title: `Surah ${card.surahNameTransliterated} (${card.surahNameUrdu}) — Dars-e-Quran Tafseer`,
        subtitle: 'Classical Exegesis (تفسیر خزائن العرفان / صراط الجنان)',
        audioUrl: audioToPlay,
        reciter: 'Classical Scholar Exegesis',
      });
      setActiveAudioKey(key);
      setIsPlayingAudio(true);
      return;
    }

    if (audioRef.current) {
      audioRef.current.src = audioToPlay;

      // 3.5s Watchdog: If remote studio file buffers too slowly due to ISP throttling, fall back to instant CDN audio
      watchdogRef.current = setTimeout(() => {
        if (audioRef.current && (audioRef.current.paused || audioRef.current.currentTime === 0)) {
          console.warn('Studio audio buffering slow, falling back to instant EveryAyah CDN audio');
          if (audioRef.current && audioRef.current.src !== fastAyahUrl) {
            audioRef.current.src = fastAyahUrl;
            audioRef.current
              .play()
              .then(() => {
                setActiveAudioKey(key);
                setIsPlayingAudio(true);
                showAmalToast(
                  `سورۃ ${card.surahNameUrdu} (آیت ${card.ayahNumber}): مستند اردو ترجمہ و تفسیری قرأت جاری ہے۔`,
                  'info'
                );
              })
              .catch(() => {});
          }
        }
      }, 3500);

      audioRef.current.onplaying = () => {
        if (watchdogRef.current) {
          clearTimeout(watchdogRef.current);
          watchdogRef.current = null;
        }
      };

      audioRef.current
        .play()
        .then(() => {
          setActiveAudioKey(key);
          setIsPlayingAudio(true);
          showAmalToast(
            tafseerUrl
              ? `سورۃ ${card.surahNameUrdu}: مستند تفسیری آڈیو (صراط الجنان / کنز الایمان) جاری ہے۔`
              : `سورۃ ${card.surahNameUrdu} (آیت ${card.ayahNumber}): مستند اردو ترجمہ (کنز الایمان) جاری ہے۔`,
            'info'
          );
        })
        .catch((err) => {
          if (watchdogRef.current) {
            clearTimeout(watchdogRef.current);
            watchdogRef.current = null;
          }
          console.warn('Tafseer remote error, falling back to Ayah Urdu audio:', err);
          if (audioRef.current) {
            audioRef.current.src = fastAyahUrl;
            audioRef.current
              .play()
              .then(() => {
                setActiveAudioKey(key);
                setIsPlayingAudio(true);
                showAmalToast(
                  `سورۃ ${card.surahNameUrdu} (آیت ${card.ayahNumber}): اردو تفسیری ترجمہ جاری ہے۔`,
                  'info'
                );
              })
              .catch((fallbackErr) => {
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
      audioRef.current
        .play()
        .then(() => {
          setActiveAudioKey(`${card.surahNumber}:${card.ayahNumber}:URDU`);
          setIsPlayingAudio(true);
        })
        .catch((e) => {
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

  const handleAudioError = () => {
    if (activeAudioKey && activeAudioKey.endsWith(':TAFSEER') && audioRef.current) {
      const parts = activeAudioKey.split(':');
      const surah = parseInt(parts[0] || '1', 10);
      const ayah = parseInt(parts[1] || '1', 10);
      const fallbackUrl = getAyahUrduAudioUrl(surah, ayah);
      if (audioRef.current.src !== fallbackUrl) {
        console.warn('Tafseer remote stream failed, falling back to EveryAyah CDN');
        audioRef.current.src = fallbackUrl;
        audioRef.current
          .play()
          .then(() => {
            setIsPlayingAudio(true);
            showAmalToast('مستند اردو ترجمہ و تفسیری قرأت (کنز الایمان) جاری ہے۔', 'info');
          })
          .catch(() => {
            setIsPlayingAudio(false);
            setActiveAudioKey(null);
          });
        return;
      }
    }
    showAmalToast('آڈیو پلے بیک میں عارضی تعطل پیش آیا۔ دوبارہ کوشش کریں۔', 'warning');
    setIsPlayingAudio(false);
    setActiveAudioKey(null);
  };

  const toggleContinuousPlay = () => {
    if (continuousIndex !== null) {
      if (audioRef.current) audioRef.current.pause();
      setContinuousIndex(null);
      setIsPlayingAudio(false);
    } else {
      handlePlayContinuousAll(0);
    }
  };

  return {
    audioRef,
    activeAudioKey,
    isPlayingAudio,
    continuousIndex,
    handlePlayAyahAudio,
    handlePlayTafseerAudio,
    handlePlayContinuousAll,
    handleAudioEnded,
    handleAudioError,
    toggleContinuousPlay,
  };
}
