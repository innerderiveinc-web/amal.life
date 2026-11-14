import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Native Screen Wake Lock Hook
 * Prevents screen dimming / sleep during sacred recitation, Tasbih, Adhkar, or study.
 * Automatically re-acquires lock when returning from background/tab switch.
 */
export function useWakeLock(enabled: boolean = true) {
  const [isLocked, setIsLocked] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const sentinelRef = useRef<any>(null);

  useEffect(() => {
    setIsSupported(typeof navigator !== 'undefined' && 'wakeLock' in navigator);
  }, []);

  const requestLock = useCallback(async () => {
    if (typeof navigator === 'undefined' || !('wakeLock' in navigator)) return;
    try {
      if (!sentinelRef.current) {
        const sentinel = await (navigator as any).wakeLock.request('screen');
        sentinelRef.current = sentinel;
        setIsLocked(true);
        sentinel.addEventListener('release', () => {
          sentinelRef.current = null;
          setIsLocked(false);
        });
      }
    } catch {
      // Ignored: wake lock request may be refused if battery saver is enabled
      setIsLocked(false);
    }
  }, []);

  const releaseLock = useCallback(async () => {
    if (sentinelRef.current) {
      try {
        await sentinelRef.current.release();
      } catch {}
      sentinelRef.current = null;
      setIsLocked(false);
    }
  }, []);

  useEffect(() => {
    if (enabled && isSupported) {
      requestLock();

      const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible' && enabled) {
          requestLock();
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        releaseLock();
      };
    } else {
      releaseLock();
    }
  }, [enabled, isSupported, requestLock, releaseLock]);

  return { isLocked, isSupported, requestLock, releaseLock };
}
