import React from 'react';
import { InheritanceCalculationResult, shariPdfExportEngine, MirasPdfCertificatePayload } from '@amal/amal-engine';
import { showAmalToast } from '../Toast';
import { useLanguage } from '../../context/LanguageContext';

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
  isUrdu?: boolean;
  t?: (en: string, ur?: string, ar?: string, roman?: string) => string;
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
}: MirasCalculatorTabProps) {
  const { t } = useLanguage();
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
              {t('Sacred Inviolability of Women\'s Inheritance (Quran & Sunnah)', 'حرمتِ اکلِ میراثِ نسواں — خواتین کے شرعی و لازمی حقوق', 'حرمة أكل ميراث المرأة وحقوقها الشرعية القطعية', 'Hurmat-e-Akl-e-Miras-e-Niswan')}
            </strong>
          </div>
          <p style={{ margin: '0 0 8px', fontSize: 12, color: '#374151', lineHeight: 1.5 }}>
            {t(
              'Allah Almighty has divinely decreed the protected legal shares of mothers, wives, daughters, and sisters in Surah An-Nisa (4:7-14). Disinheriting women or coercing them into forfeiting their inheritance is an unforgivable injustice.',
              'اللہ تعالیٰ نے قرآن کریم میں ماؤں، بیٹیوں، بیویوں اور بہنوں کا حصہ خود مقرر فرمایا ہے۔ شریعت میں عورت کے حصے کو دبا لینا، محروم کرنا یا زبردستی معاف کروانا گناہِ کبیرہ اور جہنم کی سخت وعید کا موجب ہے۔ (فتاویٰ رضویہ، جلد ۲۶)',
              'فرض الله سبحانه في سورة النساء حصص الأمهات والزوجات والبنات والأخوات. وحرمان المرأة من ميراثها أو إجبارها على التنازل عنه من كبائر الإثم وظلم مبين.',
              'Allah Ta\'ala ne Quran Majeed mein aurton ke hissay khud muqarrar farmaye hain. Shariat mein aurat ke hissay ko daba lena gunah-e-kabeera hai.'
            )}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            <span style={{ backgroundColor: '#FFFFFF', padding: '2px 8px', borderRadius: 4, fontSize: 11, color: '#7F1D1D', fontWeight: 600, border: '1px solid #FECACA' }}>
              {t('Daughter\'s Share: 1/2 if sole, 2/3 if multiple', 'بیٹی کا حصہ: اکیلی ہو تو نصف (1/2)، دو یا زیادہ ہوں تو دو تہائی (2/3)', 'نصيب البنت: النصف للواحدة، والثلثان لأكثر', 'Beti Ka Hissa: Akeli ho to 1/2, do ya zyada hon to 2/3')}
            </span>
            <span style={{ backgroundColor: '#FFFFFF', padding: '2px 8px', borderRadius: 4, fontSize: 11, color: '#7F1D1D', fontWeight: 600, border: '1px solid #FECACA' }}>
              {t('Wife\'s Share: 1/8 with children, 1/4 without', 'بیوی کا حصہ: اولاد ہو تو آٹھواں (1/8)، نہ ہو تو چوتھائی (1/4)', 'نصيب الزوجة: الثمن مع الفرع الوارث، والربع عند عدمه', 'Biwi Ka Hissa: Aulad ho to 1/8, na ho to 1/4')}
            </span>
            <span style={{ backgroundColor: '#FFFFFF', padding: '2px 8px', borderRadius: 4, fontSize: 11, color: '#7F1D1D', fontWeight: 600, border: '1px solid #FECACA' }}>
              {t('Mother\'s Share: 1/6 with children, 1/3 without', 'ماں کا حصہ: اولاد ہو تو چھٹا (1/6)، نہ ہو تو تہائی (1/3)', 'نصيب الأم: السدس مع الفرع الوارث، والثلث عند عدمه', 'Maa Ka Hissa: Aulad ho to 1/6, na ho to 1/3')}
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
                onChange={(e) => setDeceasedGender(e.target.value as ('MALE' | 'FEMALE'))}
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

        {/* DOCTRINE OF INHERITANCE EXCLUSION (قواعد حجبِ میراث) */}
        <div
          style={{
            marginTop: 16,
            padding: 16,
            borderRadius: 10,
            backgroundColor: '#F8FAFC',
            border: '1px solid #CBD5E1',
            fontSize: 12,
            lineHeight: 1.6,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>⚖️</span>
              <span>{t('The Classical Doctrine of Exclusion (Al-Hajb)', 'قواعدِ حجب (اصولِ محرومی و تخفیفِ وراثت)', 'قواعد الحجب في فقه المواريث (الحرمان والنقصان)', 'Qawaid-e-Hajb (Usool-e-Mahroomi o Takhfeef)')}</span>
            </span>
            <span style={{ fontSize: 10, backgroundColor: '#E2E8F0', padding: '2px 6px', borderRadius: 4, fontWeight: 700, color: '#334155' }}>
              {t('Classical Hanafi Fiqh (Al-Sirajiyyah)', 'فقہ الفرائض (السراجی)', 'فقه الفرائض (السراجية)', 'Fiqh-ul-Faraiz (Al-Sirajiyyah)')}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, color: '#334155' }}>
            <div style={{ backgroundColor: '#FFFFFF', padding: 8, borderRadius: 6, border: '1px solid #E2E8F0' }}>
              <strong style={{ color: '#065F46' }}>
                {t('1. Hajb al-Nuqsan (Reduction of Share):', '۱. حجبِ نقصان (حصے میں تخفیف):', '١. حجب النقصان (تقليل النصيب):', '1. Hajb al-Nuqsan (Hissay Mein Takhfeef):')}
              </strong>
              <div style={{ marginTop: 2 }}>
                {t(
                  'Children reduce the Wife\'s share from 1/4 to 1/8, the Husband\'s from 1/2 to 1/4, and the Mother\'s from 1/3 to 1/6.',
                  'اولاد کی موجودگی میں بیوی کا حصہ 1/4 سے گھٹ کر 1/8، شوہر کا حصہ 1/2 سے گھٹ کر 1/4، اور ماں کا حصہ 1/3 سے گھٹ کر 1/6 ہو جاتا ہے۔',
                  'ينقص الفرع الوارث نصيب الزوجة من الربع للثمن، والزوج من النصف للربع، والأم من الثلث للسدس.',
                  'Aulad ki maujoodgi mein biwi ka hissa 1/4 se ghat kar 1/8, shohar ka 1/2 se 1/4, aur maa ka 1/3 se 1/6 ho jata hai.'
                )}
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', padding: 8, borderRadius: 6, border: '1px solid #E2E8F0' }}>
              <strong style={{ color: '#991B1B' }}>
                {t('2. Hajb al-Hirman (Total Exclusion):', '۲. حجبِ حرمان (مکمل محرومی):', '٢. حجب الحرمان (المنع التام):', '2. Hajb al-Hirman (Mukammal Mahroomi):')}
              </strong>
              <div style={{ marginTop: 2 }}>
                {t(
                  'Father excludes Grandfather; Son excludes Grandchildren; Father or Son completely excludes all brothers and sisters.',
                  'باپ کی موجودگی میں دادا محروم ہو جاتا ہے؛ بیٹے کی موجودگی میں پوتے/پوتیاں محروم ہو جاتے ہیں؛ باپ یا بیٹے کی موجودگی میں سگے اور سوتیلے بھائی بہن مکمل محروم ہو جاتے ہیں۔',
                  'يحجب الأبُ الجدَّ، والابنُ ابنَ الابن، ويحجب الأبُ أو الابنُ الإخوةَ والأخواتِ جميعاً.',
                  'Baap ki maujoodgi mein dada mahroom hota hai; betay ki maujoodgi mein potay/potiyan; baap ya betay se bhai behan mahroom ho jatay hain.'
                )}
              </div>
            </div>

            <div style={{ backgroundColor: '#ECFDF5', padding: 8, borderRadius: 6, border: '1px solid #A7F3D0', color: '#064E3B' }}>
              <strong>
                {t('Six Heirs Who Can NEVER Be Excluded:', 'چھ وارث جو کبھی محروم نہیں ہوتے:', 'ستة ورثة لا يُحجبون حجب حرمان أبداً:', 'Chhe Waris Jo Kabhi Mahroom Nahi Hotay:')}
              </strong>
              <div style={{ marginTop: 2, fontSize: 11 }}>
                {t(
                  'Father, Mother, Son, Daughter, Husband, and Wife. Their right to inheritance is absolute under divine law.',
                  'باپ، ماں، بیٹا، بیٹی، شوہر اور بیوی۔ شریعت میں ان چھ کا حقِ وراثت حتمی اور ناقابلِ سلب ہے۔',
                  'الأب والأم والابن والبنت والزوج والزوجة. حقهم في الميراث قطعي ثابت بالقرآن.',
                  'Baap, Maa, Beta, Beti, Shohar aur Biwi. Shariat mein in chhe ka haq-e-wirathat hatmi hai.'
                )}
              </div>
            </div>
          </div>
        </div>

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
