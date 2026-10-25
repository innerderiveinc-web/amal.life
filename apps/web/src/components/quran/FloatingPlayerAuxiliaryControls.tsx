import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { AudioSyncMode } from './FloatingQuranAudioPlayer';

export interface FloatingPlayerAuxiliaryControlsProps {
  playbackSpeed: number;
  setPlaybackSpeed: (speed: number) => void;
  continuousSurahPlayback?: boolean;
  setContinuousSurahPlayback?: (val: boolean) => void;
  isSurahCachedOffline: boolean;
  isCachingSurah: boolean;
  handleCacheSurahOffline: () => void;
  audioSyncMode: AudioSyncMode;
  setAudioSyncMode: React.Dispatch<React.SetStateAction<AudioSyncMode>>;
  onOpenWisdomModal: (surahNumber: number, ayahNumber: number) => void;
  selectedSurahNumber: number;
  playingAyahNumber: number | null;
  handleStopAudio: () => void;
}

export const FloatingPlayerAuxiliaryControls: React.FC<FloatingPlayerAuxiliaryControlsProps> = ({
  playbackSpeed,
  setPlaybackSpeed,
  continuousSurahPlayback = true,
  setContinuousSurahPlayback,
  isSurahCachedOffline,
  isCachingSurah,
  handleCacheSurahOffline,
  audioSyncMode,
  setAudioSyncMode,
  onOpenWisdomModal,
  selectedSurahNumber,
  playingAyahNumber,
  handleStopAudio,
}) => {
  const { t, isUrdu } = useLanguage();

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
      {/* Continuous Surah Toggle Button */}
      {setContinuousSurahPlayback && (
        <button
          type="button"
          onClick={() => setContinuousSurahPlayback(!continuousSurahPlayback)}
          aria-label="Toggle Continuous Surah Autoplay"
          style={{
            padding: '5px 10px',
            borderRadius: 16,
            fontSize: 11,
            fontWeight: 700,
            backgroundColor: continuousSurahPlayback ? '#047857' : 'rgba(255,255,255,0.12)',
            color: '#FFFFFF',
            border: continuousSurahPlayback
              ? '1px solid #34D399'
              : '1px solid rgba(255,255,255,0.2)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
          title={
            continuousSurahPlayback
              ? 'سورت مکمل ہونے پر اگلی سورت خودکار جاری رہے گی'
              : 'سورت مکمل ہونے پر آڈیو رک جائے گی'
          }
        >
          <span>🔄</span>
          <span>
            {continuousSurahPlayback
              ? isUrdu
                ? 'اگلی سورت: آن'
                : 'Auto-Next: ON'
              : isUrdu
                ? 'اگلی سورت: بند'
                : 'Auto-Next: OFF'}
          </span>
        </button>
      )}

      {/* Playback Speed Pill Group */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          backgroundColor: 'rgba(255,255,255,0.12)',
          padding: '2px 4px',
          borderRadius: 16,
        }}
      >
        {[0.75, 1, 1.25, 1.5].map((speed) => (
          <button
            key={speed}
            type="button"
            onClick={() => setPlaybackSpeed(speed)}
            aria-label={`Playback speed ${speed}x`}
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

      {/* Offline Caching Button */}
      <button
        type="button"
        onClick={handleCacheSurahOffline}
        disabled={isCachingSurah}
        aria-label="Cache Surah Offline"
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

      {/* Audio Sync Mode Toggle */}
      <button
        onClick={() =>
          setAudioSyncMode((prev) => {
            if (prev === 'FULL_SYNC' || prev === 'TILAWAT_URDU_SYNC') return 'URDU_ONLY_CONTINUOUS';
            if (prev === 'URDU_ONLY_CONTINUOUS') return 'TILAWAT_ONLY';
            return 'FULL_SYNC';
          })
        }
        aria-label="Toggle Audio Mode"
        style={{
          padding: '6px 12px',
          borderRadius: 20,
          fontSize: 11,
          fontWeight: 700,
          backgroundColor:
            audioSyncMode === 'FULL_SYNC' || audioSyncMode === 'TILAWAT_URDU_SYNC'
              ? '#10B981'
              : audioSyncMode === 'URDU_ONLY_CONTINUOUS'
                ? '#0284C7'
                : 'rgba(255,255,255,0.15)',
          color: '#FFFFFF',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}
        title={t('Change Audio Mode', 'آڈیو موڈ تبدیل کریں')}
      >
        <span>
          {audioSyncMode === 'FULL_SYNC' || audioSyncMode === 'TILAWAT_URDU_SYNC'
            ? t('🎧 Recitation + Translation (Sync)', '🎧 تلاوت + اردو (Sync)')
            : audioSyncMode === 'URDU_ONLY_CONTINUOUS'
              ? t('🎙️ Translation Only', '🎙️ صرف اردو ترجمہ')
              : audioSyncMode === 'TAFSEER_BROADCAST'
                ? t('📖 Tafsir Studio', '📖 تفسیر سٹوڈیو')
                : t('🎙️ Recitation Only', '🎙️ صرف عربی تلاوت')}
        </span>
      </button>

      {/* Wisdom & Tafsir Shortcut */}
      <button
        onClick={() => onOpenWisdomModal(selectedSurahNumber, playingAyahNumber || 1)}
        aria-label="Open Wisdom and Tafseer Card"
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
        <span>{t('Wisdom & Tafsir', 'حکمت و تفسیر')}</span>
      </button>

      {/* Close Button */}
      <button
        onClick={handleStopAudio}
        aria-label="Close Audio Player"
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
        title={t('Close', 'بند کریں')}
      >
        ✕
      </button>
    </div>
  );
};
