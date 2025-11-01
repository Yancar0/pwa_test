const BASE_PATH = window.location.hostname.includes("github.io")
  ? "/pwa_test"
  : "";

export async function loadHeader() {
  const header = document.getElementById("header");
  if (!header) {
    console.warn("Elemento #header no encontrado, omitiendo carga.");
    return;
  }
  const response = await fetch(`${BASE_PATH}/partials/header.html`);
  header.innerHTML = await response.text();
}

export async function loadFooter() {
  const footer = document.getElementById("footer");
  if (!footer) {
    console.warn("Elemento #footer no encontrado, omitiendo carga.");
    return;
  }
  const response = await fetch(`${BASE_PATH}/partials/footer.html`);
  footer.innerHTML = await response.text();
}
