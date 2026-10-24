import React, { useState, useMemo, useEffect } from 'react';
import Head from 'next/head';
import { Navigation } from '../components/Navigation';
import { prayerQiblaEngine, MadhhabAsr, CalculationMethod } from '@amal/amal-engine';
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

// Modularized Prayer Subcomponents
import { PrayerActionBar } from '../components/prayer/PrayerActionBar';
import { PrayerManualCoordsPanel } from '../components/prayer/PrayerManualCoordsPanel';
import { PrayerSpiritualPauseBanner } from '../components/prayer/PrayerSpiritualPauseBanner';
import { PrayerAzaanBar } from '../components/prayer/PrayerAzaanBar';
import { PrayerFiqhControls } from '../components/prayer/PrayerFiqhControls';
import { PrayerScheduleCard } from '../components/prayer/PrayerScheduleCard';
import { PrayerQiblaCard } from '../components/prayer/PrayerQiblaCard';
import { PrayerMosqueJanazahSection } from '../components/prayer/PrayerMosqueJanazahSection';
import { PrayerFiqhDifferenceGuide } from '../components/prayer/PrayerFiqhDifferenceGuide';

export default function PrayerTimesPage() {
  const { t, isUrdu } = useLanguage();

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

  // Spiritual Pause Mode (For Sisters during Cycle / Postnatal)
  const [isSpiritualPause, setIsSpiritualPause] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsSpiritualPause(localStorage.getItem('amal_spiritual_pause_mode') === 'true');
    }
  }, []);

  const toggleSpiritualPause = () => {
    const newVal = !isSpiritualPause;
    setIsSpiritualPause(newVal);
    if (typeof window !== 'undefined') {
      localStorage.setItem('amal_spiritual_pause_mode', newVal ? 'true' : 'false');
    }
  };

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

  // Load saved preferences on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const savedCityJson = localStorage.getItem('amal_user_city');
      if (savedCityJson) {
        const parsed = JSON.parse(savedCityJson);
        if (parsed && parsed.name && typeof parsed.lat === 'number') {
          setSelectedCity(parsed);
          setManualCityName(parsed.name);
          setManualLat(parsed.lat);
          setManualLon(parsed.lon);
          if (parsed.defaultMethod) setMethod(parsed.defaultMethod);
        }
      }
    } catch (_) {}

    const savedOffsets = getSavedOffsets();
    setOffsets(savedOffsets);

    const savedMadhhab = localStorage.getItem('amal_user_madhhab') as MadhhabAsr;
    if (savedMadhhab === 'HANAFI' || savedMadhhab === 'STANDARD_JUMHUR') {
      setMadhhab(savedMadhhab);
    }

    const savedMethod = localStorage.getItem('amal_user_calc_method') as CalculationMethod;
    if (savedMethod) {
      setMethod(savedMethod);
    }
  }, []);

  const handleSelectCity = (city: GlobalCity) => {
    setSelectedCity(city);
    setManualCityName(city.name);
    setManualLat(city.lat);
    setManualLon(city.lon);
    if (city.defaultMethod) {
      setMethod(city.defaultMethod);
    }
    setIsSearchOpen(false);

    if (typeof window !== 'undefined') {
      localStorage.setItem('amal_user_city', JSON.stringify(city));
      window.dispatchEvent(new Event('amal_prayer_settings_changed'));
    }
    showAmalToast(`Prayer schedule calibrated to ${city.name}`, 'success');
  };

  const handleMadhhabChange = (newMadhhab: MadhhabAsr) => {
    setMadhhab(newMadhhab);
    if (typeof window !== 'undefined') {
      localStorage.setItem('amal_user_madhhab', newMadhhab);
      window.dispatchEvent(new Event('amal_prayer_settings_changed'));
    }
    showAmalToast(newMadhhab === 'HANAFI' ? 'Asr time set to Hanafi (2x Shadow)' : 'Asr time set to Jumhur (1x Shadow)', 'info');
  };

  const handleMethodChange = (newMethod: CalculationMethod) => {
    setMethod(newMethod);
    if (typeof window !== 'undefined') {
      localStorage.setItem('amal_user_calc_method', newMethod);
      window.dispatchEvent(new Event('amal_prayer_settings_changed'));
    }
    showAmalToast(`Calculation method updated to: ${newMethod}`, 'info');
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

  // Worldwide Online Search
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
        <meta
          name="description"
          content="Worldwide prayer times and Qibla compass for Delhi, Mumbai, Lucknow, Hyderabad, and every city worldwide with precision Hanafi 2x and Subcontinent 18° twilight calculations."
        />
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

        {/* 1. ACTIVE LOCATION STATUS & ACTION BAR */}
        <PrayerActionBar
          selectedCity={selectedCity}
          qibla={qibla}
          handleUseGPS={handleUseGPS}
          isLocating={isLocating}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenOffsets={() => setIsOffsetsModalOpen(true)}
          offsets={offsets}
          onOpenPrecision={() => setIsPrecisionModalOpen(true)}
          isUrdu={isUrdu}
          isSpiritualPause={isSpiritualPause}
          toggleSpiritualPause={toggleSpiritualPause}
          isManualCoordsOpen={isManualCoordsOpen}
          setIsManualCoordsOpen={setIsManualCoordsOpen}
        />

        {/* 2. MANUAL COORDINATES INPUT PANEL (IF TOGGLED) */}
        <PrayerManualCoordsPanel
          isOpen={isManualCoordsOpen}
          manualCityName={manualCityName}
          setManualCityName={setManualCityName}
          manualLat={manualLat}
          setManualLat={setManualLat}
          manualLon={manualLon}
          setManualLon={setManualLon}
          onApplyManualCoords={handleApplyManualCoords}
        />

        {/* 3. SPIRITUAL PAUSE MODE BANNER (FOR SISTERS IN CYCLE) */}
        <PrayerSpiritualPauseBanner
          isSpiritualPause={isSpiritualPause}
          isUrdu={isUrdu}
          toggleSpiritualPause={toggleSpiritualPause}
        />

        {/* 4. AUDIO AZAAN & BROWSER ALERT NOTIFICATIONS */}
        <PrayerAzaanBar
          azaanSettings={azaanSettings}
          isPlayingAzaan={isPlayingAzaan}
          handleSoundTypeChange={handleSoundTypeChange}
          handleTestPlayAzaan={handleTestPlayAzaan}
          handleToggleAzaan={handleToggleAzaan}
          handleRequestBrowserNotification={handleRequestBrowserNotification}
          t={t}
        />

        {/* 5. FIQH CONTROLS BAR: MADHHAB & METHOD */}
        <PrayerFiqhControls
          madhhab={madhhab}
          handleMadhhabChange={handleMadhhabChange}
          method={method}
          handleMethodChange={handleMethodChange}
        />

        {/* 6. Grid: Prayer Schedule & Qibla Compass */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          <PrayerScheduleCard
            prayerList={prayerList}
            prayerTimes={prayerTimes}
            nextPrayer={nextPrayer}
            makroohTimes={makroohTimes}
            selectedCityName={selectedCity.name}
            isUrdu={isUrdu}
            t={t}
          />

          <PrayerQiblaCard
            qibla={qibla}
            selectedCityName={selectedCity.name}
          />
        </div>

        {/* 7. TAHAJJUD & SACRED LAST THIRD OF NIGHT (SULUS AL-AKHIR) SMART HUB */}
        <TahajjudSmartHub
          maghribTime={prayerTimes.maghrib}
          fajrTime={prayerTimes.fajr}
          qiyamThirdTime={prayerTimes.qiyamThird}
          midnightTime={prayerTimes.midnight}
          cityName={selectedCity.name}
        />

        {/* 8. LOCAL MOSQUE IQAMAH SYNC & JANAZAH SECTION */}
        <PrayerMosqueJanazahSection
          mosqueSettings={mosqueSettings}
          prayerTimes={prayerTimes}
          onOpenMosqueModal={() => {
            setEditMosqueName(mosqueSettings.name);
            setEditIqamahOffsets({ ...mosqueSettings.iqamahOffsets });
            setIsMosqueModalOpen(true);
          }}
          t={t}
        />

        {/* 9. EDUCATIONAL & FIQHI GUIDE: WHY PRAYER TIMES DIFFER */}
        <PrayerFiqhDifferenceGuide t={t} />
      </main>

      {/* MODALS */}
      <PrayerOffsetsModal
        isOpen={isOffsetsModalOpen}
        onClose={() => setIsOffsetsModalOpen(false)}
        rawPrayerTimes={rawPrayerTimes}
        prayerTimes={prayerTimes}
        offsets={offsets}
        onUpdateOffset={handleUpdateOffset}
        onResetOffsets={handleResetOffsets}
      />

      <MosqueIqamahModal
        isOpen={isMosqueModalOpen}
        onClose={() => setIsMosqueModalOpen(false)}
        editMosqueName={editMosqueName}
        setEditMosqueName={setEditMosqueName}
        editIqamahOffsets={editIqamahOffsets}
        setEditIqamahOffsets={setEditIqamahOffsets}
        onSaveMosque={handleSaveMosque}
      />

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

      <MultiFiqhPrecisionModal
        report={precisionReport}
        isOpen={isPrecisionModalOpen}
        onClose={() => setIsPrecisionModalOpen(false)}
      />
    </div>
  );
}
