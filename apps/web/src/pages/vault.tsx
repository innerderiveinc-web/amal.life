import React, { useState } from 'react';
import Head from 'next/head';
import { Navigation } from '../components/Navigation';
import { knowledgeVaultEngine, VaultSavedNote } from '@amal/amal-engine';

export default function KnowledgeVaultPage() {
  const [notes, setNotes] = useState<VaultSavedNote[]>(knowledgeVaultEngine.getUserNotes('usr_demo_1'));
  const [title, setTitle] = useState('');
  const [sourceType, setSourceType] = useState<VaultSavedNote['sourceType']>('FRIDAY_KHUTBAH');
  const [rawText, setRawText] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !rawText) return;
    const newNote = knowledgeVaultEngine.ingestAndAnalyzeNote('usr_demo_1', title, sourceType, rawText);
    setNotes([newNote, ...notes]);
    setTitle('');
    setRawText('');
    setIsAdding(false);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FA', paddingBottom: 60 }}>
      <Head>
        <title>Personal Islamic Knowledge Vault | AMAL OS</title>
      </Head>
      <Navigation />

      <main style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 28 }}>📚</span>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1B4332', margin: 0 }}>
              Personal Islamic Knowledge Vault
            </h1>
          </div>
          <p style={{ color: '#4B5563', margin: 0, fontSize: 14 }}>
            Ingest Friday Khutbahs, dars notes, and book excerpts. AMAL automatically scans and extracts 
            <strong style={{ color: '#166534' }}> Quranic verses, Hadith citations, and classical scholar quotes</strong>, cross-checking authenticity against the 106 Canonical Masterworks.
          </p>
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
          <button
            onClick={() => setIsAdding(!isAdding)}
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              backgroundColor: '#1B4332',
              color: '#FFFFFF',
              border: 'none',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {isAdding ? '✕ Cancel' : '+ Ingest Lecture / Khutbah Note'}
          </button>
        </div>

        {isAdding && (
          <form onSubmit={handleSaveNote} style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 24, border: '1px solid #E5E7EB', marginBottom: 24 }}>
            <h3 style={{ margin: '0 0 14px', fontSize: 16, fontWeight: 700, color: '#111827' }}>
              Add Speech Transcript or Reading Note
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="vault-grid-2" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 4 }}>Note Title</label>
                  <input
                    type="text"
                    placeholder="E.g., Friday Khutbah on Sincerity & Dhikr..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #D1D5DB', fontSize: 14 }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 4 }}>Source Category</label>
                  <select
                    value={sourceType}
                    onChange={(e) => setSourceType(e.target.value as any)}
                    style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #D1D5DB', fontSize: 14 }}
                  >
                    <option value="FRIDAY_KHUTBAH">Friday Khutbah</option>
                    <option value="HALAQAH_LECTURE">Halaqah / Dars</option>
                    <option value="BOOK_READING">Book Reading Excerpt</option>
                    <option value="PERSONAL_THOUGHT">Personal Thought</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 4 }}>Raw Speech / Notes Text</label>
                <textarea
                  rows={5}
                  placeholder="Paste speech transcript, notes, or quotes. AMAL will scan and extract Quran, Hadith, and classical quotes..."
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  style={{ width: '100%', padding: 12, borderRadius: 6, border: '1px solid #D1D5DB', fontSize: 14, fontFamily: 'inherit' }}
                />
              </div>

              <button
                type="submit"
                style={{ padding: '10px 22px', borderRadius: 8, backgroundColor: '#047857', color: '#FFF', border: 'none', fontWeight: 700, fontSize: 14, cursor: 'pointer', alignSelf: 'flex-start' }}
              >
                Scan, Extract & Save to Vault →
              </button>
            </div>
          </form>
        )}

        {/* Saved Notes List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {notes.map(n => (
            <div key={n.noteId} style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 24, border: '1px solid #E5E7EB' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#047857', backgroundColor: '#ECFDF5', padding: '2px 8px', borderRadius: 4 }}>
                  {n.sourceType.replace('_', ' ')}
                </span>
                <span style={{ fontSize: 12, color: '#6B7280' }}>Added: {n.dateAdded}</span>
              </div>

              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#111827', margin: '4px 0 10px' }}>{n.title}</h3>
              <p style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.6, margin: '0 0 16px', backgroundColor: '#F9FAFB', padding: 12, borderRadius: 8 }}>
                "{n.rawText}"
              </p>

              {/* Extracted Citations */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#1B4332', marginBottom: 8 }}>
                  VERIFIED CITATIONS EXTRACTED:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {n.extractedItems.map((item, idx) => (
                    <div key={idx} style={{ padding: 10, borderRadius: 6, backgroundColor: '#F0FDF4', border: '1px solid #86EFAC' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 11, fontWeight: 800, color: '#166534' }}>{item.type}</span>
                        <span style={{ fontSize: 10, color: '#047857', fontWeight: 700 }}>✓ CANONICAL MATCH</span>
                      </div>
                      <div style={{ fontSize: 13, color: '#111827', margin: '4px 0' }}>{item.content}</div>
                      <div style={{ fontSize: 11, color: '#6B7280' }}>Ref: {item.sourceAttribution}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Spiritual Takeaways */}
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#1B4332', marginBottom: 6 }}>
                  PRACTICAL SPIRITUAL TAKEAWAYS:
                </div>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: '#374151', lineHeight: 1.6 }}>
                  {n.keySpiritualTakeaways.map((t, idx) => (
                    <li key={idx}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
