import React from 'react';
import { QuranSurahMeta } from '../../lib/quran-114-directory';
import { useLanguage } from '../../context/LanguageContext';
import { AudioSegment } from './FloatingQuranAudioPlayer';

export interface FloatingPlayerTrackMetaProps {
  surahWideAudioType: 'KANZUL_IMAN' | 'TAFSEER' | null;
  activeTafseerCardKey: string | null;
  currentAudioSegment: AudioSegment;
  currentSurahMeta: QuranSurahMeta | undefined;
  selectedQari: 'alafasy' | 'husary' | 'minshawi';
  playingAyahNumber: number | null;
}

export const FloatingPlayerTrackMeta: React.FC<FloatingPlayerTrackMetaProps> = ({
  surahWideAudioType,
  activeTafseerCardKey,
  currentAudioSegment,
  currentSurahMeta,
  selectedQari,
  playingAyahNumber,
}) => {
  const { t, isUrdu } = useLanguage();

  return (
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
                surahWideAudioType === 'KANZUL_IMAN' ||
                surahWideAudioType === 'TAFSEER' ||
                activeTafseerCardKey !== null ||
                currentAudioSegment === 'URDU'
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
                  ? t("Khaza'in-ul-Irfan Tafsir", 'خزائن العرفان (تفسیری حکمت)')
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
                    : selectedQari === 'alafasy'
                      ? isUrdu
                        ? 'مشاری العفاسی'
                        : 'Mishary Alafasy'
                      : selectedQari === 'husary'
                        ? isUrdu
                          ? 'محمود خلیل الحصری'
                          : 'Mahmoud Al-Husary'
                        : isUrdu
                          ? 'محمد صدیق المنشاوی'
                          : 'Siddiq Al-Minshawi'}
          </span>
        </div>
        <div
          style={{
            fontSize: 14,
            fontWeight: 800,
            color: '#FFFFFF',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {surahWideAudioType
            ? isUrdu
              ? `سورۃ ${currentSurahMeta?.nameUrdu} (${currentSurahMeta?.nameTransliterated})`
              : `Surah ${currentSurahMeta?.nameTransliterated} (${currentSurahMeta?.nameArabic})`
            : activeTafseerCardKey
              ? t('Wisdom & Commentary Audio Recitation', 'حکمت و تفسیری عبارت کی صوتی قرأت')
              : isUrdu
                ? `سورۃ ${currentSurahMeta?.nameUrdu} (${currentSurahMeta?.nameTransliterated}) · آیت ${playingAyahNumber}`
                : `Surah ${currentSurahMeta?.nameTransliterated} (${currentSurahMeta?.nameArabic}) · Verse ${playingAyahNumber}`}
        </div>
      </div>
    </div>
  );
};
