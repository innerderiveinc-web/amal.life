import React from 'react';
import { HanafiCycleCalculationResult } from '../../lib/women-sanctuary-data';

export interface HanafiCycleCalculatorCardProps {
  isUrdu: boolean;
  calcTotalDays: number;
  calcHabitDays: number;
  calcResult: HanafiCycleCalculationResult;
  setCalcTotalDays: (days: number) => void;
  setCalcHabitDays: (days: number) => void;
}

export const HanafiCycleCalculatorCard: React.FC<HanafiCycleCalculatorCardProps> = ({
  isUrdu,
  calcTotalDays,
  calcHabitDays,
  calcResult,
  setCalcTotalDays,
  setCalcHabitDays,
}) => {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 24,
        border: '2px solid #065F46',
        boxShadow: '0 6px 16px rgba(6, 95, 70, 0.08)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <span style={{ fontSize: 24 }}>⚖️</span>
        <div>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#064E3B' }}>
            {isUrdu ? 'آلۂ احتسابِ حیض و استحاضہ (فقہ حنفی و بہارِ شریعت)' : 'Hanafi Cycle Fiqh Calculator & Decision Assistant'}
          </h3>
          <p style={{ margin: '2px 0 0', fontSize: 13, color: '#4B5563' }}>
            {isUrdu
              ? 'اپنے خون کے کل دن اور معمول کی عادت درج کر کے بہارِ شریعت کے مطابق نماز، غسل اور روزے کا قطعی حکم معلوم کریں۔'
              : 'Enter your total bleeding days and normal habit to calculate precise rulings on prayer exemption, Ghusl, and Qadha according to Bahar-e-Shari\'at.'}
          </p>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
          backgroundColor: '#F9FAFB',
          padding: 16,
          borderRadius: 12,
          marginBottom: 16,
          border: '1px solid #E5E7EB',
        }}
      >
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
            {isUrdu ? 'خون کے کل دن (Total Days):' : 'Total Bleeding Days:'}
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <input
              type="range"
              min="1"
              max="20"
              value={calcTotalDays}
              onChange={(e) => setCalcTotalDays(parseInt(e.target.value) || 1)}
              style={{ flex: 1, accentColor: '#065F46' }}
            />
            <span
              style={{
                minWidth: 44,
                padding: '4px 10px',
                backgroundColor: '#064E3B',
                color: '#FFFFFF',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 800,
                textAlign: 'center',
              }}
            >
              {calcTotalDays}
            </span>
          </div>
          <span style={{ fontSize: 11, color: '#6B7280' }}>
            {isUrdu ? 'کم سے کم ۳ دن، زیادہ سے زیادہ ۱۰ دن' : 'Hanafi range: 3 to 10 days'}
          </span>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
            {isUrdu ? 'معمول کی سابقہ عادت (Normal Habit):' : 'Your Normal Habit Days:'}
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <input
              type="range"
              min="3"
              max="10"
              value={calcHabitDays}
              onChange={(e) => setCalcHabitDays(parseInt(e.target.value) || 3)}
              style={{ flex: 1, accentColor: '#D97706' }}
            />
            <span
              style={{
                minWidth: 44,
                padding: '4px 10px',
                backgroundColor: '#D97706',
                color: '#FFFFFF',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 800,
                textAlign: 'center',
              }}
            >
              {calcHabitDays}
            </span>
          </div>
          <span style={{ fontSize: 11, color: '#6B7280' }}>
            {isUrdu ? 'اگر عادت معلوم نہیں تو عام عادت ۶ دن ہے' : 'Default standard habit: 6 days'}
          </span>
        </div>
      </div>

      {/* Calculation Verdict Result Card */}
      <div
        style={{
          backgroundColor:
            calcResult.status === 'VALID_HAIDH'
              ? '#ECFDF5'
              : calcResult.status === 'EXCESS_ISTIHADHA'
              ? '#FFFBEB'
              : '#FEF2F2',
          border: `1px solid ${
            calcResult.status === 'VALID_HAIDH'
              ? '#A7F3D0'
              : calcResult.status === 'EXCESS_ISTIHADHA'
              ? '#FDE68A'
              : '#FECACA'
          }`,
          borderRadius: 12,
          padding: 18,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
          <span
            style={{
              padding: '4px 10px',
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 800,
              backgroundColor:
                calcResult.status === 'VALID_HAIDH'
                  ? '#065F46'
                  : calcResult.status === 'EXCESS_ISTIHADHA'
                  ? '#B45309'
                  : '#991B1B',
              color: '#FFFFFF',
            }}
          >
            {calcResult.status === 'VALID_HAIDH'
              ? isUrdu ? '✓ حیضِ شرعی (Valid Haidh)' : 'Valid Haidh'
              : calcResult.status === 'EXCESS_ISTIHADHA'
              ? isUrdu ? '⚠️ عادت سے تجاوز (استحاضہ)' : 'Habit Exceeded (Istihadha)'
              : isUrdu ? '⚠️ ۳ دن سے کم (استحاضہ)' : 'Deficient Bleeding (Istihadha)'}
          </span>
          <span style={{ fontSize: 12, color: '#4B5563', fontWeight: 600 }}>
            {isUrdu ? 'ماخذ:' : 'Source:'} {calcResult.referenceText}
          </span>
        </div>

        <h4 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 800, color: '#1F2937' }}>
          {isUrdu ? calcResult.statusUrdu : calcResult.statusEnglish}
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10, margin: '12px 0' }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: 10, borderRadius: 8, border: '1px solid rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 11, color: '#6B7280', fontWeight: 700 }}>
              {isUrdu ? 'نماز کا شرعی حکم:' : 'Prayer Status:'}
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: calcResult.qadhaSalahRequired ? '#DC2626' : '#059669', marginTop: 2 }}>
              {isUrdu ? calcResult.prayerRulingsUrdu : calcResult.prayerRulingsEnglish}
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: 10, borderRadius: 8, border: '1px solid rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 11, color: '#6B7280', fontWeight: 700 }}>
              {isUrdu ? 'غسل کی شرعی ذمہ داری:' : 'Ghusl Obligation:'}
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937', marginTop: 2 }}>
              {isUrdu ? calcResult.ghuslObligationUrdu : calcResult.ghuslObligationEnglish}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 10, fontSize: 13, color: '#374151', lineHeight: 1.6 }}>
          <strong>{isUrdu ? 'فقہی احتیاطیں و ہدایات:' : 'Practical Directives:'}</strong>
          <ul style={{ margin: '4px 0 0', paddingInlineStart: 18 }}>
            {((isUrdu || !calcResult.spiritualPrescriptionEnglish)
              ? calcResult.spiritualPrescriptionUrdu
              : calcResult.spiritualPrescriptionEnglish
            ).map((presc, idx) => (
              <li key={idx}>{presc}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
