import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AmalTheme } from '@amal/ui';

export interface BurdenPillProps {
  minutes: number;
  pace?: 'Very Easy' | 'Gentle' | 'Moderate' | 'Steady';
}

export const BurdenPill: React.FC<BurdenPillProps> = ({ minutes, pace = 'Gentle' }) => {
  return (
    <View style={styles.pillContainer}>
      <Text style={styles.pillText}>
        {minutes} min · {pace}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pillContainer: {
    backgroundColor: AmalTheme.colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: AmalTheme.radii.full,
    alignSelf: 'flex-start',
  },
  pillText: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.primary,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
