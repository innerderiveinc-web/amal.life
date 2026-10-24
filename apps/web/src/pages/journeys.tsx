import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Navigation } from '../components/Navigation';
import { AmalApiClient } from '../lib/api';
import { AmalTheme } from '@amal/ui';
import { useLanguage } from '../context/LanguageContext';
import { getJourneyTemplateDetails, JOURNEY_TEMPLATES } from '../lib/journey-templates-data';
import { SanadVerificationReport } from '../lib/authenticity-pipeline';
import { SanadVerificationModal } from '../components/authenticity/SanadVerificationModal';
import { JourneysHeader } from '../components/journeys/JourneysHeader';
import { ActiveJourneyCard } from '../components/journeys/ActiveJourneyCard';
import { CuratedJourneysGrid } from '../components/journeys/CuratedJourneysGrid';

export default function JourneysPage() {
  const { t, isUrdu } = useLanguage();
  const [activeJourneys, setActiveJourneys] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [selectedDayByJourney, setSelectedDayByJourney] = useState<Record<string, number>>({});
  const [reflectionNotes, setReflectionNotes] = useState<Record<string, string>>({});
  const [activeSanadReport, setActiveSanadReport] = useState<SanadVerificationReport | null>(null);

  const loadJourneys = async () => {
    const res = await AmalApiClient.getJourneys();
    if (res.success && res.data) {
      const list = Array.isArray(res.data) ? res.data : [res.data];
      setActiveJourneys(list);
      // Initialize selected days
      const dayMap: Record<string, number> = {};
      list.forEach((j: any) => {
        const id = j.id || j.journeyId;
        const total = j.totalDays || 14;
        const cur = j.currentDay || 1;
        dayMap[id] = Math.min(cur, total);
      });
      setSelectedDayByJourney((prev) => ({ ...dayMap, ...prev }));
    }
  };

  useEffect(() => {
    loadJourneys();
  }, []);

  const handleStartJourney = async (templateId: string, title: string) => {
    setLoading(true);
    const tmpl = JOURNEY_TEMPLATES[templateId];
    const durationDays = tmpl ? tmpl.durationDays : 14;
    const res = await AmalApiClient.startJourney(templateId, title, durationDays);
    setLoading(false);
    if (res.success) {
      setStatusMsg(t(`Started journey: ${title}`, `سفر شروع کر دیا گیا: ${title}`));
      loadJourneys();
    }
  };

  const handleSelectDay = (journeyId: string, day: number) => {
    setSelectedDayByJourney((prev) => ({ ...prev, [journeyId]: day }));
  };

  const handleToggleDayComplete = async (journey: any, dayNumber: number) => {
    const journeyId = journey.id || journey.journeyId;
    const templateDetails = getJourneyTemplateDetails(journey.templateId);
    const totalDays = journey.totalDays || templateDetails?.durationDays || 14;
    const completedDays: number[] = Array.isArray(journey.completedDays)
      ? [...journey.completedDays]
      : [];
    const dailyCheckins = { ...(journey.dailyCheckins || {}) };
    const noteKey = `${journeyId}_day_${dayNumber}`;
    const reflectionText = reflectionNotes[noteKey] || dailyCheckins[dayNumber]?.reflection || '';

    const isAlreadyCompleted = completedDays.includes(dayNumber);

    let newCompletedDays: number[];
    let newCurrentDay = journey.currentDay || 1;
    let newState = journey.state || 'ACTIVE';

    if (isAlreadyCompleted) {
      // Undo completion
      newCompletedDays = completedDays.filter((d) => d !== dayNumber);
      delete dailyCheckins[dayNumber];
      if (newState === 'COMPLETED') {
        newState = 'ACTIVE';
      }
      setStatusMsg(t(`Day ${dayNumber} unmarked.`, `دن ${dayNumber} کی تکمیل منسوخ کر دی گئی۔`));
    } else {
      // Mark as completed
      newCompletedDays = Array.from(new Set([...completedDays, dayNumber])).sort((a, b) => a - b);
      dailyCheckins[dayNumber] = {
        completed: true,
        completedAt: new Date().toISOString(),
        reflection: reflectionText,
      };

      // Auto-advance to next incomplete day if currently on completed day
      if (dayNumber >= newCurrentDay && dayNumber < totalDays) {
        newCurrentDay = dayNumber + 1;
      }

      // Check if all days completed
      if (newCompletedDays.length >= totalDays) {
        newState = 'COMPLETED';
        setStatusMsg(
          t(
            `Alhamdulillah! All ${totalDays} days completed for "${journey.title}". May Allah accept your efforts!`,
            `الحمدللہ! "${journey.title}" کے تمام ${totalDays} دن مکمل ہو گئے۔ اللہ تعالیٰ آپ کی محنت قبول فرمائے!`
          )
        );
      } else {
        setStatusMsg(
          t(`Alhamdulillah! Day ${dayNumber} completed.`, `الحمدللہ! دن ${dayNumber} مکمل ہو گیا۔`)
        );
      }
    }

    // Determine phase based on new current day
    let newPhase = journey.currentPhase || 1;
    if (templateDetails) {
      const activeDayPlan = templateDetails.days.find((d) => d.day === newCurrentDay);
      if (activeDayPlan) {
        newPhase = activeDayPlan.phase;
      }
    }

    await AmalApiClient.updateJourney(journeyId, {
      completedDays: newCompletedDays,
      dailyCheckins,
      currentDay: newCurrentDay,
      currentPhase: newPhase,
      state: newState,
      totalDays,
    });

    // Advance UI view to next day if completing current day
    if (!isAlreadyCompleted && dayNumber < totalDays) {
      setSelectedDayByJourney((prev) => ({ ...prev, [journeyId]: dayNumber + 1 }));
    }

    loadJourneys();
  };

  const handleResetJourney = async (journey: any) => {
    const journeyId = journey.id || journey.journeyId;
    const confirmText = t(
      `Are you sure you want to reset "${journey.title}" back to Day 1? Your progress will reset with a fresh Niyyah.`,
      `کیا آپ واقعی "${journey.title}" کو دوبارہ دن 1 سے شروع کرنا چاہتے ہیں؟ آپ کی پیشرفت نئی نیت کے ساتھ دوبارہ شروع ہو جائے گی۔`
    );
    if (confirm(confirmText)) {
      await AmalApiClient.resetJourney(journeyId);
      setSelectedDayByJourney((prev) => ({ ...prev, [journeyId]: 1 }));
      setStatusMsg(
        t(
          `Journey "${journey.title}" has been reset back to Day 1 with a fresh Niyyah.`,
          `سفر "${journey.title}" کو نئی نیت کے ساتھ دن 1 پر ری سیٹ کر دیا گیا۔`
        )
      );
      loadJourneys();
    }
  };

  const handleDeleteJourney = async (journey: any) => {
    const journeyId = journey.id || journey.journeyId;
    const confirmText = t(
      `Remove journey "${journey.title}" from your active list?`,
      `کیا آپ سفر "${journey.title}" کو اپنی فہرست سے ہٹانا چاہتے ہیں؟`
    );
    if (confirm(confirmText)) {
      await AmalApiClient.deleteJourney(journeyId);
      setStatusMsg(t(`Journey removed.`, `سفر ہٹا دیا گیا۔`));
      loadJourneys();
    }
  };

  const handleAdvancePhase = async (journey: any) => {
    const nextPhase = (journey.currentPhase || 1) + 1;
    await AmalApiClient.updateJourney(journey.id || journey.journeyId, { currentPhase: nextPhase });
    setStatusMsg(
      t(
        `Advanced "${journey.title}" to Phase ${nextPhase}`,
        `سفر "${journey.title}" کو مرحلہ ${nextPhase} پر منتقل کر دیا گیا۔`
      )
    );
    loadJourneys();
  };

  const handleConcludeJourney = async (journey: any) => {
    if (
      confirm(
        t(
          `Conclude the journey "${journey.title}"?`,
          `کیا آپ سفر "${journey.title}" کو مکمل قرار دینا چاہتے ہیں؟`
        )
      )
    ) {
      await AmalApiClient.updateJourney(journey.id || journey.journeyId, { state: 'COMPLETED' });
      setStatusMsg(
        t(
          `Completed journey "${journey.title}". Alhamdulillah!`,
          `سفر "${journey.title}" مکمل ہوا۔ الحمدللہ!`
        )
      );
      loadJourneys();
    }
  };

  return (
    <div
      style={{
        backgroundColor: AmalTheme.colors.surface.backgroundLight,
        minHeight: '100vh',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <Head>
        <title>{t('AMAL OS — Journeys', 'عمل او ایس — اسفار سلوک')}</title>
      </Head>

      <Navigation />

      <main style={{ maxWidth: 920, margin: '0 auto', padding: '0 20px 60px' }}>
        {/* Journeys Header */}
        <JourneysHeader
          t={t}
          statusMsg={statusMsg}
          onClearStatus={() => setStatusMsg(null)}
        />

        {/* Active Journeys */}
        <section style={{ marginBottom: 40 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0, color: '#111827' }}>
              {t('Your Active Journeys', 'آپ کے جاری اسفار')}
            </h2>
            <span style={{ fontSize: 13, color: '#6B7280', fontWeight: 500 }}>
              {activeJourneys.length} {t('Active', 'جاری')}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {activeJourneys.length > 0 ? (
              activeJourneys.map((j: any) => {
                const journeyId = j.id || j.journeyId;
                const templateDetails = getJourneyTemplateDetails(j.templateId);
                const totalDays = j.totalDays || templateDetails?.durationDays || 14;
                const currentDay = j.currentDay || 1;
                const selectedDay =
                  selectedDayByJourney[journeyId] || Math.min(currentDay, totalDays);
                const noteKey = `${journeyId}_day_${selectedDay}`;
                const savedReflection = j.dailyCheckins?.[selectedDay]?.reflection || '';

                return (
                  <ActiveJourneyCard
                    key={journeyId}
                    journey={j}
                    selectedDay={selectedDay}
                    onSelectDay={(dayNum) => handleSelectDay(journeyId, dayNum)}
                    reflectionText={
                      reflectionNotes[noteKey] !== undefined
                        ? reflectionNotes[noteKey]
                        : savedReflection
                    }
                    onReflectionChange={(val) =>
                      setReflectionNotes((prev) => ({ ...prev, [noteKey]: val }))
                    }
                    onToggleDayComplete={(dayNum) => handleToggleDayComplete(j, dayNum)}
                    onResetJourney={() => handleResetJourney(j)}
                    onAdvancePhase={() => handleAdvancePhase(j)}
                    onConcludeJourney={() => handleConcludeJourney(j)}
                    onDeleteJourney={() => handleDeleteJourney(j)}
                    onVerifySanad={setActiveSanadReport}
                    t={t}
                  />
                );
              })
            ) : (
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: 36,
                  borderRadius: 16,
                  textAlign: 'center',
                  color: '#6B7280',
                  border: `1px dashed ${AmalTheme.colors.surface.borderLight}`,
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 10 }}>🌱</div>
                <h3
                  style={{ fontSize: 16, fontWeight: 700, margin: '0 0 6px', color: '#111827' }}
                >
                  {t('No Active Journeys Yet', 'فی الوقت کوئی جاری سفر نہیں ہے')}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    margin: '0 0 16px',
                    maxWidth: 440,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  {t(
                    'Select a structured roadmap below to begin your daily journey toward consistent worship and personal growth.',
                    'مستقل عبادت اور اخلاقی تربیت کے لیے نیچے دیے گئے اسفار میں سے کسی ایک کا انتخاب فرمائیں۔'
                  )}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Curated Journey Roadmaps */}
        <CuratedJourneysGrid
          activeJourneys={activeJourneys}
          loading={loading}
          onStartJourney={handleStartJourney}
          isUrdu={isUrdu}
          t={t}
        />
      </main>

      {/* Tafteesh & Sanad Verification Certificate Modal */}
      {activeSanadReport && (
        <SanadVerificationModal
          report={activeSanadReport}
          isOpen={!!activeSanadReport}
          onClose={() => setActiveSanadReport(null)}
        />
      )}
    </div>
  );
}
