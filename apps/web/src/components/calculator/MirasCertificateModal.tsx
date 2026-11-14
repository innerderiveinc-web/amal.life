import React, { useEffect } from 'react';
import { MirasPdfCertificatePayload } from '@amal/amal-engine';
import { useLanguage } from '../../context/LanguageContext';
import { ProBadge } from '../common/ProBadge';

interface MirasCertificateModalProps {
  mirasCert: MirasPdfCertificatePayload | null;
  onClose: () => void;
}

export function MirasCertificateModal({ mirasCert, onClose }: MirasCertificateModalProps) {
  const { t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!mirasCert) return null;

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
          maxWidth: 720,
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: 32,
          border: '2px solid #1B4332',
          position: 'relative',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: '2px solid #1B4332',
            paddingBottom: 16,
            marginBottom: 20,
          }}
        >
          <div>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#047857', letterSpacing: 1 }}>
              {t('OFFICIAL SHAR\'I RECORD', 'سرکاری شرعی دستاویز', 'الوثيقة الشرعية الرسمية', 'OFFICIAL SHAR\'I RECORD')}
            </span>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: '#1B4332', margin: '4px 0 0' }}>
              {t(
                'CERTIFICATE OF ISLAMIC INHERITANCE (فَرَائِض)',
                'شرعی وثیقۂ میراث و فرائض (تقسیمِ ترکہ)',
                'وثيقة حصر الإرث وقسمة الفرائض الشرعية',
                'Certificate of Islamic Inheritance (Fara\'iz)'
              )}
            </h2>
            <div style={{ fontSize: 11, color: '#6B7280' }}>
              Cert ID: {mirasCert.certificateId} • {t('Date:', 'تاریخ:', 'التاريخ:', 'Date:')} {mirasCert.dateOfDeath}
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

        <div style={{ backgroundColor: '#F9FAFB', padding: 14, borderRadius: 8, marginBottom: 18, fontSize: 13, color: '#1E293B' }}>
          <div>
            <strong style={{ color: '#475569' }}>
              {t('Gross Estate:', 'کل مالیتِ ترکہ:', 'إجمالي التركة:', 'Kul Tarkah:')}{' '}
            </strong>
            {mirasCert.currency} {mirasCert.estateValueGross.toLocaleString()}
          </div>
          <div>
            <strong style={{ color: '#475569' }}>
              {t('Net Distributable Estate:', 'خالص قابلِ تقسیم ترکہ:', 'صافي التركة القابلة للتوزيع:', 'Net Distributable Estate:')}{' '}
            </strong>
            {mirasCert.currency} {mirasCert.netDistributableEstate.toLocaleString()}
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, marginBottom: 20 }}>
          <thead>
            <tr style={{ backgroundColor: '#E5E7EB', textAlign: 'left' }}>
              <th style={{ padding: 8 }}>
                {t('Heir Relation', 'شرعی رشتہ / وارث', 'صفة الوارث', 'Waris')}
              </th>
              <th style={{ padding: 8 }}>
                {t('Quranic Share', 'قرآنی حصہ', 'الفرض الشرعي', 'Qurani Hissa')}
              </th>
              <th style={{ padding: 8 }}>
                {t('Percentage', 'فیصد', 'النسبة المئوية', 'Percentage')}
              </th>
              <th style={{ padding: 8 }}>
                {t('Total Entitlement', 'کل حق / رقم', 'إجمالي الاستحقاق', 'Kul Raqam')}
              </th>
            </tr>
          </thead>
          <tbody>
            {mirasCert.heirs.map((h, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: 8, fontWeight: 700 }}>{h.relation}</td>
                <td style={{ padding: 8 }}>{h.shareFraction}</td>
                <td style={{ padding: 8 }}>{h.sharePercentage}</td>
                <td style={{ padding: 8, fontWeight: 800, color: '#1B4332' }}>
                  {mirasCert.currency} {h.netAmount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          style={{
            fontSize: 11,
            color: '#4B5563',
            lineHeight: 1.6,
            marginBottom: 20,
            backgroundColor: '#F0FDF4',
            padding: 12,
            borderRadius: 8,
          }}
        >
          {mirasCert.legalDisclaimer}
        </div>

        <div
          style={{
            borderTop: '1px dashed #9CA3AF',
            paddingTop: 16,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <div style={{ fontSize: 11, color: '#4B5563' }}>
            <strong>{t('Attestation:', 'تصدیق:', 'التوثيق:', 'Tasdeeq:')}</strong> {mirasCert.muftiSignOffBlock.issuingInstitution}<br />
            {t('Verified School:', 'مستند فقہ:', 'المذهب المعتمد:', 'Verified Madhhab:')} {mirasCert.muftiSignOffBlock.verifiedMadhhab}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ProBadge featureName="Official Shariah Inheritance PDF Certificate" />
            <button
              onClick={() => window.print()}
              style={{
                padding: '9px 18px',
                backgroundColor: '#1B4332',
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
    </div>
  );
}
