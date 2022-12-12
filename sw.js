const STATIC_CACHE = "static-v1";

const APP_SHELL = [
  "/",
  "index.html",
  "/Juegos.html",
  "/crud.html",
  "css/styles.css",
  "js/main.js",
  "js/crud.js",
  "images/km.png",
];

self.addEventListener("install", (e) => {
  const cacheStatic = caches
    .open(STATIC_CACHE)
    .then((cache) => cache.addAll(APP_SHELL));

  e.waitUntil(cacheStatic);
});

self.addEventListener("fetch", (e) => {
  console.log("fetch! ", e.request);
  e.respondWith(
    caches
      .match(e.request)
      .then((res) => {
        return res || fetch(e.request);
      })
      .catch(console.log)
  );
});