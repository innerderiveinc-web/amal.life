import React, { useState, useMemo } from 'react';
import {
  AHKAM_NISWAN_GUIDE,
  FiqhRulingItem,
  calculateHanafiCycleStatus,
  HanafiCycleCalculationResult,
} from '../../lib/women-sanctuary-data';

interface SistersFiqhTabProps {
  isUrdu: boolean;
  onGenerateFiqhCard: (ruling: FiqhRulingItem) => void;
}

export function SistersFiqhTab({
  isUrdu,
  onGenerateFiqhCard,
}: SistersFiqhTabProps) {
  const [selectedFiqhCategory, setSelectedFiqhCategory] = useState<string>('all');
  const [calcTotalDays, setCalcTotalDays] = useState<number>(6);
  const [calcHabitDays, setCalcHabitDays] = useState<number>(6);

  const calcResult: HanafiCycleCalculationResult = useMemo(() => {
    return calculateHanafiCycleStatus(calcTotalDays, calcHabitDays);
  }, [calcTotalDays, calcHabitDays]);

  const filteredFiqh = useMemo(() => {
    if (selectedFiqhCategory === 'all') return AHKAM_NISWAN_GUIDE;
    return AHKAM_NISWAN_GUIDE.filter((item) => item.category === selectedFiqhCategory);
  }, [selectedFiqhCategory]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header Box */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 14,
          padding: 20,
          border: '1px solid #E5E7EB',
        }}
      >
        <h2
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: '#064E3B',
            margin: '0 0 6px 0',
          }}
        >
          {isUrdu ? 'احکامِ نسواں و طہارت (فقہ حنفی و بہارِ شریعت)' : 'Purity & Fiqh Guide for Women'}
        </h2>
        <p style={{ margin: 0, fontSize: 14, color: '#4B5563' }}>
          {isUrdu
            ? 'حیض، نفاس، استحاضہ، غسل، اور نماز کی ہیئت کے تفصیلی اور باحیا احکام، جو صدر الشریعہ مفتی امجد علی اعظمی کی "بہارِ شریعت" اور علامہ عبد المصطفیٰ اعظمی کی "جنتی زیور" سے ماخوذ ہیں۔'
            : 'Authentic Hanafi legal rulings on menstruation, postnatal bleeding, irregular bleeding, and modest prayer posture.'}
        </p>

        {/* Filter Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
          {[
            { id: 'all', labelUrdu: 'تمام احکام', labelEn: 'All Rulings' },
            { id: 'haidh', labelUrdu: 'حیض کے احکام', labelEn: 'Menses (Haidh)' },
            { id: 'nifas', labelUrdu: 'نفاس (ولادت کے بعد)', labelEn: 'Postnatal (Nifas)' },
            { id: 'istihadha', labelUrdu: 'استحاضہ (بیماری کا خون)', labelEn: 'Istihadha (Illness)' },
            { id: 'namaz_posture', labelUrdu: 'نماز میں حیا و طریقہ', labelEn: 'Prayer Modesty' },
            { id: 'spiritual_rhythm', labelUrdu: 'مخصوص ایام میں عبادات', labelEn: 'Spiritual Routine' },
          ].map((fCat) => (
            <button
              key={fCat.id}
              onClick={() => setSelectedFiqhCategory(fCat.id)}
              style={{
                padding: '6px 12px',
                borderRadius: 20,
                border:
                  selectedFiqhCategory === fCat.id
                    ? '1px solid #064E3B'
                    : '1px solid #E5E7EB',
                backgroundColor:
                  selectedFiqhCategory === fCat.id ? '#064E3B' : '#F9FAFB',
                color: selectedFiqhCategory === fCat.id ? '#FFFFFF' : '#374151',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {isUrdu ? fCat.labelUrdu : fCat.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* INTERACTIVE HANAFI FIQH CYCLE CALCULATOR & DECISION ASSISTANT */}
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

      {/* Fiqh Ruling Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {filteredFiqh.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 14,
              padding: 20,
              border: '1px solid #E5E7EB',
              boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 8,
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: 18,
                  fontWeight: 800,
                  color: '#064E3B',
                }}
              >
                {isUrdu ? item.titleUrdu : item.titleEnglish}
              </h3>
              <span
                style={{
                  backgroundColor: '#ECFDF5',
                  color: '#065F46',
                  padding: '3px 8px',
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                {item.hanafiReference}
              </span>
            </div>
            <div
              style={{
                fontSize: 12,
                color: '#059669',
                fontWeight: 600,
                marginBottom: 6,
              }}
            >
              {isUrdu ? item.titleEnglish : item.titleUrdu}
            </div>

            <p
              style={{
                fontSize: 14,
                color: '#1F2937',
                fontWeight: 600,
                lineHeight: 1.6,
                marginBottom: 10,
              }}
            >
              {isUrdu ? item.summaryUrdu : item.summaryEnglish}
            </p>

            <p
              style={{
                fontSize: 14,
                color: '#4B5563',
                lineHeight: 1.7,
                marginBottom: 14,
              }}
            >
              {isUrdu ? item.detailedRulingUrdu : (item.detailedRulingEnglish || item.detailedRulingUrdu)}
            </p>

            <div
              style={{
                backgroundColor: '#F9FAFB',
                padding: 12,
                borderRadius: 10,
                border: '1px solid #F3F4F6',
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#064E3B',
                  marginBottom: 4,
                }}
              >
                {isUrdu ? 'عملی ہدایات و فقہی احتیاطیں:' : 'Practical Guidelines:'}
              </div>
              <ul
                style={{
                  margin: 0,
                  paddingInlineStart: 18,
                  fontSize: 13,
                  color: '#374151',
                  lineHeight: 1.6,
                }}
              >
                {((isUrdu || !item.practicalGuidelinesEnglish)
                  ? item.practicalGuidelines
                  : item.practicalGuidelinesEnglish
                ).map((g, idx) => (
                  <li key={idx}>{g}</li>
                ))}
              </ul>
            </div>

            <div
              style={{
                marginTop: 12,
                display: 'flex',
                justifyContent: 'flex-end',
                borderTop: '1px solid #F3F4F6',
                paddingTop: 10,
              }}
            >
              <button
                onClick={() => onGenerateFiqhCard(item)}
                style={{
                  backgroundColor: '#ECFDF5',
                  color: '#065F46',
                  border: '1px solid #A7F3D0',
                  padding: '5px 12px',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span>🎨</span>
                <span>{isUrdu ? 'فقہی کارڈ بنائیں' : 'Generate Fiqh Card'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
