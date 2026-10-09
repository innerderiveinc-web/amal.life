import React, { useState, useMemo, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Navigation } from '../components/Navigation';
import { AmalTheme } from '@amal/ui';
import { prayerQiblaEngine, MadhhabAsr, CalculationMethod, mosqueIqamahSyncEngine } from '@amal/amal-engine';
import { GLOBAL_CITIES, GlobalCity, searchGlobalCities } from '../lib/global-locations';
import { showAmalToast } from '../components/Toast';
import { getLiveNextPrayer } from '../lib/prayer-utils';

export default function PrayerTimesPage() {
  // Default to Delhi / New Delhi (India)
  const [selectedCity, setSelectedCity] = useState<GlobalCity>(GLOBAL_CITIES[0]!);
  const [madhhab, setMadhhab] = useState<MadhhabAsr>('HANAFI');
  const [method, setMethod] = useState<CalculationMethod>('KARACHI');

  // Search & Global Geocoding State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [citySearchQuery, setCitySearchQuery] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [externalResults, setExternalResults] = useState<any[]>([]);

  // Manual Coordinates State
  const [isManualCoordsOpen, setIsManualCoordsOpen] = useState(false);
  const [manualLat, setManualLat] = useState(28.6139);
  const [manualLon, setManualLon] = useState(77.2090);
  const [manualCityName, setManualCityName] = useState('Delhi / New Delhi');

  // Load saved location on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('amal_user_location');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setSelectedCity(parsed);
          setManualLat(parsed.lat);
          setManualLon(parsed.lon);
          setManualCityName(parsed.name);
          if (parsed.defaultMethod) setMethod(parsed.defaultMethod);
        } catch (_) {}
      }
    }
  }, []);

  const handleSelectCity = (city: GlobalCity) => {
    setSelectedCity(city);
    setManualLat(city.lat);
    setManualLon(city.lon);
    setManualCityName(city.name);
    if (city.defaultMethod) setMethod(city.defaultMethod);
    if (typeof window !== 'undefined') {
      localStorage.setItem('amal_user_location', JSON.stringify(city));
    }
    setIsSearchOpen(false);
    setCitySearchQuery('');
    setExternalResults([]);
    showAmalToast(`Location updated to ${city.name}, ${city.country}`, 'success');
  };

  // Browser Geolocation / GPS Auto-Detection
  const handleUseGPS = () => {
    if (typeof window === 'undefined' || !('geolocation' in navigator)) {
      showAmalToast('Geolocation is not supported by your browser', 'warning');
      return;
    }

    setIsLocating(true);
    showAmalToast('Detecting your GPS coordinates...', 'info');

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        setIsLocating(false);
        const lat = Number(pos.coords.latitude.toFixed(4));
        const lon = Number(pos.coords.longitude.toFixed(4));

        let detectedName = `GPS Location (${lat}° N, ${lon}° E)`;
        let countryName = 'Current Device';

        try {
          // Reverse-geocoding via OpenStreetMap Nominatim
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
          const data = await res.json();
          if (data && data.address) {
            detectedName = data.address.city || data.address.town || data.address.suburb || data.address.state_district || data.address.state || detectedName;
            countryName = data.address.country || countryName;
          }
        } catch (_) {}

        const gpsCity: GlobalCity = {
          name: detectedName,
          country: countryName,
          region: 'Live GPS',
          lat,
          lon,
          defaultMethod: method,
        };

        handleSelectCity(gpsCity);
      },
      (err) => {
        setIsLocating(false);
        showAmalToast(`GPS Detection Failed: ${err.message}`, 'warning');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Worldwide Online Search (Nominatim OpenStreetMap)
  const handleSearchWorldMap = async () => {
    if (!citySearchQuery.trim()) return;
    setIsGeocoding(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(citySearchQuery)}&format=json&limit=6`);
      const data = await res.json();
      setIsGeocoding(false);
      if (Array.isArray(data) && data.length > 0) {
        setExternalResults(data);
      } else {
        setExternalResults([]);
        showAmalToast('No places found on map. Try entering exact coordinates.', 'warning');
      }
    } catch (_) {
      setIsGeocoding(false);
      showAmalToast('Could not query global map. Check network connection.', 'warning');
    }
  };

  const handleApplyManualCoords = () => {
    const customCity: GlobalCity = {
      name: manualCityName || 'Custom Location',
      country: 'Manual Coordinates',
      region: 'User Defined',
      lat: Number(manualLat),
      lon: Number(manualLon),
      defaultMethod: method,
    };
    handleSelectCity(customCity);
    setIsManualCoordsOpen(false);
  };

  const filteredPresetCities = useMemo(() => {
    return searchGlobalCities(citySearchQuery);
  }, [citySearchQuery]);

  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const prayerTimes = useMemo(() => {
    return prayerQiblaEngine.calculatePrayerTimes(
      { latitude: selectedCity.lat, longitude: selectedCity.lon },
      now,
      madhhab,
      method
    );
  }, [selectedCity, madhhab, method, now]);

  const nextPrayer = useMemo(() => {
    try {
      return getLiveNextPrayer(prayerTimes, now);
    } catch {
      return null;
    }
  }, [prayerTimes, now]);

  const qibla = useMemo(() => {
    return prayerQiblaEngine.calculateQibla({
      latitude: selectedCity.lat,
      longitude: selectedCity.lon,
    });
  }, [selectedCity]);

  const prayerList = [
    { key: 'fajr', name: 'Fajr', nameUrdu: 'فجر', nameArabic: 'الفجر', time: prayerTimes.fajr, icon: '🌅' },
    { key: 'sunrise', name: 'Sunrise', nameUrdu: 'طلوعِ آفتاب', nameArabic: 'الشروق', time: prayerTimes.sunrise, icon: '☀️' },
    { key: 'dhuhr', name: 'Dhuhr', nameUrdu: 'ظہر', nameArabic: 'الظهر', time: prayerTimes.dhuhr, icon: '🌞' },
    { key: 'asr', name: 'Asr', nameUrdu: 'عصر', nameArabic: 'العصر', time: prayerTimes.asr, icon: '🌤️' },
    { key: 'maghrib', name: 'Maghrib', nameUrdu: 'مغرب', nameArabic: 'المغرب', time: prayerTimes.maghrib, icon: '🌇' },
    { key: 'isha', name: 'Isha', nameUrdu: 'عشاء', nameArabic: 'العشاء', time: prayerTimes.isha, icon: '🌙' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FA' }}>
      <Head>
        <title>Precision Prayer Times & Qibla Compass | AMAL OS</title>
        <meta name="description" content="Worldwide prayer times and Qibla compass for Delhi, Mumbai, Lucknow, Hyderabad, and every city worldwide with precision Hanafi 2x and Subcontinent 18° twilight calculations." />
      </Head>
      <Navigation />

      <main style={{ maxWidth: 1040, margin: '0 auto', padding: '0 24px 80px' }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 28 }}>🧭</span>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1B4332', margin: 0 }}>
              Precision Prayer Times & Qibla Compass
            </h1>
          </div>
          <p style={{ color: '#4B5563', margin: 0, fontSize: 14 }}>
            Deterministic astronomical calculations verified with classical Fiqh parameters (Subh Sadiq, Zawal buffer, Mislayn vs Misl al-Awwal Asr).
          </p>
        </div>

        {/* ACTIVE LOCATION STATUS & ACTION BAR */}
        <div style={{
          backgroundColor: '#0F291E',
          borderRadius: 14,
          padding: '18px 24px',
          color: '#F8FAFC',
          marginBottom: 20,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
          boxShadow: '0 4px 6px -1px rgba(15, 41, 30, 0.2)',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 18 }}>📍</span>
              <span style={{ fontSize: 18, fontWeight: 800, color: '#A7F3D0' }}>
                {selectedCity.name}, {selectedCity.country}
              </span>
              <span style={{
                fontSize: 11,
                backgroundColor: 'rgba(52, 211, 153, 0.2)',
                color: '#6EE7B7',
                padding: '2px 8px',
                borderRadius: 12,
                fontWeight: 700,
              }}>
                ACTIVE
              </span>
            </div>
            <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 4 }}>
              Coordinates: {selectedCity.lat.toFixed(4)}° N, {selectedCity.lon.toFixed(4)}° E • Qibla Bearing: {qibla.bearingDegrees}° ({qibla.compassDirection}) • Distance to Kaaba: {qibla.distanceKm.toLocaleString()} km
            </div>
          </div>

          {/* Location Action Buttons */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button
              onClick={handleUseGPS}
              disabled={isLocating}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 14px',
                borderRadius: 8,
                backgroundColor: '#10B981',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              <span>{isLocating ? '⏳' : '🎯'}</span>
              <span>{isLocating ? 'Detecting GPS...' : 'Use My GPS'}</span>
            </button>

            <button
              onClick={() => setIsSearchOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 14px',
                borderRadius: 8,
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.25)',
                fontWeight: 600,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              <span>🔍</span>
              <span>Search Any City / Town</span>
            </button>

            <button
              onClick={() => setIsManualCoordsOpen(!isManualCoordsOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 12px',
                borderRadius: 8,
                backgroundColor: 'transparent',
                color: '#9CA3AF',
                border: '1px solid rgba(255,255,255,0.2)',
                fontWeight: 600,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              <span>🌐</span>
              <span>Manual Lat/Lon</span>
            </button>
          </div>
        </div>

        {/* MANUAL COORDINATES INPUT PANEL (IF TOGGLED) */}
        {isManualCoordsOpen && (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            padding: 20,
            border: '1px solid #E5E7EB',
            marginBottom: 20,
          }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1B4332', margin: '0 0 12px' }}>
              🌐 Enter Exact Geographic Coordinates
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>
                  Location Label
                </label>
                <input
                  type="text"
                  value={manualCityName}
                  onChange={(e) => setManualCityName(e.target.value)}
                  placeholder="e.g. My Town / Village"
                  style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB' }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>
                  Latitude (° N/S)
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={manualLat}
                  onChange={(e) => setManualLat(Number(e.target.value))}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB' }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: 4 }}>
                  Longitude (° E/W)
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={manualLon}
                  onChange={(e) => setManualLon(Number(e.target.value))}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #D1D5DB' }}
                />
              </div>
            </div>
            <button
              onClick={handleApplyManualCoords}
              style={{
                padding: '8px 18px',
                borderRadius: 8,
                backgroundColor: '#1B4332',
                color: '#FFF',
                border: 'none',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              Apply Exact Coordinates
            </button>
          </div>
        )}

        {/* FIQH CONTROLS BAR: MADHHAB & METHOD */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          padding: 20,
          border: '1px solid #E5E7EB',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
          marginBottom: 24,
        }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
              ASR JURISPRUDENCE (MADHHAB)
            </label>
            <select
              value={madhhab}
              onChange={(e) => setMadhhab(e.target.value as MadhhabAsr)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 8,
                border: '1px solid #D1D5DB',
                fontSize: 14,
                backgroundColor: '#F9FAFB',
              }}
            >
              <option value="HANAFI">Hanafi (Mislayn — 2x Shadow Ratio)</option>
              <option value="STANDARD_JUMHUR">Jumhur: Shafi'i / Maliki / Hanbali (1x Shadow)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
              CALCULATION METHOD
            </label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as CalculationMethod)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 8,
                border: '1px solid #D1D5DB',
                fontSize: 14,
                backgroundColor: '#F9FAFB',
              }}
            >
              <option value="KARACHI">Indian Subcontinent Standard (Fajr 18° / Isha 18°)</option>
              <option value="UMM_AL_QURA">Umm al-Qura, Makkah (Fajr 18.5° / Isha 90 min)</option>
              <option value="MWL">Muslim World League (Fajr 18° / Isha 17°)</option>
              <option value="EGYPTIAN">Egyptian Survey Authority (Fajr 19.5° / Isha 17.5°)</option>
              <option value="ISNA">ISNA — North America (Fajr 15° / Isha 15°)</option>
              <option value="TEHRAN">Institute of Geophysics, Tehran (17.7° / 14°)</option>
            </select>
          </div>
        </div>

        {/* Grid: Prayer Schedule & Qibla Compass */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          {/* Prayer Schedule Cards */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 24, border: '1px solid #E5E7EB' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1B4332', margin: 0 }}>
                Daily Auqat-e-Namaz ({prayerTimes.date})
              </h2>
              <span style={{ fontSize: 12, color: '#6B7280' }}>
                {selectedCity.name}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {prayerList.map((p) => {
                const isNext = nextPrayer?.key === p.key;
                return (
                  <div
                    key={p.key}
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
                            <span style={{
                              fontSize: 10,
                              fontWeight: 800,
                              backgroundColor: '#059669',
                              color: '#FFFFFF',
                              padding: '2px 8px',
                              borderRadius: 12,
                              letterSpacing: 0.3,
                            }}>
                              اگلی نماز · {nextPrayer.formattedCountdownEnglish}
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>
                          {p.nameArabic} • {p.nameUrdu}
                        </div>
                      </div>
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: isNext ? '#065F46' : '#1B4332' }}>
                      {p.time}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Night Prayers */}
            <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: 12, color: '#6B7280', display: 'block' }}>Islamic Midnight</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#374151' }}>{prayerTimes.midnight}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 12, color: '#6B7280', display: 'block' }}>Tahajjud (Last 1/3)</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#15803D' }}>{prayerTimes.qiyamThird}</span>
              </div>
            </div>
          </div>

          {/* Qibla Direction Compass Card */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 24, border: '1px solid #E5E7EB', textAlign: 'center' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1B4332', marginBottom: 8 }}>
              Qibla Azimuth & Compass
            </h2>
            <p style={{ color: '#6B7280', fontSize: 13, marginBottom: 20 }}>
              Great circle heading towards the Kaaba (Makkah al-Mukarramah) from {selectedCity.name}
            </p>

            {/* Compass Visualization */}
            <div style={{
              width: 180,
              height: 180,
              borderRadius: '50%',
              margin: '0 auto 20px',
              border: '4px solid #1B4332',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#F0FDF4',
              boxShadow: '0 4px 12px rgba(27,67,50,0.1)',
            }}>
              <span style={{ position: 'absolute', top: 6, fontWeight: 800, fontSize: 12, color: '#1B4332' }}>N</span>
              <span style={{ position: 'absolute', bottom: 6, fontWeight: 800, fontSize: 12, color: '#1B4332' }}>S</span>
              <span style={{ position: 'absolute', left: 8, fontWeight: 800, fontSize: 12, color: '#1B4332' }}>W</span>
              <span style={{ position: 'absolute', right: 8, fontWeight: 800, fontSize: 12, color: '#1B4332' }}>E</span>

              {/* Needle pointing to Qibla bearing */}
              <div
                style={{
                  width: 4,
                  height: 120,
                  position: 'absolute',
                  transform: `rotate(${qibla.bearingDegrees}deg)`,
                  transition: 'transform 0.5s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div style={{ width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderBottom: '16px solid #DC2626' }} />
                <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#1B4332' }} />
                <div style={{ width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '16px solid #64748B' }} />
              </div>
            </div>

            <div style={{ fontSize: 28, fontWeight: 800, color: '#1B4332' }}>
              {qibla.bearingDegrees}°
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#4B5563', marginTop: 4 }}>
              Heading: {qibla.compassDirection}
            </div>
            <div style={{ fontSize: 12, color: '#6B7280', marginTop: 12, padding: '8px 12px', backgroundColor: '#F9FAFB', borderRadius: 8 }}>
              Distance to Holy Kaaba: <strong>{qibla.distanceKm.toLocaleString()} km</strong>
            </div>
          </div>
        </div>

        {/* LOCAL MOSQUE IQAMAH SYNC & JANAZAH SECTION */}
        <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          {/* Mosque Iqamah Schedule */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            padding: 24,
            border: '1px solid #E5E7EB',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#15803D', letterSpacing: 1, textTransform: 'uppercase' }}>
                  CONGREGATIONAL SYNC
                </span>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: '#1B4332', margin: '2px 0 0' }}>
                  🕌 Local Mosque Iqamah Schedule
                </h3>
              </div>
              <span style={{ fontSize: 11, backgroundColor: '#ECFDF5', color: '#065F46', padding: '3px 8px', borderRadius: 10, fontWeight: 700 }}>
                Synced
              </span>
            </div>

            <p style={{ fontSize: 13, color: '#4B5563', margin: '0 0 16px' }}>
              Punctuality for Takbir al-Ula in Jam'ah:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {(() => {
                const schedule = mosqueIqamahSyncEngine.computeSynchronizedSchedule({
                  fajr: prayerTimes.fajr,
                  dhuhr: prayerTimes.dhuhr,
                  asr: prayerTimes.asr,
                  maghrib: prayerTimes.maghrib,
                  isha: prayerTimes.isha,
                });
                return [
                  { prayer: 'Fajr', adhanTime: schedule.fajr.adhan, iqamahTime: schedule.fajr.iqamah },
                  { prayer: 'Dhuhr', adhanTime: schedule.dhuhr.adhan, iqamahTime: schedule.dhuhr.iqamah },
                  { prayer: 'Asr', adhanTime: schedule.asr.adhan, iqamahTime: schedule.asr.iqamah },
                  { prayer: 'Maghrib', adhanTime: schedule.maghrib.adhan, iqamahTime: schedule.maghrib.iqamah },
                  { prayer: 'Isha', adhanTime: schedule.isha.adhan, iqamahTime: schedule.isha.iqamah },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '8px 12px',
                      borderRadius: 8,
                      backgroundColor: '#F9FAFB',
                      border: '1px solid #F3F4F6',
                      fontSize: 13,
                    }}
                  >
                    <span style={{ fontWeight: 700, color: '#111827' }}>{item.prayer}</span>
                    <div style={{ display: 'flex', gap: 14, color: '#4B5563' }}>
                      <span>Adhan: <strong>{item.adhanTime}</strong></span>
                      <span style={{ color: '#047857' }}>Iqamah: <strong>{item.iqamahTime}</strong></span>
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>

          {/* Janazah Announcements */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            padding: 24,
            border: '1px solid #E5E7EB',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#92400E', letterSpacing: 1, textTransform: 'uppercase' }}>
                  FARD KIFAYAH NOTICE
                </span>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: '#92400E', margin: '2px 0 0' }}>
                  🕊️ Community Janazah Notices
                </h3>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {mosqueIqamahSyncEngine.computeSynchronizedSchedule({
                fajr: prayerTimes.fajr,
                dhuhr: prayerTimes.dhuhr,
                asr: prayerTimes.asr,
                maghrib: prayerTimes.maghrib,
                isha: prayerTimes.isha,
              }).janazahAlerts.map((notice, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: 14,
                    borderRadius: 10,
                    backgroundColor: '#FFFBEB',
                    border: '1px solid #FDE68A',
                  }}
                >
                  <div style={{ fontWeight: 800, color: '#92400E', fontSize: 14 }}>
                    {notice.title}
                  </div>
                  <div style={{ fontSize: 12, color: '#78350F', marginTop: 4, lineHeight: 1.5 }}>
                    📍 <strong>Location:</strong> {notice.details} <br />
                    ⏰ <strong>Time:</strong> {notice.time || notice.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* FULL WORLDWIDE CITY SEARCH MODAL */}
      {isSearchOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(4px)',
            zIndex: 10005,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            style={{
              width: '92%',
              maxWidth: 620,
              backgroundColor: '#FFFFFF',
              borderRadius: 20,
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              padding: 28,
              border: '1px solid #E2E8F0',
              maxHeight: '85vh',
              overflowY: 'auto',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1B4332', margin: 0 }}>
                  🌍 Select or Search Any City in the World
                </h2>
                <p style={{ fontSize: 12, color: '#64748B', margin: '4px 0 0' }}>
                  Choose from 100+ preset global cities or type any town or village worldwide.
                </p>
              </div>
              <button
                onClick={() => setIsSearchOpen(false)}
                style={{ background: 'transparent', border: 'none', fontSize: 20, cursor: 'pointer', color: '#94A3B8' }}
              >
                ✕
              </button>
            </div>

            {/* Search Input */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
              <input
                type="text"
                autoFocus
                value={citySearchQuery}
                onChange={(e) => setCitySearchQuery(e.target.value)}
                placeholder="Type city name (e.g. Delhi, Lucknow, Hyderabad, London, Dubai)..."
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: 10,
                  border: '2px solid #1B4332',
                  fontSize: 14,
                  outline: 'none',
                }}
              />
              <button
                onClick={handleSearchWorldMap}
                disabled={isGeocoding || !citySearchQuery.trim()}
                style={{
                  padding: '12px 18px',
                  borderRadius: 10,
                  backgroundColor: '#1B4332',
                  color: '#FFFFFF',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {isGeocoding ? 'Searching...' : 'Search Map ↗'}
              </button>
            </div>

            {/* Quick GPS Button */}
            <div style={{ marginBottom: 16 }}>
              <button
                onClick={handleUseGPS}
                style={{
                  width: '100%',
                  padding: 10,
                  borderRadius: 8,
                  backgroundColor: '#ECFDF5',
                  color: '#065F46',
                  border: '1px solid #A7F3D0',
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                <span>📍</span>
                <span>Auto-Detect My GPS Location Right Now</span>
              </button>
            </div>

            {/* Online OpenStreetMap Geocoded Results (if any) */}
            {externalResults.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#047857', marginBottom: 8 }}>
                  WORLD MAP GEOCODING RESULTS:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {externalResults.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        const newCity: GlobalCity = {
                          name: item.name || item.display_name.split(',')[0],
                          country: item.display_name.split(',').pop()?.trim() || 'Worldwide',
                          region: 'Geocoded Map',
                          lat: Number(parseFloat(item.lat).toFixed(4)),
                          lon: Number(parseFloat(item.lon).toFixed(4)),
                          defaultMethod: method,
                        };
                        handleSelectCity(newCity);
                      }}
                      style={{
                        padding: '10px 14px',
                        borderRadius: 8,
                        backgroundColor: '#F0FDF4',
                        border: '1px solid #86EFAC',
                        cursor: 'pointer',
                        fontSize: 13,
                      }}
                    >
                      <div style={{ fontWeight: 700, color: '#166534' }}>{item.display_name}</div>
                      <div style={{ fontSize: 11, color: '#4B5563', marginTop: 2 }}>
                        Coordinates: {parseFloat(item.lat).toFixed(4)}° N, {parseFloat(item.lon).toFixed(4)}° E
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Preset Global Cities List */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
                <span>PRESET GLOBAL CITIES ({filteredPresetCities.length})</span>
                {citySearchQuery && <span>Matching "{citySearchQuery}"</span>}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 360, overflowY: 'auto' }}>
                {filteredPresetCities.map((c, idx) => {
                  const isSelected = selectedCity.name === c.name;
                  return (
                    <div
                      key={idx}
                      onClick={() => handleSelectCity(c)}
                      style={{
                        padding: '10px 14px',
                        borderRadius: 8,
                        backgroundColor: isSelected ? '#ECFDF5' : '#F8FAFC',
                        border: isSelected ? '2px solid #10B981' : '1px solid #E2E8F0',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'all 0.1s ease',
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 700, color: '#1E293B', fontSize: 14 }}>
                          {c.name}
                        </div>
                        <div style={{ fontSize: 11, color: '#64748B' }}>
                          {c.country} • {c.region}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: 11, color: '#94A3B8', fontFamily: 'monospace' }}>
                          {c.lat.toFixed(2)}°, {c.lon.toFixed(2)}°
                        </span>
                        {isSelected && (
                          <div style={{ fontSize: 11, color: '#059669', fontWeight: 800 }}>✓ SELECTED</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
