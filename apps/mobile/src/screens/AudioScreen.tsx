import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { audioStreamingEngine } from '@amal/amal-engine';

export const AudioScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'QURAN' | 'SHAMAIL' | 'SIRAH'>('QURAN');
  const [playingTitle, setPlayingTitle] = useState<string | null>(null);

  const togglePlay = (title: string) => {
    if (playingTitle === title) {
      setPlayingTitle(null);
    } else {
      setPlayingTitle(title);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Audio & Recitations</Text>
        <Text style={styles.subtitle}>Classical Recitations & Prophetic Heritage Audio</Text>

        {/* Tab Selector */}
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tabBtn, selectedTab === 'QURAN' && styles.tabBtnActive]}
            onPress={() => setSelectedTab('QURAN')}
          >
            <Text style={[styles.tabText, selectedTab === 'QURAN' && styles.tabTextActive]}>Quran</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, selectedTab === 'SHAMAIL' && styles.tabBtnActive]}
            onPress={() => setSelectedTab('SHAMAIL')}
          >
            <Text style={[styles.tabText, selectedTab === 'SHAMAIL' && styles.tabTextActive]}>Shama'il</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, selectedTab === 'SIRAH' && styles.tabBtnActive]}
            onPress={() => setSelectedTab('SIRAH')}
          >
            <Text style={[styles.tabText, selectedTab === 'SIRAH' && styles.tabTextActive]}>Sirah</Text>
          </TouchableOpacity>
        </View>

        {selectedTab === 'QURAN' && (
          <View>
            {audioStreamingEngine.sampleSurahs.map((s) => (
              <View key={s.surahNumber} style={styles.trackCard}>
                <View style={styles.trackInfo}>
                  <View style={styles.numberBadge}>
                    <Text style={styles.numberText}>{s.surahNumber}</Text>
                  </View>
                  <View>
                    <Text style={styles.trackTitle}>Surah {s.nameEnglish}</Text>
                    <Text style={styles.trackSub}>{s.nameArabic} • {s.ayahCount} Ayahs</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={[styles.playBtn, playingTitle === s.nameEnglish && styles.playBtnActive]}
                  onPress={() => togglePlay(s.nameEnglish)}
                >
                  <Text style={styles.playBtnText}>{playingTitle === s.nameEnglish ? '⏸' : '▶'}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {selectedTab === 'SHAMAIL' && (
          <View>
            {audioStreamingEngine.shamailChapters.map((ch) => (
              <View key={ch.chapterNumber} style={styles.trackCard}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.trackTitle}>{ch.titleEnglish}</Text>
                  <Text style={styles.trackSub}>{ch.titleUrdu}</Text>
                </View>
                <TouchableOpacity
                  style={[styles.playBtn, playingTitle === ch.titleEnglish && styles.playBtnActive]}
                  onPress={() => togglePlay(ch.titleEnglish)}
                >
                  <Text style={styles.playBtnText}>{playingTitle === ch.titleEnglish ? '⏸' : '▶'}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {selectedTab === 'SIRAH' && (
          <View>
            {audioStreamingEngine.sirahEpisodes.map((ep) => (
              <View key={ep.episodeNumber} style={styles.trackCard}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.eraBadge}>EPISODE {ep.episodeNumber} • {ep.era}</Text>
                  <Text style={styles.trackTitle}>{ep.titleEnglish}</Text>
                  <Text style={styles.trackSub}>{ep.yearHijriOrGregorian}</Text>
                </View>
                <TouchableOpacity
                  style={[styles.playBtn, playingTitle === ep.titleEnglish && styles.playBtnActive]}
                  onPress={() => togglePlay(ep.titleEnglish)}
                >
                  <Text style={styles.playBtnText}>{playingTitle === ep.titleEnglish ? '⏸' : '▶'}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Mini Player Bar */}
      {playingTitle && (
        <View style={styles.miniPlayer}>
          <View>
            <Text style={styles.nowPlayingLabel}>NOW PLAYING</Text>
            <Text style={styles.nowPlayingTitle}>{playingTitle}</Text>
          </View>
          <TouchableOpacity onPress={() => setPlayingTitle(null)}>
            <Text style={styles.closePlayer}>✕</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  content: { padding: 16, paddingBottom: 80 },
  title: { fontSize: 22, fontWeight: '800', color: '#1B4332' },
  subtitle: { fontSize: 13, color: '#6B7280', marginTop: 2, marginBottom: 16 },
  tabRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  tabBtn: { flex: 1, paddingVertical: 10, borderRadius: 8, backgroundColor: '#E5E7EB', alignItems: 'center' },
  tabBtnActive: { backgroundColor: '#1B4332' },
  tabText: { fontSize: 13, fontWeight: '700', color: '#4B5563' },
  tabTextActive: { color: '#FFFFFF' },
  trackCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  trackInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  numberBadge: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#1B4332', alignItems: 'center', justifyContent: 'center' },
  numberText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  trackTitle: { fontSize: 14, fontWeight: '700', color: '#111827' },
  trackSub: { fontSize: 11, color: '#6B7280', marginTop: 2 },
  eraBadge: { fontSize: 10, fontWeight: '700', color: '#047857', marginBottom: 2 },
  playBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#1B4332', alignItems: 'center', justifyContent: 'center' },
  playBtnActive: { backgroundColor: '#DC2626' },
  playBtnText: { color: '#FFFFFF', fontSize: 14 },
  miniPlayer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1B4332',
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nowPlayingLabel: { color: '#86EFAC', fontSize: 10, fontWeight: '700' },
  nowPlayingTitle: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  closePlayer: { color: '#FFFFFF', fontSize: 16, padding: 6 },
});
