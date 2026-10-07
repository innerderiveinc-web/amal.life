import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AmalTheme } from '@amal/ui';

export default function FamilyHubScreen() {
  const members = [
    { name: 'Ahmad (You)', role: 'Family Admin', status: 'Active Journey: Fajr Recovery' },
    { name: 'Fatima', role: 'Spouse (Adult)', status: 'Active Journey: Quran Restart' },
    { name: 'Zayd', role: 'Teen', status: 'Shared Habit: Daily Hadith' },
    { name: 'Maryam', role: 'Child', status: 'Shared Habit: Morning Dhikr' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.categoryLabel}>HOUSEHOLD COORDINATION</Text>
      <Text style={styles.title}>Al-Mansoor Household</Text>
      <Text style={styles.subtitle}>
        Encourage and coordinate joint worship while protecting individual spiritual privacy.
      </Text>

      {/* Strict Privacy Isolation Guarantee */}
      <View style={styles.privacyIsolationCard}>
        <Text style={styles.privacyBadge}>🔒 ADULT REFLECTION ISOLATION</Text>
        <Text style={styles.privacyNotice}>
          Individual journals, Muhasabah reflections, and personal Fiqh queries are strictly isolated
          and cryptographically locked. Family members only see shared group habits.
        </Text>
      </View>

      {/* Active Family Program */}
      <View style={styles.groupProgramCard}>
        <Text style={styles.programLabel}>SHARED HOUSEHOLD HABIT</Text>
        <Text style={styles.programTitle}>Evening Congregational Adhkar</Text>
        <Text style={styles.programDesc}>Gather for 5 minutes after Maghrib for evening remembrance.</Text>
        <TouchableOpacity style={styles.nudgeBtn}>
          <Text style={styles.nudgeBtnText}>Send Gentle Family Reminder</Text>
        </TouchableOpacity>
      </View>

      {/* Member List */}
      <Text style={styles.sectionHeader}>HOUSEHOLD MEMBERS (4)</Text>
      {members.map((m, idx) => (
        <View key={idx} style={styles.memberCard}>
          <View style={styles.memberAvatar}>
            <Text style={styles.memberAvatarText}>{m.name.charAt(0)}</Text>
          </View>
          <View style={styles.memberInfo}>
            <Text style={styles.memberName}>{m.name}</Text>
            <Text style={styles.memberRole}>{m.role}</Text>
            <Text style={styles.memberStatus}>{m.status}</Text>
          </View>
        </View>
      ))}
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
  privacyIsolationCard: {
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderRadius: AmalTheme.radii.lg,
    padding: AmalTheme.spacing[4],
    borderWidth: 1,
    borderColor: AmalTheme.colors.accent.terracottaLight,
    marginBottom: AmalTheme.spacing[4],
  },
  privacyBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: AmalTheme.colors.accent.terracotta,
    letterSpacing: 1,
    marginBottom: 4,
  },
  privacyNotice: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.secondaryLight,
    lineHeight: 18,
  },
  groupProgramCard: {
    backgroundColor: AmalTheme.colors.primaryLight,
    borderRadius: AmalTheme.radii.xl,
    padding: AmalTheme.spacing[5],
    marginBottom: AmalTheme.spacing[5],
    borderWidth: 1,
    borderColor: AmalTheme.colors.primary,
  },
  programLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    color: AmalTheme.colors.primary,
    marginBottom: 2,
  },
  programTitle: {
    fontSize: AmalTheme.typography.sizes.lg,
    fontWeight: '800',
    color: AmalTheme.colors.primary,
  },
  programDesc: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.secondaryLight,
    marginTop: 4,
    marginBottom: AmalTheme.spacing[3],
  },
  nudgeBtn: {
    backgroundColor: AmalTheme.colors.primary,
    paddingVertical: AmalTheme.spacing[2],
    paddingHorizontal: AmalTheme.spacing[4],
    borderRadius: AmalTheme.radii.md,
    alignSelf: 'flex-start',
  },
  nudgeBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: AmalTheme.typography.sizes.xs,
  },
  sectionHeader: {
    fontSize: AmalTheme.typography.sizes.xs,
    fontWeight: '800',
    letterSpacing: 1,
    color: AmalTheme.colors.text.secondaryLight,
    marginBottom: AmalTheme.spacing[3],
  },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AmalTheme.colors.surface.cardLight,
    padding: AmalTheme.spacing[4],
    borderRadius: AmalTheme.radii.lg,
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
    marginBottom: AmalTheme.spacing[3],
  },
  memberAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: AmalTheme.colors.accent.sand,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: AmalTheme.spacing[3],
  },
  memberAvatarText: {
    fontSize: AmalTheme.typography.sizes.base,
    fontWeight: '800',
    color: AmalTheme.colors.primary,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: AmalTheme.typography.sizes.sm,
    fontWeight: '700',
    color: AmalTheme.colors.text.primaryLight,
  },
  memberRole: {
    fontSize: 11,
    color: AmalTheme.colors.text.secondaryLight,
  },
  memberStatus: {
    fontSize: 10,
    color: AmalTheme.colors.primary,
    fontWeight: '600',
    marginTop: 2,
  },
});
