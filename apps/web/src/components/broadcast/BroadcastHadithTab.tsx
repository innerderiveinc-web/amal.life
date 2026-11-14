import React from 'react';
import Link from 'next/link';
import { DailyKnowledgeBroadcast } from '@amal/amal-engine';
import { useLanguage } from '../../context/LanguageContext';

export interface BroadcastHadithTabProps {
  hadith: DailyKnowledgeBroadcast['hadith'];
  copied: boolean;
  onCopy: (text: string) => void;
  onMakeCard?: () => void;
}

export const BroadcastHadithTab: React.FC<BroadcastHadithTabProps> = ({
  hadith,
  copied,
  onCopy,
  onMakeCard,
}) => {
  const { t } = useLanguage();
  return (
    <div style={{ animation: 'fadeIn 0.2s ease-in-out' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: '#1E40AF',
            backgroundColor: '#DBEAFE',
            padding: '4px 10px',
            borderRadius: 6,
          }}
        >
          {hadith.sourceBook} • {t('Narrator: ', 'راوی: ', 'الراوي: ', 'Rawi: ')}{hadith.narrator}
        </span>

        <button
          onClick={() => onCopy(`${hadith.arabicMatn}\n\n${hadith.urduTranslation}`)}
          style={{
            background: 'none',
            border: '1px solid #CBD5E1',
            padding: '4px 10px',
            borderRadius: 6,
            fontSize: 12,
            cursor: 'pointer',
            color: '#475569',
          }}
        >
          {copied
            ? t('✅ Copied', '✅ کاپی ہو گیا', '✅ تم النسخ', '✅ Copy ho gaya')
            : t('📋 Copy Text', '📋 متن کاپی کریں', '📋 نسخ النص', '📋 Matn Copy Karein')}
        </button>
      </div>

      {/* Arabic Matn */}
      <div
        dir="rtl"
        style={{
          fontFamily: "'Amiri', 'Traditional Arabic', serif",
          fontSize: 21,
          lineHeight: 1.8,
          color: '#1E3A8A',
          backgroundColor: '#EFF6FF',
          padding: '16px 20px',
          borderRadius: 12,
          border: '1px solid #BFDBFE',
          marginBottom: 14,
        }}
      >
        «{hadith.arabicMatn}»
      </div>

      {/* Urdu Translation */}
      <div
        dir="rtl"
        style={{
          fontFamily: "'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif",
          fontSize: 18,
          lineHeight: 1.9,
          color: '#1F2937',
          backgroundColor: '#FAFAF9',
          padding: '14px 18px',
          borderRadius: 10,
          border: '1px solid #E7E5E4',
          marginBottom: 12,
        }}
      >
        <span style={{ fontWeight: 800, color: '#1E40AF' }}>
          اردو مفہوم:{' '}
        </span>
        {hadith.urduTranslation}
      </div>

      {/* English Translation */}
      {hadith.englishTranslation && (
        <div style={{ fontSize: 13.5, color: '#374151', marginBottom: 14, lineHeight: 1.6, padding: '10px 14px', backgroundColor: '#F8FAFC', borderRadius: 8, border: '1px solid #E2E8F0' }}>
          <strong style={{ color: '#1E40AF' }}>{t('English Meaning: ', 'انگریزی مفہوم: ', 'المعنى بالإنجليزية: ', 'English Meaning: ')}</strong>
          &ldquo;{hadith.englishTranslation}&rdquo;
        </div>
      )}

      {/* Practical Sunnah Action */}
      <div
        style={{
          backgroundColor: '#FEF3C7',
          border: '1px solid #FDE68A',
          padding: '10px 14px',
          borderRadius: 8,
          fontSize: 13,
          color: '#92400E',
          marginBottom: 16,
        }}
      >
        <strong>🎯 {t('Sunnah in Daily Life: ', 'روزمرہ سنت پر عمل: ', 'السنة النبوية في الحياة: ', 'Rozmarrah Sunnah par Amal: ')}</strong> {hadith.sunnahApplication}
      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        {onMakeCard && (
          <button
            onClick={onMakeCard}
            style={{
              backgroundColor: '#1E40AF',
              color: '#FFFFFF',
              border: 'none',
              fontSize: 13,
              fontWeight: 700,
              padding: '8px 16px',
              borderRadius: 8,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(30, 64, 175, 0.2)',
            }}
          >
            <span>📸 {t('Create Hadith Card', 'حدیث کارڈ بنائیں', 'إنشاء بطاقة الحديث', 'Hadith Card Banayein')}</span>
          </button>
        )}

        <Link
          href="/library?work=CANON-HAD-040"
          style={{
            textDecoration: 'none',
            backgroundColor: '#1E40AF',
            color: '#FFFFFF',
            fontSize: 13,
            fontWeight: 700,
            padding: '8px 16px',
            borderRadius: 8,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span>📜 {t('Read 42 Hadiths of Arba\'in in Library →', 'اربعین نووی کے تمام ۴۲ اسباق لائبریری میں پڑھیں →', 'قراءة الأربعين النووية في المكتبة ←', 'Arba\'in Nawawi ke 42 Asbaaq Library me Padhein →')}</span>
        </Link>
      </div>
    </div>
  );
};
