const CACHE_NAME = "v2";
const CACHE_ASSETS = [
    "favicon.ico",
    "index.html",
    "logo192.png",
    "logo512,png",
    "main.js"
]

//Call install event
this.addEventListener("install", e => {
    console.log("Service Worker: Installed");

    e.waitUntil(
        caches
        .open(CACHE_NAME)
        .then(cache => {
            console.log("Service Worker: Caching files");
            cache.addAll(CACHE_ASSETS);
        })
        .then(() => this.skipWaiting())
    );
});

//Call activate event
this.addEventListener("activate", e => {
    console.log("Service Worker: Activated");

    //Remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== CACHE_NAME){
                        console.log("Service worker: Clearing old cache");
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

//Call Fetch event
this.addEventListener("fetch", e => {
    console.log("Service Worker: Fetching");
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    );
});