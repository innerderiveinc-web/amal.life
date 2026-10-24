import React, { useState } from 'react';
import { wordByWordTajweedEngine, TajweedAudioPassage } from '@amal/amal-engine';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import { useLanguage } from '../../context/LanguageContext';

export function QuranTajweedHubTab() {
  const { isUrdu } = useLanguage();
  const passages = wordByWordTajweedEngine.getAvailablePassages();
  const [activePassageId, setActivePassageId] = useState(passages[0]?.passageId || 'tajweed_fatihah_v1');
  const [speed, setSpeed] = useState<'NORMAL' | 'SLOW_075' | 'DRILL_05'>('SLOW_075');
  const [activeWordIndex, setActiveWordIndex] = useState<number | null>(null);
  const { playTrack, currentTrack, isPlaying } = useAudioPlayer();

  const currentPassage: TajweedAudioPassage =
    wordByWordTajweedEngine.getPassage(activePassageId);

  const handlePlayPassage = () => {
    const url = speed === 'NORMAL' ? currentPassage.audioUrlNormal : currentPassage.audioUrlSlow;
    playTrack({
      id: currentPassage.passageId,
      title: currentPassage.title,
      subtitle: `${currentPassage.titleUrdu} (${speed === 'NORMAL' ? '1.0x' : speed === 'SLOW_075' ? '0.75x' : '0.5x'})`,
      audioUrl: url,
      reciter: 'Shaykh Mahmoud Khalil Al-Husary',
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Passage Selector Bar */}
      <div
        style={{
          display: 'flex',
          gap: 10,
          flexWrap: 'wrap',
          backgroundColor: '#FFFFFF',
          padding: 12,
          borderRadius: 14,
          border: '1px solid #E5E7EB',
        }}
      >
        {passages.map((p) => (
          <button
            key={p.passageId}
            onClick={() => {
              setActivePassageId(p.passageId);
              setActiveWordIndex(null);
            }}
            style={{
              padding: '10px 18px',
              borderRadius: 8,
              border: 'none',
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
              backgroundColor: activePassageId === p.passageId ? '#065F46' : '#F1F5F9',
              color: activePassageId === p.passageId ? '#FFFFFF' : '#475569',
              transition: 'all 0.15s ease',
            }}
          >
            {p.title}
          </button>
        ))}
      </div>

      {/* Active Passage Card */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          padding: 24,
          border: '1px solid #E5E7EB',
          boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
            flexWrap: 'wrap',
            gap: 14,
            borderBottom: '1px solid #F1F5F9',
            paddingBottom: 16,
          }}
        >
          <div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: '#065F46',
                backgroundColor: '#ECFDF5',
                padding: '2px 8px',
                borderRadius: 4,
                display: 'inline-block',
                marginBottom: 4,
              }}
            >
              {isUrdu ? 'تجوید و مخارج مشق' : 'TAJWEED & PHONETIC DRILL'}
            </span>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#064E3B', margin: 0 }}>
              {currentPassage.title}
            </h2>
            <div style={{ fontSize: 13, color: '#6B7280', marginTop: 2 }}>
              {currentPassage.titleUrdu}
            </div>
          </div>

          {/* Play & Speed Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <button
              onClick={handlePlayPassage}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '9px 18px',
                borderRadius: 8,
                backgroundColor: '#065F46',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: 13,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <span>{isPlaying && currentTrack?.id === currentPassage.passageId ? '⏸' : '▶'}</span>
              <span>{isUrdu ? 'آڈیو سنیں' : 'Listen Audio'}</span>
            </button>

            <div
              style={{
                display: 'flex',
                gap: 4,
                backgroundColor: '#F1F5F9',
                padding: 3,
                borderRadius: 8,
                border: '1px solid #E2E8F0',
              }}
            >
              {(['NORMAL', 'SLOW_075', 'DRILL_05'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  style={{
                    border: 'none',
                    borderRadius: 6,
                    padding: '6px 10px',
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: 'pointer',
                    backgroundColor: speed === s ? '#065F46' : 'transparent',
                    color: speed === s ? '#FFFFFF' : '#475569',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {s === 'NORMAL' ? '1.0x Normal' : s === 'SLOW_075' ? '0.75x Slow' : '0.5x Drill'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Word Articulation Grid */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 14,
            direction: 'rtl',
            padding: 20,
            backgroundColor: '#F9FAFB',
            borderRadius: 12,
            border: '1px solid #E5E7EB',
            marginBottom: 20,
          }}
        >
          {currentPassage.words.map((w) => {
            const isSelected = activeWordIndex === w.wordIndex;
            return (
              <div
                key={w.wordIndex}
                onClick={() => setActiveWordIndex(isSelected ? null : w.wordIndex)}
                style={{
                  cursor: 'pointer',
                  padding: '14px 18px',
                  borderRadius: 10,
                  textAlign: 'center',
                  backgroundColor: isSelected ? '#ECFDF5' : '#FFFFFF',
                  border: isSelected ? '2px solid #059669' : '1px solid #E5E7EB',
                  boxShadow: isSelected ? '0 4px 8px -2px rgba(5, 150, 105, 0.15)' : 'none',
                  transition: 'all 0.15s ease',
                }}
              >
                <div
                  style={{
                    fontSize: 26,
                    fontFamily: "'Amiri', 'Traditional Arabic', serif",
                    fontWeight: 700,
                    color: '#064E3B',
                  }}
                >
                  {w.arabicWord}
                </div>
                <div style={{ fontSize: 11, color: '#6B7280', marginTop: 4, direction: 'ltr' }}>
                  {w.transliteration}
                </div>
                <div style={{ fontSize: 11, color: '#047857', fontWeight: 600, marginTop: 2, direction: 'ltr' }}>
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
              <div
                style={{
                  backgroundColor: '#FEF3C7',
                  border: '1px solid #FDE68A',
                  borderRadius: 10,
                  padding: 16,
                  color: '#92400E',
                }}
              >
                <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 4 }}>
                  🎙️ {isUrdu ? 'مخرج اور صوتی قاعدہ:' : 'Phonetic Articulation Point (Makhraj):'} &quot;{word.arabicWord}&quot; [{word.transliteration}]
                </div>
                <div style={{ fontSize: 13, lineHeight: 1.6 }}>
                  {word.makhrajHighlight ? (
                    <>
                      <strong>Letter ({word.makhrajHighlight.letter}):</strong> {word.makhrajHighlight.articulationRule}
                    </>
                  ) : (
                    isUrdu
                      ? 'مد اور مخارج کے اصولوں کا خیال رکھتے ہوئے حروف کو حلق سے ادا کریں۔'
                      : 'Articulate smoothly with proper vowel elongation (Madd) and clear throat resonance.'
                  )}
                </div>
              </div>
            );
          })()
        )}
      </div>
    </div>
  );
}
