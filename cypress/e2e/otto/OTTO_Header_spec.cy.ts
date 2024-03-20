import locators_header from '../../fixtures/OTTO/locators/OTTO_Header_locators.json';
import { HeaderPage } from 'pages/HeaderPage';

describe('User can use search functionality', () => {

  const headerPage = new HeaderPage();

    it ('User can see logo and click on it to open Home Page', () => {

      cy.get(locators_header['onetrust-accept-btn-handler']).click();
      
      headerPage.existLogo();

      cy.get('.nav_navi-elem__tile-title').contains('Herren-Mode').click();

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