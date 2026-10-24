import React, { useState, useMemo, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Navigation } from '../components/Navigation';
import { AmalTheme } from '@amal/ui';
import { prayerQiblaEngine, MadhhabAsr, CalculationMethod, mosqueIqamahSyncEngine } from '@amal/amal-engine';
import { GLOBAL_CITIES, GlobalCity, searchGlobalCities } from '../lib/global-locations';
import { showAmalToast } from '../components/Toast';
import {
  getLiveNextPrayer,
  getSavedOffsets,
  applyOffsets,
  calculateMakroohTimes,
  detectDefaultCityFromTimezone,
  getSavedMosqueSettings,
  saveMosqueSettings,
  LocalMosqueSettings,
} from '../lib/prayer-utils';
import {
  getSavedAzaanSettings,
  saveAzaanSettings,
  playAzaanAudio,
  AzaanSettings,
  AzaanSoundType,
} from '../lib/azaan-audio';
import { PrayerOffsetsModal } from '../components/prayer/PrayerOffsetsModal';
import { MosqueIqamahModal } from '../components/prayer/MosqueIqamahModal';
import { CitySearchModal } from '../components/prayer/CitySearchModal';
import { TahajjudSmartHub } from '../components/prayer/TahajjudSmartHub';
import { computeMultiFiqhReport } from '../lib/prayer-precision-engine';
import { MultiFiqhPrecisionModal } from '../components/prayer/MultiFiqhPrecisionModal';
import { useLanguage } from '../context/LanguageContext';

