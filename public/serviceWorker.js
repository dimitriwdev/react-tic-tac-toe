const CACHE_NAME = "version-1";
const urlsToCache = ["/", "/index.html"];

// add files to cache
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");

      return cache.addAll(urlsToCache);
    })
  );
});

// fetch
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request);
    })
  );
});

// delete
self.addEventListener("activate", (e) => {
  const cacheWhiteList = [];
  cacheWhiteList.push(CACHE_NAME);

  e.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhiteList.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
