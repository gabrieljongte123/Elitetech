const CACHE_NAME = 'gabriel-pwa-v1';
const urlsToCache = [
  'Start.html',
  'start.css',
  'f35.jpg',
  'watch.jpg',
  'monitor.jpg',
  'speaker.jpg',
  'gab.jpg',
  'gab1.jpg'
];

// Install event — cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('📦 Caching app shell');
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate event — cleanup old caches (optional for now)
self.addEventListener('activate', (event) => {
  console.log('⚡ Service Worker activated');
});

// Fetch event — serve from cache if offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://your-site-or-product-page.com')
  );
});