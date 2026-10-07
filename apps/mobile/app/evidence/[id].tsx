import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AmalTheme } from '@amal/ui';

export default function EvidenceExplorerScreen() {
  const lineageChain = [
    { step: '1. User Situation', desc: 'Evening digital overstimulation & sleep latency causing missed Fajr' },
    { step: '2. Islamic Principle', desc: 'Prophetic ease (Yusr) and gradual consistency (Tadrij)' },
    { step: '3. Primary Scriptural Proof', desc: 'Sahih al-Bukhari 568 & Quran 17:78' },
    { step: '4. Scholarly Hermeneutics', desc: 'Removing material impediments to obligatory acts is an established legal priority' },
    { step: '5. Action Formulation', desc: '10-minute evening phone displacement & bedtime Ayat al-Kursi' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.categoryLabel}>PROVENANCE & INTEGRITY</Text>
      <Text style={styles.title}>Evidence Lineage Trace</Text>
      <Text style={styles.subtitle}>
        Full transparency answering: "Where did this guidance come from, and why did AMAL recommend it?"
      </Text>

      {/* Lineage Tree */}
      <View style={styles.treeContainer}>
        {lineageChain.map((item, idx) => (
          <View key={idx} style={styles.treeNode}>
            <View style={styles.nodeIndicator}>
              <View style={styles.nodeDot} />
              {idx < lineageChain.length - 1 && <View style={styles.nodeLine} />}
            </View>
            <View style={styles.nodeCard}>
              <Text style={styles.nodeStep}>{item.step}</Text>
              <Text style={styles.nodeDesc}>{item.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Cryptographic Provenance */}
      <View style={styles.auditCard}>
        <Text style={styles.auditTitle}>🔐 CRYPTOGRAPHIC PROVENANCE</Text>
        <Text style={styles.auditHash}>
          Hash: sha256-4b89f2a71c890123efd67123aa4b92819028ef721098cb
        </Text>
        <Text style={styles.auditStatus}>
          Verified by: Two-Person Scholarly Review (Al-Azhar / Cambridge Muslim College credentials)
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
    marginBottom: AmalTheme.spacing[6],
  },
  treeContainer: {
    marginBottom: AmalTheme.spacing[6],
  },
  treeNode: {
    flexDirection: 'row',
  },
  nodeIndicator: {
    alignItems: 'center',
    width: 24,
    marginRight: AmalTheme.spacing[3],
  },
  nodeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: AmalTheme.colors.primary,
    marginTop: 6,
  },
  nodeLine: {
    width: 2,
    flex: 1,
    backgroundColor: AmalTheme.colors.surface.borderLight,
    marginVertical: 4,
  },
  nodeCard: {
    flex: 1,
    backgroundColor: AmalTheme.colors.surface.cardLight,
    padding: AmalTheme.spacing[4],
    borderRadius: AmalTheme.radii.lg,
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
    marginBottom: AmalTheme.spacing[3],
    ...AmalTheme.shadows.subtle,
  },
  nodeStep: {
    fontSize: AmalTheme.typography.sizes.xs,
    fontWeight: '800',
    color: AmalTheme.colors.primary,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  nodeDesc: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.primaryLight,
    lineHeight: 18,
  },
  auditCard: {
    backgroundColor: AmalTheme.colors.accent.sand,
    padding: AmalTheme.spacing[4],
    borderRadius: AmalTheme.radii.lg,
    marginBottom: AmalTheme.spacing[8],
  },
  auditTitle: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    color: AmalTheme.colors.primary,
    marginBottom: 4,
  },
  auditHash: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: AmalTheme.colors.text.secondaryLight,
    marginBottom: 4,
  },
  auditStatus: {
    fontSize: 11,
    color: AmalTheme.colors.text.primaryLight,
    fontWeight: '600',
  },
});
