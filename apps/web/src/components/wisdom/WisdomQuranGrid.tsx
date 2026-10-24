import React from 'react';
import { QuranAyahWisdomCard } from '../../lib/quran-wisdom-data';
import { UniversalCardPayload } from '../cards/UniversalContentShareModal';
import { verifyContentCitation, SanadVerificationReport } from '../../lib/authenticity-pipeline';

interface WisdomQuranGridProps {
  cards: QuranAyahWisdomCard[];
  bookmarkedCardIds: string[];
  activeAudioKey: string | null;
  isPlayingAudio: boolean;
  onToggleBookmark: (cardKey: string) => void;
  onPlayAyahAudio: (card: QuranAyahWisdomCard, type: 'ARABIC' | 'URDU') => void;
  onPlayTafseerAudio: (card: QuranAyahWisdomCard) => void;
  onOpenModal: (card: QuranAyahWisdomCard) => void;
  onShareCard: (payload: UniversalCardPayload) => void;
  onVerifySanad: (report: SanadVerificationReport) => void;
}

export const WisdomQuranGrid: React.FC<WisdomQuranGridProps> = ({
  cards,
  bookmarkedCardIds,
  activeAudioKey,
  isPlayingAudio,
  onToggleBookmark,
  onPlayAyahAudio,
  onPlayTafseerAudio,
  onOpenModal,
  onShareCard,
  onVerifySanad,
}) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: 18,
      }}
    >
      {cards.map((card) => {
        const cardKey = `${card.surahNumber}:${card.ayahNumber}`;
        const isBookmarked = bookmarkedCardIds.includes(cardKey);
        const isPlayingArabic = activeAudioKey === `${cardKey}:ARABIC` && isPlayingAudio;
        const isPlayingUrdu = activeAudioKey === `${cardKey}:URDU` && isPlayingAudio;
        const isPlayingTafseer = activeAudioKey === `${cardKey}:TAFSEER` && isPlayingAudio;

        return (
          <div
            key={cardKey}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              border: isBookmarked ? '1px solid #FCD34D' : '1px solid #E2E8F0',
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <div>
              {/* Card Top: Surah Name + Bookmark */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 12,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 800,
                      backgroundColor: '#DCFCE7',
                      color: '#166534',
                      padding: '2px 8px',
                      borderRadius: 6,
                    }}
                  >
                    سورۃ {card.surahNameUrdu} ({card.ayahNumber})
                  </span>
                  <span style={{ fontSize: 11, color: '#64748B' }}>
                    {card.revelationType === 'MECCAN' ? 'مکی' : 'مدنی'}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <button
                    type="button"
                    onClick={() => {
                      onShareCard({
                        category: 'QURAN',
                        titleUrdu: `سورۃ ${card.surahNameUrdu}`,
                        badgeContext: `آیت ${card.ayahNumber} (${card.revelationType === 'MECCAN' ? 'مکی' : 'مدنی'})`,
                        arabicText: card.textArabic,
                        primaryTextUrdu: card.tarjumaKanzulIman,
                        secondaryTextEnglish: card.tarjumaEnglish,
                        sourceCitation: `سورۃ ${card.surahNameUrdu} (${card.surahNumber}:${card.ayahNumber}) · کنز الایمان`,
                        tafseerInsightUrdu: card.tafseerKhazainUlIrfan
                          ? `تفسیر خزائن العرفان: ${card.tafseerKhazainUlIrfan.excerptUrdu}`
                          : undefined,
                      });
                    }}
                    style={{
                      padding: '3px 8px',
                      borderRadius: 6,
                      border: '1px solid #CBD5E1',
                      backgroundColor: '#F8FAFC',
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#065F46',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                    title="خوبصورت سوشل میڈیا کارڈ بنائیں"
                  >
                    <span>📸</span>
                    <span>کارڈ</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const rep = verifyContentCitation(
                        `سورۃ ${card.surahNameUrdu} (${card.surahNumber}:${card.ayahNumber}) · کنز الایمان فی ترجمۃ القرآن`
                      );
                      onVerifySanad(rep);
                    }}
                    style={{
                      padding: '3px 8px',
                      borderRadius: 6,
                      border: '1px solid #10B981',
                      backgroundColor: '#ECFDF5',
                      fontSize: 10,
                      fontWeight: 800,
                      color: '#065F46',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 3,
                    }}
                    title="تحقیق و سندِ روایت دیکھیں"
                  >
                    <span>✓</span>
                    <span>مستند سند</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleBookmark(cardKey)}
                    style={{
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      fontSize: 18,
                    }}
                    title={isBookmarked ? 'محفوظ فہرست سے ہٹائیں' : 'پسندیدہ کارڈ محفوظ کریں'}
                  >
                    {isBookmarked ? '⭐' : '☆'}
                  </button>
                </div>
              </div>

              {/* Arabic Matn */}
              <div
                dir="rtl"
                style={{
                  fontFamily: 'var(--font-arabic), "Amiri", serif',
                  fontSize: 22,
                  lineHeight: 1.8,
                  color: '#0F172A',
                  textAlign: 'right',
                  marginBottom: 12,
                  fontWeight: 600,
                }}
              >
                {card.textArabic}
              </div>

              {/* Urdu Translation: Kanz-ul-Iman */}
              <div
                dir="rtl"
                style={{
                  backgroundColor: '#F8FAFC',
                  padding: 12,
                  borderRadius: 10,
                  borderRight: '3px solid #059669',
                  marginBottom: 12,
                }}
              >
                <div style={{ fontSize: 10, fontWeight: 700, color: '#065F46', marginBottom: 2 }}>
                  ترجمہ کنز الایمان فی ترجمۃ القرآن:
                </div>
                <div
                  style={{
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: '#1E293B',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                  }}
                >
                  {card.tarjumaKanzulIman}
                </div>
              </div>

              {/* Exegesis Excerpt: Khaza'in-ul-Irfan */}
              <div
                dir="rtl"
                style={{
                  backgroundColor: '#FFFBEB',
                  padding: 12,
                  borderRadius: 10,
                  borderRight: '3px solid #D97706',
                  marginBottom: 16,
                }}
              >
                <div style={{ fontSize: 10, fontWeight: 700, color: '#92400E', marginBottom: 2 }}>
                  تفسیر خزائن العرفان (صدر الافاضل نعیم الدین مراد آبادی):
                </div>
                <div style={{ fontSize: 12, lineHeight: 1.6, color: '#78350F' }}>
                  {card.tafseerKhazainUlIrfan.excerptUrdu}
                </div>
              </div>
            </div>

            {/* Bottom Action Buttons: Tilawat, Urdu Audio, Spoken Tafseer, Deep Study */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 6,
                borderTop: '1px solid #F1F5F9',
                paddingTop: 12,
              }}
            >
              {/* Tilawat */}
              <button
                type="button"
                onClick={() => onPlayAyahAudio(card, 'ARABIC')}
                style={{
                  padding: '8px 4px',
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 700,
                  border: '1px solid #BBF7D0',
                  backgroundColor: isPlayingArabic ? '#065F46' : '#F0FDF4',
                  color: isPlayingArabic ? '#FFFFFF' : '#166534',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <span>{isPlayingArabic ? '⏸' : '▶'}</span>
                <span>{isPlayingArabic ? 'جاری' : 'تلاوت'}</span>
              </button>

              {/* Urdu Translation */}
              <button
                type="button"
                onClick={() => onPlayAyahAudio(card, 'URDU')}
                style={{
                  padding: '8px 4px',
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 700,
                  border: '1px solid #BAE6FD',
                  backgroundColor: isPlayingUrdu ? '#0284C7' : '#F0F9FF',
                  color: isPlayingUrdu ? '#FFFFFF' : '#0369A1',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <span>{isPlayingUrdu ? '⏸' : '🎙️'}</span>
                <span>{isPlayingUrdu ? 'ترجمہ جاری' : 'اردو ترجمہ'}</span>
              </button>

              {/* Tafseer Spoken Audio */}
              <button
                type="button"
                onClick={() => onPlayTafseerAudio(card)}
                style={{
                  padding: '8px 4px',
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 700,
                  border: '1px solid #FDE68A',
                  backgroundColor: isPlayingTafseer ? '#92400E' : '#FFFBEB',
                  color: isPlayingTafseer ? '#FFFFFF' : '#92400E',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <span>{isPlayingTafseer ? '⏹' : '📖'}</span>
                <span>{isPlayingTafseer ? 'تفسیر جاری' : 'تفسیر آڈیو'}</span>
              </button>

              {/* Deep Study Modal */}
              <button
                type="button"
                onClick={() => onOpenModal(card)}
                style={{
                  padding: '8px 4px',
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 700,
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#F8FAFC',
                  color: '#334155',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <span>🔍</span>
                <span>تفصیل و تدبر</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
