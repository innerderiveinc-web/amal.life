import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AmalTheme } from '@amal/ui';

export default function InsightsScreen() {
  const insights = [
    {
      title: 'Morning Quran Recitation Strength',
      pattern: 'You complete Quran sessions 3x more reliably when scheduled between 6:30 AM and 7:30 AM.',
      action: 'Keep Quran anchored immediately after Fajr',
    },
    {
      title: 'Evening Routine & Fajr Link',
      pattern: 'Placing phone outside the bedroom correlates 92% with waking up peacefully before sunrise.',
      action: 'Maintain evening wind-down anchor',
    },
    {
      title: 'Sustainable Duration Ceiling',
      pattern: '10-minute micro-habits have proven twice as consistent as 30-minute targets.',
      action: 'Keep 10-minute daily ceiling active',
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.categoryLabel}>PATTERN OBSERVATIONS</Text>
      <Text style={styles.title}>Personal Insights</Text>
      <Text style={styles.subtitle}>
        Objective behavioral patterns observed across your completed actions. Never spiritual evaluations.
      </Text>

      <View style={styles.list}>
        {insights.map((ins, idx) => (
          <View key={idx} style={styles.insightCard}>
            <Text style={styles.cardTitle}>{ins.title}</Text>
            <Text style={styles.cardPattern}>{ins.pattern}</Text>
            <View style={styles.actionPill}>
              <Text style={styles.actionText}>💡 Adaptation: {ins.action}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.disclaimerBox}>
        <Text style={styles.disclaimerTitle}>🌱 INTEGRITY PRINCIPLE</Text>
        <Text style={styles.disclaimerText}>
          AMAL measures feasibility, consistency, and friction. It never measures your Iman, piety,
          or standing before Allah.
        </Text>
      </View>
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
  list: {
    gap: AmalTheme.spacing[3],
    marginBottom: AmalTheme.spacing[5],
  },
  insightCard: {
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderRadius: AmalTheme.radii.xl,
    padding: AmalTheme.spacing[5],
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
    ...AmalTheme.shadows.subtle,
  },
  cardTitle: {
    fontSize: AmalTheme.typography.sizes.base,
    fontWeight: '800',
    color: AmalTheme.colors.text.primaryLight,
    marginBottom: 4,
  },
  cardPattern: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.secondaryLight,
    lineHeight: 18,
    marginBottom: AmalTheme.spacing[3],
  },
  actionPill: {
    backgroundColor: AmalTheme.colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: AmalTheme.radii.md,
    alignSelf: 'flex-start',
  },
  actionText: {
    fontSize: 11,
    fontWeight: '700',
    color: AmalTheme.colors.primary,
  },
  disclaimerBox: {
    backgroundColor: AmalTheme.colors.accent.sand,
    borderRadius: AmalTheme.radii.lg,
    padding: AmalTheme.spacing[4],
    marginBottom: AmalTheme.spacing[8],
  },
  disclaimerTitle: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    color: AmalTheme.colors.primary,
    marginBottom: 4,
  },
  disclaimerText: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.secondaryLight,
    lineHeight: 18,
  },
});
