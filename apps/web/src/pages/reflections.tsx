import React, { useState } from 'react';
import Head from 'next/head';
import { Navigation } from '../components/Navigation';
import { AmalApiClient } from '../lib/api';
import { AmalTheme } from '@amal/ui';
import { showAmalToast } from '../components/Toast';

export default function ReflectionsPage() {
  const [reflectionText, setReflectionText] = useState('');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [reflections, setReflections] = useState<any[]>([]);

  const loadReflections = async () => {
    const res = await AmalApiClient.getReflections();
    if (res.success && res.data) {
      setReflections(Array.isArray(res.data) ? res.data : [res.data]);
    }
  };

  React.useEffect(() => {
    loadReflections();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflectionText.trim()) return;
    setLoading(true);
    const res = await AmalApiClient.submitReflection(reflectionText.trim());
    setLoading(false);
    if (res.success) {
      setSaved(true);
      setReflectionText('');
      showAmalToast('Alhamdulillah, reflection safely saved in your private vault.');
      loadReflections();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this reflection permanently from your private vault?')) {
      await AmalApiClient.deleteReflection(id);
      showAmalToast('Reflection permanently erased from local records.', 'info');
      loadReflections();
    }
  };

  return (
    <div style={{ backgroundColor: AmalTheme.colors.surface.backgroundLight, minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Head>
        <title>AMAL OS — Muhasabah (Private Reflection)</title>
      </Head>

      <Navigation />

      <main style={{ maxWidth: 880, margin: '0 auto', padding: '0 20px 60px' }}>
        <header style={{ marginBottom: 24 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: AmalTheme.colors.primary, letterSpacing: 1 }}>EVENING MUHASABAH</span>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: '6px 0 0', color: AmalTheme.colors.text.primaryLight }}>
            Private Reflection Vault
          </h1>
          <p style={{ color: AmalTheme.colors.text.secondaryLight, fontSize: 14 }}>
            Umar ibn al-Khattab (RA) said: "Hold yourselves to account before you are held to account."
          </p>
        </header>

        {/* Privacy Invariant Alert */}
        <div style={{
          backgroundColor: '#FFF8E1',
          border: '1px solid #FFE082',
          borderRadius: 12,
          padding: 16,
          marginBottom: 24,
          fontSize: 13,
          color: '#5D4037',
        }}>
          <strong>Inviolable Privacy Guarantee:</strong> Your reflections are encrypted and strictly private to you.
          AMAL never generates spiritual health scores, never uses your reflections for public feeds, and never exposes them to family members.
        </div>

        {saved ? (
          <div style={{
            backgroundColor: '#E8F5E9',
            border: '1px solid #C8E6C9',
            borderRadius: 16,
            padding: 24,
            textAlign: 'center',
            color: '#2E7D32',
            marginBottom: 32,
          }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 8px' }}>Alhamdulillah, Reflection Recorded</h3>
            <p style={{ margin: '0 0 16px', fontSize: 14 }}>
              Your reflection has been safely stored in your private vault with outbox audit logging.
            </p>
            <button
              onClick={() => setSaved(false)}
              style={{
                backgroundColor: AmalTheme.colors.primary,
                color: '#FFF',
                border: 'none',
                borderRadius: 8,
                padding: '10px 20px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Write Another Reflection
            </button>
          </div>
        ) : (
          <section style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            padding: 24,
            border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
            marginBottom: 32,
          }}>
            <form onSubmit={handleSubmit}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 8, color: '#333' }}>
                How was your heart today? What went well, and what friction did you experience?
              </label>
              <textarea
                rows={5}
                value={reflectionText}
                onChange={(e) => setReflectionText(e.target.value)}
                placeholder="e.g. Felt grateful for morning Fajr in congregation. Struggled with staying focused during work hours, need to take a 5-minute break before Dhuhr..."
                style={{
                  width: '100%',
                  padding: 14,
                  borderRadius: 10,
                  border: '1px solid #DDD',
                  fontSize: 14,
                  lineHeight: 1.6,
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                  marginBottom: 16,
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: '#888' }}>
                  Stored with SHA-256 integrity · Zero external AI training
                </span>
                <button
                  type="submit"
                  disabled={loading || !reflectionText.trim()}
                  style={{
                    backgroundColor: AmalTheme.colors.primary,
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: 8,
                    padding: '12px 24px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {loading ? 'Saving securely...' : 'Save to Private Vault'}
                </button>
              </div>
            </form>
          </section>
        )}

        {/* Past Reflections List */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: '#1B4332' }}>
              Your Past Reflections ({reflections.length})
            </h2>
            <span style={{ fontSize: 12, color: '#6B7280' }}>🔒 Local & Encrypted</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {reflections.length > 0 ? (
              reflections.map((r: any) => (
                <div
                  key={r.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 12,
                    padding: 18,
                    border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: AmalTheme.colors.primary, textTransform: 'uppercase' }}>
                      {r.type || 'DAILY_MUHASABAH'} • {new Date(r.timestamp).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <button
                      onClick={() => handleDelete(r.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#9CA3AF',
                        fontSize: 12,
                        cursor: 'pointer',
                        padding: '2px 6px',
                        borderRadius: 4,
                      }}
                      title="Delete reflection"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                  <p style={{ margin: 0, fontSize: 14, color: '#374151', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                    {r.content}
                  </p>
                </div>
              ))
            ) : (
              <div style={{ backgroundColor: '#FFFFFF', padding: 24, borderRadius: 12, textAlign: 'center', color: '#6B7280', fontSize: 14 }}>
                No reflections recorded yet. Your private reflections will appear here.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
