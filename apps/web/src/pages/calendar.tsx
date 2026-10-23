import React, { useState, useMemo, useEffect } from 'react';
import Head from 'next/head';
import { Navigation } from '../components/Navigation';
import { hijriFastingEngine, HijriFastingEngine, HijriDate, FastingDayEvaluation } from '@amal/amal-engine';
import { getSavedHijriOffset, setSavedHijriOffset } from '../lib/prayer-utils';
import { showAmalToast } from '../components/Toast';

export default function CalendarPage() {
  const [moonAdjustment, setMoonAdjustment] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]!);

  useEffect(() => {
    setMoonAdjustment(getSavedHijriOffset());
  }, []);

  const handleMoonAdjustmentChange = (val: number) => {
    setMoonAdjustment(val);
    setSavedHijriOffset(val);
    showAmalToast(`Ru'yat-e-Hilal moon adjustment saved: ${val > 0 ? `+${val}` : val} day(s)`, 'success');
  };

  const dateObj = useMemo(() => new Date(selectedDate), [selectedDate]);

  const hijriDate: HijriDate = useMemo(() => {
    return hijriFastingEngine.toHijri(dateObj, moonAdjustment);
  }, [dateObj, moonAdjustment]);

  const fastingEval: FastingDayEvaluation = useMemo(() => {
    return hijriFastingEngine.evaluateFasting(dateObj, moonAdjustment);
  }, [dateObj, moonAdjustment]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FA' }}>
      <Head>
        <title>Islamic Hijri Calendar & Fasting Schedule | AMAL OS</title>
      </Head>
      <Navigation />

      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px 60px' }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1B4332', marginBottom: 6 }}>
            🌙 Islamic Hijri Calendar & Sunnah Fasting
          </h1>
          <p style={{ color: '#4B5563', margin: 0, fontSize: 14 }}>
            Astronomical lunar calendar synchronization with sacred months (Ashhur al-Hurum), Ayyam al-Bid, and Sunnah fasting scheduler.
          </p>
        </div>

        {/* Controls */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          padding: 20,
          border: '1px solid #E5E7EB',
          display: 'flex',
          gap: 20,
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 24,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>Date:</label>
            <button
              onClick={() => {
                const d = new Date(selectedDate);
                d.setDate(d.getDate() - 1);
                setSelectedDate(d.toISOString().split('T')[0]!);
              }}
              style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #D1D5DB', backgroundColor: '#F3F4F6', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}
            >
              ◀ Prev
            </button>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #D1D5DB', fontSize: 14 }}
            />
            <button
              onClick={() => {
                const d = new Date(selectedDate);
                d.setDate(d.getDate() + 1);
                setSelectedDate(d.toISOString().split('T')[0]!);
              }}
              style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #D1D5DB', backgroundColor: '#F3F4F6', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}
            >
              Next ▶
            </button>
            <button
              onClick={() => setSelectedDate(new Date().toISOString().split('T')[0]!)}
              style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #1B4332', backgroundColor: '#1B4332', color: '#FFF', cursor: 'pointer', fontSize: 12, fontWeight: 700 }}
            >
              Today
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>🌙 Ru'yat-e-Hilal Sighting Offset:</label>
            <select
              value={moonAdjustment}
              onChange={(e) => handleMoonAdjustmentChange(Number(e.target.value))}
              style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #D1D5DB', fontSize: 14, backgroundColor: '#F9FAFB', fontWeight: 600 }}
            >
              <option value={-2}>-2 Days (Regional Delayed Sighting)</option>
              <option value={-1}>-1 Day (South Asia / India Local Crescent)</option>
              <option value={0}>0 Days (Standard Astronomical Baseline)</option>
              <option value={1}>+1 Day (Early Crescent Sighting)</option>
              <option value={2}>+2 Days (Advanced Offset)</option>
            </select>
          </div>
        </div>

        {/* Today's Big Hijri Banner */}
        <div
          suppressHydrationWarning
          style={{
          backgroundColor: '#1B4332',
          color: '#FFFFFF',
          borderRadius: 16,
          padding: 32,
          marginBottom: 24,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
          alignItems: 'center',
        }}>
          <div>
            <div style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: 1.5, color: '#86EFAC', fontWeight: 700, marginBottom: 8 }}>
              {hijriDate.dayOfWeekEnglish} • {selectedDate}
            </div>
            <div style={{ fontSize: 36, fontWeight: 900, marginBottom: 4 }}>
              {hijriDate.day} {hijriDate.monthNameEnglish} {hijriDate.year} AH
            </div>
            <div style={{ fontSize: 24, color: '#A7F3D0', direction: 'rtl', marginTop: 4 }}>
              {hijriDate.day} {hijriDate.monthNameArabic} {hijriDate.year} هـ ({hijriDate.dayOfWeekArabic})
            </div>
            <div style={{ fontSize: 16, color: '#E2E8F0', marginTop: 4 }}>
              {hijriDate.day} {hijriDate.monthNameUrdu} ({hijriDate.dayOfWeekUrdu})
            </div>
          </div>

          <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 32, marginBottom: 6 }}>
              {hijriDate.isSacredMonth ? '✨' : '🌙'}
            </div>
            <div style={{ fontWeight: 800, fontSize: 16 }}>
              {hijriDate.isSacredMonth ? 'SACRED MONTH (شهر حرام)' : 'REGULAR HIJRI MONTH'}
            </div>
            <div style={{ fontSize: 12, color: '#D1D5DB', marginTop: 4 }}>
              {hijriDate.isSacredMonth 
                ? 'One of the four sacred months ordained in Surah at-Tawbah (9:36). Good deeds carry multiplied rewards.'
                : 'Part of the continuous lunar rhythm of worship and remembrance.'}
            </div>
          </div>
        </div>

        {/* Fasting Evaluation Card */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          padding: 24,
          border: '1px solid #E5E7EB',
          marginBottom: 24,
        }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1B4332', marginBottom: 16 }}>
            Fasting Status & Masnoon Evaluation
          </h2>

          {fastingEval.isProhibited ? (
            <div style={{ padding: 16, borderRadius: 8, backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5' }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#991B1B' }}>
                ⛔ {fastingEval.fastNameEnglish}
              </div>
              <div style={{ fontSize: 14, color: '#B91C1C', marginTop: 2 }}>{fastingEval.fastNameUrdu}</div>
              <p style={{ fontSize: 13, color: '#7F1D1D', margin: '8px 0 4px' }}>{fastingEval.virtueDescription}</p>
              <span style={{ fontSize: 11, color: '#991B1B', fontWeight: 600 }}>Ref: {fastingEval.hadithReference}</span>
            </div>
          ) : fastingEval.isFastingDay ? (
            <div style={{ padding: 16, borderRadius: 8, backgroundColor: '#F0FDF4', border: '1px solid #86EFAC' }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#166534' }}>
                🌟 {fastingEval.fastNameEnglish} ({fastingEval.category})
              </div>
              <div style={{ fontSize: 14, color: '#047857', marginTop: 2 }}>{fastingEval.fastNameUrdu}</div>
              <p style={{ fontSize: 13, color: '#14532D', margin: '8px 0 4px' }}>{fastingEval.virtueDescription}</p>
              <span style={{ fontSize: 11, color: '#15803D', fontWeight: 600 }}>Ref: {fastingEval.hadithReference}</span>
            </div>
          ) : (
            <div style={{ padding: 16, borderRadius: 8, backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#4B5563' }}>
                No specific prescribed Sunnah fast assigned for this day. Voluntary (Nafl) fasting remains always permissible outside prohibited days.
              </div>
            </div>
          )}
        </div>

        {/* 12 Months Summary Table */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 24, border: '1px solid #E5E7EB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1B4332', marginBottom: 16 }}>
            The 12 Canonical Hijri Months
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {hijriFastingEngine.constructor && (HijriFastingEngine.HIJRI_MONTHS.map(m => (
              <div
                key={m.number}
                style={{
                  padding: 12,
                  borderRadius: 8,
                  backgroundColor: m.sacred ? '#F0FDF4' : '#F9FAFB',
                  border: m.sacred ? '1px solid #86EFAC' : '1px solid #E5E7EB',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#1B4332' }}>{m.number}. {m.english}</span>
                  {m.sacred && <span style={{ fontSize: 10, padding: '1px 6px', borderRadius: 4, backgroundColor: '#1B4332', color: '#FFF' }}>Sacred</span>}
                </div>
                <div style={{ fontSize: 13, color: '#047857', direction: 'rtl', marginTop: 2 }}>{m.arabic}</div>
                <div style={{ fontSize: 11, color: '#6B7280' }}>{m.urdu}</div>
              </div>
            )))}
          </div>
        </div>
      </main>
    </div>
  );
}
