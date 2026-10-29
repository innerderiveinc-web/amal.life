import React, { useState, useRef, useEffect, useCallback } from 'react';
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
    seek,
    skipBy,
    setSpeed,
    closePlayer,
  } = useAudioPlayer();

  const [isDragging, setIsDragging] = useState(false);
  const [dragTime, setDragTime] = useState(0);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverX, setHoverX] = useState<number>(0);
  const [isHoveringBar, setIsHoveringBar] = useState(false);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const totalSecs = Math.floor(seconds);
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    const secStr = secs < 10 ? `0${secs}` : `${secs}`;
    if (hrs > 0) {
      const minStr = mins < 10 ? `0${mins}` : `${mins}`;
      return `${hrs}:${minStr}:${secStr}`;
    }
    return `${mins}:${secStr}`;
  };

  const effectiveTime = isDragging ? dragTime : currentTime;
  const progressPercent = duration > 0 ? (effectiveTime / duration) * 100 : 0;
  const clampedPercent = Math.min(100, Math.max(0, progressPercent));

  // Global Keyboard Navigation (Arrow Keys for Seek, Space for Play/Pause)
  useEffect(() => {
    if (!currentTrack) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);
      if (isInput) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        skipBy(-10);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        skipBy(10);
      } else if (e.key === ' ' && !e.repeat) {
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentTrack, skipBy, togglePlay]);

  // Calculate seek timestamp based on cursor position
  const calculateTimeFromClientX = useCallback(
    (clientX: number) => {
      if (!progressBarRef.current || duration <= 0) return 0;
      const rect = progressBarRef.current.getBoundingClientRect();
      const relativeX = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const pct = relativeX / rect.width;
      return Math.max(0, Math.min(pct * duration, duration));
    },
    [duration]
  );

  // Pointer Down: Starts dragging or immediate seek on click
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (duration <= 0) return;
    e.preventDefault();
    const targetTime = calculateTimeFromClientX(e.clientX);
    setIsDragging(true);
    setDragTime(targetTime);
    seek(targetTime);

    const onPointerMove = (moveEvt: PointerEvent) => {
      const newTime = calculateTimeFromClientX(moveEvt.clientX);
      setDragTime(newTime);
      seek(newTime);
    };

    const onPointerUp = (upEvt: PointerEvent) => {
      const finalTime = calculateTimeFromClientX(upEvt.clientX);
      seek(finalTime);
      setIsDragging(false);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  // Hover state tracking on the scrubber rail
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || duration <= 0) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const relativeX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const pct = relativeX / rect.width;
    setHoverTime(pct * duration);
    setHoverX(relativeX);
  };

  const handlePointerEnter = () => setIsHoveringBar(true);
  const handlePointerLeave = () => {
    setIsHoveringBar(false);
    setHoverTime(null);
  };

  if (!currentTrack) return null;

  return (
    <div
      role="region"
      aria-label="Amal Audio Recitation Player"
      className="amal-persistent-audio-player"
      style={{
        backgroundColor: '#1E293B',
        color: '#FFFFFF',
        borderRadius: 16,
        boxShadow: '0 12px 30px -5px rgba(0, 0, 0, 0.45), 0 8px 12px -6px rgba(0, 0, 0, 0.35)',
        padding: '12px 20px',
        border: '1px solid #334155',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Top track details & controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        {/* Track info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, overflow: 'hidden' }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              backgroundColor: AmalTheme.colors.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              flexShrink: 0,
              boxShadow: '0 2px 8px rgba(5, 150, 105, 0.3)',
            }}
          >
            🎙️
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: 260,
                }}
                title={currentTrack.title}
              >
                {currentTrack.title}
              </div>
              <span
                style={{
                  fontSize: 10,
                  backgroundColor: isPlaying ? (isSpeechFallback ? '#7C3AED' : '#059669') : '#64748B',
                  color: '#FFFFFF',
                  padding: '2px 8px',
                  borderRadius: 6,
                  fontWeight: 700,
                  flexShrink: 0,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                }}
              >
                {isPlaying && (
                  <span style={{ display: 'inline-flex', alignItems: 'flex-end', gap: 2, height: 11 }}>
                    <span className="eq-bar-1" style={{ width: 2, backgroundColor: '#FFFFFF', borderRadius: 1 }} />
                    <span className="eq-bar-2" style={{ width: 2, backgroundColor: '#FFFFFF', borderRadius: 1 }} />
                    <span className="eq-bar-3" style={{ width: 2, backgroundColor: '#FFFFFF', borderRadius: 1 }} />
                    <span className="eq-bar-4" style={{ width: 2, backgroundColor: '#FFFFFF', borderRadius: 1 }} />
                  </span>
                )}
                <span>{isPlaying ? (isSpeechFallback ? '🎙️ Voice Active' : '▶ Playing') : '⏸ Paused'}</span>
              </span>
            </div>
            <div style={{ fontSize: 11.5, color: '#94A3B8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 260 }}>
              {currentTrack.reciter ? `Qari: ${currentTrack.reciter}` : currentTrack.subtitle || 'Masnoon Recitation'}
            </div>
          </div>
        </div>

        {/* Playback action controls (Age / Piche Controls & Play/Pause) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Rewind -10s */}
          <button
            onClick={() => skipBy(-10)}
            style={{
              backgroundColor: '#334155',
              border: '1px solid #475569',
              color: '#F1F5F9',
              cursor: 'pointer',
              fontSize: 11.5,
              fontWeight: 700,
              padding: '6px 10px',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              transition: 'background-color 0.15s ease, transform 0.1s ease',
            }}
            title="Rewind 10 seconds (← Left Arrow)"
            aria-label="Rewind 10 seconds"
          >
            <span style={{ fontSize: 13, lineHeight: 1 }}>↺</span>
            <span>-10s</span>
          </button>

          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            style={{
              width: 42,
              height: 42,
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
              boxShadow: '0 4px 12px rgba(5, 150, 105, 0.4)',
              transition: 'transform 0.1s ease',
            }}
            title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
            aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>

          {/* Fast Forward +10s */}
          <button
            onClick={() => skipBy(10)}
            style={{
              backgroundColor: '#334155',
              border: '1px solid #475569',
              color: '#F1F5F9',
              cursor: 'pointer',
              fontSize: 11.5,
              fontWeight: 700,
              padding: '6px 10px',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              transition: 'background-color 0.15s ease, transform 0.1s ease',
            }}
            title="Fast forward 10 seconds (→ Right Arrow)"
            aria-label="Fast forward 10 seconds"
          >
            <span>+10s</span>
            <span style={{ fontSize: 13, lineHeight: 1 }}>↻</span>
          </button>

          {/* Playback Speed Pills */}
          <div style={{ display: 'flex', gap: 3, marginLeft: 6 }}>
            {[0.75, 1.0, 1.25, 1.5].map((speed) => (
              <button
                key={speed}
                onClick={() => setSpeed(speed)}
                style={{
                  border: 'none',
                  padding: '4px 6px',
                  borderRadius: 6,
                  fontSize: 10.5,
                  fontWeight: playbackSpeed === speed ? 700 : 500,
                  backgroundColor: playbackSpeed === speed ? '#38BDF8' : '#334155',
                  color: playbackSpeed === speed ? '#0F172A' : '#CBD5E1',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                title={`Playback speed ${speed}x`}
              >
                {speed}x
              </button>
            ))}
          </div>

          {/* Close Player */}
          <button
            onClick={closePlayer}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              fontSize: 16,
              marginLeft: 4,
              padding: '4px 6px',
              borderRadius: 6,
            }}
            title="Close Player"
            aria-label="Close audio player"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Interactive Cursor Seekbar (Timeline Scrubber) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 11, color: '#94A3B8' }}>
        {/* Elapsed Time */}
        <span style={{ minWidth: 42, fontVariantNumeric: 'tabular-nums', textAlign: 'right' }}>
          {formatTime(effectiveTime)}
        </span>

        {/* Scrubber Hitbox Container (Click & Drag Anywhere) */}
        <div
          ref={progressBarRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          role="slider"
          aria-label="Audio playback seek bar"
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={effectiveTime}
          tabIndex={0}
          style={{
            flex: 1,
            height: 24,
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            cursor: 'pointer',
            touchAction: 'none',
            userSelect: 'none',
          }}
        >
          {/* Rail Track */}
          <div
            style={{
              width: '100%',
              height: isHoveringBar || isDragging ? 8 : 6,
              backgroundColor: '#334155',
              borderRadius: 4,
              position: 'relative',
              overflow: 'hidden',
              transition: isDragging ? 'none' : 'height 0.15s ease',
            }}
          >
            {/* Ghost Hover Preview Bar */}
            {isHoveringBar && hoverTime !== null && (
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${hoverX}px`,
                  backgroundColor: 'rgba(56, 189, 248, 0.25)',
                  borderRadius: 4,
                }}
              />
            )}

            {/* Active Played Fill Bar */}
            <div
              style={{
                width: `${clampedPercent}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #059669 0%, #38BDF8 100%)',
                borderRadius: 4,
                transition: isDragging ? 'none' : 'width 0.1s linear',
              }}
            />
          </div>

          {/* Interactive Thumb Knob (Scrubber Head) */}
          <div
            style={{
              position: 'absolute',
              left: `${clampedPercent}%`,
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: isHoveringBar || isDragging ? 16 : 12,
              height: isHoveringBar || isDragging ? 16 : 12,
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '3px solid #38BDF8',
              boxShadow: isHoveringBar || isDragging ? '0 0 10px #38BDF8' : '0 2px 4px rgba(0,0,0,0.3)',
              pointerEvents: 'none',
              transition: isDragging ? 'none' : 'width 0.15s ease, height 0.15s ease',
            }}
          />

          {/* Tooltip on Cursor Hover */}
          {isHoveringBar && hoverTime !== null && (
            <div
              style={{
                position: 'absolute',
                bottom: 24,
                left: hoverX,
                transform: 'translateX(-50%)',
                backgroundColor: '#0F172A',
                border: '1px solid #38BDF8',
                color: '#FFFFFF',
                fontSize: 10.5,
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: 6,
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                zIndex: 10,
              }}
            >
              {formatTime(hoverTime)}
            </div>
          )}
        </div>

        {/* Total Time & Remaining Time */}
        <span style={{ minWidth: 42, fontVariantNumeric: 'tabular-nums' }}>
          {formatTime(duration)}
        </span>
      </div>
    </div>
  );
};
