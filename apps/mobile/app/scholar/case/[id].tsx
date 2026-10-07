import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { AmalTheme } from '@amal/ui';

export default function ScholarCaseDetailScreen() {
  const [scholarRuling, setScholarRuling] = useState('');
  const [completed, setCompleted] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.categoryLabel}>CASE DOSSIER #SCH-8421</Text>
      <Text style={styles.title}>Divorce & Marital Jurisprudence</Text>
      <Text style={styles.subtitle}>
        Confidential review. Deliver authoritative pastoral ruling directly to user.
      </Text>

      {/* Sanitized User Prompt Panel */}
      <View style={styles.dossierPanel}>
        <Text style={styles.panelTitle}>1. USER INQUIRY & SANITIZED CONTEXT</Text>
        <Text style={styles.panelContent}>
          "My spouse and I have had severe disagreements. In anger, words were spoken about separation.
          I need to know the validity under Hanafi fiqh and whether reconciliation is open to us."
        </Text>
      </View>

      {/* Governed Evidence Summary Panel */}
      <View style={styles.dossierPanel}>
        <Text style={styles.panelTitle}>2. GRAPH RETRIEVED EVIDENCE BASE</Text>
        <Text style={styles.evidenceRef}>• Quran 2:229 ("Divorce is twice. Then retain or release in kindness")</Text>
        <Text style={styles.evidenceRef}>• Sunan Abi Dawud 2193 ("No divorce in a state of closure / acute rage")</Text>
        <Text style={styles.evidenceRef}>• Fatawa Hindiyya (Hanafi legal codification on conditional pronouncements)</Text>
      </View>

      {/* Scholar Response Composer */}
      <View style={styles.composerPanel}>
        <Text style={styles.panelTitle}>3. JURIST PASTORAL RULING</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Type qualified pastoral ruling, attaching conditionality and counsel..."
          placeholderTextColor={AmalTheme.colors.text.tertiaryLight}
          value={scholarRuling}
          onChangeText={setScholarRuling}
          multiline
        />

        <TouchableOpacity
          style={[styles.signoffBtn, completed && styles.signoffBtnDone]}
          onPress={() => setCompleted(true)}
        >
          <Text style={styles.signoffBtnText}>
            {completed ? '✓ Signed & Delivered to User Vault' : 'Sign Off & Deliver Counsel'}
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
    fontSize: AmalTheme.typography.sizes['2xl'],
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
  dossierPanel: {
    backgroundColor: AmalTheme.colors.surface.cardLight,
    padding: AmalTheme.spacing[4],
    borderRadius: AmalTheme.radii.xl,
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
    marginBottom: AmalTheme.spacing[4],
  },
  panelTitle: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    color: AmalTheme.colors.primary,
    marginBottom: AmalTheme.spacing[2],
  },
  panelContent: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.primaryLight,
    lineHeight: 18,
    fontStyle: 'italic',
  },
  evidenceRef: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.primaryLight,
    marginTop: 3,
  },
  composerPanel: {
    backgroundColor: AmalTheme.colors.surface.cardLight,
    padding: AmalTheme.spacing[4],
    borderRadius: AmalTheme.radii.xl,
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
    marginBottom: AmalTheme.spacing[8],
  },
  textInput: {
    backgroundColor: AmalTheme.colors.surface.backgroundLight,
    borderRadius: AmalTheme.radii.md,
    padding: AmalTheme.spacing[3],
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.primaryLight,
    minHeight: 100,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
    marginVertical: AmalTheme.spacing[3],
  },
  signoffBtn: {
    backgroundColor: AmalTheme.colors.primary,
    paddingVertical: AmalTheme.spacing[3],
    borderRadius: AmalTheme.radii.lg,
    alignItems: 'center',
  },
  signoffBtnDone: {
    backgroundColor: AmalTheme.colors.status.success,
  },
  signoffBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: AmalTheme.typography.sizes.sm,
  },
});
