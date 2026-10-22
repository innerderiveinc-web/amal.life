/**
 * AMAL OS — DATABASE PERSISTENCE ADAPTER
 * Provides zero-dependency durable snapshot serialization and file persistence
 * for offline and standalone execution without requiring an external PostgreSQL instance.
 * Webpack/Browser safe: avoids static node protocol imports that break client-side bundlers.
 */

import type { InMemoryAmalDatabase } from './index.js';

export interface AmalDatabaseSnapshot {
  version: number;
  exportedAt: string;
  data: {
    users: [string, any][];
    credentials: [string, any][];
    profiles: [string, any][];
    preferences: [string, any][];
    consents: [string, any][];
    contexts: [string, any][];
    memories: [string, any][];
    journeys: [string, any][];
    goals: [string, any][];
    amals: [string, any][];
    reflections: [string, any][];
    prayers: [string, any][];
    families: [string, any][];
    familyMembers: [string, any][];
    scholarCases: [string, any][];
    caseMessages: [string, any][];
    auditLogs: any[];
  };
}

const SNAPSHOT_VERSION = 1;

/**
 * Safely resolves Node.js fs and path without triggering Webpack client-side bundle errors
 */
function getNodeModules(): { fs: any; path: any } | null {
  if (typeof process === 'undefined' || !process.versions?.node) {
    return null;
  }
  try {
    // eval('require') protects Webpack from bundling Node-only builtins into client bundles
    const req = typeof (globalThis as any).__non_webpack_require__ === 'function'
      ? (globalThis as any).__non_webpack_require__
      : eval('require');
    return {
      fs: req('fs/promises'),
      path: req('path'),
    };
  } catch {
    return null;
  }
}

/**
 * Returns default path for local snapshot storage when running in Node.js
 */
export function getDefaultSnapshotPath(): string | null {
  const nodeMods = getNodeModules();
  if (!nodeMods) {
    return null;
  }
  if (process.env.AMAL_STORAGE_PATH) {
    return process.env.AMAL_STORAGE_PATH;
  }
  try {
    const cwd = process.cwd();
    return nodeMods.path.join(cwd, '.amal-data', 'amal-db.json');
  } catch {
    return null;
  }
}

/**
 * Serializes the mutable state of InMemoryAmalDatabase into a JSON-compatible object
 */
export function exportSnapshot(database: InMemoryAmalDatabase): AmalDatabaseSnapshot {
  return {
    version: SNAPSHOT_VERSION,
    exportedAt: new Date().toISOString(),
    data: {
      users: Array.from(database.users.entries()),
      credentials: Array.from(database.credentials.entries()),
      profiles: Array.from(database.profiles.entries()),
      preferences: Array.from(database.preferences.entries()),
      consents: Array.from(database.consents.entries()),
      contexts: Array.from(database.contexts.entries()),
      memories: Array.from(database.memories.entries()),
      journeys: Array.from(database.journeys.entries()),
      goals: Array.from(database.goals.entries()),
      amals: Array.from(database.amals.entries()),
      reflections: Array.from(database.reflections.entries()),
      prayers: Array.from(database.prayers.entries()),
      families: Array.from(database.families.entries()),
      familyMembers: Array.from(database.familyMembers.entries()),
      scholarCases: Array.from(database.scholarCases.entries()),
      caseMessages: Array.from(database.caseMessages.entries()),
      auditLogs: [...database.auditLogs],
    },
  };
}

/**
 * Rehydrates an InMemoryAmalDatabase with data from a snapshot
 */
export function importSnapshot(database: InMemoryAmalDatabase, snapshot: AmalDatabaseSnapshot): void {
  if (!snapshot || !snapshot.data) return;

  const d = snapshot.data;
  if (d.users) database.users = new Map(d.users);
  if (d.credentials) database.credentials = new Map(d.credentials);
  if (d.profiles) database.profiles = new Map(d.profiles);
  if (d.preferences) database.preferences = new Map(d.preferences);
  if (d.consents) database.consents = new Map(d.consents);
  if (d.contexts) database.contexts = new Map(d.contexts);
  if (d.memories) database.memories = new Map(d.memories);
  if (d.journeys) database.journeys = new Map(d.journeys);
  if (d.goals) database.goals = new Map(d.goals);
  if (d.amals) database.amals = new Map(d.amals);
  if (d.reflections) database.reflections = new Map(d.reflections);
  if (d.prayers) database.prayers = new Map(d.prayers);
  if (d.families) database.families = new Map(d.families);
  if (d.familyMembers) database.familyMembers = new Map(d.familyMembers);
  if (d.scholarCases) database.scholarCases = new Map(d.scholarCases);
  if (d.caseMessages) database.caseMessages = new Map(d.caseMessages);
  if (d.auditLogs && Array.isArray(d.auditLogs)) database.auditLogs = [...d.auditLogs];
}

/**
 * Saves snapshot to disk in Node.js environments
 */
export async function saveSnapshotToFile(
  database: InMemoryAmalDatabase,
  targetPath?: string
): Promise<string | null> {
  const filePath = targetPath || getDefaultSnapshotPath();
  if (!filePath) return null;

  const nodeMods = getNodeModules();
  if (!nodeMods) return null;

  try {
    const dir = nodeMods.path.dirname(filePath);
    await nodeMods.fs.mkdir(dir, { recursive: true });

    const snapshot = exportSnapshot(database);
    await nodeMods.fs.writeFile(filePath, JSON.stringify(snapshot, null, 2), 'utf-8');
    return filePath;
  } catch (err) {
    console.warn(`[Amal Database] Failed to write persistent snapshot to ${filePath}:`, err);
    return null;
  }
}

/**
 * Loads snapshot from disk in Node.js environments
 */
export async function loadSnapshotFromFile(
  database: InMemoryAmalDatabase,
  targetPath?: string
): Promise<boolean> {
  const filePath = targetPath || getDefaultSnapshotPath();
  if (!filePath) return false;

  const nodeMods = getNodeModules();
  if (!nodeMods) return false;

  try {
    const content = await nodeMods.fs.readFile(filePath, 'utf-8');
    const snapshot = JSON.parse(content) as AmalDatabaseSnapshot;
    importSnapshot(database, snapshot);
    return true;
  } catch {
    return false;
  }
}
