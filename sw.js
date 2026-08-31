/* WELL AP Reviewer — offline service worker.
   BUMP CACHE_NAME on every deploy or returning devices keep the stale build. */
const CACHE_NAME = 'wellap-v10';

const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png",
  "./fonts/plex.css",
  "./fonts/v20--F63fjptAgt5VM-kVkqdyU8n1i8q1w.woff2",
  "./fonts/v20--F63fjptAgt5VM-kVkqdyU8n1iEq129k.woff2",
  "./fonts/v20--F6qfjptAgt5VM-kVkqdyU8n3vAOwl5FgtIU.woff2",
  "./fonts/v20--F6qfjptAgt5VM-kVkqdyU8n3vAOwlBFgg.woff2",
  "./fonts/v20-jizAREVNn1dOx-zrZ2X3pZvkTi3A_yI0q1s.woff2",
  "./fonts/v20-jizAREVNn1dOx-zrZ2X3pZvkTi3A_yI6q1vxiQ.woff2",
  "./fonts/v23-zYXzKVElMYYaJe8bpLHnCwDKr932-G7dytD-Dmu1syxQKYbABA.woff2",
  "./fonts/v23-zYXzKVElMYYaJe8bpLHnCwDKr932-G7dytD-Dmu1syxeKYY.woff2"
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME)
    .then(c => c.addAll(ASSETS))
    .then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

/* Cache-first for our own assets; network only as a fallback. The app is a
   single static bundle, so a cache hit is always the whole app. */
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (new URL(e.request.url).origin !== self.location.origin) return;
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      if (res && res.status === 200 && res.type === 'basic') {
        const copy = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, copy));
      }
      return res;
    }).catch(() => caches.match('./index.html')))
  );
});
