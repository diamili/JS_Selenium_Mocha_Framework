const { Before } = require("@cucumber/cucumber");
const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const seleniumConfig = require("../seleniumConfig"); // Adjust the path based on your project structure

let driver;

async function initializeChrome() {
    let options = new chrome.Options();
    options.addArguments('--headless');

    return new Builder()
        .usingServer(seleniumConfig.hubUrl)
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();
}

Before(async function () {
    console.log('Initializing WebDriver...');

    try {
        console.log('Selenium Hub URL:', seleniumConfig.hubUrl);
        driver = await initializeChrome();

        if (driver) {
            console.log('WebDriver initialized successfully.');
            this.driver = driver;
        } else {
            console.error('WebDriver initialization failed.');
            throw new Error('WebDriver initialization failed.');
        }

        console.log('WebDriver instance created.');
    } catch (error) {
        console.error('Error during WebDriver initialization:', error);
        throw error; // Rethrow the error to fail the scenario
    }
});

module.exports = {
    getDriver: function () {
        return driver;
    }
};