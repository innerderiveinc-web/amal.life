import React from 'react';
import Link from 'next/link';
import { DailyKnowledgeBroadcast } from '@amal/amal-engine';

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
          {dua.sourceBook} • {dua.titleUrdu}
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
          {copied ? '✅ کاپی ہو گیا' : '📋 دعا کاپی کریں'}
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
        <span style={{ fontWeight: 800, color: '#C2410C' }}>اردو ترجمہ: </span>
        {dua.urduTranslation}
      </div>

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
        <strong>✨ فضیلت و برکت: </strong> {dua.virtue}
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
          <span>🎧 مسنون دعا سنیں (Listen to Dua)</span>
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
            <span>📸 دعا کارڈ بنائیں</span>
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
          <span>📿 مسنون تسبیح کاؤنٹر شروع کریں (33 / 100) →</span>
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
          تمام ۴۰ ربّنا دعائیں دیکھیں
        </Link>
      </div>
    </div>
  );
};
