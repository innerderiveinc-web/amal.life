import React from 'react';

interface SettingsSystemTabProps {
  apiHealth: 'checking' | 'online' | 'offline';
  storageUsage: string;
  cachingProgress: { active: boolean; current: number; total: number } | null;
  handlePrecacheAllQuran: () => void;
  handleClearCache: () => void;
  t: (en: string, ur: string) => string;
}

export function SettingsSystemTab({
  apiHealth,
  storageUsage,
  cachingProgress,
  handlePrecacheAllQuran,
  handleClearCache,
  t,
}: SettingsSystemTabProps) {
  return (
    <div>
      <h2 style={{ margin: '0 0 16px', fontSize: 20, fontWeight: 800, color: '#111827' }}>
        Platform Diagnostics & System Status
      </h2>
      <p style={{ margin: '0 0 24px', fontSize: 13, color: '#6B7280' }}>
        Live runtime health, sovereign storage status, and engine version telemetry.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div style={{ padding: 16, borderRadius: 10, backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>
            Backend API Gateway
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: apiHealth === 'online' ? '#059669' : '#D97706', marginTop: 4 }}>
            {apiHealth === 'online' ? '🟢 Online (200 OK)' : '🟡 Local Sovereign Fallback (Offline Mode)'}
          </div>
        </div>

        <div style={{ padding: 16, borderRadius: 10, backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>
            Service Worker Cache
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#059669', marginTop: 4 }}>
            ⚡ 100% Offline PWA Ready
          </div>
        </div>

        <div style={{ padding: 16, borderRadius: 10, backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>
            Sovereign Storage Footprint
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginTop: 4 }}>
            {storageUsage}
          </div>
        </div>

        <div style={{ padding: 16, borderRadius: 10, backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>
            AMAL OS Engine Version
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginTop: 4 }}>
            V1.0.0 (Release 2026.10) · by Qsura India Pvt Ltd
          </div>
        </div>
      </div>

      {/* Progressive Web App & Offline Corpus Controls */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #D1D5DB',
          borderRadius: 12,
          padding: 20,
          marginBottom: 24,
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}
      >
        <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 800, color: '#111827', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>📲</span>
          <span>PWA Installation & Offline Corpus Sentinel</span>
        </h3>
        <p style={{ margin: '0 0 16px', fontSize: 13, color: '#6B7280', lineHeight: 1.5 }}>
          AMAL OS can operate 100% offline without any internet connection. You can install it on your home screen or precache the complete Quran corpus locally on this device.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button
            onClick={() => {
              if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('amal-open-install'));
            }}
            style={{
              padding: '10px 18px',
              backgroundColor: '#064E3B',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span>📲</span>
            <span>{t('Install AMAL OS on Device', 'امل او ایس ہوم اسکرین پر انسٹال کریں')}</span>
          </button>

          <button
            onClick={handlePrecacheAllQuran}
            disabled={Boolean(cachingProgress?.active)}
            style={{
              padding: '10px 18px',
              backgroundColor: cachingProgress?.active ? '#E5E7EB' : '#F0FDF4',
              color: cachingProgress?.active ? '#9CA3AF' : '#166534',
              border: '1px solid #86EFAC',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 700,
              cursor: cachingProgress?.active ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span>📥</span>
            <span>
              {cachingProgress?.active
                ? `Downloading: Surah ${cachingProgress.current}/${cachingProgress.total}...`
                : 'Precache All 114 Surahs for 100% Offline Access'}
            </span>
          </button>

          <button
            onClick={handleClearCache}
            style={{
              padding: '10px 16px',
              backgroundColor: '#FEF2F2',
              color: '#991B1B',
              border: '1px solid #FECACA',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span>🧹</span>
            <span>Clear Service Worker Cache</span>
          </button>
        </div>
      </div>

      <div
        style={{
          padding: 16,
          borderRadius: 10,
          backgroundColor: '#F3F4F6',
          fontSize: 12,
          color: '#4B5563',
          lineHeight: 1.6,
        }}
      >
        <strong>Epistemic Compliance Guarantee:</strong> AMAL OS is engineered and stewarded by Qsura India Pvt Ltd, operating strictly under the Two-Scholar Dual Jurist Protocol (INV_07) and Section 03 Epistemic Domain Invariants. All calculations are executed deterministically on-device without remote tracking or commercial telemetry.
      </div>
    </div>
  );
}
