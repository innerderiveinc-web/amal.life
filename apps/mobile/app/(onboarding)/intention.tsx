import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AmalTheme } from '@amal/ui';

export default function IntentionScreen() {
  const [selected, setSelected] = useState<string[]>([]);

  const intentions = [
    { id: 'deen', label: 'Strengthen my Deen with sincere practice' },
    { id: 'consistency', label: 'Build daily consistency in Salah & Quran' },
    { id: 'knowledge', label: 'Learn Quran, Hadith and authentic Sunnah' },
    { id: 'akhlaq', label: 'Improve emotional regulation, patience & character' },
    { id: 'reconnect', label: 'Reconnect after feeling spiritually distant' },
    { id: 'new_muslim', label: 'Start fresh as a new Muslim' },
  ];

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.stepIndicator}>STEP 1 OF 6</Text>
        <Text style={styles.title}>What brings you to AMAL today?</Text>
        <Text style={styles.subtitle}>
          Every meaningful act begins with a sincere intention (Niyyah). Select all that resonate.
        </Text>

        <View style={styles.optionsList}>
          {intentions.map((item) => {
            const isChecked = selected.includes(item.id);
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.optionCard, isChecked && styles.optionCardActive]}
                onPress={() => toggleSelect(item.id)}
                activeOpacity={0.7}
              >
                <View style={[styles.checkbox, isChecked && styles.checkboxActive]}>
                  {isChecked && <Text style={styles.checkMark}>✓</Text>}
                </View>
                <Text style={[styles.optionText, isChecked && styles.optionTextActive]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
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
  optionsList: {
    gap: AmalTheme.spacing[3],
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderRadius: AmalTheme.radii.lg,
    padding: AmalTheme.spacing[4],
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
  },
  optionCardActive: {
    borderColor: AmalTheme.colors.primary,
    backgroundColor: AmalTheme.colors.primaryLight,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: AmalTheme.colors.surface.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: AmalTheme.spacing[3],
  },
  checkboxActive: {
    backgroundColor: AmalTheme.colors.primary,
    borderColor: AmalTheme.colors.primary,
  },
  checkMark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  optionText: {
    fontSize: AmalTheme.typography.sizes.sm,
    fontWeight: '600',
    color: AmalTheme.colors.text.primaryLight,
    flex: 1,
  },
  optionTextActive: {
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
