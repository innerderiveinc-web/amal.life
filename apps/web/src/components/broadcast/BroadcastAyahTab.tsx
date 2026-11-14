import React from 'react';
import Link from 'next/link';
import { DailyKnowledgeBroadcast } from '@amal/amal-engine';
import { useLanguage } from '../../context/LanguageContext';

export interface BroadcastAyahTabProps {
  ayah: DailyKnowledgeBroadcast['ayah'];
  copied: boolean;
  onCopy: (text: string) => void;
  onPlayAyah: () => void;
  onMakeCard?: () => void;
}

export const BroadcastAyahTab: React.FC<BroadcastAyahTabProps> = ({
  ayah,
  copied,
  onCopy,
  onPlayAyah,
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
            color: '#047857',
            backgroundColor: '#D1FAE5',
            padding: '4px 10px',
            borderRadius: 6,
          }}
        >
          {ayah.surahNameUrdu} ({ayah.surahNumber}:{ayah.ayahNumber}) • {ayah.spiritualTheme}
        </span>

        <button
          onClick={() => onCopy(`${ayah.arabicText}\n\n${ayah.kanzAlImanUrdu} [کنز الایمان]`)}
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
          fontSize: 24,
          lineHeight: 1.8,
          color: '#064E3B',
          backgroundColor: '#F0FDF4',
          padding: '16px 20px',
          borderRadius: 12,
          border: '1px solid #A7F3D0',
          marginBottom: 14,
          textAlign: 'center',
        }}
      >
        ﴿{ayah.arabicText}﴾
      </div>

      {/* Kanz al-Iman Urdu */}
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
        <span style={{ fontWeight: 800, color: '#047857' }}>
          ترجمہ کنز الایمان:{' '}
        </span>
        {ayah.kanzAlImanUrdu}
      </div>

      {/* English translation */}
      {ayah.englishTranslation && (
        <div style={{ fontSize: 13.5, color: '#374151', marginBottom: 16, lineHeight: 1.6, padding: '10px 14px', backgroundColor: '#F8FAFC', borderRadius: 8, border: '1px solid #E2E8F0' }}>
          <strong style={{ color: '#047857' }}>{t('English Meaning: ', 'انگریزی ترجمہ: ', 'المعنى بالإنجليزية: ', 'English Meaning: ')}</strong>
          &ldquo;{ayah.englishTranslation}&rdquo;
        </div>
      )}

      {/* Action Footer */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <button
          onClick={onPlayAyah}
          style={{
            backgroundColor: '#047857',
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
          <span>🎧 {t('Listen to Recitation', 'تلاوت سنیں', 'استمع للتلاوة', 'Tilawat Sunein')}</span>
        </button>

        {onMakeCard && (
          <button
            onClick={onMakeCard}
            style={{
              backgroundColor: '#064E3B',
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
              boxShadow: '0 2px 4px rgba(6, 78, 59, 0.2)',
            }}
          >
            <span>📸 {t('Create Social Card', 'سوشل میڈیا کارڈ بنائیں', 'إنشاء بطاقة', 'Social Media Card Banayein')}</span>
          </button>
        )}

        <Link
          href={`/library?surah=${ayah.surahNumber}`}
          style={{
            textDecoration: 'none',
            backgroundColor: '#F0FDF4',
            color: '#065F46',
            border: '1px solid #A7F3D0',
            fontSize: 13,
            fontWeight: 700,
            padding: '8px 16px',
            borderRadius: 8,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span>📖 {t(`Open Surah ${ayah.surahNameUrdu} in Reader →`, `مکمل سورۃ ${ayah.surahNameUrdu} قرآن ریڈر میں کھولیں →`, `فتح سورة ${ayah.surahNameUrdu} في المصحف ←`, `Surah ${ayah.surahNameUrdu} Reader me Kholein →`)}</span>
        </Link>
      </div>
    </div>
  );
};
