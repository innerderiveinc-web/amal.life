import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Navigation } from '../components/Navigation';
import { AmalApiClient } from '../lib/api';
import { AmalTheme } from '@amal/ui';
import { useLanguage } from '../context/LanguageContext';
import { getJourneyTemplateDetails, JOURNEY_TEMPLATES } from '../lib/journey-templates-data';

export default function JourneysPage() {
  const { t, isUrdu } = useLanguage();
  const [activeJourneys, setActiveJourneys] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [selectedDayByJourney, setSelectedDayByJourney] = useState<Record<string, number>>({});
  const [reflectionNotes, setReflectionNotes] = useState<Record<string, string>>({});

  const templates = [
    {
      id: 'tmpl-fajr-14d',
      title: '14-Day Fajr Recovery',
      duration: '14 Days',
      phases: '3 Phases (Foundation, Anchoring, Sustainability)',
      description: 'Gentle, evidence-backed progression to establish consistent Fajr prayer without guilt or burnout.',
      urTitle: '14 روزہ فجر استقامت',
      urDescription: 'بغیر احساس جرم یا مایوسی کے، سنت نبوی کے مطابق فجر کی مستقل عادت قائم کرنے کا 14 روزہ سفر۔',
    },
    {
      id: 'tmpl-salah-consistency',
      title: 'Salah Consistency & Presence',
      duration: '21 Days',
      phases: '3 Phases (Timeliness, Khushu, Retention)',
      description: 'Anchor the five daily prayers into your daily schedule with gentle friction adaptation.',
      urTitle: 'نماز میں مداومت اور خشوع',
      urDescription: 'پنجوقتہ نمازوں کو روزمرہ زندگی کا اٹوٹ حصہ بنانے اور خشوع پیدا کرنے کا 21 روزہ سفر۔',
    },
    {
      id: 'tmpl-quran-restart',
      title: 'Quran Daily Restart (1 Page / Day)',
      duration: '30 Days',
      phases: '2 Phases (Recitation Rhythm, Contemplation)',
      description: 'Build an unbroken daily Quran relationship starting with just a single page each morning.',
      urTitle: 'روزانہ قرآن تجدید (1 صفحہ / دن)',
      urDescription: 'روزانہ صبح ایک صفحہ تلاوت اور تدبر کے ذریعے قرآن مجید سے اٹوٹ رشتہ قائم کرنے کا 30 روزہ سفر۔',
    },
    {
      id: 'tmpl-anger-patience',
      title: 'Anger Management & Prophetic Sabr',
      duration: '10 Days',
      phases: '2 Phases (Trigger Awareness, Reaction Delay)',
      description: 'Practical prophetic behavioral exercises when confronting anger and frustration.',
      urTitle: 'غصے پر قابو اور سنت صبر',
      urDescription: 'اشتعال اور غصے کے لمحات میں نبوی سنت اور تدابیر پر عمل کرنے کا 10 روزہ عملی سفر۔',
    },
  ];

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
      setSelectedDayByJourney(prev => ({ ...dayMap, ...prev }));
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
    setSelectedDayByJourney(prev => ({ ...prev, [journeyId]: day }));
  };

  const handleToggleDayComplete = async (journey: any, dayNumber: number) => {
    const journeyId = journey.id || journey.journeyId;
    const templateDetails = getJourneyTemplateDetails(journey.templateId);
    const totalDays = journey.totalDays || templateDetails?.durationDays || 14;
    const completedDays: number[] = Array.isArray(journey.completedDays) ? [...journey.completedDays] : [];
    const dailyCheckins = { ...(journey.dailyCheckins || {}) };
    const noteKey = `${journeyId}_day_${dayNumber}`;
    const reflectionText = reflectionNotes[noteKey] || dailyCheckins[dayNumber]?.reflection || '';

    const isAlreadyCompleted = completedDays.includes(dayNumber);

    let newCompletedDays: number[];
    let newCurrentDay = journey.currentDay || 1;
    let newState = journey.state || 'ACTIVE';

    if (isAlreadyCompleted) {
      // Undo completion
      newCompletedDays = completedDays.filter(d => d !== dayNumber);
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
        setStatusMsg(t(`Alhamdulillah! Day ${dayNumber} completed.`, `الحمدللہ! دن ${dayNumber} مکمل ہو گیا۔`));
      }
    }

    // Determine phase based on new current day
    let newPhase = journey.currentPhase || 1;
    if (templateDetails) {
      const activeDayPlan = templateDetails.days.find(d => d.day === newCurrentDay);
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
      setSelectedDayByJourney(prev => ({ ...prev, [journeyId]: dayNumber + 1 }));
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
      setSelectedDayByJourney(prev => ({ ...prev, [journeyId]: 1 }));
      setStatusMsg(t(`Journey "${journey.title}" has been reset back to Day 1 with a fresh Niyyah.`, `سفر "${journey.title}" کو نئی نیت کے ساتھ دن 1 پر ری سیٹ کر دیا گیا۔`));
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
    setStatusMsg(t(`Advanced "${journey.title}" to Phase ${nextPhase}`, `سفر "${journey.title}" کو مرحلہ ${nextPhase} پر منتقل کر دیا گیا۔`));
    loadJourneys();
  };

  const handleConcludeJourney = async (journey: any) => {
    if (confirm(t(`Conclude the journey "${journey.title}"?`, `کیا آپ سفر "${journey.title}" کو مکمل قرار دینا چاہتے ہیں؟`))) {
      await AmalApiClient.updateJourney(journey.id || journey.journeyId, { state: 'COMPLETED' });
      setStatusMsg(t(`Completed journey "${journey.title}". Alhamdulillah!`, `سفر "${journey.title}" مکمل ہوا۔ الحمدللہ!`));
      loadJourneys();
    }
  };

  return (
    <div style={{ backgroundColor: AmalTheme.colors.surface.backgroundLight, minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Head>
        <title>{t('AMAL OS — Journeys', 'عمل او ایس — اسفار سلوک')}</title>
      </Head>

      <Navigation />

      <main style={{ maxWidth: 920, margin: '0 auto', padding: '0 20px 60px' }}>
        <header style={{ marginBottom: 28, paddingTop: 12 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: AmalTheme.colors.primary, letterSpacing: 1 }}>
            {t('JOURNEY ENGINE (SULUK)', 'سلوک اور اسفار')}
          </span>
          <h1 style={{ fontSize: 30, fontWeight: 800, margin: '6px 0 0', color: AmalTheme.colors.text.primaryLight }}>
            {t('Structured Spiritual Journeys', 'منظم روحانی اسفار')}
          </h1>
          <p style={{ color: AmalTheme.colors.text.secondaryLight, fontSize: 14, marginTop: 4, lineHeight: 1.5 }}>
            {t(
              'Evidence-backed, day-by-day micro-actions. If life causes friction, reset with a fresh Niyyah—there is zero shame, only gentle continuity.',
              'نبوی سنت پر مبنی روزمرہ اعمال۔ کسی رکاوٹ کی صورت میں بغیر احساس ندامت نئی نیت کے ساتھ دوبارہ آغاز کریں؛ یہاں شرمندگی نہیں بلکہ رحمت اور استقامت ہے۔'
            )}
          </p>
        </header>

        {statusMsg && (
          <div style={{
            padding: '12px 16px',
            backgroundColor: '#E8F5E9',
            color: '#1B5E20',
            borderRadius: 10,
            marginBottom: 24,
            fontSize: 14,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <span>✓ {statusMsg}</span>
            <button
              onClick={() => setStatusMsg(null)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#1B5E20' }}
            >
              ✕
            </button>
          </div>
        )}

        {/* Active Journeys */}
        <section style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0, color: '#111827' }}>
              {t('Your Active Journeys', 'آپ کے جاری اسفار')}
            </h2>
            <span style={{ fontSize: 13, color: '#6B7280', fontWeight: 500 }}>
              {activeJourneys.length} {t('Active', 'جاری')}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {activeJourneys.length > 0 ? activeJourneys.map((j: any) => {
              const journeyId = j.id || j.journeyId;
              const templateDetails = getJourneyTemplateDetails(j.templateId);
              const totalDays = j.totalDays || templateDetails?.durationDays || 14;
              const completedDays: number[] = Array.isArray(j.completedDays) ? j.completedDays : [];
              const currentDay = j.currentDay || 1;
              const selectedDay = selectedDayByJourney[journeyId] || Math.min(currentDay, totalDays);
              const progressPct = Math.min(100, Math.round((completedDays.length / totalDays) * 100));
              const isCompletedState = j.state === 'COMPLETED' || completedDays.length === totalDays;

              // Find details for selected day
              const selectedDayPlan = templateDetails?.days?.find(d => d.day === selectedDay) || {
                day: selectedDay,
                phase: j.currentPhase || 1,
                phaseName: `Phase ${j.currentPhase || 1}`,
                title: `Day ${selectedDay}: Daily Step`,
                action: 'Maintain sincerity in your daily Sunnah action and turn to Allah in prayer.',
                evidence: {
                  text: 'The most beloved deeds to Allah are those that are consistent, even if small.',
                  reference: 'Sahih al-Bukhari 6464',
                },
                reflectionPrompt: 'Reflect upon your intention today.',
              };

              const isDayDone = completedDays.includes(selectedDay);
              const noteKey = `${journeyId}_day_${selectedDay}`;
              const savedReflection = j.dailyCheckins?.[selectedDay]?.reflection || '';

              return (
                <div key={journeyId} style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 18,
                  padding: 24,
                  border: `1px solid ${isCompletedState ? '#A7F3D0' : AmalTheme.colors.surface.borderLight}`,
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)',
                }}>
                  {/* Journey Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14 }}>
                    <div style={{ flex: 1, minWidth: 260 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        <span style={{
                          fontSize: 11,
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: 6,
                          backgroundColor: isCompletedState ? '#E8F5E9' : '#FEF3C7',
                          color: isCompletedState ? '#1B5E20' : '#92400E',
                          letterSpacing: 0.5,
                        }}>
                          {isCompletedState ? t('COMPLETED', 'مکمل') : t(`ACTIVE · PHASE ${j.currentPhase || 1}`, `جاری · مرحلہ ${j.currentPhase || 1}`)}
                        </span>
                        <span style={{ fontSize: 12, color: '#6B7280', fontWeight: 600 }}>
                          {completedDays.length} / {totalDays} {t('Days Complete', 'دن مکمل')}
                        </span>
                      </div>
                      <h3 style={{ fontSize: 20, fontWeight: 800, margin: '4px 0 6px', color: '#111827' }}>
                        {j.title}
                      </h3>
                      <p style={{ fontSize: 13, color: '#6B7280', margin: 0 }}>
                        {t('Template', 'ٹیمپلیٹ')}: <code style={{ fontSize: 12, backgroundColor: '#F3F4F6', padding: '2px 6px', borderRadius: 4 }}>{j.templateId || 'canonical'}</code>
                        {j.startedAt && <span style={{ marginLeft: 8 }}>· {t('Started', 'آغاز')}: {new Date(j.startedAt).toLocaleDateString()}</span>}
                      </p>
                    </div>

                    {/* Header Action Buttons */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      {/* RESET JOURNEY BUTTON (User Requested!) */}
                      <button
                        onClick={() => handleResetJourney(j)}
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
                          onClick={() => handleAdvancePhase(j)}
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
                          onClick={() => handleConcludeJourney(j)}
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
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#1B5E20', padding: '6px 10px', backgroundColor: '#E8F5E9', borderRadius: 8 }}>
                          ✓ {t('Journey Finished', 'سفر مکمل')}
                        </span>
                      )}

                      <button
                        onClick={() => handleDeleteJourney(j)}
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#4B5563', marginBottom: 6, fontWeight: 600 }}>
                      <span>
                        {t('Progress', 'پیشرفت')}: {progressPct}% · {completedDays.length} {t('of', 'از')} {totalDays} {t('days', 'دن')}
                      </span>
                      <span>
                        {t('Currently Viewing', 'زیر مطالعہ')}: {t('Day', 'دن')} {selectedDay}
                      </span>
                    </div>
                    <div style={{ width: '100%', height: 8, backgroundColor: '#E5E7EB', borderRadius: 999, overflow: 'hidden' }}>
                      <div style={{
                        width: `${progressPct}%`,
                        height: '100%',
                        backgroundColor: isCompletedState ? '#10B981' : AmalTheme.colors.primary,
                        transition: 'width 0.4s ease',
                      }} />
                    </div>
                  </div>

                  {/* 14-Day Visual Stepper Grid */}
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        {t('Day-by-Day Journey Track', 'روز بہ روز سفر کا جائزہ')} ({totalDays} {t('Days', 'دن')})
                      </span>
                      <span style={{ fontSize: 11, color: '#6B7280' }}>
                        {t('Click any day to view micro-action', 'عمل دیکھنے کے لیے کسی بھی دن پر کلک کریں')}
                      </span>
                    </div>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(auto-fill, minmax(${totalDays > 20 ? '42px' : '52px'}, 1fr))`,
                      gap: 8,
                    }}>
                      {Array.from({ length: totalDays }, (_, i) => {
                        const dayNum = i + 1;
                        const isDone = completedDays.includes(dayNum);
                        const isCurrent = dayNum === currentDay;
                        const isSelected = dayNum === selectedDay;

                        return (
                          <button
                            key={dayNum}
                            onClick={() => handleSelectDay(journeyId, dayNum)}
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
                  <div style={{
                    backgroundColor: isDayDone ? '#F0FDF4' : '#F9FAFB',
                    border: `1px solid ${isDayDone ? '#BBF7D0' : '#E5E7EB'}`,
                    borderRadius: 14,
                    padding: 20,
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
                      <div>
                        <span style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: AmalTheme.colors.primary,
                          textTransform: 'uppercase',
                          letterSpacing: 0.5,
                        }}>
                          {t('DAY', 'دن')} {selectedDay} · {selectedDayPlan.phaseName}
                        </span>
                        <h4 style={{ fontSize: 17, fontWeight: 800, margin: '4px 0 0', color: '#111827' }}>
                          {selectedDayPlan.title}
                        </h4>
                      </div>

                      {isDayDone && (
                        <span style={{
                          backgroundColor: '#DCFCE7',
                          color: '#166534',
                          padding: '4px 10px',
                          borderRadius: 8,
                          fontSize: 12,
                          fontWeight: 700,
                        }}>
                          ✓ {t('Completed for this Day', 'اس دن کا عمل مکمل')}
                        </span>
                      )}
                    </div>

                    {/* Micro-Action */}
                    <div style={{ marginBottom: 14 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 4 }}>
                        {t('Today\'s Sunnah Action Step:', 'آج کا مسنون عمل:')}
                      </div>
                      <p style={{ fontSize: 14, color: '#1F2937', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                        {selectedDayPlan.action}
                      </p>
                    </div>

                    {/* Hadith / Quran Evidence */}
                    {selectedDayPlan.evidence && (
                      <div style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E5E7EB',
                        borderLeft: `4px solid ${AmalTheme.colors.primary}`,
                        borderRadius: 8,
                        padding: '12px 14px',
                        marginBottom: 16,
                      }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: AmalTheme.colors.primary, marginBottom: 4 }}>
                          {t('PROPHETIC EVIDENCE / HADITH', 'حدیث مبارکہ / سند')}
                        </div>
                        <p style={{ fontSize: 13, color: '#374151', fontStyle: 'italic', margin: '0 0 6px', lineHeight: 1.5 }}>
                          "{selectedDayPlan.evidence.text}"
                        </p>
                        <div style={{ fontSize: 11, color: '#6B7280', fontWeight: 600 }}>
                          — {selectedDayPlan.evidence.reference}
                        </div>
                      </div>
                    )}

                    {/* Muhasabah / Reflection Prompt */}
                    {selectedDayPlan.reflectionPrompt && (
                      <div style={{ marginBottom: 16 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: '#4B5563', marginBottom: 4 }}>
                          💭 {t('Daily Muhasabah (Reflection):', 'روزانہ کا محاسبہ:')}
                        </div>
                        <p style={{ fontSize: 13, color: '#6B7280', margin: '0 0 8px', fontStyle: 'italic' }}>
                          {selectedDayPlan.reflectionPrompt}
                        </p>
                        <input
                          type="text"
                          placeholder={t('Optional: Record a short personal reflection for this day...', 'اختیاری: اس دن کا اپنا تاثر یا محاسبہ درج کریں...')}
                          value={reflectionNotes[noteKey] !== undefined ? reflectionNotes[noteKey] : savedReflection}
                          onChange={(e) => {
                            const val = e.target.value;
                            setReflectionNotes(prev => ({ ...prev, [noteKey]: val }));
                          }}
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
                        onClick={() => handleToggleDayComplete(j, selectedDay)}
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
                            <span>✓</span> {t(`Day ${selectedDay} Completed · Click to Undo`, `دن ${selectedDay} مکمل ہے · منسوخ کرنے کے لیے کلک کریں`)}
                          </>
                        ) : (
                          <>
                            <span>✓</span> {t(`Mark Day ${selectedDay} Completed (Amal Done)`, `دن ${selectedDay} کا عمل مکمل نشان زد کریں`)}
                          </>
                        )}
                      </button>

                      {/* Navigation between days */}
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button
                          disabled={selectedDay <= 1}
                          onClick={() => handleSelectDay(journeyId, selectedDay - 1)}
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
                          onClick={() => handleSelectDay(journeyId, selectedDay + 1)}
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
            }) : (
              <div style={{
                backgroundColor: '#FFFFFF',
                padding: 36,
                borderRadius: 16,
                textAlign: 'center',
                color: '#6B7280',
                border: `1px dashed ${AmalTheme.colors.surface.borderLight}`,
              }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>🌱</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 6px', color: '#111827' }}>
                  {t('No Active Journeys Yet', 'فی الوقت کوئی جاری سفر نہیں ہے')}
                </h3>
                <p style={{ fontSize: 14, margin: '0 0 16px', maxWidth: 440, marginLeft: 'auto', marginRight: 'auto' }}>
                  {t(
                    'Select a structured roadmap below to begin your daily journey toward consistent worship and personal growth.',
                    'مستقل عبادت اور اخلاقی تربیت کے لیے نیچے دیے گئے اسفار میں سے کسی ایک کا انتخاب فرمائیں۔'
                  )}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Journey Library */}
        <section>
          <div style={{ marginBottom: 16 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 4px', color: '#111827' }}>
              {t('Curated Journey Roadmaps', 'منتخب روحانی اسفار')}
            </h2>
            <p style={{ fontSize: 13, color: '#6B7280', margin: 0 }}>
              {t(
                'Pinned to canonical Sunnah templates. Each journey contains daily steps, authentic Hadith references, and flexible pacing.',
                'مستند سنت نبوی کے رہنما خطوط۔ ہر سفر میں روزمرہ اعمال، احادیث کے حوالہ جات اور نرم رفتار شامل ہے۔'
              )}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 18 }}>
            {templates.map((tItem) => {
              const isAlreadyActive = activeJourneys.some(j => (j.templateId || '') === tItem.id && j.state === 'ACTIVE');

              return (
                <div key={tItem.id} style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 16,
                  padding: 22,
                  border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
                }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: AmalTheme.colors.primary, backgroundColor: '#E8F5E9', padding: '3px 8px', borderRadius: 6 }}>
                        {tItem.duration}
                      </span>
                      <span style={{ fontSize: 11, color: '#6B7280', fontWeight: 600 }}>
                        {tItem.phases}
                      </span>
                    </div>
                    <h3 style={{ fontSize: 18, fontWeight: 800, margin: '6px 0 8px', color: '#111827' }}>
                      {isUrdu ? tItem.urTitle : tItem.title}
                    </h3>
                    <p style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.55, margin: '0 0 16px' }}>
                      {isUrdu ? tItem.urDescription : tItem.description}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid #F3F4F6' }}>
                    <span style={{ fontSize: 12, color: '#9CA3AF' }}>
                      {isAlreadyActive ? t('Currently Active', 'پہلے سے جاری ہے') : t('100% Private (On-Device)', 'مکمل نجی (ڈیوائس پر)')}
                    </span>
                    <button
                      disabled={loading}
                      onClick={() => handleStartJourney(tItem.id, isUrdu ? tItem.urTitle : tItem.title)}
                      style={{
                        backgroundColor: isAlreadyActive ? '#F3F4F6' : AmalTheme.colors.primary,
                        color: isAlreadyActive ? '#6B7280' : '#FFFFFF',
                        border: isAlreadyActive ? '1px solid #E5E7EB' : 'none',
                        borderRadius: 8,
                        padding: '10px 18px',
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: loading ? 'wait' : 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {isAlreadyActive ? t('Start Again', 'دوبارہ شروع کریں') : t('Start Journey', 'سفر شروع کریں')}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
