import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { AmalTheme } from '@amal/ui';
import {
  QURAN_WISDOM_COLLECTION,
  QuranAyahWisdomCard,
  getAyahAudioUrl,
  getAyahUrduAudioUrl,
} from '../data/quran-wisdom-data';
import { ALL_114_SURAHS, QuranSurahMeta } from '../data/quran-114-directory';

export const QuranScreen: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCard, setActiveCard] = useState<QuranAyahWisdomCard | null>(null);
  const [playingKey, setPlayingKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'WISDOM' | 'SURAHS'>('WISDOM');

  // Surah In-App Reader State
  const [selectedSurah, setSelectedSurah] = useState<QuranSurahMeta | null>(null);
  const [surahVerses, setSurahVerses] = useState<Array<{ ayahNumber: number; textArabic: string; textUrdu: string }>>([]);
  const [isLoadingVerses, setIsLoadingVerses] = useState<boolean>(false);

  const openSurahReader = async (meta: QuranSurahMeta) => {
    setSelectedSurah(meta);
    setSurahVerses([]);
    setIsLoadingVerses(true);
    try {
      const res = await fetch(`https://api.alquran.cloud/v1/surah/${meta.number}/editions/quran-uthmani,ur.kanzuliman`);
      const data = await res.json();
      if (data.code === 200 && Array.isArray(data.data) && data.data.length >= 2) {
        const uthmani = data.data[0];
        const urdu = data.data[1];
        const verses = uthmani.ayahs.map((ayah: any, idx: number) => ({
          ayahNumber: ayah.numberInSurah,
          textArabic: ayah.text,
          textUrdu: urdu.ayahs[idx]?.text || '',
        }));
        setSurahVerses(verses);
      }
    } catch (e) {
      console.warn('Failed to load surah verses:', e);
    } finally {
      setIsLoadingVerses(false);
    }
  };

  const themes = [
    { id: 'ALL', label: 'تمام آیات' },
    { id: 'IKHLAS', label: 'اخلاص و نیت' },
    { id: 'TAWAKKUL', label: 'توکل و صبر' },
    { id: 'SALAH', label: 'نماز و مناجات' },
    { id: 'AKHLAQ', label: 'اخلاق و حسنِ معاملہ' },
    { id: 'HUQUQ_UL_IBAD', label: 'حقوق العباد' },
    { id: 'TIME_MANAGEMENT', label: 'وقت کی قدر' },
  ];

  const filteredWisdom = QURAN_WISDOM_COLLECTION.filter((c) => {
    const matchesTheme = selectedTheme === 'ALL' || c.tadabburPrompt.theme === selectedTheme;
    const matchesSearch =
      searchQuery === '' ||
      c.surahNameUrdu.includes(searchQuery) ||
      c.tarjumaKanzulIman.includes(searchQuery) ||
      c.surahNameTransliterated.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTheme && matchesSearch;
  });

  const filteredSurahs = ALL_114_SURAHS.filter(
    (s) =>
      s.nameTransliterated.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nameUrdu.includes(searchQuery) ||
      s.nameArabic.includes(searchQuery) ||
      s.number.toString() === searchQuery
  );

  const toggleAudio = (card: QuranAyahWisdomCard, type: 'ARABIC' | 'URDU' | 'TAFSEER') => {
    const key = `${card.surahNumber}:${card.ayahNumber}:${type}`;
    if (playingKey === key) {
      setPlayingKey(null);
    } else {
      setPlayingKey(key);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Sacred Header Banner */}
        <View style={styles.headerCard}>
          <Text style={styles.bismillah}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</Text>
          <Text style={styles.headerTitle}>قرآنِ کریم اور حکمت</Text>
          <Text style={styles.headerSubtitle}>
            صحیح تلاوت، کنز الایمان فی ترجمۃ القرآن اور تفسیر خزائن العرفان
          </Text>
          <View style={styles.scholarBadge}>
            <Text style={styles.scholarBadgeText}>✓ Ahl al-Sunnah Verified Standards</Text>
          </View>
        </View>

        {/* View Mode Toggle: Wisdom Cards vs 114 Surahs */}
        <View style={styles.segmentedControl}>
          <TouchableOpacity
            style={[styles.segmentBtn, activeTab === 'WISDOM' && styles.segmentBtnActive]}
            onPress={() => setActiveTab('WISDOM')}
          >
            <Text style={[styles.segmentText, activeTab === 'WISDOM' && styles.segmentTextActive]}>
              ✨ قرآنی حکمت (42 آیات)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.segmentBtn, activeTab === 'SURAHS' && styles.segmentBtnActive]}
            onPress={() => setActiveTab('SURAHS')}
          >
            <Text style={[styles.segmentText, activeTab === 'SURAHS' && styles.segmentTextActive]}>
              📖 تمام ۱۱۴ سورتیں
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search Input */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder={activeTab === 'WISDOM' ? 'آیت، سورت یا ترجمہ تلاش کریں...' : 'سورت کا نام یا نمبر...'}
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={styles.clearSearch}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* THEMATIC WISDOM CARDS VIEW */}
        {activeTab === 'WISDOM' && (
          <View>
            {/* Thematic Filter Chips */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsScroll}>
              {themes.map((th) => (
                <TouchableOpacity
                  key={th.id}
                  style={[styles.chip, selectedTheme === th.id && styles.chipActive]}
                  onPress={() => setSelectedTheme(th.id)}
                >
                  <Text style={[styles.chipText, selectedTheme === th.id && styles.chipTextActive]}>
                    {th.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Wisdom Cards Stream */}
            <View style={styles.cardsStream}>
              {filteredWisdom.map((card) => {
                const isArabicPlaying = playingKey === `${card.surahNumber}:${card.ayahNumber}:ARABIC`;
                const isUrduPlaying = playingKey === `${card.surahNumber}:${card.ayahNumber}:URDU`;
                const isTafseerPlaying = playingKey === `${card.surahNumber}:${card.ayahNumber}:TAFSEER`;

                return (
                  <View key={`${card.surahNumber}-${card.ayahNumber}`} style={styles.wisdomCard}>
                    {/* Card Header */}
                    <View style={styles.cardTopRow}>
                      <View style={styles.surahTag}>
                        <Text style={styles.surahTagText}>
                          سورۃ {card.surahNameUrdu} ({card.ayahNumber})
                        </Text>
                      </View>
                      <Text style={styles.themeTagText}>{card.tadabburPrompt.theme}</Text>
                    </View>

                    {/* Arabic Text */}
                    <Text style={styles.arabicText}>{card.textArabic}</Text>

                    {/* Urdu Translation: Kanz-ul-Iman */}
                    <View style={styles.tarjumaBox}>
                      <Text style={styles.tarjumaLabel}>کنز الایمان فی ترجمۃ القرآن:</Text>
                      <Text style={styles.tarjumaText}>{card.tarjumaKanzulIman}</Text>
                    </View>

                    {/* Exegesis & Tadabbur Excerpt */}
                    <View style={styles.tafseerBox}>
                      <Text style={styles.tafseerLabel}>تفسیر خزائن العرفان (حکمت و تدبر):</Text>
                      <Text style={styles.tafseerText} numberOfLines={3}>
                        {card.tafseerKhazainUlIrfan.excerptUrdu}
                      </Text>
                    </View>

                    {/* 3 Premier Audio Buttons */}
                    <View style={styles.actionRow}>
                      <TouchableOpacity
                        style={[styles.audioBtn, isArabicPlaying && styles.audioBtnActive]}
                        onPress={() => toggleAudio(card, 'ARABIC')}
                      >
                        <Text style={styles.audioBtnIcon}>{isArabicPlaying ? '⏸' : '▶'}</Text>
                        <Text style={[styles.audioBtnText, isArabicPlaying && styles.audioBtnTextActive]}>
                          {isArabicPlaying ? 'جاری' : 'تلاوت'}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[styles.audioBtnUrdu, isUrduPlaying && styles.audioBtnUrduActive]}
                        onPress={() => toggleAudio(card, 'URDU')}
                      >
                        <Text style={styles.audioBtnIcon}>{isUrduPlaying ? '⏸' : '🎙️'}</Text>
                        <Text style={[styles.audioBtnText, isUrduPlaying && styles.audioBtnTextActive]}>
                          {isUrduPlaying ? 'ترجمہ جاری' : 'اردو ترجمہ'}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[styles.audioBtnTafseer, isTafseerPlaying && styles.audioBtnTafseerActive]}
                        onPress={() => setActiveCard(card)}
                      >
                        <Text style={styles.audioBtnIcon}>📖</Text>
                        <Text style={[styles.audioBtnText, { color: '#92400E' }]}>مکمل تفسیر</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* 114 SURAHS DIRECTORY VIEW */}
        {activeTab === 'SURAHS' && (
          <View style={styles.surahsContainer}>
            {filteredSurahs.map((meta) => (
              <TouchableOpacity
                key={meta.number}
                style={styles.surahRow}
                onPress={() => openSurahReader(meta)}
                activeOpacity={0.7}
              >
                <View style={styles.surahNumberCircle}>
                  <Text style={styles.surahNumberText}>{meta.number}</Text>
                </View>
                <View style={styles.surahDetails}>
                  <Text style={styles.surahTitle}>{meta.nameTransliterated}</Text>
                  <Text style={styles.surahSub}>
                    {meta.nameUrdu} • {meta.ayahsCount} آیات • {meta.revelationType === 'MECCAN' ? 'مکی' : 'مدنی'}
                  </Text>
                </View>
                <Text style={styles.surahArabicTitle}>{meta.nameArabic}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Surah In-App Reader Modal */}
      {selectedSurah && (
        <Modal visible={!!selectedSurah} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { maxHeight: '90%' }]}>
              <View style={styles.modalHeader}>
                <View>
                  <Text style={styles.modalTitle}>
                    {selectedSurah.nameArabic} ({selectedSurah.nameTransliterated})
                  </Text>
                  <Text style={{ fontSize: 12, color: '#64748B' }}>
                    {selectedSurah.nameUrdu} • {selectedSurah.ayahsCount} آیات • ترجمہ کنز الایمان
                  </Text>
                </View>
                <TouchableOpacity onPress={() => setSelectedSurah(null)}>
                  <Text style={styles.modalClose}>✕</Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalBody}>
                {isLoadingVerses ? (
                  <View style={{ padding: 30, alignItems: 'center' }}>
                    <Text style={{ color: '#065F46', fontWeight: 'bold' }}>سورت مبارکہ لوڈ ہو رہی ہے...</Text>
                  </View>
                ) : (
                  surahVerses.map((v) => (
                    <View key={v.ayahNumber} style={[styles.modalSection, { paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' }]}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                        <Text style={{ fontSize: 11, fontWeight: '700', color: '#065F46' }}>آیت {v.ayahNumber}</Text>
                      </View>
                      <Text style={[styles.modalArabic, { textAlign: 'right', marginBottom: 8 }]}>{v.textArabic}</Text>
                      <Text style={[styles.modalUrdu, { textAlign: 'right', color: '#1E293B' }]}>{v.textUrdu}</Text>
                    </View>
                  ))
                )}
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}

      {/* Deep Tafseer Study Modal */}
      {activeCard && (
        <Modal visible={!!activeCard} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  سورۃ {activeCard.surahNameUrdu} — آیت {activeCard.ayahNumber}
                </Text>
                <TouchableOpacity onPress={() => setActiveCard(null)}>
                  <Text style={styles.modalClose}>✕</Text>
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.modalBody}>
                <Text style={styles.modalArabic}>{activeCard.textArabic}</Text>
                <View style={styles.modalSection}>
                  <Text style={styles.modalHeading}>ترجمہ کنز الایمان:</Text>
                  <Text style={styles.modalUrdu}>{activeCard.tarjumaKanzulIman}</Text>
                </View>
                <View style={styles.modalSection}>
                  <Text style={styles.modalHeading}>تفسیر خزائن العرفان:</Text>
                  <Text style={styles.modalUrdu}>{activeCard.tafseerKhazainUlIrfan.excerptUrdu}</Text>
                </View>
                <View style={styles.modalSection}>
                  <Text style={styles.modalHeading}>تدبر و دینی عمل (Sunnah Action):</Text>
                  <Text style={styles.modalUrdu}>{activeCard.optionalAmal.actionDescriptionUrdu}</Text>
                </View>
              </ScrollView>
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
    backgroundColor: '#F8FAF9',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  headerCard: {
    backgroundColor: '#0F291E',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  bismillah: {
    fontSize: 18,
    color: '#86EFAC',
    marginBottom: 6,
    fontWeight: '700',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#D1FAE5',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 10,
  },
  scholarBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.3)',
  },
  scholarBadgeText: {
    fontSize: 10,
    color: '#6EE7B7',
    fontWeight: '700',
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: 10,
    padding: 3,
    marginBottom: 12,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  segmentBtnActive: {
    backgroundColor: '#065F46',
  },
  segmentText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  segmentTextActive: {
    color: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    marginBottom: 14,
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 13,
    color: '#0F172A',
  },
  clearSearch: {
    fontSize: 14,
    color: '#94A3B8',
    padding: 4,
  },
  chipsScroll: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 12,
  },
  chip: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  chipActive: {
    backgroundColor: '#065F46',
    borderColor: '#065F46',
  },
  chipText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  cardsStream: {
    gap: 16,
  },
  wisdomCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  surahTag: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  surahTagText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#166534',
  },
  themeTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#059669',
  },
  arabicText: {
    fontSize: 22,
    lineHeight: 38,
    color: '#0F172A',
    textAlign: 'right',
    marginBottom: 12,
    fontWeight: '600',
  },
  tarjumaBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 12,
    borderRightWidth: 3,
    borderRightColor: '#059669',
    marginBottom: 10,
  },
  tarjumaLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#065F46',
    marginBottom: 4,
    textAlign: 'right',
  },
  tarjumaText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#1E293B',
    textAlign: 'right',
  },
  tafseerBox: {
    backgroundColor: '#FFFBEB',
    borderRadius: 10,
    padding: 12,
    borderRightWidth: 3,
    borderRightColor: '#D97706',
    marginBottom: 14,
  },
  tafseerLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#92400E',
    marginBottom: 4,
    textAlign: 'right',
  },
  tafseerText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#78350F',
    textAlign: 'right',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
  },
  audioBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: 8,
    paddingVertical: 8,
  },
  audioBtnActive: {
    backgroundColor: '#065F46',
  },
  audioBtnUrdu: {
    flex: 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: '#F0F9FF',
    borderWidth: 1,
    borderColor: '#BAE6FD',
    borderRadius: 8,
    paddingVertical: 8,
  },
  audioBtnUrduActive: {
    backgroundColor: '#0284C7',
  },
  audioBtnTafseer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: 8,
    paddingVertical: 8,
  },
  audioBtnTafseerActive: {
    backgroundColor: '#92400E',
  },
  audioBtnIcon: {
    fontSize: 12,
  },
  audioBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#166534',
  },
  audioBtnTextActive: {
    color: '#FFFFFF',
  },
  surahsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  surahRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  surahNumberCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  surahNumberText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },
  surahDetails: {
    flex: 1,
  },
  surahTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  surahSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  surahArabicTitle: {
    fontSize: 18,
    color: '#0F172A',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingBottom: 12,
    marginBottom: 14,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  modalClose: {
    fontSize: 18,
    color: '#64748B',
    fontWeight: '700',
  },
  modalBody: {
    paddingBottom: 20,
  },
  modalArabic: {
    fontSize: 22,
    lineHeight: 36,
    textAlign: 'right',
    color: '#0F172A',
    marginBottom: 16,
  },
  modalSection: {
    marginBottom: 14,
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 10,
  },
  modalHeading: {
    fontSize: 12,
    fontWeight: '800',
    color: '#065F46',
    marginBottom: 6,
    textAlign: 'right',
  },
  modalUrdu: {
    fontSize: 13,
    lineHeight: 20,
    color: '#1E293B',
    textAlign: 'right',
  },
});
