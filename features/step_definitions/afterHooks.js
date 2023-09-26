const { After } = require("@cucumber/cucumber");

After(async function () {
    if (this.driver) {
        await this.driver.quit(); // Закрыть браузер
        console.log('WebDriver quit successfully.');
    }
});
