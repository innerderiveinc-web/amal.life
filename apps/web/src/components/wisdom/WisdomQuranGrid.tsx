import React from 'react';
import { QuranAyahWisdomCard } from '../../lib/quran-wisdom-data';
import { UniversalCardPayload } from '../cards/UniversalContentShareModal';
import { verifyContentCitation, SanadVerificationReport } from '../../lib/authenticity-pipeline';
import { useLanguage } from '../../context/LanguageContext';

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
  const { t, isUrdu, isArabic, isRomanUrdu } = useLanguage();

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
                    {t('Surah', 'سورۃ', 'سورة', 'Surah')}{' '}
                    {isArabic ? card.surahNameArabic : isUrdu ? card.surahNameUrdu : card.surahNameTransliterated}{' '}
                    ({card.ayahNumber})
                  </span>
                  <span style={{ fontSize: 11, color: '#64748B' }}>
                    {card.revelationType === 'MECCAN'
                      ? t('Meccan', 'مکی', 'مكية', 'Makki')
                      : t('Medinan', 'مدنی', 'مدنية', 'Madani')}
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
                    title={t('Generate social media image card', 'خوبصورت سوشل میڈیا کارڈ بنائیں', 'إنشاء بطاقة لمواقع التواصل', 'Image Card Banayein')}
                  >
                    <span>📸</span>
                    <span>{t('Card', 'کارڈ', 'بطاقة', 'Card')}</span>
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
                    title={t('Inspect scholarly authenticity and lineage', 'تحقیق و سندِ روایت دیکھیں', 'فحص السند والتوثيق العلمي', 'Sanad o Tehqeeq dekhein')}
                  >
                    <span>✓</span>
                    <span>{t('Sanad Verified', 'مستند سند', 'سند موثق', 'Sanad Verified')}</span>
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
                    title={isBookmarked ? t('Remove from saved', 'محفوظ فہرست سے ہٹائیں', 'إزالة من المحفوظات', 'Mehfooz list se hatayein') : t('Save to favorites', 'پسندیدہ کارڈ محفوظ کریں', 'حفظ إلى المفضلة', 'Favorites mein mehfooz karein')}
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

              {/* Translation Box */}
              <div
                dir={isUrdu || isArabic ? 'rtl' : 'ltr'}
                style={{
                  backgroundColor: '#F8FAFC',
                  padding: 12,
                  borderRadius: 10,
                  borderRight: isUrdu || isArabic ? '3px solid #059669' : 'none',
                  borderLeft: !(isUrdu || isArabic) ? '3px solid #059669' : 'none',
                  marginBottom: 12,
                }}
              >
                <div style={{ fontSize: 10, fontWeight: 700, color: '#065F46', marginBottom: 2 }}>
                  {t(
                    'Translation: Kanz-ul-Iman',
                    'ترجمہ کنز الایمان فی ترجمۃ القرآن:',
                    'ترجمة كنز الإيمان في ترجمة القرآن:',
                    'Tarjuma Kanz-ul-Iman:'
                  )}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: '#1E293B',
                    fontFamily: isUrdu ? 'var(--font-urdu), serif' : 'system-ui, -apple-system, sans-serif',
                  }}
                >
                  {isUrdu || isArabic ? card.tarjumaKanzulIman : card.tarjumaEnglish}
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
                  {t(
                    "Tafsir Khaza'in-ul-Irfan:",
                    'تفسیر خزائن العرفان (صدر الافاضل نعیم الدین مراد آبادی):',
                    'تفسير خزائن العرفان:',
                    "Tafseer Khaza'in-ul-Irfan:"
                  )}
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
                <span>
                  {isPlayingArabic
                    ? t('Pause', 'روکیں', 'إيقاف', 'Pause')
                    : t('Recite', 'تلاوت', 'تلاوة', 'Tilawat')}
                </span>
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
                <span>
                  {isPlayingUrdu
                    ? t('Playing', 'ترجمہ جاری', 'ترجمة جارية', 'Tarjuma Jari')
                    : t('Urdu Audio', 'اردو ترجمہ', 'صوت الترجمة', 'Urdu Audio')}
                </span>
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
                <span>
                  {isPlayingTafseer
                    ? t('Playing', 'تفسیر جاری', 'تفسير جاري', 'Tafseer Jari')
                    : t('Tafsir Audio', 'تفسیر آڈیو', 'التفسير الصوتي', 'Tafseer Audio')}
                </span>
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
                <span>{t('Study', 'تفصیل و تدبر', 'دراسة وتدبر', 'Tafseel o Tadabbur')}</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
