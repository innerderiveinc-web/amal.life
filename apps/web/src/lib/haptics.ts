/**
 * AMAL OS — Tactile Web Haptics Engine (Physical Touch Feedback)
 * 
 * Provides subtle physical vibration feedback for interactive Islamic rituals:
 * - Digital Tasbih bead counting (simulates physical wooden/clay bead clicks)
 * - Adhkar completion celebrations
 * - Reading theme and font-size adjustments
 * - Safe fallback across iOS, Android, and Desktop environments
 */

export type HapticType = 
  | 'selection'  // Ultra-subtle (10ms) — for menu selections, slider adjustments
  | 'light'      // Soft click (15ms) — for single Tasbih bead tap
  | 'medium'     // Defined click (28ms) — for chapter change or mode toggle
  | 'heavy'      // Firm click (45ms) — for reset or lap completion
  | 'success'    // Celebration pattern [15ms, pause 40ms, 25ms] — for completing a target (e.g. 33/33 or 100/100)
  | 'warning';   // Alert pattern [30ms, pause 30ms, 30ms]

export function triggerHaptic(type: HapticType = 'light'): void {
  if (typeof window === 'undefined') return;

  // 1. Native Mobile Container (Capacitor / iOS Taptic Engine / Android Native Bridge)
  const capHaptics = (window as any)?.Capacitor?.Plugins?.Haptics;
  if (capHaptics) {
    try {
      switch (type) {
        case 'selection':
          capHaptics.selectionChanged?.();
          return;
        case 'light':
          capHaptics.impact?.({ style: 'LIGHT' });
          return;
        case 'medium':
          capHaptics.impact?.({ style: 'MEDIUM' });
          return;
        case 'heavy':
        case 'success':
          capHaptics.impact?.({ style: 'HEAVY' });
          return;
        case 'warning':
          capHaptics.notification?.({ type: 'WARNING' });
          return;
      }
    } catch {
      // Fall through to Web Vibration API
    }
  }

  // 2. Check if browser/device supports Web Vibration API (Android Chrome & Desktop)
  if ('vibrate' in navigator && typeof navigator.vibrate === 'function') {
    try {
      switch (type) {
        case 'selection':
          navigator.vibrate(8);
          break;
        case 'light':
          navigator.vibrate(14);
          break;
        case 'medium':
          navigator.vibrate(26);
          break;
        case 'heavy':
          navigator.vibrate(45);
          break;
        case 'success':
          navigator.vibrate([15, 45, 25]);
          break;
        case 'warning':
          navigator.vibrate([30, 30, 30]);
          break;
      }
    } catch {
      // Gracefully ignore vibration errors on unsupported or permission-restricted devices
    }
  }
}
