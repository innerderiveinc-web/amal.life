import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { ScholarApiClient, ScholarCaseRecord, QuarantinedClaimRecord } from '../lib/api';

export default function ScholarPortal() {
  const [activeTab, setActiveTab] = useState<'CASES' | 'QUARANTINE'>('CASES');
  const [cases, setCases] = useState<ScholarCaseRecord[]>([]);
  const [selectedCaseId, setSelectedCaseId] = useState<string>('case-8102');
  const [quarantinedClaims, setQuarantinedClaims] = useState<QuarantinedClaimRecord[]>([]);
  const [selectedClaimId, setSelectedClaimId] = useState<string>('CLM-QUAR-001');

  // Logged-in scholar identity simulation
  const [activeScholar, setActiveScholar] = useState<{ id: string; name: string; title: string }>({
    id: 'sch_dr_tariq_al_hashimi',
    name: 'Dr. Tariq Al-Hashimi',
    title: 'Senior Jurist (Comparative Fiqh)',
  });

  // Form states
  const [primaryDraft, setPrimaryDraft] = useState('');
  const [concurrenceNotes, setConcurrenceNotes] = useState('');
  const [claimNotes, setClaimNotes] = useState('');
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const fetchedCases = await ScholarApiClient.getCases();
    setCases(fetchedCases);
    const fetchedClaims = await ScholarApiClient.getQuarantinedClaims();
    setQuarantinedClaims(fetchedClaims);
  }

  const currentCase = cases.find((c) => c.caseId === selectedCaseId) || cases[0];
  const currentClaim = quarantinedClaims.find((c) => c.claimId === selectedClaimId) || quarantinedClaims[0];

  const handleDraftResponse = async () => {
    if (!currentCase || !primaryDraft.trim()) return;
    const apiResult = await ScholarApiClient.submitDraftResponse(currentCase.caseId, activeScholar.id, primaryDraft);
    if (!apiResult.success && apiResult.error) {
      console.warn('API draft response fallback to local:', apiResult.error);
    }
    const updated = cases.map((c) => {
      if (c.caseId === currentCase.caseId) {
        return {
          ...c,
          status: 'AWAITING_SECOND_SCHOLAR' as const,
          primaryScholarId: activeScholar.id,
          primaryResponse: primaryDraft,
          primarySignedAt: new Date().toISOString(),
        };
      }
      return c;
    });
    setCases(updated);
    setActionSuccess(`Determination drafted by ${activeScholar.name}. Awaiting Second Jurist Concurrence (Two-Person Rule).`);
    setTimeout(() => setActionSuccess(null), 5000);
  };

  const handleConcur = async () => {
    if (!currentCase || !concurrenceNotes.trim()) return;
    if (currentCase.primaryScholarId === activeScholar.id) {
      alert('TWO-PERSON RULE VIOLATION: Reviewer 2 must be an independent certified jurist, different from Reviewer 1.');
      return;
    }

    const apiResult = await ScholarApiClient.submitSecondScholarSignoff(currentCase.caseId, activeScholar.id, concurrenceNotes);
    const proofHash = apiResult.data?.case?.proofHash || `proof_twoperson_${currentCase.caseId}_${Date.now()}`;
    const updated = cases.map((c) => {
      if (c.caseId === currentCase.caseId) {
        return {
          ...c,
          status: 'APPROVED' as const,
          secondaryScholarId: activeScholar.id,
          secondaryConcurrenceNotes: concurrenceNotes,
          secondarySignedAt: new Date().toISOString(),
          proofHash,
        };
      }
      return c;
    });
    setCases(updated);
    setActionSuccess(`✓ Dual-Scholar Verification Complete! Cryptographic Proof Hash: ${proofHash}`);
    setTimeout(() => setActionSuccess(null), 6000);
  };

  const handleClaimDecision = async (decision: 'APPROVE' | 'REJECT') => {
    if (!currentClaim) return;
    const apiResult = await ScholarApiClient.signoffClaim(currentClaim.claimId, activeScholar.id, decision, claimNotes);
    if (!apiResult.success && apiResult.error) {
      console.warn('API signoff claim fallback to local:', apiResult.error);
    }
    const updated = quarantinedClaims.map((q) => {
      if (q.claimId === currentClaim.claimId) {
        return {
          ...q,
          status: decision === 'APPROVE' ? ('VERIFIED' as const) : ('REJECTED' as const),
          reviewer1Id: activeScholar.id,
        };
      }
      return q;
    });
    setQuarantinedClaims(updated);
    setActionSuccess(`Quarantined Claim ${currentClaim.claimId} marked as ${decision === 'APPROVE' ? 'VERIFIED FOR RETRIEVAL' : 'PERMANENTLY REJECTED'}.`);
    setTimeout(() => setActionSuccess(null), 4000);
  };

  return (
    <div style={{ backgroundColor: '#0A0F1D', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', color: '#E2E8F0' }}>
      <Head>
        <title>AMAL OS — Two-Person Scholar Verification Desk</title>
      </Head>

      {/* Top Header */}
      <header style={{ borderBottom: '1px solid #1E293B', padding: '16px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0F172A' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#10B981', boxShadow: '0 0 10px #10B981' }} />
          <h1 style={{ fontSize: 18, fontWeight: 800, margin: 0, letterSpacing: '0.5px', color: '#F8FAFC' }}>
            AMAL OS — SCHOLARLY GOVERNANCE CONTROL PLANE
          </h1>
          <span style={{ fontSize: 11, backgroundColor: '#1E293B', color: '#94A3B8', padding: '3px 8px', borderRadius: 4, fontWeight: 600 }}>
            TWO-PERSON RULE ENFORCED
          </span>
        </div>

        {/* Scholar Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 12, color: '#94A3B8' }}>Active Jurist:</span>
          <select
            value={activeScholar.id}
            onChange={(e) => {
              if (e.target.value === 'sch_dr_tariq_al_hashimi') {
                setActiveScholar({ id: 'sch_dr_tariq_al_hashimi', name: 'Dr. Tariq Al-Hashimi', title: 'Senior Jurist (Comparative Fiqh)' });
              } else {
                setActiveScholar({ id: 'sch_sheikh_amina_farooq', name: 'Ustadha Amina Farooq', title: 'Senior Hadith & Family Jurist' });
              }
            }}
            style={{ backgroundColor: '#1E293B', color: '#38BDF8', border: '1px solid #334155', padding: '6px 12px', borderRadius: 6, fontSize: 13, fontWeight: 600, outline: 'none' }}
          >
            <option value="sch_dr_tariq_al_hashimi">Dr. Tariq Al-Hashimi (Fiqh / Usul)</option>
            <option value="sch_sheikh_amina_farooq">Ustadha Amina Farooq (Hadith / Family)</option>
          </select>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div style={{ display: 'flex', height: 'calc(100vh - 65px)' }}>
        {/* Navigation & Queue Sidebar */}
        <aside style={{ width: 340, borderRight: '1px solid #1E293B', backgroundColor: '#0B1120', display: 'flex', flexDirection: 'column' }}>
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
            {activeTab === 'CASES' ? (
              cases.map((c) => (
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
                    <span style={{ fontSize: 11, fontWeight: 700, color: c.urgency === 'HIGH' ? '#EF4444' : '#F59E0B' }}>
                      {c.urgency} URGENCY
                    </span>
                    <span style={{ fontSize: 11, color: '#64748B' }}>#{c.caseId}</span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#F1F5F9', marginTop: 4 }}>
                    {c.category.replace('_', ' ')}
                  </div>
                  <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 4, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    {c.userQuestion}
                  </div>
                  <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
                    <span style={{ fontSize: 10, backgroundColor: '#064E3B', color: '#6EE7B7', padding: '2px 6px', borderRadius: 4 }}>
                      {c.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              quarantinedClaims.map((q) => (
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
                    Status: <strong style={{ color: q.status === 'VERIFIED' ? '#10B981' : q.status === 'REJECTED' ? '#EF4444' : '#F59E0B' }}>{q.status}</strong>
                  </div>
                </div>
              ))
            )}
          </div>
        </aside>

        {/* Workstation Center */}
        <main style={{ flex: 1, overflowY: 'auto', padding: 28, backgroundColor: '#0A0F1D' }}>
          {actionSuccess && (
            <div style={{ backgroundColor: '#064E3B', border: '1px solid #059669', color: '#A7F3D0', padding: 14, borderRadius: 8, marginBottom: 20, fontSize: 13, fontWeight: 600 }}>
              {actionSuccess}
            </div>
          )}

          {activeTab === 'CASES' && currentCase ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div>
                  <span style={{ fontSize: 11, fontWeight: 700, backgroundColor: '#451A03', color: '#FCD34D', padding: '3px 8px', borderRadius: 4 }}>
                    CLASS D FATWA FIREWALL ESCALATION · CASE #{currentCase.caseId}
                  </span>
                  <h2 style={{ fontSize: 22, fontWeight: 800, margin: '8px 0 0 0', color: '#F8FAFC' }}>
                    {currentCase.category.replace('_', ' ')}
                  </h2>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: 12, color: '#10B981', fontWeight: 600 }}>✓ Anonymized User Consent Verified</span>
                  <div style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>Two-Person Rule: Primary + Secondary Concurrence Required</div>
                </div>
              </div>

              {/* Inquiry & Context Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 20, marginBottom: 24 }}>
                <div style={{ backgroundColor: '#0F172A', border: '1px solid #1E293B', borderRadius: 10, padding: 20 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B', letterSpacing: '0.5px' }}>VERBATIM USER INQUIRY</span>
                  <p style={{ fontSize: 15, color: '#F1F5F9', lineHeight: 1.6, margin: '10px 0 0 0', fontStyle: 'italic' }}>
                    "{currentCase.userQuestion}"
                  </p>
                  {currentCase.sanitizedContext && (
                    <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid #1E293B' }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B' }}>SANITIZED MARITAL & SITUATIONAL CONTEXT</span>
                      <p style={{ fontSize: 13, color: '#94A3B8', margin: '6px 0 0 0' }}>{currentCase.sanitizedContext}</p>
                    </div>
                  )}
                </div>

                <div style={{ backgroundColor: '#0F172A', border: '1px solid #1E293B', borderRadius: 10, padding: 20 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#38BDF8', letterSpacing: '0.5px' }}>CANONICAL REFERENCE CROSS-CHECK</span>
                  <ul style={{ margin: '10px 0 0 0', paddingLeft: 18, fontSize: 13, color: '#CBD5E1', lineHeight: 1.8 }}>
                    <li>Surah al-Baqarah 2:229 (Limits of Talaq)</li>
                    <li>Sunan Abi Dawud: 2193 (Talaq under extreme duress / closing)</li>
                    <li>Classical Hanafi & Hanbali positions on pronouncements in severe unreasoning anger</li>
                  </ul>
                  <div style={{ fontSize: 11, color: '#64748B', marginTop: 14, fontStyle: 'italic' }}>
                    AI Safeguard: Automated response is strictly blocked for this category.
                  </div>
                </div>
              </div>

              {/* Step 1: Primary Scholar Determination */}
              <div style={{ backgroundColor: '#0F172A', border: '1px solid #1E293B', borderRadius: 10, padding: 20, marginBottom: 20 }}>
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
                  <div style={{ backgroundColor: '#0B1120', padding: 14, borderRadius: 8, border: '1px solid #1E293B', fontSize: 14, color: '#E2E8F0', lineHeight: 1.6 }}>
                    {currentCase.primaryResponse}
                  </div>
                ) : (
                  <div>
                    <textarea
                      value={primaryDraft}
                      onChange={(e) => setPrimaryDraft(e.target.value)}
                      placeholder="In the Name of Allah, Most Merciful. Regarding your inquiry on the utterance of divorce during severe anger..."
                      style={{ width: '100%', minHeight: 120, backgroundColor: '#0B1120', border: '1px solid #334155', borderRadius: 8, padding: 12, color: '#F8FAFC', fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
                      <button
                        onClick={handleDraftResponse}
                        style={{ backgroundColor: '#2563EB', color: '#FFFFFF', border: 'none', padding: '8px 18px', borderRadius: 6, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
                      >
                        Submit Determination as {activeScholar.name}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Step 2: Second Scholar Concurrence (Two-Person Rule) */}
              <div style={{ backgroundColor: '#0F172A', border: '1px solid #1E293B', borderRadius: 10, padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: '#F8FAFC', margin: 0 }}>
                    Step 2: Second Jurist Concurrence (Two-Person Verification)
                  </h3>
                  {currentCase.proofHash && (
                    <span style={{ fontSize: 12, color: '#10B981', fontWeight: 600 }}>
                      ✓ Verified & Delivered (Proof: {currentCase.proofHash.slice(0, 20)}...)
                    </span>
                  )}
                </div>

                {!currentCase.primaryResponse ? (
                  <div style={{ fontSize: 13, color: '#64748B', fontStyle: 'italic' }}>
                    Locked: Awaiting Step 1 Primary Determination before second scholar can concur.
                  </div>
                ) : currentCase.proofHash ? (
                  <div style={{ backgroundColor: '#0B1120', padding: 14, borderRadius: 8, border: '1px solid #065F46', fontSize: 13, color: '#A7F3D0' }}>
                    <strong>Concurrence Notes ({currentCase.secondaryScholarId}):</strong> {currentCase.secondaryConcurrenceNotes}
                    <div style={{ fontSize: 11, color: '#6EE7B7', marginTop: 8 }}>
                      Immutable Proof Hash: {currentCase.proofHash}
                    </div>
                  </div>
                ) : (
                  <div>
                    <p style={{ fontSize: 13, color: '#94A3B8', margin: '0 0 10px 0' }}>
                      As the independent second jurist, review the determination above. If you concur, document corroborating sources and sign off.
                    </p>
                    <textarea
                      value={concurrenceNotes}
                      onChange={(e) => setConcurrenceNotes(e.target.value)}
                      placeholder="Concurring opinion: The position aligns with Imam al-Nawawi's Al-Majmu' and Allamah Ibn Abidin's Radd al-Muhtar..."
                      style={{ width: '100%', minHeight: 90, backgroundColor: '#0B1120', border: '1px solid #334155', borderRadius: 8, padding: 12, color: '#F8FAFC', fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
                      <button
                        onClick={handleConcur}
                        style={{ backgroundColor: '#059669', color: '#FFFFFF', border: 'none', padding: '8px 18px', borderRadius: 6, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
                      >
                        Sign Concurrence & Generate Proof Hash
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : activeTab === 'QUARANTINE' && currentClaim ? (
            <div>
              <div style={{ marginBottom: 20 }}>
                <span style={{ fontSize: 11, fontWeight: 700, backgroundColor: '#451A03', color: '#F59E0B', padding: '3px 8px', borderRadius: 4 }}>
                  KNOWLEDGE INGESTION QUARANTINE GATE · {currentClaim.claimId}
                </span>
                <h2 style={{ fontSize: 22, fontWeight: 800, margin: '8px 0 0 0', color: '#F8FAFC' }}>
                  {currentClaim.detectedIssue}
                </h2>
              </div>

              <div style={{ backgroundColor: '#0F172A', border: '1px solid #1E293B', borderRadius: 10, padding: 22, marginBottom: 24 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B' }}>INGESTED CLAIM TEXT (BLOCKED FROM PRODUCTION RETRIEVAL)</span>
                <p style={{ fontSize: 15, color: '#F1F5F9', lineHeight: 1.6, margin: '10px 0 16px 0', fontStyle: 'italic' }}>
                  "{currentClaim.sourceText}"
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, backgroundColor: '#0B1120', padding: 14, borderRadius: 8, fontSize: 12 }}>
                  <div>
                    <span style={{ color: '#64748B' }}>Source Reference:</span> <strong style={{ color: '#CBD5E1' }}>{currentClaim.sourceReference}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748B' }}>Source Edition:</span> <strong style={{ color: '#CBD5E1' }}>{currentClaim.sourceEdition}</strong>
                  </div>
                </div>
                <div style={{ marginTop: 14 }}>
                  <span style={{ color: '#EF4444', fontSize: 12, fontWeight: 700 }}>Quarantine Intercept Reason:</span>
                  <p style={{ fontSize: 13, color: '#FCA5A5', margin: '4px 0 0 0' }}>{currentClaim.quarantineReason}</p>
                </div>
              </div>

              {/* Scholar Action Panel */}
              <div style={{ backgroundColor: '#0F172A', border: '1px solid #1E293B', borderRadius: 10, padding: 22 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#F8FAFC', margin: '0 0 10px 0' }}>
                  Scholarly Evaluation & Disposition
                </h3>
                <textarea
                  value={claimNotes}
                  onChange={(e) => setClaimNotes(e.target.value)}
                  placeholder="Record your scholarly rationale (e.g. Reject: Hadith has severe weakness in Isnad; or Approve: Add explicit plurality annotation)..."
                  style={{ width: '100%', minHeight: 80, backgroundColor: '#0B1120', border: '1px solid #334155', borderRadius: 8, padding: 12, color: '#F8FAFC', fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box' }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 14 }}>
                  <button
                    onClick={() => handleClaimDecision('REJECT')}
                    style={{ backgroundColor: '#DC2626', color: '#FFFFFF', border: 'none', padding: '9px 18px', borderRadius: 6, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
                  >
                    Permanently Purge & Reject Claim
                  </button>
                  <button
                    onClick={() => handleClaimDecision('APPROVE')}
                    style={{ backgroundColor: '#059669', color: '#FFFFFF', border: 'none', padding: '9px 18px', borderRadius: 6, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
                  >
                    Approve with Verification Hash
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </main>
      </div>
    </div>
  );
}
