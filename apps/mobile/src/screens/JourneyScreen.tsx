import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AmalTheme } from '@amal/ui';

export const JourneyScreen: React.FC = () => {
  const [showAdaptationNotice, setShowAdaptationNotice] = useState(false);

  const journeys = [
    { title: '14-Day Fajr Recovery', pace: 'Moderate', days: 14, active: true },
    { title: '21-Day Salah Consistency', pace: 'Gentle', days: 21, active: false },
    { title: '14-Day Quran Restart', pace: 'Very Easy', days: 14, active: false },
    { title: '30-Day Daily Quran Habit', pace: 'Steady', days: 30, active: false },
    { title: '7-Day Anger & Patience', pace: 'Gentle', days: 7, active: false },
    { title: '14-Day Time & Deen Alignment', pace: 'Steady', days: 14, active: false },
    { title: 'New Muslim: First 30 Days', pace: 'Supportive', days: 30, active: false },
    { title: '14-Day Ramadan Preparation', pace: 'Steady', days: 14, active: false },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Journeys</Text>
      <Text style={styles.subtitle}>Small, grounded steps · Adaptive pacing without guilt</Text>

      {/* Adaptive Reassurance Banner */}
      <View style={styles.adaptationBanner}>
        <Text style={styles.adaptationHeader}>🌱 The Prophetic Principle of Ease</Text>
        <Text style={styles.adaptationBody}>
          "Indeed, this religion is easy, and no one overburdens himself except that it will overcome him." (Bukhari 39).
          If a routine feels too demanding, AMAL adjusts the difficulty rather than pressuring you.
        </Text>
        <TouchableOpacity
          style={styles.adaptButton}
          onPress={() => setShowAdaptationNotice(!showAdaptationNotice)}
        >
          <Text style={styles.adaptButtonText}>
            {showAdaptationNotice ? 'Hide Adaptive Options' : 'Need a Simpler Pace?'}
          </Text>
        </TouchableOpacity>

        {showAdaptationNotice && (
          <View style={styles.adaptationNoticeBox}>
            <Text style={styles.adaptationNoticeTitle}>Recommended Pace Adjustment:</Text>
            <Text style={styles.adaptationNoticeText}>
              • Daily commitment reduced from 15 mins to 5 mins{'\n'}
              • Phone wind-down simplified to 1 isolated evening habit{'\n'}
              • Zero streak guilt: resume at your natural rhythm
            </Text>
            <TouchableOpacity style={styles.confirmAdaptButton}>
              <Text style={styles.confirmAdaptButtonText}>Apply Gentle Adaptation</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Journey List */}
      <Text style={styles.sectionHeader}>CORE V1 JOURNEYS</Text>
      {journeys.map((j, i) => (
        <View key={i} style={[styles.card, j.active && styles.cardActive]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{j.title}</Text>
            {j.active && <Text style={styles.activeTag}>IN PROGRESS</Text>}
          </View>
          <View style={styles.cardMeta}>
            <Text style={styles.metaText}>{j.days} Days</Text>
            <Text style={styles.metaDot}>·</Text>
            <Text style={styles.metaText}>{j.pace} Pace</Text>
          </View>
          <TouchableOpacity style={[styles.cardAction, j.active && styles.cardActionActive]}>
            <Text style={[styles.cardActionText, j.active && styles.cardActionTextActive]}>
              {j.active ? 'Continue Today (Day 4)' : 'Preview Journey'}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
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
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: AmalTheme.colors.text.primaryLight,
  },
  subtitle: {
    fontSize: 13,
    color: AmalTheme.colors.text.secondaryLight,
    marginTop: 4,
    marginBottom: 20,
  },
  adaptationBanner: {
    backgroundColor: AmalTheme.colors.primaryLight,
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: AmalTheme.colors.primary,
  },
  adaptationHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: AmalTheme.colors.primary,
    marginBottom: 6,
  },
  adaptationBody: {
    fontSize: 13,
    color: AmalTheme.colors.text.secondaryLight,
    lineHeight: 19,
  },
  adaptButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  adaptButtonText: {
    color: AmalTheme.colors.primary,
    fontWeight: '700',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  adaptationNoticeBox: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  adaptationNoticeTitle: {
    fontWeight: '700',
    fontSize: 13,
    color: AmalTheme.colors.primary,
    marginBottom: 4,
  },
  adaptationNoticeText: {
    fontSize: 12,
    color: AmalTheme.colors.text.secondaryLight,
    lineHeight: 18,
  },
  confirmAdaptButton: {
    backgroundColor: AmalTheme.colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  confirmAdaptButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    color: AmalTheme.colors.primary,
    marginBottom: 12,
  },
  card: {
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
  },
  cardActive: {
    borderColor: AmalTheme.colors.primary,
    borderWidth: 1.5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: AmalTheme.colors.text.primaryLight,
  },
  activeTag: {
    fontSize: 10,
    fontWeight: '800',
    color: AmalTheme.colors.primary,
    backgroundColor: AmalTheme.colors.primaryLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 14,
  },
  metaText: {
    fontSize: 12,
    color: AmalTheme.colors.text.secondaryLight,
  },
  metaDot: {
    marginHorizontal: 6,
    color: AmalTheme.colors.text.tertiaryLight,
  },
  cardAction: {
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
    alignItems: 'center',
  },
  cardActionActive: {
    backgroundColor: AmalTheme.colors.primary,
    borderColor: AmalTheme.colors.primary,
  },
  cardActionText: {
    fontSize: 13,
    fontWeight: '600',
    color: AmalTheme.colors.text.secondaryLight,
  },
  cardActionTextActive: {
    color: '#FFFFFF',
  },
});
