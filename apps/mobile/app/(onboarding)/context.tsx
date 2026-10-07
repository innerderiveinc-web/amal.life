import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AmalTheme } from '@amal/ui';

export default function ContextScreen() {
  const [season, setSeason] = useState('Young Professional');
  const [capacity, setCapacity] = useState('10 minutes');

  const seasons = [
    'Student',
    'Young Professional',
    'Parent with Young Children',
    'Caregiver',
    'New Muslim',
    'Prefer not to say',
  ];

  const capacities = ['5 minutes', '10 minutes', '15 minutes', '30 minutes'];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.stepIndicator}>STEP 3 OF 6</Text>
        <Text style={styles.title}>Life Context & Capacity</Text>
        <Text style={styles.subtitle}>
          Respecting the Prophetic principle of ease (Yusr). We will never overwhelm your schedule.
        </Text>

        <Text style={styles.questionHeading}>Current season of life:</Text>
        <View style={styles.optionsList}>
          {seasons.map((s) => (
            <TouchableOpacity
              key={s}
              style={[styles.optionRow, season === s && styles.optionRowActive]}
              onPress={() => setSeason(s)}
            >
              <Text style={[styles.optionText, season === s && styles.optionTextActive]}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.questionHeading, { marginTop: AmalTheme.spacing[5] }]}>
          Realistic daily commitment:
        </Text>
        <View style={styles.capacityGrid}>
          {capacities.map((c) => (
            <TouchableOpacity
              key={c}
              style={[styles.capacityCard, capacity === c && styles.capacityCardActive]}
              onPress={() => setCapacity(c)}
            >
              <Text style={[styles.capacityText, capacity === c && styles.capacityTextActive]}>
                {c}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Save Context</Text>
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
  questionHeading: {
    fontSize: AmalTheme.typography.sizes.xs,
    fontWeight: '800',
    letterSpacing: 0.8,
    color: AmalTheme.colors.text.secondaryLight,
    marginBottom: AmalTheme.spacing[3],
  },
  optionsList: {
    gap: AmalTheme.spacing[2],
  },
  optionRow: {
    paddingVertical: AmalTheme.spacing[3],
    paddingHorizontal: AmalTheme.spacing[4],
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderRadius: AmalTheme.radii.lg,
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
  },
  optionRowActive: {
    backgroundColor: AmalTheme.colors.primaryLight,
    borderColor: AmalTheme.colors.primary,
  },
  optionText: {
    fontSize: AmalTheme.typography.sizes.sm,
    fontWeight: '600',
    color: AmalTheme.colors.text.primaryLight,
  },
  optionTextActive: {
    color: AmalTheme.colors.primary,
    fontWeight: '700',
  },
  capacityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: AmalTheme.spacing[3],
  },
  capacityCard: {
    flex: 1,
    minWidth: '45%',
    paddingVertical: AmalTheme.spacing[3],
    alignItems: 'center',
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderRadius: AmalTheme.radii.lg,
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
  },
  capacityCardActive: {
    backgroundColor: AmalTheme.colors.primary,
    borderColor: AmalTheme.colors.primary,
  },
  capacityText: {
    fontSize: AmalTheme.typography.sizes.sm,
    fontWeight: '600',
    color: AmalTheme.colors.text.primaryLight,
  },
  capacityTextActive: {
    color: '#FFFFFF',
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
