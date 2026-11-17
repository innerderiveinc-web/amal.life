import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { signatureCapabilitiesEngine, CompiledAmalPlan } from '@amal/amal-engine';

export const DecisionRoomScreen: React.FC = () => {
  const [niyyahInput, setNiyyahInput] = useState('');
  const [compiledPlan, setCompiledPlan] = useState<CompiledAmalPlan | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [propheticResult, setPropheticResult] = useState<any>(null);

  const handleCompile = () => {
    if (!niyyahInput.trim()) return;
    const plan = signatureCapabilitiesEngine.compileNiyyahToAmal({
      userId: 'usr_mobile_decision_1',
      intentionText: niyyahInput,
    });
    setCompiledPlan(plan);
  };

  const handlePropheticSearch = () => {
    if (!searchQuery.trim()) return;
    const res = signatureCapabilitiesEngine.getPropheticContext(searchQuery);
    setPropheticResult(res);
  };

  const sampleNiyyahs = [
    'والدین کے ساتھ نرمی اور مسکراہٹ سے پیش آنا',
    'کاروبار میں صدق و دیانت داری اختیار کرنا',
    'غصے پر قابو پا کر معاف کرنا',
    'تہجد اور صبح کے اذکار کا التزام کرنا',
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>⚖️ شرعی فیصلہ روم و نبوی حکمت</Text>
        </View>
        <Text style={styles.title}>Decision Room & Istikharah</Text>
        <Text style={styles.subtitle}>
          نیت کو شرعی عمل میں تبدیل کریں اور نبوی اسوہ سے رہنمائی حاصل فرمائیں
        </Text>
      </View>

      {/* 1. NIYYAH TO AMAL COMPILER */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🎯 نیت سے عمل تک (Niyyah Compiler):</Text>
        <Text style={styles.cardDesc}>
          اپنی دلی نیت درج فرمائیں، نظام اسے مستند فقہی اصولوں کے تحت قابلِ عمل مسنون قدم میں تبدیل کرے گا:
        </Text>

        <TextInput
          style={styles.input}
          placeholder="مثلاً: والدین کے ساتھ نرمی سے بات کرنا..."
          placeholderTextColor="#94A3B8"
          value={niyyahInput}
          onChangeText={setNiyyahInput}
          textAlign="right"
        />

        {/* Sample Niyyah Pills */}
        <View style={styles.pillsRow}>
          {sampleNiyyahs.map((s, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.pill}
              onPress={() => setNiyyahInput(s)}
            >
              <Text style={styles.pillText}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.compileBtn} onPress={handleCompile}>
          <Text style={styles.compileBtnText}>نیت کو عمل میں بدلیں ➔</Text>
        </TouchableOpacity>

        {compiledPlan && (
          <View style={styles.resultBox}>
            <View style={styles.resultHeader}>
              <Text style={styles.resultBadge}>{compiledPlan.spiritualDomain}</Text>
              <Text style={styles.resultTitle}>تجویز کردہ مسنون عمل:</Text>
            </View>
            <Text style={styles.actionText}>{compiledPlan.microAmal.concreteAction}</Text>
            <Text style={styles.durationText}>
              ⏱️ دورانیہ: {compiledPlan.microAmal.durationMinutes} منٹ • آسانی: {compiledPlan.microAmal.frictionFailsafe}
            </Text>
            <View style={styles.evidenceBox}>
              <Text style={styles.evidenceTitle}>شرعی بنیاد / ثبوت:</Text>
              <Text style={styles.evidenceText}>
                {compiledPlan.evidenceGrounding.scholarlyRule || compiledPlan.evidenceGrounding.hadithCitation}
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* 2. PROPHETIC CONTEXT ENGINE */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🌿 نبوی حکمت انجن (Prophetic Context):</Text>
        <Text style={styles.cardDesc}>
          اپنی مشکل، پریشانی یا استخارہ کا موضوع لکھیں، نبوی سنت سے حل حاصل کریں:
        </Text>

        <TextInput
          style={styles.input}
          placeholder="مثلاً: ملازمت کا تناؤ، گھریلو تنگی، غصہ..."
          placeholderTextColor="#94A3B8"
          value={searchQuery}
          onChangeText={setSearchQuery}
          textAlign="right"
        />

        <TouchableOpacity style={styles.searchBtn} onPress={handlePropheticSearch}>
          <Text style={styles.searchBtnText}>نبوی رہنمائی تلاش فرمائیں 🔍</Text>
        </TouchableOpacity>

        {propheticResult && (
          <View style={styles.resultBox}>
            <Text style={styles.resultTitle}>اسوۂ رسول ﷺ سے رہنمائی:</Text>
            <Text style={styles.hadithArabic}>{propheticResult.primaryHadithArabic}</Text>
            <Text style={styles.hadithUrdu}>{propheticResult.primaryHadithUrdu}</Text>
            <Text style={styles.sourceText}>حوالہ: {propheticResult.source}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFBF7',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    backgroundColor: '#064E3B',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 16,
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
    lineHeight: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#064E3B',
    textAlign: 'right',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 11,
    color: '#64748B',
    textAlign: 'right',
    marginBottom: 12,
    lineHeight: 16,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 13,
    color: '#0F172A',
    marginBottom: 10,
  },
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  pill: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  pillText: {
    fontSize: 10,
    color: '#065F46',
    fontWeight: '600',
  },
  compileBtn: {
    backgroundColor: '#065F46',
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: 'center',
  },
  compileBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  searchBtn: {
    backgroundColor: '#0284C7',
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: 'center',
  },
  searchBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  resultBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 12,
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  resultBadge: {
    backgroundColor: '#ECFDF5',
    color: '#065F46',
    fontSize: 10,
    fontWeight: '700',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  resultTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#064E3B',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'right',
    marginBottom: 6,
  },
  durationText: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 10,
  },
  evidenceBox: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  evidenceTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#065F46',
    marginBottom: 2,
  },
  evidenceText: {
    fontSize: 11,
    color: '#475569',
    lineHeight: 16,
  },
  hadithArabic: {
    fontSize: 15,
    fontWeight: '700',
    color: '#064E3B',
    textAlign: 'right',
    lineHeight: 24,
    marginVertical: 8,
  },
  hadithUrdu: {
    fontSize: 12,
    color: '#334155',
    lineHeight: 18,
    textAlign: 'right',
    marginBottom: 6,
  },
  sourceText: {
    fontSize: 10,
    color: '#94A3B8',
    textAlign: 'left',
  },
});
