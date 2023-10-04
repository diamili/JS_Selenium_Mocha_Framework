// HomePage.js
const { By, Key, until } = require("selenium-webdriver");
const env = require("../../config/env.json");
const locators = require('../page_locators/shein/shein_HP_locators.json')

const carouselImageXpath = locators["carousel-image"];

class HomePage {
    constructor() {
        this.driver = require("../beforeHooks").getDriver(); // Get the driver instance from the World context
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

    // async addTodo(todoText) {
    //     console.log('Adding todo...');
    //     await this.driver.findElement(By.id("sampletodotext")).sendKeys(todoText, Key.RETURN);
    // }

    // async getLastTodoText() {
    //     console.log('Getting last todo text...');
    //     const lastTodo = await this.driver.findElement(By.xpath("//li[last()]"));
    //     return lastTodo.getText();
    // }
}

module.exports = HomePage;
