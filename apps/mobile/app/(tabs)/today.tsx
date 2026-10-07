import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AmalTheme } from '@amal/ui';
import { PrayerTimelineCard, AmalCard, MuhasabahSheet, EvidenceDrawer, OfflineBanner } from '../../components';
import { TodayState } from '@amal/types';

export default function TodayScreen() {
  const [evidenceVisible, setEvidenceVisible] = useState(false);
  const [todayState, setTodayState] = useState<TodayState>('ACTIVE');

  const selectedCitation = {
    reference: 'Quran 17:78',
    authorityLevel: 'TIER_1_QURAN',
    arabicText: 'أَقِمِ الصَّلَاةَ لِدُلُوكِ الشَّمْسِ إِلَىٰ غَسَقِ اللَّيْلِ وَقُرْآنَ الْفَجْرِ ۖ إِنَّ قُرْآنَ الْفَجْرِ كَانَ مَشْهُودًا',
    translation: 'Establish prayer at the decline of the sun until the darkness of the night and recite the Qur\'an at dawn. Indeed, the recitation of dawn is ever witnessed.',
    grading: 'MUTAWATIR',
    scholarSignoffs: ['Dr. M. Akram', 'Sheikh T. Adams'],
    provenanceHash: 'sha256-8a9f3b7c2d1e0f...',
  };

  return (
    <View style={styles.container}>
      <OfflineBanner isOffline={false} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.dateLabel}>14 Shawwal 1447 · Wednesday, 7 Oct</Text>
          <Text style={styles.greeting}>Good morning, Ahmad.</Text>
          <Text style={styles.tagline}>From Niyyah to Amal.</Text>
        </View>

        {/* State Banner / Contextual Feedback */}
        {todayState === 'LOW_CAPACITY' && (
          <View style={styles.stateNoticeBox}>
            <Text style={styles.stateNoticeTitle}>🌱 Let's keep today light</Text>
            <Text style={styles.stateNoticeBody}>
              Your planned target is reduced to a 5-minute micro-habit to match your lower energy today.
            </Text>
          </View>
        )}

        {todayState === 'HIGH_BURDEN' && (
          <View style={[styles.stateNoticeBox, styles.highBurdenNotice]}>
            <Text style={styles.stateNoticeTitle}>⏱ Your plan looks full today</Text>
            <Text style={styles.stateNoticeBody}>
              Active commitments total 35 mins. Would you like to simplify or pause one journey?
            </Text>
            <TouchableOpacity style={styles.simplifyBtn}>
              <Text style={styles.simplifyBtnText}>Simplify Today's Load</Text>
            </TouchableOpacity>
          </View>
        )}

        {todayState === 'RESTART' && (
          <View style={styles.stateNoticeBox}>
            <Text style={styles.stateNoticeTitle}>🌿 Ready to restart?</Text>
            <Text style={styles.stateNoticeBody}>
              Welcome back. No streaks to make up; restart gently right from today.
            </Text>
          </View>
        )}

        {todayState === 'COMPLETED' && (
          <View style={[styles.stateNoticeBox, styles.completedNotice]}>
            <Text style={styles.stateNoticeTitle}>✓ You've completed today's primary Amal</Text>
            <Text style={styles.stateNoticeBody}>
              May Allah accept your effort with sincerity. Rest your mind for tomorrow.
            </Text>
          </View>
        )}

        {/* 1. Prayer Timeline (Contextual Anchor) */}
        <PrayerTimelineCard
          currentPrayer="Asr"
          countdown="in 42 min"
          calculationMethod="Muslim World League · Standard Asr"
          prayers={[
            { name: 'Fajr', time: '5:12 AM', status: 'COMPLETED' },
            { name: 'Sunrise', time: '6:34 AM', status: 'COMPLETED' },
            { name: 'Dhuhr', time: '12:45 PM', status: 'COMPLETED' },
            { name: 'Asr', time: '4:15 PM', status: 'CURRENT' },
            { name: 'Maghrib', time: '6:58 PM', status: 'UPCOMING' },
            { name: 'Isha', time: '8:24 PM', status: 'UPCOMING' },
          ]}
        />

        {/* 2. Today's Primary Amal (Strict 1 Primary Load Ceiling) */}
        {todayState !== 'EMPTY' && (
          <AmalCard
            id="amal-daily-1"
            title="Read one page of Quran"
            description="Quiet contemplation after Fajr or during your morning window."
            estimatedMinutes={5}
            minimumText="Minimum: 1 page (~5 min)"
            targetText="Target: 5 pages (~15 min)"
            whyExplanation={{
              goalFit: 'Fits your stated goal to restart your Quran routine.',
              timeFit: 'Calibrated to your planned 10-minute daily capacity.',
              journeyFit: 'Minimum consistent action in Phase 1 (Restart).',
              evidenceSummary: 'Directly supported by Quran 17:78 & Sahih al-Bukhari 6464.',
              personalization: 'Matches your confirmed preference for short morning habits.',
            }}
            evidenceReference="Quran 17:78 & Sahih al-Bukhari 6464"
            isPrimary={true}
            onViewEvidence={() => setEvidenceVisible(true)}
            onComplete={(level) => {
              if (level === 'FULL') setTodayState('COMPLETED');
            }}
          />
        )}

        {/* 3. Optional Support Action (0-2 max) */}
        {todayState === 'ACTIVE' && (
          <AmalCard
            id="amal-daily-opt"
            title="2-Minute Bedtime Istighfar"
            description="Brief moment of stillness and remembrance before sleep."
            estimatedMinutes={2}
            minimumText="Minimum: 33x Astaghfirullah (~1 min)"
            targetText="Target: Sayyid al-Istighfar (~2 min)"
            evidenceReference="Sahih al-Bukhari 6306"
            isPrimary={false}
          />
        )}

        {/* 4. Active Journey Card */}
        {todayState !== 'EMPTY' && (
          <View style={styles.journeyCard}>
            <View style={styles.journeyHeader}>
              <Text style={styles.journeyCategory}>ACTIVE JOURNEY</Text>
              <Text style={styles.journeyBadge}>Day 4 of 30</Text>
            </View>
            <Text style={styles.journeyTitle}>30-Day Quran Restart</Text>
            <Text style={styles.journeyDesc}>Phase 1: Restart Gently · 4 meaningful completions this week</Text>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: '13%' }]} />
            </View>
          </View>
        )}

        {/* Empty State Fallback */}
        {todayState === 'EMPTY' && (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>What would you like to work on?</Text>
            <Text style={styles.emptyDesc}>Choose one small goal to anchor your day without pressure.</Text>
            <TouchableOpacity style={styles.emptyBtn}>
              <Text style={styles.emptyBtnText}>Explore 8 Core Journeys</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* 5. Evening Muhasabah */}
        <MuhasabahSheet />
      </ScrollView>

      {/* Governed Evidence Drawer */}
      <EvidenceDrawer
        visible={evidenceVisible}
        onClose={() => setEvidenceVisible(false)}
        citation={selectedCitation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AmalTheme.colors.surface.backgroundLight,
  },
  scrollContent: {
    padding: AmalTheme.spacing[5],
    paddingTop: AmalTheme.spacing[10],
  },
  header: {
    marginBottom: AmalTheme.spacing[5],
  },
  dateLabel: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.tertiaryLight,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  greeting: {
    fontSize: AmalTheme.typography.sizes['3xl'],
    fontWeight: '800',
    color: AmalTheme.colors.text.primaryLight,
  },
  tagline: {
    fontSize: AmalTheme.typography.sizes.sm,
    color: AmalTheme.colors.primaryMuted,
    fontWeight: '600',
    marginTop: 2,
  },
  stateNoticeBox: {
    backgroundColor: AmalTheme.colors.primaryLight,
    borderRadius: AmalTheme.radii.lg,
    padding: AmalTheme.spacing[4],
    marginBottom: AmalTheme.spacing[4],
    borderWidth: 1,
    borderColor: AmalTheme.colors.primary,
  },
  highBurdenNotice: {
    backgroundColor: AmalTheme.colors.accent.terracottaLight,
    borderColor: AmalTheme.colors.accent.terracotta,
  },
  completedNotice: {
    backgroundColor: AmalTheme.colors.status.successLight,
    borderColor: AmalTheme.colors.status.success,
  },
  stateNoticeTitle: {
    fontSize: AmalTheme.typography.sizes.sm,
    fontWeight: '800',
    color: AmalTheme.colors.text.primaryLight,
    marginBottom: 2,
  },
  stateNoticeBody: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.secondaryLight,
    lineHeight: 18,
  },
  simplifyBtn: {
    backgroundColor: AmalTheme.colors.accent.terracotta,
    paddingVertical: AmalTheme.spacing[2],
    paddingHorizontal: AmalTheme.spacing[3],
    borderRadius: AmalTheme.radii.md,
    alignSelf: 'flex-start',
    marginTop: AmalTheme.spacing[2],
  },
  simplifyBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: AmalTheme.typography.sizes.xs,
  },
  journeyCard: {
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderRadius: AmalTheme.radii.xl,
    padding: AmalTheme.spacing[5],
    marginBottom: AmalTheme.spacing[4],
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
    ...AmalTheme.shadows.card,
  },
  journeyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: AmalTheme.spacing[2],
  },
  journeyCategory: {
    fontSize: AmalTheme.typography.sizes.xs,
    fontWeight: '800',
    color: AmalTheme.colors.primary,
    letterSpacing: 1,
  },
  journeyBadge: {
    fontSize: AmalTheme.typography.sizes.xs,
    fontWeight: '700',
    color: AmalTheme.colors.accent.terracotta,
    backgroundColor: AmalTheme.colors.accent.terracottaLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: AmalTheme.radii.full,
  },
  journeyTitle: {
    fontSize: AmalTheme.typography.sizes.lg,
    fontWeight: '800',
    color: AmalTheme.colors.text.primaryLight,
  },
  journeyDesc: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.secondaryLight,
    marginTop: 4,
    marginBottom: AmalTheme.spacing[3],
  },
  progressTrack: {
    height: 6,
    backgroundColor: AmalTheme.colors.surface.borderLight,
    borderRadius: 3,
  },
  progressFill: {
    height: 6,
    backgroundColor: AmalTheme.colors.primary,
    borderRadius: 3,
  },
  emptyCard: {
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderRadius: AmalTheme.radii.xl,
    padding: AmalTheme.spacing[6],
    alignItems: 'center',
    marginBottom: AmalTheme.spacing[4],
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
  },
  emptyTitle: {
    fontSize: AmalTheme.typography.sizes.base,
    fontWeight: '800',
    color: AmalTheme.colors.text.primaryLight,
  },
  emptyDesc: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.secondaryLight,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: AmalTheme.spacing[4],
  },
  emptyBtn: {
    backgroundColor: AmalTheme.colors.primary,
    paddingVertical: AmalTheme.spacing[3],
    paddingHorizontal: AmalTheme.spacing[4],
    borderRadius: AmalTheme.radii.lg,
  },
  emptyBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: AmalTheme.typography.sizes.xs,
  },
});
