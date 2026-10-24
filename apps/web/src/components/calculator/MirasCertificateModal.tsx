import React from 'react';
import { MirasPdfCertificatePayload } from '@amal/amal-engine';

interface MirasCertificateModalProps {
  mirasCert: MirasPdfCertificatePayload | null;
  onClose: () => void;
}

export function MirasCertificateModal({ mirasCert, onClose }: MirasCertificateModalProps) {
  if (!mirasCert) return null;

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
          maxWidth: 720,
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: 32,
          border: '2px solid #1B4332',
          position: 'relative',
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
            <span style={{ fontSize: 11, fontWeight: 800, color: '#047857', letterSpacing: 1 }}>OFFICIAL SHAR'I RECORD</span>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: '#1B4332', margin: '4px 0 0' }}>
              CERTIFICATE OF ISLAMIC INHERITANCE (فَرَائِض)
            </h2>
            <div style={{ fontSize: 11, color: '#6B7280' }}>
              Cert ID: {mirasCert.certificateId} • Date: {mirasCert.dateOfDeath}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ border: 'none', background: 'none', fontSize: 20, cursor: 'pointer', color: '#6B7280' }}
          >
            ✕
          </button>
        </div>

        <div style={{ backgroundColor: '#F9FAFB', padding: 14, borderRadius: 8, marginBottom: 18, fontSize: 13 }}>
          <div><strong>Gross Estate:</strong> {mirasCert.currency} {mirasCert.estateValueGross.toLocaleString()}</div>
          <div><strong>Net Distributable Estate:</strong> {mirasCert.currency} {mirasCert.netDistributableEstate.toLocaleString()}</div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, marginBottom: 20 }}>
          <thead>
            <tr style={{ backgroundColor: '#E5E7EB', textAlign: 'left' }}>
              <th style={{ padding: 8 }}>Heir Relation</th>
              <th style={{ padding: 8 }}>Quranic Share</th>
              <th style={{ padding: 8 }}>Percentage</th>
              <th style={{ padding: 8 }}>Total Entitlement</th>
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
          }}
        >
          <div style={{ fontSize: 11, color: '#4B5563' }}>
            <strong>Attestation:</strong> {mirasCert.muftiSignOffBlock.issuingInstitution}<br />
            Verified School: {mirasCert.muftiSignOffBlock.verifiedMadhhab}
          </div>
          <button
            onClick={() => window.print()}
            style={{
              padding: '8px 18px',
              backgroundColor: '#1B4332',
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
