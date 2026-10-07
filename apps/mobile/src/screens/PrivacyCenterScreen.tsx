import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Switch } from 'react-native';
import { AmalTheme } from '@amal/ui';

export const PrivacyCenterScreen: React.FC = () => {
  const [aiMemoryEnabled, setAiMemoryEnabled] = useState(true);
  const [behavioralInsightsEnabled, setBehavioralInsightsEnabled] = useState(true);
  const [exported, setExported] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Privacy & Consent</Text>
      <Text style={styles.subtitle}>
        Your worship and spiritual life belong solely to you. Zero advertising, zero sale of personal data.
      </Text>

      {/* Principles Badge */}
      <View style={styles.policyCard}>
        <Text style={styles.policyTitle}>🔒 Privacy by Design</Text>
        <Text style={styles.policyBody}>
          AMAL adheres to OWASP MASVS baseline standards. Reflections and religious queries are never sold to ad networks, shared with employers, or used to build commercial profiles.
        </Text>
      </View>

      {/* AI Memory Controls */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>AI MEMORY CONTROLS</Text>
        <View style={styles.switchRow}>
          <View style={styles.switchLabelContainer}>
            <Text style={styles.switchLabel}>Allow AI Personal Context</Text>
            <Text style={styles.switchSubLabel}>
              Allows AMAL to recall your preferred routine constraints (e.g. evening work hours) to adapt journeys.
            </Text>
          </View>
          <Switch
            value={aiMemoryEnabled}
            onValueChange={setAiMemoryEnabled}
            trackColor={{ false: '#767577', true: AmalTheme.colors.primary }}
          />
        </View>

        <View style={styles.switchRow}>
          <View style={styles.switchLabelContainer}>
            <Text style={styles.switchLabel}>Behavioral Insights</Text>
            <Text style={styles.switchSubLabel}>
              Derive routine patterns (e.g. sleep hour correlation) without spiritual judgment.
            </Text>
          </View>
          <Switch
            value={behavioralInsightsEnabled}
            onValueChange={setBehavioralInsightsEnabled}
            trackColor={{ false: '#767577', true: AmalTheme.colors.primary }}
          />
        </View>

        <TouchableOpacity style={styles.purgeButton}>
          <Text style={styles.purgeButtonText}>Clear All AI Memory History</Text>
        </TouchableOpacity>
      </View>

      {/* Data Sovereignty */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>DATA SOVEREIGNTY</Text>
        <TouchableOpacity
          style={styles.actionRow}
          onPress={() => setExported(true)}
        >
          <Text style={styles.actionText}>
            {exported ? '✓ Data Export Downloaded (JSON)' : 'Export Complete User Data (GDPR)'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionRow, styles.deleteActionRow]}
        >
          <Text style={styles.deleteText}>Delete Account & Erase All Records</Text>
        </TouchableOpacity>
      </View>
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
    lineHeight: 18,
  },
  policyCard: {
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
  },
  policyTitle: {
    fontWeight: '700',
    fontSize: 14,
    color: AmalTheme.colors.primary,
    marginBottom: 4,
  },
  policyBody: {
    fontSize: 13,
    color: AmalTheme.colors.text.secondaryLight,
    lineHeight: 19,
  },
  sectionCard: {
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    color: AmalTheme.colors.primary,
    marginBottom: 14,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  switchLabelContainer: {
    flex: 1,
    marginRight: 12,
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: AmalTheme.colors.text.primaryLight,
  },
  switchSubLabel: {
    fontSize: 12,
    color: AmalTheme.colors.text.secondaryLight,
    marginTop: 2,
    lineHeight: 16,
  },
  purgeButton: {
    marginTop: 8,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AmalTheme.colors.status.warning,
    alignItems: 'center',
  },
  purgeButtonText: {
    color: AmalTheme.colors.status.warning,
    fontWeight: '600',
    fontSize: 13,
  },
  actionRow: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: AmalTheme.colors.surface.borderLight,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: AmalTheme.colors.primary,
  },
  deleteActionRow: {
    borderBottomWidth: 0,
    marginTop: 6,
  },
  deleteText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DC2626',
  },
});
