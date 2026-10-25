import React from 'react';
import {
  DetailedZakatCalculationResult,
  shariPdfExportEngine,
  ZakatClearancePayload,
} from '@amal/amal-engine';
import { showAmalToast } from '../Toast';

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
        Zakat Assessment &amp; Obligation
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
            fontWeight: 600,
          }}
        >
          {zakatResult.isEligibleForZakat
            ? '✓ NISAB EXCEEDED — ZAKAT IS WAJIB (OBLIGATORY)'
            : '✗ BELOW NISAB — NO ZAKAT DUE'}
        </div>
        <div style={{ fontSize: 32, fontWeight: 900, color: '#1B4332', marginTop: 8 }}>
          {currency} {zakatResult.zakatDue.toLocaleString()}
        </div>
        <div style={{ fontSize: 12, color: '#4B5563', marginTop: 4 }}>
          2.5% (1/40th) of net wealth above Nisab threshold ({currency}{' '}
          {zakatResult.nisabValue.toLocaleString()})
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
          <span style={{ color: '#6B7280' }}>Total Zakatable Assets:</span>
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
          <span style={{ color: '#6B7280' }}>Less Deductible Debts:</span>
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
          <span style={{ color: '#6B7280' }}>Net Zakatable Pool:</span>
          <span style={{ fontWeight: 800, color: '#1B4332' }}>
            {currency} {zakatResult.netZakatablePool.toLocaleString()}
          </span>
        </div>
      </div>

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
          showAmalToast('Formal Zakat Clearance Certificate generated', 'success');
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
        📄 Export Formal Zakat Clearance Certificate (PDF)
      </button>
    </div>
  );
};
