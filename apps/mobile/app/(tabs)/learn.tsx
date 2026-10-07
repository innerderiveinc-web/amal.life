import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { AmalTheme } from '@amal/ui';

export default function LearnScreen() {
  const [search, setSearch] = useState('');

  const knowledgeSections = [
    { title: 'The Holy Qur\'an', count: '114 Surahs · Uthmani Text & Classical Tafsir', icon: '📖' },
    { title: 'Prophetic Hadith', count: 'Sahih al-Bukhari & Muslim · Governed Chains', icon: '📜' },
    { title: 'Islamic Concepts Graph', count: 'Sabr, Niyyah, Yusr, Tawakkul, Birr', icon: '🕸' },
    { title: 'Scholarly Rulings & Differences', count: 'Recognized 4 Madhhabs & Contemporary Counsel', icon: '⚖️' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.categoryLabel}>GOVERNED KNOWLEDGE</Text>
      <Text style={styles.title}>Learn & Explore</Text>
      <Text style={styles.subtitle}>
        Primary sources, authenticated translations, and scholarly provenance.
      </Text>

      {/* Search Input */}
      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Surah, Hadith, or Concept..."
          placeholderTextColor={AmalTheme.colors.text.tertiaryLight}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Core Knowledge Sections */}
      <Text style={styles.sectionHeading}>AUTHENTIC ISLAMIC SOURCES</Text>
      {knowledgeSections.map((sec, idx) => (
        <TouchableOpacity key={idx} style={styles.knowledgeCard} activeOpacity={0.7}>
          <Text style={styles.cardIcon}>{sec.icon}</Text>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>{sec.title}</Text>
            <Text style={styles.cardCount}>{sec.count}</Text>
          </View>
          <Text style={styles.cardArrow}>→</Text>
        </TouchableOpacity>
      ))}

      {/* Featured Ayah of the Day */}
      <View style={styles.featuredBox}>
        <Text style={styles.featuredLabel}>AYAH OF CONTEMPLATION</Text>
        <Text style={styles.arabicVerse}>
          وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ
        </Text>
        <Text style={styles.englishVerse}>
          "And whoever is mindful of Allah - He will make for him a way out and provide for him from where he does not expect." (Quran 65:2-3)
        </Text>
        <View style={styles.provenancePill}>
          <Text style={styles.provenanceText}>✓ Verified Edition: Hafs an Asim · Tanzil Approved</Text>
        </View>
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
  categoryLabel: {
    fontSize: AmalTheme.typography.sizes.xs,
    fontWeight: '800',
    letterSpacing: 1,
    color: AmalTheme.colors.primary,
    marginBottom: 2,
  },
  title: {
    fontSize: AmalTheme.typography.sizes['3xl'],
    fontWeight: '800',
    color: AmalTheme.colors.text.primaryLight,
  },
  subtitle: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.secondaryLight,
    lineHeight: 18,
    marginTop: 4,
    marginBottom: AmalTheme.spacing[4],
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderRadius: AmalTheme.radii.lg,
    paddingHorizontal: AmalTheme.spacing[3],
    paddingVertical: AmalTheme.spacing[2],
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
    marginBottom: AmalTheme.spacing[5],
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: AmalTheme.typography.sizes.sm,
    color: AmalTheme.colors.text.primaryLight,
  },
  sectionHeading: {
    fontSize: AmalTheme.typography.sizes.xs,
    fontWeight: '800',
    letterSpacing: 1,
    color: AmalTheme.colors.text.secondaryLight,
    marginBottom: AmalTheme.spacing[3],
  },
  knowledgeCard: {
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
  cardIcon: {
    fontSize: 22,
    marginRight: AmalTheme.spacing[3],
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: AmalTheme.typography.sizes.base,
    fontWeight: '700',
    color: AmalTheme.colors.text.primaryLight,
  },
  cardCount: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.secondaryLight,
    marginTop: 2,
  },
  cardArrow: {
    fontSize: 16,
    color: AmalTheme.colors.primary,
    fontWeight: '700',
  },
  featuredBox: {
    backgroundColor: AmalTheme.colors.surface.cardLight,
    borderRadius: AmalTheme.radii.xl,
    padding: AmalTheme.spacing[5],
    marginTop: AmalTheme.spacing[3],
    marginBottom: AmalTheme.spacing[6],
    borderWidth: 1,
    borderColor: AmalTheme.colors.surface.borderLight,
  },
  featuredLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    color: AmalTheme.colors.primary,
    marginBottom: AmalTheme.spacing[2],
  },
  arabicVerse: {
    fontSize: AmalTheme.typography.sizes.xl,
    fontFamily: AmalTheme.typography.fonts.arabic,
    lineHeight: 40,
    textAlign: 'right',
    color: AmalTheme.colors.text.primaryLight,
    marginBottom: AmalTheme.spacing[2],
  },
  englishVerse: {
    fontSize: AmalTheme.typography.sizes.xs,
    color: AmalTheme.colors.text.secondaryLight,
    lineHeight: 20,
    fontStyle: 'italic',
    marginBottom: AmalTheme.spacing[3],
  },
  provenancePill: {
    backgroundColor: AmalTheme.colors.accent.sand,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: AmalTheme.radii.sm,
    alignSelf: 'flex-start',
  },
  provenanceText: {
    fontSize: 10,
    color: AmalTheme.colors.accent.goldMuted,
    fontWeight: '700',
  },
});
