import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
} from 'react-native';
import { prayerQiblaEngine, MadhhabAsr, CalculationMethod } from '@amal/amal-engine';
import { GLOBAL_CITIES, GlobalCity, searchGlobalCities } from '../data/global-locations';

export const PrayerScreen: React.FC = () => {
  const [madhhab, setMadhhab] = useState<MadhhabAsr>('HANAFI');
  const [selectedCity, setSelectedCity] = useState<GlobalCity>(GLOBAL_CITIES[0]!); // Default: Delhi / New Delhi
  const [isCityModalVisible, setIsCityModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const coords = useMemo(() => {
    return { latitude: selectedCity.lat, longitude: selectedCity.lon };
  }, [selectedCity]);

  const method: CalculationMethod = selectedCity.defaultMethod || 'KARACHI';

  const prayerTimes = useMemo(() => {
    return prayerQiblaEngine.calculatePrayerTimes(coords, new Date(), madhhab, method);
  }, [coords, madhhab, method]);

  const qibla = useMemo(() => {
    return prayerQiblaEngine.calculateQibla(coords);
  }, [coords]);

  const filteredCities = useMemo(() => {
    return searchGlobalCities(searchQuery);
  }, [searchQuery]);

  const prayers = [
    { name: 'Fajr', urdu: 'فجر', time: prayerTimes.fajr, icon: '🌅' },
    { name: 'Sunrise', urdu: 'طلوعِ آفتاب', time: prayerTimes.sunrise, icon: '☀️' },
    { name: 'Dhuhr', urdu: 'ظہر', time: prayerTimes.dhuhr, icon: '🌞' },
    { name: 'Asr', urdu: 'عصر', time: prayerTimes.asr, icon: '🌤️' },
    { name: 'Maghrib', urdu: 'مغرب', time: prayerTimes.maghrib, icon: '🌇' },
    { name: 'Isha', urdu: 'عشاء', time: prayerTimes.isha, icon: '🌙' },
  ];

  const handleSelectCity = (city: GlobalCity) => {
    setSelectedCity(city);
    setIsCityModalVisible(false);
    setSearchQuery('');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Auqat-e-Namaz & Qibla</Text>
        <Text style={styles.subtitle}>Global Precision Astronomical Timing</Text>
      </View>

      {/* Global Location Bar */}
      <View style={styles.locationBar}>
        <View style={{ flex: 1 }}>
          <Text style={styles.locationLabel}>CURRENT LOCATION</Text>
          <Text style={styles.locationCity} numberOfLines={1}>
            📍 {selectedCity.name}, {selectedCity.country}
          </Text>
          <Text style={styles.locationCoords}>
            {selectedCity.lat.toFixed(4)}° N, {selectedCity.lon.toFixed(4)}° E · Method: {method}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.changeLocBtn}
          onPress={() => setIsCityModalVisible(true)}
        >
          <Text style={styles.changeLocBtnText}>Change 🌍</Text>
        </TouchableOpacity>
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

      {/* Global City Picker Modal */}
      <Modal
        visible={isCityModalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setIsCityModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>🌍 Select Global Location</Text>
            <TouchableOpacity onPress={() => setIsCityModalVisible(false)}>
              <Text style={styles.modalClose}>✕ Close</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.searchBox}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search 150+ cities (e.g. London, Dubai, New York, Makkah)..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
          </View>

          <FlatList
            data={filteredCities}
            keyExtractor={(item, index) => `${item.name}-${item.country}-${index}`}
            renderItem={({ item }) => {
              const isCurrent =
                item.name === selectedCity.name && item.country === selectedCity.country;
              return (
                <TouchableOpacity
                  style={[styles.cityRow, isCurrent && styles.cityRowActive]}
                  onPress={() => handleSelectCity(item)}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.cityName, isCurrent && styles.cityNameActive]}>
                      {item.name}
                    </Text>
                    <Text style={styles.cityCountry}>
                      {item.country} · {item.region}
                    </Text>
                  </View>
                  <Text style={styles.cityCoords}>
                    {item.lat > 0 ? `${item.lat.toFixed(1)}°N` : `${Math.abs(item.lat).toFixed(1)}°S`},{' '}
                    {item.lon > 0 ? `${item.lon.toFixed(1)}°E` : `${Math.abs(item.lon).toFixed(1)}°W`}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  content: { padding: 16, paddingBottom: 40 },
  header: { marginBottom: 14 },
  title: { fontSize: 22, fontWeight: '800', color: '#1B4332' },
  subtitle: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  locationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  locationLabel: { fontSize: 10, fontWeight: '800', color: '#166534', letterSpacing: 0.5 },
  locationCity: { fontSize: 14, fontWeight: '700', color: '#111827', marginTop: 2 },
  locationCoords: { fontSize: 11, color: '#6B7280', marginTop: 1 },
  changeLocBtn: {
    backgroundColor: '#E8F5E9',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  changeLocBtnText: { fontSize: 12, fontWeight: '700', color: '#166534' },
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
  modalContainer: { flex: 1, backgroundColor: '#F8F9FA', paddingTop: 50, paddingHorizontal: 16 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 18, fontWeight: '800', color: '#1B4332' },
  modalClose: { fontSize: 14, fontWeight: '700', color: '#DC2626' },
  searchBox: { marginBottom: 12 },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
  },
  cityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cityRowActive: { borderColor: '#1B4332', backgroundColor: '#F0FDF4' },
  cityName: { fontSize: 15, fontWeight: '700', color: '#111827' },
  cityNameActive: { color: '#166534' },
  cityCountry: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  cityCoords: { fontSize: 11, color: '#9CA3AF' },
});
