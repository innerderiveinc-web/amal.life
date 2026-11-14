import React, { useEffect } from 'react';
import { ZakatClearancePayload } from '@amal/amal-engine';
import { useLanguage } from '../../context/LanguageContext';

interface ZakatCertificateModalProps {
  zakatCert: ZakatClearancePayload | null;
  onClose: () => void;
}

export function ZakatCertificateModal({ zakatCert, onClose }: ZakatCertificateModalProps) {
  const { t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!zakatCert) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        padding: 20,
      }}
    >
      <div
        className="printable-certificate"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 14,
          maxWidth: 600,
          width: '100%',
          padding: 28,
          border: '2px solid #047857',
          position: 'relative',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: '2px solid #047857',
            paddingBottom: 14,
            marginBottom: 18,
          }}
        >
          <div>
            <span style={{ fontSize: 10, fontWeight: 800, color: '#047857', letterSpacing: 1 }}>
              {t('HAWL AUDIT RECORD', 'حولِ شرعی کا ریکارڈ', 'سجل حولان الحول الشرعي', 'HAWL AUDIT RECORD')}
            </span>
            <h2 style={{ fontSize: 18, fontWeight: 900, color: '#065F46', margin: '2px 0 0' }}>
              {t(
                `ANNUAL ZAKAT CLEARANCE SUMMARY (${zakatCert.hijriYear} AH)`,
                `سالانہ زکوٰۃ کلیئرنس و برأتِ ذمہ (${zakatCert.hijriYear} ھ)`,
                `شهادة براءة الذمة السنوية للزكاة (${zakatCert.hijriYear} هـ)`,
                `Annual Zakat Clearance Summary (${zakatCert.hijriYear} AH)`
              )}
            </h2>
            <div style={{ fontSize: 11, color: '#6B7280' }}>
              ID: {zakatCert.clearanceId} • {zakatCert.dateCalculated}
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              border: 'none',
              background: '#F1F5F9',
              borderRadius: '50%',
              width: 32,
              height: 32,
              fontSize: 16,
              cursor: 'pointer',
              color: '#475569',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ fontSize: 13, lineHeight: 1.8, marginBottom: 18, color: '#1E293B' }}>
          <div>
            <strong style={{ color: '#475569' }}>
              {t('Beneficiary / Account:', 'حساب / نام:', 'المكلف / الاسم:', 'Account / Naam:')}{' '}
            </strong>
            {zakatCert.individualOrBusinessName}
          </div>
          <div>
            <strong style={{ color: '#475569' }}>
              {t('Gross Liquid Wealth:', 'کل سیال اثاثے:', 'إجمالي الأصول النامية:', 'Kul Asasay:')}{' '}
            </strong>
            {zakatCert.currency} {zakatCert.totalGrossAssets.toLocaleString()}
          </div>
          <div>
            <strong style={{ color: '#475569' }}>
              {t('Less Deductible Debts:', 'منہا شدہ قرضے:', 'يُخصم: الديون المستحقة:', 'Minha Shuda Qarzey:')}{' '}
            </strong>
            {zakatCert.currency} {zakatCert.deductibleImmediateDebts.toLocaleString()}
          </div>
          <div>
            <strong style={{ color: '#475569' }}>
              {t('Net Zakatable Pool:', 'خالص وعاء الزکوٰۃ:', 'صافي الوعاء الزكوي:', 'Net Zakatable Pool:')}{' '}
            </strong>
            {zakatCert.currency} {zakatCert.netZakatableWealth.toLocaleString()}
          </div>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#065F46', marginTop: 8 }}>
            {t('Zakat Due (2.5%):', 'واجب الادا زکوٰۃ (۲.۵٪):', 'مقدار الزكاة الواجبة (٢.٥٪):', 'Wajib-ul-Ada Zakat (2.5%):')}{' '}
            {zakatCert.currency} {zakatCert.zakatPaidOrDue.toLocaleString()}
          </div>
        </div>

        <div style={{ fontSize: 11, color: '#047857', backgroundColor: '#ECFDF5', padding: 12, borderRadius: 8, marginBottom: 18, lineHeight: 1.5 }}>
          {zakatCert.scholarlyAttestation}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <button
            onClick={() => window.print()}
            style={{
              padding: '9px 18px',
              backgroundColor: '#047857',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 12,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span>🖨️</span>
            <span>
              {t('Print / Save PDF', 'پرنٹ یا PDF محفوظ کریں', 'طباعة أو حفظ كـ PDF', 'Print / PDF Save Karein')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
