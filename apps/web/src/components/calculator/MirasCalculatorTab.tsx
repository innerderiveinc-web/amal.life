import React from 'react';
import { InheritanceCalculationResult, shariPdfExportEngine, MirasPdfCertificatePayload } from '@amal/amal-engine';
import { showAmalToast } from '../Toast';

interface MirasCalculatorTabProps {
  estateValue: number;
  setEstateValue: (val: number) => void;
  currency: string;
  deceasedGender: 'MALE' | 'FEMALE';
  setDeceasedGender: (g: 'MALE' | 'FEMALE') => void;
  wivesCount: number;
  setWivesCount: (count: number) => void;
  hasHusband: boolean;
  setHasHusband: (has: boolean) => void;
  sonsCount: number;
  setSonsCount: (count: number) => void;
  daughtersCount: number;
  setDaughtersCount: (count: number) => void;
  hasFather: boolean;
  setHasFather: (has: boolean) => void;
  hasMother: boolean;
  setHasMother: (has: boolean) => void;
  mirasResult: InheritanceCalculationResult;
  setMirasCert: (cert: MirasPdfCertificatePayload | null) => void;
  isUrdu: boolean;
  t: (en: string, ur: string) => string;
}

export function MirasCalculatorTab({
  estateValue,
  setEstateValue,
  currency,
  deceasedGender,
  setDeceasedGender,
  wivesCount,
  setWivesCount,
  hasHusband,
  setHasHusband,
  sonsCount,
  setSonsCount,
  daughtersCount,
  setDaughtersCount,
  hasFather,
  setHasFather,
  hasMother,
  setHasMother,
  mirasResult,
  setMirasCert,
  isUrdu,
  t,
}: MirasCalculatorTabProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
      {/* Estate & Heirs Input */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 24, border: '1px solid #E5E7EB' }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1B4332', marginBottom: 16 }}>
          Deceased & Heirs Configuration
        </h2>

        {/* SACRED INVIOLABILITY OF WOMEN'S INHERITANCE IN SHARIAH */}
        <div
          style={{
            backgroundColor: '#FEF2F2',
            border: '1px solid #FECACA',
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 20 }}>📜</span>
            <strong style={{ fontSize: 14, color: '#991B1B' }}>
              {isUrdu ? 'حرمتِ اکلِ میراثِ نسواں — خواتین کے شرعی و لازمی حقوق' : 'Sacred Inviolability of Women\'s Inheritance (Quran & Sunnah)'}
            </strong>
          </div>
          <p style={{ margin: '0 0 8px', fontSize: 12, color: '#374151', lineHeight: 1.5 }}>
            {isUrdu
              ? 'اللہ تعالیٰ نے قرآن کریم میں ماؤں، بیٹیوں، بیویوں اور بہنوں کا حصہ خود مقرر فرمایا ہے۔ شریعت میں عورت کے حصے کو دبا لینا، محروم کرنا یا زبردستی معاف کروانا گناہِ کبیرہ اور جہنم کی سخت وعید کا موجب ہے۔ (فتاویٰ رضویہ، جلد ۲۶)'
              : 'Allah Almighty has divinely decreed the protected legal shares of mothers, wives, daughters, and sisters in Surah An-Nisa (4:7-14). Disinheriting women or coercing them into forfeiting their inheritance is an unforgivable injustice.'}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            <span style={{ backgroundColor: '#FFFFFF', padding: '2px 8px', borderRadius: 4, fontSize: 11, color: '#7F1D1D', fontWeight: 600, border: '1px solid #FECACA' }}>
              بیٹی کا حصہ: اکیلی ہو تو نصف (1/2)، دو یا زیادہ ہوں تو دو تہائی (2/3)
            </span>
            <span style={{ backgroundColor: '#FFFFFF', padding: '2px 8px', borderRadius: 4, fontSize: 11, color: '#7F1D1D', fontWeight: 600, border: '1px solid #FECACA' }}>
              بیوی کا حصہ: اولاد ہو تو آٹھواں (1/8)، نہ ہو تو چوتھائی (1/4)
            </span>
            <span style={{ backgroundColor: '#FFFFFF', padding: '2px 8px', borderRadius: 4, fontSize: 11, color: '#7F1D1D', fontWeight: 600, border: '1px solid #FECACA' }}>
              ماں کا حصہ: اولاد ہو تو چھٹا (1/6)، نہ ہو تو تہائی (1/3)
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>
              Net Estate Value ({currency})
            </label>
            <input
              type="number"
              value={estateValue}
              onChange={(e) => setEstateValue(Number(e.target.value))}
              style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB', boxSizing: 'border-box' }}
            />
            <span style={{ fontSize: 11, color: '#6B7280' }}>After funeral expenses, debts, and max 1/3 Wasiyyah.</span>
          </div>

          <div className="calc-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
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
                    style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB', boxSizing: 'border-box' }}
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

          <div className="calc-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>Sons Count</label>
              <input
                type="number"
                min={0}
                value={sonsCount}
                onChange={(e) => setSonsCount(Number(e.target.value))}
                style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>Daughters Count</label>
              <input
                type="number"
                min={0}
                value={daughtersCount}
                onChange={(e) => setDaughtersCount(Number(e.target.value))}
                style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB', boxSizing: 'border-box' }}
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
          ⚖️ <strong>{t('Scholarly & Legal Guidance:', 'علمی و شرعی رہنمائی:')}</strong> {t('This calculation is based on classical Quranic principles and authenticated jurisprudence. For complex disputes or court distributions, please verify with your local certified Dar-ul-Ifta.', 'یہ تخمینہ قرآن و سنت کے بنیادی اصولوں پر مبنی ہے۔ خاندانی پیچیدہ وراثت، تنازعات یا عدالتی تقسیم سے قبل اپنے مقامی دار الافتاء یا مستند مفتی کرام سے حتمی توثیق ضرور حاصل فرمائیں۔')}
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
  );
}
