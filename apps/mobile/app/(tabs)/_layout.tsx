import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AmalTheme } from '@amal/ui';

export default function TabLayout({ children }: { children?: React.ReactNode }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>{children}</View>
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIcon}>☀️</Text>
          <Text style={[styles.tabLabel, styles.tabLabelActive]}>Today</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIcon}>📖</Text>
          <Text style={styles.tabLabel}>Learn</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIcon}>🌱</Text>
          <Text style={styles.tabLabel}>Amal</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIcon}>👤</Text>
          <Text style={styles.tabLabel}>Me</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AmalTheme.colors.surface.backgroundLight,
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    height: 64,
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderTopWidth: 1,
    borderTopColor: AmalTheme.colors.surface.borderLight,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 8,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 18,
    marginBottom: 2,
  },
  tabLabel: {
    fontSize: 11,
    color: AmalTheme.colors.text.secondaryLight,
    fontWeight: '600',
  },
  tabLabelActive: {
    color: AmalTheme.colors.primary,
    fontWeight: '700',
  },
});
