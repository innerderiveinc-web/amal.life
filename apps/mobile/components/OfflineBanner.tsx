import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AmalTheme } from '@amal/ui';

export interface OfflineBannerProps {
  isOffline: boolean;
  pendingSyncCount?: number;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({
  isOffline,
  pendingSyncCount = 0,
}) => {
  if (!isOffline && pendingSyncCount === 0) return null;

  return (
    <View style={styles.bannerContainer}>
      <Text style={styles.bannerIcon}>📡</Text>
      <Text style={styles.bannerText}>
        {isOffline
          ? 'Offline Mode: Actions & reflections saved locally to sync later.'
          : `Syncing ${pendingSyncCount} saved actions to vault...`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    backgroundColor: AmalTheme.colors.accent.sand,
    paddingVertical: AmalTheme.spacing[2],
    paddingHorizontal: AmalTheme.spacing[4],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: AmalTheme.colors.surface.borderLight,
  },
  bannerIcon: {
    fontSize: 12,
    marginRight: 6,
  },
  bannerText: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.secondaryLight,
    fontWeight: '600',
  },
});
