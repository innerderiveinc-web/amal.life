import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import { Navigation } from '../components/Navigation';
import {
  zakatInheritanceEngine,
  ZakatInput,
  InheritanceInput,
  MirasPdfCertificatePayload,
  ZakatClearancePayload,
} from '@amal/amal-engine';
import { useLanguage } from '../context/LanguageContext';

// Modularized Calculator Subcomponents
import { ZakatCalculatorTab } from '../components/calculator/ZakatCalculatorTab';
import { MirasCalculatorTab } from '../components/calculator/MirasCalculatorTab';
import { FinancialLifecycleBar } from '../components/calculator/FinancialLifecycleBar';
import { MirasCertificateModal } from '../components/calculator/MirasCertificateModal';
import { ZakatCertificateModal } from '../components/calculator/ZakatCertificateModal';

export default function CalculatorPage() {
  const { t, isUrdu } = useLanguage();
  const [activeTab, setActiveTab] = useState<'ZAKAT' | 'MIRAS'>('ZAKAT');
  const [mirasCert, setMirasCert] = useState<MirasPdfCertificatePayload | null>(null);
  const [zakatCert, setZakatCert] = useState<ZakatClearancePayload | null>(null);

  // Zakat Form State
  const [currency, setCurrency] = useState('INR');
  const [goldPrice, setGoldPrice] = useState(7200);
  const [silverPrice, setSilverPrice] = useState(90);
  const [nisabStandard, setNisabStandard] = useState<'SILVER' | 'GOLD'>('SILVER');
  const [madhhab, setMadhhab] = useState<'HANAFI' | 'SHAFI_I' | 'MALIKI' | 'HANBALI'>('HANAFI');

  const [cash, setCash] = useState(250000);
  const [goldGrams, setGoldGrams] = useState(25);
  const [silverGrams, setSilverGrams] = useState(100);
  // Women's Personal Gold Jewelry & Karat Converter State
  const [jewelryTolas, setJewelryTolas] = useState<number>(0);
  const [jewelryGrams, setJewelryGrams] = useState<number>(0);
  const [jewelryKarat, setJewelryKarat] = useState<number>(22);
  const [businessStock, setBusinessStock] = useState(150000);
  const [receivables, setReceivables] = useState(50000);
  const [tradingShares, setTradingShares] = useState(0);
  const [longTermShares, setLongTermShares] = useState(0);
  const [retirementAccessible, setRetirementAccessible] = useState(0);
  const [cryptoAssets, setCryptoAssets] = useState(0);
  const [debts, setDebts] = useState(30000);

  const zakatResult = useMemo(() => {
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
  const [estateValue, setEstateValue] = useState(10000000);
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
        husband: hasHusband,
        wivesCount: deceasedGender === 'MALE' ? wivesCount : 0,
        sonsCount,
        daughtersCount,
        father: hasFather,
        mother: hasMother,
      },
    };
    return zakatInheritanceEngine.calculateInheritance(input);
  }, [
    estateValue,
    currency,
    deceasedGender,
    hasHusband,
    wivesCount,
    sonsCount,
    daughtersCount,
    hasFather,
    hasMother,
  ]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FA' }}>
      <Head>
        <title>Zakat & Miras (Inheritance) Calculator | AMAL OS</title>
        <meta
          name="description"
          content="Accurate Zakat calculation with Nisab thresholds and full Fara'id inheritance distribution according to classical Sunni Fiqh."
        />
      </Head>
      <Navigation />

      <main style={{ maxWidth: 1040, margin: '0 auto', padding: '0 24px 80px' }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 28 }}>⚖️</span>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1B4332', margin: 0 }}>
              Financial Fiqh: Zakat &amp; Miras Engines
            </h1>
          </div>
          <p style={{ color: '#4B5563', margin: 0, fontSize: 14 }}>
            Deterministic Islamic financial mathematics. Zero guessing, fully verified against classical Fiqh benchmarks.
          </p>
        </div>

        {/* Tab Buttons */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
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
            💰 Zakat (Purification &amp; Nisab)
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
          <ZakatCalculatorTab
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
            zakatResult={zakatResult}
            madhhab={madhhab}
            setZakatCert={setZakatCert}
            isUrdu={isUrdu}
            t={t}
          />
        )}

        {/* MIRAS (INHERITANCE) SECTION */}
        {activeTab === 'MIRAS' && (
          <MirasCalculatorTab
            estateValue={estateValue}
            setEstateValue={setEstateValue}
            currency={currency}
            deceasedGender={deceasedGender}
            setDeceasedGender={setDeceasedGender}
            wivesCount={wivesCount}
            setWivesCount={setWivesCount}
            hasHusband={hasHusband}
            setHasHusband={setHasHusband}
            sonsCount={sonsCount}
            setSonsCount={setSonsCount}
            daughtersCount={daughtersCount}
            setDaughtersCount={setDaughtersCount}
            hasFather={hasFather}
            setHasFather={setHasFather}
            hasMother={hasMother}
            setHasMother={setHasMother}
            mirasResult={mirasResult}
            setMirasCert={setMirasCert}
            isUrdu={isUrdu}
            t={t}
          />
        )}

        {/* CHANNELIZED FINANCIAL LIFECYCLE BAR */}
        <FinancialLifecycleBar />

        {/* PRINTABLE MIRAS CERTIFICATE MODAL */}
        <MirasCertificateModal
          mirasCert={mirasCert}
          onClose={() => setMirasCert(null)}
        />

        {/* PRINTABLE ZAKAT CLEARANCE MODAL */}
        <ZakatCertificateModal
          zakatCert={zakatCert}
          onClose={() => setZakatCert(null)}
        />
      </main>
    </div>
  );
}
