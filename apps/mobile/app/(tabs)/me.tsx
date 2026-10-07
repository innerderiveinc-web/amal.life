import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AmalTheme } from '@amal/ui';

export default function MeScreen() {
  const menuSections = [
    { title: 'What AMAL Remembers', subtitle: 'Transparent, auditable memory vault', icon: '🧠', route: '/settings/memory' },
    { title: 'Privacy & Data Governance', subtitle: 'GDPR export, zero ad sales, data wipe', icon: '🔒', route: '/settings/privacy' },
    { title: 'Worship & Fiqh Preferences', subtitle: 'Prayer calculations, Madhhab display', icon: '⚙️', route: '/me/preferences' },
    { title: 'My Family Hub', subtitle: 'Household group with strict adult privacy isolation', icon: '🏡', route: '/family' },
    { title: 'Resident Scholar Desk', subtitle: 'Case triage queue & jurist consultations', icon: '⚖️', route: '/scholar/desk' },
    { title: 'Safety, Helplines & Feedback', subtitle: 'Disputed claims reporting & crisis resources', icon: '🛡️', route: '/settings/safety' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>A</Text>
        </View>
        <View style={styles.profileMeta}>
          <Text style={styles.userName}>Ahmad Al-Mansoor</Text>
          <Text style={styles.userSub}>Season: Young Professional · London, UK</Text>
          <View style={styles.capacityBadge}>
            <Text style={styles.capacityText}>Daily Capacity: 15 min · Gentle</Text>
          </View>
        </View>
      </View>

      {/* Menu Navigation */}
      <Text style={styles.sectionHeader}>ACCOUNT & GOVERNANCE</Text>
      {menuSections.map((item, idx) => (
        <TouchableOpacity key={idx} style={styles.menuRow} activeOpacity={0.7}>
          <Text style={styles.menuIcon}>{item.icon}</Text>
          <View style={styles.menuInfo}>
            <Text style={styles.menuTitle}>{item.title}</Text>
            <Text style={styles.menuSub}>{item.subtitle}</Text>
          </View>
          <Text style={styles.menuArrow}>→</Text>
        </TouchableOpacity>
      ))}

      {/* Trust Notice */}
      <View style={styles.trustBox}>
        <Text style={styles.trustTitle}>🔒 THE AMAL PRIVACY PLEDGE</Text>
        <Text style={styles.trustBody}>
          Your prayers, reflections, and spiritual habits are never commercialized, sold to advertisers,
          or shared with employers.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AmalTheme.colors.surface.backgroundLight,
  },
  content: {
    padding: AmalTheme.spacing[5],
    paddingTop: AmalTheme.spacing[10],
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: AmalTheme.spacing[6],
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: AmalTheme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: AmalTheme.spacing[4],
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: AmalTheme.typography.sizes.xl,
    fontWeight: '800',
  },
  profileMeta: {
    flex: 1,
  },
  userName: {
    fontSize: AmalTheme.typography.sizes.xl,
    fontWeight: '800',
    color: AmalTheme.colors.text.primaryLight,
  },
  userSub: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.secondaryLight,
    marginTop: 2,
    marginBottom: 4,
  },
  capacityBadge: {
    backgroundColor: AmalTheme.colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: AmalTheme.radii.sm,
    alignSelf: 'flex-start',
  },
  capacityText: {
    fontSize: 10,
    color: AmalTheme.colors.primary,
    fontWeight: '700',
  },
  sectionHeader: {
    fontSize: AmalTheme.typography.sizes.xs,
    fontWeight: '800',
    letterSpacing: 1,
    color: AmalTheme.colors.text.secondaryLight,
    marginBottom: AmalTheme.spacing[3],
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderRadius: AmalTheme.radii.lg,
    padding: AmalTheme.spacing[4],
    marginBottom: AmalTheme.spacing[3],
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
    ...AmalTheme.shadows.subtle,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: AmalTheme.spacing[3],
  },
  menuInfo: {
    flex: 1,
  },
  menuTitle: {
    fontSize: AmalTheme.typography.sizes.sm,
    fontWeight: '700',
    color: AmalTheme.colors.text.primaryLight,
  },
  menuSub: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.secondaryLight,
    marginTop: 2,
  },
  menuArrow: {
    fontSize: 16,
    color: AmalTheme.colors.primary,
    fontWeight: '700',
  },
  trustBox: {
    backgroundColor: AmalTheme.colors.accent.sand,
    borderRadius: AmalTheme.radii.lg,
    padding: AmalTheme.spacing[4],
    marginTop: AmalTheme.spacing[4],
    marginBottom: AmalTheme.spacing[6],
  },
  trustTitle: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    color: AmalTheme.colors.primary,
    marginBottom: 4,
  },
  trustBody: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.secondaryLight,
    lineHeight: 18,
  },
});
