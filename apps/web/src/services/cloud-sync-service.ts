/**
 * AMAL OS — Real-Time Cloud Sync Bridge
 * Synchronizes local device state (tasbih counts, bookmarks, reflections, prayer preferences)
 * with the Amal Backend API session across web, desktop, and mobile clients.
 *
 * Architecture:
 * - Local-First: Immediate UI responsiveness with zero network latency.
 * - Debounced Auto-Push: Changes are batched and synced in the background.
 * - Auto-Rehydration: Pulls remote state upon user login to sync across devices.
 * - Sovereignty: Operates purely on-device if user is in guest/local mode.
 */

import { AmalApiClient } from '../lib/api';

export type SyncStatus = 'SYNCED' | 'SYNCING' | 'LOCAL_ONLY' | 'OFFLINE';

export interface SyncPayload {
  tasbih?: {
    count?: number;
    target?: number;
    phrase?: string;
  };
  adhkarCounts?: Record<string, number>;
  bookmarks?: any[];
  wisdomBookmarks?: any[];
  lastReadQuran?: any;
  lastReadLibrary?: any;
  reflections?: any[];
  prayerPreferences?: {
    location?: any;
    madhhab?: string;
    calcMethod?: string;
    prayerOffsets?: any;
    hijriOffset?: number;
  };
  appLanguage?: string;
  syncedAt?: string;
}

export interface SyncState {
  status: SyncStatus;
  lastSyncedAt: string | null;
  pendingChanges: boolean;
  version: number;
}

class CloudSyncService {
  private syncTimer: any = null;
  private currentState: SyncState = {
    status: 'LOCAL_ONLY',
    lastSyncedAt: null,
    pendingChanges: false,
    version: 0,
  };
  private listeners: Set<(state: SyncState) => void> = new Set();
  private isInitialized = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  private init() {
    if (this.isInitialized || typeof window === 'undefined') return;
    this.isInitialized = true;

    // Check saved sync timestamp
    const savedLastSync = localStorage.getItem('amal_last_cloud_sync');
    if (savedLastSync) {
      this.currentState.lastSyncedAt = savedLastSync;
      this.currentState.status = 'SYNCED';
    }

    // Listen to local domain events
    window.addEventListener('amal_bookmarks_updated', () => this.scheduleSync());
    window.addEventListener('amal_prayer_settings_changed', () => this.scheduleSync());
    window.addEventListener('amal_tasbih_updated', () => this.scheduleSync());
    window.addEventListener('amal_adhkar_updated', () => this.scheduleSync());
    window.addEventListener('amal_auth_changed', () => this.handleAuthChange());
    window.addEventListener('online', () => this.handleNetworkChange(true));
    window.addEventListener('offline', () => this.handleNetworkChange(false));
  }

  public subscribe(cb: (state: SyncState) => void): () => void {
    this.listeners.add(cb);
    cb(this.currentState);
    return () => this.listeners.delete(cb);
  }

  private notify() {
    for (const cb of this.listeners) {
      try {
        cb(this.currentState);
      } catch (e) {
        console.error('[CloudSync] Listener error', e);
      }
    }
  }

  public getStatus(): SyncState {
    return { ...this.currentState };
  }

  private handleNetworkChange(isOnline: boolean) {
    if (!isOnline) {
      this.currentState.status = 'OFFLINE';
      this.notify();
    } else {
      const token = AmalApiClient.getAuthToken();
      this.currentState.status = token ? 'SYNCED' : 'LOCAL_ONLY';
      this.notify();
      if (token && this.currentState.pendingChanges) {
        this.pushSync();
      }
    }
  }

  private handleAuthChange() {
    const token = AmalApiClient.getAuthToken();
    if (token) {
      this.pullSync().then(() => this.pushSync());
    } else {
      this.currentState.status = 'LOCAL_ONLY';
      this.notify();
    }
  }

  /**
   * Gathers all local device state across domains into a unified payload
   */
  public gatherLocalState(): SyncPayload {
    if (typeof window === 'undefined') return {};

    const payload: SyncPayload = {};

    try {
      // 1. Bookmarks
      const bm = localStorage.getItem('amal_saved_bookmarks');
      if (bm) payload.bookmarks = JSON.parse(bm);

      const wbm = localStorage.getItem('amal_quran_wisdom_bookmarks');
      if (wbm) payload.wisdomBookmarks = JSON.parse(wbm);

      // 2. Reading Progress
      const lrq = localStorage.getItem('amal_last_read_quran');
      if (lrq) payload.lastReadQuran = JSON.parse(lrq);

      const lrl = localStorage.getItem('amal_last_read_library');
      if (lrl) payload.lastReadLibrary = JSON.parse(lrl);

      // 3. Reflections
      const ref = localStorage.getItem('amal_reflections');
      if (ref) payload.reflections = JSON.parse(ref);

      // 4. Prayer Preferences
      const loc = localStorage.getItem('amal_user_location');
      const madhhab = localStorage.getItem('amal_user_madhhab');
      const method = localStorage.getItem('amal_user_method') || localStorage.getItem('amal_user_calc_method');
      const offsets = localStorage.getItem('amal_user_prayer_offsets');
      const hijri = localStorage.getItem('amal_user_hijri_offset');

      payload.prayerPreferences = {
        location: loc ? JSON.parse(loc) : undefined,
        madhhab: madhhab || undefined,
        calcMethod: method || undefined,
        prayerOffsets: offsets ? JSON.parse(offsets) : undefined,
        hijriOffset: hijri ? Number(hijri) : undefined,
      };

      // 5. Language
      const lang = localStorage.getItem('amal_app_language');
      if (lang) payload.appLanguage = lang;
    } catch (e) {
      console.warn('[CloudSync] Error gathering local state', e);
    }

    return payload;
  }

