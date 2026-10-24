import { useRef, useCallback } from 'react';

export function useAdhkarHaptics(hapticEnabled: boolean, soundEnabled: boolean) {
  const audioCtxRef = useRef<AudioContext | null>(null);

  const triggerFeedback = useCallback(
    (isComplete: boolean) => {
      // 1. Haptic Vibration
      if (hapticEnabled && typeof window !== 'undefined' && 'vibrate' in navigator) {
        if (isComplete) {
          navigator.vibrate([60, 40, 80, 40, 100]);
        } else {
          navigator.vibrate(25);
        }
      }

      // 2. Audio Click (Reused singleton Web Audio API synth)
      if (soundEnabled && typeof window !== 'undefined') {
        try {
          const AudioCtxClass =
            window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          if (AudioCtxClass) {
            if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
              audioCtxRef.current = new AudioCtxClass();
            }
            const ctx = audioCtxRef.current;
            if (ctx.state === 'suspended') {
              ctx.resume().catch(() => {});
            }
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(isComplete ? 784 : 440, ctx.currentTime);
            gain.gain.setValueAtTime(0.06, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(
              0.001,
              ctx.currentTime + (isComplete ? 0.22 : 0.06)
            );
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + (isComplete ? 0.22 : 0.06));
          }
        } catch (_) {}
      }
    },
    [hapticEnabled, soundEnabled]
  );

  return { triggerFeedback };
}
