import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export interface AyahAudioControlsBarProps {
  audioSrc: string;
  selectedAudioType: 'alafasy' | 'husary' | 'minshawi' | 'urdu' | 'tafseer';
  setSelectedAudioType: (type: 'alafasy' | 'husary' | 'minshawi' | 'urdu' | 'tafseer') => void;
  playbackSpeed: number;
  setPlaybackSpeed: (speed: number) => void;
  isCachedOffline: boolean;
  isCaching: boolean;
  handleCacheAudioOffline: () => void;
  handleDownloadAudioFile: () => void;
  isSpeakingTafseer: boolean;
  handleToggleSpeakTafseer: () => void;
  tafseerStudioUrl?: string | null;
  modalAudioRef: React.RefObject<HTMLAudioElement>;
}

export const AyahAudioControlsBar: React.FC<AyahAudioControlsBarProps> = ({
  audioSrc,
  selectedAudioType,
  setSelectedAudioType,
  playbackSpeed,
  setPlaybackSpeed,
  isCachedOffline,
  isCaching,
  handleCacheAudioOffline,
  handleDownloadAudioFile,
  isSpeakingTafseer,
  handleToggleSpeakTafseer,
  tafseerStudioUrl,
  modalAudioRef,
}) => {
  const { t } = useLanguage();

  return (
    <div
      style={{
        padding: 14,
        borderRadius: 12,
        backgroundColor: '#F0FDF4',
        border: '1px solid #BBF7D0',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, color: '#166534' }}>
          <span>🎙️</span>
          <span>
            {selectedAudioType === 'urdu'
              ? t(
                  'Urdu Tarjuma Kanz-ul-Iman (100% Real Human Voice)',
                  'اردو ترجمہ کنز الایمان (خالص انسانی آواز)',
                  'ترجمة كنز الإيمان بصوت بشري حقيقي',
                  'Urdu Tarjuma Kanz-ul-Iman (Real Human Voice)'
                )
              : t(
                  'Certified Medina Qari Tilawat (100% Real Human Reciter)',
                  'مستند مدینہ قاری تلاوت (خالص انسانی آواز)',
                  'تلاوة قراء المدينة المعتمدين (صوت بشري حقيقي)',
                  'Certified Medina Qari Tilawat (Real Human Reciter)'
                )}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <button
            onClick={() => setSelectedAudioType('alafasy')}
            style={{
              padding: '4px 10px',
              borderRadius: 6,
              fontSize: 11,
              fontWeight: 700,
              border: '1px solid',
              borderColor: selectedAudioType === 'alafasy' ? '#15803D' : '#CBD5E1',
              backgroundColor: selectedAudioType === 'alafasy' ? '#15803D' : '#FFFFFF',
              color: selectedAudioType === 'alafasy' ? '#FFFFFF' : '#334155',
              cursor: 'pointer',
            }}
          >
            {t('Alafasy (Arabic)', 'العفاسی (عربی)', 'العفاسي (عربي)', 'Alafasy (Arabic)')}
          </button>
          <button
            onClick={() => setSelectedAudioType('husary')}
            style={{
              padding: '4px 10px',
              borderRadius: 6,
              fontSize: 11,
              fontWeight: 700,
              border: '1px solid',
              borderColor: selectedAudioType === 'husary' ? '#15803D' : '#CBD5E1',
              backgroundColor: selectedAudioType === 'husary' ? '#15803D' : '#FFFFFF',
              color: selectedAudioType === 'husary' ? '#FFFFFF' : '#334155',
              cursor: 'pointer',
            }}
          >
            {t('Husary (Arabic)', 'الحصری (عربی)', 'الحصري (عربي)', 'Husary (Arabic)')}
          </button>
          <button
            onClick={() => setSelectedAudioType('minshawi')}
            style={{
              padding: '4px 10px',
              borderRadius: 6,
              fontSize: 11,
              fontWeight: 700,
              border: '1px solid',
              borderColor: selectedAudioType === 'minshawi' ? '#15803D' : '#CBD5E1',
              backgroundColor: selectedAudioType === 'minshawi' ? '#15803D' : '#FFFFFF',
              color: selectedAudioType === 'minshawi' ? '#FFFFFF' : '#334155',
              cursor: 'pointer',
            }}
          >
            {t('Minshawi (Arabic)', 'المنشاوی (عربی)', 'المنشاوي (عربي)', 'Minshawi (Arabic)')}
          </button>
          <button
            onClick={() => setSelectedAudioType('urdu')}
            style={{
              padding: '4px 10px',
              borderRadius: 6,
              fontSize: 11,
              fontWeight: 700,
              border: '1px solid',
              borderColor: selectedAudioType === 'urdu' ? '#047857' : '#CBD5E1',
              backgroundColor: selectedAudioType === 'urdu' ? '#047857' : '#FFFFFF',
              color: selectedAudioType === 'urdu' ? '#FFFFFF' : '#334155',
              cursor: 'pointer',
            }}
          >
            {t('Urdu Tarjuma (Human)', 'اردو ترجمہ (انسانی آواز)', 'الترجمة الأردية', 'Urdu Tarjuma (Insani Awaz)')}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        {/* Native Audio Element with Ref */}
        <audio ref={modalAudioRef} src={audioSrc} controls style={{ height: 36, flex: 1, minWidth: 220 }} />

        {/* Speed Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 11, color: '#475569', fontWeight: 600 }}>
            {t('Speed:', 'رفتار:', 'السرعة:', 'Raftaar:')}
          </span>
          {[0.75, 1, 1.25, 1.5].map((spd) => (
            <button
              key={spd}
              onClick={() => setPlaybackSpeed(spd)}
              style={{
                padding: '3px 7px',
                borderRadius: 4,
                fontSize: 10,
                fontWeight: 700,
                border: 'none',
                backgroundColor: playbackSpeed === spd ? '#166534' : '#E2E8F0',
                color: playbackSpeed === spd ? '#FFFFFF' : '#475569',
                cursor: 'pointer',
              }}
            >
              {spd}x
            </button>
          ))}
        </div>

        {/* Action Controls: Tafseer Audio + Offline Cache + Download */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <button
            onClick={handleToggleSpeakTafseer}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              backgroundColor: isSpeakingTafseer ? '#047857' : '#ECFDF5',
              color: isSpeakingTafseer ? '#FFFFFF' : '#065F46',
              border: '1px solid #A7F3D0',
              fontSize: 11,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <span>{isSpeakingTafseer ? '⏸' : '🎙️'}</span>
            <span>
              {isSpeakingTafseer
                ? t('Pause Audio', 'آڈیو روکیں', 'إيقاف الصوت', 'Audio Rokein')
                : t('Listen Tafseer / Tarjuma', 'تفسیری آڈیو سنیں', 'استمع للتفسير الصوتي', 'Tafseeri Audio Sunein')}
            </span>
          </button>

          <button
            onClick={handleCacheAudioOffline}
            disabled={isCaching}
            style={{
              padding: '6px 10px',
              borderRadius: 6,
              backgroundColor: isCachedOffline ? '#DCFCE7' : '#FFFFFF',
              color: isCachedOffline ? '#166534' : '#334155',
              border: '1px solid #CBD5E1',
              fontSize: 11,
              fontWeight: 600,
              cursor: isCaching ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
            title={t('Save for offline listening', 'آف لائن سننے کے لیے محفوظ کریں', 'حفظ للاستماع دون اتصال', 'Offline sunne ke liye mehfooz karein')}
          >
            <span>{isCachedOffline ? '✓' : '📥'}</span>
            <span>
              {isCaching
                ? t('Saving...', 'محفوظ ہو رہا ہے...', 'جاري الحفظ...', 'Mehfooz ho raha hai...')
                : isCachedOffline
                ? t('Offline Saved', 'آف لائن محفوظ ہے', 'محفوظ دون اتصال', 'Offline Mehfooz')
                : t('Cache Offline', 'آف لائن کیش', 'حفظ دون اتصال', 'Offline Cache')}
            </span>
          </button>

          <button
            onClick={handleDownloadAudioFile}
            style={{
              padding: '6px 10px',
              borderRadius: 6,
              backgroundColor: '#FFFFFF',
              color: '#334155',
              border: '1px solid #CBD5E1',
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
            title={t('Download MP3 file', 'MP3 فائل ڈاؤنلوڈ کریں', 'تحميل ملف MP3', 'MP3 file download karein')}
          >
            <span>💾</span>
            <span>{t('MP3', 'MP3 فائل', 'ملف MP3', 'MP3 File')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