  /**
   * Schedule a debounced push (2.5s window) to avoid overwhelming the network
   */
  public scheduleSync(delayMs = 2500) {
    if (typeof window === 'undefined') return;

    const token = AmalApiClient.getAuthToken();
    if (!token) {
      this.currentState.status = 'LOCAL_ONLY';
      this.notify();
      return;
    }

    this.currentState.pendingChanges = true;
    if (this.syncTimer) clearTimeout(this.syncTimer);

    this.syncTimer = setTimeout(() => {
      this.pushSync();
    }, delayMs);
  }

  /**
   * Push local state to cloud session
   */
  public async pushSync(): Promise<boolean> {
    if (typeof window === 'undefined') return false;

    const token = AmalApiClient.getAuthToken();
    if (!token) {
      this.currentState.status = 'LOCAL_ONLY';
      this.notify();
      return false;
    }

    if (!navigator.onLine) {
      this.currentState.status = 'OFFLINE';
      this.notify();
      return false;
    }

    this.currentState.status = 'SYNCING';
    this.notify();

    try {
      const payload = this.gatherLocalState();
      const res = await AmalApiClient.request<{ syncedAt: string; version: number }>(
        '/users/sync',
        'POST',
        payload
      );

      if (res && res.success) {
        const timestamp = res.data?.syncedAt || new Date().toISOString();
        this.currentState.status = 'SYNCED';
        this.currentState.lastSyncedAt = timestamp;
        this.currentState.pendingChanges = false;
        this.currentState.version = res.data?.version || this.currentState.version + 1;
        localStorage.setItem('amal_last_cloud_sync', timestamp);
        this.notify();
        return true;
      } else {
        this.currentState.status = 'LOCAL_ONLY';
        this.notify();
        return false;
      }
    } catch (e) {
      console.error('[CloudSync] Failed to push state', e);
      this.currentState.status = navigator.onLine ? 'LOCAL_ONLY' : 'OFFLINE';
      this.notify();
      return false;
    }
  }

  /**
   * Pull remote state from cloud and hydrate local storage
   */
  public async pullSync(): Promise<boolean> {
    if (typeof window === 'undefined') return false;

    const token = AmalApiClient.getAuthToken();
    if (!token || !navigator.onLine) return false;

    this.currentState.status = 'SYNCING';
    this.notify();

    try {
      const res = await AmalApiClient.request<{ data: SyncPayload; version: number; syncedAt: string }>(
        '/users/sync',
        'GET'
      );

      if (res && res.success && res.data?.data) {
        const remoteData = res.data.data;

        // Merge Bookmarks
        if (remoteData.bookmarks && Array.isArray(remoteData.bookmarks)) {
          localStorage.setItem('amal_saved_bookmarks', JSON.stringify(remoteData.bookmarks));
          window.dispatchEvent(new CustomEvent('amal_bookmarks_updated'));
        }

        if (remoteData.wisdomBookmarks && Array.isArray(remoteData.wisdomBookmarks)) {
          localStorage.setItem('amal_quran_wisdom_bookmarks', JSON.stringify(remoteData.wisdomBookmarks));
        }

        // Merge Reading Progress
        if (remoteData.lastReadQuran) {
          localStorage.setItem('amal_last_read_quran', JSON.stringify(remoteData.lastReadQuran));
        }
        if (remoteData.lastReadLibrary) {
          localStorage.setItem('amal_last_read_library', JSON.stringify(remoteData.lastReadLibrary));
        }

        // Merge Reflections
        if (remoteData.reflections && Array.isArray(remoteData.reflections)) {
          localStorage.setItem('amal_reflections', JSON.stringify(remoteData.reflections));
        }

        // Merge Prayer Preferences
        if (remoteData.prayerPreferences) {
          const pp = remoteData.prayerPreferences;
          if (pp.location) localStorage.setItem('amal_user_location', JSON.stringify(pp.location));
          if (pp.madhhab) localStorage.setItem('amal_user_madhhab', pp.madhhab);
          if (pp.calcMethod) {
            localStorage.setItem('amal_user_method', pp.calcMethod);
            localStorage.setItem('amal_user_calc_method', pp.calcMethod);
          }
          if (pp.prayerOffsets) localStorage.setItem('amal_user_prayer_offsets', JSON.stringify(pp.prayerOffsets));
          if (pp.hijriOffset !== undefined) localStorage.setItem('amal_user_hijri_offset', String(pp.hijriOffset));
          window.dispatchEvent(new CustomEvent('amal_prayer_settings_changed'));
        }

        // Merge Language
        if (remoteData.appLanguage) {
          localStorage.setItem('amal_app_language', remoteData.appLanguage);
        }

        const timestamp = res.data.syncedAt || new Date().toISOString();
        this.currentState.status = 'SYNCED';
        this.currentState.lastSyncedAt = timestamp;
        this.currentState.pendingChanges = false;
        this.currentState.version = res.data.version || 1;
        localStorage.setItem('amal_last_cloud_sync', timestamp);
        this.notify();
        return true;
      }
    } catch (e) {
      console.warn('[CloudSync] Pull error', e);
    }

    this.currentState.status = navigator.onLine ? 'SYNCED' : 'OFFLINE';
    this.notify();
    return false;
  }
}

export const cloudSyncService = new CloudSyncService();
