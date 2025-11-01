// setupTests.js
global.fetch = jest.fn((url) =>
  Promise.resolve({
    text: () => Promise.resolve(`<p>Mocked content for ${url}</p>`),
  })
);
