import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { signatureCapabilitiesEngine, CompiledAmalPlan } from '@amal/amal-engine';
import { QURAN_WISDOM_COLLECTION } from '../data/quran-wisdom-data';

export const TodayScreen: React.FC = () => {
  const [prayersChecked, setPrayersChecked] = useState<{ [key: string]: boolean }>({
    fajr: false,
    dhuhr: false,
    asr: false,
    maghrib: false,
    isha: false,
  });

  const [niyyahText, setNiyyahText] = useState('والدین کے ساتھ نرمی اور مسکراہٹ سے پیش آنا');
  const [compiledPlan, setCompiledPlan] = useState<CompiledAmalPlan | null>(null);
  const [showCompiler, setShowCompiler] = useState<boolean>(false);
  const [isAyahPlaying, setIsAyahPlaying] = useState<boolean>(false);

  // Today's featured Ayah (Surah An-Naba or Al-Fatiha)
  const todayAyah = QURAN_WISDOM_COLLECTION[0];

  const togglePrayer = (name: string) => {
    setPrayersChecked((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleCompile = () => {
    const plan = signatureCapabilitiesEngine.compileNiyyahToAmal({
      userId: 'usr_mobile_1',
      intentionText: niyyahText,
    });
    setCompiledPlan(plan);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* 1. SACRED MORNING / DAILY GREETING */}
      <View style={styles.greetingCard}>
        <Text style={styles.bismillah}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</Text>
        <Text style={styles.greetingTitle}>السلام علیکم و رحمۃ اللہ و برکاتہ</Text>
        <Text style={styles.hijriDate}>۲۶ جمادی الاولیٰ ۱۴۴۸ھ • آج کا معمول</Text>
      </View>

      {/* 2. NEXT PRAYER SERENITY PILL */}
      <View style={styles.prayerRibbon}>
        <View style={styles.prayerRibbonLeft}>
          <Text style={styles.prayerIcon}>🕌</Text>
          <View>
            <Text style={styles.prayerNextLabel}>اگلی نماز کا وقت</Text>
            <Text style={styles.prayerName}>نمازِ مغرب • 05:42 PM</Text>
          </View>
        </View>
        <View style={styles.countdownBadge}>
          <Text style={styles.countdownText}>38 منٹ باقی</Text>
        </View>
      </View>

      {/* 3. DAILY PRAYER CHECK-OFF (آج کی نمازیں) */}
      <View style={styles.card}>
        <Text style={styles.cardHeading}>پانچ وقت کی نماز (Daily Salah):</Text>
        <View style={styles.prayersRow}>
          {[
            { id: 'fajr', label: 'فجر' },
            { id: 'dhuhr', label: 'ظہر' },
            { id: 'asr', label: 'عصر' },
            { id: 'maghrib', label: 'مغرب' },
            { id: 'isha', label: 'عشاء' },
          ].map((p) => {
            const isDone = prayersChecked[p.id];
            return (
              <TouchableOpacity
                key={p.id}
                style={[styles.prayerCheckBtn, isDone && styles.prayerCheckBtnDone]}
                onPress={() => togglePrayer(p.id)}
              >
                <Text style={[styles.prayerCheckIcon, isDone && styles.prayerCheckIconDone]}>
                  {isDone ? '✓' : '○'}
                </Text>
                <Text style={[styles.prayerCheckLabel, isDone && styles.prayerCheckLabelDone]}>
                  {p.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* 4. TODAY'S QURAN WISDOM (آج کی آیت اور ترجمہ) */}
      {todayAyah && (
        <View style={styles.quranWisdomCard}>
          <View style={styles.quranCardHeader}>
            <View style={styles.quranBadge}>
              <Text style={styles.quranBadgeText}>آج کی قرآنی حکمت</Text>
            </View>
            <Text style={styles.quranSurahName}>سورۃ {todayAyah.surahNameUrdu}</Text>
          </View>

          <Text style={styles.quranArabic}>{todayAyah.textArabic}</Text>

          <View style={styles.kanzulImanBox}>
            <Text style={styles.kanzLabel}>ترجمہ کنز الایمان:</Text>
            <Text style={styles.kanzText}>{todayAyah.tarjumaKanzulIman}</Text>
          </View>

          <View style={styles.quranActions}>
            <TouchableOpacity
              style={[styles.quranPlayBtn, isAyahPlaying && styles.quranPlayBtnActive]}
              onPress={() => setIsAyahPlaying(!isAyahPlaying)}
            >
              <Text style={styles.quranPlayIcon}>{isAyahPlaying ? '⏸' : '▶'}</Text>
              <Text style={styles.quranPlayText}>
                {isAyahPlaying ? 'ترجمہ موقوف' : 'سماعت فرمائیں (تلاوت و ترجمہ)'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* 5. TODAY'S SUNNAH AMAL (آج کا مسنون عمل) */}
      <View style={styles.sunnahCard}>
        <View style={styles.sunnahHeader}>
          <Text style={styles.sunnahIcon}>✨</Text>
          <Text style={styles.sunnahTitle}>آج کا مسنون عمل (Sunnah Amal)</Text>
        </View>
        <Text style={styles.sunnahText}>
          حضور نبی کریم ﷺ نے ارشاد فرمایا: "تمہارا اپنے بھائی کے سامنے مسکرانا تمہارے لیے صدقہ ہے۔" (جامع ترمذی)
        </Text>
        <View style={styles.sunnahBadge}>
          <Text style={styles.sunnahBadgeText}>MUSTAHABB_SUNNAH • مستحب سنت</Text>
        </View>
      </View>

      {/* 6. EXPANDABLE NIYYAH COMPILER (نیت کو عمل میں بدلیں) */}
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.compilerToggleRow}
          onPress={() => setShowCompiler(!showCompiler)}
        >
          <View style={styles.compilerToggleLeft}>
            <Text style={{ fontSize: 18 }}>🎯</Text>
            <View>
              <Text style={styles.compilerToggleTitle}>دینی نیت اور ہدف (Niyyah → Amal)</Text>
              <Text style={styles.compilerToggleSub}>اپنی نیت کو عملی قدم میں تبدیل کریں</Text>
            </View>
          </View>
          <Text style={styles.compilerToggleArrow}>{showCompiler ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {showCompiler && (
          <View style={styles.compilerBody}>
            <TextInput
              style={styles.compilerInput}
              value={niyyahText}
              onChangeText={setNiyyahText}
              placeholder="اپنی نیک نیت یہاں تحریر فرمائیں..."
              placeholderTextColor="#94A3B8"
              textAlign="right"
            />
            <TouchableOpacity style={styles.compileBtn} onPress={handleCompile}>
              <Text style={styles.compileBtnText}>نیت کو عملی قدم میں تبدیل کریں (Compile)</Text>
            </TouchableOpacity>

            {compiledPlan && (
              <View style={styles.compiledResult}>
                <Text style={styles.resultHeading}>عملی قدم (Concrete Sunnah Action):</Text>
                <Text style={styles.resultAction}>{compiledPlan.microAmal.concreteAction}</Text>
                <Text style={styles.resultEvidence}>
                  مستند حوالہ: {compiledPlan.evidenceGrounding.hadithCitation}
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    </ScrollView>
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
  greetingCard: {
    backgroundColor: '#0F291E',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 14,
  },
  bismillah: {
    fontSize: 16,
    color: '#86EFAC',
    fontWeight: '700',
    marginBottom: 6,
  },
  greetingTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  hijriDate: {
    fontSize: 12,
    color: '#D1FAE5',
  },
  prayerRibbon: {
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  prayerRibbonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  prayerIcon: {
    fontSize: 24,
  },
  prayerNextLabel: {
    fontSize: 10,
    color: '#065F46',
    fontWeight: '700',
  },
  prayerName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#064E3B',
  },
  countdownBadge: {
    backgroundColor: '#065F46',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  countdownText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  cardHeading: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
  },
  prayersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
  },
  prayerCheckBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  prayerCheckBtnDone: {
    backgroundColor: '#DCFCE7',
    borderColor: '#86EFAC',
  },
  prayerCheckIcon: {
    fontSize: 16,
    color: '#94A3B8',
    marginBottom: 2,
    fontWeight: '700',
  },
  prayerCheckIconDone: {
    color: '#166534',
  },
  prayerCheckLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  prayerCheckLabelDone: {
    color: '#166534',
  },
  quranWisdomCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#BBF7D0',
    marginBottom: 14,
  },
  quranCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  quranBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  quranBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#166534',
  },
  quranSurahName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#065F46',
  },
  quranArabic: {
    fontSize: 20,
    lineHeight: 34,
    color: '#0F172A',
    textAlign: 'right',
    marginBottom: 10,
    fontWeight: '600',
  },
  kanzulImanBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 10,
    borderRightWidth: 3,
    borderRightColor: '#059669',
    marginBottom: 12,
  },
  kanzLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#065F46',
    textAlign: 'right',
    marginBottom: 2,
  },
  kanzText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#1E293B',
    textAlign: 'right',
  },
  quranActions: {
    flexDirection: 'row',
  },
  quranPlayBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#065F46',
    paddingVertical: 10,
    borderRadius: 8,
  },
  quranPlayBtnActive: {
    backgroundColor: '#92400E',
  },
  quranPlayIcon: {
    fontSize: 13,
    color: '#FFFFFF',
  },
  quranPlayText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  sunnahCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FDE68A',
    marginBottom: 14,
  },
  sunnahHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  sunnahIcon: {
    fontSize: 16,
  },
  sunnahTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#92400E',
  },
  sunnahText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#78350F',
    marginBottom: 8,
    textAlign: 'right',
  },
  sunnahBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(146, 64, 14, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  sunnahBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#92400E',
  },
  compilerToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  compilerToggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  compilerToggleTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  compilerToggleSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  compilerToggleArrow: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '700',
  },
  compilerBody: {
    marginTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 14,
  },
  compilerInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    padding: 10,
    fontSize: 13,
    color: '#0F172A',
    marginBottom: 10,
  },
  compileBtn: {
    backgroundColor: '#065F46',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  compileBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  compiledResult: {
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  resultHeading: {
    fontSize: 11,
    fontWeight: '800',
    color: '#166534',
    marginBottom: 4,
    textAlign: 'right',
  },
  resultAction: {
    fontSize: 13,
    color: '#1E293B',
    lineHeight: 18,
    textAlign: 'right',
    marginBottom: 6,
  },
  resultEvidence: {
    fontSize: 10,
    color: '#059669',
    textAlign: 'right',
  },
});
