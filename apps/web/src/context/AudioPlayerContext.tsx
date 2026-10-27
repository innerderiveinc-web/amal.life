import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { showAmalToast } from '../components/Toast';
import { offlineAudioCache } from '../services/offline-audio-cache';

export interface AudioTrack {
  id: string;
  title: string;
  subtitle?: string;
  audioUrl: string;
  mirrors?: string[];
  reciter?: string;
  arabicSnippet?: string;
  lang?: 'ar' | 'ur' | 'en';
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
      if (typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext)) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
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

      if (track.lang === 'ur') {
        utterance.lang = 'ur-PK';
      } else if (track.lang === 'en') {
        utterance.lang = 'en-US';
      } else if (track.lang === 'ar') {
        utterance.lang = 'ar-SA';
      } else if (/[\u0600-\u06FF]/.test(text)) {
        const isUrduSpecific = /[\u0679\u0688\u0691\u06BA\u06D2\u06C1]/.test(text);
        utterance.lang = isUrduSpecific ? 'ur-PK' : 'ar-SA';
      } else {
        utterance.lang = 'en-US';
      }

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

  const isDirectAudioUrl = (url: string): boolean => {
    if (!url) return false;
    if (url.includes('youtube.com') || url.includes('youtu.be')) return false;
    if (url.startsWith('blob:') || url.startsWith('data:')) return true;
    if (url.includes('archive.org/download') || url.includes('quranicaudio.com') || url.includes('everyayah.com') || url.includes('audio.amal.life')) return true;
    return /\.(mp3|m4a|wav|aac|ogg)(\?.*)?$/i.test(url);
  };

  const playTrack = (track: AudioTrack) => {
    // If track is an external video / dars link (e.g. YouTube), open externally and never feed to <audio>
    if (!isDirectAudioUrl(track.audioUrl)) {
      if (typeof window !== 'undefined') {
        window.open(track.audioUrl, '_blank', 'noopener,noreferrer');
        showAmalToast(`Opening external lecture / dars: ${track.title}`, 'info');
      }
      setIsPlaying(false);
      return;
    }

    setCurrentTrack(track);
    setIsSpeechFallback(false);
    setCurrentTime(0);

    // Cancel any ongoing browser speech synthesis
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    // Play subtle auditory feedback chime
    playTestChime();

    // Resolve local offline cache if downloaded, otherwise stream online
    offlineAudioCache.getPlaybackUrl(track.audioUrl).then((resolvedUrl) => {
      if (audioRef.current) {
        const audio = audioRef.current;
        audio.pause();

        const sources = [resolvedUrl, ...(track.mirrors || [])].filter(
          (s): s is string => Boolean(s) && typeof s === 'string' && isDirectAudioUrl(s)
        );

        const setupMediaSession = () => {
          if (typeof navigator !== 'undefined' && 'mediaSession' in navigator) {
            try {
              navigator.mediaSession.metadata = new MediaMetadata({
                title: track.title,
                artist: track.reciter || 'AMAL Classical Recitation',
                album: track.subtitle || 'Holy Quran & Classical Exegesis',
                artwork: [
                  { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
                  { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
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
              navigator.mediaSession.setActionHandler('seekto', (details) => {
                if (details.seekTime !== undefined) {
                  seek(details.seekTime);
                }
              });
              navigator.mediaSession.setActionHandler('stop', () => closePlayer());
            } catch (e) {
              console.debug('MediaSession handler setup bypassed:', e);
            }
          }
        };

        const attemptPlaySource = (srcIndex: number) => {
          if (srcIndex >= sources.length) {
            console.warn('All audio stream sources failed for track:', track.title);
            setIsPlaying(false);
            if (track.arabicSnippet && track.arabicSnippet.length <= 150) {
              triggerSpeechFallback(track);
            } else {
              showAmalToast('Audio stream unavailable. Please check your internet connection or CDN.', 'warning');
            }
            return;
          }

          const currentSrc = sources[srcIndex];
          if (!currentSrc || !isDirectAudioUrl(currentSrc)) {
            if (srcIndex + 1 < sources.length) {
              attemptPlaySource(srcIndex + 1);
            } else {
              setIsPlaying(false);
              showAmalToast('Audio stream unavailable. Please check connection.', 'warning');
            }
            return;
          }
          audio.src = currentSrc;
          audio.playbackRate = playbackSpeed;

          // Handle stream errors gracefully by trying alternate mirrors first
          audio.onerror = () => {
            console.warn(`Audio stream failed on source [${srcIndex}]:`, currentSrc);
            if (srcIndex + 1 < sources.length) {
              showAmalToast(`Network slow/throttled. Switching to audio mirror ${srcIndex + 2}...`, 'info');
              attemptPlaySource(srcIndex + 1);
            } else {
              setIsPlaying(false);
              if (track.arabicSnippet && track.arabicSnippet.length <= 150) {
                triggerSpeechFallback(track);
              } else {
                showAmalToast('Audio stream unavailable on this network. Please try another mirror or check connection.', 'warning');
              }
            }
          };

          const playPromise = audio.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setIsPlaying(true);
                const isOffline = currentSrc.startsWith('blob:');
                showAmalToast(
                  isOffline ? `Playing offline track: ${track.title}` : `Playing recitation: ${track.title}`,
                  'success'
                );
                setupMediaSession();
              })
              .catch((err) => {
                console.warn(`Browser audio play error on source [${srcIndex}]:`, err);
                if (srcIndex + 1 < sources.length) {
                  attemptPlaySource(srcIndex + 1);
                } else {
                  triggerSpeechFallback(track);
                }
              });
          }
        };

        attemptPlaySource(0);
      } else {
        triggerSpeechFallback(track);
      }
    });
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
      const maxDuration = audioRef.current.duration || duration || 0;
      const targetTime = maxDuration > 0
        ? Math.max(0, Math.min(seconds, maxDuration))
        : Math.max(0, seconds);
      audioRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    }
  };

  const skipBy = (seconds: number) => {
    if (audioRef.current && !isSpeechFallback) {
      const maxDuration = audioRef.current.duration || duration || 0;
      const nextTime = maxDuration > 0
        ? Math.max(0, Math.min(audioRef.current.currentTime + seconds, maxDuration))
        : Math.max(0, audioRef.current.currentTime + seconds);
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
