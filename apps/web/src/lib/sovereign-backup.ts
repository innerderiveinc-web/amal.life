/**
 * AMAL OS Sovereign Local Backup & Restore Engine
 * 100% Client-side. Zero cloud transfer. Absolute data privacy.
 * Supports both unencrypted JSON and Web Crypto PBKDF2 + AES-GCM-256 encrypted backups.
 */

export interface SovereignBackupPayload {
  app: 'AMAL OS';
  version: string;
  schemaVersion: '1.0';
  exportedAt: string;
  entryCount: number;
  data: Record<string, string>;
}

export interface SovereignEncryptedBackupPayload {
  app: 'AMAL OS';
  version: string;
  schemaVersion: '2.0-encrypted';
  exportedAt: string;
  entryCount: number;
  saltHex: string;
  ivHex: string;
  ciphertextHex: string;
}

// Helper: Convert Uint8Array to hex
function bufToHex(buf: Uint8Array): string {
  return Array.from(buf).map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Helper: Convert hex to Uint8Array
function hexToBuf(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return bytes;
}

// Derive AES-GCM key from user passphrase using PBKDF2 (100,000 iterations of SHA-256)
async function deriveKeyFromPassphrase(passphrase: string, salt: Uint8Array): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const baseKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(passphrase),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt as unknown as BufferSource,
      iterations: 100000,
      hash: 'SHA-256',
    },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

function collectAmalBackupData(): Record<string, string> {
  const backupData: Record<string, string> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.startsWith('amal_') || key.startsWith('sakinah_') || key.startsWith('theme_') || key.startsWith('lang_'))) {
      const value = localStorage.getItem(key);
      if (value !== null) {
        backupData[key] = value;
      }
    }
  }
  return backupData;
}

function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Exports all AMAL OS user data from localStorage into a downloadable JSON file.
 */
export function exportSovereignBackup(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const backupData = collectAmalBackupData();
    const payload: SovereignBackupPayload = {
      app: 'AMAL OS',
      version: '1.0.0',
      schemaVersion: '1.0',
      exportedAt: new Date().toISOString(),
      entryCount: Object.keys(backupData).length,
      data: backupData,
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const dateStr = new Date().toISOString().split('T')[0];
    triggerDownload(blob, `amal-os-sovereign-backup-${dateStr}.json`);
    return true;
  } catch (error) {
    console.error('Failed to export sovereign backup:', error);
    return false;
  }
}

/**
 * Exports all AMAL OS data encrypted with AES-GCM 256 using PBKDF2 key derivation.
 */
export async function exportEncryptedSovereignBackup(passphrase: string): Promise<boolean> {
  if (typeof window === 'undefined' || !passphrase) return false;

  try {
    const backupData = collectAmalBackupData();
    const rawPayload = JSON.stringify({
      app: 'AMAL OS',
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      entryCount: Object.keys(backupData).length,
      data: backupData,
    });

    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await deriveKeyFromPassphrase(passphrase, salt);

    const encoder = new TextEncoder();
    const ciphertext = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: iv as unknown as BufferSource },
      key,
      encoder.encode(rawPayload)
    );

    const payload: SovereignEncryptedBackupPayload = {
      app: 'AMAL OS',
      version: '1.0.0',
      schemaVersion: '2.0-encrypted',
      exportedAt: new Date().toISOString(),
      entryCount: Object.keys(backupData).length,
      saltHex: bufToHex(salt),
      ivHex: bufToHex(iv),
      ciphertextHex: bufToHex(new Uint8Array(ciphertext)),
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const dateStr = new Date().toISOString().split('T')[0];
    triggerDownload(blob, `amal-os-encrypted-vault-backup-${dateStr}.amalvault`);
    return true;
  } catch (error) {
    console.error('Failed to export encrypted sovereign backup:', error);
    return false;
  }
}

/**
 * Imports and restores AMAL OS user data from either plaintext v1 or AES-GCM encrypted v2 backup.
 */
export async function restoreSovereignBackup(
  file: File,
  passphrase?: string
): Promise<{ success: boolean; restoredCount: number; error?: string; requiresPassphrase?: boolean }> {
  if (typeof window === 'undefined') {
    return { success: false, restoredCount: 0, error: 'Window not available' };
  }

  try {
    const text = await file.text();
    const parsed = JSON.parse(text);

    if (!parsed || parsed.app !== 'AMAL OS') {
      return { success: false, restoredCount: 0, error: 'Invalid AMAL OS backup format' };
    }

    let records: Record<string, string> = {};

    if (parsed.schemaVersion === '2.0-encrypted') {
      if (!passphrase) {
        return { success: false, restoredCount: 0, error: 'Passphrase required for encrypted backup', requiresPassphrase: true };
      }

      try {
        const salt = hexToBuf(parsed.saltHex);
        const iv = hexToBuf(parsed.ivHex);
        const ciphertext = hexToBuf(parsed.ciphertextHex);
        const key = await deriveKeyFromPassphrase(passphrase, salt);

        const decrypted = await crypto.subtle.decrypt(
          { name: 'AES-GCM', iv: iv as unknown as BufferSource },
          key,
          ciphertext as unknown as BufferSource
        );

        const decryptedText = new TextDecoder().decode(decrypted);
        const decryptedPayload = JSON.parse(decryptedText);
        records = decryptedPayload.data || {};
      } catch {
        return { success: false, restoredCount: 0, error: 'Decryption failed: Incorrect passphrase or corrupt file' };
      }
    } else if (parsed.schemaVersion === '1.0' && parsed.data) {
      records = parsed.data;
    } else {
      return { success: false, restoredCount: 0, error: 'Unsupported backup schema version' };
    }

    let count = 0;
    for (const [key, val] of Object.entries(records)) {
      if (typeof val === 'string') {
        localStorage.setItem(key, val);
        count++;
      }
    }

    return { success: true, restoredCount: count };
  } catch (err: any) {
    return { success: false, restoredCount: 0, error: err?.message || 'Parse error' };
  }
}
