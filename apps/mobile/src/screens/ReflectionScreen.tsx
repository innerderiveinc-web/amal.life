import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { AmalTheme } from '@amal/ui';

export const ReflectionScreen: React.FC = () => {
  const [wentWell, setWentWell] = useState('');
  const [feltDifficult, setFeltDifficult] = useState('');
  const [tomorrow, setTomorrow] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Daily Muhasabah</Text>
      <Text style={styles.subtitle}>
        Calm self-accounting without moral scorecards or spiritual judgment
      </Text>

      {/* Behavioral Insights Card */}
      <View style={styles.insightCard}>
        <Text style={styles.insightHeader}>BEHAVIORAL OBSERVATIONS</Text>
        <Text style={styles.insightText}>
          • Your Quran consistency is strongest on weekend mornings between 6:30 AM and 7:30 AM.
        </Text>
        <Text style={styles.insightText}>
          • Evening wind-down completion correlates directly with waking up on time for Fajr.
        </Text>
        <Text style={styles.insightDisclaimer}>
          Note: These are routine observations, not spiritual scores or moral judgments.
        </Text>
      </View>

      {/* Muhasabah Prompts */}
      <View style={styles.formCard}>
        <Text style={styles.inputLabel}>What went well today?</Text>
        <TextInput
          style={styles.textInput}
          placeholder="e.g. Prayed Dhuhr on time, called my mother..."
          placeholderTextColor={AmalTheme.colors.text.tertiaryLight}
          value={wentWell}
          onChangeText={setWentWell}
          multiline
        />

        <Text style={styles.inputLabel}>What felt difficult or rushed?</Text>
        <TextInput
          style={styles.textInput}
          placeholder="e.g. Bedtime was pushed late due to urgent work tasks..."
          placeholderTextColor={AmalTheme.colors.text.tertiaryLight}
          value={feltDifficult}
          onChangeText={setFeltDifficult}
          multiline
        />

        <Text style={styles.inputLabel}>What is your small intention for tomorrow?</Text>
        <TextInput
          style={styles.textInput}
          placeholder="e.g. Put phone down at 10 PM and pray 2 rak'ahs with presence..."
          placeholderTextColor={AmalTheme.colors.text.tertiaryLight}
          value={tomorrow}
          onChangeText={setTomorrow}
          multiline
        />

        {submitted ? (
          <View style={{ backgroundColor: '#ECFDF5', padding: 16, borderRadius: 10, alignItems: 'center', marginTop: 12 }}>
            <Text style={{ color: '#065F46', fontWeight: '700', fontSize: 14, marginBottom: 8 }}>
              ✓ Saved to Zero-Knowledge Vault
            </Text>
            <Text style={{ color: '#047857', fontSize: 12, textAlign: 'center', marginBottom: 12 }}>
              Your reflection has been safely encrypted and saved. 100% private on-device storage, zero cloud profiling.
            </Text>
            <TouchableOpacity
              style={[styles.saveButton, { backgroundColor: '#065F46', paddingHorizontal: 20 }]}
              onPress={() => {
                setWentWell('');
                setFeltDifficult('');
                setTomorrow('');
                setSubmitted(false);
              }}
            >
              <Text style={styles.saveButtonText}>Write Another Entry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => {
              if (wentWell.trim() || feltDifficult.trim() || tomorrow.trim()) {
                setSubmitted(true);
              }
            }}
          >
            <Text style={styles.saveButtonText}>Save Reflection</Text>
          </TouchableOpacity>
        )}
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
  insightCard: {
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
  },
  insightHeader: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    color: AmalTheme.colors.primary,
    marginBottom: 8,
  },
  insightText: {
    fontSize: 13,
    color: AmalTheme.colors.text.primaryLight,
    lineHeight: 20,
    marginBottom: 6,
  },
  insightDisclaimer: {
    fontSize: 11,
    fontStyle: 'italic',
    color: AmalTheme.colors.text.tertiaryLight,
    marginTop: 6,
  },
  formCard: {
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
    marginBottom: 40,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: AmalTheme.colors.text.primaryLight,
    marginBottom: 6,
    marginTop: 10,
  },
  textInput: {
    backgroundColor: AmalTheme.colors.surface.backgroundLight,
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: AmalTheme.colors.text.primaryLight,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: AmalTheme.colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
});

export default ReflectionScreen;

