import React, { useState } from 'react';
import Head from 'next/head';
import { Navigation } from '../components/Navigation';
import { offlineResilienceEngine, OfflinePilgrimageRitesPack, OfflineBundleStatus } from '@amal/amal-engine';
import { useAudioPlayer } from '../context/AudioPlayerContext';

export default function HajjUmrahOfflinePage() {
  const rites = offlineResilienceEngine.getPilgrimageRites();
  const bundleStatus: OfflineBundleStatus = offlineResilienceEngine.getOfflineBundleStatus();
  const [selectedStage, setSelectedStage] = useState<OfflinePilgrimageRitesPack['stage']>('IHRAM');
  const { playTrack } = useAudioPlayer();

  const activePack = rites.find((r) => r.stage === selectedStage) || rites[0]!;

  return (
    <div style={{ backgroundColor: '#F8F9FA', minHeight: '100vh', paddingBottom: 80 }}>
      <Head>
        <title>AMAL OS — 100% Offline Hajj & Umrah Travel Guide</title>
      </Head>
      <Navigation />

      <main style={{ maxWidth: 900, margin: '0 auto', padding: '0 20px' }}>
        {/* Header Banner */}
        <div style={{
          backgroundColor: '#1E3A8A',
          borderRadius: 16,
          padding: '24px 28px',
          color: '#FFFFFF',
          marginBottom: 24,
        }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: '#93C5FD', letterSpacing: 1.5, textTransform: 'uppercase' }}>
            ZERO-NETWORK PILGRIMAGE RESILIENCE
          </span>
          <h1 style={{ fontSize: 26, fontWeight: 900, margin: '6px 0 4px' }}>
            Hajj & Umrah 100% Offline Travel Pack
          </h1>
          <p style={{ margin: 0, fontSize: 14, color: '#DBEAFE', maxWidth: 640 }}>
            Guaranteed zero-network availability during Tawaf, Sa'i, Arafat, and international flights. Step-by-step Sunnah rites, authentic Prophetic Duas, and offline solar calculation.
          </p>
        </div>

        {/* Offline Cache Status Card */}
        <div style={{
          backgroundColor: '#EFF6FF',
          border: '1px solid #BFDBFE',
          borderRadius: 12,
          padding: 16,
          marginBottom: 24,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 10,
        }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#1E40AF' }}>
              ✓ LOCAL OFFLINE BUNDLE CACHED ({bundleStatus.cachedStorageKb} KB)
            </div>
            <div style={{ fontSize: 11, color: '#3B82F6', marginTop: 2 }}>
              Version: {bundleStatus.bundleVersion} • Synced: {new Date(bundleStatus.lastSyncedTimestamp).toLocaleDateString()}
            </div>
          </div>
          <span style={{ fontSize: 11, backgroundColor: '#DBEAFE', color: '#1E40AF', padding: '4px 10px', borderRadius: 12, fontWeight: 700 }}>
            No Internet Connection Required
          </span>
        </div>

        {/* Pilgrimage Stages Navigation */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {rites.map((r) => (
            <button
              key={r.stage}
              onClick={() => setSelectedStage(r.stage)}
              style={{
                padding: '10px 18px',
                borderRadius: 8,
                border: 'none',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
                backgroundColor: selectedStage === r.stage ? '#1E3A8A' : '#FFFFFF',
                color: selectedStage === r.stage ? '#FFFFFF' : '#4B5563',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              {r.title}
            </button>
          ))}
        </div>

        {/* Active Stage Guide Card */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 14,
          padding: 24,
          border: '1px solid #E5E7EB',
          marginBottom: 20,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1E3A8A', margin: 0 }}>
                {activePack.title}
              </h2>
              <div style={{ fontSize: 14, color: '#6B7280', marginTop: 2 }}>{activePack.titleUrdu} • Location: {activePack.location}</div>
            </div>
          </div>

          {/* Essential Sunnah Actions */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#111827', marginBottom: 8, textTransform: 'uppercase' }}>
              Essential Sunnah Actions:
            </div>
            {activePack.essentialSunnahActions.map((action, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, fontSize: 13, color: '#374151', marginBottom: 6 }}>
                <span style={{ color: '#2563EB', fontWeight: 800 }}>✓</span>
                <span>{action}</span>
              </div>
            ))}
          </div>

          {/* Authentic Duas */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#111827', marginBottom: 8, textTransform: 'uppercase' }}>
              Authentic Duas for this Stage:
            </div>
            {activePack.authenticDuas.map((dua, i) => (
              <div key={i} style={{
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: 10,
                padding: 16,
                marginBottom: 10,
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1E3A8A', marginBottom: 6 }}>
                  {dua.title}
                </div>
                <div style={{ fontSize: 20, fontFamily: 'serif', direction: 'rtl', textAlign: 'right', color: '#0F172A', lineHeight: 1.8, marginBottom: 8 }}>
                  {dua.arabic}
                </div>
                <div style={{ fontSize: 13, color: '#475569', fontStyle: 'italic', marginBottom: 4 }}>
                  {dua.urdu}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                  <div style={{ fontSize: 11, color: '#64748B' }}>
                    Source: {dua.reference}
                  </div>
                  <button
                    onClick={() =>
                      playTrack({
                        id: `hajj-dua-${i}`,
                        title: dua.title,
                        subtitle: `${activePack.title} • ${dua.reference}`,
                        audioUrl: dua.audioUrl || 'https://archive.org/download/talbiyat/Talbiya.mp3',
                        reciter: 'Hajj Supplication',
                        arabicSnippet: dua.arabic,
                      })
                    }
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      padding: '4px 10px',
                      borderRadius: 6,
                      backgroundColor: '#EFF6FF',
                      color: '#1E40AF',
                      border: '1px solid #BFDBFE',
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    <span>▶</span>
                    <span>Listen Dua Audio</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Mistakes to Avoid */}
          <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: 14, fontSize: 12, color: '#991B1B' }}>
            <div style={{ fontWeight: 800, marginBottom: 4 }}>⚠️ Common Errors to Avoid:</div>
            {activePack.commonMistakesToAvoid.map((err, i) => (
              <div key={i}>• {err}</div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
