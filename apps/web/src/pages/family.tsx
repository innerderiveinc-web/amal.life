import React, { useState } from 'react';
import Head from 'next/head';
import { Navigation } from '../components/Navigation';
import { familyDeenOsEngine, FamilyCircle } from '@amal/amal-engine';

export default function FamilyPage() {
  const [family, setFamily] = useState<FamilyCircle>(familyDeenOsEngine.getFamilyCircle('fam_demo_1'));
  const [newJourneyTitle, setNewJourneyTitle] = useState('');
  const [newJourneyDesc, setNewJourneyDesc] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddJourney = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJourneyTitle) return;
    const j = familyDeenOsEngine.createSharedJourney('fam_demo_1', {
      title: newJourneyTitle,
      category: 'RAMADAN_ROUTINE',
      description: newJourneyDesc || 'Shared family collective habit.',
      assignedTasks: [
        { assignedToMemberId: 'mem_1', taskTitle: 'Family collective recitation', isCompleted: false },
      ],
    });
    setFamily({ ...family, sharedJourneys: [...family.sharedJourneys, j] });
    setNewJourneyTitle('');
    setNewJourneyDesc('');
    setIsAdding(false);
  };

  const toggleTaskStatus = (journeyId: string, taskIdx: number) => {
    setFamily(prev => {
      const updatedJourneys = prev.sharedJourneys.map(j => {
        if (j.journeyId !== journeyId) return j;
        const updatedTasks = j.assignedTasks.map((t, idx) => {
          if (idx !== taskIdx) return t;
          return { ...t, isCompleted: !t.isCompleted };
        });
        return { ...j, assignedTasks: updatedTasks };
      });
      return { ...prev, sharedJourneys: updatedJourneys };
    });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FA', paddingBottom: 60 }}>
      <Head>
        <title>Family Deen OS | AMAL OS</title>
      </Head>
      <Navigation />

      <main style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 28 }}>👨‍👩‍👧‍👦</span>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1B4332', margin: 0 }}>
              Family Deen OS
            </h1>
          </div>
          <p style={{ color: '#4B5563', margin: 0, fontSize: 14 }}>
            Collaborative family journeys, Ramadan circles, and children's habits — with strict 
            <strong style={{ color: '#166534' }}> domestic privacy isolation</strong>. Personal reflections and Muhasabah remain strictly private and never leak into family views.
          </p>
        </div>

        {/* Family Banner */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 14,
          padding: 24,
          border: '1px solid #E5E7EB',
          marginBottom: 24,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#047857', backgroundColor: '#ECFDF5', padding: '3px 8px', borderRadius: 4 }}>
                VERIFIED FAMILY CIRCLE
              </span>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: '#111827', margin: '6px 0 2px' }}>
                {family.familyName}
              </h2>
              <p style={{ fontSize: 13, color: '#6B7280', margin: 0 }}>"{family.familyMotto}"</p>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              {family.members.map(m => (
                <div key={m.memberId} style={{ padding: '6px 12px', borderRadius: 20, backgroundColor: '#F3F4F6', fontSize: 12, fontWeight: 600, color: '#374151' }}>
                  {m.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Privacy Invariant Banner */}
        <div style={{
          backgroundColor: '#F0FDF4',
          borderRadius: 10,
          padding: 14,
          border: '1px solid #86EFAC',
          marginBottom: 24,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <span style={{ fontSize: 20 }}>🛡️</span>
          <div style={{ fontSize: 12, color: '#166534', lineHeight: 1.5 }}>
            <strong>Domestic Privacy Guarantee:</strong> Personal repentance, private journaling, and individual Muhasabah are kept in your Zero-Knowledge Vault. Family members only see explicitly shared collective circles.
          </div>
        </div>

        {/* Shared Family Journeys */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: '#1B4332', margin: 0 }}>
            Shared Family Circles & Journeys
          </h3>
          <button
            onClick={() => setIsAdding(!isAdding)}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              backgroundColor: '#1B4332',
              color: '#FFFFFF',
              border: 'none',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {isAdding ? '✕ Cancel' : '+ Add Family Journey'}
          </button>
        </div>

        {isAdding && (
          <form onSubmit={handleAddJourney} style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20, border: '1px solid #E5E7EB', marginBottom: 20 }}>
            <h4 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 700 }}>New Collective Family Journey</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input
                type="text"
                placeholder="Journey Title (e.g. Ramadan Suhur & Quran Routine)..."
                value={newJourneyTitle}
                onChange={(e) => setNewJourneyTitle(e.target.value)}
                style={{ padding: 10, borderRadius: 6, border: '1px solid #D1D5DB', fontSize: 14 }}
              />
              <textarea
                rows={2}
                placeholder="Description & collective goal..."
                value={newJourneyDesc}
                onChange={(e) => setNewJourneyDesc(e.target.value)}
                style={{ padding: 10, borderRadius: 6, border: '1px solid #D1D5DB', fontSize: 14 }}
              />
              <button
                type="submit"
                style={{ padding: '10px 18px', borderRadius: 6, backgroundColor: '#047857', color: '#FFF', border: 'none', fontWeight: 700, fontSize: 13, cursor: 'pointer', alignSelf: 'flex-start' }}
              >
                Create Shared Journey
              </button>
            </div>
          </form>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {family.sharedJourneys.map(j => (
            <div key={j.journeyId} style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20, border: '1px solid #E5E7EB' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#047857', backgroundColor: '#ECFDF5', padding: '2px 8px', borderRadius: 4 }}>
                  {j.category}
                </span>
                <span style={{ fontSize: 11, color: '#6B7280' }}>Privacy: Opt-in Family Shared</span>
              </div>
              <h4 style={{ fontSize: 17, fontWeight: 800, color: '#111827', margin: '6px 0 4px' }}>{j.title}</h4>
              <p style={{ fontSize: 13, color: '#4B5563', margin: '0 0 14px' }}>{j.description}</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {j.assignedTasks.map((t, idx) => (
                  <div
                    key={idx}
                    onClick={() => toggleTaskStatus(j.journeyId, idx)}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px 14px',
                      borderRadius: 8,
                      backgroundColor: t.isCompleted ? '#F0FDF4' : '#F9FAFB',
                      border: `1px solid ${t.isCompleted ? '#86EFAC' : '#E5E7EB'}`,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 14 }}>{t.isCompleted ? '✅' : '⏳'}</span>
                      <span style={{
                        fontSize: 13,
                        color: t.isCompleted ? '#166534' : '#111827',
                        fontWeight: 600,
                        textDecoration: t.isCompleted ? 'line-through' : 'none'
                      }}>
                        {t.taskTitle}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 11, color: '#6B7280' }}>
                        {family.members.find(m => m.memberId === t.assignedToMemberId)?.name || 'Member'}
                      </span>
                      <span style={{ fontSize: 11, color: t.isCompleted ? '#166534' : '#9CA3AF', fontWeight: 600 }}>
                        {t.isCompleted ? 'Done' : 'Tap to Complete'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
