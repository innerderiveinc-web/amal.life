import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AmalTheme } from '@amal/ui';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.sealBox}>
          <Text style={styles.sealText}>عَمَل</Text>
        </View>

        <Text style={styles.brandTitle}>AMAL</Text>
        <Text style={styles.tagline}>From Niyyah to Amal.</Text>
        <Text style={styles.subGreeting}>
          A calm personal operating system for your Muslim life. Grounded in authentic sources,
          free of spiritual scorecards and guilt.
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Begin Your Journey</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Already have an account? Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AmalTheme.colors.surface.backgroundLight,
    padding: AmalTheme.spacing[6],
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sealBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: AmalTheme.colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: AmalTheme.spacing[5],
  },
  sealText: {
    fontSize: 32,
    fontFamily: AmalTheme.typography.fonts.arabic,
    color: AmalTheme.colors.primary,
  },
  brandTitle: {
    fontSize: AmalTheme.typography.sizes['4xl'],
    fontWeight: '800',
    letterSpacing: 2,
    color: AmalTheme.colors.primary,
    marginBottom: 4,
  },
  tagline: {
    fontSize: AmalTheme.typography.sizes.lg,
    fontWeight: '700',
    color: AmalTheme.colors.text.primaryLight,
    marginBottom: AmalTheme.spacing[3],
  },
  subGreeting: {
    fontSize: AmalTheme.typography.sizes.sm,
    color: AmalTheme.colors.text.secondaryLight,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 320,
  },
  footer: {
    gap: AmalTheme.spacing[3],
    marginBottom: AmalTheme.spacing[4],
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
  secondaryButton: {
    paddingVertical: AmalTheme.spacing[2],
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: AmalTheme.colors.text.secondaryLight,
    fontSize: AmalTheme.typography.sizes.xs,
    fontWeight: '600',
  },
});
