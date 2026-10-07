import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { AmalTheme } from '@amal/ui';

export default function SafetyAndFeedbackScreen() {
  const [claimReference, setClaimReference] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [reported, setReported] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.categoryLabel}>GOVERNANCE & CARE</Text>
      <Text style={styles.title}>Safety & Integrity</Text>
      <Text style={styles.subtitle}>
        Report questionable citations, dispute knowledge entries, or access crisis support.
      </Text>

      {/* Immediate Crisis Helplines */}
      <View style={styles.crisisCard}>
        <Text style={styles.crisisBadge}>IMMEDIATE CRISIS SUPPORT</Text>
        <Text style={styles.crisisTitle}>Need to speak with someone right now?</Text>
        <Text style={styles.crisisBody}>
          If you are experiencing acute distress, mental health emergency, or pastoral crisis,
          reach out to verified support immediately:
        </Text>
        <View style={styles.helplineList}>
          <Text style={styles.helplineItem}>• Muslim Youth Helpline (UK): 0808 808 2008</Text>
          <Text style={styles.helplineItem}>• Khalil Center Pastoral Care: +1 (855) 544-2545</Text>
          <Text style={styles.helplineItem}>• Emergency Medical Assistance: Dial local 911 / 999 / 112</Text>
        </View>
      </View>

      {/* Dispute Claim / Error Reporting Form */}
      <View style={styles.formCard}>
        <Text style={styles.formTitle}>Report Content or Disputed Evidence</Text>
        <Text style={styles.formSub}>
          Notice a translation error, Hadith grading discrepancy, or misplaced context?
          Our two-scholar review board investigates every submission.
        </Text>

        <Text style={styles.inputLabel}>Passage / Citation Reference:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="e.g. Sahih al-Bukhari 568 or Ayah 17:78"
          placeholderTextColor={AmalTheme.colors.text.tertiaryLight}
          value={claimReference}
          onChangeText={setClaimReference}
        />

        <Text style={styles.inputLabel}>Nature of discrepancy:</Text>
        <TextInput
          style={[styles.textInput, { minHeight: 70 }]}
          placeholder="Describe why this reference needs scholarly re-review..."
          placeholderTextColor={AmalTheme.colors.text.tertiaryLight}
          value={issueDescription}
          onChangeText={setIssueDescription}
          multiline
        />

        <TouchableOpacity
          style={[styles.submitBtn, reported && styles.submitBtnDone]}
          onPress={() => setReported(true)}
        >
          <Text style={styles.submitBtnText}>
            {reported ? '✓ Reported to Scholar Editorial Board' : 'Submit Disputed Claim'}
          </Text>
        </TouchableOpacity>
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
  crisisCard: {
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderRadius: AmalTheme.radii.xl,
    padding: AmalTheme.spacing[5],
    borderWidth: 1,
    borderColor: AmalTheme.colors.accent.terracottaLight,
    marginBottom: AmalTheme.spacing[5],
  },
  crisisBadge: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    color: AmalTheme.colors.accent.terracotta,
    marginBottom: 4,
  },
  crisisTitle: {
    fontSize: AmalTheme.typography.sizes.base,
    fontWeight: '800',
    color: AmalTheme.colors.text.primaryLight,
    marginBottom: 4,
  },
  crisisBody: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.secondaryLight,
    lineHeight: 18,
    marginBottom: AmalTheme.spacing[3],
  },
  helplineList: {
    gap: 4,
  },
  helplineItem: {
    fontSize: AmalTheme.typography.sizes.xs,
    fontWeight: '600',
    color: AmalTheme.colors.text.primaryLight,
  },
  formCard: {
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderRadius: AmalTheme.radii.xl,
    padding: AmalTheme.spacing[5],
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
    marginBottom: AmalTheme.spacing[8],
  },
  formTitle: {
    fontSize: AmalTheme.typography.sizes.base,
    fontWeight: '800',
    color: AmalTheme.colors.text.primaryLight,
    marginBottom: 4,
  },
  formSub: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.secondaryLight,
    lineHeight: 18,
    marginBottom: AmalTheme.spacing[4],
  },
  inputLabel: {
    fontSize: AmalTheme.typography.sizes.xs,
    fontWeight: '700',
    color: AmalTheme.colors.text.primaryLight,
    marginBottom: 4,
    marginTop: AmalTheme.spacing[2],
  },
  textInput: {
    backgroundColor: AmalTheme.colors.surface.backgroundLight,
    borderRadius: AmalTheme.radii.md,
    padding: AmalTheme.spacing[3],
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.primaryLight,
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
  },
  submitBtn: {
    backgroundColor: AmalTheme.colors.primary,
    paddingVertical: AmalTheme.spacing[3],
    borderRadius: AmalTheme.radii.lg,
    alignItems: 'center',
    marginTop: AmalTheme.spacing[4],
  },
  submitBtnDone: {
    backgroundColor: AmalTheme.colors.status.success,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: AmalTheme.typography.sizes.sm,
  },
});
