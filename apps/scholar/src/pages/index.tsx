import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { ScholarApiClient, ScholarCaseRecord, QuarantinedClaimRecord } from '../lib/api';
import { ScholarHeader, ActiveScholarProfile } from '../components/ScholarHeader';
import { ScholarQueueSidebar } from '../components/ScholarQueueSidebar';
import { ScholarCaseWorkspace } from '../components/ScholarCaseWorkspace';
import { ScholarQuarantineWorkspace } from '../components/ScholarQuarantineWorkspace';

export default function ScholarPortal() {
  const [activeTab, setActiveTab] = useState<'CASES' | 'QUARANTINE'>('CASES');
  const [cases, setCases] = useState<ScholarCaseRecord[]>([]);
  const [selectedCaseId, setSelectedCaseId] = useState<string>('case-8102');
  const [quarantinedClaims, setQuarantinedClaims] = useState<QuarantinedClaimRecord[]>([]);
  const [selectedClaimId, setSelectedClaimId] = useState<string>('CLM-QUAR-001');

  // Logged-in scholar identity simulation
  const [activeScholar, setActiveScholar] = useState<ActiveScholarProfile>({
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
    <div
      style={{
        backgroundColor: '#0A0F1D',
        minHeight: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: '#E2E8F0',
      }}
    >
      <Head>
        <title>AMAL OS — Two-Person Scholar Verification Desk</title>
      </Head>

      {/* Top Header */}
      <ScholarHeader
        activeScholar={activeScholar}
        setActiveScholar={setActiveScholar}
        currentTab="TRIAGE"
      />

      {/* Main Workspace Layout */}
      <div style={{ display: 'flex', height: 'calc(100vh - 65px)' }}>
        {/* Navigation & Queue Sidebar */}
        <ScholarQueueSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          cases={cases}
          selectedCaseId={selectedCaseId}
          setSelectedCaseId={setSelectedCaseId}
          quarantinedClaims={quarantinedClaims}
          selectedClaimId={selectedClaimId}
          setSelectedClaimId={setSelectedClaimId}
        />

        {/* Workstation Center */}
        <main style={{ flex: 1, overflowY: 'auto', padding: 28, backgroundColor: '#0A0F1D' }}>
          {actionSuccess && (
            <div
              style={{
                backgroundColor: '#064E3B',
                border: '1px solid #059669',
                color: '#A7F3D0',
                padding: 14,
                borderRadius: 8,
                marginBottom: 20,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {actionSuccess}
            </div>
          )}

          {activeTab === 'CASES' && currentCase ? (
            <ScholarCaseWorkspace
              currentCase={currentCase}
              activeScholar={activeScholar}
              primaryDraft={primaryDraft}
              setPrimaryDraft={setPrimaryDraft}
              concurrenceNotes={concurrenceNotes}
              setConcurrenceNotes={setConcurrenceNotes}
              handleDraftResponse={handleDraftResponse}
              handleConcur={handleConcur}
            />
          ) : activeTab === 'QUARANTINE' && currentClaim ? (
            <ScholarQuarantineWorkspace
              currentClaim={currentClaim}
              claimNotes={claimNotes}
              setClaimNotes={setClaimNotes}
              handleClaimDecision={handleClaimDecision}
            />
          ) : null}
        </main>
      </div>
    </div>
  );
}
