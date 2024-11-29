const CACHE_NAME = 'todo-app-v1'
const urlsToCache = ['/', '/index.html', '/manifest.json'];


//Install service worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    )
});


//Activate service worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cachesNames) => {
            return Promise.all(
                cachesNames.map((cacheName) => {
                    if(cacheName !== CACHE_NAME){
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )
});


//Intercept petitions and serve cache
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    )
});


