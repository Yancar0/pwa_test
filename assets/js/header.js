const BASE_PATH = window.location.hostname.includes("github.io")
  ? "/pwa_test" // 👈 nombre exacto de tu repositorio
  : ""; // en local (XAMPP)

export async function loadHeader() {
  const header = document.getElementById("header");
  const response = await fetch(`${BASE_PATH}/partials/header.html`);
  header.innerHTML = await response.text();
}

export async function loadFooter() {
  const footer = document.getElementById("footer");
  const response = await fetch(`${BASE_PATH}/partials/footer.html`);
  footer.innerHTML = await response.text();
}

/*export async function loadHeader() {
  const res = await fetch("../../partials/header.html"); // 🔧 ruta relativa al proyecto
  const html = await res.text();
  document.getElementById("header").innerHTML = html;
}

export async function loadFooter() {
  const res = await fetch("../../partials/footer.html"); // 🔧 igual aquí
  const html = await res.text();
  document.getElementById("footer").innerHTML = html;
}*/

/*export async function loadHeader() {
  const res = await fetch ("../../partials/header.html");
  document.getElementById("header").innerHTML = await res.text();
}

export async function loadFooter() {
  const res = await fetch ("../../partials/footer.html");
  document.getElementById("footer").innerHTML = await res.text();
}*/
