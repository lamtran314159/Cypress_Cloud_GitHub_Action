const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "wz9g9b",
  viewportWidth: 1920,
  viewportHeight: 1080,
  reporter: "cypress-mochawesome-reporter",
  e2e: {
    experimentalStudio: true,
    // eslint-disable-next-line no-unused-vars
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
  },
  env: {
    login_url: "/login",
    products_url: "/products",
  },
});
