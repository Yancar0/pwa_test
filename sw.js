const CACHE_NAME = "pwa2-cache-v1";
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./assets/css/style.css",
  "./assets/js/main.js",
  "./partials/header.html",
  "./partials/footer.html",
];

self.addEventListener("install", (event) => {
  console.log("Service Worker: Instalando...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cacheando archivos");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activado");
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
});

/*const cacheName = "v1";

//navigator.serviceWorker.register("./sw.js");

// Evento INSTALL → guarda en caché
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll([
        // Archivos a cachear durante la instalación
        "/",
        "./index.html",
        "./partials/header.html",
        "./partials/footer.html",
        "./assets/css/style.css",
        "./assets/js/main.js",
        "./assets/js/header.js",
        "./temas/potencias/potencias-base10.html",
      ]);
    })
  );
});


// Evento ACTIVATE → limpia caches viejas
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== cacheName).map((key) => caches.delete(key))
      );
    })
  );
});

// Evento FETCH → estrategia cache first con fallback
self.addEventListener("fetch", (event) => {
  console.log("Interceptando:", event.request.url);

  // Caso especial: cualquier .jpg responde con unicorn.jpg
  //if (/\.jpg$/.test(event.request.url)) {
  // event.respondWith(caches.match("unicorn.jpg"));
  //return;
  //}

  // Para lo demás: intenta caché primero, luego red
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
*/

