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
  viewMode?: 'SCROLL' | 'FOCUS';
  setViewMode?: (mode: 'SCROLL' | 'FOCUS') => void;
  focusedAyahNumber?: number;
  setFocusedAyahNumber?: React.Dispatch<React.SetStateAction<number>>;
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
          {/* View Mode Toggle: Scroll vs Single Ayah Focus */}
          <div style={{ display: 'flex', gap: 2, backgroundColor: '#E2E8F0', padding: 3, borderRadius: 8, border: '1px solid #CBD5E1' }}>
            <button
              type="button"
              onClick={() => setViewMode && setViewMode('SCROLL')}
              aria-label="Continuous Scroll Mode"
              style={{
                padding: '6px 12px',
                borderRadius: 6,
                border: 'none',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 700,
                backgroundColor: viewMode === 'SCROLL' ? '#FFFFFF' : 'transparent',
                color: viewMode === 'SCROLL' ? '#065F46' : '#64748B',
                boxShadow: viewMode === 'SCROLL' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}
              title="تمام آیات ایک ساتھ اسکرول کریں"
            >
              <span>📜</span>
              <span>سکرول موڈ</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode && setViewMode('FOCUS')}
              aria-label="Single Ayah Focus Mode"
              style={{
                padding: '6px 12px',
                borderRadius: 6,
                border: 'none',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 700,
                backgroundColor: viewMode === 'FOCUS' ? '#064E3B' : 'transparent',
                color: viewMode === 'FOCUS' ? '#FFFFFF' : '#64748B',
                boxShadow: viewMode === 'FOCUS' ? '0 1px 3px rgba(0,0,0,0.2)' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}
              title="ایک وقت میں صرف ایک آیت کا پرسکون موڈ (آٹو ایڈوانس)"
            >
              <span>🎯</span>
              <span>آیت بہ آیت فوکس</span>
            </button>
          </div>

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

      {/* SINGLE AYAH FOCUS & SLIDE MODE (Auto-Advancing Sync) */}
      {!isLoadingSurah && viewMode === 'FOCUS' && (
        (() => {
          const totalVerses = currentSurah.verses.length || 1;
          const currentAyah = currentSurah.verses.find((v) => v.ayahNumber === focusedAyahNumber) || currentSurah.verses[0] || { ayahNumber: 1, textArabic: '', textUrdu: '', textEnglish: '' };
          const isPlayingThis = playingAyahNumber === currentAyah.ayahNumber;
          const hasWisdom = !!getAyahWisdomCard(selectedSurahNumber, currentAyah.ayahNumber);
          const progressPercent = Math.round((currentAyah.ayahNumber / totalVerses) * 100);

          const handlePrevAyah = () => {
            const prevNum = Math.max(1, currentAyah.ayahNumber - 1);
            if (setFocusedAyahNumber) setFocusedAyahNumber(prevNum);
            if (playingAyahNumber !== null) {
              handlePlayAyahAudio(prevNum, 'ARABIC');
            }
          };

          const handleNextAyah = () => {
            const nextNum = Math.min(totalVerses, currentAyah.ayahNumber + 1);
            if (setFocusedAyahNumber) setFocusedAyahNumber(nextNum);
            if (playingAyahNumber !== null) {
              handlePlayAyahAudio(nextNum, 'ARABIC');
            }
          };

          return (
            <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* Progress & Quick Stepper Header */}
              <div style={{ backgroundColor: '#F8FAFC', borderRadius: 12, padding: '12px 18px', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap', gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: '#064E3B', backgroundColor: '#DCFCE7', padding: '3px 12px', borderRadius: 12 }}>
                      آیت مبارکہ {currentAyah.ayahNumber} از {totalVerses}
                    </span>
                    {isPlayingThis && (
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#166534', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', backgroundColor: '#22C55E' }}></span>
                        {currentAudioSegment === 'ARABIC' ? 'تلاوت جاری ہے...' : 'ترجمہ کنز الایمان جاری ہے...'}
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button
                      type="button"
                      onClick={handlePrevAyah}
                      disabled={currentAyah.ayahNumber <= 1}
                      style={{
                        padding: '6px 14px',
                        borderRadius: 8,
                        backgroundColor: currentAyah.ayahNumber <= 1 ? '#F1F5F9' : '#FFFFFF',
                        color: currentAyah.ayahNumber <= 1 ? '#94A3B8' : '#0F172A',
                        border: '1px solid #CBD5E1',
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: currentAyah.ayahNumber <= 1 ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                      title="پچھلی آیت پر جائیں"
                    >
                      <span>⬅️</span>
                      <span>پچھلی آیت</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleNextAyah}
                      disabled={currentAyah.ayahNumber >= totalVerses}
                      style={{
                        padding: '6px 14px',
                        borderRadius: 8,
                        backgroundColor: currentAyah.ayahNumber >= totalVerses ? '#F1F5F9' : '#064E3B',
                        color: currentAyah.ayahNumber >= totalVerses ? '#94A3B8' : '#FFFFFF',
                        border: 'none',
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: currentAyah.ayahNumber >= totalVerses ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        boxShadow: currentAyah.ayahNumber >= totalVerses ? 'none' : '0 2px 6px rgba(6,78,59,0.3)',
                      }}
                      title="اگلی آیت پر جائیں"
                    >
                      <span>اگلی آیت</span>
                      <span>➔</span>
                    </button>
                  </div>
                </div>

                {/* Progress Bar Track */}
                <div style={{ height: 6, width: '100%', backgroundColor: '#E2E8F0', borderRadius: 4, overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${progressPercent}%`,
                      backgroundColor: '#10B981',
                      transition: 'width 0.3s ease',
                    }}
                  />
                </div>
              </div>

              {/* Main Sacred Ayah Display Card */}
              <div
                style={{
                  backgroundColor: isPlayingThis ? '#F0FDF4' : '#FFFFFF',
                  borderRadius: 16,
                  border: isPlayingThis ? '2px solid #34D399' : '1px solid #E2E8F0',
                  padding: '36px 32px',
                  boxShadow: isPlayingThis ? '0 10px 25px -5px rgba(16,185,129,0.15)' : '0 4px 12px rgba(0,0,0,0.03)',
                  transition: 'all 0.25s ease',
                  position: 'relative',
                }}
              >
                {/* Arabic Text (Centered, Extra-Large Reverent Typography) */}
                <div
                  dir="rtl"
                  style={{
                    fontFamily: 'var(--font-arabic), "Amiri", "Traditional Arabic", serif',
                    fontSize: fontSize + 6,
                    lineHeight: 2.3,
                    textAlign: 'center',
                    color: '#064E3B',
                    marginBottom: 28,
                    fontWeight: 500,
                  }}
                >
                  {currentAyah.textArabic}
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 34,
                      height: 34,
                      borderRadius: '50%',
                      backgroundColor: '#ECFDF5',
                      color: '#065F46',
                      fontSize: 14,
                      fontWeight: 800,
                      marginRight: 12,
                      verticalAlign: 'middle',
                      border: '1px solid #A7F3D0',
                    }}
                  >
                    {currentAyah.ayahNumber}
                  </span>
                </div>

                {/* Roman Transliteration (if enabled) */}
                {showRomanUrdu && (
                  <div style={{ marginBottom: 20, textAlign: 'center', padding: '10px 16px', backgroundColor: '#F8FAFC', borderRadius: 10 }}>
                    <div style={{ fontSize: 13, color: '#475569', fontStyle: 'italic', marginBottom: 4 }}>
                      {getAyahRomanTransliteration(selectedSurahNumber, currentAyah.ayahNumber)}
                    </div>
                    <div style={{ fontSize: 13, color: '#064E3B', fontWeight: 600 }}>
                      {getAyahRomanUrduTarjuma(selectedSurahNumber, currentAyah.ayahNumber, currentAyah.textUrdu)}
                    </div>
                  </div>
                )}

                {/* Urdu Translation: Kanz-ul-Iman */}
                <div style={{ marginBottom: 24, textAlign: 'center', backgroundColor: '#FDFBF7', padding: '20px 24px', borderRadius: 12, border: '1px solid #FEF3C7' }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#92400E', marginBottom: 8, letterSpacing: 0.5 }}>
                    کنز الایمان فی ترجمۃ القرآن (امام احمد رضا خان):
                  </div>
                  <div
                    dir="rtl"
                    className="font-urdu"
                    style={{
                      fontSize: Math.max(18, fontSize - 2),
                      lineHeight: 2.3,
                      textAlign: 'center',
                      color: '#1E293B',
                    }}
                  >
                    {currentAyah.textUrdu}
                  </div>
                </div>

                {/* English Translation */}
                {currentAyah.textEnglish && (
                  <div style={{ textAlign: 'center', fontSize: 14, color: '#475569', lineHeight: 1.7, marginBottom: 28, maxWidth: 720, margin: '0 auto 28px' }}>
                    &ldquo;{currentAyah.textEnglish}&rdquo;
                  </div>
                )}

                {/* Ayah Audio & Action Bar */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, flexWrap: 'wrap', paddingTop: 16, borderTop: '1px solid #F1F5F9' }}>
                  <button
                    type="button"
                    onClick={() => handlePlayAyahAudio(currentAyah.ayahNumber, 'ARABIC')}
                    style={{
                      padding: '10px 20px',
                      borderRadius: 10,
                      backgroundColor: isPlayingThis ? '#047857' : '#166534',
                      color: '#FFFFFF',
                      border: 'none',
                      fontSize: 13,
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      boxShadow: '0 2px 6px rgba(22,101,52,0.3)',
                    }}
                  >
                    <span>{isPlayingThis && !isPlayingPaused ? '⏸' : '▶️'}</span>
                    <span>{isPlayingThis && !isPlayingPaused ? 'وقف کریں (Pause)' : 'اس آیت کی تلاوت و ترجمہ سنیں'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePlayAyahAudio(currentAyah.ayahNumber, 'URDU')}
                    style={{
                      padding: '10px 18px',
                      borderRadius: 10,
                      backgroundColor: '#0284C7',
                      color: '#FFFFFF',
                      border: 'none',
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <span>🎙️</span>
                    <span>صرف اردو ترجمہ</span>
                  </button>

                  {hasWisdom && (
                    <button
                      type="button"
                      onClick={() => onOpenWisdomModal(selectedSurahNumber, currentAyah.ayahNumber)}
                      style={{
                        padding: '10px 18px',
                        borderRadius: 10,
                        backgroundColor: '#FFFBEB',
                        color: '#92400E',
                        border: '1px solid #FDE68A',
                        fontSize: 13,
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      <span>✨</span>
                      <span>خزائن العرفان و حکمت</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Bottom Large Slider Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                <button
                  type="button"
                  onClick={handlePrevAyah}
                  disabled={currentAyah.ayahNumber <= 1}
                  style={{
                    flex: 1,
                    padding: '14px 20px',
                    borderRadius: 12,
                    backgroundColor: currentAyah.ayahNumber <= 1 ? '#F8FAFC' : '#FFFFFF',
                    color: currentAyah.ayahNumber <= 1 ? '#CBD5E1' : '#0F172A',
                    border: '1px solid #E2E8F0',
                    fontSize: 14,
                    fontWeight: 800,
                    cursor: currentAyah.ayahNumber <= 1 ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    boxShadow: currentAyah.ayahNumber <= 1 ? 'none' : '0 2px 6px rgba(0,0,0,0.04)',
                  }}
                >
                  <span>⬅️</span>
                  <span>پچھلی آیت (Previous)</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextAyah}
                  disabled={currentAyah.ayahNumber >= totalVerses}
                  style={{
                    flex: 1,
                    padding: '14px 20px',
                    borderRadius: 12,
                    backgroundColor: currentAyah.ayahNumber >= totalVerses ? '#F8FAFC' : '#064E3B',
                    color: currentAyah.ayahNumber >= totalVerses ? '#CBD5E1' : '#FFFFFF',
                    border: 'none',
                    fontSize: 14,
                    fontWeight: 800,
                    cursor: currentAyah.ayahNumber >= totalVerses ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    boxShadow: currentAyah.ayahNumber >= totalVerses ? 'none' : '0 4px 12px rgba(6,78,59,0.3)',
                  }}
                >
                  <span>اگلی آیت (Next)</span>
                  <span>➔</span>
                </button>
              </div>

              {/* Serene Guidance Note */}
              <div style={{ textAlign: 'center', fontSize: 12, color: '#64748B', lineHeight: 1.6 }}>
                💡 <strong>آٹو ایڈوانس (Auto-Advance):</strong> آڈیو سننے کے دوران ہر آیت کا ترجمہ مکمل ہونے پر اگلی آیت خود بخود سامنے آ جاتی ہے۔
                دستی پڑھنے کے لیے کی بورڈ کے دائیں/بائیں تیر (← →) یا اوپر نیچے بٹن استعمال کریں۔
              </div>
            </div>
          );
        })()
      )}

      {/* CONTINUOUS SCROLL VIEW (Traditional All-Ayahs Mode) */}
      {!isLoadingSurah && viewMode === 'SCROLL' && (
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
                    کنز الایمان فی ترجمۃ القرآن (امام احمد رضا خان):
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
