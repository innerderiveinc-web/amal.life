import React from 'react';
import { QuranSurahMeta } from '../../lib/quran-114-directory';
import { QuranSurahData } from '../../lib/quran-surahs-data';
import { useLanguage } from '../../context/LanguageContext';

export type AudioSyncMode = 'FULL_SYNC' | 'TILAWAT_URDU_SYNC' | 'TILAWAT_ONLY' | 'URDU_ONLY_CONTINUOUS' | 'TAFSEER_BROADCAST';
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
}) => {
  const { t, isUrdu } = useLanguage();
  if (playingAyahNumber === null && surahWideAudioType === null && activeTafseerCardKey === null) {
    return null;
  }

  const isNextDisabled = playingAyahNumber === null || !currentSurah || playingAyahNumber >= currentSurah.verses.length;
  const isPrevDisabled = playingAyahNumber === null || playingAyahNumber <= 1;

  return (
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
                  ? t('Full Surah + Translation', 'مکمل سورت + ترجمہ کنز الایمان')
                  : surahWideAudioType === 'TAFSEER'
                    ? t('Full Tafsir Audio', 'مکمل اردو تفسیر آڈیو')
                    : activeTafseerCardKey !== null
                      ? t('Khaza\'in-ul-Irfan Tafsir', 'خزائن العرفان (تفسیری حکمت)')
                      : currentAudioSegment === 'URDU'
                        ? t('Translation (Kanz-ul-Iman)', 'اردو ترجمہ (کنز الایمان)')
                        : t('Arabic Recitation', 'عربی تلاوت')}
              </span>
              <span style={{ fontSize: 11, color: '#A7F3D0', fontWeight: 600 }}>
                {surahWideAudioType === 'KANZUL_IMAN'
                  ? t('100% Real Human Voice', '100% Real Human Voice (مولانا عبد الحبیب عطاری)')
                  : surahWideAudioType === 'TAFSEER'
                    ? t('Studio Tafsir Audio', 'مستند سٹوڈیو تفسیر')
                    : activeTafseerCardKey !== null
                      ? t('Allama Muradabadi', 'صدر الافاضل مولانا نعیم الدین مراد آبادی')
                      : currentAudioSegment === 'URDU'
                        ? '100% Real Human Voice'
                        : (selectedQari === 'alafasy'
                            ? (isUrdu ? 'مشاری العفاسی' : 'Mishary Alafasy')
                            : selectedQari === 'husary'
                              ? (isUrdu ? 'محمود خلیل الحصری' : 'Mahmoud Al-Husary')
                              : (isUrdu ? 'محمد صدیق المنشاوی' : 'Siddiq Al-Minshawi'))}
              </span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {surahWideAudioType
                ? (isUrdu
                    ? `سورۃ ${currentSurahMeta?.nameUrdu} (${currentSurahMeta?.nameTransliterated})`
                    : `Surah ${currentSurahMeta?.nameTransliterated} (${currentSurahMeta?.nameArabic})`)
                : activeTafseerCardKey
                  ? t('Wisdom & Commentary Audio Recitation', 'حکمت و تفسیری عبارت کی صوتی قرأت')
                  : (isUrdu
                      ? `سورۃ ${currentSurahMeta?.nameUrdu} (${currentSurahMeta?.nameTransliterated}) · آیت ${playingAyahNumber}`
                      : `Surah ${currentSurahMeta?.nameTransliterated} (${currentSurahMeta?.nameArabic}) · Verse ${playingAyahNumber}`)}
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
              if (playingAyahNumber !== null && currentSurah && playingAyahNumber < currentSurah.verses.length) {
                handlePlayAyahAudio(playingAyahNumber + 1, currentAudioSegment);
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

        {/* Right: Audio Speed, Sync Mode Switch, Cache, Wisdom & Close */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {/* Playback Speed Pill Group */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 2, backgroundColor: 'rgba(255,255,255,0.12)', padding: '2px 4px', borderRadius: 16 }}>
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

          <button
            onClick={() => setAudioSyncMode((prev) => {
              if (prev === 'FULL_SYNC' || prev === 'TILAWAT_URDU_SYNC') return 'URDU_ONLY_CONTINUOUS';
              if (prev === 'URDU_ONLY_CONTINUOUS') return 'TILAWAT_ONLY';
              return 'FULL_SYNC';
            })}
            aria-label="Toggle Audio Mode"
            style={{
              padding: '6px 12px',
              borderRadius: 20,
              fontSize: 11,
              fontWeight: 700,
              backgroundColor: (audioSyncMode === 'FULL_SYNC' || audioSyncMode === 'TILAWAT_URDU_SYNC') ? '#10B981' : audioSyncMode === 'URDU_ONLY_CONTINUOUS' ? '#0284C7' : 'rgba(255,255,255,0.15)',
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
      </div>
    </div>
  );
};
