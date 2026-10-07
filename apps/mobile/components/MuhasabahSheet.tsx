import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { AmalTheme } from '@amal/ui';

export interface MuhasabahSheetProps {
  onSave?: (data: { wentWell: string; feltDifficult: string; tomorrow: string }) => void;
}

export const MuhasabahSheet: React.FC<MuhasabahSheetProps> = ({ onSave }) => {
  const [wentWell, setWentWell] = useState('');
  const [feltDifficult, setFeltDifficult] = useState('');
  const [tomorrow, setTomorrow] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    if (onSave) onSave({ wentWell, feltDifficult, tomorrow });
  };

  return (
    <View style={styles.card}>
      <Text style={styles.categoryLabel}>CALM MUHASABAH</Text>
      <Text style={styles.title}>Daily Self-Accounting</Text>
      <Text style={styles.subtitle}>
        Calm, gentle reflection without moral scorecards, piety points, or judgment.
      </Text>

      {/* Behavioral Observation Card */}
      <View style={styles.observationBox}>
        <Text style={styles.observationHeader}>OBSERVED ROUTINE INSIGHT</Text>
        <Text style={styles.observationText}>
          • Your Quran consistency is strongest on weekend mornings between 6:30 AM and 7:30 AM.
        </Text>
        <Text style={styles.observationSub}>
          Note: This is a routine observation, never an evaluation of faith (Iman).
        </Text>
      </View>

      <Text style={styles.inputLabel}>1. What went well today?</Text>
      <TextInput
        style={styles.textInput}
        placeholder="e.g. Prayed Dhuhr on time, called parents..."
        placeholderTextColor={AmalTheme.colors.text.tertiaryLight}
        value={wentWell}
        onChangeText={setWentWell}
        multiline
      />

      <Text style={styles.inputLabel}>2. What felt difficult or rushed?</Text>
      <TextInput
        style={styles.textInput}
        placeholder="e.g. Work meeting overran, was tired after Asr..."
        placeholderTextColor={AmalTheme.colors.text.tertiaryLight}
        value={feltDifficult}
        onChangeText={setFeltDifficult}
        multiline
      />

      <Text style={styles.inputLabel}>3. Small intention for tomorrow morning:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="e.g. Put phone down 30 mins before sleep..."
        placeholderTextColor={AmalTheme.colors.text.tertiaryLight}
        value={tomorrow}
        onChangeText={setTomorrow}
        multiline
      />

      {/* Strict Privacy Guarantee Pill */}
      <View style={styles.privacyPill}>
        <Text style={styles.privacyIcon}>🔒</Text>
        <Text style={styles.privacyText}>
          Saved privately in your personal vault. Isolated from family & external LLMs.
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.saveButton, saved && styles.saveButtonDone]}
        onPress={handleSave}
      >
        <Text style={styles.saveButtonText}>
          {saved ? '✓ Saved Privately' : 'Save Reflection'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderRadius: AmalTheme.radii.xl,
    padding: AmalTheme.spacing[5],
    marginBottom: AmalTheme.spacing[4],
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
    ...AmalTheme.shadows.card,
  },
  categoryLabel: {
    fontSize: AmalTheme.typography.sizes.xs,
    fontWeight: '800',
    letterSpacing: 1,
    color: AmalTheme.colors.primary,
    marginBottom: 2,
  },
  title: {
    fontSize: AmalTheme.typography.sizes.xl,
    fontWeight: '800',
    color: AmalTheme.colors.text.primaryLight,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.secondaryLight,
    lineHeight: 18,
    marginBottom: AmalTheme.spacing[4],
  },
  observationBox: {
    backgroundColor: AmalTheme.colors.surface.backgroundLight,
    padding: AmalTheme.spacing[3],
    borderRadius: AmalTheme.radii.md,
    marginBottom: AmalTheme.spacing[4],
  },
  observationHeader: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
    color: AmalTheme.colors.primary,
    marginBottom: 4,
  },
  observationText: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.primaryLight,
    lineHeight: 18,
  },
  observationSub: {
    fontSize: 10,
    fontStyle: 'italic',
    color: AmalTheme.colors.text.tertiaryLight,
    marginTop: 4,
  },
  inputLabel: {
    fontSize: AmalTheme.typography.sizes.xs,
    fontWeight: '700',
    color: AmalTheme.colors.text.primaryLight,
    marginBottom: AmalTheme.spacing[1],
    marginTop: AmalTheme.spacing[2],
  },
  textInput: {
    backgroundColor: AmalTheme.colors.surface.backgroundLight,
    borderRadius: AmalTheme.radii.md,
    padding: AmalTheme.spacing[3],
    fontSize: AmalTheme.typography.sizes.sm,
    color: AmalTheme.colors.text.primaryLight,
    minHeight: 56,
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
    textAlignVertical: 'top',
  },
  privacyPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AmalTheme.colors.accent.sand,
    padding: AmalTheme.spacing[2],
    borderRadius: AmalTheme.radii.md,
    marginTop: AmalTheme.spacing[4],
    marginBottom: AmalTheme.spacing[2],
  },
  privacyIcon: {
    fontSize: 12,
    marginRight: 6,
  },
  privacyText: {
    fontSize: 11,
    color: AmalTheme.colors.text.secondaryLight,
    flex: 1,
  },
  saveButton: {
    backgroundColor: AmalTheme.colors.primary,
    paddingVertical: AmalTheme.spacing[3],
    borderRadius: AmalTheme.radii.lg,
    alignItems: 'center',
    marginTop: AmalTheme.spacing[2],
  },
  saveButtonDone: {
    backgroundColor: AmalTheme.colors.status.success,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: AmalTheme.typography.sizes.sm,
  },
});
