import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { AmalTheme } from '@amal/ui';
import { TodayScreen } from './screens/TodayScreen.js';
import { JourneyScreen } from './screens/JourneyScreen.js';
import { AskAmalScreen } from './screens/AskAmalScreen.js';
import { ReflectionScreen } from './screens/ReflectionScreen.js';
import { PrivacyCenterScreen } from './screens/PrivacyCenterScreen.js';

type Tab = 'TODAY' | 'JOURNEYS' | 'ASK_AMAL' | 'REFLECT' | 'PRIVACY';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('TODAY');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenContainer}>
        {activeTab === 'TODAY' && <TodayScreen />}
        {activeTab === 'JOURNEYS' && <JourneyScreen />}
        {activeTab === 'ASK_AMAL' && <AskAmalScreen />}
        {activeTab === 'REFLECT' && <ReflectionScreen />}
        {activeTab === 'PRIVACY' && <PrivacyCenterScreen />}
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('TODAY')}
        >
          <Text style={[styles.tabLabel, activeTab === 'TODAY' && styles.tabLabelActive]}>
            Today
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('JOURNEYS')}
        >
          <Text style={[styles.tabLabel, activeTab === 'JOURNEYS' && styles.tabLabelActive]}>
            Journeys
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('ASK_AMAL')}
        >
          <Text style={[styles.tabLabel, activeTab === 'ASK_AMAL' && styles.tabLabelActive]}>
            Ask AMAL
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('REFLECT')}
        >
          <Text style={[styles.tabLabel, activeTab === 'REFLECT' && styles.tabLabelActive]}>
            Reflect
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('PRIVACY')}
        >
          <Text style={[styles.tabLabel, activeTab === 'PRIVACY' && styles.tabLabelActive]}>
            Privacy
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AmalTheme.colors.surface.backgroundLight,
  },
  screenContainer: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderTopWidth: 1,
    borderTopColor: AmalTheme.colors.surface.borderLight,
    paddingVertical: 12,
    paddingBottom: 24,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: AmalTheme.colors.text.tertiaryLight,
  },
  tabLabelActive: {
    color: AmalTheme.colors.primary,
    fontWeight: '800',
  },
});

export default App;
