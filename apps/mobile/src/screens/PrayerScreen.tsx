import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { prayerQiblaEngine, MadhhabAsr } from '@amal/amal-engine';

export const PrayerScreen: React.FC = () => {
  const [madhhab, setMadhhab] = useState<MadhhabAsr>('HANAFI');

  // Default coordinates (Delhi / New Delhi, India)
  const coords = { latitude: 28.6139, longitude: 77.2090 };

  const prayerTimes = useMemo(() => {
    return prayerQiblaEngine.calculatePrayerTimes(coords, new Date(), madhhab, 'KARACHI');
  }, [madhhab]);

  const qibla = useMemo(() => {
    return prayerQiblaEngine.calculateQibla(coords);
  }, []);

  const prayers = [
    { name: 'Fajr', urdu: 'فجر', time: prayerTimes.fajr, icon: '🌅' },
    { name: 'Sunrise', urdu: 'طلوعِ آفتاب', time: prayerTimes.sunrise, icon: '☀️' },
    { name: 'Dhuhr', urdu: 'ظہر', time: prayerTimes.dhuhr, icon: '🌞' },
    { name: 'Asr', urdu: 'عصر', time: prayerTimes.asr, icon: '🌤️' },
    { name: 'Maghrib', urdu: 'مغرب', time: prayerTimes.maghrib, icon: '🌇' },
    { name: 'Isha', urdu: 'عشاء', time: prayerTimes.isha, icon: '🌙' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Auqat-e-Namaz & Qibla</Text>
        <Text style={styles.subtitle}>Precision Astronomical Islamic Timing</Text>
      </View>

      {/* Qibla Direction Card */}
      <View style={styles.qiblaCard}>
        <Text style={styles.qiblaTitle}>Qibla Compass Heading</Text>
        <Text style={styles.qiblaDegree}>{qibla.bearingDegrees}°</Text>
        <Text style={styles.qiblaDir}>Direction: {qibla.compassDirection}</Text>
        <Text style={styles.qiblaDist}>Distance to Kaaba: {qibla.distanceKm.toLocaleString()} km</Text>
      </View>

      {/* Madhhab Toggle */}
      <View style={styles.toggleRow}>
        <TouchableOpacity
          style={[styles.toggleBtn, madhhab === 'HANAFI' && styles.toggleBtnActive]}
          onPress={() => setMadhhab('HANAFI')}
        >
          <Text style={[styles.toggleText, madhhab === 'HANAFI' && styles.toggleTextActive]}>
            Hanafi (Mislayn 2x)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleBtn, madhhab === 'STANDARD_JUMHUR' && styles.toggleBtnActive]}
          onPress={() => setMadhhab('STANDARD_JUMHUR')}
        >
          <Text style={[styles.toggleText, madhhab === 'STANDARD_JUMHUR' && styles.toggleTextActive]}>
            Shafi'i / Maliki / Hanbali (1x)
          </Text>
        </TouchableOpacity>
      </View>

      {/* Prayer Schedule Cards */}
      {prayers.map((p, idx) => (
        <View key={idx} style={[styles.prayerRow, p.name === 'Asr' && styles.asrHighlight]}>
          <View style={styles.prayerInfo}>
            <Text style={styles.prayerIcon}>{p.icon}</Text>
            <View>
              <Text style={styles.prayerName}>{p.name}</Text>
              <Text style={styles.prayerUrdu}>{p.urdu}</Text>
            </View>
          </View>
          <Text style={styles.prayerTime}>{p.time}</Text>
        </View>
      ))}

      {/* Night Times */}
      <View style={styles.nightRow}>
        <View style={styles.nightCol}>
          <Text style={styles.nightLabel}>Islamic Midnight</Text>
          <Text style={styles.nightTime}>{prayerTimes.midnight}</Text>
        </View>
        <View style={styles.nightCol}>
          <Text style={styles.nightLabel}>Tahajjud (Qiyam)</Text>
          <Text style={styles.nightTimeGreen}>{prayerTimes.qiyamThird}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  content: { padding: 16, paddingBottom: 40 },
  header: { marginBottom: 16 },
  title: { fontSize: 22, fontWeight: '800', color: '#1B4332' },
  subtitle: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  qiblaCard: {
    backgroundColor: '#1B4332',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  qiblaTitle: { color: '#86EFAC', fontSize: 12, fontWeight: '700', textTransform: 'uppercase' },
  qiblaDegree: { color: '#FFFFFF', fontSize: 36, fontWeight: '900', marginVertical: 4 },
  qiblaDir: { color: '#E2E8F0', fontSize: 14, fontWeight: '700' },
  qiblaDist: { color: '#A7F3D0', fontSize: 11, marginTop: 4 },
  toggleRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
  },
  toggleBtnActive: { backgroundColor: '#1B4332' },
  toggleText: { fontSize: 12, fontWeight: '700', color: '#4B5563' },
  toggleTextActive: { color: '#FFFFFF' },
  prayerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  asrHighlight: { borderColor: '#86EFAC', backgroundColor: '#F0FDF4' },
  prayerInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  prayerIcon: { fontSize: 20 },
  prayerName: { fontSize: 15, fontWeight: '700', color: '#111827' },
  prayerUrdu: { fontSize: 11, color: '#6B7280' },
  prayerTime: { fontSize: 18, fontWeight: '800', color: '#1B4332' },
  nightRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 14,
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  nightCol: { alignItems: 'center' },
  nightLabel: { fontSize: 11, color: '#6B7280' },
  nightTime: { fontSize: 14, fontWeight: '700', color: '#374151', marginTop: 2 },
  nightTimeGreen: { fontSize: 14, fontWeight: '700', color: '#047857', marginTop: 2 },
});
