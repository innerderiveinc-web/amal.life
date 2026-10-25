import React from 'react';
import { DailyMamool } from '@amal/amal-engine';

export interface MamoolThreeEssentialsGridProps {
  isUrdu: boolean;
  mamool: DailyMamool;
  microAmalDone: boolean;
  onToggleMicroAmal: () => void;
  onPlayDua: () => void;
}

export const MamoolThreeEssentialsGrid: React.FC<MamoolThreeEssentialsGridProps> = ({
  isUrdu,
  mamool,
  microAmalDone,
  onToggleMicroAmal,
  onPlayDua,
}) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 16,
        marginTop: 18,
      }}
    >
      {/* 1. Waqt Ka Masnoon Amal */}
      <div
        className="amal-card-hover"
        style={{
          backgroundColor: '#F8FAFC',
          borderRadius: 14,
          padding: '16px 18px',
          border: '1px solid #E2E8F0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
            <span style={{ fontSize: 16 }}>📖</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#0284C7', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              {isUrdu ? 'مسنون عمل' : 'Sunnah of the Hour'}
            </span>
          </div>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', marginBottom: 6, lineHeight: 1.4 }}>
            {isUrdu ? mamool.masnoonAmal.titleUrdu : mamool.masnoonAmal.titleEnglish || mamool.masnoonAmal.titleUrdu}
          </div>
          <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.6 }}>
            {isUrdu ? mamool.masnoonAmal.descriptionUrdu : mamool.masnoonAmal.descriptionEnglish || mamool.masnoonAmal.descriptionUrdu}
          </div>
        </div>
        <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 12, paddingTop: 8, borderTop: '1px solid #EDF2F7', fontWeight: 600 }}>
          {isUrdu ? `سند: ${mamool.masnoonAmal.primarySource}` : `Source: ${mamool.masnoonAmal.primarySource}`}
        </div>
      </div>

      {/* 2. 1-Minute Micro-Amal */}
      <div
        className="amal-card-hover"
        style={{
          backgroundColor: microAmalDone ? '#F0FDF4' : '#F8FAFC',
          borderRadius: 14,
          padding: '16px 18px',
          border: microAmalDone ? '1px solid #86EFAC' : '1px solid #E2E8F0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'all 0.25s ease',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ fontSize: 16 }}>🌱</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#16A34A', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                {isUrdu ? '۱ منٹ کا عمل' : '1-Minute Micro-Amal'}
              </span>
            </div>
            <button
              onClick={onToggleMicroAmal}
              style={{
                backgroundColor: microAmalDone ? '#16A34A' : '#E2E8F0',
                color: microAmalDone ? '#FFFFFF' : '#334155',
                border: 'none',
                borderRadius: 20,
                padding: '4px 12px',
                fontSize: 11,
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: microAmalDone ? '0 2px 5px rgba(22, 163, 74, 0.3)' : 'none',
              }}
            >
              {microAmalDone
                ? isUrdu ? '✓ مکمل ہوا' : '✓ Completed'
                : isUrdu ? 'مکمل کریں' : 'Mark Done'}
            </button>
          </div>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', marginBottom: 6, lineHeight: 1.4 }}>
            {isUrdu ? mamool.microAmalOfTheDay.titleUrdu : mamool.microAmalOfTheDay.titleEnglish || mamool.microAmalOfTheDay.titleUrdu}
          </div>
          <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.6 }}>
            {isUrdu ? mamool.microAmalOfTheDay.actionUrdu : mamool.microAmalOfTheDay.actionEnglish || mamool.microAmalOfTheDay.actionUrdu}
          </div>
        </div>
        <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 12, paddingTop: 8, borderTop: '1px solid #EDF2F7', fontWeight: 600 }}>
          {isUrdu ? `اجر: ${mamool.microAmalOfTheDay.hadithProof}` : `Reward: ${mamool.microAmalOfTheDay.hadithProof}`}
        </div>
      </div>

      {/* 3. 1-Tap Masnoon Audio Du'a */}
      <div
        className="amal-card-hover"
        style={{
          backgroundColor: '#F8FAFC',
          borderRadius: 14,
          padding: '16px 18px',
          border: '1px solid #E2E8F0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
            <span style={{ fontSize: 16 }}>🤲</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              {isUrdu ? 'مسنون دعا' : 'Daily Invocation'}
            </span>
          </div>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>
            {isUrdu ? mamool.featuredDua.titleUrdu : mamool.featuredDua.titleEnglish || mamool.featuredDua.titleUrdu}
          </div>
          <div
            className="font-arabic"
            style={{
              fontSize: 14,
              color: '#064E3B',
              marginBottom: 8,
              backgroundColor: '#F1F5F9',
              padding: '8px 12px',
              borderRadius: 8,
              border: '1px solid #E2E8F0',
              lineHeight: 1.8,
            }}
          >
            {mamool.featuredDua.arabicText.slice(0, 70)}...
          </div>
        </div>

        <button
          onClick={onPlayDua}
          style={{
            backgroundColor: '#064E3B',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 10,
            padding: '9px 14px',
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            boxShadow: '0 2px 6px rgba(6, 78, 59, 0.2)',
          }}
        >
          <span>▶</span>
          <span>{isUrdu ? 'دعا کی تلاوت سنیں' : 'Listen to Recitation'}</span>
        </button>
      </div>
    </div>
  );
};
