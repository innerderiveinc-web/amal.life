import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export const TasbihScreen: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [target, setTarget] = useState<number>(33);
  const [selectedZikrIndex, setSelectedZikrIndex] = useState<number>(0);

  const azkar = [
    { arabic: 'سُبْحَانَ اللَّهِ', urdu: 'اللہ ہر عیب سے پاک ہے', transliteration: 'Subhan Allah', target: 33 },
    { arabic: 'الْحَمْدُ لِلَّهِ', urdu: 'تمام تعریفیں اللہ کے لیے ہیں', transliteration: 'Alhamdulillah', target: 33 },
    { arabic: 'اللَّهُ أَكْبَرُ', urdu: 'اللہ سب سے بڑا ہے', transliteration: 'Allahu Akbar', target: 34 },
    { arabic: 'أَسْتَغْفِرُ اللَّهَ', urdu: 'میں اللہ سے بخشش مانگتا ہوں', transliteration: 'Astaghfirullah', target: 100 },
    { arabic: 'صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ', urdu: 'درود شریف بر رسولِ کریم ﷺ', transliteration: 'Salawat / Durood', target: 100 },
    { arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ', urdu: 'اللہ کے سوا کوئی معبود نہیں', transliteration: 'Kalima Tayyiba', target: 100 },
  ];

  const currentZikr = azkar[selectedZikrIndex] || azkar[0];

  const handleTap = () => {
    setCount((prev) => {
      const next = prev + 1;
      return next;
    });
  };

  const handleReset = () => {
    setCount(0);
  };

  const handleSelectZikr = (index: number) => {
    setSelectedZikrIndex(index);
    setTarget(azkar[index]?.target || 33);
    setCount(0);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>مسنون تسبیح و اذکار</Text>
          <Text style={styles.subtitle}>روزمرہ کے مستند اذکار اور استغفار</Text>
        </View>

        {/* Selected Zikr Card */}
        <View style={styles.zikrCard}>
          <Text style={styles.arabicZikr}>{currentZikr.arabic}</Text>
          <Text style={styles.urduZikr}>{currentZikr.urdu}</Text>
          <Text style={styles.translitZikr}>{currentZikr.transliteration}</Text>
        </View>

        {/* Big Tap Area Counter */}
        <TouchableOpacity activeOpacity={0.7} style={styles.counterCircle} onPress={handleTap}>
          <Text style={styles.countNumber}>{count}</Text>
          <Text style={styles.targetLabel}>ہدف: {target}</Text>
          <Text style={styles.tapInstruction}>انگلی سے چھوئیں (Tap)</Text>
        </TouchableOpacity>

        {/* Action Controls */}
        <View style={styles.controlsRow}>
          <TouchableOpacity style={styles.controlBtn} onPress={handleReset}>
            <Text style={styles.controlBtnText}>🔄 شمار صفر کریں (Reset)</Text>
          </TouchableOpacity>
        </View>

        {/* Azkar Selection Chips */}
        <Text style={styles.sectionHeading}>مسنون اذکار منتخب فرمائیں:</Text>
        <View style={styles.azkarList}>
          {azkar.map((z, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.zikrItem, selectedZikrIndex === idx && styles.zikrItemActive]}
              onPress={() => handleSelectZikr(idx)}
            >
              <View style={styles.zikrItemTextWrap}>
                <Text style={[styles.zikrItemArabic, selectedZikrIndex === idx && styles.zikrItemArabicActive]}>
                  {z.arabic}
                </Text>
                <Text style={styles.zikrItemUrdu}>{z.urdu}</Text>
              </View>
              <View style={styles.zikrTargetBadge}>
                <Text style={styles.zikrTargetText}>{z.target}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
    alignItems: 'center',
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#064E3B',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
  },
  zikrCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
  },
  arabicZikr: {
    fontSize: 26,
    color: '#0F172A',
    fontWeight: '700',
    marginBottom: 8,
  },
  urduZikr: {
    fontSize: 14,
    color: '#065F46',
    fontWeight: '600',
    marginBottom: 4,
  },
  translitZikr: {
    fontSize: 12,
    color: '#64748B',
  },
  counterCircle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#065F46',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#065F46',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 20,
  },
  countNumber: {
    fontSize: 64,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  targetLabel: {
    fontSize: 13,
    color: '#A7F3D0',
    fontWeight: '700',
    marginTop: 2,
  },
  tapInstruction: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 6,
  },
  controlsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  controlBtn: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  controlBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  sectionHeading: {
    alignSelf: 'flex-start',
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 10,
  },
  azkarList: {
    width: '100%',
    gap: 8,
  },
  zikrItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  zikrItemActive: {
    borderColor: '#059669',
    backgroundColor: '#ECFDF5',
  },
  zikrItemTextWrap: {
    flex: 1,
  },
  zikrItemArabic: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 2,
  },
  zikrItemArabicActive: {
    color: '#065F46',
  },
  zikrItemUrdu: {
    fontSize: 11,
    color: '#64748B',
  },
  zikrTargetBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  zikrTargetText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },
});
