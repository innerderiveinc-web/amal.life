import React from 'react';
import { ScholarCaseRecord, QuarantinedClaimRecord } from '../lib/api';

export interface ScholarQueueSidebarProps {
  activeTab: 'CASES' | 'QUARANTINE';
  setActiveTab: (tab: 'CASES' | 'QUARANTINE') => void;
  cases: ScholarCaseRecord[];
  selectedCaseId: string;
  setSelectedCaseId: (id: string) => void;
  quarantinedClaims: QuarantinedClaimRecord[];
  selectedClaimId: string;
  setSelectedClaimId: (id: string) => void;
}

export const ScholarQueueSidebar: React.FC<ScholarQueueSidebarProps> = ({
  activeTab,
  setActiveTab,
  cases,
  selectedCaseId,
  setSelectedCaseId,
  quarantinedClaims,
  selectedClaimId,
  setSelectedClaimId,
}) => {
  return (
    <aside
      style={{
        width: 340,
        borderRight: '1px solid #1E293B',
        backgroundColor: '#0B1120',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* View Tabs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid #1E293B' }}>
        <button
          onClick={() => setActiveTab('CASES')}
          style={{
            backgroundColor: activeTab === 'CASES' ? '#1E293B' : 'transparent',
            color: activeTab === 'CASES' ? '#38BDF8' : '#94A3B8',
            border: 'none',
            padding: '12px 14px',
            fontWeight: 700,
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          Class D Fatwa Queue ({cases.length})
        </button>
        <button
          onClick={() => setActiveTab('QUARANTINE')}
          style={{
            backgroundColor: activeTab === 'QUARANTINE' ? '#1E293B' : 'transparent',
            color: activeTab === 'QUARANTINE' ? '#F59E0B' : '#94A3B8',
            border: 'none',
            padding: '12px 14px',
            fontWeight: 700,
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          Quarantined Claims ({quarantinedClaims.length})
        </button>
      </div>

      {/* Queue Items */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 12 }}>
        {activeTab === 'CASES'
          ? cases.map((c) => (
              <div
                key={c.caseId}
                onClick={() => setSelectedCaseId(c.caseId)}
                style={{
                  backgroundColor: selectedCaseId === c.caseId ? '#1E293B' : '#0F172A',
                  border: selectedCaseId === c.caseId ? '1px solid #38BDF8' : '1px solid #1E293B',
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 10,
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: c.urgency === 'HIGH' ? '#EF4444' : '#F59E0B',
                    }}
                  >
                    {c.urgency} URGENCY
                  </span>
                  <span style={{ fontSize: 11, color: '#64748B' }}>#{c.caseId}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#F1F5F9', marginTop: 4 }}>
                  {c.category.replace('_', ' ')}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: '#94A3B8',
                    marginTop: 4,
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {c.userQuestion}
                </div>
                <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
                  <span
                    style={{
                      fontSize: 10,
                      backgroundColor: '#064E3B',
                      color: '#6EE7B7',
                      padding: '2px 6px',
                      borderRadius: 4,
                    }}
                  >
                    {c.status}
                  </span>
                </div>
              </div>
            ))
          : quarantinedClaims.map((q) => (
              <div
                key={q.claimId}
                onClick={() => setSelectedClaimId(q.claimId)}
                style={{
                  backgroundColor: selectedClaimId === q.claimId ? '#1E293B' : '#0F172A',
                  border: selectedClaimId === q.claimId ? '1px solid #F59E0B' : '1px solid #1E293B',
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 10,
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#EF4444' }}>ISOLATED CLAIM</span>
                  <span style={{ fontSize: 11, color: '#64748B' }}>{q.claimId}</span>
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#CBD5E1', marginTop: 4 }}>
                  {q.detectedIssue}
                </div>
                <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>
                  Status:{' '}
                  <strong
                    style={{
                      color:
                        q.status === 'VERIFIED'
                          ? '#10B981'
                          : q.status === 'REJECTED'
                            ? '#EF4444'
                            : '#F59E0B',
                    }}
                  >
                    {q.status}
                  </strong>
                </div>
              </div>
            ))}
      </div>
    </aside>
  );
};
