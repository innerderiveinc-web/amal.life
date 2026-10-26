import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { audioStreamingEngine } from '@amal/amal-engine';

export const AudioScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'QURAN' | 'SHAMAIL' | 'SIRAH'>('QURAN');
  const [playingTitle, setPlayingTitle] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(360);

  // Auto-progress simulated playback timer when playing
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (playingTitle && isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [playingTitle, isPlaying, duration]);

  const togglePlay = (title: string) => {
    if (playingTitle === title) {
      setIsPlaying(!isPlaying);
    } else {
      setPlayingTitle(title);
      setIsPlaying(true);
      setCurrentTime(0);
      setDuration(360);
    }
  };

  const skipBy = (seconds: number) => {
    setCurrentTime((prev) => Math.max(0, Math.min(prev + seconds, duration)));
  };

  const handleSeekTouch = (e: GestureResponderEvent) => {
    const touchX = e.nativeEvent.locationX;
    // Assuming scrubber bar width around 280-320
    const barWidth = 280;
    const pct = Math.max(0, Math.min(touchX / barWidth, 1));
    setCurrentTime(Math.round(pct * duration));
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

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
                  style={[styles.playBtn, playingTitle === s.nameEnglish && isPlaying && styles.playBtnActive]}
                  onPress={() => togglePlay(s.nameEnglish)}
                >
                  <Text style={styles.playBtnText}>{playingTitle === s.nameEnglish && isPlaying ? '⏸' : '▶'}</Text>
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
                  style={[styles.playBtn, playingTitle === ch.titleEnglish && isPlaying && styles.playBtnActive]}
                  onPress={() => togglePlay(ch.titleEnglish)}
                >
                  <Text style={styles.playBtnText}>{playingTitle === ch.titleEnglish && isPlaying ? '⏸' : '▶'}</Text>
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
                  style={[styles.playBtn, playingTitle === ep.titleEnglish && isPlaying && styles.playBtnActive]}
                  onPress={() => togglePlay(ep.titleEnglish)}
                >
                  <Text style={styles.playBtnText}>{playingTitle === ep.titleEnglish && isPlaying ? '⏸' : '▶'}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Enhanced Mini Player Bar with Skip Controls & Interactive Scrubber */}
      {playingTitle && (
        <View style={styles.miniPlayer}>
          {/* Top Row: Track Title & Action Controls */}
          <View style={styles.miniPlayerTop}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={styles.nowPlayingLabel}>NOW PLAYING</Text>
              <Text style={styles.nowPlayingTitle} numberOfLines={1}>{playingTitle}</Text>
            </View>

            {/* Skip Backward -10s */}
            <TouchableOpacity style={styles.skipBtn} onPress={() => skipBy(-10)}>
              <Text style={styles.skipBtnText}>-10s</Text>
            </TouchableOpacity>

            {/* Play/Pause */}
            <TouchableOpacity style={styles.miniPlayBtn} onPress={() => setIsPlaying(!isPlaying)}>
              <Text style={styles.miniPlayBtnText}>{isPlaying ? '⏸' : '▶'}</Text>
            </TouchableOpacity>

            {/* Skip Forward +10s */}
            <TouchableOpacity style={styles.skipBtn} onPress={() => skipBy(10)}>
              <Text style={styles.skipBtnText}>+10s</Text>
            </TouchableOpacity>

            {/* Close */}
            <TouchableOpacity onPress={() => setPlayingTitle(null)} style={{ padding: 6, marginLeft: 4 }}>
              <Text style={styles.closePlayer}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Row: Scrubber Timeline Bar */}
          <View style={styles.scrubberRow}>
            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.scrubberHitbox}
              onPress={handleSeekTouch}
            >
              <View style={styles.scrubberRail}>
                <View style={[styles.scrubberFill, { width: `${progressPct}%` }]} />
              </View>
              <View style={[styles.scrubberKnob, { left: `${progressPct}%` }]} />
            </TouchableOpacity>
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  content: { padding: 16, paddingBottom: 110 },
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
    backgroundColor: '#1E293B',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  miniPlayerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  nowPlayingLabel: { color: '#38BDF8', fontSize: 9, fontWeight: '800', letterSpacing: 0.5 },
  nowPlayingTitle: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  skipBtn: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: '#334155',
    borderRadius: 6,
    marginHorizontal: 3,
  },
  skipBtnText: { color: '#E2E8F0', fontSize: 11, fontWeight: '700' },
  miniPlayBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  miniPlayBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' },
  closePlayer: { color: '#94A3B8', fontSize: 16, fontWeight: '700' },
  scrubberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeText: { color: '#94A3B8', fontSize: 10, width: 32, textAlign: 'center' },
  scrubberHitbox: {
    flex: 1,
    height: 20,
    justifyContent: 'center',
    position: 'relative',
  },
  scrubberRail: {
    height: 4,
    backgroundColor: '#334155',
    borderRadius: 2,
    overflow: 'hidden',
  },
  scrubberFill: {
    height: '100%',
    backgroundColor: '#38BDF8',
    borderRadius: 2,
  },
  scrubberKnob: {
    position: 'absolute',
    top: 4,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#38BDF8',
    marginLeft: -6,
  },
});
