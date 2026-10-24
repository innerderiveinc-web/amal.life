/**
 * AMAL OS — Precision Audio Azaan & Adhan Notification System
 * 
 * Generates pure, dignified melodic Azaan acoustics and sacred Takbeer chime
 * using the Web Audio API without any external server dependencies or broken MP3 URLs.
 * Integrates with the browser Notification API for real-time prayer alerts.
 */

export type AzaanSoundType = 'BAYATI_CALL' | 'TAKBEER_CHIME' | 'MECCA_TONE';

export interface AzaanSettings {
  enabled: boolean;
  soundType: AzaanSoundType;
  volume: number; // 0.0 to 1.0
  notificationsEnabled: boolean;
}

export function getSavedAzaanSettings(): AzaanSettings {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('amal_azaan_settings');
      if (saved) return JSON.parse(saved);
    } catch (_) {}
  }
  return {
    enabled: true,
    soundType: 'BAYATI_CALL',
    volume: 0.8,
    notificationsEnabled: false,
  };
}

export function saveAzaanSettings(settings: AzaanSettings): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('amal_azaan_settings', JSON.stringify(settings));
    window.dispatchEvent(new Event('amal_prayer_settings_changed'));
  }
}

let sharedAudioCtx: AudioContext | null = null;

function getSharedAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!sharedAudioCtx || sharedAudioCtx.state === 'closed') {
    sharedAudioCtx = new AudioContextClass();
  }
  if (sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume().catch(() => {});
  }
  return sharedAudioCtx;
}

/**
 * Play authentic synthesized sacred Azaan audio using the Web Audio API
 */
export function playAzaanAudio(soundType: AzaanSoundType = 'BAYATI_CALL', volume: number = 0.8): void {
  if (typeof window === 'undefined') return;

  try {
    const ctx = getSharedAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(Math.max(0.05, Math.min(volume, 1.0)), ctx.currentTime);
    masterGain.connect(ctx.destination);

    if (soundType === 'TAKBEER_CHIME') {
      // Dignified 3-tone chime (Allah-u-Akbar cadence: F4 -> A4 -> C5)
      const notes = [349.23, 440.0, 523.25];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.45);

        noteGain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.45);
        noteGain.gain.linearRampToValueAtTime(0.6, ctx.currentTime + idx * 0.45 + 0.05);
        noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.45 + 0.85);

        osc.connect(noteGain);
        noteGain.connect(masterGain);

        osc.start(ctx.currentTime + idx * 0.45);
        osc.stop(ctx.currentTime + idx * 0.45 + 0.9);
      });
    } else if (soundType === 'MECCA_TONE') {
      // Reverberant solemn brass tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, ctx.currentTime); // A3
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 1.2); // Glide to A4

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.7, ctx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);

      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 2.6);
    } else {
      // Default: Classical Bayati Maqam Azaan progression (D4 -> F4 -> G4 -> A4 -> G4 -> F4 -> E4-half-flat -> D4)
      const bayatiFreqs = [
        { f: 293.66, dur: 0.6, delay: 0.0 }, // D4 (Al-lah)
        { f: 349.23, dur: 0.5, delay: 0.6 }, // F4 (hu)
        { f: 392.00, dur: 0.8, delay: 1.1 }, // G4 (Ak-)
        { f: 440.00, dur: 1.1, delay: 1.9 }, // A4 (-bar)
        { f: 392.00, dur: 0.6, delay: 3.0 }, // G4
        { f: 349.23, dur: 0.7, delay: 3.6 }, // F4
        { f: 320.00, dur: 0.6, delay: 4.3 }, // E-half-flat (Bayati quarter tone character)
        { f: 293.66, dur: 1.4, delay: 4.9 }, // D4 resolution
      ];

      bayatiFreqs.forEach((item) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(item.f, ctx.currentTime + item.delay);

        noteGain.gain.setValueAtTime(0, ctx.currentTime + item.delay);
        noteGain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + item.delay + 0.08);
        noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + item.delay + item.dur);

        osc.connect(noteGain);
        noteGain.connect(masterGain);

        osc.start(ctx.currentTime + item.delay);
        osc.stop(ctx.currentTime + item.delay + item.dur + 0.1);
      });
    }
  } catch (e) {
    console.warn('[AMAL Audio] Web Audio playback failed:', e);
  }
}

/**
 * Trigger Web Notification + Sound for a prayer
 */
export async function triggerPrayerAlert(prayerName: string, prayerTime: string): Promise<void> {
  const settings = getSavedAzaanSettings();

  // 1. Play audio if enabled
  if (settings.enabled) {
    playAzaanAudio(settings.soundType, settings.volume);
  }

  // 2. Dispatch browser notification if permitted
  if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
    try {
      new Notification(`🕋 وقتِ نماز: ${prayerName}`, {
        body: `It is now time for ${prayerName} (${prayerTime}). Prepare for Salah and Takbir al-Ula.`,
        icon: '/favicon.ico',
      });
    } catch (_) {}
  }
}
