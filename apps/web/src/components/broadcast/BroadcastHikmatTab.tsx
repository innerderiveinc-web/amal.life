import React from 'react';
import Link from 'next/link';
import { DailyKnowledgeBroadcast } from '@amal/amal-engine';

export interface BroadcastHikmatTabProps {
  hikmat: DailyKnowledgeBroadcast['hikmat'];
  copied: boolean;
  onCopy: (text: string) => void;
  onMakeCard?: () => void;
}

export const BroadcastHikmatTab: React.FC<BroadcastHikmatTabProps> = ({
  hikmat,
  copied,
  onCopy,
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
            color: '#5B21B6',
            backgroundColor: '#EDE9FE',
            padding: '4px 10px',
            borderRadius: 6,
          }}
        >
          {hikmat.sourceBook} • {hikmat.author}
        </span>

        <button
          onClick={() => onCopy(`${hikmat.urduWisdom}\n\nعمل: ${hikmat.practicalReflection}`)}
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
          {copied ? '✅ کاپی ہو گیا' : '📋 نصیحت کاپی کریں'}
        </button>
      </div>

      {/* Arabic quote if available */}
      {hikmat.quoteArabic && (
        <div
          dir="rtl"
          style={{
            fontFamily: "'Amiri', 'Traditional Arabic', serif",
            fontSize: 20,
            lineHeight: 1.8,
            color: '#4C1D95',
            backgroundColor: '#F5F3FF',
            padding: '14px 18px',
            borderRadius: 12,
            border: '1px solid #DDD6FE',
            marginBottom: 14,
            textAlign: 'center',
          }}
        >
          «{hikmat.quoteArabic}»
        </div>
      )}

      {/* Urdu Wisdom */}
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
        <span style={{ fontWeight: 800, color: '#6D28D9' }}>بصیرت و نصیحت: </span>
        {hikmat.urduWisdom}
      </div>

      {/* Practical Reflection */}
      <div
        style={{
          backgroundColor: '#F3E8FF',
          border: '1px solid #E9D5FF',
          padding: '10px 14px',
          borderRadius: 8,
          fontSize: 13,
          color: '#581C87',
          marginBottom: 16,
        }}
      >
        <strong>🌱 آج کا عملی محاسبہ: </strong> {hikmat.practicalReflection}
      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        {onMakeCard && (
          <button
            onClick={onMakeCard}
            style={{
              backgroundColor: '#5B21B6',
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
              boxShadow: '0 2px 4px rgba(91, 33, 182, 0.2)',
            }}
          >
            <span>📸 حکمت کارڈ بنائیں</span>
          </button>
        )}

        <Link
          href="/vault"
          style={{
            textDecoration: 'none',
            backgroundColor: '#5B21B6',
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
          <span>💎 نالج والٹ میں محفوظ کریں →</span>
        </Link>
        <Link
          href="/reflections"
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
          شام کا محاسبہ و توبہ
        </Link>
      </div>
    </div>
  );
};
