import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export const AboutScreen: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const pillars = [
    {
      icon: '🌿',
      title: 'Sakinah Calm (Zero Gamification)',
      desc: 'No "Taqwa Points" or guilt streaks. Worship is for Allah alone (Ikhlas). Built for peaceful habit consistency.',
    },
    {
      icon: '🛡️',
      title: '100% Ad-Free & Private Vault',
      desc: 'Zero commercial tracking or data selling. Personal reflections stay private even from family sync.',
    },
    {
      icon: '⚖️',
      title: 'Fatwa Firewall & Scholars Desk',
      desc: 'The platform cannot issue fatwas or novel verdicts. Sensitive legal cases escalate to certified human Muftis.',
    },
    {
      icon: '🕌',
      title: 'Ahl al-Sunnah & 4-Madhhab Parity',
      desc: 'Hanafi, Shafi\'i, Maliki, and Hanbali legal traditions honored with canonical accuracy and Asr/Zakat toggles.',
    },
    {
      icon: '🧭',
      title: 'On-Device Deterministic Math',
      desc: 'High-precision astronomical prayer times and Kaaba azimuth run 100% offline without third-party APIs.',
    },
  ];

  const faqs = [
    {
      q: 'Does AMAL OS issue independent fatwas?',
      a: 'No. Automated systems are strictly prohibited from declaring matters Halal or Haram. The platform quotes verified classical texts across the 4 Madhhabs and connects seekers to certified human scholars.',
    },
    {
      q: 'Can this be used outside India?',
      a: 'Yes! Over 150+ global cities are built-in with automatic calculation method adjustment (Umm al-Qura, MWL, ISNA, Karachi, Egyptian).',
    },
    {
      q: 'Why are there no ads or subscriptions?',
      a: 'Worship and private spiritual practice are an Amanah (sacred trust). AMAL OS is completely ad-free and tracking-free.',
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Hero Badge */}
      <View style={styles.heroCard}>
        <Text style={styles.heroBadge}>🕌 TA\'ARUF · ABOUT AMAL OS</Text>
        <Text style={styles.heroTitle}>From Niyyah to Amal.</Text>
        <Text style={styles.heroSub}>
          Sovereign Muslim Life Intelligence · 100% Ahl al-Sunnah wal-Jama\'ah (Sawad al-A\'zam)
        </Text>
      </View>

      {/* Pillars Section */}
      <Text style={styles.sectionTitle}>The Five Sovereign Pillars</Text>
      {pillars.map((p, idx) => (
        <View key={idx} style={styles.card}>
          <Text style={styles.pillarIcon}>{p.icon}</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.pillarTitle}>{p.title}</Text>
            <Text style={styles.pillarDesc}>{p.desc}</Text>
          </View>
        </View>
      ))}

      {/* FAQ Section */}
      <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Frequently Asked Questions (FAQ)</Text>
      {faqs.map((f, idx) => {
        const isOpen = activeFaq === idx;
        return (
          <TouchableOpacity
            key={idx}
            style={styles.faqCard}
            onPress={() => setActiveFaq(isOpen ? null : idx)}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={styles.faqQ}>{f.q}</Text>
              <Text style={styles.faqArrow}>{isOpen ? '▲' : '▼'}</Text>
            </View>
            {isOpen && <Text style={styles.faqA}>{f.a}</Text>}
          </TouchableOpacity>
        );
      })}

      {/* Scholarly Contact Note */}
      <View style={styles.contactCard}>
        <Text style={styles.contactTitle}>📬 Scholarly Review Desk</Text>
        <Text style={styles.contactText}>
          Are you an Alim, Mufti, or researcher? We welcome feedback and institutional scholarly inquiries with gratitude at scholars@amal.life.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  content: { padding: 16, paddingBottom: 40 },
  heroCard: {
    backgroundColor: '#1B4332',
    borderRadius: 14,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    textAlign: 'center',
  },
  heroBadge: { fontSize: 11, fontWeight: '800', color: '#86EFAC', letterSpacing: 0.5 },
  heroTitle: { fontSize: 24, fontWeight: '900', color: '#FFFFFF', marginVertical: 6 },
  heroSub: { fontSize: 12, color: '#D1FAE5', textAlign: 'center', lineHeight: 18 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#1B4332', marginBottom: 10 },
  card: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  pillarIcon: { fontSize: 24 },
  pillarTitle: { fontSize: 14, fontWeight: '700', color: '#111827', marginBottom: 2 },
  pillarDesc: { fontSize: 12, color: '#4B5563', lineHeight: 16 },
  faqCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  faqQ: { fontSize: 13, fontWeight: '700', color: '#111827', flex: 1 },
  faqArrow: { fontSize: 12, color: '#9CA3AF', marginLeft: 8 },
  faqA: { fontSize: 12, color: '#374151', marginTop: 8, lineHeight: 17 },
  contactCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  contactTitle: { fontSize: 13, fontWeight: '800', color: '#166534', marginBottom: 4 },
  contactText: { fontSize: 11, color: '#14532D', lineHeight: 16 },
});
