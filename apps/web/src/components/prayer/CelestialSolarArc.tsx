import React, { useMemo, memo } from 'react';

export interface CelestialSolarArcProps {
  prayerTimes: {
    fajr: string;
    sunrise: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
  nextPrayer: {
    nameEnglish: string;
    nameUrdu: string;
    time: string;
    formattedCountdownEnglish?: string;
  } | null;
  cityName: string;
  t?: (en: string, ur?: string, ar?: string, roman?: string) => string;
}

function timeStringToMinutes(timeStr: string): number {
  if (!timeStr) return 0;
  const parts = timeStr.trim().split(':');
  if (parts.length < 2) return 0;
  const h = parseInt(parts[0] || '0', 10);
  const m = parseInt(parts[1] || '0', 10);
  return (isNaN(h) ? 0 : h) * 60 + (isNaN(m) ? 0 : m);
}

export const CelestialSolarArc: React.FC<CelestialSolarArcProps> = ({
  prayerTimes,
  nextPrayer,
  cityName,
  t = (en) => en,
}) => {
  // Current time in minutes — initialized CLIENT-SIDE ONLY to avoid SSR UTC mismatch
  // (server renders UTC, client is local time → hydration mismatch causes wrong sun position)
  const [nowMinutes, setNowMinutes] = React.useState(-1); // -1 = not yet mounted on client

  React.useEffect(() => {
    // Set immediately on mount (client only — correct local timezone)
    const getLocalMinutes = () => {
      const d = new Date();
      return d.getHours() * 60 + d.getMinutes();
    };
    setNowMinutes(getLocalMinutes());
    // Then refresh every 30 seconds for live celestial motion
    const interval = setInterval(() => {
      setNowMinutes(getLocalMinutes());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const sunriseMin = useMemo(() => timeStringToMinutes(prayerTimes.sunrise), [prayerTimes.sunrise]);
  const dhuhrMin = useMemo(() => timeStringToMinutes(prayerTimes.dhuhr), [prayerTimes.dhuhr]);
  const asrMin = useMemo(() => timeStringToMinutes(prayerTimes.asr), [prayerTimes.asr]);
  const maghribMin = useMemo(() => timeStringToMinutes(prayerTimes.maghrib), [prayerTimes.maghrib]);

  // isMounted = client has set real local time (avoids SSR midnight flash)
  const isMounted = nowMinutes >= 0;
  // Use effective time: before mount show midnight(0) only if times not available, otherwise hold
  const effectiveNow = isMounted ? nowMinutes : sunriseMin; // show at sunrise position while loading
  const isDaytime = isMounted && effectiveNow >= sunriseMin && effectiveNow < maghribMin;

  // Calculate Sun/Moon progress: 0 to 1
  const progress = useMemo(() => {
    if (isDaytime) {
      const dayDuration = Math.max(1, maghribMin - sunriseMin);
      const elapsed = Math.max(0, effectiveNow - sunriseMin);
      return Math.min(1, Math.max(0, elapsed / dayDuration));
    } else {
      // Nighttime: from maghrib through midnight to sunrise
      const nightDuration = Math.max(1, (1440 - maghribMin) + sunriseMin);
      const elapsed = effectiveNow >= maghribMin ? (effectiveNow - maghribMin) : (1440 - maghribMin + effectiveNow);
      return Math.min(1, Math.max(0, elapsed / nightDuration));
    }
  }, [effectiveNow, sunriseMin, maghribMin, isDaytime]);

  // Coordinates on SVG Arc:
  // Arc spans from Left (40, 160) to Right (360, 160) with center (200, 160), radiusX: 160, radiusY: 115.
  // Alpha angle progresses from 0 (at left endpoint x=40) to PI (at right endpoint x=360).
  // At alpha = 0: x = 200 - 160 * cos(0) = 40 (Sunrise / Dawn)
  // At alpha = PI/2: x = 200 - 160 * cos(PI/2) = 200, y = 160 - 115 * sin(PI/2) = 45 (Solar Zenith / Midday)
  // At alpha = PI: x = 200 - 160 * cos(PI) = 360 (Maghrib / Sunset)
  const getCoordinatesFromProgress = (p: number) => {
    const clamped = Math.min(1, Math.max(0, p));
    const alpha = Math.PI * clamped;
    return {
      x: 200 - 160 * Math.cos(alpha),
      y: 160 - 115 * Math.sin(alpha),
    };
  };

  const orbCoord = getCoordinatesFromProgress(progress);
  const orbX = orbCoord.x;
  const orbY = orbCoord.y;

  // Helper function to calculate daytime coordinate for any prayer
  const getDayMarkerCoord = (min: number) => {
    const dayDuration = Math.max(1, maghribMin - sunriseMin);
    const p = (min - sunriseMin) / dayDuration;
    return getCoordinatesFromProgress(p);
  };

  const dhuhrCoord = getDayMarkerCoord(dhuhrMin);
  const asrCoord = getDayMarkerCoord(asrMin);

  // Dynamic Ambient Sky Colors
  const skyTheme = useMemo(() => {
    if (isDaytime) {
      if (progress < 0.15) {
        return {
          gradient: ['#FEF3C7', '#FDE68A', '#F59E0B'],
          statusText: t('Early Morning (Duha)', 'ابتدائی صبح (چاشت)', 'الضحى', 'Early Morning (Duha)'),
          badgeBg: '#FEF3C7',
          badgeColor: '#B45309',
        };
      } else if (progress < 0.6) {
        return {
          gradient: ['#E0F2FE', '#BAE6FD', '#38BDF8'],
          statusText: t('Solar Zenith (Midday / Dhuhr)', 'نصف النہار (وقتِ ظہر)', 'وقت الظهر', 'Solar Zenith (Dhuhr)'),
          badgeBg: '#E0F2FE',
          badgeColor: '#0369A1',
        };
      } else if (progress < 0.88) {
        return {
          gradient: ['#FEF3C7', '#FED7AA', '#FB923C'],
          statusText: t('Afternoon Radiance (Asr)', 'سہ پہر کا وقت (عصر)', 'وقت العصر', 'Afternoon (Asr)'),
          badgeBg: '#FFEDD5',
          badgeColor: '#C2410C',
        };
      } else {
        return {
          gradient: ['#FEE2E2', '#FECDD3', '#F43F5E'],
          statusText: t('Golden Hour / Sunset Approach', 'غروب کا قریب وقت (شفق)', 'قرب الغروب', 'Sunset Approach'),
          badgeBg: '#FFE4E6',
          badgeColor: '#BE123C',
        };
      }
    } else {
      // Night
      return {
        gradient: ['#0B192C', '#1E3E62', '#000000'],
        statusText: t('Night Serenity & Tahajjud Vigil', 'رات کا پرسکون وقت (تہجد و سحر)', 'سكينة الليل والتهجد', 'Night Serenity & Tahajjud'),
        badgeBg: '#0F172A',
        badgeColor: '#38BDF8',
      };
    }
  }, [isDaytime, progress, t]);

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        border: '1px solid #E2E8F0',
        padding: '20px 24px',
        marginBottom: 24,
        boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.04), 0 2px 6px -1px rgba(15, 23, 42, 0.02)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Header Info Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 10,
          marginBottom: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 800,
              padding: '3px 10px',
              borderRadius: 20,
              backgroundColor: skyTheme.badgeBg,
              color: skyTheme.badgeColor,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            {isDaytime ? '☀️ CELESTIAL SOLAR ARC' : '🌙 CELESTIAL NOCTURNAL ARC'}
          </span>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>
            {skyTheme.statusText}
          </span>
        </div>

        {nextPrayer && (
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: '#065F46',
              backgroundColor: '#ECFDF5',
              padding: '4px 12px',
              borderRadius: 20,
              border: '1px solid #A7F3D0',
            }}
          >
            {t('Next Salah:', 'اگلی نماز:', 'الصلاة القادمة:', 'Agli Namaz:')}{' '}
            <strong>{nextPrayer.nameEnglish}</strong> @ {nextPrayer.time}{' '}
            {nextPrayer.formattedCountdownEnglish && `(${nextPrayer.formattedCountdownEnglish})`}
          </div>
        )}
      </div>

      {/* Mathematical SVG Arc Container */}
      <div style={{ width: '100%', maxWidth: 540, margin: '0 auto', position: 'relative' }}>
        <svg
          viewBox="0 0 400 205"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        >
          <defs>
            {/* Horizon Glow Gradient */}
            <linearGradient id="solarArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#10B981" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0.8" />
            </linearGradient>

            {/* Night Horizon Gradient */}
            <linearGradient id="nightArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#818CF8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.6" />
            </linearGradient>

            {/* Sun Glow Filter */}
            <filter id="sunGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Horizon Base Line */}
          <line
            x1="30"
            y1="160"
            x2="370"
            y2="160"
            stroke="#E2E8F0"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {/* Mathematical Trajectory Arc */}
          <path
            d="M 40 160 A 160 115 0 0 1 360 160"
            fill="none"
            stroke={isDaytime ? 'url(#solarArcGrad)' : 'url(#nightArcGrad)'}
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Daylight Markers */}
          {isDaytime ? (
            <>
              {/* Dhuhr Zenith Marker (Midday Peak) */}
              <circle
                cx={dhuhrCoord.x}
                cy={dhuhrCoord.y}
                r="4.5"
                fill="#FFFFFF"
                stroke="#10B981"
                strokeWidth="2.5"
              />
              <text
                x={dhuhrCoord.x}
                y={dhuhrCoord.y - 10}
                fontSize="10"
                fontWeight="700"
                fill="#065F46"
                textAnchor="middle"
              >
                Dhuhr ({prayerTimes.dhuhr})
              </text>

              {/* Asr Marker (Afternoon Descent) */}
              <circle
                cx={asrCoord.x}
                cy={asrCoord.y}
                r="4"
                fill="#FFFFFF"
                stroke="#F59E0B"
                strokeWidth="2.5"
              />
              <text
                x={Math.min(335, asrCoord.x)}
                y={asrCoord.y - 10}
                fontSize="9.5"
                fontWeight="700"
                fill="#B45309"
                textAnchor="middle"
              >
                Asr ({prayerTimes.asr})
              </text>
            </>
          ) : (
            <>
              {/* Nighttime / Midnight Qiyam Marker */}
              <circle
                cx="200"
                cy="45"
                r="4.5"
                fill="#FFFFFF"
                stroke="#818CF8"
                strokeWidth="2.5"
              />
              <text
                x="200"
                y="35"
                fontSize="10"
                fontWeight="700"
                fill="#4338CA"
                textAnchor="middle"
              >
                {t('Midnight / Qiyam', 'نصف اللیل / تہجد', 'قيام الليل', 'Midnight (Qiyam)')}
              </text>
            </>
          )}

          {/* Left Endpoint (Sunrise by Day / Sunset by Night) */}
          <circle cx="40" cy="160" r="5" fill={isDaytime ? '#F59E0B' : '#EF4444'} />
          <text x="40" y="178" fontSize="10" fontWeight="700" fill="#64748B" textAnchor="middle">
            {isDaytime ? t('Sunrise', 'طلوع', 'الشروق', 'Sunrise') : t('Maghrib', 'مغرب', 'المغرب', 'Maghrib')}
          </text>
          <text x="40" y="192" fontSize="9.5" fill="#94A3B8" textAnchor="middle">
            {isDaytime ? prayerTimes.sunrise : prayerTimes.maghrib}
          </text>

          {/* Right Endpoint (Maghrib by Day / Fajr Dawn by Night) */}
          <circle cx="360" cy="160" r="5" fill={isDaytime ? '#EF4444' : '#10B981'} />
          <text x="360" y="178" fontSize="10" fontWeight="700" fill="#64748B" textAnchor="middle">
            {isDaytime ? t('Maghrib', 'مغرب', 'المغرب', 'Maghrib') : t('Fajr', 'فجر', 'الفجر', 'Fajr')}
          </text>
          <text x="360" y="192" fontSize="9.5" fill="#94A3B8" textAnchor="middle">
            {isDaytime ? prayerTimes.maghrib : prayerTimes.fajr}
          </text>

          {/* LIVE CELESTIAL ORB (Sun or Moon) */}
          <g transform={`translate(${orbX}, ${orbY})`}>
            {isDaytime ? (
              // The Glowing Sun
              <>
                <circle r="14" fill="#FEF08A" opacity="0.4" filter="url(#sunGlow)" />
                <circle r="9" fill="#F59E0B" />
                <circle r="6" fill="#FDE047" />
              </>
            ) : (
              // The Glowing Crescent Moon
              <>
                <circle r="13" fill="#BAE6FD" opacity="0.3" filter="url(#sunGlow)" />
                <path
                  d="M -6 -7 A 9 9 0 0 0 6 7 A 7 7 0 0 1 -6 -7 Z"
                  fill="#38BDF8"
                />
              </>
            )}
          </g>
        </svg>
      </div>

      {/* Footer Info Strip */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 6,
          paddingTop: 10,
          borderTop: '1px solid #F1F5F9',
          fontSize: 11,
          color: '#64748B',
          flexWrap: 'wrap',
          gap: 6,
        }}
      >
        <div>
          📍 {cityName} ·{' '}
          <span>
            {isDaytime
              ? t('Real-time astronomical sun position', 'سورج کی براہ راست فلکیاتی پوزیشن', 'موقع الشمس الفلكي المباشر', 'Real-time sun position')
              : t('Nocturnal sky & Qiyam trajectory', 'شبینہ فلک اور قیام کا دورانیہ', 'مسار القيام الليلي', 'Nocturnal sky & Qiyam')}
          </span>
        </div>
        <div style={{ color: '#059669', fontWeight: 600 }}>
          {t('Fajr:', 'فجر:', 'الفجر:', 'Fajr:')} {prayerTimes.fajr} · {t('Isha:', 'عشاء:', 'العشاء:', 'Isha:')} {prayerTimes.isha}
        </div>
      </div>
    </div>
  );
};

export const CelestialSolarArcMemo = memo(CelestialSolarArc);
