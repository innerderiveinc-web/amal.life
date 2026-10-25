import React from 'react';
import { QuranSurahData } from '../../lib/quran-surahs-data';
import { useLanguage } from '../../context/LanguageContext';
import { AudioSegment } from './FloatingQuranAudioPlayer';

export interface FloatingPlayerPlaybackControlsProps {
  playingAyahNumber: number | null;
  currentSurah: QuranSurahData | undefined;
  selectedSurahNumber: number;
  currentAudioSegment: AudioSegment;
  isPlayingPaused: boolean;
  togglePlayPause: () => void;
  handlePlayAyahAudio: (ayahNum: number, segment: AudioSegment) => void;
  handleSelectSurah?: (surahNum: number, targetAyahNumber?: number) => void;
  handleAdvanceToNextSurah?: (segment?: AudioSegment) => void;
}

export const FloatingPlayerPlaybackControls: React.FC<FloatingPlayerPlaybackControlsProps> = ({
  playingAyahNumber,
  currentSurah,
  selectedSurahNumber,
  currentAudioSegment,
  isPlayingPaused,
  togglePlayPause,
  handlePlayAyahAudio,
  handleSelectSurah,
  handleAdvanceToNextSurah,
}) => {
  const { t } = useLanguage();

  const isNextDisabled =
    playingAyahNumber === null ||
    (!currentSurah && selectedSurahNumber >= 114) ||
    (currentSurah && playingAyahNumber >= currentSurah.verses.length && selectedSurahNumber >= 114);

  const isPrevDisabled =
    playingAyahNumber === null || (playingAyahNumber <= 1 && selectedSurahNumber <= 1);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
      <button
        onClick={() => {
          if (playingAyahNumber !== null) {
            if (playingAyahNumber > 1) {
              handlePlayAyahAudio(playingAyahNumber - 1, currentAudioSegment);
            } else if (selectedSurahNumber > 1 && handleSelectSurah) {
              const prevSurah = selectedSurahNumber - 1;
              handleSelectSurah(prevSurah, 1);
              handlePlayAyahAudio(1, currentAudioSegment);
            }
          }
        }}
        disabled={isPrevDisabled}
        aria-label="Previous Ayah"
        style={{
          width: 38,
          height: 38,
          borderRadius: '50%',
          backgroundColor: isPrevDisabled ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)',
          color: isPrevDisabled ? '#6B7280' : '#FFFFFF',
          border: 'none',
          fontSize: 14,
          cursor: isPrevDisabled ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        title={t('Previous Ayah', 'پچھلی آیت')}
      >
        ⏮
      </button>

      <button
        onClick={togglePlayPause}
        aria-label={isPlayingPaused ? 'Resume Audio' : 'Pause Audio'}
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
        title={isPlayingPaused ? t('Play', 'چلائیں') : t('Pause', 'وقفہ')}
      >
        {isPlayingPaused ? '▶' : '⏸'}
      </button>

      <button
        onClick={() => {
          if (playingAyahNumber !== null && currentSurah) {
            if (playingAyahNumber < currentSurah.verses.length) {
              handlePlayAyahAudio(playingAyahNumber + 1, currentAudioSegment);
            } else if (selectedSurahNumber < 114 && handleAdvanceToNextSurah) {
              handleAdvanceToNextSurah(currentAudioSegment);
            }
          }
        }}
        disabled={isNextDisabled}
        aria-label="Next Ayah"
        style={{
          width: 38,
          height: 38,
          borderRadius: '50%',
          backgroundColor: isNextDisabled ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)',
          color: isNextDisabled ? '#6B7280' : '#FFFFFF',
          border: 'none',
          fontSize: 14,
          cursor: isNextDisabled ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        title={t('Next Ayah', 'اگلی آیت')}
      >
        ⏭
      </button>
    </div>
  );
};
