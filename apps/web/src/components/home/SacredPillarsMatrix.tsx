import React from 'react';
import Link from 'next/link';

export const SacredPillarsMatrix: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 24,
        border: '1px solid #E2E8F0',
        marginBottom: 24,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 18,
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        <div>
          <span
            style={{
              fontSize: 11,
              fontWeight: 800,
              color: '#047857',
              letterSpacing: 1.2,
              textTransform: 'uppercase',
            }}
          >
            FOUR SACRED PILLARS
          </span>
          <h2 style={{ fontSize: 19, fontWeight: 800, color: '#0F172A', margin: '2px 0 0' }}>
            دینی و عملی شعبہ جات · Core Life Dimensions
          </h2>
        </div>
        <span style={{ fontSize: 13, color: '#64748B' }}>
          عبادت، علم و سیرت، مالی احکام اور تزکیۂ نفس کا مربوط نظام
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 14 }}>
        {/* Channel 1 */}
        <div
          className="amal-card-hover"
          style={{ padding: 14, borderRadius: 10, backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}
        >
          <div style={{ fontSize: 20, marginBottom: 4 }}>🕋</div>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#166534' }}>1. Daily Worship Rhythm</div>
          <div style={{ fontSize: 11, color: '#15803D', margin: '4px 0 10px', lineHeight: 1.4 }}>
            Namaz ➔ Tasbih ➔ Tajweed ➔ Fasting ➔ Muhasabah
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            <Link
              href="/prayer"
              style={{
                fontSize: 11,
                padding: '3px 8px',
                borderRadius: 4,
                backgroundColor: '#FFFFFF',
                color: '#166534',
                textDecoration: 'none',
                fontWeight: 700,
                border: '1px solid #86EFAC',
              }}
            >
              Prayer &amp; Qibla
            </Link>
            <Link
              href="/tasbih"
              style={{
                fontSize: 11,
                padding: '3px 8px',
                borderRadius: 4,
                backgroundColor: '#FFFFFF',
                color: '#166534',
                textDecoration: 'none',
                fontWeight: 700,
                border: '1px solid #86EFAC',
              }}
            >
              Tasbih
            </Link>
            <Link
              href="/calendar"
              style={{
                fontSize: 11,
                padding: '3px 8px',
                borderRadius: 4,
                backgroundColor: '#FFFFFF',
                color: '#166534',
                textDecoration: 'none',
                fontWeight: 700,
                border: '1px solid #86EFAC',
              }}
            >
              Fasting
            </Link>
          </div>
        </div>

        {/* Channel 2 */}
        <div
          className="amal-card-hover"
          style={{ padding: 14, borderRadius: 10, backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}
        >
          <div style={{ fontSize: 20, marginBottom: 4 }}>📚</div>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#1E40AF' }}>2. Ilm &amp; Sacred Heritage</div>
          <div style={{ fontSize: 11, color: '#1D4ED8', margin: '4px 0 10px', lineHeight: 1.4 }}>
            106-Book Canonical Library ➔ Living Sirah ➔ Quran Audio ➔ Study Vault
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            <Link
              href="/library"
              style={{
                fontSize: 11,
                padding: '3px 8px',
                borderRadius: 4,
                backgroundColor: '#FFFFFF',
                color: '#1E40AF',
                textDecoration: 'none',
                fontWeight: 700,
                border: '1px solid #93C5FD',
              }}
            >
              Library
            </Link>
            <Link
              href="/sirah"
              style={{
                fontSize: 11,
                padding: '3px 8px',
                borderRadius: 4,
                backgroundColor: '#FFFFFF',
                color: '#1E40AF',
                textDecoration: 'none',
                fontWeight: 700,
                border: '1px solid #93C5FD',
              }}
            >
              Sirah
            </Link>
            <Link
              href="/audio"
              style={{
                fontSize: 11,
                padding: '3px 8px',
                borderRadius: 4,
                backgroundColor: '#FFFFFF',
                color: '#1E40AF',
                textDecoration: 'none',
                fontWeight: 700,
                border: '1px solid #93C5FD',
              }}
            >
              Audio
            </Link>
          </div>
        </div>

        {/* Channel 3 */}
        <div
          className="amal-card-hover"
          style={{ padding: 14, borderRadius: 10, backgroundColor: '#FEF3C7', border: '1px solid #FDE68A' }}
        >
          <div style={{ fontSize: 20, marginBottom: 4 }}>⚖️</div>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#92400E' }}>3. Financial &amp; Household</div>
          <div style={{ fontSize: 11, color: '#B45309', margin: '4px 0 10px', lineHeight: 1.4 }}>
            Zakat Nisab ➔ Miras Fara&apos;id ➔ Decision Room ➔ Family Circles
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            <Link
              href="/calculator"
              style={{
                fontSize: 11,
                padding: '3px 8px',
                borderRadius: 4,
                backgroundColor: '#FFFFFF',
                color: '#92400E',
                textDecoration: 'none',
                fontWeight: 700,
                border: '1px solid #FCD34D',
              }}
            >
              Zakat &amp; Miras
            </Link>
            <Link
              href="/decision-room"
              style={{
                fontSize: 11,
                padding: '3px 8px',
                borderRadius: 4,
                backgroundColor: '#FFFFFF',
                color: '#92400E',
                textDecoration: 'none',
                fontWeight: 700,
                border: '1px solid #FCD34D',
              }}
            >
              Decision Room
            </Link>
            <Link
              href="/family"
              style={{
                fontSize: 11,
                padding: '3px 8px',
                borderRadius: 4,
                backgroundColor: '#FFFFFF',
                color: '#92400E',
                textDecoration: 'none',
                fontWeight: 700,
                border: '1px solid #FCD34D',
              }}
            >
              Family OS
            </Link>
          </div>
        </div>

        {/* Channel 4 */}
        <div
          className="amal-card-hover"
          style={{ padding: 14, borderRadius: 10, backgroundColor: '#FAF5FF', border: '1px solid #E9D5FF' }}
        >
          <div style={{ fontSize: 20, marginBottom: 4 }}>🛤️</div>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#6B21A8' }}>4. Personal Suluk Lifecycle</div>
          <div style={{ fontSize: 11, color: '#7E22CE', margin: '4px 0 10px', lineHeight: 1.4 }}>
            Niyyah Goals ➔ Compiler ➔ Journeys ➔ Muhasabah ➔ Replay
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            <Link
              href="/goals"
              style={{
                fontSize: 11,
                padding: '3px 8px',
                borderRadius: 4,
                backgroundColor: '#FFFFFF',
                color: '#6B21A8',
                textDecoration: 'none',
                fontWeight: 700,
                border: '1px solid #D8B4FE',
              }}
            >
              Goals
            </Link>
            <Link
              href="/journeys"
              style={{
                fontSize: 11,
                padding: '3px 8px',
                borderRadius: 4,
                backgroundColor: '#FFFFFF',
                color: '#6B21A8',
                textDecoration: 'none',
                fontWeight: 700,
                border: '1px solid #D8B4FE',
              }}
            >
              Journeys
            </Link>
            <Link
              href="/reflections"
              style={{
                fontSize: 11,
                padding: '3px 8px',
                borderRadius: 4,
                backgroundColor: '#FFFFFF',
                color: '#6B21A8',
                textDecoration: 'none',
                fontWeight: 700,
                border: '1px solid #D8B4FE',
              }}
            >
              Muhasabah
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
