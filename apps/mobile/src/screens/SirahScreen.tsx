import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { AmalTheme } from '@amal/ui';

interface ChronologyItem {
  year: string;
  period: string;
  event: string;
  location: string;
  significance: string;
}

interface ShamailItem {
  id: string;
  category: string;
  arabic: string;
  english: string;
  urdu: string;
  source: string;
  grading: string;
}

const CHRONOLOGY_EVENTS: ChronologyItem[] = [
  {
    year: '570 CE / Year of the Elephant',
    period: 'Early Life',
    event: 'Birth of the Prophet Muhammad ﷺ in Makkah',
    location: 'Makkah al-Mukarramah',
    significance: 'Born as an orphan under the care of Aminah and grandfather Abd al-Muttalib.',
  },
  {
    year: '610 CE / 40th Year',
    period: 'First Revelation',
    event: 'Descent of Revelation in Cave Hira (Iqra\')',
    location: 'Jabal al-Nur, Makkah',
    significance: 'Beginning of Prophethood through Angel Jibril (AS) with Surah al-Alaq.',
  },
  {
    year: '620 CE / Year of Sorrow',
    period: 'Isra & Mi\'raj',
    event: 'The Night Journey and Heavenly Ascension',
    location: 'Makkah to Jerusalem to the Heavens',
    significance: 'Gift of the Five Daily Prayers ordained directly by Allah subhanahu wa ta\'ala.',
  },
  {
    year: '622 CE / 1 AH',
    period: 'The Hijrah',
    event: 'Migration from Makkah to Madinah Munawwarah',
    location: 'Madinah (Yathrib)',
    significance: 'Establishment of the first Islamic community, brotherhood (Mu\'akhah), and the Islamic calendar.',
  },
  {
    year: '624 CE / 2 AH',
    period: 'Defense & Victory',
    event: 'The Battle of Badr',
    location: 'Badr Wells',
    significance: 'Decisive victory of truth over oppression, cementing the foundation of the Ummah.',
  },
  {
    year: '630 CE / 8 AH',
    period: 'Conquest of Makkah',
    event: 'Peaceful Opening of Makkah (Fath Makkah)',
    location: 'Ka\'bah, Makkah',
    significance: 'Purification of the Ka\'bah from idols and universal pardon: "Go, for you are free."',
  },
  {
    year: '632 CE / 10 AH',
    period: 'Farewell Pilgrimage',
    event: 'Hajjat al-Wada\' and Final Sermon at Arafat',
    location: 'Mount Arafat',
    significance: 'Universal human rights declaration: "No Arab has superiority over a non-Arab except by piety."',
  },
];

const SHAMAIL_REPORTS: ShamailItem[] = [
  {
    id: 'SHM-001',
    category: 'MERCY & COMPASSION',
    arabic: 'مَا ضَرَبَ رَسُولُ اللَّهِ صلى الله عليه وسلم شَيْئًا قَطُّ بِيَدِهِ، وَلاَ امْرَأَةً، وَلاَ خَادِمًا، إِلاَّ أَنْ يُجَاهِدَ فِي سَبِيلِ اللَّهِ.',
    english: 'The Messenger of Allah ﷺ never struck anyone with his hand, neither a woman nor a servant, except when striving in the cause of Allah.',
    urdu: 'رسول اللہ ﷺ نے اپنے دستِ مبارک سے کبھی کسی کو نہیں مارا، نہ کسی عورت کو اور نہ کسی خادم کو، سوائے اللہ کے راستے میں جہاد کے۔',
    source: 'Sahih Muslim #2328; Shama\'il al-Tirmidhi',
    grading: 'SAHIH',
  },
  {
    id: 'SHM-002',
    category: 'SPEECH & ELOQUENCE',
    arabic: 'مَا كَانَ رَسُولُ اللَّهِ صلى الله عليه وسلم يَسْرُدُ سَرْدَكُمْ هَذَا، وَلَكِنَّهُ كَانَ يَتَكَلَّمُ بِكَلامٍ بَيِّنٍ فَصْلٍ يَحْفَظُهُ مَنْ جَلَسَ إِلَيْهِ.',
    english: 'The Messenger of Allah ﷺ did not speak rapidly and continuously; rather, his speech was clear and distinct, such that anyone who sat with him could easily memorize it.',
    urdu: 'رسول اللہ ﷺ جلدی جلدی گفتگو نہیں فرماتے تھے، بلکہ آپ کا کلام واضح اور جدا جدا ہوتا تھا جسے سننے والا باآسانی یاد رکھ سکتا تھا۔',
    source: 'Shama\'il al-Tirmidhi #221; Sunan Abi Dawud #4839',
    grading: 'SAHIH',
  },
  {
    id: 'SHM-003',
    category: 'HUMILITY & SIMPLICITY',
    arabic: 'كَانَ رَسُولُ اللَّهِ صلى الله عليه وسلم يَخْصِفُ نَعْلَهُ، وَيَرْقَعُ ثَوْبَهُ، وَيَعْمَلُ فِي بَيْتِهِ كَمَا يَعْمَلُ أَحَدُكُمْ فِي بَيْتِهِ.',
    english: 'The Messenger of Allah ﷺ used to mend his own shoes, patch his own garment, and work in his house just as one of you works in his house.',
    urdu: 'رسول اللہ ﷺ خود اپنا جوتا گانٹھتے تھے، اپنے کپڑے میں پیوند لگاتے تھے، اور اپنے گھر کے کام کاج میں ہاتھ بٹاتے تھے۔',
    source: 'Musnad Ahmad #24903; Shama\'il al-Tirmidhi',
    grading: 'SAHIH',
  },
];

