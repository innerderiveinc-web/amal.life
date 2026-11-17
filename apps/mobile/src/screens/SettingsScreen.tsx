import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';

export const SettingsScreen: React.FC = () => {
  const [madhhab, setMadhhab] = useState<'HANAFI' | 'SHAFI_I'>('HANAFI');
  const [calcMethod, setCalcMethod] = useState<'KARACHI' | 'MAKKAH' | 'MWL' | 'EGYPT'>('KARACHI');
  const [tahajjudMode, setTahajjudMode] = useState<boolean>(false);
  const [highContrast, setHighContrast] = useState<boolean>(false);

  const handleExportData = () => {
    Alert.alert(
      'Sovereign Data Export',
      'آپ کا تمام ڈیٹا (نماز کی تاریخ، اذکار، اور بُک مارکس) محفوظ ہے اور آپ کے فون میں اسٹور ہے۔'
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>⚙️ نظام ترتیبات</Text>
        </View>
        <Text style={styles.title}>System Settings & Sovereignty</Text>
        <Text style={styles.subtitle}>فقہی مسلک، اوقاتِ نماز اور پرائیویسی ترتیبات</Text>
      </View>

      {/* 1. JURISPRUDENCE & MADHHAB */}
      <View style={styles.card}>
        <Text style={styles.cardHeading}>فقہی مسلک (Jurisprudence Madhhab):</Text>
        <Text style={styles.cardSub}>نمازِ عصر اور فقہی احکام کے انتخاب کے لیے:</Text>

        <View style={styles.optionRow}>
          <TouchableOpacity
            style={[styles.optionBtn, madhhab === 'HANAFI' && styles.optionBtnActive]}
            onPress={() => setMadhhab('HANAFI')}
          >
            <Text style={[styles.optionBtnText, madhhab === 'HANAFI' && styles.optionBtnTextActive]}>
              حنفی (مثلین - Hanafi)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionBtn, madhhab === 'SHAFI_I' && styles.optionBtnActive]}
            onPress={() => setMadhhab('SHAFI_I')}
          >
            <Text style={[styles.optionBtnText, madhhab === 'SHAFI_I' && styles.optionBtnTextActive]}>
              شافعی / جمہور (مثلِ اول)
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. CALCULATION METHOD */}
      <View style={styles.card}>
        <Text style={styles.cardHeading}>حسابِ اوقات (Calculation Method):</Text>
        {[
          { id: 'KARACHI', name: 'جامعہ العلوم الاسلامیہ بنوری ٹاؤن، کراچی (Subcontinent Standard)' },
          { id: 'MAKKAH', name: 'ام القریٰ یونیورسٹی، مکہ مکرمہ (Umm al-Qura, Makkah)' },
          { id: 'MWL', name: 'رابطہ عالم اسلامی (Muslim World League)' },
          { id: 'EGYPT', name: 'ہیئۃ المساحۃ المصریہ (Egyptian General Authority)' },
        ].map((m) => (
          <TouchableOpacity
            key={m.id}
            style={[styles.methodRow, calcMethod === m.id && styles.methodRowActive]}
            onPress={() => setCalcMethod(m.id as any)}
          >
            <Text style={[styles.radioIcon, calcMethod === m.id && styles.radioIconActive]}>
              {calcMethod === m.id ? '◉' : '○'}
            </Text>
            <Text style={[styles.methodName, calcMethod === m.id && styles.methodNameActive]}>
              {m.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 3. SACRED THEMES & NIGHT MODE */}
      <View style={styles.card}>
        <Text style={styles.cardHeading}>تہجد و بصری سکینہ (Visual Aesthetics):</Text>

        <View style={styles.switchRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.switchTitle}>🌙 تہجد موڈ (Kiswah Tahajjud Dark)</Text>
            <Text style={styles.switchDesc}>رات کے نوافل اور سکون کے لیے گہرا اندھیرا تھیم</Text>
          </View>
          <Switch
            value={tahajjudMode}
            onValueChange={setTahajjudMode}
            trackColor={{ false: '#CBD5E1', true: '#059669' }}
          />
        </View>

        <View style={[styles.switchRow, { borderBottomWidth: 0 }]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.switchTitle}>👁️ ہائی کنٹراسٹ موڈ (High Contrast)</Text>
            <Text style={styles.switchDesc}>ضعیف نگاہ افراد کے لیے نمایاں الفاظ اور فونٹس</Text>
          </View>
          <Switch
            value={highContrast}
            onValueChange={setHighContrast}
            trackColor={{ false: '#CBD5E1', true: '#059669' }}
          />
        </View>
      </View>

      {/* 4. PRIVACY & SOVEREIGNTY GUARANTEE */}
      <View style={styles.card}>
        <Text style={styles.cardHeading}>🛡️ مکمل خودمختاری و رازداری (Zero Tracking):</Text>
        <Text style={styles.privacyStatement}>
          AMAL OS آپ کے کسی ذاتی ڈیٹا، دعا، نماز کے اوقات یا موبائل لوکیشن کو نہ کسی بیرونی سرور پر بھیجتا ہے، نہ اشتہارات دکھاتا ہے، اور نہ کوئی تجزیاتی ٹریکر رکھتا ہے۔ تمام حساب کتاب 100% آف لائن آپ کے فون میں سرانجام پاتا ہے۔
        </Text>

        <TouchableOpacity style={styles.exportBtn} onPress={handleExportData}>
          <Text style={styles.exportBtnText}>📦 ڈیٹا مینیجر و تصدیق (Storage Health)</Text>
        </TouchableOpacity>
      </View>

      {/* 5. APP CREDITS & WAQF */}
      <View style={styles.footerNote}>
        <Text style={styles.footerText}>AMAL OS • Version 1.0.0 (Native Core)</Text>
        <Text style={styles.footerSub}>فی سبیل اللہ وقف برائے امتِ مسلمہ • مسلکِ حق اہل سنت و جماعت</Text>
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
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  cardHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: '#064E3B',
    textAlign: 'right',
    marginBottom: 4,
  },
  cardSub: {
    fontSize: 11,
    color: '#64748B',
    textAlign: 'right',
    marginBottom: 12,
  },
  optionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  optionBtn: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  optionBtnActive: {
    backgroundColor: '#ECFDF5',
    borderColor: '#059669',
  },
  optionBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  optionBtnTextActive: {
    color: '#065F46',
    fontWeight: '800',
  },
  methodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    gap: 8,
  },
  methodRowActive: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 6,
    borderRadius: 6,
  },
  radioIcon: {
    fontSize: 14,
    color: '#94A3B8',
  },
  radioIconActive: {
    color: '#059669',
  },
  methodName: {
    fontSize: 12,
    color: '#334155',
    flex: 1,
    textAlign: 'right',
  },
  methodNameActive: {
    fontWeight: '700',
    color: '#064E3B',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  switchTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
    textAlign: 'right',
  },
  switchDesc: {
    fontSize: 11,
    color: '#64748B',
    textAlign: 'right',
  },
  privacyStatement: {
    fontSize: 11,
    color: '#475569',
    lineHeight: 18,
    textAlign: 'right',
    marginBottom: 12,
  },
  exportBtn: {
    backgroundColor: '#064E3B',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  exportBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  footerNote: {
    alignItems: 'center',
    marginTop: 8,
  },
  footerText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  footerSub: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 2,
  },
});
