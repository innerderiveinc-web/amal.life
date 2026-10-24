import React from 'react';
import Link from 'next/link';
import { QuranAyahWisdomCard } from '../../lib/quran-wisdom-data';

interface AskWisdomMatchesSectionProps {
  cards: QuranAyahWisdomCard[];
  activeAudioKey: string | null;
  onPlayAudio: (card: QuranAyahWisdomCard, type: 'ARABIC' | 'URDU') => void;
  onOpenModal: (card: QuranAyahWisdomCard) => void;
  isUrdu: boolean;
  t: (en: string, ur: string) => string;
}

export const AskWisdomMatchesSection: React.FC<AskWisdomMatchesSectionProps> = ({
  cards,
  activeAudioKey,
  onPlayAudio,
  onOpenModal,
  isUrdu,
  t,
}) => {
  if (cards.length === 0) return null;

  return (
    <section style={{ marginBottom: 28 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 14,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 20 }}>📖</span>
          <h2 style={{ fontSize: 18, fontWeight: 800, margin: 0, color: '#064E3B' }}>
            {t('Quranic Ayah Wisdom & Tafsir', 'قرآنی رہنمائی و تفسیری حکمت')}
          </h2>
        </div>
        <Link
          href={`/quran?surah=${cards[0]?.surahNumber || 1}`}
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: '#059669',
            textDecoration: 'none',
          }}
        >
          {t('Open Quran Reader →', 'قرآن ریڈر پر جائیں →')}
        </Link>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {cards.map((card) => {
          const arabicKey = `${card.surahNumber}:${card.ayahNumber}:ARABIC`;
          const urduKey = `${card.surahNumber}:${card.ayahNumber}:URDU`;
          const isPlayingArabic = activeAudioKey === arabicKey;
          const isPlayingUrdu = activeAudioKey === urduKey;

          return (
            <div
              key={`${card.surahNumber}:${card.ayahNumber}`}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                border: '2px solid #A7F3D0',
                padding: 22,
                boxShadow: '0 4px 14px rgba(6, 78, 59, 0.06)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 8,
                  marginBottom: 12,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      padding: '3px 10px',
                      borderRadius: 12,
                      backgroundColor: '#DCFCE7',
                      color: '#166534',
                    }}
                  >
                    TIER 1 REVELATION · کلامِ الٰہی
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      padding: '3px 8px',
                      borderRadius: 12,
                      backgroundColor: '#FEF3C7',
                      color: '#92400E',
                    }}
                  >
                    {t('Translation: Kanz-ul-Iman', 'کنز الایمان فی ترجمۃ القرآن')}
                  </span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 800, color: '#0F172A' }}>
                  {isUrdu
                    ? `سورۃ ${card.surahNameUrdu} (${card.surahNameTransliterated}) · آیت ${card.ayahNumber}`
                    : `${card.surahNameTransliterated} (${card.surahNameArabic}) · Verse ${card.ayahNumber}`}
                </span>
              </div>

              {/* Arabic Text */}
              <div
                dir="rtl"
                style={{
                  fontFamily: 'var(--font-arabic), "Amiri", serif',
                  fontSize: 22,
                  lineHeight: 2.1,
                  color: '#064E3B',
                  padding: '12px 16px',
                  backgroundColor: '#F0FDF4',
                  borderRadius: 10,
                  border: '1px solid #BBF7D0',
                  marginBottom: 12,
                  textAlign: 'right',
                }}
              >
                {card.textArabic}
              </div>

              {/* Urdu Translation Kanz-ul-Iman */}
              <div
                dir="rtl"
                style={{
                  fontSize: 16,
                  lineHeight: 1.8,
                  color: '#1E293B',
                  fontWeight: 600,
                  marginBottom: 8,
                  textAlign: 'right',
                }}
              >
                <strong>{t('Translation (Kanz-ul-Iman):', 'ترجمہ کنز الایمان:')}</strong>{' '}
                {card.tarjumaKanzulIman}
              </div>

              {/* English Translation */}
              <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.5, marginBottom: 14 }}>
                <em>"{card.tarjumaEnglish}"</em>
              </div>

              {/* Tafsir Khaza'in-ul-Irfan Excerpt */}
              <div
                dir="rtl"
                style={{
                  padding: '10px 14px',
                  borderRadius: 8,
                  backgroundColor: '#FFFBEB',
                  border: '1px solid #FDE68A',
                  marginBottom: 14,
                  textAlign: 'right',
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: '#92400E',
                    marginBottom: 4,
                  }}
                >
                  {t(
                    "📖 Khaza'in-ul-Irfan Tafsir Excerpt:",
                    '📖 خزائن العرفان (صدر الافاضل مولانا نعیم الدین مراد آبادی):'
                  )}
                </div>
                <div style={{ fontSize: 13, color: '#78350F', lineHeight: 1.7 }}>
                  {card.tafseerKhazainUlIrfan.excerptUrdu}
                </div>
              </div>

              {/* Action & Audio Toolbar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 8,
                  borderTop: '1px solid #F1F5F9',
                  paddingTop: 12,
                }}
              >
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => onPlayAudio(card, 'ARABIC')}
                    style={{
                      padding: '5px 12px',
                      borderRadius: 6,
                      backgroundColor: isPlayingArabic ? '#047857' : '#DCFCE7',
                      color: isPlayingArabic ? '#FFFFFF' : '#166534',
                      border: '1px solid #86EFAC',
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <span>{isPlayingArabic ? '⏸' : '🎙️'}</span>
                    <span>{t('Arabic Audio', 'عربی تلاوت')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onPlayAudio(card, 'URDU')}
                    style={{
                      padding: '5px 12px',
                      borderRadius: 6,
                      backgroundColor: isPlayingUrdu ? '#B45309' : '#FEF3C7',
                      color: isPlayingUrdu ? '#FFFFFF' : '#92400E',
                      border: '1px solid #FDE68A',
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <span>{isPlayingUrdu ? '⏸' : '🎧'}</span>
                    <span>{t('Urdu Audio', 'اردو ترجمہ آڈیو')}</span>
                  </button>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    type="button"
                    onClick={() => onOpenModal(card)}
                    style={{
                      padding: '5px 12px',
                      borderRadius: 6,
                      backgroundColor: '#0F172A',
                      color: '#FFFFFF',
                      border: 'none',
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <span>✨</span>
                    <span>{t('View Tadabbur Card', 'مکمل تدبر و نیت کارڈ')}</span>
                  </button>

                  <Link
                    href={`/quran?surah=${card.surahNumber}`}
                    style={{
                      padding: '5px 12px',
                      borderRadius: 6,
                      backgroundColor: '#F1F5F9',
                      color: '#334155',
                      border: '1px solid #CBD5E1',
                      fontSize: 12,
                      fontWeight: 700,
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <span>📖</span>
                    <span>{t('View Surah →', 'سورت دیکھیں →')}</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
