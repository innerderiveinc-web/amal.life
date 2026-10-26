import React from 'react';
import { QuarantinedClaimRecord } from '../lib/api';

export interface ScholarQuarantineWorkspaceProps {
  currentClaim: QuarantinedClaimRecord;
  claimNotes: string;
  setClaimNotes: (val: string) => void;
  handleClaimDecision: (decision: 'APPROVE' | 'REJECT') => void;
}

export const ScholarQuarantineWorkspace: React.FC<ScholarQuarantineWorkspaceProps> = ({
  currentClaim,
  claimNotes,
  setClaimNotes,
  handleClaimDecision,
}) => {
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            backgroundColor: '#451A03',
            color: '#F59E0B',
            padding: '3px 8px',
            borderRadius: 4,
          }}
        >
          KNOWLEDGE INGESTION QUARANTINE GATE · {currentClaim.claimId}
        </span>
        <h2 style={{ fontSize: 22, fontWeight: 800, margin: '8px 0 0 0', color: '#F8FAFC' }}>
          {currentClaim.detectedIssue}
        </h2>
      </div>

      <div
        style={{
          backgroundColor: '#0F172A',
          border: '1px solid #1E293B',
          borderRadius: 10,
          padding: 22,
          marginBottom: 24,
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B' }}>
          INGESTED CLAIM TEXT (BLOCKED FROM PRODUCTION RETRIEVAL)
        </span>
        <p
          style={{
            fontSize: 15,
            color: '#F1F5F9',
            lineHeight: 1.6,
            margin: '10px 0 16px 0',
            fontStyle: 'italic',
          }}
        >
          "{currentClaim.sourceText}"
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 16,
            backgroundColor: '#0B1120',
            padding: 14,
            borderRadius: 8,
            fontSize: 12,
          }}
        >
          <div>
            <span style={{ color: '#64748B' }}>Source Reference:</span>{' '}
            <strong style={{ color: '#CBD5E1' }}>{currentClaim.sourceReference}</strong>
          </div>
          <div>
            <span style={{ color: '#64748B' }}>Source Edition:</span>{' '}
            <strong style={{ color: '#CBD5E1' }}>{currentClaim.sourceEdition}</strong>
          </div>
        </div>
        <div style={{ marginTop: 14 }}>
          <span style={{ color: '#EF4444', fontSize: 12, fontWeight: 700 }}>Quarantine Intercept Reason:</span>
          <p style={{ fontSize: 13, color: '#FCA5A5', margin: '4px 0 0 0' }}>{currentClaim.quarantineReason}</p>
        </div>
      </div>

      {/* Scholar Action Panel */}
      <div
        style={{
          backgroundColor: '#0F172A',
          border: '1px solid #1E293B',
          borderRadius: 10,
          padding: 22,
        }}
      >
        <h3 style={{ fontSize: 14, fontWeight: 700, color: '#F8FAFC', margin: '0 0 10px 0' }}>
          Scholarly Evaluation &amp; Disposition
        </h3>
        <textarea
          value={claimNotes}
          onChange={(e) => setClaimNotes(e.target.value)}
          placeholder="Record your scholarly rationale (e.g. Reject: Hadith has severe weakness in Isnad; or Approve: Add explicit plurality annotation)..."
          style={{
            width: '100%',
            minHeight: 80,
            backgroundColor: '#0B1120',
            border: '1px solid #334155',
            borderRadius: 8,
            padding: 12,
            color: '#F8FAFC',
            fontSize: 13,
            fontFamily: 'inherit',
            boxSizing: 'border-box',
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 14 }}>
          <button
            onClick={() => handleClaimDecision('REJECT')}
            style={{
              backgroundColor: '#DC2626',
              color: '#FFFFFF',
              border: 'none',
              padding: '9px 18px',
              borderRadius: 6,
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            Permanently Purge &amp; Reject Claim
          </button>
          <button
            onClick={() => handleClaimDecision('APPROVE')}
            style={{
              backgroundColor: '#059669',
              color: '#FFFFFF',
              border: 'none',
              padding: '9px 18px',
              borderRadius: 6,
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            Approve with Verification Hash
          </button>
        </div>
      </div>
    </div>
  );
};
