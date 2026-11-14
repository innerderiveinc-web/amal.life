import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

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
  t?: (en: string, ur: string) => string;
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
}) => {
  const { t } = useLanguage();

  return (
    <>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block' }}>
            {t(
              'Trade Merchandise (Wholesale Inventory)',
              'مالِ تجارت (تجارتی اسٹاک کی قیمتِ فروخت)',
              'عروض التجارة (قيمة بضاعة البيع بالجملة)',
              'Maal-e-Tijarat (Business Stock)'
            )}
          </label>
          <span style={{ fontSize: 11, color: '#64748B' }}>
            {t('Wholesale Value', 'تھوک قیمت', 'سعر الجملة', 'Wholesale Qeemat')}
          </span>
        </div>
        <input
          type="number"
          min="0"
          value={businessStock}
          onChange={(e) => setBusinessStock(Math.max(0, Number(e.target.value) || 0))}
          style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB', boxSizing: 'border-box' }}
        />
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block' }}>
            {t(
              'Loans Receivable (Likely to be Recovered)',
              'دیے گئے قرضے (جن کی واپسی یقینی یا متوقع ہو)',
              'الديون المرجوّة القابضة (المرجو أداؤها)',
              'Diye Gaye Qarzey (Wapsi Mutawaqqe)'
            )}
          </label>
          <span style={{ fontSize: 11, color: '#64748B' }}>
            {t('Good Debts Only', 'واپسی متوقع', 'الديون المرجوة فقط', 'Good Debts')}
          </span>
        </div>
        <input
          type="number"
          min="0"
          value={receivables}
          onChange={(e) => setReceivables(Math.max(0, Number(e.target.value) || 0))}
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
          <span>
            {t('Modern Financial Assets & Investments', 'جدید مالی اثاثے و سرمایہ کاری', 'الأصول المالية والاستثمارية المعاصرة', 'Jadeed Maali Asasay o Sarmayakari')}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3, flexWrap: 'wrap', gap: 4 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#334155' }}>
                {t(
                  'Trading Shares / Short-term Resale (100% Zakatable)',
                  'تجارتی شیئرز / قلیل مدتی فروخت (مکمل قابلِ زکوٰۃ)',
                  'أسهم المضاربة والتجارة (تزكى بنسبة ١٠٠٪)',
                  'Trading Shares / Short-term (100% Zakatable)'
                )}
              </label>
              <span style={{ fontSize: 10, color: '#059669', fontWeight: 700 }}>
                {t('`Urood al-Tijarah', 'عروضِ تجارت', 'عروض التجارة', 'Urood al-Tijarah')}
              </span>
            </div>
            <input
              type="number"
              min="0"
              value={tradingShares}
              onChange={(e) => setTradingShares(Math.max(0, Number(e.target.value) || 0))}
              placeholder={t('Market value of shares bought for trading...', 'ٹریڈنگ شیئرز کی موجودہ مارکیٹ ویلیو...', 'القيمة السوقية لأسهم المضاربة...', 'Trading shares ki market value...')}
              style={{ width: '100%', padding: '7px 10px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 13, boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3, flexWrap: 'wrap', gap: 4 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#334155' }}>
                {t(
                  'Long-Term Equity / Mutual Funds (~25% Liquid Zakatable)',
                  'طویل مدتی ڈیویڈنڈ شیئرز / میوچل فنڈز (تقریباً ۲۵٪ حصہ قابلِ زکوٰۃ)',
                  'الأسهم الاستثمارية وصناديق الاستثمار (نسبة ٢٥٪ للأصول المتداولة)',
                  'Long-Term Shares / Funds (~25% Zakatable)'
                )}
              </label>
              <span style={{ fontSize: 10, color: '#0284C7', fontWeight: 700 }}>
                {t('AAOIFI / Usmani Rule', 'AAOIFI / عثمانی قاعدہ', 'معيار أيوفي / القاعدة العثمانية', 'AAOIFI / Usmani Rule')}
              </span>
            </div>
            <input
              type="number"
              min="0"
              value={longTermShares}
              onChange={(e) => setLongTermShares(Math.max(0, Number(e.target.value) || 0))}
              placeholder={t('Total investment (25% liquid assets will be taxed)...', 'کل سرمایہ کاری درج کریں (۲۵٪ سیال اثاثوں پر حساب ہوگا)...', 'إجمالي الاستثمار (يُحسب على ٢٥٪ فقط)...', 'Kul sarmayakari (25% par hisab hoga)...')}
              style={{ width: '100%', padding: '7px 10px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 13, boxSizing: 'border-box' }}
            />
            {longTermShares > 0 && (
              <div style={{ fontSize: 10, color: '#64748B', marginTop: 2 }}>
                {t('Calculated Zakatable portion:', 'قابلِ زکوٰۃ حصہ:', 'المقدار الخاضع للزكاة:', 'Zakatable Hissa:')}{' '}
                <strong>{currency} {Math.round(longTermShares * 0.25).toLocaleString()}</strong>{' '}
                {t('(fixed plant/machinery exempt)', '(فیکٹری و فکسڈ اثاثے مستثنیٰ ہیں)', '(الأصول الثابتة معفية)', '(fixed assets mustasna hain)')}.
              </div>
            )}
          </div>

          <div className="calc-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#334155', display: 'block', marginBottom: 3 }}>
                {t('Accessible Retirement (PF / 401k)', 'پراویڈنٹ فنڈ / پنشن (قابلِ نکاسی رقم)', 'صناديق التقاعد المتاحة للسحب', 'Retirement / PF (Nikasi Raqam)')}
              </label>
              <input
                type="number"
                min="0"
                value={retirementAccessible}
                onChange={(e) => setRetirementAccessible(Math.max(0, Number(e.target.value) || 0))}
                placeholder={t('Accessible balance...', 'دستیاب رقم...', 'الرصيد المتاح...', 'Dastyab raqam...')}
                style={{ width: '100%', padding: '7px 10px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 13, boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#334155', display: 'block', marginBottom: 3 }}>
                {t('Crypto & Digital Wealth', 'کرپٹو اور ڈیجیٹل کرنسی', 'العملات الرقمية والأصول المشفرة', 'Crypto o Digital Currency')}
              </label>
              <input
                type="number"
                min="0"
                value={cryptoAssets}
                onChange={(e) => setCryptoAssets(Math.max(0, Number(e.target.value) || 0))}
                placeholder={t('Crypto value...', 'کرپٹو ویلیو...', 'قيمة العملات...', 'Crypto value...')}
                style={{ width: '100%', padding: '7px 10px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 13, boxSizing: 'border-box' }}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block' }}>
            {t(
              'Immediate Debts Payable (Deductible)',
              'فوری قابلِ ادائیگی قرضے و اخراجات (منہا ہونے والے)',
              'الديون الآنية المستحقة (تُخصم من الوعاء)',
              'Wajib-ul-Ada Qarzey (Minha Honay Walay)'
            )}
          </label>
          <span style={{ fontSize: 11, color: '#DC2626' }}>
            {t('Deductible Liabilities', 'منہا ہوں گے', 'تُخصم', 'Minha Hongey')}
          </span>
        </div>
        <input
          type="number"
          min="0"
          value={debts}
          onChange={(e) => setDebts(Math.max(0, Number(e.target.value) || 0))}
          style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB', boxSizing: 'border-box' }}
        />
      </div>
    </>
  );
};
