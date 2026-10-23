/**
 * AMAL OS — Sovereign Storage Guard & Anti-Eviction Shield
 * 
 * Protects local user reflections, goals, and bookmarks from browser cache eviction
 * (specifically iOS Safari 7-day ITP cache clearance and Android low-storage pruning).
 */

export interface StorageHealthInfo {
  isPersisted: boolean;
  usageBytes: number;
  quotaBytes: number;
  daysSinceLastBackup: number | null;
  shouldPromptBackup: boolean;
}

/**
 * Requests persistent storage from the browser to prevent automatic cache clearance
 */
export async function enablePersistentStorage(): Promise<boolean> {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;

  try {
    if (navigator.storage && navigator.storage.persist) {
      const isPersisted = await navigator.storage.persist();
      if (isPersisted) {
        localStorage.setItem('amal_storage_persisted', 'true');
      }
      return isPersisted;
    }
  } catch (e) {
    console.warn('Storage persistence request error:', e);
  }
  return false;
}

/**
 * Checks storage health and evaluates whether a backup prompt is needed
 */
export async function checkStorageHealth(): Promise<StorageHealthInfo> {
  let isPersisted = false;
  let usageBytes = 0;
  let quotaBytes = 0;

  if (typeof window !== 'undefined' && typeof navigator !== 'undefined' && navigator.storage) {
    try {
      if (navigator.storage.persisted) {
        isPersisted = await navigator.storage.persisted();
      }
      if (navigator.storage.estimate) {
        const est = await navigator.storage.estimate();
        usageBytes = est.usage || 0;
        quotaBytes = est.quota || 0;
      }
    } catch {}
  }

  // Evaluate backup freshness
  let daysSinceLastBackup: number | null = null;
  let shouldPromptBackup = false;

  if (typeof window !== 'undefined' && window.localStorage) {
    const lastBackupStr = localStorage.getItem('amal_last_backup_export_time');
    const hasUserData = Boolean(
      localStorage.getItem('amal_notes') ||
      localStorage.getItem('amal_user_goals') ||
      localStorage.getItem('amal_bookmarks') ||
      localStorage.getItem('amal_reflections_history')
    );

    if (hasUserData) {
      if (lastBackupStr) {
        const lastTime = parseInt(lastBackupStr, 10);
        const diffMs = Date.now() - lastTime;
        daysSinceLastBackup = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        if (daysSinceLastBackup >= 7) {
          shouldPromptBackup = true;
        }
      } else {
        // User has data but has never exported a backup
        shouldPromptBackup = true;
      }
    }
  }

  return {
    isPersisted,
    usageBytes,
    quotaBytes,
    daysSinceLastBackup,
    shouldPromptBackup,
  };
}

/**
 * Records that the user successfully exported an encrypted backup file
 */
export function recordSuccessfulBackup(): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem('amal_last_backup_export_time', String(Date.now()));
  }
}
