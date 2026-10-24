import React from 'react';
import { DetailedZakatCalculationResult, shariPdfExportEngine, ZakatClearancePayload } from '@amal/amal-engine';
import { showAmalToast } from '../Toast';

interface ZakatCalculatorTabProps {
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
  businessStock: number;
  setBusinessStock: (s: number) => void;
  receivables: number;
  setReceivables: (r: number) => void;
  tradingShares: number;
  setTradingShares: (s: number) => void;
  longTermShares: number;
  setLongTermShares: (s: number) => void;
  retirementAccessible: number;
  setRetirementAccessible: (r: number) => void;
  cryptoAssets: number;
  setCryptoAssets: (c: number) => void;
  debts: number;
  setDebts: (d: number) => void;
  zakatResult: DetailedZakatCalculationResult;
  madhhab: 'HANAFI' | 'SHAFI_I' | 'MALIKI' | 'HANBALI';
  setZakatCert: (cert: ZakatClearancePayload | null) => void;
  isUrdu: boolean;
  t: (en: string, ur: string) => string;
}

export function ZakatCalculatorTab({
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
  businessStock,
  setBusinessStock,
  receivables,
  setReceivables,
  tradingShares,
  setTradingShares,
  longTermShares,
  setLongTermShares,
  retirementAccessible,
  setRetirementAccessible,
  cryptoAssets,
  setCryptoAssets,
  debts,
  setDebts,
  zakatResult,
  madhhab,
  setZakatCert,
  isUrdu,
  t,
}: ZakatCalculatorTabProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
      {/* Input Form */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 24, border: '1px solid #E5E7EB' }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1B4332', marginBottom: 16 }}>
          Wealth & Nisab Parameters
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="calc-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>Currency</label>
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
              <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>Nisab Standard</label>
              <select
                value={nisabStandard}
                onChange={(e) => setNisabStandard(e.target.value as any)}
                style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB' }}
              >
                <option value="SILVER">Silver (612.36g — Hanafi Preferred)</option>
                <option value="GOLD">Gold (87.48g)</option>
              </select>
            </div>
          </div>

          <div className="calc-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>Gold Price / g</label>
              <input
                type="number"
                value={goldPrice}
                onChange={(e) => setGoldPrice(Number(e.target.value))}
                style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>Silver Price / g</label>
              <input
                type="number"
                value={silverPrice}
                onChange={(e) => setSilverPrice(Number(e.target.value))}
                style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>Cash in Hand & Bank Accounts</label>
            <input
              type="number"
              value={cash}
              onChange={(e) => setCash(Number(e.target.value))}
              style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB', boxSizing: 'border-box' }}
            />
          </div>

          <div className="calc-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>Gold Owned (Grams)</label>
              <input
                type="number"
                value={goldGrams}
                onChange={(e) => setGoldGrams(Number(e.target.value))}
                style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>Silver Owned (Grams)</label>
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
                  {isUrdu ? 'خواتین کے زیورات کا حسابی ماڈیول (تولہ و قیراط)' : 'Women\'s Jewelry & Karat Converter (Hanafi Fiqh)'}
                </strong>
              </div>
              <span style={{ fontSize: 10, backgroundColor: '#BE185D', color: '#FFFFFF', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>
                بہارِ شریعت
              </span>
            </div>
            <p style={{ margin: '0 0 10px', fontSize: 11, color: '#4B5563', lineHeight: 1.4 }}>
              {isUrdu
                ? 'فقہ حنفی میں ذاتی استعمال کے سونے کے زیورات پر بھی زکوٰۃ واجب ہے۔ اپنے زیور کا وزن اور قیراط درج کریں۔'
                : 'In Hanafi jurisprudence (Bahar-e-Shari\'at), personal gold jewelry is subject to Zakat if total gold reaches Nisab (7.5 Tolas / 87.48g).'}
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

          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>
              Trade Merchandise (Wholesale Inventory)
            </label>
            <input
              type="number"
              value={businessStock}
              onChange={(e) => setBusinessStock(Number(e.target.value))}
              style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>
              Loans Receivable (قرضہ جات جو واپس ملنے کی امید ہو)
            </label>
            <input
              type="number"
              value={receivables}
              onChange={(e) => setReceivables(Number(e.target.value))}
              style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB', boxSizing: 'border-box' }}
            />
          </div>

          {/* Modern Financial Assets Section */}
          <div
            style={{
              padding: 14,
              backgroundColor: '#F8FAFC',
              borderRadius: 10,
              border: '1px solid #E2E8F0',
              marginTop: 6,
              marginBottom: 6,
            }}
          >
            <div style={{ fontWeight: 800, fontSize: 13, color: '#1E293B', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>📈</span>
              <span>{t('Modern Financial Assets', 'جدید مالی اثاثے')}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: '#334155' }}>
                    Trading Shares / Short-term Resale Stocks (100% Zakatable)
                  </label>
                  <span style={{ fontSize: 10, color: '#059669', fontWeight: 700 }}>{t('Trading Assets (`Urood al-Tijarah)', 'عروضِ تجارت')}</span>
                </div>
                <input
                  type="number"
                  value={tradingShares}
                  onChange={(e) => setTradingShares(Number(e.target.value))}
                  placeholder="Market value of shares bought for trading..."
                  style={{ width: '100%', padding: '7px 10px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 13, boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: '#334155' }}>
                    Long-Term Dividend Equity / Mutual Funds (~25% Liquid Zakatable)
                  </label>
                  <span style={{ fontSize: 10, color: '#0284C7', fontWeight: 700 }}>{t('AAOIFI Standard / Usmani Rule', 'AAOIFI / عثمانی قاعدہ')}</span>
                </div>
                <input
                  type="number"
                  value={longTermShares}
                  onChange={(e) => setLongTermShares(Number(e.target.value))}
                  placeholder="Total investment (25% liquid assets will be taxed)..."
                  style={{ width: '100%', padding: '7px 10px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 13, boxSizing: 'border-box' }}
                />
                {longTermShares > 0 && (
                  <div style={{ fontSize: 10, color: '#64748B', marginTop: 2 }}>
                    Calculated Zakatable portion: <strong>{currency} {Math.round(longTermShares * 0.25).toLocaleString()}</strong> (fixed factories/machinery exempt).
                  </div>
                )}
              </div>

              <div className="calc-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: '#334155', display: 'block', marginBottom: 3 }}>
                    Accessible Retirement (PF / 401k)
                  </label>
                  <input
                    type="number"
                    value={retirementAccessible}
                    onChange={(e) => setRetirementAccessible(Number(e.target.value))}
                    placeholder="Accessible balance..."
                    style={{ width: '100%', padding: '7px 10px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 13, boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: '#334155', display: 'block', marginBottom: 3 }}>
                    Crypto &amp; Digital Wealth
                  </label>
                  <input
                    type="number"
                    value={cryptoAssets}
                    onChange={(e) => setCryptoAssets(Number(e.target.value))}
                    placeholder="Crypto value..."
                    style={{ width: '100%', padding: '7px 10px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 13, boxSizing: 'border-box' }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>
              Immediate Debts Payable (Deductible)
            </label>
            <input
              type="number"
              value={debts}
              onChange={(e) => setDebts(Number(e.target.value))}
              style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB', boxSizing: 'border-box' }}
            />
          </div>
        </div>
      </div>

      {/* Zakat Result Summary */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 24, border: '1px solid #E5E7EB' }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1B4332', marginBottom: 16 }}>
          Zakat Assessment & Obligation
        </h2>

        <div
          style={{
            padding: 16,
            borderRadius: 8,
            backgroundColor: zakatResult.isEligibleForZakat ? '#F0FDF4' : '#FEF2F2',
            border: zakatResult.isEligibleForZakat ? '1px solid #86EFAC' : '1px solid #FECACA',
            marginBottom: 20,
          }}
        >
          <div style={{ fontSize: 13, color: zakatResult.isEligibleForZakat ? '#166534' : '#991B1B', fontWeight: 600 }}>
            {zakatResult.isEligibleForZakat ? '✓ NISAB EXCEEDED — ZAKAT IS WAJIB (OBLIGATORY)' : '✗ BELOW NISAB — NO ZAKAT DUE'}
          </div>
          <div style={{ fontSize: 32, fontWeight: 900, color: '#1B4332', marginTop: 8 }}>
            {currency} {zakatResult.zakatDue.toLocaleString()}
          </div>
          <div style={{ fontSize: 12, color: '#4B5563', marginTop: 4 }}>
            2.5% (1/40th) of net wealth above Nisab threshold ({currency} {zakatResult.nisabValue.toLocaleString()})
          </div>
        </div>

        <div style={{ fontSize: 13, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F3F4F6', paddingBottom: 6 }}>
            <span style={{ color: '#6B7280' }}>Total Zakatable Assets:</span>
            <span style={{ fontWeight: 700 }}>{currency} {zakatResult.totalZakatableAssets.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F3F4F6', paddingBottom: 6 }}>
            <span style={{ color: '#6B7280' }}>Less Deductible Debts:</span>
            <span style={{ fontWeight: 700, color: '#DC2626' }}>- {currency} {zakatResult.totalDeductibleLiabilities.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F3F4F6', paddingBottom: 6 }}>
            <span style={{ color: '#6B7280' }}>Net Zakatable Pool:</span>
            <span style={{ fontWeight: 800, color: '#1B4332' }}>{currency} {zakatResult.netZakatablePool.toLocaleString()}</span>
          </div>
        </div>

        <div style={{ marginTop: 20, padding: 12, borderRadius: 8, backgroundColor: '#F9FAFB', fontSize: 12, color: '#4B5563' }}>
          {zakatResult.madhhabNotes.map((note, i) => (
            <p key={i} style={{ margin: '4px 0' }}>• {note}</p>
          ))}
        </div>

        <button
          onClick={() => {
            const cert = shariPdfExportEngine.generateZakatClearance({
              name: 'Seeker of Truth (Abdullah)',
              currency,
              grossAssets: zakatResult.totalZakatableAssets,
              debts: zakatResult.totalDeductibleLiabilities,
              madhhab: madhhab === 'HANAFI' ? 'HANAFI' : 'STANDARD_JUMHUR',
            });
            setZakatCert(cert);
            showAmalToast('Formal Zakat Clearance Certificate generated', 'success');
          }}
          style={{
            marginTop: 14,
            width: '100%',
            padding: '10px 14px',
            backgroundColor: '#1B4332',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          📄 Export Formal Zakat Clearance Certificate (PDF)
        </button>
      </div>
    </div>
  );
}
