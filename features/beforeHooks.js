const { Before } = require("@cucumber/cucumber");
const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

let driver;

Before(async function () {
    console.log('Initializing WebDriver...');

    // let options = new chrome.Options();
    // options.addArguments('--headless')
    
    try {

        // Set up Chrome options
        let options = new chrome.Options();
        options.addArguments('--headless');

        // Create the WebDriver instance with the specified options
        driver = await new Builder()
            .forBrowser('chrome')
           //.setChromeOptions(options)
            .build();

        // Check if this.driver is successfully initialized
        if (driver) {
            console.log('WebDriver initialized successfully.'); // Add a log statement for success
            this.driver = driver; //it allows to use this.driver in afterHooks
        } else {
            console.error('WebDriver initialization failed.'); // Add an error log if initialization fails
        }

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