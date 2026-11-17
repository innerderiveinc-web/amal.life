import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Modal,
  ScrollView,
  StatusBar,
  BackHandler,
} from 'react-native';

// Pure Native Screens
import { TodayScreen } from './screens/TodayScreen';
import { QuranScreen } from './screens/QuranScreen';
import { PrayerScreen } from './screens/PrayerScreen';
import { LibraryScreen } from './screens/LibraryScreen';
import { SistersScreen } from './screens/SistersScreen';
import { TasbihScreen } from './screens/TasbihScreen';
import { CalculatorScreen } from './screens/CalculatorScreen';
import { DecisionRoomScreen } from './screens/DecisionRoomScreen';
import { SirahScreen } from './screens/SirahScreen';
import { AudioScreen } from './screens/AudioScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { CalendarScreen } from './screens/CalendarScreen';
import { FamilyScreen } from './screens/FamilyScreen';
import { VaultScreen } from './screens/VaultScreen';
import { JourneyScreen } from './screens/JourneyScreen';
import { ReflectionScreen } from './screens/ReflectionScreen';
import { AboutScreen } from './screens/AboutScreen';
import { PrivacyCenterScreen } from './screens/PrivacyCenterScreen';
import { ReplayScreen } from './screens/ReplayScreen';

interface ScreenErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ScreenErrorBoundary extends React.Component<
  { screenName: string; children: React.ReactNode },
  ScreenErrorBoundaryState
> {
  override state: ScreenErrorBoundaryState = { hasError: false, error: null };
  static getDerivedStateFromError(error: Error): ScreenErrorBoundaryState {
    return { hasError: true, error };
  }
  override componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.warn(`Screen ${this.props.screenName} error:`, error, info);
  }
  override render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorBox}>
          <Text style={styles.errorTitle}>
            {this.props.screenName} اس وقت لوڈ نہیں ہو سکی
          </Text>
          <Text style={styles.errorSubtitle}>
            {this.state.error?.message || 'عارضی مسئلہ'}
          </Text>
          <TouchableOpacity
            style={styles.retryBtn}
            onPress={() => this.setState({ hasError: false, error: null })}
          >
            <Text style={styles.retryBtnText}>🔄 دوبارہ کوشش کریں (Retry)</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return this.props.children;
  }
}

