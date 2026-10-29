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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [calcTotalDays, setCalcTotalDays] = useState<number>(6);
  const [calcHabitDays, setCalcHabitDays] = useState<number>(6);

  const calcResult: HanafiCycleCalculationResult = useMemo(() => {
    return calculateHanafiCycleStatus(calcTotalDays, calcHabitDays);
  }, [calcTotalDays, calcHabitDays]);

  const filteredFiqh = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return AHKAM_NISWAN_GUIDE.filter((item) => {
      const matchesCategory = selectedFiqhCategory === 'all' || item.category === selectedFiqhCategory;
      if (!matchesCategory) return false;
      if (!q) return true;

      const normQ = q.replace(/[\u064B-\u065F\u0670]/g, '').trim();
      const inTitleUrdu = (item.titleUrdu || '').includes(normQ) || (item.titleUrdu || '').includes(q);
      const inTitleEn = (item.titleEnglish || '').toLowerCase().includes(q);
      const inRulingUrdu = (item.detailedRulingUrdu || item.summaryUrdu || '').includes(normQ) || (item.detailedRulingUrdu || item.summaryUrdu || '').includes(q);
      const inRulingEn = (item.detailedRulingEnglish || item.summaryEnglish || '').toLowerCase().includes(q);
      const inSource = (item.hanafiReference || '').includes(normQ) || (item.hanafiReference || '').toLowerCase().includes(q);

      return inTitleUrdu || inTitleEn || inRulingUrdu || inRulingEn || inSource;
    });
  }, [selectedFiqhCategory, searchQuery]);

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

        {/* Instant Search Bar for Urgent Fiqh Dilemmas */}
        <div style={{ marginTop: 14, display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <span style={{ position: 'absolute', left: isUrdu ? undefined : 12, right: isUrdu ? 12 : undefined, top: '50%', transform: 'translateY(-50%)', fontSize: 16 }}>
              🔍
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isUrdu ? 'فوری مسئلہ تلاش فرمائیں: مثلاً اسقاطِ حمل، زرد رطوبت، ناخن پالش، چوٹی کا غسل، قضا نماز...' : 'Instant Search: e.g. miscarriage, yellow discharge, nail polish, braids ghusl, missed prayers...'}
              style={{
                width: '100%',
                padding: isUrdu ? '10px 38px 10px 14px' : '10px 14px 10px 38px',
                borderRadius: 10,
                border: '1.5px solid #CBD5E1',
                fontSize: 13.5,
                fontWeight: 600,
                color: '#0F172A',
                backgroundColor: '#F8FAFC',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: isUrdu ? undefined : 12,
                  left: isUrdu ? 12 : undefined,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#94A3B8',
                  cursor: 'pointer',
                  fontWeight: 800,
                  fontSize: 14,
                }}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* 1-Tap Urgent Question Quick Chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B' }}>
            {isUrdu ? 'فوری مسائل:' : 'Urgent Topics:'}
          </span>
          {[
            { labelUrdu: '🩸 ۱۰ دن کی حد', labelEn: '🩸 10-Day Limit', q: 'دس دن' },
            { labelUrdu: '🤍 زرد و گدلا پانی', labelEn: '🤍 Yellow Discharge', q: 'زرد' },
            { labelUrdu: '🚿 چوٹی اور غسل', labelEn: '🚿 Braids & Ghusl', q: 'چوٹی' },
            { labelUrdu: '💅 ناخن پالش', labelEn: '💅 Nail Polish / Wudu', q: 'ناخن پالش' },
            { labelUrdu: '🕊️ اسقاطِ حمل', labelEn: '🕊️ Miscarriage', q: 'اسقاط' },
            { labelUrdu: '🍼 دودھ پلانا و روزہ', labelEn: '🍼 Nursing & Fasting', q: 'دودھ' },
          ].map((chip) => (
            <button
              key={chip.q}
              onClick={() => {
                setSelectedFiqhCategory('all');
                setSearchQuery(chip.q);
              }}
              style={{
                fontSize: 11,
                fontWeight: 700,
                padding: '3px 9px',
                borderRadius: 14,
                border: searchQuery === chip.q ? '1px solid #065F46' : '1px solid #E2E8F0',
                backgroundColor: searchQuery === chip.q ? '#DCFCE7' : '#F1F5F9',
                color: searchQuery === chip.q ? '#065F46' : '#475569',
                cursor: 'pointer',
              }}
            >
              {isUrdu ? chip.labelUrdu : chip.labelEn}
            </button>
          ))}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                fontSize: 11,
                color: '#DC2626',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 700,
                padding: '2px 6px',
              }}
            >
              {isUrdu ? 'فلٹر ختم کریں ✕' : 'Clear Filter ✕'}
            </button>
          )}
        </div>

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
