import React from 'react';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { AmalTheme } from '@amal/ui';

export const PersistentAudioPlayer: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    isSpeechFallback,
    playbackSpeed,
    currentTime,
    duration,
    togglePlay,
    skipBy,
    setSpeed,
    closePlayer,
    playTestChime,
  } = useAudioPlayer();

  if (!currentTrack) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '92%',
        maxWidth: 760,
        backgroundColor: '#1E293B',
        color: '#FFFFFF',
        borderRadius: 16,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.3)',
        zIndex: 9999,
        padding: '12px 20px',
        border: '1px solid #334155',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      {/* Top track details & controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        {/* Track info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, overflow: 'hidden' }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 8,
              backgroundColor: AmalTheme.colors.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              flexShrink: 0,
            }}
          >
            🎙️
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {currentTrack.title}
              </div>
              <span
                style={{
                  fontSize: 10,
                  backgroundColor: isPlaying ? (isSpeechFallback ? '#7C3AED' : '#059669') : '#64748B',
                  color: '#FFFFFF',
                  padding: '3px 8px',
                  borderRadius: 6,
                  fontWeight: 700,
                  flexShrink: 0,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                }}
              >
                {isPlaying && (
                  <span style={{ display: 'inline-flex', alignItems: 'flex-end', gap: 2, height: 12 }}>
                    <span className="eq-bar-1" style={{ width: 2, backgroundColor: '#FFFFFF', borderRadius: 1 }} />
                    <span className="eq-bar-2" style={{ width: 2, backgroundColor: '#FFFFFF', borderRadius: 1 }} />
                    <span className="eq-bar-3" style={{ width: 2, backgroundColor: '#FFFFFF', borderRadius: 1 }} />
                    <span className="eq-bar-4" style={{ width: 2, backgroundColor: '#FFFFFF', borderRadius: 1 }} />
                  </span>
                )}
                <span>{isPlaying ? (isSpeechFallback ? '🎙️ Voice Active' : '▶ Playing') : '⏸ Paused'}</span>
              </span>
            </div>
            <div style={{ fontSize: 12, color: '#94A3B8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {currentTrack.reciter ? `Qari: ${currentTrack.reciter}` : currentTrack.subtitle || 'Masnoon Recitation'}
            </div>
          </div>
        </div>

        {/* Playback action controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* -10s */}
          <button
            onClick={() => skipBy(-10)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#CBD5E1',
              cursor: 'pointer',
              fontSize: 13,
              padding: '4px 8px',
              borderRadius: 6,
            }}
            title="Rewind 10 seconds"
          >
            -10s
          </button>

          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: AmalTheme.colors.primary,
              border: 'none',
              color: '#FFFFFF',
              fontSize: 18,
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>

          {/* +10s */}
          <button
            onClick={() => skipBy(10)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#CBD5E1',
              cursor: 'pointer',
              fontSize: 13,
              padding: '4px 8px',
              borderRadius: 6,
            }}
            title="Fast forward 10 seconds"
          >
            +10s
          </button>

          {/* Speed Pills */}
          <div style={{ display: 'flex', gap: 4, marginLeft: 6 }}>
            {[0.75, 1.0, 1.25].map(speed => (
              <button
                key={speed}
                onClick={() => setSpeed(speed)}
                style={{
                  border: 'none',
                  padding: '3px 6px',
                  borderRadius: 4,
                  fontSize: 11,
                  fontWeight: playbackSpeed === speed ? 700 : 400,
                  backgroundColor: playbackSpeed === speed ? '#334155' : 'transparent',
                  color: playbackSpeed === speed ? '#38BDF8' : '#94A3B8',
                  cursor: 'pointer',
                }}
              >
                {speed}x
              </button>
            ))}
          </div>

          {/* Close */}
          <button
            onClick={closePlayer}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              fontSize: 16,
              marginLeft: 8,
              padding: 4,
            }}
            title="Close Player"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Progress timeline bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 11, color: '#94A3B8' }}>
        <span>{formatTime(currentTime)}</span>
        <div
          style={{
            flex: 1,
            height: 4,
            backgroundColor: '#334155',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${Math.min(100, Math.max(0, progressPercent))}%`,
              height: '100%',
              backgroundColor: '#38BDF8',
              borderRadius: 2,
            }}
          />
        </div>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};
