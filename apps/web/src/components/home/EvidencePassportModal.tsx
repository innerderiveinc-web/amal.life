import React from 'react';
import { EvidencePassport } from '@amal/amal-engine';

export interface EvidencePassportModalProps {
  activePassport: EvidencePassport | null;
  onClose: () => void;
}

export const EvidencePassportModal: React.FC<EvidencePassportModalProps> = ({
  activePassport,
  onClose,
}) => {
  if (!activePassport) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        zIndex: 9999,
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          maxWidth: 720,
          width: '100%',
          maxHeight: '85vh',
          overflowY: 'auto',
          padding: 28,
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
            borderBottom: '1px solid #E5E7EB',
            paddingBottom: 12,
          }}
        >
          <div>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#047857', letterSpacing: 1 }}>
              EVIDENCE PASSPORT • PROOF MODE
            </span>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: '#1B4332', margin: '4px 0 0' }}>
              Complete Provenance &amp; Reasoning Chain
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Evidence Passport"
            style={{
              backgroundColor: '#E5E7EB',
              border: 'none',
              borderRadius: 20,
              width: 32,
              height: 32,
              cursor: 'pointer',
              fontWeight: 700,
            }}
          >
            ✕
          </button>
        </div>

        {/* Passport Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ backgroundColor: '#F9FAFB', padding: 12, borderRadius: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#6B7280' }}>WHAT WAS RECOMMENDED:</span>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginTop: 2 }}>
              {activePassport.whatAmalSynthesized}
            </div>
          </div>

          <div>
            <span style={{ fontSize: 12, fontWeight: 800, color: '#1B4332' }}>
              1. PRIMARY QURAN &amp; HADITH EVIDENCE:
            </span>
            {activePassport.primaryEvidence.hadithReferences.map((h, i) => (
              <div
                key={i}
                style={{
                  marginTop: 4,
                  padding: 10,
                  borderRadius: 6,
                  backgroundColor: '#F0FDF4',
                  fontSize: 12,
                }}
              >
                <div style={{ direction: 'rtl', fontSize: 14, color: '#047857', fontWeight: 700 }}>
                  {h.arabicMatn}
                </div>
                <div style={{ marginTop: 4, color: '#374151' }}>&ldquo;{h.translation}&rdquo;</div>
                <div style={{ marginTop: 2, fontSize: 11, color: '#166534', fontWeight: 600 }}>
                  Source: {h.canonicalCollection} ({h.hadithNumber}) • Grade: {h.classicalGrading}
                </div>
              </div>
            ))}
          </div>

          <div>
            <span style={{ fontSize: 12, fontWeight: 800, color: '#1B4332' }}>
              2. PHYSICAL PRINT PROVENANCE &amp; CRITICAL EDITION:
            </span>
            {activePassport.provenanceAndEditions.map((p, i) => (
              <div
                key={i}
                style={{
                  marginTop: 4,
                  padding: 10,
                  borderRadius: 6,
                  backgroundColor: '#F9FAFB',
                  fontSize: 12,
                  color: '#374151',
                }}
              >
                <div>
                  <strong>Title:</strong> {p.bookTitle} by {p.author} (d. {p.deathYearHijri} AH)
                </div>
                <div>
                  <strong>Edition:</strong> {p.printEdition} ({p.publisher})
                </div>
                <div>
                  <strong>Editor (Muhaqqiq):</strong> {p.muhaqqiq} • Location: {p.volumeAndPage}
                </div>
                <div style={{ fontSize: 10, color: '#6B7280', marginTop: 2 }}>
                  SHA-256 Hash: {p.sha256ProvenanceHash}
                </div>
              </div>
            ))}
          </div>

          <div>
            <span style={{ fontSize: 12, fontWeight: 800, color: '#1B4332' }}>
              3. THE FOUR SUNNI MADHHABS POSITIONS:
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 4 }}>
              <div style={{ padding: 8, borderRadius: 6, backgroundColor: '#F9FAFB', fontSize: 11 }}>
                <strong>Hanafi:</strong> {activePassport.madhhabPositions.hanafi}
              </div>
              <div style={{ padding: 8, borderRadius: 6, backgroundColor: '#F9FAFB', fontSize: 11 }}>
                <strong>Shafi&apos;i:</strong> {activePassport.madhhabPositions.shafii}
              </div>
              <div style={{ padding: 8, borderRadius: 6, backgroundColor: '#F9FAFB', fontSize: 11 }}>
                <strong>Maliki:</strong> {activePassport.madhhabPositions.maliki}
              </div>
              <div style={{ padding: 8, borderRadius: 6, backgroundColor: '#F9FAFB', fontSize: 11 }}>
                <strong>Hanbali:</strong> {activePassport.madhhabPositions.hanbali}
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#FEF3C7',
              padding: 10,
              borderRadius: 6,
              fontSize: 11,
              color: '#92400E',
            }}
          >
            <strong>EPISTEMIC LIMITATION NOTE:</strong>{' '}
            {activePassport.epistemicUncertainty.whatDependsOnPersonalContext}
          </div>
        </div>
      </div>
    </div>
  );
};
