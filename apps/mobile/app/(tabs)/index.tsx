import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AMAL OS — Today</Text>
      <Text style={styles.subtitle}>From Niyyah to Amal</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6', padding: 24, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: '700', color: '#0F4C3A' },
  subtitle: { fontSize: 16, color: '#556B2F', marginTop: 8 },
});
