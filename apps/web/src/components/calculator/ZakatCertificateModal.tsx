import React from 'react';
import { ZakatClearancePayload } from '@amal/amal-engine';

interface ZakatCertificateModalProps {
  zakatCert: ZakatClearancePayload | null;
  onClose: () => void;
}

export function ZakatCertificateModal({ zakatCert, onClose }: ZakatCertificateModalProps) {
  if (!zakatCert) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        padding: 20,
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          maxWidth: 600,
          width: '100%',
          padding: 28,
          border: '2px solid #047857',
          position: 'relative',
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
            <span style={{ fontSize: 10, fontWeight: 800, color: '#047857', letterSpacing: 1 }}>HAWL AUDIT RECORD</span>
            <h2 style={{ fontSize: 18, fontWeight: 900, color: '#065F46', margin: '2px 0 0' }}>
              ANNUAL ZAKAT CLEARANCE SUMMARY ({zakatCert.hijriYear} AH)
            </h2>
            <div style={{ fontSize: 11, color: '#6B7280' }}>ID: {zakatCert.clearanceId} • {zakatCert.dateCalculated}</div>
          </div>
          <button
            onClick={onClose}
            style={{ border: 'none', background: 'none', fontSize: 18, cursor: 'pointer', color: '#6B7280' }}
          >
            ✕
          </button>
        </div>

        <div style={{ fontSize: 13, lineHeight: 1.8, marginBottom: 18 }}>
          <div><strong>Beneficiary / Account:</strong> {zakatCert.individualOrBusinessName}</div>
          <div><strong>Gross Liquid Wealth:</strong> {zakatCert.currency} {zakatCert.totalGrossAssets.toLocaleString()}</div>
          <div><strong>Less Deductible Debts:</strong> {zakatCert.currency} {zakatCert.deductibleImmediateDebts.toLocaleString()}</div>
          <div><strong>Net Zakatable Pool:</strong> {zakatCert.currency} {zakatCert.netZakatableWealth.toLocaleString()}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#065F46', marginTop: 8 }}>
            Zakat Due (2.5%): {zakatCert.currency} {zakatCert.zakatPaidOrDue.toLocaleString()}
          </div>
        </div>

        <div style={{ fontSize: 11, color: '#047857', backgroundColor: '#ECFDF5', padding: 12, borderRadius: 8, marginBottom: 18 }}>
          {zakatCert.scholarlyAttestation}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <button
            onClick={() => window.print()}
            style={{
              padding: '8px 18px',
              backgroundColor: '#047857',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 6,
              fontWeight: 700,
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            🖨️ Print / Save PDF
          </button>
        </div>
      </div>
    </div>
  );
}
