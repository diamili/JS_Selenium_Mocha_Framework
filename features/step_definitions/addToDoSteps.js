const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const MainPage = require("../pages/MainPage.js");
//const mainPage = new MainPage(this.driver);

Given("user is on the main page", async function () {
    this.mainPage = new MainPage(this);
    await this.mainPage.navigateToApp();
});

When("user adds a todo with text {string}", async function (todoText) {
    await this.mainPage.addTodo(todoText);
});

Then("user should see last todo with text {string}", async function (expectedText) {
    const lastTodoText = await this.mainPage.getLastTodoText();
    assert.strictEqual(lastTodoText, expectedText);
});
