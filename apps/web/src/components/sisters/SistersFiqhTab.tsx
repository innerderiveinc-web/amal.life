import React, { useState, useMemo } from 'react';
import {
  AHKAM_NISWAN_GUIDE,
  FiqhRulingItem,
  calculateHanafiCycleStatus,
  HanafiCycleCalculationResult,
} from '../../lib/women-sanctuary-data';
import { HanafiCycleCalculatorCard } from './HanafiCycleCalculatorCard';
import { FiqhRulingCardList } from './FiqhRulingCardList';

export interface SistersFiqhTabProps {
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
      {/* Header Box & Category Filter */}
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

      {/* Interactive Hanafi Fiqh Cycle Calculator & Decision Assistant */}
      <HanafiCycleCalculatorCard
        isUrdu={isUrdu}
        calcTotalDays={calcTotalDays}
        calcHabitDays={calcHabitDays}
        calcResult={calcResult}
        setCalcTotalDays={setCalcTotalDays}
        setCalcHabitDays={setCalcHabitDays}
      />

      {/* Fiqh Ruling Cards List */}
      <FiqhRulingCardList
        isUrdu={isUrdu}
        filteredFiqh={filteredFiqh}
        onGenerateFiqhCard={onGenerateFiqhCard}
      />
    </div>
  );
}
