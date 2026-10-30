import React from 'react';
import { HanafiCycleCalculationResult } from '../../lib/women-sanctuary-data';
import { useLanguage } from '../../context/LanguageContext';

export interface HanafiCycleCalculatorCardProps {
  isUrdu?: boolean;
  calcTotalDays: number;
  calcHabitDays: number;
  calcResult: HanafiCycleCalculationResult;
  setCalcTotalDays: (days: number) => void;
  setCalcHabitDays: (days: number) => void;
}

export const HanafiCycleCalculatorCard: React.FC<HanafiCycleCalculatorCardProps> = ({
  calcTotalDays,
  calcHabitDays,
  calcResult,
  setCalcTotalDays,
  setCalcHabitDays,
}) => {
  const { isUrdu, isRomanUrdu, t } = useLanguage();

  const getStatusText = () => {
    if (isRomanUrdu) return calcResult.statusRomanUrdu || calcResult.statusUrdu;
    if (isUrdu) return calcResult.statusUrdu;
    return calcResult.statusEnglish;
  };

  const getPrayerRuling = () => {
    if (isRomanUrdu) return calcResult.prayerRulingsRomanUrdu || calcResult.prayerRulingsUrdu;
    if (isUrdu) return calcResult.prayerRulingsUrdu;
    return calcResult.prayerRulingsEnglish;
  };

  const getGhuslObligation = () => {
    if (isRomanUrdu) return calcResult.ghuslObligationRomanUrdu || calcResult.ghuslObligationUrdu;
    if (isUrdu) return calcResult.ghuslObligationUrdu;
    return calcResult.ghuslObligationEnglish;
  };

  const getPrescriptions = () => {
    if (isRomanUrdu && calcResult.spiritualPrescriptionRomanUrdu) {
      return calcResult.spiritualPrescriptionRomanUrdu;
    }
    if (isUrdu) return calcResult.spiritualPrescriptionUrdu;
    return calcResult.spiritualPrescriptionEnglish || calcResult.spiritualPrescriptionUrdu;
  };
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 24,
        border: '2px solid #065F46',
        boxShadow: '0 6px 16px rgba(6, 95, 70, 0.08)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <span style={{ fontSize: 24 }}>⚖️</span>
        <div>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#064E3B' }}>
            {t(
              'Hanafi Cycle Fiqh Calculator & Decision Assistant',
              'آلۂ احتسابِ حیض و استحاضہ (فقہ حنفی و بہارِ شریعت)',
              'حاسبة فقه الحيض والاستحاضة (الفقه الحنفي)',
              'Hanafi Cycle Fiqh Calculator (Bahar-e-Shari\'at)'
            )}
          </h3>
          <p style={{ margin: '2px 0 0', fontSize: 13, color: '#4B5563' }}>
            {t(
              'Enter your total bleeding days and normal habit to calculate precise rulings on prayer exemption, Ghusl, and Qadha according to Bahar-e-Shari\'at.',
              'اپنے خون کے کل دن اور معمول کی عادت درج کر کے بہارِ شریعت کے مطابق نماز، غسل اور روزے کا قطعی حکم معلوم کریں۔',
              'أدخلي مجموع أيام الدم والعادة المعتادة لحساب الأحكام الدقيقة للصلاة والغسل والقضاء وفق بهار شريعت.',
              'Apne khoon ke kul din aur mamool ki aadat darj kar ke Bahar-e-Shari\'at ke mutabiq namaz, ghusl aur roze ka qat\'i hukm maloom karein.'
            )}
          </p>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
          backgroundColor: '#F9FAFB',
          padding: 16,
          borderRadius: 12,
          marginBottom: 16,
          border: '1px solid #E5E7EB',
        }}
      >
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
            {t('Total Bleeding Days:', 'خون کے کل دن (Total Days):', 'مجموع أيام الدم:', 'Khoon ke Kul Din (Total Days):')}
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <input
              type="range"
              min="1"
              max="20"
              value={calcTotalDays}
              onChange={(e) => setCalcTotalDays(parseInt(e.target.value) || 1)}
              style={{ flex: 1, accentColor: '#065F46' }}
            />
            <span
              style={{
                minWidth: 44,
                padding: '4px 10px',
                backgroundColor: '#064E3B',
                color: '#FFFFFF',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 800,
                textAlign: 'center',
              }}
            >
              {calcTotalDays}
            </span>
          </div>
          <span style={{ fontSize: 11, color: '#6B7280' }}>
            {t(
              'Hanafi range: 3 to 10 days',
              'کم سے کم ۳ دن، زیادہ سے زیادہ ۱۰ دن',
              'المدى الحنفي: من ٣ إلى ١٠ أيام',
              'Kam se kam 3 din, zyada se zyada 10 din'
            )}
          </span>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
            {t(
              'Your Normal Habit Days:',
              'معمول کی سابقہ عادت (Normal Habit):',
              'أيام العادة السابقة:',
              'Mamool ki Sabiqa Aadat (Habit Days):'
            )}
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <input
              type="range"
              min="3"
              max="10"
              value={calcHabitDays}
              onChange={(e) => setCalcHabitDays(parseInt(e.target.value) || 3)}
              style={{ flex: 1, accentColor: '#D97706' }}
            />
            <span
              style={{
                minWidth: 44,
                padding: '4px 10px',
                backgroundColor: '#D97706',
                color: '#FFFFFF',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 800,
                textAlign: 'center',
              }}
            >
              {calcHabitDays}
            </span>
          </div>
          <span style={{ fontSize: 11, color: '#6B7280' }}>
            {t(
              'Default standard habit: 6 days',
              'اگر عادت معلوم نہیں تو عام عادت ۶ دن ہے',
              'العادة الافتراضية إذا لم تعلم: ٦ أيام',
              'Agar aadat maloom nahi to aam aadat 6 din hai'
            )}
          </span>
        </div>
      </div>

      {/* Calculation Verdict Result Card */}
      <div
        style={{
          backgroundColor:
            calcResult.status === 'VALID_HAIDH'
              ? '#ECFDF5'
              : calcResult.status === 'EXCESS_ISTIHADHA'
              ? '#FFFBEB'
              : '#FEF2F2',
          border: `1px solid ${
            calcResult.status === 'VALID_HAIDH'
              ? '#A7F3D0'
              : calcResult.status === 'EXCESS_ISTIHADHA'
              ? '#FDE68A'
              : '#FECACA'
          }`,
          borderRadius: 12,
          padding: 18,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
          <span
            style={{
              padding: '4px 10px',
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 800,
              backgroundColor:
                calcResult.status === 'VALID_HAIDH'
                  ? '#065F46'
                  : calcResult.status === 'EXCESS_ISTIHADHA'
                  ? '#B45309'
                  : '#991B1B',
              color: '#FFFFFF',
            }}
          >
            {calcResult.status === 'VALID_HAIDH'
              ? t('✓ Valid Haidh', '✓ حیضِ شرعی (Valid Haidh)', '✓ حيض شرعي صحيح', '✓ Haidh-e-Shar\'i (Valid Haidh)')
              : calcResult.status === 'EXCESS_ISTIHADHA'
              ? t('⚠️ Habit Exceeded (Istihadha)', '⚠️ عادت سے تجاوز (استحاضہ)', '⚠️ تجاوز العادة (استحاضة)', '⚠️ Aadat se Tajawuz (Istihadha)')
              : t('⚠️ Deficient Bleeding (Istihadha)', '⚠️ ۳ دن سے کم (استحاضہ)', '⚠️ أقل من ٣ أيام (استحاضة)', '⚠️ 3 Din se Kam (Istihadha)')}
          </span>
          <span style={{ fontSize: 12, color: '#4B5563', fontWeight: 600 }}>
            {t('Source:', 'ماخذ:', 'المصدر:', 'Makhaz:')} {calcResult.referenceText}
          </span>
        </div>

        <h4 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 800, color: '#1F2937' }}>
          {getStatusText()}
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10, margin: '12px 0' }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: 10, borderRadius: 8, border: '1px solid rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 11, color: '#6B7280', fontWeight: 700 }}>
              {t('Prayer Status:', 'نماز کا شرعی حکم:', 'حكم الصلاة:', 'Namaz ka Shar\'i Hukm:')}
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: calcResult.qadhaSalahRequired ? '#DC2626' : '#059669', marginTop: 2 }}>
              {getPrayerRuling()}
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: 10, borderRadius: 8, border: '1px solid rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 11, color: '#6B7280', fontWeight: 700 }}>
              {t('Ghusl Obligation:', 'غسل کی شرعی ذمہ داری:', 'وجوب الغسل:', 'Ghusl ki Shar\'i Zimmedari:')}
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937', marginTop: 2 }}>
              {getGhuslObligation()}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 10, fontSize: 13, color: '#374151', lineHeight: 1.6 }}>
          <strong>{t('Practical Directives:', 'فقہی احتیاطیں و ہدایات:', 'الإرشادات العملية:', 'Fiqhi Ehtiyat wa Hidayat:')}</strong>
          <ul style={{ margin: '4px 0 0', paddingInlineStart: 18 }}>
            {getPrescriptions().map((presc, idx) => (
              <li key={idx}>{presc}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
