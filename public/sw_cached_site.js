const CACHE_NAME = "v3";

//Call install event
this.addEventListener("install", e => {
    console.log("Service Worker: Installed");
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
        fetch(e.request)
        .then(res => {
            //Make copy/clone of response
            const resClone = res.clone();
            //Open cache
            caches
            .open(CACHE_NAME)
            .then(cache => {
                //Add response to cache
                cache.put(e.request, resClone);
            });
            return res;
        }).catch(err => caches.match(e.request).then(res => res))
    );
});