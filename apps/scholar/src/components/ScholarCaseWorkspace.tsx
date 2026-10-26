import React from 'react';
import { ScholarCaseRecord } from '../lib/api';
import { ActiveScholarProfile } from './ScholarHeader';

export interface ScholarCaseWorkspaceProps {
  currentCase: ScholarCaseRecord;
  activeScholar: ActiveScholarProfile;
  primaryDraft: string;
  setPrimaryDraft: (val: string) => void;
  concurrenceNotes: string;
  setConcurrenceNotes: (val: string) => void;
  handleDraftResponse: () => void;
  handleConcur: () => void;
}

export const ScholarCaseWorkspace: React.FC<ScholarCaseWorkspaceProps> = ({
  currentCase,
  activeScholar,
  primaryDraft,
  setPrimaryDraft,
  concurrenceNotes,
  setConcurrenceNotes,
  handleDraftResponse,
  handleConcur,
}) => {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 20,
        }}
      >
        <div>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              backgroundColor: '#451A03',
              color: '#FCD34D',
              padding: '3px 8px',
              borderRadius: 4,
            }}
          >
            CLASS D FATWA FIREWALL ESCALATION · CASE #{currentCase.caseId}
          </span>
          <h2 style={{ fontSize: 22, fontWeight: 800, margin: '8px 0 0 0', color: '#F8FAFC' }}>
            {currentCase.category.replace('_', ' ')}
          </h2>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: 12, color: '#10B981', fontWeight: 600 }}>
            ✓ Anonymized User Consent Verified
          </span>
          <div style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>
            Two-Person Rule: Primary + Secondary Concurrence Required
          </div>
        </div>
      </div>

      {/* Inquiry & Context Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 20, marginBottom: 24 }}>
        <div
          style={{
            backgroundColor: '#0F172A',
            border: '1px solid #1E293B',
            borderRadius: 10,
            padding: 20,
          }}
        >
          <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B', letterSpacing: '0.5px' }}>
            VERBATIM USER INQUIRY
          </span>
          <p
            style={{
              fontSize: 15,
              color: '#F1F5F9',
              lineHeight: 1.6,
              margin: '10px 0 0 0',
              fontStyle: 'italic',
            }}
          >
            "{currentCase.userQuestion}"
          </p>
          {currentCase.sanitizedContext && (
            <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid #1E293B' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B' }}>
                SANITIZED MARITAL &amp; SITUATIONAL CONTEXT
              </span>
              <p style={{ fontSize: 13, color: '#94A3B8', margin: '6px 0 0 0' }}>
                {currentCase.sanitizedContext}
              </p>
            </div>
          )}
        </div>

        <div
          style={{
            backgroundColor: '#0F172A',
            border: '1px solid #1E293B',
            borderRadius: 10,
            padding: 20,
          }}
        >
          <span style={{ fontSize: 11, fontWeight: 700, color: '#38BDF8', letterSpacing: '0.5px' }}>
            CANONICAL REFERENCE CROSS-CHECK
          </span>
          <ul
            style={{
              margin: '10px 0 0 0',
              paddingLeft: 18,
              fontSize: 13,
              color: '#CBD5E1',
              lineHeight: 1.8,
            }}
          >
            <li>Surah al-Baqarah 2:229 (Limits of Talaq)</li>
            <li>Sunan Abi Dawud: 2193 (Talaq under extreme duress / closing)</li>
            <li>Classical Hanafi &amp; Hanbali positions on pronouncements in severe unreasoning anger</li>
          </ul>
          <div style={{ fontSize: 11, color: '#64748B', marginTop: 14, fontStyle: 'italic' }}>
            AI Safeguard: Automated response is strictly blocked for this category.
          </div>
        </div>
      </div>

      {/* Step 1: Primary Scholar Determination */}
      <div
        style={{
          backgroundColor: '#0F172A',
          border: '1px solid #1E293B',
          borderRadius: 10,
          padding: 20,
          marginBottom: 20,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#F8FAFC', margin: 0 }}>
            Step 1: Primary Scholarly Determination
          </h3>
          {currentCase.primarySignedAt && (
            <span style={{ fontSize: 12, color: '#10B981', fontWeight: 600 }}>
              ✓ Signed by {currentCase.primaryScholarId} ({new Date(currentCase.primarySignedAt).toLocaleTimeString()})
            </span>
          )}
        </div>

        {currentCase.primaryResponse ? (
          <div
            style={{
              backgroundColor: '#0B1120',
              padding: 14,
              borderRadius: 8,
              border: '1px solid #1E293B',
              fontSize: 14,
              color: '#E2E8F0',
              lineHeight: 1.6,
            }}
          >
            {currentCase.primaryResponse}
          </div>
        ) : (
          <div>
            <textarea
              value={primaryDraft}
              onChange={(e) => setPrimaryDraft(e.target.value)}
              placeholder="In the Name of Allah, Most Merciful. Regarding your inquiry on the utterance of divorce during severe anger..."
              style={{
                width: '100%',
                minHeight: 120,
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
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
              <button
                onClick={handleDraftResponse}
                style={{
                  backgroundColor: '#2563EB',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '8px 18px',
                  borderRadius: 6,
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                Submit Determination as {activeScholar.name}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Step 2: Second Scholar Concurrence (Two-Person Rule) */}
      <div
        style={{
          backgroundColor: '#0F172A',
          border: '1px solid #1E293B',
          borderRadius: 10,
          padding: 20,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#F8FAFC', margin: 0 }}>
            Step 2: Second Jurist Concurrence (Two-Person Verification)
          </h3>
          {currentCase.proofHash && (
            <span style={{ fontSize: 12, color: '#10B981', fontWeight: 600 }}>
              ✓ Verified &amp; Delivered (Proof: {currentCase.proofHash.slice(0, 20)}...)
            </span>
          )}
        </div>

        {!currentCase.primaryResponse ? (
          <div style={{ fontSize: 13, color: '#64748B', fontStyle: 'italic' }}>
            Locked: Awaiting Step 1 Primary Determination before second scholar can concur.
          </div>
        ) : currentCase.proofHash ? (
          <div
            style={{
              backgroundColor: '#0B1120',
              padding: 14,
              borderRadius: 8,
              border: '1px solid #065F46',
              fontSize: 13,
              color: '#A7F3D0',
            }}
          >
            <strong>Concurrence Notes ({currentCase.secondaryScholarId}):</strong>{' '}
            {currentCase.secondaryConcurrenceNotes}
            <div style={{ fontSize: 11, color: '#6EE7B7', marginTop: 8 }}>
              Immutable Proof Hash: {currentCase.proofHash}
            </div>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: 13, color: '#94A3B8', margin: '0 0 10px 0' }}>
              As the independent second jurist, review the determination above. If you concur, document corroborating
              sources and sign off.
            </p>
            <textarea
              value={concurrenceNotes}
              onChange={(e) => setConcurrenceNotes(e.target.value)}
              placeholder="Concurring opinion: The position aligns with Imam al-Nawawi's Al-Majmu' and Allamah Ibn Abidin's Radd al-Muhtar..."
              style={{
                width: '100%',
                minHeight: 90,
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
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
              <button
                onClick={handleConcur}
                style={{
                  backgroundColor: '#059669',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '8px 18px',
                  borderRadius: 6,
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                Sign Concurrence &amp; Generate Proof Hash
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
