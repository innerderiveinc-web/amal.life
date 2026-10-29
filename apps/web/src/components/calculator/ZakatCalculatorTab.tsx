import React from 'react';
import { DetailedZakatCalculationResult, ZakatClearancePayload } from '@amal/amal-engine';
import { ZakatGoldSilverNisabCard } from './ZakatGoldSilverNisabCard';
import { ZakatAssetsDeductionsForm } from './ZakatAssetsDeductionsForm';
import { ZakatAssessmentSummaryCard } from './ZakatAssessmentSummaryCard';

export interface ZakatCalculatorTabProps {
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
  const [calcMode, setCalcMode] = React.useState<'WIZARD' | 'ALL'>('WIZARD');
  const [wizardStep, setWizardStep] = React.useState<1 | 2 | 3>(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Mode Switcher Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          padding: '10px 16px',
          border: '1px solid #E5E7EB',
          flexWrap: 'wrap',
          gap: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 16 }}>💰</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#065F46' }}>
            {isUrdu ? 'زکوٰۃ و نصاب کیلکولیٹر' : 'Zakat & Nisab Calculator'}
          </span>
          <span style={{ fontSize: 12, color: '#64748B' }}>
            {calcMode === 'WIZARD'
              ? (isUrdu ? `(مرحلہ ${wizardStep} از ۳)` : `(Step ${wizardStep} of 3)`)
              : (isUrdu ? '(مکمل فارم)' : '(Full Form)')}
          </span>
        </div>

        <div style={{ display: 'flex', gap: 4, backgroundColor: '#F1F5F9', padding: 3, borderRadius: 8 }}>
          <button
            onClick={() => setCalcMode('WIZARD')}
            style={{
              padding: '4px 12px',
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              backgroundColor: calcMode === 'WIZARD' ? '#065F46' : 'transparent',
              color: calcMode === 'WIZARD' ? '#FFFFFF' : '#475569',
            }}
          >
            📱 {isUrdu ? 'آسان ۳ مراحل' : '3-Step Wizard'}
          </button>
          <button
            onClick={() => setCalcMode('ALL')}
            style={{
              padding: '4px 12px',
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              backgroundColor: calcMode === 'ALL' ? '#065F46' : 'transparent',
              color: calcMode === 'ALL' ? '#FFFFFF' : '#475569',
            }}
          >
            📄 {isUrdu ? 'مکمل فارم' : 'Full Form'}
          </button>
        </div>
      </div>

      {/* Step Indicators (in Wizard Mode) */}
      {calcMode === 'WIZARD' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {[
            { step: 1, titleEn: '1. Cash & Jewelry', titleUr: '۱. نقدی و زیورات' },
            { step: 2, titleEn: '2. Investments', titleUr: '۲. شیئرز و مالِ تجارت' },
            { step: 3, titleEn: '3. Debts & Result', titleUr: '۳. قرضے و نتیجہ' },
          ].map((s) => (
            <button
              key={s.step}
              onClick={() => setWizardStep(s.step as (1 | 2 | 3))}
              style={{
                padding: '8px 10px',
                borderRadius: 8,
                border: wizardStep === s.step ? '2px solid #059669' : '1px solid #E2E8F0',
                backgroundColor: wizardStep === s.step ? '#ECFDF5' : '#FFFFFF',
                color: wizardStep === s.step ? '#065F46' : '#64748B',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              {isUrdu ? s.titleUr : s.titleEn}
            </button>
          ))}
        </div>
      )}

      {/* Main Content Area */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 20,
        }}
      >
        {/* Left Form Column */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            padding: 24,
            border: '1px solid #E5E7EB',
          }}
        >
          {/* Step 1: Cash, Gold, Silver & Jewelry */}
          {(calcMode === 'ALL' || wizardStep === 1) && (
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1B4332', margin: '0 0 14px' }}>
                {isUrdu ? 'مرحلہ ۱: نقدی، سونا، چاندی اور زنانہ زیورات' : 'Step 1: Cash, Precious Metals & Jewelry'}
              </h3>
              <ZakatGoldSilverNisabCard
                currency={currency}
                setCurrency={setCurrency}
                goldPrice={goldPrice}
                setGoldPrice={setGoldPrice}
                silverPrice={silverPrice}
                setSilverPrice={setSilverPrice}
                nisabStandard={nisabStandard}
                setNisabStandard={setNisabStandard}
                cash={cash}
                setCash={setCash}
                goldGrams={goldGrams}
                setGoldGrams={setGoldGrams}
                silverGrams={silverGrams}
                setSilverGrams={setSilverGrams}
                jewelryTolas={jewelryTolas}
                setJewelryTolas={setJewelryTolas}
                jewelryGrams={jewelryGrams}
                setJewelryGrams={setJewelryGrams}
                jewelryKarat={jewelryKarat}
                setJewelryKarat={setJewelryKarat}
                isUrdu={isUrdu}
              />
              {calcMode === 'WIZARD' && (
                <button
                  onClick={() => setWizardStep(2)}
                  style={{
                    marginTop: 18,
                    width: '100%',
                    padding: '10px',
                    borderRadius: 8,
                    backgroundColor: '#065F46',
                    color: '#FFF',
                    fontWeight: 700,
                    fontSize: 13,
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {isUrdu ? 'اگلا مرحلہ: تجارت و شیئرز ➔' : 'Next: Business & Shares ➔'}
                </button>
              )}
            </div>
          )}

          {/* Step 2: Trade, Receivables, Shares & Crypto */}
          {(calcMode === 'ALL' || wizardStep === 2) && (
            <div style={{ marginTop: calcMode === 'ALL' ? 20 : 0 }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1B4332', margin: '0 0 14px' }}>
                {isUrdu ? 'مرحلہ ۲: مالِ تجارت، شیئرز اور کرپٹو' : 'Step 2: Business Stock, Shares & Receivables'}
              </h3>
              <ZakatAssetsDeductionsForm
                businessStock={businessStock}
                setBusinessStock={setBusinessStock}
                receivables={receivables}
                setReceivables={setReceivables}
                tradingShares={tradingShares}
                setTradingShares={setTradingShares}
                longTermShares={longTermShares}
                setLongTermShares={setLongTermShares}
                retirementAccessible={retirementAccessible}
                setRetirementAccessible={setRetirementAccessible}
                cryptoAssets={cryptoAssets}
                setCryptoAssets={setCryptoAssets}
                debts={debts}
                setDebts={setDebts}
                currency={currency}
                t={t}
              />
              {calcMode === 'WIZARD' && (
                <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
                  <button
                    onClick={() => setWizardStep(1)}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: 8,
                      backgroundColor: '#F1F5F9',
                      color: '#475569',
                      fontWeight: 700,
                      fontSize: 13,
                      border: '1px solid #CBD5E1',
                      cursor: 'pointer',
                    }}
                  >
                    {isUrdu ? '← پچھلا مرحلہ' : '← Back'}
                  </button>
                  <button
                    onClick={() => setWizardStep(3)}
                    style={{
                      flex: 2,
                      padding: '10px',
                      borderRadius: 8,
                      backgroundColor: '#065F46',
                      color: '#FFF',
                      fontWeight: 700,
                      fontSize: 13,
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {isUrdu ? 'اگلا مرحلہ: نتیجہ و قرضے ➔' : 'Next: Debts & Result ➔'}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Debts Confirmation & Guidance */}
          {calcMode === 'WIZARD' && wizardStep === 3 && (
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1B4332', margin: '0 0 14px' }}>
                {isUrdu ? 'مرحلہ ۳: واجب الادا قرضے اور حتمی خلاصہ' : 'Step 3: Immediate Debts & Final Clearance'}
              </h3>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 4 }}>
                  {isUrdu ? `واجب الادا فوری قرضے (${currency}):` : `Deductible Debts & Immediate Liabilities (${currency}):`}
                </label>
                <input
                  type="number"
                  value={debts}
                  onChange={(e) => setDebts(Number(e.target.value) || 0)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 8,
                    border: '1px solid #CBD5E1',
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                />
                <p style={{ fontSize: 11.5, color: '#64748B', marginTop: 4 }}>
                  {isUrdu
                    ? 'صرف فوری واجب الادا قرضے منہا کیے جائیں گے، ذاتی رہائشی مکان اور گاڑی کے طویل مدتی قرضے منہا نہیں ہوتے۔'
                    : 'Only immediate liabilities due now are deductible; long-term personal home mortgages are excluded in classical Hanafi Fiqh.'}
                </p>
              </div>

              <button
                onClick={() => setWizardStep(2)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: 8,
                  backgroundColor: '#F1F5F9',
                  color: '#475569',
                  fontWeight: 700,
                  fontSize: 13,
                  border: '1px solid #CBD5E1',
                  cursor: 'pointer',
                }}
              >
                {isUrdu ? '← اثاثہ جات پر واپس' : '← Back to Assets'}
              </button>
            </div>
          )}
        </div>

        {/* Right Assessment Summary Column */}
        <ZakatAssessmentSummaryCard
          zakatResult={zakatResult}
          currency={currency}
          madhhab={madhhab}
          setZakatCert={setZakatCert}
        />
      </div>
    </div>
  );
}
