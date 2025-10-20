const BASE_PATH = window.location.hostname.includes("github.io")
  ? "/pwa_test" // nombre exacto de tu repositorio
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


