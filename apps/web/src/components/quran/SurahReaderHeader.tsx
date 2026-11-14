import React, { memo } from 'react';
import { QuranSurahMeta } from '../../lib/quran-114-directory';
import { QuranSurahData } from '../../lib/quran-surahs-data';
import { AudioSyncMode } from './FloatingQuranAudioPlayer';
import { useLanguage } from '../../context/LanguageContext';
import { IslamicBismillahCartouche, IslamicSurahTitleCartouche } from '../ui/IslamicArabesqueFrame';

export interface SurahReaderHeaderProps {
  currentSurahMeta: QuranSurahMeta;
  currentSurah: QuranSurahData;
  selectedSurahNumber: number;
  playingAyahNumber: number | null;
  audioSyncMode: AudioSyncMode;
  surahWideAudioType: 'KANZUL_IMAN' | 'TAFSEER' | null;
  isPlayingPaused: boolean;
  isSurahSettingsOpen: boolean;
  setIsSurahSettingsOpen: (open: boolean) => void;
  viewMode: 'SCROLL' | 'FOCUS' | 'MUSHAF';
  setViewMode?: (mode: 'SCROLL' | 'FOCUS' | 'MUSHAF') => void;
  isHifzBlurActive?: boolean;
  setIsHifzBlurActive?: (val: boolean) => void;
  selectedQari: 'alafasy' | 'husary' | 'minshawi';
  setSelectedQari: (qari: 'alafasy' | 'husary' | 'minshawi') => void;
  playbackSpeed: number;
  setPlaybackSpeed: (speed: number) => void;
  continuousSurahPlayback?: boolean;
  setContinuousSurahPlayback?: (val: boolean) => void;
  isSurahCachedOffline: boolean;
  isCachingSurah: boolean;
  handleCacheSurahOffline: () => void;
  handleDownloadSurahAudio: () => void;
  showRomanUrdu: boolean;
  setShowRomanUrdu: (show: boolean) => void;
  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
  handlePlaySurahKanzulIman: () => void;
  handlePlaySurahUrduOnly: () => void;
  handlePlaySurahTafseer: () => void;
  handlePlaySurahTilawatOnly: () => void;
}

