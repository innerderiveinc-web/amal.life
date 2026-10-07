import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AmalTheme } from '@amal/ui';

export default function OnboardingLayout({ children }: { children?: React.ReactNode }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AmalTheme.colors.surface.backgroundLight,
  },
});
