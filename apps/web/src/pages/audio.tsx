import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Navigation } from '../components/Navigation';
import { audioStreamingEngine, SirahMasterWork, SirahMasterChapter } from '@amal/amal-engine';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { offlineAudioCache } from '../services/offline-audio-cache';
import { AmalTokens } from '../styles/tokens';

export default function AudioPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'QURAN' | 'SHAMAIL' | 'SIRAH'>('SIRAH');
  const [selectedReciter, setSelectedReciter] = useState<string>('husary');
  const [expandedChapter, setExpandedChapter] = useState<number | null>(1);
  const [selectedSirahWorkId, setSelectedSirahWorkId] = useState<string>('RAHEEQ');
  const [sirahViewMode, setSirahViewMode] = useState<'MASTER_WORKS' | 'TIMELINE'>('MASTER_WORKS');
  const [cachedUrls, setCachedUrls] = useState<Set<string>>(new Set());
  const [downloadingUrl, setDownloadingUrl] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [totalCacheMb, setTotalCacheMb] = useState<number>(0);
  const { playTrack, currentTrack, isPlaying, togglePlay, pause } = useAudioPlayer();

  // Sync cached offline tracks on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const manifest = offlineAudioCache.getCachedManifest();
      setCachedUrls(new Set(manifest.map((m) => m.url)));
      setTotalCacheMb(offlineAudioCache.getTotalStorageMb());
    }
  }, []);

  const handleToggleOffline = async (url: string, title: string, subtitle?: string) => {
    if (cachedUrls.has(url)) {
      await offlineAudioCache.removeTrack(url);
      setCachedUrls((prev) => {
        const next = new Set(prev);
        next.delete(url);
        return next;
      });
      setTotalCacheMb(offlineAudioCache.getTotalStorageMb());
    } else {
      try {
        setDownloadingUrl(url);
        setDownloadProgress(20);
        await offlineAudioCache.downloadTrack(
          url,
          title,
          { subtitle },
          (pct) => setDownloadProgress(pct)
        );
        setCachedUrls((prev) => new Set(prev).add(url));
        setTotalCacheMb(offlineAudioCache.getTotalStorageMb());
      } catch (e) {
        console.error('Offline download failed:', e);
      } finally {
        setDownloadingUrl(null);
        setDownloadProgress(0);
      }
    }
  };

  // Support direct deep linking via URL query params (e.g. /audio?tab=SIRAH&work=ZIA_UN_NABI)
  useEffect(() => {
    if (!router.isReady) return;
    if (router.query.tab) {
      const tab = String(router.query.tab).toUpperCase();
      if (tab === 'SIRAH' || tab === 'SHAMAIL' || tab === 'QURAN') {
        setActiveTab(tab as ('QURAN' | 'SHAMAIL' | 'SIRAH'));
      }
    }
    if (router.query.work) {
      const work = String(router.query.work).toUpperCase();
      setSelectedSirahWorkId(work);
    }
  }, [router.isReady, router.query]);

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
            {/* Unified Hub Announcement Banner */}
            <div
              style={{
                backgroundColor: '#ECFDF5',
                border: '1.5px solid #059669',
                borderRadius: 14,
                padding: '16px 20px',
                marginBottom: 20,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 12,
                boxShadow: '0 2px 8px rgba(5, 150, 105, 0.08)',
              }}
            >
              <div>
                <div style={{ fontWeight: 800, fontSize: 15, color: '#065F46', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>🎧</span>
                  <span>Unified 114-Surah Quran Audio Hub Available</span>
                </div>
                <div style={{ fontSize: 13, color: '#047857', marginTop: 4, lineHeight: 1.4 }}>
                  Listen to the entire Holy Quran (all 114 Surahs) by 4 world-renowned Qurra with continuous playback and synchronized Ayah tracking inside the Unified Quran Hub.
                </div>
              </div>
              <Link
                href="/quran?tab=audio"
                style={{
                  backgroundColor: '#059669',
                  color: '#FFFFFF',
                  padding: '9px 18px',
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: 13,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                }}
              >
                <span>Open All 114 Surahs</span>
                <span>➔</span>
              </Link>
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

            {/* Offline Airplane Mode Storage Indicator */}
            <div
              style={{
                backgroundColor: cachedUrls.size > 0 ? '#F0FDF4' : '#F8FAFC',
                border: cachedUrls.size > 0 ? '1px solid #BBF7D0' : '1px solid #E2E8F0',
                borderRadius: 10,
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 8,
                fontSize: 12.5,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>✈️</span>
                <span style={{ fontWeight: 700, color: cachedUrls.size > 0 ? '#166534' : '#475569' }}>
                  {cachedUrls.size > 0
                    ? `آف لائن موڈ تیار: ${cachedUrls.size} ابواب انٹرنیٹ کے بغیر دستیاب ہیں (${totalCacheMb} MB)`
                    : 'آف لائن لسننگ (Offline Listening): کسی بھی باب کو بغیر انٹرنیٹ سننے کے لیے "⬇️ Save Offline" دبائیں۔'}
                </span>
              </div>
              {cachedUrls.size > 0 && (
                <span style={{ fontSize: 11, fontWeight: 700, color: '#047857', backgroundColor: '#DCFCE7', padding: '2px 8px', borderRadius: 6 }}>
                  Offline Ready • No Data Used
                </span>
              )}
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
                  <div className="chapter-card-header" style={{ marginBottom: 12 }}>
                    <div>
                      <h3 style={{ fontWeight: 800, fontSize: 17, color: '#111827', margin: 0, lineHeight: 1.3 }}>
                        {ch.titleEnglish}
                      </h3>
                      <div style={{ fontSize: 16, color: '#047857', direction: 'rtl', textAlign: 'right', marginTop: 4, fontFamily: 'Traditional Arabic, Amiri, serif', fontWeight: 700 }}>
                        {ch.titleArabic}
                      </div>
                      <div style={{ fontSize: 13.5, color: '#374151', direction: 'rtl', textAlign: 'right', marginTop: 4, fontWeight: 600 }}>
                        {ch.titleUrdu}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                      <span style={{
                        fontSize: 11,
                        fontWeight: 700,
                        backgroundColor: '#ECFDF5',
                        color: '#065F46',
                        padding: '4px 10px',
                        borderRadius: 8,
                        border: '1px solid #A7F3D0',
                        whiteSpace: 'nowrap',
                      }}>
                        باب {ch.chapterNumber}
                      </span>
                      <span style={{
                        fontSize: 11,
                        fontWeight: 700,
                        backgroundColor: '#FEF3C7',
                        color: '#92400E',
                        padding: '4px 10px',
                        borderRadius: 8,
                        border: '1px solid #FDE68A',
                        whiteSpace: 'nowrap',
                      }}>
                        {ch.hadithCount} احادیث و روایات
                      </span>
                    </div>
                  </div>

                  {ch.narrator && (
                    <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 12, direction: 'rtl', textAlign: 'right' }}>
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
                  <div className="chapter-actions-group">
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

                    {ch.audioUrlUrduSharh.includes('youtube.com') ? (
                      <a
                        href={ch.audioUrlUrduSharh}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: '8px 16px',
                          borderRadius: 8,
                          backgroundColor: '#065F46',
                          color: '#FFF',
                          fontSize: 13,
                          fontWeight: 700,
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <span>📺 اردو شرح (YouTube Dars) ↗</span>
                      </a>
                    ) : (
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
                    )}

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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Header Announcement Banner */}
            <div
              style={{
                backgroundColor: '#ECFDF5',
                border: '1px solid #A7F3D0',
                borderRadius: 14,
                padding: '16px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 12,
              }}
            >
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: '#065F46', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>🕌</span>
                  <span>سیرت النبی ﷺ آڈیو بکس و تفصیلی شروحات (Prophetic Sirah Audio Library)</span>
                </div>
                <p style={{ margin: '4px 0 0', fontSize: 13, color: '#047857', lineHeight: 1.5 }}>
                  اہل سنت و جماعت (سوادِ اعظم) کے جید ائمہ و محققین کی مستند کتبِ سیرت، مکمل بے حذف آڈیو کتب اور سلسلہ وار دروس کا صوتی انسائیکلوپیڈیا۔
                </p>
              </div>

              {/* View Switcher: Master Works vs Timeline */}
              <div style={{ display: 'flex', gap: 8, backgroundColor: '#D1FAE5', padding: 4, borderRadius: 10 }}>
                <button
                  onClick={() => setSirahViewMode('MASTER_WORKS')}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: 12.5,
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: sirahViewMode === 'MASTER_WORKS' ? '#065F46' : 'transparent',
                    color: sirahViewMode === 'MASTER_WORKS' ? '#FFFFFF' : '#047857',
                    transition: 'all 0.15s ease',
                  }}
                >
                  📚 ۴ شاہکار کتبِ سیرت (Master Works)
                </button>
                <button
                  onClick={() => setSirahViewMode('TIMELINE')}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: 12.5,
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: sirahViewMode === 'TIMELINE' ? '#065F46' : 'transparent',
                    color: sirahViewMode === 'TIMELINE' ? '#FFFFFF' : '#047857',
                    transition: 'all 0.15s ease',
                  }}
                >
                  ⏳ خلاصۂ تاریخ (Timeline Lessons)
                </button>
              </div>
            </div>

            {/* Offline Airplane Mode Storage Indicator */}
            <div
              style={{
                backgroundColor: cachedUrls.size > 0 ? '#F0FDF4' : '#F8FAFC',
                border: cachedUrls.size > 0 ? '1px solid #BBF7D0' : '1px solid #E2E8F0',
                borderRadius: 10,
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 8,
                fontSize: 12.5,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>✈️</span>
                <span style={{ fontWeight: 700, color: cachedUrls.size > 0 ? '#166534' : '#475569' }}>
                  {cachedUrls.size > 0
                    ? `آف لائن موڈ تیار: ${cachedUrls.size} ابواب انٹرنیٹ کے بغیر دستیاب ہیں (${totalCacheMb} MB)`
                    : 'آف لائن لسننگ (Offline Listening): کسی بھی باب کو بغیر انٹرنیٹ سننے کے لیے "⬇️ Save Offline" دبائیں۔'}
                </span>
              </div>
              {cachedUrls.size > 0 && (
                <span style={{ fontSize: 11, fontWeight: 700, color: '#047857', backgroundColor: '#DCFCE7', padding: '2px 8px', borderRadius: 6 }}>
                  Offline Ready • No Data Used
                </span>
              )}
            </div>

            {/* MASTER WORKS VIEW */}
            {sirahViewMode === 'MASTER_WORKS' && (() => {
              const currentWork = (audioStreamingEngine.sirahMasterWorks.find((w) => w.id === selectedSirahWorkId) ??
                audioStreamingEngine.sirahMasterWorks[0]) as SirahMasterWork | undefined;

              if (!currentWork) return null;

              const currentWorkShortEn = (currentWork.titleEnglish.split('(')[0] ?? currentWork.titleEnglish).trim();
              const currentWorkShortUr = (currentWork.titleUrdu.split('(')[0] ?? currentWork.titleUrdu).trim();

              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {/* Master Works Selector Grid */}
                  <div className="master-works-grid">
                    {audioStreamingEngine.sirahMasterWorks.map((work) => {
                      const isSelected = work.id === selectedSirahWorkId;
                      const icons: Record<string, string> = {
                        RAHEEQ: '📖',
                        ZIA_UN_NABI: '📚',
                        SEERAT_E_MUSTAFA: '🌹',
                        KITAB_ASH_SHIFA: '💎',
                      };
                      const shortEn = (work.titleEnglish.split('(')[0] ?? work.titleEnglish).trim();
                      const shortUr = (work.titleUrdu.split('(')[0] ?? work.titleUrdu).trim();
                      const shortAuth = (work.author.split('(')[0] ?? work.author).trim();

                      return (
                        <button
                          key={work.id}
                          onClick={() => setSelectedSirahWorkId(work.id)}
                          style={{
                            textAlign: 'left',
                            padding: '18px',
                            borderRadius: 14,
                            border: isSelected ? '2px solid #059669' : '1px solid #E5E7EB',
                            backgroundColor: isSelected ? '#F0FDF4' : '#FFFFFF',
                            boxShadow: isSelected ? '0 4px 14px rgba(5, 150, 105, 0.14)' : '0 1px 3px rgba(0,0,0,0.04)',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            minHeight: 175,
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 12 }}>
                            <span style={{ fontSize: 26 }}>{icons[work.id] || '📖'}</span>
                            <span
                              style={{
                                fontSize: 12,
                                fontWeight: 700,
                                padding: '4px 10px',
                                borderRadius: 8,
                                backgroundColor: isSelected ? '#059669' : '#F1F5F9',
                                color: isSelected ? '#FFFFFF' : '#334155',
                              }}
                            >
                              {work.chapters.length} ابواب / دروس
                            </span>
                          </div>
                          <div style={{ fontSize: 16.5, fontWeight: 800, color: isSelected ? '#065F46' : '#0F172A', lineHeight: 1.3 }}>
                            {shortEn}
                          </div>
                          <div style={{ fontSize: 16.5, fontWeight: 800, color: isSelected ? '#047857' : '#1E293B', direction: 'rtl', textAlign: 'right', marginTop: 6, fontFamily: 'var(--font-urdu), serif' }}>
                            {shortUr}
                          </div>
                          <div style={{ fontSize: 13, color: isSelected ? '#065F46' : '#475569', marginTop: 'auto', paddingTop: 10, fontWeight: 500 }}>
                            {shortAuth}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected Master Work Hero Card */}
                  <div
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 16,
                      border: '1px solid #D1FAE5',
                      padding: 24,
                      boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: 6,
                        height: '100%',
                        backgroundColor: '#059669',
                      }}
                    />

                    <div className="hero-card-grid">
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 700,
                              color: '#065F46',
                              backgroundColor: '#ECFDF5',
                              padding: '3px 10px',
                              borderRadius: 6,
                              border: '1px solid #A7F3D0',
                            }}
                          >
                            مستند کلاسیکی شاہکار • Canonical Masterwork
                          </span>
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 700,
                              color: '#1E40AF',
                              backgroundColor: '#EFF6FF',
                              padding: '3px 10px',
                              borderRadius: 6,
                              border: '1px solid #BFDBFE',
                            }}
                          >
                            {currentWork.volumesOrLength}
                          </span>
                        </div>

                        <h2 style={{ fontSize: 24, fontWeight: 800, color: '#111827', margin: '4px 0 2px', lineHeight: 1.25 }}>
                          {currentWork.titleEnglish}
                        </h2>
                        <div style={{ fontSize: 18, fontWeight: 800, color: '#065F46', direction: 'rtl', textAlign: 'right', marginTop: 4 }}>
                          {currentWork.titleArabic} — {currentWork.titleUrdu}
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#4B5563', marginTop: 6, direction: 'rtl', textAlign: 'right' }}>
                          ✍️ مصنف: <strong>{currentWork.authorUrdu}</strong> ({currentWork.author})
                        </div>
                      </div>

                      {/* External Resource Action Buttons */}
                      <div className="hero-actions-column">
                        <a
                          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(currentWork.externalSources.youtubeSearchQuery)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            padding: '8px 14px',
                            backgroundColor: '#FEF2F2',
                            border: '1px solid #FECACA',
                            color: '#991B1B',
                            borderRadius: 8,
                            fontSize: 12,
                            fontWeight: 700,
                            textDecoration: 'none',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <span>🎬 یوٹیوب مکمل پلے لسٹ ↗</span>
                        </a>

                        {currentWork.externalSources.archiveOrgUrl && (
                          <a
                            href={currentWork.externalSources.archiveOrgUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 8,
                              padding: '8px 14px',
                              backgroundColor: '#F8FAFC',
                              border: '1px solid #E2E8F0',
                              color: '#334155',
                              borderRadius: 8,
                              fontSize: 12,
                              fontWeight: 700,
                              textDecoration: 'none',
                              transition: 'all 0.15s ease',
                            }}
                          >
                            <span>🏛️ Archive.org MP3 پورٹل ↗</span>
                          </a>
                        )}

                        {currentWork.externalSources.officialPortalUrl && (
                          <a
                            href={currentWork.externalSources.officialPortalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 8,
                              padding: '8px 14px',
                              backgroundColor: '#F0FDF4',
                              border: '1px solid #BBF7D0',
                              color: '#166534',
                              borderRadius: 8,
                              fontSize: 12,
                              fontWeight: 700,
                              textDecoration: 'none',
                              transition: 'all 0.15s ease',
                            }}
                          >
                            <span>🌐 سرکاری پبلیکیشن ریفرنس ↗</span>
                          </a>
                        )}

                        {currentWork.id === 'SEERAT_E_MUSTAFA' && (
                          <a
                            href="/books/seerate-mustafa-english.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 8,
                              padding: '8px 14px',
                              backgroundColor: '#EFF6FF',
                              border: '1px solid #BFDBFE',
                              color: '#1E40AF',
                              borderRadius: 8,
                              fontSize: 12,
                              fontWeight: 700,
                              textDecoration: 'none',
                              transition: 'all 0.15s ease',
                            }}
                          >
                            <span>📖 English Edition PDF (13.3 MB) ↗</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Historical Significance Callout */}
                    <div
                      style={{
                        marginTop: 18,
                        backgroundColor: '#F9FAFB',
                        borderRadius: 10,
                        padding: '14px 18px',
                        border: '1px solid #F3F4F6',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                      }}
                    >
                      <div style={{ fontSize: 13.5, color: '#1F2937', direction: 'rtl', lineHeight: 1.7, fontWeight: 500 }}>
                        {currentWork.historicalSignificanceUrdu}
                      </div>
                      <div style={{ fontSize: 12.5, color: '#4B5563', lineHeight: 1.5, borderTop: '1px dashed #E5E7EB', paddingTop: 8 }}>
                        💡 <em>Format:</em> {currentWork.audioFormatDescription} • {currentWork.significanceEnglish}
                      </div>
                    </div>
                  </div>

                  {/* Chapter-by-Chapter Streaming Audio List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ fontSize: 17, fontWeight: 800, color: '#111827', margin: 0 }}>
                        سلسلہ وار ابواب و دروس ({currentWork.chapters.length} Chapters & Lessons)
                      </h3>
                      <span style={{ fontSize: 12, color: '#6B7280' }}>
                        {currentWork.id === 'RAHEEQ' || currentWork.id === 'KITAB_ASH_SHIFA'
                          ? 'Click ▶ to stream instantly with player & offline mode'
                          : '📺 Click to watch/listen verified scholarly Dars series'}
                      </span>
                    </div>

                    {currentWork.chapters.map((ch) => {
                      const isExternalDars = ch.audioStreamUrl.includes('youtube.com') || ch.audioStreamUrl.includes('youtu.be') || !ch.audioStreamUrl.endsWith('.mp3');
                      const isThisPlaying = !isExternalDars && currentTrack?.audioUrl === ch.audioStreamUrl && isPlaying;
                      const eraColors: Record<string, { bg: string; border: string; text: string; labelUrdu: string }> = {
                        PRE_PROPHETHOOD: { bg: '#FEF3C7', border: '#FDE68A', text: '#92400E', labelUrdu: 'قبل از نبوت' },
                        MAKKAN: { bg: '#E0E7FF', border: '#C7D2FE', text: '#3730A3', labelUrdu: 'دورِ مکی' },
                        MADINAN: { bg: '#DCFCE7', border: '#BBF7D0', text: '#166534', labelUrdu: 'دورِ مدنی' },
                        SHAMAIL_HUQUQ: { bg: '#FFE4E6', border: '#FECDD3', text: '#9F1239', labelUrdu: 'شمائل و حقوقِ نبوی' },
                      };
                      const eraBadge = eraColors[ch.era] ?? {
                        bg: '#DCFCE7',
                        border: '#BBF7D0',
                        text: '#166534',
                        labelUrdu: 'دورِ مدنی',
                      };

                      return (
                        <div
                          key={ch.chapterNumber}
                          style={{
                            backgroundColor: '#FFFFFF',
                            borderRadius: 14,
                            padding: 20,
                            border: isThisPlaying ? '2px solid #059669' : '1px solid #E5E7EB',
                            boxShadow: isThisPlaying ? '0 4px 16px rgba(5, 150, 105, 0.14)' : '0 1px 3px rgba(0,0,0,0.04)',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <div className="chapter-card-header">
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                                <span
                                  style={{
                                    fontSize: 12,
                                    fontWeight: 700,
                                    color: eraBadge.text,
                                    backgroundColor: eraBadge.bg,
                                    border: `1px solid ${eraBadge.border}`,
                                    padding: '3px 10px',
                                    borderRadius: 6,
                                  }}
                                >
                                  باب {ch.chapterNumber} • {eraBadge.labelUrdu} ({ch.era})
                                </span>
                                <span style={{ fontSize: 12.5, color: '#4B5563', fontWeight: 600 }}>
                                  ⏱️ {Math.round(ch.durationSeconds / 60)} منٹ
                                </span>
                              </div>

                              <h4 style={{ fontSize: 17.5, fontWeight: 800, color: '#0F172A', margin: '4px 0 3px', lineHeight: 1.3 }}>
                                {ch.titleEnglish}
                              </h4>
                              <div style={{ fontSize: 17.5, fontWeight: 800, color: '#047857', direction: 'rtl', textAlign: 'right', marginTop: 4, fontFamily: 'var(--font-urdu), serif' }}>
                                {ch.titleUrdu}
                              </div>
                            </div>

                            {/* Action Buttons: Either Direct Audio Player or Verified Dars Link */}
                            <div className="chapter-actions-group">
                              {isExternalDars ? (
                                <>
                                  <a
                                    href={ch.audioStreamUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                      padding: '9px 18px',
                                      borderRadius: 8,
                                      backgroundColor: '#DC2626',
                                      color: '#FFFFFF',
                                      fontSize: 13,
                                      fontWeight: 700,
                                      textDecoration: 'none',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      gap: 6,
                                      boxShadow: '0 2px 6px rgba(220, 38, 38, 0.22)',
                                      transition: 'all 0.15s ease',
                                      whiteSpace: 'nowrap',
                                    }}
                                  >
                                    <span>📺 یوٹیوب درس سنیں</span>
                                    <span>Watch / Listen Dars ({Math.round(ch.durationSeconds / 60)}m) ↗</span>
                                  </a>

                                  {currentWork.externalSources?.officialPortalUrl && (
                                    <a
                                      href={currentWork.externalSources.officialPortalUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{
                                        padding: '8px 12px',
                                        borderRadius: 8,
                                        backgroundColor: '#F3F4F6',
                                        color: '#374151',
                                        fontSize: 12,
                                        fontWeight: 600,
                                        border: '1px solid #D1D5DB',
                                        textDecoration: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 4,
                                        whiteSpace: 'nowrap',
                                      }}
                                    >
                                      <span>📖 باضابطہ پورٹل ↗</span>
                                    </a>
                                  )}
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() =>
                                      handlePlayAudio(
                                        `${currentWorkShortEn} — Ch ${ch.chapterNumber}: ${ch.titleEnglish}`,
                                        ch.audioStreamUrl,
                                        `${currentWorkShortUr} • ${ch.titleUrdu}`,
                                        currentWork.author,
                                        'ur'
                                      )
                                    }
                                    style={{
                                      padding: '9px 18px',
                                      borderRadius: 8,
                                      backgroundColor: isThisPlaying ? '#DC2626' : '#1B4332',
                                      color: '#FFFFFF',
                                      fontSize: 13,
                                      fontWeight: 700,
                                      border: 'none',
                                      cursor: 'pointer',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      gap: 6,
                                      boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
                                      transition: 'all 0.15s ease',
                                      whiteSpace: 'nowrap',
                                    }}
                                  >
                                    <span>{isThisPlaying ? '⏸ وقفہ' : '▶ سنیں'}</span>
                                    <span>{isThisPlaying ? 'Pause Audio' : `Play (${Math.round(ch.durationSeconds / 60)}m)`}</span>
                                  </button>

                                  {/* Offline Airplane Mode Save Button */}
                                  {(() => {
                                    const isOfflineCached = cachedUrls.has(ch.audioStreamUrl);
                                    const isDownloading = downloadingUrl === ch.audioStreamUrl;

                                    return (
                                      <button
                                        onClick={() =>
                                          handleToggleOffline(
                                            ch.audioStreamUrl,
                                            `${currentWorkShortEn} — Ch ${ch.chapterNumber}: ${ch.titleEnglish}`,
                                            `${currentWorkShortUr} • ${ch.titleUrdu}`
                                          )
                                        }
                                        style={{
                                          padding: '8px 12px',
                                          borderRadius: 8,
                                          backgroundColor: isOfflineCached ? '#ECFDF5' : '#F9FAFB',
                                          color: isOfflineCached ? '#065F46' : '#4B5563',
                                          fontSize: 12,
                                          fontWeight: 700,
                                          border: isOfflineCached ? '1px solid #A7F3D0' : '1px solid #D1D5DB',
                                          cursor: 'pointer',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          gap: 4,
                                          transition: 'all 0.15s ease',
                                          whiteSpace: 'nowrap',
                                        }}
                                        title={isOfflineCached ? 'Click to delete from offline cache' : 'Download for offline airplane mode'}
                                      >
                                        <span>
                                          {isDownloading
                                            ? `⏳ ${downloadProgress}%`
                                            : isOfflineCached
                                            ? '🟢 آف لائن محفوظ'
                                            : '⬇️ Save Offline'}
                                        </span>
                                      </button>
                                    );
                                  })()}

                                  <a
                                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                                      ch.youtubeSearchTerm || `${currentWork.author} ${ch.titleUrdu}`
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                      padding: '8px 12px',
                                      borderRadius: 8,
                                      backgroundColor: '#F3F4F6',
                                      color: '#374151',
                                      fontSize: 12,
                                      fontWeight: 600,
                                      border: '1px solid #D1D5DB',
                                      textDecoration: 'none',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      gap: 4,
                                      whiteSpace: 'nowrap',
                                    }}
                                  >
                                    <span>📺 یوٹیوب ↗</span>
                                  </a>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Dual Summaries with Balanced Proportions */}
                          <div
                            style={{
                              marginTop: 14,
                              backgroundColor: '#F9FAFB',
                              padding: '12px 16px',
                              borderRadius: 10,
                              border: '1px solid #F3F4F6',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: 8,
                            }}
                          >
                            <div style={{ fontSize: 13, color: '#1F2937', direction: 'rtl', textAlign: 'right', lineHeight: 1.6 }}>
                              <span style={{ fontSize: 10.5, fontWeight: 700, color: '#047857', backgroundColor: '#ECFDF5', padding: '1px 6px', borderRadius: 4, marginLeft: 6 }}>
                                خلاصۂ باب
                              </span>
                              {ch.summaryUrdu}
                            </div>
                            <div style={{ fontSize: 12.5, color: '#4B5563', lineHeight: 1.5, borderTop: '1px dashed #E5E7EB', paddingTop: 8, direction: 'ltr', textAlign: 'left' }}>
                              <span style={{ fontSize: 10.5, fontWeight: 700, color: '#475569', backgroundColor: '#F1F5F9', padding: '1px 6px', borderRadius: 4, marginRight: 6 }}>
                                Summary
                              </span>
                              {ch.summaryEnglish}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            {/* TIMELINE VIEW (Chronological Episodes) */}
            {sirahViewMode === 'TIMELINE' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div
                  style={{
                    backgroundColor: '#EFF6FF',
                    border: '1px solid #BFDBFE',
                    borderRadius: 12,
                    padding: '12px 16px',
                    fontSize: 13,
                    color: '#1E40AF',
                  }}
                >
                  🕌 <strong>Authentic Chronological Sirah Lessons (خلاصۂ سیرت النبی):</strong> High-fidelity audio lessons detailing the life and milestones of the Prophet Muhammad ﷺ from birth through the Madinan era.
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
                      <div className="chapter-card-header">
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                            <span
                              style={{
                                fontSize: 11,
                                fontWeight: 700,
                                color: '#047857',
                                backgroundColor: '#F0FDF4',
                                padding: '3px 10px',
                                borderRadius: 6,
                                border: '1px solid #A7F3D0',
                              }}
                            >
                              EPISODE {ep.episodeNumber} • {ep.era}
                            </span>
                            <span style={{ fontSize: 11, color: '#6B7280', fontWeight: 600 }}>
                              📅 {ep.yearHijriOrGregorian}
                            </span>
                          </div>
                          <h3 style={{ fontSize: 17, fontWeight: 800, color: '#111827', margin: '4px 0 2px', lineHeight: 1.3 }}>
                            {ep.titleEnglish}
                          </h3>
                          <div style={{ fontSize: 14, color: '#047857', direction: 'rtl', textAlign: 'right', fontWeight: 700, marginTop: 4 }}>
                            {ep.titleUrdu}
                          </div>
                        </div>

                        <div className="chapter-actions-group">
                          <button
                            onClick={() =>
                              handlePlayAudio(
                                `Sirah Ep ${ep.episodeNumber}: ${ep.titleEnglish}`,
                                ep.audioUrl,
                                `${ep.titleUrdu} • ${ep.yearHijriOrGregorian}`,
                                'Authentic Seerat-un-Nabi Audio',
                                'ur'
                              )
                            }
                            style={{
                              padding: '9px 18px',
                              borderRadius: 8,
                              backgroundColor: isThisPlaying ? '#DC2626' : '#1B4332',
                              color: '#FFF',
                              fontSize: 13,
                              fontWeight: 700,
                              border: 'none',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: 8,
                              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                              transition: 'all 0.15s ease-in-out',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            <span>{isThisPlaying ? '⏸' : '▶'}</span>
                            <span>{isThisPlaying ? 'Pause Audio' : `Listen (${Math.round(ep.durationSeconds / 60)}m)`}</span>
                          </button>

                          {(() => {
                            const isOfflineCached = cachedUrls.has(ep.audioUrl);
                            const isDownloading = downloadingUrl === ep.audioUrl;

                            return (
                              <button
                                onClick={() =>
                                  handleToggleOffline(
                                    ep.audioUrl,
                                    `Sirah Ep ${ep.episodeNumber}: ${ep.titleEnglish}`,
                                    `${ep.titleUrdu} • ${ep.yearHijriOrGregorian}`
                                  )
                                }
                                style={{
                                  padding: '8px 12px',
                                  borderRadius: 8,
                                  backgroundColor: isOfflineCached ? '#ECFDF5' : '#F9FAFB',
                                  color: isOfflineCached ? '#065F46' : '#4B5563',
                                  fontSize: 12,
                                  fontWeight: 700,
                                  border: isOfflineCached ? '1px solid #A7F3D0' : '1px solid #D1D5DB',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: 4,
                                  transition: 'all 0.15s ease',
                                  whiteSpace: 'nowrap',
                                }}
                                title={isOfflineCached ? 'Click to delete from offline cache' : 'Download for offline airplane mode'}
                              >
                                <span>
                                  {isDownloading
                                    ? `⏳ ${downloadProgress}%`
                                    : isOfflineCached
                                    ? '🟢 آف لائن محفوظ'
                                    : '⬇️ Save Offline'}
                                </span>
                              </button>
                            );
                          })()}
                        </div>
                      </div>

                      <p
                        style={{
                          fontSize: 13.5,
                          color: '#374151',
                          margin: '14px 0 0',
                          lineHeight: 1.6,
                          backgroundColor: '#F9FAFB',
                          padding: '12px 16px',
                          borderRadius: 8,
                          border: '1px solid #F3F4F6',
                        }}
                      >
                        {ep.summary}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* Responsive Grid & Card Ratio System */
        .master-works-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }
        @media (max-width: 1080px) {
          .master-works-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }
        @media (max-width: 540px) {
          .master-works-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }
        }

        .hero-card-grid {
          display: grid;
          grid-template-columns: 1fr 230px;
          gap: 24px;
          align-items: center;
        }
        @media (max-width: 860px) {
          .hero-card-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }

        .hero-actions-column {
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 100%;
        }
        @media (max-width: 860px) {
          .hero-actions-column {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 8px;
          }
        }

        .chapter-card-header {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 16px;
          align-items: center;
        }
        @media (max-width: 768px) {
          .chapter-card-header {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }

        .chapter-actions-group {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: nowrap;
        }
        @media (max-width: 768px) {
          .chapter-actions-group {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
            gap: 8px;
          }
        }
      `,
        }}
      />
    </div>
  );
}
