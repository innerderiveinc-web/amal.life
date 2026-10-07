import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AmalTheme } from '@amal/ui';

export default function AmalTabScreen() {
  const [activeTab, setActiveTab] = useState<'ACTIVE' | 'DISCOVER'>('ACTIVE');
  const [showAdaptationPrompt, setShowAdaptationPrompt] = useState(false);
  const [showReviewPrompt, setShowReviewPrompt] = useState(false);
  const [showRestartPrompt, setShowRestartPrompt] = useState(false);

  const canonicalJourneys = [
    { id: 'j-fajr', title: '14-Day Fajr Recovery', pace: 'Moderate', days: 14, category: 'Worship' },
    { id: 'j-salah', title: '21-Day Salah Consistency', pace: 'Gentle', days: 21, category: 'Worship' },
    { id: 'j-quran-restart', title: '14-Day Quran Restart', pace: 'Very Easy', days: 14, category: 'Habits' },
    { id: 'j-quran-daily', title: '30-Day Daily Quran Habit', pace: 'Steady', days: 30, category: 'Habits' },
    { id: 'j-sabr', title: '14-Day Anger & Patience (Sabr)', pace: 'Gentle', days: 14, category: 'Character' },
    { id: 'j-time', title: '21-Day Time & Deen Alignment', pace: 'Steady', days: 21, category: 'Habits' },
    { id: 'j-new-muslim', title: '30-Day New Muslim Foundation', pace: 'Supportive', days: 30, category: 'Foundations' },
    { id: 'j-ramadan', title: '30-Day Ramadan Preparation', pace: 'Steady', days: 30, category: 'Seasons' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.categoryLabel}>PROGRAMS & PRACTICE</Text>
      <Text style={styles.title}>Amal Journeys</Text>
      <Text style={styles.subtitle}>
        Structured, gentle progression. Non-punitive pacing grounded in Prophetic ease.
      </Text>

      {/* Tab Switcher */}
      <View style={styles.tabSwitch}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'ACTIVE' && styles.tabButtonActive]}
          onPress={() => setActiveTab('ACTIVE')}
        >
          <Text style={[styles.tabText, activeTab === 'ACTIVE' && styles.tabTextActive]}>
            Active Journey (1)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'DISCOVER' && styles.tabButtonActive]}
          onPress={() => setActiveTab('DISCOVER')}
        >
          <Text style={[styles.tabText, activeTab === 'DISCOVER' && styles.tabTextActive]}>
            Discover Catalog (8)
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'ACTIVE' ? (
        <View style={styles.activeSection}>
          <View style={styles.activeCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardCat}>FAJR RECOVERY</Text>
              <Text style={styles.activeTag}>Day 4 of 14</Text>
            </View>
            <Text style={styles.activeTitle}>14-Day Fajr Recovery</Text>
            <Text style={styles.activeDescription}>
              Building an intentional evening wind-down anchor to wake with ease.
            </Text>

            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '28%' }]} />
            </View>

            <View style={styles.activeActions}>
              <TouchableOpacity style={styles.primaryActionBtn}>
                <Text style={styles.primaryActionText}>Continue Today's Amal</Text>
              </TouchableOpacity>
              
              <View style={styles.controlRow}>
                <TouchableOpacity
                  style={styles.controlPill}
                  onPress={() => setShowAdaptationPrompt(!showAdaptationPrompt)}
                >
                  <Text style={styles.controlPillText}>Need a Simpler Pace?</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.controlPill}
                  onPress={() => setShowReviewPrompt(!showReviewPrompt)}
                >
                  <Text style={styles.controlPillText}>Phase Review</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.controlPill}
                  onPress={() => setShowRestartPrompt(!showRestartPrompt)}
                >
                  <Text style={styles.controlPillText}>Restart Options</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Section 30: Adaptation UX */}
          {showAdaptationPrompt && (
            <View style={styles.adaptationCard}>
              <Text style={styles.adaptationCardTitle}>ADJUST YOUR JOURNEY?</Text>
              <Text style={styles.adaptationCardBody}>
                You've completed shorter morning sessions more consistently recently.
              </Text>
              <View style={styles.adaptationChangeBox}>
                <Text style={styles.changeFrom}>20 min evening</Text>
                <Text style={styles.changeArrow}>→</Text>
                <Text style={styles.changeTo}>10 min morning</Text>
              </View>
              <View style={styles.adaptationBtnRow}>
                <TouchableOpacity style={styles.adaptApplyBtn}>
                  <Text style={styles.adaptApplyText}>Apply Change</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.adaptKeepBtn} onPress={() => setShowAdaptationPrompt(false)}>
                  <Text style={styles.adaptKeepText}>Keep Current</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Section 29: Journey Review */}
          {showReviewPrompt && (
            <View style={styles.reviewCard}>
              <Text style={styles.reviewCardTitle}>PHASE 1 MILESTONE REVIEW</Text>
              <Text style={styles.reviewQuestion}>What is working?</Text>
              <View style={styles.chipRow}>
                {['Too easy', 'Manageable', 'Difficult'].map((opt, i) => (
                  <TouchableOpacity key={i} style={styles.reviewChip}>
                    <Text style={styles.reviewChipText}>{opt}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={[styles.reviewQuestion, { marginTop: 10 }]}>What should change?</Text>
              <View style={styles.chipRow}>
                {['Keep it', 'Make it shorter', 'Change time', 'Pause'].map((opt, i) => (
                  <TouchableOpacity key={i} style={styles.reviewChip}>
                    <Text style={styles.reviewChipText}>{opt}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Section 32: Restart UX */}
          {showRestartPrompt && (
            <View style={styles.restartCard}>
              <Text style={styles.restartTitle}>WELCOME BACK</Text>
              <Text style={styles.restartSubtitle}>
                Previous journey: 14-Day Fajr Recovery · What worked before: Short morning sessions.
              </Text>
              <View style={styles.chipRow}>
                {['Restart Gently', 'Simplify Target', 'Change Time', 'Pause', 'Start Something New'].map((r, i) => (
                  <TouchableOpacity key={i} style={styles.restartOptionBtn}>
                    <Text style={styles.restartOptionText}>{r}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Ease Principle Quote */}
          <View style={styles.quoteCard}>
            <Text style={styles.quoteHeader}>🌱 PROPHETIC PRINCIPLE</Text>
            <Text style={styles.quoteText}>
              "The most beloved of deeds to Allah are those that are most consistent, even if they are small." (Sahih al-Bukhari 6464)
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.discoverSection}>
          {canonicalJourneys.map((j) => (
            <View key={j.id} style={styles.catalogCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.catalogTitle}>{j.title}</Text>
                <Text style={styles.badge}>{j.pace}</Text>
              </View>
              <Text style={styles.metaRow}>
                {j.days} Days · Category: {j.category} · Evidence Reviewed
              </Text>
              <TouchableOpacity style={styles.previewBtn}>
                <Text style={styles.previewText}>Preview Curriculum & Grounding</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
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
  tabSwitch: {
    flexDirection: 'row',
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderRadius: AmalTheme.radii.lg,
    padding: 4,
    marginBottom: AmalTheme.spacing[4],
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
  },
  tabButton: {
    flex: 1,
    paddingVertical: AmalTheme.spacing[2],
    alignItems: 'center',
    borderRadius: AmalTheme.radii.md,
  },
  tabButtonActive: {
    backgroundColor: AmalTheme.colors.primary,
  },
  tabText: {
    fontSize: AmalTheme.typography.sizes.xs,
    fontWeight: '700',
    color: AmalTheme.colors.text.secondaryLight,
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  activeSection: {
    marginTop: AmalTheme.spacing[1],
  },
  activeCard: {
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderRadius: AmalTheme.radii.xl,
    padding: AmalTheme.spacing[5],
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
    marginBottom: AmalTheme.spacing[4],
    ...AmalTheme.shadows.card,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: AmalTheme.spacing[2],
  },
  cardCat: {
    fontSize: AmalTheme.typography.sizes.xs,
    fontWeight: '800',
    letterSpacing: 1,
    color: AmalTheme.colors.primary,
  },
  activeTag: {
    fontSize: 11,
    fontWeight: '700',
    color: AmalTheme.colors.accent.terracotta,
    backgroundColor: AmalTheme.colors.accent.terracottaLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: AmalTheme.radii.full,
  },
  activeTitle: {
    fontSize: AmalTheme.typography.sizes.xl,
    fontWeight: '800',
    color: AmalTheme.colors.text.primaryLight,
    marginBottom: 4,
  },
  activeDescription: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.secondaryLight,
    lineHeight: 18,
    marginBottom: AmalTheme.spacing[4],
  },
  progressBar: {
    height: 6,
    backgroundColor: AmalTheme.colors.surface.borderLight,
    borderRadius: 3,
    marginBottom: AmalTheme.spacing[4],
  },
  progressFill: {
    height: 6,
    backgroundColor: AmalTheme.colors.primary,
    borderRadius: 3,
  },
  activeActions: {
    gap: AmalTheme.spacing[3],
  },
  primaryActionBtn: {
    backgroundColor: AmalTheme.colors.primary,
    paddingVertical: AmalTheme.spacing[3],
    borderRadius: AmalTheme.radii.lg,
    alignItems: 'center',
  },
  primaryActionText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: AmalTheme.typography.sizes.sm,
  },
  controlRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  controlPill: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: AmalTheme.colors.surface.backgroundLight,
    borderRadius: AmalTheme.radii.full,
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
  },
  controlPillText: {
    color: AmalTheme.colors.primary,
    fontWeight: '700',
    fontSize: 11,
  },
  adaptationCard: {
    backgroundColor: AmalTheme.colors.primaryLight,
    borderRadius: AmalTheme.radii.xl,
    padding: AmalTheme.spacing[4],
    borderWidth: 1,
    borderColor: AmalTheme.colors.primary,
    marginBottom: AmalTheme.spacing[4],
  },
  adaptationCardTitle: {
    fontSize: AmalTheme.typography.sizes.xs,
    fontWeight: '800',
    color: AmalTheme.colors.primary,
    letterSpacing: 0.8,
  },
  adaptationCardBody: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.secondaryLight,
    marginTop: 2,
    lineHeight: 18,
  },
  adaptationChangeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: AmalTheme.spacing[2],
    gap: 8,
  },
  changeFrom: {
    fontSize: AmalTheme.typography.sizes.sm,
    color: AmalTheme.colors.text.secondaryLight,
    textDecorationLine: 'line-through',
  },
  changeArrow: {
    fontSize: AmalTheme.typography.sizes.sm,
    fontWeight: '700',
    color: AmalTheme.colors.primary,
  },
  changeTo: {
    fontSize: AmalTheme.typography.sizes.sm,
    fontWeight: '800',
    color: AmalTheme.colors.primary,
  },
  adaptationBtnRow: {
    flexDirection: 'row',
    gap: AmalTheme.spacing[2],
  },
  adaptApplyBtn: {
    backgroundColor: AmalTheme.colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: AmalTheme.radii.md,
  },
  adaptApplyText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  adaptKeepBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  adaptKeepText: {
    color: AmalTheme.colors.text.secondaryLight,
    fontSize: 12,
    fontWeight: '600',
  },
  reviewCard: {
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderRadius: AmalTheme.radii.xl,
    padding: AmalTheme.spacing[4],
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
    marginBottom: AmalTheme.spacing[4],
  },
  reviewCardTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: AmalTheme.colors.primary,
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  reviewQuestion: {
    fontSize: 12,
    fontWeight: '700',
    color: AmalTheme.colors.text.primaryLight,
    marginBottom: 4,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  reviewChip: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: AmalTheme.radii.full,
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
    backgroundColor: AmalTheme.colors.surface.backgroundLight,
  },
  reviewChipText: {
    fontSize: 11,
    color: AmalTheme.colors.text.secondaryLight,
  },
  restartCard: {
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderRadius: AmalTheme.radii.xl,
    padding: AmalTheme.spacing[4],
    borderWidth: 1,
    borderColor: AmalTheme.colors.accent.sand,
    marginBottom: AmalTheme.spacing[4],
  },
  restartTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: AmalTheme.colors.accent.terracotta,
    letterSpacing: 1,
  },
  restartSubtitle: {
    fontSize: 12,
    color: AmalTheme.colors.text.secondaryLight,
    marginVertical: 4,
    lineHeight: 18,
  },
  restartOptionBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: AmalTheme.radii.md,
    backgroundColor: AmalTheme.colors.primaryLight,
  },
  restartOptionText: {
    fontSize: 11,
    color: AmalTheme.colors.primary,
    fontWeight: '700',
  },
  quoteCard: {
    backgroundColor: AmalTheme.colors.accent.sand,
    borderRadius: AmalTheme.radii.lg,
    padding: AmalTheme.spacing[4],
    marginBottom: AmalTheme.spacing[5],
  },
  quoteHeader: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    color: AmalTheme.colors.primary,
    marginBottom: 4,
  },
  quoteText: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.primaryLight,
    fontStyle: 'italic',
    lineHeight: 18,
  },
  discoverSection: {
    gap: AmalTheme.spacing[3],
  },
  catalogCard: {
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderRadius: AmalTheme.radii.lg,
    padding: AmalTheme.spacing[4],
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
  },
  catalogTitle: {
    fontSize: AmalTheme.typography.sizes.base,
    fontWeight: '700',
    color: AmalTheme.colors.text.primaryLight,
  },
  badge: {
    fontSize: 11,
    fontWeight: '700',
    color: AmalTheme.colors.primary,
    backgroundColor: AmalTheme.colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: AmalTheme.radii.full,
  },
  metaRow: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.secondaryLight,
    marginTop: 4,
    marginBottom: AmalTheme.spacing[3],
  },
  previewBtn: {
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
    paddingVertical: AmalTheme.spacing[2],
    borderRadius: AmalTheme.radii.md,
    alignItems: 'center',
  },
  previewText: {
    fontSize: AmalTheme.typography.sizes.xs,
    fontWeight: '600',
    color: AmalTheme.colors.text.secondaryLight,
  },
});
