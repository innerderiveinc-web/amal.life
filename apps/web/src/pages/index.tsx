import React, { useState } from 'react';
import Head from 'next/head';
import { AmalTheme } from '@amal/ui';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);

  const handleAsk = () => {
    if (!question) return;
    setAnswer(
      'Grounded guidance: Consistency of small actions is more beloved to Allah than sporadic burnout. (Sahih al-Bukhari 6464). Start with one 5-minute habit today.'
    );
  };

  return (
    <div style={{ backgroundColor: AmalTheme.colors.surface.backgroundLight, minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <Head>
        <title>AMAL OS — From Niyyah to Amal</title>
        <meta name="description" content="Muslim Life Intelligence Platform" />
      </Head>

      <main style={{ maxWidth: 860, margin: '0 auto', padding: '40px 20px' }}>
        <header style={{ marginBottom: 40, borderBottom: `1px solid ${AmalTheme.colors.surface.borderLight}`, paddingBottom: 24 }}>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: AmalTheme.colors.primary, margin: 0 }}>AMAL OS</h1>
          <p style={{ fontSize: 18, color: AmalTheme.colors.text.secondaryLight, marginTop: 8 }}>
            Turn faith into action. From Niyyah to Amal.
          </p>
        </header>

        {/* Today Spotlight */}
        <section style={{ backgroundColor: '#FFFFFF', padding: 24, borderRadius: 16, border: `1px solid ${AmalTheme.colors.surface.borderLight}`, marginBottom: 30 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: AmalTheme.colors.primary, letterSpacing: 1 }}>TODAY'S AMAL</span>
          <h2 style={{ fontSize: 24, margin: '8px 0', color: AmalTheme.colors.text.primaryLight }}>Call your parents today</h2>
          <p style={{ color: AmalTheme.colors.text.secondaryLight, fontSize: 14 }}>
            Why: Family relationship journey · Connecting ties of kinship
          </p>
          <div style={{ backgroundColor: AmalTheme.colors.accent.sand, padding: 10, borderRadius: 8, marginTop: 10, fontSize: 12, fontStyle: 'italic' }}>
            Evidence: Quran 17:23 ("And to parents, good treatment")
          </div>
        </section>

        {/* Ask AMAL Console */}
        <section style={{ backgroundColor: '#FFFFFF', padding: 24, borderRadius: 16, border: `1px solid ${AmalTheme.colors.surface.borderLight}` }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: AmalTheme.colors.primary, letterSpacing: 1 }}>ASK AMAL INTELLIGENCE</span>
          <p style={{ color: AmalTheme.colors.text.secondaryLight, fontSize: 14, margin: '6px 0 16px 0' }}>
            Ground your life situations in verified Islamic evidence. No autonomous fatwas.
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            <input
              style={{ flex: 1, padding: '12px 16px', borderRadius: 8, border: `1px solid ${AmalTheme.colors.surface.borderLight}`, fontSize: 15 }}
              placeholder="e.g. I am struggling with waking up for Fajr..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button
              onClick={handleAsk}
              style={{ backgroundColor: AmalTheme.colors.primary, color: '#FFFFFF', border: 'none', borderRadius: 8, padding: '0 24px', fontWeight: 700, cursor: 'pointer' }}
            >
              Ask
            </button>
          </div>

          {answer && (
            <div style={{ marginTop: 20, padding: 16, backgroundColor: AmalTheme.colors.primaryLight, borderRadius: 10, borderLeft: `4px solid ${AmalTheme.colors.primary}` }}>
              <strong style={{ color: AmalTheme.colors.primary }}>Verified Guidance:</strong>
              <p style={{ margin: '8px 0 0 0', color: AmalTheme.colors.text.primaryLight, lineHeight: 1.6 }}>{answer}</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
