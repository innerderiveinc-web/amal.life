import React, { useState } from 'react';
import { MOTHERHOOD_FAMILY_DUAS, MasnoonFamilyDua } from '../../lib/women-sanctuary-data';
import { useLanguage } from '../../context/LanguageContext';

interface SistersDuasTabProps {
  isUrdu?: boolean;
  onGenerateDuaCard: (dua: MasnoonFamilyDua) => void;
}

export function SistersDuasTab({
  onGenerateDuaCard,
}: SistersDuasTabProps) {
  const { isUrdu, isRomanUrdu, t } = useLanguage();
  const [copiedDuaId, setCopiedDuaId] = useState<string | null>(null);

  const getDuaTitle = (dua: MasnoonFamilyDua) => {
    if (isRomanUrdu) return dua.titleRomanUrdu || dua.titleEnglish;
    if (isUrdu) return dua.titleUrdu;
    return dua.titleEnglish;
  };

  const getDuaSubtitle = (dua: MasnoonFamilyDua) => {
    if (isRomanUrdu || isUrdu) return dua.titleEnglish;
    return dua.titleUrdu;
  };

  const getDuaPrimaryTranslation = (dua: MasnoonFamilyDua) => {
    if (isRomanUrdu) return dua.translationRomanUrdu || dua.translationEnglish;
    if (isUrdu) return dua.translationUrdu;
    return dua.translationEnglish;
  };

  const getDuaSecondaryTranslation = (dua: MasnoonFamilyDua) => {
    if (isRomanUrdu || isUrdu) return dua.translationEnglish;
    return dua.translationUrdu;
  };

  const getDuaVirtue = (dua: MasnoonFamilyDua) => {
    if (isRomanUrdu) return dua.spiritualVirtueRomanUrdu || dua.spiritualVirtueEnglish || dua.spiritualVirtueUrdu;
    if (isUrdu) return dua.spiritualVirtueUrdu;
    return dua.spiritualVirtueEnglish || dua.spiritualVirtueUrdu;
  };

  const handleCopyDua = (dua: MasnoonFamilyDua) => {
    const title = getDuaTitle(dua);
    const translation = getDuaPrimaryTranslation(dua);
    const virtue = getDuaVirtue(dua);
    const textToCopy = `${title} (${dua.reference})\n\n${dua.arabicText}\n\n${dua.transliteration}\n\n${t('Translation: ', 'ترجمہ: ', 'الترجمة: ', 'Tarjuma: ')}${translation}\n\n${t('Virtue: ', 'فضیلت: ', 'الفضيلة: ', 'Fazilat: ')}${virtue}\n\n— Amal OS (Amal Nisa)`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedDuaId(dua.id);
    setTimeout(() => setCopiedDuaId(null), 3000);
  };

  const handleShareDuaWhatsApp = (dua: MasnoonFamilyDua) => {
    const title = getDuaTitle(dua);
    const translation = getDuaPrimaryTranslation(dua);
    const textToShare = `${title} (${dua.reference})\n\n${dua.arabicText}\n\n${t('Translation: ', 'ترجمہ: ', 'الترجمة: ', 'Tarjuma: ')}${translation}\n\n— Amal Nisa (The Sisters Sanctuary)`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(textToShare)}`;
    window.open(url, '_blank');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 14,
          padding: 20,
          border: '1px solid #E5E7EB',
        }}
      >
        <h2
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: '#064E3B',
            margin: '0 0 6px 0',
          }}
        >
          {t(
            'Motherhood & Family Masnoon Supplications',
            'مائیں، حمل، نوزائیدہ اور گھریلو مسنون دعائیں',
            'أدعية الأمهات والذرية والأسرة المسنونة',
            'Maaen, Hamal, Nau-zaida aur Gharailu Masnoon Duayein'
          )}
        </h2>
        <p style={{ margin: 0, fontSize: 14, color: '#4B5563' }}>
          {t(
            'Authentic Quranic and Prophetic supplications for righteous children, ease in childbirth, protection from evil eye, and marital love.',
            'قرآن پاک اور احادیثِ مبارکہ سے ثابت شدہ دعائیں برائے نیک اولاد، ولادت میں آسانی، بچوں کی نظرِ بد سے حفاظت اور گھر میں باہمی سکون۔',
            'أدعية قرآنية ونبوية معتمدة للذرية الصالحة وتيسير الولادة والتحصين من العين والمحبة الزوجية.',
            'Quran Paak aur ahadith-e-mubarakah se sabit shuda duayein baraye nek aulaad, wiladat mein aasani, bachon ki nazar-e-bad se hifazat aur ghar mein baahimi sukoon.'
          )}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {MOTHERHOOD_FAMILY_DUAS.map((dua) => (
          <div
            key={dua.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 14,
              padding: 22,
              border: '1px solid #E5E7EB',
              boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 12,
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: 18,
                  fontWeight: 800,
                  color: '#064E3B',
                }}
              >
                {getDuaTitle(dua)}
              </h3>
              <span
                style={{
                  backgroundColor: '#FEF3C7',
                  color: '#92400E',
                  padding: '2px 8px',
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                {dua.reference}
              </span>
            </div>

            <div
              style={{
                fontSize: 12,
                color: '#059669',
                fontWeight: 600,
                marginBottom: 10,
              }}
            >
              {getDuaSubtitle(dua)}
            </div>

            {/* Arabic Text */}
            <div
              style={{
                backgroundColor: '#F0FDF4',
                padding: '16px 20px',
                borderRadius: 12,
                border: '1px solid #BBF7D0',
                fontSize: 22,
                fontFamily: "'Amiri', 'Traditional Arabic', serif",
                color: '#064E3B',
                textAlign: 'center',
                direction: 'rtl',
                lineHeight: 1.8,
                marginBottom: 12,
              }}
            >
              {dua.arabicText}
            </div>

            {/* Transliteration */}
            <div
              style={{
                fontSize: 13,
                color: '#6B7280',
                fontStyle: 'italic',
                marginBottom: 8,
              }}
            >
              {dua.transliteration}
            </div>

            {/* Primary Translation */}
            <div
              style={{
                fontSize: 15,
                color: '#1F2937',
                fontWeight: 600,
                lineHeight: 1.6,
                marginBottom: 4,
              }}
            >
              {getDuaPrimaryTranslation(dua)}
            </div>
            <div
              style={{
                fontSize: 13,
                color: '#4B5563',
                lineHeight: 1.6,
                marginBottom: 10,
              }}
            >
              {getDuaSecondaryTranslation(dua)}
            </div>

            {/* Spiritual Benefit / Context */}
            <div
              style={{
                fontSize: 13,
                color: '#047857',
                backgroundColor: '#ECFDF5',
                padding: '8px 12px',
                borderRadius: 8,
                lineHeight: 1.6,
              }}
            >
              <strong>{t('Spiritual Virtue:', 'فضیلت و روحانی برکت:', 'الفضيلة والبركة الروحية:', 'Fazilat wa Ruhani Barkat:')}</strong>{' '}
              {getDuaVirtue(dua)}
            </div>

            {/* Action Bar: Copy & WhatsApp Share */}
            <div
              style={{
                marginTop: 14,
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 8,
                borderTop: '1px solid #F3F4F6',
                paddingTop: 10,
              }}
            >
              <button
                onClick={() => onGenerateDuaCard(dua)}
                style={{
                  backgroundColor: '#064E3B',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span>🎨</span>
                <span>
                  {t('Generate Dua Card', 'دعائیہ کارڈ بنائیں', 'إنشاء بطاقة دعاء', 'Dua Card Banayein')}
                </span>
              </button>

              <button
                onClick={() => handleCopyDua(dua)}
                style={{
                  backgroundColor: copiedDuaId === dua.id ? '#D1FAE5' : '#F3F4F6',
                  color: copiedDuaId === dua.id ? '#065F46' : '#374151',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span>{copiedDuaId === dua.id ? '✓' : '📋'}</span>
                <span>
                  {copiedDuaId === dua.id
                    ? t('Copied!', 'کاپی ہو گئی!', 'تم النسخ!', 'Copy ho gayi!')
                    : t('Copy Dua', 'دعا کاپی کریں', 'نسخ الدعاء', 'Dua Copy Karein')}
                </span>
              </button>

              <button
                onClick={() => handleShareDuaWhatsApp(dua)}
                style={{
                  backgroundColor: '#075E54',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span>💬</span>
                <span>
                  {t('Share WhatsApp', 'واٹس ایپ پر شیئر کریں', 'مشاركة عبر واتساب', 'WhatsApp Par Share Karein')}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
