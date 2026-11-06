// FutPlan Service Worker
const CACHE = 'futplan-v1';
const ASSETS = [
  '/futplan/',
  '/futplan/index.html',
  '/futplan/manifest.json',
  '/futplan/icons/icon-192.png',
  '/futplan/icons/icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Supabase API: sempre rede
  if (e.request.url.includes('supabase.co')) return;
  // CDN fonts/scripts: network-first com fallback cache
  if (e.request.url.includes('googleapis') || e.request.url.includes('jsdelivr') || e.request.url.includes('gstatic')) {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
    return;
  }
  // App shell: cache-first
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(res => {
      const clone = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, clone));
      return res;
    }))
  );
});
