import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AmalTheme } from '@amal/ui';

export const TodayScreen: React.FC = () => {
  const [amalDone, setAmalDone] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Good morning, Ahmad.</Text>
        <Text style={styles.subGreeting}>From Niyyah to Amal.</Text>
      </View>

      {/* 1. Next Prayer Card (Under 5-second grasp) */}
      <View style={styles.prayerCard}>
        <Text style={styles.cardCategory}>NEXT PRAYER</Text>
        <View style={styles.prayerRow}>
          <Text style={styles.prayerName}>ASR</Text>
          <Text style={styles.prayerCountdown}>in 42 min</Text>
        </View>
        <Text style={styles.prayerTimeDetail}>3:52 PM · Standard Calculation · Quiet Preparation</Text>
      </View>

      {/* 2. Today's Amal (One Primary Meaningful Action) */}
      <View style={styles.amalCard}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardCategory}>TODAY'S AMAL</Text>
          <Text style={styles.timeTag}>10 min</Text>
        </View>
        <Text style={styles.amalTitle}>Call your parents today</Text>
        <Text style={styles.amalWhy}>Why: Family relationship journey · Connecting ties of kinship</Text>
        <View style={styles.evidenceBadge}>
          <Text style={styles.evidenceText}>Evidence: Quran 17:23 ("And to parents, good treatment")</Text>
        </View>
        <TouchableOpacity
          style={[styles.doneButton, amalDone && styles.doneButtonCompleted]}
          onPress={() => setAmalDone(!amalDone)}
        >
          <Text style={styles.doneButtonText}>
            {amalDone ? '✓ Completed with Sincerity' : 'Mark as Done'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 3. Active Journey Card */}
      <View style={styles.journeyCard}>
        <Text style={styles.cardCategory}>ACTIVE JOURNEY</Text>
        <Text style={styles.journeyTitle}>Fajr Recovery · Day 4</Text>
        <Text style={styles.journeyGoal}>Resetting your evening anchor & wind-down routine.</Text>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: '28%' }]} />
        </View>
      </View>

      {/* 4. Reflection Prompt */}
      <View style={styles.reflectionCard}>
        <Text style={styles.cardCategory}>CALM MUHASABAH</Text>
        <Text style={styles.reflectionPrompt}>
          "What is one small blessing you noticed in your routine today?"
        </Text>
        <TouchableOpacity style={styles.reflectButton}>
          <Text style={styles.reflectButtonText}>Open Daily Reflection</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AmalTheme.colors.surface.backgroundLight,
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: AmalTheme.colors.text.primaryLight,
  },
  subGreeting: {
    fontSize: 15,
    color: AmalTheme.colors.text.secondaryLight,
    marginTop: 4,
  },
  cardCategory: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    color: AmalTheme.colors.primary,
    marginBottom: 6,
  },
  prayerCard: {
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
  },
  prayerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  prayerName: {
    fontSize: 32,
    fontWeight: '800',
    color: AmalTheme.colors.text.primaryLight,
  },
  prayerCountdown: {
    fontSize: 18,
    fontWeight: '600',
    color: AmalTheme.colors.accent.terracotta,
  },
  prayerTimeDetail: {
    fontSize: 13,
    color: AmalTheme.colors.text.secondaryLight,
    marginTop: 6,
  },
  amalCard: {
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeTag: {
    fontSize: 12,
    backgroundColor: AmalTheme.colors.primaryLight,
    color: AmalTheme.colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    fontWeight: '600',
  },
  amalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: AmalTheme.colors.text.primaryLight,
    marginTop: 8,
  },
  amalWhy: {
    fontSize: 14,
    color: AmalTheme.colors.text.secondaryLight,
    marginTop: 4,
  },
  evidenceBadge: {
    backgroundColor: AmalTheme.colors.accent.sand,
    padding: 10,
    borderRadius: 8,
    marginTop: 12,
  },
  evidenceText: {
    fontSize: 12,
    color: AmalTheme.colors.text.primaryLight,
    fontStyle: 'italic',
  },
  doneButton: {
    backgroundColor: AmalTheme.colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  doneButtonCompleted: {
    backgroundColor: AmalTheme.colors.status.success,
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
  },
  journeyCard: {
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
  },
  journeyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: AmalTheme.colors.text.primaryLight,
    marginTop: 4,
  },
  journeyGoal: {
    fontSize: 14,
    color: AmalTheme.colors.text.secondaryLight,
    marginTop: 4,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: AmalTheme.colors.surface.borderLight,
    borderRadius: 3,
    marginTop: 14,
  },
  progressBarFill: {
    height: 6,
    backgroundColor: AmalTheme.colors.primary,
    borderRadius: 3,
  },
  reflectionCard: {
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
  },
  reflectionPrompt: {
    fontSize: 15,
    fontStyle: 'italic',
    color: AmalTheme.colors.text.primaryLight,
    marginTop: 4,
    lineHeight: 22,
  },
  reflectButton: {
    marginTop: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: AmalTheme.colors.primary,
    borderRadius: 8,
    alignItems: 'center',
  },
  reflectButtonText: {
    color: AmalTheme.colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
});
