// AMAL OS — Service Worker (Offline Resilience, Sacred Corpus Caching & PWA)
const CACHE_NAME = 'amal-os-cache-v3';
const AUDIO_CACHE_NAME = 'amal-os-audio-v1';

const PRECACHE_ASSETS = [
  '/',
  '/prayer',
  '/quran',
  '/wisdom',
  '/library',
  '/adhkar',
  '/sirah',
  '/tasbih',
  '/vault',
  '/family',
  '/reflections',
  '/ask',
  '/calculator',
  '/goals',
  '/journeys',
  '/decision-room',
  '/hajj',
  '/tajweed',
  '/calendar',
  '/settings',
  '/about',
  '/manifest.json',
  '/favicon.ico',
  '/icon-192.png',
  '/icon-512.png',
  '/data/quran/surahs/1.json',
  '/data/quran/surahs/18.json',
  '/data/quran/surahs/36.json',
  '/data/quran/surahs/55.json',
  '/data/quran/surahs/56.json',
  '/data/quran/surahs/67.json',
  '/data/quran/surahs/112.json',
  '/data/quran/surahs/113.json',
  '/data/quran/surahs/114.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch(() => {});
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME && key !== AUDIO_CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// 4. Background Sacred Corpus Precache Messaging
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CACHE_ALL_SURAHS') {
    event.waitUntil(
      caches.open(CACHE_NAME).then(async (cache) => {
        const total = 114;
        for (let i = 1; i <= total; i++) {
          try {
            const url = `/data/quran/surahs/${i}.json`;
            const matched = await cache.match(url);
            if (!matched) {
              const res = await fetch(url);
              if (res.ok) {
                await cache.put(url, res);
              }
            }
          } catch (e) {}
          if (event.source) {
            event.source.postMessage({ type: 'CACHE_PROGRESS', current: i, total });
          }
        }
        if (event.source) {
          event.source.postMessage({ type: 'CACHE_COMPLETE' });
        }
      })
    );
  }
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // 1. Audio Cache Strategy (Cache-First with Background Fetch for Offline Repeat Playback)
  if (
    url.pathname.endsWith('.mp3') ||
    url.hostname.includes('everyayah.com') ||
    url.hostname.includes('dawateislami.net') ||
    url.hostname.includes('islamic.network')
  ) {
    event.respondWith(
      caches.open(AUDIO_CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(event.request)
            .then((networkResponse) => {
              if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
                cache.put(event.request, networkResponse.clone());
              }
              return networkResponse;
            })
            .catch(() => cachedResponse);
        });
      })
    );
    return;
  }

  // 2. Navigation Requests (Network-first falling back to cache)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => caches.match(event.request).then((res) => res || caches.match('/')))
    );
    return;
  }

  // 3. Static Assets (Stale-while-revalidate)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
