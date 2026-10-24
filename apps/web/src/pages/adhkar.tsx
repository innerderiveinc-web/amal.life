import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Head from 'next/head';
import { Navigation } from '../components/Navigation';
import { SUNNAH_ADHKAR_LIST, DhikrItem } from '../lib/adhkar-data';
import { showAmalToast } from '../components/Toast';
import {
  UniversalContentShareModal,
  UniversalCardPayload,
} from '../components/cards/UniversalContentShareModal';
import { useLanguage } from '../context/LanguageContext';
import { AdhkarHeader } from '../components/adhkar/AdhkarHeader';
import { AdhkarCard } from '../components/adhkar/AdhkarCard';
import { useAdhkarHaptics } from '../components/adhkar/useAdhkarHaptics';

export default function AdhkarPage() {
  const { t, isUrdu } = useLanguage();

  // Determine default mode based on current local time
  const [activeTab, setActiveTab] = useState<'MORNING' | 'EVENING'>(() => {
    if (typeof window !== 'undefined') {
      const hour = new Date().getHours();
      return hour >= 4 && hour < 16 ? 'MORNING' : 'EVENING';
    }
    return 'MORNING';
  });

  const [counts, setCounts] = useState<Record<string, number>>({});
  const [completedIds, setCompletedIds] = useState<Record<string, boolean>>({});
  const [hapticEnabled, setHapticEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showTransliteration, setShowTransliteration] = useState(false);
  const [showEnglish] = useState(true);
  const [sharePayload, setSharePayload] = useState<UniversalCardPayload | null>(null);

  // Audio Synth & Haptic Feedback Hook
  const { triggerFeedback } = useAdhkarHaptics(hapticEnabled, soundEnabled);

  // Date key for local daily persistence: YYYY-MM-DD
  const todayKey = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }, []);

  // Filter adhkar according to active tab
  const filteredAdhkar = useMemo(() => {
    return SUNNAH_ADHKAR_LIST.filter(
      (item) => item.category === activeTab || item.category === 'BOTH'
    );
  }, [activeTab]);

  // Load saved progress from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedCounts = localStorage.getItem(`amal_adhkar_counts_${todayKey}`);
        const savedCompleted = localStorage.getItem(`amal_adhkar_done_${todayKey}`);
        if (savedCounts) setCounts(JSON.parse(savedCounts));
        if (savedCompleted) setCompletedIds(JSON.parse(savedCompleted));
      } catch (e) {
        console.error(e);
      }
    }
  }, [todayKey]);

  // Save progress whenever counts change
  const saveProgress = useCallback(
    (newCounts: Record<string, number>, newCompleted: Record<string, boolean>) => {
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(`amal_adhkar_counts_${todayKey}`, JSON.stringify(newCounts));
          localStorage.setItem(`amal_adhkar_done_${todayKey}`, JSON.stringify(newCompleted));
        } catch (e) {
          console.error(e);
        }
      }
    },
    [todayKey]
  );

  // Increment Dhikr Count
  const handleTapDhikr = (item: DhikrItem) => {
    const current = counts[item.id] || 0;
    const next = current + 1;
    const isNowDone = next >= item.targetCount;

    const newCounts = { ...counts, [item.id]: next };
    const newCompleted = { ...completedIds, [item.id]: isNowDone };

    setCounts(newCounts);
    setCompletedIds(newCompleted);
    saveProgress(newCounts, newCompleted);
    triggerFeedback(isNowDone);

    if (isNowDone && current < item.targetCount) {
      showAmalToast(`سبحان اللہ! ${item.titleUrdu} مکمل ہو گیا`, 'success');
    }
  };

  // Reset Single Dhikr
  const handleResetSingle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newCounts = { ...counts, [id]: 0 };
    const newCompleted = { ...completedIds, [id]: false };
    setCounts(newCounts);
    setCompletedIds(newCompleted);
    saveProgress(newCounts, newCompleted);
  };

  // Reset Entire Session
  const handleResetAll = () => {
    if (
      confirm(
        t(
          'Reset all adhkar counters for today?',
          'کیا آپ آج کے تمام اذکار کا کاؤنٹر دوبارہ صفر کرنا چاہتے ہیں؟'
        )
      )
    ) {
      setCounts({});
      setCompletedIds({});
      saveProgress({}, {});
      showAmalToast(t('All counters have been reset', 'تمام اذکار دوبارہ ری سیٹ ہو گئے'), 'info');
    }
  };

  // Progress metrics
  const totalInCurrentTab = filteredAdhkar.length;
  const completedInCurrentTab = filteredAdhkar.filter(
    (item) => completedIds[item.id] || (counts[item.id] || 0) >= item.targetCount
  ).length;
  const completionPercentage =
    totalInCurrentTab > 0
      ? Math.round((completedInCurrentTab / totalInCurrentTab) * 100)
      : 0;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FAF9' }}>
      <Head>
        <title>
          {t(
            'Morning & Evening Sunnah Adhkar | AMAL OS',
            'صبح و شام کے مسنون اذکار | امل او ایس'
          )}
        </title>
        <meta
          name="description"
          content="Authentic Morning and Evening prophetic Adhkar (Hisn al-Hasin, Bahar-e-Shariat, Sahih Hadith) with interactive digital tap ring, virtues, and progress tracking."
        />
      </Head>

      <Navigation />

      <main style={{ maxWidth: 960, margin: '0 auto', padding: '0 20px 80px' }}>
        {/* Adhkar Header & Controls Hub */}
        <AdhkarHeader
          activeTab={activeTab}
          onTabChange={setActiveTab}
          hapticEnabled={hapticEnabled}
          onToggleHaptic={() => setHapticEnabled(!hapticEnabled)}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
          showTransliteration={showTransliteration}
          onToggleTransliteration={() => setShowTransliteration(!showTransliteration)}
          onResetAll={handleResetAll}
          completedCount={completedInCurrentTab}
          totalCount={totalInCurrentTab}
          completionPercentage={completionPercentage}
          isUrdu={isUrdu}
          t={t}
        />

        {/* Adhkar Cards List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {filteredAdhkar.map((item, index) => {
            const currentCount = counts[item.id] || 0;
            const isCompleted = completedIds[item.id] || currentCount >= item.targetCount;

            return (
              <AdhkarCard
                key={item.id}
                item={item}
                index={index}
                currentCount={currentCount}
                isCompleted={isCompleted}
                onTap={() => handleTapDhikr(item)}
                onReset={(e) => handleResetSingle(item.id, e)}
                onShare={setSharePayload}
                showTransliteration={showTransliteration}
                showEnglish={showEnglish}
                isUrdu={isUrdu}
                activeTab={activeTab}
                t={t}
              />
            );
          })}
        </div>
      </main>

      {/* Sacred Universal Share Modal */}
      {sharePayload && (
        <UniversalContentShareModal
          isOpen={!!sharePayload}
          onClose={() => setSharePayload(null)}
          payload={sharePayload}
        />
      )}
    </div>
  );
}
