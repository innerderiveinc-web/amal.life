import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AmalTheme } from '@amal/ui';

export default function MemoryVaultScreen() {
  const [selectedWhy, setSelectedWhy] = useState<string | null>(null);
  const [memories, setMemories] = useState([
    {
      id: 'm1',
      category: 'CONFIRMED PREFERENCE',
      fact: 'Target daily practice capacity is 10 minutes',
      provenance: 'User stated in onboarding',
      confidence: 'High (Confirmed)',
      whyText: 'You explicitly selected 10 minutes during your initial capacity setup.',
      isPrivate: false,
    },
    {
      id: 'm2',
      category: 'CONFIRMED PREFERENCE',
      fact: 'Prefers quiet morning practice after Fajr',
      provenance: 'User confirmed in weekly check-in',
      confidence: 'High (Confirmed)',
      whyText: 'Confirmed on Day 7 milestone review.',
      isPrivate: false,
    },
    {
      id: 'm3',
      category: 'DERIVED PATTERN',
      fact: 'Quran reading consistency is 3x higher before 9 AM',
      provenance: 'Observed across 14 completed sessions',
      confidence: 'Medium (Observed)',
      whyText: 'Based on 7 recent activity events and 2 reflections where morning sessions completed smoothly.',
      isPrivate: false,
    },
    {
      id: 'm4',
      category: 'JOURNEY CONTEXT',
      fact: 'Evening work hours often extend until 8 PM on weekdays',
      provenance: 'Inferred from 3 evening reflection notes',
      confidence: 'Medium (Inferred)',
      whyText: 'Derived from reflection mentions of late meetings causing delayed Isha prayer.',
      isPrivate: true,
    },
  ]);

  const forgetItem = (id: string) => {
    setMemories((prev) => prev.filter((m) => m.id !== id));
  };

  const togglePrivate = (id: string) => {
    setMemories((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isPrivate: !m.isPrivate } : m))
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.categoryLabel}>TRANSPARENCY & CONTROL</Text>
      <Text style={styles.title}>What AMAL Remembers</Text>
      <Text style={styles.subtitle}>
        Every fact AMAL retains about your routine, preferences, and context. You have sovereign control
        to inspect, edit, or forget any item.
      </Text>

      <View style={styles.list}>
        {memories.map((m) => (
          <View key={m.id} style={styles.memoryCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.categoryBadge}>{m.category}</Text>
              <Text style={styles.confidenceBadge}>{m.confidence}</Text>
            </View>

            <Text style={styles.factText}>{m.fact}</Text>
            <Text style={styles.provenanceText}>Source: {m.provenance}</Text>

            {/* Why does AMAL think this? */}
            <TouchableOpacity
              style={styles.whyBtn}
              onPress={() => setSelectedWhy(selectedWhy === m.id ? null : m.id)}
            >
              <Text style={styles.whyBtnText}>
                {selectedWhy === m.id ? '▲ Hide reasoning' : '▼ Why does AMAL think this?'}
              </Text>
            </TouchableOpacity>

            {selectedWhy === m.id && (
              <View style={styles.whyBox}>
                <Text style={styles.whyText}>{m.whyText}</Text>
              </View>
            )}

            {/* Control Actions */}
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => forgetItem(m.id)}
              >
                <Text style={styles.forgetBtnText}>Forget This</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => togglePrivate(m.id)}
              >
                <Text style={styles.actionText}>
                  {m.isPrivate ? '🔒 Private to Vault' : '🔓 Context Active'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.wipeBtn}
        onPress={() => setMemories([])}
      >
        <Text style={styles.wipeBtnText}>Clear All Memory & Context Facts</Text>
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
    alignItems: 'center',
    marginBottom: 4,
  },
  categoryBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: AmalTheme.colors.primary,
    letterSpacing: 0.8,
  },
  confidenceBadge: {
    fontSize: 10,
    color: AmalTheme.colors.text.tertiaryLight,
    fontWeight: '600',
  },
  factText: {
    fontSize: AmalTheme.typography.sizes.sm,
    fontWeight: '700',
    color: AmalTheme.colors.text.primaryLight,
    marginTop: 2,
  },
  provenanceText: {
    fontSize: 11,
    color: AmalTheme.colors.text.secondaryLight,
    marginTop: 4,
  },
  whyBtn: {
    marginTop: 6,
    marginBottom: 4,
  },
  whyBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: AmalTheme.colors.primary,
  },
  whyBox: {
    backgroundColor: AmalTheme.colors.surface.backgroundLight,
    padding: AmalTheme.spacing[3],
    borderRadius: AmalTheme.radii.md,
    marginVertical: 4,
  },
  whyText: {
    fontSize: 11,
    color: AmalTheme.colors.text.secondaryLight,
    lineHeight: 16,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: AmalTheme.spacing[2],
    paddingTop: AmalTheme.spacing[2],
    borderTopWidth: 1,
    borderTopColor: AmalTheme.colors.surface.borderLight,
  },
  actionBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: AmalTheme.radii.sm,
    backgroundColor: AmalTheme.colors.surface.backgroundLight,
  },
  actionText: {
    fontSize: 11,
    color: AmalTheme.colors.text.secondaryLight,
    fontWeight: '600',
  },
  forgetBtnText: {
    fontSize: 11,
    color: AmalTheme.colors.status.warning,
    fontWeight: '700',
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
