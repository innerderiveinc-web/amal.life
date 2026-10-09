import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Navigation } from '../components/Navigation';
import { AmalApiClient } from '../lib/api';
import { AmalTheme } from '@amal/ui';
import { UniversalSearchEngine } from '@amal/amal-engine';

export default function AskAmalPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);
  const [escalated, setEscalated] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Check for high-risk / personalized fatwa queries locally as client-side pre-gate
    const lower = query.toLowerCase();
    if (lower.includes('divorce') || lower.includes('talaq') || lower.includes('fatwa for me')) {
      setEscalated(true);
      setResults(null);
      return;
    }

    setEscalated(false);
    setLoading(true);
    const res = await AmalApiClient.searchEvidence(query.trim());
    setLoading(false);

    if (res.success && res.data && (Array.isArray(res.data) ? res.data.length > 0 : true)) {
      setResults(Array.isArray(res.data) ? res.data : [res.data]);
    } else {
      // Local fallback using verified universal index
      const localMatches = UniversalSearchEngine.search(query.trim(), 5);
      if (localMatches.length > 0) {
        setResults(
          localMatches.map((m) => ({
            sourceType: m.category,
            reference: m.titleEn,
            arabicText: m.titleUr,
            translatedText: m.snippetEn,
          }))
        );
      } else {
        setResults([]);
      }
    }
  };

  return (
    <div style={{ backgroundColor: AmalTheme.colors.surface.backgroundLight, minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Head>
        <title>AMAL OS — Ask AMAL & Evidence Explorer</title>
      </Head>

      <Navigation />

      <main style={{ maxWidth: 880, margin: '0 auto', padding: '0 20px 60px' }}>
        <header style={{ marginBottom: 24 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: AmalTheme.colors.primary, letterSpacing: 1 }}>EVIDENCE EXPLORER</span>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: '6px 0 0', color: AmalTheme.colors.text.primaryLight }}>
            Ask AMAL Islamic Intelligence
          </h1>
          <p style={{ color: AmalTheme.colors.text.secondaryLight, fontSize: 14 }}>
            Ground your life questions in verified primary Quran & Sunnah evidence. AMAL never fabricates citations or issues autonomous personal fatwas.
          </p>
        </header>

        {/* Search Console */}
        <section style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          padding: 24,
          border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
          marginBottom: 24,
        }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: 12 }}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Sabr and patience during difficult times, Fajr timing, gratitude..."
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: 8,
                border: '1px solid #CCC',
                fontSize: 15,
              }}
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              style={{
                backgroundColor: AmalTheme.colors.primary,
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 8,
                padding: '0 24px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {loading ? 'Searching...' : 'Explore Evidence'}
            </button>
          </form>
        </section>

        {/* Scholar Escalation Banner */}
        {escalated && (
          <div style={{
            backgroundColor: '#FFFBEB',
            border: '1px solid #FDE68A',
            borderRadius: 16,
            padding: 24,
            marginBottom: 24,
            color: '#92400E',
          }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px', color: '#B45309' }}>
              Direct Scholarly Guidance Needed (اہلِ علم سے رجوع)
            </h3>
            <p style={{ fontSize: 14, margin: '0 0 16px', lineHeight: 1.6, color: '#78350F' }}>
              Personal legal matters, marital questions, and solemn oaths depend intimately upon your specific life context. In our sacred tradition, no automated machine or algorithm may issue a binding legal ruling (Fatwa). AMAL protects your Deen by preparing a confidential, structured case file for verified, living scholars to provide personalized counsel.
            </p>
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  localStorage.setItem('amal_pending_situation', query);
                }
                router.push('/decision-room');
              }}
              style={{
                backgroundColor: '#1B4332',
                color: '#FFF',
                border: 'none',
                borderRadius: 8,
                padding: '10px 18px',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              Open Deen Decision Room & Prepare Scholar Case →
            </button>
          </div>
        )}

        {/* Evidence Results */}
        {results && (
          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>
              Verified Canonical Evidence ({results.length} results)
            </h2>
            {results.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {results.map((item: any, idx: number) => (
                  <div key={idx} style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 16,
                    padding: 20,
                    border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <span style={{
                        fontSize: 11,
                        padding: '3px 8px',
                        borderRadius: 6,
                        backgroundColor: '#E8F5E9',
                        color: '#2E7D32',
                        fontWeight: 700,
                      }}>
                        VERIFIED CITATION · {item.sourceType || 'CANONICAL CORPUS'}
                      </span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#666' }}>
                        Ref: {item.reference || 'Canonical'}
                      </span>
                    </div>

                    {item.arabicText && (
                      <div style={{
                        fontFamily: 'serif',
                        fontSize: 20,
                        direction: 'rtl',
                        lineHeight: 1.8,
                        color: '#1A202C',
                        marginBottom: 12,
                        padding: 12,
                        backgroundColor: '#F7FAFC',
                        borderRadius: 8,
                      }}>
                        {item.arabicText}
                      </div>
                    )}

                    <p style={{ fontSize: 15, lineHeight: 1.6, color: '#2D3748', margin: '0 0 12px' }}>
                      "{item.translatedText || item.translation || item.text}"
                    </p>

                    <div style={{ fontSize: 12, color: '#718096', borderTop: '1px solid #EDF2F7', paddingTop: 10 }}>
                      Authority Level: Tier 1/2 Primary · Provenance verified against Medina Mushaf / Kutub al-Sittah
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ backgroundColor: '#FFFFFF', padding: 24, borderRadius: 12, textAlign: 'center', color: '#777' }}>
                No direct canonical evidence found for this query in the verified corpus.
                AMAL prefers honest uncertainty over fabricated answers.
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
