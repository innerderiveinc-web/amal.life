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
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 24,
      }}
    >
      {/* Input Form */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          padding: 24,
          border: '1px solid #E5E7EB',
        }}
      >
        <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1B4332', marginBottom: 16 }}>
          Wealth &amp; Nisab Parameters
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
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
        </div>
      </div>

      {/* Zakat Result Summary */}
      <ZakatAssessmentSummaryCard
        zakatResult={zakatResult}
        currency={currency}
        madhhab={madhhab}
        setZakatCert={setZakatCert}
      />
    </div>
  );
}
