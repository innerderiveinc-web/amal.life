import React from 'react';
import Link from 'next/link';
import { DailyKnowledgeBroadcast } from '@amal/amal-engine';

export interface BroadcastHadithTabProps {
  hadith: DailyKnowledgeBroadcast['hadith'];
  copied: boolean;
  onCopy: (text: string) => void;
}

export const BroadcastHadithTab: React.FC<BroadcastHadithTabProps> = ({
  hadith,
  copied,
  onCopy,
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
            color: '#1E40AF',
            backgroundColor: '#DBEAFE',
            padding: '4px 10px',
            borderRadius: 6,
          }}
        >
          {hadith.sourceBook} • راوی: {hadith.narrator}
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
          {copied ? '✅ کاپی ہو گیا' : '📋 متن کاپی کریں'}
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
        <span style={{ fontWeight: 800, color: '#1E40AF' }}>اردو مفہوم: </span>
        {hadith.urduTranslation}
      </div>

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
        <strong>🎯 روزمرہ سنت پر عمل: </strong> {hadith.sunnahApplication}
      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
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
          <span>📜 اربعین نووی کے تمام ۴۲ اسباق لائبریری میں پڑھیں →</span>
        </Link>
      </div>
    </div>
  );
};
