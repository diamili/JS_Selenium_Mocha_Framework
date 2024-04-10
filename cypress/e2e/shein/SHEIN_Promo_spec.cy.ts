import { should } from "chai";
import { BasePage } from "pages/BasePage";
import {   generateRandomEmail    } from '../../utils/emailUtils'
import {   generateRandomPassword    } from '../../utils/passUtils'
import locators_common from "../../fixtures/shein/locators/Shein_common_locators.json"
//import faker from 'faker';

describe ('User can see promo banner and interact with it', () => {

    const basePage = new BasePage();

    it('Usr can get discount', ()  =>{

        const randomEmail = generateRandomEmail();
        const randomPass = generateRandomPassword();

        basePage.clickElement('#onetrust-banner-sdk #onetrust-accept-btn-handler')  

        cy.get('.c-coupon-box').should('be.visible');
        
        cy.contains('ALLE SAMMELN').click();

        cy.wait(2000)

        cy.get(locators_common['input-promo-email']).type(randomEmail);

        cy.contains('WEITER').click();

        cy.wait(2000)
        
        cy.get(locators_common['input-promo-pass']).type(randomPass);

                

    })
})