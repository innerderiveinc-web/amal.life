import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { AmalTheme } from '@amal/ui';
import { MASTER_CANONICAL_CORPUS, CanonicalEditionRecord } from '@amal/evidence';

export const LibraryScreen: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState('ALL');
  const [activeModalWork, setActiveModalWork] = useState<CanonicalEditionRecord | null>(null);

  const filterCategories = [
    { key: 'ALL', label: 'All (76)' },
    { key: 'HADITH', label: 'Hadith' },
    { key: 'TAFSIR', label: 'Tafsir' },
    { key: 'HANAFI', label: 'Hanafi' },
    { key: 'MALIKI', label: 'Maliki' },
    { key: 'SHAFII', label: 'Shafi\'i' },
    { key: 'HANBALI', label: 'Hanbali' },
    { key: 'USUL', label: 'Usul' },
    { key: 'AQEEDAH', label: 'Aqeedah' },
    { key: 'SIRAH', label: 'Sirah' },
    { key: 'TAZKIYAH', label: 'Tazkiyah' },
    { key: 'HISTORY', label: 'History' },
  ];

  const filteredWorks = MASTER_CANONICAL_CORPUS.filter((item) => {
    if (selectedDiscipline === 'HANAFI' && item.discipline !== 'HANAFI_FIQH') return false;
    if (selectedDiscipline === 'MALIKI' && item.discipline !== 'MALIKI_FIQH') return false;
    if (selectedDiscipline === 'SHAFII' && item.discipline !== 'SHAFII_FIQH') return false;
    if (selectedDiscipline === 'HANBALI' && item.discipline !== 'HANBALI_FIQH') return false;
    if (selectedDiscipline === 'SIRAH' && item.discipline !== 'SIRAH' && item.discipline !== 'SHAMAIL') return false;
    if (selectedDiscipline === 'TAZKIYAH' && item.discipline !== 'TAZKIYAH' && item.discipline !== 'SPIRITUAL_HERITAGE') return false;
    if (selectedDiscipline === 'USUL' && item.discipline !== 'USUL_AL_FIQH') return false;
    if (selectedDiscipline === 'HISTORY' && item.discipline !== 'ISLAMIC_HISTORY') return false;
    if (selectedDiscipline === 'HADITH' && item.discipline !== 'HADITH') return false;
    if (selectedDiscipline === 'TAFSIR' && item.discipline !== 'TAFSIR') return false;
    if (selectedDiscipline === 'AQEEDAH' && item.discipline !== 'AQEEDAH') return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        item.title_arabic.includes(search) ||
        item.title_transliterated.toLowerCase().includes(q) ||
        item.author_name.toLowerCase().includes(q) ||
        item.edition_publisher.toLowerCase().includes(q) ||
        item.critical_editor_muhaqqiq.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerSubtitle}>CANONICAL REGISTRY · السواد الأعظم</Text>
        <Text style={styles.headerTitle}>Heritage Library</Text>
        <Text style={styles.headerDesc}>
          76 classical works across Hadith, Tafsir, 4 Madhhabs & Tazkiyah.
        </Text>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="Search classical titles, authors, publishers..."
          placeholderTextColor="#94A3B8"
        />
      </View>

      {/* Discipline Filters */}
      <View style={styles.filtersWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {filterCategories.map((cat) => {
            const isActive = selectedDiscipline === cat.key;
            return (
              <TouchableOpacity
                key={cat.key}
                style={[styles.filterChip, isActive && styles.filterChipActive]}
                onPress={() => setSelectedDiscipline(cat.key)}
              >
                <Text style={[styles.filterChipText, isActive && styles.filterChipTextActive]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Books List */}
      <ScrollView contentContainerStyle={styles.listContent}>
        <Text style={styles.resultCount}>
          Showing {filteredWorks.length} of {MASTER_CANONICAL_CORPUS.length} Verified Masterworks
        </Text>

        {filteredWorks.map((work) => (
          <TouchableOpacity
            key={work.work_id}
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => setActiveModalWork(work)}
          >
            <View style={styles.cardHeader}>
              <View style={styles.disciplineBadge}>
                <Text style={styles.disciplineBadgeText}>{work.discipline.replace('_', ' ')}</Text>
              </View>
              <Text style={styles.deathYear}>
                {work.author_death_hijri > 0 ? `${work.author_death_hijri} AH` : 'Revelation'}
              </Text>
            </View>

            <Text style={styles.arabicTitle}>{work.title_arabic}</Text>
            <Text style={styles.transliteratedTitle}>{work.title_transliterated}</Text>
            <Text style={styles.authorName}>{work.author_name}</Text>

            <View style={styles.cardFooter}>
              <Text style={styles.publisherText}>
                {work.edition_publisher} · {work.volume_count} {work.volume_count > 1 ? 'Vols' : 'Vol'}
              </Text>
              <Text style={styles.viewDetailsText}>Tap to inspect →</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Book Inspection Modal */}
      {activeModalWork && (
        <Modal
          visible={true}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setActiveModalWork(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <ScrollView>
                <View style={styles.modalBadge}>
                  <Text style={styles.modalBadgeText}>PUBLIC DOMAIN CONFIRMED · VERIFIED</Text>
                </View>

                <Text style={styles.modalArabicTitle}>{activeModalWork.title_arabic}</Text>
                <Text style={styles.modalTitle}>{activeModalWork.title_transliterated}</Text>
                <Text style={styles.modalAuthor}>
                  Author: {activeModalWork.author_name} ({activeModalWork.author_death_hijri > 0 ? `d. ${activeModalWork.author_death_hijri} AH` : 'Revelation'})
                </Text>

                <View style={styles.metadataGrid}>
                  <View style={styles.metaRow}>
                    <Text style={styles.metaLabel}>PHYSICAL PUBLISHER</Text>
                    <Text style={styles.metaVal}>{activeModalWork.edition_publisher}</Text>
                  </View>
                  <View style={styles.metaRow}>
                    <Text style={styles.metaLabel}>PUBLICATION CITY</Text>
                    <Text style={styles.metaVal}>{activeModalWork.publication_city}</Text>
                  </View>
                  <View style={styles.metaRow}>
                    <Text style={styles.metaLabel}>CRITICAL EDITOR (المحقق)</Text>
                    <Text style={styles.metaVal}>{activeModalWork.critical_editor_muhaqqiq}</Text>
                  </View>
                  <View style={styles.metaRow}>
                    <Text style={styles.metaLabel}>VOLUMES</Text>
                    <Text style={styles.metaVal}>{activeModalWork.volume_count} {activeModalWork.volume_count > 1 ? 'Volumes' : 'Volume'}</Text>
                  </View>
                </View>

                <View style={styles.hashContainer}>
                  <Text style={styles.hashLabel}>SHA-256 PROVENANCE CHECKSUM</Text>
                  <Text style={styles.hashValue}>{activeModalWork.provenance_sha256}</Text>
                </View>

                <View style={styles.guaranteeBox}>
                  <Text style={styles.guaranteeText}>
                    ✓ Bound strictly to the historical consensus of Ahl al-Sunnah wa al-Jama'ah (Sawad al-A'zam). Zero synthetic attributions.
                  </Text>
                </View>
              </ScrollView>

              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setActiveModalWork(null)}
              >
                <Text style={styles.closeBtnText}>Close Inspector</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerSubtitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F4C3A',
    letterSpacing: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#181E1C',
    marginVertical: 4,
  },
  headerDesc: {
    fontSize: 13,
    color: '#5C6662',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginTop: 8,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 13,
    borderWidth: 1,
    borderColor: '#EAE6DF',
    color: '#181E1C',
  },
  filtersWrapper: {
    marginVertical: 10,
  },
  filterScroll: {
    paddingHorizontal: 20,
    gap: 6,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  filterChipActive: {
    backgroundColor: '#0F4C3A',
    borderColor: '#0F4C3A',
  },
  filterChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#444',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  resultCount: {
    fontSize: 12,
    fontWeight: '700',
    color: '#777',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EAE6DF',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  disciplineBadge: {
    backgroundColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  disciplineBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#334155',
  },
  deathYear: {
    fontSize: 11,
    color: '#888',
  },
  arabicTitle: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'right',
    color: '#0F4C3A',
    marginBottom: 4,
  },
  transliteratedTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#181E1C',
  },
  authorName: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  publisherText: {
    fontSize: 11,
    color: '#888',
  },
  viewDetailsText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F4C3A',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    maxHeight: '85%',
  },
  modalBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 8,
  },
  modalBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2E7D32',
  },
  modalArabicTitle: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'right',
    color: '#0F4C3A',
    marginVertical: 4,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#181E1C',
  },
  modalAuthor: {
    fontSize: 13,
    color: '#555',
    marginBottom: 16,
  },
  metadataGrid: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 14,
    gap: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  metaRow: {
    flexDirection: 'column',
  },
  metaLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
  },
  metaVal: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 2,
  },
  hashContainer: {
    backgroundColor: '#0F172A',
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
  },
  hashLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 1,
  },
  hashValue: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: '#34D399',
    marginTop: 4,
  },
  guaranteeBox: {
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  guaranteeText: {
    fontSize: 11,
    color: '#92400E',
    lineHeight: 16,
  },
  closeBtn: {
    backgroundColor: '#0F4C3A',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  closeBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});
