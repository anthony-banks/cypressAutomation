const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    },
    baseUrl: 'https://the-internet.herokuapp.com',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 7000, // 7 seconds
    pageLoadTimeout: 60000, // 60 seconds
    video: true,
    videoUploadOnPasses: false,
    chromeWebSecurity: false,
  },
});