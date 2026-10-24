import React from 'react';

interface PrayerQiblaCardProps {
  qibla: {
    bearingDegrees: number;
    compassDirection: string;
    distanceKm: number;
  };
  selectedCityName: string;
}

export function PrayerQiblaCard({ qibla, selectedCityName }: PrayerQiblaCardProps) {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 24,
        border: '1px solid #E5E7EB',
        textAlign: 'center',
      }}
    >
      <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1B4332', marginBottom: 8 }}>
        Qibla Azimuth & Compass
      </h2>
      <p style={{ color: '#6B7280', fontSize: 13, marginBottom: 20 }}>
        Great circle heading towards the Kaaba (Makkah al-Mukarramah) from {selectedCityName}
      </p>

      {/* Compass Visualization */}
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: '50%',
          margin: '0 auto 20px',
          border: '4px solid #1B4332',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F0FDF4',
          boxShadow: '0 4px 12px rgba(27,67,50,0.1)',
        }}
      >
        <span style={{ position: 'absolute', top: 6, fontWeight: 800, fontSize: 12, color: '#1B4332' }}>N</span>
        <span style={{ position: 'absolute', bottom: 6, fontWeight: 800, fontSize: 12, color: '#1B4332' }}>S</span>
        <span style={{ position: 'absolute', left: 8, fontWeight: 800, fontSize: 12, color: '#1B4332' }}>W</span>
        <span style={{ position: 'absolute', right: 8, fontWeight: 800, fontSize: 12, color: '#1B4332' }}>E</span>

        {/* Needle pointing to Qibla bearing */}
        <div
          style={{
            width: 4,
            height: 120,
            position: 'absolute',
            transform: `rotate(${qibla.bearingDegrees}deg)`,
            transition: 'transform 0.5s ease',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderBottom: '16px solid #DC2626',
            }}
          />
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#1B4332' }} />
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '16px solid #64748B',
            }}
          />
        </div>
      </div>

      <div style={{ fontSize: 28, fontWeight: 800, color: '#1B4332' }}>
        {qibla.bearingDegrees}°
      </div>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#4B5563', marginTop: 4 }}>
        Heading: {qibla.compassDirection}
      </div>
      <div
        style={{
          fontSize: 12,
          color: '#6B7280',
          marginTop: 12,
          padding: '8px 12px',
          backgroundColor: '#F9FAFB',
          borderRadius: 8,
        }}
      >
        Distance to Holy Kaaba: <strong>{qibla.distanceKm.toLocaleString()} km</strong>
      </div>
    </div>
  );
}
