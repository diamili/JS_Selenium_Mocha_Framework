//const path = require('path');
//const MainPage = require(path.join(__dirname, '..', 'pages', 'MainPage'));
//const MainPage = require("./features/pages/MainPage");

const { Before } = require("@cucumber/cucumber");
const { Builder } = require("selenium-webdriver");
const config = require("../config");
const ltCapabilities = require("../capabilities");
const chrome = require("selenium-webdriver/chrome");

let driver;

Before(async function () {
    console.log('Initializing WebDriver...');
    
    try {
        driver = await new Builder()
            .usingServer(config.gridUrl)
            .withCapabilities(ltCapabilities.capabilities)
            .forBrowser('chrome')
            .build();

        // Check if this.driver is successfully initialized
        if (driver) {
            console.log('WebDriver initialized successfully.'); // Add a log statement for success
        } else {
            console.error('WebDriver initialization failed.'); // Add an error log if initialization fails
        }

        // const MainPage = require("../pages/MainPage");
        // this.mainPage = new MainPage(this.driver);

        // Add more log statements to trace the flow
        console.log('MainPage instance created.');
    } catch (error) {
        console.error('Error during WebDriver initialization:', error); // Log any errors that occur
    }
});


module.exports = {
    getDriver: function () {
        return driver;
    }
};