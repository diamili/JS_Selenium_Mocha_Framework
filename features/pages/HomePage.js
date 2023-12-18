// HomePage.js
const { By, Key, until } = require("selenium-webdriver");
const env = require("../../config/env.json");
const locators = require('../page_locators/otto/otto_HP_locators.json')
const locators_pdp = require('../page_locators/otto/otto_PDP_locators.json')
const locators_indeed = require('../page_locators/indeed/indeed_HP_locators.json')


class HomePage {
    constructor() {
        this.driver = require("../beforeHooks").getDriver(); // Get the driver instance from the World context
        this.previousImageSrc = [];
        this.previousProducts = [];
        //this.driver.manage().window().maximize();
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
        const maxAttempts = 30; 
        const checkInterval = 3500; 
    
        // Store the initial class and src values
        let initialClass = '';
        let initialSrc = '';
    
        let attempts = 0;
        let hasCompletedCycle = false;
    
        while (attempts < maxAttempts && !hasCompletedCycle) {
            
            await this.driver.sleep(checkInterval);
    
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
       const popUpCloseBtn = await this.driver.wait(until.elementLocated(By.xpath(locators['pop-up-coupons-close-btn'])));
       await popUpCloseBtn.click();
    }

    async closeCokiePopUp(delay = 100){
        
        try {
            await this.driver.sleep(delay)
            const cookieBanner = await this.driver.wait(until.elementLocated(By.xpath(locators['onetrust-accept-btn-handler'])));
            if (cookieBanner) {
                cookieBanner.findElement(By.xpath(locators['onetrust-accept-btn-handler'])).click();
                console.log('CookiePopUp was closed')
            }
        } catch (error) {
            console.log('Error handling cookie banner:', error);
        }
    }

        async clickRandomElement(){

            console.log('getting products elements in carousel')
            const productElements = await this.driver.findElements(By.xpath(locators['top-product-carousel-product-name']));

            console.log('getting random element from carousel')
            const randomIndex = Math.floor(Math.random() * productElements.length);

            const randomSelectedProductFromCarousel = productElements[randomIndex];
            const randomSelectedProductFromCarousel_name = await randomSelectedProductFromCarousel.getAttribute('outerText');
            console.log('Product name in product carousel: ', randomSelectedProductFromCarousel_name);
           
            // Scroll the product carousel to make the selected product visible
            await this.driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });", randomSelectedProductFromCarousel);

            await this.driver.sleep(500);
            await randomSelectedProductFromCarousel.click();

            await this.driver.sleep(1000);
            const productPDP_name = await this.driver.findElement(By.xpath(locators_pdp['product_title']));

            
            const productPageName = await productPDP_name.getText();
            console.log('Product name on PDP: ', productPageName)

        
            if (productPageName.includes(randomSelectedProductFromCarousel_name)) {
                console.log('The selected product name matches the name on the product page.');
            } else {
                console.log('The selected product name does not match the name on the product page.');
            }
        }

        async jobSeekerIsLookingForJob(searchterm){
                
                const searchInput = await this.driver.findElement(By.xpath(locators_indeed['search_input']));
                await searchInput.sendKeys(searchterm, Key.ENTER);
                
                console.log('Getting jobs...');
                const search_result_prodcuts = await this.driver.findElements(By.xpath(locators_indeed['search_result_jobs']));
                console.log('List of products:', search_result_prodcuts.length);

                for (const job of search_result_prodcuts) {
                    //await this.scrollIntoView(job);
                    await job.click();
                    
                    const jobDescription = await this.driver.wait(until.elementLocated(By.xpath(locators_indeed['job_decription'])));
        
                    try {
                        const descriptionText = await jobDescription.getText();
                        if (descriptionText.includes('Deutsch') || descriptionText.includes('Deutschkenntnisse')) {
                            const currentURL = await this.driver.getCurrentUrl();
                            console.log('This job contains the term "Deutch" or "Deutschkenntnisse". Current URL:', currentURL);
                        } else {;
                            const currentURL = await this.driver.getCurrentUrl();
                            console.log('This job does not contain the term "Deutch" or "Deutschkenntnisse". Current URL:', currentURL);
                        }
        
                        // Check for the presence of the popup
                        const mosaicPopups = await this.driver.findElements(By.xpath(locators_indeed['mosaic-popup']));
                        if (mosaicPopups.length > 0) {
                            await mosaicPopups[0].click();
                            console.log('Closed mosaic popup');
                        } else {
                            console.log('No mosaic popup');
                        }
                    } catch (error) {
                        console.error('Error during job processing or popup handling: ', error);
                    }
                 }
                    

        }

        async scrollIntoView(element) {
            try {
                await this.driver.executeScript('arguments[0].scrollIntoView({ behavior: "smooth", block: "center" });', element);
            } catch (error) {
                console.error('Error scrolling into view:', error);
            }
        }

        async scrollPageDown() {
            // Scroll to the bottom of the page
            await this.driver.executeScript('window.scrollTo(0, document.body.scrollHeight);');
            await this.driver.sleep(1000)
            await this.driver.executeScript('window.scrollTo(0, 0);');
        }

}
module.exports = HomePage;
