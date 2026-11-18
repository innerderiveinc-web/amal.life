import React from 'react';
import { showAmalToast } from '../Toast';
import { useLanguage } from '../../context/LanguageContext';

export interface ZakatGoldSilverNisabCardProps {
  currency: string;
  setCurrency: (c: string) => void;
  goldPrice: number;
  setGoldPrice: (p: number) => void;
  silverPrice: number;
  setSilverPrice: (p: number) => void;
  nisabStandard: 'SILVER' | 'GOLD';
  setNisabStandard: (s: 'SILVER' | 'GOLD') => void;
  cash: number;
  setCash: (c: number) => void;
  goldGrams: number;
  setGoldGrams: (g: number) => void;
  silverGrams: number;
  setSilverGrams: (g: number) => void;
  jewelryTolas: number;
  setJewelryTolas: (t: number) => void;
  jewelryGrams: number;
  setJewelryGrams: (g: number) => void;
  jewelryKarat: number;
  setJewelryKarat: (k: number) => void;
  isUrdu?: boolean;
}

export const REGIONAL_BULLION_PRESETS: Record<string, { gold: number; silver: number }> = {
  INR: { gold: 7600, silver: 95 },
  PKR: { gold: 24500, silver: 295 },
  SAR: { gold: 310, silver: 3.9 },
  AED: { gold: 305, silver: 3.8 },
  USD: { gold: 85, silver: 1.05 },
  GBP: { gold: 65, silver: 0.82 },
};

