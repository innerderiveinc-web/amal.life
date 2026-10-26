import React from 'react';
import { showAmalToast } from '../Toast';

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
  isUrdu: boolean;
}

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
  isUrdu,
}) => {
  return (
    <>
      <div className="calc-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>
            Currency
          </label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB' }}
          >
            <option value="INR">INR (Indian Rupee ₹)</option>
            <option value="USD">USD (US Dollar $)</option>
            <option value="SAR">SAR (Saudi Riyal)</option>
            <option value="AED">AED (UAE Dirham)</option>
            <option value="GBP">GBP (British Pound £)</option>
            <option value="PKR">PKR (Pakistani Rupee)</option>
          </select>
        </div>
        <div>
          <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>
            Nisab Standard
          </label>
          <select
            value={nisabStandard}
            onChange={(e) => setNisabStandard(e.target.value as ('SILVER' | 'GOLD'))}
            style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB' }}
          >
            <option value="SILVER">Silver (612.36g — Hanafi Preferred)</option>
            <option value="GOLD">Gold (87.48g)</option>
          </select>
        </div>
      </div>

      <div className="calc-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>
            Gold Price / g
          </label>
          <input
            type="number"
            value={goldPrice}
            onChange={(e) => setGoldPrice(Number(e.target.value))}
            style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>
            Silver Price / g
          </label>
          <input
            type="number"
            value={silverPrice}
            onChange={(e) => setSilverPrice(Number(e.target.value))}
            style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB', boxSizing: 'border-box' }}
          />
        </div>
      </div>

      <div>
        <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>
          Cash in Hand &amp; Bank Accounts
        </label>
        <input
          type="number"
          value={cash}
          onChange={(e) => setCash(Number(e.target.value))}
          style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB', boxSizing: 'border-box' }}
        />
      </div>

      <div className="calc-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>
            Gold Owned (Grams)
          </label>
          <input
            type="number"
            value={goldGrams}
            onChange={(e) => setGoldGrams(Number(e.target.value))}
            style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>
            Silver Owned (Grams)
          </label>
          <input
            type="number"
            value={silverGrams}
            onChange={(e) => setSilverGrams(Number(e.target.value))}
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
              {isUrdu ? 'خواتین کے زیورات کا حسابی ماڈیول (تولہ و قیراط)' : "Women's Jewelry & Karat Converter (Hanafi Fiqh)"}
            </strong>
          </div>
          <span style={{ fontSize: 10, backgroundColor: '#BE185D', color: '#FFFFFF', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>
            بہارِ شریعت
          </span>
        </div>
        <p style={{ margin: '0 0 10px', fontSize: 11, color: '#4B5563', lineHeight: 1.4 }}>
          {isUrdu
            ? 'فقہ حنفی میں ذاتی استعمال کے سونے کے زیورات پر بھی زکوٰۃ واجب ہے۔ اپنے زیور کا وزن اور قیراط درج کریں۔'
            : "In Hanafi jurisprudence (Bahar-e-Shari'at), personal gold jewelry is subject to Zakat if total gold reaches Nisab (7.5 Tolas / 87.48g)."}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 8, marginBottom: 8 }}>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: '#6B7280', display: 'block', marginBottom: 2 }}>
              {isUrdu ? 'وزن (تولہ)' : 'Weight (Tolas)'}
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
              {isUrdu ? 'یا وزن (گرام)' : 'Or Weight (Grams)'}
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
              {isUrdu ? 'قیراط / کھرا پن' : 'Purity / Karat'}
            </label>
            <select
              value={jewelryKarat}
              onChange={(e) => setJewelryKarat(Number(e.target.value))}
              style={{ width: '100%', padding: '6px 8px', borderRadius: 6, border: '1px solid #D1D5DB', fontSize: 12 }}
            >
              <option value={24}>24 Karat (99.9% خالص)</option>
              <option value={22}>22 Karat (91.6% عام زیور)</option>
              <option value={21}>21 Karat (87.5% خلیجی)</option>
              <option value={18}>18 Karat (75.0% نگینے والا)</option>
            </select>
          </div>
        </div>

        {jewelryGrams > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', padding: '8px 12px', borderRadius: 6, border: '1px solid #FBCFE8', flexWrap: 'wrap', gap: 8 }}>
            <div style={{ fontSize: 11, color: '#831843' }}>
              خالص سونے کا وزن (24K Equivalent): <strong>{Math.round((jewelryGrams * (jewelryKarat / 24)) * 100) / 100}g</strong> ({Math.round(((jewelryGrams * (jewelryKarat / 24)) / 11.664) * 100) / 100} تولہ)
            </div>
            <button
              onClick={() => {
                const net24k = Math.round((jewelryGrams * (jewelryKarat / 24)) * 100) / 100;
                setGoldGrams(net24k);
                showAmalToast('خواتین کے زیورات کا خالص وزن زکوٰۃ میں درج ہو گیا!');
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
              {isUrdu ? 'اثاثوں میں درج کریں' : 'Apply to Gold'}
            </button>
          </div>
        )}
      </div>
    </>
  );
};