export const SirahScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'TIMELINE' | 'SHAMAIL'>('TIMELINE');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerSubtitle}>PROPHETIC LIFE GRAPH · السيرة النبوية</Text>
        <Text style={styles.headerTitle}>Sirah & Shama'il</Text>
        <Text style={styles.headerDesc}>
          Chronologically ordered and verified traits of the Beloved Prophet ﷺ.
        </Text>
      </View>

      {/* Segment Control */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'TIMELINE' && styles.tabBtnActive]}
          onPress={() => setActiveTab('TIMELINE')}
        >
          <Text style={[styles.tabBtnText, activeTab === 'TIMELINE' && styles.tabBtnTextActive]}>
            Prophetic Timeline
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'SHAMAIL' && styles.tabBtnActive]}
          onPress={() => setActiveTab('SHAMAIL')}
        >
          <Text style={[styles.tabBtnText, activeTab === 'SHAMAIL' && styles.tabBtnTextActive]}>
            Shama'il Traits
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {activeTab === 'TIMELINE' ? (
          <View>
            {CHRONOLOGY_EVENTS.map((ev, idx) => (
              <View key={idx} style={styles.timelineCard}>
                <View style={styles.yearRow}>
                  <Text style={styles.yearText}>{ev.year}</Text>
                  <Text style={styles.periodText}>{ev.period}</Text>
                </View>
                <Text style={styles.eventTitle}>{ev.event}</Text>
                <Text style={styles.locationText}>📍 {ev.location}</Text>
                <Text style={styles.significanceText}>{ev.significance}</Text>
              </View>
            ))}
          </View>
        ) : (
          <View>
            {SHAMAIL_REPORTS.map((sh) => (
              <View key={sh.id} style={styles.shamailCard}>
                <View style={styles.categoryRow}>
                  <Text style={styles.categoryBadge}>{sh.category}</Text>
                  <Text style={styles.gradingBadge}>{sh.grading}</Text>
                </View>
                <Text style={styles.arabicMatn}>{sh.arabic}</Text>
                <Text style={styles.translationText}>{sh.english}</Text>
                <Text style={styles.urduText}>{sh.urdu}</Text>
                <Text style={styles.sourceText}>Reference: {sh.source}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
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
  tabBar: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 12,
    backgroundColor: '#EAE6DF',
    borderRadius: 10,
    padding: 3,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabBtnActive: {
    backgroundColor: '#FFFFFF',
    elevation: 1,
  },
  tabBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555',
  },
  tabBtnTextActive: {
    color: '#0F4C3A',
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  timelineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EAE6DF',
  },
  yearRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  yearText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F4C3A',
  },
  periodText: {
    fontSize: 11,
    color: '#888',
    fontWeight: '600',
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#181E1C',
    marginVertical: 4,
  },
  locationText: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 6,
  },
  significanceText: {
    fontSize: 12,
    color: '#334155',
    lineHeight: 18,
  },
  shamailCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EAE6DF',
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  categoryBadge: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0F4C3A',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  gradingBadge: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2E7D32',
  },
  arabicMatn: {
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'right',
    color: '#0F4C3A',
    lineHeight: 26,
    marginBottom: 8,
  },
  translationText: {
    fontSize: 13,
    color: '#1E293B',
    lineHeight: 19,
    marginBottom: 6,
  },
  urduText: {
    fontSize: 13,
    color: '#475569',
    textAlign: 'right',
    lineHeight: 20,
    marginBottom: 8,
  },
  sourceText: {
    fontSize: 11,
    color: '#94A3B8',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 6,
  },
});
