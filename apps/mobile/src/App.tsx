import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView, Modal, ScrollView } from 'react-native';
import { TodayScreen } from './screens/TodayScreen';
import { QuranScreen } from './screens/QuranScreen';
import { AskAmalScreen } from './screens/AskAmalScreen';
import { PrayerScreen } from './screens/PrayerScreen';
import { TasbihScreen } from './screens/TasbihScreen';
import { CalculatorScreen } from './screens/CalculatorScreen';
import { LibraryScreen } from './screens/LibraryScreen';
import { SirahScreen } from './screens/SirahScreen';
import { CalendarScreen } from './screens/CalendarScreen';
import { FamilyScreen } from './screens/FamilyScreen';
import { AboutScreen } from './screens/AboutScreen';

type Tab = 'TODAY' | 'QURAN' | 'ASK_AMAL' | 'PRAYER' | 'TASBIH' | 'CALCULATOR' | 'LIBRARY' | 'SIRAH' | 'CALENDAR' | 'FAMILY' | 'ABOUT';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('TODAY');
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState<boolean>(false);

  const mainTabs: { id: Tab; label: string; labelUrdu: string; icon: string }[] = [
    { id: 'TODAY', label: 'Today', labelUrdu: 'آج', icon: '🌅' },
    { id: 'QURAN', label: 'Quran', labelUrdu: 'قرآن', icon: '📖' },
    { id: 'ASK_AMAL', label: 'Ask', labelUrdu: 'رہنمائی', icon: '💬' },
    { id: 'PRAYER', label: 'Prayer', labelUrdu: 'نماز', icon: '🕋' },
    { id: 'TASBIH', label: 'Tasbih', labelUrdu: 'تسبیح', icon: '📿' },
  ];

  const moreApps: { id: Tab; title: string; subtitle: string; icon: string }[] = [
    { id: 'CALCULATOR', title: 'Zakat & Miras Calculator', subtitle: 'زکوٰۃ و وراثت تقسیم', icon: '💰' },
    { id: 'LIBRARY', title: '106-Book Canonical Library', subtitle: 'کتب خانہ السواد الاعظم', icon: '📚' },
    { id: 'SIRAH', title: 'Living Sirah & Shama\'il', subtitle: 'سیرت النبی ﷺ و شمائل', icon: '🕊️' },
    { id: 'CALENDAR', title: 'Hijri Calendar & Fasting', subtitle: 'ہجری کیلنڈر و روزے', icon: '🌙' },
    { id: 'FAMILY', title: 'Family Deen Circle', subtitle: 'فیملی سرکل و معمولات', icon: '👨‍👩‍👧‍👦' },
    { id: 'ABOUT', title: 'About & Methodology', subtitle: 'تعارف و منہج عمل', icon: 'ℹ️' },
  ];

  const handleSelectMoreApp = (tabId: Tab) => {
    setActiveTab(tabId);
    setIsMoreMenuOpen(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. TOP DIGNIFIED HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.logo}>AMAL</Text>
          <View style={styles.deeniBadge}>
            <Text style={styles.deeniBadgeText}>اہلسنت تصدیق شدہ</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.moreHeaderBtn} onPress={() => setIsMoreMenuOpen(true)}>
          <Text style={styles.moreHeaderIcon}>☰</Text>
          <Text style={styles.moreHeaderText}>دیگر کتب و خدمات</Text>
        </TouchableOpacity>
      </View>

      {/* 2. SCREEN CONTAINER */}
      <View style={styles.screenContainer}>
        {activeTab === 'TODAY' && <TodayScreen />}
        {activeTab === 'QURAN' && <QuranScreen />}
        {activeTab === 'ASK_AMAL' && <AskAmalScreen />}
        {activeTab === 'PRAYER' && <PrayerScreen />}
        {activeTab === 'TASBIH' && <TasbihScreen />}
        {activeTab === 'CALCULATOR' && <CalculatorScreen />}
        {activeTab === 'LIBRARY' && <LibraryScreen />}
        {activeTab === 'SIRAH' && <SirahScreen />}
        {activeTab === 'CALENDAR' && <CalendarScreen />}
        {activeTab === 'FAMILY' && <FamilyScreen />}
        {activeTab === 'ABOUT' && <AboutScreen />}
      </View>

      {/* 3. 5-PILLAR CALM BOTTOM NAVIGATION (فکسڈ اور واضح ۵ ارکان) */}
      <View style={styles.bottomNav}>
        {mainTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={[styles.navItem, isActive && styles.navItemActive]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Text style={styles.navIcon}>{tab.icon}</Text>
              <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
                {tab.labelUrdu}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 4. MORE APPS MODAL / DRAWER */}
      {isMoreMenuOpen && (
        <Modal visible={isMoreMenuOpen} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalSheet}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>دیگر اسلامی خدمات (All AMAL Services)</Text>
                <TouchableOpacity onPress={() => setIsMoreMenuOpen(false)}>
                  <Text style={styles.modalClose}>✕</Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalBody}>
                {moreApps.map((app) => (
                  <TouchableOpacity
                    key={app.id}
                    style={styles.moreAppRow}
                    onPress={() => handleSelectMoreApp(app.id)}
                  >
                    <Text style={styles.moreAppIcon}>{app.icon}</Text>
                    <View style={styles.moreAppDetails}>
                      <Text style={styles.moreAppTitle}>{app.title}</Text>
                      <Text style={styles.moreAppSub}>{app.subtitle}</Text>
                    </View>
                    <Text style={styles.moreAppArrow}>➔</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAF9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logo: {
    fontSize: 20,
    fontWeight: '900',
    color: '#064E3B',
    letterSpacing: 0.5,
  },
  deeniBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  deeniBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#047857',
  },
  moreHeaderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  moreHeaderIcon: {
    fontSize: 14,
    color: '#475569',
  },
  moreHeaderText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
  },
  screenContainer: {
    flex: 1,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingVertical: 8,
    paddingBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 8,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  navItemActive: {
    backgroundColor: '#F0FDF4',
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  navLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  navLabelActive: {
    color: '#065F46',
    fontWeight: '800',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingBottom: 12,
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  modalClose: {
    fontSize: 18,
    color: '#64748B',
    fontWeight: '700',
  },
  modalBody: {
    paddingBottom: 20,
  },
  moreAppRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  moreAppIcon: {
    fontSize: 24,
    marginRight: 14,
  },
  moreAppDetails: {
    flex: 1,
  },
  moreAppTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  moreAppSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  moreAppArrow: {
    fontSize: 14,
    color: '#94A3B8',
  },
});
