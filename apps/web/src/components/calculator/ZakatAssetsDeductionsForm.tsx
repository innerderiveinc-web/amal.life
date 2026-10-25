import React from 'react';

export interface ZakatAssetsDeductionsFormProps {
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
  currency: string;
  t: (en: string, ur: string) => string;
}

export const ZakatAssetsDeductionsForm: React.FC<ZakatAssetsDeductionsFormProps> = ({
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
  currency,
  t,
}) => {
  return (
    <>
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
              <span style={{ fontSize: 10, color: '#059669', fontWeight: 700 }}>
                {t('Trading Assets (`Urood al-Tijarah)', 'عروضِ تجارت')}
              </span>
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
              <span style={{ fontSize: 10, color: '#0284C7', fontWeight: 700 }}>
                {t('AAOIFI Standard / Usmani Rule', 'AAOIFI / عثمانی قاعدہ')}
              </span>
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
    </>
  );
};
