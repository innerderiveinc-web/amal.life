import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Navigation } from '../components/Navigation';
import { audioStreamingEngine } from '@amal/amal-engine';
import { useAudioPlayer } from '../context/AudioPlayerContext';

export default function AudioPage() {
  const [activeTab, setActiveTab] = useState<'QURAN' | 'SHAMAIL' | 'SIRAH'>('QURAN');
  const [selectedReciter, setSelectedReciter] = useState<string>('husary');
  const [expandedChapter, setExpandedChapter] = useState<number | null>(1);
  const { playTrack, currentTrack, isPlaying, togglePlay, pause } = useAudioPlayer();

  const handlePlayAudio = (
    title: string,
    url: string,
    subtitle: string,
    reciterName: string,
    lang: 'ar' | 'ur' | 'en' = 'ar'
  ) => {
    if (currentTrack?.audioUrl === url && isPlaying) {
      pause();
    } else if (currentTrack?.audioUrl === url && !isPlaying) {
      togglePlay();
    } else {
      playTrack({
        id: `audio-${url}`,
        title,
        subtitle,
        audioUrl: url,
        reciter: reciterName,
        lang,
      });
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FA', paddingBottom: 120 }}>
      <Head>
        <title>Audio Recitations & Sirah Audiobooks | AMAL OS</title>
      </Head>
      <Navigation />

      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: 20 }}>
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
              marginBottom: 16,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>✨</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#065F46' }}>
                This audio suite is part of the <strong>Unified Quran Hub</strong>.
              </span>
            </div>
            <Link
              href="/quran?tab=audio"
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

          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1B4332', marginBottom: 6 }}>
            🎧 Audio Recitations & Sirah Audiobooks
          </h1>
          <p style={{ color: '#4B5563', margin: 0, fontSize: 14 }}>
            Verified public-domain recitations from master Qurra, blessed Shama'il audio chapters with classical commentary, and authentic Prophetic Sirah audio narratives.
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 24, borderBottom: '2px solid #E5E7EB', paddingBottom: 12 }}>
          <button
            onClick={() => setActiveTab('QURAN')}
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
              border: 'none',
              backgroundColor: activeTab === 'QURAN' ? '#1B4332' : '#E5E7EB',
              color: activeTab === 'QURAN' ? '#FFFFFF' : '#374151',
              transition: 'all 0.2s',
            }}
          >
            📖 Holy Quran Recitations
          </button>
          <button
            onClick={() => setActiveTab('SHAMAIL')}
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
              border: 'none',
              backgroundColor: activeTab === 'SHAMAIL' ? '#1B4332' : '#E5E7EB',
              color: activeTab === 'SHAMAIL' ? '#FFFFFF' : '#374151',
              transition: 'all 0.2s',
            }}
          >
            🌹 Shama'il al-Muhammadiyyah Audio
          </button>
          <button
            onClick={() => setActiveTab('SIRAH')}
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
              border: 'none',
              backgroundColor: activeTab === 'SIRAH' ? '#1B4332' : '#E5E7EB',
              color: activeTab === 'SIRAH' ? '#FFFFFF' : '#374151',
              transition: 'all 0.2s',
            }}
          >
            🕌 Prophetic Sirah Episodes
          </button>
        </div>

        {/* QURAN TAB */}
        {activeTab === 'QURAN' && (
          <div>
            {/* Reciter Selector */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20, border: '1px solid #E5E7EB', marginBottom: 20 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 10 }}>
                SELECT MASTER QARI (RECITER):
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
                {audioStreamingEngine.reciters.map((r) => (
                  <div
                    key={r.id}
                    onClick={() => setSelectedReciter(r.id)}
                    style={{
                      padding: 12,
                      borderRadius: 8,
                      cursor: 'pointer',
                      border: selectedReciter === r.id ? '2px solid #1B4332' : '1px solid #E5E7EB',
                      backgroundColor: selectedReciter === r.id ? '#F0FDF4' : '#F9FAFB',
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: 13, color: '#111827' }}>{r.nameEnglish}</div>
                    <div style={{ fontSize: 12, color: '#047857', direction: 'rtl', marginTop: 2 }}>{r.nameArabic}</div>
                    <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 4, backgroundColor: '#E5E7EB', color: '#374151', display: 'inline-block', marginTop: 6 }}>
                      {r.style}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Surah List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {audioStreamingEngine.sampleSurahs.map((surah) => {
                const streamUrl = surah.audioStreams[selectedReciter] || surah.audioStreams['husary'] || '';
                const isThisPlaying = currentTrack?.audioUrl === streamUrl && isPlaying;
                return (
                  <div
                    key={surah.surahNumber}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 12,
                      padding: '16px 20px',
                      border: isThisPlaying ? '2px solid #059669' : '1px solid #E5E7EB',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      boxShadow: isThisPlaying ? '0 4px 12px rgba(5, 150, 105, 0.12)' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <span style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        backgroundColor: isThisPlaying ? '#059669' : '#1B4332',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: 14,
                      }}>
                        {surah.surahNumber}
                      </span>
                      <div>
                        <div style={{ fontWeight: 700, color: '#111827', fontSize: 15 }}>
                          Surah {surah.nameEnglish} ({surah.nameArabic})
                        </div>
                        <div style={{ fontSize: 12, color: '#6B7280' }}>
                          {surah.nameUrdu} • {surah.ayahCount} Ayahs • {surah.revelationType}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handlePlayAudio(
                        `Surah ${surah.nameEnglish}`,
                        streamUrl,
                        `Recited by ${selectedReciter.toUpperCase()}`,
                        selectedReciter,
                        'ar'
                      )}
                      style={{
                        padding: '8px 18px',
                        borderRadius: 8,
                        backgroundColor: isThisPlaying ? '#DC2626' : '#1B4332',
                        color: '#FFFFFF',
                        fontWeight: 700,
                        fontSize: 13,
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        transition: 'all 0.15s ease-in-out',
                      }}
                    >
                      {isThisPlaying ? '⏸ Pause' : '▶ Play'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SHAMAIL TAB */}
        {activeTab === 'SHAMAIL' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{
              backgroundColor: '#FEF3C7',
              border: '1px solid #FCD34D',
              borderRadius: 12,
              padding: '12px 16px',
              fontSize: 13,
              color: '#92400E',
            }}>
              🌹 <strong>Imam al-Tirmidhi's Shama'il al-Muhammadiyyah:</strong> High-fidelity audio lectures in Arabic (Dr. Waleed Al-Meneese) and detailed Urdu Sharh with verified prophetic hadith matn.
            </div>

            {audioStreamingEngine.shamailChapters.map((ch) => {
              const isArabicPlaying = currentTrack?.audioUrl === ch.audioUrlArabicMatn && isPlaying;
              const isUrduPlaying = currentTrack?.audioUrl === ch.audioUrlUrduSharh && isPlaying;
              const isExpanded = expandedChapter === ch.chapterNumber;

              return (
                <div
                  key={ch.chapterNumber}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 14,
                    padding: 22,
                    border: (isArabicPlaying || isUrduPlaying) ? '2px solid #059669' : '1px solid #E5E7EB',
                    boxShadow: (isArabicPlaying || isUrduPlaying) ? '0 4px 16px rgba(5, 150, 105, 0.12)' : '0 1px 3px rgba(0,0,0,0.05)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 17, color: '#1B4332' }}>
                        {ch.titleEnglish}
                      </div>
                      <div style={{ fontSize: 15, color: '#047857', direction: 'rtl', marginTop: 4, fontFamily: 'Traditional Arabic, Amiri, serif', fontWeight: 700 }}>
                        {ch.titleArabic}
                      </div>
                      <div style={{ fontSize: 13, color: '#4B5563', marginTop: 4 }}>
                        {ch.titleUrdu}
                      </div>
                    </div>

                    <span style={{
                      fontSize: 11,
                      fontWeight: 700,
                      backgroundColor: '#ECFDF5',
                      color: '#065F46',
                      padding: '4px 10px',
                      borderRadius: 12,
                      border: '1px solid #A7F3D0',
                    }}>
                      {ch.hadithCount} Prophetic Reports
                    </span>
                  </div>

                  {ch.narrator && (
                    <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 12 }}>
                      <strong>راوی (Narrator):</strong> {ch.narrator}
                    </div>
                  )}

                  {/* Hadith Matn Excerpt Preview */}
                  {ch.arabicExcerpt && (
                    <div style={{
                      backgroundColor: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      borderRadius: 10,
                      padding: '12px 16px',
                      marginBottom: 16,
                    }}>
                      <div style={{
                        direction: 'rtl',
                        textAlign: 'right',
                        fontFamily: 'Traditional Arabic, Amiri, serif',
                        fontSize: 17,
                        lineHeight: 1.8,
                        color: '#0F172A',
                        fontWeight: 600,
                        marginBottom: 8,
                      }}>
                        {ch.arabicExcerpt}
                      </div>
                      <div style={{
                        direction: 'rtl',
                        textAlign: 'right',
                        fontSize: 13,
                        lineHeight: 1.6,
                        color: '#475569',
                      }}>
                        {ch.urduExcerpt}
                      </div>
                    </div>
                  )}

                  {/* Audio Controls */}
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                    <button
                      onClick={() => handlePlayAudio(
                        `${ch.titleEnglish} (Arabic Matn & Dars)`,
                        ch.audioUrlArabicMatn,
                        'Dr. Waleed Al-Meneese • Classical Shama\'il Audio',
                        'Dr. Waleed Al-Meneese',
                        'ar'
                      )}
                      style={{
                        padding: '8px 16px',
                        borderRadius: 8,
                        backgroundColor: isArabicPlaying ? '#DC2626' : '#1B4332',
                        color: '#FFF',
                        fontSize: 13,
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      }}
                    >
                      <span>{isArabicPlaying ? '⏸ Pause' : '▶ Play'}</span>
                      <span>Arabic Dars ({Math.round(ch.durationSeconds / 60)} min)</span>
                    </button>

                    <button
                      onClick={() => handlePlayAudio(
                        `${ch.titleEnglish} (Urdu Sharh)`,
                        ch.audioUrlUrduSharh,
                        'اردو شرح و دراساتِ نبوی • Seerat-un-Nabi',
                        'Urdu Scholarly Dars',
                        'ur'
                      )}
                      style={{
                        padding: '8px 16px',
                        borderRadius: 8,
                        backgroundColor: isUrduPlaying ? '#DC2626' : '#065F46',
                        color: '#FFF',
                        fontSize: 13,
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      }}
                    >
                      <span>{isUrduPlaying ? '⏸ Pause' : '▶ Play'}</span>
                      <span>Urdu Sharh (30 min)</span>
                    </button>

                    <button
                      onClick={() => setExpandedChapter(isExpanded ? null : ch.chapterNumber)}
                      style={{
                        padding: '8px 14px',
                        borderRadius: 8,
                        backgroundColor: '#F3F4F6',
                        color: '#374151',
                        fontSize: 12,
                        fontWeight: 600,
                        border: '1px solid #D1D5DB',
                        cursor: 'pointer',
                      }}
                    >
                      {isExpanded ? '▲ Hide Details' : '▼ Read Hadiths & Notes'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* SIRAH TAB */}
        {activeTab === 'SIRAH' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{
              backgroundColor: '#EFF6FF',
              border: '1px solid #BFDBFE',
              borderRadius: 12,
              padding: '12px 16px',
              fontSize: 13,
              color: '#1E40AF',
            }}>
              🕌 <strong>Authentic Chronological Sirah Audiobooks (اردو سیرت النبی):</strong> High-fidelity audio lessons detailing the life and milestones of the Prophet Muhammad ﷺ from birth through the Madinan era.
            </div>

            {audioStreamingEngine.sirahEpisodes.map((ep) => {
              const isThisPlaying = currentTrack?.audioUrl === ep.audioUrl && isPlaying;

              return (
                <div
                  key={ep.episodeNumber}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 14,
                    padding: 22,
                    border: isThisPlaying ? '2px solid #059669' : '1px solid #E5E7EB',
                    boxShadow: isThisPlaying ? '0 4px 16px rgba(5, 150, 105, 0.12)' : '0 1px 3px rgba(0,0,0,0.05)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
                    <div>
                      <span style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: '#047857',
                        backgroundColor: '#F0FDF4',
                        padding: '3px 10px',
                        borderRadius: 6,
                        border: '1px solid #A7F3D0',
                      }}>
                        EPISODE {ep.episodeNumber} • {ep.era}
                      </span>
                      <h3 style={{ fontSize: 17, fontWeight: 800, color: '#111827', margin: '8px 0 2px' }}>
                        {ep.titleEnglish}
                      </h3>
                      <div style={{ fontSize: 13, color: '#047857', direction: 'rtl', fontWeight: 600, marginTop: 4 }}>
                        {ep.titleUrdu}
                      </div>
                      <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>
                        📅 {ep.yearHijriOrGregorian}
                      </div>
                    </div>

                    <button
                      onClick={() => handlePlayAudio(
                        `Sirah Ep ${ep.episodeNumber}: ${ep.titleEnglish}`,
                        ep.audioUrl,
                        `${ep.titleUrdu} • ${ep.yearHijriOrGregorian}`,
                        'Authentic Seerat-un-Nabi Audio',
                        'ur'
                      )}
                      style={{
                        padding: '10px 20px',
                        borderRadius: 8,
                        backgroundColor: isThisPlaying ? '#DC2626' : '#1B4332',
                        color: '#FFF',
                        fontSize: 13,
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                        transition: 'all 0.15s ease-in-out',
                      }}
                    >
                      <span>{isThisPlaying ? '⏸' : '▶'}</span>
                      <span>{isThisPlaying ? 'Pause Audio' : `Listen (${Math.round(ep.durationSeconds / 60)}m)`}</span>
                    </button>
                  </div>

                  <p style={{
                    fontSize: 13.5,
                    color: '#374151',
                    margin: '12px 0 0',
                    lineHeight: 1.6,
                    backgroundColor: '#F9FAFB',
                    padding: '10px 14px',
                    borderRadius: 8,
                    border: '1px solid #F3F4F6',
                  }}>
                    {ep.summary}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
