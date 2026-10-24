import React, { useState } from 'react';
import { MOTHERHOOD_FAMILY_DUAS, MasnoonFamilyDua } from '../../lib/women-sanctuary-data';

interface SistersDuasTabProps {
  isUrdu: boolean;
  onGenerateDuaCard: (dua: MasnoonFamilyDua) => void;
}

export function SistersDuasTab({
  isUrdu,
  onGenerateDuaCard,
}: SistersDuasTabProps) {
  const [copiedDuaId, setCopiedDuaId] = useState<string | null>(null);

  const handleCopyDua = (dua: MasnoonFamilyDua) => {
    const textToCopy = isUrdu
      ? `${dua.titleUrdu} (${dua.reference})\n\n${dua.arabicText}\n\n${dua.transliteration}\n\nترجمہ: ${dua.translationUrdu}\n\nفضیلت: ${dua.spiritualVirtueUrdu}\n\n— امل او ایس (گوشۂ خواتین)`
      : `${dua.titleEnglish} (${dua.reference})\n\n${dua.arabicText}\n\n${dua.transliteration}\n\nTranslation: ${dua.translationEnglish}\n\nVirtue: ${dua.spiritualVirtueEnglish || dua.spiritualVirtueUrdu}\n\n— Amal OS (The Sisters Sanctuary)`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedDuaId(dua.id);
    setTimeout(() => setCopiedDuaId(null), 3000);
  };

  const handleShareDuaWhatsApp = (dua: MasnoonFamilyDua) => {
    const textToShare = isUrdu
      ? `${dua.titleUrdu} (${dua.reference})\n\n${dua.arabicText}\n\nترجمہ: ${dua.translationUrdu}\n\n— امل نساء (Amal Nisa Sanctuary)`
      : `${dua.titleEnglish} (${dua.reference})\n\n${dua.arabicText}\n\nTranslation: ${dua.translationEnglish}\n\n— Amal Nisa (The Sisters Sanctuary)`;
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
          {isUrdu ? 'مائیں، حمل، نوزائیدہ اور گھریلو مسنون دعائیں' : 'Motherhood & Family Masnoon Supplications'}
        </h2>
        <p style={{ margin: 0, fontSize: 14, color: '#4B5563' }}>
          {isUrdu
            ? 'قرآن پاک اور احادیثِ مبارکہ سے ثابت شدہ دعائیں برائے نیک اولاد، ولادت میں آسانی، بچوں کی نظرِ بد سے حفاظت اور گھر میں باہمی سکون۔'
            : 'Authentic Quranic and Prophetic supplications for righteous children, ease in childbirth, protection from evil eye, and marital love.'}
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
                {isUrdu ? dua.titleUrdu : dua.titleEnglish}
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
              {isUrdu ? dua.titleEnglish : dua.titleUrdu}
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

            {/* Translation */}
            <div
              style={{
                fontSize: 15,
                color: '#1F2937',
                fontWeight: 600,
                lineHeight: 1.6,
                marginBottom: 4,
              }}
            >
              {isUrdu ? dua.translationUrdu : dua.translationEnglish}
            </div>
            <div
              style={{
                fontSize: 13,
                color: '#4B5563',
                lineHeight: 1.6,
                marginBottom: 10,
              }}
            >
              {isUrdu ? dua.translationEnglish : dua.translationUrdu}
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
              <strong>{isUrdu ? 'فضیلت و روحانی برکت:' : 'Spiritual Virtue:'}</strong>{' '}
              {isUrdu ? dua.spiritualVirtueUrdu : (dua.spiritualVirtueEnglish || dua.spiritualVirtueUrdu)}
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
                <span>{isUrdu ? 'دعائیہ کارڈ بنائیں' : 'Generate Dua Card'}</span>
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
                    ? isUrdu ? 'کاپی ہو گئی!' : 'Copied!'
                    : isUrdu ? 'دعا کاپی کریں' : 'Copy Dua'}
                </span>
              </button>

              <button
                onClick={() => handleShareDuaWhatsApp(dua)}
                style={{
                  backgroundColor: '#25D366',
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
                <span>{isUrdu ? 'واٹس ایپ پر شیئر کریں' : 'Share WhatsApp'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
