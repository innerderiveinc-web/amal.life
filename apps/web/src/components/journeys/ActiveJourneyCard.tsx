import React from 'react';
import { AmalTheme } from '@amal/ui';
import { getJourneyTemplateDetails } from '../../lib/journey-templates-data';
import { verifyContentCitation, SanadVerificationReport } from '../../lib/authenticity-pipeline';

interface ActiveJourneyCardProps {
  journey: any;
  selectedDay: number;
  onSelectDay: (dayNum: number) => void;
  reflectionText: string;
  onReflectionChange: (text: string) => void;
  onToggleDayComplete: (dayNum: number) => void;
  onResetJourney: () => void;
  onAdvancePhase: () => void;
  onConcludeJourney: () => void;
  onDeleteJourney: () => void;
  onVerifySanad: (report: SanadVerificationReport) => void;
  t: (en: string, ur: string) => string;
}

export const ActiveJourneyCard: React.FC<ActiveJourneyCardProps> = ({
  journey,
  selectedDay,
  onSelectDay,
  reflectionText,
  onReflectionChange,
  onToggleDayComplete,
  onResetJourney,
  onAdvancePhase,
  onConcludeJourney,
  onDeleteJourney,
  onVerifySanad,
  t,
}) => {
  const templateDetails = getJourneyTemplateDetails(journey.templateId);
  const totalDays = journey.totalDays || templateDetails?.durationDays || 14;
  const completedDays: number[] = Array.isArray(journey.completedDays) ? journey.completedDays : [];
  const currentDay = journey.currentDay || 1;
  const progressPct = Math.min(100, Math.round((completedDays.length / totalDays) * 100));
  const isCompletedState = journey.state === 'COMPLETED' || completedDays.length === totalDays;

  // Find details for selected day
  const selectedDayPlan = templateDetails?.days?.find((d) => d.day === selectedDay) || {
    day: selectedDay,
    phase: journey.currentPhase || 1,
    phaseName: `Phase ${journey.currentPhase || 1}`,
    title: `Day ${selectedDay}: Daily Step`,
    action: 'Maintain sincerity in your daily Sunnah action and turn to Allah in prayer.',
    evidence: {
      text: 'The most beloved deeds to Allah are those that are consistent, even if small.',
      reference: 'Sahih al-Bukhari 6464',
    },
    reflectionPrompt: 'Reflect upon your intention today.',
  };

  const isDayDone = completedDays.includes(selectedDay);

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 24,
        border: `1px solid ${isCompletedState ? '#A7F3D0' : AmalTheme.colors.surface.borderLight}`,
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)',
      }}
    >
      {/* Journey Header */}
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

      {/* Visual Stepper Grid */}
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

      {/* Active / Selected Day Task Card */}
      <div
        style={{
          backgroundColor: isDayDone ? '#F0FDF4' : '#F9FAFB',
          border: `1px solid ${isDayDone ? '#BBF7D0' : '#E5E7EB'}`,
          borderRadius: 14,
          padding: 20,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 8,
            marginBottom: 10,
          }}
        >
          <div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: AmalTheme.colors.primary,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}
            >
              {t('DAY', 'دن')} {selectedDay} · {selectedDayPlan.phaseName}
            </span>
            <h4 style={{ fontSize: 17, fontWeight: 800, margin: '4px 0 0', color: '#111827' }}>
              {selectedDayPlan.title}
            </h4>
          </div>

          {isDayDone && (
            <span
              style={{
                backgroundColor: '#DCFCE7',
                color: '#166534',
                padding: '4px 10px',
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              ✓ {t('Completed for this Day', 'اس دن کا عمل مکمل')}
            </span>
          )}
        </div>

        {/* Micro-Action */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 4 }}>
            {t("Today's Sunnah Action Step:", 'آج کا مسنون عمل:')}
          </div>
          <p
            style={{
              fontSize: 14,
              color: '#1F2937',
              lineHeight: 1.6,
              margin: 0,
              fontWeight: 500,
            }}
          >
            {selectedDayPlan.action}
          </p>
        </div>

        {/* Hadith / Quran Evidence */}
        {selectedDayPlan.evidence && (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderLeft: `4px solid ${AmalTheme.colors.primary}`,
              borderRadius: 8,
              padding: '12px 14px',
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: AmalTheme.colors.primary,
                marginBottom: 4,
              }}
            >
              {t('PROPHETIC EVIDENCE / HADITH', 'حدیث مبارکہ / سند')}
            </div>
            <p
              style={{
                fontSize: 13,
                color: '#374151',
                fontStyle: 'italic',
                margin: '0 0 6px',
                lineHeight: 1.5,
              }}
            >
              "{selectedDayPlan.evidence.text}"
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 4,
                flexWrap: 'wrap',
                gap: 6,
              }}
            >
              <span style={{ fontSize: 11, color: '#6B7280', fontWeight: 600 }}>
                — {selectedDayPlan.evidence.reference}
              </span>
              <button
                type="button"
                onClick={() => {
                  const rep = verifyContentCitation(selectedDayPlan.evidence.reference);
                  onVerifySanad(rep);
                }}
                style={{
                  padding: '2px 8px',
                  borderRadius: 6,
                  border: '1px solid #10B981',
                  backgroundColor: '#ECFDF5',
                  fontSize: 10,
                  fontWeight: 800,
                  color: '#065F46',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 3,
                }}
                title={t('View Authenticity & Sanad Certificate', 'تحقیق و سندِ روایت دیکھیں')}
              >
                <span>✓</span>
                <span>{t('Sanad Verified', 'مستند سند')}</span>
              </button>
            </div>
          </div>
        )}

        {/* Muhasabah / Reflection Prompt */}
        {selectedDayPlan.reflectionPrompt && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#4B5563', marginBottom: 4 }}>
              💭 {t('Daily Muhasabah (Reflection):', 'روزانہ کا محاسبہ:')}
            </div>
            <p
              style={{
                fontSize: 13,
                color: '#6B7280',
                margin: '0 0 8px',
                fontStyle: 'italic',
              }}
            >
              {selectedDayPlan.reflectionPrompt}
            </p>
            <input
              type="text"
              placeholder={t(
                'Optional: Record a short personal reflection for this day...',
                'اختیاری: اس دن کا اپنا تاثر یا محاسبہ درج کریں...'
              )}
              value={reflectionText}
              onChange={(e) => onReflectionChange(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid #D1D5DB',
                fontSize: 13,
                boxSizing: 'border-box',
                backgroundColor: '#FFFFFF',
              }}
            />
          </div>
        )}

        {/* Completion Action Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => onToggleDayComplete(selectedDay)}
            style={{
              backgroundColor: isDayDone ? '#F3F4F6' : AmalTheme.colors.primary,
              color: isDayDone ? '#4B5563' : '#FFFFFF',
              border: isDayDone ? '1px solid #D1D5DB' : 'none',
              borderRadius: 10,
              padding: '12px 20px',
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all 0.15s ease',
            }}
          >
            {isDayDone ? (
              <>
                <span>✓</span>{' '}
                {t(
                  `Day ${selectedDay} Completed · Click to Undo`,
                  `دن ${selectedDay} مکمل ہے · منسوخ کرنے کے لیے کلک کریں`
                )}
              </>
            ) : (
              <>
                <span>✓</span>{' '}
                {t(
                  `Mark Day ${selectedDay} Completed (Amal Done)`,
                  `دن ${selectedDay} کا عمل مکمل نشان زد کریں`
                )}
              </>
            )}
          </button>

          {/* Navigation between days */}
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              disabled={selectedDay <= 1}
              onClick={() => onSelectDay(selectedDay - 1)}
              style={{
                padding: '8px 12px',
                borderRadius: 8,
                backgroundColor: '#FFFFFF',
                border: '1px solid #D1D5DB',
                fontSize: 12,
                fontWeight: 600,
                cursor: selectedDay <= 1 ? 'not-allowed' : 'pointer',
                opacity: selectedDay <= 1 ? 0.5 : 1,
              }}
            >
              ← {t('Prev Day', 'پچھلا دن')}
            </button>
            <button
              disabled={selectedDay >= totalDays}
              onClick={() => onSelectDay(selectedDay + 1)}
              style={{
                padding: '8px 12px',
                borderRadius: 8,
                backgroundColor: '#FFFFFF',
                border: '1px solid #D1D5DB',
                fontSize: 12,
                fontWeight: 600,
                cursor: selectedDay >= totalDays ? 'not-allowed' : 'pointer',
                opacity: selectedDay >= totalDays ? 0.5 : 1,
              }}
            >
              {t('Next Day', 'اگلا دن')} →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
