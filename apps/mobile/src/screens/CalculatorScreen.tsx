import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { zakatInheritanceEngine, ZakatInput, InheritanceInput } from '@amal/amal-engine';

export const CalculatorScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ZAKAT' | 'MIRAS'>('ZAKAT');

  // Zakat State
  const [selectedMadhhab, setSelectedMadhhab] = useState<'HANAFI' | 'SHAFI_I' | 'MALIKI' | 'HANBALI'>('HANAFI');
  const [cash, setCash] = useState('250000');
  const [goldGrams, setGoldGrams] = useState('25');
  const [debts, setDebts] = useState('30000');

  const zakatResult = useMemo(() => {
    const input: ZakatInput = {
      currency: 'INR',
      goldPricePerGram: 7200,
      silverPricePerGram: 90,
      nisabStandard: 'SILVER',
      madhhab: selectedMadhhab,
      cashInHandAndBanks: Number(cash) || 0,
      goldValueOrWeightGrams: { grams: Number(goldGrams) || 0 },
      isPersonalWornJewelry: true,
      businessMerchandiseWholesale: 0,
      tradeReceivablesAndLoansGiven: 0,
      sharesAndInvestments: 0,
      immediateDebtsDue: Number(debts) || 0,
      pendingEssentialBills: 0,
    };
    return zakatInheritanceEngine.calculateZakat(input);
  }, [cash, goldGrams, debts, selectedMadhhab]);

  // Miras State
  const [estate, setEstate] = useState('10000000');
  const [sons, setSons] = useState('2');
  const [daughters, setDaughters] = useState('2');

  const mirasResult = useMemo(() => {
    const input: InheritanceInput = {
      estateValue: Number(estate) || 0,
      currency: 'INR',
      deceasedGender: 'MALE',
      heirs: {
        wivesCount: 1,
        sonsCount: Number(sons) || 0,
        daughtersCount: Number(daughters) || 0,
        father: true,
        mother: true,
      },
    };
    return zakatInheritanceEngine.calculateInheritance(input);
  }, [estate, sons, daughters]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Islamic Financial Jurisprudence</Text>
      <Text style={styles.subtitle}>Classical Shariah-Compliant Calculations</Text>

      {/* Tabs */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'ZAKAT' && styles.tabBtnActive]}
          onPress={() => setActiveTab('ZAKAT')}
        >
          <Text style={[styles.tabText, activeTab === 'ZAKAT' && styles.tabTextActive]}>
            Zakat Calculator
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'MIRAS' && styles.tabBtnActive]}
          onPress={() => setActiveTab('MIRAS')}
        >
          <Text style={[styles.tabText, activeTab === 'MIRAS' && styles.tabTextActive]}>
            Miras (Inheritance)
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'ZAKAT' ? (
        <View>
          {/* Madhhab Selector Chips */}
          <Text style={[styles.inputLabel, { marginBottom: 6 }]}>SELECT FIQH SCHOOL (MADHHAB):</Text>
          <View style={{ flexDirection: 'row', gap: 6, marginBottom: 12 }}>
            {(['HANAFI', 'SHAFI_I', 'MALIKI', 'HANBALI'] as const).map((m) => {
              const label = m === 'HANAFI' ? 'Hanafi' : m === 'SHAFI_I' ? "Shafi'i" : m === 'MALIKI' ? 'Maliki' : 'Hanbali';
              const isSelected = selectedMadhhab === m;
              return (
                <TouchableOpacity
                  key={m}
                  style={[
                    styles.tabBtn,
                    { paddingVertical: 6, backgroundColor: isSelected ? '#1B4332' : '#E5E7EB' },
                  ]}
                  onPress={() => setSelectedMadhhab(m)}
                >
                  <Text style={[styles.tabText, { color: isSelected ? '#FFFFFF' : '#374151', fontSize: 12 }]}>
                    {label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Result Card */}
          <View style={[styles.card, zakatResult.isEligibleForZakat ? styles.eligibleCard : styles.ineligibleCard]}>
            <Text style={styles.cardHeader}>
              {zakatResult.isEligibleForZakat ? 'ZAKAT OBLIGATION (WAJIB)' : 'BELOW NISAB THRESHOLD'}
            </Text>
            <Text style={styles.resultAmount}>
              ₹ {zakatResult.zakatDue.toLocaleString('en-IN')}
            </Text>
            <Text style={styles.resultSub}>2.5% of net wealth (₹ {zakatResult.netZakatablePool.toLocaleString('en-IN')})</Text>

            {/* Juristic Madhhab Notes */}
            {zakatResult.madhhabNotes && zakatResult.madhhabNotes.length > 0 && (
              <View style={{ marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#BBF7D0' }}>
                <Text style={{ fontSize: 10, fontWeight: '700', color: '#166534', marginBottom: 2 }}>
                  ⚖️ Juristic Note ({selectedMadhhab === 'HANAFI' ? 'Hanafi' : selectedMadhhab === 'SHAFI_I' ? "Shafi'i" : selectedMadhhab === 'MALIKI' ? 'Maliki' : 'Hanbali'}):
                </Text>
                <Text style={{ fontSize: 10, color: '#14532D', lineHeight: 14 }}>
                  {zakatResult.madhhabNotes[0]}
                </Text>
              </View>
            )}
          </View>

          {/* Form */}
          <View style={styles.card}>
            <Text style={styles.inputLabel}>Cash in Hand & Bank (₹ INR)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={cash}
              onChangeText={setCash}
            />

            <Text style={styles.inputLabel}>Gold Weight (Grams)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={goldGrams}
              onChangeText={setGoldGrams}
            />

            <Text style={styles.inputLabel}>Short-Term Debts Due (₹ INR)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={debts}
              onChangeText={setDebts}
            />
          </View>
        </View>
      ) : (
        <View>
          {/* Miras Breakdown */}
          <View style={styles.card}>
            <Text style={styles.inputLabel}>Total Net Estate (₹ INR)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={estate}
              onChangeText={setEstate}
            />

            <View style={{ flexDirection: 'row', gap: 10 }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.inputLabel}>Sons Count</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={sons}
                  onChangeText={setSons}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.inputLabel}>Daughters Count</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={daughters}
                  onChangeText={setDaughters}
                />
              </View>
            </View>
          </View>

          <Text style={[styles.sectionTitle, { marginTop: 12 }]}>Quranic Fixed Shares (Zawil-Furood)</Text>
          {mirasResult.heirsShares.map((h, i) => (
            <View key={i} style={styles.shareCard}>
              <View>
                <Text style={styles.heirName}>{h.heirName}</Text>
                <Text style={styles.heirFraction}>{h.quranicFraction} ({h.percentage}%)</Text>
              </View>
              <Text style={styles.heirAmount}>₹ {h.totalAmount.toLocaleString('en-IN')}</Text>
            </View>
          ))}

          {/* Mufti Advisory Note */}
          <View style={[styles.card, { marginTop: 12, backgroundColor: '#F0FDF4', borderColor: '#BBF7D0' }]}>
            <Text style={{ fontSize: 12, fontWeight: '700', color: '#166534', marginBottom: 4 }}>
              📜 Dar-ul-Ifta Verification Advisory
            </Text>
            <Text style={{ fontSize: 11, color: '#15803D', lineHeight: 16 }}>
              Inheritance mathematics are calculated per classical Hanafi jurisprudence. In real-world distribution, please obtain formal validation from your local Dar-ul-Ifta / authenticated Islamic scholar to account for registered wills, debt settlements, and funerary expenses.
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  content: { padding: 16, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: '800', color: '#1B4332' },
  subtitle: { fontSize: 13, color: '#6B7280', marginTop: 2, marginBottom: 16 },
  tabRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  tabBtn: { flex: 1, paddingVertical: 10, borderRadius: 8, backgroundColor: '#E5E7EB', alignItems: 'center' },
  tabBtnActive: { backgroundColor: '#1B4332' },
  tabText: { fontSize: 13, fontWeight: '700', color: '#4B5563' },
  tabTextActive: { color: '#FFFFFF' },
  card: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#E5E7EB', marginBottom: 14 },
  eligibleCard: { backgroundColor: '#F0FDF4', borderColor: '#86EFAC' },
  ineligibleCard: { backgroundColor: '#FEF2F2', borderColor: '#FECACA' },
  cardHeader: { fontSize: 11, fontWeight: '700', color: '#166534', letterSpacing: 0.5 },
  resultAmount: { fontSize: 28, fontWeight: '900', color: '#1B4332', marginVertical: 4 },
  resultSub: { fontSize: 12, color: '#4B5563' },
  inputLabel: { fontSize: 12, fontWeight: '700', color: '#374151', marginBottom: 4, marginTop: 8 },
  input: { backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, padding: 10, fontSize: 14 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#1B4332', marginBottom: 10 },
  shareCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  heirName: { fontSize: 14, fontWeight: '700', color: '#111827' },
  heirFraction: { fontSize: 11, color: '#6B7280', marginTop: 2 },
  heirAmount: { fontSize: 15, fontWeight: '800', color: '#1B4332' },
});
