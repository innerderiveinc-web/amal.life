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
          {t(
            'Deceased & Heirs Configuration',
            'میت اور شرعی ورثاء کی تفصیلات',
            'بيانات المتوفى والورثة المستحقين',
            'Mayyit aur Shar\'i Wurasa ki Tafseelat'
          )}
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
              {t(
                'Sacred Inviolability of Women\'s Inheritance (Quran & Sunnah)',
                'حرمتِ اکلِ میراثِ نسواں — خواتین کے شرعی و لازمی حقوق',
                'حرمة أكل ميراث المرأة وحقوقها الشرعية القطعية',
                'Hurmat-e-Akl-e-Miras-e-Niswan (Aurat ka Haq)'
              )}
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
              {t('Daughter: 1/2 if sole, 2/3 if multiple', 'بیٹی: اکیلی ہو تو نصف (1/2)، دو یا زیادہ ہوں تو دو تہائی (2/3)', 'البنت: النصف للواحدة، والثلثان لأكثر', 'Beti: Akeli ho to 1/2, 2 ya zyada hon to 2/3')}
            </span>
            <span style={{ backgroundColor: '#FFFFFF', padding: '2px 8px', borderRadius: 4, fontSize: 11, color: '#7F1D1D', fontWeight: 600, border: '1px solid #FECACA' }}>
              {t('Wife: 1/8 with children, 1/4 without', 'بیوی: اولاد ہو تو آٹھواں (1/8)، نہ ہو تو چوتھائی (1/4)', 'الزوجة: الثمن مع الفرع الوارث، والربع عند عدمه', 'Biwi: Aulad ho to 1/8, na ho to 1/4')}
            </span>
            <span style={{ backgroundColor: '#FFFFFF', padding: '2px 8px', borderRadius: 4, fontSize: 11, color: '#7F1D1D', fontWeight: 600, border: '1px solid #FECACA' }}>
              {t('Mother: 1/6 with children, 1/3 without', 'ماں: اولاد ہو تو چھٹا (1/6)، نہ ہو تو تہائی (1/3)', 'الأم: السدس مع الفرع الوارث، والثلث عند عدمه', 'Maa: Aulad ho to 1/6, na ho to 1/3')}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563' }}>
                {t('Net Estate Value', 'ترکہ کی خالص مالیت', 'صافي التركة القابلة للقسمة', 'Tarkay ki Khalis Maliyat')} ({currency})
              </label>
              <span style={{ fontSize: 11, color: '#64748B' }}>
                {t('After debts & funeral', 'تجہیز و تکفین اور قرض بعد', 'بعد الديون والتجهيز', 'Tajheez o qarz ke baad')}
              </span>
            </div>
            <input
              type="number"
              min={0}
              value={estateValue}
              onChange={(e) => setEstateValue(Math.max(0, Number(e.target.value)))}
              style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB', boxSizing: 'border-box' }}
            />
            <span style={{ fontSize: 11, color: '#6B7280', marginTop: 3, display: 'block' }}>
              {t(
                'After funeral expenses, debts, and max 1/3 Wasiyyah (will).',
                'کفن دفن کے اخراجات، قرضوں کی ادائیگی اور زیادہ سے زیادہ ۱/۳ جائز وصیت کے بعد۔',
                'بعد مصاريف التجهيز وقضاء الديون وإنفاذ الوصية في حدود الثلث.',
                'Kafan dafan ke ikhrajat, qarz ki adayegi aur 1/3 wasiyyah ke baad.'
              )}
            </span>
          </div>

          <div className="calc-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>
                {t('Deceased Gender', 'میت کی جنس', 'جنس المتوفى', 'Mayyit ki Jins')}
              </label>
              <select
                value={deceasedGender}
                onChange={(e) => setDeceasedGender(e.target.value as ('MALE' | 'FEMALE'))}
                style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB' }}
              >
                <option value="MALE">
                  {t('Male (Leaves Wife/Wives)', 'مرد (بیوی/بیویاں وارث ہیں)', 'ذكر (يترك زوجة / زوجات)', 'Mard (Biwi / Biwiyan)')}
                </option>
                <option value="FEMALE">
                  {t('Female (Leaves Husband)', 'عورت (شوہر وارث ہے)', 'أنثى (تترك زوجاً)', 'Aurat (Shohar Waris Hai)')}
                </option>
              </select>
            </div>
            <div>
              {deceasedGender === 'MALE' ? (
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>
                    {t('Surviving Wives (1-4)', 'حیات بیویاں (۱ تا ۴)', 'الزوجات الباقيات (١-٤)', 'Hayat Biwiyan (1-4)')}
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={4}
                    value={wivesCount}
                    onChange={(e) => setWivesCount(Math.min(4, Math.max(0, Number(e.target.value))))}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB', boxSizing: 'border-box' }}
                  />
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', height: '100%', paddingTop: 16 }}>
                  <label style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontWeight: 600, color: '#334155' }}>
                    <input
                      type="checkbox"
                      checked={hasHusband}
                      onChange={(e) => setHasHusband(e.target.checked)}
                    />
                    {t('Husband Survives', 'شوہر باحیات ہے', 'الزوج على قيد الحياة', 'Shohar Hayat Hai')}
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="calc-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>
                {t('Sons Count', 'بیٹوں کی تعداد', 'عدد الأبناء (ذكور)', 'Beton ki Taadad')}
              </label>
              <input
                type="number"
                min={0}
                value={sonsCount}
                onChange={(e) => setSonsCount(Math.max(0, Number(e.target.value)))}
                style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>
                {t('Daughters Count', 'بیٹیوں کی تعداد', 'عدد البنات (إناث)', 'Betiyon ki Taadad')}
              </label>
              <input
                type="number"
                min={0}
                value={daughtersCount}
                onChange={(e) => setDaughtersCount(Math.max(0, Number(e.target.value)))}
                style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <label style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontWeight: 600, color: '#334155' }}>
              <input
                type="checkbox"
                checked={hasFather}
                onChange={(e) => setHasFather(e.target.checked)}
              />
              {t('Father Survives', 'والد باحیات ہیں', 'الأب على قيد الحياة', 'Walid Hayat Hain')}
            </label>
            <label style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontWeight: 600, color: '#334155' }}>
              <input
                type="checkbox"
                checked={hasMother}
                onChange={(e) => setHasMother(e.target.checked)}
              />
              {t('Mother Survives', 'والدہ باحیات ہیں', 'الأم على قيد الحياة', 'Walida Hayat Hain')}
            </label>
          </div>
        </div>
      </div>

      {/* Fara'id Distribution Breakdown */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 24, border: '1px solid #E5E7EB' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4, flexWrap: 'wrap', gap: 6 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1B4332', margin: 0 }}>
            {t(
              'Canonical Quranic Shares (Zawil-Furood)',
              'قرآنی و شرعی حصص (ذوی الفروض و عصبات)',
              'السهام الشرعية القرآنية (أصحاب الفروض والعصبات)',
              'Qurani Hissay (Zawil-Furood o Asabat)'
            )}
          </h2>
          <span
            title={t(
              'Zawil-Furood are heirs with fixed shares explicitly ordained by Allah in the Quran (1/2, 1/4, 1/8, 2/3, 1/3, 1/6). Asabah receive the remainder.',
              'ذوی الفروض وہ وارث ہیں جن کے متعین حصے قرآن میں بیان ہوئے ہیں (1/2، 1/4، 1/8، 2/3، 1/3، 1/6)۔ عصبات وہ ہیں جو بچا ہوا ترکہ لیتے ہیں۔',
              'أصحاب الفروض هم الورثة المقدرة سهامهم بنص القرآن الكريم، والعصبة هم الذين يأخذون الباقي.',
              'Zawil-Furood wo waris hain jinke hissay Quran mein muqarrar hain. Asabah baqi bacha hissa letay hain.'
            )}
            style={{ fontSize: 11, color: '#047857', cursor: 'help', fontWeight: 600 }}
          >
            ℹ️ {t('What is Zawil-Furood?', 'ذوی الفروض کیا ہے؟', 'ما هم أصحاب الفروض؟', 'Zawil-Furood kya hai?')}
          </span>
        </div>
        <p style={{ fontSize: 12, color: '#6B7280', marginBottom: 16 }}>
          {t(
            'Calculated according to the divine ordinances in Surah An-Nisa (4:11-12, 4:176).',
            'سورۃ النساء (آیات ۱۱-۱۲، ۱۷۶) کے قطعی قرآنی احکامات کے مطابق حساب شدہ۔',
            'حُسبت وفق الفرائض القطعية في سورة النساء (الآيات: ١١-١٢، ١٧٦).',
            'Surah An-Nisa (Ayat 11-12, 176) ke qat\'i ehkaam ke mutabiq hisab.'
          )}
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
                  {t('Fraction:', 'حصہ:', 'الفرض:', 'Hissa:')} <strong>{heir.quranicFraction}</strong> ({heir.percentage}%) • {heir.shareType}
                </div>
                <div style={{ fontSize: 10, color: '#6B7280', fontStyle: 'italic' }}>
                  {t('Ref:', 'حوالہ:', 'المرجع:', 'Ref:')} {heir.basisQuranVerse}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 800, color: '#1B4332', fontSize: 16 }}>
                  {currency} {heir.totalAmount.toLocaleString()}
                </div>
                {heir.count > 1 && (
                  <div style={{ fontSize: 11, color: '#6B7280' }}>
                    {t('Each:', 'ہر ایک:', 'لكل واحد:', 'Har ek:')} {currency} {heir.individualAmount.toLocaleString()}
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
              <span>
                {t(
                  'The Classical Doctrine of Exclusion (Al-Hajb)',
                  'قواعدِ حجب (اصولِ محرومی و تخفیفِ وراثت)',
                  'قواعد الحجب في فقه المواريث (الحرمان والنقصان)',
                  'Qawaid-e-Hajb (Usool-e-Mahroomi o Takhfeef)'
                )}
              </span>
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
          ⚖️ <strong>{t('Scholarly Guidance:', 'علمی و شرعی رہنمائی:', 'توجيه علمي وشرعي:', 'Ilmi o Shar\'i Rehnumai:')}</strong>{' '}
          {t(
            'This calculation is based on classical Quranic principles and authenticated jurisprudence. For complex disputes or court distributions, please verify with your local certified Dar-ul-Ifta.',
            'یہ تخمینہ قرآن و سنت کے بنیادی اصولوں پر مبنی ہے۔ خاندانی پیچیدہ وراثت، تنازعات یا عدالتی تقسیم سے قبل اپنے مقامی دار الافتاء یا مستند مفتی کرام سے حتمی توثیق ضرور حاصل فرمائیں۔',
            'هذه القسمة مبنية على الأصول القرآنية القطعية. وللمسائل المعقدة أو التقسيم القضائي، يرجى مراجعة دار الإفتاء المعتمدة.',
            'Yeh hisab Quran o Sunnah ke bunyadi usoolon par mabni hai. Pechida khandani mamlaat ke liye mustanad Dar-ul-Ifta se rujoo karein.'
          )}
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
            showAmalToast(
              t(
                'Shar\'i Miras & Fara\'id Certificate generated',
                'شرعی میراث و فرائض سرٹیفکیٹ تیار ہو گیا',
                'تم إنشاء شهادة قسمة المواريث والفرائض الشرعية',
                'Shar\'i Miras o Fara\'id Certificate tayyar ho gaya'
              ),
              'success'
            );
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
          📄{' '}
          {t(
            'Export Shar\'i Miras & Fara\'id Distribution Certificate (PDF)',
            'شرعی وراثت و فرائض کی تقسیم کا سرٹیفکیٹ حاصل کریں (پی ڈی ایف)',
            'استخراج وثيقة توزيع الميراث والفرائض الشرعية بصيغة PDF',
            'Shar\'i Miras o Fara\'id Certificate (PDF) Hasil Karein'
          )}
        </button>
      </div>
    </div>
  );
}
