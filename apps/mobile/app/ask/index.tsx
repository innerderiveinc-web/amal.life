import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AskScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ask AMAL</Text>
      <Text style={styles.subtitle}>Grounded Islamic Knowledge & Micro-Deeds</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6', padding: 24, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: '700', color: '#0F4C3A' },
  subtitle: { fontSize: 16, color: '#556B2F', marginTop: 8 },
});
