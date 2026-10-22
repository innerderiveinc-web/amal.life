import React, { useState } from 'react';
import Head from 'next/head';
import { Navigation } from '../components/Navigation';
import { audioStreamingEngine, Reciter, QuranSurahAudio, ShamailAudioChapter, SirahAudioEpisode } from '@amal/amal-engine';
import { useAudioPlayer } from '../context/AudioPlayerContext';

export default function AudioPage() {
  const [activeTab, setActiveTab] = useState<'QURAN' | 'SHAMAIL' | 'SIRAH'>('QURAN');
  const [selectedReciter, setSelectedReciter] = useState<string>('husary');
  const { playTrack, currentTrack, isPlaying: globalPlaying } = useAudioPlayer();

  // Currently playing state
  const [currentPlayingTitle, setCurrentPlayingTitle] = useState<string | null>(null);
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handlePlay = (title: string, url: string, subtitle?: string, reciter?: string) => {
    setCurrentPlayingTitle(title);
    setCurrentAudioUrl(url);
    setIsPlaying(true);
    playTrack({
      id: `audio-${url}`,
      title,
      subtitle: subtitle || 'Master Recitation',
      audioUrl: url,
      reciter: reciter || selectedReciter,
    });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FA', paddingBottom: 120 }}>
      <Head>
        <title>Audio Recitations & Sirah Audiobooks | AMAL OS</title>
      </Head>
      <Navigation />

      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1B4332', marginBottom: 6 }}>
            🎧 Audio Recitations & Sirah Audiobooks
          </h1>
          <p style={{ color: '#4B5563', margin: 0, fontSize: 14 }}>
            Verified public-domain recitations from master Qurra, blessed Shama'il audio chapters, and Prophetic Sirah audio narratives.
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
            }}
          >
            🕌 Prophetic Sirah Episodes
          </button>
        </div>

        {/* QURAN TAB */}
        {activeTab === 'QURAN' && (
          <div>
            {/* Premier Quran Wisdom Module Jump Banner */}
            <div
              style={{
                backgroundColor: '#F0FDF4',
                borderRadius: 12,
                padding: '14px 18px',
                border: '1px solid #86EFAC',
                marginBottom: 16,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 12,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22 }}>📖</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#166534' }}>
                    Looking for Verse-by-Verse Recitation with Kanz-ul-Iman &amp; Khaza&apos;in-ul-Irfan?
                  </div>
                  <div style={{ fontSize: 11, color: '#4B5563' }}>
                    Listen to certified Qari tilawat synchronized with Urdu/English translations and daily wisdom cards.
                  </div>
                </div>
              </div>

              <a
                href="/quran"
                style={{
                  padding: '7px 14px',
                  borderRadius: 8,
                  backgroundColor: '#166534',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontSize: 12,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span>Open Quran &amp; Wisdom</span>
                <span>➔</span>
              </a>
            </div>
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
                const isThisPlaying = currentAudioUrl === streamUrl && isPlaying;
                return (
                  <div
                    key={surah.surahNumber}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 12,
                      padding: '16px 20px',
                      border: '1px solid #E5E7EB',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <span style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        backgroundColor: '#1B4332',
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
                      onClick={() => handlePlay(`Surah ${surah.nameEnglish}`, streamUrl)}
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
            {audioStreamingEngine.shamailChapters.map((ch) => (
              <div key={ch.chapterNumber} style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20, border: '1px solid #E5E7EB' }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#1B4332', marginBottom: 4 }}>
                  {ch.titleEnglish}
                </div>
                <div style={{ fontSize: 13, color: '#047857', direction: 'rtl', marginBottom: 6 }}>
                  {ch.titleArabic}
                </div>
                <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 14 }}>
                  {ch.titleUrdu} • {ch.hadithCount} Prophetic Reports
                </div>

                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <button
                    onClick={() => handlePlay(`${ch.titleEnglish} (Arabic Matn)`, ch.audioUrlArabicMatn)}
                    style={{ padding: '6px 14px', borderRadius: 6, backgroundColor: '#1B4332', color: '#FFF', fontSize: 12, border: 'none', cursor: 'pointer' }}
                  >
                    ▶ Arabic Matn ({Math.round(ch.durationSeconds / 60)} min)
                  </button>
                  <button
                    onClick={() => handlePlay(`${ch.titleEnglish} (Urdu Sharh)`, ch.audioUrlUrduSharh)}
                    style={{ padding: '6px 14px', borderRadius: 6, backgroundColor: '#065F46', color: '#FFF', fontSize: 12, border: 'none', cursor: 'pointer' }}
                  >
                    ▶ Urdu Sharh
                  </button>
                  <button
                    onClick={() => handlePlay(`${ch.titleEnglish} (English Commentary)`, ch.audioUrlEnglishCommentary)}
                    style={{ padding: '6px 14px', borderRadius: 6, backgroundColor: '#374151', color: '#FFF', fontSize: 12, border: 'none', cursor: 'pointer' }}
                  >
                    ▶ English Commentary
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SIRAH TAB */}
        {activeTab === 'SIRAH' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {audioStreamingEngine.sirahEpisodes.map((ep) => (
              <div key={ep.episodeNumber} style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20, border: '1px solid #E5E7EB' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#047857', backgroundColor: '#F0FDF4', padding: '2px 8px', borderRadius: 4 }}>
                      EPISODE {ep.episodeNumber} • {ep.era}
                    </span>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827', margin: '6px 0 2px' }}>
                      {ep.titleEnglish}
                    </h3>
                    <div style={{ fontSize: 12, color: '#6B7280' }}>{ep.titleUrdu} • {ep.yearHijriOrGregorian}</div>
                  </div>
                  <button
                    onClick={() => handlePlay(`Sirah Ep ${ep.episodeNumber}: ${ep.titleEnglish}`, ep.audioUrl)}
                    style={{ padding: '8px 16px', borderRadius: 8, backgroundColor: '#1B4332', color: '#FFF', fontSize: 13, border: 'none', cursor: 'pointer' }}
                  >
                    ▶ Listen ({Math.round(ep.durationSeconds / 60)}m)
                  </button>
                </div>
                <p style={{ fontSize: 13, color: '#4B5563', margin: '8px 0 0' }}>{ep.summary}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Persistent Audio Player Dock */}
      {currentPlayingTitle && (
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#1B4332',
          color: '#FFFFFF',
          padding: '14px 24px',
          boxShadow: '0 -4px 16px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 1000,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ fontSize: 24 }}>🎵</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{currentPlayingTitle}</div>
              <div style={{ fontSize: 11, color: '#A7F3D0' }}>Now Streaming High-Fidelity Audio</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {currentAudioUrl && (
              <audio controls autoPlay src={currentAudioUrl} style={{ height: 36, outline: 'none' }} />
            )}
            <button
              onClick={() => {
                setCurrentPlayingTitle(null);
                setCurrentAudioUrl(null);
                setIsPlaying(false);
              }}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid #A7F3D0',
                color: '#A7F3D0',
                padding: '4px 10px',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: 12,
              }}
            >
              ✕ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
