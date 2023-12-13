// HomePage.js
const { By, Key, until} = require("selenium-webdriver");
const env = require("../../config/env.json");
const locators = require('../page_locators/otto/otto_HP_locators.json')
const locators_pdp = require('../page_locators/otto/otto_PDP_locators.json')


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
        await this.closeCokiePopUp();
    }

    async findElementOnPage(expectedElement) {
        console.log('Looking for element...');
        try{
            const home_page_element = await this.driver.findElement(By.xpath(locators[expectedElement]));
            const element_value = await home_page_element.getAttribute('class');

            if(element_value){
                console.log('class name: ', element_value)
            } else{
                console.log('data-carousel-mode element not found')
            }

            console.log('Element was found')
            return home_page_element;
        }catch(error){
            console.log('Error occurs while looking for element:', error);
            return null;
        }
    }

    async clickElementOnPage(elementOnClick, delay = 2000) {

        try {
            await this.driver.sleep(delay);

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
            //console.table(productText)
        }
    
        return productDetails;
    }

    // Function to check if the current products contain duplicates
    async checkForDuplicates() {
        const currentProducts = await this.captureProductDetails();

        for (const product of currentProducts) {
            if (this.previousProducts.includes(product)) {
                //console.log('Duplicate product found:', product);
            }else{
                //console.table(currentProducts)
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

    async closeCokiePopUp(delay = 2000){
        // Wait for Cookie popup and close it by clicking reject btn
        try {
            await this.driver.sleep(delay)
            const cookieBanner = await this.driver.wait(until.elementLocated(By.xpath(locators['onetrust-accept-btn-handler'])));
            if (cookieBanner) {
                cookieBanner.findElement(By.xpath(locators['onetrust-accept-btn-handler'])).click();
                console.log('CookiePopUp was closed')
            }
        } catch (error) {
            // Handle any errors related to the cookie banner
            console.log('Error handling cookie banner:', error);
        }
    }

    // it doesn't work properly on otto.de. It returns product names (text) from all elements.
        async clickRandomElement(){
            console.log('getting products elements in carousel')
            const productElements = await this.driver.findElements(By.xpath(locators['top-product-carousel-product-name']));

            console.log('getting random element from carousel')
            const randomIndex = Math.floor(Math.random() * productElements.length);

            const selectedProductElement = productElements[randomIndex];
            const selectedProductElement_text_before_click = await selectedProductElement.getAttribute('outerText');
            console.log('Before click text: ', selectedProductElement_text_before_click);

            await selectedProductElement.click();
            console.log('element was clicked')

            const productPageNameElement = await this.driver.findElement(By.xpath(locators_pdp['product_title']));

            
            const productPageName = await productPageNameElement.getText();

        
            if (selectedProductElement_text_before_click === productPageName) {
                console.log('The selected product name matches the name on the product page.');
            } else {
                console.log('The selected product name does not match the name on the product page.');
            }
    }

}
module.exports = HomePage;
