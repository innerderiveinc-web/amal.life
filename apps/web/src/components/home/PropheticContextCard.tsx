import React from 'react';
import { PropheticContextResult } from '@amal/amal-engine';

export interface PropheticContextCardProps {
  struggleQuery: string;
  setStruggleQuery: (q: string) => void;
  propheticContext: PropheticContextResult | null;
  onSearchPropheticContext: (overrideQuery?: string) => void;
}

export const PropheticContextCard: React.FC<PropheticContextCardProps> = ({
  struggleQuery,
  setStruggleQuery,
  propheticContext,
  onSearchPropheticContext,
}) => {
  return (
    <div
      className="amal-card-hover"
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 26,
        border: '1px solid #E2E8F0',
        marginBottom: 24,
        boxShadow: '0 4px 16px -2px rgba(0, 0, 0, 0.04)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 12,
            backgroundColor: '#E0F2FE',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
            color: '#0284C7',
            flexShrink: 0,
          }}
        >
          🕊️
        </div>
        <div>
          <h2 style={{ fontSize: 19, fontWeight: 800, color: '#0F172A', margin: 0 }}>
            سیرتِ مبارکہ سے عملی تسکین و رہنمائی · Prophetic Life Guidance
          </h2>
          <p style={{ color: '#64748B', fontSize: 13, margin: '2px 0 0' }}>
            اپنی روزمرہ کشمکش یا پریشانی بیان کریں — سیرت النبی ﷺ سے تاریخی مماثلت اور نبوی حکمت دریافت کیجیے۔
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, marginTop: 16, marginBottom: 14 }}>
        <input
          type="text"
          value={struggleQuery}
          onChange={(e) => setStruggleQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSearchPropheticContext();
          }}
          placeholder="مثلاً: دفتر یا خاندان میں ناانصافی، غم و تکلیف، یا مایوسی کا احساس..."
          aria-label="Describe life challenge or struggle"
          style={{
            flex: 1,
            padding: '13px 16px',
            borderRadius: 10,
            border: '1.5px solid #CBD5E1',
            fontSize: 14,
            outline: 'none',
            color: '#0F172A',
            backgroundColor: '#F8FAFC',
            transition: 'border-color 0.2s ease',
          }}
        />
        <button
          onClick={() => onSearchPropheticContext()}
          aria-label="Search Prophetic Life Parallel"
          style={{
            padding: '13px 24px',
            borderRadius: 10,
            backgroundColor: '#064E3B',
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: 13,
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(6, 78, 59, 0.25)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span>سیرت سے مماثلت تلاش کریں ➔</span>
        </button>
      </div>

      {/* Suggestion Chips */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', alignSelf: 'center', marginRight: 4 }}>
          عام انسانی آزمائشیں:
        </span>
        <button
          onClick={() =>
            onSearchPropheticContext(
              'Office mein mujhe unfair treatment mila aur mere kaam ka credit kisi aur ko de diya gaya.'
            )
          }
          style={{
            fontSize: 12,
            padding: '5px 12px',
            borderRadius: 20,
            border: '1px solid #E2E8F0',
            backgroundColor: '#F8FAFC',
            color: '#334155',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          💼 محنت کا کریڈٹ چھن جانا یا ناانصافی
        </button>
        <button
          onClick={() =>
            onSearchPropheticContext('Kisi qareebi aziz ki wafat par shadeed gham aur sabr ka imtihan.')
          }
          style={{
            fontSize: 12,
            padding: '5px 12px',
            borderRadius: 20,
            border: '1px solid #E2E8F0',
            backgroundColor: '#F8FAFC',
            color: '#334155',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          💔 عزیز کے انتقال پر صدمہ و غم (تعزیت)
        </button>
      </div>

      {propheticContext && (
        <div
          style={{
            marginTop: 16,
            padding: 18,
            borderRadius: 10,
            backgroundColor: '#F0FDF4',
            border: '1px solid #86EFAC',
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 800, color: '#166534', letterSpacing: 0.5 }}>
            AUTHENTIC PROPHETIC PARALLEL ({propheticContext.historicalParallel.yearHijriOrGregorian})
          </div>
          <h3 style={{ fontSize: 17, fontWeight: 800, color: '#111827', margin: '6px 0 4px' }}>
            {propheticContext.historicalParallel.eventTitle}
          </h3>
          <p style={{ fontSize: 13, color: '#374151', margin: '4px 0 8px', lineHeight: 1.5 }}>
            {propheticContext.historicalParallel.whatActuallyHappened}
          </p>
          <div style={{ fontSize: 12, color: '#047857', fontWeight: 600, marginBottom: 10 }}>
            Prophetic Reaction: {propheticContext.historicalParallel.propheticReaction}
          </div>

          {/* Guardrail Disclaimer */}
          <div
            style={{
              backgroundColor: '#FEF3C7',
              padding: 8,
              borderRadius: 6,
              fontSize: 11,
              color: '#92400E',
              fontWeight: 600,
              marginBottom: 10,
            }}
          >
            {propheticContext.theologicalGuardrailDisclaimer}
          </div>

          {/* Character Principle & Amal */}
          <div style={{ fontSize: 13, color: '#14532D' }}>
            <strong>Character Principle:</strong> {propheticContext.characterPrinciple.virtueName} —{' '}
            {propheticContext.characterPrinciple.practicalTakeaway}
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: '#166534', fontWeight: 700 }}>
            Suggested Action: {propheticContext.optionalAmalAction}
          </div>
        </div>
      )}
    </div>
  );
};
