import React from 'react';
import { AmalTheme } from '@amal/ui';

interface SettingsFiqhTabProps {
  madhhab: 'HANAFI' | 'STANDARD_JUMHUR';
  setMadhhab: (m: 'HANAFI' | 'STANDARD_JUMHUR') => void;
  calcMethod: 'KARACHI' | 'MWL' | 'UMM_AL_QURA' | 'EGYPTIAN' | 'ISNA';
  setCalcMethod: (m: 'KARACHI' | 'MWL' | 'UMM_AL_QURA' | 'EGYPTIAN' | 'ISNA') => void;
  hijriOffset: number;
  setHijriOffset: (offset: number) => void;
  athanSound: string;
  setAthanSound: (sound: string) => void;
  offsets: {
    fajr: number;
    sunrise: number;
    dhuhr: number;
    asr: number;
    maghrib: number;
    isha: number;
  };
  setOffsets: React.Dispatch<React.SetStateAction<{
    fajr: number;
    sunrise: number;
    dhuhr: number;
    asr: number;
    maghrib: number;
    isha: number;
  }>>;
  handleSaveFiqh: () => void;
  t: (en: string, ur: string) => string;
}

export function SettingsFiqhTab({
  madhhab,
  setMadhhab,
  calcMethod,
  setCalcMethod,
  hijriOffset,
  setHijriOffset,
  athanSound,
  setAthanSound,
  offsets,
  setOffsets,
  handleSaveFiqh,
  t,
}: SettingsFiqhTabProps) {
  return (
    <div>
      <h2 style={{ margin: '0 0 16px', fontSize: 20, fontWeight: 800, color: '#111827' }}>
        Fiqh & Prayer Auqat Configuration
      </h2>
      <p style={{ margin: '0 0 24px', fontSize: 13, color: '#6B7280' }}>
        Select your school of jurisprudence (Madhhab), calculation authority, and moon-sighting offset.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Madhhab */}
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
            School of Fiqh (فقہی مسلک برائے عصر)
          </label>
          <select
            value={madhhab}
            onChange={(e) => setMadhhab(e.target.value as any)}
            style={{
              width: '100%',
              maxWidth: 420,
              padding: '10px 12px',
              borderRadius: 8,
              border: '1px solid #D1D5DB',
              fontSize: 14,
              backgroundColor: '#F9FAFB',
            }}
          >
            <option value="HANAFI">{t('Hanafi — Mithlayn (Shadow ratio 2:1 for Asr)', 'حنفی — مثلین (عصر کا وقت)')}</option>
            <option value="STANDARD_JUMHUR">{t('Shafi\'i / Maliki / Hanbali — Mithl Awwal (Shadow ratio 1:1)', 'جمہور فقہاء (شافعی، مالکی، حنبلی) — مثلِ اول')}</option>
          </select>
        </div>

        {/* Calculation Method */}
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
            {t('Astronomical Calculation Method', 'فلکیاتی طریقہ حساب')}
          </label>
          <select
            value={calcMethod}
            onChange={(e) => setCalcMethod(e.target.value as any)}
            style={{
              width: '100%',
              maxWidth: 420,
              padding: '10px 12px',
              borderRadius: 8,
              border: '1px solid #D1D5DB',
              fontSize: 14,
              backgroundColor: '#F9FAFB',
            }}
          >
            <option value="KARACHI">University of Islamic Sciences, Karachi (18° Fajr / 18° Isha)</option>
            <option value="MWL">Muslim World League (MWL) (18° Fajr / 17° Isha)</option>
            <option value="UMM_AL_QURA">Umm al-Qura University, Makkah (18.5° Fajr / 90 min Isha)</option>
            <option value="EGYPTIAN">Egyptian General Authority of Survey (19.5° Fajr / 17.5° Isha)</option>
            <option value="ISNA">ISNA — North America (15° Fajr / 15° Isha)</option>
          </select>
        </div>

        {/* Hijri Moon Sight Offset */}
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
            Hijri Moon Sight Offset (رویت ہلال ایڈجسٹمنٹ)
          </label>
          <select
            value={hijriOffset}
            onChange={(e) => setHijriOffset(parseInt(e.target.value, 10))}
            style={{
              width: '100%',
              maxWidth: 420,
              padding: '10px 12px',
              borderRadius: 8,
              border: '1px solid #D1D5DB',
              fontSize: 14,
              backgroundColor: '#F9FAFB',
            }}
          >
            <option value={-2}>-2 Days (Moon sighted later)</option>
            <option value={-1}>-1 Day (Standard subcontinent offset)</option>
            <option value={0}>0 Days (Astronomical default / Umm al-Qura)</option>
            <option value={1}>+1 Day</option>
            <option value={2}>+2 Days</option>
          </select>
        </div>

        {/* Athan Voice */}
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
            Athan Audio Notification (آواز اذان)
          </label>
          <select
            value={athanSound}
            onChange={(e) => setAthanSound(e.target.value)}
            style={{
              width: '100%',
              maxWidth: 420,
              padding: '10px 12px',
              borderRadius: 8,
              border: '1px solid #D1D5DB',
              fontSize: 14,
              backgroundColor: '#F9FAFB',
            }}
          >
            <option value="makkah">Masjid al-Haram (Makkah Mukarramah)</option>
            <option value="madinah">Al-Masjid an-Nabawi (Madinah Munawwarah)</option>
            <option value="alaqsa">Al-Masjid al-Aqsa (Al-Quds)</option>
            <option value="silent">Silent Notification Only</option>
          </select>
        </div>

        {/* Prayer Offsets Grid */}
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 8 }}>
            Manual Minute Offsets per Prayer (منٹوں کی انفرادی ترتیب)
          </label>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 12,
              maxWidth: 460,
            }}
          >
            {(['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'] as const).map((p) => (
              <div key={p} style={{ backgroundColor: '#F9FAFB', padding: '8px 12px', borderRadius: 8, border: '1px solid #E5E7EB' }}>
                <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'capitalize' }}>{p}:</span>
                <input
                  type="number"
                  value={offsets[p]}
                  onChange={(e) => setOffsets({ ...offsets, [p]: parseInt(e.target.value, 10) || 0 })}
                  style={{
                    width: '100%',
                    marginTop: 4,
                    padding: '4px 6px',
                    borderRadius: 4,
                    border: '1px solid #D1D5DB',
                    fontSize: 13,
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleSaveFiqh}
          style={{
            alignSelf: 'flex-start',
            padding: '10px 22px',
            backgroundColor: AmalTheme.colors.primary,
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Save Fiqh & Prayer Settings
        </button>
      </div>
    </div>
  );
}