export const ZakatGoldSilverNisabCard: React.FC<ZakatGoldSilverNisabCardProps> = ({
  currency,
  setCurrency,
  goldPrice,
  setGoldPrice,
  silverPrice,
  setSilverPrice,
  nisabStandard,
  setNisabStandard,
  cash,
  setCash,
  goldGrams,
  setGoldGrams,
  silverGrams,
  setSilverGrams,
  jewelryTolas,
  setJewelryTolas,
  jewelryGrams,
  setJewelryGrams,
  jewelryKarat,
  setJewelryKarat,
}) => {
  const { t } = useLanguage();

  const handleCurrencyChange = (newCurr: string) => {
    setCurrency(newCurr);
    const preset = REGIONAL_BULLION_PRESETS[newCurr];
    if (preset) {
      setGoldPrice(preset.gold);
      setSilverPrice(preset.silver);
      showAmalToast(`${newCurr} gold & silver rates applied · نصاب کے نرخ بحال ہو گئے`, 'info');
    }
  };

  return (
    <>
      <div className="calc-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>
            {t('Currency', 'کرنسی', 'العملة', 'Currency')}
          </label>
          <select
            value={currency}
            onChange={(e) => handleCurrencyChange(e.target.value)}
            style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB' }}
          >
            <option value="INR">{t('INR (Indian Rupee ₹)', 'بھارتی روپیہ (INR ₹)', 'الروبية الهندية (INR ₹)', 'Indian Rupee (INR ₹)')}</option>
            <option value="USD">{t('USD (US Dollar $)', 'امریکی ڈالر (USD $)', 'الدولار الأمريكي (USD $)', 'US Dollar (USD $)')}</option>
            <option value="SAR">{t('SAR (Saudi Riyal)', 'سعودی ریال (SAR)', 'الريال السعودي (SAR)', 'Saudi Riyal (SAR)')}</option>
            <option value="AED">{t('AED (UAE Dirham)', 'اماراتی درہم (AED)', 'الدرهم الإماراتي (AED)', 'UAE Dirham (AED)')}</option>
            <option value="GBP">{t('GBP (British Pound £)', 'برطانوی پاؤنڈ (GBP £)', 'الجنيه الإسترليني (GBP £)', 'British Pound (GBP £)')}</option>
            <option value="PKR">{t('PKR (Pakistani Rupee)', 'پاکستانی روپیہ (PKR)', 'الروبية الباكستانية (PKR)', 'Pakistani Rupee (PKR)')}</option>
          </select>
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563' }}>
              {t('Nisab Standard', 'معیارِ نصاب', 'معيار النصاب', 'Meyar-e-Nisab')}
            </label>
            <span
              title={t(
                'Nisab is the minimum qualifying wealth threshold held for one lunar year. Hanafi scholars favor Silver Nisab to maximize benefit for the poor.',
                'نصاب: زکوٰۃ فرض ہونے کی کم از کم شرعی حد۔ فقہ حنفی میں چاندی کا نصاب راجح ہے تاکہ فقراء کو نفع پہنچے۔',
                'النصاب هو الحد الأدنى لوجوب الزكاة بعد حولان الحول. ورجح الحنفية نصاب الفضة نفعاً للفقراء.',
                'Nisab: Zakat wajib hone ki kam az kam hadd. Fiqh Hanafi mein Chandi ka nisab rajih hai taake fuqara ko faida ho.'
              )}
              style={{ fontSize: 11, color: '#047857', cursor: 'help', fontWeight: 600 }}
            >
              ℹ️ {t('What is Nisab?', 'نصاب کیا ہے؟', 'ما هو النصاب؟', 'Nisab kya hai?')}
            </span>
          </div>
          <select
            value={nisabStandard}
            onChange={(e) => setNisabStandard(e.target.value as ('SILVER' | 'GOLD'))}
            style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB' }}
          >
            <option value="SILVER">
              {t(
                'Silver (612.36g — Hanafi Preferred)',
                'چاندی (۶۱۲.۳۶ گرام — فقہ حنفی راجح و فقراء کا نفع)',
                'الفضة (٦١٢.٣٦ غرام — الراجح حنفياً)',
                'Chandi (612.36g — Hanafi Rajih)'
              )}
            </option>
            <option value="GOLD">
              {t('Gold (87.48g)', 'سونا (۸۷.۴۸ گرام)', 'الذهب (٨٧.٤٨ غرام)', 'Sona (87.48g)')}
            </option>
          </select>
        </div>
      </div>

      <div className="calc-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>
            {t('Gold Price / g', 'قیمتِ سونا فی گرام', 'سعر الذهب لكل غرام', 'Qeemat-e-Sona fi Gram')}
          </label>
          <input
            type="number"
            min="0"
            value={goldPrice}
            onChange={(e) => setGoldPrice(Math.max(0, Number(e.target.value) || 0))}
            style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>
            {t('Silver Price / g', 'قیمتِ چاندی فی گرام', 'سعر الفضة لكل غرام', 'Qeemat-e-Chandi fi Gram')}
          </label>
          <input
            type="number"
            min="0"
            value={silverPrice}
            onChange={(e) => setSilverPrice(Math.max(0, Number(e.target.value) || 0))}
            style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB', boxSizing: 'border-box' }}
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: -6, marginBottom: 8 }}>
        <button
          type="button"
          onClick={() => handleCurrencyChange(currency)}
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: '#065F46',
            backgroundColor: '#ECFDF5',
            border: '1px solid #A7F3D0',
            borderRadius: 6,
            padding: '3px 8px',
            cursor: 'pointer',
          }}
        >
          🔄 {t(`Reset ${currency} Standard Bullion Rates`, `${currency} کے معیاری مارکیٹ ریٹس بحال کریں`, `استعادة أسعار ${currency} المعتمدة`, `Reset ${currency} Bullion Rates`)}
        </button>
      </div>

      <div>
        <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>
          {t(
            'Cash in Hand & Bank Accounts',
            'نقد رقم (بینک اکاؤنٹ و نقد کیش)',
            'السيولة النقدية والأرصدة البنكية',
            'Naqd Raqam (Bank & Cash)'
          )}
        </label>
        <input
          type="number"
          min="0"
          value={cash}
          onChange={(e) => setCash(Math.max(0, Number(e.target.value) || 0))}
          style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB', boxSizing: 'border-box' }}
        />
      </div>

      <div className="calc-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>
            {t('Gold Owned (Grams)', 'ملکیت سونا (گرام)', 'الذهب المملوك (غرام)', 'Milkiyat Sona (Grams)')}
          </label>
          <input
            type="number"
            min="0"
            value={goldGrams}
            onChange={(e) => setGoldGrams(Math.max(0, Number(e.target.value) || 0))}
            style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>
            {t('Silver Owned (Grams)', 'ملکیت چاندی (گرام)', 'الفضة المملوكة (غرام)', 'Milkiyat Chandi (Grams)')}
          </label>
          <input
            type="number"
            min="0"
            value={silverGrams}
            onChange={(e) => setSilverGrams(Math.max(0, Number(e.target.value) || 0))}
            style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB', boxSizing: 'border-box' }}
          />
        </div>
      </div>

      {/* WOMEN'S JEWELRY & GOLD PURITY CALCULATOR (HANAFI FIQH) */}
      <div
        style={{
          backgroundColor: '#FDF2F8',
          borderRadius: 10,
          padding: 14,
          border: '1px solid #FBCFE8',
          marginTop: 4,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>🌸</span>
            <strong style={{ fontSize: 13, color: '#9D174D' }}>
              {t(
                "Women's Jewelry & Karat Converter (Hanafi Fiqh)",
                'خواتین کے زیورات کا حسابی ماڈیول (تولہ و قیراط)',
                'حاسبة حلي النساء وعيارات الذهب (الفقه الحنفي)',
                'Khawateen ke Zewarat Module (Tola wa Karat)'
              )}
            </strong>
          </div>
          <span style={{ fontSize: 10, backgroundColor: '#BE185D', color: '#FFFFFF', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>
            {t('Bahar-e-Shari\'at', 'بہارِ شریعت', 'بهار شريعت', 'Bahar-e-Shari\'at')}
          </span>
        </div>
        <p style={{ margin: '0 0 10px', fontSize: 11, color: '#4B5563', lineHeight: 1.4 }}>
          {t(
            "In Hanafi jurisprudence (Bahar-e-Shari'at), personal gold jewelry is subject to Zakat if total gold reaches Nisab (7.5 Tolas / 87.48g).",
            'فقہ حنفی میں ذاتی استعمال کے سونے کے زیورات پر بھی زکوٰۃ واجب ہے۔ اپنے زیور کا وزن اور قیراط درج کریں۔',
            'في الفقه الحنفي (بهار شريعت)، تجب الزكاة في حلي الذهب المستعمل إذا بلغ النصاب (٧.٥ تولة / ٨٧.٤٨ غرام).',
            'Fiqh Hanafi mein zati istemal ke sone ke zewarat par bhi Zakat wajib hai agar nisab (7.5 Tola / 87.48g) tak pahunche.'
          )}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 8, marginBottom: 8 }}>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: '#6B7280', display: 'block', marginBottom: 2 }}>
              {t('Weight (Tolas)', 'وزن (تولہ)', 'الوزن (تولة)', 'Wazan (Tola)')}
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="e.g. 5"
              value={jewelryTolas || ''}
              onChange={(e) => {
                const val = Number(e.target.value);
                setJewelryTolas(val);
                setJewelryGrams(Math.round(val * 11.664 * 100) / 100);
              }}
              style={{ width: '100%', padding: '6px 8px', borderRadius: 6, border: '1px solid #D1D5DB', fontSize: 12, boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: '#6B7280', display: 'block', marginBottom: 2 }}>
              {t('Or Weight (Grams)', 'یا وزن (گرام)', 'أو الوزن (غرام)', 'Ya Wazan (Grams)')}
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="e.g. 58.3"
              value={jewelryGrams || ''}
              onChange={(e) => {
                const val = Number(e.target.value);
                setJewelryGrams(val);
                setJewelryTolas(Math.round((val / 11.664) * 100) / 100);
              }}
              style={{ width: '100%', padding: '6px 8px', borderRadius: 6, border: '1px solid #D1D5DB', fontSize: 12, boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: '#6B7280', display: 'block', marginBottom: 2 }}>
              {t('Purity / Karat', 'قیراط / کھرا پن', 'العيار / النقاوة', 'Qeeraat / Karat')}
            </label>
            <select
              value={jewelryKarat}
              onChange={(e) => setJewelryKarat(Number(e.target.value))}
              style={{ width: '100%', padding: '6px 8px', borderRadius: 6, border: '1px solid #D1D5DB', fontSize: 12 }}
            >
              <option value={24}>24 Karat (99.9% {t('Pure', 'خالص', 'خالص', 'Khalis')})</option>
              <option value={22}>22 Karat (91.6% {t('Standard Jewelry', 'عام زیور', 'حلي معتاد', 'Aam Zewar')})</option>
              <option value={21}>21 Karat (87.5% {t('Gulf Standard', 'خلیجی معیار', 'معيار خليجي', 'Khaleegi Standard')})</option>
              <option value={18}>18 Karat (75.0% {t('Gemstone Gold', 'نگینے والا', 'مرصع بالأحجار', 'Nagene Wala')})</option>
            </select>
          </div>
        </div>

        {jewelryGrams > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', padding: '8px 12px', borderRadius: 6, border: '1px solid #FBCFE8', flexWrap: 'wrap', gap: 8 }}>
            <div style={{ fontSize: 11, color: '#831843' }}>
              {t('Net 24K Gold Weight:', 'خالص ۲۴ قیراط سونے کا مساوی وزن:', 'الوزن الصافي المعادل لعيار ٢٤:', 'Khalis 24K Sone ka Wazan:')}{' '}
              <strong>{Math.round((jewelryGrams * (jewelryKarat / 24)) * 100) / 100}g</strong> ({Math.round(((jewelryGrams * (jewelryKarat / 24)) / 11.664) * 100) / 100} {t('Tolas', 'تولہ', 'تولة', 'Tola')})
            </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {goldGrams > 0 ? (
                <>
                  <button
                    onClick={() => {
                      const net24k = Math.round((jewelryGrams * (jewelryKarat / 24)) * 100) / 100;
                      setGoldGrams(Math.round((goldGrams + net24k) * 100) / 100);
                      showAmalToast(
                        t(
                          `Added +${net24k}g 24K jewelry weight to gold assets!`,
                          `زیورات کا خالص وزن (+${net24k} گرام) سونے کے اثاثوں میں شامل کر دیا گیا!`,
                          `تمت إضافة +${net24k} غرام من الذهب الصافي إلى الأصول!`,
                          `Zewarat ka wazan (+${net24k}g) sone mein shamil ho gaya!`
                        ),
                        'success'
                      );
                    }}
                    style={{
                      backgroundColor: '#065F46',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '4px 10px',
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                    title={t('Add to existing gold', 'موجودہ سونے میں شامل کریں')}
                  >
                    + {t('Add to Gold', 'سونے میں جمع کریں', 'إضافة للذهب', 'Add')}
                  </button>
                  <button
                    onClick={() => {
                      const net24k = Math.round((jewelryGrams * (jewelryKarat / 24)) * 100) / 100;
                      setGoldGrams(net24k);
                      showAmalToast(
                        t(
                          'Jewelry net weight applied as total gold!',
                          'زیورات کا وزن سونے کے کل وزن کے طور پر درج ہوا!',
                          'تم ضبط وزن الحلي الصافي كإجمالي الذهب!',
                          'Zewarat ka wazan sone ke wazan ke tor par darj hua!'
                        )
                      );
                    }}
                    style={{
                      backgroundColor: '#9D174D',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '4px 10px',
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                    title={t('Replace existing gold weight', 'موجودہ وزن کی جگہ درج کریں')}
                  >
                    {t('Replace Gold', 'سونے کی جگہ درج کریں', 'استبدال الذهب', 'Replace')}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    const net24k = Math.round((jewelryGrams * (jewelryKarat / 24)) * 100) / 100;
                    setGoldGrams(net24k);
                    showAmalToast(
                      t(
                        'Jewelry net weight applied to Zakat assets!',
                        'خواتین کے زیورات کا خالص وزن زکوٰۃ میں درج ہو گیا!',
                        'تم إدراج وزن الحلي الصافي في أصول الزكاة!',
                        'Zewarat ka khalis wazan Zakat mein darj ho gaya!'
                      ),
                      'success'
                    );
                  }}
                  style={{
                    backgroundColor: '#9D174D',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '4px 10px',
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {t('Apply to Gold', 'اثاثوں میں درج کریں', 'إدراج في حساب الذهب', 'Sone mein Darj Karein')}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
