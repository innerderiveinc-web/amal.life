import React, { useState, useEffect } from 'react';
import { QuranSurahMeta } from '../../lib/quran-114-directory';
import { QuranSurahData } from '../../lib/quran-surahs-data';
import { AudioSyncMode, AudioSegment } from './FloatingQuranAudioPlayer';
import { AyahShareCardModal } from './AyahShareCardModal';
import { SurahReaderHeader } from './SurahReaderHeader';
import { AyahFocusModeView } from './AyahFocusModeView';
import { AyahScrollView } from './AyahScrollView';

export interface SurahReaderWorkspaceProps {
  currentSurahMeta: QuranSurahMeta;
  currentSurah: QuranSurahData;
  selectedSurahNumber: number;
  playingAyahNumber: number | null;
  audioSyncMode: AudioSyncMode;
  surahWideAudioType: 'KANZUL_IMAN' | 'TAFSEER' | null;
  isPlayingPaused: boolean;
  currentAudioSegment: AudioSegment;
  isSurahSettingsOpen: boolean;
  setIsSurahSettingsOpen: (open: boolean) => void;
  selectedQari: 'alafasy' | 'husary' | 'minshawi';
  setSelectedQari: (qari: 'alafasy' | 'husary' | 'minshawi') => void;
  playbackSpeed: number;
  setPlaybackSpeed: (speed: number) => void;
  isSurahCachedOffline: boolean;
  isCachingSurah: boolean;
  handleCacheSurahOffline: () => void;
  handleDownloadSurahAudio: () => void;
  showRomanUrdu: boolean;
  setShowRomanUrdu: (show: boolean) => void;
  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
  isLoadingSurah: boolean;
  surahFetchError: string | null;
  handlePlaySurahKanzulIman: () => void;
  handlePlaySurahUrduOnly: () => void;
  handlePlaySurahTafseer: () => void;
  handlePlaySurahTilawatOnly: () => void;
  handlePlayAyahAudio: (ayahNum: number, segment: AudioSegment) => void;
  onOpenWisdomModal: (surahNumber: number, ayahNumber: number) => void;
  viewMode?: 'SCROLL' | 'FOCUS';
  setViewMode?: (mode: 'SCROLL' | 'FOCUS') => void;
  focusedAyahNumber?: number;
  setFocusedAyahNumber?: React.Dispatch<React.SetStateAction<number>>;
  continuousSurahPlayback?: boolean;
  setContinuousSurahPlayback?: (val: boolean) => void;
}

