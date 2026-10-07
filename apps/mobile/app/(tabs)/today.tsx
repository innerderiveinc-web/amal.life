import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AmalTheme } from '@amal/ui';
import { PrayerTimelineCard, AmalCard, MuhasabahSheet, EvidenceDrawer, OfflineBanner } from '../../components';

export default function TodayScreen() {
  const [evidenceVisible, setEvidenceVisible] = useState(false);
  const [selectedCitation, setSelectedCitation] = useState({
    reference: 'Quran 17:78',
    authorityLevel: 'TIER_1_QURAN',
    arabicText: 'أَقِمِ الصَّلَاةَ لِدُلُوكِ الشَّمْسِ إِلَىٰ غَسَقِ اللَّيْلِ وَقُرْآنَ الْفَجْرِ ۖ إِنَّ قُرْآنَ الْفَجْرِ كَانَ مَشْهُودًا',
    translation: 'Establish prayer at the decline of the sun until the darkness of the night and recite the Qur\'an at dawn. Indeed, the recitation of dawn is ever witnessed.',
    grading: 'MUTAWATIR',
    scholarSignoffs: ['Dr. M. Akram', 'Sheikh T. Adams'],
    provenanceHash: 'sha256-8a9f3b7c2d1e0f...',
  });

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

        {/* 1. Prayer Timeline */}
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

        {/* 2. Today's Primary Amal (Strict 1 Primary Cognitive Load Ceiling) */}
        <AmalCard
          id="amal-daily-1"
          title="Evening Phone Displacement & Wind-Down"
          description="Place your phone across the room 30 minutes before sleep and recite Ayat al-Kursi."
          estimatedMinutes={10}
          why="Directly supports your Fajr recovery goal by removing sleep friction."
          evidenceReference="Sahih al-Bukhari 568 & Quran 17:78"
          isPrimary={true}
          onViewEvidence={() => setEvidenceVisible(true)}
        />

        {/* 3. Active Journey Card */}
        <View style={styles.journeyCard}>
          <View style={styles.journeyHeader}>
            <Text style={styles.journeyCategory}>ACTIVE JOURNEY</Text>
            <Text style={styles.journeyBadge}>Day 4 of 14</Text>
          </View>
          <Text style={styles.journeyTitle}>Fajr Recovery Journey</Text>
          <Text style={styles.journeyDesc}>Week 1 Focus: Evening sleep anchor & calming routine.</Text>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: '28%' }]} />
          </View>
        </View>

        {/* 4. Evening Muhasabah */}
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
});
