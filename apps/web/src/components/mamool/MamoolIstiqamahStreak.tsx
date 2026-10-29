import React, { useState, useEffect } from 'react';

interface IstiqamahData {
  streak: number;
  lastDate: string;
  prayers: {
    fajr: boolean;
    dhuhr: boolean;
    asr: boolean;
    maghrib: boolean;
    isha: boolean;
  };
}

interface MamoolIstiqamahStreakProps {
  isUrdu: boolean;
}

export const MamoolIstiqamahStreak: React.FC<MamoolIstiqamahStreakProps> = ({ isUrdu }) => {
  const [data, setData] = useState<IstiqamahData>({
    streak: 1,
    lastDate: '',
    prayers: { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false },
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    if (typeof window === 'undefined') return;

    const todayStr = new Date().toISOString().split('T')[0] || '';
    const savedStreak = parseInt(localStorage.getItem('amal_istiqamah_streak') || '1', 10);
    const lastDate = localStorage.getItem('amal_istiqamah_last_date') || '';
    const savedPrayers = localStorage.getItem(`amal_prayers_${todayStr}`);

    let currentStreak = savedStreak;
    if (lastDate && lastDate !== todayStr) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0] || '';

      if (lastDate !== yesterdayStr) {
        // Gap of more than 1 day
        currentStreak = 1;
      }
    }

    const prayers = savedPrayers
      ? JSON.parse(savedPrayers)
      : { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false };

    setData({
      streak: currentStreak,
      lastDate: todayStr,
      prayers,
    });
  }, []);

  const togglePrayer = (prayerKey: keyof IstiqamahData['prayers']) => {
    if (typeof window === 'undefined') return;

    const todayStr = new Date().toISOString().split('T')[0] || '';
    const updatedPrayers = { ...data.prayers, [prayerKey]: !data.prayers[prayerKey] };

    // Check if streak should be incremented if this is first action today
    let newStreak = data.streak;
    const lastDate = localStorage.getItem('amal_istiqamah_last_date') || '';

    if (lastDate !== todayStr) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0] || '';
      if (lastDate === yesterdayStr) {
        newStreak += 1;
      } else {
        newStreak = 1;
      }
      localStorage.setItem('amal_istiqamah_streak', newStreak.toString());
      localStorage.setItem('amal_istiqamah_last_date', todayStr);
    }

    localStorage.setItem(`amal_prayers_${todayStr}`, JSON.stringify(updatedPrayers));

    setData({
      streak: newStreak,
      lastDate: todayStr,
      prayers: updatedPrayers,
    });
  };

  if (!hasMounted) return null;

  const completedCount = Object.values(data.prayers).filter(Boolean).length;
  const isAllCompleted = completedCount === 5;

  const PRAYER_BUTTONS: { key: keyof IstiqamahData['prayers']; labelUrdu: string; labelEn: string }[] = [
    { key: 'fajr', labelUrdu: 'فجر', labelEn: 'Fajr' },
    { key: 'dhuhr', labelUrdu: 'ظہر', labelEn: 'Dhuhr' },
    { key: 'asr', labelUrdu: 'عصر', labelEn: 'Asr' },
    { key: 'maghrib', labelUrdu: 'مغرب', labelEn: 'Maghrib' },
    { key: 'isha', labelUrdu: 'عشاء', labelEn: 'Isha' },
  ];

  return (
    <div
      style={{
        backgroundColor: '#F8FAFC',
        border: '1px solid #E2E8F0',
        borderRadius: 14,
        padding: '12px 16px',
        marginTop: 14,
        marginBottom: 8,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 10,
        }}
      >
        {/* Left: Streak & Habit info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              backgroundColor: isAllCompleted ? '#DCFCE7' : '#FEF3C7',
              border: `1px solid ${isAllCompleted ? '#86EFAC' : '#FDE68A'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
            }}
          >
            {isAllCompleted ? '🌟' : '🔥'}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#0F172A' }}>
                {isUrdu
                  ? `${data.streak} دن استقامت (Istiqamah Streak)`
                  : `${data.streak}-Day Istiqamah Streak`}
              </span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  backgroundColor: completedCount > 0 ? '#ECFDF5' : '#F1F5F9',
                  color: completedCount > 0 ? '#047857' : '#64748B',
                  padding: '2px 7px',
                  borderRadius: 12,
                  border: `1px solid ${completedCount > 0 ? '#A7F3D0' : '#CBD5E1'}`,
                }}
              >
                {completedCount}/5 {isUrdu ? 'نمازیں ادا' : 'Prayers Logged'}
              </span>
            </div>
            <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>
              {isUrdu
                ? '«أَحَبُّ الأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ» — روزانہ کی مسلسل بندگی'
                : 'Consistency is most beloved to Allah — 1-tap prayer accountability'}
            </div>
          </div>
        </div>

        {/* Right: Quick toggle drawer button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            fontSize: 11.5,
            fontWeight: 700,
            color: '#065F46',
            backgroundColor: '#ECFDF5',
            border: '1px solid #A7F3D0',
            padding: '5px 12px',
            borderRadius: 8,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            transition: 'all 0.15s ease',
          }}
        >
          <span>{isExpanded ? '▲' : '▼'}</span>
          <span>
            {isExpanded
              ? (isUrdu ? 'مختصر کریں' : 'Hide Checklist')
              : (isUrdu ? 'روزانہ نماز چیک لسٹ' : 'Log Daily Prayers')}
          </span>
        </button>
      </div>

      {/* Expandable 5-Prayer Checklist */}
      {isExpanded && (
        <div
          style={{
            marginTop: 12,
            paddingTop: 12,
            borderTop: '1px dashed #CBD5E1',
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap',
          }}
        >
          {PRAYER_BUTTONS.map((p) => {
            const isDone = data.prayers[p.key];
            return (
              <button
                key={p.key}
                onClick={() => togglePrayer(p.key)}
                style={{
                  flex: '1 1 70px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  padding: '8px 10px',
                  borderRadius: 10,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                  backgroundColor: isDone ? '#065F46' : '#FFFFFF',
                  color: isDone ? '#FFFFFF' : '#334155',
                  border: isDone ? '1px solid #065F46' : '1px solid #CBD5E1',
                  boxShadow: isDone ? '0 2px 6px rgba(6, 95, 70, 0.2)' : 'none',
                  transition: 'all 0.15s ease',
                }}
              >
                <span>{isDone ? '✓' : '○'}</span>
                <span>{isUrdu ? p.labelUrdu : p.labelEn}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