export const SurahReaderWorkspace: React.FC<SurahReaderWorkspaceProps> = ({
  currentSurahMeta,
  currentSurah,
  selectedSurahNumber,
  playingAyahNumber,
  audioSyncMode,
  surahWideAudioType,
  isPlayingPaused,
  currentAudioSegment,
  isSurahSettingsOpen,
  setIsSurahSettingsOpen,
  selectedQari,
  setSelectedQari,
  playbackSpeed,
  setPlaybackSpeed,
  isSurahCachedOffline,
  isCachingSurah,
  handleCacheSurahOffline,
  handleDownloadSurahAudio,
  showRomanUrdu,
  setShowRomanUrdu,
  fontSize,
  setFontSize,
  isLoadingSurah,
  surahFetchError,
  handlePlaySurahKanzulIman,
  handlePlaySurahUrduOnly,
  handlePlaySurahTafseer,
  handlePlaySurahTilawatOnly,
  handlePlayAyahAudio,
  onOpenWisdomModal,
  viewMode = 'SCROLL',
  setViewMode,
  focusedAyahNumber = 1,
  setFocusedAyahNumber,
  continuousSurahPlayback = true,
  setContinuousSurahPlayback,
}) => {
  const [shareModalAyah, setShareModalAyah] = useState<{
    surahNumber: number;
    surahNameArabic: string;
    surahNameEnglish: string;
    surahNameUrdu: string;
    ayahNumber: number;
    arabicText: string;
    urduTranslation: string;
    englishTranslation?: string;
  } | null>(null);

  // Auto-scroll to focused Ayah in Continuous Scroll view when resuming or jumping
  useEffect(() => {
    if (viewMode === 'SCROLL' && focusedAyahNumber && focusedAyahNumber > 1) {
      const timer = setTimeout(() => {
        const el = document.getElementById(`ayah-${focusedAyahNumber}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [focusedAyahNumber, viewMode, selectedSurahNumber]);

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        border: '1px solid #E2E8F0',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
      }}
    >
      <SurahReaderHeader
        currentSurahMeta={currentSurahMeta}
        currentSurah={currentSurah}
        selectedSurahNumber={selectedSurahNumber}
        playingAyahNumber={playingAyahNumber}
        audioSyncMode={audioSyncMode}
        surahWideAudioType={surahWideAudioType}
        isPlayingPaused={isPlayingPaused}
        isSurahSettingsOpen={isSurahSettingsOpen}
        setIsSurahSettingsOpen={setIsSurahSettingsOpen}
        viewMode={viewMode}
        setViewMode={setViewMode}
        selectedQari={selectedQari}
        setSelectedQari={setSelectedQari}
        playbackSpeed={playbackSpeed}
        setPlaybackSpeed={setPlaybackSpeed}
        continuousSurahPlayback={continuousSurahPlayback}
        setContinuousSurahPlayback={setContinuousSurahPlayback}
        isSurahCachedOffline={isSurahCachedOffline}
        isCachingSurah={isCachingSurah}
        handleCacheSurahOffline={handleCacheSurahOffline}
        handleDownloadSurahAudio={handleDownloadSurahAudio}
        showRomanUrdu={showRomanUrdu}
        setShowRomanUrdu={setShowRomanUrdu}
        fontSize={fontSize}
        setFontSize={setFontSize}
        handlePlaySurahKanzulIman={handlePlaySurahKanzulIman}
        handlePlaySurahUrduOnly={handlePlaySurahUrduOnly}
        handlePlaySurahTafseer={handlePlaySurahTafseer}
        handlePlaySurahTilawatOnly={handlePlaySurahTilawatOnly}
      />

      {/* Loading / Error States */}
      {isLoadingSurah && (
        <div style={{ padding: 40, textAlign: 'center', color: '#64748B' }}>
          <span style={{ fontSize: 24, display: 'inline-block' }}>⏳</span>
          <p style={{ margin: '8px 0 0', fontSize: 14 }}>سورت مبارکہ کے الفاظ اور مستند ترجمہ لوڈ ہو رہا ہے...</p>
        </div>
      )}

      {surahFetchError && (
        <div style={{ margin: 16, padding: 14, borderRadius: 10, backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#991B1B', fontSize: 13 }}>
          ⚠️ {surahFetchError}
        </div>
      )}

      {/* Single Ayah Focus & Slide Mode */}
      {!isLoadingSurah && viewMode === 'FOCUS' && (
        <AyahFocusModeView
          currentSurah={currentSurah}
          currentSurahMeta={currentSurahMeta}
          selectedSurahNumber={selectedSurahNumber}
          focusedAyahNumber={focusedAyahNumber}
          setFocusedAyahNumber={setFocusedAyahNumber}
          playingAyahNumber={playingAyahNumber}
          isPlayingPaused={isPlayingPaused}
          currentAudioSegment={currentAudioSegment}
          handlePlayAyahAudio={handlePlayAyahAudio}
          onOpenWisdomModal={onOpenWisdomModal}
          fontSize={fontSize}
          showRomanUrdu={showRomanUrdu}
          onOpenShareModal={setShareModalAyah}
        />
      )}

      {/* Continuous Scroll View */}
      {!isLoadingSurah && viewMode === 'SCROLL' && (
        <AyahScrollView
          currentSurah={currentSurah}
          currentSurahMeta={currentSurahMeta}
          selectedSurahNumber={selectedSurahNumber}
          playingAyahNumber={playingAyahNumber}
          focusedAyahNumber={focusedAyahNumber}
          setFocusedAyahNumber={setFocusedAyahNumber}
          currentAudioSegment={currentAudioSegment}
          isPlayingPaused={isPlayingPaused}
          handlePlayAyahAudio={handlePlayAyahAudio}
          onOpenWisdomModal={onOpenWisdomModal}
          onOpenShareModal={setShareModalAyah}
          fontSize={fontSize}
          showRomanUrdu={showRomanUrdu}
        />
      )}

      {/* Sacred Ayah Share Card Modal */}
      {shareModalAyah && (
        <AyahShareCardModal
          isOpen={!!shareModalAyah}
          onClose={() => setShareModalAyah(null)}
          surahNumber={shareModalAyah.surahNumber}
          surahNameArabic={shareModalAyah.surahNameArabic}
          surahNameEnglish={shareModalAyah.surahNameEnglish}
          surahNameUrdu={shareModalAyah.surahNameUrdu}
          ayahNumber={shareModalAyah.ayahNumber}
          arabicText={shareModalAyah.arabicText}
          urduTranslation={shareModalAyah.urduTranslation}
          englishTranslation={shareModalAyah.englishTranslation}
        />
      )}
    </div>
  );
};
