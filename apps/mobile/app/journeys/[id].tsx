import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AmalTheme } from '@amal/ui';

export default function JourneyDetailScreen() {
  const [isAdapted, setIsAdapted] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.categoryLabel}>PROGRAM ROADMAP</Text>
      <Text style={styles.title}>14-Day Fajr Recovery</Text>
      <Text style={styles.subtitle}>
        Re-aligning your evening routine so waking for Fajr becomes natural and unhurried.
      </Text>

      {/* Stats Badge Row */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statVal}>{isAdapted ? '5 min' : '10 min'}</Text>
          <Text style={styles.statLabel}>Daily Target</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statVal}>14 Days</Text>
          <Text style={styles.statLabel}>Duration</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statVal}>Gentle</Text>
          <Text style={styles.statLabel}>Pacing</Text>
        </View>
      </View>

      {/* Prophetic Ease Adaptation Notice */}
      <View style={styles.easeBanner}>
        <Text style={styles.easeTitle}>🌱 Prophetic Principle of Ease</Text>
        <Text style={styles.easeBody}>
          If 10 minutes feels heavy with your work hours, AMAL adjusts to a 5-minute micro-habit.
          No streaks to break; no spiritual failure.
        </Text>
        <TouchableOpacity
          style={styles.easeBtn}
          onPress={() => setIsAdapted(!isAdapted)}
        >
          <Text style={styles.easeBtnText}>
            {isAdapted ? 'Reset to Standard Pace (10m)' : 'Apply Gentle Pace (5m)'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 4 Phases of the Journey */}
      <Text style={styles.sectionHeader}>CURRICULUM PHASES</Text>
      {[
        { phase: 'Phase 1: Awareness & Friction Removal', days: 'Days 1-3', focus: 'Evening phone wind-down & dinner timing' },
        { phase: 'Phase 2: Anchoring the Sunnah', days: 'Days 4-7', focus: 'Sleeping with Wudu & bedtime Adhkar' },
        { phase: 'Phase 3: The Dawn Alarm Rhythm', days: 'Days 8-10', focus: 'Standing immediately upon waking' },
        { phase: 'Phase 4: Sincere Dawn Presence', days: 'Days 11-14', focus: 'Praying Fajr with stillness and reflection' },
      ].map((p, idx) => (
        <View key={idx} style={styles.phaseCard}>
          <Text style={styles.phaseTitle}>{p.phase}</Text>
          <Text style={styles.phaseDays}>{p.days}</Text>
          <Text style={styles.phaseFocus}>{p.focus}</Text>
        </View>
      ))}

      {/* Actions */}
      <TouchableOpacity style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Continue Day 4 Workspace</Text>
      </TouchableOpacity>
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
    marginBottom: AmalTheme.spacing[4],
  },
  statsRow: {
    flexDirection: 'row',
    gap: AmalTheme.spacing[3],
    marginBottom: AmalTheme.spacing[5],
  },
  statBox: {
    flex: 1,
    backgroundColor: AmalTheme.colors.surface.cardLight,
    padding: AmalTheme.spacing[3],
    borderRadius: AmalTheme.radii.lg,
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
    alignItems: 'center',
  },
  statVal: {
    fontSize: AmalTheme.typography.sizes.base,
    fontWeight: '800',
    color: AmalTheme.colors.primary,
  },
  statLabel: {
    fontSize: 10,
    color: AmalTheme.colors.text.secondaryLight,
    marginTop: 2,
  },
  easeBanner: {
    backgroundColor: AmalTheme.colors.primaryLight,
    padding: AmalTheme.spacing[4],
    borderRadius: AmalTheme.radii.xl,
    marginBottom: AmalTheme.spacing[5],
    borderWidth: 1,
    borderColor: AmalTheme.colors.primary,
  },
  easeTitle: {
    fontSize: AmalTheme.typography.sizes.sm,
    fontWeight: '800',
    color: AmalTheme.colors.primary,
    marginBottom: 4,
  },
  easeBody: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.secondaryLight,
    lineHeight: 18,
    marginBottom: AmalTheme.spacing[3],
  },
  easeBtn: {
    alignSelf: 'flex-start',
  },
  easeBtnText: {
    color: AmalTheme.colors.primary,
    fontWeight: '800',
    fontSize: AmalTheme.typography.sizes.xs,
    textDecorationLine: 'underline',
  },
  sectionHeader: {
    fontSize: AmalTheme.typography.sizes.xs,
    fontWeight: '800',
    letterSpacing: 1,
    color: AmalTheme.colors.text.secondaryLight,
    marginBottom: AmalTheme.spacing[3],
  },
  phaseCard: {
    backgroundColor: AmalTheme.colors.surface.cardLight,
    padding: AmalTheme.spacing[4],
    borderRadius: AmalTheme.radii.lg,
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
    marginBottom: AmalTheme.spacing[3],
  },
  phaseTitle: {
    fontSize: AmalTheme.typography.sizes.sm,
    fontWeight: '700',
    color: AmalTheme.colors.text.primaryLight,
  },
  phaseDays: {
    fontSize: 11,
    color: AmalTheme.colors.accent.terracotta,
    fontWeight: '700',
    marginTop: 2,
  },
  phaseFocus: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.secondaryLight,
    marginTop: 4,
  },
  primaryButton: {
    backgroundColor: AmalTheme.colors.primary,
    paddingVertical: AmalTheme.spacing[4],
    borderRadius: AmalTheme.radii.lg,
    alignItems: 'center',
    marginTop: AmalTheme.spacing[3],
    marginBottom: AmalTheme.spacing[8],
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: AmalTheme.typography.sizes.base,
  },
});
