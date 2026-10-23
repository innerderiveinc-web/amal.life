import React from 'react';
import { QuranSurahMeta } from '../../lib/quran-114-directory';
import { QuranSurahData } from '../../lib/quran-surahs-data';
import { getAyahWisdomCard } from '../../lib/quran-wisdom-data';
import { getAyahRomanTransliteration, getAyahRomanUrduTarjuma } from '../../lib/quran-roman-urdu';
import { AudioSyncMode, AudioSegment } from './FloatingQuranAudioPlayer';

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
}) => {
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
      {/* Surah Header Banner */}
      <div
        style={{
          padding: '20px 24px',
          borderBottom: '1px solid #E2E8F0',
          backgroundColor: '#F8FAFC',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: '#166534', backgroundColor: '#DCFCE7', padding: '2px 8px', borderRadius: 6 }}>
              سورۃ {currentSurahMeta.number}
            </span>
            <span style={{ fontSize: 12, color: '#64748B' }}>
              {currentSurahMeta.revelationType === 'MECCAN' ? 'مکی سورت' : 'مدنی سورت'} · {currentSurah.ayahsCount} آیات
            </span>
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', margin: 0 }}>
            {currentSurahMeta.nameTransliterated} ({currentSurahMeta.nameUrdu})
          </h2>
        </div>

        {/* Audio & Display Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {/* 1. Full Surah Tilawat + Tarjuma Kanz-ul-Iman Sync */}
          <button
            type="button"
            onClick={handlePlaySurahKanzulIman}
            aria-label="Play full Surah with Tilawat and Urdu Tarjuma synchronized"
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              backgroundColor: (audioSyncMode === 'FULL_SYNC' || audioSyncMode === 'TILAWAT_URDU_SYNC') && playingAyahNumber !== null ? '#047857' : '#166534',
              color: '#FFFFFF',
              border: 'none',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              boxShadow: '0 2px 6px rgba(22, 101, 52, 0.3)',
            }}
            title="Arabic Tilawat + Authentic Urdu Tarjuma verse-by-verse sync"
          >
            <span>🎧</span>
            <span>{(audioSyncMode === 'FULL_SYNC' || audioSyncMode === 'TILAWAT_URDU_SYNC') && playingAyahNumber !== null ? '⏸ Pause Sync' : 'Tilawat + Urdu Tarjuma (Sync)'}</span>
          </button>

          {/* 2. Entire Urdu Tarjuma Continuous in One Go */}
          <button
            type="button"
            onClick={handlePlaySurahUrduOnly}
            aria-label="Play entire Urdu Tarjuma continuously"
            style={{
              padding: '8px 14px',
              borderRadius: 8,
              backgroundColor: (audioSyncMode === 'URDU_ONLY_CONTINUOUS' && playingAyahNumber !== null) ? '#0369A1' : '#0284C7',
              color: '#FFFFFF',
              border: 'none',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              boxShadow: '0 2px 4px rgba(2, 132, 199, 0.2)',
            }}
            title="Listen to full Urdu Tarjuma Kanz-ul-Iman continuously"
          >
            <span>🎙️</span>
            <span>{audioSyncMode === 'URDU_ONLY_CONTINUOUS' && playingAyahNumber !== null ? '⏸ Pause Urdu' : 'Urdu Tarjuma (Continuous)'}</span>
          </button>

          {/* 3. Full Surah Studio Tafseer Audio (Dawat-e-Islami Sirat-ul-Jinan) */}
          <button
            type="button"
            onClick={handlePlaySurahTafseer}
            aria-label="Play full studio Tafseer Sirat-ul-Jinan"
            style={{
              padding: '8px 14px',
              borderRadius: 8,
              backgroundColor: (surahWideAudioType === 'TAFSEER' || audioSyncMode === 'TAFSEER_BROADCAST') ? '#92400E' : '#FFFBEB',
              color: (surahWideAudioType === 'TAFSEER' || audioSyncMode === 'TAFSEER_BROADCAST') ? '#FFFFFF' : '#92400E',
              border: '1px solid #FDE68A',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
            title="Listen to full studio Tafseer Sirat-ul-Jinan"
          >
            <span>📖</span>
            <span>{(surahWideAudioType === 'TAFSEER' || audioSyncMode === 'TAFSEER_BROADCAST') ? (isPlayingPaused ? '▶ Resume Tafseer' : '⏸ Pause Tafseer') : 'Full Tafseer (Sirat-ul-Jinan)'}</span>
          </button>

          {/* 4. Continuous Arabic Tilawat Only */}
          <button
            type="button"
            onClick={handlePlaySurahTilawatOnly}
            aria-label="Play Arabic Tilawat only continuously"
            style={{
              padding: '8px 14px',
              borderRadius: 8,
              backgroundColor: (audioSyncMode === 'TILAWAT_ONLY' && playingAyahNumber !== null) ? '#0F766E' : '#F1F5F9',
              color: (audioSyncMode === 'TILAWAT_ONLY' && playingAyahNumber !== null) ? '#FFFFFF' : '#334155',
              border: '1px solid #CBD5E1',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
            title="Continuous Arabic Tilawat of the full Surah"
          >
            <span>▶</span>
            <span>{audioSyncMode === 'TILAWAT_ONLY' && playingAyahNumber !== null ? '⏸ Pause Tilawat' : 'Arabic Tilawat Only'}</span>
          </button>

          {/* 5. Clean Settings & Download Drawer Toggle */}
          <button
            type="button"
            onClick={() => setIsSurahSettingsOpen(!isSurahSettingsOpen)}
            aria-label="Toggle Surah Settings and Audio Options"
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              backgroundColor: isSurahSettingsOpen ? '#1E293B' : '#F1F5F9',
              color: isSurahSettingsOpen ? '#FFFFFF' : '#475569',
              border: '1px solid #CBD5E1',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
            title="قاری، رفتار، آف لائن کیش اور فونٹ ترتیبات"
          >
            <span>⚙️</span>
            <span>{isSurahSettingsOpen ? 'اختیارات بند کریں ▲' : 'مزید اختیارات ▼'}</span>
          </button>
        </div>
      </div>

      {/* EXPANDABLE SETTINGS & OFFLINE PANEL */}
      {isSurahSettingsOpen && (
        <div
          style={{
            padding: '16px 24px',
            backgroundColor: '#F8FAFC',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Qari Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#475569' }}>قاری:</span>
            <div style={{ display: 'flex', gap: 2, backgroundColor: '#E2E8F0', padding: 2, borderRadius: 6 }}>
              <button
                onClick={() => setSelectedQari('alafasy')}
                aria-label="Reciter Alafasy"
                style={{
                  padding: '4px 8px',
                  borderRadius: 4,
                  fontSize: 11,
                  fontWeight: selectedQari === 'alafasy' ? 800 : 500,
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: selectedQari === 'alafasy' ? '#166534' : 'transparent',
                  color: selectedQari === 'alafasy' ? '#FFFFFF' : '#334155',
                }}
              >
                العفاسی
              </button>
              <button
                onClick={() => setSelectedQari('husary')}
                aria-label="Reciter Husary"
                style={{
                  padding: '4px 8px',
                  borderRadius: 4,
                  fontSize: 11,
                  fontWeight: selectedQari === 'husary' ? 800 : 500,
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: selectedQari === 'husary' ? '#166534' : 'transparent',
                  color: selectedQari === 'husary' ? '#FFFFFF' : '#334155',
                }}
              >
                الحصری
              </button>
              <button
                onClick={() => setSelectedQari('minshawi')}
                aria-label="Reciter Minshawi"
                style={{
                  padding: '4px 8px',
                  borderRadius: 4,
                  fontSize: 11,
                  fontWeight: selectedQari === 'minshawi' ? 800 : 500,
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: selectedQari === 'minshawi' ? '#166534' : 'transparent',
                  color: selectedQari === 'minshawi' ? '#FFFFFF' : '#334155',
                }}
              >
                المنشاوی
              </button>
            </div>
          </div>

          {/* Playback Speed Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#475569' }}>رفتار:</span>
            <div style={{ display: 'flex', gap: 2, backgroundColor: '#E2E8F0', padding: 2, borderRadius: 6 }}>
              {[0.75, 1, 1.25, 1.5].map((speed) => (
                <button
                  key={speed}
                  type="button"
                  onClick={() => setPlaybackSpeed(speed)}
                  aria-label={`Speed ${speed}x`}
                  style={{
                    padding: '3px 7px',
                    borderRadius: 4,
                    fontSize: 11,
                    fontWeight: 800,
                    border: 'none',
                    backgroundColor: playbackSpeed === speed ? '#166534' : 'transparent',
                    color: playbackSpeed === speed ? '#FFFFFF' : '#64748B',
                    cursor: 'pointer',
                  }}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>

          {/* Offline Caching & Download Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              type="button"
              onClick={handleCacheSurahOffline}
              disabled={isCachingSurah}
              aria-label="Cache Surah Offline"
              style={{
                padding: '5px 12px',
                borderRadius: 6,
                backgroundColor: isSurahCachedOffline ? '#DCFCE7' : '#FFFFFF',
                color: isSurahCachedOffline ? '#166534' : '#334155',
                border: '1px solid',
                borderColor: isSurahCachedOffline ? '#86EFAC' : '#CBD5E1',
                fontSize: 11,
                fontWeight: 700,
                cursor: isCachingSurah ? 'wait' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
              title="اس سورت کی آڈیو کو براؤزر میں آف لائن سننے کے لیے محفوظ کریں"
            >
              <span>{isSurahCachedOffline ? '✓' : '📥'}</span>
              <span>{isCachingSurah ? 'محفوظ ہو رہا ہے...' : isSurahCachedOffline ? 'آف لائن محفوظ ہے' : 'آف لائن کیش'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadSurahAudio}
              aria-label="Download Surah MP3 Audio"
              style={{
                padding: '5px 10px',
                borderRadius: 6,
                backgroundColor: '#FFFFFF',
                color: '#334155',
                border: '1px solid #CBD5E1',
                fontSize: 11,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
              title="سورت کی MP3 فائل ڈاؤنلوڈ کریں"
            >
              <span>💾</span>
              <span>MP3 فائل</span>
            </button>
          </div>

          {/* Roman Urdu & Font Size */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              onClick={() => setShowRomanUrdu(!showRomanUrdu)}
              aria-label="Toggle Roman Urdu Transliteration"
              style={{
                padding: '5px 10px',
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 700,
                border: '1px solid',
                borderColor: showRomanUrdu ? '#0284C7' : '#CBD5E1',
                backgroundColor: showRomanUrdu ? '#E0F2FE' : '#FFFFFF',
                color: showRomanUrdu ? '#0369A1' : '#64748B',
                cursor: 'pointer',
              }}
            >
              {showRomanUrdu ? 'Roman: ON' : 'Roman: OFF'}
            </button>

            <div style={{ display: 'flex', gap: 2, alignItems: 'center', backgroundColor: '#E2E8F0', padding: '2px 6px', borderRadius: 6 }}>
              <button
                onClick={() => setFontSize((s) => Math.max(18, s - 2))}
                aria-label="Decrease Font Size"
                style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, color: '#475569' }}
              >
                A-
              </button>
              <span style={{ fontSize: 11, color: '#475569', padding: '0 4px', fontWeight: 600 }}>{fontSize}px</span>
              <button
                onClick={() => setFontSize((s) => Math.min(36, s + 2))}
                aria-label="Increase Font Size"
                style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, color: '#475569' }}
              >
                A+
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bismillah Banner (for all except Surah At-Tawbah #9) */}
      {selectedSurahNumber !== 9 && (
        <div
          dir="rtl"
          style={{
            padding: '24px 20px',
            textAlign: 'center',
            backgroundColor: '#FAFAF9',
            borderBottom: '1px solid #F1F5F9',
            fontFamily: 'var(--font-arabic), "Amiri", serif',
            fontSize: fontSize + 2,
            color: '#166534',
          }}
        >
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </div>
      )}

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

      {/* Verses Stream */}
      {!isLoadingSurah && (
        <div style={{ padding: '8px 24px', display: 'flex', flexDirection: 'column' }}>
          {currentSurah.verses.map((verse) => {
            const isPlayingThis = playingAyahNumber === verse.ayahNumber;
            const hasWisdom = !!getAyahWisdomCard(selectedSurahNumber, verse.ayahNumber);

            return (
              <div
                key={verse.ayahNumber}
                id={`ayah-${verse.ayahNumber}`}
                style={{
                  padding: '20px 0',
                  borderBottom: '1px solid #F1F5F9',
                  backgroundColor: isPlayingThis ? '#F0FDF4' : 'transparent',
                  borderRadius: isPlayingThis ? 12 : 0,
                  transition: 'background-color 0.2s ease',
                }}
              >
                {/* Top Ayah Meta & Actions */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        backgroundColor: isPlayingThis ? '#166534' : '#E2E8F0',
                        color: isPlayingThis ? '#FFFFFF' : '#334155',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 12,
                        fontWeight: 800,
                      }}
                    >
                      {verse.ayahNumber}
                    </span>

                    <button
                      onClick={() => handlePlayAyahAudio(verse.ayahNumber, 'ARABIC')}
                      aria-label={`Play Arabic Recitation for Ayah ${verse.ayahNumber}`}
                      style={{
                        padding: '3px 8px',
                        borderRadius: 6,
                        fontSize: 11,
                        fontWeight: 700,
                        cursor: 'pointer',
                        border: '1px solid',
                        borderColor: isPlayingThis && currentAudioSegment === 'ARABIC' ? '#166534' : '#CBD5E1',
                        backgroundColor: isPlayingThis && currentAudioSegment === 'ARABIC' ? '#DCFCE7' : '#FFFFFF',
                        color: isPlayingThis && currentAudioSegment === 'ARABIC' ? '#166534' : '#475569',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <span>{isPlayingThis && currentAudioSegment === 'ARABIC' ? (isPlayingPaused ? '▶' : '⏸') : '▶'}</span>
                      <span>
                        {isPlayingThis && currentAudioSegment === 'ARABIC'
                          ? (isPlayingPaused ? 'Resume Tilawat' : '🎙️ Tilawat Playing')
                          : 'Recitation (تلاوت)'}
                      </span>
                    </button>

                    {/* Quick Urdu Tarjuma Audio button for this verse */}
                    <button
                      onClick={() => handlePlayAyahAudio(verse.ayahNumber, 'URDU')}
                      aria-label={`Play Urdu Tarjuma for Ayah ${verse.ayahNumber}`}
                      style={{
                        padding: '3px 8px',
                        borderRadius: 6,
                        fontSize: 10,
                        fontWeight: 700,
                        cursor: 'pointer',
                        border: '1px solid',
                        borderColor: isPlayingThis && currentAudioSegment === 'URDU' ? '#047857' : '#E2E8F0',
                        backgroundColor: isPlayingThis && currentAudioSegment === 'URDU' ? '#FEF3C7' : '#F8FAFC',
                        color: isPlayingThis && currentAudioSegment === 'URDU' ? '#92400E' : '#64748B',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 3,
                      }}
                      title="Listen to Urdu Tarjuma Kanz-ul-Iman"
                    >
                      <span>🎧</span>
                      <span>Urdu Audio</span>
                    </button>
                  </div>

                  {/* Wisdom Card Action Button */}
                  <button
                    onClick={() => onOpenWisdomModal(selectedSurahNumber, verse.ayahNumber)}
                    aria-label={`Open Wisdom Card for Ayah ${verse.ayahNumber}`}
                    style={{
                      padding: '4px 12px',
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: 'pointer',
                      backgroundColor: hasWisdom ? '#FEF3C7' : '#F1F5F9',
                      color: hasWisdom ? '#92400E' : '#334155',
                      border: hasWisdom ? '1px solid #FDE68A' : '1px solid #CBD5E1',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                    }}
                  >
                    <span>📖</span>
                    <span>{hasWisdom ? 'Wisdom Card (حکمت و تفسیر)' : 'Tafseer Notes (تفسیر)'}</span>
                  </button>
                </div>

                {/* Arabic Text */}
                <div
                  dir="rtl"
                  style={{
                    fontFamily: 'var(--font-arabic), "Amiri", serif',
                    fontSize: fontSize,
                    lineHeight: 2.3,
                    textAlign: 'right',
                    color: '#0F172A',
                    marginBottom: 12,
                    letterSpacing: 0.2,
                  }}
                >
                  {verse.textArabic}{' '}
                  <span style={{ fontSize: fontSize - 6, color: '#059669', marginRight: 8 }}>
                    ﴿{verse.ayahNumber}﴾
                  </span>
                </div>

                {/* Urdu Tarjuma (Kanz-ul-Iman) */}
                <div style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#047857', marginBottom: 2 }}>
                    کنز الایمان (اعلیٰ حضرت امام احمد رضا خان):
                  </div>
                  <div
                    dir="rtl"
                    className="font-urdu"
                    style={{
                      fontSize: Math.max(15, fontSize - 7),
                      textAlign: 'right',
                      color: '#1E293B',
                    }}
                  >
                    {verse.textUrdu}
                  </div>
                </div>

                {/* Roman Urdu Transliteration & Tarjuma (when enabled) */}
                {showRomanUrdu && (
                  <div style={{ margin: '10px 0 10px', padding: '10px 14px', borderRadius: 10, backgroundColor: '#F0F9FF', border: '1px solid #BAE6FD' }}>
                    {/* Transliteration */}
                    <div style={{ marginBottom: 6 }}>
                      <div style={{ fontSize: 10, fontWeight: 800, color: '#0369A1', textTransform: 'uppercase', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span>🔤</span>
                        <span>Roman Transliteration (تلفظ و تجوید):</span>
                      </div>
                      <div style={{ fontSize: Math.max(14, fontSize - 8), fontWeight: 600, color: '#0C4A6E', lineHeight: 1.6 }}>
                        {getAyahRomanTransliteration(selectedSurahNumber, verse.ayahNumber, verse.textArabic)}
                      </div>
                    </div>

                    {/* Roman Urdu Tarjuma */}
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 800, color: '#047857', textTransform: 'uppercase', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span>📖</span>
                        <span>Kanz-ul-Iman (Roman Urdu Tarjuma):</span>
                      </div>
                      <div style={{ fontSize: Math.max(13, fontSize - 9), color: '#064E3B', fontWeight: 600, lineHeight: 1.6 }}>
                        {getAyahRomanUrduTarjuma(selectedSurahNumber, verse.ayahNumber, verse.textUrdu)}
                      </div>
                    </div>
                  </div>
                )}

                {/* English Translation */}
                {verse.textEnglish && (
                  <div style={{ fontSize: Math.max(12, fontSize - 11), color: '#475569', lineHeight: 1.6 }}>
                    {verse.textEnglish}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
