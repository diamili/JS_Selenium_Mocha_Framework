//homePageSteps.js
const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const HomePage = require("../pages/HomePage.js");

Given("user is on the home page", {timeout: 30000}, async function () {
    this.homePage = new HomePage(this);
    await this.homePage.navigateToApp();
});

Then('user can see {string}', async function (expectedCarouselImage) {
    const homepage_carouselImage = await this.homePage.findElementOnPage();
    assert.ok(homepage_carouselImage, `${expectedCarouselImage} not found.`);
})

Then('user can see different images in {string}', { timeout: 10000 }, async function (expectedCarouselImage) {
    await this.homePage.closePopUpCoupon()
    //await this.homePage.closeCokiePopUp()
    await this.homePage.waitForCarouselImagesToChange()
})

When('user clicks on {string}', async function (elementOnClick) {
    await this.homePage.closePopUpCoupon()
    await this.homePage.closeCokiePopUp()
    const clickedElement = await this.homePage.clickElementOnPage(elementOnClick);
    if (clickedElement) {
        await clickedElement.click();
    }
});


Then('user sees the image was changed', () => {
  // Write code here that turns the phrase above into concrete actions
})

