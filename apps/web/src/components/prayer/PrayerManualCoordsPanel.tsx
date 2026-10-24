import React from 'react';

interface PrayerManualCoordsPanelProps {
  isOpen: boolean;
  manualCityName: string;
  setManualCityName: (name: string) => void;
  manualLat: number;
  setManualLat: (lat: number) => void;
  manualLon: number;
  setManualLon: (lon: number) => void;
  onApplyManualCoords: () => void;
}

export function PrayerManualCoordsPanel({
  isOpen,
  manualCityName,
  setManualCityName,
  manualLat,
  setManualLat,
  manualLon,
  setManualLon,
  onApplyManualCoords,
}: PrayerManualCoordsPanelProps) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        border: '1px solid #E5E7EB',
        marginBottom: 20,
      }}
    >
      <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1B4332', margin: '0 0 12px' }}>
        🌐 Enter Exact Geographic Coordinates
      </h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 12,
          marginBottom: 14,
        }}
      >
        <div>
          <label
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: '#4B5563',
              display: 'block',
              marginBottom: 4,
            }}
          >
            Location Label
          </label>
          <input
            type="text"
            value={manualCityName}
            onChange={(e) => setManualCityName(e.target.value)}
            placeholder="e.g. My Town / Village"
            style={{
              width: '100%',
              padding: '8px 10px',
              borderRadius: 6,
              border: '1px solid #D1D5DB',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <div>
          <label
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: '#4B5563',
              display: 'block',
              marginBottom: 4,
            }}
          >
            Latitude (° N/S)
          </label>
          <input
            type="number"
            step="0.0001"
            value={manualLat}
            onChange={(e) => setManualLat(Number(e.target.value))}
            style={{
              width: '100%',
              padding: '8px 10px',
              borderRadius: 6,
              border: '1px solid #D1D5DB',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <div>
          <label
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: '#4B5563',
              display: 'block',
              marginBottom: 4,
            }}
          >
            Longitude (° E/W)
          </label>
          <input
            type="number"
            step="0.0001"
            value={manualLon}
            onChange={(e) => setManualLon(Number(e.target.value))}
            style={{
              width: '100%',
              padding: '8px 10px',
              borderRadius: 6,
              border: '1px solid #D1D5DB',
              boxSizing: 'border-box',
            }}
          />
        </div>
      </div>
      <button
        onClick={onApplyManualCoords}
        style={{
          padding: '8px 18px',
          borderRadius: 8,
          backgroundColor: '#1B4332',
          color: '#FFF',
          border: 'none',
          fontWeight: 700,
          fontSize: 13,
          cursor: 'pointer',
        }}
      >
        Apply Exact Coordinates
      </button>
    </div>
  );
}
