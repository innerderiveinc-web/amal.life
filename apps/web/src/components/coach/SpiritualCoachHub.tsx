import React, { useState, useEffect } from 'react';
import {
  SpiritualCoachState,
  getSmartCoachGuidance,
  saveDailyMuhasabah,
  DailyMuhasabahEntry,
} from '../../lib/spiritual-coach-agent';
import { useLanguage } from '../../context/LanguageContext';
import { showAmalToast } from '../Toast';

export const SpiritualCoachHub: React.FC = () => {
  const { t, isUrdu } = useLanguage();
  const [coachState, setCoachState] = useState<SpiritualCoachState>(() => getSmartCoachGuidance());
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  // Form State for Nightly Muhasabah
  const todayStr = new Date().toISOString().split('T')[0]!;
  const [prayers, setPrayers] = useState({
    fajr: false,
    dhuhr: true,
    asr: true,
    maghrib: true,
    isha: true,
  });
  const [character, setCharacter] = useState({
    avoidedAnger: true,
    guardedTongue: true,
    forgaveOthers: true,
  });
  const [gratitude, setGratitude] = useState('');
  const [adaptiveResult, setAdaptiveResult] = useState<string | null>(null);

  useEffect(() => {
    const fresh = getSmartCoachGuidance();
    setCoachState(fresh);
    if (fresh.recentAudit) {
      setPrayers(fresh.recentAudit.prayersCompleted);
      setCharacter(fresh.recentAudit.characterAudit);
      setGratitude(fresh.recentAudit.gratitudeNote);
      setAdaptiveResult(fresh.recentAudit.suggestedAdaptiveStep);
    }
  }, []);

  const handleSaveAudit = (e: React.FormEvent) => {
    e.preventDefault();
    const saved = saveDailyMuhasabah({
      date: todayStr,
      prayersCompleted: prayers,
      characterAudit: character,
      gratitudeNote: gratitude.trim() || 'الحمد للہ علی کل حال',
    });
    setAdaptiveResult(saved.suggestedAdaptiveStep);
    setCoachState(getSmartCoachGuidance());
    setIsAuditModalOpen(false);
    showAmalToast(
      isUrdu
        ? 'ماشاءاللہ! آج کا محاسبہ کامیابی سے محفوظ ہو گیا۔'
        : 'Muhasabah saved successfully. Keep up your consistency!',
      'success'
    );
  };

  const phaseNames = {
    MORNING_INTENT: {
      title: t('Morning Intent & Focus', 'صبح کا ارادہ و نیت'),
      icon: '🌅',
      badge: '#047857',
    },
    MIDDAY_CHECK: {
      title: t('Midday Guard & Dhikr', 'دوپہر کی پاسبانی و ذکر'),
      icon: '☀️',
      badge: '#D97706',
    },
    EVENING_RECONNECT: {
      title: t('Evening Reconnect & Family', 'شام کا قرآنی تعلق و نرمی'),
      icon: '🌇',
      badge: '#4338CA',
    },
    NIGHT_MUHASABAH: {
      title: t('Nightly 60s Muhasabah', 'رات کا ۶۰ سیکنڈ محاسبہ نفس'),
      icon: '🌙',
      badge: '#1E293B',
    },
  };

  const currentInfo = phaseNames[coachState.currentPhase];

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #F0FDF4 0%, #FFFFFF 100%)',
        borderRadius: 16,
        border: '1.5px solid #A7F3D0',
        padding: '20px 24px',
        boxShadow: '0 4px 15px rgba(6, 78, 59, 0.05)',
        marginBottom: 24,
      }}
    >
      {/* Top Banner */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              backgroundColor: '#ECFDF5',
              border: '1px solid #10B981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
            }}
          >
            {currentInfo.icon}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#064E3B' }}>
                {t('Smart Spiritual Coach', 'سمارٹ روحانی مشیر')}
              </h3>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: 12,
                  backgroundColor: currentInfo.badge,
                  color: '#FFFFFF',
                }}
              >
                {currentInfo.title}
              </span>
            </div>
            <p style={{ margin: '3px 0 0 0', fontSize: 12, color: '#4B5563' }}>
              {t('Deterministic, 100% on-device Prophetic routine guidance', 'مکمل محفوظ، آف لائن اور نبوی طرزِ عمل پر مبنی رہنمائی')}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setIsAuditModalOpen(true)}
          style={{
            padding: '8px 16px',
            borderRadius: 10,
            backgroundColor: '#065F46',
            color: '#FFFFFF',
            border: 'none',
            fontWeight: 800,
            fontSize: 12,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span>⚖️</span>
          <span>{coachState.recentAudit ? t('Update Daily Muhasabah', 'محاسبہ اپڈیٹ کریں') : t('Quick 60s Muhasabah', '۶۰ سیکنڈ محاسبہ')}</span>
        </button>
      </div>

      {/* Micro-Action Card */}
      <div
        style={{
          marginTop: 16,
          backgroundColor: '#FFFFFF',
          padding: '14px 18px',
          borderRadius: 12,
          border: '1px solid #E5E7EB',
          display: 'flex',
          alignItems: 'start',
          gap: 12,
        }}
      >
        <span style={{ fontSize: 20 }}>💡</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#065F46', marginBottom: 2 }}>
            {t('Today\'s Recommended Micro-Action', 'آج کا تجویز کردہ نبوی عمل')}
          </div>
          <div style={{ fontSize: 13, color: '#1F2937', fontWeight: 600, lineHeight: 1.5 }}>
            {isUrdu ? coachState.currentMicroAction.ur : coachState.currentMicroAction.en}
          </div>
          <div style={{ fontSize: 10, color: '#6B7280', marginTop: 4, fontStyle: 'italic' }}>
            {coachState.currentMicroAction.source}
          </div>
        </div>
      </div>

      {/* Adaptive Result Display if Available */}
      {adaptiveResult && (
        <div
          style={{
            marginTop: 12,
            backgroundColor: '#FEF3C7',
            padding: '10px 14px',
            borderRadius: 10,
            border: '1px solid #FCD34D',
            fontSize: 12,
            color: '#92400E',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span>🌱</span>
          <span>{adaptiveResult}</span>
        </div>
      )}

      {/* 60-Second Muhasabah Modal */}
      {isAuditModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(5px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
          }}
          onClick={() => setIsAuditModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 20,
              maxWidth: 480,
              width: '100%',
              padding: 24,
              boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
              maxHeight: '85vh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: '#064E3B' }}>
                {t('60-Second Daily Muhasabah', '۶۰ سیکنڈ روزانہ کا محاسبہ')}
              </h3>
              <button
                onClick={() => setIsAuditModalOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: 16, cursor: 'pointer', color: '#6B7280' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveAudit}>
              {/* 1. Salah Check */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 12, fontWeight: 800, color: '#374151', display: 'block', marginBottom: 6 }}>
                  {t('1. Today\'s 5 Prayers (Farz Salah):', '۱. آج کی ۵ نمازیں:')}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
                  {(['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as const).map((p) => (
                    <button
                      type="button"
                      key={p}
                      onClick={() => setPrayers((prev) => ({ ...prev, [p]: !prev[p] }))}
                      style={{
                        padding: '8px 4px',
                        borderRadius: 8,
                        border: '1px solid',
                        borderColor: prayers[p] ? '#10B981' : '#D1D5DB',
                        backgroundColor: prayers[p] ? '#ECFDF5' : '#F9FAFB',
                        color: prayers[p] ? '#065F46' : '#6B7280',
                        fontSize: 11,
                        fontWeight: 700,
                        cursor: 'pointer',
                        textTransform: 'capitalize',
                      }}
                    >
                      {prayers[p] ? '✓ ' : ''}{p}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Character Audit */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 12, fontWeight: 800, color: '#374151', display: 'block', marginBottom: 6 }}>
                  {t('2. Heart & Tongue Guard (حفظِ زبان و قلب):', '۲. دل و زبان کی پاسبانی:')}
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={character.avoidedAnger}
                      onChange={(e) => setCharacter((prev) => ({ ...prev, avoidedAnger: e.target.checked }))}
                    />
                    <span>{t('Avoided anger and harsh words', 'غصے اور سخت کلامی سے پرہیز کیا')}</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={character.guardedTongue}
                      onChange={(e) => setCharacter((prev) => ({ ...prev, guardedTongue: e.target.checked }))}
                    />
                    <span>{t('Guarded tongue against backbiting (Gheebat)', 'غیبت اور فضول گوئی سے زبان محفوظ رکھی')}</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={character.forgaveOthers}
                      onChange={(e) => setCharacter((prev) => ({ ...prev, forgaveOthers: e.target.checked }))}
                    />
                    <span>{t('Forgave anyone who hurt my feelings', 'دل سے سب کو معاف کر کے سو رہا ہوں')}</span>
                  </label>
                </div>
              </div>

              {/* 3. Gratitude Note */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 12, fontWeight: 800, color: '#374151', display: 'block', marginBottom: 6 }}>
                  {t('3. One thing I am grateful for today (شکر گزاری):', '۳. آج کی ایک خاص نعمت جس پر شکر ادا کیا:')}
                </label>
                <input
                  type="text"
                  value={gratitude}
                  onChange={(e) => setGratitude(e.target.value)}
                  placeholder={isUrdu ? 'مثلاً صحت، والدین کا سایہ، ایمان...' : 'e.g., Health, family, peace of mind...'}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: '1px solid #D1D5DB',
                    fontSize: 13,
                  }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: 10,
                  backgroundColor: '#10B981',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: 14,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {t('Save Muhasabah & Recalibrate Routine', 'محاسبہ محفوظ کریں')}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
