import React from 'react';
import { QuranSurahData } from '../../lib/quran-surahs-data';
import { QuranSurahMeta } from '../../lib/quran-114-directory';
import { getAyahWisdomCard } from '../../lib/quran-wisdom-data';
import { getAyahRomanTransliteration, getAyahRomanUrduTarjuma } from '../../lib/quran-roman-urdu';
import { AudioSegment } from './FloatingQuranAudioPlayer';

export interface AyahFocusModeViewProps {
  currentSurah: QuranSurahData;
  currentSurahMeta: QuranSurahMeta;
  selectedSurahNumber: number;
  focusedAyahNumber: number;
  setFocusedAyahNumber?: React.Dispatch<React.SetStateAction<number>>;
  playingAyahNumber: number | null;
  isPlayingPaused: boolean;
  currentAudioSegment: AudioSegment;
  handlePlayAyahAudio: (ayahNum: number, segment: AudioSegment) => void;
  onOpenWisdomModal: (surahNumber: number, ayahNumber: number) => void;
  fontSize: number;
  showRomanUrdu: boolean;
  onOpenShareModal: (ayah: {
    surahNumber: number;
    surahNameArabic: string;
    surahNameEnglish: string;
    surahNameUrdu: string;
    ayahNumber: number;
    arabicText: string;
    urduTranslation: string;
    englishTranslation?: string;
  }) => void;
}

export const AyahFocusModeView: React.FC<AyahFocusModeViewProps> = ({
  currentSurah,
  currentSurahMeta,
  selectedSurahNumber,
  focusedAyahNumber,
  setFocusedAyahNumber,
  playingAyahNumber,
  isPlayingPaused,
  currentAudioSegment,
  handlePlayAyahAudio,
  onOpenWisdomModal,
  fontSize,
  showRomanUrdu,
  onOpenShareModal,
}) => {
  const totalVerses = currentSurah.verses.length || 1;
  const currentAyah =
    currentSurah.verses.find((v) => v.ayahNumber === focusedAyahNumber) ||
    currentSurah.verses[0] || { ayahNumber: 1, textArabic: '', textUrdu: '', textEnglish: '' };
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

        {/* Roman Transliteration (Pronunciation Guide) */}
        {(() => {
          const translit = getAyahRomanTransliteration(selectedSurahNumber, currentAyah.ayahNumber, currentAyah.textArabic);
          const romanTarjuma = showRomanUrdu ? getAyahRomanUrduTarjuma(selectedSurahNumber, currentAyah.ayahNumber, currentAyah.textUrdu) : null;
          if (!translit && !romanTarjuma) return null;
          return (
            <div
              style={{
                marginBottom: 20,
                textAlign: 'center',
                padding: '12px 18px',
                backgroundColor: '#F8FAFC',
                borderRadius: 12,
                border: '1px solid #E2E8F0',
                maxWidth: 760,
                margin: '0 auto 20px',
              }}
            >
              {translit && (
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', marginBottom: 4, letterSpacing: 0.5 }}>
                    Roman Transliteration (Pronunciation):
                  </div>
                  <div style={{ fontSize: 14, color: '#334155', fontStyle: 'italic', lineHeight: 1.6 }}>
                    {translit}
                  </div>
                </div>
              )}
              {romanTarjuma && (
                <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid #E2E8F0', fontSize: 13, color: '#064E3B', fontWeight: 600 }}>
                  <span style={{ fontSize: 10, color: '#047857', textTransform: 'uppercase', marginRight: 6 }}>Roman Urdu:</span>
                  {romanTarjuma}
                </div>
              )}
            </div>
          );
        })()}

        {/* Urdu Translation: Kanz-ul-Iman */}
        <div style={{ marginBottom: 24, textAlign: 'center', backgroundColor: '#FDFBF7', padding: '20px 24px', borderRadius: 12, border: '1px solid #FEF3C7' }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#92400E', marginBottom: 8, letterSpacing: 0.5 }}>
            Kanz-ul-Iman (Urdu Translation):
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

          {/* 1-Click Sacred Ayah Card Generator */}
          <button
            type="button"
            onClick={() =>
              onOpenShareModal({
                surahNumber: selectedSurahNumber,
                surahNameArabic: currentSurahMeta.nameArabic,
                surahNameEnglish: currentSurahMeta.nameEnglish,
                surahNameUrdu: currentSurahMeta.nameUrdu,
                ayahNumber: currentAyah.ayahNumber,
                arabicText: currentAyah.textArabic,
                urduTranslation: currentAyah.textUrdu,
                englishTranslation: currentAyah.textEnglish,
              })
            }
            style={{
              padding: '10px 18px',
              borderRadius: 10,
              backgroundColor: '#064E3B',
              color: '#FDE68A',
              border: '1px solid #D97706',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              boxShadow: '0 2px 6px rgba(6,78,59,0.2)',
            }}
            title="اس آیت کا خوبصورت امیج کارڈ بنائیں برائے واٹس ایپ و سوشل میڈیا"
          >
            <span>📸</span>
            <span>امیج کارڈ بنائیں (Share Card)</span>
          </button>
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
};
