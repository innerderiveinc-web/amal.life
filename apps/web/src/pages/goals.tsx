import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Navigation } from '../components/Navigation';
import { AmalApiClient } from '../lib/api';
import { AmalTheme } from '@amal/ui';
import { showAmalToast } from '../components/Toast';

export default function GoalsPage() {
  const [goals, setGoals] = useState<any[]>([]);
  const [category, setCategory] = useState('SALAH');
  const [title, setTitle] = useState('');
  const [intent, setIntent] = useState('IMPROVE');
  const [outcome, setOutcome] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const categories = [
    'SALAH', 'QURAN', 'DUA', 'DHIKR', 'CHARACTER', 'PATIENCE',
    'ANGER', 'FAMILY', 'PARENTS', 'TIME', 'KNOWLEDGE', 'RAMADAN'
  ];

  const intents = [
    'START', 'RESTART', 'IMPROVE', 'MAINTAIN', 'LEARN', 'OVERCOME_FRICTION'
  ];

  const loadGoals = async () => {
    const res = await AmalApiClient.getGoals();
    if (res.success && res.data) {
      setGoals(Array.isArray(res.data) ? res.data : [res.data]);
    }
  };

  useEffect(() => {
    loadGoals();
  }, []);

  const handleCreateGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    setLoading(true);
    const res = await AmalApiClient.createGoal(category, title, intent, outcome || title);
    setLoading(false);
    if (res.success) {
      setSuccessMsg('Goal created with Niyyah!');
      showAmalToast('Niyyah registered — Barakah added to your journey', 'success');
      setTitle('');
      setOutcome('');
      loadGoals();
    }
  };

  const handleToggleComplete = async (goal: any) => {
    const nextStatus = goal.status === 'COMPLETED' ? 'ACTIVE' : 'COMPLETED';
    await AmalApiClient.updateGoal(goal.id || goal.goalId, { status: nextStatus });
    showAmalToast(nextStatus === 'COMPLETED' ? 'Alhamdulillah! Goal completed.' : 'Goal reactivated', 'success');
    loadGoals();
  };

  const handleDeleteGoal = async (id: string) => {
    if (confirm('Delete this goal from your active intentions?')) {
      await AmalApiClient.deleteGoal(id);
      showAmalToast('Intention archived', 'info');
      loadGoals();
    }
  };

  return (
    <div style={{ backgroundColor: AmalTheme.colors.surface.backgroundLight, minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Head>
        <title>AMAL OS — Goals & Baselines</title>
      </Head>

      <Navigation />

      <main style={{ maxWidth: 880, margin: '0 auto', padding: '0 20px 60px' }}>
        <header style={{ marginBottom: 24 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: AmalTheme.colors.primary, letterSpacing: 1 }}>DEEN OBJECTIVES</span>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: '6px 0 0', color: AmalTheme.colors.text.primaryLight }}>
            Your Intentional Goals
          </h1>
          <p style={{ color: AmalTheme.colors.text.secondaryLight, fontSize: 14 }}>
            Goals in AMAL are grounded in personal baseline observations, not spiritual scorecards or moral judgments.
          </p>
        </header>

        {/* Goal Creation Form */}
        <section style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          padding: 24,
          border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
          marginBottom: 32,
        }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>Set a New Goal with Niyyah</h2>
          {successMsg && (
            <div style={{ padding: 12, backgroundColor: '#E8F5E9', color: '#2E7D32', borderRadius: 8, marginBottom: 16, fontSize: 14 }}>
              ✓ {successMsg}
            </div>
          )}
          <form onSubmit={handleCreateGoal} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 6, color: '#555' }}>Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #CCC', fontSize: 14 }}
                >
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 6, color: '#555' }}>Intent</label>
                <select
                  value={intent}
                  onChange={(e) => setIntent(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #CCC', fontSize: 14 }}
                >
                  {intents.map((i) => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 6, color: '#555' }}>Goal Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Consistent Fajr in Congregation or at its time"
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #CCC', fontSize: 14 }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 6, color: '#555' }}>Desired Outcome (Niyyah)</label>
              <input
                type="text"
                value={outcome}
                onChange={(e) => setOutcome(e.target.value)}
                placeholder="e.g. Build an unbreakable morning habit rooted in love for Allah"
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #CCC', fontSize: 14 }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: AmalTheme.colors.primary,
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 8,
                padding: '12px 24px',
                fontWeight: 700,
                cursor: 'pointer',
                alignSelf: 'flex-start',
              }}
            >
              {loading ? 'Creating...' : 'Create Goal'}
            </button>
          </form>
        </section>

        {/* Existing Goals List */}
        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>Current Active Goals</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {goals.length > 0 ? goals.map((g: any) => {
              const isCompleted = g.status === 'COMPLETED';
              return (
                <div key={g.id || g.goalId} style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 12,
                  padding: 16,
                  border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  opacity: isCompleted ? 0.75 : 1,
                }}>
                  <div style={{ flex: 1, paddingRight: 16 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: AmalTheme.colors.primary, textTransform: 'uppercase' }}>
                      {g.category || 'PRACTICE'} · {g.intent || 'IMPROVE'}
                    </span>
                    <h3 style={{ fontSize: 16, fontWeight: 700, margin: '4px 0', color: '#222', textDecoration: isCompleted ? 'line-through' : 'none' }}>
                      {g.title}
                    </h3>
                    <p style={{ fontSize: 13, color: '#666', margin: 0 }}>{g.desiredOutcome || g.description || 'Continuous practice'}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button
                      onClick={() => handleToggleComplete(g)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 8,
                        backgroundColor: isCompleted ? '#F3F4F6' : '#E8F5E9',
                        color: isCompleted ? '#4B5563' : '#2E7D32',
                        border: 'none',
                        fontWeight: 600,
                        fontSize: 12,
                        cursor: 'pointer',
                      }}
                    >
                      {isCompleted ? '↩ Re-activate' : '✓ Mark Done'}
                    </button>
                    <button
                      onClick={() => handleDeleteGoal(g.id || g.goalId)}
                      style={{
                        padding: '6px 8px',
                        borderRadius: 8,
                        backgroundColor: '#FEE2E2',
                        color: '#991B1B',
                        border: 'none',
                        fontSize: 12,
                        cursor: 'pointer',
                      }}
                      title="Delete Goal"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              );
            }) : (
              <div style={{ backgroundColor: '#FFFFFF', padding: 24, borderRadius: 12, textAlign: 'center', color: '#777' }}>
                No active goals yet. Create your first goal above to start a structured journey.
              </div>
            )}
          </div>
        </section>

        {/* CHANNELIZED SULUK LIFECYCLE BAR */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          padding: 20,
          border: '1px solid #E5E7EB',
          marginTop: 24,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#6B21A8', letterSpacing: 1 }}>
              SULUK LIFECYCLE (نیت سے عمل تک کا سفر)
            </span>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginTop: 2 }}>
              Turn These Goals Into Practical Habits:
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link
              href="/journeys"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 14px',
                borderRadius: 8,
                backgroundColor: '#FAF5FF',
                color: '#6B21A8',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: 13,
                border: '1px solid #E9D5FF',
              }}
            >
              <span>🛤️ Start Structured Journey</span>
            </Link>
            <Link
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 14px',
                borderRadius: 8,
                backgroundColor: '#F3F4F6',
                color: '#374151',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: 13,
                border: '1px solid #E5E7EB',
              }}
            >
              <span>⭐ Niyyah Compiler</span>
            </Link>
            <Link
              href="/reflections"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 14px',
                borderRadius: 8,
                backgroundColor: '#F3F4F6',
                color: '#374151',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: 13,
                border: '1px solid #E5E7EB',
              }}
            >
              <span>📝 Evening Muhasabah</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
