/**
 * AMAL OS — Sovereign Storage Adapter
 *
 * Single source of truth for every localStorage key the app uses.
 * Import constants from here instead of hard-coding key strings in components.
 *
 * Key design:
 *  - Static keys: constants (KEYS.AUTH_USER, etc.)
 *  - Dynamic per-user keys: factory functions (userKey.uid(username), etc.)
 *  - Typed helpers: get/set with JSON (de)serialization and error handling
 */

// ---------------------------------------------------------------------------
// 1. Static Key Registry
// ---------------------------------------------------------------------------

export const KEYS = {
  // Auth
  AUTH_USER:     'amal_auth_user',
  TOKEN:         'amal_token',

  // Core data
  REFLECTIONS:   'amal_reflections',
  GOALS:         'amal_goals',
  JOURNEYS:      'amal_journeys',
  BOOKMARKS:     'amal_saved_bookmarks',

  // Preferences
  APP_LANGUAGE:  'amal_app_language',
  APP_THEME:     'amal_app_theme',
  ZK_SYNC:       'amal_zk_sync',

  // Waqf
  WAQF_SUPPORTER:'amal_waqf_supporter',
  WAQF_TIER:     'amal_waqf_tier',
} as const;

export type StaticKey = typeof KEYS[keyof typeof KEYS];

// ---------------------------------------------------------------------------
// 2. Dynamic Per-User Key Factories
// ---------------------------------------------------------------------------

export const userKey = {
  /** Stable local user ID: `amal_local_uid_<username>` */
  uid:        (username: string) => `amal_local_uid_${username}`,
  /** Persisted user profile: `amal_profile_<username>` */
  profile:    (username: string) => `amal_profile_${username}`,
  /** Local password hash: `amal_pwd_hash_<username>` */
  pwdHash:    (username: string) => `amal_pwd_hash_${username}`,
  /** Local password salt: `amal_pwd_salt_<username>` */
  pwdSalt:    (username: string) => `amal_pwd_salt_${username}`,
  /** Vault config (security mode): `amal_vault_config_<userId>` */
  vaultConfig:(userId: string)   => `amal_vault_config_${userId}`,
  /** Vault PBKDF salt: `amal_vault_salt_<userId>` */
  vaultSalt:  (userId: string)   => `amal_vault_salt_${userId}`,
  /** Today's muhasabah: `amal_muhasabah_<YYYY-MM-DD>` */
  muhasabah:  (date: string)     => `amal_muhasabah_${date}`,
} as const;

// All dynamic key prefixes — used by the purge helper
export const DYNAMIC_PREFIXES = [
  'amal_local_uid_',
  'amal_profile_',
  'amal_pwd_hash_',
  'amal_pwd_salt_',
  'amal_vault_config_',
  'amal_vault_salt_',
  'amal_muhasabah_',
] as const;

// ---------------------------------------------------------------------------
// 3. Typed Read / Write Helpers
// ---------------------------------------------------------------------------

/** Read a JSON-serialized value; returns `null` on missing key or parse error. */
export function storageGet<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

/** Write a JSON-serialized value. Silently swallows QuotaExceededError. */
export function storageSet<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // QuotaExceededError — no-op; caller should handle if critical
  }
}

/** Remove a single key. */
export function storageRemove(key: string): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(key);
}

// ---------------------------------------------------------------------------
// 4. Full Account Purge — wipes every amal_* key
// ---------------------------------------------------------------------------

/**
 * Purges all AMAL data from localStorage.
 * Covers both static keys and dynamic per-user keys by prefix scan.
 */
export function purgeAllAmalData(): void {
  if (typeof window === 'undefined') return;

  // Static keys
  Object.values(KEYS).forEach(k => localStorage.removeItem(k));

  // Dynamic keys (prefix scan)
  const allKeys = Object.keys(localStorage);
  allKeys.forEach(k => {
    if (DYNAMIC_PREFIXES.some(prefix => k.startsWith(prefix))) {
      localStorage.removeItem(k);
    }
  });
}

// ---------------------------------------------------------------------------
// 5. Web Crypto SHA-256 Hashing for Passwords & Sensitive Secrets
// ---------------------------------------------------------------------------

/**
 * Generate a random cryptographic salt.
 */
export function generateCryptoSalt(): string {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const arr = new Uint8Array(16);
    crypto.getRandomValues(arr);
    return Array.from(arr).map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
}

/**
 * Hash a string (salt + secret) using SHA-256 via Web Crypto API.
 */
export async function hashSecret(salt: string, secret: string): Promise<string> {
  if (typeof crypto === 'undefined' || !crypto.subtle) {
    throw new Error('Web Crypto API not available');
  }
  const encoder = new TextEncoder();
  const data = encoder.encode(salt + secret);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}
