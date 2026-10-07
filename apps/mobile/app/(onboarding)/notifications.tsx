import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { AmalTheme } from '@amal/ui';

export default function NotificationSetupScreen() {
  const [prayerAlerts, setPrayerAlerts] = useState(true);
  const [morningAmal, setMorningAmal] = useState(true);
  const [eveningMuhasabah, setEveningMuhasabah] = useState(true);
  const [knowledgeUpdates, setKnowledgeUpdates] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.stepIndicator}>STEP 6 OF 6</Text>
        <Text style={styles.title}>Calm Reminders</Text>
        <Text style={styles.subtitle}>
          AMAL adheres to a conservative notification philosophy. Never spam or anxiety-inducing alerts.
        </Text>

        <View style={styles.togglesCard}>
          <View style={styles.switchRow}>
            <View style={styles.textContainer}>
              <Text style={styles.switchTitle}>Prayer Call Reminders</Text>
              <Text style={styles.switchSubtitle}>
                Calm chime or gentle Adhan at prayer window entry.
              </Text>
            </View>
            <Switch
              value={prayerAlerts}
              onValueChange={setPrayerAlerts}
              trackColor={{ false: '#767577', true: AmalTheme.colors.primary }}
            />
          </View>

          <View style={styles.switchRow}>
            <View style={styles.textContainer}>
              <Text style={styles.switchTitle}>Today's Amal Morning Nudge</Text>
              <Text style={styles.switchSubtitle}>
                One focused daily micro-action to anchor your routine.
              </Text>
            </View>
            <Switch
              value={morningAmal}
              onValueChange={setMorningAmal}
              trackColor={{ false: '#767577', true: AmalTheme.colors.primary }}
            />
          </View>

          <View style={styles.switchRow}>
            <View style={styles.textContainer}>
              <Text style={styles.switchTitle}>Evening Muhasabah Check-In</Text>
              <Text style={styles.switchSubtitle}>
                Gentle invitation to reflect before bedtime.
              </Text>
            </View>
            <Switch
              value={eveningMuhasabah}
              onValueChange={setEveningMuhasabah}
              trackColor={{ false: '#767577', true: AmalTheme.colors.primary }}
            />
          </View>

          <View style={[styles.switchRow, { borderBottomWidth: 0 }]}>
            <View style={styles.textContainer}>
              <Text style={styles.switchTitle}>Learning & Knowledge Updates</Text>
              <Text style={styles.switchSubtitle}>
                Weekly thematic reflections on Quran & Hadith.
              </Text>
            </View>
            <Switch
              value={knowledgeUpdates}
              onValueChange={setKnowledgeUpdates}
              trackColor={{ false: '#767577', true: AmalTheme.colors.primary }}
            />
          </View>
        </View>

        <View style={styles.pledgeBox}>
          <Text style={styles.pledgeTitle}>🌱 GUARANTEE</Text>
          <Text style={styles.pledgeText}>
            Promotional and commercial marketing notifications are permanently disabled by system design.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Enter AMAL</Text>
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
  pledgeBox: {
    backgroundColor: AmalTheme.colors.accent.sand,
    borderRadius: AmalTheme.radii.lg,
    padding: AmalTheme.spacing[4],
    marginTop: AmalTheme.spacing[4],
  },
  pledgeTitle: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    color: AmalTheme.colors.primary,
    marginBottom: 2,
  },
  pledgeText: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.secondaryLight,
    lineHeight: 18,
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
