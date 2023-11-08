//homePageSteps.js
const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const HomePage = require("../pages/HomePage.js");

Given("user is on the home page", {timeout: 30000}, async function () {
    this.homePage = new HomePage(this);
    await this.homePage.navigateToApp();
});

Then('user can see {string}', async function (expectedElement) {
    const homepage_element = await this.homePage.findElementOnPage(expectedElement);
    assert.ok(homepage_element, `${expectedElement} not found.`);
})

Then('user can see different images in {string}', { timeout: 10000 }, async function (expectedCarouselImage) {
    await this.homePage.waitForCarouselImagesToChange()
})

When('user clicks on {string}', async function (elementOnClick) {
    await this.homePage.clickElementOnPage(elementOnClick);
});

Then('user can see new items', async function ()  {
     await this.homePage.checkForDuplicates()
})

When('user clicks random element', async function ()  {
    await this.homePage.clickRandomElement();
})

