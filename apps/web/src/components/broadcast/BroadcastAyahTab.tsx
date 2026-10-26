import React from 'react';
import Link from 'next/link';
import { DailyKnowledgeBroadcast } from '@amal/amal-engine';

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
          {copied ? '✅ کاپی ہو گیا' : '📋 متن کاپی کریں'}
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
        <span style={{ fontWeight: 800, color: '#047857' }}>ترجمہ کنز الایمان: </span>
        {ayah.kanzAlImanUrdu}
      </div>

      {/* English translation */}
      <div style={{ fontSize: 13, color: '#4B5563', fontStyle: 'italic', marginBottom: 16 }}>
        &ldquo;{ayah.englishTranslation}&rdquo;
      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <button
          onClick={onPlayAyah}
          style={{
            backgroundColor: '#059669',
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
          <span>🎧 تلاوت سنیں (Listen to Recitation)</span>
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
            <span>📸 سوشل میڈیا کارڈ بنائیں</span>
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
          <span>📖 مکمل سورۃ {ayah.surahNameUrdu} قرآن ریڈر میں کھولیں →</span>
        </Link>
      </div>
    </div>
  );
};
