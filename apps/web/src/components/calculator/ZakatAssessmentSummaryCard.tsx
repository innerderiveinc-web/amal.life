import React from 'react';
import {
  DetailedZakatCalculationResult,
  shariPdfExportEngine,
  ZakatClearancePayload,
} from '@amal/amal-engine';
import { showAmalToast } from '../Toast';
import { useLanguage } from '../../context/LanguageContext';

export interface ZakatAssessmentSummaryCardProps {
  zakatResult: DetailedZakatCalculationResult;
  currency: string;
  madhhab: 'HANAFI' | 'SHAFI_I' | 'MALIKI' | 'HANBALI';
  setZakatCert: (cert: ZakatClearancePayload | null) => void;
}

export const ZakatAssessmentSummaryCard: React.FC<ZakatAssessmentSummaryCardProps> = ({
  zakatResult,
  currency,
  madhhab,
  setZakatCert,
}) => {
  const { t } = useLanguage();

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 24,
        border: '1px solid #E5E7EB',
      }}
    >
      <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1B4332', marginBottom: 16 }}>
        {t(
          'Zakat Assessment & Obligation',
          'زکوٰۃ کا حتمی تخمینہ و وجوب',
          'التقييم الشرعي للزكاة والواجب أداؤه',
          'Zakat Assessment o Wujoob'
        )}
      </h2>

      <div
        style={{
          padding: 16,
          borderRadius: 8,
          backgroundColor: zakatResult.isEligibleForZakat ? '#F0FDF4' : '#FEF2F2',
          border: zakatResult.isEligibleForZakat ? '1px solid #86EFAC' : '1px solid #FECACA',
          marginBottom: 20,
        }}
      >
        <div
          style={{
            fontSize: 13,
            color: zakatResult.isEligibleForZakat ? '#166534' : '#991B1B',
            fontWeight: 700,
          }}
        >
          {zakatResult.isEligibleForZakat
            ? t(
                '✓ NISAB EXCEEDED — ZAKAT IS WAJIB (OBLIGATORY)',
                '✓ مال نصاب سے زائد ہے — زکوٰۃ فرض و واجب ہے',
                '✓ بلغ النصاب وحال عليه الحول — الزكاة واجبة شرعاً',
                '✓ Nisab Se Zayd Hai — Zakat Wajib Hai'
              )
            : t(
                '✗ BELOW NISAB — NO ZAKAT DUE',
                '✗ مال نصاب سے کم ہے — فی الحال زکوٰۃ واجب نہیں',
                '✗ دون النصاب — لا تجب الزكاة',
                '✗ Nisab Se Kam Hai — Zakat Wajib Nahi'
              )}
        </div>
        <div style={{ fontSize: 32, fontWeight: 900, color: '#1B4332', marginTop: 8 }}>
          {currency} {zakatResult.zakatDue.toLocaleString()}
        </div>
        <div style={{ fontSize: 12, color: '#4B5563', marginTop: 4 }}>
          {t(
            `2.5% (1/40th) of net wealth above Nisab threshold (${currency} ${zakatResult.nisabValue.toLocaleString()})`,
            `نصاب (${currency} ${zakatResult.nisabValue.toLocaleString()}) سے زائد خالص دولت کا ۲.۵٪ (چالیسواں حصہ)`,
            `٢.٥٪ (ربع العشر) من صافي الثروة البالغة للنصاب (${currency} ${zakatResult.nisabValue.toLocaleString()})`,
            `Nisab (${currency} ${zakatResult.nisabValue.toLocaleString()}) se zayd khalis daulat ka 2.5% (chaliswan hissa)`
          )}
        </div>
      </div>

      <div style={{ fontSize: 13, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: '1px solid #F3F4F6',
            paddingBottom: 6,
          }}
        >
          <span style={{ color: '#6B7280' }}>
            {t('Total Zakatable Assets:', 'کل قابلِ زکوٰۃ اثاثے:', 'إجمالي الأصول الخاضعة للزكاة:', 'Kul Zakatable Asasay:')}
          </span>
          <span style={{ fontWeight: 700 }}>
            {currency} {zakatResult.totalZakatableAssets.toLocaleString()}
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: '1px solid #F3F4F6',
            paddingBottom: 6,
          }}
        >
          <span style={{ color: '#6B7280' }}>
            {t('Less Deductible Debts:', 'منہا ہونے والے واجب الادا قرضے:', 'يُخصم: الديون المستحقة:', 'Minha Honay Walay Qarzey:')}
          </span>
          <span style={{ fontWeight: 700, color: '#DC2626' }}>
            - {currency} {zakatResult.totalDeductibleLiabilities.toLocaleString()}
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: '1px solid #F3F4F6',
            paddingBottom: 6,
          }}
        >
          <span style={{ color: '#6B7280' }}>
            {t('Net Zakatable Pool:', 'خالص قابلِ زکوٰۃ رقم (وعاء الزکوٰۃ):', 'صافي الوعاء الزكوي الخاضع:', 'Net Zakatable Pool:')}
          </span>
          <span style={{ fontWeight: 800, color: '#1B4332' }}>
            {currency} {zakatResult.netZakatablePool.toLocaleString()}
          </span>
        </div>
      </div>

      {zakatResult.madhhabNotes && zakatResult.madhhabNotes.length > 0 && (
        <div
          style={{
            marginTop: 20,
            padding: 12,
            borderRadius: 8,
            backgroundColor: '#F9FAFB',
            fontSize: 12,
            color: '#4B5563',
          }}
        >
          {zakatResult.madhhabNotes.map((note, i) => (
            <p key={i} style={{ margin: '4px 0' }}>
              • {note}
            </p>
          ))}
        </div>
      )}

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
          showAmalToast(
            t(
              'Formal Zakat Clearance Certificate generated',
              'شرعی زکوٰۃ کلیئرنس سرٹیفکیٹ تیار ہو گیا',
              'تم إنشاء شهادة براءة الذمة الزكوية الرسمية',
              'Shariah Zakat Clearance Certificate tayyar ho gaya'
            ),
            'success'
          );
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
        📄{' '}
        {t(
          'Export Formal Zakat Clearance Certificate (PDF)',
          'معتمد شرعی زکوٰۃ کلیئرنس سرٹیفکیٹ حاصل کریں (پی ڈی ایف)',
          'استخراج شهادة براءة الذمة للزكاة بصيغة PDF',
          'Shariah Zakat Clearance Certificate (PDF) Hasil Karein'
        )}
      </button>
    </div>
  );
};
