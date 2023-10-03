// MainPage.js
const { By, Key } = require("selenium-webdriver");
const env = require("../../config/env.json");

class MainPage {
    constructor() {
        this.driver = require("../beforeHooks").getDriver(); // Get the driver instance from the World context
        console.log('MainPage driver:', this.driver);
    }

    async navigateToApp() {
        console.log('Navigating to app...');
        await this.driver.get(env.lambdatest);
    }

    async addTodo(todoText) {
        console.log('Adding todo...');
        await this.driver.findElement(By.id("sampletodotext")).sendKeys(todoText, Key.RETURN);
    }

    async getLastTodoText() {
        console.log('Getting last todo text...');
        const lastTodo = await this.driver.findElement(By.xpath("//li[last()]"));
        return lastTodo.getText();
    }
}

module.exports = MainPage;
