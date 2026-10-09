import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { knowledgeVaultEngine, VaultSavedNote } from '@amal/amal-engine';

export const VaultScreen: React.FC = () => {
  const [inputText, setInputText] = useState(
    'In Friday dars, the Sheikh mentioned that deeds are by intentions, quoting from Sahih al-Bukhari and Surah Qaf. Also Imam al-Ghazali discussed the diseases of the tongue in Ihya Ulum al-Din.'
  );
  const [noteTitle, setNoteTitle] = useState('Friday Dars Notes: Guarding Speech');
  const [analyzedNote, setAnalyzedNote] = useState<VaultSavedNote | null>(null);

  const handleScan = () => {
    const result = knowledgeVaultEngine.ingestAndAnalyzeNote(
      'user-mobile',
      noteTitle,
      'FRIDAY_KHUTBAH',
      inputText
    );
    setAnalyzedNote(result);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Knowledge Vault</Text>
        <Text style={styles.subtitle}>Automatic Verification against 76 Canonical Works</Text>
      </View>

      {/* Input box */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Khutbah / Study Notes Ingestion</Text>
        <TextInput
          style={styles.titleInput}
          value={noteTitle}
          onChangeText={setNoteTitle}
          placeholder="Note Title"
        />
        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={4}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Paste lecture notes or transcripts..."
        />
        <TouchableOpacity style={styles.scanBtn} onPress={handleScan}>
          <Text style={styles.scanBtnText}>Verify & Extract Citations</Text>
        </TouchableOpacity>
      </View>

      {/* Results */}
      {analyzedNote && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsHeader}>Verified Ingestion Results</Text>
          
          {/* Extracted items */}
          {analyzedNote.extractedItems.map((item, i) => (
            <View key={i} style={styles.card}>
              <View style={styles.rowBetween}>
                <Text style={styles.itemType}>{item.type}</Text>
                <Text style={[styles.statusBadge, item.isVerifiedInCanonicalCorpus ? styles.statusVerified : styles.statusReview]}>
                  {item.isVerifiedInCanonicalCorpus ? 'VERIFIED CANONICAL' : 'UNVERIFIED'}
                </Text>
              </View>
              <Text style={styles.itemContent}>{item.content}</Text>
              <Text style={styles.itemSource}>Attribution: {item.sourceAttribution}</Text>
            </View>
          ))}

          {/* Spiritual Takeaways */}
          <View style={styles.takeawaysCard}>
            <Text style={styles.takeawaysTitle}>Spiritual Action Takeaways</Text>
            {analyzedNote.keySpiritualTakeaways.map((t, i) => (
              <Text key={i} style={styles.takeawayText}>• {t}</Text>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  content: { padding: 16, paddingBottom: 40 },
  header: { marginBottom: 16 },
  title: { fontSize: 22, fontWeight: '800', color: '#1B4332' },
  subtitle: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardTitle: { fontSize: 14, fontWeight: '700', color: '#1B4332', marginBottom: 8 },
  titleInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 10,
    fontSize: 13,
    marginBottom: 10,
    color: '#111827',
  },
  textArea: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 13,
    color: '#111827',
    textAlignVertical: 'top',
    minHeight: 80,
  },
  scanBtn: {
    backgroundColor: '#1B4332',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  scanBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  resultsContainer: { marginTop: 4 },
  resultsHeader: { fontSize: 14, fontWeight: '700', color: '#1B4332', marginBottom: 8 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  itemType: { fontSize: 12, fontWeight: '800', color: '#1B4332' },
  statusBadge: { fontSize: 9, fontWeight: '700', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 10 },
  statusVerified: { backgroundColor: '#E8F5E9', color: '#1B5E20' },
  statusReview: { backgroundColor: '#FEF3C7', color: '#92400E' },
  itemContent: { fontSize: 13, color: '#374151', marginBottom: 4, lineHeight: 18 },
  itemSource: { fontSize: 11, color: '#6B7280' },
  takeawaysCard: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  takeawaysTitle: { fontSize: 13, fontWeight: '700', color: '#065F46', marginBottom: 6 },
  takeawayText: { fontSize: 12, color: '#047857', marginBottom: 4, lineHeight: 18 },
});
