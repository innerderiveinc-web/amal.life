import React from 'react';

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
              ? 'اردو ترجمہ کنز الایمان (100% Real Human Voice)'
              : 'Certified Medina Qari Tilawat (100% Real Human Reciter)'}
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
            العفاسی (Arabic)
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
            الحصری (Arabic)
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
            المنشاوی (Arabic)
          </button>
          <button
            onClick={() => setSelectedAudioType('urdu')}
            style={{
              padding: '4px 10px',
              borderRadius: 6,
              fontSize: 11,
              fontWeight: 700,
              border: '1px solid',
              borderColor: selectedAudioType === 'urdu' ? '#047857' : '#FDE68A',
              backgroundColor: selectedAudioType === 'urdu' ? '#047857' : '#FEF3C7',
              color: selectedAudioType === 'urdu' ? '#FFFFFF' : '#92400E',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <span>🎧</span>
            <span>اردو ترجمہ (Urdu Audio)</span>
          </button>
          <button
            onClick={() => setSelectedAudioType('tafseer')}
            style={{
              padding: '4px 10px',
              borderRadius: 6,
              fontSize: 11,
              fontWeight: 700,
              border: '1px solid',
              borderColor: selectedAudioType === 'tafseer' ? '#92400E' : '#FDE68A',
              backgroundColor: selectedAudioType === 'tafseer' ? '#92400E' : '#FFFBEB',
              color: selectedAudioType === 'tafseer' ? '#FFFFFF' : '#92400E',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <span>📖</span>
            <span>صوتی تفسیر (Tafseer)</span>
          </button>
        </div>
      </div>

      {/* Embedded HTML5 Player */}
      <audio
        ref={modalAudioRef}
        controls
        src={audioSrc}
        style={{ width: '100%', height: 38, borderRadius: 8 }}
      />

      {/* Speed, Cache & Offline Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#475569' }}>رفتار (Speed):</span>
          <div style={{ display: 'flex', gap: 2, backgroundColor: '#E2E8F0', padding: 2, borderRadius: 6 }}>
            {[0.75, 1, 1.25, 1.5].map((speed) => (
              <button
                key={speed}
                type="button"
                onClick={() => setPlaybackSpeed(speed)}
                style={{
                  padding: '2px 6px',
                  borderRadius: 4,
                  fontSize: 10,
                  fontWeight: 700,
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

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button
            type="button"
            onClick={handleCacheAudioOffline}
            disabled={isCaching}
            style={{
              padding: '4px 10px',
              borderRadius: 6,
              backgroundColor: isCachedOffline ? '#DCFCE7' : '#FFFFFF',
              color: isCachedOffline ? '#166534' : '#334155',
              border: '1px solid',
              borderColor: isCachedOffline ? '#86EFAC' : '#CBD5E1',
              fontSize: 11,
              fontWeight: 700,
              cursor: isCaching ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
            title="براؤزر میں آف لائن سننے کے لیے محفوظ کریں"
          >
            <span>{isCachedOffline ? '✓' : '📥'}</span>
            <span>{isCaching ? 'محفوظ ہو رہا ہے...' : isCachedOffline ? 'آف لائن محفوظ ہے' : 'آف لائن محفوظ کریں'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadAudioFile}
            style={{
              padding: '4px 10px',
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
            title="MP3 فائل ڈاؤنلوڈ کریں"
          >
            <span>💾</span>
            <span>MP3 ڈاؤنلوڈ</span>
          </button>
        </div>
      </div>

      {/* Tafseer Narration Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFBEB', padding: '8px 12px', borderRadius: 8, border: '1px solid #FDE68A' }}>
        <span style={{ fontSize: 11, color: '#78350F', fontWeight: 600 }}>
          {tafseerStudioUrl
            ? '✓ صراط الجنان / کنز الایمان تفسیری آڈیو:'
            : 'مستند اردو ترجمہ و تفسیری قرأت (کنز الایمان):'}
        </span>
        <button
          type="button"
          onClick={handleToggleSpeakTafseer}
          style={{
            padding: '4px 12px',
            borderRadius: 6,
            backgroundColor: isSpeakingTafseer ? '#DC2626' : '#166534',
            color: '#FFFFFF',
            border: 'none',
            fontSize: 11,
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <span>{isSpeakingTafseer ? '⏹ موقوف کریں' : '🔊 صوتی تفسیر سنیں (Sirat-ul-Jinan)'}</span>
        </button>
      </div>
    </div>
  );
};
