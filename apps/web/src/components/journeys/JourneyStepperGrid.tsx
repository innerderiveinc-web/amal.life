import React from 'react';
import { AmalTheme } from '@amal/ui';

export interface JourneyStepperGridProps {
  totalDays: number;
  completedDays: number[];
  currentDay: number;
  selectedDay: number;
  onSelectDay: (dayNum: number) => void;
  t: (en: string, ur: string) => string;
}

export const JourneyStepperGrid: React.FC<JourneyStepperGridProps> = ({
  totalDays,
  completedDays,
  currentDay,
  selectedDay,
  onSelectDay,
  t,
}) => {
  return (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 8,
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: '#374151',
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}
        >
          {t('Day-by-Day Journey Track', 'روز بہ روز سفر کا جائزہ')} ({totalDays} {t('Days', 'دن')})
        </span>
        <span style={{ fontSize: 11, color: '#6B7280' }}>
          {t('Click any day to view micro-action', 'عمل دیکھنے کے لیے کسی بھی دن پر کلک کریں')}
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fill, minmax(${totalDays > 20 ? '42px' : '52px'}, 1fr))`,
          gap: 8,
        }}
      >
        {Array.from({ length: totalDays }, (_, i) => {
          const dayNum = i + 1;
          const isDone = completedDays.includes(dayNum);
          const isCurrent = dayNum === currentDay;
          const isSelected = dayNum === selectedDay;

          return (
            <button
              key={dayNum}
              onClick={() => onSelectDay(dayNum)}
              style={{
                padding: '8px 4px',
                borderRadius: 10,
                border: isSelected
                  ? `2px solid ${AmalTheme.colors.primary}`
                  : isDone
                    ? '1px solid #A7F3D0'
                    : '1px solid #E5E7EB',
                backgroundColor: isDone
                  ? '#ECFDF5'
                  : isSelected
                    ? '#F0FDF4'
                    : '#F9FAFB',
                color: isDone
                  ? '#065F46'
                  : isSelected
                    ? AmalTheme.colors.primary
                    : '#4B5563',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                position: 'relative',
                transition: 'all 0.15s ease',
                outline: 'none',
                boxShadow: isSelected ? '0 0 0 2px rgba(10, 92, 54, 0.2)' : 'none',
              }}
            >
              <span style={{ fontSize: 13, fontWeight: isSelected || isDone ? 800 : 600 }}>
                {isDone ? `✓ ${dayNum}` : dayNum}
              </span>
              <span style={{ fontSize: 9, opacity: 0.8, fontWeight: 500 }}>
                {isDone ? t('Done', 'مکمل') : isCurrent ? t('Active', 'جاری') : t('Day', 'دن')}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
