import React from 'react';
import { QuranSurahMeta } from '../../lib/quran-114-directory';
import { QuranSurahData } from '../../lib/quran-surahs-data';
import { FloatingPlayerTrackMeta } from './FloatingPlayerTrackMeta';
import { FloatingPlayerPlaybackControls } from './FloatingPlayerPlaybackControls';
import { FloatingPlayerAuxiliaryControls } from './FloatingPlayerAuxiliaryControls';

export type AudioSyncMode =
  | 'FULL_SYNC'
  | 'TILAWAT_URDU_SYNC'
  | 'TILAWAT_ONLY'
  | 'URDU_ONLY_CONTINUOUS'
  | 'TAFSEER_BROADCAST';
export type AudioSegment = 'ARABIC' | 'URDU' | 'TAFSEER';

export interface FloatingQuranAudioPlayerProps {
  playingAyahNumber: number | null;
  surahWideAudioType: 'KANZUL_IMAN' | 'TAFSEER' | null;
  activeTafseerCardKey: string | null;
  currentAudioSegment: AudioSegment;
  currentSurahMeta: QuranSurahMeta | undefined;
  currentSurah: QuranSurahData | undefined;
  selectedQari: 'alafasy' | 'husary' | 'minshawi';
  isPlayingPaused: boolean;
  playbackSpeed: number;
  setPlaybackSpeed: (speed: number) => void;
  isSurahCachedOffline: boolean;
  isCachingSurah: boolean;
  handleCacheSurahOffline: () => void;
  audioSyncMode: AudioSyncMode;
  setAudioSyncMode: React.Dispatch<React.SetStateAction<AudioSyncMode>>;
  handlePlayAyahAudio: (ayahNum: number, segment: AudioSegment) => void;
  togglePlayPause: () => void;
  handleStopAudio: () => void;
  onOpenWisdomModal: (surahNumber: number, ayahNumber: number) => void;
  selectedSurahNumber: number;
  continuousSurahPlayback?: boolean;
  setContinuousSurahPlayback?: (val: boolean) => void;
  handleAdvanceToNextSurah?: (segment?: AudioSegment) => void;
  handleSelectSurah?: (surahNum: number, targetAyahNumber?: number) => void;
}

export const FloatingQuranAudioPlayer: React.FC<FloatingQuranAudioPlayerProps> = ({
  playingAyahNumber,
  surahWideAudioType,
  activeTafseerCardKey,
  currentAudioSegment,
  currentSurahMeta,
  currentSurah,
  selectedQari,
  isPlayingPaused,
  playbackSpeed,
  setPlaybackSpeed,
  isSurahCachedOffline,
  isCachingSurah,
  handleCacheSurahOffline,
  audioSyncMode,
  setAudioSyncMode,
  handlePlayAyahAudio,
  togglePlayPause,
  handleStopAudio,
  onOpenWisdomModal,
  selectedSurahNumber,
  continuousSurahPlayback = true,
  setContinuousSurahPlayback,
  handleAdvanceToNextSurah,
  handleSelectSurah,
}) => {
  if (playingAyahNumber === null && surahWideAudioType === null && activeTafseerCardKey === null) {
    return null;
  }

  return (
    <div
      className="floating-quran-player"
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
        <FloatingPlayerTrackMeta
          surahWideAudioType={surahWideAudioType}
          activeTafseerCardKey={activeTafseerCardKey}
          currentAudioSegment={currentAudioSegment}
          currentSurahMeta={currentSurahMeta}
          selectedQari={selectedQari}
          playingAyahNumber={playingAyahNumber}
        />

        {/* Center: Playback Controls (Prev, Play/Pause, Next) */}
        <FloatingPlayerPlaybackControls
          playingAyahNumber={playingAyahNumber}
          currentSurah={currentSurah}
          selectedSurahNumber={selectedSurahNumber}
          currentAudioSegment={currentAudioSegment}
          isPlayingPaused={isPlayingPaused}
          togglePlayPause={togglePlayPause}
          handlePlayAyahAudio={handlePlayAyahAudio}
          handleSelectSurah={handleSelectSurah}
          handleAdvanceToNextSurah={handleAdvanceToNextSurah}
        />

        {/* Right: Audio Speed, Continuous Surah Toggle, Sync Mode Switch, Cache, Wisdom & Close */}
        <FloatingPlayerAuxiliaryControls
          playbackSpeed={playbackSpeed}
          setPlaybackSpeed={setPlaybackSpeed}
          continuousSurahPlayback={continuousSurahPlayback}
          setContinuousSurahPlayback={setContinuousSurahPlayback}
          isSurahCachedOffline={isSurahCachedOffline}
          isCachingSurah={isCachingSurah}
          handleCacheSurahOffline={handleCacheSurahOffline}
          audioSyncMode={audioSyncMode}
          setAudioSyncMode={setAudioSyncMode}
          onOpenWisdomModal={onOpenWisdomModal}
          selectedSurahNumber={selectedSurahNumber}
          playingAyahNumber={playingAyahNumber}
          handleStopAudio={handleStopAudio}
        />
      </div>
    </div>
  );
};
