import React from 'react';
import { AmalTheme } from '@amal/ui';

export interface ActiveJourneyHeaderProps {
  journey: any;
  totalDays: number;
  completedDays: number[];
  progressPct: number;
  isCompletedState: boolean;
  selectedDay: number;
  onResetJourney: () => void;
  onAdvancePhase: () => void;
  onConcludeJourney: () => void;
  onDeleteJourney: () => void;
  t: (en: string, ur: string) => string;
}

export const ActiveJourneyHeader: React.FC<ActiveJourneyHeaderProps> = ({
  journey,
  totalDays,
  completedDays,
  progressPct,
  isCompletedState,
  selectedDay,
  onResetJourney,
  onAdvancePhase,
  onConcludeJourney,
  onDeleteJourney,
  t,
}) => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 14,
        }}
      >
        <div style={{ flex: 1, minWidth: 260 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: 6,
                backgroundColor: isCompletedState ? '#E8F5E9' : '#FEF3C7',
                color: isCompletedState ? '#1B5E20' : '#92400E',
                letterSpacing: 0.5,
              }}
            >
              {isCompletedState
                ? t('COMPLETED', 'مکمل')
                : t(`ACTIVE · PHASE ${journey.currentPhase || 1}`, `جاری · مرحلہ ${journey.currentPhase || 1}`)}
            </span>
            <span style={{ fontSize: 12, color: '#6B7280', fontWeight: 600 }}>
              {completedDays.length} / {totalDays} {t('Days Complete', 'دن مکمل')}
            </span>
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 800, margin: '4px 0 6px', color: '#111827' }}>
            {journey.title}
          </h3>
          <p style={{ fontSize: 13, color: '#6B7280', margin: 0 }}>
            {t('Template', 'ٹیمپلیٹ')}:{' '}
            <code
              style={{
                fontSize: 12,
                backgroundColor: '#F3F4F6',
                padding: '2px 6px',
                borderRadius: 4,
              }}
            >
              {journey.templateId || 'canonical'}
            </code>
            {journey.startedAt && (
              <span style={{ marginLeft: 8 }}>
                · {t('Started', 'آغاز')}: {new Date(journey.startedAt).toLocaleDateString()}
              </span>
            )}
          </p>
        </div>

        {/* Header Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {/* RESET JOURNEY BUTTON */}
          <button
            onClick={onResetJourney}
            title={t('Restart this journey from Day 1 with a fresh Niyyah', 'نئی نیت کے ساتھ دن 1 سے دوبارہ شروع کریں')}
            style={{
              padding: '8px 14px',
              borderRadius: 8,
              backgroundColor: '#FFFBEB',
              color: '#B45309',
              border: '1px solid #FDE68A',
              fontWeight: 600,
              fontSize: 12,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'all 0.15s ease',
            }}
          >
            <span>🔄</span> {t('Reset Journey', 'ری سیٹ (دوبارہ آغاز)')}
          </button>

          {!isCompletedState && (
            <button
              onClick={onAdvancePhase}
              style={{
                padding: '8px 14px',
                borderRadius: 8,
                backgroundColor: '#F3F4F6',
                color: '#374151',
                border: '1px solid #E5E7EB',
                fontWeight: 600,
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              ▶ {t('Next Phase', 'اگلا مرحلہ')}
            </button>
          )}

          {!isCompletedState ? (
            <button
              onClick={onConcludeJourney}
              style={{
                padding: '8px 14px',
                borderRadius: 8,
                backgroundColor: '#E8F5E9',
                color: '#1B5E20',
                border: '1px solid #C8E6C9',
                fontWeight: 600,
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              ✓ {t('Conclude', 'مکمل کریں')}
            </button>
          ) : (
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: '#1B5E20',
                padding: '6px 10px',
                backgroundColor: '#E8F5E9',
                borderRadius: 8,
              }}
            >
              ✓ {t('Journey Finished', 'سفر مکمل')}
            </span>
          )}

          <button
            onClick={onDeleteJourney}
            title={t('Remove Journey', 'سفر حذف کریں')}
            style={{
              padding: '8px 10px',
              borderRadius: 8,
              backgroundColor: '#FEE2E2',
              color: '#991B1B',
              border: 'none',
              fontWeight: 600,
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ marginTop: 18, marginBottom: 20 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 12,
            color: '#4B5563',
            marginBottom: 6,
            fontWeight: 600,
          }}
        >
          <span>
            {t('Progress', 'پیشرفت')}: {progressPct}% · {completedDays.length} {t('of', 'از')}{' '}
            {totalDays} {t('days', 'دن')}
          </span>
          <span>
            {t('Currently Viewing', 'زیر مطالعہ')}: {t('Day', 'دن')} {selectedDay}
          </span>
        </div>
        <div
          style={{
            width: '100%',
            height: 8,
            backgroundColor: '#E5E7EB',
            borderRadius: 999,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${progressPct}%`,
              height: '100%',
              backgroundColor: isCompletedState ? '#10B981' : AmalTheme.colors.primary,
              transition: 'width 0.4s ease',
            }}
          />
        </div>
      </div>
    </>
  );
};
