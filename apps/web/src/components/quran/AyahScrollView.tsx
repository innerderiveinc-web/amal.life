import React from 'react';
import { QuranSurahData } from '../../lib/quran-surahs-data';
import { QuranSurahMeta } from '../../lib/quran-114-directory';
import { getAyahWisdomCard } from '../../lib/quran-wisdom-data';
import { getAyahRomanTransliteration, getAyahRomanUrduTarjuma } from '../../lib/quran-roman-urdu';
import { AudioSegment } from './FloatingQuranAudioPlayer';
import { useLanguage } from '../../context/LanguageContext';

export interface AyahScrollViewProps {
  currentSurah: QuranSurahData;
  currentSurahMeta: QuranSurahMeta;
  selectedSurahNumber: number;
  playingAyahNumber: number | null;
  focusedAyahNumber: number;
  setFocusedAyahNumber?: React.Dispatch<React.SetStateAction<number>>;
  currentAudioSegment: AudioSegment;
  isPlayingPaused: boolean;
  handlePlayAyahAudio: (ayahNum: number, segment: AudioSegment) => void;
  onOpenWisdomModal: (surahNumber: number, ayahNumber: number) => void;
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
  fontSize: number;
  showRomanUrdu: boolean;
}

export const AyahScrollView: React.FC<AyahScrollViewProps> = ({
  currentSurah,
  currentSurahMeta,
  selectedSurahNumber,
  playingAyahNumber,
  focusedAyahNumber,
  setFocusedAyahNumber,
  currentAudioSegment,
  isPlayingPaused,
  handlePlayAyahAudio,
  onOpenWisdomModal,
  onOpenShareModal,
  fontSize,
  showRomanUrdu,
}) => {
  const { t } = useLanguage();

  return (
    <div style={{ padding: '8px 24px', display: 'flex', flexDirection: 'column' }}>
      {currentSurah.verses.map((verse) => {
        const isPlayingThis = playingAyahNumber === verse.ayahNumber;
        const isFocusedThis = focusedAyahNumber === verse.ayahNumber;
        const hasWisdom = !!getAyahWisdomCard(selectedSurahNumber, verse.ayahNumber);

        return (
          <div
            key={verse.ayahNumber}
            id={`ayah-${verse.ayahNumber}`}
            onClick={() => {
              if (setFocusedAyahNumber && focusedAyahNumber !== verse.ayahNumber) {
                setFocusedAyahNumber(verse.ayahNumber);
              }
            }}
            style={{
              padding: '18px 14px',
              margin: '4px 0',
              borderBottom: '1px solid #F1F5F9',
              backgroundColor: isPlayingThis ? '#F0FDF4' : isFocusedThis ? '#F8FAFC' : 'transparent',
              borderRadius: isPlayingThis || isFocusedThis ? 12 : 0,
              border: isPlayingThis
                ? '1.5px solid #86EFAC'
                : isFocusedThis
                ? '1.5px solid #10B981'
                : '1.5px solid transparent',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
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
                    backgroundColor: isPlayingThis ? '#166534' : isFocusedThis ? '#065F46' : '#E2E8F0',
                    color: isPlayingThis || isFocusedThis ? '#FFFFFF' : '#334155',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 800,
                  }}
                >
                  {verse.ayahNumber}
                </span>

                {isFocusedThis && !isPlayingThis && (
                  <span
                    style={{
                      fontSize: 10,
                      padding: '2px 8px',
                      borderRadius: 6,
                      backgroundColor: '#ECFDF5',
                      color: '#065F46',
                      fontWeight: 700,
                      border: '1px solid #A7F3D0',
                    }}
                  >
                    🔖 {t('Current Position', 'منتخب آیت / نشانی', 'الموضع الحالي', 'Muntakhab Ayah / Nishani')}
                  </span>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayAyahAudio(verse.ayahNumber, 'ARABIC');
                  }}
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
                      ? isPlayingPaused
                        ? t('Resume Tilawat', 'تلاوت جاری کریں', 'استئناف التلاوة', 'Resume Tilawat')
                        : t('🎙️ Reciting', '🎙️ تلاوت جاری', '🎙️ جارية التلاوة', '🎙️ Tilawat Jari')
                      : t('Recitation', 'تلاوت', 'تلاوة', 'Tilawat')}
                  </span>
                </button>

                {/* Quick Urdu Tarjuma Audio button for this verse */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayAyahAudio(verse.ayahNumber, 'URDU');
                  }}
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
                  title={t('Listen to Urdu Tarjuma Kanz-ul-Iman', 'کنز الایمان اردو ترجمہ سنیں', 'استمع لترجمة كنز الإيمان', 'Kanz-ul-Iman Urdu Tarjuma sunein')}
                >
                  <span>🎧</span>
                  <span>{t('Urdu Audio', 'اردو آڈیو', 'صوت أردي', 'Urdu Audio')}</span>
                </button>
              </div>

              {/* Wisdom Card Action Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenWisdomModal(selectedSurahNumber, verse.ayahNumber);
                }}
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
                <span>
                  {hasWisdom
                    ? t('Wisdom Card', 'حکمت کارڈ', 'بطاقة الحكمة', 'Hikmat Card')
                    : t('Tafseer Notes', 'تفسیری حاشیہ', 'حاشية التفسير', 'Tafseer Notes')}
                </span>
              </button>

              {/* Share Image Card Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenShareModal({
                    surahNumber: selectedSurahNumber,
                    surahNameArabic: currentSurahMeta.nameArabic,
                    surahNameEnglish: currentSurahMeta.nameEnglish,
                    surahNameUrdu: currentSurahMeta.nameUrdu,
                    ayahNumber: verse.ayahNumber,
                    arabicText: verse.textArabic,
                    urduTranslation: verse.textUrdu,
                    englishTranslation: verse.textEnglish,
                  });
                }}
                aria-label={`Generate Image Card for Ayah ${verse.ayahNumber}`}
                style={{
                  padding: '4px 10px',
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: 'pointer',
                  backgroundColor: '#ECFDF5',
                  color: '#064E3B',
                  border: '1px solid #A7F3D0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
                title={t('Generate beautiful image card for this Ayah', 'اس آیت کا خوبصورت تصویری کارڈ بنائیں', 'إنشاء بطاقة مصورة لهذه الآية', 'Is ayah ka khubsurat image card banayein')}
              >
                <span>📸</span>
                <span>{t('Card', 'کارڈ', 'بطاقة', 'Card')}</span>
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

            {/* Roman Transliteration (Pronunciation Guide) */}
            {(() => {
              const translit = getAyahRomanTransliteration(selectedSurahNumber, verse.ayahNumber, verse.textArabic);
              if (!translit) return null;
              return (
                <div style={{ marginBottom: 10, fontSize: 13, color: '#334155', fontStyle: 'italic', lineHeight: 1.6 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B', fontStyle: 'normal', marginRight: 6 }}>
                    {t('Pronunciation (Transliteration):', 'تلفظ:', 'النطق الصوتي:', 'Talaffuz (Transliteration):')}
                  </span>
                  {translit}
                </div>
              );
            })()}

            {/* Urdu Tarjuma (Kanz-ul-Iman) */}
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#047857', marginBottom: 2 }}>
                {t('Kanz-ul-Iman (Urdu Translation):', 'ترجمہ: کنز الایمان فی ترجمۃ القرآن', 'الترجمة: كنز الإيمان', 'Tarjuma: Kanz-ul-Iman')}
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

            {/* Roman Urdu Transliteration & Tarjuma (when enabled and authentic) */}
            {showRomanUrdu &&
              (() => {
                const translit = getAyahRomanTransliteration(selectedSurahNumber, verse.ayahNumber);
                const romanTarjuma = getAyahRomanUrduTarjuma(selectedSurahNumber, verse.ayahNumber);
                if (!translit && !romanTarjuma) return null;
                return (
                  <div
                    style={{
                      margin: '10px 0 10px',
                      padding: '10px 14px',
                      borderRadius: 10,
                      backgroundColor: '#F0F9FF',
                      border: '1px solid #BAE6FD',
                    }}
                  >
                    {/* Transliteration */}
                    {translit && (
                      <div style={{ marginBottom: 6 }}>
                        <div
                          style={{
                            fontSize: 10,
                            fontWeight: 800,
                            color: '#0369A1',
                            textTransform: 'uppercase',
                            marginBottom: 2,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                          }}
                        >
                          <span>🔤</span>
                          <span>{t('Roman Transliteration:', 'رومن تلفظ:', 'النطق الصوتي اللاتيني:', 'Roman Transliteration:')}</span>
                        </div>
                        <div
                          style={{
                            fontSize: Math.max(14, fontSize - 8),
                            fontWeight: 600,
                            color: '#0C4A6E',
                            lineHeight: 1.6,
                          }}
                        >
                          {translit}
                        </div>
                      </div>
                    )}

                    {/* Roman Urdu Tarjuma */}
                    {romanTarjuma && (
                      <div>
                        <div
                          style={{
                            fontSize: 10,
                            fontWeight: 800,
                            color: '#047857',
                            textTransform: 'uppercase',
                            marginBottom: 2,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                          }}
                        >
                          <span>📖</span>
                          <span>{t('Roman Urdu Translation:', 'رومن اردو ترجمہ:', 'ترجمة أردية بالحروف اللاتينية:', 'Roman Urdu Translation:')}</span>
                        </div>
                        <div
                          style={{
                            fontSize: Math.max(13, fontSize - 9),
                            color: '#064E3B',
                            fontWeight: 600,
                            lineHeight: 1.6,
                          }}
                        >
                          {romanTarjuma}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}

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
  );
};
