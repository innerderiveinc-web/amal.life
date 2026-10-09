import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import { Navigation } from '../components/Navigation';
import { deenReplayEngine, DeenReplayAnnualReport } from '@amal/amal-engine';

export default function DeenReplayPage() {
  const [selectedQuarter, setSelectedQuarter] = useState<'ALL' | 'Q1' | 'Q2' | 'Q3' | 'Q4'>('ALL');

  const report: DeenReplayAnnualReport = useMemo(() => {
    return deenReplayEngine.generateAnnualReplay('usr_demo_1', 2026);
  }, []);

  const visibleQuarters = useMemo(() => {
    if (selectedQuarter === 'ALL') return report.quarters;
    return report.quarters.filter(q => q.quarter === selectedQuarter);
  }, [selectedQuarter, report]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FA', paddingBottom: 60 }}>
      <Head>
        <title>Deen Replay (Longitudinal Reflection) | AMAL OS</title>
      </Head>
      <Navigation />

      <main style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 28 }}>🕰️</span>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1B4332', margin: 0 }}>
              Deen Replay ({report.year})
            </h1>
          </div>
          <p style={{ color: '#4B5563', margin: 0, fontSize: 14 }}>
            Longitudinal spiritual introspection across your entire year. 
            <strong style={{ color: '#15803D' }}> Zero Iman scores. Zero Taqwa streaks. Zero gamification.</strong> Honest Muhasabah between the servant and the Creator.
          </p>
        </div>

        {/* Narrative Hero Card */}
        <div style={{
          backgroundColor: '#1B4332',
          borderRadius: 16,
          padding: 28,
          color: '#FFFFFF',
          marginBottom: 24,
        }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: '#86EFAC', letterSpacing: 1.5, textTransform: 'uppercase' }}>
            ANNUAL SPIRITUAL NARRATIVE
          </span>
          <h2 style={{ fontSize: 22, fontWeight: 800, margin: '6px 0 10px', color: '#FFFFFF' }}>
            {report.thematicJourneyTitle}
          </h2>
          <p style={{ fontSize: 14, color: '#D1FAE5', lineHeight: 1.6, margin: 0 }}>
            {report.coreGrowthNarrative}
          </p>
        </div>

        {/* Anchors vs Honest Weaknesses */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 24 }}>
          {/* Anchors */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20, border: '1px solid #86EFAC', borderTop: '4px solid #166534' }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: '#166534', letterSpacing: 0.5 }}>
              ANCHORS THAT ACTUALLY HELD FIRM
            </span>
            <ul style={{ margin: '10px 0 0', paddingLeft: 18, fontSize: 13, color: '#374151', lineHeight: 1.6 }}>
              {report.spiritualAnchorsDiscovered.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>

          {/* Honest Weaknesses */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20, border: '1px solid #FECACA', borderTop: '4px solid #DC2626' }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: '#991B1B', letterSpacing: 0.5 }}>
              CHRONIC VULNERABILITIES IDENTIFIED
            </span>
            <ul style={{ margin: '10px 0 0', paddingLeft: 18, fontSize: 13, color: '#374151', lineHeight: 1.6 }}>
              {report.honestWeaknessesIdentified.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quarter Selector */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {(['ALL', 'Q1', 'Q2', 'Q3', 'Q4'] as const).map(q => (
            <button
              key={q}
              onClick={() => setSelectedQuarter(q)}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 13,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: selectedQuarter === q ? '#1B4332' : '#E5E7EB',
                color: selectedQuarter === q ? '#FFFFFF' : '#4B5563',
              }}
            >
              {q === 'ALL' ? 'All Quarters' : `Quarter ${q.replace('Q', '')}`}
            </button>
          ))}
        </div>

        {/* Quarters Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {visibleQuarters.map((q) => (
            <div key={q.quarter} style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 22, border: '1px solid #E5E7EB' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: '#1B4332' }}>
                  {q.quarter} {q.year} OVERVIEW
                </span>
                <span style={{ fontSize: 12, color: '#6B7280' }}>
                  Next Step: {q.nextMilestoneRecommendation}
                </span>
              </div>

              {/* Observed Shift */}
              <div style={{ marginBottom: 12, fontSize: 13, color: '#374151' }}>
                <strong>Key Shift:</strong> {q.observedShifts.join(' ')}
              </div>

              {/* Chronic Friction & Sustainable Remedy */}
              {q.chronicFrictionPoints.map((f, i) => (
                <div key={i} style={{ backgroundColor: '#FEF3C7', padding: 12, borderRadius: 8, border: '1px solid #FDE68A', marginBottom: 10, fontSize: 12 }}>
                  <div style={{ fontWeight: 700, color: '#92400E' }}>⚠️ Chronic Friction: {f.obstacle}</div>
                  <div style={{ color: '#78350F', marginTop: 2 }}>Context: {f.triggerContext}</div>
                  <div style={{ color: '#166534', fontWeight: 700, marginTop: 4 }}>Sustainable Remedy: {f.sustainableRemedy}</div>
                </div>
              ))}

              {/* Transformative Reflection */}
              {q.transformativeReflections.map((r, i) => (
                <div key={i} style={{ padding: 10, backgroundColor: '#F0FDF4', borderRadius: 6, fontSize: 12, color: '#166534', fontStyle: 'italic' }}>
                  "{r.excerpt}" — <span style={{ fontWeight: 600 }}>Shift: {r.perspectiveShift}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Closing Spiritual Advice */}
        <div style={{ marginTop: 28, padding: 20, borderRadius: 12, backgroundColor: '#FAF5FF', border: '1px solid #E9D5FF', textAlign: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: '#7E22CE', letterSpacing: 1 }}>THE CONTINUOUS RETURN (INABAH)</span>
          <p style={{ fontSize: 14, color: '#581C87', margin: '8px 0 0', lineHeight: 1.6 }}>
            {report.closingSpiritualAdvice}
          </p>
        </div>
      </main>
    </div>
  );
}
