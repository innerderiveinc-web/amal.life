import React, { useState } from 'react';
import { SirahClaimRecord } from '@amal/types';
import { AmalTheme } from '@amal/ui';

interface ScholarSirahReviewQueueProps {
  claims: SirahClaimRecord[];
  onReviewClaim?: (claimId: string, decision: 'APPROVED' | 'DISPUTED') => void;
}

export const ScholarSirahReviewQueue: React.FC<ScholarSirahReviewQueueProps> = ({
  claims,
  onReviewClaim,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>
          Scholar Peer Review Queue — Pending Sirah Claims ({claims.length})
        </h3>
        <span style={{ fontSize: 12, color: '#666' }}>
          Rule: 2 independent scholar approvals required for release
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {claims.map((clm) => (
          <div
            key={clm.claim_id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              padding: 16,
              border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: AmalTheme.colors.primary }}>
                CLAIM ID: {clm.claim_id} · CLASS: {clm.claim_class}
              </span>
              <span style={{
                fontSize: 11,
                padding: '2px 8px',
                borderRadius: 6,
                backgroundColor: clm.review_status === 'APPROVED' ? '#E8F5E9' : '#FFF3E0',
                color: clm.review_status === 'APPROVED' ? '#2E7D32' : '#E65100',
                fontWeight: 600,
              }}>
                {clm.review_status}
              </span>
            </div>

            <p style={{ margin: '0 0 10px', fontSize: 14, color: '#333', lineHeight: 1.5 }}>
              "{clm.claim_text}"
            </p>

            <div style={{ fontSize: 12, color: '#666', marginBottom: 12 }}>
              <strong>Confidence State:</strong> {clm.confidence_state} | <strong>Citations:</strong> {clm.citations.join(', ')}
            </div>

            {onReviewClaim && clm.review_status === 'PENDING' && (
              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={() => onReviewClaim(clm.claim_id, 'APPROVED')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 8,
                    border: 'none',
                    backgroundColor: '#2E7D32',
                    color: '#FFF',
                    fontWeight: 700,
                    fontSize: 12,
                    cursor: 'pointer',
                  }}
                >
                  Approve Claim
                </button>
                <button
                  onClick={() => onReviewClaim(clm.claim_id, 'DISPUTED')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 8,
                    border: 'none',
                    backgroundColor: '#C62828',
                    color: '#FFF',
                    fontWeight: 700,
                    fontSize: 12,
                    cursor: 'pointer',
                  }}
                >
                  Flag Disputed
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
