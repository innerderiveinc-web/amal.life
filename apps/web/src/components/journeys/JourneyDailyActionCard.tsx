import React from 'react';
import { AmalTheme } from '@amal/ui';
import { verifyContentCitation, SanadVerificationReport } from '../../lib/authenticity-pipeline';

export interface JourneyDayPlan {
  day: number;
  phase: number;
  phaseName: string;
  title: string;
  action: string;
  evidence?: {
    text: string;
    reference: string;
  };
  reflectionPrompt?: string;
}

export interface JourneyDailyActionCardProps {
  selectedDay: number;
  selectedDayPlan: JourneyDayPlan;
  isDayDone: boolean;
  reflectionText: string;
  totalDays: number;
  onReflectionChange: (text: string) => void;
  onToggleDayComplete: (dayNum: number) => void;
  onSelectDay: (dayNum: number) => void;
  onVerifySanad: (report: SanadVerificationReport) => void;
  t: (en: string, ur: string) => string;
}

export const JourneyDailyActionCard: React.FC<JourneyDailyActionCardProps> = ({
  selectedDay,
  selectedDayPlan,
  isDayDone,
  reflectionText,
  totalDays,
  onReflectionChange,
  onToggleDayComplete,
  onSelectDay,
  onVerifySanad,
  t,
}) => {
  return (
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
                const rep = verifyContentCitation(selectedDayPlan.evidence!.reference);
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
  );
};
