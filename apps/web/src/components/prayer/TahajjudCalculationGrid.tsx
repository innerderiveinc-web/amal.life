import React from 'react';

export interface TahajjudCalculationData {
  isActive: boolean;
  isUpcoming: boolean;
  diffMinutes: number;
  formattedDiff: string;
  formattedDiffEn: string;
  nightDurationHours: string;
  qiyam12h: string;
  fajr12h: string;
  midnight12h: string;
  maghrib12h: string;
}

export interface TahajjudCalculationGridProps {
  calculation: TahajjudCalculationData;
}

export const TahajjudCalculationGrid: React.FC<TahajjudCalculationGridProps> = ({
  calculation,
}) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        borderRadius: 12,
        padding: 18,
        marginBottom: 16,
        border: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* Box 1: Sulus al-Akhir Window */}
      <div>
        <span
          style={{
            fontSize: 11,
            color: '#94A3B8',
            fontWeight: 700,
            display: 'block',
            textTransform: 'uppercase',
          }}
        >
          تہجد کا افضل وقت (Last Third Window)
        </span>
        <div style={{ fontSize: 20, fontWeight: 900, color: '#FCD34D', marginTop: 4 }}>
          {calculation.qiyam12h} — {calculation.fajr12h}
        </div>
        <div style={{ fontSize: 11, color: '#CBD5E1', marginTop: 2 }}>
          (غروبِ آفتاب تا صبحِ صادق کے رات کا آخری تہائی حصہ)
        </div>
      </div>

      {/* Box 2: Live Status Countdown */}
      <div>
        <span
          style={{
            fontSize: 11,
            color: '#94A3B8',
            fontWeight: 700,
            display: 'block',
            textTransform: 'uppercase',
          }}
        >
          {calculation.isActive ? 'وقت کا اختتام (فجر تک باقی)' : 'وقت شروع ہونے میں باقی'}
        </span>
        <div
          style={{
            fontSize: 22,
            fontWeight: 900,
            color: calculation.isActive ? '#34D399' : '#38BDF8',
            marginTop: 4,
          }}
        >
          {calculation.formattedDiff}
        </div>
        <div style={{ fontSize: 11, color: '#A7F3D0', marginTop: 2 }}>
          {calculation.isActive
            ? `فجر کے داخلے تک (${calculation.formattedDiffEn})`
            : `رات ${calculation.qiyam12h} پر شروع ہوگا`}
        </div>
      </div>

      {/* Box 3: Islamic Midnight (نصف اللیل) */}
      <div>
        <span
          style={{
            fontSize: 11,
            color: '#94A3B8',
            fontWeight: 700,
            display: 'block',
            textTransform: 'uppercase',
          }}
        >
          شرعی نصف اللیل (Islamic Midnight)
        </span>
        <div style={{ fontSize: 18, fontWeight: 800, color: '#F1F5F9', marginTop: 4 }}>
          {calculation.midnight12h}
        </div>
        <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>
          رات کا کل دورانیہ: {calculation.nightDurationHours} گھنٹے
        </div>
      </div>
    </div>
  );
};
