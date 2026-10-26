/**
 * AMAL OS — Offline Audio Cache & Airplane Mode Engine
 * 
 * Uses HTML5 CacheStorage API and IndexedDB metadata to allow users to download
 * and play Holy Quran recitations, Shama'il lessons, and Sirah audiobooks
 * completely offline with zero internet connectivity and zero cellular data usage.
 */

export interface CachedAudioMeta {
  url: string;
  title: string;
  subtitle?: string;
  reciter?: string;
  fileSizeBytes: number;
  cachedAtIso: string;
  eraOrCategory?: string;
}

const CACHE_NAME = 'amal-audio-v1';
const MANIFEST_KEY = 'amal_offline_audio_manifest_v1';

class OfflineAudioCacheService {
  private memoryManifest: Map<string, CachedAudioMeta> = new Map();
  private isInitialized = false;

  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'caches' in window;
  }

  private initManifest(): void {
    if (this.isInitialized || typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(MANIFEST_KEY);
      if (stored) {
        const parsed: CachedAudioMeta[] = JSON.parse(stored);
        parsed.forEach((item) => this.memoryManifest.set(item.url, item));
      }
      this.isInitialized = true;
    } catch (e) {
      console.warn('Failed to parse offline audio manifest from localStorage', e);
    }
  }

  private saveManifest(): void {
    if (typeof window === 'undefined') return;
    try {
      const array = Array.from(this.memoryManifest.values());
      localStorage.setItem(MANIFEST_KEY, JSON.stringify(array));
    } catch (e) {
      console.warn('Failed to save offline audio manifest', e);
    }
  }

  /**
   * Check if an audio URL is cached locally
   */
  public async isCached(url: string): Promise<boolean> {
    if (!this.isSupported()) return false;
    this.initManifest();
    if (this.memoryManifest.has(url)) return true;

    try {
      const cache = await caches.open(CACHE_NAME);
      const match = await cache.match(url);
      if (match) {
        // Re-sync memory manifest if cache has it
        if (!this.memoryManifest.has(url)) {
          const size = Number(match.headers.get('content-length')) || 0;
          this.memoryManifest.set(url, {
            url,
            title: 'Cached Audio Track',
            fileSizeBytes: size,
            cachedAtIso: new Date().toISOString(),
          });
          this.saveManifest();
        }
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Synchronous check against in-memory manifest for instant UI rendering
   */
  public isCachedSync(url: string): boolean {
    this.initManifest();
    return this.memoryManifest.has(url);
  }

  /**
   * Downloads and caches an audio track into CacheStorage
   */
  public async downloadTrack(
    url: string,
    title: string,
    meta?: Partial<CachedAudioMeta>,
    onProgress?: (percent: number) => void
  ): Promise<boolean> {
    if (!this.isSupported()) {
      throw new Error('Offline CacheStorage is not supported in this browser.');
    }
    this.initManifest();

    try {
      if (onProgress) onProgress(10);
      const response = await fetch(url, { mode: 'cors' });
      if (!response.ok) {
        throw new Error(`Failed to fetch audio stream. HTTP ${response.status}`);
      }

      if (onProgress) onProgress(50);
      const blob = await response.blob();
      const fileSizeBytes = blob.size;

      const cacheResponse = new Response(blob, {
        status: 200,
        statusText: 'OK',
        headers: {
          'Content-Type': 'audio/mpeg',
          'Content-Length': String(fileSizeBytes),
          'Accept-Ranges': 'bytes',
          'X-Amal-Cached-At': new Date().toISOString(),
        },
      });

      const cache = await caches.open(CACHE_NAME);
      await cache.put(url, cacheResponse);

      const entry: CachedAudioMeta = {
        url,
        title,
        subtitle: meta?.subtitle,
        reciter: meta?.reciter,
        eraOrCategory: meta?.eraOrCategory,
        fileSizeBytes,
        cachedAtIso: new Date().toISOString(),
      };

      this.memoryManifest.set(url, entry);
      this.saveManifest();

      if (onProgress) onProgress(100);
      return true;
    } catch (err) {
      console.error('Error downloading audio track to cache:', err);
      throw err;
    }
  }

  /**
   * Retrieves a cached local blob URL or original URL
   */
  public async getPlaybackUrl(url: string): Promise<string> {
    if (!this.isSupported()) return url;

    try {
      const cache = await caches.open(CACHE_NAME);
      const match = await cache.match(url);
      if (match) {
        const blob = await match.blob();
        return URL.createObjectURL(blob);
      }
      return url;
    } catch {
      return url;
    }
  }

  /**
   * Removes a track from local cache
   */
  public async removeTrack(url: string): Promise<boolean> {
    if (!this.isSupported()) return false;
    this.initManifest();

    try {
      const cache = await caches.open(CACHE_NAME);
      await cache.delete(url);
      this.memoryManifest.delete(url);
      this.saveManifest();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get all cached tracks manifest
   */
  public getCachedManifest(): CachedAudioMeta[] {
    this.initManifest();
    return Array.from(this.memoryManifest.values());
  }

  /**
   * Total offline audio storage in megabytes
   */
  public getTotalStorageMb(): number {
    this.initManifest();
    const totalBytes = Array.from(this.memoryManifest.values()).reduce(
      (sum, item) => sum + (item.fileSizeBytes || 0),
      0
    );
    return Math.round((totalBytes / (1024 * 1024)) * 10) / 10;
  }
}

export const offlineAudioCache = new OfflineAudioCacheService();
