import React from 'react';
import { GlobalCity } from '../../lib/global-locations';

interface PrayerActionBarProps {
  selectedCity: GlobalCity;
  qibla: { bearingDegrees: number; compassDirection: string; distanceKm: number };
  handleUseGPS: () => void;
  isLocating: boolean;
  onOpenSearch: () => void;
  onOpenOffsets: () => void;
  offsets: Record<string, number>;
  onOpenPrecision: () => void;
  isUrdu: boolean;
  isSpiritualPause: boolean;
  toggleSpiritualPause: () => void;
  isManualCoordsOpen: boolean;
  setIsManualCoordsOpen: (open: boolean) => void;
}

export function PrayerActionBar({
  selectedCity,
  qibla,
  handleUseGPS,
  isLocating,
  onOpenSearch,
  onOpenOffsets,
  offsets,
  onOpenPrecision,
  isUrdu,
  isSpiritualPause,
  toggleSpiritualPause,
  isManualCoordsOpen,
  setIsManualCoordsOpen,
}: PrayerActionBarProps) {
  const hasOffsets = Object.values(offsets).some((v) => v !== 0);

  return (
    <div
      style={{
        backgroundColor: '#0F291E',
        borderRadius: 14,
        padding: '18px 24px',
        color: '#F8FAFC',
        marginBottom: 20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 16,
        boxShadow: '0 4px 6px -1px rgba(15, 41, 30, 0.2)',
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 18 }}>📍</span>
          <span style={{ fontSize: 18, fontWeight: 800, color: '#A7F3D0' }}>
            {selectedCity.name}, {selectedCity.country}
          </span>
          <span
            style={{
              fontSize: 11,
              backgroundColor: 'rgba(52, 211, 153, 0.2)',
              color: '#6EE7B7',
              padding: '2px 8px',
              borderRadius: 12,
              fontWeight: 700,
            }}
          >
            ACTIVE
          </span>
        </div>
        <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 4 }}>
          Coordinates: {selectedCity.lat.toFixed(4)}° N, {selectedCity.lon.toFixed(4)}° E • Qibla Bearing: {qibla.bearingDegrees}° ({qibla.compassDirection}) • Distance to Kaaba: {qibla.distanceKm.toLocaleString()} km
        </div>
      </div>

      {/* Location Action Buttons */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button
          onClick={handleUseGPS}
          disabled={isLocating}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 14px',
            borderRadius: 8,
            backgroundColor: '#10B981',
            color: '#FFFFFF',
            border: 'none',
            fontWeight: 700,
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          <span>{isLocating ? '⏳' : '🎯'}</span>
          <span>{isLocating ? 'Detecting GPS...' : 'Use My GPS'}</span>
        </button>

        <button
          onClick={onOpenSearch}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 14px',
            borderRadius: 8,
            backgroundColor: 'rgba(255,255,255,0.15)',
            color: '#FFFFFF',
            border: '1px solid rgba(255,255,255,0.25)',
            fontWeight: 600,
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          <span>🔍</span>
          <span>Search Any City / Town</span>
        </button>

        <button
          onClick={onOpenOffsets}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 14px',
            borderRadius: 8,
            backgroundColor: hasOffsets ? '#D97706' : 'rgba(255,255,255,0.15)',
            color: '#FFFFFF',
            border: '1px solid rgba(255,255,255,0.25)',
            fontWeight: 600,
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          <span>⚙️</span>
          <span>{hasOffsets ? 'Calibrated (± Min)' : 'Calibrate / ± Minutes'}</span>
        </button>

        <button
          onClick={onOpenPrecision}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 14px',
            borderRadius: 8,
            backgroundColor: '#047857',
            color: '#FFFFFF',
            border: '1px solid #10B981',
            fontWeight: 700,
            fontSize: 13,
            cursor: 'pointer',
          }}
          title={isUrdu ? 'فقہی و فلکیاتی موازنہ دیکھیں' : 'Compare 5 Global Fiqh Authorities & Asr Shadow Rules'}
        >
          <span>🔭</span>
          <span>{isUrdu ? 'فقہی و فلکیاتی تحقیق' : 'Multi-Fiqh Verifier'}</span>
        </button>

        {/* Spiritual Pause Mode Toggle (For Sisters) */}
        <button
          onClick={toggleSpiritualPause}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 14px',
            borderRadius: 8,
            backgroundColor: isSpiritualPause ? '#9D174D' : 'rgba(255,255,255,0.15)',
            color: '#FFFFFF',
            border: isSpiritualPause ? '1px solid #F472B6' : '1px solid rgba(255,255,255,0.25)',
            fontWeight: 700,
            fontSize: 13,
            cursor: 'pointer',
          }}
          title={isUrdu ? 'ایامِ معافی و طہارت موڈ' : 'Toggle Spiritual Pause Mode for Sisters'}
        >
          <span>🌸</span>
          <span>
            {isSpiritualPause
              ? isUrdu ? 'ایامِ معافی: فعال' : 'Cycle Pause: ON'
              : isUrdu ? 'ایامِ معافی موڈ' : 'Spiritual Pause'}
          </span>
        </button>

        <button
          onClick={() => setIsManualCoordsOpen(!isManualCoordsOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 12px',
            borderRadius: 8,
            backgroundColor: 'transparent',
            color: '#9CA3AF',
            border: '1px solid rgba(255,255,255,0.2)',
            fontWeight: 600,
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          <span>🌐</span>
          <span>Manual Lat/Lon</span>
        </button>
      </div>
    </div>
  );
}
