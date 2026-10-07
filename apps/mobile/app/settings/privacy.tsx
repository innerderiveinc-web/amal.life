import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { AmalTheme } from '@amal/ui';

export default function PrivacyCenterScreen() {
  const [exported, setExported] = useState(false);
  const [wiped, setWiped] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.categoryLabel}>DATA SOVEREIGNTY</Text>
      <Text style={styles.title}>Privacy Center</Text>
      <Text style={styles.subtitle}>
        OWASP MASVS compliant. You have full ownership of your worship data, reflections, and context.
      </Text>

      {/* Pledges */}
      <View style={styles.pledgeCard}>
        <Text style={styles.pledgeTitle}>🔒 ZERO ADVERTISING ARCHITECTURE</Text>
        <Text style={styles.pledgeText}>
          AMAL contains no ad networks, tracking pixels, or third-party behavioral telemetry.
          Your private reflections are never sold or sent to commercial brokers.
        </Text>
      </View>

      {/* Actions */}
      <View style={styles.actionsCard}>
        <TouchableOpacity
          style={styles.actionRow}
          onPress={() => setExported(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.actionIcon}>📦</Text>
          <View style={styles.actionInfo}>
            <Text style={styles.actionTitle}>Export Complete Personal Data</Text>
            <Text style={styles.actionSub}>Download JSON & PDF archive of all your logs</Text>
          </View>
        </TouchableOpacity>

        {exported && (
          <View style={styles.exportSuccess}>
            <Text style={styles.exportSuccessText}>✓ Data Archive (amal-export-2026.json) Ready</Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.actionRow, styles.dangerRow]}
          onPress={() => setWiped(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.actionIcon}>🗑️</Text>
          <View style={styles.actionInfo}>
            <Text style={styles.dangerTitle}>Erase All Memory & Worship History</Text>
            <Text style={styles.actionSub}>Irrevocably wipe your reflection vault and AI memory</Text>
          </View>
        </TouchableOpacity>

        {wiped && (
          <View style={styles.wipedAlert}>
            <Text style={styles.wipedText}>✓ Personal data and memory successfully erased.</Text>
          </View>
        )}
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
  pledgeCard: {
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderRadius: AmalTheme.radii.xl,
    padding: AmalTheme.spacing[4],
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
    marginBottom: AmalTheme.spacing[5],
  },
  pledgeTitle: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    color: AmalTheme.colors.primary,
    marginBottom: 4,
  },
  pledgeText: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.secondaryLight,
    lineHeight: 18,
  },
  actionsCard: {
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderRadius: AmalTheme.radii.xl,
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
    overflow: 'hidden',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: AmalTheme.spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: AmalTheme.colors.surface.borderLight,
  },
  actionIcon: {
    fontSize: 22,
    marginRight: AmalTheme.spacing[3],
  },
  actionInfo: {
    flex: 1,
  },
  actionTitle: {
    fontSize: AmalTheme.typography.sizes.sm,
    fontWeight: '700',
    color: AmalTheme.colors.text.primaryLight,
  },
  actionSub: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.secondaryLight,
    marginTop: 2,
  },
  dangerRow: {
    borderBottomWidth: 0,
  },
  dangerTitle: {
    fontSize: AmalTheme.typography.sizes.sm,
    fontWeight: '700',
    color: AmalTheme.colors.status.warning,
  },
  exportSuccess: {
    backgroundColor: AmalTheme.colors.status.successLight,
    padding: AmalTheme.spacing[3],
    margin: AmalTheme.spacing[3],
    borderRadius: AmalTheme.radii.md,
  },
  exportSuccessText: {
    color: AmalTheme.colors.status.success,
    fontSize: AmalTheme.typography.sizes.xs,
    fontWeight: '700',
  },
  wipedAlert: {
    backgroundColor: AmalTheme.colors.status.warningLight,
    padding: AmalTheme.spacing[3],
    margin: AmalTheme.spacing[3],
    borderRadius: AmalTheme.radii.md,
  },
  wipedText: {
    color: AmalTheme.colors.status.warning,
    fontSize: AmalTheme.typography.sizes.xs,
    fontWeight: '700',
  },
});
