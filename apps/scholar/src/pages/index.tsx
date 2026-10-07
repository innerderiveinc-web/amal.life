import React, { useState } from 'react';
import Head from 'next/head';
import { AmalTheme } from '@amal/ui';

export default function ScholarPortal() {
  const [activeCaseId, setActiveCaseId] = useState('case-8102');
  const [scholarAnswer, setScholarAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const currentCase = {
    caseId: 'case-8102',
    userQuestion: 'I was extremely angry during an argument and uttered words of divorce. Does this constitute irrevocable talaq in my situation?',
    sanitizedContext: 'Married 4 years, two minor children. Incident occurred during severe heated distress.',
    detectedIssue: 'Marital dissolution under duress/anger (Talaq al-Ghadban). Requires pastoral clarification.',
    urgency: 'HIGH',
    consentGranted: true,
    suggestedSources: [
      'Surah al-Baqarah 2:229',
      'Sunan Abi Dawud 2193 (No divorce under closed duress)',
      'Classical Hanafi and Hanbali positions on pronouncements in severe anger',
    ],
  };

  const handleSendResponse = () => {
    if (!scholarAnswer) return;
    setSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <Head>
        <title>AMAL Scholar Network — Pastoral Jurisprudence Portal</title>
      </Head>

      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <aside style={{ width: 300, backgroundColor: '#0B2920', minHeight: '100vh', padding: 24, color: '#FFFFFF' }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 4px 0', color: '#6EE7B7' }}>SCHOLAR PORTAL</h2>
          <span style={{ fontSize: 12, color: '#A7F3D0' }}>Dr. Ibrahim Al-Mansoor · Senior Mufti</span>

          <div style={{ marginTop: 30 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#6EE7B7', letterSpacing: 1 }}>ACTIVE CASE QUEUE</span>
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div
                onClick={() => setActiveCaseId('case-8102')}
                style={{
                  backgroundColor: '#164E3D',
                  padding: 12,
                  borderRadius: 8,
                  cursor: 'pointer',
                  border: '1px solid #34D399',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                  <span style={{ color: '#FCD34D', fontWeight: 700 }}>HIGH URGENCY</span>
                  <span style={{ color: '#D1FAE5' }}>#case-8102</span>
                </div>
                <div style={{ fontSize: 13, marginTop: 4, fontWeight: 600 }}>Talaq Pronouncement Inquiry</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Case Workstation */}
        <main style={{ flex: 1, padding: 36 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#B45309', backgroundColor: '#FEF3C7', padding: '3px 8px', borderRadius: 4 }}>
                CLASS D FATWA FIREWALL ESCALATION
              </span>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: '#1E293B', margin: '8px 0 0 0' }}>Case #{currentCase.caseId}</h1>
            </div>
            <span style={{ fontSize: 13, color: '#059669', fontWeight: 600 }}>✓ Explicit User Consent Granted</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
            {/* User Question */}
            <div style={{ backgroundColor: '#FFFFFF', padding: 20, borderRadius: 12, border: '1px solid #E2E8F0' }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#475569', margin: '0 0 10px 0' }}>USER INQUIRY</h3>
              <p style={{ fontSize: 15, color: '#1E293B', lineHeight: 1.6, fontStyle: 'italic', margin: 0 }}>
                "{currentCase.userQuestion}"
              </p>
              <h4 style={{ fontSize: 12, fontWeight: 700, color: '#64748B', margin: '16px 0 6px 0' }}>SANITIZED CONTEXT</h4>
              <p style={{ fontSize: 13, color: '#334155', margin: 0 }}>{currentCase.sanitizedContext}</p>
            </div>

            {/* AI Triage & Sources */}
            <div style={{ backgroundColor: '#FFFFFF', padding: 20, borderRadius: 12, border: '1px solid #E2E8F0' }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#475569', margin: '0 0 10px 0' }}>AI DETECTED ISSUE & SUGGESTED SOURCES</h3>
              <p style={{ fontSize: 13, color: '#0F4C3A', fontWeight: 600, margin: '0 0 12px 0' }}>{currentCase.detectedIssue}</p>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: '#475569', lineHeight: 1.6 }}>
                {currentCase.suggestedSources.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
              <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 12, fontStyle: 'italic' }}>
                Note: AMAL AI never modifies your pastoral determination or response.
              </p>
            </div>
          </div>

          {/* Response Editor */}
          <div style={{ backgroundColor: '#FFFFFF', padding: 24, borderRadius: 12, border: '1px solid #E2E8F0' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', margin: '0 0 8px 0' }}>Authoritative Scholarly Response</h3>
            <p style={{ fontSize: 13, color: '#64748B', margin: '0 0 14px 0' }}>
              Your determination will be delivered directly and securely to the user without AI alteration.
            </p>
            <textarea
              style={{ width: '100%', minHeight: 140, padding: 14, borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box' }}
              placeholder="In the name of Allah, Most Gracious, Most Merciful. Regarding your inquiry..."
              value={scholarAnswer}
              onChange={(e) => setScholarAnswer(e.target.value)}
            />
            <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button
                onClick={handleSendResponse}
                style={{ backgroundColor: '#0F4C3A', color: '#FFFFFF', border: 'none', padding: '10px 20px', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}
              >
                {submitted ? '✓ Sent & Recorded' : 'Deliver Scholarly Determination'}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
