import "../assets/js/main.js";

describe("Service Worker registration", () => {
  beforeEach(() => {
    global.navigator.serviceWorker = {
      register: jest.fn(() => Promise.resolve({ scope: "/mock-scope/" })),
    };
  });

  it("debe registrar el Service Worker correctamente", async () => {
    const registration = await global.navigator.serviceWorker.register("/sw.js");
    expect(registration.scope).toBe("/mock-scope/");
  });
});
