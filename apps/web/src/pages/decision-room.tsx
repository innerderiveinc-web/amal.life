import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Navigation } from '../components/Navigation';
import { signatureCapabilitiesEngine, DecisionRoomEvaluation } from '@amal/amal-engine';

export default function DecisionRoomPage() {
  const [situation, setSituation] = useState(
    'My business partner unilaterally altered our revenue share agreement after 6 months of joint investment. I have not signed the new document yet, but he is withholding payouts.'
  );
  const [evaluation, setEvaluation] = useState<DecisionRoomEvaluation | null>(null);
  const [privacySetting, setPrivacySetting] = useState<'FULL_CONTEXT' | 'SELECTIVE_CONTEXT' | 'ANONYMOUS'>('SELECTIVE_CONTEXT');
  const [handoffSent, setHandoffSent] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pending = localStorage.getItem('amal_pending_situation');
      if (pending && pending.trim()) {
        setSituation(pending);
        const result = signatureCapabilitiesEngine.evaluateDecisionRoom(pending);
        setEvaluation(result);
        localStorage.removeItem('amal_pending_situation');
      }
    }
  }, []);

  const handleEvaluate = () => {
    const result = signatureCapabilitiesEngine.evaluateDecisionRoom(situation);
    setEvaluation(result);
    setHandoffSent(false);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FA' }}>
      <Head>
        <title>Deen Decision Room & Scholar Handoff | AMAL OS</title>
      </Head>
      <Navigation />

      <main style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px 60px' }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 28 }}>⚖️</span>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1B4332', margin: 0 }}>
              Deen Decision Room · کمرۂ مشاورت و تحقیق
            </h1>
          </div>
          <p style={{ color: '#4B5563', margin: 0, fontSize: 14, lineHeight: 1.6 }}>
            شرعی فتویٰ اور حتمی فیصلہ صرف زندہ و مستند مفتیانِ کرام کا منصب ہے۔ یہ کمرۂ مشاورت آپ کے پیچیدہ معاملے (تجارت، خاندانی مسائل، نزاع) کو فقہی اصولوں کی روشنی میں مرتب کرتا ہے، متفقہ و اختلافی آراء کی وضاحت کرتا ہے، اور اہل علم سے رجوع کے لیے کیس فائل تیار کرتا ہے۔
          </p>
        </div>

        {/* Input Card */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 24, border: '1px solid #E5E7EB', marginBottom: 24 }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: '#111827', display: 'block', marginBottom: 8 }}>
            DESCRIBE YOUR COMPLEX SITUATION / CONTRACTUAL DILEMMA:
          </label>
          <textarea
            rows={4}
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            style={{
              width: '100%',
              padding: 12,
              borderRadius: 8,
              border: '1px solid #D1D5DB',
              fontSize: 14,
              fontFamily: 'inherit',
              lineHeight: 1.5,
              marginBottom: 16,
            }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                type="button"
                onClick={() => setSituation('My business partner unilaterally altered our revenue share agreement after 6 months of joint investment.')}
                style={{ fontSize: 12, padding: '4px 10px', borderRadius: 6, border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', cursor: 'pointer' }}
              >
                Sample: Business Dispute
              </button>
              <button
                type="button"
                onClick={() => setSituation('My spouse and in-laws have conflicting expectations regarding joint living arrangements, leading to severe emotional tension.')}
                style={{ fontSize: 12, padding: '4px 10px', borderRadius: 6, border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', cursor: 'pointer' }}
              >
                Sample: Family Mediation
              </button>
            </div>

            <button
              onClick={handleEvaluate}
              style={{
                padding: '10px 24px',
                borderRadius: 8,
                backgroundColor: '#1B4332',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: 14,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Deconstruct Dilemma →
            </button>
          </div>
        </div>

        {/* Evaluation Output */}
        {evaluation && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* 4 Pillars Breakdown */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              {/* Pillar 1: What is Clear & Agreed */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: 10, padding: 18, border: '1px solid #86EFAC', borderTop: '4px solid #166534' }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#166534', letterSpacing: 1 }}>WHAT IS CLEAR (MUTTAFAQ ALAYH)</span>
                <ul style={{ margin: '10px 0 0', paddingLeft: 18, fontSize: 13, color: '#1F2937', lineHeight: 1.6 }}>
                  {evaluation.whatIsClearAndAgreed.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Pillar 2: What Differs */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: 10, padding: 18, border: '1px solid #FDE047', borderTop: '4px solid #CA8A04' }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#854D0E', letterSpacing: 1 }}>WHAT DIFFERS ACROSS MADHHABS</span>
                <ul style={{ margin: '10px 0 12px', paddingLeft: 18, fontSize: 13, color: '#1F2937', lineHeight: 1.6 }}>
                  {evaluation.whatDiffersAcrossSchools.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <div style={{ borderTop: '1px solid #FEF08A', paddingTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <Link href="/library?work=CANON-FIQ-HNF-001" style={{ fontSize: 11, textDecoration: 'none', backgroundColor: '#FEF9C3', color: '#854D0E', padding: '3px 8px', borderRadius: 4, fontWeight: 700 }}>
                    🏛️ Hanafi (Al-Hidayah)
                  </Link>
                  <Link href="/library?work=CANON-FIQ-MAL-001" style={{ fontSize: 11, textDecoration: 'none', backgroundColor: '#FEF9C3', color: '#854D0E', padding: '3px 8px', borderRadius: 4, fontWeight: 700 }}>
                    🌴 Maliki (Ibn Ashir)
                  </Link>
                  <Link href="/library?work=CANON-FIQ-SHAF-001" style={{ fontSize: 11, textDecoration: 'none', backgroundColor: '#FEF9C3', color: '#854D0E', padding: '3px 8px', borderRadius: 4, fontWeight: 700 }}>
                    ⚖️ Shafi'i (Abi Shuja')
                  </Link>
                  <Link href="/library?work=CANON-FIQ-HAN-001" style={{ fontSize: 11, textDecoration: 'none', backgroundColor: '#FEF9C3', color: '#854D0E', padding: '3px 8px', borderRadius: 4, fontWeight: 700 }}>
                    📜 Hanbali (Umdat al-Fiqh)
                  </Link>
                </div>
              </div>

              {/* Pillar 3: What Depends on Personal Circumstances */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: 10, padding: 18, border: '1px solid #BAE6FD', borderTop: '4px solid #0284C7' }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#0369A1', letterSpacing: 1 }}>WHAT DEPENDS ON CIRCUMSTANCES</span>
                <ul style={{ margin: '10px 0 0', paddingLeft: 18, fontSize: 13, color: '#1F2937', lineHeight: 1.6 }}>
                  {evaluation.whatDependsOnPersonalCircumstances.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Safe Immediate Synthesis */}
            <div style={{ backgroundColor: '#F0FDF4', borderRadius: 10, padding: 18, border: '1px solid #86EFAC' }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: '#15803D' }}>🛡️ AMAL'S SAFE IMMEDIATE SYNTHESIS</span>
              <p style={{ margin: '6px 0 0', fontSize: 14, color: '#14532D', lineHeight: 1.6 }}>
                {evaluation.safeImmediateSynthesis}
              </p>
            </div>

            {/* Scholar Handoff Card */}
            {evaluation.scholarHandoffRequired && evaluation.handoffPacketDraft && (
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 24, border: '2px solid #1B4332' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#047857', backgroundColor: '#ECFDF5', padding: '3px 8px', borderRadius: 4 }}>
                      HUMAN SCHOLAR PROTOCOL · تصدیقِ علماء
                    </span>
                    <h3 style={{ fontSize: 18, fontWeight: 800, color: '#111827', margin: '6px 0 0' }}>
                      Ready-to-Transmit Scholar Case File
                    </h3>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: '#4B5563' }}>Privacy Level:</label>
                    <select
                      value={privacySetting}
                      onChange={(e) => setPrivacySetting(e.target.value as any)}
                      style={{ fontSize: 12, padding: '4px 8px', borderRadius: 6, border: '1px solid #D1D5DB' }}
                    >
                      <option value="SELECTIVE_CONTEXT">Selective Context (Recommended)</option>
                      <option value="ANONYMOUS">100% Anonymized (Zero-Knowledge)</option>
                      <option value="FULL_CONTEXT">Full Context</option>
                    </select>
                  </div>
                </div>

                <div style={{ backgroundColor: '#F9FAFB', borderRadius: 8, padding: 16, fontSize: 13, color: '#374151', marginBottom: 16 }}>
                  <div style={{ fontWeight: 700, color: '#111827', marginBottom: 4 }}>Jurisprudential Case Questions Prepared for Jurist:</div>
                  <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.6 }}>
                    {evaluation.handoffPacketDraft.jurisprudentialQuestions.map((q, idx) => (
                      <li key={idx}>{q}</li>
                    ))}
                  </ul>
                  <div style={{ marginTop: 10, fontSize: 11, color: '#6B7280' }}>
                    Track Assigned: <strong>{evaluation.handoffPacketDraft.assignedScholarTrack}</strong> • Audit Provenance: {evaluation.handoffPacketDraft.auditHash}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                  {handoffSent ? (
                    <div style={{ color: '#15803D', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                      ✓ Case Packet Dispatched to Verified Dual Jurist Review Queue!
                    </div>
                  ) : (
                    <button
                      onClick={() => setHandoffSent(true)}
                      style={{
                        padding: '10px 22px',
                        borderRadius: 8,
                        backgroundColor: '#047857',
                        color: '#FFFFFF',
                        fontWeight: 700,
                        fontSize: 14,
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      Transmit to Qualified Scholars →
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
