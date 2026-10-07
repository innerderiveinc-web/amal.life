import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AmalTheme } from '@amal/ui';

export default function PreferencesScreen() {
  const [lang, setLang] = useState('English');
  const [guidanceDepth, setGuidanceDepth] = useState('Balanced');
  const [reminderTone, setReminderTone] = useState('Calm & Gentle');

  const languages = ['English', 'اردو (Urdu)', 'العربية (Arabic)', 'हिन्दी (Hindi)'];
  const depths = ['Short & Practical', 'Balanced', 'Deep Scholarly Context'];
  const reminderTones = ['Calm & Gentle', 'Prayer-Only Chimes', 'Silent Visual Alerts'];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.stepIndicator}>STEP 4 OF 6</Text>
        <Text style={styles.title}>Practice Preferences</Text>
        <Text style={styles.subtitle}>
          Tailor how AMAL presents evidence, languages, and notifications to your daily life.
        </Text>

        <Text style={styles.sectionTitle}>Preferred Language:</Text>
        <View style={styles.optionsList}>
          {languages.map((l) => (
            <TouchableOpacity
              key={l}
              style={[styles.row, lang === l && styles.rowActive]}
              onPress={() => setLang(l)}
            >
              <Text style={[styles.rowText, lang === l && styles.rowTextActive]}>{l}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { marginTop: AmalTheme.spacing[5] }]}>
          Guidance Depth:
        </Text>
        <View style={styles.optionsList}>
          {depths.map((d) => (
            <TouchableOpacity
              key={d}
              style={[styles.row, guidanceDepth === d && styles.rowActive]}
              onPress={() => setGuidanceDepth(d)}
            >
              <Text style={[styles.rowText, guidanceDepth === d && styles.rowTextActive]}>{d}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { marginTop: AmalTheme.spacing[5] }]}>
          Reminder Tone:
        </Text>
        <View style={styles.optionsList}>
          {reminderTones.map((r) => (
            <TouchableOpacity
              key={r}
              style={[styles.row, reminderTone === r && styles.rowActive]}
              onPress={() => setReminderTone(r)}
            >
              <Text style={[styles.rowText, reminderTone === r && styles.rowTextActive]}>{r}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Continue</Text>
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
  sectionTitle: {
    fontSize: AmalTheme.typography.sizes.xs,
    fontWeight: '800',
    letterSpacing: 0.8,
    color: AmalTheme.colors.text.secondaryLight,
    marginBottom: AmalTheme.spacing[2],
  },
  optionsList: {
    gap: AmalTheme.spacing[2],
  },
  row: {
    paddingVertical: AmalTheme.spacing[3],
    paddingHorizontal: AmalTheme.spacing[4],
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderRadius: AmalTheme.radii.lg,
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
  },
  rowActive: {
    backgroundColor: AmalTheme.colors.primaryLight,
    borderColor: AmalTheme.colors.primary,
  },
  rowText: {
    fontSize: AmalTheme.typography.sizes.sm,
    fontWeight: '600',
    color: AmalTheme.colors.text.primaryLight,
  },
  rowTextActive: {
    color: AmalTheme.colors.primary,
    fontWeight: '700',
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
