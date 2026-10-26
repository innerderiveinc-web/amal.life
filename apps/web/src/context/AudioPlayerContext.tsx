import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { showAmalToast } from '../components/Toast';

export interface AudioTrack {
  id: string;
  title: string;
  subtitle?: string;
  audioUrl: string;
  reciter?: string;
  arabicSnippet?: string;
}

interface AudioPlayerContextType {
  currentTrack: AudioTrack | null;
  isPlaying: boolean;
  isSpeechFallback: boolean;
  playbackSpeed: number;
  currentTime: number;
  duration: number;
  playTrack: (track: AudioTrack) => void;
  togglePlay: () => void;
  pause: () => void;
  seek: (seconds: number) => void;
  skipBy: (seconds: number) => void;
  setSpeed: (speed: number) => void;
  closePlayer: () => void;
  playTestChime: () => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export const AudioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isSpeechFallback, setIsSpeechFallback] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(100);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Play a gentle Web Audio chime for instant audible confirmation on user click
  const playTestChime = () => {
    try {
      if (typeof window !== 'undefined' && (window.AudioContext || (window as any).webkitAudioContext)) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        if (ctx.state === 'suspended') {
          ctx.resume().catch(() => {});
        }
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5 note
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      }
    } catch (e) {
      // AudioContext optional / non-blocking
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio();
      const audio = audioRef.current;
      audio.preload = 'auto';

      const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
      const handleLoadedMetadata = () => {
        if (audio.duration && !isNaN(audio.duration)) {
          setDuration(audio.duration);
        }
      };
      const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
      };
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);

      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
        audio.pause();
      };
    }
  }, []);

  const triggerSpeechFallback = (track: AudioTrack) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = track.arabicSnippet || track.title;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.85;

      utterance.onstart = () => {
        setIsPlaying(true);
        setIsSpeechFallback(true);
        showAmalToast(`Playing voice recitation: ${track.title}`, 'info');
      };
      utterance.onend = () => {
        setIsPlaying(false);
        setIsSpeechFallback(false);
      };
      utterance.onerror = () => {
        setIsPlaying(false);
        setIsSpeechFallback(false);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      setIsPlaying(false);
      showAmalToast('Audio stream unavailable and speech synthesis not supported.', 'warning');
    }
  };

  const playTrack = (track: AudioTrack) => {
    setCurrentTrack(track);
    setIsSpeechFallback(false);
    setCurrentTime(0);

    // Cancel any ongoing browser speech synthesis
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    // Play subtle auditory feedback chime
    playTestChime();

    if (audioRef.current) {
      const audio = audioRef.current;
      audio.pause();
      audio.src = track.audioUrl;
      audio.playbackRate = playbackSpeed;

      // Handle stream errors gracefully by falling back to SpeechSynthesis
      audio.onerror = () => {
        console.warn('Audio stream error on URL:', track.audioUrl);
        triggerSpeechFallback(track);
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            showAmalToast(`Playing recitation: ${track.title}`, 'success');

            // Wire browser lock-screen and hardware media keys
            if (typeof navigator !== 'undefined' && 'mediaSession' in navigator) {
              try {
                navigator.mediaSession.metadata = new MediaMetadata({
                  title: track.title,
                  artist: track.reciter || 'AMAL Classical Recitation',
                  album: track.subtitle || 'Holy Quran & Classical Exegesis',
                  artwork: [
                    { src: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
                    { src: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
                  ],
                });
                navigator.mediaSession.setActionHandler('play', () => {
                  audio.play();
                  setIsPlaying(true);
                });
                navigator.mediaSession.setActionHandler('pause', () => {
                  audio.pause();
                  setIsPlaying(false);
                });
                navigator.mediaSession.setActionHandler('seekbackward', () => skipBy(-10));
                navigator.mediaSession.setActionHandler('seekforward', () => skipBy(10));
                navigator.mediaSession.setActionHandler('stop', () => closePlayer());
              } catch (e) {
                console.debug('MediaSession handler setup bypassed:', e);
              }
            }
          })
          .catch((err) => {
            console.warn('Browser audio play error:', err);
            // Autoplay blocked or network error -> activate fallback
            triggerSpeechFallback(track);
          });
      }
    } else {
      triggerSpeechFallback(track);
    }
  };

  const togglePlay = () => {
    if (!currentTrack) return;

    if (isSpeechFallback) {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        if (isPlaying) {
          window.speechSynthesis.pause();
          setIsPlaying(false);
        } else {
          window.speechSynthesis.resume();
          setIsPlaying(true);
        }
      }
      return;
    }

    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play().then(() => setIsPlaying(true)).catch(() => {
        if (currentTrack) triggerSpeechFallback(currentTrack);
      });
    }
  };

  const pause = () => {
    setIsPlaying(false);
    audioRef.current?.pause();
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.pause();
    }
  };

  const seek = (seconds: number) => {
    if (audioRef.current && !isSpeechFallback) {
      audioRef.current.currentTime = seconds;
      setCurrentTime(seconds);
    }
  };

  const skipBy = (seconds: number) => {
    if (audioRef.current && !isSpeechFallback) {
      const nextTime = Math.max(0, Math.min(audioRef.current.currentTime + seconds, duration));
      audioRef.current.currentTime = nextTime;
      setCurrentTime(nextTime);
    }
  };

  const setSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  const closePlayer = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsSpeechFallback(false);
    setCurrentTrack(null);
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        isSpeechFallback,
        playbackSpeed,
        currentTime,
        duration,
        playTrack,
        togglePlay,
        pause,
        seek,
        skipBy,
        setSpeed,
        closePlayer,
        playTestChime,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }
  return context;
};
