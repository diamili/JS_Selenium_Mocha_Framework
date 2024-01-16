const { Before } = require("@cucumber/cucumber");
const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const firefox = require("selenium-webdriver/firefox");
const seleniumConfig = require("../seleniumConfig"); // Adjust the path based on your project structure


//const hubUrl = 'http://localhost:4444/wd/hub';

let driver;

// Before(async function () {   

//     console.log('Initializing WebDriver...');

//     try {

//         // Set up Chrome options
//         let options = new chrome.Options();
//         options.addArguments('--headless');

//         // Create the WebDriver instance with the specified options
//         driver = await new Builder()
//             .usingServer(seleniumConfig.hubUrl)
//             .forBrowser('chrome')
//             .setChromeOptions(options)
//             .build();

//         // Check if this.driver is successfully initialized
//         if (driver) {
//             console.log('WebDriver initialized successfully.'); // Add a log statement for success
//             this.driver = driver; //it allows to use this.driver in afterHooks
//         } else {
//             console.error('WebDriver initialization failed.'); // Add an error log if initialization fails
//         }

//         // Add more log statements to trace the flow
//         console.log('MainPage instance created.');
//     } catch (error) {
//         console.error('Error during WebDriver initialization:', error); // Log any errors that occur
//     }
// });


// module.exports = {
//     getDriver: function () {
//         return driver;
//     }
// };

async function initializeChrome() {
    let options = new chrome.Options();
    options.addArguments('--headless');

    return new Builder()
        .usingServer(seleniumConfig.hubUrl)
        .forBrowser('chrome')
        //.setChromeOptions(options)
        .build();
}

async function initializeFirefox() {
    let options = new firefox.Options();
    options.addArguments('--headless');

    return new Builder()
        .usingServer(seleniumConfig.hubUrl)
        .forBrowser('firefox')
        //.setFirefoxOptions(options)
        .build();
}

Before( async function () {
    console.log('Initializing WebDriver...');

    try {
        console.log('Selenium Hub URL:', seleniumConfig.hubUrl);
        // Initialize Chrome or Firefox based on your requirements
        //driver = await initializeChrome();
        // Or use the following line to initialize Firefox
        driver = await initializeFirefox();

        if (driver) {
            console.log('WebDriver initialized successfully.');
            this.driver = driver;
        } else {
            console.error('WebDriver initialization failed.');
        }

        console.log('MainPage instance created.');
    } catch (error) {
        console.error('Error during WebDriver initialization:', error);
    }
});

module.exports = {
    getDriver: function () {
        return driver;
    }
};