import React, { useState, useMemo } from 'react';
import {
  AHKAM_NISWAN_GUIDE,
  FiqhRulingItem,
  calculateHanafiCycleStatus,
  HanafiCycleCalculationResult,
} from '../../lib/women-sanctuary-data';
import { useLanguage } from '../../context/LanguageContext';
import { HanafiCycleCalculatorCard } from './HanafiCycleCalculatorCard';
import { FiqhRulingCardList } from './FiqhRulingCardList';

export interface SistersFiqhTabProps {
  isUrdu?: boolean;
  onGenerateFiqhCard: (ruling: FiqhRulingItem) => void;
}

export function SistersFiqhTab({
  onGenerateFiqhCard,
}: SistersFiqhTabProps) {
  const { isUrdu, isRomanUrdu, t } = useLanguage();
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
      const inTitleRoman = (item.titleRomanUrdu || '').toLowerCase().includes(q);
      const inRulingUrdu = (item.detailedRulingUrdu || item.summaryUrdu || '').includes(normQ) || (item.detailedRulingUrdu || item.summaryUrdu || '').includes(q);
      const inRulingEn = (item.detailedRulingEnglish || item.summaryEnglish || '').toLowerCase().includes(q);
      const inRulingRoman = (item.detailedRulingRomanUrdu || item.summaryRomanUrdu || '').toLowerCase().includes(q);
      const inSource = (item.hanafiReference || '').includes(normQ) || (item.hanafiReference || '').toLowerCase().includes(q);

      return inTitleUrdu || inTitleEn || inTitleRoman || inRulingUrdu || inRulingEn || inRulingRoman || inSource;
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
          {t(
            'Purity & Fiqh Guide for Women (Bahar-e-Shari\'at)',
            'احکامِ نسواں و طہارت (فقہ حنفی و بہارِ شریعت)',
            'أحكام الطهارة وفقه المرأة (الفقه الحنفي)',
            'Ahkam-e-Niswan wa Taharah (Bahar-e-Shari\'at)'
          )}
        </h2>
        <p style={{ margin: 0, fontSize: 14, color: '#4B5563' }}>
          {t(
            'Authentic Hanafi legal rulings on menstruation, postnatal bleeding, irregular bleeding, and modest prayer posture derived from Bahar-e-Shari\'at and Jannati Zewar.',
            'حیض، نفاس، استحاضہ، غسل، اور نماز کی ہیئت کے تفصیلی اور باحیا احکام، جو صدر الشریعہ مفتی امجد علی اعظمی کی "بہارِ شریعت" اور علامہ عبد المصطفیٰ اعظمی کی "جنتی زیور" سے ماخوذ ہیں۔',
            'أحكام فقهية معتمدة على المذهب الحنفي في الحيض والنفاس والاستحاضة وهيئة صلاة المرأة مستمدة من بهار شريعت وجنة الزيور.',
            'Haidh, nifas, istihadha, ghusl, aur namaz ki haiyat ke tafseeli aur ba-haya ahkam, jo Bahar-e-Shari\'at aur Jannati Zewar se makhooz hain.'
          )}
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
              placeholder={t(
                'Instant Search: e.g. miscarriage, yellow discharge, nail polish, braids ghusl, missed prayers...',
                'فوری مسئلہ تلاش فرمائیں: مثلاً اسقاطِ حمل، زرد رطوبت، ناخن پالش، چوٹی کا غسل، قضا نماز...',
                'بحث فوري في المسائل: مثل الإسقاط، الصفرة، طلاء الأظافر، الضفائر، القضاء...',
                'Fauri Masla Talash Karein: maslan isqat-e-hamal, zard ratoobat, nail polish, ghusl, qadha namaz...'
              )}
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
            {t('Urgent Topics:', 'فوری مسائل:', 'مسائل عاجلة:', 'Fauri Masail:')}
          </span>
          {[
            { label: t('🩸 10-Day Limit', '🩸 ۱۰ دن کی حد', '🩸 حد الـ ١٠ أيام', '🩸 10 Din ki Hadd'), q: 'دس دن' },
            { label: t('🤍 Yellow Discharge', '🤍 زرد و گدلا پانی', '🤍 الصفرة والكدرة', '🤍 Zard Ratoobat'), q: 'زرد' },
            { label: t('🚿 Braids & Ghusl', '🚿 چوٹی اور غسل', '🚿 الضفائر والغسل', '🚿 Choti aur Ghusl'), q: 'چوٹی' },
            { label: t('💅 Nail Polish / Wudu', '💅 ناخن پالش', '💅 طلاء الأظافر والوضوء', '💅 Nail Polish / Wuzu'), q: 'ناخن پالش' },
            { label: t('🕊️ Miscarriage', '🕊️ اسقاطِ حمل', '🕊️ إسقاط الحمل والنفاس', '🕊️ Isqat-e-Hamal'), q: 'اسقاط' },
            { label: t('🍼 Nursing & Fasting', '🍼 دودھ پلانا و روزہ', '🍼 الرضاع والصيام', '🍼 Doodh Pilana wa Roza'), q: 'دودھ' },
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
              {chip.label}
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
              {t('Clear Filter ✕', 'فلٹر ختم کریں ✕', 'مسح التصفية ✕', 'Filter Khatam Karein ✕')}
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
          {[
            { id: 'all', label: t('All Rulings', 'تمام احکام', 'جميع الأحكام', 'Tamam Ahkam') },
            { id: 'haidh', label: t('Menses (Haidh)', 'حیض کے احکام', 'أحكام الحيض', 'Haidh ke Ahkam') },
            { id: 'nifas', label: t('Postnatal (Nifas)', 'نفاس (ولادت کے بعد)', 'أحكام النفاس', 'Nifas ke Ahkam') },
            { id: 'istihadha', label: t('Istihadha (Illness)', 'استحاضہ (بیماری کا خون)', 'أحكام الاستحاضة', 'Istihadha ke Ahkam') },
            { id: 'namaz_posture', label: t('Prayer Modesty', 'نماز میں حیا و طریقہ', 'هيئة صلاة المرأة', 'Namaz mein Haya wa Tareeqah') },
            { id: 'spiritual_rhythm', label: t('Spiritual Routine', 'مخصوص ایام میں عبادات', 'الأوراد في العذر', 'Makhsoos Ayyam mein Ibadat') },
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
              {fCat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Hanafi Fiqh Cycle Calculator & Decision Assistant */}
      <HanafiCycleCalculatorCard
        calcTotalDays={calcTotalDays}
        calcHabitDays={calcHabitDays}
        calcResult={calcResult}
        setCalcTotalDays={setCalcTotalDays}
        setCalcHabitDays={setCalcHabitDays}
      />

      {/* Fiqh Ruling Cards List */}
      <FiqhRulingCardList
        filteredFiqh={filteredFiqh}
        onGenerateFiqhCard={onGenerateFiqhCard}
      />
    </div>
  );
}
