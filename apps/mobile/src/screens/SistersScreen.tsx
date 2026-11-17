import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import {
  WOMEN_CLASSICAL_CANON,
  SanctuaryBook,
  SanctuaryBookChapter,
  SAHABIYYAT_PROFILES,
  SahabiyyatProfile,
  MOTHERHOOD_FAMILY_DUAS,
  AHKAM_NISWAN_GUIDE,
  FiqhRulingItem,
} from '../data/women-sanctuary-data';

export const SistersScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'BOOKS' | 'FIQH' | 'SAHABIYYAT' | 'DUAS'>('BOOKS');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Reader Modal State
  const [activeBook, setActiveBook] = useState<SanctuaryBook | null>(null);
  const [activeChapter, setActiveChapter] = useState<SanctuaryBookChapter | null>(null);
  const [activeProfile, setActiveProfile] = useState<SahabiyyatProfile | null>(null);

  const categories = [
    { id: 'ALL', label: `تمام کتب (${WOMEN_CLASSICAL_CANON.length})` },
    { id: 'fiqh_taharah', label: 'فقہ و طہارت' },
    { id: 'ummahat_banat', label: 'امہات المؤمنین' },
    { id: 'sahabiyyat_muhaddithat', label: 'صحابیات و محدثات' },
    { id: 'salihat_tarbiyat', label: 'صالحات و تربیت' },
  ];

  const filteredBooks = WOMEN_CLASSICAL_CANON.filter((book) => {
    const matchesCat = selectedCategory === 'ALL' || book.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      book.titleUrdu.includes(searchQuery) ||
      book.authorUrdu.includes(searchQuery) ||
      book.titleEnglish.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>گوشۂ خواتین و صحابیات</Text>
        </View>
        <Text style={styles.title}>Sisters Sanctuary & Sahabiyyat</Text>
        <Text style={styles.subtitle}>۲۱ مستند کتب، احکامِ طہارت اور اسوۂ صحابیات</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'BOOKS' && styles.tabBtnActive]}
          onPress={() => setActiveTab('BOOKS')}
        >
          <Text style={[styles.tabBtnText, activeTab === 'BOOKS' && styles.tabBtnTextActive]}>
            📚 کتب خانہ ({WOMEN_CLASSICAL_CANON.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'FIQH' && styles.tabBtnActive]}
          onPress={() => setActiveTab('FIQH')}
        >
          <Text style={[styles.tabBtnText, activeTab === 'FIQH' && styles.tabBtnTextActive]}>
            ⚖️ احکامِ نسواں
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'SAHABIYYAT' && styles.tabBtnActive]}
          onPress={() => setActiveTab('SAHABIYYAT')}
        >
          <Text style={[styles.tabBtnText, activeTab === 'SAHABIYYAT' && styles.tabBtnTextActive]}>
            🌸 سیرتِ صحابیات ({SAHABIYYAT_PROFILES.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'DUAS' && styles.tabBtnActive]}
          onPress={() => setActiveTab('DUAS')}
        >
          <Text style={[styles.tabBtnText, activeTab === 'DUAS' && styles.tabBtnTextActive]}>
            🤲 دعائیں
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent}>
        {/* 1. BOOKS TAB */}
        {activeTab === 'BOOKS' && (
          <View>
            <TextInput
              style={styles.searchInput}
              placeholder="کتاب یا مصنف کا نام تلاش فرمائیں..."
              placeholderTextColor="#94A3B8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            {/* Category Filter Pills */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryRow}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[styles.catPill, selectedCategory === cat.id && styles.catPillActive]}
                  onPress={() => setSelectedCategory(cat.id)}
                >
                  <Text style={[styles.catPillText, selectedCategory === cat.id && styles.catPillTextActive]}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Books Cards */}
            {filteredBooks.map((book) => (
              <TouchableOpacity
                key={book.id}
                style={styles.bookCard}
                onPress={() => {
                  setActiveBook(book);
                  setActiveChapter(book.coreChapters[0] || null);
                }}
              >
                <View style={styles.bookCardTop}>
                  <View style={styles.eraBadge}>
                    <Text style={styles.eraText}>{book.sanadGrade}</Text>
                  </View>
                  <Text style={styles.bookCategory}>{book.categoryLabelUrdu}</Text>
                </View>
                <Text style={styles.bookTitleUrdu}>{book.titleUrdu}</Text>
                <Text style={styles.bookTitleEng}>{book.titleEnglish}</Text>
                <Text style={styles.bookAuthor}>مصنف: {book.authorUrdu} ({book.authorEra})</Text>
                <Text style={styles.bookDesc} numberOfLines={2}>
                  {book.descriptionUrdu}
                </Text>
                <View style={styles.bookFooter}>
                  <Text style={styles.chaptersCount}>📖 {book.coreChapters.length} ابواب دستیاب</Text>
                  <Text style={styles.openText}>مطالعہ فرمائیں ➔</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* 2. FIQH AL-NISWAN TAB */}
        {activeTab === 'FIQH' && (
          <View>
            {AHKAM_NISWAN_GUIDE.map((item) => (
              <View key={item.id} style={styles.fiqhCard}>
                <View style={styles.fiqhCardHeader}>
                  <Text style={styles.fiqhBadge}>{item.titleUrdu}</Text>
                  <Text style={styles.fiqhRulingBadge}>{item.category}</Text>
                </View>
                <Text style={styles.fiqhQuestion}>{item.summaryUrdu}</Text>
                <Text style={styles.fiqhAnswer}>{item.detailedRulingUrdu}</Text>
                <View style={styles.fiqhCitationBox}>
                  <Text style={styles.fiqhCitationTitle}>مستند ماخذ:</Text>
                  <Text style={styles.fiqhCitation}>{item.hanafiReference}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* 3. SAHABIYYAT TAB */}
        {activeTab === 'SAHABIYYAT' && (
          <View>
            {SAHABIYYAT_PROFILES.map((profile) => (
              <TouchableOpacity
                key={profile.id}
                style={styles.profileCard}
                onPress={() => setActiveProfile(profile)}
              >
                <View style={styles.profileHeader}>
                  <Text style={styles.profileIcon}>🌸</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.profileNameUrdu}>{profile.nameUrdu}</Text>
                    <Text style={styles.profileTitleUrdu}>{profile.titleUrdu}</Text>
                  </View>
                </View>
                <Text style={styles.profileSummary} numberOfLines={3}>
                  {profile.biographyUrdu}
                </Text>
                <View style={styles.profileFooter}>
                  <Text style={styles.openProfile}>سیرت و احادیث پڑھیں ➔</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* 4. MASNOON DUAS TAB */}
        {activeTab === 'DUAS' && (
          <View>
            {MOTHERHOOD_FAMILY_DUAS.map((dua) => (
              <View key={dua.id} style={styles.duaCard}>
                <View style={styles.duaHeader}>
                  <Text style={styles.duaTitleUrdu}>{dua.titleUrdu}</Text>
                  <Text style={styles.duaOccasion}>{dua.category}</Text>
                </View>
                <Text style={styles.duaArabic}>{dua.arabicText}</Text>
                <View style={styles.tarjumaBox}>
                  <Text style={styles.tarjumaLabel}>ترجمہ:</Text>
                  <Text style={styles.tarjumaText}>{dua.translationUrdu}</Text>
                </View>
                <Text style={styles.duaSanad}>حوالہ: {dua.reference}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* BOOK READER MODAL */}
      <Modal visible={!!activeBook} animationType="slide" onRequestClose={() => setActiveBook(null)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setActiveBook(null)} style={styles.modalCloseBtn}>
              <Text style={styles.modalCloseText}>✕ بند کریں</Text>
            </TouchableOpacity>
            <Text style={styles.modalHeaderTitle} numberOfLines={1}>
              {activeBook?.titleUrdu}
            </Text>
          </View>

          {/* Chapter Selector */}
          {activeBook && activeBook.coreChapters.length > 1 && (
            <ScrollView horizontal style={styles.chapterSelectorRow} showsHorizontalScrollIndicator={false}>
              {activeBook.coreChapters.map((ch, idx) => (
                <TouchableOpacity
                  key={ch.chapterId}
                  style={[
                    styles.chapterPill,
                    activeChapter?.chapterId === ch.chapterId && styles.chapterPillActive,
                  ]}
                  onPress={() => setActiveChapter(ch)}
                >
                  <Text
                    style={[
                      styles.chapterPillText,
                      activeChapter?.chapterId === ch.chapterId && styles.chapterPillTextActive,
                    ]}
                  >
                    باب {idx + 1}: {ch.titleUrdu}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          <ScrollView style={styles.modalBody}>
            {activeChapter && (
              <View style={styles.chapterContent}>
                <Text style={styles.chapterTitle}>{activeChapter.titleUrdu}</Text>
                <Text style={styles.chapterEngTitle}>{activeChapter.titleEnglish}</Text>

                {activeChapter.arabicEvidence && (
                  <View style={styles.arabicEvidenceBox}>
                    <Text style={styles.arabicEvidenceText}>{activeChapter.arabicEvidence}</Text>
                  </View>
                )}

                <Text style={styles.fullChapterText}>{activeChapter.fullTextUrdu}</Text>

                <View style={styles.referenceBox}>
                  <Text style={styles.referenceTitle}>مستند حوالہ:</Text>
                  <Text style={styles.referenceText}>{activeChapter.hadithOrFiqhReference}</Text>
                </View>

                {activeChapter.keyTakeaways && activeChapter.keyTakeaways.length > 0 && (
                  <View style={styles.takeawaysBox}>
                    <Text style={styles.takeawaysTitle}>اہم فقہی نکات:</Text>
                    {activeChapter.keyTakeaways.map((point, i) => (
                      <Text key={i} style={styles.takeawayPoint}>
                        • {point}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            )}
          </ScrollView>
        </View>
      </Modal>

      {/* SAHABIYYAT PROFILE MODAL */}
      <Modal visible={!!activeProfile} animationType="slide" onRequestClose={() => setActiveProfile(null)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setActiveProfile(null)} style={styles.modalCloseBtn}>
              <Text style={styles.modalCloseText}>✕ بند کریں</Text>
            </TouchableOpacity>
            <Text style={styles.modalHeaderTitle} numberOfLines={1}>
              {activeProfile?.nameUrdu}
            </Text>
          </View>

          <ScrollView style={styles.modalBody}>
            {activeProfile && (
              <View style={styles.chapterContent}>
                <Text style={styles.profileModalName}>{activeProfile.nameUrdu}</Text>
                <Text style={styles.profileModalTitle}>{activeProfile.titleUrdu}</Text>
                <Text style={styles.profileEraBadge}>دور: {activeProfile.era} • {activeProfile.kinshipToProphet}</Text>

                <View style={styles.bioCard}>
                  <Text style={styles.bioHeading}>حیاتِ مبارکہ اور خدمات:</Text>
                  <Text style={styles.bioText}>{activeProfile.biographyUrdu}</Text>
                </View>

                {activeProfile.heroicAttributes && activeProfile.heroicAttributes.length > 0 && (
                  <View style={styles.milestonesSection}>
                    <Text style={styles.milestoneHeading}>نمایاں اوصاف و خصوصیات:</Text>
                    {activeProfile.heroicAttributes.map((attr, idx) => (
                      <View key={idx} style={styles.milestoneItem}>
                        <Text style={styles.milestoneTitle}>✦ {attr}</Text>
                      </View>
                    ))}
                  </View>
                )}

                {activeProfile.dailySunnahLessons && activeProfile.dailySunnahLessons.length > 0 && (
                  <View style={styles.milestonesSection}>
                    <Text style={styles.milestoneHeading}>روزمرہ کے عملی دروس:</Text>
                    {activeProfile.dailySunnahLessons.map((lesson, idx) => (
                      <View key={idx} style={styles.milestoneItem}>
                        <Text style={styles.milestoneDesc}>{lesson.ur}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            )}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFBF7',
  },
  header: {
    padding: 16,
    backgroundColor: '#064E3B',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    marginBottom: 6,
  },
  badgeText: {
    color: '#A7F3D0',
    fontSize: 11,
    fontWeight: '700',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    color: '#D1FAE5',
    fontSize: 11,
    marginTop: 2,
    textAlign: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  tabBtnActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#059669',
  },
  tabBtnText: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '600',
  },
  tabBtnTextActive: {
    color: '#065F46',
    fontWeight: '800',
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 14,
    paddingBottom: 40,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    fontSize: 13,
    color: '#1E293B',
    textAlign: 'right',
    marginBottom: 10,
  },
  categoryRow: {
    marginBottom: 12,
  },
  catPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    marginRight: 8,
  },
  catPillActive: {
    backgroundColor: '#065F46',
    borderColor: '#065F46',
  },
  catPillText: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '600',
  },
  catPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  bookCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  bookCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  eraBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  eraText: {
    color: '#065F46',
    fontSize: 10,
    fontWeight: '700',
  },
  bookCategory: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '600',
  },
  bookTitleUrdu: {
    fontSize: 16,
    fontWeight: '800',
    color: '#064E3B',
    textAlign: 'right',
    marginBottom: 2,
  },
  bookTitleEng: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 6,
  },
  bookDesc: {
    fontSize: 11,
    color: '#475569',
    lineHeight: 16,
    marginBottom: 10,
  },
  bookFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 8,
  },
  chaptersCount: {
    fontSize: 11,
    color: '#065F46',
    fontWeight: '600',
  },
  openText: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '700',
  },
  fiqhCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  fiqhCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  fiqhBadge: {
    fontSize: 11,
    fontWeight: '700',
    color: '#065F46',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  fiqhRulingBadge: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
  },
  fiqhQuestion: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'right',
    marginBottom: 6,
    lineHeight: 20,
  },
  fiqhAnswer: {
    fontSize: 12,
    color: '#334155',
    textAlign: 'right',
    lineHeight: 18,
    marginBottom: 8,
  },
  fiqhCitationBox: {
    backgroundColor: '#F8FAFC',
    padding: 8,
    borderRadius: 6,
  },
  fiqhCitationTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
  },
  fiqhCitation: {
    fontSize: 10,
    color: '#475569',
    marginTop: 2,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  profileIcon: {
    fontSize: 24,
  },
  profileNameUrdu: {
    fontSize: 16,
    fontWeight: '800',
    color: '#064E3B',
    textAlign: 'right',
  },
  profileTitleUrdu: {
    fontSize: 11,
    color: '#64748B',
    textAlign: 'right',
  },
  profileSummary: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
    marginBottom: 8,
  },
  profileFooter: {
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 6,
  },
  openProfile: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '700',
  },
  duaCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  duaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  duaTitleUrdu: {
    fontSize: 14,
    fontWeight: '700',
    color: '#065F46',
  },
  duaOccasion: {
    fontSize: 10,
    color: '#64748B',
  },
  duaArabic: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'right',
    lineHeight: 28,
    marginBottom: 8,
  },
  tarjumaBox: {
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 8,
    marginBottom: 6,
  },
  tarjumaLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 2,
  },
  tarjumaText: {
    fontSize: 12,
    color: '#334155',
    lineHeight: 18,
  },
  duaSanad: {
    fontSize: 10,
    color: '#94A3B8',
    textAlign: 'right',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    backgroundColor: '#064E3B',
  },
  modalCloseBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  modalCloseText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  modalHeaderTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    flex: 1,
    textAlign: 'right',
    marginLeft: 12,
  },
  chapterSelectorRow: {
    backgroundColor: '#F1F5F9',
    padding: 8,
  },
  chapterPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    marginRight: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chapterPillActive: {
    backgroundColor: '#065F46',
    borderColor: '#065F46',
  },
  chapterPillText: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '600',
  },
  chapterPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  modalBody: {
    flex: 1,
    padding: 16,
  },
  chapterContent: {
    paddingBottom: 40,
  },
  chapterTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#064E3B',
    textAlign: 'right',
    marginBottom: 4,
  },
  chapterEngTitle: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 12,
  },
  arabicEvidenceBox: {
    backgroundColor: '#F0FDF4',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#059669',
    marginBottom: 12,
  },
  arabicEvidenceText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#065F46',
    textAlign: 'right',
    lineHeight: 24,
  },
  fullChapterText: {
    fontSize: 14,
    color: '#1E293B',
    lineHeight: 22,
    marginBottom: 16,
    textAlign: 'right',
  },
  referenceBox: {
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  referenceTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#065F46',
    marginBottom: 2,
  },
  referenceText: {
    fontSize: 11,
    color: '#475569',
  },
  takeawaysBox: {
    backgroundColor: '#FFFBEB',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  takeawaysTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#B45309',
    marginBottom: 6,
  },
  takeawayPoint: {
    fontSize: 11,
    color: '#78350F',
    lineHeight: 18,
    marginBottom: 4,
  },
  profileModalName: {
    fontSize: 20,
    fontWeight: '900',
    color: '#064E3B',
    textAlign: 'right',
    marginBottom: 4,
  },
  profileModalTitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'right',
    marginBottom: 6,
  },
  profileEraBadge: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '700',
    marginBottom: 14,
  },
  bioCard: {
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 10,
    marginBottom: 14,
  },
  bioHeading: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
  },
  bioText: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 20,
  },
  milestonesSection: {
    marginTop: 8,
  },
  milestoneHeading: {
    fontSize: 13,
    fontWeight: '800',
    color: '#065F46',
    marginBottom: 8,
  },
  milestoneItem: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  milestoneTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  milestoneDesc: {
    fontSize: 11,
    color: '#475569',
    lineHeight: 16,
  },
});
