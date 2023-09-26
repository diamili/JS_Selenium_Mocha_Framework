// config.js
const ltCapabilities = require("D:/Testing/JS_Selenium_Mocha_Framework/capabilities.js");

module.exports = {
    gridUrl: "https://" + ltCapabilities.capabilities.user + ":" + ltCapabilities.capabilities.accessKey + "@hub.lambdatest.com/wd/hub",
};
