// HomePage.js
const { By, Key, until} = require("selenium-webdriver");
const env = require("../../config/env.json");
const locators = require('../page_locators/shein/shein_HP_locators.json')

class HomePage {
    constructor() {
        this.driver = require("../beforeHooks").getDriver(); // Get the driver instance from the World context
        this.previousImageSrc = [];
        console.log('HomePage driver:', this.driver);
    }

    async navigateToApp() {
        console.log('Navigating to app...');
        await this.driver.get(env.shein);
    }

    async findElementOnPage() {
        console.log('Looking for element...');
        try{
            const carouselImage = await this.driver.findElement(By.xpath(carouselImageXpath));
            console.log('Element was found')
            return carouselImage;
        }catch(error){
            console.log('Error occurs while looking for element:', error);
            return null;
        }
    }

    async clickElementOnPage() {
        try {
            // Define the maximum wait time in milliseconds
            const maxWaitTimeMs = 10000; // Adjust as needed
            const pollingIntervalMs = 500; // Polling interval in milliseconds
    
            // Store the start time
            const startTime = Date.now();
    
            while (Date.now() - startTime < maxWaitTimeMs) {
                try {
                    // Locate the element
                    const clickableElement = await this.driver.findElement(By.xpath(locators['carousel-image-left-arrow-btn']));
                    console.log('Element was found');
    
                    // Check if the element is clickable, and if it is, click it
                    if (await clickableElement.isEnabled()) {
                        await clickableElement.click();
                        console.log('Element was clicked');
                        return clickableElement;
                    }
                } catch (error) {
                    // If the element is not clickable yet, wait for a short time
                    await this.driver.sleep(pollingIntervalMs);
                }
            }
    
            console.log('Element did not become clickable within the specified time');
            return null;
        } catch (error) {
            console.log('Error occurs while looking for element:', error);
            return null;
        }
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
