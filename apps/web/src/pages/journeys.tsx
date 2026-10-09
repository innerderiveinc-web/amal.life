import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Navigation } from '../components/Navigation';
import { AmalApiClient } from '../lib/api';
import { AmalTheme } from '@amal/ui';

export default function JourneysPage() {
  const [activeJourneys, setActiveJourneys] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const templates = [
    {
      id: 'tmpl-fajr-14d',
      title: '14-Day Fajr Recovery',
      duration: '14 Days',
      phases: '3 Phases (Foundation, Anchoring, Sustainability)',
      description: 'Gentle, evidence-backed progression to establish consistent Fajr prayer without guilt or burnout.',
    },
    {
      id: 'tmpl-salah-consistency',
      title: 'Salah Consistency & Presence',
      duration: '21 Days',
      phases: '3 Phases (Timeliness, Khushu, Retention)',
      description: 'Anchor the five daily prayers into your daily schedule with gentle friction adaptation.',
    },
    {
      id: 'tmpl-quran-restart',
      title: 'Quran Daily Restart (1 Page / Day)',
      duration: '30 Days',
      phases: '2 Phases (Recitation Rhythm, Contemplation)',
      description: 'Build an unbroken daily Quran relationship starting with just a single page each morning.',
    },
    {
      id: 'tmpl-anger-patience',
      title: 'Anger Management & Prophetic Sabr',
      duration: '10 Days',
      phases: '2 Phases (Trigger Awareness, Reaction Delay)',
      description: 'Practical prophetic behavioral exercises when confronting anger and frustration.',
    },
  ];

  const loadJourneys = async () => {
    const res = await AmalApiClient.getJourneys();
    if (res.success && res.data) {
      setActiveJourneys(Array.isArray(res.data) ? res.data : [res.data]);
    }
  };

  useEffect(() => {
    loadJourneys();
  }, []);

  const handleStartJourney = async (templateId: string, title: string) => {
    setLoading(true);
    const res = await AmalApiClient.startJourney(templateId, title);
    setLoading(false);
    if (res.success) {
      setStatusMsg(`Started journey: ${title}`);
      loadJourneys();
    }
  };

  const handleAdvancePhase = async (journey: any) => {
    const nextPhase = (journey.currentPhase || 1) + 1;
    await AmalApiClient.updateJourney(journey.id || journey.journeyId, { currentPhase: nextPhase });
    setStatusMsg(`Advanced "${journey.title}" to Phase ${nextPhase}`);
    loadJourneys();
  };

  const handleConcludeJourney = async (journey: any) => {
    if (confirm(`Conclude the journey "${journey.title}"?`)) {
      await AmalApiClient.updateJourney(journey.id || journey.journeyId, { state: 'COMPLETED' });
      setStatusMsg(`Completed journey "${journey.title}". Alhamdulillah!`);
      loadJourneys();
    }
  };

  return (
    <div style={{ backgroundColor: AmalTheme.colors.surface.backgroundLight, minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Head>
        <title>AMAL OS — Journeys</title>
      </Head>

      <Navigation />

      <main style={{ maxWidth: 880, margin: '0 auto', padding: '0 20px 60px' }}>
        <header style={{ marginBottom: 24 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: AmalTheme.colors.primary, letterSpacing: 1 }}>JOURNEY ENGINE</span>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: '6px 0 0', color: AmalTheme.colors.text.primaryLight }}>
            Structured Journeys (Suluk)
          </h1>
          <p style={{ color: AmalTheme.colors.text.secondaryLight, fontSize: 14 }}>
            Journeys are pinned to immutable template versions. If friction occurs, the engine adapts pacing rather than issuing spiritual shame.
          </p>
        </header>

        {statusMsg && (
          <div style={{ padding: 12, backgroundColor: '#E8F5E9', color: '#2E7D32', borderRadius: 8, marginBottom: 24, fontSize: 14 }}>
            ✓ {statusMsg}
          </div>
        )}

        {/* Active Journeys */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>Your Active Journeys</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {activeJourneys.length > 0 ? activeJourneys.map((j: any) => (
              <div key={j.id} style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                padding: 20,
                border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: AmalTheme.colors.primary, textTransform: 'uppercase' }}>
                      STATE: {j.state || 'ACTIVE'} · PHASE {j.currentPhase || 1}
                    </span>
                    <h3 style={{ fontSize: 18, fontWeight: 800, margin: '6px 0', color: '#222' }}>{j.title}</h3>
                    <p style={{ fontSize: 13, color: '#666', margin: 0 }}>
                      Template ID: {j.templateId || 'canonical'} · Pinned Version: {j.templateVersionId || 'v1.0.0'}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button
                      onClick={() => handleAdvancePhase(j)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 8,
                        backgroundColor: '#E8F5E9',
                        color: '#2E7D32',
                        border: 'none',
                        fontWeight: 600,
                        fontSize: 12,
                        cursor: 'pointer',
                      }}
                    >
                      ▶ Next Phase
                    </button>
                    <button
                      onClick={() => handleConcludeJourney(j)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 8,
                        backgroundColor: '#F3F4F6',
                        color: '#4B5563',
                        border: 'none',
                        fontWeight: 600,
                        fontSize: 12,
                        cursor: 'pointer',
                      }}
                    >
                      ✓ Conclude
                    </button>
                  </div>
                </div>
              </div>
            )) : (
              <div style={{ backgroundColor: '#FFFFFF', padding: 24, borderRadius: 12, textAlign: 'center', color: '#777' }}>
                No active journeys right now. Select a journey below to begin.
              </div>
            )}
          </div>
        </section>

        {/* Journey Library */}
        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>Curated Journey Templates</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {templates.map((t) => (
              <div key={t.id} style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                padding: 20,
                border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
                <div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#888' }}>{t.duration} · {t.phases}</span>
                  <h3 style={{ fontSize: 17, fontWeight: 800, margin: '8px 0', color: '#222' }}>{t.title}</h3>
                  <p style={{ fontSize: 13, color: '#555', lineHeight: 1.5, margin: '0 0 16px' }}>{t.description}</p>
                </div>
                <button
                  disabled={loading}
                  onClick={() => handleStartJourney(t.id, t.title)}
                  style={{
                    backgroundColor: AmalTheme.colors.primary,
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: 8,
                    padding: '10px 16px',
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: 'pointer',
                    alignSelf: 'flex-start',
                  }}
                >
                  Start This Journey
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
