import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AmalTheme } from '@amal/ui';
import { MuhasabahSheet } from '../../components';

export default function DailyReflectionScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.categoryLabel}>DAILY MUHASABAH</Text>
      <Text style={styles.title}>Calm Self-Accounting</Text>
      <Text style={styles.subtitle}>
        Accounting without scorecards, guilt, or judgment. A moment of quiet presence with Allah.
      </Text>

      <MuhasabahSheet
        onSave={(data) => {
          // Logged to private vault
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AmalTheme.colors.surface.backgroundLight,
  },
  content: {
    padding: AmalTheme.spacing[5],
    paddingTop: AmalTheme.spacing[10],
  },
  categoryLabel: {
    fontSize: AmalTheme.typography.sizes.xs,
    fontWeight: '800',
    letterSpacing: 1,
    color: AmalTheme.colors.primary,
    marginBottom: 2,
  },
  title: {
    fontSize: AmalTheme.typography.sizes['3xl'],
    fontWeight: '800',
    color: AmalTheme.colors.text.primaryLight,
  },
  subtitle: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.secondaryLight,
    lineHeight: 18,
    marginTop: 4,
    marginBottom: AmalTheme.spacing[5],
  },
});
