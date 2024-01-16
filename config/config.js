// // config.js

// const { setWorldConstructor } = require('@cucumber/cucumber');
// const seleniumConfig = require('./seleniumconfig');
// const { Builder } = require('selenium-webdriver');

// async function createDriver() {
//   return new Builder()
//     .usingServer(seleniumConfig.hubUrl)
//     .forBrowser('chrome') // or 'firefox' based on your preference
//     .build();
// }

// setWorldConstructor(function ({ setWorldConstructor }) {
//   this.driver = createDriver();
// });

// exports.createDriver = createDriver;
