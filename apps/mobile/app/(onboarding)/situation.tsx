import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AmalTheme } from '@amal/ui';

export default function SituationScreen() {
  const [selected, setSelected] = useState<string>('fajr');

  const situations = [
    { id: 'fajr', label: 'Sleep & Fajr Struggle' },
    { id: 'salah', label: 'Salah Consistency' },
    { id: 'quran', label: 'Quran Routine Restart' },
    { id: 'dhikr', label: 'Daily Adhkar & Presence' },
    { id: 'anger', label: 'Anger & Emotional Regulation' },
    { id: 'stress', label: 'Work & Life Stress' },
    { id: 'family', label: 'Family & Kinship Ties' },
    { id: 'time', label: 'Time & Deen Alignment' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.stepIndicator}>STEP 2 OF 6</Text>
        <Text style={styles.title}>What would you most like to improve right now?</Text>
        <Text style={styles.subtitle}>
          Choose the single area creating the most friction in your routine today.
        </Text>

        <View style={styles.pillsContainer}>
          {situations.map((item) => {
            const isSelected = selected === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.pill, isSelected && styles.pillActive]}
                onPress={() => setSelected(item.id)}
                activeOpacity={0.7}
              >
                <Text style={[styles.pillText, isSelected && styles.pillTextActive]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Next</Text>
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
    marginBottom: AmalTheme.spacing[6],
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: AmalTheme.spacing[3],
  },
  pill: {
    backgroundColor: AmalTheme.colors.surface.cardLight,
    paddingHorizontal: AmalTheme.spacing[4],
    paddingVertical: AmalTheme.spacing[3],
    borderRadius: AmalTheme.radii.full,
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
  },
  pillActive: {
    backgroundColor: AmalTheme.colors.primary,
    borderColor: AmalTheme.colors.primary,
  },
  pillText: {
    fontSize: AmalTheme.typography.sizes.sm,
    fontWeight: '600',
    color: AmalTheme.colors.text.secondaryLight,
  },
  pillTextActive: {
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
