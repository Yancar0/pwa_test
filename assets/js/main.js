import { loadHeader, loadFooter } from "./header.js";
// ./assets/js/main.js
loadHeader();
loadFooter();

const BASE_PATH = window.location.hostname.includes("github.io")
  ? "/pwa_test" // nombre exacto del repositorio
  : ""; // en local (XAMPP)

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register(`${BASE_PATH}/sw.js`)
    .then((registration) => {
      console.log("ServiceWorker registrado con scope:", registration.scope);
    })
    .catch((err) => {
      console.error("Fallo al registrar ServiceWorker:", err);
    });
}