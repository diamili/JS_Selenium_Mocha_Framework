const { After } = require("@cucumber/cucumber");

After(async function () {

    await this.driverInitializedPromise;

    console.log("afterHooks.js is being executed.");

    console.log("Inside After hook.");
    if (this.driver) {
        console.log('Before quitting WebDriver...');
        await this.driver.quit(); 
        console.log('WebDriver quit successfully.');
    } else {
        console.log('this.driver is not defined.');
    }
});