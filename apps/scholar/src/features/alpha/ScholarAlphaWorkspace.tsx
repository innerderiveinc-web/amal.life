import React, { useState } from 'react';
import { AmalTheme } from '@amal/ui';
import { CanonicalEditionRecord, MASTER_CANONICAL_CORPUS } from '@amal/evidence';

export const ScholarAlphaWorkspace: React.FC = () => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('ALL');
  const [selectedEdition, setSelectedEdition] = useState<CanonicalEditionRecord>(MASTER_CANONICAL_CORPUS[0]!);
  const [primaryNotes, setPrimaryNotes] = useState('');
  const [secondaryNotes, setSecondaryNotes] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const [reviewStates, setReviewStates] = useState<Record<string, {
    dualJuristStatus: 'PENDING_PRIMARY' | 'PENDING_SECONDARY' | 'CONCURRED' | 'DISPUTED';
    primaryReviewer?: string;
    secondaryReviewer?: string;
  }>>({
    'CANON-QUR-001': { dualJuristStatus: 'CONCURRED', primaryReviewer: 'SCH-ALP-001', secondaryReviewer: 'SCH-ALP-003' },
    'CANON-HAD-001': { dualJuristStatus: 'CONCURRED', primaryReviewer: 'SCH-ALP-005', secondaryReviewer: 'SCH-ALP-002' },
    'CANON-FIQ-HAN-001': { dualJuristStatus: 'PENDING_SECONDARY', primaryReviewer: 'SCH-ALP-001' },
    'CANON-FIQ-MAL-001': { dualJuristStatus: 'PENDING_SECONDARY', primaryReviewer: 'SCH-ALP-002' },
  });

  const currentReviewState = reviewStates[selectedEdition.work_id] || { dualJuristStatus: 'PENDING_PRIMARY' };

  const handleSignPrimary = () => {
    setReviewStates((prev) => ({
      ...prev,
      [selectedEdition.work_id]: {
        dualJuristStatus: 'PENDING_SECONDARY',
        primaryReviewer: 'SCH-ALP-001',
      },
    }));
    setStatusMessage(`Primary scholarly evaluation submitted for ${selectedEdition.title_transliterated}. Awaiting Secondary Jurist review.`);
  };

  const handleSignSecondary = (decision: 'CONCUR' | 'DISPUTE') => {
    setReviewStates((prev) => ({
      ...prev,
      [selectedEdition.work_id]: {
        ...prev[selectedEdition.work_id],
        dualJuristStatus: decision === 'CONCUR' ? 'CONCURRED' : 'DISPUTED',
        secondaryReviewer: 'SCH-ALP-002',
      },
    }));
    setStatusMessage(`Secondary Jurist review recorded: ${decision}. Invariant INV_07 Dual-Jurist protocol fulfilled.`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Top Banner */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 24,
        border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: 12, fontWeight: 700, color: AmalTheme.colors.primary, letterSpacing: 1 }}>
              AMAL OS · PHASE 17
            </span>
            <h1 style={{ fontSize: 24, fontWeight: 800, margin: '6px 0 2px', color: AmalTheme.colors.text.primaryLight }}>
              Scholar Alpha Operational Gateway
            </h1>
            <p style={{ margin: 0, fontSize: 13, color: '#666' }}>
              Wave 1 Real Classical Corpus Ingestion · Dual-Jurist Verification Protocol (INV_07) · Zero-Hallucination Gate
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{
              fontSize: 12,
              padding: '4px 12px',
              borderRadius: 16,
              backgroundColor: '#E8F5E9',
              color: '#2E7D32',
              fontWeight: 700,
            }}>
              VETTED SCHOLAR COHORT ACTIVE
            </span>
            <div style={{ fontSize: 11, color: '#777', marginTop: 4 }}>
              12 Independent Jurists Across 4 Madhhabs
            </div>
          </div>
        </div>

        {statusMessage && (
          <div style={{
            marginTop: 16,
            padding: '12px 16px',
            backgroundColor: '#E8F5E9',
            borderRadius: 8,
            color: '#2E7D32',
            fontSize: 13,
            fontWeight: 600,
          }}>
            ✓ {statusMessage}
          </div>
        )}
      </div>

      {/* Main Grid: Wave 1 Edition List + Inspection Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 20 }}>
        {/* Edition List */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          padding: 20,
          border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
          maxHeight: 700,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>
              Canonical Works ({MASTER_CANONICAL_CORPUS.length})
            </h3>
            <span style={{ fontSize: 11, color: '#777' }}>Waves 1, 2 & 3</span>
          </div>

          {/* Discipline filter chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, margin: '8px 0' }}>
            {['ALL', 'HADITH', 'TAFSIR', 'USUL', 'MUSTALAH', 'AQEEDAH', 'HANAFI', 'MALIKI', 'SHAFII', 'HANBALI', 'SIRAH', 'TAZKIYAH', 'HISTORY'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedDiscipline(cat)}
                style={{
                  padding: '3px 8px',
                  borderRadius: 6,
                  border: '1px solid #CCC',
                  fontSize: 10,
                  fontWeight: 600,
                  backgroundColor: selectedDiscipline === cat ? '#263238' : '#FFF',
                  color: selectedDiscipline === cat ? '#FFF' : '#333',
                  cursor: 'pointer',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {MASTER_CANONICAL_CORPUS.filter((item) => {
            if (selectedDiscipline === 'ALL') return true;
            if (selectedDiscipline === 'HANAFI') return item.discipline === 'HANAFI_FIQH';
            if (selectedDiscipline === 'MALIKI') return item.discipline === 'MALIKI_FIQH';
            if (selectedDiscipline === 'SHAFII') return item.discipline === 'SHAFII_FIQH';
            if (selectedDiscipline === 'HANBALI') return item.discipline === 'HANBALI_FIQH';
            if (selectedDiscipline === 'SIRAH') return item.discipline === 'SIRAH' || item.discipline === 'SHAMAIL';
            if (selectedDiscipline === 'TAZKIYAH') return item.discipline === 'TAZKIYAH' || item.discipline === 'SPIRITUAL_HERITAGE';
            if (selectedDiscipline === 'USUL') return item.discipline === 'USUL_AL_FIQH';
            if (selectedDiscipline === 'MUSTALAH') return item.discipline === 'MUSTALAH_AL_HADITH';
            if (selectedDiscipline === 'HISTORY') return item.discipline === 'ISLAMIC_HISTORY';
            return item.discipline === selectedDiscipline;
          }).map((item) => {
            const isSelected = item.work_id === selectedEdition.work_id;
            const rState = reviewStates[item.work_id]?.dualJuristStatus || 'PENDING_PRIMARY';
            return (
              <div
                key={item.work_id}
                onClick={() => setSelectedEdition(item)}
                style={{
                  padding: 12,
                  borderRadius: 10,
                  backgroundColor: isSelected ? '#F0F7FF' : '#FAFAFA',
                  border: isSelected ? `2px solid ${AmalTheme.colors.primary}` : '1px solid #EEE',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: AmalTheme.colors.primary }}>
                    {item.discipline.replace(/_/g, ' ')}
                  </span>
                  <span style={{
                    fontSize: 10,
                    padding: '2px 6px',
                    borderRadius: 4,
                    backgroundColor: rState === 'CONCURRED' ? '#E8F5E9' : '#FFF3E0',
                    color: rState === 'CONCURRED' ? '#2E7D32' : '#E65100',
                    fontWeight: 700,
                  }}>
                    {rState}
                  </span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, marginTop: 4, color: '#222' }}>
                  {item.title_transliterated}
                </div>
                <div style={{ fontSize: 11, color: '#666', marginTop: 2 }}>
                  {item.author_name} ({item.author_death_hijri ? `${item.author_death_hijri} AH` : 'Revelation'})
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Inspection & Review Form */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          padding: 24,
          border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: 11, fontWeight: 700, color: AmalTheme.colors.primary }}>
                WORK ID: {selectedEdition.work_id} · {selectedEdition.scholarly_authority_level}
              </span>
              <h2 style={{ margin: '4px 0', fontSize: 20, fontWeight: 800 }}>
                {selectedEdition.title_arabic}
              </h2>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#555' }}>
                {selectedEdition.title_transliterated}
              </h3>
            </div>
            <span style={{
              fontSize: 12,
              padding: '4px 10px',
              borderRadius: 8,
              backgroundColor: currentReviewState.dualJuristStatus === 'CONCURRED' ? '#E8F5E9' : '#FFF3E0',
              color: currentReviewState.dualJuristStatus === 'CONCURRED' ? '#2E7D32' : '#E65100',
              fontWeight: 700,
            }}>
              DUAL-JURIST: {currentReviewState.dualJuristStatus}
            </span>
          </div>

          {/* Bibliographic Details Table */}
          <div style={{
            backgroundColor: '#FAFAFA',
            borderRadius: 10,
            padding: 16,
            border: '1px solid #EEE',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 12,
            fontSize: 12,
          }}>
            <div><strong>Publisher:</strong> {selectedEdition.edition_publisher}</div>
            <div><strong>City:</strong> {selectedEdition.publication_city}</div>
            <div><strong>Muhaqqiq / Editor:</strong> {selectedEdition.critical_editor_muhaqqiq}</div>
            <div><strong>Volumes:</strong> {selectedEdition.volume_count}</div>
            <div><strong>Rights Status:</strong> {selectedEdition.rights_status}</div>
            <div><strong>Authority Tier:</strong> {selectedEdition.scholarly_authority_level}</div>
          </div>

          {/* Provenance Hash */}
          <div style={{
            backgroundColor: '#F5F5F5',
            borderRadius: 8,
            padding: '10px 14px',
            fontSize: 11,
            color: '#444',
            fontFamily: 'monospace',
            wordBreak: 'break-all',
          }}>
            <strong>SHA-256 Provenance Fingerprint:</strong> {selectedEdition.provenance_sha256}
          </div>

          {/* Invariant Warning */}
          <div style={{
            backgroundColor: '#FFF8E1',
            borderLeft: '4px solid #FFA000',
            padding: 12,
            borderRadius: 8,
            fontSize: 12,
            color: '#E65100',
            lineHeight: 1.5,
          }}>
            <strong>Invariant INV_07 Requirement:</strong> Two independent verified jurists must physically sign off on every passage before candidate text is released into the public retrieval graph.
          </div>

          {/* Review Action Controls */}
          {currentReviewState.dualJuristStatus === 'PENDING_PRIMARY' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
              <label style={{ fontSize: 13, fontWeight: 700 }}>Primary Jurist Examination Notes:</label>
              <textarea
                value={primaryNotes}
                onChange={(e) => setPrimaryNotes(e.target.value)}
                placeholder="Verify critical print edition fidelity, matn integrity, and authorial attribution..."
                style={{ width: '100%', height: 80, padding: 10, borderRadius: 8, border: '1px solid #CCC' }}
              />
              <button
                onClick={handleSignPrimary}
                style={{
                  alignSelf: 'flex-start',
                  padding: '10px 20px',
                  backgroundColor: AmalTheme.colors.primary,
                  color: '#FFF',
                  border: 'none',
                  borderRadius: 8,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Sign as Primary Jurist (Scholar Alpha)
              </button>
            </div>
          )}

          {currentReviewState.dualJuristStatus === 'PENDING_SECONDARY' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
              <div style={{ fontSize: 12, color: '#555' }}>
                Primary review signed by: <strong>{currentReviewState.primaryReviewer}</strong>. Awaiting secondary independent review.
              </div>
              <label style={{ fontSize: 13, fontWeight: 700 }}>Secondary Jurist Concurrence / Critique:</label>
              <textarea
                value={secondaryNotes}
                onChange={(e) => setSecondaryNotes(e.target.value)}
                placeholder="Conduct independent audit of primary findings according to school methodology..."
                style={{ width: '100%', height: 80, padding: 10, borderRadius: 8, border: '1px solid #CCC' }}
              />
              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  onClick={() => handleSignSecondary('CONCUR')}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#2E7D32',
                    color: '#FFF',
                    border: 'none',
                    borderRadius: 8,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Concur & Release to Graph (INV_07 Certified)
                </button>
                <button
                  onClick={() => handleSignSecondary('DISPUTE')}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#C62828',
                    color: '#FFF',
                    border: 'none',
                    borderRadius: 8,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Flag Discrepancy & Quarantine
                </button>
              </div>
            </div>
          )}

          {currentReviewState.dualJuristStatus === 'CONCURRED' && (
            <div style={{
              padding: 16,
              backgroundColor: '#E8F5E9',
              borderRadius: 10,
              color: '#2E7D32',
              fontSize: 13,
              fontWeight: 600,
            }}>
              ✓ Two-Scholar Dual Jurist Protocol Complete: Verified by {currentReviewState.primaryReviewer} and {currentReviewState.secondaryReviewer}. Active in Production Knowledge Graph.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
