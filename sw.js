const CACHE_NAME = 'futplan-v4';
const APP_SHELL = [
  'https://josecdfonseca-prog.github.io/futplan/',
  'https://josecdfonseca-prog.github.io/futplan/index.html',
  'https://josecdfonseca-prog.github.io/futplan/manifest.json',
  'https://josecdfonseca-prog.github.io/futplan/icons/icon-192.png',
  'https://josecdfonseca-prog.github.io/futplan/icons/icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(c => c.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // Supabase: sempre rede
  if (url.hostname.includes('supabase.co') || url.hostname.includes('supabase.io')) {
    e.respondWith(fetch(e.request));
    return;
  }
  // cdn.jsdelivr.net: sempre rede
  if (url.hostname.includes('jsdelivr.net')) {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
    return;
  }
  // App shell: cache-first
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(res => {
      if (res.ok) {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
      }
      return res;
    }))
  );
});