const SurahReaderHeaderInner: React.FC<SurahReaderHeaderProps> = ({
  currentSurahMeta,
  currentSurah,
  selectedSurahNumber,
  playingAyahNumber,
  audioSyncMode,
  surahWideAudioType,
  isPlayingPaused,
  isSurahSettingsOpen,
  setIsSurahSettingsOpen,
  viewMode,
  setViewMode,
  isHifzBlurActive,
  setIsHifzBlurActive,
  selectedQari,
  setSelectedQari,
  playbackSpeed,
  setPlaybackSpeed,
  continuousSurahPlayback,
  setContinuousSurahPlayback,
  isSurahCachedOffline,
  isCachingSurah,
  handleCacheSurahOffline,
  handleDownloadSurahAudio,
  showRomanUrdu,
  setShowRomanUrdu,
  fontSize,
  setFontSize,
  handlePlaySurahKanzulIman,
  handlePlaySurahUrduOnly,
  handlePlaySurahTafseer,
  handlePlaySurahTilawatOnly,
}) => {
  const { t, isUrdu, isArabic } = useLanguage();

  return (
    <>
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
              {t('Surah', 'سورۃ', 'سورة', 'Surah')} {currentSurahMeta.number}
            </span>
            <span style={{ fontSize: 12, color: '#64748B' }}>
              {currentSurahMeta.revelationType === 'MECCAN'
                ? t('Meccan Surah', 'مکی سورت', 'سورة مكية', 'Makki Surah')
                : t('Medinan Surah', 'مدنی سورت', 'سورة مدنية', 'Madani Surah')}{' '}
              · {currentSurah.ayahsCount} {t('Verses', 'آیات', 'آيات', 'Aayatein')}
            </span>
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', margin: 0 }}>
            {isArabic
              ? `${currentSurahMeta.nameArabic} (${currentSurahMeta.nameTransliterated})`
              : isUrdu
              ? `${currentSurahMeta.nameUrdu} (${currentSurahMeta.nameTransliterated})`
              : `${currentSurahMeta.nameTransliterated} (${currentSurahMeta.nameUrdu})`}
          </h2>
        </div>

        {/* Audio & Display Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {/* View Mode Toggle: Mushaf (Ayah App Style) vs Scroll vs Single Ayah Focus */}
          <div style={{ display: 'flex', gap: 2, backgroundColor: '#E2E8F0', padding: 3, borderRadius: 8, border: '1px solid #CBD5E1' }}>
            <button
              type="button"
              onClick={() => setViewMode && setViewMode('MUSHAF')}
              aria-label="604-Page Madani Mushaf Mode"
              style={{
                padding: '6px 12px',
                borderRadius: 6,
                border: 'none',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 700,
                backgroundColor: viewMode === 'MUSHAF' ? '#064E3B' : 'transparent',
                color: viewMode === 'MUSHAF' ? '#FFFFFF' : '#64748B',
                boxShadow: viewMode === 'MUSHAF' ? '0 1px 3px rgba(0,0,0,0.2)' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}
              title={t('604-Page Physical Madani Mushaf View (Ayah App Style)', '۶۰۴ صفحات کا اصلی مدنی مصحف (آیت ایپ اسٹائل)', 'مصحف المدينة المنورة ٦٠٤ صفحة', '604-Safhat ka Asli Madani Mushaf (Ayah App Style)')}
            >
              <span>📖</span>
              <span>{t('Mushaf Page', 'مصحف موڈ', 'المصحف', 'Mushaf Mode')}</span>
            </button>
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
              title={t('Scroll all verses continuously', 'تمام آیات ایک ساتھ اسکرول کریں', 'تمرير جميع الآيات معاً', 'Tamam aayatein ek sath scroll karein')}
            >
              <span>📜</span>
              <span>{t('Scroll Mode', 'سکرول موڈ', 'وضع التمرير', 'Scroll Mode')}</span>
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
              title={t('Peaceful single verse mode with auto-advance', 'ایک وقت میں صرف ایک آیت کا پرسکون موڈ (آٹو ایڈوانس)', 'وضع الآية الواحدة الهادئ مع التقدم التلقائي', 'Ek waqt mein sirf ek ayah ka pur-sukoon mode (auto-advance)')}
            >
              <span>🎯</span>
              <span>{t('Ayah Focus', 'آیت فوکس', 'تركيز آية', 'Ayah Focus')}</span>
            </button>
            {setIsHifzBlurActive && (
              <button
                type="button"
                onClick={() => setIsHifzBlurActive(!isHifzBlurActive)}
                aria-label="Toggle Hifz Memorization Blur Mode"
                style={{
                  padding: '6px 12px',
                  borderRadius: 6,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 12,
                  fontWeight: 700,
                  backgroundColor: isHifzBlurActive ? '#D1FAE5' : 'transparent',
                  color: isHifzBlurActive ? '#065F46' : '#64748B',
                  boxShadow: isHifzBlurActive ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                }}
                title={t('Hide text to test memory (tap ayah to reveal)', 'حفظ کے امتحان کے لیے متن چھپائیں (دیکھنے کے لیے کلک کریں)', 'إخفاء النص لاختبار الحفظ', 'Hifz ke imtehan ke liye text hide karein')}
              >
                <span>{isHifzBlurActive ? '👁️' : '🙈'}</span>
                <span>{t('Hifz Test', 'حفظ ٹیسٹ', 'اختبار الحفظ', 'Hifz Test')}</span>
              </button>
            )}
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
            title={t('Arabic Tilawat + Authentic Urdu Tarjuma verse-by-verse sync', 'تلاوت و ترجمہ کنز الایمان آیت بہ آیت ہم آہنگ', 'تلاوة وترجمة كنز الإيمان بالتزامن', 'Tilawat o Tarjuma Kanz-ul-Iman ayah ba ayah sync')}
          >
            <span>🎧</span>
            <span>
              {(audioSyncMode === 'FULL_SYNC' || audioSyncMode === 'TILAWAT_URDU_SYNC') && playingAyahNumber !== null
                ? t('⏸ Pause Sync', '⏸ وقفہ ہم آہنگی', '⏸ إيقاف المزامنة', '⏸ Pause Sync')
                : t('Tilawat + Urdu Tarjuma (Sync)', 'تلاوت مع ترجمہ کنز الایمان', 'تلاوة مع ترجمة كنز الإيمان', 'Tilawat + Tarjuma (Sync)')}
            </span>
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
            title={t('Listen to full Urdu Tarjuma Kanz-ul-Iman continuously', 'مکمل ترجمہ کنز الایمان مسلسل سنیں', 'الاستماع لترجمة كنز الإيمان كاملة مستمرة', 'Mukammal Tarjuma Kanz-ul-Iman musalsal sunein')}
          >
            <span>🎙️</span>
            <span>
              {audioSyncMode === 'URDU_ONLY_CONTINUOUS' && playingAyahNumber !== null
                ? t('⏸ Pause Urdu', '⏸ وقفہ اردو', '⏸ إيقاف الأردية', '⏸ Pause Urdu')
                : t('Urdu Tarjuma (Continuous)', 'مسلسل اردو ترجمہ', 'ترجمة أردية مستمرة', 'Urdu Tarjuma (Musalsal)')}
            </span>
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
            title={t('Listen to full studio Tafseer Sirat-ul-Jinan', 'مکمل اسٹوڈیو تفسیر صراط الجنان سنیں', 'استمع لتفسير صراط الجنان الكامل', 'Mukammal studio Tafseer Sirat-ul-Jinan sunein')}
          >
            <span>📖</span>
            <span>
              {(surahWideAudioType === 'TAFSEER' || audioSyncMode === 'TAFSEER_BROADCAST')
                ? (isPlayingPaused
                    ? t('▶ Resume Tafseer', '▶ تفسیر جاری کریں', '▶ استئناف التفسير', '▶ Resume Tafseer')
                    : t('⏸ Pause Tafseer', '⏸ وقفہ تفسیر', '⏸ إيقاف التفسير', '⏸ Pause Tafseer'))
                : t('Full Tafseer (Sirat-ul-Jinan)', 'مکمل تفسیر صراط الجنان', 'تفسير صراط الجنان الكامل', 'Mukammal Tafseer (Sirat-ul-Jinan)')}
            </span>
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
            title={t('Continuous Arabic Tilawat of the full Surah', 'مکمل سورت کی مسلسل عربی تلاوت سنیں', 'تلاوة عربية مستمرة للسورة كاملة', 'Mukammal Surah ki musalsal Arabic Tilawat sunein')}
          >
            <span>▶</span>
            <span>
              {audioSyncMode === 'TILAWAT_ONLY' && playingAyahNumber !== null
                ? t('⏸ Pause Tilawat', '⏸ وقفہ تلاوت', '⏸ إيقاف التلاوة', '⏸ Pause Tilawat')
                : t('Arabic Tilawat Only', 'صرف عربی تلاوت', 'تلاوة عربية فقط', 'Sirf Arabic Tilawat')}
            </span>
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
            title={t('Qari, speed, offline cache and font settings', 'قاری، رفتار، آف لائن کیش اور فونٹ ترتیبات', 'إعدادات القارئ والسرعة والحفظ دون اتصال والخط', 'Qari, raftaar, offline cache aur font tarteebat')}
          >
            <span>⚙️</span>
            <span>
              {isSurahSettingsOpen
                ? t('Close Options ▲', 'اختیارات بند کریں ▲', 'إغلاق الخيارات ▲', 'Ikhtiyarat band karein ▲')
                : t('More Options ▼', 'مزید اختیارات ▼', 'المزيد من الخيارات ▼', 'Mazeed ikhtiyarat ▼')}
            </span>
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
            <span style={{ fontSize: 11, fontWeight: 700, color: '#475569' }}>
              {t('Reciter:', 'قاری:', 'القارئ:', 'Qari:')}
            </span>
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
                {t('Alafasy', 'العفاسی', 'العفاسي', 'Alafasy')}
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
                {t('Husary', 'الحصری', 'الحصري', 'Husary')}
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
                {t('Minshawi', 'المنشاوی', 'المنشاوي', 'Minshawi')}
              </button>
            </div>
          </div>

          {/* Playback Speed Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#475569' }}>
              {t('Speed:', 'رفتار:', 'السرعة:', 'Raftaar:')}
            </span>
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

          {/* Continuous Surah Autoplay Toggle */}
          {setContinuousSurahPlayback && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#475569' }}>
                {t('Autoplay:', 'تسلسل:', 'التشغيل التلقائي:', 'Tasalsul:')}
              </span>
              <button
                type="button"
                onClick={() => setContinuousSurahPlayback(!continuousSurahPlayback)}
                aria-label="Toggle Continuous Surah Autoplay"
                style={{
                  padding: '4px 10px',
                  borderRadius: 6,
                  backgroundColor: continuousSurahPlayback ? '#DCFCE7' : '#FFFFFF',
                  color: continuousSurahPlayback ? '#166534' : '#475569',
                  border: '1px solid',
                  borderColor: continuousSurahPlayback ? '#86EFAC' : '#CBD5E1',
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
                title={t('Automatically advance to next Surah on completion', 'سورت ختم ہونے پر اگلی سورت کا خودکار آغاز', 'الانتقال التلقائي للسورة التالية عند الانتهاء', 'Surah khatam hone par agli surah ka khud-kaar aaghaz')}
              >
                <span>{continuousSurahPlayback ? '✓' : '○'}</span>
                <span>
                  {continuousSurahPlayback
                    ? t('Next Surah (ON)', 'اگلی سورت جاری (آن)', 'السورة التالية (مفعل)', 'Agli Surah Jari (ON)')
                    : t('Single Surah (OFF)', 'ایک سورت (بند)', 'سورة واحدة (معطل)', 'Ek Surah (Band)')}
                </span>
              </button>
            </div>
          )}

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
              title={t('Cache audio in browser for offline playback', 'اس سورت کی آڈیو کو براؤزر میں آف لائن سننے کے لیے محفوظ کریں', 'حفظ صوت السورة في المتصفح للاستماع دون اتصال', 'Is surah ki audio ko offline sunne ke liye browser mein mehfooz karein')}
            >
              <span>{isSurahCachedOffline ? '✓' : '📥'}</span>
              <span>
                {isCachingSurah
                  ? t('Caching...', 'محفوظ ہو رہا ہے...', 'جاري الحفظ...', 'Mehfooz ho raha hai...')
                  : isSurahCachedOffline
                  ? t('Saved Offline', 'آف لائن محفوظ ہے', 'محفوظ دون اتصال', 'Offline Mehfooz hai')
                  : t('Save Offline', 'آف لائن کیش', 'حفظ دون اتصال', 'Offline Cache')}
              </span>
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
              title={t('Download MP3 audio file', 'سورت کی MP3 فائل ڈاؤنلوڈ کریں', 'تحميل ملف السورة MP3', 'Surah ki MP3 file download karein')}
            >
              <span>💾</span>
              <span>{t('MP3 Audio', 'MP3 فائل', 'ملف MP3', 'MP3 Audio')}</span>
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
              {showRomanUrdu ? t('Roman: ON', 'رومن: آن', 'الرومانية: مفعل', 'Roman: ON') : t('Roman: OFF', 'رومن: بند', 'الرومانية: معطل', 'Roman: OFF')}
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

      {/* Illuminated Quran Manuscript Surah Header Cartouche */}
      <div style={{ padding: '4px 20px 0', backgroundColor: '#FAF8F5' }}>
        <IslamicSurahTitleCartouche
          surahNumber={currentSurahMeta.number}
          nameArabic={currentSurahMeta.nameArabic}
          nameEnglish={currentSurahMeta.nameTransliterated}
          nameUrdu={currentSurahMeta.nameUrdu}
          versesCount={currentSurah.ayahsCount}
          revelationType={currentSurahMeta.revelationType}
          isUrdu={isUrdu}
        />
      </div>

      {/* Bismillah Opening Header: Gilded Islamic Manuscript Cartouche (Not shown for Surah 1 where Bismillah is Ayah 1, nor for Surah 9 At-Tawbah) */}
      {selectedSurahNumber !== 1 && selectedSurahNumber !== 9 && (
        <div style={{ padding: '8px 20px', backgroundColor: '#FAFAF9', borderBottom: '1px solid #F1F5F9' }}>
          <IslamicBismillahCartouche
            bismillahText="بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"
            fontSize={Math.max(22, fontSize + 2)}
            variant="gold"
          />
        </div>
      )}
    </>
  );
};

export const SurahReaderHeader = memo(SurahReaderHeaderInner);
