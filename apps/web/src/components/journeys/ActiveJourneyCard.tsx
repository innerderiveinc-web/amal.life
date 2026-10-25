import React from 'react';
import { getJourneyTemplateDetails } from '../../lib/journey-templates-data';
import { SanadVerificationReport } from '../../lib/authenticity-pipeline';
import { ActiveJourneyHeader } from './ActiveJourneyHeader';
import { JourneyStepperGrid } from './JourneyStepperGrid';
import { JourneyDailyActionCard } from './JourneyDailyActionCard';

export interface ActiveJourneyCardProps {
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
        border: `1px solid ${isCompletedState ? '#A7F3D0' : '#E2E8F0'}`,
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)',
      }}
    >
      {/* 1. Header & Overall Progress */}
      <ActiveJourneyHeader
        journey={journey}
        totalDays={totalDays}
        completedDays={completedDays}
        progressPct={progressPct}
        isCompletedState={isCompletedState}
        selectedDay={selectedDay}
        onResetJourney={onResetJourney}
        onAdvancePhase={onAdvancePhase}
        onConcludeJourney={onConcludeJourney}
        onDeleteJourney={onDeleteJourney}
        t={t}
      />

      {/* 2. Visual Stepper Track */}
      <JourneyStepperGrid
        totalDays={totalDays}
        completedDays={completedDays}
        currentDay={currentDay}
        selectedDay={selectedDay}
        onSelectDay={onSelectDay}
        t={t}
      />

      {/* 3. Selected Day Task & Muhasabah Card */}
      <JourneyDailyActionCard
        selectedDay={selectedDay}
        selectedDayPlan={selectedDayPlan}
        isDayDone={isDayDone}
        reflectionText={reflectionText}
        totalDays={totalDays}
        onReflectionChange={onReflectionChange}
        onToggleDayComplete={onToggleDayComplete}
        onSelectDay={onSelectDay}
        onVerifySanad={onVerifySanad}
        t={t}
      />
    </div>
  );
};
