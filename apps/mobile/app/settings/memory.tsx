import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AmalTheme } from '@amal/ui';

export default function MemoryVaultScreen() {
  const [memories, setMemories] = useState([
    { id: 'm1', fact: 'Target daily practice capacity is 15 minutes', provenance: 'Explicitly declared in onboarding', confirmed: true },
    { id: 'm2', fact: 'Works evening hours until 8 PM on weekdays', provenance: 'User stated in reflection', confirmed: true },
    { id: 'm3', fact: 'Reads Quran more consistently in early mornings', provenance: 'Behavioral observation across 14 days', confirmed: false },
    { id: 'm4', fact: 'Prefers gentle reminder tones over harsh alarms', provenance: 'User preference setting', confirmed: true },
  ]);

  const deleteMemory = (id: string) => {
    setMemories((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.categoryLabel}>TRANSPARENCY & CONTROL</Text>
      <Text style={styles.title}>What AMAL Remembers</Text>
      <Text style={styles.subtitle}>
        Every fact AMAL stores about your context is listed here. You can inspect, confirm, or delete any item.
      </Text>

      <View style={styles.list}>
        {memories.map((m) => (
          <View key={m.id} style={styles.memoryCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.factText}>{m.fact}</Text>
              <TouchableOpacity onPress={() => deleteMemory(m.id)}>
                <Text style={styles.deleteBtn}>✕</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.provenanceText}>Source: {m.provenance}</Text>
            <View style={styles.badgeRow}>
              <Text style={[styles.badge, m.confirmed ? styles.badgeConfirmed : styles.badgeInferred]}>
                {m.confirmed ? '✓ Confirmed by You' : 'Observed Pattern (Pending Confirmation)'}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.wipeBtn}
        onPress={() => setMemories([])}
      >
        <Text style={styles.wipeBtnText}>Clear All Memory Facts</Text>
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
    marginBottom: AmalTheme.spacing[5],
  },
  list: {
    gap: AmalTheme.spacing[3],
    marginBottom: AmalTheme.spacing[5],
  },
  memoryCard: {
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderRadius: AmalTheme.radii.xl,
    padding: AmalTheme.spacing[4],
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
    ...AmalTheme.shadows.subtle,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  factText: {
    fontSize: AmalTheme.typography.sizes.sm,
    fontWeight: '700',
    color: AmalTheme.colors.text.primaryLight,
    flex: 1,
    marginRight: AmalTheme.spacing[2],
  },
  deleteBtn: {
    fontSize: 16,
    color: AmalTheme.colors.text.tertiaryLight,
    paddingHorizontal: 4,
  },
  provenanceText: {
    fontSize: 11,
    color: AmalTheme.colors.text.secondaryLight,
    marginTop: 4,
  },
  badgeRow: {
    marginTop: AmalTheme.spacing[3],
  },
  badge: {
    fontSize: 10,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: AmalTheme.radii.sm,
    alignSelf: 'flex-start',
  },
  badgeConfirmed: {
    backgroundColor: AmalTheme.colors.primaryLight,
    color: AmalTheme.colors.primary,
  },
  badgeInferred: {
    backgroundColor: AmalTheme.colors.accent.sand,
    color: AmalTheme.colors.accent.goldMuted,
  },
  wipeBtn: {
    borderWidth: 1,
    borderColor: AmalTheme.colors.status.warning,
    paddingVertical: AmalTheme.spacing[3],
    borderRadius: AmalTheme.radii.lg,
    alignItems: 'center',
    marginBottom: AmalTheme.spacing[8],
  },
  wipeBtnText: {
    color: AmalTheme.colors.status.warning,
    fontWeight: '700',
    fontSize: AmalTheme.typography.sizes.xs,
  },
});
