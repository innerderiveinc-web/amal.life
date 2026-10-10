import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView, ScrollView } from 'react-native';
import { AmalTheme } from '@amal/ui';
import { TodayScreen } from './screens/TodayScreen';
import { PrayerScreen } from './screens/PrayerScreen';
import { CalculatorScreen } from './screens/CalculatorScreen';
import { AudioScreen } from './screens/AudioScreen';
import { CalendarScreen } from './screens/CalendarScreen';
import { ReplayScreen } from './screens/ReplayScreen';
import { FamilyScreen } from './screens/FamilyScreen';
import { VaultScreen } from './screens/VaultScreen';
import { LibraryScreen } from './screens/LibraryScreen';
import { SirahScreen } from './screens/SirahScreen';
import { AskAmalScreen } from './screens/AskAmalScreen';
import { AboutScreen } from './screens/AboutScreen';

type Tab = 'TODAY' | 'PRAYER' | 'CALCULATOR' | 'AUDIO' | 'CALENDAR' | 'REPLAY' | 'FAMILY' | 'VAULT' | 'LIBRARY' | 'SIRAH' | 'ASK_AMAL' | 'ABOUT';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('TODAY');

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'TODAY', label: 'Today', icon: '🤲' },
    { id: 'PRAYER', label: 'Prayer', icon: '🧭' },
    { id: 'CALCULATOR', label: 'Zakat', icon: '💰' },
    { id: 'AUDIO', label: 'Audio', icon: '🎧' },
    { id: 'CALENDAR', label: 'Hijri', icon: '🌙' },
    { id: 'REPLAY', label: 'Replay', icon: '📜' },
    { id: 'FAMILY', label: 'Family', icon: '👨‍👩‍👧‍👦' },
    { id: 'VAULT', label: 'Vault', icon: '🗄️' },
    { id: 'LIBRARY', label: 'Library', icon: '📖' },
    { id: 'SIRAH', label: 'Sirah', icon: '🕌' },
    { id: 'ASK_AMAL', label: 'Ask AI', icon: '⚖️' },
    { id: 'ABOUT', label: 'About', icon: 'ℹ️' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>AMAL OS</Text>
        <TouchableOpacity
          style={styles.badge}
          onPress={() => setActiveTab('ABOUT')}
        >
          <Text style={styles.badgeText}>100% Sawad al-A'zam ℹ️</Text>
        </TouchableOpacity>
      </View>

      {/* Screen Container */}
      <View style={styles.screenContainer}>
        {activeTab === 'TODAY' && <TodayScreen />}
        {activeTab === 'PRAYER' && <PrayerScreen />}
        {activeTab === 'CALCULATOR' && <CalculatorScreen />}
        {activeTab === 'AUDIO' && <AudioScreen />}
        {activeTab === 'CALENDAR' && <CalendarScreen />}
        {activeTab === 'REPLAY' && <ReplayScreen />}
        {activeTab === 'FAMILY' && <FamilyScreen />}
        {activeTab === 'VAULT' && <VaultScreen />}
        {activeTab === 'LIBRARY' && <LibraryScreen />}
        {activeTab === 'SIRAH' && <SirahScreen />}
        {activeTab === 'ASK_AMAL' && <AskAmalScreen />}
        {activeTab === 'ABOUT' && <AboutScreen />}
      </View>

      {/* Scrollable Bottom Navigation Bar */}
      <View style={styles.tabBarWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabBarScroll}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                style={[styles.tabItem, isActive && styles.tabItemActive]}
                onPress={() => setActiveTab(tab.id)}
              >
                <Text style={styles.tabIcon}>{tab.icon}</Text>
                <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  logo: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1B4332',
    letterSpacing: 1,
  },
  badge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  badgeText: {
    color: '#2E7D32',
    fontSize: 11,
    fontWeight: '700',
  },
  screenContainer: {
    flex: 1,
  },
  tabBarWrapper: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  tabBarScroll: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    gap: 6,
  },
  tabItem: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
  },
  tabItemActive: {
    backgroundColor: '#F0FDF4',
  },
  tabIcon: {
    fontSize: 16,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 2,
  },
  tabLabelActive: {
    color: '#1B4332',
    fontWeight: '800',
  },
});

export default App;
