const CACHE_NAME = "kfgc-cache-v1";
const FILES_TO_CACHE = [
  "/kfgc-media-app/",
  "/kfgc-media-app/index.html",
  "/kfgc-media-app/styles.css",
  "/kfgc-media-app/script.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
