import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Navigation } from '../components/Navigation';
import { AmalApiClient } from '../lib/api';
import { AmalTheme } from '@amal/ui';
import { showAmalToast } from '../components/Toast';
import { getAyahWisdomCard, QURAN_WISDOM_COLLECTION } from '../lib/quran-wisdom-data';

export default function ReflectionsPage() {
  const router = useRouter();
  const [reflectionText, setReflectionText] = useState('');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [reflections, setReflections] = useState<any[]>([]);

  // Daily or Selected Quran Tadabbur Card
  const activePromptCard = useMemo(() => {
    if (router.query.surah && router.query.ayah) {
      const s = parseInt(router.query.surah as string, 10);
      const a = parseInt(router.query.ayah as string, 10);
      const found = getAyahWisdomCard(s, a);
      if (found) return found;
    }
    const day = new Date().getDate();
    return QURAN_WISDOM_COLLECTION[day % QURAN_WISDOM_COLLECTION.length] || QURAN_WISDOM_COLLECTION[0];
  }, [router.query.surah, router.query.ayah]);

  const handleInsertTadabbur = () => {
    if (!activePromptCard) return;
    const template = `[قرآنی تدبر: ${activePromptCard.surahNameUrdu} (${activePromptCard.surahNameTransliterated}) · آیت ${activePromptCard.ayahNumber}]\nآیت: ${activePromptCard.textArabic}\nترجمہ کنز الایمان: ${activePromptCard.tarjumaKanzulIman}\n\nتدبر کا نکتہ: ${activePromptCard.tadabburPrompt.questionUrdu}\n\nمیری ذاتی نیت اور احتساب:\n`;
    setReflectionText((prev) => (prev ? prev + '\n\n' + template : template));
    showAmalToast('قرآنی تدبر کا نکتہ آپ کے نجی محاسبہ باکس میں شامل کر دیا گیا۔');
  };

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

        {/* Featured Quran Tadabbur & Divine Prompt */}
        {activePromptCard && (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              border: '1px solid #86EFAC',
              padding: '20px 24px',
              marginBottom: 24,
              boxShadow: '0 4px 15px rgba(22, 101, 52, 0.06)',
              background: 'linear-gradient(to bottom, #F0FDF4 0%, #FFFFFF 100%)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    padding: '3px 10px',
                    borderRadius: 12,
                    backgroundColor: '#166534',
                    color: '#FFFFFF',
                    letterSpacing: '0.04em',
                  }}
                >
                  📖 قرآنی تدبر اور محاسبہ
                </span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#1E293B' }}>
                  {activePromptCard.surahNameUrdu} ({activePromptCard.surahNameTransliterated}) · آیت {activePromptCard.ayahNumber}
                </span>
              </div>

              <Link
                href={`/quran?surah=${activePromptCard.surahNumber}`}
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#166534',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <span>قرآن سنیں اور تفسیر دیکھیں ➔</span>
              </Link>
            </div>

            {/* Arabic Matn & Kanz-ul-Iman Tarjuma */}
            <div
              dir="rtl"
              style={{
                fontFamily: 'var(--font-arabic), "Amiri", serif',
                fontSize: 20,
                color: '#0F172A',
                lineHeight: 2.2,
                textAlign: 'right',
                marginBottom: 8,
              }}
            >
              {activePromptCard.textArabic}{' '}
              <span style={{ color: '#059669', fontSize: 16 }}>﴿{activePromptCard.ayahNumber}﴾</span>
            </div>

            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#047857', marginBottom: 2 }}>
                کنز الایمان فی ترجمۃ القرآن (اعلیٰ حضرت):
              </div>
              <div dir="rtl" style={{ fontFamily: 'var(--font-urdu), serif', fontSize: 15, color: '#334155', lineHeight: 2.0, textAlign: 'right' }}>
                {activePromptCard.tarjumaKanzulIman}
              </div>
            </div>

            {/* Tadabbur Question Box */}
            <div
              style={{
                backgroundColor: '#FEF3C7',
                borderRadius: 10,
                padding: '12px 16px',
                border: '1px solid #FDE68A',
                marginBottom: 14,
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 800, color: '#92400E', textTransform: 'uppercase', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>💡</span>
                <span>فکر و تدبر کا نکتہ (Daily Tadabbur Prompt):</span>
              </div>
              <div dir="rtl" style={{ fontFamily: 'var(--font-urdu), serif', fontSize: 14, color: '#78350F', lineHeight: 1.9, textAlign: 'right', marginBottom: 4 }}>
                {activePromptCard.tadabburPrompt.questionUrdu}
              </div>
              <div style={{ fontSize: 12, color: '#92400E', fontStyle: 'italic' }}>
                "{activePromptCard.tadabburPrompt.questionEnglish}"
              </div>
            </div>

            {/* Action: Insert into reflection */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={handleInsertTadabbur}
                style={{
                  padding: '8px 16px',
                  borderRadius: 8,
                  backgroundColor: '#166534',
                  color: '#FFFFFF',
                  fontSize: 12,
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span>✍️</span>
                <span>اس قرآنی سوال کو اپنے محاسبہ نوٹ میں شامل کریں</span>
              </button>
            </div>
          </div>
        )}

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
                  Stored with SHA-256 integrity · 100% Private Local Storage · Zero Cloud Profiling
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
