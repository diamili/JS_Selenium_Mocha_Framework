// @ts-check
const { test, expect } = require('@playwright/test');
const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const HomePage = require("../features/pages/HomePage");
const env = require("../config/env.json");
const locators = require('../features/page_locators/otto/otto_HP_locators.json')
const locators_pdp = require('../features/page_locators/otto/otto_PDP_locators.json')
const locators_indeed = require('../features/page_locators/indeed/indeed_HP_locators.json');
const { url } = require('inspector');



test.beforeEach(async ({ page }) => {
  await page.goto(env.otto);
});

const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment'
];

// indeed - to run the tests env needs to be changed 
test.describe('As a user, I can find all QA jobs with no required German language skills', () => {
  const processJobs = async (page) => {
    const jobs = await page.locator('xpath=' + locators_indeed['search_result_jobs']).all();
    console.log('Number of jobs:', jobs.length);

    for (const job of jobs) {
      await job.click();
  
      const maxAttempts = 5;
      let attempts = 0;
  
      while (attempts < maxAttempts) {
        try {
          if (!page.isClosed()) { // Check if the page is still open
            await page.waitForSelector('#jobDescriptionText', { timeout: 10000 }); // 10 seconds timeout
            break; // Exit the loop if waitForSelector succeeds
          } else {
            console.error('Page has been closed.');
            return;
          }
        } catch (error) {
          console.error(`Error waiting for selector (Attempt ${attempts + 1}):`, error);
          attempts++;
          await page.waitForTimeout(2000); // 2 seconds delay before retrying
        }
      }
  
      const jobDescription = await page.$('#jobDescriptionText');
      const jobDescriptionText = jobDescription ? await jobDescription.innerText() : null;
  
      if (
        jobDescriptionText !== null &&
        jobDescriptionText !== undefined &&
        jobDescriptionText.includes('Deutsch', 'German', 'Deutschkenntnisse')
      ) {
        const url = await page.url();
        console.log('Job requires German language URL:', url);
      } else {
        const url = await page.url();
        console.log('Job dos not requires German language URL:', url);
      }
    }
  };

  test('User can find all QA jobs with no required German language skills', async ({ page }) => {
    await page.getByText('Alle Cookies akzeptieren').click();
    console.log('Popup is closed');

    await page.locator('#text-input-what').fill('Software Tester');
    await page.getByText('Jobs finden').press('Enter');
    console.log('ENTER is clicked');

  
    await page.waitForSelector('xpath=' + locators_indeed['search_result_jobs']);

    await processJobs(page);

    await page.getByTestId('pagination-page-2').click();
    console.log('Pagination btn is clicked');

    await page.waitForSelector('.css-yi9ndv.e8ju0x51');

    await page.click('.css-yi9ndv.e8ju0x51');

    await page.waitForSelector('xpath=' + locators_indeed['search_result_jobs']);

    await processJobs(page);
  });
});

// OTTO - to run the tests env needs to be changed 
test.describe('Home page carousel is available', () => {
  
    test('user can see the home page carousel with Empfehlungen für dich title', async ({page}) =>{
      await expect(page.getByRole('heading', { name: 'Empfehlungen für dich' })).toBeVisible();
    })

    test('user can see product details', async ({page}) => {

      await page.getByRole('button', { name: 'Ok' }).click();

      const carousel = await page.locator('xpath=' + locators['top-prosuct-carousel-items-li']);
      const elements = await carousel.locator('xpath=' + locators['top-product-carousel-product-name']).all()
      console.log('Number of elements: ' + elements.length)

      for (const item of elements) {
        const productName = await item.innerText();
        const productImg = await item.locator('xpath=' + locators['top-product-carousel-product-images']).first();
        const productPriceLineThrough = await item.locator('xpath=' + locators['top-product-carousel-product-price-line-through']).first();
        const productPriceRed = await item.locator('xpath=' + locators['top-product-carousel-product-price-red']).first();
        
        const productImgSrc = await productImg.getAttribute('src')
        const priceLineThrough = await productPriceLineThrough.innerText();
        const priceRed = await productPriceRed.innerText();
    
        console.log('Product name:', productName);
        console.log('Product img:', productImgSrc);
        console.log('Contains price (line-through):' , !!priceLineThrough);
        console.log('Contains price (red):', !!priceRed);
      }
      }
    )
    })

    test('user can click on product and being naviagted to the relevant page', async({page}) => {
      const carousel = await page.locator('xpath=' + locators['top-prosuct-carousel-items-li']);

      console.log('getting random element from carousel');
      const elements = await carousel.all();
    
      const randomElementIndex = Math.floor(Math.random() * elements.length);
      const randomElement = elements[randomElementIndex];

      const randomElementName = await randomElement.textContent();
      console.log('product name: ', randomElementName);

      await randomElement.click();

      const productName = await page.locator('xpath=' + locators_pdp['product_title'])

      const productName_text = await productName.innerText();
      console.log('PDP product name: ', productName_text);

      expect(randomElementName).toEqual(expect.stringContaining(productName_text))
    }
    )