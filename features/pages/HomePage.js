// HomePage.js
const { By, Key, until} = require("selenium-webdriver");
const env = require("../../config/env.json");
const locators = require('../page_locators/otto/otto_HP_locators.json')


class HomePage {
    constructor() {
        this.driver = require("../beforeHooks").getDriver(); // Get the driver instance from the World context
        this.previousImageSrc = [];
        this.previousProducts = [];
        console.log('HomePage driver:', this.driver);
    }

    async navigateToApp() {
        console.log('Navigating to app...');
        await this.driver.get(env.otto);
    }

    async findElementOnPage() {
        console.log('Looking for element...');
        try{
            const home_page_element = await this.driver.findElement(By.xpath(locators["top-product-carousel"]));
            console.log('Element was found')
            return home_page_element;
        }catch(error){
            console.log('Error occurs while looking for element:', error);
            return null;
        }
    }

    async clickElementOnPage(elementOnClick, delay = 1000) {

        try {
            const clickableElement = await this.driver.wait(this.driver.findElement(By.xpath(locators[elementOnClick])));
            clickableElement.click();
            console.log('Element was clicked');
        } catch (error) {
            console.log('Error occurs while clicking on element:', error);
            return null;
        }
    }
    
    async captureProductDetails(){
        console.log('Looking for ELEMENTS...');

        const products = await this.driver.findElements(By.xpath(locators['top-product-carousle-elements']));
    
        const productDetails = [];
        for (const product of products) {
            const productText = await product.getText();
            productDetails.push(productText);
            console.table(productText)
        }
    
        return productDetails;
    }

    // Function to check if the current products contain duplicates
    async checkForDuplicates() {
        const currentProducts = await this.captureProductDetails();

        for (const product of currentProducts) {
            if (this.previousProducts.includes(product)) {
                console.log('Duplicate product found:', product);
            }else{
                console.table(currentProducts)
            }
        }

        // Update the previousProducts variable for the next check
        this.previousProducts = currentProducts;
    }
   
    async waitForCarouselImagesToChange() {
        console.log('Starting');
        const maxAttempts = 30; // Adjust as needed
        const checkInterval = 3500; // Set the interval to 5 seconds
    
        // Store the initial class and src values
        let initialClass = '';
        let initialSrc = '';
    
        let attempts = 0;
        let hasCompletedCycle = false;
    
        while (attempts < maxAttempts && !hasCompletedCycle) {
            // Wait for the specified interval
            await this.driver.sleep(checkInterval);
    
            // Find the image element
            const imageElement = await this.driver.findElement(By.xpath(locators['carousel-image-swiper-slide-active']));
            const currentClass = await imageElement.getAttribute('class');
            const currentSrc = await imageElement.getAttribute('src');
    
            console.log('Current class:', currentClass);
            console.log('Current src:', currentSrc);
    
            if (currentClass === initialClass && currentSrc === initialSrc) {
                console.log('Carousel has completed a cycle.');
                hasCompletedCycle = true;
            } else {
                console.log('Images have changed.');
                // Update the initial values for the next comparison
                initialClass = currentClass;
                initialSrc = currentSrc;
                attempts++;
            }
        }
    
        if (hasCompletedCycle) {
            console.log('Carousel has completed a full cycle.');
        } else {
            console.log('Maximum attempts reached. Carousel may not complete a full cycle.');
        }
    }
                  
    async closePopUpCoupon(){
        // Wait for popup Coupon X btn and close it
       const popUpCloseBtn = await this.driver.wait(until.elementLocated(By.xpath(locators['pop-up-coupons-close-btn'])));
       await popUpCloseBtn.click();
    }

    async closeCokiePopUp(){
        // Wait for Cookie popup and close it by clicking reject btn
       const cookieCloseBtn = await this.driver.wait(until.elementLocated(By.xpath(locators['coolie-reject-btn'])));
       await cookieCloseBtn.click();
    }

}
module.exports = HomePage;
