import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { hijriFastingEngine, HijriDate, FastingDayEvaluation } from '@amal/amal-engine';

export const CalendarScreen: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());
  const [moonOffset, setMoonOffset] = useState<number>(0);

  const hijri: HijriDate = useMemo(() => {
    return hijriFastingEngine.toHijri(currentDate, moonOffset);
  }, [currentDate, moonOffset]);

  const fasting: FastingDayEvaluation = useMemo(() => {
    return hijriFastingEngine.evaluateFasting(currentDate, moonOffset);
  }, [currentDate, moonOffset]);

  const shiftDay = (days: number) => {
    setCurrentDate(prev => {
      const d = new Date(prev);
      d.setDate(d.getDate() + days);
      return d;
    });
  };

  const resetToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Hijri Calendar & Fasting</Text>
      <Text style={styles.subtitle}>Astronomical Lunar Rhythm & Sunnah Days</Text>

      {/* Date Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navBtn} onPress={() => shiftDay(-1)}>
          <Text style={styles.navBtnText}>◀ Prev Day</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navBtn, styles.todayBtn]} onPress={resetToday}>
          <Text style={[styles.navBtnText, styles.todayBtnText]}>Today</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn} onPress={() => shiftDay(1)}>
          <Text style={styles.navBtnText}>Next Day ▶</Text>
        </TouchableOpacity>
      </View>

      {/* Moon Sighting Toggle */}
      <View style={styles.offsetRow}>
        <Text style={styles.offsetLabel}>Hilal Sighting:</Text>
        <View style={styles.offsetBtns}>
          {[-1, 0, 1].map((val) => (
            <TouchableOpacity
              key={val}
              style={[styles.offsetChip, moonOffset === val && styles.offsetChipActive]}
              onPress={() => setMoonOffset(val)}
            >
              <Text style={[styles.offsetChipText, moonOffset === val && styles.offsetChipTextActive]}>
                {val > 0 ? `+${val}d` : `${val}d`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Main Hijri Date Card */}
      <View style={styles.mainCard}>
        <Text style={styles.weekdayBadge}>{hijri.dayOfWeekEnglish} • {hijri.dayOfWeekUrdu}</Text>
        <Text style={styles.hijriDay}>{hijri.day} {hijri.monthNameEnglish} {hijri.year} AH</Text>
        <Text style={styles.hijriArabic}>{hijri.day} {hijri.monthNameArabic} {hijri.year} هـ</Text>
        <Text style={styles.hijriUrdu}>{hijri.day} {hijri.monthNameUrdu}</Text>

        <View style={styles.sacredTag}>
          <Text style={styles.sacredText}>
            {hijri.isSacredMonth ? '✨ SACRED MONTH (شهر حرام)' : '🌙 HIJRI MONTH'}
          </Text>
        </View>
      </View>

      {/* Fasting Alert */}
      <View style={[styles.fastingCard, fasting.isProhibited ? styles.prohibitedCard : styles.sunnahCard]}>
        {fasting.isProhibited ? (
          <View>
            <Text style={styles.fastingHeader}>⛔ FASTING FORBIDDEN TODAY</Text>
            <Text style={styles.fastingName}>{fasting.fastNameEnglish}</Text>
            <Text style={styles.fastingDesc}>{fasting.virtueDescription}</Text>
          </View>
        ) : fasting.isFastingDay ? (
          <View>
            <Text style={styles.fastingHeader}>🌟 MASNOON FAST TODAY</Text>
            <Text style={styles.fastingName}>{fasting.fastNameEnglish}</Text>
            <Text style={styles.fastingDesc}>{fasting.virtueDescription}</Text>
            <Text style={styles.hadithRef}>Ref: {fasting.hadithReference}</Text>
          </View>
        ) : (
          <View>
            <Text style={styles.fastingHeader}>SUNNAH FASTING SCHEDULE</Text>
            <Text style={styles.fastingName}>No specific prescribed Sunnah fast today.</Text>
            <Text style={styles.fastingDesc}>
              Ayyam al-Bid (13th, 14th, 15th) and Mondays & Thursdays carry continuous Sunnah rewards.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  content: { padding: 16, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: '800', color: '#1B4332' },
  subtitle: { fontSize: 13, color: '#6B7280', marginTop: 2, marginBottom: 16 },
  mainCard: {
    backgroundColor: '#1B4332',
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  weekdayBadge: { color: '#86EFAC', fontSize: 12, fontWeight: '700', textTransform: 'uppercase' },
  hijriDay: { color: '#FFFFFF', fontSize: 24, fontWeight: '900', marginVertical: 4 },
  hijriArabic: { color: '#A7F3D0', fontSize: 18, fontWeight: '700' },
  hijriUrdu: { color: '#E2E8F0', fontSize: 14, marginTop: 2 },
  sacredTag: { marginTop: 12, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.15)' },
  sacredText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
  fastingCard: { borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#E5E7EB', backgroundColor: '#FFFFFF' },
  prohibitedCard: { backgroundColor: '#FEF2F2', borderColor: '#FECACA' },
  sunnahCard: { backgroundColor: '#F0FDF4', borderColor: '#86EFAC' },
  fastingHeader: { fontSize: 11, fontWeight: '800', color: '#047857', letterSpacing: 0.5 },
  fastingName: { fontSize: 16, fontWeight: '800', color: '#111827', marginVertical: 4 },
  fastingDesc: { fontSize: 13, color: '#4B5563' },
  hadithRef: { fontSize: 11, color: '#047857', marginTop: 6, fontWeight: '600' },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 8,
  },
  navBtn: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    alignItems: 'center',
  },
  navBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#374151',
  },
  todayBtn: {
    backgroundColor: '#1B4332',
    borderColor: '#1B4332',
    flex: 0.8,
  },
  todayBtnText: {
    color: '#FFFFFF',
  },
  offsetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
  },
  offsetLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4B5563',
  },
  offsetBtns: {
    flexDirection: 'row',
    gap: 6,
  },
  offsetChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#F3F4F6',
  },
  offsetChipActive: {
    backgroundColor: '#1B4332',
  },
  offsetChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4B5563',
  },
  offsetChipTextActive: {
    color: '#FFFFFF',
  },
});
