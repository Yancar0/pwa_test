/**
 * @jest-environment jsdom
 */
import { loadHeader, loadFooter } from "../assets/js/header.js";

// Mock global fetch para no hacer peticiones reales
global.fetch = jest.fn(() =>
  Promise.resolve({
    text: () => Promise.resolve("<p>Mocked content</p>"),
  })
);

describe("Header y Footer", () => {
  beforeEach(() => {
    // Creamos un DOM falso con los elementos requeridos
    document.body.innerHTML = `
      <div id="header"></div>
      <div id="footer"></div>
    `;
  });

  it("debe cargar el contenido en #header", async () => {
    await loadHeader();
    expect(document.getElementById("header").innerHTML)
      .toContain("Mocked content");
  });

  it("debe cargar el contenido en #footer", async () => {
    await loadFooter();
    expect(document.getElementById("footer").innerHTML)
      .toContain("Mocked content");
  });
});