export default function PrayerTimesPage() {
  const { t, isUrdu } = useLanguage();
  // Default to Delhi / New Delhi or auto-detected timezone city
  const [selectedCity, setSelectedCity] = useState<GlobalCity>(() => {
    return detectDefaultCityFromTimezone();
  });
  const [madhhab, setMadhhab] = useState<MadhhabAsr>('HANAFI');
  const [method, setMethod] = useState<CalculationMethod>('KARACHI');

  // Minute offsets for local masjid calibration (+/- min)
  const [offsets, setOffsets] = useState<Record<string, number>>({ fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 });
  const [isOffsetsModalOpen, setIsOffsetsModalOpen] = useState(false);
  const [isPrecisionModalOpen, setIsPrecisionModalOpen] = useState(false);

  // Multi-Fiqh Precision Astronomical Report
  const precisionReport = useMemo(() => {
    return computeMultiFiqhReport(selectedCity.name, selectedCity.lat, selectedCity.lon);
  }, [selectedCity]);

  // Azaan Audio & Push Notification State
  const [azaanSettings, setAzaanSettings] = useState<AzaanSettings>(() => getSavedAzaanSettings());
  const [isPlayingAzaan, setIsPlayingAzaan] = useState(false);

  // Local Mosque Profile State
  const [mosqueSettings, setMosqueSettings] = useState<LocalMosqueSettings>(() => getSavedMosqueSettings());
  const [isMosqueModalOpen, setIsMosqueModalOpen] = useState(false);
  const [editMosqueName, setEditMosqueName] = useState('Mohalla Jamia Masjid');
  const [editIqamahOffsets, setEditIqamahOffsets] = useState({
    fajr: 25,
    dhuhr: 30,
    asr: 20,
    maghrib: 7,
    isha: 30,
    jumuah: '13:30',
  });

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

  // Load saved location & preferences on mount, or auto-detect via GPS/Timezone
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('amal_user_location');
      const savedMadhhab = localStorage.getItem('amal_user_madhhab');
      const savedMethod = localStorage.getItem('amal_user_method');
      const savedOffsets = localStorage.getItem('amal_user_prayer_offsets');

      if (savedMadhhab === 'HANAFI' || savedMadhhab === 'STANDARD_JUMHUR') {
        setMadhhab(savedMadhhab);
      }
      if (savedMethod) {
        setMethod(savedMethod as CalculationMethod);
      }
      if (savedOffsets) {
        try {
          setOffsets(JSON.parse(savedOffsets));
        } catch (_) {}
      }

      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setSelectedCity(parsed);
          setManualLat(parsed.lat);
          setManualLon(parsed.lon);
          setManualCityName(parsed.name);
          if (parsed.defaultMethod && !savedMethod) setMethod(parsed.defaultMethod);
        } catch (_) {}
      } else {
        // First visit: Auto-detect based on user's timezone!
        const autoCity = detectDefaultCityFromTimezone();
        setSelectedCity(autoCity);
        setManualLat(autoCity.lat);
        setManualLon(autoCity.lon);
        setManualCityName(autoCity.name);
        if (autoCity.defaultMethod && !savedMethod) setMethod(autoCity.defaultMethod);

        // Also attempt non-blocking GPS detection if permission is already allowed
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              const lat = Number(pos.coords.latitude.toFixed(4));
              const lon = Number(pos.coords.longitude.toFixed(4));
              const gpsCity: GlobalCity = {
                name: 'Auto-Detected GPS Location',
                country: autoCity.country,
                region: 'Live GPS',
                lat,
                lon,
                defaultMethod: autoCity.defaultMethod || 'KARACHI',
              };
              handleSelectCity(gpsCity);
            },
            () => {},
            { timeout: 4000 }
          );
        }
      }
    }
  }, []);

  const handleSelectCity = (city: GlobalCity) => {
    setSelectedCity(city);
    setManualLat(city.lat);
    setManualLon(city.lon);
    setManualCityName(city.name);
    if (city.defaultMethod) {
      setMethod(city.defaultMethod);
      if (typeof window !== 'undefined') {
        localStorage.setItem('amal_user_method', city.defaultMethod);
      }
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('amal_user_location', JSON.stringify(city));
      window.dispatchEvent(new Event('amal_prayer_settings_changed'));
    }
    setIsSearchOpen(false);
    setCitySearchQuery('');
    setExternalResults([]);
    showAmalToast(`Location updated to ${city.name}, ${city.country}`, 'success');
  };

  const handleMadhhabChange = (newMadhhab: MadhhabAsr) => {
    setMadhhab(newMadhhab);
    if (typeof window !== 'undefined') {
      localStorage.setItem('amal_user_madhhab', newMadhhab);
      window.dispatchEvent(new Event('amal_prayer_settings_changed'));
    }
    showAmalToast(`Asr calculation: ${newMadhhab === 'HANAFI' ? 'Hanafi (Mislayn 2x Shadow)' : "Jumhur: Shafi'i/Maliki/Hanbali (1x Shadow)"}`, 'info');
  };

  const handleMethodChange = (newMethod: CalculationMethod) => {
    setMethod(newMethod);
    if (typeof window !== 'undefined') {
      localStorage.setItem('amal_user_method', newMethod);
      window.dispatchEvent(new Event('amal_prayer_settings_changed'));
    }
    showAmalToast(`Calculation Method: ${newMethod}`, 'info');
  };

  const handleUpdateOffset = (prayerKey: string, delta: number) => {
    const updated = { ...offsets, [prayerKey]: (offsets[prayerKey] || 0) + delta };
    setOffsets(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('amal_user_prayer_offsets', JSON.stringify(updated));
      window.dispatchEvent(new Event('amal_prayer_settings_changed'));
    }
  };

  const handleResetOffsets = () => {
    const zero = { fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 };
    setOffsets(zero);
    if (typeof window !== 'undefined') {
      localStorage.setItem('amal_user_prayer_offsets', JSON.stringify(zero));
      window.dispatchEvent(new Event('amal_prayer_settings_changed'));
    }
    showAmalToast('Minute offsets reset to astronomical default', 'info');
  };

  const handleToggleAzaan = () => {
    const updated = { ...azaanSettings, enabled: !azaanSettings.enabled };
    setAzaanSettings(updated);
    saveAzaanSettings(updated);
    showAmalToast(updated.enabled ? 'Azaan audio alerts enabled 🔊' : 'Azaan audio muted 🔇', 'info');
  };

  const handleTestPlayAzaan = () => {
    setIsPlayingAzaan(true);
    playAzaanAudio(azaanSettings.soundType, azaanSettings.volume);
    showAmalToast(`Playing preview: ${azaanSettings.soundType}`, 'info');
    setTimeout(() => setIsPlayingAzaan(false), 5500);
  };

  const handleSoundTypeChange = (soundType: AzaanSoundType) => {
    const updated = { ...azaanSettings, soundType };
    setAzaanSettings(updated);
    saveAzaanSettings(updated);
    playAzaanAudio(soundType, azaanSettings.volume);
    showAmalToast(`Azaan tone set to: ${soundType}`, 'info');
  };

  const handleRequestBrowserNotification = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      showAmalToast('Notifications not supported in this browser', 'warning');
      return;
    }
    const perm = await Notification.requestPermission();
    if (perm === 'granted') {
      const updated = { ...azaanSettings, notificationsEnabled: true };
      setAzaanSettings(updated);
      saveAzaanSettings(updated);
      showAmalToast('Browser Prayer notifications enabled successfully! 🔔', 'success');
      new Notification('AMAL OS — Azaan Alerts Active', {
        body: 'You will receive timely alerts for each Salah.',
        icon: '/favicon.ico',
      });
    } else {
      showAmalToast('Notification permission was dismissed or blocked.', 'warning');
    }
  };

  const handleSaveMosque = () => {
    const updated: LocalMosqueSettings = {
      name: editMosqueName.trim() || 'Mohalla Jamia Masjid',
      iqamahOffsets: editIqamahOffsets,
    };
    setMosqueSettings(updated);
    saveMosqueSettings(updated);
    setIsMosqueModalOpen(false);
    showAmalToast(`Local Mosque updated to: ${updated.name}`, 'success');
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

  const rawPrayerTimes = useMemo(() => {
    return prayerQiblaEngine.calculatePrayerTimes(
      { latitude: selectedCity.lat, longitude: selectedCity.lon },
      now,
      madhhab,
      method
    );
  }, [selectedCity, madhhab, method, now]);

  const prayerTimes = useMemo(() => {
    return applyOffsets(rawPrayerTimes, offsets);
  }, [rawPrayerTimes, offsets]);

  const makroohTimes = useMemo(() => {
    return calculateMakroohTimes(prayerTimes.sunrise, prayerTimes.dhuhr, prayerTimes.maghrib);
  }, [prayerTimes]);

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
              onClick={() => setIsOffsetsModalOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 14px',
                borderRadius: 8,
                backgroundColor: Object.values(offsets).some((v) => v !== 0) ? '#D97706' : 'rgba(255,255,255,0.15)',
                color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.25)',
                fontWeight: 600,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              <span>⚙️</span>
              <span>{Object.values(offsets).some((v) => v !== 0) ? 'Calibrated (± Min)' : 'Calibrate / ± Minutes'}</span>
            </button>

            <button
              onClick={() => setIsPrecisionModalOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 14px',
                borderRadius: 8,
                backgroundColor: '#047857',
                color: '#FFFFFF',
                border: '1px solid #10B981',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
              }}
              title={isUrdu ? 'فقہی و فلکیاتی موازنہ دیکھیں' : 'Compare 5 Global Fiqh Authorities & Asr Shadow Rules'}
            >
              <span>🔭</span>
              <span>{isUrdu ? 'فقہی و فلکیاتی تحقیق' : 'Multi-Fiqh Verifier'}</span>
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

        {/* AUDIO AZAAN & BROWSER ALERT NOTIFICATIONS */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          padding: '16px 20px',
          border: '1px solid #E5E7EB',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
          marginBottom: 20,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 26 }}>📢</span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontWeight: 800, color: '#1B4332', fontSize: 15 }}>
                  {t('Azaan Audio & Prayer Alerts', 'اذان آڈیو و الرٹس')}
                </span>
                <span style={{
                  fontSize: 10,
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: 10,
                  backgroundColor: azaanSettings.enabled ? '#DCFCE7' : '#F1F5F9',
                  color: azaanSettings.enabled ? '#166534' : '#64748B',
                }}>
                  {azaanSettings.enabled ? 'ACTIVE 🔊' : 'MUTED 🔇'}
                </span>
              </div>
              <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>
                Web Audio synthesizer generates sacred Bayati melodic call when each Salah enters.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <select
              value={azaanSettings.soundType}
              onChange={(e) => handleSoundTypeChange(e.target.value as AzaanSoundType)}
              style={{
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid #D1D5DB',
                fontSize: 13,
                backgroundColor: '#F9FAFB',
                fontWeight: 600,
              }}
            >
              <option value="BAYATI_CALL">{t('Maqam Bayati Sacred Call', 'مقام بیاتی اذان')}</option>
              <option value="MECCA_TONE">Haram Makkah Reverberant Tone</option>
              <option value="TAKBEER_CHIME">Gentle 3-Tone Takbeer Chime</option>
            </select>

            <button
              onClick={handleTestPlayAzaan}
              disabled={isPlayingAzaan}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 14px',
                borderRadius: 8,
                backgroundColor: '#ECFDF5',
                color: '#047857',
                border: '1px solid #A7F3D0',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              <span>{isPlayingAzaan ? '⏳' : '▶'}</span>
              <span>{isPlayingAzaan ? 'Playing...' : 'Test Sound'}</span>
            </button>

            <button
              onClick={handleToggleAzaan}
              style={{
                padding: '8px 14px',
                borderRadius: 8,
                backgroundColor: azaanSettings.enabled ? '#FEF2F2' : '#F0FDF4',
                color: azaanSettings.enabled ? '#B91C1C' : '#15803D',
                border: azaanSettings.enabled ? '1px solid #FECACA' : '1px solid #BBF7D0',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              {azaanSettings.enabled ? 'Mute' : 'Enable Audio'}
            </button>

            <button
              onClick={handleRequestBrowserNotification}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 14px',
                borderRadius: 8,
                backgroundColor: '#1B4332',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              <span>🔔</span>
              <span>Push Alerts</span>
            </button>
          </div>
        </div>

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
              onChange={(e) => handleMadhhabChange(e.target.value as MadhhabAsr)}
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
              onChange={(e) => handleMethodChange(e.target.value as CalculationMethod)}
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
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
                            <span suppressHydrationWarning style={{
                              fontSize: 10,
                              fontWeight: 800,
                              backgroundColor: '#059669',
                              color: '#FFFFFF',
                              padding: '2px 8px',
                              borderRadius: 12,
                              letterSpacing: 0.3,
                            }}>
                              {t('Next Prayer', 'اگلی نماز')} · {nextPrayer.formattedCountdownEnglish}
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>
                          {p.nameArabic} • {isUrdu ? p.nameUrdu : p.name}
                        </div>
                      </div>
                    </div>
                    <div suppressHydrationWarning style={{ fontSize: 18, fontWeight: 800, color: isNext ? '#065F46' : '#1B4332' }}>
                      {p.time}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Night Prayers */}
            <div suppressHydrationWarning style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: 12, color: '#6B7280', display: 'block' }}>Islamic Midnight</span>
                <span suppressHydrationWarning style={{ fontSize: 14, fontWeight: 700, color: '#374151' }}>{prayerTimes.midnight}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 12, color: '#6B7280', display: 'block' }}>Tahajjud (Last 1/3)</span>
                <span suppressHydrationWarning style={{ fontSize: 14, fontWeight: 700, color: '#15803D' }}>{prayerTimes.qiyamThird}</span>
              </div>
            </div>

            {/* FASTING & ROZA TIMINGS */}
            <div style={{
              marginTop: 16,
              padding: '12px 16px',
              borderRadius: 10,
              backgroundColor: '#ECFDF5',
              border: '1px solid #A7F3D0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#065F46', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  {t('🌙 Imsak / Sehri Cutoff (Precautionary)', '🌙 سحری کا احتیاطی وقت')}
                </span>
                <div style={{ fontSize: 15, fontWeight: 800, color: '#065F46', marginTop: 2 }}>
                  {(() => {
                    const parts = (prayerTimes.fajr || '05:00').split(':').map(Number);
                    const h = parts[0] ?? 5;
                    const m = parts[1] ?? 0;
                    const total = h * 60 + m - 3; // 3-minute Ihtiyat buffer before Subh Sadiq
                    const newH = Math.floor((total < 0 ? total + 1440 : total) / 60) % 24;
                    const newM = (total < 0 ? total + 1440 : total) % 60;
                    return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;
                  })()}
                  <span style={{ fontSize: 11, fontWeight: 500, color: '#047857', marginLeft: 6 }}>
                    {t('(3m buffer before Fajr)', '(فجر سے ۳ منٹ قبل)')}
                  </span>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#92400E', textTransform: 'uppercase', letterSpacing: 0.5 }}>
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
            <div style={{
              marginTop: 18,
              padding: '12px 14px',
              borderRadius: 10,
              backgroundColor: '#FEF2F2',
              border: '1px solid #FCA5A5',
            }}>
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
              <div style={{ fontSize: 11, color: '#B91C1C', marginTop: 8, fontStyle: 'italic', borderTop: '1px dashed #FECACA', paddingTop: 6 }}>
                {t(
                  '* Voluntary, missed prayers (Qada), Sajdah Tilawat, and Janazah are strictly prohibited during these windows (Mukhtasar al-Quduri & Fatawa Razawiyya).',
                  '* ان اوقات میں نفل، قضا، سجدۂ تلاوت اور نمازِ جنازہ پڑھنا مکروہِ تحریمی ہے (القدوری و فتاویٰ رضویہ)۔'
                )}
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

        {/* TAHAJJUD & SACRED LAST THIRD OF NIGHT (SULUS AL-AKHIR) SMART HUB */}
        <TahajjudSmartHub
          maghribTime={prayerTimes.maghrib}
          fajrTime={prayerTimes.fajr}
          qiyamThirdTime={prayerTimes.qiyamThird}
          midnightTime={prayerTimes.midnight}
          cityName={selectedCity.name}
        />

        {/* LOCAL MOSQUE IQAMAH SYNC & JANAZAH SECTION */}
        <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
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
                  🕌 {mosqueSettings.name}
                </h3>
              </div>
              <button
                onClick={() => {
                  setEditMosqueName(mosqueSettings.name);
                  setEditIqamahOffsets({ ...mosqueSettings.iqamahOffsets });
                  setIsMosqueModalOpen(true);
                }}
                style={{
                  fontSize: 12,
                  backgroundColor: '#ECFDF5',
                  color: '#065F46',
                  border: '1px solid #A7F3D0',
                  padding: '6px 12px',
                  borderRadius: 8,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <span>✏️</span>
                <span>{t('Customize Mosque', 'مسجد کی ترتیبات')}</span>
              </button>
            </div>

            <p style={{ fontSize: 13, color: '#4B5563', margin: '0 0 16px' }}>
              Real-life Jama'at & Iqamah times calibrated to your Mohalla mosque:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {(() => {
                const addMins = (timeStr: string, mins: number) => {
                  const parts = (timeStr || '00:00').split(':').map(Number);
                  const h = parts[0] ?? 0;
                  const m = parts[1] ?? 0;
                  const total = h * 60 + m + mins;
                  const newH = Math.floor(total / 60) % 24;
                  const newM = total % 60;
                  return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;
                };

                const prayerList = [
                  { prayer: 'Fajr', adhanTime: prayerTimes.fajr, iqamahTime: addMins(prayerTimes.fajr, mosqueSettings.iqamahOffsets.fajr), offset: `+${mosqueSettings.iqamahOffsets.fajr}m` },
                  { prayer: 'Dhuhr', adhanTime: prayerTimes.dhuhr, iqamahTime: addMins(prayerTimes.dhuhr, mosqueSettings.iqamahOffsets.dhuhr), offset: `+${mosqueSettings.iqamahOffsets.dhuhr}m` },
                  { prayer: 'Asr', adhanTime: prayerTimes.asr, iqamahTime: addMins(prayerTimes.asr, mosqueSettings.iqamahOffsets.asr), offset: `+${mosqueSettings.iqamahOffsets.asr}m` },
                  { prayer: 'Maghrib', adhanTime: prayerTimes.maghrib, iqamahTime: addMins(prayerTimes.maghrib, mosqueSettings.iqamahOffsets.maghrib), offset: `+${mosqueSettings.iqamahOffsets.maghrib}m` },
                  { prayer: 'Isha', adhanTime: prayerTimes.isha, iqamahTime: addMins(prayerTimes.isha, mosqueSettings.iqamahOffsets.isha), offset: `+${mosqueSettings.iqamahOffsets.isha}m` },
                  { prayer: "Jumu'ah", adhanTime: prayerTimes.dhuhr, iqamahTime: mosqueSettings.iqamahOffsets.jumuah || '13:30', offset: 'Fixed' },
                ];

                return prayerList.map((item, idx) => (
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
                    <div style={{ display: 'flex', gap: 14, color: '#4B5563', alignItems: 'center' }}>
                      <span style={{ fontSize: 12 }}>Adhan: <strong>{item.adhanTime}</strong></span>
                      <span style={{ color: '#047857', fontWeight: 700 }}>
                        Iqamah: <strong>{item.iqamahTime}</strong>
                        <span style={{ fontSize: 10, color: '#6B7280', marginLeft: 4 }}>({item.offset})</span>
                      </span>
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

        {/* EDUCATIONAL & FIQHI GUIDE: WHY PRAYER TIMES DIFFER */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          padding: 24,
          border: '1px solid #E5E7EB',
          marginTop: 24,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span style={{ fontSize: 22 }}>📖</span>
            <h3 style={{ fontSize: 17, fontWeight: 800, color: '#1B4332', margin: 0 }}>
              {t('Why Prayer Timings Differ Across Calendars', 'نماز کے اوقات میں فرق کیوں ہوتا ہے؟')}
            </h3>
          </div>
          <p style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.6, marginBottom: 16 }}>
            {t(
              'If you notice a difference of a few minutes or Asr timing between this app and your local mosque timetable, it stems from four valid jurisprudential and astronomical factors:',
              'اگر آپ کو اپنی مسجد کے نقشۂ اوقات اور اس ایپ کے اوقات میں چند منٹ یا عصر کے وقت میں فرق محسوس ہو، تو اس کی بنیادی ۴ شرعی و فلکیاتی وجوہات درج ذیل ہیں:'
            )}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            <div style={{ backgroundColor: '#F9FAFB', padding: 14, borderRadius: 8, border: '1px solid #E5E7EB' }}>
              <div style={{ fontWeight: 800, color: '#1F2937', fontSize: 14, marginBottom: 4 }}>
                {t('1. Asr Start Time (Hanafi Mithlayn vs Jumhur)', '۱. عصر کا وقت (حنفی مثلین بمقابلہ جمہور مثلِ اول)')}
              </div>
              <p style={{ fontSize: 12, color: '#4B5563', margin: 0, lineHeight: 1.5 }}>
                {t(
                  'The majority of Sunni schools (Shafi\'i, Maliki, Hanbali) mark Asr when an object\'s shadow equals its length (ratio 1:1). In the Hanafi school (authoritative position of Imam Abu Hanifa), Asr begins when the shadow reaches twice its length (ratio 2:1), roughly 50 to 65 minutes later.',
                  'جمہور ائمہ (شافعی، مالکی، حنبلی) کے نزدیک سائے کا ایک گنا ہونا عصر کا وقت ہے، جبکہ امامِ اعظم ابو حنیفہؒ کے معتمد قول پر سایہ دو گنا (مثلین) ہونے پر عصر شروع ہوتی ہے۔ اس لیے حنفی وقت جمہور سے تقریباً ۵۰ تا ۶۵ منٹ بعد ہوتا ہے۔'
                )}
              </p>
            </div>

            <div style={{ backgroundColor: '#F9FAFB', padding: 14, borderRadius: 8, border: '1px solid #E5E7EB' }}>
              <div style={{ fontWeight: 800, color: '#1F2937', fontSize: 14, marginBottom: 4 }}>
                {t('2. Fajr & Isha Calculation Angles', '۲. فجر و عشاء کے زاویے (Calculation Angles)')}
              </div>
              <p style={{ fontSize: 12, color: '#4B5563', margin: 0, lineHeight: 1.5 }}>
                {t(
                  'Subcontinent authorities (Karachi, Deoband, Bareilly) recognize Subh Sadiq at 18 degrees below horizon. North America (ISNA) often utilizes 15 degrees, while Umm al-Qura fixes Isha 90 minutes after Maghrib.',
                  'برصغیر (دیوبند، بریلی، کراچی) میں صبحِ صادق ۱۸ ڈگری پر تسلیم کی جاتی ہے۔ جبکہ مغربی ممالک میں بعض ادارے ۱۵ ڈگری (ISNA) اور سعودی عرب میں فجر ۱۸.۵ ڈگری اور عشاء مغرب کے ۹۰ منٹ بعد شمار کرتے ہیں۔'
                )}
              </p>
            </div>

            <div style={{ backgroundColor: '#F9FAFB', padding: 14, borderRadius: 8, border: '1px solid #E5E7EB' }}>
              <div style={{ fontWeight: 800, color: '#1F2937', fontSize: 14, marginBottom: 4 }}>
                {t('3. Prayer Start Time vs Mosque Jama\'at Time', '۳. دخولِ وقت بمقابلہ جماعت کا وقت (Start vs Jama\'at)')}
              </div>
              <p style={{ fontSize: 12, color: '#4B5563', margin: 0, lineHeight: 1.5 }}>
                {t(
                  'AMAL OS shows the exact astronomical moment when a prayer enters (Dukhul-e-Waqt). Mosques set congregations at round community times (e.g. 1:30 PM or 5:15 PM) for congregation convenience.',
                  'یہ ایپ فلکیاتی اعتبار سے وقت شروع ہونے (دخولِ وقت) کا دقیق منٹ بتاتی ہے، جبکہ مساجد میں اقامت/جماعت کا وقت عام سہولت کے لیے مخصوص گول اوقات (مثلاً ۱:۳۰ یا ۵:۱۵) پر طے کیا جاتا ہے۔'
                )}
              </p>
            </div>

            <div style={{ backgroundColor: '#F9FAFB', padding: 14, borderRadius: 8, border: '1px solid #E5E7EB' }}>
              <div style={{ fontWeight: 800, color: '#1F2937', fontSize: 14, marginBottom: 4 }}>
                {t('4. Local Precautionary Buffers (Ihtiyat)', '۴. احتیاطی منٹس (Local Precautionary Buffers)')}
              </div>
              <p style={{ fontSize: 12, color: '#4B5563', margin: 0, lineHeight: 1.5 }}>
                {t(
                  'Scholars in many cities add 1-3 precautionary minutes to sunset or Fajr for horizon assurance. You can calibrate this easily using the "Calibrate / ± Minutes" button above.',
                  'مختلف شہروں کے علماء افق اور بلندی کے لحاظ سے مغرب یا فجر میں ۱ تا ۳ احتیاطی منٹ شامل کرتے ہیں۔ اگر آپ کی مقامی مسجد میں ایسا ہو تو آپ اوپر دیے گئے بٹن "Calibrate / ± Minutes" سے آسانی سے منٹس سیٹ کر سکتے ہیں۔'
                )}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* 1. MINUTE OFFSETS / LOCAL MASJID CALIBRATION MODAL */}
      <PrayerOffsetsModal
        isOpen={isOffsetsModalOpen}
        onClose={() => setIsOffsetsModalOpen(false)}
        rawPrayerTimes={rawPrayerTimes}
        prayerTimes={prayerTimes}
        offsets={offsets}
        onUpdateOffset={handleUpdateOffset}
        onResetOffsets={handleResetOffsets}
      />

      {/* 2. LOCAL MOSQUE CUSTOMIZATION MODAL */}
      <MosqueIqamahModal
        isOpen={isMosqueModalOpen}
        onClose={() => setIsMosqueModalOpen(false)}
        editMosqueName={editMosqueName}
        setEditMosqueName={setEditMosqueName}
        editIqamahOffsets={editIqamahOffsets}
        setEditIqamahOffsets={setEditIqamahOffsets}
        onSaveMosque={handleSaveMosque}
      />

      {/* 3. CITY & GEOCODING SEARCH MODAL */}
      <CitySearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        citySearchQuery={citySearchQuery}
        setCitySearchQuery={setCitySearchQuery}
        handleSearchWorldMap={handleSearchWorldMap}
        isGeocoding={isGeocoding}
        handleUseGPS={handleUseGPS}
        externalResults={externalResults}
        filteredPresetCities={filteredPresetCities}
        selectedCity={selectedCity}
        handleSelectCity={handleSelectCity}
        method={method}
      />

      {/* 4. MULTI-FIQH & ASTRONOMICAL PRECISION MODAL */}
      <MultiFiqhPrecisionModal
        report={precisionReport}
        isOpen={isPrecisionModalOpen}
        onClose={() => setIsPrecisionModalOpen(false)}
      />
    </div>
  );
}
