import React, { useState } from 'react';
import { audioStreamingEngine } from '@amal/amal-engine';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import { useLanguage } from '../../context/LanguageContext';

export function QuranAudioHubTab() {
  const { isUrdu } = useLanguage();
  const [activeSubTab, setActiveSubTab] = useState<'QURAN' | 'SHAMAIL' | 'SIRAH'>('QURAN');
  const [selectedReciter, setSelectedReciter] = useState<string>('husary');
  const { playTrack, currentTrack, isPlaying } = useAudioPlayer();

  const handlePlay = (title: string, url: string, subtitle?: string, reciter?: string) => {
    playTrack({
      id: `audio-${url}`,
      title,
      subtitle: subtitle || (isUrdu ? 'تلاوتِ قرآنِ کریم' : 'Master Recitation'),
      audioUrl: url,
      reciter: reciter || selectedReciter,
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Sub-tab selection bar */}
      <div
        style={{
          display: 'flex',
          gap: 10,
          backgroundColor: '#FFFFFF',
          padding: 8,
          borderRadius: 12,
          border: '1px solid #E5E7EB',
          flexWrap: 'wrap',
        }}
      >
        <button
          onClick={() => setActiveSubTab('QURAN')}
          style={{
            padding: '10px 18px',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 13,
            cursor: 'pointer',
            border: 'none',
            backgroundColor: activeSubTab === 'QURAN' ? '#065F46' : 'transparent',
            color: activeSubTab === 'QURAN' ? '#FFFFFF' : '#374151',
            transition: 'all 0.15s ease',
          }}
        >
          📖 {isUrdu ? 'تلاوتِ قرآنِ مجید' : 'Holy Quran Recitations'}
        </button>
        <button
          onClick={() => setActiveSubTab('SHAMAIL')}
          style={{
            padding: '10px 18px',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 13,
            cursor: 'pointer',
            border: 'none',
            backgroundColor: activeSubTab === 'SHAMAIL' ? '#065F46' : 'transparent',
            color: activeSubTab === 'SHAMAIL' ? '#FFFFFF' : '#374151',
            transition: 'all 0.15s ease',
          }}
        >
          🌹 {isUrdu ? 'شمائلِ محمدیہ آڈیو' : 'Shama\'il al-Muhammadiyyah Audio'}
        </button>
        <button
          onClick={() => setActiveSubTab('SIRAH')}
          style={{
            padding: '10px 18px',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 13,
            cursor: 'pointer',
            border: 'none',
            backgroundColor: activeSubTab === 'SIRAH' ? '#065F46' : 'transparent',
            color: activeSubTab === 'SIRAH' ? '#FFFFFF' : '#374151',
            transition: 'all 0.15s ease',
          }}
        >
          🕌 {isUrdu ? 'سیرت النبی ﷺ آڈیو' : 'Prophetic Sirah Episodes'}
        </button>
      </div>

      {/* Sub-tab 1: Quran Recitations */}
      {activeSubTab === 'QURAN' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Reciter Selector */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 14,
              padding: 20,
              border: '1px solid #E5E7EB',
            }}
          >
            <label
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: '#065F46',
                display: 'block',
                marginBottom: 12,
                letterSpacing: 0.5,
              }}
            >
              {isUrdu ? 'قاری صاحب کا انتخاب کریں:' : 'SELECT CERTIFIED MASTER RECITER:'}
            </label>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 12,
              }}
            >
              {audioStreamingEngine.reciters.map((r) => (
                <div
                  key={r.id}
                  onClick={() => setSelectedReciter(r.id)}
                  style={{
                    padding: 14,
                    borderRadius: 10,
                    cursor: 'pointer',
                    border: selectedReciter === r.id ? '2px solid #065F46' : '1px solid #E5E7EB',
                    backgroundColor: selectedReciter === r.id ? '#ECFDF5' : '#F9FAFB',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: 13, color: '#111827' }}>
                    {r.nameEnglish}
                  </div>
                  <div style={{ fontSize: 12, color: '#047857', direction: 'rtl', marginTop: 2 }}>
                    {r.nameArabic}
                  </div>
                  <span
                    style={{
                      fontSize: 10,
                      padding: '2px 8px',
                      borderRadius: 4,
                      backgroundColor: '#E5E7EB',
                      color: '#374151',
                      display: 'inline-block',
                      marginTop: 6,
                      fontWeight: 700,
                    }}
                  >
                    {r.style}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Surah List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {audioStreamingEngine.sampleSurahs.map((surah) => {
              const streamUrl =
                surah.audioStreams[selectedReciter] || surah.audioStreams['husary'] || '';
              const isThisPlaying = currentTrack?.audioUrl === streamUrl && isPlaying;
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
                    flexWrap: 'wrap',
                    gap: 12,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <span
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 10,
                        backgroundColor: '#ECFDF5',
                        border: '1px solid #A7F3D0',
                        color: '#065F46',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: 14,
                      }}
                    >
                      {surah.surahNumber}
                    </span>
                    <div>
                      <div style={{ fontWeight: 800, color: '#111827', fontSize: 15 }}>
                        Surah {surah.nameEnglish} ({surah.nameArabic})
                      </div>
                      <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>
                        {surah.nameUrdu} • {surah.ayahCount} {isUrdu ? 'آیات' : 'Ayahs'} • {surah.revelationType}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handlePlay(`Surah ${surah.nameEnglish}`, streamUrl)}
                    style={{
                      padding: '8px 18px',
                      borderRadius: 8,
                      backgroundColor: isThisPlaying ? '#DC2626' : '#065F46',
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
                    {isThisPlaying ? (isUrdu ? '⏸ وقفہ' : '⏸ Pause') : (isUrdu ? '▶ سنیں' : '▶ Play')}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Sub-tab 2: Shamail */}
      {activeSubTab === 'SHAMAIL' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {audioStreamingEngine.shamailChapters.map((ch) => (
            <div
              key={ch.chapterNumber}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 14,
                padding: 20,
                border: '1px solid #E5E7EB',
              }}
            >
              <div style={{ fontWeight: 800, fontSize: 16, color: '#065F46', marginBottom: 4 }}>
                {ch.titleEnglish}
              </div>
              <div style={{ fontSize: 13, color: '#047857', direction: 'rtl', marginBottom: 6 }}>
                {ch.titleArabic}
              </div>
              <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 14 }}>
                {ch.titleUrdu} • {ch.hadithCount} {isUrdu ? 'احادیث' : 'Prophetic Reports'}
              </div>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button
                  onClick={() =>
                    handlePlay(`${ch.titleEnglish} (Arabic Matn)`, ch.audioUrlArabicMatn)
                  }
                  style={{
                    padding: '7px 14px',
                    borderRadius: 8,
                    backgroundColor: '#065F46',
                    color: '#FFF',
                    fontSize: 12,
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  ▶ Arabic Matn ({Math.round(ch.durationSeconds / 60)} min)
                </button>
                <button
                  onClick={() =>
                    handlePlay(`${ch.titleEnglish} (Urdu Sharh)`, ch.audioUrlUrduSharh)
                  }
                  style={{
                    padding: '7px 14px',
                    borderRadius: 8,
                    backgroundColor: '#047857',
                    color: '#FFF',
                    fontSize: 12,
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  ▶ اردو شرح (Urdu Sharh)
                </button>
                <button
                  onClick={() =>
                    handlePlay(`${ch.titleEnglish} (English Commentary)`, ch.audioUrlEnglishCommentary)
                  }
                  style={{
                    padding: '7px 14px',
                    borderRadius: 8,
                    backgroundColor: '#374151',
                    color: '#FFF',
                    fontSize: 12,
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  ▶ English Commentary
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sub-tab 3: Sirah Episodes */}
      {activeSubTab === 'SIRAH' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {audioStreamingEngine.sirahEpisodes.map((ep) => (
            <div
              key={ep.episodeNumber}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 14,
                padding: 20,
                border: '1px solid #E5E7EB',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 12,
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
                  }}
                >
                  EPISODE {ep.episodeNumber} • {ep.era}
                </span>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: '#111827', margin: '6px 0 2px' }}>
                  {ep.titleEnglish}
                </h3>
                <div style={{ fontSize: 12, color: '#6B7280' }}>
                  {ep.titleUrdu} • {ep.yearHijriOrGregorian}
                </div>
              </div>
              <button
                onClick={() =>
                  handlePlay(`Sirah Ep ${ep.episodeNumber}: ${ep.titleEnglish}`, ep.audioUrl)
                }
                style={{
                  padding: '8px 18px',
                  borderRadius: 8,
                  backgroundColor: '#065F46',
                  color: '#FFF',
                  fontSize: 13,
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                ▶ {isUrdu ? 'سنیں' : 'Play Episode'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
