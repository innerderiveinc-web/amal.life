import { useEffect } from 'react';
import { ALL_114_SURAHS, QuranSurahMeta } from '../../lib/quran-114-directory';
import { QuranSurahData } from '../../lib/quran-surahs-data';
import { AudioSegment } from './FloatingQuranAudioPlayer';

export interface UseQuranMediaSessionOptions {
  masterAudioRef: React.MutableRefObject<HTMLAudioElement | null>;
  playingAyahNumber: number | null;
  currentAudioSegment: AudioSegment;
  selectedSurahNumber: number;
  selectedQari: 'alafasy' | 'husary' | 'minshawi';
  currentSurah: QuranSurahData;
  currentSurahMeta: QuranSurahMeta;
  isUrdu: boolean;
  t: (en: string, ur: string, ar?: string) => string;
  setIsPlayingPaused: (val: boolean) => void;
  setSelectedSurahNumber: (num: number) => void;
  onSelectSurah: (surahNum: number, targetAyahNumber?: number) => void;
  handlePlayAyahAudio: (ayahNum: number, segment: AudioSegment) => void;
  handleAdvanceToNextSurah: (segment: AudioSegment) => void;
  handleStopAudio: () => void;
}

export function useQuranMediaSession({
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
}: UseQuranMediaSessionOptions) {
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
    masterAudioRef,
    setIsPlayingPaused,
    setSelectedSurahNumber,
    onSelectSurah,
    handlePlayAyahAudio,
    handleAdvanceToNextSurah,
    handleStopAudio,
    isUrdu,
    t,
  ]);
}
