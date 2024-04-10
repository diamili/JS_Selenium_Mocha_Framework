import { HeaderPage } from 'pages/HeaderPage';
import locators_header from '../../fixtures/shein/locators/Shein_Header_locators.json';

describe('User can use search functionality', () => {

  const headerPage = new HeaderPage();

    it ('User can see logo and click on it to open Home Page', () => {
      
        headerPage.clickElement('#onetrust-banner-sdk #onetrust-accept-btn-handler')  

        headerPage.wait(2000)
        
        cy.contains('ALLE SAMMELN').click()

        headerPage.wait(2000)

        cy.get('.sui-dialog__closebtn').click({ multiple: true })

        headerPage.existLogo();

        cy.get('.c-header2.header-optimize .header-optimize__cate').contains('Große Größen').click();
  
        headerPage.existLogo();
  
        headerPage.clickLogo();
  
        headerPage.existLogo();
    })

    // it('User can search any term and observe the search result page with searched items on it', () => {

    //   cy.get(locators_header['serach-field']).type('spiegel');

    //   cy.get(locators_header['search-icon']).click();

    //   cy.get(locators_search_PLP['searched_term']).contains('spiegel').should('exist');
    // });
  });