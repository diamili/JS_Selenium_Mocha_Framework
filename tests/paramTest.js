const { Builder, By, Key, Browser } = require("selenium-webdriver");
const ltCapabilities = require("../capabilities");
var should = require("chai").should();

//describe block
describe("add PARAM todo tests", function () {
    var driver;

    //username
    const USERNAME = ltCapabilities.capabilities.user;

    //key
    const KEY = ltCapabilities.capabilities.accessKey;


    //host
    const GRID_HOST = "hub.lambdatest.com/wd/hub";

    const gridUrl = "https://" + USERNAME + ":" + KEY + "@" + GRID_HOST;

    browsers = [
        {browser: "Chrome", bVersion: "93.0", os: "Windows 10"},
        {browser: "Firefox", bVersion: "91.0", os: "Windows 10"},
        {browser: "Firefox", bVersion: "90.0", os: "Windows 10"}
    ];

    browsers.forEach(({browser, bVersion, os}) => {

    //it block
    it(`successfully adds ParamTest for browsers ${browser}, ${bVersion},${os}`, async function () {
        this.timeout(50000)

            ltCapabilities.capabilities.platformName = os
            ltCapabilities.capabilities.browserName = browser
            ltCapabilities.capabilities.browserVersion = bVersion

            ltCapabilities.capabilities.name = this.test.title;

            //1 - launch the browser
            driver = new Builder()
            .usingServer(gridUrl)
            .withCapabilities(ltCapabilities.capabilities)
            .build();

            //2 - navigate to our app
            await driver.get("https://lambdatest.github.io/sample-todo-app/")

            //3 - add a todo
            await driver.findElement(By.id("sampletodotext")).sendKeys("Learn Selenium", Key.RETURN);

            //5 - asssert - to check that smth is presented on the page
            let todoText = await driver.findElement(By.xpath("//li[last()]")).getText().then(function (value) {
                return value
            });

            //assert using chai should
            todoText.should.equal("Learn Selenium")// return the error, becouse the strings do not match

            //4 - close the browser
            await driver.quit();
        
       
        });
    });
});
