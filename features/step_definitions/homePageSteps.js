//homePageSteps.js
const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const HomePage = require("../pages/HomePage.js");

Given("user is on the home page", {timeout: 15000}, async function () {
    this.homePage = new HomePage(this);
    await this.homePage.navigateToApp();
});

Then('user can see {string}', async function (expectedCarouselImage) {
    const homepage_carouselImage = await this.homePage.findElementOnPage();
    assert.ok(homepage_carouselImage, `${expectedCarouselImage} not found.`);
})
