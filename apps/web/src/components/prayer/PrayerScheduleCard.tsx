import React from 'react';

interface PrayerItem {
  key: string;
  name: string;
  nameUrdu: string;
  nameArabic: string;
  time: string;
  icon: string;
}

interface PrayerScheduleCardProps {
  prayerList: PrayerItem[];
  prayerTimes: any;
  nextPrayer: any;
  makroohTimes: any;
  selectedCityName: string;
  isUrdu: boolean;
  t: (en: string, ur: string) => string;
}

export function PrayerScheduleCard({
  prayerList,
  prayerTimes,
  nextPrayer,
  makroohTimes,
  selectedCityName,
  isUrdu,
  t,
}: PrayerScheduleCardProps) {
  // Precautionary Sehri Calculation
  const sehriCutoff = (() => {
    const parts = (prayerTimes.fajr || '05:00').split(':').map(Number);
    const h = parts[0] ?? 5;
    const m = parts[1] ?? 0;
    const total = h * 60 + m - 3; // 3-minute Ihtiyat buffer before Subh Sadiq
    const newH = Math.floor((total < 0 ? total + 1440 : total) / 60) % 24;
    const newM = (total < 0 ? total + 1440 : total) % 60;
    return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;
  })();

  return (
    <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 24, border: '1px solid #E5E7EB' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1B4332', margin: 0 }}>
          Daily Auqat-e-Namaz ({prayerTimes.date})
        </h2>
        <span style={{ fontSize: 12, color: '#6B7280' }}>
          {selectedCityName}
        </span>
      </div>

      <div suppressHydrationWarning style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {prayerList.map((p) => {
          const isNext = nextPrayer?.key === p.key;
          return (
            <div
              key={p.key}
              suppressHydrationWarning
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                borderRadius: 10,
                backgroundColor: isNext ? '#F0FDF4' : '#F9FAFB',
                border: isNext ? '1.5px solid #10B981' : '1px solid #E5E7EB',
                boxShadow: isNext ? '0 2px 10px rgba(16, 185, 129, 0.12)' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 20 }}>{p.icon}</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, color: '#111827', fontSize: 15 }}>{p.name}</span>
                    {isNext && (
                      <span
                        suppressHydrationWarning
                        style={{
                          fontSize: 10,
                          fontWeight: 800,
                          backgroundColor: '#059669',
                          color: '#FFFFFF',
                          padding: '2px 8px',
                          borderRadius: 12,
                          letterSpacing: 0.3,
                        }}
                      >
                        {t('Next Prayer', 'اگلی نماز')} · {nextPrayer.formattedCountdownEnglish}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>
                    {p.nameArabic} • {isUrdu ? p.nameUrdu : p.name}
                  </div>
                </div>
              </div>
              <div
                suppressHydrationWarning
                style={{ fontSize: 18, fontWeight: 800, color: isNext ? '#065F46' : '#1B4332' }}
              >
                {p.time}
              </div>
            </div>
          );
        })}
      </div>

      {/* Night Prayers */}
      <div
        suppressHydrationWarning
        style={{
          marginTop: 20,
          paddingTop: 16,
          borderTop: '1px solid #E5E7EB',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <span style={{ fontSize: 12, color: '#6B7280', display: 'block' }}>Islamic Midnight</span>
          <span suppressHydrationWarning style={{ fontSize: 14, fontWeight: 700, color: '#374151' }}>
            {prayerTimes.midnight}
          </span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: 12, color: '#6B7280', display: 'block' }}>Tahajjud (Last 1/3)</span>
          <span suppressHydrationWarning style={{ fontSize: 14, fontWeight: 700, color: '#15803D' }}>
            {prayerTimes.qiyamThird}
          </span>
        </div>
      </div>

      {/* FASTING & ROZA TIMINGS */}
      <div
        style={{
          marginTop: 16,
          padding: '12px 16px',
          borderRadius: 10,
          backgroundColor: '#ECFDF5',
          border: '1px solid #A7F3D0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <span
            style={{
              fontSize: 11,
              fontWeight: 800,
              color: '#065F46',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}
          >
            {t('🌙 Imsak / Sehri Cutoff (Precautionary)', '🌙 سحری کا احتیاطی وقت')}
          </span>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#065F46', marginTop: 2 }}>
            {sehriCutoff}
            <span style={{ fontSize: 11, fontWeight: 500, color: '#047857', marginLeft: 6 }}>
              {t('(3m buffer before Fajr)', '(فجر سے ۳ منٹ قبل)')}
            </span>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 800,
              color: '#92400E',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}
          >
            {t('🌅 Iftar / Sunset', '🌅 افطار کا وقت')}
          </span>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#92400E', marginTop: 2 }}>
            {prayerTimes.maghrib}
            <span style={{ fontSize: 11, fontWeight: 500, color: '#B45309', marginLeft: 6 }}>
              {t('(Maghrib entry)', '(دخولِ مغرب)')}
            </span>
          </div>
        </div>
      </div>

      {/* Auqat-e-Makrooha (Prohibited Prayer Windows) */}
      <div
        style={{
          marginTop: 18,
          padding: '12px 14px',
          borderRadius: 10,
          backgroundColor: '#FEF2F2',
          border: '1px solid #FCA5A5',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>⚠️</span>
            <span style={{ fontWeight: 800, color: '#991B1B', fontSize: 13 }}>
              {t('Prohibited Prayer Times (Auqat-e-Makrooha)', 'مکروہ اوقات (نماز ممنوع ہے)')}
            </span>
          </div>
          <span style={{ fontSize: 11, color: '#DC2626', fontWeight: 700 }}>
            {t('Strict Prohibition', 'تحریمی')}
          </span>
        </div>
        <div style={{ fontSize: 12, color: '#7F1D1D', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{t('Sunrise to Ishraq Window:', 'طلوعِ آفتاب تا اشراق:')}</span>
            <strong>{makroohTimes.sunrise.start} — {makroohTimes.sunrise.end}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{t('Solar Noon / Zawal Window:', 'نصف النہار / زوال:')}</span>
            <strong>{makroohTimes.zawal.start} — {makroohTimes.zawal.end}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{t('Sunset Window:', 'غروبِ آفتاب:')}</span>
            <strong>{makroohTimes.sunset.start} — {makroohTimes.sunset.end}</strong>
          </div>
        </div>
        <div
          style={{
            fontSize: 11,
            color: '#B91C1C',
            marginTop: 8,
            fontStyle: 'italic',
            borderTop: '1px dashed #FECACA',
            paddingTop: 6,
          }}
        >
          {t(
            '* Voluntary, missed prayers (Qada), Sajdah Tilawat, and Janazah are strictly prohibited during these windows (Mukhtasar al-Quduri & Fatawa Razawiyya).',
            '* ان اوقات میں نفل، قضا، سجدۂ تلاوت اور نمازِ جنازہ پڑھنا مکروہِ تحریمی ہے (القدوری و فتاویٰ رضویہ)۔'
          )}
        </div>
      </div>
    </div>
  );
}
