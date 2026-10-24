import React from 'react';
import { MadhhabAsr, CalculationMethod } from '@amal/amal-engine';

interface PrayerFiqhControlsProps {
  madhhab: MadhhabAsr;
  handleMadhhabChange: (m: MadhhabAsr) => void;
  method: CalculationMethod;
  handleMethodChange: (m: CalculationMethod) => void;
}

export function PrayerFiqhControls({
  madhhab,
  handleMadhhabChange,
  method,
  handleMethodChange,
}: PrayerFiqhControlsProps) {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        border: '1px solid #E5E7EB',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 16,
        marginBottom: 24,
      }}
    >
      <div>
        <label
          style={{
            display: 'block',
            fontSize: 12,
            fontWeight: 700,
            color: '#374151',
            marginBottom: 6,
          }}
        >
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
        <label
          style={{
            display: 'block',
            fontSize: 12,
            fontWeight: 700,
            color: '#374151',
            marginBottom: 6,
          }}
        >
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
  );
}
