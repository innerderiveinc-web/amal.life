import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { AmalTheme } from '@amal/ui';

export default function PrivacyScreen() {
  const [personalContext, setPersonalContext] = useState(true);
  const [auditableMemory, setAuditableMemory] = useState(true);
  const [familySharing, setFamilySharing] = useState(false);
  const [anonymousDiag, setAnonymousDiag] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.stepIndicator}>STEP 5 OF 6</Text>
        <Text style={styles.title}>Privacy & Data Sovereignty</Text>
        <Text style={styles.subtitle}>
          Your spiritual life belongs solely to you and Allah. Transparent, consent-driven architecture.
        </Text>

        <View style={styles.togglesCard}>
          <View style={styles.switchRow}>
            <View style={styles.textContainer}>
              <Text style={styles.switchTitle}>AI Personal Context</Text>
              <Text style={styles.switchSubtitle}>
                Allows AMAL to adapt daily plans based on your stated time constraints.
              </Text>
            </View>
            <Switch
              value={personalContext}
              onValueChange={setPersonalContext}
              trackColor={{ false: '#767577', true: AmalTheme.colors.primary }}
            />
          </View>

          <View style={styles.switchRow}>
            <View style={styles.textContainer}>
              <Text style={styles.switchTitle}>Auditable Memory Retention</Text>
              <Text style={styles.switchSubtitle}>
                You can review, edit, or wipe all facts AMAL remembers at any time.
              </Text>
            </View>
            <Switch
              value={auditableMemory}
              onValueChange={setAuditableMemory}
              trackColor={{ false: '#767577', true: AmalTheme.colors.primary }}
            />
          </View>

          <View style={styles.switchRow}>
            <View style={styles.textContainer}>
              <Text style={styles.switchTitle}>Cross-Family Data Sharing</Text>
              <Text style={styles.switchSubtitle}>
                Default OFF: Adult reflections remain strictly isolated from family members.
              </Text>
            </View>
            <Switch
              value={familySharing}
              onValueChange={setFamilySharing}
              trackColor={{ false: '#767577', true: AmalTheme.colors.primary }}
            />
          </View>

          <View style={[styles.switchRow, { borderBottomWidth: 0 }]}>
            <View style={styles.textContainer}>
              <Text style={styles.switchTitle}>Anonymous Performance Metrics</Text>
              <Text style={styles.switchSubtitle}>
                Share non-personal crash analytics to improve app stability.
              </Text>
            </View>
            <Switch
              value={anonymousDiag}
              onValueChange={setAnonymousDiag}
              trackColor={{ false: '#767577', true: AmalTheme.colors.primary }}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Confirm Privacy Setup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AmalTheme.colors.surface.backgroundLight,
    padding: AmalTheme.spacing[5],
    paddingTop: AmalTheme.spacing[8],
  },
  content: {
    paddingBottom: AmalTheme.spacing[8],
  },
  stepIndicator: {
    fontSize: AmalTheme.typography.sizes.xs,
    fontWeight: '800',
    color: AmalTheme.colors.primary,
    letterSpacing: 1,
    marginBottom: 4,
  },
  title: {
    fontSize: AmalTheme.typography.sizes['2xl'],
    fontWeight: '800',
    color: AmalTheme.colors.text.primaryLight,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.secondaryLight,
    lineHeight: 18,
    marginBottom: AmalTheme.spacing[5],
  },
  togglesCard: {
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderRadius: AmalTheme.radii.xl,
    padding: AmalTheme.spacing[4],
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: AmalTheme.spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: AmalTheme.colors.surface.borderLight,
  },
  textContainer: {
    flex: 1,
    marginRight: AmalTheme.spacing[3],
  },
  switchTitle: {
    fontSize: AmalTheme.typography.sizes.sm,
    fontWeight: '700',
    color: AmalTheme.colors.text.primaryLight,
  },
  switchSubtitle: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.secondaryLight,
    marginTop: 2,
    lineHeight: 16,
  },
  footer: {
    paddingVertical: AmalTheme.spacing[3],
  },
  primaryButton: {
    backgroundColor: AmalTheme.colors.primary,
    paddingVertical: AmalTheme.spacing[4],
    borderRadius: AmalTheme.radii.lg,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: AmalTheme.typography.sizes.base,
  },
});
