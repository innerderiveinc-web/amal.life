import React from 'react';
import Link from 'next/link';
import { DailyKnowledgeBroadcast } from '@amal/amal-engine';
import { useLanguage } from '../../context/LanguageContext';

export interface BroadcastDuaTabProps {
  dua: DailyKnowledgeBroadcast['dua'];
  copied: boolean;
  onCopy: (text: string) => void;
  onPlayDua: () => void;
  onMakeCard?: () => void;
}

export const BroadcastDuaTab: React.FC<BroadcastDuaTabProps> = ({
  dua,
  copied,
  onCopy,
  onPlayDua,
  onMakeCard,
}) => {
  const { t, isUrdu, isArabic } = useLanguage();
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
            color: '#7C2D12',
            backgroundColor: '#FFEDD5',
            padding: '4px 10px',
            borderRadius: 6,
          }}
        >
          {dua.sourceBook} • {(isUrdu || isArabic) ? dua.titleUrdu : (dua.titleEnglish || dua.titleUrdu)}
        </span>

        <button
          onClick={() => onCopy(`${dua.arabicText}\n\n${dua.urduTranslation}`)}
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
            : t('📋 Copy Dua', '📋 دعا کاپی کریں', '📋 نسخ الدعاء', '📋 Dua Copy Karein')}
        </button>
      </div>

      {/* Arabic Text */}
      <div
        dir="rtl"
        style={{
          fontFamily: "'Amiri', 'Traditional Arabic', serif",
          fontSize: 22,
          lineHeight: 1.8,
          color: '#7C2D12',
          backgroundColor: '#FFF7ED',
          padding: '16px 20px',
          borderRadius: 12,
          border: '1px solid #FED7AA',
          marginBottom: 14,
          textAlign: 'center',
        }}
      >
        «{dua.arabicText}»
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
        <span style={{ fontWeight: 800, color: '#C2410C' }}>
          اردو ترجمہ:{' '}
        </span>
        {dua.urduTranslation}
      </div>

      {/* English Translation */}
      {dua.englishTranslation && (
        <div style={{ fontSize: 13.5, color: '#374151', marginBottom: 14, lineHeight: 1.6, padding: '10px 14px', backgroundColor: '#F8FAFC', borderRadius: 8, border: '1px solid #E2E8F0' }}>
          <strong style={{ color: '#C2410C' }}>{t('English Meaning: ', 'انگریزی ترجمہ: ', 'المعنى بالإنجليزية: ', 'English Meaning: ')}</strong>
          &ldquo;{dua.englishTranslation}&rdquo;
        </div>
      )}

      {/* Virtue */}
      <div
        style={{
          backgroundColor: '#ECFDF5',
          border: '1px solid #A7F3D0',
          padding: '10px 14px',
          borderRadius: 8,
          fontSize: 13,
          color: '#065F46',
          marginBottom: 16,
        }}
      >
        <strong>✨ {t('Virtue & Blessing: ', 'فضیلت و برکت: ', 'الفضل والبركة: ', 'Fazilat aur Barkat: ')}</strong> {dua.virtue}
      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <button
          onClick={onPlayDua}
          style={{
            backgroundColor: '#C2410C',
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
          }}
        >
          <span>🎧 {t('Listen to Masnoon Dua', 'مسنون دعا سنیں', 'استمع للدعاء المأثور', 'Masnoon Dua Sunein')}</span>
        </button>

        {onMakeCard && (
          <button
            onClick={onMakeCard}
            style={{
              backgroundColor: '#7C2D12',
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
              boxShadow: '0 2px 4px rgba(124, 45, 18, 0.2)',
            }}
          >
            <span>📸 {t('Create Dua Card', 'دعا کارڈ بنائیں', 'إنشاء بطاقة الدعاء', 'Dua Card Banayein')}</span>
          </button>
        )}

        <Link
          href="/tasbih"
          style={{
            textDecoration: 'none',
            backgroundColor: '#FFF7ED',
            color: '#C2410C',
            border: '1px solid #FED7AA',
            fontSize: 13,
            fontWeight: 700,
            padding: '8px 16px',
            borderRadius: 8,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span>📿 {t('Start Masnoon Tasbih Counter (33 / 100) →', 'مسنون تسبیح کاؤنٹر شروع کریں (۳۳ / ۱۰۰) ←', 'بدء عداد التسبيح المسنون (٣٣ / ١٠٠) ←', 'Masnoon Tasbih Counter Shuru Karein (33 / 100) →')}</span>
        </Link>
        <Link
          href="/library?work=CANON-DUA-001"
          style={{
            textDecoration: 'none',
            backgroundColor: '#F8FAFC',
            color: '#334155',
            fontSize: 13,
            fontWeight: 700,
            padding: '8px 16px',
            borderRadius: 8,
            border: '1px solid #CBD5E1',
          }}
        >
          {t('View All 40 Rabbana Duas', 'تمام ۴۰ ربّنا دعائیں دیکھیں', 'عرض جميع أدعية ربنا الأربعين', 'Tamam 40 Rabbana Duas Dekhein')}
        </Link>
      </div>
    </div>
  );
};
