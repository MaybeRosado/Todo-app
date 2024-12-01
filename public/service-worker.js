const CACHE_NAME = 'todo-app-v1'
const URLS_TO_CACHE = [
    '/',
    '/index.html',
    '/manifest.json',
    '/list-svgrepo-com.svg',
    '/service-worker.js',
    '/index.css',
];


//Install service worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(URLS_TO_CACHE);
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


