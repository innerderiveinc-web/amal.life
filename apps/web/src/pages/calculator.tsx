import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Navigation } from '../components/Navigation';
import {
  zakatInheritanceEngine,
  ZakatInput,
  InheritanceInput,
  shariPdfExportEngine,
  MirasPdfCertificatePayload,
  ZakatClearancePayload,
} from '@amal/amal-engine';
import { showAmalToast } from '../components/Toast';

export default function CalculatorPage() {
  const [activeTab, setActiveTab] = useState<'ZAKAT' | 'MIRAS'>('ZAKAT');
  const [mirasCert, setMirasCert] = useState<MirasPdfCertificatePayload | null>(null);
  const [zakatCert, setZakatCert] = useState<ZakatClearancePayload | null>(null);

  // Zakat Form State
  const [currency, setCurrency] = useState('INR');
  const [goldPrice, setGoldPrice] = useState(7200); // INR per gram approx
  const [silverPrice, setSilverPrice] = useState(90); // INR per gram approx
  const [nisabStandard, setNisabStandard] = useState<'SILVER' | 'GOLD'>('SILVER');
  const [madhhab, setMadhhab] = useState<'HANAFI' | 'SHAFI_I' | 'MALIKI' | 'HANBALI'>('HANAFI');

  const [cash, setCash] = useState(250000);
  const [goldGrams, setGoldGrams] = useState(25);
  const [silverGrams, setSilverGrams] = useState(100);
  const [businessStock, setBusinessStock] = useState(150000);
  const [receivables, setReceivables] = useState(50000);
  const [tradingShares, setTradingShares] = useState(0); // 100% zakatable (Urud al-Tijarah)
  const [longTermShares, setLongTermShares] = useState(0); // 25% zakatable on liquid assets
  const [retirementAccessible, setRetirementAccessible] = useState(0); // PF / 401k accessible portion
  const [cryptoAssets, setCryptoAssets] = useState(0); // Cryptocurrency / tokens
  const [debts, setDebts] = useState(30000);

  const zakatResult = useMemo(() => {
    // Modern financial asset zakatable pool
    const zakatableInvestments = 
      tradingShares + 
      Math.round(longTermShares * 0.25) + 
      retirementAccessible + 
      cryptoAssets;

    const input: ZakatInput = {
      currency,
      goldPricePerGram: goldPrice,
      silverPricePerGram: silverPrice,
      nisabStandard,
      madhhab,
      cashInHandAndBanks: cash,
      goldValueOrWeightGrams: { grams: goldGrams },
      silverValueOrWeightGrams: { grams: silverGrams },
      isPersonalWornJewelry: true,
      businessMerchandiseWholesale: businessStock,
      tradeReceivablesAndLoansGiven: receivables,
      sharesAndInvestments: zakatableInvestments,
      immediateDebtsDue: debts,
      pendingEssentialBills: 0,
    };
    return zakatInheritanceEngine.calculateZakat(input);
  }, [
    currency,
    goldPrice,
    silverPrice,
    nisabStandard,
    madhhab,
    cash,
    goldGrams,
    silverGrams,
    businessStock,
    receivables,
    tradingShares,
    longTermShares,
    retirementAccessible,
    cryptoAssets,
    debts,
  ]);

  // Miras Form State
  const [estateValue, setEstateValue] = useState(10000000); // 10 Million
  const [deceasedGender, setDeceasedGender] = useState<'MALE' | 'FEMALE'>('MALE');
  const [wivesCount, setWivesCount] = useState(1);
  const [hasHusband, setHasHusband] = useState(false);
  const [sonsCount, setSonsCount] = useState(2);
  const [daughtersCount, setDaughtersCount] = useState(2);
  const [hasFather, setHasFather] = useState(true);
  const [hasMother, setHasMother] = useState(true);

  const mirasResult = useMemo(() => {
    const input: InheritanceInput = {
      estateValue,
      currency,
      deceasedGender,
      heirs: {
        husband: deceasedGender === 'FEMALE' ? hasHusband : false,
        wivesCount: deceasedGender === 'MALE' ? wivesCount : 0,
        sonsCount,
        daughtersCount,
        father: hasFather,
        mother: hasMother,
      },
    };
    return zakatInheritanceEngine.calculateInheritance(input);
  }, [estateValue, currency, deceasedGender, hasHusband, wivesCount, sonsCount, daughtersCount, hasFather, hasMother]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FA' }}>
      <Head>
        <title>Zakat & Miras (Inheritance) Calculator | AMAL OS</title>
      </Head>
      <Navigation />

      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px 60px' }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1B4332', marginBottom: 6 }}>
            ⚖️ Classical Islamic Financial Jurisprudence
          </h1>
          <p style={{ color: '#4B5563', margin: 0, fontSize: 14 }}>
            Strictly authentic calculations for <strong>Zakat</strong> (Nisab, Hawl, Assets) and <strong>Miras / Fara'id</strong> (Quranic fixed shares from Surah An-Nisa).
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 24, borderBottom: '2px solid #E5E7EB', paddingBottom: 12 }}>
          <button
            onClick={() => setActiveTab('ZAKAT')}
            style={{
              padding: '10px 24px',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 15,
              cursor: 'pointer',
              border: 'none',
              backgroundColor: activeTab === 'ZAKAT' ? '#1B4332' : '#E5E7EB',
              color: activeTab === 'ZAKAT' ? '#FFFFFF' : '#374151',
            }}
          >
            💰 Zakat Calculator
          </button>
          <button
            onClick={() => setActiveTab('MIRAS')}
            style={{
              padding: '10px 24px',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 15,
              cursor: 'pointer',
              border: 'none',
              backgroundColor: activeTab === 'MIRAS' ? '#1B4332' : '#E5E7EB',
              color: activeTab === 'MIRAS' ? '#FFFFFF' : '#374151',
            }}
          >
            📜 Miras (Inheritance / Fara'id)
          </button>
        </div>

        {/* ZAKAT SECTION */}
        {activeTab === 'ZAKAT' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            {/* Input Form */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 24, border: '1px solid #E5E7EB' }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1B4332', marginBottom: 16 }}>
                Wealth & Nisab Parameters
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
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

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>Gold Price / g</label>
                    <input
                      type="number"
                      value={goldPrice}
                      onChange={(e) => setGoldPrice(Number(e.target.value))}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>Silver Price / g</label>
                    <input
                      type="number"
                      value={silverPrice}
                      onChange={(e) => setSilverPrice(Number(e.target.value))}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>Cash in Hand & Bank Accounts</label>
                  <input
                    type="number"
                    value={cash}
                    onChange={(e) => setCash(Number(e.target.value))}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>Gold Owned (Grams)</label>
                    <input
                      type="number"
                      value={goldGrams}
                      onChange={(e) => setGoldGrams(Number(e.target.value))}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>Silver Owned (Grams)</label>
                    <input
                      type="number"
                      value={silverGrams}
                      onChange={(e) => setSilverGrams(Number(e.target.value))}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>
                    Trade Merchandise (Wholesale Inventory)
                  </label>
                  <input
                    type="number"
                    value={businessStock}
                    onChange={(e) => setBusinessStock(Number(e.target.value))}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB' }}
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
                    style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB' }}
                  />
                </div>

                {/* Modern Financial Assets Section */}
                <div style={{
                  padding: 14,
                  backgroundColor: '#F8FAFC',
                  borderRadius: 10,
                  border: '1px solid #E2E8F0',
                  marginTop: 6,
                  marginBottom: 6,
                }}>
                  <div style={{ fontWeight: 800, fontSize: 13, color: '#1E293B', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span>📈</span>
                    <span>Modern Financial Assets (جدید مالی اثاثے)</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                        <label style={{ fontSize: 11, fontWeight: 700, color: '#334155' }}>
                          Trading Shares / Short-term Resale Stocks (100% Zakatable)
                        </label>
                        <span style={{ fontSize: 10, color: '#059669', fontWeight: 700 }}>عروضِ تجارت</span>
                      </div>
                      <input
                        type="number"
                        value={tradingShares}
                        onChange={(e) => setTradingShares(Number(e.target.value))}
                        placeholder="Market value of shares bought for trading..."
                        style={{ width: '100%', padding: '7px 10px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 13 }}
                      />
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                        <label style={{ fontSize: 11, fontWeight: 700, color: '#334155' }}>
                          Long-Term Dividend Equity / Mutual Funds (~25% Liquid Zakatable)
                        </label>
                        <span style={{ fontSize: 10, color: '#0284C7', fontWeight: 700 }}>AAOIFI / عثمانی قاعدہ</span>
                      </div>
                      <input
                        type="number"
                        value={longTermShares}
                        onChange={(e) => setLongTermShares(Number(e.target.value))}
                        placeholder="Total investment (25% liquid assets will be taxed)..."
                        style={{ width: '100%', padding: '7px 10px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 13 }}
                      />
                      {longTermShares > 0 && (
                        <div style={{ fontSize: 10, color: '#64748B', marginTop: 2 }}>
                          Calculated Zakatable portion: <strong>{currency} {Math.round(longTermShares * 0.25).toLocaleString()}</strong> (fixed factories/machinery exempt).
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      <div>
                        <label style={{ fontSize: 11, fontWeight: 700, color: '#334155', display: 'block', marginBottom: 3 }}>
                          Accessible Retirement (PF / 401k)
                        </label>
                        <input
                          type="number"
                          value={retirementAccessible}
                          onChange={(e) => setRetirementAccessible(Number(e.target.value))}
                          placeholder="Accessible balance..."
                          style={{ width: '100%', padding: '7px 10px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 13 }}
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
                          style={{ width: '100%', padding: '7px 10px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 13 }}
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
                    style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB' }}
                  />
                </div>
              </div>
            </div>

            {/* Zakat Result Summary */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 24, border: '1px solid #E5E7EB' }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1B4332', marginBottom: 16 }}>
                Zakat Assessment & Obligation
              </h2>

              <div style={{
                padding: 16,
                borderRadius: 8,
                backgroundColor: zakatResult.isEligibleForZakat ? '#F0FDF4' : '#FEF2F2',
                border: zakatResult.isEligibleForZakat ? '1px solid #86EFAC' : '1px solid #FECACA',
                marginBottom: 20,
              }}>
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
        )}

        {/* MIRAS (INHERITANCE) SECTION */}
        {activeTab === 'MIRAS' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            {/* Estate & Heirs Input */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 24, border: '1px solid #E5E7EB' }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1B4332', marginBottom: 16 }}>
                Deceased & Heirs Configuration
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>
                    Net Estate Value ({currency})
                  </label>
                  <input
                    type="number"
                    value={estateValue}
                    onChange={(e) => setEstateValue(Number(e.target.value))}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB' }}
                  />
                  <span style={{ fontSize: 11, color: '#6B7280' }}>After funeral expenses, debts, and max 1/3 Wasiyyah.</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>Deceased Gender</label>
                    <select
                      value={deceasedGender}
                      onChange={(e) => setDeceasedGender(e.target.value as any)}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB' }}
                    >
                      <option value="MALE">Male (Leaves Wife/Wives)</option>
                      <option value="FEMALE">Female (Leaves Husband)</option>
                    </select>
                  </div>
                  <div>
                    {deceasedGender === 'MALE' ? (
                      <div>
                        <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>Surviving Wives (1-4)</label>
                        <input
                          type="number"
                          min={0}
                          max={4}
                          value={wivesCount}
                          onChange={(e) => setWivesCount(Number(e.target.value))}
                          style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB' }}
                        />
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', height: '100%', paddingTop: 16 }}>
                        <label style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={hasHusband}
                            onChange={(e) => setHasHusband(e.target.checked)}
                          />
                          Husband Survives
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>Sons Count</label>
                    <input
                      type="number"
                      min={0}
                      value={sonsCount}
                      onChange={(e) => setSonsCount(Number(e.target.value))}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>Daughters Count</label>
                    <input
                      type="number"
                      min={0}
                      value={daughtersCount}
                      onChange={(e) => setDaughtersCount(Number(e.target.value))}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 20 }}>
                  <label style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={hasFather}
                      onChange={(e) => setHasFather(e.target.checked)}
                    />
                    Father Survives
                  </label>
                  <label style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={hasMother}
                      onChange={(e) => setHasMother(e.target.checked)}
                    />
                    Mother Survives
                  </label>
                </div>
              </div>
            </div>

            {/* Fara'id Distribution Breakdown */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 24, border: '1px solid #E5E7EB' }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1B4332', marginBottom: 8 }}>
                Canonical Quranic Shares (Zawil-Furood)
              </h2>
              <p style={{ fontSize: 12, color: '#6B7280', marginBottom: 16 }}>
                Calculated according to the divine ordinances in Surah An-Nisa (4:11-12, 4:176).
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {mirasResult.heirsShares.map((heir, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: 12,
                      borderRadius: 8,
                      backgroundColor: '#F9FAFB',
                      border: '1px solid #E5E7EB',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, color: '#111827', fontSize: 14 }}>{heir.heirName}</div>
                      <div style={{ fontSize: 11, color: '#4B5563', marginTop: 2 }}>
                        Fraction: <strong>{heir.quranicFraction}</strong> ({heir.percentage}%) • {heir.shareType}
                      </div>
                      <div style={{ fontSize: 10, color: '#6B7280', fontStyle: 'italic' }}>
                        Ref: {heir.basisQuranVerse}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 800, color: '#1B4332', fontSize: 16 }}>
                        {currency} {heir.totalAmount.toLocaleString()}
                      </div>
                      {heir.count > 1 && (
                        <div style={{ fontSize: 11, color: '#6B7280' }}>
                          Each: {currency} {heir.individualAmount.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {mirasResult.surplusOrDeficitNote && (
                <div style={{ marginTop: 16, padding: 12, borderRadius: 8, backgroundColor: '#FEF3C7', border: '1px solid #FCD34D', fontSize: 12, color: '#92400E' }}>
                  ℹ️ {mirasResult.surplusOrDeficitNote}
                </div>
              )}

              <div style={{ marginTop: 14, padding: 12, borderRadius: 8, backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', fontSize: 12, color: '#1E40AF', lineHeight: 1.5 }}>
                ⚖️ <strong>علمی و قانونی رہنمائی (Scholarly Guidance):</strong> یہ تخمینہ قرآن و سنت کے بنیادی اصولوں پر مبنی ہے۔ خاندانی پیچیدہ وراثت، تنازعات یا عدالتی تقسیم سے قبل اپنے مقامی دار الافتاء یا مستند مفتی کرام سے حتمی توثیق ضرور حاصل فرمائیں۔
              </div>

              <button
                onClick={() => {
                  const cert = shariPdfExportEngine.generateMirasCertificate({
                    deceasedName: 'Marhoom (Deceased Estate)',
                    deceasedGender,
                    estateValueGross: estateValue,
                    debtsAndFuneral: 0,
                    currency,
                    heirs: mirasResult.heirsShares.map((h) => ({
                      relation: h.heirName,
                      shareFraction: h.quranicFraction,
                      netAmount: h.totalAmount,
                      quranicSourceReference: h.basisQuranVerse,
                    })),
                  });
                  setMirasCert(cert);
                  showAmalToast('Shar\'i Miras & Fara\'id Certificate generated', 'success');
                }}
                style={{
                  marginTop: 18,
                  width: '100%',
                  padding: '12px 14px',
                  backgroundColor: '#1B4332',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                📄 Export Shar'i Miras & Fara'id Distribution Certificate (PDF)
              </button>
            </div>
          </div>
        )}

        {/* CHANNELIZED FINANCIAL LIFECYCLE BAR */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          padding: 20,
          border: '1px solid #E5E7EB',
          marginTop: 28,
          marginBottom: 20,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#92400E', letterSpacing: 1 }}>
              FINANCIAL LIFECYCLE (مالیاتی فقہ اور تنازعات کا حل)
            </span>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginTop: 2 }}>
              Need Scholar Review, Family Allocation, or Dispute Resolution?
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link
              href="/decision-room"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 14px',
                borderRadius: 8,
                backgroundColor: '#FEF3C7',
                color: '#92400E',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: 13,
                border: '1px solid #FCD34D',
              }}
            >
              <span>⚖️ Deen Decision Room</span>
            </Link>
            <Link
              href="/family"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 14px',
                borderRadius: 8,
                backgroundColor: '#F3F4F6',
                color: '#374151',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: 13,
                border: '1px solid #E5E7EB',
              }}
            >
              <span>👨‍👩‍👧‍👦 Family Deen Circles</span>
            </Link>
            <Link
              href="/ask"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 14px',
                borderRadius: 8,
                backgroundColor: '#F3F4F6',
                color: '#374151',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: 13,
                border: '1px solid #E5E7EB',
              }}
            >
              <span>💬 Ask Certified Mufti</span>
            </Link>
          </div>
        </div>

        {/* PRINTABLE MIRAS CERTIFICATE MODAL */}
        {mirasCert && (
          <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            padding: 20,
          }}>
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              maxWidth: 720,
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: 32,
              border: '2px solid #1B4332',
              position: 'relative',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #1B4332', paddingBottom: 16, marginBottom: 20 }}>
                <div>
                  <span style={{ fontSize: 11, fontWeight: 800, color: '#047857', letterSpacing: 1 }}>OFFICIAL SHAR'I RECORD</span>
                  <h2 style={{ fontSize: 20, fontWeight: 900, color: '#1B4332', margin: '4px 0 0' }}>
                    CERTIFICATE OF ISLAMIC INHERITANCE (فَرَائِض)
                  </h2>
                  <div style={{ fontSize: 11, color: '#6B7280' }}>Cert ID: {mirasCert.certificateId} • Date: {mirasCert.dateOfDeath}</div>
                </div>
                <button
                  onClick={() => setMirasCert(null)}
                  style={{ border: 'none', background: 'none', fontSize: 20, cursor: 'pointer', color: '#6B7280' }}
                >
                  ✕
                </button>
              </div>

              <div style={{ backgroundColor: '#F9FAFB', padding: 14, borderRadius: 8, marginBottom: 18, fontSize: 13 }}>
                <div><strong>Gross Estate:</strong> {mirasCert.currency} {mirasCert.estateValueGross.toLocaleString()}</div>
                <div><strong>Net Distributable Estate:</strong> {mirasCert.currency} {mirasCert.netDistributableEstate.toLocaleString()}</div>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, marginBottom: 20 }}>
                <thead>
                  <tr style={{ backgroundColor: '#E5E7EB', textAlign: 'left' }}>
                    <th style={{ padding: 8 }}>Heir Relation</th>
                    <th style={{ padding: 8 }}>Quranic Share</th>
                    <th style={{ padding: 8 }}>Percentage</th>
                    <th style={{ padding: 8 }}>Total Entitlement</th>
                  </tr>
                </thead>
                <tbody>
                  {mirasCert.heirs.map((h, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #E5E7EB' }}>
                      <td style={{ padding: 8, fontWeight: 700 }}>{h.relation}</td>
                      <td style={{ padding: 8 }}>{h.shareFraction}</td>
                      <td style={{ padding: 8 }}>{h.sharePercentage}</td>
                      <td style={{ padding: 8, fontWeight: 800, color: '#1B4332' }}>{mirasCert.currency} {h.netAmount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ fontSize: 11, color: '#4B5563', lineHeight: 1.6, marginBottom: 20, backgroundColor: '#F0FDF4', padding: 12, borderRadius: 8 }}>
                {mirasCert.legalDisclaimer}
              </div>

              <div style={{ borderTop: '1px dashed #9CA3AF', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: 11, color: '#4B5563' }}>
                  <strong>Attestation:</strong> {mirasCert.muftiSignOffBlock.issuingInstitution}<br />
                  Verified School: {mirasCert.muftiSignOffBlock.verifiedMadhhab}
                </div>
                <button
                  onClick={() => window.print()}
                  style={{ padding: '8px 18px', backgroundColor: '#1B4332', color: '#FFFFFF', border: 'none', borderRadius: 6, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}
                >
                  🖨️ Print / Save PDF
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PRINTABLE ZAKAT CLEARANCE MODAL */}
        {zakatCert && (
          <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            padding: 20,
          }}>
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              maxWidth: 600,
              width: '100%',
              padding: 28,
              border: '2px solid #047857',
              position: 'relative',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #047857', paddingBottom: 14, marginBottom: 18 }}>
                <div>
                  <span style={{ fontSize: 10, fontWeight: 800, color: '#047857', letterSpacing: 1 }}>HAWL AUDIT RECORD</span>
                  <h2 style={{ fontSize: 18, fontWeight: 900, color: '#065F46', margin: '2px 0 0' }}>
                    ANNUAL ZAKAT CLEARANCE SUMMARY ({zakatCert.hijriYear} AH)
                  </h2>
                  <div style={{ fontSize: 11, color: '#6B7280' }}>ID: {zakatCert.clearanceId} • {zakatCert.dateCalculated}</div>
                </div>
                <button
                  onClick={() => setZakatCert(null)}
                  style={{ border: 'none', background: 'none', fontSize: 18, cursor: 'pointer', color: '#6B7280' }}
                >
                  ✕
                </button>
              </div>

              <div style={{ fontSize: 13, lineHeight: 1.8, marginBottom: 18 }}>
                <div><strong>Beneficiary / Account:</strong> {zakatCert.individualOrBusinessName}</div>
                <div><strong>Gross Liquid Wealth:</strong> {zakatCert.currency} {zakatCert.totalGrossAssets.toLocaleString()}</div>
                <div><strong>Less Deductible Debts:</strong> {zakatCert.currency} {zakatCert.deductibleImmediateDebts.toLocaleString()}</div>
                <div><strong>Net Zakatable Pool:</strong> {zakatCert.currency} {zakatCert.netZakatableWealth.toLocaleString()}</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#065F46', marginTop: 8 }}>
                  Zakat Due (2.5%): {zakatCert.currency} {zakatCert.zakatPaidOrDue.toLocaleString()}
                </div>
              </div>

              <div style={{ fontSize: 11, color: '#047857', backgroundColor: '#ECFDF5', padding: 12, borderRadius: 8, marginBottom: 18 }}>
                {zakatCert.scholarlyAttestation}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button
                  onClick={() => window.print()}
                  style={{ padding: '8px 18px', backgroundColor: '#047857', color: '#FFFFFF', border: 'none', borderRadius: 6, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}
                >
                  🖨️ Print / Save PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