export type NativeTab =
  | 'TODAY'
  | 'QURAN'
  | 'PRAYER'
  | 'LIBRARY'
  | 'SISTERS'
  | 'TASBIH'
  | 'CALCULATOR'
  | 'DECISION_ROOM'
  | 'SIRAH'
  | 'AUDIO'
  | 'SETTINGS'
  | 'CALENDAR'
  | 'FAMILY'
  | 'VAULT'
  | 'JOURNEY'
  | 'REFLECTION'
  | 'ABOUT'
  | 'PRIVACY'
  | 'REPLAY';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NativeTab>('TODAY');
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState<boolean>(false);

  // Android Hardware Back Button Handling
  useEffect(() => {
    const onBackPress = () => {
      if (isMoreMenuOpen) {
        setIsMoreMenuOpen(false);
        return true;
      }
      if (activeTab !== 'TODAY') {
        setActiveTab('TODAY');
        return true;
      }
      return false; // let Android exit app
    };
    const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => sub.remove();
  }, [activeTab, isMoreMenuOpen]);

  const mainTabs: { id: NativeTab; labelUrdu: string; icon: string }[] = [
    { id: 'TODAY', labelUrdu: 'آج', icon: '🌅' },
    { id: 'QURAN', labelUrdu: 'قرآن', icon: '📖' },
    { id: 'PRAYER', labelUrdu: 'نماز', icon: '🕌' },
    { id: 'LIBRARY', labelUrdu: 'مکتبہ', icon: '📚' },
    { id: 'SISTERS', labelUrdu: 'خواتین', icon: '🧕' },
  ];

  const moreTools: { id: NativeTab; title: string; subtitle: string; icon: string; category: string }[] = [
    { id: 'TASBIH', title: 'مسنون تسبیح و اذکار', subtitle: 'ڈیجیٹل کاؤنٹر، مسنون اذکار و درود', icon: '📿', category: 'عبادات' },
    { id: 'CALCULATOR', title: 'زکوٰۃ و میراث کیلکولیٹر', subtitle: 'حنفی و جمہور شرعی تقسیمِ ترکہ', icon: '⚖️', category: 'احکام و معاملات' },
    { id: 'DECISION_ROOM', title: 'شرعی فیصلہ روم و نبوی حکمت', subtitle: 'نیت کمپائلر، استخارہ و نبوی اسوہ', icon: '💡', category: 'احکام و معاملات' },
    { id: 'AUDIO', title: 'صوت السکینہ (Sacred Audio)', subtitle: 'صوتی تلاوت، کنز الایمان و شمائل', icon: '🎧', category: 'علوم و روحانیت' },
    { id: 'SIRAH', title: 'سیرت النبی ﷺ و شمائل', subtitle: 'مدارج النبوۃ و شمائل ترمذی', icon: '🕊️', category: 'علوم و روحانیت' },
    { id: 'SETTINGS', title: 'نظام ترتیبات و مسلک', subtitle: 'حنفی/شافعی مسلک، حساب و تہجد موڈ', icon: '⚙️', category: 'ترتیبات' },
    { id: 'CALENDAR', title: 'ہجری کیلنڈر و ایامِ بیض', subtitle: 'اسلامی تاریخ، اعراس و مسنون روزے', icon: '📅', category: 'عبادات' },
    { id: 'FAMILY', title: 'خاندانی نظام (Family Life)', subtitle: 'تربیتِ اولاد اور گھریلو برکات', icon: '👨‍👩‍👧', category: 'احکام و معاملات' },
    { id: 'VAULT', title: 'ذخیرہ علم و تصدیقِ نوٹس', subtitle: 'محفوظ نوٹ بک و کتب حوالہ جات', icon: '🔐', category: 'علوم و روحانیت' },
    { id: 'JOURNEY', title: 'روحانی منازل و احوال', subtitle: 'توبہ، استقامت اور اخلاص کے مدارج', icon: '🧭', category: 'علوم و روحانیت' },
    { id: 'REFLECTION', title: 'محاسبہ و تدبر (Muhasabah)', subtitle: 'روزمرہ اعمال کا شرعی جائزہ', icon: '📝', category: 'علوم و روحانیت' },
    { id: 'ABOUT', title: 'تعارفِ نظام و وقف', subtitle: 'اہل سنت و جماعت، خود مختار وقف', icon: 'ℹ️', category: 'ترتیبات' },
    { id: 'PRIVACY', title: 'پرائیویسی و خود مختاری', subtitle: 'زیرو ٹریکنگ، تمام ڈیٹا فون میں محفوظ', icon: '🛡️', category: 'ترتیبات' },
    { id: 'REPLAY', title: 'سالانہ مشاہدات (Deen Replay)', subtitle: 'سفرِ دین کا سالانہ تجزیہ', icon: '📈', category: 'ترتیبات' },
  ];

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'TODAY':
        return <TodayScreen />;
      case 'QURAN':
        return <QuranScreen />;
      case 'PRAYER':
        return <PrayerScreen />;
      case 'LIBRARY':
        return <LibraryScreen />;
      case 'SISTERS':
        return <SistersScreen />;
      case 'TASBIH':
        return <TasbihScreen />;
      case 'CALCULATOR':
        return <CalculatorScreen />;
      case 'DECISION_ROOM':
        return <DecisionRoomScreen />;
      case 'SIRAH':
        return <SirahScreen />;
      case 'AUDIO':
        return <AudioScreen />;
      case 'SETTINGS':
        return <SettingsScreen />;
      case 'CALENDAR':
        return <CalendarScreen />;
      case 'FAMILY':
        return <FamilyScreen />;
      case 'VAULT':
        return <VaultScreen />;
      case 'JOURNEY':
        return <JourneyScreen />;
      case 'REFLECTION':
        return <ReflectionScreen />;
      case 'ABOUT':
        return <AboutScreen />;
      case 'PRIVACY':
        return <PrivacyCenterScreen />;
      case 'REPLAY':
        return <ReplayScreen />;
      default:
        return <TodayScreen />;
    }
  };

  const currentTabTitle = () => {
    const mainMatch = mainTabs.find((t) => t.id === activeTab);
    if (mainMatch) return mainMatch.labelUrdu;
    const moreMatch = moreTools.find((t) => t.id === activeTab);
    return moreMatch ? moreMatch.title : 'AMAL OS';
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#064E3B" />

      {/* TOP DIGNIFIED BRAND HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {activeTab !== 'TODAY' && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setActiveTab('TODAY')}
              accessibilityLabel="Back to Home"
            >
              <Text style={styles.backButtonText}>← ہوم</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.logo}>AMAL OS</Text>
          <View style={styles.deeniBadge}>
            <Text style={styles.deeniBadgeText}>اہل سنت و جماعت</Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.moreHeaderBtn}
            onPress={() => setIsMoreMenuOpen(true)}
            accessibilityLabel="All Tools"
          >
            <Text style={styles.moreHeaderIcon}>🧭</Text>
            <Text style={styles.moreHeaderText}>تمام ۲۴ ٹولز</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* SCREEN CONTAINER WITH ERROR BOUNDARY */}
      <View style={styles.screenContainer}>
        <ScreenErrorBoundary screenName={currentTabTitle()}>
          {renderActiveScreen()}
        </ScreenErrorBoundary>
      </View>

      {/* BOTTOM NATIVE NAVIGATION BAR */}
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

        {/* More Suite Tab */}
        <TouchableOpacity
          style={[styles.navItem, !mainTabs.some((t) => t.id === activeTab) && styles.navItemActive]}
          onPress={() => setIsMoreMenuOpen(true)}
        >
          <Text style={styles.navIcon}>🧭</Text>
          <Text
            style={[
              styles.navLabel,
              !mainTabs.some((t) => t.id === activeTab) && styles.navLabelActive,
            ]}
          >
            مزید
          </Text>
        </TouchableOpacity>
      </View>

      {/* FULL SUITE DRAWER MODAL */}
      <Modal
        visible={isMoreMenuOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsMoreMenuOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setIsMoreMenuOpen(false)}>
                <Text style={styles.modalClose}>✕ بند کریں</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>AMAL OS — مکمل اسلامی ٹولز و علوم</Text>
            </View>

            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              {['عبادات', 'احکام و معاملات', 'علوم و روحانیت', 'ترتیبات'].map((cat) => {
                const toolsInCat = moreTools.filter((t) => t.category === cat);
                if (toolsInCat.length === 0) return null;
                return (
                  <View key={cat} style={{ marginBottom: 16 }}>
                    <Text style={styles.drawerSectionTitle}>{cat}</Text>
                    {toolsInCat.map((tool) => (
                      <TouchableOpacity
                        key={tool.id}
                        style={styles.moreAppRow}
                        onPress={() => {
                          setActiveTab(tool.id);
                          setIsMoreMenuOpen(false);
                        }}
                      >
                        <Text style={styles.moreAppIcon}>{tool.icon}</Text>
                        <View style={styles.moreAppDetails}>
                          <Text style={styles.moreAppTitle}>{tool.title}</Text>
                          <Text style={styles.moreAppSub}>{tool.subtitle}</Text>
                        </View>
                        <Text style={styles.moreAppArrow}>➔</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#064E3B',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#064E3B',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 4,
  },
  backButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  logo: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FDE68A',
    letterSpacing: 0.8,
  },
  deeniBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.25)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.4)',
  },
  deeniBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#A7F3D0',
  },
  moreHeaderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  moreHeaderIcon: {
    fontSize: 13,
  },
  moreHeaderText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#FDFBF7',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingVertical: 6,
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 8,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    minWidth: 54,
  },
  navItemActive: {
    backgroundColor: '#ECFDF5',
  },
  navIcon: {
    fontSize: 18,
    marginBottom: 2,
  },
  navLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
  },
  navLabelActive: {
    color: '#065F46',
    fontWeight: '800',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    padding: 18,
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
    fontSize: 14,
    fontWeight: '800',
    color: '#064E3B',
    textAlign: 'right',
  },
  modalClose: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '700',
  },
  modalBody: {
    paddingBottom: 24,
  },
  drawerSectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#064E3B',
    marginBottom: 6,
    paddingHorizontal: 4,
  },
  moreAppRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  moreAppIcon: {
    fontSize: 22,
    marginRight: 10,
  },
  moreAppDetails: {
    flex: 1,
  },
  moreAppTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'right',
  },
  moreAppSub: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
    textAlign: 'right',
  },
  moreAppArrow: {
    fontSize: 12,
    color: '#94A3B8',
    marginLeft: 6,
  },
  errorBox: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#991B1B',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryBtn: {
    backgroundColor: '#065F46',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
