import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Navigation } from '../components/Navigation';
import { wordByWordTajweedEngine, TajweedAudioPassage } from '@amal/amal-engine';
import { useAudioPlayer } from '../context/AudioPlayerContext';

export default function TajweedPage() {
  const passages = wordByWordTajweedEngine.getAvailablePassages();
  const [activePassageId, setActivePassageId] = useState(passages[0]?.passageId || 'tajweed_fatihah_v1');
  const [speed, setSpeed] = useState<'NORMAL' | 'SLOW_075' | 'DRILL_05'>('SLOW_075');
  const [activeWordIndex, setActiveWordIndex] = useState<number | null>(null);
  const { playTrack, currentTrack, isPlaying, togglePlay } = useAudioPlayer();

  const currentPassage: TajweedAudioPassage =
    wordByWordTajweedEngine.getPassage(activePassageId);

  const handlePlayPassage = () => {
    const url = speed === 'NORMAL' ? currentPassage.audioUrlNormal : currentPassage.audioUrlSlow;
    playTrack({
      id: currentPassage.passageId,
      title: currentPassage.title,
      subtitle: `${currentPassage.titleUrdu} (${speed === 'NORMAL' ? '1.0x' : '0.75x Slow'})`,
      audioUrl: url,
      reciter: 'Shaykh Mahmoud Khalil Al-Husary',
    });
  };

  return (
    <div style={{ backgroundColor: '#F8F9FA', minHeight: '100vh', paddingBottom: 80 }}>
      <Head>
        <title>AMAL OS — Word-by-Word Tajweed & Makharij Trainer</title>
      </Head>
      <Navigation />

      <main style={{ maxWidth: 880, margin: '0 auto', padding: '0 20px' }}>
        {/* Quran Hub integration notice */}
        <div
          style={{
            backgroundColor: '#ECFDF5',
            border: '1px solid #A7F3D0',
            borderRadius: 12,
            padding: '12px 18px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
            marginBottom: 20,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 20 }}>✨</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#065F46' }}>
              Word-by-word Tajweed is integrated into the <strong>Unified Quran Hub</strong>.
            </span>
          </div>
          <Link
            href="/quran?tab=tajweed"
            style={{
              textDecoration: 'none',
              padding: '6px 14px',
              borderRadius: 8,
              backgroundColor: '#065F46',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: 12,
            }}
          >
            Open Inside Quran Hub ➔
          </Link>
        </div>

        {/* Header Banner */}
        <div style={{
          backgroundColor: '#064E3B',
          borderRadius: 16,
          padding: '24px 28px',
          color: '#FFFFFF',
          marginBottom: 24,
        }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: '#A7F3D0', letterSpacing: 1.5, textTransform: 'uppercase' }}>
            TAJWEED & MAKHAARIJ MASTERY
          </span>
          <h1 style={{ fontSize: 26, fontWeight: 900, margin: '6px 0 4px' }}>
            Word-by-Word Slow Recitation Guide
          </h1>
          <p style={{ margin: 0, fontSize: 14, color: '#D1FAE5', maxWidth: 640 }}>
            Master the authentic articulation points of sacred Arabic letters (Makharij). Practice at 0.75x slow speed with interactive word highlighting and classical phonetic guidance.
          </p>
        </div>

        {/* Passage Selector */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          {passages.map((p) => (
            <button
              key={p.passageId}
              onClick={() => setActivePassageId(p.passageId)}
              style={{
                padding: '10px 18px',
                borderRadius: 8,
                border: 'none',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
                backgroundColor: activePassageId === p.passageId ? '#1B4332' : '#FFFFFF',
                color: activePassageId === p.passageId ? '#FFFFFF' : '#4B5563',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              {p.title}
            </button>
          ))}
        </div>

        {/* Active Passage Audio Player Card */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 14,
          padding: 24,
          border: '1px solid #E5E7EB',
          marginBottom: 20,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1B4332', margin: 0 }}>
                {currentPassage.title}
              </h2>
              <div style={{ fontSize: 14, color: '#6B7280', marginTop: 2 }}>{currentPassage.titleUrdu}</div>
            </div>

            {/* Play Button & Speed Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button
                onClick={handlePlayPassage}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 16px',
                  borderRadius: 8,
                  backgroundColor: '#1B4332',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: 13,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <span>{isPlaying && currentTrack?.id === currentPassage.passageId ? '⏸' : '▶'}</span>
                <span>Listen Audio</span>
              </button>

              <div style={{ display: 'flex', gap: 6, backgroundColor: '#F3F4F6', padding: 4, borderRadius: 8 }}>
                {(['NORMAL', 'SLOW_075', 'DRILL_05'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpeed(s)}
                    style={{
                      border: 'none',
                      borderRadius: 6,
                      padding: '6px 12px',
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: 'pointer',
                      backgroundColor: speed === s ? '#1B4332' : 'transparent',
                      color: speed === s ? '#FFFFFF' : '#4B5563',
                    }}
                  >
                    {s === 'NORMAL' ? '1.0x Normal' : s === 'SLOW_075' ? '0.75x Slow Tajweed' : '0.5x Drill'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Word Articulation Grid */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            direction: 'rtl',
            padding: 20,
            backgroundColor: '#F9FAFB',
            borderRadius: 12,
            border: '1px solid #E5E7EB',
            marginBottom: 20,
          }}>
            {currentPassage.words.map((w) => {
              const isSelected = activeWordIndex === w.wordIndex;
              return (
                <div
                  key={w.wordIndex}
                  onClick={() => setActiveWordIndex(isSelected ? null : w.wordIndex)}
                  style={{
                    cursor: 'pointer',
                    padding: '12px 18px',
                    borderRadius: 10,
                    textAlign: 'center',
                    backgroundColor: isSelected ? '#ECFDF5' : '#FFFFFF',
                    border: isSelected ? '2px solid #059669' : '1px solid #E5E7EB',
                    boxShadow: isSelected ? '0 4px 6px -1px rgba(5, 150, 105, 0.1)' : 'none',
                  }}
                >
                  <div style={{ fontSize: 26, fontFamily: 'serif', fontWeight: 700, color: '#1B4332' }}>
                    {w.arabicWord}
                  </div>
                  <div style={{ fontSize: 11, color: '#6B7280', marginTop: 4, direction: 'ltr' }}>
                    {w.transliteration}
                  </div>
                  <div style={{ fontSize: 10, color: '#047857', fontWeight: 600, marginTop: 2, direction: 'ltr' }}>
                    {w.meaningEnglish}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Makhraj Drill Card if word clicked */}
          {activeWordIndex && (
            (() => {
              const word = currentPassage.words.find((w) => w.wordIndex === activeWordIndex);
              if (!word) return null;
              return (
                <div style={{
                  backgroundColor: '#FEF3C7',
                  border: '1px solid #FDE68A',
                  borderRadius: 10,
                  padding: 16,
                  color: '#92400E',
                }}>
                  <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 4 }}>
                    🎙️ Phonetic Articulation Point (Makhraj): "{word.arabicWord}" [{word.transliteration}]
                  </div>
                  <div style={{ fontSize: 13, lineHeight: 1.6 }}>
                    {word.makhrajHighlight ? (
                      <>
                        <strong>Letter ({word.makhrajHighlight.letter}):</strong> {word.makhrajHighlight.articulationRule}
                      </>
                    ) : (
                      'Articulate smoothly with proper vowel elongation (Madd) and clear throat resonance.'
                    )}
                  </div>
                </div>
              );
            })()
          )}
        </div>
      </main>
    </div>
  );
}
