import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AmalTheme } from '@amal/ui';

export default function ScholarDeskScreen() {
  const [filter, setFilter] = useState<'PENDING' | 'IN_REVIEW' | 'COMPLETED'>('PENDING');

  const cases = [
    { id: 'SCH-8421', user: 'Anonymous User #402', category: 'Divorce & Marital Fiqh', urgency: 'Urgent', status: 'PENDING' },
    { id: 'SCH-8419', user: 'Anonymous User #811', category: 'Commercial Contract / Ribā', urgency: 'Standard', status: 'PENDING' },
    { id: 'SCH-8402', user: 'Anonymous User #194', category: 'Oaths & Kaffarah', urgency: 'Standard', status: 'IN_REVIEW' },
    { id: 'SCH-8390', user: 'Anonymous User #922', category: 'Inheritance Distribution', urgency: 'Standard', status: 'COMPLETED' },
  ];

  const filteredCases = cases.filter((c) => c.status === filter);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.categoryLabel}>SCHOLAR PORTAL</Text>
      <Text style={styles.title}>Resident Scholar Desk</Text>
      <Text style={styles.subtitle}>
        Pastoral triage queue. Reviewing sensitive legal matters escalated from AI guardrails.
      </Text>

      {/* Triage Status Pills */}
      <View style={styles.pillRow}>
        {(['PENDING', 'IN_REVIEW', 'COMPLETED'] as const).map((s) => (
          <TouchableOpacity
            key={s}
            style={[styles.statusPill, filter === s && styles.statusPillActive]}
            onPress={() => setFilter(s)}
          >
            <Text style={[styles.statusText, filter === s && styles.statusTextActive]}>
              {s === 'PENDING' && 'Pending (2)'}
              {s === 'IN_REVIEW' && 'In Review (1)'}
              {s === 'COMPLETED' && 'Completed (1)'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Case Queue */}
      <View style={styles.caseList}>
        {filteredCases.map((c) => (
          <View key={c.id} style={styles.caseCard}>
            <View style={styles.caseHeader}>
              <Text style={styles.caseId}>{c.id}</Text>
              <Text style={styles.urgencyTag}>{c.urgency}</Text>
            </View>
            <Text style={styles.caseCat}>{c.category}</Text>
            <Text style={styles.caseUser}>Inquirer: {c.user}</Text>
            <TouchableOpacity style={styles.openCaseBtn}>
              <Text style={styles.openCaseText}>Review Dossier & Formulate Counsel →</Text>
            </TouchableOpacity>
          </View>
        ))}
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
  pillRow: {
    flexDirection: 'row',
    gap: AmalTheme.spacing[2],
    marginBottom: AmalTheme.spacing[4],
  },
  statusPill: {
    paddingHorizontal: AmalTheme.spacing[3],
    paddingVertical: AmalTheme.spacing[2],
    borderRadius: AmalTheme.radii.full,
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
  },
  statusPillActive: {
    backgroundColor: AmalTheme.colors.primary,
    borderColor: AmalTheme.colors.primary,
  },
  statusText: {
    fontSize: AmalTheme.typography.sizes.xs,
    fontWeight: '700',
    color: AmalTheme.colors.text.secondaryLight,
  },
  statusTextActive: {
    color: '#FFFFFF',
  },
  caseList: {
    gap: AmalTheme.spacing[3],
  },
  caseCard: {
    backgroundColor: AmalTheme.colors.surface.cardLight,
    padding: AmalTheme.spacing[4],
    borderRadius: AmalTheme.radii.xl,
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
    ...AmalTheme.shadows.subtle,
  },
  caseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  caseId: {
    fontSize: AmalTheme.typography.sizes.xs,
    fontWeight: '800',
    color: AmalTheme.colors.primary,
  },
  urgencyTag: {
    fontSize: 10,
    fontWeight: '800',
    color: AmalTheme.colors.accent.terracotta,
    backgroundColor: AmalTheme.colors.accent.terracottaLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: AmalTheme.radii.sm,
  },
  caseCat: {
    fontSize: AmalTheme.typography.sizes.base,
    fontWeight: '800',
    color: AmalTheme.colors.text.primaryLight,
    marginTop: 2,
  },
  caseUser: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.secondaryLight,
    marginTop: 2,
    marginBottom: AmalTheme.spacing[3],
  },
  openCaseBtn: {
    paddingVertical: AmalTheme.spacing[2],
    borderTopWidth: 1,
    borderTopColor: AmalTheme.colors.surface.borderLight,
    alignItems: 'center',
  },
  openCaseText: {
    fontSize: AmalTheme.typography.sizes.xs,
    fontWeight: '700',
    color: AmalTheme.colors.primary,
  },
});
